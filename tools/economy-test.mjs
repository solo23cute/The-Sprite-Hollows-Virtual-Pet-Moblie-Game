#!/usr/bin/env node
/* Checks the Rewards screen (src/economy.js): it renders real state, lists the
   quests the game already tracks, claims through Actions, spins once a day and
   never invents its own numbers.
   Run: node tools/economy-test.mjs */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const code = readFileSync(resolve(ROOT, 'src/economy.js'), 'utf8');

let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};

function boot({ spin = null } = {}) {
  const calls = { claims: [], spins: 0 };
  const toasts = [];
  let currentBody = '';
  let sheetOpts = null;

  const tasks = {
    daily: [{ id: 'd1', stat: 'games', goal: 3, reward: 100, xp: 20, label: 'Play 3 games', claimed: false }],
    weekly: [{ id: 'w1', stat: 'wins', goal: 15, reward: 450, xp: 30, label: 'Win 15 matches', claimed: false }],
    monthly: [{ id: 'm1', stat: 'pets', goal: 20, reward: 700, xp: 40, label: 'Pet 20 sprites', claimed: true }],
  };
  const progress = { d1: 2, w1: 15, m1: 20 };

  /* Buttons are re-parsed from whatever the sheet currently shows, and the same
     instance is handed back each time, so a listener attached by the module is
     the one the test clicks. A redraw clears the registry like the DOM would. */
  let registry = new Map();
  const fakeFor = (key) => {
    if (!registry.has(key)) {
      const handlers = [];
      registry.set(key, { dataset: {}, disabled: false, addEventListener: (_t, fn) => handlers.push(fn), click: () => handlers.forEach((fn) => fn()) });
    }
    return registry.get(key);
  };
  const host = {
    querySelectorAll: (sel) => {
      if (sel !== '[data-claim]') return [];
      return [...currentBody.matchAll(/data-claim="([a-z]+):([^"]+)"([^>]*)>/g)].map((m) => {
        const fake = fakeFor(`claim:${m[1]}:${m[2]}`);
        fake.dataset.claim = `${m[1]}:${m[2]}`;
        fake.disabled = /\sdisabled/.test(m[3]);
        return fake;
      });
    },
    querySelector: (sel) => {
      if (sel === '.sheet-body') return { get innerHTML() { return currentBody; }, set innerHTML(v) { currentBody = v; registry = new Map(); } };
      if (sel === '[data-spin]') return fakeFor('spin');
      return null;
    },
  };

  const ctx = {
    console, setTimeout, clearTimeout, Promise, JSON, Math, Number, String, Boolean, Array, Object, Date, Error,
    dayKey: () => '2026-11-03',
    SPIN_PRIZES: [25, 50, 100, 250, 500],
    state: {
      coins: 12450,
      checkin: { streak: 5 },
      sprites: [{ level: 7, stage: 'adult' }, { level: 1, stage: 'egg' }],
      daily: { tasks: tasks.daily },
      weekly: { tasks: tasks.weekly },
      monthly: { tasks: tasks.monthly },
      spin,
    },
    periodCounter: (task) => progress[task.id] || 0,
    taskLabel: (t) => t.label,
    icon: () => '',
    toast: (m) => toasts.push(m),
    openSheet: (opts) => { sheetOpts = opts; currentBody = opts.body; if (opts.onMount) opts.onMount(host); return { close() {} }; },
    Actions: {
      claimTask: (id, period) => { calls.claims.push([id, period]); return { ok: true, reward: 450 }; },
      spinWheel: () => { calls.spins += 1; return { ok: true, reward: 250 }; },
    },
    updateBadges: () => {},
    updateTopbar: () => {},
    document: { querySelector: () => null, addEventListener: () => {} },
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: 'src/economy.js' });
  return { ctx, host, calls, toasts, sheet: () => sheetOpts, body: () => currentBody };
}

console.log('\nRewards screen checks\n');

