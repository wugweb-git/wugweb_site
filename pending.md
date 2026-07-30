# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

---

## ✅ Completed

### Data Infrastructure
- [x] **Sanity project splvhmk1** — dataset `production`, Studio at `wugweb.sanity.studio` and `localhost:3333`. Deployed with latest schema.
- [x] **Neon database connected** — schema applied: entities, content_items, content_relations, sync_log, visitor_profiles, contact_submissions
- [x] **Ownership model** — `entities` table supports any entity type. `vedanshu` (person) and `wugweb` (company) are independent peer rows.
- [x] **Neon is SSOT** for structured content. Media → R2 (not set up yet)
- [x] **`@neondatabase/serverless`** installed — replaces `pg` (which uses raw TCP, blocked on Workers)
- [x] **Cloudflare Pages secrets set** — `DATABASE_URL`, `SANITY_SYNC_TOKEN`
- [x] **Deployed to Cloudflare** — build passes, all routes returning 200

### Sanity Content (migrated from codebase + Notion + CSV)
- [x] **82 case studies** — 20 from Notion, rest from CSV+writeup markdown. Full challenges/solutions/impact/disciplines
- [x] **75 blog posts** — 52 from Notion (10 new with body content), 13 from codebase, 10 new from blog CSV
- [x] **12 people** — 11 team members + Wugweb Design author
- [x] **106 clients** — from Notion Clients DB
- [x] **66 industries** — from Notion Industry DB with market sectors
- [x] **12 services** — 6-pillar framework + 85 sub-services as taxonomy terms
- [x] **17 singleton pages** — all pages with basic titles
- [x] **17 sync status docs** — Notion↔Sanity↔Neon comparisons
- [x] **113 asset docs** — imported from Notion Asset Sheet, 66 matched to local files
- [x] **Site settings** — SEO meta, contact info, social links
- [x] **`codeBlock` type** registered — fixes Studio "Unknown type: code" error

### Frontend Pages Wired to Sanity
- [x] **work/index.astro** — 82 case studies from Sanity, category filters
- [x] **work/[slug].astro** — dynamic paths from Sanity slugs, challenges/solutions/impact rendering
- [x] **blog/index.astro** — 75 posts from Sanity with category filters
- [x] **blog/[slug].astro** — dynamic paths, block content rendering from WordPress/Notion HTML body
- [x] **services/index.astro** — 6 pillars with color themes, pricing tiers, case study galleries
- [x] **services/[slug].astro** — enriched with Sanity data, fallback to hardcoded for rich content
- [x] **about.astro** — team section from Sanity person docs
- [x] **footer/sitemap.astro** — created with all pages, services, case studies, blog posts

### Neon Sync
- [x] **355+ documents synced** from Sanity → Neon via `sync-sanity-to-neon.mjs`
- [x] **Sync API** at `/api/sync` — POST with X-Sync-Token auth
- [x] **Content query helpers** in `src/lib/content.ts` — `getByType()`, `getAllByType()`, `getBySlug()`
- [x] **NEON SQL constants** in `src/lib/queries.ts` — ready for frontend swap

### Design Tokens (Phase 2 — all G-items from design.md §5.2)
- [x] `--font-weight-*` (4-step), `--core-line-height-*` (6-step)
- [x] `r-*`/`radius-*` (incl. 20/32px), `s-*`/`p-*`/`gap-*` ramp (0-12)
- [x] `--space-section-*`/`--space-page-*`, 6 breakpoint constants, motion duration/easing tokens
- [x] Semantic colours (Feedback, Accent/Blue, Secondary), neutral scale 0-10 (Framer numbering)
- [x] `.wrap` → 1280px, `.page` → 1440px, `.grid` 12-column utility
- [x] Nav: shadow, two-tone logo, "Works" label, mobile contact/legal block, absolute dropdown
- [x] All legacy aliases preserved for backward compat
- [x] Tokens defined in `global.css` — components still use some hardcoded px values (migration not complete)

