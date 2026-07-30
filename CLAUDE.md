# CLAUDE.md

Canonical AI memory for the wugweb.com repo. Read this before any session.

## Project Overview

wugweb.com is a marketing website for Wugweb, a product & experience architecture studio.
It is built as an **Astro 5** site with **server-side rendering** on **Cloudflare Pages**, content managed in **Sanity**, and structured content synced to **Neon Postgres**. The project is migrating off a Framer-hosted predecessor; assets are being moved from `framerusercontent.com` to local `public/assets/`.

## Architecture

- **Framework**: Astro 5 (`output: 'server'`)
- **SSR adapter**: `@astrojs/cloudflare` v12
- **UI islands**: React 18 via `@astrojs/react` (used sparingly; `Hero.tsx` is the only `.tsx` component)
- **Animations**: `motion` v12 (vanilla API), client-side only
- **CMS**: Sanity (`splvhmk1` / `production`) — admin panel
- **Database**: Neon Postgres via `@neondatabase/serverless` — structured content SSOT
- **Media**: local `public/assets/` for now; R2 intended but not set up
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

Documents: `service`, `caseStudy`, `post`, `person`, `singletonPage`, `siteSettings`, `contactSubmission`, `syncStatus`, `client`, `industry`, `engagement`, `taxonomy`, `asset`.
Objects: `blockContent`, plus custom block objects used inside portable text.

Studio desk structure: Dashboard → Site Settings → Pages → Case Studies → Blog Posts → Services → Taxonomy → CRM → Contact Submissions.

### Neon schema (`neon/schema.sql`)

Tables: `entities`, `content_items`, `content_relations`, `sync_log`, `visitor_profiles`, `contact_submissions`.

Ownership model: every `content_items` row has an `owner` column referencing `entities`. Primary entities seeded: `vedanshu` and `wugweb`.

### Current content state (verified against codebase)

| Type | Sanity | Neon | Notes |
|---|---|---|---|
| caseStudy | 82 | 82 | 20 Notion + 62 CSV/writeup |
| post | 75 | 75 | 52 Notion + 13 codebase + 10 CSV |
| person | 12 | 12 | 11 team + Wugweb Design author |
| client | 106 | 106 | From Notion |
| industry | 66 | 66 | From Notion |
| service | 12 | 12 | 6 pillars + 6 old |
| singletonPage | 17 | 17 | All pages |
| siteSettings | 1 | 1 | SEO + contact |
| syncStatus | 17 | 17 | Notion↔Sanity↔Neon comparisons |
| asset | 113 | 113 | 66 matched to local files |
| taxonomy | 85 | 85 | Sub-services as taxonomy terms |
| engagement | 0 | 0 | Schema exists, empty |
| contactSubmission | 0 | 0 | Read-only schema, no data yet |

**Total in Neon: 456 documents**.

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

Note: `footer/sitemap` exists but is not linked in the shared nav.

## Components (`src/components/`)

12 Astro components + `Hero.tsx`:

`ApproachSteps`, `BlogCard`, `CapabilitiesGrid`, `FAQList`, `FilterChips`, `Hero.tsx`, `RelatedWorkGrid`, `SectionTitle`, `SiteFooter`, `SiteHeader`, `StatsGrid`, `WorkCard`.

## Current Implementation Status

See `pending.md` for the authoritative task tracker. High-level state:

### Completed
- Sanity project and Studio deployed.
- Neon schema applied; 456 documents synced from Sanity.
- All main marketing routes exist and wire to Sanity data.
- Design token system in `src/styles/global.css`.
- 252 Framer CDN files downloaded to `public/assets/framer/`.
- Cloudflare Pages build passes and deploys.

### Critical / blocked
- Sanity token permissions: current token can create/replace but update/delete fails for some operations. Needs fresh Editor token from `sanity.io/manage`.
- Design token → component migration: tokens exist, but components still use hardcoded `px`/`rem`/`clamp()` values.
- Frontend → Neon swap: helpers and SQL constants exist, but pages still read from Sanity CDN.

### Medium priority
- Homepage UI does not match the live wugweb.com chat-message hero.
- Footer pages partially stubbed.
- About page stats are guessed; team photos hotlinked from Framer CDN.
- Client logos on homepage are 13 hardcoded Framer CDN URLs despite 106 clients in Sanity.
- Contact form may 500 at runtime (Neon Workers connection deferred).

### Low priority / deferred
- Sanity preview mode (`getPreviewClient()` exists but unused).
- 25 of 75 blog posts still lack body content.
- Image rendering from Sanity (`urlFor()` helper unused in pages).
- R2 media bucket not set up.
- Engagement and taxonomy docs empty.

## Working Agreements

