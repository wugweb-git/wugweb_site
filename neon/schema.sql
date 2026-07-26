-- Run this once against your Neon database (via the Neon SQL editor,
-- psql, or a migration tool like drizzle-kit) before /api/personalize
-- or /api/contact will work.

create table if not exists visitor_profiles (
  visitor_id text primary key,
  segment    text,
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists contact_submissions (
  id                serial primary key,
  name              text not null,
  company           text,
  interests         text[] not null default '{}',
  topic             text,
  budget            text,
  contact_method    text,
  newsletter_opt_in boolean not null default false,
  created_at        timestamptz not null default now()
);

-- If "adaptive UX" later means logging raw behavior events (page views,
-- clicks, scroll depth) rather than just a profile snapshot: don't write
-- those straight into this table at high frequency. Use Cloudflare
-- Workers Analytics Engine for the raw event stream (free, built for
-- this, no schema migrations needed) and periodically roll up whatever
-- actually drives personalization decisions into visitor_profiles.
