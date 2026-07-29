# CLAUDE.md

Context for AI agents (or humans) working in this repo. Read this before
touching `wrangler.jsonc` or deploy config — several things here were
learned through actual failed builds, not guessed.

## What this is

wugweb.com redesign: Astro (SSR via `@astrojs/cloudflare`) deployed to
Cloudflare Pages, content in Sanity + Neon (Neon is SSOT). Migrating off
Framer. Motion (formerly framer-motion) for interactions, via its vanilla
API — no React islands used on the main pages, to keep shipped JS minimal.

## Current status (update this section as things change)

- **Build:** `npm run build` passes clean. Deploy at `wugweb.pages.dev` is live.
- **Sanity:** project `splvhmk1`, dataset `production`, Studio at
  `https://wugweb.sanity.studio/` and `http://localhost:3333`.
  **Content populated via migration scripts** — 82/37 case studies (82 after dedup, 37 unique), 65 blog posts (15 with body, 50 with SEO metadata), 12 people (11 team + Wugweb Design author), site
  settings, 13 singleton pages.
  `blockContent` is registered in schema types (was missing — don't
  remove it from the array).
- **Sanity schema types:** service, caseStudy, post, person,
  singletonPage, siteSettings, contactSubmission, syncStatus, client,
  industry, engagement, taxonomy + block content objects (cta, stats,
  accordion, logoCloud, video, twoColumns).
- **Neon is connected.** Schema at `neon/schema.sql` applied with tables:
  entities, content_items (JSONB data column), content_relations,
  sync_log (plus existing visitor_profiles, contact_submissions).
- **Ownership model:** every row has an `owner` column referencing the `entities` table.
  Two primary entities seeded: `vedanshu` (person) and `wugweb` (company). Each content
  item can be owned by any entity — the schema is flexible. No hardcoded owner assumption.
- **Neon is SSOT** for all structured content. 355 documents synced. Media (images, videos,
  files) goes to Cloudflare R2 — NOT stored in Neon.
- **Cloudflare Pages secrets set:** `DATABASE_URL` (Neon connection
  string) and `SANITY_SYNC_TOKEN` (for sync API auth).
  Hyperdrive binding NOT wired — falls back to DATABASE_URL.
- **Sync API** at `src/pages/api/sync.ts` — POST Sanity docs to upsert
  into Neon `content_items`. Auth'd via `X-Sync-Token` header.
- **Content query helpers** at `src/lib/content.ts` (`getByType`,
  `getAllByType`, `getBySlug`, `getSyncSummary`) + `NEON` SQL constants
  in `src/lib/queries.ts` — ready to swap frontend pages from Sanity CDN
  to Neon queries.
- **Pages built:** home, about, services (+6 hardcoded slugs), work (+82
  dynamic Sanity-driven slugs), blog (+65 dynamic Sanity-driven slugs), contact-us (POST handler
  → Neon → /thank-you), faq, footer/impact, footer/subscription (stub),
  privacy-policy, termsofuse, refund-policy, 404, thank-you.
- **Not built:** `footer/sitemap` (excluded intentionally).
- **Mobile nav:** absolute dropdown panel (not full-screen) with
  contact/legal block, matches design.md §2.3.
- **Design tokens Phase 2 complete** in `src/styles/global.css`:
  `--font-weight-*` (4-step), `--core-line-height-*` (6-step, spec names),
  `r-*`/`radius-*` (incl. 20/32px steps), `s-*`/`p-*`/`gap-*` numeric
  ramp (0-12), `--space-section-*`/`--space-page-*`, 6 breakpoint
  constants, motion duration/easing tokens, semantic colours
  (`/Feedback/*`, `/Accent/Blue`, `/Secondary/*`), neutral scale 0-10
  (Framer numbering). All legacy aliases preserved for backward compat.
- **Brand assets** in `public/brand/`. Favicon/apple-touch-icon served
  locally (not Framer CDN).
- **Colour tokens** are the live site's own values (text `#f4f4f4`,
  muted `#bababa`, surfaces `#191919`/`#2b2b2b`). Don't "fix" text to
  pure white — deliberate.

## Deploy gotchas (read before editing wrangler.jsonc)

This project is a genuine classic **Pages** project, despite some
Cloudflare dashboard UI copy calling it a "Worker" — confirmed directly
by Wrangler's own CLI warning during a failed deploy ("you have run
`wrangler deploy` on a Pages project, `wrangler pages deploy` should be
used instead"). That's more authoritative than dashboard label text.

Consequences:
- `wrangler.jsonc` should use `"pages_build_output_dir": "./dist"`, NOT
  `"main"` / `"assets"` (those are Workers-deploy-style fields and were
  tried and reverted — real fix was elsewhere).
- The actual fix that mattered was the dashboard's **Deploy command**
  setting (Settings → Build configuration), which needs to be
  `npx wrangler pages deploy dist`, not the default `npx wrangler deploy`.
- **Node version matters a lot**: Wrangler 4.x requires Node ≥22.
  `.node-version` in this repo is pinned to `22` — a previous pin to
  `20` (an earlier, unconfirmed guess at a different problem) caused a
  real regression and a wasted debug round. Don't lower this without a
  specific reason.
- `public/.assetsignore` contains `_worker.js` and `_routes.json` —
  without it, Cloudflare's asset uploader can treat the compiled
  server-side Worker code as a public static asset, which is both wrong
  and a warning at minimum.
