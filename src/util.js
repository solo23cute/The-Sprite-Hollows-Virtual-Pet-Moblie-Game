const APP_VERSION = '4.7.3';

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const chance = (p) => Math.random() < p;
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

let seedState = 0;
function seedRandom(seedStr) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  seedState = h >>> 0;
  return () => {
    seedState ^= seedState << 13;
    seedState ^= seedState >>> 17;
    seedState ^= seedState << 5;
    seedState >>>= 0;
    return seedState / 4294967296;
  };
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex({ r, g, b }) {
  const c = (v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}
function mix(a, b, t = 0.5) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex({
    r: A.r + (B.r - A.r) * t,
    g: A.g + (B.g - A.g) * t,
    b: A.b + (B.b - A.b) * t,
  });
}
const lighten = (hex, t = 0.3) => mix(hex, '#ffffff', t);
const darken = (hex, t = 0.3) => mix(hex, '#0a0614', t);

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}
function weekKey(d = new Date()) {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const offset = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - offset);
  return `W${dayKey(copy)}`;
}
function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function yearKey(d = new Date()) {
  return String(d.getFullYear());
}
function currentCheckinWindow(d = new Date()) {
  const hour = d.getHours();
  return CHECKIN_WINDOWS.find((w) => (w.from < w.to ? hour >= w.from && hour < w.to : hour >= w.from || hour < w.to)) || CHECKIN_WINDOWS[0];
}
/* Day length follows the season, so winter nights really are longer. */
function timePhase(d = new Date()) {
  const season = typeof seasonOf === 'function' ? seasonOf(d).key : 'spring';
  const hours = {
    winter: { dawn: 7, day: 9, dusk: 17, night: 19 },
    spring: { dawn: 6, day: 8, dusk: 19, night: 21 },
    summer: { dawn: 5, day: 7, dusk: 21, night: 22 },
    autumn: { dawn: 6, day: 8, dusk: 18, night: 20 },
  }[season] || { dawn: 5, day: 8, dusk: 17, night: 20 };
  const h = d.getHours();
  if (h >= hours.dawn && h < hours.day) return { key: 'dawn', label: 'Dawn', icon: '🌅' };
  if (h >= hours.day && h < hours.dusk) return { key: 'day', label: 'Day', icon: '☀️' };
  if (h >= hours.dusk && h < hours.night) return { key: 'dusk', label: 'Dusk', icon: '🌇' };
  return { key: 'night', label: 'Night', icon: '🌙' };
}
const now = () => Date.now();

/* ---------- season & weather helpers ---------- */

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Avalanche the bits so neighbouring time slots pick unrelated weather.
  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function seasonOf(d = new Date()) {
  const month = d.getMonth();
  return SEASON_KEYS.map((k) => SEASONS[k]).find((s) => s.months.includes(month)) || SEASONS.spring;
}

/* Weather holds for a three-hour stretch so it feels like real weather. */
function weatherSlot(d = new Date()) {
  return Math.floor(d.getTime() / (3 * 60 * 60 * 1000));
}

function weatherFor(seasonKey, climateKey, slot) {
  const season = SEASONS[seasonKey] || SEASONS.spring;
  const climate = CLIMATES[climateKey] || CLIMATES.temperate;
  const pool = Array.from(new Set([...season.weather, ...Object.keys(climate.extra || {})])).filter((k) => WEATHERS[k]);
  const weights = pool.map((k) => {
    const boost = WEATHERS[k].seasonBoost?.[season.key] ?? 1;
    if (!season.weather.includes(k)) return Math.max(0, boost * (climate.extra?.[k] || 0));
    const bias = climate.bias?.[k];
    return bias === 0 ? 0 : Math.max(0, boost * (bias ?? 1));
  });
  const total = weights.reduce((a, b) => a + b, 0);
  if (!total) return WEATHERS.clear;
  let roll = hash01(`${season.key}:${climate.key}:${slot}`) * total;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return WEATHERS[pool[i]];
  }
  return WEATHERS[pool[pool.length - 1]];
}

function currentWeather(d = new Date()) {
  const override = (typeof state !== 'undefined' && state.world && WEATHERS[state.world.weather])
    ? state.world.weather
    : null;
  if (override) return WEATHERS[override];
  const climate = (typeof state !== 'undefined' && state.world && CLIMATES[state.world.climate])
    ? state.world.climate
    : 'temperate';
  return weatherFor(seasonOf(d).key, climate, weatherSlot(d));
}

function seasonLabel(season, climateKey) {
  const climate = CLIMATES[climateKey] || CLIMATES.temperate;
  if (climate.key === 'tropical') {
    if (season.key === 'winter') return 'Wet season';
    if (season.key === 'summer') return 'Dry season';
  }
  if (climate.key === 'arctic' && season.key === 'summer') return 'Midnight sun';
  if (climate.key === 'arid' && season.key === 'winter') return 'Cold nights';
  return season.name;
}

function warmScore(s) {
  const gear = s ? ACCESSORIES[s.accessory] : null;
  return gear?.warm || 0;
}

function weatherEffects(s) {
  const wx = currentWeather();
  const chill = wx.chill || 0;
  const warm = warmScore(s);
  const comfort = Math.max(0.25, 1 - warm * 0.22);
  const fx = { joy: 1, energy: 1, clean: 1, hunger: 1 };
  if (chill > 0) {
    fx.energy *= 1 + 0.07 * chill * comfort;
    fx.joy *= 1 + 0.08 * chill * comfort;
    if (wx.wet) fx.clean *= 1 + 0.16 * comfort;
  }
  if (wx.hot) {
    fx.hunger *= 1.08;
    fx.energy *= 1.05;
  }
  if (wx.sunny) fx.joy *= 0.95;
  if (warm >= 2 && chill > 0) fx.energy *= 0.94;
  const element = s?.element;
  if (chill > 0 && (element === 'frost' || element === 'ice' || element === 'snow')) {
    fx.joy *= 0.86;
    fx.energy *= 0.92;
  }
  if (chill >= 2 && (element === 'ember' || element === 'fire')) fx.joy *= 1.12;
  return fx;
}

const esc = (str = '') =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function fmtTime(ts) {
  const s = Math.max(0, Math.ceil(ts / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${String(s % 60).padStart(2, '0')}s`;
}

function article(word = '') {
  return /^[aeiou]/i.test(String(word).trim()) ? 'an' : 'a';
}

function tapHaptic(ms = 8) {
  try {
    if (navigator.vibrate && document.body.dataset.haptics !== 'off') navigator.vibrate(ms);
  } catch { /* ignore */ }
}
