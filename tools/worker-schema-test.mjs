#!/usr/bin/env node
/* The deployed Worker must migrate a database that already has tables, not just
   a brand new one. This drives the real bundle against a stub D1 and checks the
   SQL it hands over.
   Run: node tools/worker-schema-test.mjs */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};

function fakeDb({ existingTables }) {
  const ran = [];
  const db = {
    ran,
    prepare(sql) {
      const stmt = {
        bind: () => stmt,
        first: async () => (sql.includes('sqlite_master')
          ? (existingTables.length ? { name: existingTables[0] } : null)
          : null),
        all: async () => ({ results: [] }),
        run: async () => { ran.push(sql.trim()); return { meta: { changes: 1, last_row_id: 1 } }; },
      };
      return stmt;
    },
    batch: async () => [],
  };
  return db;
}

async function boot(db) {
  const worker = (await import(`file://${ROOT}/deploy/worker.js?case=${encodeURIComponent(db.ran.length + Math.random())}`)).default;
  const res = await worker.fetch(new Request('https://hollow.test/api/health'), {
    DB: db,
    ASSETS: { fetch: () => new Response('asset') },
  });
  return res;
}

console.log('\nWorker schema + migration checks\n');

const upgraded = fakeDb({ existingTables: ['ledger'] });
const upgradedRes = await boot(upgraded);
check('an existing database still answers the API', upgradedRes.status === 200, `status=${upgradedRes.status}`);
check('migrations run when the tables already exist', upgraded.ran.some((sql) => /ALTER TABLE withdrawals ADD COLUMN payment_reference/i.test(sql)), upgraded.ran.join(' | ').slice(0, 200));
check('existing tables are not re-created bare', !upgraded.ran.some((sql) => /^CREATE TABLE(?!\s+IF\s+NOT\s+EXISTS)/i.test(sql)), upgraded.ran.join(' | ').slice(0, 200));
check('a table added later is created on an existing database', upgraded.ran.some((sql) => /CREATE TABLE IF NOT EXISTS earn_claims/i.test(sql)), upgraded.ran.join(' | ').slice(0, 200));

const fresh = fakeDb({ existingTables: [] });
const freshRes = await boot(fresh);
check('a fresh database answers the API', freshRes.status === 200, `status=${freshRes.status}`);
check('a fresh database gets its tables', fresh.ran.some((sql) => /^CREATE TABLE IF NOT EXISTS withdrawals/i.test(sql)));
check('a fresh database also gets the migration', fresh.ran.some((sql) => /ALTER TABLE withdrawals ADD COLUMN payment_reference/i.test(sql)));
check('the payout reference is in the schema the queries use', readFileSync(resolve(ROOT, 'server/schema.sql'), 'utf8').includes('payment_reference TEXT'));
check('the migration list is generated into the bundle', readFileSync(resolve(ROOT, 'deploy/schema.js'), 'utf8').includes('MIGRATIONS'));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFailures:'); failures.forEach((f) => console.log(` - ${f}`)); process.exitCode = 1; }
