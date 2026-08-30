# Changelog

All notable changes to the Wugweb site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

---

## [Unreleased]

### Added
- **Brand Vector Asset Ingestion** (`scripts/ingest-brand-assets.mjs`) — Ingested 9 official vector SVGs and brand assets (Clutch, DesignRush, GoodFirms, TopDevelopers, Wugweb Large/Small logo lockups, OG Image, and Apple/PWA icons) into the Sanity `brandAsset` collection with inline SVG markup, usage specs, and variant tags.
- **Sanity Custom Document Badges** (`sanity/badges/documentBadges.ts`) — Real-time badge indicators in Studio for SEO Health (`SEO Ready`, `Short SEO Desc`, `Needs SEO`), Reading Time / Word Count calculation for posts, and R2 Media Asset status mapping (`R2 Media`, `Sanity CDN Media`, `No Cover Media`).
- **Interactive Code Block Copy & Language Badge** (`src/components/PortableTextRenderer.astro`) — Added copy-to-clipboard functionality with visual confirmation feedback and formatted code headers.
- **Reading Progress Bar** (`src/pages/blog/[slug].astro`) — Smooth scroll progress indicator pinned to top of articles with accent gradient.
- **Modal & Drawer Keyboard Accessibility** (`src/pages/footer/subscription.astro`) — Added `Escape` key listeners to dismiss drawer overlays and checkout modals.

### Fixed
- **Sanity Document Deduplication & Reference Integrity** (`scripts/merge-duplicate-records.mjs`) — Unpublished 21 duplicate raw HTML blog stubs, 6 duplicate service pillar documents, and 4 duplicate singleton pages while safely re-pointing all inbound asset references (`linkedPost._ref`) to canonical rich Portable Text records. Sanity health suite now passes 19/19 checks with 0 duplicate slugs or singletons.



---

## [2026-08-30] — Audit & Critical Bug Fix Session

### Fixed
- **`client.end()` → `client.release()` in all 4 Neon API routes** (`api/contact.ts`, `api/personalize.ts`, `api/subscribe.ts`, `api/sync.ts`) — `PoolClient` returned from `pool.connect()` exposes `.release()`, not `.end()`. The old call was throwing a runtime `TypeError` in every `finally` block, causing a 500 response even when the DB write itself succeeded. Contact form, subscribe, sync, and personalize endpoints were broken in production.
- **TypeScript errors cleared to 0** — Fixed `TS2339` (`.data` on `unknown` rows) and `TS2322` (return type mismatch) in `src/lib/content.ts`; fixed `TS18046` (`body` of type `unknown`) in `api/personalize.ts`. `tsc --noEmit` now exits clean.
- **JSDoc example in `lib/content.ts`** corrected to use `client.release()`.

### Added
- **SESSION KV namespace binding** added to `wrangler.jsonc` with real namespace ID (`db4a58a931d94d3cb89e23a95b7f01be`) — satisfies `@astrojs/cloudflare` session adapter; prevents `Invalid binding SESSION` runtime error.

### Docs / Chore
- **`CLAUDE.md` synced** with `AGENTS.md` (Aug-17 content now in the tracked file; was 2 weeks stale).
- **`.DS_Store` untracked** from git index (`git rm --cached`).
- **2 previously unpushed commits** pushed to `origin/main`.
- **`pending.md` updated** — last-verified timestamp set to 2026-08-30.

---

## [2026-08-16] — Comprehensive UI/UX Overhaul & Content Enrichment

### Added
- **Industries Marquee + Blog Teaser** — scrolling marquee of all 66 industry verticals and a Sanity-driven blog teaser strip appear globally across marketing pages.
- **Mouse-tracking cursor glows** on homepage service teaser cards — GSAP `mousemove` listener injects an ambient radial glow that follows the cursor within each card.
- **Premium inline SVG metadata icons** on blog header info line (author, date, read-time, category).
- **SVG icons for contact channels** in `SiteHeader` and `SiteFooter` — replaced text/emojis with stroked SVG icons.
- **Featured case studies recommendation block** on blog detail pages — replaced related-articles block with a Sanity-driven featured case study carousel.
- **Subscription page redesign** — scrolling request-tag marquee + fanning design-stack component visuals.
- **More Case Studies block redesign** — visual asset previews, split-grid content layouts.
- **Industries page** (`/footer/impact`), **subscription page** (`/footer/subscription`), **cookie consent banner**, and **refund policy** (`/refund-policy`) fully implemented.

### Changed
- **Work + Blog detail pages UX** — bento grid layouts, glassmorphic cards, hover-zoom media, mouse-tracking glow animations in `[slug].astro` for both.
- **Services index + detail pages UX** — smooth tab transitions, mouse-tracking card glows.
- **Case study detail layout** — merged to single-column body content with full-width media elements.
- **Deduplicated post/case-study lists** in memory to prevent Sanity draft-document duplications surfacing.
- **Global industries + blog teaser hidden** on `/contact-us` to maintain focused conversion layout.
- **Glass cards + wider case body** on work detail; white service fonts on service detail.
- **Favicon fallback** updated to `brand/logo-small.svg` vector icon.

