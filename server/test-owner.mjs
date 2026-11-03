#!/usr/bin/env node
/* Owner access with no account and no code: the first session to open payout
   review takes the seat, everyone after that is a player, and the seat frees
   itself when the owner leaves. Run: node server/test-owner.mjs */
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.TEST_PORT || 4651);
const BASE = `http://127.0.0.1:${PORT}`;
const TMP = `/tmp/spritehollow-owner-test-${process.pid}`;
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
let log = '';
server.stdout.on('data', (d) => { log += d; });
server.stderr.on('data', (d) => { log += d; });

function client() {
  let token = '';
  return {
    token: () => token,
    async call(path, { method, body } = {}) {
      const res = await fetch(BASE + path, {
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

try {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(`${BASE}/api/health`)).ok) break; } catch { /* starting */ }
    await sleep(120);
  }

  console.log('\nOwner seat without a code\n');
  const boot = await client().call('/api/bootstrap');
  check('a fresh Hollow has no owner seat taken', boot.data?.needsSetup === true && boot.data?.ownerClaimed === false, JSON.stringify(boot.data).slice(0, 90));

  check('payout review needs a session first', (await client().call('/api/admin/withdrawals')).status === 401);

  const owner = client();
  const join = await owner.call('/api/guest', { method: 'POST' });
  check('the owner can arrive as an ordinary guest', join.status === 201 && !!join.data?.token);
  check('a brand-new guest is not an owner yet', join.data?.user?.isAdmin === false);

  /* the whole claim: no body, no passcode, no account */
  const claim = await owner.call('/api/owner/claim', { method: 'POST' });
  check('the first session claims the Hollow with nothing at all', claim.status === 201 && claim.data?.claimed === true, `status=${claim.status}`);
  check('the claimer becomes the owner', claim.data?.owner?.isAdmin === true);

  const again = await owner.call('/api/owner/claim', { method: 'POST' });
  check('claiming again is idempotent, not a second seat', again.status === 200 && again.data?.claimed === false, `status=${again.status}`);

  const queue = await owner.call('/api/admin/withdrawals?status=pending');
  check('payout review opens with no sign-up and no code', queue.status === 200 && Array.isArray(queue.data?.withdrawals), `status=${queue.status}`);
  check('the overview opens too', (await owner.call('/api/admin/overview')).status === 200);

  const boot2 = await client().call('/api/bootstrap');
  check('the Hollow reports itself claimed', boot2.data?.needsSetup === false && boot2.data?.ownerClaimed === true);

  const other = client();
  await other.call('/api/guest', { method: 'POST' });
  check('a player cannot review payouts', (await other.call('/api/admin/withdrawals')).status === 403);
  check('a player cannot claim the seat', (await other.call('/api/owner/claim', { method: 'POST' })).status === 403);
  check('posting a passcode-shaped body changes nothing', (await other.call('/api/owner/claim', { body: { passcode: 'hijack-attempt' } })).status === 403);
  check('an old build knocking on /owner/login is refused too', (await other.call('/api/owner/login', { body: { passcode: 'hijack-attempt' } })).status === 403);
  check('that player still cannot review payouts', (await other.call('/api/admin/withdrawals')).status === 403);

  check('the owner can tune the payout minimum', (await owner.call('/api/admin/settings', { method: 'PUT', body: { minWithdrawCoins: 100 } })).status === 200);

  const left = await owner.call('/api/account', { method: 'DELETE', body: { confirm: 'DELETE' } });
  check('the owner can delete their guest account', left.status === 200 && left.data?.unclaimed === true, JSON.stringify(left.data));

  const boot3 = await client().call('/api/bootstrap');
  check('the seat is free again, with no code left behind', boot3.data?.ownerClaimed === false && boot3.data?.needsSetup === true);

  const next = client();
  await next.call('/api/guest', { method: 'POST' });
  const reclaim = await next.call('/api/owner/claim', { method: 'POST' });
  check('the next session takes the free seat with no code', reclaim.status === 201 && reclaim.data?.claimed === true, `status=${reclaim.status}`);
  check('and can review payouts straight away', (await next.call('/api/admin/withdrawals?status=pending')).status === 200);
} catch (err) {
  failures.push(String(err && err.message));
  console.log(`\nFAIL  ${err && err.message}`);
  if (log) console.log(log.slice(-600));
} finally {
  server.kill('SIGTERM');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFailures:'); failures.forEach((f) => console.log(` - ${f}`)); process.exitCode = 1; }
