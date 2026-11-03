-- Sprite Hollow Pet Earn schema. Apply with:
--   npx wrangler d1 execute coin-pets --file=server/schema.sql --remote
-- The local dev server applies this file automatically on boot.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS invites (
  code TEXT PRIMARY KEY,
  created_by INTEGER,
  created_at INTEGER NOT NULL,
  used_by INTEGER,
  used_at INTEGER,
  label TEXT
);

CREATE TABLE IF NOT EXISTS pets (
  user_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  hunger REAL NOT NULL DEFAULT 80,
  cleanliness REAL NOT NULL DEFAULT 80,
  happiness REAL NOT NULL DEFAULT 80,
  updated_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  streak INTEGER NOT NULL DEFAULT 0,
  last_care_day TEXT,
  total_care INTEGER NOT NULL DEFAULT 0,
  last_feed_at INTEGER,
  last_clean_at INTEGER,
  last_play_at INTEGER
);

-- Coins live here and nowhere else. Balance = SUM(amount). The client never
-- writes a balance; it can only ask the server to append ledger rows.
CREATE TABLE IF NOT EXISTS ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  kind TEXT NOT NULL,
  amount INTEGER NOT NULL,
  ref TEXT,
  source TEXT,
  note TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ledger_user ON ledger(user_id, created_at);

CREATE TABLE IF NOT EXISTS withdrawals (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  coins INTEGER NOT NULL,
  usd_cents INTEGER NOT NULL,
  paypal_email TEXT NOT NULL,
  status TEXT NOT NULL,
  note TEXT,
  created_at INTEGER NOT NULL,
  decided_at INTEGER,
  decided_by INTEGER,
  paid_at INTEGER,
  payment_reference TEXT
);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status, created_at);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user ON withdrawals(user_id, created_at);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS daily (
  user_id INTEGER NOT NULL,
  day TEXT NOT NULL,
  care_count INTEGER NOT NULL DEFAULT 0,
  care_coins INTEGER NOT NULL DEFAULT 0,
  game_runs INTEGER NOT NULL DEFAULT 0,
  game_coins INTEGER NOT NULL DEFAULT 0,
  withdraw_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);

CREATE TABLE IF NOT EXISTS game_runs (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  game TEXT NOT NULL,
  seed TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  score INTEGER,
  coins INTEGER
);
CREATE INDEX IF NOT EXISTS idx_game_runs_user ON game_runs(user_id, started_at);

CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_login_attempts ON login_attempts(username, created_at);
