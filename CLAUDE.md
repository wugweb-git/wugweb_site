# CLAUDE.md

Canonical AI memory for the wugweb.com repo. Read this before any session.

## Project Overview

wugweb.com is a marketing website for Wugweb, a product & experience architecture studio.
It is built as an **Astro 5** site with **server-side rendering** on **Cloudflare Pages**, content managed in **Sanity**, and structured content synced to **Neon Postgres**. The project is migrating off a Framer-hosted predecessor; media lives in R2 (`wugweb-assets`) with path-mapped keys, dual-served from `public/assets/` until cutover.

## Architecture

- **Framework**: Astro 5 (`output: 'server'`)
- **SSR adapter**: `@astrojs/cloudflare` v12
- **UI islands**: React 18 via `@astrojs/react` (used sparingly; no `.tsx` components currently)
- **Animations**: **GSAP** (`gsap` + `ScrollTrigger`) via `src/lib/scroll-animations.ts` — `[data-reveal]` / `[data-scroll]` / `data-reveal-delay`. `motion` dependency removed (2026-08-05).
- **PWA**: `public/manifest.webmanifest` + `sw.js` (network-first, offline shell) + `pwa-192/512.png` icons; SW registers only on non-localhost.
- **CMS**: Sanity (`splvhmk1` / `production`) — admin panel
- **Database**: Neon Postgres via `@neondatabase/serverless` — structured content SSOT
- **Media**: R2 bucket `wugweb-assets` (Standard); keys `assets/<path>` ↔ site `/assets/<path>`; dual-serve from `public/assets/` until cutover. Content links via path fields (`thumbnailPath`, `coverPath`, `logoPath`, …) — see `docs/content-assets.md`. Docs: `docs/r2-assets.md`
- **Deployment**: Cloudflare Pages (`wugweb.pages.dev`), Git-connected

## Technology Stack

Key dependencies (from `package.json`):

- `astro` ^5.0.0
- `@astrojs/cloudflare` ^12.0.0
- `@astrojs/react` ^4.0.0
- `react` / `react-dom` ^18.3.0
- `motion` ^12.0.0
- `@sanity/client` ^6.0.0
- `@sanity/image-url` ^1.0.2
- `@neondatabase/serverless` ^1.1.0
- `wrangler` ^4.114.0

**Important**: `pg` is intentionally NOT used — raw TCP is blocked on Workers. The `@neondatabase/serverless` driver is WebSocket-based and Cloudflare-compatible.

## Content Architecture

### Sanity schema types (`sanity/schemaTypes/`)

Documents: `service`, `caseStudy`, `post`, `person`, `singletonPage`, `siteSettings`, `contactSubmission`, `syncStatus`, `client`, `industry`, `engagement`, `taxonomy`, `asset`, `platformProfile` (Studio: Presence), `testimonial` (LinkedIn recs for Vedanshu).
Objects: `blockContent`, plus custom block objects used inside portable text.

Studio desk structure: Dashboard → Editorial → Business → Brand & Media → Global Settings (Platforms, Tools, Tags, types, **Industry master**, Presence, …) → System.

**Industry:** Global Settings holds the master (`industry` docs from Wugweb taxonomy). Content maps via `caseStudy.industryRef` and `client.industry`. See `governance.md` §3.

**`reference/` + `component/`:** `component/` was **consumed and deleted** (nav → SiteHeader, style JSON → tokens). `reference/` is an offline Framer HTML archive — all content extracted (WP DBs mined, case-study media, testimonials); kept for reference only, no further extraction needed.

### Neon schema (`neon/schema.sql`)

Tables: `entities`, `content_items`, `content_relations`, `sync_log`, `visitor_profiles`, `contact_submissions`.

Ownership model: Neon is **shared** between `vedanshu` and `wugweb` (peers). Content `owner` ∈ {`vedanshu`, `wugweb`, `both`}. **Author ≠ Owner** — author is a `person` byline ref; owner is governance. See [`governance.md`](governance.md).

**Notion is seed only.** Sanity already exceeds Notion exports (e.g. ~82 case studies vs ~20 Notion CS, ~96 posts vs ~52, ~472 assets vs ~128 sheet rows). Never reset to Notion.

### Current content state (verified 2026-08-05 against Sanity)

