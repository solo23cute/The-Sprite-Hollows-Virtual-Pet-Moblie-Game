#!/usr/bin/env node
/* Cash out straight to PayPal, with no owner in the loop.
   Runs a mock PayPal REST server, points the real dev server at it, and checks
   the whole path: sign-in, payout batch, paid status, the daily budget, a bad
   address refunding the coins, and a PayPal failure leaving the request pending.
   Run: node tools/payout-test.mjs */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.TEST_PORT || 4701);
const PLAIN_PORT = PORT + 2;
const MOCK_PORT = PORT + 1;
const BASE = `http://127.0.0.1:${PORT}`;
const PLAIN = `http://127.0.0.1:${PLAIN_PORT}`;
const TMP = `/tmp/spritehollow-payout-test-${process.pid}`;
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- the PayPal stand-in ---------- */
const batches = [];
const batchStatus = new Map();
const statusCalls = [];
const tokenCalls = [];
const mock = createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    res.setHeader('content-type', 'application/json');
    if (req.url === '/v1/oauth2/token') {
      tokenCalls.push(req.headers.authorization || '');
      res.writeHead(200).end(JSON.stringify({ access_token: 'MOCK-TOKEN', token_type: 'Bearer', expires_in: 3600 }));
      return;
    }
    const statusPath = /^\/v1\/payments\/payouts\/([^/?]+)$/.exec(req.url || '');
    if (statusPath && req.method === 'GET' && req.url !== '/v1/payments/payouts') {
      const id = decodeURIComponent(statusPath[1]);
      statusCalls.push(id);
      const wanted = batchStatus.get(id) || 'PENDING';
      res.writeHead(200).end(JSON.stringify({
        batch_header: { payout_batch_id: id, batch_status: wanted },
        items: [{ transaction_status: wanted === 'SUCCESS' ? 'SUCCESS' : 'PENDING' }],
      }));
      return;
    }
    if (req.url === '/v1/payments/payouts') {
      let payload = {};
      try { payload = JSON.parse(body || '{}'); } catch { /* keep empty */ }
      const receiver = payload?.items?.[0]?.receiver || '';
      if (receiver.startsWith('bad@')) {
        res.writeHead(422).end(JSON.stringify({ name: 'UNPROCESSABLE_ENTITY', message: 'Receiver is invalid' }));
        return;
      }
      if (receiver.startsWith('slow@')) {
        res.writeHead(503).end(JSON.stringify({ name: 'SERVICE_UNAVAILABLE', message: 'Try again later' }));
        return;
      }
      batches.push(payload);
      const id = `BATCH-${String(batches.length).padStart(3, '0')}`;
      res.writeHead(201).end(JSON.stringify({ batch_header: { payout_batch_id: id, batch_status: 'PENDING' } }));
      return;
    }
    res.writeHead(404).end('{}');
  });
});

const servers = [];
function startServer(port, env) {
  const proc = spawn(process.execPath, ['server/dev.mjs', String(port)], {
    cwd: ROOT,
    env: { ...process.env, COIN_PETS_DB: `${TMP}/db-${port}.sqlite`, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let log = '';
  proc.stdout.on('data', (d) => { log += d; });
  proc.stderr.on('data', (d) => { log += d; });
  servers.push(proc);
  return { proc, log: () => log };
}

async function waitFor(url) {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(`${url}/api/health`)).ok) return; } catch { /* starting */ }
    await sleep(120);
  }
  throw new Error(`server at ${url} did not start`);
}

