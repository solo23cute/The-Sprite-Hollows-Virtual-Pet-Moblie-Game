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
function boot({ packaged = false, apiBase = '' } = {}) {
  const state = { toasts: [], sheets: [], calls: 0, urls: [], armSheet: true, sheetClosed: false, root: null };
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
  ctx.openSheet = (opts) => {
    state.sheets.push(opts);
    const close = () => { state.sheetClosed = true; };
    if (state.armSheet && opts.onMount) opts.onMount(state.root.root, close);
    return { close };
  };
  ctx.fetch = (path, opts = {}) => {
    state.calls++;
    state.urls.push(String(path));
    return guestJar.fetch(path, opts);
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
  check('the pre-fill is a whole 100 coins', prefilled > 0 && prefilled % 100 === 0, `value=${prefilled}`);

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
  const paid = await ownerJar.call(`/api/admin/withdrawals/${pending.id}/decide`, { body: { action: 'paid', note: 'Sent by PayPal' } });
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
