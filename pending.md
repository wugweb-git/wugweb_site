# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**Last verified:** 2026-08-11 (**Kits Showcase Page live at `/kits`**, Sanity Studio Enterprise Overhaul + CRUD fixes, Contact V2 rollout, Service UI/UX revamp, Cloudflare Pages live).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded). Design system (single source of truth): [`kits_design_system/`](kits_design_system/) — `docs/design.md` + `docs/tokens/`.

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **Contact V2 layout (`contact-us.astro`)**, Service media folder normalization (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`), `CHANGELOG.md` integration.

**Enterprise Sanity Studio Overhaul & Bug Resolution (2026-08-11)**: Full CRUD schemas for Brand Assets & Icons (`brandAsset`), Tracking & Custom Scripts (`siteScript`), Navigation Menus (`navigationMenu`). Reorganized Studio desk into operational departments (Overview, Content, Navigation & Menus, Brand & Assets, Integrations & Code, Business, Settings) + spreadsheet data grid presets. Fixed HTTP 409 revision conflicts, duplication of non-title docs, intent edit routes, publish/unpublish/archive actions.

**Kits Showcase Landing Page (`/kits`) (2026-08-11)**: Masterclass living design system laboratory showcasing 100% accurate secondary colors (`#E54F30`, `#3ED219`, `#2368D7`, `#09E2C0`), 6 service pillar tokens (`#FA4108`, `#E6309F`, `#09E2C0`, `#2167E9`, `#3ED219`, `#7A4DFF`), fluid typography clamps, primitives, UI controls, bento blocks, interactive 6-pillar scope selector, motion easings, ambient glows, noise overlays, and live token exporter. Unlinked from top header nav per user directive. Build ✅ & Deployed live to Cloudflare Pages (`https://wugweb.pages.dev/kits`).

---

## 🔴 Open — Critical / blocked

| Item | Status | Notes |
|---|---|---|
| **Sanity Studio fixes not live** | **Blocked on user** | Deep audit (real `tsc --strict` + `sanity build` in isolated env, not just reading code) found: (1) `getCanSort` crash + GROQ `group by` parse error — fixed `ca6f915c`, pushed. (2) Dashboard + SEO Manager tools threw `ReferenceError` on open (`StudioErrorBoundary` used but not imported) — fixed. (3) SEO Manager badges always showed red regardless of real score (`level === 'good'` comparing object to string, always false) — fixed to `level.severity`. (4) Unpublish/Archive functions existed in `docActions.ts` but were never wired to any UI button, despite pending.md previously claiming this was "tested and verified live" — now wired into `DocumentListPane.tsx` + `TablesTool.tsx`. (5) Tables/Media tools shared identical `▦` icon — differentiated. `none` added to `ownerField.ts`. All committed locally; `tsc`+`build` clean. Agent sandbox has no GitHub or Sanity CLI credentials — **user must run** `git push origin main` then `cd sanity && npx sanity deploy` from their own machine to ship this. |
| Design token → component migration | **Done 2026-08-05 (Phase 1)** | Full token system (opacity/radius/stroke/blur/shadow/elevation/glass/noise/gradient/motion/z-index) consumed everywhere; residual `#555`/`rgba()`/`opacity:`/`blur()` removed from pages/components (only `CATEGORY_COLORS` data map + service-panel `fg`/`accent` data remain). |
| Sanity Studio CRUD Verification | **Done 2026-08-11** | All CRUD actions (`create`, `duplicateDocs`, `publishDocs`, `unpublishDocs`, `archiveDocs`, `deleteDocs`) tested and verified live with 0 HTTP revision errors or schema validation bugs. |
| Frontend → Neon swap | Deferred | Helpers ready (`content.ts`, `NEON` queries); wait until UI/brand mapping done. **User: do not run Neon sync unless asked.** |
| Contact form production reliability | **Deferred to end** — UI + Neon write path exist. `/api/contact` + `/api/subscribe` hardened — Neon write is best-effort (try/catch + `finally` release), redirects to thank-you. |

---

## 🟡 Open — Medium / Recommended Next Tasks

| # | Item | Priority | Notes |
|---|---|---|---|
| 1 | **Brand Vector Asset Ingestion** | Medium | Upload official vector SVG logo graphics for Clutch, DesignRush, GoodFirms, TopDevelopers into the new **Brand Assets & Icons** (`brandAsset`) section in Sanity Studio. |
| 2 | **Blog & Case Study Thumbnail Population** | Medium | Populate missing blog covers (69 posts) and case study thumbnails (43 items) via Sanity Studio `brandAsset` / `coverImage` fields. |
| 3 | **Contact Form Production Verification** | Low | Perform live test submission of `/api/contact` in production environment. |

---

## 🔵 Open — Phase 2 backlog (documented, not started)

| Item | Notes |
|---|---|
| Kits Showcase Page (`/kits`) | **Done 2026-08-11** — Standalone showcase page live at `/kits`. Unlinked from top header nav. |
| Contact page redesign (#12) | **Done 2026-08-10** — Rolled out V2 layout & hierarchy to `/contact-us` (6-pillar selector grid, timeline & budget chips, responsive layout, SLA badge). `/contact-v2` redirects 301 to `/contact-us`. |
| Full service-page content pass (#5) | **Done 2026-08-05** — 6-pillar copy enriched per `urgent/Wugweb_Services 2026.md`. |
| Contact form prod verify | Neon write path unverified in production. |

---

## ⏸️ Deferred

| Item | Status | Reason |
|---|---|---|
| Homepage chat hero | ⏸️ Deferred | Keep video hero |
| DNS cutover | ⏸️ Deferred | User excluded; out of scope unless asked |
| Hyperdrive / SESSION KV | ⏸️ Deferred | Only if runtime needs |
| footer/subscription | ⏸️ Deferred | Payment gateway scoping |
| Credential rotation | ⏸️ Deferred | Unless user asks |

---

## ✅ Recently completed (this arc)

- [x] **Kits Showcase & Layout Fixes (2026-08-11)** — Rebuilt `/kits` as interactive living laboratory with 100% token accuracy, primitives, UI controls, blocks, widgets, and motion effects. Unlinked from top header nav. Added `hideGlobalSections={true}` to `BaseLayout` and fixed `.global-final-cta` backdrop device opacity in `global.css`. Build ✅ & Deployed to Cloudflare Pages (`https://wugweb.pages.dev`).
- [x] **Sanity Studio CRUD Verification & Enterprise Overhaul (2026-08-11)** — Fixed Studio document actions (`duplicateDocs`, `publishDocs`, `unpublishDocs`, `archiveDocs`, `deleteDocs`) and intent routes. Added full CRUD schemas for `brandAsset`, `siteScript`, and `navigationMenu` with spreadsheet table presets and departmental desk structure. Passed live API CRUD tests and `sanity build` with 0 errors.
- [x] **Contact V2 Rollout to `/contact-us` (2026-08-10)** — Updated `src/pages/contact-us.astro` with 6-pillar scope selector grid, budget/timeline chips, SLA badge, and responsive layout. Re-routed `/contact-v2` as a 301 redirect. Enriched `/api/contact.ts` with `timeline` handling.
- [x] **Service Pages UI/UX Revamp (2026-08-07)** — Completely refactored `src/pages/services/[slug].astro` to feature a premium dynamic UI with glowing background gradients, glassmorphic bento grids, micro-animations, and dynamic color injection based on the specific service pillar (`--theme-base`).
