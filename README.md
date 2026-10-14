# wugweb.com

Marketing site for Wugweb — a product & experience architecture studio.

Built with **Astro 5** (SSR) on **Cloudflare Pages**, content managed in **Sanity**, structured data synced to **Neon Postgres**. Migrated off a Framer-hosted predecessor; media is self-hosted on **R2** (`wugweb-assets`) and dual-served from `public/assets/`.

> **For deploy gotchas, current status, and repo conventions, read [CLAUDE.md](./CLAUDE.md).**  
> **For ownership / free-tier Rule 1+2 / Notion-as-seed, read [governance.md](./governance.md).**  
> **For the living task tracker, read [pending.md](./pending.md).**

## Stack

- **Framework:** Astro 5 (`output: 'server'`)
- **SSR adapter:** `@astrojs/cloudflare`
- **UI islands:** React 18 (used sparingly)
- **Animations:** `motion` (vanilla API, client-side only)
- **CMS:** Sanity (`splvhmk1` / `production`)
- **Database:** Neon Postgres via `@neondatabase/serverless`
- **Media:** R2 bucket `wugweb-assets` (path-mapped `assets/<path>`)
- **Deployment:** Cloudflare Pages (`wugweb.pages.dev`)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Copy `.env.example` (if present) to `.env` and fill in:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
   - `DATABASE_URL` (Neon)
   - `SANITY_SYNC_TOKEN` (for `/api/sync`)

   > `.env` and `credentials.md` are gitignored. Never commit tokens.

3. **Run locally**
   ```bash
   npm run dev   # also runs `wrangler types`
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Deploy**
   Git-connected Cloudflare Pages auto-deploys on push to `main`.  
   Manual deploy:
   ```bash
   npm run deploy
   ```

## Sanity Studio

The Studio lives in the `sanity/` directory. Run it locally:

```bash
cd sanity
npm install
npx sanity dev   # http://localhost:3333
```

Hosted Studio: https://wugweb.sanity.studio/

### Studio Features

- **Organized navigation** with sections for Editorial, Business, Brand & Media, Global Settings, and System
- **Tables tool** — all document types as spreadsheet views (one-shot GROQ, free-tier safe)
- **Content health** — missing SEO, cover images, alt text, taxonomy flags
- **Industry master** under Global Settings; content maps via `industryRef` / `client.industry`
- **Presence** (`platformProfile`) rows with credentials (Studio-only)
- **Orderable documents** for Services, Team, and Industries
- **Vision tool** for testing GROQ queries

## Key folders

- `src/pages/` — Astro routes (22 `.astro` routes + 4 API routes)
- `src/components/` — 12 Astro components + `Hero.tsx`
- `src/lib/` — Sanity client, GROQ queries, asset URL helpers, Neon helpers
- `src/styles/global.css` — Design token system (`--t-*`, `--gap-*`, `--space-*`)
- `sanity/schemaTypes/` — Sanity schema
- `neon/schema.sql` — Neon schema
- `scripts/` — Migration and sync scripts (incl. Framer audit/extract/toolkit salvage)
- `public/assets/` — Local media (525 files), all R2-mapped
- `component/` — Nav screenshots + Framer style JSON (**consumed; safe to delete**)
- `reference/` — Offline Framer HTML + `_files` (**keep; service-media extraction pending**)

## Current state

All core marketing routes pull content from Sanity; media is served from **R2** (`PUBLIC_USE_R2_ASSETS=1`). Ownership backfill is live (vedanshu | wugweb | both). Contact submissions mirror to Sanity; blog preview mode is wired.

**Framer migration (honest):** services SEO / Why Us / approach / toolkits + **89** tool icons salvaged into Sanity + `public/assets/tools`. About page team portraits + section imagery extracted and wired. This is **not** full Framer visual parity (no component UI port, no animation/code-component dump).

**Keep** `reference/` (offline HTML/media, ~129MB) until service-page media extraction is done — then it can be deleted. `component/` is fully consumed and safe to delete.

Deploy: Cloudflare Pages only (`wugweb.pages.dev`). Coolify is out of scope.

See [pending.md](./pending.md) for open tasks and blockers.

## Documentation

- [CLAUDE.md](./CLAUDE.md) — Canonical AI memory and deploy gotchas
- [pending.md](./pending.md) — Living task tracker
- [governance.md](./governance.md) — Ownership, Rule 1/2, Notion seed
- [docs/content-assets.md](./docs/content-assets.md) — Media path map
- [docs/r2-assets.md](./docs/r2-assets.md) — R2 upload + free-tier rules
- [credentials.md](./credentials.md) — Security-sensitive notes (token rotation pending)
- [design.md](./design.md) — Design system specification
- [docs/admindesign.md](./docs/admindesign.md) — Sanity Studio redesign brief
- [LOCAL.md.example](./LOCAL.md.example) — Template for local-only notes/secrets
