# Pending

What's still needed on the wugweb.com redesign.

## Build & Deploy

- [x] Astro build passes locally (`npm run build` succeeds)
- [ ] **Cloudflare deploy currently failing** — needs debugging on the dashboard side
- [ ] Hyperdrive connection not wired — `wrangler.jsonc` needs its hyperdrive block re-added once a real Neon connection string exists
- [ ] `SESSION` KV binding may be needed at runtime (`@astrojs/cloudflare` auto-enables session support)

## Content (Sanity)

### Schema Status
- [x] **Case study schema enriched** — added `about`, `disciplines`, `industry`, `timeline`, `team`, `challenges[]`, `solutions[]`, `impact[]` fields with editor tabs
- [x] **Service schema enriched** — added `subtitle`, `tags`, `heroText`, `capabilities[]`, `approach[]`, `process[]`, `tools[]`, `why[]` fields with editor tabs
- [x] **Contact Submission document type** created — read-only document in Sanity Studio so admins can view leads without querying Neon directly
- [x] **GROQ queries updated** to reflect all new fields
- [x] **@sanity/vision** plugin activated in studio config
- [x] **Desk structure** updated with Contact Submissions section
- [ ] No case studies entered in Sanity (work pages render empty)
- [ ] No blog posts entered (blog pages render empty)
- [x] **Service content hardcoded** — Strategy, Brand, Experience, Growth, Engineering, Operations pages are fully built with inline content (no Sanity dependency for services)
- [ ] `brand-system.txt` exists now (was a known missing file) — llms.txt references it correctly

## Pages & UI

- [x] **Mobile nav menu** — HTML/CSS/JS exist in `SiteHeader.astro` (burger icon, fullscreen overlay, close-on-nav)
- [x] **Services page rebuilt** — 6 new parent services: Strategy, Brand, Experience, Growth, Engineering, Operations (was Brand & Strategy, Experience Design, MarTech & GenAI, Web Development, QA & Testing, No-Code)
- [ ] Contact form — submits via POST to Neon but **no confirmation page** (redirects to `/?submitted=1` with nothing reading that param)
- [ ] `footer/sitemap` — not built (excluded intentionally, wasn't in live site's footer)
- [ ] `footer/subscription` — stub only (needs payment-gateway scoping conversation)

## Images & Media

- [ ] No image rendering wired up — `urlFor()` exists in `sanity.ts` but no page renders `coverImage`/`gallery` yet
- [ ] Client logos and team photos still hotlinked from Framer's CDN (`framerusercontent.com`) — needs migration to Sanity assets or R2

## Admin & Features

- [ ] No admin UI for viewing contact form leads (query Neon directly for now)
- [ ] No draft-mode/preview for unpublished Sanity content (`useCdn: true`)
- [ ] No visual QA has been done — expect layout fixes when viewed in a real browser

## Reference Files

Reference HTML pages saved from the live site are in `reference/`:
- Homepage, Brand Strategy, Digital Experience, Web & App Development, Contact Us
- Driftime site reference in `reference/driftime-site/`
- ~~`Martech and GenAI Services` reference was deleted~~ (irrelevant to current scope)
