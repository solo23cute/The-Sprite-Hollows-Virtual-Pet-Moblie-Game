-- Statements applied after schema.sql, for databases created by older builds.
-- Every statement here must be safe to run again: the applier ignores
-- "duplicate column" so a fresh database and an upgraded one end up identical.
ALTER TABLE withdrawals ADD COLUMN payment_reference TEXT;
