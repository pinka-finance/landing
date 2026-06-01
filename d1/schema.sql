-- D1 schema for pinka.finance landing — waitlist + newsletter signups.
-- Apply with: wrangler d1 execute pinka-landing --remote --file=./d1/schema.sql

CREATE TABLE IF NOT EXISTS waitlist_signups (
  email       TEXT PRIMARY KEY,
  name        TEXT,
  role        TEXT NOT NULL,
  source      TEXT,
  details     TEXT,            -- JSON blob of role-specific fields
  ip_hash     TEXT,
  user_agent  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS newsletter_signups (
  email       TEXT PRIMARY KEY,
  ip_hash     TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