### Assets Downloaded
- [x] **252 Framer CDN files** downloaded (250MB) into `public/assets/framer/`
- [x] **51 wugweb.online files** downloaded — 75 total in `public/assets/` (was 24)
- [x] All wugweb.online assets now local. No external dependency for core work videos

### Notion Data Fetched (15 databases)
- [x] Asset Sheet (128), case-studies (20), blog-master (52), clients (109), content-relationships (55)
- [x] industry (66), services (8), sub-services (57), services-atomic (90), service-sub-group (23)
- [x] tags (36), authors (2), tech-stack (21), content-type (2), country (14)

### Scripts
- [x] `scripts/migrate-to-sanity.mjs` — Phase 1: 8 CS + 13 blogs + team
- [x] `scripts/migrate-sanity-phase2.mjs` — Phase 2: 29 CS + 2 blogs
- [x] `scripts/migrate-csv-to-sanity.mjs` — CSV+writeup: 37 CS with full challenges/solutions/impact
- [x] `scripts/fix-case-studies.mjs` — Long-slug enrichment with CSV content
- [x] `scripts/migrate-notion-to-sanity.mjs` — Notion industries + clients
- [x] `scripts/sync-notion-to-sanity.mjs` — Notion↔Sanity comparison + missing blog sync (52 blogs)
- [x] `scripts/sync-sanity-to-neon.mjs` — Full Sanity→Neon sync
- [x] `scripts/fetch-all-notion.mjs` — Fetch all 15 Notion databases
- [x] `scripts/fetch-services.mjs` — Fetch Service + Sub-Service databases
- [x] `scripts/migrate-csv-bodies.mjs` — Extract blog body content from Notion CSV exports
- [x] `scripts/import-assets-to-sanity.mjs` — Import 113 asset docs from Notion Asset Sheet
- [x] `scripts/update-services-and-assets.mjs` — Update 6-pillar framework + sub-services
- [x] `scripts/apply-schema.cjs` — Apply neon/schema.sql
- [x] `scripts/download-framer-assets.mjs` — Download 252 Framer CDN files
- [x] `scripts/import-assets.mjs` — Check asset file existence

### Sanity Admin UX
- [x] **Desk structure** — Dashboard → Site Settings → Pages → Case Studies → Blog Posts → Services → Taxonomy → CRM → Contact Submissions
- [x] **Post schema** — editor tabs (Content/Meta/SEO), updated category list (8 options), orderings
- [x] **Case study schema** — editor tabs (Overview/Content/Results/SEO), `subtitle`, `partner`, `designPhilosophy` fields
- [x] **Service schema** — editor tabs (Overview/Content/Capabilities/Approach/FAQ/SEO)
- [x] **Sync Status dashboard** — 9 docs showing Notion/Sanity/Neon sync state with mismatch details

---

## 🔴 Critical (Blocked)

| Item | Reason |
|---|---|
| Sanity token permissions | Current token (`sk0ArwboL...`) can create+replace but `update`/`delete` fail on some operations. Generated another — same issue. May need fresh Editor token from sanity.io/manage |
| Design token → component migration | Tokens in `global.css`. Components still use hardcoded `px`/`rem`/`clamp()` values. ~20 files, ~200+ values to replace. Systematic pass needed |
| Frontend → Neon swap | Deferred until UI/components/brand mapping from prev version is complete. Helpers/SQL at `src/lib/content.ts` + `NEON` constants ready when needed. |

---

## 🟡 Medium Priority

14. **Wire homepage to match live wugweb.com UI** — chat hero, showcase grid, expertise layout, conversational form. Current homepage has video hero + cards. Live site has distinctive chat-message hero with GIFs
15. **Wire footer pages** — `/footer/sitemap` created but not linked in nav. `footer/subscription` stub. `footer/impact` placeholder CSR activities
16. **Design token → component pass** — replace all hardcoded `px`/`rem` values across 20+ `.astro` files with `var(--r-*)`, `var(--gap-*)`, `var(--p-*)`, `var(--s-*)`, `var(--space-section-*)`, `--duration-*`, `--easing-*`
17. **Service detail pages** — tools/process sections exceed Sanity schema. Hardcoded fallback. Options: add fields to schema or leave hardcoded
18. **About page** — stats are guessed numbers, "Product" team entry flagged, bento has no decorative imagery, values/culture hardcoded
19. **FAQ page** — still hardcoded. Could wire to singletonPage
20. **Contact form** — form works at UI level, API stores to Neon. Submission may 500 at runtime (Neon Workers connection deferred per instruction)
21. ✅ **Client logos** — 13 Framer CDN logos on homepage replaced with local copies from `public/assets/logos/`