- Watch for `Invalid binding "SESSION"` at runtime even after a
  successful deploy — `@astrojs/cloudflare` auto-enables session support
  requiring a `SESSION` KV binding, noticed as a build-log warning but
  never hit as an actual runtime error yet. If it appears:
  `wrangler kv namespace create SESSION`, then add the binding to
  `wrangler.jsonc`.
- **The build's API token is named `Website`** in the project's Settings
  → Build configuration → API token field — not the account-level token
  named `wugweb`. These are different tokens, and the account-level one
  didn't appear in that project's token picker at all (only
  `Create new token`, `Website`, and `wugweb build token` ever showed
  up there) — that dropdown appears to only surface tokens created via
  its own guided flow, not every token that exists in the account. If
  auth errors return, use **"Create new token" from inside that same
  dropdown** rather than hand-picking permissions on a manually created
  token — the guided flow scopes it correctly for Pages automatically
  and doesn't expose a permissions editor because there's nothing to
  configure.

## Commands

```bash
npm install
npm run dev      # runs `wrangler types` first
npm run build
npm run deploy   # manual deploy; otherwise Git-connected auto-deploys

# Sanity
cd sanity && npm install && npx sanity dev  # local Studio on :3333

# Migrate hardcoded content → Sanity dataset
SANITY_TOKEN=sk... node scripts/migrate-to-sanity.mjs

# Apply Neon schema
node scripts/apply-schema.cjs

# Sanity → Neon sync (via API)
curl -X POST https://wugweb.pages.dev/api/sync \
  -H 'Content-Type: application/json' \
  -H 'X-Sync-Token: <token>' \
  -d '{"docs": [...]}'
```

## Structure

- `src/pages/` — Astro routes. Static marketing pages use
  `export const prerender = true`; `/` and `/contact-us` stay dynamic
  (personalization, form POST).
- `src/pages/api/` — `personalize.ts` (GET/POST visitor profiles),
  `contact.ts` (POST contact form → Neon), `sync.ts` (POST Sanity → Neon
  sync, auth'd via X-Sync-Token header matching SANITY_SYNC_TOKEN env var).
- `src/lib/sanity.ts` — Sanity client (CDN build-time + preview client).
- `src/lib/queries.ts` — GROQ queries + NEON SQL constants for future
  frontend migration to Neon.
- `src/lib/content.ts` — Neon query helpers (`getByType`,
  `getAllByType`, `getBySlug`, `getSyncSummary`).
- `src/lib/db.ts` — Neon `connect(env)` helper (Hyperdrive →
  DATABASE_URL fallback). Callers must `client.end()` in `finally`.
- `src/styles/global.css` — Full design token system. Source of truth at
  `design.md` §1-§4.
- `sanity/` — Studio config + schema types, separate `npm install`.
  Custom desk structure: Dashboard → Site Settings → Pages → Case
  Studies → Blog Posts → Services → Taxonomy (Industries, Taxonomy
  Terms) → CRM (Clients, Engagements, Team) → Contact Submissions.
- `sanity/schemaTypes/` — All 12 document types + 7 block content
  objects. `blockContent` must stay in the schema types array.
- `neon/schema.sql` — Manual SQL. Tables: entities, content_items,
  content_relations, sync_log, visitor_profiles, contact_submissions.
- `scripts/migrate-to-sanity.mjs` — Phase 1: original 8 case studies + 13 blog posts + team + settings.
- `scripts/migrate-sanity-phase2.mjs` — Phase 2: 29 additional case studies + 2 new blog posts.
- `scripts/migrate-csv-to-sanity.mjs` — CSV+writeup migration: 37 case studies with full challenges/solutions/impact data.
- `scripts/fix-case-studies.mjs` — long-slug enrichment with CSV content + writeup body.
- `scripts/migrate-notion-to-sanity.mjs` — Notion industries + clients → Sanity.
- `scripts/sync-notion-to-sanity.mjs` — Notion↔Sanity comparison + missing blog sync.
- `scripts/sync-sanity-to-neon.mjs` — Full Sanity→Neon sync (355 docs).
- `scripts/fetch-all-notion.mjs` — Fetch all 15 Notion databases.
- `scripts/apply-schema.cjs` — Apply neon/schema.sql. Idempotent.
- `design.md` — Design system specification (S1 Framer export wins
  conflicts). Part 5 lists token gaps (G-1 through G-16).
- `pending.md` — Living task tracker.
- `public/` — Static passthrough: `ai-context.txt`, `llms.txt`,
  `robots.txt`, `.assetsignore`.
- `reference/` — Saved HTML pages from old Framer live site.

## Key conventions

- Content from hardcoded frontend records, NOT from Framer reference
  pages, unless directly provided by the user. Third-party review sites
  are not sources.
- Media lives in R2 (or local `public/assets/`), NOT in Neon (which is
  for structured data only). Sanity can hold image references but the
  actual binary goes to R2.
- The Sanity client uses `useCdn: true` for build-time reads.
  `getPreviewClient()` exists for eventual preview mode but is unused.
- `blockContent` is a Sanity type that must be registered in the schema
  array — removing it causes "Unknown type: blockContent" errors on
  every document type that references it.
- About page stats were placeholders ("01"..."04") — replaced with
  guessed numbers ("10+"..."50+") awaiting real data from the user.
  The "Product" team entry (Legal Head) is flagged as likely wrong.
- Contact form confirmation exists at `/thank-you` (created this
  session). The earlier `/?submitted=1` redirect param is dead code.
- The `brand-system.txt` in `public/` was a known missing file —
  it exists now from `wugweb-assets/`.