| Type | Sanity | Neon | Notes |
|---|---|---|---|
| caseStudy | 82 | 90 (8 stale) | owner: 82 wugweb |
| post | 124 | 124 | owner: 96 wugweb + 28 WP imports; body all filled; coverPath 53 |
| person | 12 | 12 | Author byline ≠ Owner |
| testimonial | 14 | — | LinkedIn recs for Vedanshu (source=linkedin) |
| client | 110 | 110 | owner: 104 wugweb / 1 both / 1 vedanshu; +4 new (TheBizGift, MusicLinkd, Spark Logistics, Eastman Auto & Power) |
| industry | 66 | 66 | **Master** (Global Settings); content refs map here |
| service | 19 | 19 | |
| singletonPage | 18 | 18 | |
| siteSettings | 1 | 1 | |
| syncStatus | 21 | 21 | Incl. global-config |
| asset | 553 | 553 | owner: 187 wugweb / 366 both; 512 on disk, all R2-mapped |
| taxonomy | 327 | 327 | platform, tech-stack, tag, types, dept, country; 89 tool iconPath |
| platformProfile | 59 | 59 | Presence + credentials |
| engagement | 70 | 70 | |
| contactSubmission | 0 | 0 | #27 wired: /api/contact mirrors to Sanity |

**Neon:** last full sync 2026-08-05 (1430 docs, owner-aware). **Neon sync is user-controlled — do not run unless asked.** Neon audit notes: 8 stale caseStudy rows, `[object Object]` slug bug in old rows, `content_relations` empty.

## Routes (`src/pages/`)

22 `.astro` routes + 4 API routes:

- Home `/`
- About `/about`
- Contact `/contact-us` (+ `/thank-you`)
- FAQ `/faq`
- Services `/services` + `/services/[slug]`
- Work `/work` + `/work/[slug]`
- Blog `/blog` + `/blog/[slug]`
- Footer pages: `/footer/impact`, `/footer/sitemap`, `/footer/subscription`
- Legal: `/privacy-policy`, `/termsofuse`, `/refund-policy`
- 404 `/404`
- API: `/api/contact`, `/api/personalize`, `/api/preview`, `/api/sync`

Note: `footer/sitemap` is linked from `SiteFooter` (Sitemap).

## Components (`src/components/`)

3 Astro components (only used ones — dead components were deleted 2026-08-05):

`SiteHeader` (nav, WhatsApp CTA, mobile menu), `SiteFooter`, `TrustBadges`
(Clutch/DesignRush/GoodFirms/TopDevelopers strip). Page-specific blocks live
inline in `src/pages/`. Full component→token map: `kits_design_system/docs/components.md`.

## Design system (single source of truth)

`kits_design_system/` — `docs/design.md` (sources S1–S5, rules, decisions, conflicts) +
`docs/tokens/` (22 token docs mirroring `src/styles/global.css`). Root `design.md` is a
slim pointer. Key rules: tokens only (no hardcoded color/spacing/radius/opacity/shadow/
blur/z-index); buttons `--radius-sm` · chips `--radius-full`; yellow ≤10% (accent only);
GSAP for all animation; service panel order alternates warm/cool (Strategy→Engineering→
Brand→Growth→Operations→Experience). Brand assets: `assets/brand/` (SVG logos) → `public/brand/`.

## Current Implementation Status

See `pending.md` for the authoritative task tracker. High-level state:

