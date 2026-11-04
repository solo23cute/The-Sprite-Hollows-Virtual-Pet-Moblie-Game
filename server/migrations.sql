-- Statements applied after schema.sql, for databases created by older builds.
-- Every statement here must be safe to run again: the applier ignores
-- "duplicate column" so a fresh database and an upgraded one end up identical.
CREATE TABLE IF NOT EXISTS earn_claims (
  key TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (key, user_id)
);
CREATE INDEX IF NOT EXISTS idx_earn_claims_user ON earn_claims(user_id, created_at);

-- 4.12.0 removed cash-outs. These carry nothing but the old payout records and
-- PayPal link handles, so they are dropped on the next request. IF EXISTS keeps
-- a fresh database safe; the applier also ignores a column that is already gone.
DROP TABLE IF EXISTS withdrawals;
DROP TABLE IF EXISTS paypal_links;
ALTER TABLE users DROP COLUMN paypal_email;
ALTER TABLE users DROP COLUMN paypal_payer_id;
ALTER TABLE users DROP COLUMN paypal_linked_at;
ALTER TABLE daily DROP COLUMN withdraw_count;
