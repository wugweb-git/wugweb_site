# wugweb.com

Marketing site for Wugweb — a product & experience architecture studio.

Built with **Astro 5** (SSR) on **Cloudflare Pages**, content managed in **Sanity**, structured data synced to **Neon Postgres**. The site is migrating off a Framer-hosted predecessor; assets are being moved from `framerusercontent.com` to local `public/assets/`.

> **For deploy gotchas, current status, and repo conventions, read [CLAUDE.md](./CLAUDE.md).**  
> **For the living task tracker, read [pending.md](./pending.md).**

## Stack

- **Framework:** Astro 5 (`output: 'server'`)
- **SSR adapter:** `@astrojs/cloudflare`
- **UI islands:** React 18 (used sparingly)
- **Animations:** `motion` (vanilla API, client-side only)
- **CMS:** Sanity (`splvhmk1` / `production`)
- **Database:** Neon Postgres via `@neondatabase/serverless`
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

## Key folders

- `src/pages/` — Astro routes (22 `.astro` routes + 4 API routes)
- `src/components/` — 12 Astro components + `Hero.tsx`
- `src/lib/` — Sanity client, GROQ queries, Neon helpers
- `src/styles/global.css` — Design token system
- `sanity/schemaTypes/` — Sanity schema
- `neon/schema.sql` — Neon schema
- `scripts/` — Migration and sync scripts
- `public/assets/` — Downloaded Framer/local assets

## Current state

All core marketing routes exist and pull content from Sanity. 456 documents have been synced from Sanity to Neon. The frontend still reads from Sanity CDN; a Neon-backed read path is planned.

See [pending.md](./pending.md) for open tasks and blockers.

## Documentation

- [CLAUDE.md](./CLAUDE.md) — Canonical AI memory and deploy gotchas
- [pending.md](./pending.md) — Living task tracker
- [credentials.md](./credentials.md) — Security-sensitive notes (token rotation pending)
- [design.md](./design.md) — Design system specification
- [brand_guidelines/](./brand_guidelines/) — Complete brand OS
- [docs/site-diff.md](./docs/site-diff.md) — Gap analysis vs live site
- [docs/admindesign.md](./docs/admindesign.md) — Sanity Studio redesign brief
- [LOCAL.md.example](./LOCAL.md.example) — Template for local-only notes/secrets
