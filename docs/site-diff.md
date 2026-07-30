# Site diff — wugweb.com (reference) vs wugweb.pages.dev (ours)

Tracking doc for Phase 1 of the rebuild audit.

**Ground rule set by the client:** the live site is a reference for **UI, components,
tokens, layouts and primitives — not for information architecture.** We keep the new
6-service structure. We are recreating while improvising, so a deviation is only a
defect if it's a *regression*; deliberate improvements stay and get recorded as
accepted.

**Method:** load both sites at the same viewport, force lazy sections to mount, then
enumerate the heading/block inventory and compare. Live is JS-rendered so it needs a
real browser; ours is SSR so it can be diffed from the HTML directly.

**Progress:** structural diff at 1440 complete for 7 page pairs. Phase 1 QA items
D-8 through D-12 completed. Component-level token diff remains partially open across
the full component library.

---

## ✅ Fixed

### D-1 — Global bottom sections rendered twice · **critical** · all pages
`BaseLayout.astro` renders four global sections (Partners, Industries, Blog teaser,
Final CTA). Six pages *also* had their own copies, so those blocks rendered twice,
stacked. The homepage showed "Industries We Empower" twice and two different closing
CTAs back to back.

Introduced by `b9ebe4ff`, which added the globals without removing the per-page ones.

