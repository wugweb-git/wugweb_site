-- Shared central database for Vedanshu Srivastava + Wugweb.
-- See governance.md: owner ∈ {vedanshu, wugweb, both}; Author ≠ Owner.
-- Notion exports are seed only — do not treat Notion as SSOT.
-- Entities vedanshu (person) and wugweb (company) are peers; Vedanshu owns the
-- company but also has personal work outside Wugweb.

-- ══════════════════════════════════════════════════════════════════
-- EXISTING TABLES (Phase 1)
-- ══════════════════════════════════════════════════════════════════

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
  email             text not null,
  phone             text,
  contact_method    text,
  newsletter_opt_in boolean not null default false,
  created_at        timestamptz not null default now()
);

alter table contact_submissions add column if not exists email text;
alter table contact_submissions add column if not exists phone text;

-- ══════════════════════════════════════════════════════════════════
-- NEW TABLES (Phase 2 — Content Store)
-- ══════════════════════════════════════════════════════════════════

-- Entities — every thing in the system (people, companies, teams)
create table if not exists entities (
  id          text primary key,            -- short slug: 'vedanshu', 'wugweb'
  name        text not null,
  entity_type text not null default 'person', -- 'person', 'company', 'team', 'shared'
  email       text,
  data        jsonb not null default '{}',    -- flexible profile fields
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Insert primary entities (+ shared token for dual ownership)
insert into entities (id, name, entity_type, email, data) values
  ('vedanshu', 'Vedanshu Srivastava', 'person', 'vedanshu.srivastava@gmail.com', '{}')
on conflict (id) do nothing;

insert into entities (id, name, entity_type, data) values
  ('wugweb', 'Wugweb', 'company', '{"description": "Digital Experience Agency"}')
on conflict (id) do nothing;

-- Synthetic owner for content that belongs to both brands (not a real person/company)
insert into entities (id, name, entity_type, data) values
  ('both', 'Vedanshu + Wugweb (shared)', 'shared', '{"description": "Dual-brand / shared ownership token"}')
on conflict (id) do nothing;

-- Content items — every piece of content, owned by an entity
-- owner ∈ {vedanshu, wugweb, both} — set explicitly; do not assume all rows are vedanshu
create table if not exists content_items (
  id            text primary key,          -- slug or Sanity document ID
  content_type  text not null,             -- 'service', 'caseStudy', 'post', 'person', 'siteSettings',
                                           -- 'client', 'industry', 'engagement', 'page', 'taxonomy',
                                           -- 'contactSubmission', 'asset', 'platformProfile'
  status        text not null default 'draft', -- 'draft', 'published', 'archived'
  owner         text not null default 'wugweb' references entities(id),
  data          jsonb not null default '{}',    -- all content fields as JSON (incl. author person id when editorial)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_content_items_type on content_items(content_type);
create index idx_content_items_owner on content_items(owner);
create index idx_content_items_status on content_items(status);

-- Content relations — many-to-many links between content items
create table if not exists content_relations (
  id            serial primary key,
  source_id     text not null references content_items(id),
  target_id     text not null references content_items(id),
  relation_type text not null,             -- 'service→caseStudy', 'post→author', 'caseStudy→service',
                                           -- 'client→engagement', 'client→caseStudy'
  -- Author is a relation_type (post→author), not the owner column.
  owner         text not null default 'wugweb' references entities(id),
  created_at    timestamptz not null default now(),
  unique(source_id, target_id, relation_type)
);

create index idx_content_relations_source on content_relations(source_id);
create index idx_content_relations_target on content_relations(target_id);

-- Sync log — audit trail of sync operations between Notion, Sanity, and Neon
create table if not exists sync_log (
  id            serial primary key,
  source        text not null,             -- 'notion', 'sanity', 'manual'
  target        text not null,             -- 'neon', 'sanity', 'frontend'
  status        text not null,             -- 'running', 'completed', 'failed'
  entity_type   text,                      -- 'caseStudy', 'post', etc. (null = all)
  entity_count  integer,
  error_message text,
  started_at    timestamptz not null default now(),
  completed_at  timestamptz
);
