/* Sprite Hollow Pet Earn — server core.
   Runs unchanged on a Cloudflare Worker (D1) and on the local Node dev server
   (node:sqlite). Every coin, need value and withdrawal status is computed here:
   the browser can only ask for actions, never assert a balance.

   Design notes
   - Coins are a ledger: balance = SUM(ledger.amount). Nothing stores a mutable
     balance, so no client request can hand itself coins.
   - Pet needs decay from pets.updated_at, so closing the app still costs care.
   - Minigame scores are recomputed from a server seed, so a claimed score has
     to match a schedule the player could actually have played.
   - Withdrawals debit the ledger in the same statement that inserts the
     request; only an admin transition can reject (refund) or mark paid. */

export const SESSION_COOKIE = 'cp_session';

/* Owner access without an account and without a code: the first session to open
   payout review takes the seat. The old passcode key is kept only so an upgraded
   Hollow can clear the stale hash when its owner leaves. */
const LEGACY_OWNER_PASSCODE_KEY = 'owner_passcode';
/* The packaged Android build is a different origin (appassets.androidplatform.net),
   so it cannot rely on a SameSite cookie. Those clients send the session as a
   bearer token and are allowed through by origin. */
export const SESSION_TTL_MS = 30 * 24 * 3600 * 1000;

export const DEFAULT_SETTINGS = {
  coins_per_dollar: '1000',
  min_withdraw_coins: '5000',
  daily_care_coin_cap: '250',
  daily_game_coin_cap: '600',
  daily_care_cap: '40',
  daily_game_cap: '20',
  daily_withdraw_cap: '2',
};

const CARE = {
  feed: { stat: 'hunger', gain: 38, base: 10, cooldown: 20_000, label: 'Feeding', verb: 'fed' },
  clean: { stat: 'cleanliness', gain: 34, base: 12, cooldown: 30_000, label: 'Bath', verb: 'cleaned' },
  play: { stat: 'happiness', gain: 30, base: 14, cooldown: 25_000, label: 'Play', verb: 'played with' },
};

const GAMES = {
  motes: { name: 'Mote Tap', coinsPerPoint: 5, perfectBonus: 20, cooldown: 20_000, maxScore: 12 },
  guard: { name: 'Garden Guard', coinsPerPoint: 4, perfectBonus: 25, cooldown: 30_000, maxScore: 14 },
};

const MIN_REACTION_MS = 160;
const RUN_TTL_MS = 4 * 60 * 1000;
const DECAY = { hunger: 5.5, cleanliness: 4.2, happiness: 4.6 };
const MAX_DECAY_HOURS = 96;

class ApiError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}
const fail = (status, message, extra) => { throw new ApiError(status, message, extra); };

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const round1 = (n) => Math.round(n * 10) / 10;
const round2 = (n) => Math.round(n * 100) / 100;
const toInt = (value, fallback = 0) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
};
const num = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