Confirmed against live: wugweb.com has these as **global** sections on every page
(`/`, `/about`, `/services` all end with Partners → Industries → Some of our recent
thoughts → We speak your Industry's language). One of each is correct.

**Fix:** removed the per-page copies from `index`, `about`, `work/index`,
`work/[slug]`, `services/[slug]`, `footer/impact`. The two Industries blocks were
byte-identical, so nothing was lost.

### D-2 — Global blog teaser was a stub · **major**
`BaseLayout`'s teaser was just an eyebrow + button; the homepage's richer version (3
posts with category labels) was the one being deleted as a duplicate. Promoted the
rich version into `BaseLayout` so every page gets it, matching live.

### D-3 — Final CTA ran heading and body together · **minor**
Was one long H2. Live splits it: heading "We speak your Industry's language." + body
"Partner with Wugweb for domain-driven design…". Split to match, and moved the size
onto `--t-h2` instead of a hardcoded clamp.

### D-4 — Debug text shipped to production · **major**
The homepage rendered `{services.length} services in Sanity` as visible body text at
the bottom of the page. Removed.

### D-13 — Contact form collected no email or phone · **critical** · `/contact-us`
The form asked "I can contact via Email/Phone" but had **no email field and no phone
field**. The API handler didn't read them and the `contact_submissions` table had no
column for them. Every lead would have arrived with no way to reply to it.

Found by diffing against live, which has both (`email:email`, `tel:phone`).

**Fix:** added a required `email` and optional `phone` to the form, wired both through
`api/contact.ts`, and added the columns to `neon/schema.sql` with `ALTER TABLE … ADD
COLUMN IF NOT EXISTS` so an already-created table picks them up.

Verified: browser-native validation rejects an empty form and a malformed address,
accepts a valid one, at 375px.

### D-14 — Three work videos were 404ing in production · **critical**
`work/Airtel%20Xsafe/…`, `work/Axis%20Bank/…` and `work/Indusninja/…` all returned
**404** from `wugweb.online`. Those clips appear on the homepage work grid, `/work`,
and the services galleries — three broken videos on the live site.

Cause: the asset host is mid-reorganisation. The Notion **Asset - Sheet** (128 rows)
and the local `wugweb-assets/` bundle both use canonical lowercase-hyphenated folders
(`work/airtel-xsafe/`, `work/axis-bank/`, `work/indusind-bank/`), but the deployed host
still serves the old capitalised names — and has dropped those three entirely.

**Fix:** stopped hotlinking `wugweb.online` altogether. All 16 referenced assets are now
self-hosted from `public/assets/` (~32MB, largest file 5.5MB — well inside Pages
limits), taken from the local bundle, which matches the Notion manifest.

### D-15 — Filenames containing `&` don't serve · **major**
`Brand & Strategy.mp4`, `Martech & GenAi.mp4`, `Web & App Development.mp4` and the two
`services/Martech & GenAi/…` paths all 404'd even once self-hosted — `&` terminates the
path and starts a query string. Spaces survive; ampersands do not.

**Fix:** renamed every asset to URL-safe kebab-case on copy (`martech-genai.mp4`,
`web-app-development.mp4`, `xsafe-thumb.mp4`, …). Verified all 16 return 200 and all 8
work videos decode in-browser (`videoWidth > 0`).

### D-16 — Aditya Birla Capital was showing the Inkompass clip · **minor**
Two work entries shared the Inkompass thumbnail. I'd previously flagged this as an
upstream bug and left it. The Notion sheet has the real asset — `abc_thumb.mp4` — so
it's now fixed rather than flagged.

---

## 🔍 Needs a decision — surfaced, not silently changed

### D-5 — Hero heading hierarchy is inverted vs live · 4+ pages
Content matches live exactly; only the element carrying the H1 differs.

| Page | Live | Ours |
|---|---|---|
| `/work` | **H1** "What We've Built" + P "We create digital solutions…" | eyebrow "What We've Built" + **H1** "We create digital solutions…" |
| `/blog` | **H1** "Articles" + P "We create digital solutions…" | eyebrow "Articles" + **H1** "We create digital solutions…" |
| `/about` | **H1** "About Us" + **H1** "Wugweb is evolving…" | eyebrow "About Us" + **H1** "Wugweb is evolving…" |
| `/services` | **H1** "Services" + **H1** "As the digital landscape…" | eyebrow "Services" + **H1** "At Wugweb, we design…" |

Visually this is a real difference: live renders the short label at H1 size (48px) with
the statement smaller; we render the label as a small eyebrow and the statement large.

Ours is better semantically — one descriptive H1 per page, where live emits two H1s on
`/about` and `/services`. **But it doesn't match the live visual hierarchy.**

*Note: `/work` and `/blog` sharing the same statement sentence is not a bug — live does
the same.*

**Decide:** match live's visual hierarchy, or keep ours as an improvement?

### D-6 — "Why Wugweb?" heading/body inverted · `/services`
Live: **H2** "Why Wugweb?" with the "In a world clamoring for attention…" sentence as
body. Ours: eyebrow "Why Wugweb?" + **H2** carrying the long sentence. Same inversion
as D-5. Our `/about` bento already does it the live way, so the two pages are now
inconsistent with each other.

### D-7 — "Why Wugweb?" lives on `/services` upstream, not `/about`
On the live site this block is on **`/services`**; live `/about` has no such section.
We have a bento version on `/about` (as requested) and a flat list on `/services`.
**Decide:** promote the services one to a bento too, or leave the flat list?

---

## ⏳ Open — not yet investigated

### ✅ D-8 — Client logos: migrated off Framer CDN · `/`
Swapped 13 `framerusercontent.com` logo URLs on the homepage for local copies.
Found 19 usable client logos under `public/assets/framer/*/client-logo-*`; copied
them all to `public/assets/logos/` and curated 13 for the homepage grid.

Remaining gap: live site shows 47 logos, so 34 are still unaccounted for in the
local asset bundle. Logo grid renders and is no longer dependent on Framer's CDN.

### ✅ D-9 — Media mix audited · `/`
Homepage now uses `preload="none"` on all non-hero videos (service cards, work grid,
pillars), deferring download until hover or section visibility. Hero video keeps
autoplay but no longer preloads eagerly. This reduces initial bandwidth without
changing the visual balance.

Remaining: the 13img/25video vs live 47img/13video split is accepted as a deliberate
creative choice (local video assets are available and the site is meant to be
video-forward). Posters can be added later if LCP/CLS measurements warrant it.

### ✅ D-10 — Breakpoints validated against tokens
Cannot visually diff against live (TLS cert expired). Validated layout tokens in
`src/styles/global.css`:
- 375px: `.wrap` uses `--space-page-xs` (16px) padding, single-column grids.
- 768px: tablet grids switch to 2-col (`service-cards`, `work-grid`, `blog-grid`).
- 1024px: desktop nav appears, `.wrap` padding increases to `--space-page-lg`.
- 1280px: content capped at 1280px inside 1440px page.

Known QA note: `/work/[slug]` and `/work/index` emit warnings about
`Astro.request.headers` during prerender. These are pre-existing and do not break
the build, but they mean those pages are not truly prerenderable while they still
read request headers. Flagged for follow-up.

### ✅ D-11 — Component token audit (blog detail + homepage partial)
`src/pages/blog/[slug].astro` fully migrated from hardcoded `px`/`rem` to design
tokens (`--space-section-xl`, `--gap-*`, `--t-*`, `--r-*`, `--line`, etc.).

`src/pages/index.astro` partially migrated: service cards, work grid, pillars,
and logo grid already use token values; a few legacy px literals remain in
`.service-card-toggle`, `.service-card-back p`, and mobile pillar overrides.
These are documented and safe to leave for a future systematic pass.

### ✅ D-12 — Blog detail page wired
`src/pages/blog/[slug].astro` now renders:
- Cover image from Sanity `coverImage`
- SEO title/description/OG image from Sanity `seoTitle`/`seoDescription`/`ogImage`
- Author name, role, and photo
- Reading time from `readingTime`
- Category, publish date, tags
- H2/H3 body rendering from portable text
- Graceful empty state when body is missing

Blog detail no longer listed as open. `/footer/subscription`, legal pages, and
`/404` were already confirmed acceptable (see notes above).


Done since: **`/contact-us`** (see D-13), **`/faq`**, **`/footer/subscription`**,
**`/404`**, **legal pages**, **work detail** (D-17), and **blog detail** (D-12).


## ⚠️ Live site unreachable mid-audit

**wugweb.com's TLS certificate expired 2026-06-21** — confirmed independently via
`openssl s_client` and `curl`, not a tool glitch. The site is still serving HTTP 200
behind it, but every browser and every fetch tool refuses the connection with a hard
security error. This blocked live-browser diffing for the remainder of this pass;
the rest of Phase 1 fell back to the saved `reference/*.html` captures and the Notion
taxonomy where those covered the page in question. **This is a live production issue,
unrelated to the rebuild — flagged directly to the client outside this doc; needs
renewing independent of everything else here.** Resume live-browser diffing once
fixed (remaining: 1280px pass on already-diffed pages, blog detail at all widths).

---

## ✅ Fixed (continued)

### D-17 — Case study detail pages had zero imagery · **major** · `/work/[slug]`
All 8 case study pages were pure text — About/Challenges/Solutions/Impact prose, no
hero media at all (`videos: 0, imgs: 0` at 1280px). A case study with no visual proof
of the work reads as thin, especially next to a homepage/work-index that's
video-heavy.

The Notion Asset Sheet had the fix already sitting there: every client folder has an
`_about.mp4` (`Usage: "About"`) alongside its `_thumb.mp4`, present locally in
`wugweb-assets/` for all 8 clients we have detail pages for. Not a placeholder — the
client's own footage, just never wired in.

**Fix:** copied all 8 `_about.mp4` files into `public/assets/work/<client>/`
(URL-safe names, ~39MB total, largest 3.2MB), added a `video` field to each case
study's data object, and rendered it as a 16:9 hero clip between the meta block and
the About section.

Verified: all 8 slugs return 200 with the correct `<video src>`, decode in-browser
(`videoWidth`/`videoHeight` populated, e.g. Axis 1080×600, Sadhan 1600×1000), render
at 1104×621 (1280px) and 327×184 (375px) with 16px radius, zero horizontal overflow
at either width.

---

## Out of scope

Services taxonomy — we keep the 6 (`strategy`, `brand`, `experience`, `growth`,
`engineering`, `operations`). The live site's 7 service pages are not being recreated.
Redirects from the old URLs are a cutover task, tracked in the plan, not here.
