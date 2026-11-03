#!/usr/bin/env node
/* Checks the induction tour: every step is complete, the new features have
   steps, and inserting them kept every language's translations aligned.
   The tour reads dozens of collection totals, so unknown data globals are
   stubbed automatically and the bundle re-run until it loads.
   Run: node tools/tour-test.mjs */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const i18n = readFileSync(resolve(ROOT, 'src/i18n.js'), 'utf8');
const tour = readFileSync(resolve(ROOT, 'src/screens/tour.js'), 'utf8');

/* ${COUNT} in a template literal and COUNT.length both behave like a number. */
const stubValue = () => new Proxy(function () {}, {
  get: (_t, key) => {
    if (key === Symbol.toPrimitive) return () => 24;
    if (key === 'length') return 24;
    if (key === 'toString' || key === 'valueOf' || key === 'toLocaleString') return () => 24;
    return stubValue();
  },
  apply: () => stubValue(),
});

const el = () => new Proxy(function () {}, { get: () => el(), apply: () => el(), set: () => true });

function makeContext() {
  const store = new Map();
  const ctx = {
    console, setTimeout, clearTimeout, Promise, JSON, Math, Number, String, Boolean, Array, Object,
    Date, Error, URL, Intl, RegExp, isNaN, parseInt, parseFloat, Symbol,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
    navigator: { language: 'en', languages: ['en'], userAgent: 'node' },
    document: el(),
    __mk: stubValue,
    MAX_LEVEL: 1000,
    STAGE_ORDER: ['baby', 'child', 'teen', 'adult', 'highadult', 'elder', 'sensei'],
    STAGE_LABELS: { baby: 'Baby', child: 'Child', teen: 'Teen', adult: 'Adult', highadult: 'High Adult', elder: 'Elderly', sensei: 'Sensei' },
    STAGE_LEVEL: { baby: 1, child: 5, teen: 12, adult: 30, highadult: 60, elder: 100, sensei: 1000 },
    ELEMENT_KEYS: Array.from({ length: 240 }, (_, i) => `e${i}`),
    EVOLUTION_FORM_KEYS: Array.from({ length: 12 }, (_, i) => `f${i}`),
    BIOME_KEYS: Array.from({ length: 18 }, (_, i) => `b${i}`),
    collectionWaves: () => Array.from({ length: 9 }, (_, i) => ({ icon: '📚', label: `Wave ${i}`, count: () => 10 + i })),
    Sfx: { click() {} },
    toast() {},
    openSheet: () => ({ overlay: el(), close() {} }),
    Actions: {},
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  return ctx;
}

const probe = `
  globalThis.__tour = (() => {
    const steps = TOUR_STEPS;
    const kickers = steps.map((s) => s.kicker);
    const incomplete = steps.filter((s) => !s.icon || !s.kicker || !s.title || !s.text
      || !Array.isArray(s.points) || !s.points.length || !s.tip || s.text.length < 80
      || s.points.some((p) => typeof p !== 'string' || p.length < 8));
    const languages = Object.keys(TOUR_I18N).map((lang) => {
      const entries = TOUR_I18N[lang];
      return {
        lang,
        len: entries.length,
        nullsAtInsert: [3, 4, 5, 6].every((i) => entries[i] === null || entries[i] === undefined),
        keptHead: entries.slice(0, 3).every((e) => !!e),
        growthTitle: (entries[7] && entries[7].title) || null,
      };
    });
    const stale = [];
    const collect = (value, where) => {
      if (typeof value === 'string') {
        if (/(nivel|niveau|level)\s*30\b/i.test(value)) stale.push(where);
      } else if (Array.isArray(value)) {
        value.forEach((item, i) => collect(item, where + '[' + i + ']'));
      } else if (value && typeof value === 'object') {
        Object.keys(value).forEach((key) => collect(value[key], where + '.' + key));
      }
    };
    collect(steps.filter((s) => s.kicker !== 'STUCK SPRITES & REPAIR'), 'steps');
    collect(TOUR_I18N, 'i18n');

    const growth = TOUR_STEPS.find((s) => s.kicker === 'SPRITES & GROWTH');
    return {
      total: steps.length,
      kickers,
      incomplete: incomplete.map((s) => s.kicker),
      duplicateKickers: kickers.filter((k, i) => kickers.indexOf(k) !== i),
      lastStep: kickers[kickers.length - 1],
      window: kickers.slice(2, 8),
      languages,
      growthTitle: growth ? growth.title : null,
      staleCapWording: stale.slice(0, 6),
      staleCapCount: stale.length,
      newStepPoints: steps.filter((s) => ['COINS & CASH OUT', 'MYSTERY SHOP', 'STUCK SPRITES & REPAIR', 'SAVE BACKUP'].includes(s.kicker)).map((s) => [s.kicker, s.points.length]),
    };
  })();
`;

const stubs = new Set();
let ctx = makeContext();
let guard = 0;
for (;;) {
  const prelude = [...stubs].map((name) => `var ${name} = __mk();`).join('\n');
  try {
    vm.runInContext(`${prelude}\n;\n${i18n}\n;\n${tour}\n;\n${probe}`, ctx, { filename: 'tour-bundle.js' });
    break;
  } catch (err) {
    const missing = /^([A-Za-z_$][\w$]*) is not defined$/.exec((err && err.message) || '');
    if (!missing || guard++ > 80) {
      console.error(err);
      process.exit(1);
    }
    stubs.add(missing[1]);
    ctx = makeContext();
  }
}

const r = ctx.__tour;
let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) { passed++; console.log(`  ok  ${name}`); }
  else { failures.push(name); console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`); }
};

console.log(`\nInduction tour checks (${stubs.size} data globals stubbed)\n`);
check('every step has icon, kicker, title, text, points and tip', r.incomplete.length === 0, r.incomplete.join(', '));
check('no two steps share a kicker', r.duplicateKickers.length === 0, r.duplicateKickers.join(', '));
check('the tour still ends on READY', r.lastStep === 'READY', r.lastStep);
check('the coin wallet has its own step', r.kickers.includes('COINS & CASH OUT'));
check('the mystery shop has its own step', r.kickers.includes('MYSTERY SHOP'));
check('the stuck-sprite rescue and repair tool have a step', r.kickers.includes('STUCK SPRITES & REPAIR'));
check('save backup has its own step', r.kickers.includes('SAVE BACKUP'));
check(
  'the new steps sit between the Nest and growth',
  JSON.stringify(r.window) === JSON.stringify(['THE NEST', 'COINS & CASH OUT', 'MYSTERY SHOP', 'STUCK SPRITES & REPAIR', 'SAVE BACKUP', 'SPRITES & GROWTH']),
  r.window.join(' → '),
);
check('the growth step still tracks MAX_LEVEL', /1,000/.test(r.growthTitle || ''), r.growthTitle);

check('no step still describes the old level-30 cap', r.staleCapCount === 0, `${r.staleCapCount}: ${r.staleCapWording.join(', ')}`);
check('each new step carries at least three points', r.newStepPoints.every(([, n]) => n >= 3), JSON.stringify(r.newStepPoints));

for (const lang of r.languages) {
  check(`${lang.lang}: the new steps fall back to English`, lang.nullsAtInsert === true);
  check(`${lang.lang}: the growth step text moved with it to index 7`, /nivel 1[., ]?000|niveau 1[., ]?000/i.test(lang.growthTitle || ''), lang.growthTitle);
  check(`${lang.lang}: the steps it already covered are still translated`, lang.len >= 19 && lang.keptHead === true, `${lang.len} entries`);
}

console.log(`\n${passed} passed, ${failures.length} failed across ${r.languages.length} languages`);
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(` - ${f}`);
  process.exitCode = 1;
}
