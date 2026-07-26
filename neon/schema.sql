-- Run this once against your Neon database (via the Neon SQL editor,
-- psql, or a migration tool like drizzle-kit) before the /api/personalize
-- route will work.

create table if not exists visitor_profiles (
  visitor_id text primary key,
  segment    text,
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- If "adaptive UX" later means logging raw behavior events (page views,
-- clicks, scroll depth) rather than just a profile snapshot: don't write
-- those straight into this table at high frequency. Use Cloudflare
-- Workers Analytics Engine for the raw event stream (free, built for
-- this, no schema migrations needed) and periodically roll up whatever
-- actually drives personalization decisions into visitor_profiles.
