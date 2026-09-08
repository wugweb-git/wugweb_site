# Frontend Audit — wugweb.pages.dev

**Date:** 2026-09-04 · **Scope:** live site + `src/` + Cloudflare Pages config
**Method:** every finding below was verified against a file/line or a live HTTP response. Nothing here is inferred.

---

## Verdict

The Sanity/Studio layer is genuinely well built. **The public frontend is not.** Three classes of problem:

1. **Invisible content.** `--neutral-1` (`#F4F4F4`) is used as a background in 18 places on a dark-theme site, with text left at `--fg` (`#F4F4F4`). That is a **1:1 contrast ratio** — literally invisible text, confirmed live on `/services` and in every blog article's blockquote/code block.
2. **Nothing is cached and nothing is prerendered.** Zero pages use `prerender`. Every request SSRs on a Worker and makes 3–4 blocking Sanity calls. Every asset returns `max-age=0, must-revalidate`. TTFB peaks at 1.31 s and the homepage re-downloads **9.85 MB of autoplaying video on every single visit.**
3. **SEO fundamentals are missing.** Zero canonical tags, zero `og:url`, zero structured data, `og:image` is a relative path (so no social preview renders anywhere), the advertised sitemap 404s, and there is a byte-identical duplicate page indexed at two URLs.

`pending.md` claims the token migration removed residual hardcoded values from pages/components. That claim is false — there are 463 hardcoded colour values in `src/pages`, `src/components`, `src/layouts` today.

---

## P0 — Broken in production

### 1. Invisible text: `#F4F4F4` on `#F4F4F4`
`--neutral-1: #F4F4F4` (`global.css:104`) and `--color-text-primary: #F4F4F4` (`global.css:131`, aliased to `--fg` at `:177`).

Confirmed instances where a `--neutral-1` background is paired with `--fg` text:

| File | Line | Element |
|---|---|---|
| `src/pages/services/index.astro` | 121–131 | `.stat-card-wrap` + `.stat-label` — "Years of experience" etc. invisible |
| `src/pages/blog/[slug].astro` | 302 | `.article-body blockquote` — explicitly sets `color: var(--fg)` |
| `src/pages/blog/[slug].astro` | 304 | `.article-body code` — inherits `--fg` |
| `src/pages/blog/[slug].astro` | 305 | `.article-body pre` — inherits `--fg` |

`--neutral-1` is used as a background in **18 places total** (`index`, `about`, `blog`, `work`, `services`, `footer/impact`). Some correctly override the text colour (e.g. `index.astro:615` sets `color: var(--color-ash)`); the rest need auditing one by one.

Also: `--line: rgba(255,255,255,0.05)` is used as the border on these light cards — also invisible against `#F4F4F4`.

**Fix:** introduce a proper light-surface pair (`--surface-inverse` / `--fg-on-inverse`) and sweep all 18 usages. Add a CI contrast check so this can't recur.

### 2. `[data-reveal] { opacity: 0 }` with no fallback
`global.css:750`. **41 elements on the homepage** start invisible and are revealed only when GSAP runs (`src/lib/scroll-animations.ts`). There is no `<noscript>` fallback anywhere on the site (`grep noscript` → 0).

If GSAP fails to load, errors, or is slow, 41 content blocks — including `<h1>`s on the legal pages — stay permanently invisible. It also delays perceived LCP even in the happy path: **11 seconds after navigation the homepage hero was still mid-animation and the hero video had not painted** (verified in browser).

**Fix:** `@media (scripting: none) { [data-reveal] { opacity: 1 } }` plus a `.js-ready` class on `<html>` set synchronously in `<head>`, so opacity:0 only applies once JS is confirmed alive.

### 3. `og:image` is a relative URL — no social previews work
`BaseLayout.astro:25–31`. Live output: `<meta property="og:image" content="/brand/og-default.png">`.

The Open Graph spec requires absolute URLs. **No link to any wugweb page renders a preview image on LinkedIn, Slack, WhatsApp, X, or Facebook.** Same bug on `twitter:image`.

**Fix:** `new URL(metaOgImage, Astro.site).href`, and set `site:` in `astro.config.mjs`.

### 4. "Stats" that are ordinals, not stats
`src/pages/services/index.astro:64–69`:
```js
{ n:'01', label:'Years of experience', ... }
{ n:'04', label:'Start Smart, Start Small', copy:'' }
```
The page renders "**01** / Years of experience" — reading as *one year of experience* for an agency positioning on 12+ years. Card 04 has an empty `copy` and renders as a blank box.

---

## P1 — Performance

### 5. Nothing is prerendered
`astro.config.mjs` sets `output: 'server'`. `grep "export const prerender" src/pages` returns **only the 4 API routes**. Not one page is static — including `/termsofuse`, `/privacy-policy`, `/faq`, `/404`.

Every request therefore: boots a Worker → runs middleware → makes 3 blocking Sanity fetches in `BaseLayout` (siteSettings, postsList, industries — lines 20, 41, 55) → plus the page's own queries.

Measured TTFB:

