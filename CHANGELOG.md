# Changelog

All notable changes to the Wugweb site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

---

## [Unreleased]

### Changed — blog covers and 0054 images moved out of unsorted/ (2026-10-13)
- Copied into `blog/<slug>/` (all 200, MD5-verified): 8 covers (0103, 0029, 0007, 0055, 0024, 0014, 0039, 0018) and the 20 resource images for 0054 (`01-refero.png` … `20-screenlane.png`).
- Owner ran `scripts/owner-delete-blog-unsorted.mjs`: 62 R2 keys gone (58 deleted by the run, 4 `misc/` copies already removed by batch 7), then the 51 matching Sanity asset records deleted. List: `backups/r2-delete-blog-unsorted-2026-10-13.csv`; records backup: `backups/blog-unsorted-asset-records-2026-10-13.json`.
- Kept: `blog1.png` / `blog3.png` (no byte-identical copy under `blog/`).

### Changed — blog cover spares (2026-10-13)
- New covers: `blog/how-exactly-do-product-manager-and-ux-designer-collaborate/cover.png` (from `alt-cover.png`) and `blog/ui-design-trends-to-watch-out-for-in-2023-and-resurfacing-comeback-trend/cover.png` (from 0054's `alt-design-grid.png`), both verified 200 and byte-identical.
- Owner ran `scripts/owner-delete-blog-alt-spares.sh`: the two `alt-*` spares are deleted (404 confirmed).

### Fixed — Airtel logos finished; blog cover copies (2026-10-12)
- `scripts/finish-airtel-logos.mjs`: `client-CLI-0031`/`0035` `logoPath`, both Airtel case studies' `clientLogoPath` (was a `framerusercontent.com` URL) and the asset records `asset-logo-airtelxstream`/`asset-logos-airtel-xsafe-png` now point at `logos/airtel-*.png` (alt kept). A later repoint pass had moved the clients back to `work/<slug>/client-logo-*.png`. Backup: `backups/airtel-logo-finish-2026-10-12.json`.
- `caseStudy-airtel-xsafe.clientRef` pointed at the Xstream client, so `/work/airtel-xsafe` showed the Xstream logo; now `client-CLI-0035`.
- R2 copies (originals kept): `cover.png` + `og.png` for `how-is-video-commerce-…` and `how-exactly-do-product-manager-…`, and `cover.png` for `use-this-easy-checklist-…` (closes the one failed manifest row). All 5 return 200.
- `scripts/owner-delete-old-vsb-banners.sh` (not run): deletes the 10 VSB banners under `assets/unsorted/` (byte-identical to their `blog/<slug>/` copies) and their 10 asset records (backup `backups/vsb-banner-records-2026-10-12.json`).

### Added — blog images imported to R2 (2026-10-12)
- `scripts/upload-blog-manifest.mjs` uploaded the Notion blog image manifest (237 rows) to `wugweb-assets` under `blog/<slug>/...` keys: 236 live and verified 200. Additive only: no key overwritten, nothing deleted (the old `assets/blog/...` objects are still there). Results: `backups/blog-r2-upload-results.csv`.
- Failed: `blog/use-this-easy-checklist-to-ensure-a-smooth-design-handoff/cover.png` — its source URL in the manifest is truncated (no extension) and returns 404.
- These keys have no `assets/` prefix, unlike the rest of the bucket, so `assetUrl()` does not reach them yet; they are for the Notion links.

### Added — Media tool folder audit (2026-10-12)
- **Folder** and **Sub-folder** filters in the Media tool (from each asset's `relativePath`, with counts), a folder label on every card, and a Folder column in list view. The Unused / Missing alt / Duplicates counts now describe the selected folder, group and search, not the whole library.
- Thumbnails now fall back to the R2 public URL instead of `wugweb.pages.dev/assets`, which no longer serves files (this was the "No file" tiles).

### Changed — hard-coded site media moved into Sanity (2026-10-12)
- New fields: `singletonPage.heroPosterPath` and `sectionImagePath`, `client.showInLogoBand`, `service.tagVideoPath`; `siteSettings.ogImagePath` is now read by the site. Home hero video and poster, About video, poster and culture image, the six homepage service-tag clips, the 13-logo "Trusted by" band and the default OG image come from these. `src/lib/site-media.json` stays as the fallback when a field is empty.
- Seeded by `scripts/seed-site-media-cms.mjs` (additive; backup `backups/site-media-cms-2026-10-12.json`). The logo band is now exactly the 13 curated clients (it used to show every client with a logo).
- Removed the guessed `/assets/work/<folder>/<file>-thumb.mp4` fallback from `services/index.astro`.
- Fixed broken images after `public/assets` was removed from the deploy: blog covers (index, post, related, insights teaser) were raw `/assets/...` paths and are now wrapped in `assetUrl()`. A crawl of 12 pages finds no raw `/assets/` references.

### Changed — asset reorganisation plan rule (2026-10-12)
- `scripts/plan-asset-reorg.mjs`: page-owned media now targets `assets/site/<pageId>/` (no more `about/` or flat `site/`); the 21 existing `assets/about/` files are included as moves to `site/about/`. Plan only; nothing applied.

### Fixed — Airtel logos (2026-10-12)
- Both the **Airtel XSafe** and **Airtel Xstream** client docs pointed at the XSafe logo (`logos/client-logo-c6rj.png`); Xstream's own file is `client-logo-8gyg.png`. Copied (never overwritten) to `assets/logos/airtel-xsafe.png` and `airtel-xstream.png`, locally and in R2 (2 Class A puts), then repointed both clients (no case study referenced either file), the mis-pointed asset record `asset-logo-airtelxstream`, and `src/pages/index.astro`. New asset record for XSafe; alt "Airtel XSafe logo" / "Airtel Xstream logo". Backup: `backups/airtel-logo-fix-2026-10-12.json`; script: `scripts/fix-airtel-logos.mjs`.
- Old keys and local files are untouched. `scripts/owner-delete-old-airtel-logo-keys.sh` is for the owner to run; the assistant has not run it.

### Added — asset.alt end to end (2026-10-12)
- **Studio:** `asset.alt` now has a 5–125 character warning and the plain-language description. The Media tool gets an editable **Alt** column (list view, images only) and an Alt field in the inspector; saves patch the published asset with `ifRevisionId`. New filter **Missing alt, images** (video, audio and SVG are skipped).
- **Site:** covers, galleries, blog and insights teasers look the alt up from the asset record by path (`src/lib/asset-alt.ts`, one cached query), falling back to the old alt or title. Client logos read "{Client} logo". Body `mediaUrl` blocks keep their own alt.
- **Checks:** `seoChecks` gains `cover-alt`, reading `asset.alt` through a prefetched lookup (skipped for videos or when no lookup is supplied).
- **Seed:** `scripts/seed-asset-alt.mjs` set alt on 28 assets (18 client logos, 10 team portraits) and nothing else. 308 image assets still have none: `backups/asset-alt-missing.csv`.
- **Plan only, nothing moved:** `scripts/plan-asset-reorg.mjs` writes `backups/asset-reorg-plan.csv` and `asset-reorg-summary.md` for re-homing `framer/`, `uncode/` and `more/` under `work/<case-study>/`, `blog/`, `logos/`, `about/` and `site/`.

### Changed — Studio "SEO score" is now "Completeness"; rule-based Checks added (2026-10-12)
- The old 0–100 score only checked that fields are filled. It is relabelled **Completeness** everywhere it is shown (tables, SEO Manager, badge tooltip, `docs/admindesign.md`) with the note "Checks that fields are filled. It does not measure ranking quality." Exported names (`seoScore`, `seoLevel`, `SeoBadge`) are unchanged.
- **`seoChecks(row, dupes?)`** in `sanity/lib/health.ts`: title 30–60, description 120–160 (`seoDescription || excerpt`/`summary`), slug hygiene, post body ≥300 words, headings (≥1, ≤1 H1), alt text on `image`/`mediaUrl` blocks, focus keyword (singletonPage only), description ≠ title/excerpt, duplicate seoTitle/seoDescription per type. Rule-based only; no network, no AI detection. Checks only run for fields the type's schema has.
- **SEO Manager** gains a "Checks passed" column (e.g. 6/9) with expandable failing-check hints, and a "Has failing checks" filter. Completeness and Checks are separate numbers. SEO Manager now reads `bodyContent` for case studies (it queried a `body` field that does not exist).
- `npm run test:sanity` (node:test, no new deps).
- Not done: cover alt (no `coverAlt` field exists in any schema), H1 limit can never fail on schema-written content (blockContent has no H1 style). None of this is real SEO scoring.

### Added — Studio Media tool: assign / unassign (2026-10-12)
- **`sanity/components/AssetUsagePanel.tsx` + `sanity/lib/assetUsage.ts`** — the Media inspector now shows where a file is used and lets you **Unassign** it from a document (every cover / thumbnail / gallery / body media block that points at it) or **Assign** it to a case study, post, page, service, client, person, testimonial, industry or taxonomy item (pick a field: cover, thumbnail, hero, OG image, gallery, or add a media block to the body). Confirm step on both; session-only **Undo**.
- Matching is by path value, not by the scan's stored array index, so removing one gallery item can never remove its neighbour. Both the published doc and any draft are patched, guarded by `ifRevisionId`.
- The inspector now appears in **List view** too (new "Assign" button per row).
- Redeploy the Studio (`npx sanity deploy`) to get it. "Used by" labels refresh fully when `scripts/scan-asset-usage.mjs` next runs with `WRITE=1`.
- Hardening (2026-10-12): assign/unassign now never push an empty Undo entry or a false "Unassigned" toast when nothing changed (stale "Used by" entries are just cleared). Review confirmed: unassign and undo both cover the published and `drafts.` copy; no refetch loop (`useClient` is stable; `load(true)` is silent); every async path is inside try/catch.
- Known, unrelated: `tsc` reports 3 pre-existing errors in `src/lib/draggable-tags.ts:79` (`gsap.utils.debounce`) and `src/lib/scroll-animations.ts:265-266` (`offsetWidth` on `Element`). Not touched by this work.

### Changed — Services media and old-service remap (2026-10-04)
- **`src/lib/service-media.ts` now maps every sub-service to a clip** (85/85 current Sanity names resolve; 61 planned names). Entries tagged `STAND-IN` reuse nearby footage and are to be replaced by custom branded media. No clip repeats inside a pillar; 14 are shared across pillars.
- **Clips live only in the retained folders** `public/assets/services/{brand,engineering,experience,growth}` (copies from the old `Web & App Development`, `Experience Design`, `Martech & GenAi`, `martech-genai`, `brand-strategy` folders, posters under `posters/`). The 44 files were uploaded to R2 under the new keys and the 44 Sanity `asset` records repointed (backup kept outside the repo).
- **`service-tags-data.ts`**: Strategy and Operations card videos now use `services/growth/`.
- **`faq.astro` + Sanity faq page**: removed the old service names ("Brand & Strategy", "Martech & Gen AI", "QA & Testing", "No-Code Development"); now lists the six pillars.
- **Notion**: new `Pages` database (14 rows from Sanity `singletonPage`, one-block bodies), 6 new Sanity page docs (404, contact-error, offline, thank-you, cookie-policy, reviews), 7 sub-service rows added to the Notion Services DB, blogs and case studies synced.

### Changed — Sub-service merge (2026-10-04)
- Strategy 14→9, Engineering 20→12, Growth 16→10, Operations 15→10 (Brand and Experience unchanged at 10). Sanity capabilities and 41 taxonomy docs updated; Notion Sub Service rows renamed; showcase enabled for all six pillars in `src/pages/services/[slug].astro`.

### Pending delete (owner action)
- Old R2 keys, old local service folders, and the 7 non-pillar Sanity `service` docs (+ drafts) are still in place. They are not referenced by any document; the 7 old slugs resolve to their pillar through `FRAMER_TO_PILLAR` in `src/pages/services/[slug].astro`.

### Removed (2026-09-25)
- **`visitor_id` cookie and `/api/personalize`** (`src/middleware.ts`, `src/env.d.ts`) — closes the remaining half of audit finding 16. The cookie was a one-year UUID minted on every request before consent; its only reader had zero callers. Neon's `visitor_profiles` table deliberately untouched.

### Fixed (2026-09-25)
- **The Sanity contact mirror no longer fails silently** (`src/pages/api/contact.ts`) — `SANITY_SYNC_TOKEN` is not bound on the Pages environment, so `if (token)` skipped the write with no log while the endpoint still returned a success redirect. Every submission has reached Neon and never the Studio. Now logged as an error. **Resolving it is a dashboard action: set the secret on production and preview.**
- **`CLAUDE.md` known-debt item 3 struck** — all 176 routes swept, zero `framerusercontent.com` references.

### Verified (2026-09-25)
- **`/api/contact` and `/api/subscribe` work in production** — both success redirects are only reachable after the Neon insert, so the long-deferred Neon-on-Workers connection is confirmed. A Pages custom domain serves the production environment, so `uat.wugweb.com` exercised production bindings.

### Fixed — SEO / staging (2026-09-24)
- **Staging hosts are no longer indexable** (`src/pages/robots.txt.ts`, `src/lib/hosts.ts`, `src/layouts/BaseLayout.astro`) — `uat.wugweb.com` went live as a fully public copy with no robots meta and `Allow: /`. robots.txt moved out of `public/` to an SSR endpoint so the Worker can see the Host header; non-canonical hosts now get `Disallow: /` plus `noindex, follow` and suppressed JSON-LD. Host list unified in `src/lib/hosts.ts`, shared with analytics.
- **Removed a stale tracked `robots.txt` at the repo root** — never deployed, but Vite serves the project root in dev, so it shadowed the new route.

### Added — Infrastructure (2026-09-24)
- **`https://uat.wugweb.com` staging domain** — Hostinger CNAME `uat` → `wugweb.pages.dev`, plus the Pages custom domain the project was missing (it had none, hence the 409). Apex and `www` untouched; both still serve Framer.

### Added — Analytics (2026-09-24)
- **GA4 (`G-W5WJ1PMTKD`) wired behind two gates** (`src/lib/analytics.ts`) — host (`wugweb.com` / `www.wugweb.com` only) and consent (no script, no request, no dataLayer until accept). Closes the analytics half of audit finding 16: `applyScripts()` had been dispatching `wugweb-analytics-allowed` with no listener anywhere, so Accept and Reject did the same thing.
- **Conversion events** — `generate_lead` (`/thank-you`), `form_error` (`/contact-error`), `sign_up` (`/footer/subscription?subscribed=1`). Keyed off the server redirect rather than the submit click, because both forms are plain `method="POST"` and a submit-time event races the navigation.
- **Declarative click tracking** — `data-gtag-event` plus any `data-gtag-*` as parameters, one delegated listener. Wired to both nav "Let's Talk" CTAs (internal links, invisible to Enhanced Measurement), the contact-page email/WhatsApp chips, and the mobile menu mailto/tel.
- **`?ga_debug=1`** sets `debug_mode` for GA4 DebugView.
- **Staging: `uat` branch → `https://uat.wugweb.pages.dev`.** Usable because of the `env.preview` bindings fix; previews previously had no R2, KV or vars.

### Performance (2026-09-24)
- **Video posters for all 108 referenced videos** (`scripts/generate-video-posters.mjs`, `npm run posters`) — 2.8 MB total, 27 KB average, against 228.7 MB of video. Frame taken at 1 s rather than 0 s because the clips fade in from black; generated at 1280 px (2× a 640 px card) for dense phone screens. Path is derived (`<name>-poster.webp`), so there is no field to keep in sync. Homepage at scroll 0 now pulls 6 posters / 160 KB where it previously pulled 12.3 MB of video.
- **Fonts self-hosted** (`public/fonts/`, `src/layouts/BaseLayout.astro`) — the render-blocking `fonts.googleapis.com` stylesheet and its two preconnects are gone. The exact woff2 files Google served (Inter Tight v9, Fragment Mono v6) are committed, with `@font-face` inline in the head; latin and latin-ext only, kept lazy by `unicode-range`. Measured: 2 requests, 59 KB, zero third-party font origins. Audit finding 9.
- **Five sitewide Sanity queries run in parallel and cached** (`src/lib/sanity.ts` `cachedFetch`, `src/layouts/BaseLayout.astro`) — they were five sequential awaits scattered down the layout, serialised behind the page's own. `Promise.all` removes four round trips; a 60 s module-scope cache removes the rest on a warm isolate. Deliberately not prerendering, which would freeze content at build time since no build is triggered by a Studio edit. Per-page content is not cached. Audit finding 5.

### Changed (2026-09-24)
- **Industries hero SVG tokenised** (`src/pages/footer/industries.astro`) — 26 literal hexes and two literal font stacks replaced with design tokens; verified pixel-identical by computed style. Note that `--color-accent-primary` resolves to `--neutral-2` (#DFDFDF), not yellow, despite the `#FFBE1A` fallbacks written beside it elsewhere; the diagram uses `--color-yellow`.
- **Audit finding 20 re-counted** — the claimed 463 hardcoded colour values are 115 once `var(--token, #fallback)` forms are excluded, and 26 of those were a real violation. See `pending.md` §1n for the breakdown.

### Added — SEO / AEO content tiers (2026-09-24)
- **Page tier: SEO + AI·Answers field groups on `singletonPage`** (`sanity/schemaTypes/singletonPage.ts`) — 30 fields in three Studio tabs. SEO: `ogImagePath`, `ogTitle`, `ogDescription`, `noIndex`, `canonicalUrl`, `focusKeyword`, `secondaryKeywords`, `searchIntent`, `breadcrumbLabel`. AI·Answers: `aiSummary`, `keyTakeaways`, `faqs`, `schemaType`, `lastReviewedAt`. Plus `route`, `httpStatus`, `redirectTo` — route is stored rather than derived because several `pageId`s do not match their path (`contact` → `/contact-us`, `terms-of-use` → `/termsofuse`). Deliberately excluded: `changefreq`, `priority` (Google ignores them) and any meta-keywords output.
- **Site tier: `siteSettings` extended** (`sanity/schemaTypes/siteSettings.ts`) — grouped Identity / SEO / Social & Images / Organization / AI·Answers. `siteUrl` (the prerequisite for canonical tags, absolute `og:image` and a sitemap), `titleTemplate`, per-bot `crawlerPolicy` for robots.txt, `sitemapExcludePaths`, Organization/JSON-LD inputs, `aiSummary`.
- **Section tier: `pageSection`** (`sanity/schemaTypes/pageSection.ts`) — 13 fields, 5 `sectionId` options, plus a "Global Sections" desk list (`deskStructure.ts:222-243`). Schema only; no template reads it yet.
- **`reviews` added to the `pageId` enum** — `src/pages/footer/reviews.astro` already queried `singletonPageQuery` with `pageId: 'reviews'`, but the value was not in the enum, so the lookup could never match and the route silently fell through to hardcoded copy on every request.
- **Framer OG art salvaged** — six images recovered from `framerusercontent.com`, all already 1200×630. Originals archived in `assets/seo/og-framer-originals/`; optimised `.webp` (q82, ~85% smaller) and `.jpg` (q72) shipped in `public/assets/og/`. Both formats on purpose: WebP for on-page use, JPEG for `og:image`, because LinkedIn and several other scrapers still handle WebP inconsistently. Only five distinct images exist — Home's "custom" Framer OG is byte-identical to the sitewide fallback.
- **`ogImagePath` written to 27 Sanity documents** — 14 `singletonPage` + 13 `service` in one transaction, and wired end to end: `singletonPageQuery` selects it, `BaseLayout` takes it as a prop and resolves it through `assetUrl()`, and the five routes with distinct art pass it. Services recycle the hub image; no service document carries a `coverPath` or `galleryPaths`.

### Fixed — SEO (2026-09-24)
- **`og:image` pointed at a host that 404s** (`src/layouts/BaseLayout.astro`) — the URL was built on the canonical origin, so every page emitted `https://www.wugweb.com/assets/og/<page>.jpg`, and www.wugweb.com is still the old Framer build with no `/assets/og/`. Verified 404 in production. `og:image` now resolves against `Astro.url.origin`, the host that actually served the page; canonical keeps naming www. The two converge once wugweb.com serves this build.
- **`og:image` was a relative path and the fallback was the wrong size** — relative paths are invalid per the Open Graph spec and most scrapers drop them. Now absolute, and pointing at a real 1200×630 image instead of `public/brand/og-default.png`, which was 965×306.
- **Added `<link rel="canonical">` and `og:url`** — the site previously had neither on any page.

### Docs / Chore (2026-09-24)
- **Nine overlapping `docs/` content maps consolidated to two.** Deleted seven that were duplicates or fully actioned; their live content moved to the Notion 🧱 Content Map page. `frontend-audit-2026-09-04.md` was *not* stale — its 21 findings were preserved verbatim into `pending.md` §1g before deletion.
- **Two false claims corrected.** `docs/content-assets.md` claimed the R2 cutover was live; `src/lib/assets.ts` records those vars as dead and every path serving relatively from `public/assets`. The content map claimed `caseStudy.impact[]` renders nowhere; it renders at `work/[slug].astro:158`, as do `partner` (:94) and `team` (:98).
- **`CLAUDE.md` Technical Debt #4 corrected** — the Sanity token is an Editor (`/users/me` → `roles: ['editor']`), not a Viewer. A 27-document patch transaction committed successfully. The old claim that it could not write was wrong.

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


