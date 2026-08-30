# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**Last verified:** 2026-08-30 (**Sanity Studio & Frontend Full Remediation & Enhancements** — Project ID & `apiVersion: 2026-01-01` unified; deterministic GROQ `[0]` selection against draft pollution; 11-query Dashboard collapsed into 1 batched GROQ projection; `useRouter` adopted; pagination added to `SeoTool`/`MediaTool`; slug & singleton uniqueness validation in schemas; `@sanity/icons` native system upgrade + full editorial desk restructure; `PortableTextRenderer.astro` created with support for all 9 custom blocks replacing unsafe `set:html`; all 6 footer sub-pages synced to `singletonPage`; custom visual block previews in Studio; R2 asset search/autocomplete input component created; `/api/contact` live-tested in production; blog deduplication audit identifying 21 duplicate HTML string docs; Sanity health suite 16/16 ✅; Astro & Studio builds ✅).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded). Design system (single source of truth): [`kits_design_system/`](kits_design_system/) — `docs/design.md` + `docs/tokens/`.

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **Contact V2 layout (`contact-us.astro`)**, Service media folder normalization (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`), `CHANGELOG.md` integration.

**Enterprise Sanity Studio Overhaul & Bug Resolution (2026-08-11 & 2026-08-30)**: Full CRUD schemas for Brand Assets & Icons (`brandAsset`), Tracking & Custom Scripts (`siteScript`), Navigation Menus (`navigationMenu`). Reorganized Studio desk into operational departments (Content, Brand & Assets, Marketing, Business, Settings, System) + spreadsheet data grid presets. Fixed HTTP 409 revision conflicts, duplication of non-title docs, intent edit routes, publish/unpublish/archive actions. Added R2 Asset Autocomplete picker and rich visual block previews for Portable Text.

**Kits Showcase Landing Page (`/kits`) (2026-08-11)**: Masterclass living design system laboratory showcasing 100% accurate secondary colors (`#E54F30`, `#3ED219`, `#2368D7`, `#09E2C0`), 6 service pillar tokens (`#FA4108`, `#E6309F`, `#09E2C0`, `#2167E9`, `#3ED219`, `#7A4DFF`), fluid typography clamps, primitives, UI controls, bento blocks, interactive 6-pillar scope selector, motion easings, ambient glows, noise overlays, and live token exporter. Unlinked from top header nav per user directive. Build ✅ & Deployed live to Cloudflare Pages (`https://wugweb.pages.dev/kits`).

---

## 🔴 Open — Critical / blocked

| Item | Status | Notes |
|---|---|---|
| Design token → component migration | **Done 2026-08-05 (Phase 1)** | Full token system (opacity/radius/stroke/blur/shadow/elevation/glass/noise/gradient/motion/z-index) consumed everywhere; residual `#555`/`rgba()`/`opacity:`/`blur()` removed from pages/components (only `CATEGORY_COLORS` data map + service-panel `fg`/`accent` data remain). |
| Sanity Studio CRUD Verification | **Done 2026-08-11** | All CRUD actions (`create`, `duplicateDocs`, `publishDocs`, `unpublishDocs`, `archiveDocs`, `deleteDocs`) tested and verified live with 0 HTTP revision errors or schema validation bugs. |
| Contact Form Production Verification | **Done 2026-08-30** | Tested `/api/contact` live in production. Verified CSRF origin security, 302 redirect to `/thank-you`, and authenticated Sanity write client. |
| Frontend → Neon swap | Deferred | Helpers ready (`content.ts`, `NEON` queries); wait until UI/brand mapping done. **User: do not run Neon sync unless asked.** |

---

## 🟡 Open — Medium / Recommended Next Tasks

| # | Item | Priority | Notes |
|---|---|---|---|
| 1 | **Blog 21 Duplicate Stubs Cleanup** | Medium | Clean up the 21 duplicate raw HTML string documents identified in the audit so only the 104 rich Portable Text posts remain. |
| 2 | **Brand Vector Asset Ingestion** | Medium | Upload official vector SVG logo graphics for Clutch, DesignRush, GoodFirms, TopDevelopers into the **Brand Assets & Icons** (`brandAsset`) section in Sanity Studio. |
| 3 | **Blog & Case Study Thumbnail Population** | Medium | Populate missing blog covers (70 legacy posts) and case study thumbnails via Sanity Studio using the new R2 Asset Autocomplete picker. |

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

- [x] **Sanity Studio & Frontend Contract Full Remediation (2026-08-30)** — Executed comprehensive 5-phase overhaul addressing both internal audit and Codex report findings:
  1. *Phase 1 (Zero-Risk & API Versioning)*: Unified all Studio tools, components, configs, and frontend queries to `apiVersion: 2026-01-01`; fixed hardcoded wrong project ID (`zy1el06f` → `splvhmk1`) in `test_sanity.mjs` and built 16-check smoke test suite (`npm run sanity:health`); hardened all GROQ queries with `!(_id in path("drafts.**"))` and `order(_updatedAt desc)` before `[0]`; collapsed 11 parallel Dashboard GROQ queries into 1 batched projection; replaced hash routing with `useRouter`; added pagination to `SeoTool` and `MediaTool`.
  2. *Phase 2 (Schema Hardening)*: Added async custom uniqueness validation to `service`, `post`, `caseStudy` (slug) and `singletonPage` (`pageId`); added non-blocking `r.warning()` editorial recommendations on key fields.
  3. *Phase 3 (Diagnostic & Merge Tooling)*: Created `find-duplicate-slugs.mjs`, `find-duplicate-singletons.mjs`, and safe unpublishing script `merge-duplicate-records.mjs` with dry-run support.
  4. *Phase 4 (Studio UX Redesign)*: Replaced 25+ emoji icons with native `@sanity/icons` React components; reorganized `deskStructure.ts` into a clean editorial hierarchy (Content → Brand & Assets → Marketing → Business → Settings → System).
  5. *Phase 5 (Typed PortableText Renderer)*: Built `src/components/PortableTextRenderer.astro` supporting all 9 custom blocks (images, videos, mediaUrl, CTA cards, stats rows, accordions, logo clouds, code blocks, 2-column layouts, marks, lists); replaced naive `set:html` across `blog/[slug].astro`, `work/[slug].astro`, `privacy-policy.astro`, and `termsofuse.astro`. Both Studio (`sanity build`) and Astro (`npm run build`) passing with 0 errors.
- [x] **Sanity Studio a11y pass (2026-08-15)** — Web Interface Guidelines audit (`/web-design-guidelines` skill) against all custom Studio tools. Fixed High-priority findings: table rows + sortable headers in `DataTable.tsx`/`SearchTool.tsx` were `onClick`-only, unreachable by keyboard — added `role="button"` + `tabIndex` + `onKeyDown` + `aria-label` + shared `:focus-visible` ring. Added `aria-label` to unlabeled search inputs, checkboxes, pagination buttons, density/table-type selects. Toast now uses `role="status" aria-live="polite"`. Fixed a GROQ injection risk in `SearchTool.tsx` (raw search terms interpolated unescaped into query strings) with an `escapeGroq()` helper. **Still open (Medium/Low from the audit, not yet done):** SeoTool has no pagination for up to 1000 rows; MediaTool silently truncates to 240/3000 assets with no "showing X of Y" indicator and no `loading="lazy"`; hardcoded `#e54f30` error color in 3 tools breaks dark-mode contrast (should use `var(--card-bad-fg-color, ...)`); custom tool nav icons are raw emoji instead of `@sanity/icons`; scattered hardcoded px spacing instead of Sanity UI's prop-based scale. Known caveat: table rows now use `role="button"` on `<tr>` containing nested interactive controls (checkbox/link/buttons) — functional and stops-propagation is handled, but not a fully clean ARIA pattern; a proper fix would restructure to avoid nested interactive elements.
- [x] **Sanity Studio deep audit & fix (2026-08-15)** — Real bugs confirmed via `tsc --strict` + isolated `sanity build`, not just code review: (1) `getCanSort` crash + invalid GROQ `group by` query — fixed. (2) Dashboard + SEO Manager tools threw `ReferenceError: StudioErrorBoundary is not defined` on open (missing import) — fixed. (3) SEO Manager badges always showed red regardless of real score (`level === 'good'` compared an object to a string, always false) — fixed to `level.severity`. (4) Unpublish/Archive existed in `docActions.ts` but were never wired to any UI button despite an earlier "tested and verified live" claim — now wired into `DocumentListPane.tsx` + `TablesTool.tsx`. (5) `table.getRow(id).getVisibleCells()` in `DataTable.tsx` threw at runtime under the installed `@tanstack/react-table` v9 (type-checks fine, breaks live) — rewrote to render cells from `columns` config directly. (6) Tables/Media icon collision fixed. (7) Added `none` to `ownerField.ts` owner options. **Deploy gotcha for next time:** don't `export SANITY_AUTH_TOKEN=<robot editor token>` in a terminal session you'll reuse — it silently overrides the real `sanity login` session for every command after, including `sanity deploy`, and Editor role can never deploy Studio (`deployStudio`/`deploySchema` are Administrator-only grants). Live and confirmed working at `wugweb.sanity.studio`.
- [x] **Kits Showcase & Layout Fixes (2026-08-11)** — Rebuilt `/kits` as interactive living laboratory with 100% token accuracy, primitives, UI controls, blocks, widgets, and motion effects. Unlinked from top header nav. Added `hideGlobalSections={true}` to `BaseLayout` and fixed `.global-final-cta` backdrop device opacity in `global.css`. Build ✅ & Deployed to Cloudflare Pages (`https://wugweb.pages.dev`).
- [x] **Sanity Studio CRUD Verification & Enterprise Overhaul (2026-08-11)** — Fixed Studio document actions (`duplicateDocs`, `publishDocs`, `unpublishDocs`, `archiveDocs`, `deleteDocs`) and intent routes. Added full CRUD schemas for `brandAsset`, `siteScript`, and `navigationMenu` with spreadsheet table presets and departmental desk structure. Passed live API CRUD tests and `sanity build` with 0 errors.
- [x] **Contact V2 Rollout to `/contact-us` (2026-08-10)** — Updated `src/pages/contact-us.astro` with 6-pillar scope selector grid, budget/timeline chips, SLA badge, and responsive layout. Re-routed `/contact-v2` as a 301 redirect. Enriched `/api/contact.ts` with `timeline` handling.
- [x] **Service Pages UI/UX Revamp (2026-08-07)** — Completely refactored `src/pages/services/[slug].astro` to feature a premium dynamic UI with glowing background gradients, glassmorphic bento grids, micro-animations, and dynamic color injection based on the specific service pillar (`--theme-base`).
