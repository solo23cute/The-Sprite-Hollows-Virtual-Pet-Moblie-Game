-- Statements applied after schema.sql, for databases created by older builds.
-- Every statement here must be safe to run again: the applier ignores
-- "duplicate column" so a fresh database and an upgraded one end up identical.
ALTER TABLE withdrawals ADD COLUMN payment_reference TEXT;
ALTER TABLE withdrawals ADD COLUMN payout_state TEXT;
ALTER TABLE withdrawals ADD COLUMN payout_checked_at INTEGER;
ALTER TABLE users ADD COLUMN paypal_email TEXT;
ALTER TABLE users ADD COLUMN paypal_payer_id TEXT;
ALTER TABLE users ADD COLUMN paypal_linked_at INTEGER;
CREATE TABLE IF NOT EXISTS paypal_links (
  state TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS earn_claims (
  key TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (key, user_id)
);
CREATE INDEX IF NOT EXISTS idx_earn_claims_user ON earn_claims(user_id, created_at);