---

## 🔵 Low / Nice-to-Have

22. **Sanity draft/preview mode** — `getPreviewClient()` exists, unused. Need preview URL config
23. **Blog body content** — 50 of 75 posts have body from Notion/blog CSVs. Remaining 25 need content entered via Studio
24. ✅ **Image rendering** — blog detail now renders `coverImage` and author photo via `urlFor()`
25. **Team photos** — 11 still hotlinked from Framer CDN
26. **Engagement + taxonomy docs** — schema exists, empty
27. **Contact submissions** — stored in Neon, not sync'd back to Sanity `contactSubmission` docs
28. **R2 media bucket** — not set up. Media should go to R2 per instruction
29. **SEO pages** — legal pages (privacy, terms, refund) have basic hardcoded content, no Sanity data

---

## ❌ Blocked / Deferred / Cancelled

| Item | Status | Reason |
|---|---|---|
| DNS cutover to wugweb.com | ❌ Not my concern | User explicitly excluded this |
| Contact form 500 | ❌ Deferred | Resolve at very end |
| Hyperdrive binding | ❌ Deferred | Falls back to DATABASE_URL currently |
| SESSION KV binding | ❌ Deferred | Only needed if runtime error appears |
| footer/subscription | ❌ Deferred | Needs payment-gateway scoping |
| footer/sitemap | ✅ Done | Created this session |
| about page bento imagery | ❌ No source assets | User hasn't provided Framer imagery |
| Credential rotation | ❌ Needs action | Neon pw `npg_ZOYC...`, CF token `cfat_cEzy...`, Sanity token all exposed in transcript |

---

## Data State Summary

| Type | Sanity | Neon | Notes |
|---|---|---|---|---|
| caseStudy | 82 | ✅ 82 | 20 from Notion + 62 from CSV/writeup |
| post | 75 | ✅ 75 | 52 from Notion + 13 codebase + 10 from CSV |
| person | 12 | ✅ 12 | 11 team + Wugweb Design author |
| client | 106 | ✅ 106 | From Notion |
| industry | 66 | ✅ 66 | From Notion |
| service | 12 | ✅ 12 | 6 pillars + 6 old |
| singletonPage | 17 | ✅ 17 | All pages |
| siteSettings | 1 | ✅ 1 | SEO + contact |
| syncStatus | 17 | ✅ 17 | All comparisons synced |
| asset | 113 | ✅ 113 | Imported, 66 with local files |
| taxonomy | 85 | ✅ 85 | Sub-services as taxonomy terms |
| engagement | 0 | 0 | Schema exists |
| contactSubmission | 0 | 0 | Read-only, no data needed |

**Total in Neon: 456 documents**

---

## Key Design Decisions (taste)

- **Neon is SSOT** — all structured content. Sanity is admin panel. Frontend should read from Neon eventually
- **Media goes to R2**, not Neon or Sanity
- **Vedanshu owns everything** — `owner: 'vedanshu'` on every content row. Wugweb is a sub-entity
- **6-pillar taxonomy** — Strategy, Brand, Experience, Engineering, Growth, Operations. Notion has 8 old-taxonomy services (reference only)
- **Notion data pulled on 2026-07-29** — stale after that date. Re-run `fetch-all-notion.mjs` for fresh data
- **Sanity token needs Editor role** for create/update/delete. Viewer-only tokens fail on migration scripts
- **CLAUDE.md** is the agent context file. Update it after significant sessions
- **This file** (`pending.md`) is the living task tracker. Keep synced
