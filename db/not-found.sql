-- 404 monitor — D1 database wugweb-404 (binding NOT_FOUND_DB).
-- Rows are path, count, last-seen and last-referrer only. No IP, no user agent.
-- No index on last_seen on purpose: each index adds a written row to every
-- write, and the 90-day prune is a rare full scan that reads cost, not writes.
CREATE TABLE IF NOT EXISTS not_found (
  path          TEXT PRIMARY KEY,
  count         INTEGER NOT NULL DEFAULT 0,
  last_seen     INTEGER NOT NULL,          -- epoch ms
  last_referrer TEXT
);
-- Daily write budget: rows written by the monitor per UTC day (cap 20,000).
CREATE TABLE IF NOT EXISTS write_budget (
  day TEXT PRIMARY KEY,                    -- YYYY-MM-DD (UTC)
  n   INTEGER NOT NULL DEFAULT 0
);