| Path | TTFB |
|---|---|
| `/about` | **1.31 s** |
| `/work` | **1.17 s** |
| `/services/brand` | **1.16 s** |
| `/blog` | 0.71 s |
| `/` | 0.67 s |

**Fix:** `export const prerender = true` on every marketing/legal page; keep SSR only for `/api/*` and anything genuinely per-request. Expect TTFB to drop to edge-cache latency.

### 6. Every asset is `max-age=0, must-revalidate`
There is no `public/_headers` file. Verified live:
```
/assets/more/home/home.mp4   → cache-control: public, max-age=0, must-revalidate
/_astro/index.KqUUdcyX.css   → cache-control: public, max-age=0, must-revalidate
```
The `_astro/*` files are **content-hashed** — they are immutable by construction and are being revalidated on every page view anyway.

**Fix — highest value-per-minute change on this list.** Add `public/_headers`:
```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/brand/*
  Cache-Control: public, max-age=604800
```

### 7. 9.85 MB of autoplaying video on the homepage
The videos carry `preload="none"`, but **`autoplay` overrides `preload="none"`** — browsers fetch autoplay sources immediately. 9 `autoplay` attributes ship on `/`; 5 unique files:

| File | Size |
|---|---|
| `work/airtel-xsafe/xsafe-thumb.mp4` | 3.24 MB |
| `work/kia/kia-thumb.mp4` | 2.24 MB |
| `work/airtel-xstream/Xstream-thumb.mp4` | 1.89 MB |
| `work/adtech/adtech-thumb.mp4` | 1.36 MB |
| `more/home/home.mp4` | 1.12 MB |
| **Total** | **9.85 MB** |

Combined with finding 6, that is 9.85 MB re-fetched on every visit. On Indian 4G this is a multi-second hero.

**Fix:** drop `autoplay` from the four work thumbnails and start them via IntersectionObserver; add `poster` frames; re-encode to H.264 720p + WebM/AV1; keep only the hero eager.

### 8. Asset library: 698 MB, 112 MB of it duplicated
`public/assets` = 698 MB / 800 files. Checksum analysis: **86 duplicate groups, 112.0 MB wasted.** Whole folders are cloned:
- `services/engineering/*` ≡ `services/operations/*`
- `services/brand/*` ≡ `services/strategy/*`
- `assets/framer/*` ≡ `assets/work/*` for many case studies

Format mix: **286 PNG + 233 JPG vs only 23 WebP.** Individual files up to 8.7 MB (`services/reference/qa-img-5.jpg`).

Also `public/assets/work/metcred/challenges` — a 6.1 MB file with **no file extension**, so it is served without a correct content type.

All 698 MB is uploaded to Cloudflare Pages on every deploy even though `PUBLIC_USE_R2_ASSETS=1` — and `src/pages/index.astro` doesn't call `assetUrl()` at all, so the homepage bypasses R2 entirely and serves from Pages. The R2 cutover is half-done.

### 9. Render-blocking Google Fonts
`BaseLayout.astro:101–107` loads `Inter Tight` with the **full variable range, italic and roman (`ital,wght@0,100..900;1,100..900`)** plus `Fragment Mono`, as a render-blocking `<link rel="stylesheet">` to a third-party origin.

**Fix:** self-host the two woff2 files in `public/`, subset to Latin, drop the italic axis if unused. Removes two DNS+TLS handshakes and the render block.

### 10. CSS is fragmented across 22 inline `<style>` blocks
Every page has its own `<style>` block, and Astro's chunking leaks them: **the homepage loads `about.ClDYjnbA.css` (33 KB)** alongside `index.KqUUdcyX.css` (17 KB). 50 KB of render-blocking CSS on `/`, a third of which belongs to another page.

---

## P2 — SEO / discoverability

### 11. Zero canonical tags, zero `og:url`, zero structured data
Verified across all of `src/` and live HTML:

| Tag | Count |
|---|---|
| `rel="canonical"` | **0** |
| `og:url` | **0** |
| `og:site_name` | **0** |
| `application/ld+json` | **0** |
| `meta robots` | **0** |
| `hreflang` | **0** |

No `Organization`, `BreadcrumbList`, `Article`, or `Service` schema anywhere. For an agency competing on search and increasingly on AI answer surfaces, this is the cheapest win available.

### 12. Duplicate page at two indexable URLs
`src/pages/refund-policy.astro` and `src/pages/footer/refund-policy.astro` are **byte-identical** apart from the import path. Both return HTTP 200 with an identical 25,677-byte body. With no canonical tag, this is textbook duplicate content.

### 13. The advertised sitemap does not exist
`public/robots.txt` declares `Sitemap: https://wugweb.com/sitemap.xml`.
- `https://wugweb.pages.dev/sitemap.xml` → **404**
- There is no `@astrojs/sitemap` integration
- `src/pages/footer/sitemap.astro` is an HTML page at `/footer/sitemap`, not an XML sitemap

### 14. The production domain is `wugweb.pages.dev`
Cloudflare Pages project `wugweb`: `domains: ['wugweb.pages.dev']`. **`wugweb.com` is not attached.** Meanwhile `robots.txt` says `Allow: /` with no `noindex`, so the preview domain is fully crawlable and will compete with the real domain in the index.