### Completed
- Sanity project and Studio deployed (Global Settings masters, Presence, Industry master).
- Neon schema applied; owner-aware sync 2026-08-05 (1430 docs: assets, taxonomy, platformProfile, syncStatus included).
- Main marketing routes wire to Sanity; path-mapped media served from **R2 (cutover done 2026-08-05)**, no longer dual-serve.
- **Design tokens fully consumed (Phase 1, 2026-08-05)** — full effects token system in `global.css` (opacity/radius/stroke/blur/shadow/elevation/glass/noise/gradient/motion/z-index); zero hardcoded colors/opacity/blur/shadow in pages/components. Kits consolidated to single source of truth at `kits_design_system/`.
- **Brand SVG logos wired** — `public/brand/logo-large.svg` + `logo-small.svg` (from `assets/brand/`), favicons, og-default.
- **WhatsApp nav CTA** (`wa.me/919205996219`, nav only) + yellow-≤10% rule + consistent button radius (`--radius-sm`).
- **GSAP everywhere** — `[data-reveal]`/`[data-scroll]`/`data-reveal-delay` via `scroll-animations.ts`; `motion` imports removed from all pages and dependency removed.
- **Phase 2 completion (2026-08-05)** — PWA (manifest + SW + icons), blog detail enrichment (ToC/Last Updated/Share/Newsletter/Prev-Next/Related), trust badges (site-wide), work+blog filters capped to six pillars, service-detail work/insights teasers + dual CTAs.
- Asset registry 588 Sanity docs / **525 local files — all R2-mapped, 0 unreferenced**.
- Governance: Rule 1 + Rule 2 + shared ownership + Notion seed (`governance.md`).
- Ownership backfill (#40): client/caseStudy/post/asset all have `owner`.
- Team photos (#25): 10 portraits wired via `person.photoPath` + About page.
- Client linkage: created TheBizGift/MusicLinkd/Spark Logistics/Eastman clients; linked Gratify→Adneto, RAK SME→RAK Chambers; only Greenko unlinked (deferred).
- Work grid: media-less case studies render styled placeholders (no broken video).
- Blog teaser on every page now Sanity-driven with cover thumbnails.
- Contact form mirrors submissions to Sanity `contactSubmission` docs (#27).
- Preview mode wired: `/api/preview` cookie → `getPreviewClient` on `/blog/[slug]` (#22).

### Critical / open
- Frontend → Neon swap deferred until UI/brand mapping done. **Neon sync user-controlled — don't run unless asked.**
- Contact form production harden deferred to end (Neon write still unverified in prod; local dev 500 = no DATABASE_URL binding).
- Sanity token: do not rotate unless user asks.
- **Remaining backlog** (pending.md): contact page redesign (driftime — needs reference screenshot), deep service-copy pass, trust-badge logo assets, prod verify of `/api/contact` + `/api/subscribe`.

### Medium / low (see pending.md)
- About stats/imagery; service detail schema vs hardcoded tools; blog covers (53/96 missing — user will supply); team photos done (Anastasia/Wugweb Design no portrait); legal pages; 8 stale Neon caseStudy rows + `content_relations` empty; ~22 unreferenced disk files under framer/ + more/.
- Greenko case study has no client doc (user unknown — deferred). `component/` safe to delete; `reference/` keep until service-media extraction done.
- Homepage chat hero cancelled (keep video hero). Client logos already local.

## Working Agreements

- **Always read `pending.md` and `governance.md` at the start of a session; update them at the end.**
- **Read `CLAUDE.md` before touching `wrangler.jsonc`, deploy config, or build tooling.** Many values here were learned from failed builds.
- **Do not change text to pure white** — live colours are deliberate (`text: #f4f4f4`, `muted: #bababa`, surfaces `#191919`/`#2b2b2b`).
- **Do not lower `.node-version`** below 22 without a specific reason. Wrangler 4.x requires Node ≥22 and a previous pin to 20 caused a real regression.
- **Neon is shared SSOT** for structured content (Vedanshu + Wugweb). Sanity is the admin panel. Media belongs in R2 (`wugweb-assets`).
- **Owner ≠ Author** — owner is `vedanshu` \| `wugweb` \| `both`; author is a `person` byline. See `governance.md`.
- **Notion is seed only** — do not reset Sanity/Neon to Notion; Sanity already has more content.
- **Content comes from hardcoded frontend records or user-provided sources**, not from Framer reference pages or third-party review sites.
- **Service page copy (loose reference):** `/Users/abcom/Documents/VS/wugweb artworks/Wugweb_Services 2026.md` — use for inspiration on `/services` and `/services/[slug]` when helpful. Not a tight requirement; do not force 1:1 parity.
- **Do not remove `blockContent` from the Sanity schema types array** — doing so causes `Unknown type: blockContent` errors across documents.
- **Rule 1 — Never exceed any free-tier limit** (Sanity, Cloudflare, Neon, Notion, GitHub, etc.). Prefer free-tier-safe alternatives; do not force plan upgrades.
- **Rule 2 — R2 MUST NOT EXCEED FREE TIER** (10 GB storage / 1M Class A / 10M Class B; Standard only). Soft ceiling 9.5 GiB. One bucket `wugweb-assets`. Path map: `public/assets/<path>` ↔ `/assets/<path>` ↔ R2 key `assets/<path>`. See `.cursor/rules/free-tier-limits.mdc` and `docs/r2-assets.md`.

## Important Decisions

- **Framework**: Astro 5 SSR on Cloudflare Pages, not Framer.
- **DB driver**: `@neondatabase/serverless` instead of `pg` (Workers-compatible).
- **Ownership**: Neon shared by Vedanshu + Wugweb. Entities `vedanshu`, `wugweb`, and token `both`. Content owner ∈ {vedanshu, wugweb, both}. Vedanshu owns the company but also has personal (non-Wugweb) work; he can also be a Wugweb client. Full rules: `governance.md`.
- **Author ≠ Owner**: posts use `author` → `person`; ownership is a separate field.
- **6-pillar taxonomy**: Strategy, Brand, Experience, Engineering, Growth, Operations. Notion's older 8-service taxonomy is reference-only.
- **Media**: R2 `wugweb-assets` with path-mapped keys; local `public/assets` dual-serve until `PUBLIC_USE_R2_ASSETS=1`.
- **Sanity token role**: migrations require an Editor token, not Viewer.
- **Build command**: `npm run build` → `npx wrangler pages deploy dist`. The dashboard's Deploy command must be `npx wrangler pages deploy dist`, not `npx wrangler deploy`.

## Things AI Must Never Change

- `wrangler.jsonc` deploy model: keep `"pages_build_output_dir": "./dist"`; never switch to `"main"` / `"assets"` Workers-style fields.
- `.node-version`: do not lower below 22.
- Live colour values in `src/styles/global.css`: text `#f4f4f4`, muted `#bababa`, surfaces `#191919`/`#2b2b2b`.
- `blockContent` registration in Sanity schema types array.
- Ownership model: keep `entities` + `owner` column; allow `vedanshu` \| `wugweb` \| `both`; do not collapse everything to a single owner; do not merge Author into Owner.
- Free-tier ceilings for any vendor — never implement features that require paid plans unless the user explicitly asks.
- R2 Rule 2: never exceed free R2; never use Infrequent Access; never invent non-`assets/` key prefixes without an explicit migration.
- Notion-as-seed: never wipe Sanity/Neon to match Notion volume.

## Deployment Notes

- This is a **Cloudflare Pages** project, not a bare Worker. If Wrangler warns that you ran `wrangler deploy` on a Pages project, use `wrangler pages deploy` instead.
- Dashboard deploy command must be: `npx wrangler pages deploy dist`.
- Required secrets (set via Cloudflare dashboard or `wrangler pages secret`):
  - `DATABASE_URL` — Neon connection string
  - `SANITY_SYNC_TOKEN` — auth token for `/api/sync`
- Hyperdrive is **not wired**. The `HYPERDRIVE` binding is absent from `wrangler.jsonc`; the code falls back to `DATABASE_URL`.
- R2 binding `ASSETS_BUCKET` → bucket `wugweb-assets`. Public base var: `PUBLIC_R2_ASSETS_BASE`. Upload: `node scripts/upload-assets-to-r2.mjs`.
- If runtime shows `Invalid binding "SESSION"`, create a KV namespace named `SESSION` and add it to `wrangler.jsonc`.

## Known Technical Debt

1. **Frontend still reads from Sanity CDN** — Neon helpers and SQL constants exist, but pages have not been swapped to query Neon directly.
2. **Contact form runtime reliability** — `POST /api/contact` + `/api/subscribe` store to Neon, but Neon Workers connection was deferred; verify in production.
3. **Framer CDN hotlinks remain** — client logos on homepage and some team photos still use `framerusercontent.com`.
4. **Sanity token permissions** — current token cannot reliably update/delete; migration scripts need a fresh Editor token.
5. **Service panel `fg`/`accent` data values** — the `/services` template carries `#FFFFFF`/`#050505` inline values (data, not CSS) — intentional.

## Current Priorities

1. Deploy / keep pages.dev in sync with local (Framer service slugs must not 404).
2. **Remaining backlog** (pending.md): contact redesign (needs reference), deep service-copy pass, trust-badge logos, prod verify of contact/subscribe APIs.
3. Frontend → Neon swap (after UI/brand mapping).
4. Blog/media gaps, team photos, Neon audit leftovers (8 stale rows, `[object Object]` slugs, empty `content_relations`).
5. Contact form production harden (end). **Do not rotate Sanity token unless asked.**

## Next-Session Checklist

Before starting work:
- [ ] Read `pending.md` (open work).
- [ ] Read `governance.md` (Rule 1/2, ownership, industry master, Notion seed).
- [ ] Read this file (`CLAUDE.md`).
- [ ] Skim `docs/framer-full-audit.md` if touching Framer/reference/component.
- [ ] Confirm Node ≥22 (`cat .node-version`). Prefer `npm run build` before large deploys.

Before finishing work:
- [ ] Update `pending.md` with completed/in-progress items.
- [ ] Update `governance.md` if ownership / source-of-truth / free-tier rules changed.
- [ ] Update `CLAUDE.md` if any architecture/deploy facts changed.
- [ ] Ensure no secrets were committed.

## Frequently Used Commands

```bash
# Install / dev / build
npm install
npm run dev      # runs `wrangler types` first
npm run build
npm run deploy   # npm run build && wrangler pages deploy dist

# Framer audit / extract / toolkit salvage (identity only; not visual parity)
# See docs/framer-full-audit.md — keep reference/ + component/
node scripts/audit-framer-service-pages.mjs
node scripts/extract-framer-service-pages.mjs
node scripts/salvage-framer-toolkits.mjs

# Sanity Studio
cd sanity && npm install && npx sanity dev  # localhost:3333

# Neon schema
node scripts/apply-schema.cjs

# R2 media upload (path-mapped assets/<path>; free-tier guarded)
DRY_RUN=1 node scripts/upload-assets-to-r2.mjs
node scripts/upload-assets-to-r2.mjs

# Map R2/local assets → Sanity content path fields
DRY_RUN=1 node scripts/map-assets-to-content.mjs
node scripts/map-assets-to-content.mjs

# Sanity → Neon sync (local or remote via API)
curl -X POST https://wugweb.pages.dev/api/sync \
  -H 'Content-Type: application/json' \
  -H 'X-Sync-Token: <token>' \
  -d '{"docs": [...]}'
```