const app = boot();
check('the module loads into the app', typeof app.ctx.Economy?.open === 'function');
const sheet = app.ctx.Economy.open();
check('it opens as a normal sheet', app.sheet()?.title === 'Rewards' && typeof sheet?.close === 'function', app.sheet()?.title);
check('the sheet explains itself', /Hollow/i.test(app.sheet()?.sub || ''));

const body = app.body();
check('coins come from the real state', body.includes('12,450'), 'coins missing');
check('the check-in streak is shown', body.includes('5 days'));
check('the best sprite level is shown', body.includes('Lv 7'));
check('hatched sprites exclude the egg', body.includes('1 sprite hatched'));
check('quest progress is counted', body.includes('1/3'), 'claimed/total missing');
check('all three quest periods are listed', ['Today', 'This week', 'This month'].every((l) => body.includes(l)));
check('quest rows use the game labels', body.includes('Play 3 games') && body.includes('Win 15 matches'));
check('progress bars use real counters', body.includes('2 / 3') && body.includes('15 / 15'));
check('finished quests show Claimed, not a button', /Claimed/.test(body));
check('the spin prizes are listed', [25, 50, 100, 250, 500].every((p) => body.includes(`>${p}<`)));

const buttons = app.host.querySelectorAll('[data-claim]');
const daily = buttons.find((b) => b.dataset.claim === 'daily:d1');
const weekly = buttons.find((b) => b.dataset.claim === 'weekly:w1');
check('a quest short of its goal cannot be claimed', daily.disabled === true);
check('a finished quest can be claimed', weekly.disabled === false && /Claim \+450/.test(body));

weekly.click();
check('claiming goes through Actions.claimTask', app.calls.claims.length === 1 && app.calls.claims[0][0] === 'w1' && app.calls.claims[0][1] === 'weekly',
  JSON.stringify(app.calls.claims));

const spinBtn = app.host.querySelector('[data-spin]');
check('the spin button is present and enabled', !!spinBtn && !/disabled/.test(app.body().match(/data-spin([^>]*)>/)?.[1] || ''));
spinBtn.click();
check('spinning goes through Actions.spinWheel', app.calls.spins === 1);

const summary = app.ctx.Economy.summary();
check('summary reports the real numbers', summary.coins === 12450 && summary.streak === 5 && summary.bestLevel === 7, JSON.stringify(summary));
check('summary counts ready and claimed quests', summary.ready === 1 && summary.claimed === 1 && summary.total === 3, JSON.stringify(summary));

const spun = boot({ spin: { date: '2026-11-03', reward: 250 } });
spun.ctx.Economy.open();
check('a used spin says so', /Spun today/.test(spun.body()) && /Come back tomorrow/.test(spun.body()));
check('the used spin shows what it paid', /\+250/.test(spun.body()));
check('the used spin button is disabled', /data-spin[^>]*disabled/.test(spun.body()));
check('a spin on a past day is ready again', boot({ spin: { date: '2026-10-01', reward: 25 } }).ctx.Economy.summary().spun === false);

/* the real game files must actually expose what the sheet calls */
const stateSource = readFileSync(resolve(ROOT, 'src/state.js'), 'utf8');
check('state keeps the spin across reloads', /merged\.spin = parsed\.spin/.test(stateSource) && /spin: null,/.test(stateSource));
check('state pays the spin through the coin ledger', /spinWheel\(\)[\s\S]{0,400}addCoinsRaw\(prize\)/.test(stateSource));
check('the game loads the screen', readFileSync(resolve(ROOT, 'index.html'), 'utf8').includes('src/economy.js'));
const mainSource = readFileSync(resolve(ROOT, 'src/main.js'), 'utf8');
check('the top bar has the button and a handler', mainSource.includes('data-rewards') && /data-rewards\]'\)\?\.addEventListener/.test(mainSource));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log('\nFailures:'); failures.forEach((f) => console.log(` - ${f}`)); process.exitCode = 1; }