---

## P3 — Security, privacy, correctness

### 15. Zero security headers
Live response headers on `/` contain **none** of: `strict-transport-security`, `content-security-policy`, `x-frame-options`, `x-content-type-options`, `referrer-policy`, `permissions-policy`. Same `_headers` file as finding 6 fixes this.

### 16. Tracking cookie set before consent; consent UI does nothing
- `src/middleware.ts` sets a **1-year `visitor_id` cookie on every response**, unconditionally, before the cookie banner is answered. Verified live: `set-cookie: visitor_id=...; Max-Age=31536000`.
- The consent modal's Analytics toggle does exactly one thing (`BaseLayout.astro:493–495`): `console.log('[Consent] Analytics allowed...')` and dispatches a `wugweb-analytics-allowed` event **that nothing listens to**.
- There is no analytics on the site at all — no GA, GTM, Plausible, PostHog. Cloudflare Web Analytics is also off on the Pages project (`web_analytics_tag: null`).

So: you are asking for consent to tracking that doesn't exist, while setting a persistent identifier without consent, and collecting no data. That's the worst of all three worlds, and the `console.log` ships to production.

### 17. `set-cookie` on every response defeats edge caching
Because the middleware sets a cookie on every response including static legal pages, those responses can never be cached at the edge. Skip the cookie for prerendered/static routes.

### 18. Preview deployments are broken
Cloudflare Pages `preview` environment has: **no env vars, no KV bindings, no R2 bindings, no `nodejs_compat` flag** (production has all four). Any branch or PR deploy will fail on the missing `SESSION` binding — the exact error already documented in `wrangler.jsonc`.

### 19. No skip-to-content link
`grep 'skip-link\|skip to content'` → **0**. WCAG 2.4.1 (A) failure. Keyboard users tab through the full header nav on every page. Header a11y is otherwise good (`aria-current`, `aria-expanded`, `aria-controls` are all correct in `SiteHeader.astro`).

### 20. 463 hardcoded colour values contradict `pending.md`
`pending.md` states residual hardcoded values were "removed from pages/components". Actual counts in `src/pages` + `src/components` + `src/layouts`: **317 hex literals + 146 `rgba()` literals**.

Worst offenders (excluding `kits.astro`, where literals are the point):

| File | Count |
|---|---|
| `PortableTextRenderer.astro` | 85 |
| `footer/industries.astro` | 30 |
| `footer/subscription.astro` | 19 |
| `blog/index.astro` | 17 |

`global.css` itself carries 62 hex literals alongside 491 custom-property declarations.

### 21. Smaller items
- 17 of 24 `<img>` tags lack `width`/`height` → CLS. (All 24 have `alt` — good.)
- `<video src={x}><source src={x}></video>` in `index.astro:204` — redundant `<source>` child, the attribute wins.
- Service worker (`public/sw.js`) is network-first for all HTML, so it adds a fetch hop for no cache benefit; `CACHE = 'wugweb-shell-v1'` is hardcoded and never bumped, so the precached shell can go stale indefinitely.
- `wrangler` is in `devDependencies` but **not installed** in `node_modules/.bin` — `npm run dev`, `preview`, and `deploy` all fail until `npm install`.
- The `CLOUDFLARE_API_TOKEN` in `.env` is dead (`Invalid API Token`).
- `src/lib/sanity.ts` reads `import.meta.env.SANITY_PROJECT_ID`, which is not populated at runtime on Workers; it only works because of the hardcoded `'splvhmk1'` fallback.
- Worker `wugweb` in the account was last modified 2026-07-27 while the site last deployed 2026-08-30 — likely a stale artifact worth deleting.

---

## Recommended order

**This week — measurable, low risk**
1. `public/_headers` — cache + security headers (finding 6, 15). One file, biggest single win.
2. Fix the `#F4F4F4`-on-`#F4F4F4` contrast bug (finding 1).
3. Absolute `og:image`/`og:url` + canonical tags (finding 3, 11).
4. `prerender = true` on all static pages (finding 5).
5. Delete `src/pages/footer/refund-policy.astro`, add a redirect (finding 12).

**Next — needs a little work**
6. Drop `autoplay` from work thumbnails, add posters, re-encode (finding 7).
7. `[data-reveal]` no-JS fallback (finding 2).
8. `@astrojs/sitemap` + fix `robots.txt` (finding 13).
9. Deduplicate 112 MB of assets, convert PNG/JPG → WebP, finish the R2 cutover (finding 8).
10. Self-host fonts (finding 9).

**Then — decisions, not just fixes**
11. Attach `wugweb.com` to the Pages project, or `noindex` the pages.dev domain (finding 14).
12. Decide on analytics: either install one and make the consent toggle real, or remove the consent theatre and the `visitor_id` cookie (finding 16).
13. Fix the preview environment bindings (finding 18).
14. Token sweep — 463 hardcoded values, and update `pending.md` to stop claiming it's done (finding 20).