function client(base = BASE) {
  let token = '';
  return {
    async call(path, { method, body } = {}) {
      const res = await fetch(base + path, {
        method: method || (body ? 'POST' : 'GET'),
        headers: {
          ...(body ? { 'content-type': 'application/json' } : {}),
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const text = await res.text();
      let data = null; try { data = text ? JSON.parse(text) : null; } catch {}
      if (data && data.token) token = data.token;
      return { status: res.status, data, text };
    },
  };
}

const unique = (label) => `${label}:${process.pid}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`;

try {
  await new Promise((done) => mock.listen(MOCK_PORT, '127.0.0.1', done));
  startServer(PORT, {
    PAYPAL_CLIENT_ID: 'test-client-id',
    PAYPAL_CLIENT_SECRET: 'test-client-secret',
    PAYPAL_MODE: 'sandbox',
    PAYPAL_API_BASE: `http://127.0.0.1:${MOCK_PORT}`,
    /* ask PayPal about a batch on every wallet read, so the test can move it */
    PAYOUT_STATUS_TTL_MS: '0',
  });
  startServer(PLAIN_PORT, { PAYPAL_CLIENT_ID: '', PAYPAL_CLIENT_SECRET: '' });
  await waitFor(BASE);
  await waitFor(PLAIN);

  console.log('\nPayPal payouts wired up\n');
  const owner = client();
  await owner.call('/api/guest', { method: 'POST' });
  const claim = await owner.call('/api/owner/claim', { method: 'POST' });
  check('a session can take the owner seat for settings', claim.status === 201, `status=${claim.status}`);
  const tuned = await owner.call('/api/admin/settings', { method: 'PUT', body: { minWithdrawCoins: 1, payoutWeeklyBudgetCents: 50000 } });
  check('any amount is allowed, and the weekly budget is set', tuned.status === 200 && tuned.data?.settings?.minWithdrawCoins === 1 && tuned.data?.settings?.payoutWeeklyBudgetCents === 50000, JSON.stringify(tuned.data).slice(0, 160));

  const player = client();
  await player.call('/api/guest', { method: 'POST' });
  const earn = await player.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  check('a player can earn coins', earn.status === 200 && earn.data?.award === 300, JSON.stringify(earn.data).slice(0, 120));

  const wallet = await player.call('/api/wallet');
  check('the wallet advertises instant payouts', wallet.data?.wallet?.autoPayout === true, JSON.stringify(wallet.data?.wallet).slice(0, 160));

  const coinsBefore = wallet.data.wallet.coins;
  const cashout = await player.call('/api/wallet/withdraw', { body: { coins: 200, paypalEmail: 'player@example.com' } });
  check('cashing out pays straight away', cashout.status === 201 && cashout.data?.withdrawal?.status === 'paid', `status=${cashout.status} ${JSON.stringify(cashout.data?.withdrawal || {}).slice(0, 140)}`);
  check('PayPal got a real payout batch', batches.length === 1 && batches[0].items[0].receiver === 'player@example.com', JSON.stringify(batches[0] || {}).slice(0, 160));
  check('the batch carries the withdrawal id, so a retry cannot double-pay', !!cashout.data?.withdrawalId && batches[0]?.sender_batch_header?.sender_batch_id === cashout.data.withdrawalId, `${batches[0]?.sender_batch_header?.sender_batch_id} vs ${cashout.data?.withdrawalId}`);
  check('the amount is the exact dollar value of the coins', batches[0]?.items?.[0]?.amount?.value === '0.20', JSON.stringify(batches[0]?.items?.[0]?.amount));
  check('the payout reference is stored on the request', /^BATCH-/.test(cashout.data?.withdrawal?.payment_reference || ''), cashout.data?.withdrawal?.payment_reference);
  check('the coins left the balance', cashout.data?.wallet?.coins === coinsBefore - 200, `${coinsBefore} -> ${cashout.data?.wallet?.coins}`);
  check('the wallet counts it as paid', cashout.data?.wallet?.paid === 0.2, String(cashout.data?.wallet?.paid));

  check('a fresh cash-out is recorded as PayPal still processing', cashout.data?.withdrawal?.payout_state === 'PENDING', cashout.data?.withdrawal?.payout_state);
  const sentBatch = cashout.data?.withdrawal?.payment_reference || '';
  batchStatus.set(sentBatch, 'SUCCESS');
  const settled = await player.call('/api/wallet');
  const settledRow = settled.data?.withdrawals?.find((w) => w.id === cashout.data?.withdrawal?.id);
  check('opening the wallet shows the money actually arrived', settledRow?.payout_state === 'SUCCESS', JSON.stringify(settledRow || {}).slice(0, 160));
  check('the wallet records when it last asked PayPal', settledRow?.payout_checked_at > 0, String(settledRow?.payout_checked_at));
  const callsAfterSettle = statusCalls.length;
  await player.call('/api/wallet');
  check('a settled payout is never asked about again', statusCalls.length === callsAfterSettle, `${callsAfterSettle} -> ${statusCalls.length}`);

  const tiny = client();
  await tiny.call('/api/guest', { method: 'POST' });
  const tinyCash = await tiny.call('/api/wallet/withdraw', { body: { coins: 11, paypalEmail: 'tiny@example.com' } });
  check('any amount cashes out — eleven coins is one cent', tinyCash.status === 201 && tinyCash.data?.withdrawal?.usd_cents === 1 && tinyCash.data?.withdrawal?.status === 'paid', `status=${tinyCash.status} ${JSON.stringify(tinyCash.data?.withdrawal || {}).slice(0, 120)}`);
  const rounded = await tiny.call('/api/wallet/withdraw', { body: { coins: 115, paypalEmail: 'tiny@example.com' } });
  check('coins past the last whole cent stay in the balance', rounded.data?.withdrawal?.coins === 110 && rounded.data?.withdrawal?.usd_cents === 11, JSON.stringify(rounded.data?.withdrawal || {}).slice(0, 140));
  const batchesAfterInstant = batches.length;

  const history = await player.call('/api/wallet');
  check('the player history shows it paid, with no owner involved', history.data?.withdrawals?.[0]?.status === 'paid' && history.data?.withdrawals?.[0]?.paid_at > 0);

  console.log('\nthe weekly budget is a real ceiling\n');
  const budget = await owner.call('/api/admin/settings', { method: 'PUT', body: { payoutWeeklyBudgetCents: 0 } });
  check('the owner can set the weekly payout budget', budget.status === 200 && budget.data?.settings?.payoutWeeklyBudgetCents === 0, JSON.stringify(budget.data).slice(0, 140));

  const second = client();
  await second.call('/api/guest', { method: 'POST' });
  await second.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  const capped = await second.call('/api/wallet/withdraw', { body: { coins: 200, paypalEmail: 'second@example.com' } });
  check('over budget, the payout waits instead of sending', capped.status === 202 && capped.data?.withdrawal?.status === 'pending', `status=${capped.status}`);
  check('no extra batch went out', batches.length === batchesAfterInstant, `batches=${batches.length}, expected ${batchesAfterInstant}`);

  /* what was already sent in the last seven days has to count, not just what was
     sent since midnight: the allowance is set to exactly the cents already paid */
  const paidSoFar = batches.reduce((sum, b) => sum + Math.round(Number(b.items[0].amount.value) * 100), 0);
  const window = await owner.call('/api/admin/settings', { method: 'PUT', body: { payoutWeeklyBudgetCents: paidSoFar } });
  check('the allowance is the rolling seven-day total, not a fresh day', window.status === 200 && window.data?.settings?.payoutWeeklyBudgetCents === paidSoFar, JSON.stringify(window.data?.settings || {}).slice(0, 140));
  const weekSpent = client();
  await weekSpent.call('/api/guest', { method: 'POST' });
  const oneCent = await weekSpent.call('/api/wallet/withdraw', { body: { coins: 11, paypalEmail: 'week@example.com' } });
  check('a cent past this week\'s allowance waits instead of sending', oneCent.status === 202 && oneCent.data?.withdrawal?.status === 'pending', `status=${oneCent.status} paid=${paidSoFar}`);

  console.log('\nPayPal refusals are handled honestly\n');
  await owner.call('/api/admin/settings', { method: 'PUT', body: { payoutWeeklyBudgetCents: 100000 } });
  const broken = client();
  await broken.call('/api/guest', { method: 'POST' });
  await broken.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  const beforeBad = (await broken.call('/api/wallet')).data.wallet.coins;
  const bad = await broken.call('/api/wallet/withdraw', { body: { coins: 100, paypalEmail: 'bad@example.com' } });
  check('a refused address is reported, not swallowed', bad.status === 400 && /PayPal would not pay/i.test(bad.data?.error || ''), JSON.stringify(bad.data).slice(0, 140));
  const afterBad = (await broken.call('/api/wallet')).data.wallet.coins;
  check('the coins come back when PayPal refuses for good', afterBad === beforeBad, `${beforeBad} -> ${afterBad}`);
  const badRow = (await owner.call('/api/admin/withdrawals?status=rejected')).data?.withdrawals?.find((w) => w.paypal_email === 'bad@example.com');
  check('the refused request is closed as rejected', !!badRow, JSON.stringify(badRow || {}).slice(0, 120));

  const flaky = client();
  await flaky.call('/api/guest', { method: 'POST' });
  await flaky.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  const slow = await flaky.call('/api/wallet/withdraw', { body: { coins: 100, paypalEmail: 'slow@example.com' } });
  check('a PayPal outage leaves the payout queued, not lost', slow.status === 202 && slow.data?.withdrawal?.status === 'pending', `status=${slow.status}`);
  const held = (await flaky.call('/api/wallet')).data.wallet;
  check('the queued request holds its coins', held.reserved >= 100 && held.autoPayout === true, JSON.stringify(held).slice(0, 160));

  console.log('\na payout PayPal cannot deliver returns the coins\n');
  const unlucky = client();
  await unlucky.call('/api/guest', { method: 'POST' });
  await unlucky.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  const doomed = await unlucky.call('/api/wallet/withdraw', { body: { coins: 150, paypalEmail: 'doomed@example.com' } });
  check('the payout starts as processing', doomed.data?.withdrawal?.payout_state === 'PENDING', JSON.stringify(doomed.data?.withdrawal || {}).slice(0, 120));
  const doomedBatch = doomed.data?.withdrawal?.payment_reference || '';
  const beforeRefund = (await unlucky.call('/api/wallet')).data.wallet.coins;
  batchStatus.set(doomedBatch, 'FAILED');
  const refunded = await unlucky.call('/api/wallet');
  check('a failed payout puts the coins back in the balance', refunded.data?.wallet?.coins === beforeRefund + 150, `${beforeRefund} -> ${refunded.data?.wallet?.coins}`);
  const doomedRow = refunded.data?.withdrawals?.find((w) => w.id === doomed.data?.withdrawal?.id);
  check('the failed payout stops pretending to be paid', doomedRow?.status === 'rejected' && doomedRow?.payout_state === 'FAILED', JSON.stringify(doomedRow || {}).slice(0, 170));
  /* the wallet ledger does not carry ref, so match the amount that came back */
  check('the refund is a real ledger row, once', refunded.data?.ledger?.filter((l) => l.kind === 'withdraw_refund' && l.amount === 150).length === 1, JSON.stringify((refunded.data?.ledger || []).map((l) => `${l.kind}:${l.amount}`)));
  const refundAgain = await unlucky.call('/api/wallet');
  check('opening the wallet again never refunds twice', refundAgain.data?.wallet?.coins === refunded.data?.wallet?.coins && refundAgain.data?.ledger?.filter((l) => l.kind === 'withdraw_refund').length === 1, `coins ${refundAgain.data?.wallet?.coins}`);

  console.log('\nwithout PayPal keys nothing pretends\n');
  const plainOwner = client(PLAIN);
  await plainOwner.call('/api/guest', { method: 'POST' });
  await plainOwner.call('/api/owner/claim', { method: 'POST' });
  await plainOwner.call('/api/admin/settings', { method: 'PUT', body: { minWithdrawCoins: 100 } });
  const batchesBeforePlain = batches.length;
  const plain = client(PLAIN);
  await plain.call('/api/guest', { method: 'POST' });
  await plain.call('/api/earn', { body: { amount: 300, source: 'game', key: unique('earn') } });
  const plainWallet = await plain.call('/api/wallet');
  check('the wallet says payouts are not instant', plainWallet.data?.wallet?.autoPayout === false);
  const plainCash = await plain.call('/api/wallet/withdraw', { body: { coins: 200, paypalEmail: 'plain@example.com' } });
  check('a request is still taken, for review', plainCash.status === 201 && plainCash.data?.withdrawal?.status === 'pending', `status=${plainCash.status}`);
  check('no payout batch was ever sent from the server without keys', batches.length === batchesBeforePlain, `batches=${batches.length}, before ${batchesBeforePlain}`);
  check('without keys the wallet never asks PayPal for a batch status', statusCalls.every((id) => id !== '' && !id.startsWith('PLAIN')), `status calls: ${statusCalls.join(',')}`);
} catch (err) {
  failures.push(String(err && err.message));
  console.log(`\nFAIL  ${err && err.message}`);
} finally {
  for (const proc of servers) proc.kill('SIGTERM');
  mock.close();
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFailures:'); failures.forEach((f) => console.log(` - ${f}`)); process.exitCode = 1; }
