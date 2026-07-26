# CLAUDE.md

Context for AI agents (or humans) working in this repo. Read this before
touching `wrangler.jsonc` or deploy config — several things here were
learned through actual failed builds, not guessed.

## What this is

wugweb.com redesign: Astro (SSR via `@astrojs/cloudflare`) deployed to
Cloudflare Pages, content in Sanity, personalization/contact-form data in
Neon via Hyperdrive. Migrating off Framer. Motion (formerly framer-motion)
for interactions, via its vanilla API — no React islands used on the
main pages, to keep shipped JS minimal.

## Current status (update this section as things change)

- Local build passes (`npm run build` succeeds clean).
- Cloudflare deploy has been failing through several rounds of fixes —
  see "Deploy gotchas" below before assuming any prior fix is final.
- Sanity: real project (`splvhmk1`, dataset `production`), schema
  deployed (service/caseStudy/post/singletonPage), hosted Studio live at
  https://wugweb.sanity.studio/. No actual case study / post / service
  content entered yet — that's a Studio data-entry task, not a code task.
- Neon: not connected yet. `wrangler.jsonc`'s Hyperdrive block is
  intentionally removed until a real Neon connection string exists —
  see the file itself for the exact command to re-add it.
- Pages built: home, about, services (+7 sub-slugs, empty in Sanity),
  work (+ dynamic slug), blog (+ dynamic slug), contact-us (with a real
  POST handler to Neon), faq, footer/impact, footer/subscription (stub —
  needs a real payment-gateway scoping conversation, not attempted),
  privacy-policy, termsofuse, refund-policy, 404.
- Not built: `footer/sitemap`, mobile nav menu, contact-form confirmation
  page (redirects to `/?submitted=1` with nothing reading that param).

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
npm run deploy    # local manual deploy path, if ever needed instead of Git-connected
```

## Structure

- `src/pages/` — Astro routes. Static marketing pages use
  `export const prerender = true`; `/` and `/contact-us` stay dynamic
  (personalization, form POST).
- `src/pages/api/` — `personalize.ts` and `contact.ts`, both Hyperdrive +
  `pg`, same connect/query/end pattern in each.
- `src/lib/sanity.ts`, `src/lib/queries.ts` — Sanity client + GROQ.
- `sanity/` — Studio config + schema types, separate `npm install` from
  the root project (it's its own small app).
- `neon/schema.sql` — run manually against Neon; not an automated
  migration tool.
- `public/` — static passthrough files: `ai-context.txt`, `llms.txt`,
  `robots.txt`, `.assetsignore`. `brand-system.txt` is referenced by
  `llms.txt` but does not exist yet — known dead link until provided.

## Working conventions established in this project

- Real content over placeholder where the source is the user's own
  (their legal pages, contact info, team bios, case study titles) — the
  live site's actual copy gets migrated faithfully, not paraphrased,
  especially for legal text where wording has legal effect.
- Third-party review-site content (Crunchbase, DesignRush, etc.) is not
  used as a source for building pages — only the user's own site or
  content they directly provide.
- Known gaps get flagged in code comments and in chat, not silently
  left implicit.
