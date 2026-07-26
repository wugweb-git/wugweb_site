# wugweb.com redesign

Astro (SSR via `@astrojs/cloudflare`) on Cloudflare Pages + Sanity (content) +
Neon via Hyperdrive (personalization, contact-form leads). Migrating off
Framer. Motion for interactions.

For deploy gotchas, current build/deploy status, and repo structure, see
**[CLAUDE.md](./CLAUDE.md)** — that file is kept up to date with what's
actually been learned from real failed builds; this README is the shorter
human-facing version.

## Setup, in order

1. **Sanity**: already a real project (`splvhmk1`, dataset `production`),
   schema deployed, hosted Studio at https://wugweb.sanity.studio/. Log in
   with the account that already has access. `cd sanity && npm install && npm run dev`
   for local Studio if you want it instead of the hosted one.

2. **Neon**: create a project, run `neon/schema.sql` against it (SQL editor
   or psql) — creates `visitor_profiles` and `contact_submissions`.

3. **Hyperdrive**: not connected yet.
   `wrangler hyperdrive create wugweb-neon --connection-string="<neon uri>"`,
   then put the returned id into `wrangler.jsonc`'s `"hyperdrive"` block
   (currently absent — see CLAUDE.md for why, and the exact re-add steps).

4. **Root site**: `npm install`, fill in `.env` (see `.env.example`), then
   `npm run dev`.

5. **Deploy**: Git-connected Cloudflare Pages project, already set up.
   Push to `main` to trigger a build. If a build fails, check the dashboard's
   Build log first — CLAUDE.md documents the specific issues already hit
   and fixed (deploy command, Node version, asset config) so you're not
   re-debugging the same ones.

## Pages

All of home, about, services (+7 sub-slugs), work, blog, contact, FAQ, the
legal pages (privacy/terms/refund), and the footer stub pages exist and are
linked from the shared nav (`src/components/SiteHeader.astro` /
`SiteFooter.astro`). Content for services/work/blog is Sanity-driven but
**no actual documents have been entered yet** — those pages will render
empty lists until you add content in Studio.

## Static files

`public/` also serves `ai-context.txt`, `llms.txt`, and `robots.txt` as-is
at the site root. `llms.txt` references `brand-system.txt`, which doesn't
exist yet — known dead link until that content is provided.

## Honest gaps — not built yet

- **No visual QA.** None of this has been seen rendered by either me or you
  as of this file's last edit — no browser access on my end. Expect layout
  fixes once you actually look at it.
- **No mobile nav menu** — links just disappear under 768px.
- **Contact form has a backend** (`/api/contact.ts` → Neon via Hyperdrive)
  but **no confirmation page** — successful submit redirects to
  `/?submitted=1` with nothing reading that param yet.
- **`footer/subscription`** is a stub on purpose — the real page (buy a
  fixed-model subscription, payment gateway) needs its own scoping
  conversation before building; not something to improvise.
- **No draft-mode/preview** for editors to see unpublished Sanity content —
  `useCdn: true` in `sanity.ts` means published content only, cached.
- **No image rendering wired up** — `urlFor()` helper exists in `sanity.ts`
  but no page actually renders `coverImage`/`gallery` yet.
- **Client logos and team photos** are still hotlinked from Framer's CDN
  (`framerusercontent.com`) — will break whenever Framer stops serving them.
  Need migrating to Sanity assets or R2.
- **`footer/sitemap`** (from the site's sitemap.xml) isn't built — it also
  wasn't in the live site's actual rendered footer nav, so it's excluded
  consistently, not accidentally missed.
