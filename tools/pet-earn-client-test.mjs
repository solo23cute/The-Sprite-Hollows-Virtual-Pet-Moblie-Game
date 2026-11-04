#!/usr/bin/env node
/* End-to-end checks for the in-game coin wallet (src/pet-earn.js) against a
   live server. Three ways the game can run:
     1. web build, served by the same origin that answers /api
     2. packaged Android build with an API base baked in (absolute URL)
     3. packaged Android build with no API base, which must say so plainly
        instead of failing at a 404 from the asset reader.
   Run: node tools/pet-earn-client-test.mjs */

import { readFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.TEST_PORT || 4319);
const BASE = `http://127.0.0.1:${PORT}`;
const TMP = '/tmp/spritehollow-client-test';

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = spawn(process.execPath, ['server/dev.mjs', String(PORT)], {
  cwd: ROOT,
  env: { ...process.env, COIN_PETS_DB: `${TMP}/db.sqlite` },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverLog = '';
server.stdout.on('data', (d) => { serverLog += d; });
server.stderr.on('data', (d) => { serverLog += d; });

async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(`${BASE}/api/health`)).ok) return; } catch { /* starting */ }
    await sleep(120);
  }
  throw new Error(`dev server did not start.\n${serverLog}`);
}

function jar() {
  let cookie = '';
  return {
    async fetch(path, opts = {}) {
      const headers = { ...(opts.headers || {}), ...(cookie ? { cookie } : {}) };
      const res = await fetch(path.startsWith('http') ? path : BASE + path, { ...opts, headers });
      for (const raw of res.headers.getSetCookie?.() || []) {
        if (!raw.startsWith('cp_session=')) continue;
        const value = raw.split(';')[0];
        cookie = value === 'cp_session=' ? '' : value;
      }
      return res;
    },
    async call(path, { method, body } = {}) {
      const res = await this.fetch(path, {
        method: method || (body ? 'POST' : 'GET'),
        headers: body ? { 'content-type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await res.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch { /* CSV or empty */ }
      return { status: res.status, data, text };
    },
  };
}

const guestJar = jar();
const ownerJar = jar();

/* Boots the real client module the way the game would, in a given mode. */
function boot({ packaged = false, apiBase = '', crossOrigin = false, actions = false, fresh = false } = {}) {
  const state = { toasts: [], sheets: [], calls: 0, urls: [], armSheet: true, sheetClosed: false, root: null, gameCalls: [], domHandlers: [] };
  const coinPill = { textContent: '' };
  const ctx = {
    console, setTimeout, clearTimeout, Promise, JSON, Math, Number, String, Boolean,
    Array, Object, Date, Error, URL, TextEncoder, isNaN, parseInt, parseFloat,
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  ctx.location = packaged
    ? { protocol: 'https:', hostname: 'appassets.androidplatform.net', href: 'https://appassets.androidplatform.net/index.html' }
    : { protocol: 'http:', hostname: '127.0.0.1', href: `${BASE}/index.html` };
  if (apiBase) ctx.SPRITE_HOLLOW_API = apiBase;
  ctx.document = {
    querySelector: (sel) => (sel === '[data-coins]' ? coinPill : null),
    querySelectorAll: () => [],
  };
  const memory = new Map();
  ctx.localStorage = {
    getItem: (key) => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => { memory.set(key, String(value)); },
    removeItem: (key) => { memory.delete(key); },
  };
  ctx.toast = (msg) => state.toasts.push(msg);
  if (actions) {
    ctx.Actions = {
      feed(...args) { state.gameCalls.push(['feed', args]); return { ok: true, xp: 4 }; },
      bathe() { state.gameCalls.push(['bathe']); return { ok: true }; },
      pet() { state.gameCalls.push(['pet']); return { ok: false }; },
    };
    ctx.document.addEventListener = (type, fn) => { state.domHandlers.push([type, fn]); };
  }
  ctx.openSheet = (opts) => {
    state.sheets.push(opts);
    const close = () => { state.sheetClosed = true; };
    if (state.armSheet && opts.onMount) opts.onMount(state.root.root, close);
    return { close };
  };
  const requestJar = (crossOrigin || fresh) ? jar() : guestJar;
  ctx.fetch = (path, opts = {}) => {
    state.calls++;
    state.urls.push(String(path));
    const headers = { ...(opts.headers || {}) };
    if (crossOrigin) headers.origin = 'https://appassets.androidplatform.net';
    return requestJar.fetch(path, { ...opts, headers });
  };
  vm.createContext(ctx);
  vm.runInContext(readFileSync(resolve(ROOT, 'src/pet-earn.js'), 'utf8'), ctx, { filename: 'src/pet-earn.js' });
  return { ctx, state, coinPill, petEarn: ctx.PetEarn };
}

try {
  await waitForServer();
  console.log(`\nSprite Hollow in-game wallet checks against ${BASE}\n`);

  /* ---------- 1. web build: same-origin wallet ---------- */
  console.log('web build (same origin)');
  const web = boot();
  check('the wallet module loads inside the game', typeof web.petEarn.care === 'function');
  check('the web build is available', web.petEarn.available === true && web.petEarn.offline === false);

  const moduleSource = readFileSync(resolve(ROOT, 'src/pet-earn.js'), 'utf8');
  const care = await web.petEarn.care('feed');
  check('feeding pays coins inside the game', care.award > 0, JSON.stringify(care).slice(0, 160));
  check('the pet snapshot comes back to the game', typeof care.pet?.hunger === 'number');
  check('the top bar pill shows the new server balance', web.coinPill.textContent === String(care.wallet.coins), `pill=${web.coinPill.textContent} wallet=${care.wallet.coins}`);
  check('care uses the same-origin API path', web.state.urls.at(-1) === '/api/pet/care', web.state.urls.at(-1));

  const again = await web.petEarn.care('feed');
  check('a repeated feed is refused without throwing', again.award === 0 && /resting/i.test(again.error || ''), JSON.stringify(again).slice(0, 160));

  const balance = await web.petEarn.wallet();
  check('the wallet reports the earned balance', balance.coins >= 250 + care.award, `coins=${balance.coins}`);
  check('the wallet advertises its coin rate', balance.coinsPerDollar > 0);

  const ownerSignup = await ownerJar.call('/api/auth/signup', {
    body: { username: 'ownerclient', password: 'hollowpass1', petName: 'Bramble' },
  });
  check('a first account is the owner', ownerSignup.status === 201 && ownerSignup.data.user.isAdmin === true, `status=${ownerSignup.status}`);
  check('the owner can tune the coin caps', (await ownerJar.call('/api/admin/settings', { method: 'PUT', body: { dailyGameCoinCap: 600 } })).status === 200);

  web.state.sheetClosed = false;
  web.state.armSheet = true;
  web.state.root = { querySelector: () => null };
  const closeFn = await web.petEarn.openWallet();
  const body = web.state.sheets.at(-1)?.body || '';
  check('the Wallet sheet opens', typeof closeFn === 'function' && /Recent coins/.test(body));
  check('it shows the server balance', /<b>[\d,]+<\/b> coins/.test(body), body.slice(0, 160));
  check('it says coins stay in the Hollow', /Hollow's own money/i.test(body));
  check('it offers no cash-out form at all', !body.includes('name="coins"') && !/PayPal|withdraw|payout/i.test(body), body.slice(0, 200));
  check('opening the wallet does not move any coins', (await web.petEarn.wallet()).coins === balance.coins);

  /* ---------- 2. packaged build pointed at the server ---------- */
  console.log('\npackaged build with a coin server baked in');
  const packedOk = boot({ packaged: true, apiBase: `${BASE}/api/` });
  check('a baked-in API base is used verbatim (trailing slash trimmed)', packedOk.petEarn.apiBase === `${BASE}/api`, packedOk.petEarn.apiBase);
  check('the packaged build reports itself available', packedOk.petEarn.available === true);

  const packedCare = await packedOk.petEarn.care('clean');
  check('care in the packaged app reaches the server', packedCare.award > 0, JSON.stringify(packedCare).slice(0, 160));
  check('it calls the absolute server URL', packedOk.state.urls.at(-1) === `${BASE}/api/pet/care`, packedOk.state.urls.at(-1));
  check('the top bar updates in the packaged app too', packedOk.coinPill.textContent === String(packedCare.wallet.coins));

  packedOk.state.armSheet = true;
  packedOk.state.root = { querySelector: () => null };
  const packedSheet = await packedOk.petEarn.openWallet();
  const packedBody = packedOk.state.sheets.at(-1)?.body || '';
  check('the packaged Wallet opens against the server', typeof packedSheet === 'function' && /Recent coins/.test(packedBody));

  /* ---------- 3. packaged build with no server: must not pretend ---------- */
  console.log('\npackaged build with no coin server configured');
  const packedBare = boot({ packaged: true });
  check('it knows it cannot reach a server', packedBare.petEarn.available === false && packedBare.petEarn.offline === true);

  const bareCare = await packedBare.petEarn.care('feed');
  check('care never claims coins it cannot pay', bareCare.award === 0 && bareCare.offline === true && /online Hollow/.test(bareCare.error || ''));
  check('care makes no failing request at all', packedBare.state.calls === 0, `calls=${packedBare.state.calls}`);

  packedBare.state.armSheet = true;
  packedBare.state.root = { querySelector: () => null };
  const bareSheet = await packedBare.petEarn.openWallet();
  const bareBody = packedBare.state.sheets.at(-1)?.body || '';
  check('the Wallet explains the situation instead of erroring', typeof bareSheet === 'function' && /online Hollow/.test(bareBody));
  check('it renders no form at all', !bareBody.includes('<form'));
  check('opening the wallet still makes no request', packedBare.state.calls === 0, `calls=${packedBare.state.calls}`);

  /* ---------- 2c. game coins bank into the wallet ---------- */
  console.log('\nbanking game coins');
  const banker = boot();
  banker.state.armSheet = false;
  const beforeBank = (await banker.petEarn.wallet()).coins;
  const win = await banker.petEarn.earn(45, 'game', `game:${Date.now()}`);
  check('a win banks into the wallet', win.award === 45 && win.wallet.coins === beforeBank + 45, JSON.stringify(win).slice(0, 140));
  check('the pill follows the banked balance', banker.coinPill.textContent === String(beforeBank + 45), `pill=${banker.coinPill.textContent}`);
  check('the game reports through /api/earn', banker.state.urls.at(-1) === '/api/earn', banker.state.urls.at(-1));
  const dupe = await banker.petEarn.earn(45, 'game', `same-${Date.now()}`);
  const replayKey = dupe && dupe.award === 45 ? await banker.petEarn.earn(45, 'game', `replay-${Date.now()}`) : null;
  check('a second distinct win still pays', replayKey === null || replayKey.award > 0);
  const source = readFileSync(resolve(ROOT, 'src/state.js'), 'utf8');
  check('every coin gain in the game reports to the wallet funnel', source.includes("function addCoinsRaw(n, source = 'game')") && source.includes("if (n > 0 && source !== 'local') reportEarn(n, source);"));
  check('the four named sources keep their labels', ["addCoinsRaw(payout, 'game')", "addCoinsRaw(totalReward, 'quest')", "addCoinsRaw(prize, 'spin')", "addCoinsRaw(reward, 'checkin')"].every((needle) => source.includes(needle)));
  check('nothing reports twice alongside the funnel', ![ "reportEarn(payout, 'game')", "reportEarn(totalReward, 'quest')", "reportEarn(prize, 'spin')", "reportEarn(reward, 'checkin')"].some((needle) => source.includes(needle)));
  check('care already paid by the server is not banked twice', source.includes("addCoinsRaw(3, 'local')") && source.includes("addCoinsRaw(coins, 'local')"));
  check('a Vault door, a walk gift and a hatch are covered by the same funnel', ['addCoinsRaw(door.coins)', 'addCoinsRaw(giftCoins)', 'addCoinsRaw(10)'].every((needle) => source.includes(needle)));

  /* small wins around the Hollow are folded into one award and still land */
  const beforeFlush = (await banker.petEarn.wallet()).coins;
  const settled = await Promise.all([
    banker.petEarn.enqueue(3, 'game'),
    banker.petEarn.enqueue(4, 'game'),
    banker.petEarn.enqueue(5, 'game'),
  ]);
  const afterFlush = (await banker.petEarn.wallet()).coins;
  check('coins won around the Hollow bank without a request per coin', afterFlush === beforeFlush + 12, `${beforeFlush} -> ${afterFlush}`);
  check('the queue drains once the coins land', settled.every((r) => r.pending === 0), JSON.stringify(settled));
  const flushHistory = await (await banker.ctx.fetch('/api/wallet')).json();
  check('the folded win is one ledger line, not three', flushHistory.ledger[0]?.amount === 12 && flushHistory.ledger[0]?.kind === 'earn', JSON.stringify(flushHistory.ledger[0]));

  /* a win saved before the session existed still reaches the wallet */
  const baseline = (await boot({ fresh: true }).petEarn.wallet()).coins;
  const orphan = boot({ fresh: true });
  orphan.ctx.localStorage.setItem('spritehollow.reward-outbox.guest', JSON.stringify([{ id: `orphan-${Date.now()}`, amount: 7, source: 'game', at: Date.now() }]));
  await orphan.petEarn.enqueue(1, 'game');
  const orphanCoins = (await orphan.petEarn.wallet()).coins;
  check('a reward saved before the session existed is adopted and paid', orphanCoins === baseline + 8, `${baseline} -> ${orphanCoins}`);

  /* ---------- 3b. care in the Hollow pays the wallet ---------- */
  console.log('\ncare in the Hollow (game actions bridged to the wallet)');
  const bridged = boot({ actions: true, fresh: true });
  check('the game care actions are bridged', bridged.petEarn.bridge() === true);
  const beforeBridge = (await bridged.petEarn.wallet()).coins;
  const gameResult = bridged.ctx.Actions.feed('sprite_1', 'berry');
  await new Promise((resolve) => setTimeout(resolve, 500));
  const afterBridge = (await bridged.petEarn.wallet()).coins;
  check('the game action still returns its own result', gameResult && gameResult.ok === true && gameResult.xp === 4);
  check('feeding a sprite in the Hollow pays the wallet', afterBridge > beforeBridge, `${beforeBridge} -> ${afterBridge}`);
  check('the player is told what the care earned', bridged.state.toasts.some((t) => /coins/.test(t)), JSON.stringify(bridged.state.toasts));

  const refusedBefore = (await bridged.petEarn.wallet()).coins;
  bridged.ctx.Actions.pet();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const refusedAfter = (await bridged.petEarn.wallet()).coins;
  check('a care action the game refuses pays nothing', refusedAfter === refusedBefore, `${refusedBefore} -> ${refusedAfter}`);

  bridged.state.root = { querySelector: () => null };
  const clickHandler = bridged.state.domHandlers.find(([type]) => type === 'click')?.[1];
  check('the coin pill has a click handler', typeof clickHandler === 'function');
  let pillOpened = 0;
  const realOpenSheet = bridged.ctx.openSheet;
  bridged.ctx.openSheet = (opts) => { pillOpened += 1; return realOpenSheet(opts); };
  clickHandler({ preventDefault() {}, target: { closest: (sel) => (sel === '[data-coin-pill]' ? { dataset: {} } : null) } });
  await new Promise((resolve) => setTimeout(resolve, 700));
  check('tapping the coin pill opens the Wallet', pillOpened > 0, `sheets=${bridged.state.sheets.length}`);

  /* ---------- 4. packaged app talking to a deployed server ---------- */
  console.log('\npackaged build over the network (cross-origin, bearer token)');
  const xo = boot({ packaged: true, apiBase: BASE, crossOrigin: true });
  check('a bare server address becomes the API root', xo.petEarn.apiBase === `${BASE}/api`, xo.petEarn.apiBase);

  const xoCare = await xo.petEarn.care('feed');
  check('care works cross-origin on a bearer session', xoCare.award > 0, JSON.stringify(xoCare).slice(0, 160));
  const xoWallet = await xo.petEarn.wallet();
  check('the cross-origin wallet reads the balance', xoWallet.coins > 0, `coins=${xoWallet.coins}`);

  const preflight = await fetch(`${BASE}/api/pet/care`, {
    method: 'OPTIONS',
    headers: { origin: 'https://appassets.androidplatform.net' },
  });
  check('the browser preflight is answered', preflight.status === 204
    && preflight.headers.get('access-control-allow-origin') === 'https://appassets.androidplatform.net',
    `status=${preflight.status}`);

  const evil = await fetch(`${BASE}/api/pet/care`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://evil.example' },
    body: JSON.stringify({ action: 'play' }),
  });
  check('an unknown origin is still refused', evil.status === 403, `status=${evil.status}`);

  const noToken = await fetch(`${BASE}/api/wallet`, { headers: { origin: 'https://appassets.androidplatform.net' } });
  check('the cross-origin API still needs a session', noToken.status === 401, `status=${noToken.status}`);
} catch (err) {
  failures.push(String(err && err.message));
  console.log(`\nFAIL  ${err && err.message}`);
  if (serverLog) console.log(serverLog.slice(-800));
} finally {
  server.kill('SIGTERM');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(` - ${f}`);
  process.exitCode = 1;
}
