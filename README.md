# wugweb — infra scaffold

Astro (SSR on Cloudflare) + Sanity (content) + Neon via Hyperdrive (personalization).
Static marketing pages (`services`, `work`, `blog`, `about`, `faq`) are prerendered at
build time from Sanity. `/` and `/contact-us` stay dynamic because they touch
per-visitor state.

## Setup, in order

1. **Sanity**: `npx sanity@latest init` inside `sanity/` (or reuse an existing
   project), get your `projectId`, put it in `sanity/sanity.config.ts` and in
   the root `.env` (copy `.env.example`). Then `cd sanity && npm install && npm run dev`
   to open Studio locally and start entering the 7 services / case studies / posts
   from the current sitemap, plus the 4 singleton pages (home/about/faq/contact).

2. **Neon**: create a project, run `neon/schema.sql` against it (SQL editor or psql).

3. **Hyperdrive**: `wrangler hyperdrive create wugweb-neon --connection-string="<neon connection string>"`.
   Put the returned id into `wrangler.toml`'s `[[hyperdrive]]` block.

4. **Root site**: `npm install`, fill in `.env`, then `npm run dev`.

5. **Deploy**: connect the repo in the Cloudflare dashboard as a Pages project
   (or `npm run deploy` from the CLI once you're authenticated with `wrangler login`).

## Honest gaps — not built yet

- **No visual design.** Everything above is unstyled markup to prove the data
  flow works. The actual "immersive/Framer-quality" look and the rest of the
  Motion-driven interactions still need to be designed and built — `Hero.tsx`
  is just one example of the pattern (React island + `motion`), not a finished hero.
- **Contact form has no submit handler yet** — `contact-us.astro` renders the
  singleton copy but there's no `/api/contact` endpoint or email/lead-storage wired up.
- **FAQ schema is a placeholder.** It reuses the generic `singletonPage` body
  field; FAQ almost certainly wants real `{question, answer}` pairs — give it
  its own schema when you get to it.
- **Hyperdrive local dev**: I haven't verified the exact current flow for
  hitting your real Hyperdrive config from `wrangler dev`/`astro dev` locally
  (this has changed across wrangler versions). Check
  `wrangler hyperdrive` docs before you sink time into this — don't take my
  word for it.
- **No draft-mode/preview** for editors to see unpublished Sanity content —
  `useCdn: true` in `sanity.ts` means published content only, cached.
- **No image rendering wired up** — `urlFor()` helper exists in `sanity.ts`
  but no page actually renders `coverImage`/`gallery` yet.
- **`footer/subscription`, `footer/sitemap`, `footer/industries`** from the old
  sitemap aren't modeled — those look like Framer CMS-specific artifacts, not
  real pages; worth deciding if the redesign needs equivalents at all before
  building them.