function dayKey(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}
function yesterdayKey(ms) {
  return dayKey(ms - 86400000);
}
function cut(text, max) {
  return String(text ?? '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max);
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const encoder = new TextEncoder();
function hex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function randomToken(bytes = 32) {
  const raw = new Uint8Array(bytes);
  crypto.getRandomValues(raw);
  return hex(raw);
}
async function sha256(text) {
  return hex(await crypto.subtle.digest('SHA-256', encoder.encode(text)));
}

/* Cloudflare Workers rejects PBKDF2 above 100,000 iterations, so guest and
   owner accounts hash at the platform maximum. Stored hashes carry their own
   iteration count, so older 150,000 hashes keep verifying. */
const PBKDF2_ITERATIONS = 100000;
async function hashPassword(password) {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${hex(salt)}$${hex(bits)}`;
}

async function verifyPassword(password, stored) {
  const parts = String(stored || '').split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = toInt(parts[1], 0);
  if (iterations <= 0) return false;
  const salt = new Uint8Array(parts[2].match(/.{2}/g)?.map((b) => parseInt(b, 16)) || []);
  const expected = parts[3];
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, 256);
  const actual = hex(bits);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/* ---------- pet model (pure) ---------- */

function projectPet(row, nowMs) {
  const hours = Math.min(Math.max((nowMs - row.updated_at) / 3600000, 0), MAX_DECAY_HOURS);
  let hunger = row.hunger - DECAY.hunger * hours;
  let cleanliness = row.cleanliness - DECAY.cleanliness * hours;
  let happiness = row.happiness - DECAY.happiness * hours;
  if (hunger < 30) happiness -= 3 * hours;
  if (cleanliness < 30) happiness -= 3 * hours;
  hunger = clamp(round1(hunger));
  cleanliness = clamp(round1(cleanliness));
  happiness = clamp(round1(happiness));
  const health = Math.round((hunger + cleanliness + happiness) / 3);
  return {
    hunger,
    cleanliness,
    happiness,
    health,
    mood: moodFor({ hunger, cleanliness, happiness }),
    multiplier: round2(moodMultiplier(health)),
    decayed: hours > 0.02,
  };
}

function moodFor({ hunger, cleanliness, happiness }) {
  if (hunger < 25 || cleanliness < 25 || happiness < 25) return 'sad';
  if (hunger < 45 && hunger <= cleanliness && hunger <= happiness) return 'hungry';
  if (cleanliness < 45 && cleanliness <= happiness) return 'dirty';
  if (happiness < 45) return 'sad';
  return 'happy';
}

function moodMultiplier(health) {
  return 0.6 + (health / 100) * 0.9; // 0.6 at zero needs, 1.5 at a perfect pet
}

function streakBonus(streak) {
  return 1 + Math.min(Math.max(streak - 1, 0), 7) * 0.05;
}

function effectiveStreak(row, nowMs) {
  if (!row.last_care_day) return 0;
  const today = dayKey(nowMs);
  if (row.last_care_day === today || row.last_care_day === yesterdayKey(nowMs)) return row.streak;
  return 0;
}

/* ---------- minigames (pure, seeded) ---------- */

function seedRng(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return () => {
    h ^= h << 13; h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5; h >>>= 0;
    return h / 4294967296;
  };
}

function buildRounds(game, seed) {
  const rnd = seedRng(`${game}:${seed}`);
  const count = game === 'guard' ? 14 : 12;
  const rounds = [];
  let at = 1400;
  for (let i = 0; i < count; i++) {
    const window = game === 'guard' ? 1050 : Math.max(900, 1500 - i * 45);
    rounds.push({
      i,
      at: Math.round(at),
      window,
      cell: Math.floor(rnd() * 9),
      kind: game === 'guard' ? (rnd() < 0.45 ? 'thistle' : 'mote') : 'mote',
    });
    at += window + 550 + Math.round(rnd() * 450);
  }
  if (game === 'guard') {
    // Guarantee a real mix of taps and holds whatever the seed produced.
    const ensure = (kind, minimum) => {
      let have = rounds.filter((r) => r.kind === kind).length;
      for (const r of rounds) {
        if (have >= minimum) break;
        if (r.kind !== kind) { r.kind = kind; have++; }
      }
    };
    ensure('thistle', 4);
    ensure('mote', 4);
  }
  return rounds;
}

function scoreRun(game, rounds, taps) {
  if (taps == null) taps = [];
  if (!Array.isArray(taps)) fail(400, 'Send the taps from your run.');
  if (taps.length > 80) fail(400, 'That is more taps than this game has.');
  const first = new Map();
  for (const tap of taps) {
    if (!tap || typeof tap !== 'object') continue;
    const index = toInt(tap.i, -1);
    const time = num(tap.t, NaN);
    if (index < 0 || index >= rounds.length || !Number.isFinite(time)) continue;
    if (time < 0 || time > 300000) continue;
    if (!first.has(index)) first.set(index, { t: time, c: toInt(tap.c, -1) });
  }
  let score = 0;
  for (const round of rounds) {
    const tap = first.get(round.i);
    const inWindow = tap && tap.t >= round.at + MIN_REACTION_MS && tap.t <= round.at + round.window;
    const hit = inWindow && tap.c === round.cell;
    if (game === 'guard') {
      // A bee must be tapped in its own plot; a thistle must not be tapped at all.
      if (round.kind === 'mote' ? hit : !tap) score++;
    } else if (hit) {
      score++;
    }
  }
  return score;
}

function runDuration(rounds) {
  const last = rounds[rounds.length - 1];
  return last.at + last.window;
}

/* ---------- core ---------- */

export function createCore({ store, env = {}, clock = () => Date.now() }) {
  const now = () => clock();
  const isSecure = (request) => new URL(request.url).protocol === 'https:';
  const adminInviteCode = String(env.ADMIN_INVITE_CODE || '').trim();
  const allowedOrigins = String(env.APP_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (!allowedOrigins.includes('https://appassets.androidplatform.net')) {
    allowedOrigins.push('https://appassets.androidplatform.net');
  }
  const corsOrigin = (request) => {
    const origin = request.headers.get('origin');
    return origin && allowedOrigins.includes(origin) ? origin : null;
  };
  const corsHeaders = (request) => {
    const origin = corsOrigin(request);
    if (!origin) return {};
    return {
      'access-control-allow-origin': origin,
      'access-control-allow-credentials': 'true',
      'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
      'access-control-allow-headers': 'content-type, authorization',
      'access-control-max-age': '86400',
      vary: 'Origin',
    };
  };

  async function readSettings() {
    const rows = await store.all('SELECT key, value FROM settings');
    const map = { ...DEFAULT_SETTINGS };
    for (const row of rows) map[row.key] = row.value;
    return map;
  }

  /* A stored zero or a negative would quietly switch a limit off, so every
     economy number falls back to its default unless it is a positive number. */
  function positive(value, fallback) {
    const n = num(value, fallback);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  /* A cap of zero is a deliberate "not today" and only ever pays out less, so
     it is kept; a negative or nonsense cap falls back to the default. */
  function nonNegative(value, fallback) {
    const n = num(value, fallback);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  }

  function publicSettings(map) {
    return {
      coinsPerDollar: positive(map.coins_per_dollar, 1000),
      minWithdrawCoins: positive(map.min_withdraw_coins, 5000),
      dailyCareCoinCap: nonNegative(map.daily_care_coin_cap, 250),
      dailyGameCoinCap: nonNegative(map.daily_game_coin_cap, 600),
      dailyCareCap: nonNegative(map.daily_care_cap, 40),
      dailyGameCap: nonNegative(map.daily_game_cap, 20),
    };
  }

  async function balanceOf(userId) {
    const row = await store.get('SELECT COALESCE(SUM(amount), 0) AS coins FROM ledger WHERE user_id = ?', [userId]);
    return Math.max(0, toInt(row?.coins, 0));
  }


  async function petRow(userId) {
    const row = await store.get('SELECT * FROM pets WHERE user_id = ?', [userId]);
    if (!row) fail(409, 'No pet on this account yet.');
    return row;
  }

  async function loadPet(userId, { persist = true } = {}) {
    const row = await petRow(userId);
    const pet = projectPet(row, now());
    if (persist && pet.decayed) {
      await store.run(
        'UPDATE pets SET hunger = ?, cleanliness = ?, happiness = ?, updated_at = ? WHERE user_id = ?',
        [pet.hunger, pet.cleanliness, pet.happiness, now(), userId],
      );
    }
    return { row, pet };
  }

  async function dailyRow(userId, day) {
    await store.run('INSERT INTO daily (user_id, day) VALUES (?, ?) ON CONFLICT(user_id, day) DO NOTHING', [userId, day]);
    return store.get('SELECT * FROM daily WHERE user_id = ? AND day = ?', [userId, day]);
  }

  function readToken(request) {
    const header = request.headers.get('authorization') || '';
    if (/^bearer\s+/i.test(header)) return header.replace(/^bearer\s+/i, '').trim();
    return readCookie(request, SESSION_COOKIE);
  }

  function readCookie(request, name) {
    const raw = request.headers.get('cookie') || '';
    for (const part of raw.split(';')) {
      const [key, ...rest] = part.trim().split('=');
      if (key === name) return rest.join('=');
    }
    return null;
  }

  function sessionCookie(request, token, maxAgeSeconds) {
    const secure = isSecure(request) ? '; Secure' : '';
    return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
  }

  async function currentUser(request) {
    const token = readToken(request);
    if (!token) return null;
    const tokenHash = await sha256(token);
    const row = await store.get(
      `SELECT u.id, u.username, u.is_admin, u.created_at, s.expires_at
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.token_hash = ?`,
      [tokenHash],
    );
    if (!row) return null;
    if (row.expires_at < now()) {
      await store.run('DELETE FROM sessions WHERE token_hash = ?', [tokenHash]);
      return null;
    }
    return { id: row.id, username: row.username, isAdmin: !!row.is_admin, tokenHash };
  }

  async function requireUser(request) {
    const user = await currentUser(request);
    if (!user) fail(401, 'Sign in to continue.');
    await store.run('UPDATE users SET last_seen_at = ? WHERE id = ?', [now(), user.id]);
    return user;
  }

  async function requireAdmin(request) {
    const user = await requireUser(request);
    if (!user.isAdmin) fail(403, 'Admin access only.');
    return user;
  }

  async function startSession(request, userId) {
    const token = randomToken(32);
    const tokenHash = await sha256(token);
    const createdAt = now();
    await store.run(
      'INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)',
      [tokenHash, userId, createdAt, createdAt + SESSION_TTL_MS],
    );
    return { cookie: sessionCookie(request, token, Math.floor(SESSION_TTL_MS / 1000)), token };
  }

  async function readJson(request) {
    const type = request.headers.get('content-type') || '';
    if (!type.includes('application/json')) fail(415, 'Send a JSON body.');
    const text = await request.text();
    if (text.length > 20000) fail(413, 'That request is too large.');
    try {
      return JSON.parse(text || '{}');
    } catch {
      return fail(400, 'That request was not valid JSON.');
    }
  }

  function sameOrigin(request) {
    const origin = request.headers.get('origin');
    if (!origin) return true; // same-origin fetches and non-browser clients
    try {
      return new URL(origin).host === new URL(request.url).host;
    } catch {
      return false;
    }
  }

  function snapshotPet(row, pet, streak) {
    return {
      name: row.name,
      hunger: pet.hunger,
      cleanliness: pet.cleanliness,
      happiness: pet.happiness,
      health: pet.health,
      mood: pet.mood,
      multiplier: pet.multiplier,
      streak,
      streakBonus: round2(streakBonus(streak)),
      totalCare: row.total_care,
      createdAt: row.created_at,
      cooldowns: {
        feed: Math.max(0, (row.last_feed_at || 0) + CARE.feed.cooldown - now()),
        clean: Math.max(0, (row.last_clean_at || 0) + CARE.clean.cooldown - now()),
        play: Math.max(0, (row.last_play_at || 0) + CARE.play.cooldown - now()),
      },
    };
  }

  async function dailySnapshot(userId, day, settings) {
    const row = await dailyRow(userId, day);
    const pub = publicSettings(settings);
    return {
      careCount: toInt(row?.care_count),
      careCoins: toInt(row?.care_coins),
      gameRuns: toInt(row?.game_runs),
      gameCoins: toInt(row?.game_coins),
      withdrawCount: toInt(row?.withdraw_count),
      caps: {
        careCoins: pub.dailyCareCoinCap,
        gameCoins: pub.dailyGameCoinCap,
        careActions: pub.dailyCareCap,
        gameRuns: pub.dailyGameCap,
      },
    };
  }

  async function walletSnapshot(userId, settings) {
    const pub = publicSettings(settings);
    const coins = await balanceOf(userId);
    const earned = await store.get(
      'SELECT COALESCE(SUM(amount), 0) AS total FROM ledger WHERE user_id = ? AND amount > 0',
      [userId],
    );
    const held = await store.get(
      "SELECT COALESCE(SUM(coins), 0) AS coins, COUNT(*) AS n FROM withdrawals WHERE user_id = ? AND status IN ('pending', 'approved')",
      [userId],
    );
    const paidUsd = await store.get(
      "SELECT COALESCE(SUM(usd_cents), 0) AS cents FROM withdrawals WHERE user_id = ? AND status = 'paid'",
      [userId],
    );
    const verified = await store.get(
      "SELECT COALESCE(SUM(amount), 0) AS total FROM ledger WHERE user_id = ? AND amount > 0 AND kind <> 'withdraw_refund'",
      [userId],
    );
    const reserved = toInt(held?.coins);
    return {
      coins,
      usd: round2(coins / Math.max(1, pub.coinsPerDollar)),
      lifetimeEarned: toInt(earned?.total),
      /* Earnings drop straight into the balance, so nothing is ever waiting to
         be verified; what is held is coins already committed to a payout. */
      verified: toInt(verified?.total),
      pending: 0,
      reserved,
      available: Math.max(0, coins),
      paid: round2(toInt(paidUsd?.cents) / 100),
      openRequests: toInt(held?.n),
      hasOpenWithdrawal: toInt(held?.n) > 0,
      coinsPerDollar: pub.coinsPerDollar,
      minWithdrawCoins: pub.minWithdrawCoins,
    };
  }

  async function mePayload(user) {
    const settings = await readSettings();
    const { row, pet } = await loadPet(user.id);
    const streak = effectiveStreak(row, now());
    return {
      user: { id: user.id, username: user.username, isAdmin: user.isAdmin },
      pet: snapshotPet(row, pet, streak),
      wallet: await walletSnapshot(user.id, settings),
      today: await dailySnapshot(user.id, dayKey(now()), settings),
      settings: publicSettings(settings),
      serverTime: now(),
    };
  }

  /* ---------- handlers ---------- */

  async function signup(request) {
    const body = await readJson(request);
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '');
    const petName = cut(body.petName, 24);
    const inviteCode = String(body.inviteCode || '').trim().toUpperCase();

    if (!/^[a-z0-9_]{3,20}$/.test(username)) fail(400, 'Use 3-20 letters, numbers or underscores for a name.');
    if (password.length < 8) fail(400, 'Passwords need at least 8 characters.');
    if (!petName) fail(400, 'Give your pet a name.');

    const existing = await store.get('SELECT id FROM users WHERE username = ?', [username]);
    if (existing) fail(409, 'That name is taken. Try another.');

    // Nobody needs a code to play: guests are created without signing in at all,
    // and an account is optional. The first account that claims ownership becomes
    // the payout owner. An invite code is still honoured when one is supplied, so
    // codes already handed out keep working, but it is never required.
    const adminRow = await store.get('SELECT COUNT(*) AS n FROM users WHERE is_admin = 1');
    const isFirstUser = toInt(adminRow?.n) === 0;
    const isAdmin = isFirstUser;
    let invite = null;
    if (inviteCode) {
      invite = await store.get('SELECT * FROM invites WHERE code = ? AND used_by IS NULL', [inviteCode]);
    }
    const passwordHash = await hashPassword(password);
    const createdAt = now();

    const created = await store.run(
      'INSERT INTO users (username, password_hash, is_admin, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?)',
      [username, passwordHash, isAdmin ? 1 : 0, createdAt, createdAt],
    );
    const userId = created.lastRowId;
    if (!userId) fail(500, 'Could not create the account.');

    const signupStatements = [
      {
        sql: `INSERT INTO pets (user_id, name, hunger, cleanliness, happiness, updated_at, created_at)
              VALUES (?, ?, 80, 80, 80, ?, ?)`,
        params: [userId, petName, createdAt, createdAt],
      },
      {
        sql: `INSERT INTO ledger (user_id, kind, amount, source, note, created_at)
              VALUES (?, 'welcome', 250, 'welcome', 'Welcome to Sprite Hollow Pet Earn', ?)`,
        params: [userId, createdAt],
      },
    ];
    if (invite) {
      signupStatements.push({
        sql: 'UPDATE invites SET used_by = ?, used_at = ? WHERE code = ? AND used_by IS NULL',
        params: [userId, createdAt, invite.code],
      });
    }
    await store.batch(signupStatements);

    const session = await startSession(request, userId);
    const settings = await readSettings();
    const { row, pet } = await loadPet(userId, { persist: false });
    return json({
      token: session.token,
      user: { id: userId, username, isAdmin },
      pet: snapshotPet(row, pet, effectiveStreak(row, now())),
      wallet: await walletSnapshot(userId, settings),
      today: await dailySnapshot(userId, dayKey(now()), settings),
      settings: publicSettings(settings),
      serverTime: now(),
    }, 201, { 'Set-Cookie': session.cookie });
  }

  async function login(request) {
    const body = await readJson(request);
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!username || !password) fail(400, 'Enter your name and password.');

    const since = now() - 10 * 60 * 1000;
    const attempts = await store.get(
      'SELECT COUNT(*) AS n FROM login_attempts WHERE username = ? AND created_at > ?',
      [username, since],
    );
    if (toInt(attempts?.n) >= 12) fail(429, 'Too many attempts. Wait a few minutes.');

    const row = await store.get('SELECT * FROM users WHERE username = ?', [username]);
    const valid = row ? await verifyPassword(password, row.password_hash) : false;
    if (!valid) {
      await store.run('INSERT INTO login_attempts (username, created_at) VALUES (?, ?)', [username, now()]);
      fail(401, 'That name and password do not match.');
    }

    await store.run('DELETE FROM login_attempts WHERE username = ?', [username]);
    await store.run('DELETE FROM sessions WHERE expires_at < ?', [now()]);
    const session = await startSession(request, row.id);
    const settings = await readSettings();
    const { row: pet, pet: projected } = await loadPet(row.id);
    return json({
      token: session.token,
      user: { id: row.id, username: row.username, isAdmin: !!row.is_admin },
      pet: snapshotPet(pet, projected, effectiveStreak(pet, now())),
      wallet: await walletSnapshot(row.id, settings),
      today: await dailySnapshot(row.id, dayKey(now()), settings),
      settings: publicSettings(settings),
      serverTime: now(),
    }, 200, { 'Set-Cookie': session.cookie });
  }

  async function logout(request) {
    const token = readToken(request);
    if (token) await store.run('DELETE FROM sessions WHERE token_hash = ?', [await sha256(token)]);
    return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(request, '', 0) });
  }

  /* Leaving for good: sessions, pet, ledger and payout history go with the
     account. A real account confirms its password; a guest only ever had the
     session token it was handed. */
  /* Coins earned inside the Hollow land in the same wallet the pill and the
     Wallet sheet show, so what a player wins becomes their cashable balance.
     Every award carries an id, so a retry or a reload cannot pay it twice. */
  const EARN_SOURCES = ['game', 'quest', 'spin', 'checkin'];

  async function earn(request, user) {
    const body = await readJson(request);
    const source = String(body.source || '').trim().toLowerCase();
    const key = cut(body.key, 80);
    const amount = toInt(body.amount);

    if (!EARN_SOURCES.includes(source)) fail(400, 'That is not a coin source in the Hollow.');
    if (!key) fail(400, 'A coin sync needs an id.');
    if (amount < 1 || amount > 500) fail(400, 'That amount cannot be banked.');

    const settings = await readSettings();
    const pub = publicSettings(settings);
    const day = dayKey(now());
    const daily = await dailyRow(user.id, day);

    const already = await store.get('SELECT amount FROM earn_claims WHERE key = ? AND user_id = ?', [key, user.id]);
    if (already) {
      return json({
        ok: true,
        duplicate: true,
        award: 0,
        wallet: await walletSnapshot(user.id, settings),
        today: await dailySnapshot(user.id, day, settings),
      });
    }

    const room = Math.max(0, pub.dailyGameCoinCap - toInt(daily?.game_coins));
    if (!room) fail(429, 'Daily coin limit reached. Come back tomorrow.');
    const award = Math.min(amount, room);
    const stamp = now();
    await store.batch([
      {
        sql: 'INSERT INTO earn_claims (key, user_id, amount, source, created_at) VALUES (?, ?, ?, ?, ?)',
        params: [key, user.id, award, source, stamp],
      },
      {
        sql: `INSERT INTO ledger (user_id, kind, amount, source, note, created_at)
              VALUES (?, 'earn', ?, ?, ?, ?)`,
        params: [user.id, award, source, `Earned in the Hollow (${source})`, stamp],
      },
      {
        sql: 'UPDATE daily SET game_coins = COALESCE(game_coins, 0) + ? WHERE user_id = ? AND day = ?',
        params: [award, user.id, day],
      },
    ]);
    return json({
      ok: true,
      award,
      capped: award < amount,
      wallet: await walletSnapshot(user.id, settings),
      today: await dailySnapshot(user.id, day, settings),
    });
  }

  /* No account and no code: the first session to open payout review takes the
     owner seat, and every session after that is an ordinary player. Older builds
     still post a passcode-shaped body here; it is read and ignored, because there
     is no secret left to check it against. */
  async function ownerClaim(request) {
    const user = await requireUser(request);
    try { await readJson(request); } catch { /* an empty or unreadable body is fine */ }

    const me = await store.get('SELECT is_admin FROM users WHERE id = ?', [user.id]);
    const alreadyOwner = toInt(me?.is_admin) === 1;
    const admins = await store.get('SELECT COUNT(*) AS n FROM users WHERE is_admin = 1');
    if (!alreadyOwner && toInt(admins?.n) > 0) fail(403, 'This Hollow already has an owner.');

    if (!alreadyOwner) {
      await store.run('UPDATE users SET is_admin = 1, last_seen_at = ? WHERE id = ?', [now(), user.id]);
    }
    return json({
      ok: true,
      claimed: !alreadyOwner,
      owner: { id: user.id, username: user.username, isAdmin: true },
    }, alreadyOwner ? 200 : 201);
  }

  async function deleteAccount(request) {
    const user = await requireUser(request);
    const body = await readJson(request);
    const guestAccount = String(user.username || '').startsWith('guest_');
    if (!guestAccount) {
      const password = String(body.password || '');
      if (!password) fail(400, 'Confirm your password to delete this account.');
      const row = await store.get('SELECT password_hash FROM users WHERE id = ?', [user.id]);
      if (!(await verifyPassword(password, row?.password_hash || ''))) fail(403, 'That password is not right.');
    }
    const pending = await store.get(
      "SELECT COUNT(*) AS n FROM withdrawals WHERE user_id = ? AND status IN ('pending', 'approved')",
      [user.id],
    );
    if (toInt(pending?.n) > 0) fail(400, 'Settle your payouts before leaving.');
    const adminsLeft = await store.get('SELECT COUNT(*) AS n FROM users WHERE is_admin = 1 AND id <> ?', [user.id]);
    await store.batch([
      { sql: 'DELETE FROM sessions WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM ledger WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM withdrawals WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM daily WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM game_runs WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM pets WHERE user_id = ?', params: [user.id] },
      { sql: 'DELETE FROM login_attempts WHERE username = ?', params: [user.username] },
      { sql: 'DELETE FROM users WHERE id = ?', params: [user.id] },
    ]);
    if (toInt(adminsLeft?.n) === 0) {
      await store.run('DELETE FROM settings WHERE key = ?', [LEGACY_OWNER_PASSCODE_KEY]);
    }
    return json({ ok: true, unclaimed: toInt(adminsLeft?.n) === 0 }, 200, { 'Set-Cookie': sessionCookie(request, '', 0) });
  }

  async function care(request, user) {
    const body = await readJson(request);
    const action = String(body.action || '');
    const def = CARE[action];
    if (!def) fail(400, 'Pick feed, clean or play.');

    const { row } = await loadPet(user.id);
    const stamp = now();
    const lastAt = toInt(row[`last_${action}_at`]);
    const waitMs = lastAt + def.cooldown - stamp;
    if (waitMs > 0) {
      fail(429, `${def.label} is still resting — try again in ${Math.ceil(waitMs / 1000)}s.`, {
        retryAfter: Math.ceil(waitMs / 1000),
      });
    }

    const settings = await readSettings();
    const pub = publicSettings(settings);
    const day = dayKey(stamp);
    const daily = await dailyRow(user.id, day);

    const pet = projectPet(row, stamp);
    const before = pet[def.stat];
    const next = {
      hunger: pet.hunger,
      cleanliness: pet.cleanliness,
      happiness: pet.happiness,
    };
    next[def.stat] = clamp(pet[def.stat] + def.gain);
    if (action === 'feed') next.happiness = clamp(next.happiness + 4);
    if (action === 'clean') next.happiness = clamp(next.happiness + 6);
    if (action === 'play') {
      next.hunger = clamp(next.hunger - 4);
      next.cleanliness = clamp(next.cleanliness - 2);
    }

    const gain = next[def.stat] - before;
    const health = Math.round((next.hunger + next.cleanliness + next.happiness) / 3);
    const multiplier = round2(moodMultiplier(health));

    // Streak: caring on consecutive days compounds the payout.
    let streak = effectiveStreak(row, stamp);
    if (row.last_care_day !== day) streak = Math.max(1, streak + 1);

    const careLeft = Math.max(0, pub.dailyCareCap - toInt(daily?.care_count));
    const coinRoom = Math.max(0, pub.dailyCareCoinCap - toInt(daily?.care_coins));
    const baseAward = gain >= 4 && careLeft > 0 ? Math.round(def.base * multiplier * streakBonus(streak)) : 0;
    const award = Math.min(baseAward, coinRoom);

    const statements = [
      {
        sql: `INSERT INTO daily (user_id, day) VALUES (?, ?) ON CONFLICT(user_id, day) DO NOTHING`,
        params: [user.id, day],
      },
      {
        sql: `UPDATE daily SET care_count = care_count + 1, care_coins = care_coins + ?
               WHERE user_id = ? AND day = ?`,
        params: [award, user.id, day],
      },
      {
        sql: `UPDATE pets SET hunger = ?, cleanliness = ?, happiness = ?, updated_at = ?,
                     streak = ?, last_care_day = ?, total_care = total_care + 1, last_${action}_at = ?
               WHERE user_id = ?`,
        params: [next.hunger, next.cleanliness, next.happiness, stamp, streak, day, stamp, user.id],
      },
    ];
    if (award > 0) {
      statements.push({
        sql: `INSERT INTO ledger (user_id, kind, amount, source, note, created_at)
              SELECT ?, 'care', ?, ?, ?, ?
               WHERE (SELECT care_coins FROM daily WHERE user_id = ? AND day = ?) >= ?`,
        params: [user.id, award, `care:${action}`, `${def.label} · x${round2(multiplier * streakBonus(streak))}`, stamp, user.id, day, award],
      });
    }
    await store.batch(statements);

    const refreshed = await petRow(user.id);
    const projected = projectPet(refreshed, stamp);
    const capped = award === 0 && baseAward > 0;
    const fullWord = action === 'feed' ? 'snacks' : action === 'clean' ? 'shine' : 'play';
    const message = gain < 4
      ? `${row.name} is already full of ${fullWord}.`
      : capped
        ? `Daily care coins are used up — ${row.name} still loved it.`
        : award === 0
          ? `Daily care limit reached — ${row.name} still loved it.`
          : `+${award} coins`;
    return json({
      award,
      message,
      pet: snapshotPet(refreshed, projected, streak),
      wallet: await walletSnapshot(user.id, settings),
      today: await dailySnapshot(user.id, day, settings),
    });
  }

  async function startGame(request, user) {
    const body = await readJson(request);
    const game = String(body.game || '');
    const def = GAMES[game];
    if (!def) fail(400, 'That minigame does not exist.');

    const stamp = now();
    const settings = await readSettings();
    const pub = publicSettings(settings);
    const day = dayKey(stamp);
    const daily = await dailyRow(user.id, day);
    if (toInt(daily?.game_runs) >= pub.dailyGameCap) {
      fail(429, 'Daily minigame limit reached. Come back tomorrow.');
    }
    const last = await store.get(
      'SELECT started_at FROM game_runs WHERE user_id = ? ORDER BY started_at DESC LIMIT 1',
      [user.id],
    );
    const waitMs = toInt(last?.started_at) + def.cooldown - stamp;
    if (waitMs > 0) {
      fail(429, `The garden is regrowing — try again in ${Math.ceil(waitMs / 1000)}s.`, {
        retryAfter: Math.ceil(waitMs / 1000),
      });
    }

    const { row, pet } = await loadPet(user.id);
    const streak = effectiveStreak(row, stamp);
    const multiplier = round2(pet.multiplier * streakBonus(streak));

    const id = crypto.randomUUID();
    const seed = randomToken(12);
    const rounds = buildRounds(game, seed);
    const expiresAt = stamp + RUN_TTL_MS;

    await store.batch([
      {
        sql: `INSERT INTO game_runs (id, user_id, game, seed, started_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)`,
        params: [id, user.id, game, seed, stamp, expiresAt],
      },
      { sql: 'UPDATE daily SET game_runs = game_runs + 1 WHERE user_id = ? AND day = ?', params: [user.id, day] },
    ]);

    return json({
      runId: id,
      game,
      name: def.name,
      rounds,
      multiplier,
      expiresAt,
      minReactionMs: MIN_REACTION_MS,
      maxCoins: Math.round((def.maxScore * def.coinsPerPoint + def.perfectBonus) * multiplier),
    });
  }

  async function claimGame(request, user) {
    const body = await readJson(request);
    const runId = String(body.runId || '');
    const run = await store.get('SELECT * FROM game_runs WHERE id = ? AND user_id = ?', [runId, user.id]);
    if (!run) fail(404, 'That run is not yours.');
    if (run.used) fail(409, 'That run was already scored.');
    if (now() > run.expires_at + 30000) fail(410, 'That run expired. Start a new one.');

    const def = GAMES[run.game];
    if (!def) fail(400, 'Unknown minigame.');
    const rounds = buildRounds(run.game, run.seed);
    const elapsed = now() - run.started_at;
    if (elapsed < runDuration(rounds) - 800) fail(400, 'That run finished faster than the game can be played.');

    const score = scoreRun(run.game, rounds, body.taps);
    const settings = await readSettings();
    const pub = publicSettings(settings);
    const day = dayKey(now());
    const daily = await dailyRow(user.id, day);
    const { pet } = await loadPet(user.id);
    const row = await petRow(user.id);
    const streak = effectiveStreak(row, now());
    const multiplier = round2(pet.multiplier * streakBonus(streak));

    const base = score * def.coinsPerPoint + (score >= def.maxScore ? def.perfectBonus : 0);
    const coinRoom = Math.max(0, pub.dailyGameCoinCap - toInt(daily?.game_coins));
    const award = Math.min(Math.round(base * multiplier), coinRoom);

    const statements = [
      {
        sql: 'UPDATE game_runs SET used = 1, score = ?, coins = ? WHERE id = ? AND used = 0',
        params: [score, award, run.id],
      },
      {
        sql: `INSERT INTO ledger (user_id, kind, amount, source, note, created_at)
              SELECT ?, 'game', ?, ?, ?, ?
               WHERE (SELECT used FROM game_runs WHERE id = ?) = 1`,
        params: [user.id, award, `game:${run.game}`, `${def.name} · ${score}/${def.maxScore}`, now(), run.id],
      },
    ];
    if (award === 0) statements.splice(1, 1);
    await store.batch(statements);
    if (award > 0) {
      await store.run('UPDATE daily SET game_coins = game_coins + ? WHERE user_id = ? AND day = ?', [award, user.id, day]);
    }

    return json({
      score,
      maxScore: def.maxScore,
      coins: award,
      multiplier,
      capped: award < Math.round(base * multiplier),
      wallet: await walletSnapshot(user.id, settings),
      today: await dailySnapshot(user.id, day, settings),
    });
  }

  async function wallet(request, user) {
    const settings = await readSettings();
    const pub = publicSettings(settings);
    const ledger = await store.all(
      'SELECT id, kind, amount, source, note, created_at FROM ledger WHERE user_id = ? ORDER BY id DESC LIMIT 40',
      [user.id],
    );
    const withdrawals = await store.all(
      'SELECT id, coins, usd_cents, paypal_email, status, note, created_at, decided_at, paid_at FROM withdrawals WHERE user_id = ? ORDER BY created_at DESC LIMIT 30',
      [user.id],
    );
    return json({
      wallet: await walletSnapshot(user.id, settings),
      settings: pub,
      ledger,
      withdrawals,
      today: await dailySnapshot(user.id, dayKey(now()), settings),
    });
  }

  async function requestWithdrawal(request, user) {
    const body = await readJson(request);
    const coins = toInt(body.coins);
    const paypalEmail = String(body.paypalEmail || '').trim();
    const settings = await readSettings();
    const pub = publicSettings(settings);
    const stamp = now();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(paypalEmail) || paypalEmail.length > 120) {
      fail(400, 'Enter the PayPal email that should receive the money.');
    }
    if (coins < pub.minWithdrawCoins) {
      fail(400, `The minimum withdrawal is ${pub.minWithdrawCoins.toLocaleString()} coins.`);
    }
    if (coins > 100000000) fail(400, 'That amount is too large.');

    const open = await store.get(
      "SELECT id FROM withdrawals WHERE user_id = ? AND status IN ('pending', 'approved')",
      [user.id],
    );
    if (open) fail(409, 'You already have a withdrawal in review.');

    const day = dayKey(stamp);
    const daily = await dailyRow(user.id, day);
    if (toInt(daily?.withdraw_count) >= toInt(settings.daily_withdraw_cap, 2)) {
      fail(429, 'That is the most withdrawal requests for today.');
    }

    const exactCents = (coins * 100) / Math.max(1, pub.coinsPerDollar);
    if (exactCents < 1) fail(400, 'That converts to less than one cent.');
    if (!Number.isSafeInteger(exactCents)) {
      fail(400, 'That coin amount does not convert to whole US cents. Choose a rounder amount.');
    }
    const usdCents = exactCents;

    const id = crypto.randomUUID();
    const results = await store.batch([
      {
        sql: `INSERT INTO withdrawals (id, user_id, coins, usd_cents, paypal_email, status, created_at)
              SELECT ?, ?, ?, ?, ?, 'pending', ?
               WHERE (SELECT COALESCE(SUM(amount), 0) FROM ledger WHERE user_id = ?) >= ?`,
        params: [id, user.id, coins, usdCents, paypalEmail, stamp, user.id, coins],
      },
      {
        sql: `INSERT INTO ledger (user_id, kind, amount, ref, source, note, created_at)
              SELECT ?, 'withdraw_hold', ?, ?, 'withdrawal', 'Withdrawal request', ?
               WHERE EXISTS (SELECT 1 FROM withdrawals WHERE id = ?)`,
        params: [user.id, -coins, id, stamp, id],
      },
      {
        sql: 'UPDATE daily SET withdraw_count = withdraw_count + 1 WHERE user_id = ? AND day = ?',
        params: [user.id, day],
      },
    ]);
    if (!results[0] || results[0].changes === 0) {
      fail(400, 'Not enough coins for that withdrawal.');
    }

    return json({ ok: true, withdrawalId: id, wallet: await walletSnapshot(user.id, settings) }, 201);
  }

  /* ---------- admin ---------- */

  async function adminOverview(request, user) {
    await requireAdmin(request);
    const settings = await readSettings();
    const players = await store.all(
      `SELECT u.id, u.username, u.is_admin, u.created_at, u.last_seen_at,
              p.name AS pet_name, p.hunger, p.cleanliness, p.happiness, p.updated_at,
              p.streak, p.last_care_day, p.total_care,
              COALESCE((SELECT SUM(amount) FROM ledger l WHERE l.user_id = u.id), 0) AS balance,
              COALESCE((SELECT SUM(amount) FROM ledger l WHERE l.user_id = u.id AND amount > 0), 0) AS earned,
              COALESCE((SELECT SUM(amount) FROM ledger l WHERE l.user_id = u.id AND kind = 'withdraw_hold'), 0) AS held
         FROM users u LEFT JOIN pets p ON p.user_id = u.id
        ORDER BY u.id ASC`,
    );
    const totals = await store.get(
      `SELECT
         (SELECT COUNT(*) FROM users) AS players,
         (SELECT COALESCE(SUM(amount), 0) FROM ledger WHERE amount > 0) AS minted,
         (SELECT COUNT(*) FROM withdrawals WHERE status = 'pending') AS pending_count,
         (SELECT COALESCE(SUM(coins), 0) FROM withdrawals WHERE status IN ('pending', 'approved')) AS pending_coins,
         (SELECT COALESCE(SUM(usd_cents), 0) FROM withdrawals WHERE status = 'paid') AS paid_cents,
         (SELECT COALESCE(SUM(coins), 0) FROM withdrawals WHERE status = 'paid') AS paid_coins`,
    );
    const rows = players.map((p) => {
      const pet = p.pet_name
        ? projectPet({ ...p, hunger: num(p.hunger), cleanliness: num(p.cleanliness), happiness: num(p.happiness), updated_at: num(p.updated_at) }, now())
        : null;
      return {
        id: p.id,
        username: p.username,
        isAdmin: !!p.is_admin,
        createdAt: p.created_at,
        lastSeenAt: p.last_seen_at,
        petName: p.pet_name,
        mood: pet?.mood || null,
        health: pet?.health ?? null,
        hunger: pet?.hunger ?? null,
        cleanliness: pet?.cleanliness ?? null,
        happiness: pet?.happiness ?? null,
        streak: effectiveStreak({ last_care_day: p.last_care_day, streak: p.streak }, now()),
        totalCare: p.total_care || 0,
        balance: toInt(p.balance),
        earned: toInt(p.earned),
        held: Math.abs(toInt(p.held)),
      };
    });
    const inCirculation = rows.reduce((sum, p) => sum + Math.max(0, p.balance), 0);
    return json({
      players: rows,
      totals: {
        players: toInt(totals?.players),
        coinsInCirculation: inCirculation,
        coinsMinted: toInt(totals?.minted),
        pendingCount: toInt(totals?.pending_count),
        pendingCoins: toInt(totals?.pending_coins),
        paidCents: toInt(totals?.paid_cents),
        paidCoins: toInt(totals?.paid_coins),
      },
      settings: { ...publicSettings(settings), dailyWithdrawCap: toInt(settings.daily_withdraw_cap, 2) },
    });
  }

  async function adminWithdrawals(request, user) {
    await requireAdmin(request);
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const allowed = ['pending', 'approved', 'paid', 'rejected'];
    const filter = allowed.includes(status) ? status : null;
    const rows = await store.all(
      `SELECT w.id, w.user_id, w.coins, w.usd_cents, w.paypal_email, w.status, w.note,
              w.created_at, w.decided_at, w.paid_at, w.payment_reference, u.username, p.name AS pet_name
         FROM withdrawals w
         JOIN users u ON u.id = w.user_id
         LEFT JOIN pets p ON p.user_id = w.user_id
        ${filter ? 'WHERE w.status = ?' : ''}
        ORDER BY w.created_at DESC LIMIT 200`,
      filter ? [filter] : [],
    );
    return json({ withdrawals: rows });
  }

  async function exportWithdrawals(request) {
    await requireAdmin(request);
    const rows = await store.all(
      `SELECT w.id, w.coins, w.usd_cents, w.paypal_email, w.status, w.created_at,
              w.decided_at, w.paid_at, w.note, u.username, p.name AS pet_name
         FROM withdrawals w
         JOIN users u ON u.id = w.user_id
         LEFT JOIN pets p ON p.user_id = w.user_id
        WHERE w.status IN ('approved', 'paid')
        ORDER BY w.created_at ASC`,
    );
    const iso = (ts) => (ts ? new Date(toInt(ts)).toISOString() : '');
    const totalCoins = rows.reduce((sum, row) => sum + toInt(row.coins), 0);
    const totalCents = rows.reduce((sum, row) => sum + toInt(row.usd_cents), 0);

    const lines = [
      ['request_id', 'player', 'pet', 'status', 'coins', 'usd', 'paypal_email', 'requested_at', 'decided_at', 'paid_at', 'note'],
      ...rows.map((row) => [
        row.id,
        row.username,
        row.pet_name || '',
        row.status,
        toInt(row.coins),
        (toInt(row.usd_cents) / 100).toFixed(2),
        row.paypal_email,
        iso(row.created_at),
        iso(row.decided_at),
        iso(row.paid_at),
        row.note || '',
      ]),
      ['TOTAL', '', '', '', totalCoins, (totalCents / 100).toFixed(2), '', '', '', '', `${rows.length} payout(s)`],
    ];

    const csv = `\ufeff${lines.map((line) => line.map(csvCell).join(',')).join('\r\n')}\r\n`;
    const stamp = new Date(now()).toISOString().slice(0, 10);
    return new Response(csv, {
      status: 200,
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="sprite-hollow-pet-earn-payouts-${stamp}.csv"`,
        'cache-control': 'no-store',
      },
    });
  }

  async function decideWithdrawal(request, user, id) {
    await requireAdmin(request);
    const body = await readJson(request);
    const action = String(body.action || '');
    const note = cut(body.note, 200);
    const reference = cut(body.reference, 120);
    const stamp = now();

    const row = await store.get('SELECT * FROM withdrawals WHERE id = ?', [id]);
    if (!row) fail(404, 'That request is gone.');
    if (row.status === 'paid' || row.status === 'rejected') {
      fail(409, `That request is already ${row.status}.`);
    }

    if (action === 'approve') {
      if (row.status !== 'pending') fail(409, `Only pending requests can be approved.`);
      const pub = publicSettings(await readSettings());
      if (row.coins < pub.minWithdrawCoins) {
        fail(400, `That request is below the ${pub.minWithdrawCoins.toLocaleString()} coin minimum. Reject it and ask the player to request more.`);
      }
      const wallet = await walletSnapshot(row.user_id, await readSettings());
      if (row.coins > wallet.verified) {
        fail(400, 'Not enough banked earnings cover this request. Review the earnings first, or reject it.');
      }
      if (!Number.isSafeInteger((row.coins * 100) / pub.coinsPerDollar)) {
        fail(400, 'This coin amount does not convert to whole US cents. Reject it and ask the player for a whole-cent amount.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(row.paypal_email || '').trim())) {
        fail(400, 'A valid PayPal email is required.');
      }
      const res = await store.run(
        "UPDATE withdrawals SET status = 'approved', decided_at = ?, decided_by = ?, note = ? WHERE id = ? AND status = 'pending'",
        [stamp, user.id, note || row.note, id],
      );
      if (!res.changes) fail(409, 'That request changed while you were deciding.');
    } else if (action === 'reject') {
      if (!note) fail(400, 'Add a reason so the player knows why the request was rejected.');
      const res = await store.run(
        "UPDATE withdrawals SET status = 'rejected', decided_at = ?, decided_by = ?, note = ? WHERE id = ? AND status IN ('pending', 'approved')",
        [stamp, user.id, note, id],
      );
      if (!res.changes) fail(409, 'That request changed while you were deciding.');
      await store.run(
        `INSERT INTO ledger (user_id, kind, amount, ref, source, note, created_at)
         SELECT user_id, 'withdraw_refund', coins, id, 'withdrawal', 'Withdrawal rejected - coins returned', ?
           FROM withdrawals
          WHERE id = ? AND status = 'rejected'
            AND NOT EXISTS (SELECT 1 FROM ledger WHERE ref = ? AND kind = 'withdraw_refund')`,
        [stamp, id, id],
      );
    } else if (action === 'paid') {
      if (row.status !== 'approved') fail(409, 'Approve the request before marking it paid.');
      if (!reference) fail(400, 'Enter the PayPal transaction reference after sending the payment.');
      const res = await store.run(
        "UPDATE withdrawals SET status = 'paid', paid_at = ?, note = ?, payment_reference = ? WHERE id = ? AND status = 'approved'",
        [stamp, note || row.note, reference, id],
      );
      if (!res.changes) fail(409, 'That request changed while you were deciding.');
    } else {
      fail(400, 'Choose approve, reject or paid.');
    }

    const updated = await store.get(
      `SELECT w.*, u.username FROM withdrawals w JOIN users u ON u.id = w.user_id WHERE w.id = ?`,
      [id],
    );
    return json({ withdrawal: updated });
  }

  async function updateSettings(request, user) {
    await requireAdmin(request);
    const body = await readJson(request);
    const updates = [];
    const put = (key, value, min, max) => {
      if (value === undefined || value === null || value === '') return;
      const n = Number(value);
      if (!Number.isFinite(n) || n < min || n > max) {
        fail(400, `That value for ${key.replace(/_/g, ' ')} must be between ${min} and ${max}.`);
      }
      updates.push({ key, value: String(Math.round(n)) });
    };
    put('coins_per_dollar', body.coinsPerDollar, 50, 100000);
    put('min_withdraw_coins', body.minWithdrawCoins, 100, 10000000);
    put('daily_care_coin_cap', body.dailyCareCoinCap, 0, 100000);
    put('daily_game_coin_cap', body.dailyGameCoinCap, 0, 100000);
    put('daily_care_cap', body.dailyCareCap, 1, 500);
    put('daily_game_cap', body.dailyGameCap, 1, 200);
    put('daily_withdraw_cap', body.dailyWithdrawCap, 1, 20);
    if (!updates.length) fail(400, 'Nothing to update.');

    await store.batch(updates.map((u) => ({
      sql: `INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      params: [u.key, u.value],
    })));
    const saved = await readSettings();
    return json({ settings: { ...publicSettings(saved), dailyWithdrawCap: toInt(saved.daily_withdraw_cap, 2) } });
  }

  async function listInvites(request) {
    await requireAdmin(request);
    const rows = await store.all(
      `SELECT i.code, i.label, i.created_at, i.used_at, u.username AS used_by
         FROM invites i LEFT JOIN users u ON u.id = i.used_by
        ORDER BY i.created_at DESC LIMIT 100`,
    );
    return json({ invites: rows });
  }

  async function createInvites(request) {
    const admin = await requireAdmin(request);
    const body = await readJson(request);
    const count = clamp(toInt(body.count, 1) || 1, 1, 10);
    const label = cut(body.label, 40);
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const codes = [];
    for (let i = 0; i < count; i++) {
      let code = '';
      const raw = new Uint8Array(8);
      crypto.getRandomValues(raw);
      for (const byte of raw) code += alphabet[byte % alphabet.length];
      codes.push(code);
    }
    await store.batch(codes.map((code) => ({
      sql: 'INSERT INTO invites (code, created_by, created_at, label) VALUES (?, ?, ?, ?)',
      params: [code, admin.id, now(), label],
    })));
    return json({ codes, label }, 201);
  }

  const GUEST_PETS = ['Mochi', 'Bramble', 'Pip', 'Clover', 'Nib', 'Tansy', 'Fig', 'Maple', 'Soot', 'Juniper'];

  // No sign-in: a browser gets a pet straight away and keeps it through the
  // session cookie. The guest account is still a real server-side account, so
  // coins, care and payouts stay ledger-backed and cannot be faked.
  async function guest(request) {
    const existing = await currentUser(request);
    if (existing) {
      await store.run('UPDATE users SET last_seen_at = ? WHERE id = ?', [now(), existing.id]);
      return json(await mePayload(existing));
    }

    let username = '';
    for (let attempt = 0; attempt < 5 && !username; attempt += 1) {
      const candidate = `guest_${crypto.randomUUID().slice(0, 8)}`;
      const taken = await store.get('SELECT id FROM users WHERE username = ?', [candidate]);
      if (!taken) username = candidate;
    }
    if (!username) fail(500, 'Could not start a pet right now. Try again.');

    const petName = GUEST_PETS[Math.floor(Math.random() * GUEST_PETS.length)];
    const createdAt = now();
    const passwordHash = await hashPassword(randomToken(24));
    const created = await store.run(
      'INSERT INTO users (username, password_hash, is_admin, created_at, last_seen_at) VALUES (?, ?, 0, ?, ?)',
      [username, passwordHash, createdAt, createdAt],
    );
    const userId = created.lastRowId;
    if (!userId) fail(500, 'Could not start a pet right now. Try again.');

    await store.batch([
      {
        sql: `INSERT INTO pets (user_id, name, hunger, cleanliness, happiness, updated_at, created_at)
              VALUES (?, ?, 80, 80, 80, ?, ?)`,
        params: [userId, petName, createdAt, createdAt],
      },
      {
        sql: `INSERT INTO ledger (user_id, kind, amount, source, note, created_at)
              VALUES (?, 'welcome', 250, 'welcome', 'Welcome to Sprite Hollow Pet Earn', ?)`,
        params: [userId, createdAt],
      },
    ]);

    const session = await startSession(request, userId);
    const settings = await readSettings();
    const { row, pet } = await loadPet(userId, { persist: false });
    return json({
      token: session.token,
      user: { id: userId, username, isAdmin: false },
      pet: snapshotPet(row, pet, effectiveStreak(row, now())),
      wallet: await walletSnapshot(userId, settings),
      today: await dailySnapshot(userId, dayKey(now()), settings),
      settings: publicSettings(settings),
      serverTime: now(),
    }, 201, { 'Set-Cookie': session.cookie });
  }

  async function bootstrap(request) {
    const admins = await store.get('SELECT COUNT(*) AS n FROM users WHERE is_admin = 1');
    const settings = await readSettings();
    return json({
      needsSetup: toInt(admins?.n) === 0,
      ownerClaimed: toInt(admins?.n) > 0,
      requiresAdminCode: !!adminInviteCode,
      settings: publicSettings(settings),
      serverTime: now(),
    });
  }

  /* ---------- router ---------- */

  const routes = [
    ['GET', /^\/api\/health$/, async () => json({ ok: true, time: now() })],
    ['GET', /^\/api\/bootstrap$/, (req) => bootstrap(req)],
    ['POST', /^\/api\/guest$/, (req) => guest(req)],
    ['POST', /^\/api\/auth\/signup$/, (req) => signup(req)],
    ['POST', /^\/api\/auth\/login$/, (req) => login(req)],
    ['POST', /^\/api\/auth\/logout$/, (req) => logout(req)],
    ['DELETE', /^\/api\/account$/, (req) => deleteAccount(req)],
    ['POST', /^\/api\/owner\/claim$/, (req) => ownerClaim(req)],
    /* Old installs still knock here with a passcode; it claims the same seat. */
    ['POST', /^\/api\/owner\/login$/, (req) => ownerClaim(req)],
    ['GET', /^\/api\/me$/, async (req) => json(await mePayload(await requireUser(req)))],
    ['POST', /^\/api\/pet\/care$/, async (req) => care(req, await requireUser(req))],
    ['POST', /^\/api\/games\/start$/, async (req) => startGame(req, await requireUser(req))],
    ['POST', /^\/api\/games\/claim$/, async (req) => claimGame(req, await requireUser(req))],
    ['GET', /^\/api\/wallet$/, async (req) => wallet(req, await requireUser(req))],
    ['POST', /^\/api\/earn$/, async (req) => earn(req, await requireUser(req))],
    ['POST', /^\/api\/wallet\/withdraw$/, async (req) => requestWithdrawal(req, await requireUser(req))],
    ['GET', /^\/api\/admin\/overview$/, (req) => adminOverview(req)],
    ['GET', /^\/api\/admin\/withdrawals$/, (req) => adminWithdrawals(req)],
    ['GET', /^\/api\/admin\/withdrawals\/export$/, (req) => exportWithdrawals(req)],
    ['POST', /^\/api\/admin\/withdrawals\/([^/]+)\/decide$/, async (req, id) => decideWithdrawal(req, await requireUser(req), id)],
    ['PUT', /^\/api\/admin\/settings$/, (req) => updateSettings(req)],
    ['GET', /^\/api\/admin\/invites$/, (req) => listInvites(req)],
    ['POST', /^\/api\/admin\/invites$/, (req) => createInvites(req)],
  ];

  async function handle(request) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return null;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== 'GET' && !sameOrigin(request) && !corsOrigin(request)) {
      return json({ error: 'Cross-origin request refused.' }, 403);
    }

    for (const [method, pattern, handler] of routes) {
      const match = url.pathname.match(pattern);
      if (!match) continue;
      if (method !== request.method) continue;
      try {
        const response = await handler(request, ...match.slice(1));
        const extra = corsHeaders(request);
        if (!Object.keys(extra).length) return response;
        const headers = new Headers(response.headers);
        Object.entries(extra).forEach(([key, value]) => headers.set(key, value));
        return new Response(response.body, { status: response.status, headers });
      } catch (err) {
        if (err instanceof ApiError) {
          return json({ error: err.message, ...err.extra }, err.status);
        }
        console.error('[pet-earn]', err);
        const extra = corsHeaders(request);
        return json({
          error: 'Something went wrong on the server.',
          detail: String((err && err.message) || '').slice(0, 200),
        }, 500, extra);
      }
    }
    return json({ error: 'Not found.' }, 404);
  }

  return { handle };
}

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...headers,
    },
  });
}
