-- Statements applied after schema.sql, for databases created by older builds.
-- Every statement here must be safe to run again: the applier ignores
-- "duplicate column" so a fresh database and an upgraded one end up identical.
ALTER TABLE withdrawals ADD COLUMN payment_reference TEXT;
CREATE TABLE IF NOT EXISTS earn_claims (
  key TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (key, user_id)
);
CREATE INDEX IF NOT EXISTS idx_earn_claims_user ON earn_claims(user_id, created_at);