- **Always read `pending.md` at the start of a session and update it at the end.**
- **Read `CLAUDE.md` before touching `wrangler.jsonc`, deploy config, or build tooling.** Many values here were learned from failed builds.
- **Do not change text to pure white** — live colours are deliberate (`text: #f4f4f4`, `muted: #bababa`, surfaces `#191919`/`#2b2b2b`).
- **Do not lower `.node-version`** below 22 without a specific reason. Wrangler 4.x requires Node ≥22 and a previous pin to 20 caused a real regression.
- **Neon is SSOT** for structured content. Sanity is the admin panel. Media belongs in R2 (not implemented yet).
- **Content comes from hardcoded frontend records or user-provided sources**, not from Framer reference pages or third-party review sites.
- **Do not remove `blockContent` from the Sanity schema types array** — doing so causes `Unknown type: blockContent` errors across documents.

## Important Decisions

- **Framework**: Astro 5 SSR on Cloudflare Pages, not Framer.
- **DB driver**: `@neondatabase/serverless` instead of `pg` (Workers-compatible).
- **Ownership model**: `entities` table with `vedanshu` and `wugweb` as peer rows; every content item has an `owner`.
- **6-pillar taxonomy**: Strategy, Brand, Experience, Engineering, Growth, Operations. Notion's older 8-service taxonomy is reference-only.
- **Media**: R2 eventually; currently local `public/assets/`.
- **Sanity token role**: migrations require an Editor token, not Viewer.
- **Build command**: `npm run build` → `npx wrangler pages deploy dist`. The dashboard's Deploy command must be `npx wrangler pages deploy dist`, not `npx wrangler deploy`.

## Things AI Must Never Change

- `wrangler.jsonc` deploy model: keep `"pages_build_output_dir": "./dist"`; never switch to `"main"` / `"assets"` Workers-style fields.
- `.node-version`: do not lower below 22.
- Live colour values in `src/styles/global.css`: text `#f4f4f4`, muted `#bababa`, surfaces `#191919`/`#2b2b2b`.
- `blockContent` registration in Sanity schema types array.
- Ownership model (`entities` table + `owner` column) when adding new Neon-backed content.

## Deployment Notes

- This is a **Cloudflare Pages** project, not a bare Worker. If Wrangler warns that you ran `wrangler deploy` on a Pages project, use `wrangler pages deploy` instead.
- Dashboard deploy command must be: `npx wrangler pages deploy dist`.
- Required secrets (set via Cloudflare dashboard or `wrangler pages secret`):
  - `DATABASE_URL` — Neon connection string
  - `SANITY_SYNC_TOKEN` — auth token for `/api/sync`
- Hyperdrive is **not wired**. The `HYPERDRIVE` binding is absent from `wrangler.jsonc`; the code falls back to `DATABASE_URL`.
- If runtime shows `Invalid binding "SESSION"`, create a KV namespace named `SESSION` and add it to `wrangler.jsonc`.

## Known Technical Debt

1. **Design tokens not fully consumed by components** — `global.css` has the full token system, but many `.astro` files still use hardcoded `px`/`rem`/`clamp()` values. A systematic component pass is needed.
2. **Frontend still reads from Sanity CDN** — Neon helpers and SQL constants exist, but pages have not been swapped to query Neon directly.
3. **Contact form runtime reliability** — `POST /api/contact` stores to Neon, but Neon Workers connection was deferred; verify in production.
4. **Framer CDN hotlinks remain** — client logos on homepage and some team photos still use `framerusercontent.com`.
5. **Sanity token permissions** — current token cannot reliably update/delete; migration scripts need a fresh Editor token.
6. **No R2 media bucket** — media plan calls for R2; implementation pending.
7. **Preview mode unused** — `getPreviewClient()` exists but no page wires it up.

## Current Priorities

1. Resolve Sanity token permissions (get Editor token).
2. Complete design token → component migration.
3. Swap frontend pages from Sanity CDN reads to Neon queries (use `src/lib/content.ts`).
4. Migrate remaining Framer CDN hotlinks to local assets.
5. Stabilize contact form in production.

## Next-Session Checklist

Before starting work:
- [ ] Read `pending.md`.
- [ ] Read this file (`CLAUDE.md`).
- [ ] Confirm Node version ≥22 (`cat .node-version`).
- [ ] Run `npm run build` to verify baseline.

Before finishing work:
- [ ] Update `pending.md` with completed/in-progress items.
- [ ] Update `CLAUDE.md` if any architecture/deploy facts changed.
- [ ] Ensure no secrets were committed.

## Frequently Used Commands

```bash
# Install / dev / build
npm install
npm run dev      # runs `wrangler types` first
npm run build
npm run deploy   # manual deploy; otherwise Git-connected auto-deploys

# Sanity Studio
cd sanity && npm install && npx sanity dev  # localhost:3333

# Neon schema
node scripts/apply-schema.cjs

# Sanity → Neon sync (local or remote via API)
curl -X POST https://wugweb.pages.dev/api/sync \
  -H 'Content-Type: application/json' \
  -H 'X-Sync-Token: <token>' \
  -d '{"docs": [...]}'
```
