#!/usr/bin/env node
/* Owner access by passcode: claiming the Hollow, unlocking payout review from a
   guest session, refusing the wrong passcode and rate-limiting guesses.
   Run: node server/test-owner.mjs */
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

  console.log('\nOwner passcode checks\n');
  const boot = await client().call('/api/bootstrap');
  check('a fresh Hollow has no owner seat taken', boot.data?.needsSetup === true && boot.data?.ownerClaimed === false, JSON.stringify(boot.data).slice(0, 90));

  const early = client();
  check('payout review needs a session first', (await early.call('/api/admin/withdrawals')).status === 401);

  const owner = client();
  const join = await owner.call('/api/guest', { method: 'POST' });
  check('the owner can arrive as an ordinary guest', join.status === 201 && !!join.data?.token);
  check('a guest is not an owner yet', join.data?.user?.isAdmin === false);
  check('a short passcode is refused', (await owner.call('/api/owner/login', { body: { passcode: 'short' } })).status === 400);

  const claim = await owner.call('/api/owner/login', { body: { passcode: 'hollow-owner-9' } });
  check('the first passcode claims the Hollow', claim.status === 201 && claim.data?.claimed === true, `status=${claim.status}`);
  check('the claimer becomes the owner', claim.data?.owner?.isAdmin === true);

  const queue = await owner.call('/api/admin/withdrawals?status=pending');
  check('payout review opens with no sign-up', queue.status === 200 && Array.isArray(queue.data?.withdrawals), `status=${queue.status}`);
  check('the overview opens too', (await owner.call('/api/admin/overview')).status === 200);
  const boot2 = await client().call('/api/bootstrap');
  check('the Hollow reports itself claimed', boot2.data?.needsSetup === false && boot2.data?.ownerClaimed === true);

  const other = client();
  await other.call('/api/guest', { method: 'POST' });
  check('a player cannot review payouts', (await other.call('/api/admin/withdrawals')).status === 403);
  check('the wrong passcode is refused', (await other.call('/api/owner/login', { body: { passcode: 'not-the-code' } })).status === 403);
  check('the right passcode unlocks another session', (await other.call('/api/owner/login', { body: { passcode: 'hollow-owner-9' } })).status === 200);
  check('that session can review payouts', (await other.call('/api/admin/withdrawals')).status === 200);
  check('a second claim cannot seize the seat', (await client().call('/api/owner/login', { body: { passcode: 'hijack-attempt' } })).status === 401);

  /* the owner can still claim their own payout path: settings + a review */
  check('the owner can tune the payout minimum', (await owner.call('/api/admin/settings', { method: 'PUT', body: { minWithdrawCoins: 100 } })).status === 200);

  const guesser = client();
  await guesser.call('/api/guest', { method: 'POST' });
  let limited = false;
  for (let i = 0; i < 12; i++) {
    const attempt = await guesser.call('/api/owner/login', { body: { passcode: `wrong-guess-${i}` } });
    if (attempt.status === 429) { limited = true; break; }
  }
  check('repeated wrong passcodes are rate limited', limited);
} catch (err) {
  failures.push(String(err && err.message));
  console.log(`\nFAIL  ${err && err.message}`);
  if (log) console.log(log.slice(-600));
} finally {
  server.kill('SIGTERM');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFailures:'); failures.forEach((f) => console.log(` - ${f}`)); process.exitCode = 1; }
