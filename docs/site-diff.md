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

**Progress:** structural diff at 1440 complete for 7 page pairs. Component-level token
diff and the other four breakpoints (375 / 768 / 1024 / 1280) still to do.

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

### D-8 — Client logos: 47 images live vs 13 ours · `/`
Live homepage loads 47 images, ours 13. Ours still hotlinks `framerusercontent.com`,
and `wugweb-assets/` contains 24 real client logos (20 bank + 4 OTA) that are unused.
Needs a visual check of whether our logo grid is actually rendering.

### D-9 — Media mix inverted · `/`
Live: 47 img / 13 video. Ours: 13 img / 25 video. We lean much harder on video. May be
deliberate, may be a perf problem — needs a look.

### D-10 — Remaining breakpoints
375 / 768 / 1024 / 1280 not yet diffed on any page.

### D-11 — Component-level token diff
Spacing, stroke, shadow, radius and colour comparisons per component not yet done —
only page-level block inventory so far.

### D-12 — Pages not yet diffed
`/contact-us`, `/faq`, `/footer/subscription`, legal pages, `/404`, work detail, blog
detail. Ours are notably thin: `/contact-us` and `/footer/subscription` have only an
H1 plus the globals.

---

## Out of scope

Services taxonomy — we keep the 6 (`strategy`, `brand`, `experience`, `growth`,
`engineering`, `operations`). The live site's 7 service pages are not being recreated.
Redirects from the old URLs are a cutover task, tracked in the plan, not here.