### Fixed
- **Scroll animations direction translation bug** — GSAP `[data-reveal]` elements with directional offsets were translating on the wrong axis.

### Chore
- **Duplicate stub audit + cleanup scripts** — `scripts/audit-dup-stubs.mjs`, `cleanup-dup-stubs.mjs`, `cleanup-blogs.mjs`, `inspect-hash-refs.mjs`.
- **Case study migration utilities** — `scripts/migrate-caseStudy-bodyContent.mjs` + JSON plan docs.
- **`src/lib/queries.ts`** — Neon SQL query constants added.
- **`src/pages/work/[slug].astro`** — enriched with bento grid layout and migration-ready structure.

---

## [2026-08-15] — Sanity Studio Deep Audit, a11y Pass & Deploy Fix

### Fixed
- **Studio crash: Dashboard + SEO Manager** — `<StudioErrorBoundary>` used without import in both tools, throwing `ReferenceError` on open. Fixed in `DashboardTool.tsx` + `SeoTool.tsx`.
- **SEO Manager badges always red** — `seoLevel()` return object was compared directly to string literals (always `false`); fixed to compare `level.severity`.
- **Unpublish/Archive unreachable** — `docActions.ts` functions existed but were never wired to any UI. Now wired into `DocumentListPane.tsx` + `TablesTool.tsx`.
- **DataTable row crash** — `table.getRow(id).getVisibleCells()` throws at runtime under installed `@tanstack/react-table` v9. Rewrote to render cells from `columns` config + row data directly.
- **Tables/Media Studio icon collision** — both used `▦`; Media now uses `🖼`.
- **`getCanSort` crash + invalid GROQ `group by` query** — fixed in `DataTable.tsx`.
- **Owner field** — Added `none` to `sanity/schemaTypes/ownerField.ts`.

### Added (a11y — Web Interface Guidelines audit)
- `role="button"` + `tabIndex` + `onKeyDown` + `aria-label` on table rows and sortable headers in `DataTable.tsx` and `SearchTool.tsx`.
- `aria-label` on all previously unlabeled controls: search inputs, checkboxes, pagination buttons, density/table-type selects.
- Toast upgraded to `role="status" aria-live="polite"`.
- **GROQ injection fix** in `SearchTool.tsx` — added `escapeGroq()` helper; `updated:` filter restricted to digits only.

---

## [2026-08-11] — Kits Showcase, Enterprise Studio Overhaul & Contact V2

### Added
- **Kits Showcase Landing Page (`/kits`)** — living design system laboratory with 100% token-accurate colors, 6 service pillar tokens, fluid typography, UI controls, bento blocks, interactive scope selector, motion easings, ambient glows, noise overlays, and live token exporter. Live at `https://wugweb.pages.dev/kits`. Unlinked from nav.
- **Enterprise Sanity Studio schemas** — `brandAsset`, `siteScript`, `navigationMenu` with spreadsheet table presets.
- **Studio desk reorganization** — departmental structure: Overview · Content · Navigation & Menus · Brand & Assets · Integrations & Code · Business · Settings.
- **Studio error boundaries** — `StudioErrorBoundary` wrapped around all custom tools.
- **Contact Page V2 (`/contact-us`)** — 6-pillar scope selector grid, timeline & budget chips, SLA badge, direct channels, responsive layout. `/contact-v2` 301-redirects to `/contact-us`.

### Fixed
- **HTTP 409 revision conflicts** — document action batching and `_rev` handling corrected.
- **Duplication of non-title docs** — Studio duplicate action guarded.
- **Intent edit routes** resolved correctly.
- **`hideGlobalSections={true}`** on `/kits` + `.global-final-cta` backdrop opacity fix in `global.css`.
- **`/api/contact.ts`** enriched with `timeline` field handling.

---

## [2026-08-09] — Service Media, Blog/Work Polish & Changelog Governance

### Added
- **`CHANGELOG.md`** initialized; `governance.md` Rule 11 added (changelog mandatory on every commit).
- **Contact V2 prototype** (`/contact-v2`) created (promoted to `/contact-us` on 2026-08-11).

### Changed
- **Service Media Normalization** — `public/assets/services/` organized into 6-pillar directories; `src/lib/services-data.ts` updated.
- **Blog & Work UI Polish** — sticky ToC, author cards, 16:9 hero video, gallery layouts.
- **Service Pages UI/UX Revamp** — `src/pages/services/[slug].astro` rebuilt with glowing theme gradients, glassmorphism, micro-animations, dynamic pillar color tokens via `--theme-base`.

### Fixed
- Archived audit headers across `docs/`, `brand_guidelines/`, `scripts/`.


