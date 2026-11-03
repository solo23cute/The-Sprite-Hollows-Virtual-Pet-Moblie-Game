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

function fakeRoot({ coins = '', email = '' } = {}) {
  const submits = [];
  const estimate = { textContent: '' };
  const coinsInput = { value: coins, addEventListener() {} };
  const emailInput = { value: email };
  const form = {
    querySelector: (sel) => ({
      '[name="coins"]': coinsInput,
      '[name="paypalEmail"]': emailInput,
      '[data-est]': estimate,
    }[sel] || null),
    addEventListener: (type, fn) => { if (type === 'submit') submits.push(fn); },
  };
  const root = {
    querySelector: (sel) => ({ '[data-withdraw]': form, '[data-owner]': { addEventListener() {} } }[sel] || null),
  };
  return { root, coinsInput, emailInput, estimate, submits };
}

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
  check('the payout CSV link follows the API base, not a fixed path', moduleSource.includes('href="${API}/admin/withdrawals/export"'));

  const care = await web.petEarn.care('feed');
  check('feeding pays coins inside the game', care.award > 0, JSON.stringify(care).slice(0, 160));
  check('the pet snapshot comes back to the game', typeof care.pet?.hunger === 'number');
  check('the top bar pill shows the new server balance', web.coinPill.textContent === String(care.wallet.coins), `pill=${web.coinPill.textContent} wallet=${care.wallet.coins}`);
  check('care uses the same-origin API path', web.state.urls.at(-1) === '/api/pet/care', web.state.urls.at(-1));

  const again = await web.petEarn.care('feed');
  check('a repeated feed is refused without throwing', again.award === 0 && /resting/i.test(again.error || ''), JSON.stringify(again).slice(0, 160));

  const balance = await web.petEarn.wallet();
  check('the wallet reports the earned balance', balance.coins >= 250 + care.award, `coins=${balance.coins}`);
  check('coins convert at the advertised rate', balance.coinsPerDollar > 0 && balance.minWithdrawCoins > 0);

  const ownerSignup = await ownerJar.call('/api/auth/signup', {
    body: { username: 'ownerclient', password: 'hollowpass1', petName: 'Bramble' },
  });
  check('a first account can review payouts', ownerSignup.status === 201 && ownerSignup.data.user.isAdmin === true, `status=${ownerSignup.status}`);
  check('the payout minimum can be set', (await ownerJar.call('/api/admin/settings', { method: 'PUT', body: { minWithdrawCoins: 100 } })).status === 200);

  web.state.sheetClosed = false;
  web.state.armSheet = true;
  web.state.root = fakeRoot();
  const closeFn = await web.petEarn.openWallet();
  const body = web.state.sheets.at(-1)?.body || '';
  check('the Wallet sheet opens', typeof closeFn === 'function' && body.includes('Cash out to PayPal'));
  check('the form is pre-filled with the withdrawable balance', /name="coins"[^>]*value="\d+"/.test(body));
  check('the PayPal email field is present', body.includes('name="paypalEmail"'));
  check('the estimate is shown in dollars', /\$\d+\.\d{2}/.test(body));
  const prefilled = Number(body.match(/name="coins"[^>]*value="(\d+)"/)?.[1] || 0);
  check('the pre-fill converts to whole US cents', prefilled > 0 && (prefilled * 100) % 1000 === 0, `value=${prefilled}`);

  const coinsBefore = (await guestJar.call('/api/wallet')).data.wallet.coins;
  web.state.armSheet = false;
  web.state.root.coinsInput.value = '100';
  web.state.root.emailInput.value = 'hollow.payer@example.com';
  const submit = web.state.root.submits[0];
  check('the payout form has a submit handler', typeof submit === 'function');
  await submit({ preventDefault() {} });
  await sleep(120);

  check('the player is told the payout was requested', web.state.toasts.some((t) => /Payout requested/i.test(t)), web.state.toasts.join(' | '));
  check('the sheet closes after the request', web.state.sheetClosed === true);

  const wallet = await guestJar.call('/api/wallet');
  check('coins are held by the request', wallet.data.wallet.coins === coinsBefore - 100, `${coinsBefore} -> ${wallet.data.wallet.coins}`);
  const pending = wallet.data.withdrawals[0];
  check('the request shows up as pending', pending?.status === 'pending' && pending.coins === 100);
  check('the PayPal address is recorded', pending?.paypal_email === 'hollow.payer@example.com');
  check('the dollar value is calculated', pending?.usd_cents > 0, `usd_cents=${pending?.usd_cents}`);

  const queue = await ownerJar.call('/api/admin/withdrawals?status=pending');
  check('the payout lands in the owner queue', queue.data.withdrawals.some((w) => w.id === pending.id));
  check('the owner approves it', (await ownerJar.call(`/api/admin/withdrawals/${pending.id}/decide`, { body: { action: 'approve' } })).data.withdrawal.status === 'approved');
  const paid = await ownerJar.call(`/api/admin/withdrawals/${pending.id}/decide`, { body: { action: 'paid', reference: 'PAYPAL-TEST-77', note: 'Sent by PayPal' } });
  check('the owner marks it paid', paid.status === 200 && paid.data.withdrawal.status === 'paid');

  const history = (await guestJar.call('/api/wallet')).data.withdrawals[0];
  check('the player history shows it paid', history.status === 'paid' && history.paid_at > 0);
  check('the remaining balance is still usable', (await web.petEarn.wallet()).coins === coinsBefore - 100);

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
  packedOk.state.root = fakeRoot();
  const packedSheet = await packedOk.petEarn.openWallet();
  const packedBody = packedOk.state.sheets.at(-1)?.body || '';
  check('the packaged Wallet opens against the server', typeof packedSheet === 'function' && packedBody.includes('Cash out to PayPal'));

  /* ---------- 3. packaged build with no server: must not pretend ---------- */
  console.log('\npackaged build with no coin server configured');
  const packedBare = boot({ packaged: true });
  check('it knows it cannot reach a server', packedBare.petEarn.available === false && packedBare.petEarn.offline === true);

  const bareCare = await packedBare.petEarn.care('feed');
  check('care never claims coins it cannot pay', bareCare.award === 0 && bareCare.offline === true && /online Hollow/.test(bareCare.error || ''));
  check('care makes no failing request at all', packedBare.state.calls === 0, `calls=${packedBare.state.calls}`);

  packedBare.state.armSheet = true;
  packedBare.state.root = fakeRoot();
  const bareSheet = await packedBare.petEarn.openWallet();
  const bareBody = packedBare.state.sheets.at(-1)?.body || '';
  check('the Wallet explains the situation instead of erroring', typeof bareSheet === 'function' && /online Hollow/.test(bareBody));
  check('it offers no payout form that could only fail', !bareBody.includes('name="coins"'));
  check('opening the wallet still makes no request', packedBare.state.calls === 0, `calls=${packedBare.state.calls}`);

  /* ---------- 2b. payout review asks for no code and no account ---------- */
  console.log('\npayout review access');
  const reviewer = boot();
  reviewer.state.armSheet = false; /* only the rendered sheet matters here */
  await reviewer.petEarn.openOwner();
  const reviewerBody = reviewer.state.sheets.at(-1)?.body || '';
  check('payout review asks for no code at all', !/passcode|name="code"/i.test(reviewerBody), reviewerBody.slice(0, 140));
  check('it renders no input to type into', !/<input/.test(reviewerBody), reviewerBody.slice(0, 140));
  check('it never asks for a username or email', !/name="username"/.test(reviewerBody) && !/E-mail|email/i.test(reviewerBody));
  check('the sheet claims the seat with no secret', readFileSync(resolve(ROOT, 'src/pet-earn.js'), 'utf8').includes("'/owner/claim'"));
  check('the server offers the same door', readFileSync(resolve(ROOT, 'server/core.js'), 'utf8').includes("api\\/owner\\/claim"));

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
  check('the game reports games, quests, the spin and check-ins', ["reportEarn(payout, 'game')", "reportEarn(totalReward, 'quest')", "reportEarn(prize, 'spin')", "reportEarn(reward, 'checkin')"].every((needle) => source.includes(needle)));

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

  bridged.state.root = fakeRoot();
  const clickHandler = bridged.state.domHandlers.find(([type]) => type === 'click')?.[1];
  check('the cash pill has a click handler', typeof clickHandler === 'function');
  let pillOpened = 0;
  const realOpenSheet = bridged.ctx.openSheet;
  bridged.ctx.openSheet = (opts) => { pillOpened += 1; return realOpenSheet(opts); };
  clickHandler({ preventDefault() {}, target: { closest: (sel) => (sel === '[data-coin-pill]' ? { dataset: {} } : null) } });
  await new Promise((resolve) => setTimeout(resolve, 700));
  check('tapping the cash pill opens the Wallet', pillOpened > 0, `sheets=${bridged.state.sheets.length}`);

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
