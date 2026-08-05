# Framer / build full audit

**Audited:** 2026-08-04 (updated same day — expanded salvage)  
**Framer preview:** `https://lucky-subtasks-379995.framer.app`  
**Production:** `https://wugweb.pages.dev`  
**Local capture:** `reference/` + `component/`

This is an honest inventory. Full **pixel / motion / code-component** parity with Framer is still **not** claimed. Progress below is what was finished in the fast salvage pass.

---

## Progress since first audit

| Item | Status |
|---|---|
| Framer style board → tokens | **Verified** — locked live colours match; service panel accents added (`--svc-*`). Report: `docs/framer-token-sync-report.json` |
| Missing page HTML capture | **Done** — home, faq, work, blog, lead-generation, footer/industries, footer/subscription (+ assets). Report: `docs/framer-page-capture-report.json` |
| SEO salvage for those pages | **Done** → Sanity singletons + `service-lead-generation`. Report: `docs/framer-seo-salvage-report.json` |
| Toolkit icons | **89** (prior pass) |
| `/footer/industries` Astro route | **Added** + footer link |
| `/services/lead-generation` | **Routable** |
| Nav screenshots → new nav UI | **Not** ported (still design reference only) |
| Framer motion / code components | **Not** ported (Astro keeps limited `motion` reveals) |

**Keep `reference/` + `component/`** — still needed; do not delete.

---

## 1. Was everything salvaged? **Still no (full visual), but capture gap closed for key pages**

| Layer | Status | Notes |
|---|---|---|
| Service SEO / Why Us / approach / toolkits | Strong for 6+ Framer services + lead-gen SEO | Prior extract + SEO salvage |
| Tool icons → tech-stack + Asset DB | **89** icons | `scripts/salvage-framer-toolkits.mjs` |
| Platform master | Not bulk-updated | |
| Fonts / colors / breakpoints | **Typography implemented** (#43) — Inter Tight + Fragment Mono; Display≠H1; `--t-*` tiers from style board. Components still have some leftover rem (fold into #16) | |
| Component UI / nav from `component/` | **Not** ported | Keep as reference |
| Motion / Framer blocks | **Not** ported | |
| Framer sitemap pages in `reference/` | **Expanded** — was 10 HTML, now includes home/faq/work/blog/lead-gen/industries/subscription | Soft asset cap per page (Rule 1) |

---

## 2. Asset mapping (Sanity)

Unchanged core gaps: blog covers 43/96, case thumbs 39/82, etc. Tool icons 89. See `docs/content-assets.md`.

---

## 3. Production routes

Framer service slugs live after prior deploy. This pass adds `/footer/industries` after redeploy; lead-generation routes via Framer→pillar map.

---

## 4. Sitemap in footer?

**Yes** (+ Industries link added).

---

## 5. Keep or delete folders? (updated 2026-08-05)

| Folder | Verdict |
|---|---|
| `component/` | **Delete-safe** — fully consumed (nav screenshots → SiteHeader; style JSON → tokens) |
| `reference/` | **Keep** — holds expanded offline HTML/media; service-page media extraction pending (#42) |

---

## Scripts

| Script | Role |
|---|---|
| `scripts/sync-framer-tokens.mjs` | Verify Framer style board vs `global.css` |
| `scripts/capture-framer-pages.mjs` | Download missing Framer pages into `reference/` |
| `scripts/salvage-framer-seo-pages.mjs` | SEO → Sanity |
| `scripts/salvage-framer-toolkits.mjs` | Toolkit icons |
| `scripts/audit-framer-service-pages.mjs` / `extract-framer-service-pages.mjs` | Service extract |

Coolify remains out of scope (Cloudflare Pages only).
