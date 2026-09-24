# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**Session-end summary (2026-09-23):** the frontend-design-system audit plan (`/Users/abcom/.claude/plans/nested-mixing-fountain.md`) is closed — every phase done, explicitly skipped, or moot (see that file's closure note). Everything genuinely still open below is **content/asset-blocked, not code-blocked** — the user declined pushing further on these tonight ("nopes"):
- ~~ServiceSpotlightPanel's 3 dummy sublines~~ **Done 2026-09-23** — real copy written for Brand Narrative, Employer Branding, Brand Activation in `service-copy.ts`, matching the other 7 entries' voice/length (item #5).
- ClientAssemblyGrid's 9 client logos still only on the Framer CDN, not imported — item #9a.
- Service clip library is stock/third-party footage, not real Wugweb work — item #6; Messaging Framework sub-service has no clip at all — item #7.
- ProcessMap's one phase uses mismatched stock footage — item #9e.
- `about.astro`'s "Reviews" section (lines ~304-322) is genuinely unfinished — "4.98/5 from 500+ reviews," "98/100 from 500+ reviews," and literally **"Another Review Site"** as a placeholder label with no real score. Needs real numbers from a verified source (Clutch/DesignRush/GoodFirms) — not something to fabricate.
- `/404-2` was built as a comparison alternative to the live `/404` (same tic-tac-toe concept, elevated execution) — not yet chosen or promoted.
- Item #8 (extract ServiceSpotlightPanel into a reusable component) — real refactor, but no current second use case, so left as-is rather than a premature abstraction.

**2026-09-23 session** (pushed to `main` in two commits, `cf943e4e` + `d8092f2b`):
- **Legal & Policies hub** — new `src/layouts/LegalLayout.astro` (sticky left nav + content column) wraps `privacy-policy`, `termsofuse`, `refund-policy`, `footer/cookie-policy`; each keeps its own URL/Sanity fetch, masthead now shows the active page's own title + a calendar-icon "Updated" chip instead of each page's own duplicate eyebrow/h1/date. `footer/refund-policy` (confirmed duplicate) now redirects to `/refund-policy`. Also patched the live Sanity `privacy-policy`/`terms-of-use` docs to drop a redundant leading title/date block from their body content.
- **Contact form real error state** — `api/contact.ts` now redirects to a new `/contact-error` page only when the Neon write itself fails (Sanity-mirror-only failure stays silent, as designed); this was described as done in an earlier session summary but had never actually landed in the code — verified missing, then implemented for real.
- **Contact form focus-visible** — pillar-selector checkboxes, budget/timeline radio chips, and text inputs now show a real keyboard focus ring (`--focus-input`, previously defined but unused).
- **Sitewide rules, new**: every `target="_blank"` link gets a trailing external-arrow (`.no-external-icon` to opt out); every date/reading-time label is icon+text (`.meta-row`/`.meta-item`/`.meta-icon` in `global.css`, sourced from the blog article header's existing pattern).
- **Button system documented** — Brand (`.btn-solid`, yellow, reserved)/Primary (`.btn`, default)/Ghost tiers, size (`.btn-sm`/`.btn-lg`), width (`.btn-block`/`.btn-block-mobile`), states (incl. a real `:disabled` style — didn't exist before) in `kits_design_system/docs/components.md`.
- **InsightsBlock** — mobile is now a full `100svh` screen (not a mid-scroll card grid), shows a 4th card on mobile only, richer hover/tap states.
- Removed dead `--s-*` spacing token tier (13 tokens, zero usages, duplicated `--p-*`).
- Corrected stale docs (`CLAUDE.md`, `AGENTS.md`, `components.md`) claiming a 4th "TopDevelopers" trust badge — asset exists on disk but no verified profile URL exists anywhere; user declined guessing one.
- Verified in production: `/api/contact` and `/api/subscribe` both work correctly end-to-end (real Neon writes, correct redirects) once given a matching `Origin` header — earlier "500"s during testing were malformed test requests, not real bugs.

**2026-09-23 session, continued** (pushed to `main`, commits `effb72ce` through `3cf96e32`):
- **Footer consolidation** — `SiteFooter.astro`'s Privacy/Cookie/Terms/Refund links (4 separate entries) collapsed into one "Legal & Policies" link to `/privacy-policy` (the hub's landing page); Cookie Settings kept as its own action.
- **SEO copy sync applied** — the 4 pending Sanity `seoDescription`/`seoTitle` updates from `docs/notion-site-pages-sync-2026-09-22.md` §1 (industries, sitemap, privacy-policy, terms-of-use) were verified as NOT actually applied despite the doc's own appendix implying otherwise — patched both draft and published docs directly. 404 page now has its own meta description (§2) instead of inheriting the generic sitewide one.
- **`refund-policy.astro` wired to Sanity** — had zero Sanity import despite a real `refund-policy` singletonPage doc existing (16 blocks, genuinely different/more current than the hardcoded fallback); this was flagged in the Notion doc §3 as an unresolved discrepancy needing a decision — user chose to wire it up, now matches privacy-policy/termsofuse's CMS-with-fallback pattern.
- **PWA Phase 7 — done**: real `/offline` page + service worker fallback (bumped cache v1→v2), runtime caching for images/fonts (cache-first, separate capped runtime cache, covers R2 `wugweb.online` + `cdn.sanity.io`), `display-mode: standalone` detection hook in BaseLayout, custom `beforeinstallprompt` install banner (top-fixed, doesn't stack with the bottom cookie banner, respects dismissal). Only thing NOT done: nothing — all four Phase 7 items shipped.
- **Button system**: mapped `.btn` max-width (28rem); new `ButtonShowcase.astro` + Storybook story (`Foundations/Buttons`) as living reference; new **yellow-fill rule** — only `.btn-solid` (Brand) may carry yellow as a *resting-state* fill, `.btn`/`.btn-ghost` may only use yellow as a hover/tap accent. Fixed `FooterCTA.astro`'s "Request Quote" hover going fully transparent (panel's own yellow showed through) — now lightens instead of disappearing.
- **`CookieBannerShowcase.astro`** + story (`Foundations/Cookie Banner`) — the real cookie-consent banner lives inline in `BaseLayout.astro` and only shows once per visitor; this gives it a Storybook home.
- Contact page: "01. What pillar are you focusing on?" and the other 3 section headings switched from eyebrow styling (mono/uppercase/tracked) to the brand font; sidebar "Direct Channels" card now has a leading icon per row (envelope for email, map pin for both addresses) and the two office addresses are now real links to a Google Maps search built from the address text.
- **Known pre-existing bug, NOT fixed (flagged, needs a decision)**: `--color-accent-primary` is wired to `var(--neutral-2)` (light grey, `#DFDFDF`), not `var(--color-yellow)` (`#FFBE1A`) as CLAUDE.md documents — every `.btn-solid`/`--accent-warm` consumer sitewide renders grey instead of brand yellow, except the handful of places (FooterCTA's own local override, SiteHeader's WhatsApp CTA) that reference `--color-yellow` directly instead of going through the alias. Fixing the token is a sitewide visual change (everything using `--accent`/`--accent-warm` shifts from grey to yellow) — needs explicit sign-off before touching, not something to fix silently.
- Spawned as a separate task, not done in this session: absolute `og:image`/`og:url`/canonical tags sitewide (currently relative-path fallback, no canonical/og:url at all anywhere).
- **Explicitly out of scope this session, per direct user instruction**: dead CSS (`.btn-partners-cta`/`.global-partners`), stray breakpoints, the 369 untokenized px literals, Storybook deploy (Phase 9), re-measuring the 184 "unused tokens" claim. Also skipped: motion tokens → GSAP (Phase 4).
- **`.global-final-cta` (FooterCTA's yellow banner) must stay full-bleed yellow** — a dark-panel-with-yellow-button version was tried and explicitly reverted; this is a confirmed, deliberate exception to the yellow-≤10% rule, not an oversight. See the AI memory file `final-cta-panel-stays-yellow.md` if this comes up again.
- **Strokes removed from buttons + page-level cards** — `.btn-ghost` and contact-us.astro's sidebar cards now use background tint + shadow instead of a border. Custom blocks (BentoBlock, ProcessMap, ServiceSpotlightPanel, ClientAssemblyGrid, ServiceTagField) explicitly spared per user direction — do not remove their borders without asking again.
- **Phase 2 (fake `--space-N` tokens) done** — `PortableTextRenderer.astro` (31 sites) + `work/[slug].astro` (5 sites) referenced an undeclared `--space-N` token family; replaced with the real `--gap-N` token matching each site's actual fallback value (rendered spacing unchanged).
- **Phase 3 (raw hex sweep) done for the flagged files** — `contact-us.astro`'s undocumented `#10b981` green and `rgba(255,180,0,...)` glows now use real tokens; `PortableTextRenderer.astro`'s 48 `var(--token, #hex)` fallback pairs audited — only `--color-text-muted` was actually drifted (declared `#7D7D7D`, fallbacks used `#888`/`#bababa`), now fixed. `services/[slug].astro`, `work/index.astro`, `blog/[slug].astro` (also flagged in the original plan) were already clean by the time this ran. `SiteHeader.astro`'s hamburger-icon pixel geometry left alone — precise hand-tuned animation math, not spacing.
- **Phase 1 (brand-direction pass) is moot, not skipped** — the whole point was comparing against `wugweb.com`'s live (Framer) treatment as a reference. **DNS cutover happened** (confirmed with the user 2026-09-23, not done by this session) — `wugweb.com` now serves this Astro site directly. There is no separate reference left to compare against; target and current state are the same site now.

**Last verified:** 2026-08-30 (**Sanity Studio Advanced Suite & Interactive Topology** — Native `r2AssetSource` custom asset source implemented for direct image/file picking from 550+ R2 catalog; `PreviewDocumentAction` custom action added for instant live site previewing; `CopyArticleAction` custom document action added for 1-click Markdown, Plain Text, and JSON export; `ArticleExportTool` studio tool created; `GraphTool` interactive reference topology visualizer with spring physics & pan/zoom; `@sanity/code-input` and `@sanity/table` plugins installed; custom `StudioLogo` lockup and `StudioNavbar` quick action toolbar integrated; `blockContent` enhanced with `callout` alerts, `quoteBlock` testimonials, `comparisonTable` grids, `internalLink` reference annotations, and `highlight` mark decorators; `PortableTextRenderer.astro` updated with fluid glassmorphic rendering; `scripts/populate-missing-covers.mjs` matching tool created; Sanity smoke suite 19/19 ✅; Astro & Studio builds passing with 0 errors ✅).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded). Design system (single source of truth): [`kits_design_system/`](kits_design_system/) — `docs/design.md` + `docs/tokens/`.

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **Contact V2 layout (`contact-us.astro`)**, Service media folder normalization (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`), `CHANGELOG.md` integration.

**Enterprise Sanity Studio Overhaul & Bug Resolution (2026-08-11 & 2026-08-30)**: Full CRUD schemas for Brand Assets & Icons (`brandAsset`), Tracking & Custom Scripts (`siteScript`), Navigation Menus (`navigationMenu`). Reorganized Studio desk into operational departments (Content, Brand & Assets, Marketing, Business, Settings, System) + spreadsheet data grid presets. Fixed HTTP 409 revision conflicts, duplication of non-title docs, intent edit routes, publish/unpublish/archive actions. Added R2 Asset Autocomplete picker and rich visual block previews for Portable Text.

**Sanity Studio Advanced Suite & Portable Text Overhaul (2026-08-30)**:
- **Native R2 Custom Asset Source (`r2AssetSource.tsx`)**: Integrates directly with Sanity's `form.image.assetSources` and `form.file.assetSources` allowing editors to browse, search, filter, and pick from all 550+ Cloudflare R2 assets with live previews.
- **Copy Article & Export Document Action (`CopyArticleAction.tsx`)**: Formats Portable Text into standard Markdown, Plain Text, or JSON and copies directly to system clipboard with a single click.
- **Article Export Studio Tool (`ArticleExportTool.tsx`)**: Dedicated Studio view for exploring word counts, reading times, and batch Markdown copying across all posts, case studies, and services.
- **Studio Branding & Navigation (`StudioLogo.tsx`, `StudioNavbar.tsx`)**: Custom SVG Wugweb mark, production status badge, and direct header links to the live site and `/kits` showcase.
- **Expanded Portable Text System (`blockContent.ts`, `PortableTextRenderer.astro`)**: Added `callout` alert banners (info, tip, warning, quote, success), `quoteBlock` testimonials, `comparisonTable` key-value grids, `internalLink` direct reference annotations, and `highlight` mark decorators.
- **Cover Media Asset Matcher (`scripts/populate-missing-covers.mjs`)**: Automated inspection and matching of R2 assets to posts and case studies.

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
| 1 | **Blog 21 Duplicate Stubs Cleanup** | **Done 2026-08-30** | Unpublished all 21 duplicate raw HTML posts, 6 duplicate service pillars, and 4 duplicate singleton pages while re-pointing asset references to canonical records. Sanity health 19/19 ✅ with 0 duplicate slugs or singletons. |
| 2 | **Brand Vector Asset Ingestion** | **Done 2026-08-30** | Ingested official vector SVGs for Clutch, DesignRush, GoodFirms, TopDevelopers, Wugweb Large/Small logo lockups, and social OG/favicon assets into the `brandAsset` schema via `scripts/ingest-brand-assets.mjs`. |
| 3 | **Blog & Case Study Thumbnail Population** | **Done 2026-08-30** | Built automated matcher script `scripts/populate-missing-covers.mjs` and enabled native R2 Custom Asset Picker directly inside all image/file fields in Sanity Studio. |
| 4 | **Service Spotlight Panel** — `/services/brand` only · spec: [`kits_design_system/docs/blocks/service-spotlight-panel.md`](kits_design_system/docs/blocks/service-spotlight-panel.md) | **Awaiting sign-off 2026-09-04** | Replicates the Framer "Glass Showcase" reference: one wide glass panel of rows (number + thumbnail + title), over a **sharp** full-bleed backdrop that crossfades to the active item — the panel's own `backdrop-filter` does the blurring, which is how the reference does it (0 `filter: blur()`, 3 `backdrop-filter` on the live demo). **Active row inverts** to a light surface with dark text and reveals its supporting line; idle rows are title-only. Rows reserve the expanded height so activating one causes **zero layout shift** (verified: all rows 168px before and after). **Phones:** no hover, so an IntersectionObserver spotlights the row crossing the screen's centre as you scroll; supporting copy is hidden entirely. Gated by `showcaseEnabled` in `[slug].astro`; **all five other pillars still render the original `.caps-grouped` panels, verified unchanged**. Cost: +1,514 B min / 669 B gzip JS, no new deps. |
| 5 | **Showcase: 2-line copy per sub-service** | **Done (stopgap) 2026-09-04** | Wired via `src/lib/service-copy.ts`. 7 of 10 blurbs are **verbatim from `Wugweb_Services 2026.md`**; 3 (Brand Narrative, Employer Branding, Brand Activation) are **DUMMY COPY, clearly marked in the file — replace before launch**, as the deck has no entry for them. Proper home is Sanity: `capabilities[].items` is `string[]`, so it needs promoting to `{title, blurb}` objects (schema + content migration) to retire this file. |
| 6 | **Service clip library is stock footage** | **Open — content** | `public/assets/services/brand/*.mp4` are third-party showreel clips (Dokna Arq branding, a Mailchimp-style ad), not Wugweb work. `services/strategy/` is a byte-identical copy of `brand/`, `operations/` of `engineering/`. Only `brand` is wired in the media map; strategy/operations/growth left unmapped so they render placeholders rather than mislabelled work. |
| 7 | **Messaging Framework has no clip** | **Open — user** | 9 clips for 10 brand sub-services. Item 06 renders the gradient placeholder; user to link the asset from R2 and add the key to `MEDIA_BY_PILLAR.brand`. |
| 8 | **Extract Service Spotlight Panel to a component before recycling** | **Open — blocker for reuse** | The block is 73 lines of markup + ~335 lines of scoped CSS + ~110 lines of JS inline in `[slug].astro`. Reusing it elsewhere today means copy/paste. Needs `src/components/GlassShowcase.astro` taking `{ items, heading, accent, dwellMs }`. Two hard couplings to break: it reads `--theme-base` (injected only by `.service-page-wrapper`), and its data maps are keyed by pillar slug (`MEDIA_BY_PILLAR` / `COPY_BY_PILLAR`). |
| 9a | **Client Assembly Grid** — homepage `Trusted by leading brands` · spec: [`kits_design_system/docs/blocks/client-assembly-grid.md`](kits_design_system/docs/blocks/client-assembly-grid.md) | **Awaiting sign-off 2026-09-08** | Rebuilt from the live Framer section. Full-viewport band, uniform 16:9 tiles (6/6/4 columns), title as a 2-cell grid item at tile height with 2 logos either side, `data-scroll="assemble"` scatter→converge→disperse. Fixed the old ragged flex-wrap (rows of 8/11/**1** at 1440) and defined `--opacity-soft` / `--opacity-strong`, which were referenced in 8 places but never declared. **Open:** mockup logo padding retained by user; 9 logo images still only on the Framer CDN; duplicate `logoPath` on Airtel Xstream/XSafe. |
| 9b | **Service Tag Field** — homepage "What we do" · spec: [`kits_design_system/docs/blocks/service-tag-field.md`](kits_design_system/docs/blocks/service-tag-field.md) | **Awaiting sign-off 2026-09-08** | Six draggable pillar tags rebuilt natively from the Framer *Draggable Tags* reference — GSAP Draggable + InertiaPlugin + Flip + ScrollTrigger (all already in gsap 3.15; **no new dependency, no React**). Fly-in on scroll, momentum drag with echo trail, front-on-touch stacking, expand to media → title → copy → link, and a full-bleed launch into the service page. Replaces the old `.service-cards` teaser. **Open:** clips have no posters; old `<ol class="service-cards">` still in the DOM as `hidden` with dead CSS; ambient-glow and Fade Up / Instant entry variants not built; composition never visually reviewed. |
| 9d | **Bento Block** — `/about` "Why Wugweb?" + "Why us?" on all six service pages · spec: [`kits_design_system/docs/blocks/bento-block.md`](kits_design_system/docs/blocks/bento-block.md) | **Awaiting sign-off 2026-09-09** | Real component (`src/components/BentoBlock.astro`), unlike 9a/9b. Every axis is data, so a variation is a reordered `tiles` array. **Six layouts, one per pillar** (`BENTO_LAYOUTS` in `[slug].astro`, `[column, weight, role]` per slot) — column membership, order, weights, tone and media placement all differ; verified as six distinct tile sequences. Two build-time guards enforce "never an even grid": one rejects a single repeated weight, one rejects identical column signatures. Overflow-proof by `flex-basis: auto` + weighted `flex-grow` + `shrink: 0`; verified 1024→1728 across all six pillars — columns level, no clipped text. `showNumbers={false}` on the service pages (parallel claims, not a sequence); `/about` keeps 01–04. **Open:** composition never visually reviewed (pane screenshots black all session); only Brand has clips, the other five render a still; `stat` / `checklist` / `stack` / `chips` / `headline` kinds built but unused; cursor-invert puck probably surplus — recommend cutting. |
| 9e | **Process Map** — "How we work" on `/services/experience` · spec: [`kits_design_system/docs/blocks/process-map.md`](kits_design_system/docs/blocks/process-map.md) | **Awaiting sign-off 2026-09-09** | Component (`src/components/ProcessMap.astro`) replacing the `.framework-flow` card grid. Full-viewport block: phase hubs chained left→right with their steps orbiting as labelled chips, elastic spring-loaded connecting lines (vanilla rAF, no dependency), scroll-driven phase walk, hover focus with `--layer-base`/`--card`/`--popover` layering. Brand ink throughout with `--accent` on the return loop and the lit phase's edges only — **no `--theme-base`**, which read as cyan on this pillar and broke the yellow-≤10% rule. Six `shape` profiles + loop labels in `MAP_BY_PILLAR`. Framework phase names shortened to single words across all six pillars; Experience's `includes` trimmed 22→15 (3/phase). **Open:** live on Experience only — `processMapEnabled` gates it, and the gate is load-bearing because the component throws above 3 steps/phase and the other five pillars are untrimmed (strategy 5,5,5,4,4 · brand 5,5,6,5,5 · growth 4,4,5,4,4 · engineering 5,5,5,5,5 · operations 4,3,4,3,3). No imagery (clip library is stock — see #6). `approach-section` still precedes it, so the page states its method twice. **Removed 2026-09-09:** the `process-section` ("How we do it") — it was on Experience alone, the only pillar with a `process` key, restating the same framework; markup, scoped CSS, the `ServiceProcess` type, the `preferArr` merge and the data are all gone (a `process` field may remain in Sanity, unread). |
| 9c | **`--shadow-lg` is aliased to `--shadow-md`** | **Done 2026-09-23** | Fixed earlier the same day (see the "Duplicate token definitions resolved" note further down this file) — the clobbering legacy alias was deleted, `--shadow-lg` resolves to its own scale value again. This row was stale by the time tonight's session reached it. |
| 9 | **Showcase autoplay fetches every clip** | **Done 2026-09-23** | `service-spotlight-panel.ts`'s idle auto-advance now stops after one full lap (tracks `stepsThisLap` against `cards.length`) instead of cycling forever — a visitor who walked away no longer keeps pulling the full clip library indefinitely. |


---

## 🔵 Open — Phase 2 backlog (documented, not started)

| Item | Notes |
|---|---|
| Kits Showcase Page (`/kits`) | **Done 2026-08-11** — Standalone showcase page live at `/kits`. Unlinked from top header nav. |
| Contact page redesign (#12) | **Done 2026-08-10** — Rolled out V2 layout & hierarchy to `/contact-us` (6-pillar selector grid, timeline & budget chips, responsive layout, SLA badge). `/contact-v2` redirects 301 to `/contact-us`. |
| Full service-page content pass (#5) | **Done 2026-08-05** — 6-pillar copy enriched per `urgent/Wugweb_Services 2026.md`. |
| Contact form prod verify | **Done 2026-09-23** — see "Critical / blocked" table above; this row was a stale duplicate. |

---

## 📝 Noted 2026-09-24 — Framer per-page controls to port (from user screenshots)

Four Framer editor panels the user wants on record. Screenshot 1 is the one to
build toward; 2–4 are **noted only, not scheduled**.

### 1. Per-page "Page settings" parity + AI surfaces — *schema done 2026-09-24, wiring open*

Framer's page panel carries, per page: **Title**, **URL**, **Description**, a live
**Google/social preview**, a **Search engines** toggle (index/noindex), a **Site
search** toggle (include/exclude from on-site search), and a **Social preview**
image (1200 × 630). Reference values from the shot: `/about` →
title "About Wugweb - UI/UX Design & Digital Experience Experts", description
"Get to know Wugweb – a UI/UX design agency dedicated to crafting seamless digital
experiences that elevate brands.", OG image = the yellow-disc / reaching-hands art.

Where we stand: [BaseLayout.astro](src/layouts/BaseLayout.astro) already takes
`title` / `seoTitle` / `description` / `ogImage` as props, with `siteSettings`
fallbacks. Missing vs Framer: no per-page **robots/noindex** control, no site-search
inclusion flag, and no per-page override surfaced in Sanity (`singletonPage` has no
SEO group) — copy is passed in from each `.astro` page by hand.

Plus, per the user, the **AI layer on top**: AI content / AI summary fields —
i.e. an answer-engine block per page (short extractive summary + structured
JSON-LD) so LLM answer surfaces have something to quote. Scope not yet pinned;
the `seo-aeo-best-practices` skill is the reference when this gets picked up.

**Done — SEO/AEO fields added to `singletonPage`** (`sanity/schemaTypes/singletonPage.ts`,
now grouped Content / SEO / AI-Answers; `npx tsc --noEmit` clean):

- SEO: `ogImagePath` (R2, matches the path-field convention), `ogTitle`, `ogDescription`,
  `noIndex` (Framer's "Search engines" toggle), `canonicalUrl`, `focusKeyword`,
  `secondaryKeywords`, `searchIntent`, `breadcrumbLabel`.
- AI/Answers: `aiSummary` (40–60-word extractive answer, to be rendered **visibly** —
  hidden meta-only text is discounted by answer engines), `keyTakeaways` (3–5),
  `faqs` (question/answer pairs → FAQPage JSON-LD, on every page not just /faq),
  `schemaType` (WebPage / AboutPage / ContactPage / CollectionPage / FAQPage / Service),
  `lastReviewedAt` (→ `dateModified`; `_updatedAt` moves on trivial edits so it is not a
  usable freshness signal).
- Deliberately **not** added: `changefreq` / `priority` (Google ignores them) and any
  meta-keywords output field.
- Schema not deployed yet — needs `npx sanity deploy` / schema deploy before Studio shows it.

**Still open — none of the above renders until the head/route work lands:**

1. `<link rel="canonical">` + `og:url` — neither exists in `BaseLayout.astro`.
2. **`og:image` is relative** (`/brand/og-default.png`) — invalid for Open Graph; needs an
   absolute URL, which needs a `siteUrl` on `siteSettings`.
3. `<meta name="robots">` driven by `noIndex`.
4. `public/robots.txt` — does not exist. Include an explicit AI-crawler policy decision
   (GPTBot / ClaudeBot / PerplexityBot / Google-Extended): allowing raises citation odds,
   blocking prevents training use.
5. `sitemap.xml` — does not exist. Sanity-driven, filtered on `noIndex != true`.
6. **Zero JSON-LD anywhere in `src/`.** Build a `@graph` component; `Article` on posts is the
   biggest single win (`post` already has `author`, `publishedAt`, `excerpt`; `person` has
   `socialLinks` for `sameAs`).
7. Site-level `siteSettings` additions: `siteUrl`, `titleTemplate` (`· wugweb` is hardcoded at
   `BaseLayout.astro:4`), Organization JSON-LD inputs (`legalName`, `foundingDate`, `address`,
   `telephone`; `sameAs` can derive from the live `platformProfile` docs).
8. **Decision needed on `language`** — it offers `fr`/`de`/`es` but no translations exist and
   nothing emits `hreflang`. Either build the alternates or trim the list; a dropdown that
   silently does nothing is a trap.


### 1b. Site-level tier — *schema done 2026-09-24*

Content model is now explicitly four-tier: **site → page → section → component.**
Site and page tiers exist; section and component tiers are not modelled yet.

**`siteSettings` extended** (`sanity/schemaTypes/siteSettings.ts`, grouped Identity /
SEO / Social & Images / Organization / AI-Answers; `npx tsc --noEmit` clean):

- Identity: **`siteUrl`** (the blocker for canonicals, absolute og:image and sitemap),
  `titleTemplate` (`%s · wugweb` — currently hardcoded in `BaseLayout.astro`), `telephone`.
- SEO: `sitemapExcludePaths` (non-Sanity routes like `/thank-you`), `crawlerPolicy`
  (per-bot allow/deny → robots.txt: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, Bytespider, Applebot-Extended), `robotsExtra`,
  `googleSiteVerification`, `bingSiteVerification`.
- Social & Images: `ogImagePath` (R2), `faviconDark`, `appleTouchIcon`.
- Organization (JSON-LD/EEAT): `organizationType`, `legalName`, `foundingDate`,
  `logoPath`, `address` (collapsible object), `founders` (→ `person`), `sameAs`, `areaServed`.
- AI/Answers: `aiSummary` (40–60-word org answer, kept in sync with `llms.txt` /
  `ai-context.txt`), `aiContextUrls`.

**Framer panel → where it actually belongs** (from the site-settings screenshots):

| Framer panel | Here |
|---|---|
| Files (robots/llms/security/ai-context/brand-system) | **Already static in `public/`** — all five exist |
| Code (gtag, hotjar, head/body) | **Already `siteScript`** — GA4/GTM/pixel/heatmap, placement, per-environment, priority |
| Canonical URL | `siteSettings.siteUrl` |
| Headers (HSTS, nosniff, …) | `public/_headers` (Cloudflare Pages) — **file does not exist**, so no HSTS / X-Content-Type-Options / frame policy ships today |
| Performance, automatic optimizations | Astro + Cloudflare build config, not content |
| Multi-site rewrites | N/A |
| Site toggles (reduced motion, RTL, auto-locale, password) | Behaviour, not content — deliberately not modelled |

**Corrections to earlier notes in this file:**

- `public/robots.txt` **does exist** (an earlier claim that it did not was wrong — a shell
  glob error had swallowed the listing). So do `llms.txt`, `ai-context.txt`,
  `brand-system.txt`, `security.txt`.
- The live bug is that `robots.txt` points at `https://wugweb.com/sitemap.xml`, which
  **404s** — no sitemap route exists. Confirmed independently by the Notion SEO page.
- `public/brand/og-default.png` is **965×306**, not 1200×630, and all 14 `singletonPage`
  docs have `ogImage` empty — so every social preview on every page crops wrong.
  Notion also lists three descriptions hard-truncated with a literal `…` (`about`, `home`,
  `refund-policy`) and three at 34 chars (`contact`, `faq`, `impact`).
  Source: Notion → Wugweb HQ / Core Operations / Wugweb Website / 🔍 SEO.


### 1c. OG images salvaged from Framer — *done 2026-09-24*

All six Framer OG assets downloaded and mapped. **They were already 1200×630** — Framer
had the dimensions right; `public/brand/og-default.png` at 965×306 is our regression.

- Originals archived: `assets/seo/og-framer-originals/` (gitignored source tree) with a
  README mapping each Framer hash → page.
- Shipped: `public/assets/og/{default,about,contact,services,work,blog}` as **.webp**
  (q82, ~85% smaller — 300–460 KB → 28–80 KB) **and .jpg** (q72, ~55% smaller).
  Both formats on purpose: WebP for on-page use, JPEG for `og:image`, because OG
  scrapers — LinkedIn especially — still handle WebP inconsistently. **Point the
  `og:image` tag at the .jpg**, not the .webp.
- Served relatively from `public/assets/`; the `PUBLIC_R2_ASSETS_BASE` vars in
  `wrangler.jsonc` are dead (see the header comment in `src/lib/assets.ts`).
- Only **five** distinct images existed: Home's "custom on Framer" OG is byte-identical to
  the sitewide fallback, so Home never had a page-specific image.
- Site Pages v2 filled: `ogImagePath` + `OG Image - r2 link` on all 15 pages that carry an
  OG, and the five long-form v1 notes (404, Cookie Policy, Refund Policy, Impact,
  Industries) copied across verbatim. **Site Pages v1 is now safe to delete.**

**Not done — Sanity still holds nothing.** `ogImagePath` is filled in Notion only; the
14 `singletonPage` docs still have `ogImage` empty and no `ogImagePath`. That write needs
an Editor token (see Known Technical Debt #4).

**Framer copy was better than what replaced it.** Framer's descriptions were hand-written,
varied and keyword-bearing; Sanity's are either the 34-char sitewide fallback (`contact`,
`faq`, `impact`) or auto-truncated body excerpts ending in a literal `…` (`about`, `home`,
`refund-policy`). Framer's originals for `/refund-policy`, `/404`, `/footer/sitemap`,
`/footer/industries` and `/privacy-policy` are recorded in the Site Pages v2 Notes column
— use them as the base for a rewrite rather than regenerating.


### 1d. OG wiring + missing pages — *done 2026-09-24*

- **`BaseLayout.astro` fixed.** `og:image` is now an absolute URL built from
  `Astro.url.origin` (relative paths are invalid per the OG spec; most scrapers drop
  them) and points at `/assets/og/default.jpg`, not the 965×306 PNG. Added `og:url` and
  `<link rel="canonical">` off the same origin — no `site` entry needed in
  `astro.config.mjs` because SSR knows the real serving origin. `npm run build` passes.
- **`reviews` added to the `pageId` enum.** Real bug, not just a missing row:
  `src/pages/footer/reviews.astro` already calls `singletonPageQuery` with
  `pageId: 'reviews'`, but that value was not in the enum, so the lookup could never
  match and the page silently fell through to hardcoded copy on every request. A Sanity
  doc still needs creating before it reads real CMS data.
- **Cookie Settings is not a page.** `SiteFooter.astro` renders it as
  `{ href: '#', isAction: true }` → `#btn-footer-cookie-settings`, which opens the
  consent banner's manage-preferences UI in `BaseLayout`. `/cookie-settings` and
  `/footer/cookie-settings` both 404, correctly. Not tracked as a row.
- Site Pages v2 is now **28 rows** — Reviews added at Order 19.5.


### 1e. ogImagePath written to Sanity AND wired — *done 2026-09-24*

**The Sanity token is an Editor, not a Viewer.** Verified against `/users/me`:
`roles: ['editor']`. Known Technical Debt #4 in `CLAUDE.md` ("current token cannot
reliably update/delete") is **stale** — it can write. Fix that entry.

- **27 docs patched** in one transaction: 14 `singletonPage` + 13 `service`.
  Verified 27/27 now carry `ogImagePath`, 0 missing.
- **`.jpg`, not `.webp`** — this field feeds `og:image`.
- **Services recycle the hub image.** No service doc carries a `coverPath` or
  `galleryPaths` — nothing of its own existed to reuse — so all 13 point at
  `/assets/og/services.jpg`.
- **Wired end to end**, so this is not another inert field:
  `singletonPageQuery` now selects `ogImagePath`; `BaseLayout` takes an
  `ogImagePath` prop and resolves it through `assetUrl()` into an absolute URL;
  the five routes with distinct images (`about`, `services`, `work`, `blog`,
  `contact-us`) pass it. Everything else correctly falls through to the sitewide
  default. **Verified rendering on the dev server** — `/about` → `about.jpg`,
  `/services` → `services.jpg`, `/work` → `work.jpg`, `/blog` → `blog.jpg`,
  `/contact-us` → `contact.jpg`, `/` and `/faq` → `default.jpg`. All six assets
  return 200 in both formats. `npm run build` passes.
- Site Pages v2 aligned to the same `.jpg` values — 22 of 28 rows carry an OG.
  The 6 nulls are correct: two route templates (OG comes from the post/case-study
  doc), Thank You, Kits, the refund 301 stub, and Cookie Policy (no page exists).

**The duplicate route was already fixed.** `/footer/refund-policy` is a 10-line
`Astro.redirect('/refund-policy', 301)` stub, not the 400-line copy the old note
described. **Keep it** — deleting the stub turns a clean 301 into a 404. Note corrected
in v2.

**Still not done:** per-page OG for the 9 routes that use the default is a content
decision, not a wiring gap — they render correctly today.


### 1f. Content-map docs consolidated — *2026-09-24*

Read all nine overlapping docs in `docs/`. Seven were duplicates or fully actioned and are
deleted; their live content moved to Notion **🧱 Content Map** (child of 🗺️ Sitemap).

| File | Verdict |
|---|---|
| `site-content-map.md` / `.csv` | Canonical, code-generated 2026-09-24. **Content moved to Notion**, files deleted |
| `content-map-notion-screenshots-merged.md` / `.csv` | Screenshot transcriptions, text `[cut off]` mid-sentence. Superseded |
| `content-map-per-route-sections.csv` | Truncated subset of `site-content-map.csv` |
| `content-map-field-level-caseStudy.csv` | Truncated copy of the same table in the merged `.md` |
| `notion-site-pages-sync-2026-09-22.md` | **Fully actioned.** §1 SEO copy is live in Sanity (verified), §2 404 description is live at `404.astro:5`, §5 OG salvage done |
| `site-diff.md` | Self-marked COMPLETED AND ARCHIVED 2026-08-07 |

**Kept, deliberately:**

- `content-assets.md` — referenced by `CLAUDE.md`, `README.md`, `governance.md`, `AGENTS.md`,
  `.cursor/rules/free-tier-limits.mdc` and `docs/framer-full-audit.md`. Load-bearing, not
  scratch. **It does carry one false claim** — "R2 cutover live — `PUBLIC_USE_R2_ASSETS=1`;
  paths resolve to R2 public URLs" — contradicted by the header comment in
  `src/lib/assets.ts`, which records those vars as dead and everything serving relatively
  from `public/assets`. Corrected in place rather than deleted.
- `frontend-audit-2026-09-04.md` — **not stale.** 21 findings, most still open and not
  recorded anywhere else. Preserved below, then the file deleted.

**Corrected on record:** the merged content map claimed `caseStudy.impact[]` is fetched but
never rendered. **False** — it renders at `work/[slug].astro:158`, as do `partner` (:94) and
`team` (:98). The real orphans, verified against live Sanity:

- **`industryRef` — filled on 51 of 60 case studies, not in the query or any template.**
- **`testimonial` — 14 real LinkedIn recommendations, zero renders anywhere in `src/`.**
  Highest-value orphan: `/footer/reviews` exists and is thin, showing hardcoded platform
  links with no quotes on it.
- Never filled by anyone: `caseStudy.services` (0/60), `caseStudy.relatedPosts` (0/60),
  `post.syndicatedTo` (0/100).

### 1g. Frontend audit findings preserved from the deleted file (2026-09-04)

Verified against file/line or a live response at the time. **Done** marks what has since landed.

**P0**
1. Invisible text — `--neutral-1` `#F4F4F4` background with `--fg` `#F4F4F4` text = 1:1 contrast, in 18 places (`services/index.astro:121–131`, `blog/[slug].astro:302/304/305`, plus `index`, `about`, `blog`, `work`, `footer/impact`). Needs a `--surface-inverse` / `--fg-on-inverse` pair and a CI contrast check.
2. `[data-reveal] { opacity: 0 }` (`global.css:750`) with no fallback — 41 homepage elements, including legal-page `<h1>`s, stay invisible if GSAP fails. No `<noscript>` anywhere. Needs `@media (scripting: none)` + a `.js-ready` class.
3. ~~`og:image` relative~~ — **done 2026-09-24.**
4. "Stats" that are ordinals, not stats.

**P1 — performance**
5. Nothing is prerendered — zero `export const prerender`; every request SSRs with 3–4 blocking Sanity calls, TTFB peaks 1.31 s.
6. Every asset returns `max-age=0, must-revalidate`.
7. 9.85 MB of autoplaying video re-downloaded on every homepage visit — drop `autoplay`, add posters, re-encode.
8. Asset library 698 MB, 112 MB duplicated; PNG/JPG → WebP.
9. Render-blocking Google Fonts — self-host.
10. CSS fragmented across 22 inline `<style>` blocks.

**P2 — SEO**
11. ~~Zero canonical / `og:url`~~ — **done 2026-09-24.** Structured data still absent.
12. ~~Duplicate page at two indexable URLs~~ — **done**, `/footer/refund-policy` is a 301 stub.
13. The advertised sitemap does not exist — `robots.txt` still points at a 404 on the Pages deployment.
14. Production domain is `wugweb.pages.dev` — attach `wugweb.com` or `noindex` pages.dev.

**P3 — security, privacy, correctness**
15. Zero security headers — no `public/_headers` file exists.
16. Tracking cookie set before consent; the consent UI does nothing. Either wire analytics up or remove the consent theatre and the `visitor_id` cookie.
17. `set-cookie` on every response defeats edge caching.
18. Preview deployment bindings are broken.
19. No skip-to-content link.
20. **463 hardcoded colour values** in `src/pages`, `src/components`, `src/layouts` — directly contradicts this file's earlier claim that the token migration removed them.


### 1h. Phases 0–3 executed — *2026-09-24*

Plan: `~/.claude/plans/snoopy-splashing-pearl.md`.

**Phase 0** — merged `docs/consolidate-content-maps`; the seven superseded
content-map files are actually gone from `main` now. `CHANGELOG.md` backfilled:
it had recorded **none** of the nine commits that day, against `governance.md`
§9 rule 11.

**Phase 1** — case studies read their own SEO fields. 54 of 60 had a `seoTitle`
and `seoDescription` that never reached the page; 19 an `ogImage` that never
rendered. Three things verification caught that the plan had not predicted:
- Every populated `caseStudy.ogImage` is a **plain Framer CDN URL string**, not
  a Sanity image object. `urlFor()` on a string throws and 500'd the Kia page.
- `thumbnailPath` is `.mp4` on 33 of 33 docs and `coverPath` on 4 — an `.mp4`
  in `og:image` renders nothing. Fallback now gated on an image extension.
- `adneto-merchant-platform` stores `team` as a string, which passes the
  `?.length > 0` guard then throws on `.join`. **That page was already 500ing
  before any change.**
- `caseStudy.canonicalUrl` was queried and redirected on while **undeclared**.
  44 of 60 carry a value, 13 drive a live 301. Declared. This also corrects
  `docs/schema-template-section-component-level.md` §1 — there was no existing
  field to clash with, so its proposed `seoCanonicalUrl` is unnecessary.
- Draft preview added to case studies; `/api/preview` had only ever worked for posts.

**Phase 2** — orphans wired.
- `industryRef` (51 of 60) now feeds the `/footer/industries` drawer: **57 real
  case studies across 29 industries**, replacing six invented strings each,
  with the old prose as fallback where no work exists. Legacy stubs filtered out
  via `canonicalUrl` — METCRED was listing twice.
- **Deliberately not changed:** the meta row still shows the legacy `industry`
  string. It and the ref disagree on 40 of 51 docs and the string is richer
  (`'Telecommunications, Smart Home'` vs a ref of `'Smart Home'`). The ref is a
  join key; the string is the display label.
- `testimonial` wired to `/footer/reviews`, filtered to `subject in ["wugweb","both"]`.
  **All 14 existing documents are `subject: vedanshu`** — personal LinkedIn
  recommendations — and are deliberately not rendered here. They belong to
  vedanshu's own site and go there via Neon. `source` gained `clutch`,
  `designrush`, `goodfirms` so agency-collected reviews are typed on entry.

**Phase 3** — `noIndex` was inert everywhere because `BaseLayout` emitted **no
robots meta at all**. Now emitted, and the canonical is suppressed on those
pages. Added to `caseStudy` and `post`: `ogImagePath`, `ogTitle`,
`ogDescription`, `noIndex`, plus `canonicalUrl` on `post`. **JSON-LD shipped** —
the site previously had none: Organization + WebSite sitewide (sameAs from the
31 live `platformProfile` docs), BlogPosting on posts, CreativeWork on case
studies. Exposed that **25 of 100 posts have a non-ISO `publishedAt`** from the
WordPress import; normalised at render rather than mutating content.

**Still deliberately unshipped:** `focusKeyword`, `secondaryKeywords`,
`searchIntent`, `breadcrumbLabel`, `aiSummary`, `keyTakeaways`, `faqs`,
`schemaType`, `lastReviewedAt` on `caseStudy`/`post`. They need a visible answer
block and breadcrumbs first. `singletonPage` already demonstrated the failure
mode — fourteen fields shipped a day ahead of their consumer.

**Open:** Phase 2.3 (decide on `caseStudy.services` 0/60, `relatedPosts` 0/60,
`post.syndicatedTo` 0/100), Phase 4 (`pageSection` consumer), Phase 5 (43 Notion
section rows, dead content-types DB). Every `siteSettings` Organization field is
still empty — JSON-LD prunes them, so filling them enriches it immediately.


### 1i. Phase 4 + security headers — *2026-09-24*

**`pageSection` has consumers.** Three of five global sections are editable
content now instead of strings in a layout: `industries`, `insights`,
`final-cta`. Documents created at `section-<sectionId>`. Placement moved into
data (`excludeRoutes`), replacing the `hideGlobal*` props in `.astro`
frontmatter. Verified live: editing a title changed the heading, `excludeRoutes`
hid the section on the named routes only, `enabled: false` removed it everywhere.

**Started with `industries`, not `cookie-consent` as the plan named.** Industries
maps 1:1 onto the existing schema; the cookie UI needs six button labels, a modal
title and intro, an "always active" badge and a close aria-label against a schema
offering one `ctaLabel`/`ctaHref` pair. **`cookie-consent` and `trust-badges`
remain unwired** pending that schema decision.

**⚠️ Document-id collision found the hard way.** `deskStructure.ts` used
`_id === sectionId`, explicitly copying singletonPage's `_id === pageId`. But
`industries` is **both** a pageId and a sectionId — creating a `pageSection` at
`_id: 'industries'` landed on the industries *page* document and overwrote its
title before being caught and repaired (title restored, stray field removed,
nothing else touched). Section ids are now `section-<sectionId>`. **Any future
type adopting an `_id === key` convention must check the other namespaces first.**

**Security headers, findings 6 and 15.** `public/_headers` added — but the
important part: **`_headers` does not cover SSR HTML.** Cloudflare Pages applies
it to static assets only, so the first commit secured the images and left every
page bare. Confirmed in production, then fixed in `src/middleware.ts`, kept
byte-identical so the two surfaces cannot drift. Both verified live.

Caching now reflects what each path guarantees: `/_astro/*` immutable for a year
(content-hashed), `/assets/*` one week with stale-while-revalidate (**not**
hashed — a year would strand swapped images), `/sw.js` never cached. HTML
deliberately untouched.

**CSP deliberately not set**, with the reasoning in `public/_headers`. Google
Fonts, Sanity's CDN, framerusercontent.com images and several inline scripts all
need testing against it first; a CSP written blind would break the page for real
visitors.

**Still open:** Phase 2.3 (`caseStudy.services` 0/60, `relatedPosts` 0/60,
`post.syndicatedTo` 0/100 — populate or drop), `cookie-consent`/`trust-badges`
sections, Phase 5 Notion rows, and the §1g P0s: the `#F4F4F4`-on-`#F4F4F4`
contrast bug in 18 places and `[data-reveal]` with no no-JS fallback (observed
directly this session — a screenshot came back entirely black because GSAP had
not run).


### 1j. Both §1g P0s fixed — *2026-09-24*

**Contrast.** Measured in-browser with a computed-contrast sweep, not read off
the CSS. Five live failures, worst first:

| Element | Where | Was |
|---|---|---|
| `.stat-label` | `/services` | **1.00** — #F4F4F4 on #F4F4F4, literally invisible |
| `.btc-meta` | **sitewide** | **1.14** — blog teaser byline and read-time |
| `.stat-n` | `/services` | 1.21 |
| `.culture-grid li` | `/about` | 1.76 |
| `.stat-copy` | `/services` | 1.76 |

Two opposite causes. On `/services` and `/about`, light `--neutral-1` surfaces
carried near-white `--fg`; fixed with the `--color-ash` pairing BentoBlock
already uses, not a new token. **`.btc-meta` was the inverse and the more
interesting one** — dark ink on a dark card, left behind when
`.blog-teaser-card` was deliberately changed from `--neutral-1` to
`--color-surface-elevated`. That teaser renders on most pages, so the byline has
been invisible sitewide since that change.

Also fixed latent: `.article-body code` / `pre` set a light background with no
colour. No post contains a code block, so it was never seen — it would have been
invisible the first time anyone published one.

**The audit's "18 instances" was overstated.** Seven `--neutral-1` backgrounds
exist; ServiceSpotlightPanel, BentoBlock and impact's visual container were
already correct.

**Not changed, deliberately:** `--color-text-muted` (#7D7D7D) measures 4.23:1 on
#1A1A1A — a marginal AA miss, not invisibility. It is a global token used 38
times across 8 files; moving it to ~#858585 (4.72:1) is a design-system
decision. **Open for Vedanshu.**

**`[data-reveal]`.** Was a bare `opacity: 0` with nothing to undo it. Default is
now visible; `opacity: 0` applies only under `.js-reveal`, added synchronously in
`<head>` and removed by a 5s watchdog if the animation module never runs.

`@media (scripting: none)`, which the audit proposed, would **not** have caught
the case actually observed this session — JS was alive, GSAP just had not run,
and a screenshot came back entirely black. A watchdog covers both.

Four cases verified: no JS (class never added), module fails (watchdog reveals),
module slow (watchdog reveals, then the module sees the gate is gone and skips
animating rather than hiding content the user is already reading), normal
(module clears the watchdog and animates). Confirmed on production: gate held,
h1 revealed, all six above-fold elements visible, seventeen below-fold still
pending scroll. Dev exercised the watchdog path, since Vite serves GSAP
unbundled and the module exceeds 5s there.


### 1k. sitemap.xml, robots, and the `_id === pageId` convention completed — *2026-09-24*

**sitemap.xml exists.** `robots.txt` had been advertising it while it returned
404. 176 entries, reconciled: 16 static + 13 services + **47** case studies
(60 published minus the 13 whose `canonicalUrl` redirects them) + 100 posts.
Absolute www URLs, matching the canonical tag. Routes are listed explicitly
because `singletonPage.route` is populated on **0 of 14** documents — fill it and
the list collapses into a query.

**robots.txt corrected.** Its `Sitemap:` line named the apex, which 308-redirects,
so it advertised *a redirect to a 404*. Now names www, plus `Disallow` for
`/api` and the error/system routes and an explicit AI-crawler allowlist, so the
decision is recorded rather than implied.

**`noIndex` only ever reached case studies and posts.** `singletonPageQuery` did
not select it, so a page could be dropped from the sitemap while still emitting
a canonical and no robots meta — the two contradicting each other about the same
URL. Now wired through all 16 singletonPage routes, including the four legal ones
via `LegalLayout`. Verified by toggling `/faq`: robots meta appeared, canonical
vanished, sitemap fell 176 → 175; unset and all three reverted.

**`_id === pageId` is now true for all 14 documents.** `about`, `faq` and `home`
carried random UUIDs, so they never opened through the desk's fixed-document
shortcuts and were the reason a probe script had to guard by `pageId`. Migrated
in a create+delete transaction after checking: no inbound references, no drafts,
and all three target ids free — that last check is the one that would have
prevented the `industries` collision. All content carried (FAQ's 10 items, both
hero videos, SEO fields, `ogImagePath`). All three verified rendering live.

**Still open:** `caseStudy.services` (0/60), `relatedPosts` (0/60),
`post.syndicatedTo` (0/100) — populate or drop. `cookie-consent` and
`trust-badges` sections. `--color-text-muted` 4.23:1 token decision. Notion: 43
section rows and the dead content-types DB. And `singletonPage.route` /
`siteSettings` Organization fields are empty — filling either improves output
with no code change.


### 1l. Skip link + `<main>` landmark — *2026-09-24*

Audit finding 19, and the first real piece of the landmark work noted in §2.

The site had **no `<main>` element anywhere** and no skip link. A screen reader
had no primary landmark to jump to, and a keyboard user tabbed through the whole
header on every page — 13 focusable elements on `/about` before reaching page
content.

Two details that matter and are easy to get wrong:

- The link is hidden by `transform`, **not `.sr-only`**. `.sr-only` clips the
  element even while focused, producing a focus ring around nothing — worse than
  no skip link, because the user cannot see where focus went.
- `<main id="main" tabindex="-1">`. Without the tabindex the browser scrolls to
  the anchor but leaves focus behind, and the next Tab returns to the header the
  user just skipped.

The global sections (partners, industries, insights, final CTA) sit **outside**
`<main>` — they are site chrome, not page content. `scroll-margin-top` reuses the
value the in-page anchors already use (commit `eaad7f68`), resolving to 110px, so
a skip lands below the sticky header rather than under it.

Verified with real keyboard input, not just markup: first Tab focuses the link
and it slides into view, activation moves focus to `MAIN#main` and sets the hash,
and the following Tab lands inside main. Live in production.

**Remaining §1g findings, unowned:** 5 (nothing prerendered), 7 (9.85 MB of
autoplaying video on the homepage), 8 (112 MB duplicated assets, PNG/JPG → WebP),
9 (render-blocking Google Fonts), 10 (CSS across 22 inline blocks), 14 (production
domain is pages.dev), 16 (`visitor_id` cookie set before consent and the consent
UI does nothing), 17, 18, 20 (463 hardcoded colour values). Findings 1, 2, 3, 6,
11, 12, 13, 15 and 19 are now done.


### 2. Semantic tag selector — *noted only*

Framer lets each frame pick its HTML tag: `article, aside, button, div, figcaption,
figure, footer, header, main, nav, ol, section, ul` (`label` greyed out), with
`section` as the default. Equivalent for us = auditing that our section wrappers
use real landmarks instead of `div` everywhere.

### 3. Scroll-section anchor name — *noted only*

Framer's "Scroll section" panel: a **Name** field (`# culture`) plus an **Offset Y**,
giving the section a URL hash target with a scroll offset for the fixed nav.
Equivalent for us = `id="culture"` + `scroll-margin-top` on section wrappers, so
`/about#culture` deep-links land clear of the header.

### 4. Per-element accessibility fields — *noted only*

Framer exposes **Aria label**, **Tab index** and **Google bot** per element
(alongside Tag), under an Accessibility group.

---

## ⏸️ Deferred

| Item | Status | Reason |
|---|---|---|
| Homepage chat hero | ⏸️ Deferred | Keep video hero |
| DNS cutover | **✅ Done (confirmed 2026-09-23)** | `www.wugweb.com` now serves this Astro/Cloudflare Pages site, not the old Framer build — confirmed live via `location.hostname`, verified intentional with the user. Not something this session did. |
| Hyperdrive / SESSION KV | ⏸️ Deferred | Only if runtime needs |
| footer/subscription | ⏸️ Deferred | Payment gateway scoping |
| Credential rotation | ⏸️ Deferred | Unless user asks |

---

## ✅ Recently completed (this arc)

- [x] **UI audit spec received + first two items actioned (2026-09-22)** — External UI audit landed at `Claude outputs/ui-spec-2026-09-22/` (spec + 6 measured screenshots, old Framer site vs `wugweb.pages.dev` at 8 widths). Covers breakpoints, the "nothing wider than the nav" width rule, type scale, tokens, component consolidation, nav/menu, service pills, hero, PWA, motion, Storybook. **Read it before touching layout or type.**
  - **Correction to the spec, on record**: §5's claim that `--svc-accent` / `--svc-bg` / `--svc-fg` are undefined "which is why service colours do not apply" is a false positive — they're set inline per panel at `services/index.astro:125` and resolve to the defined `--svc-*-dark` tokens (`global.css:156`). Colours do apply; the spec's own `01-new-pills-390.png` shows all six. Its static scan didn't read `style` attributes. Independent audit measured **30** `var()` refs absent from `global.css`, not 25: 16 legitimately component-scoped, 9 undefined-but-with-fallback, **5 genuinely broken**.
  - **Fixed the 5 zero-fallback tokens** (same failure mode as the `--opacity-soft` gap documented at `global.css:350`, so aliased to existing tokens rather than given new values): `--opacity-muted` → `--opacity-70` and `--opacity-subtle` → `--opacity-60` (services panel index numbers + inactive tier tabs were rendering at full opacity; ordered against the existing ramp subtle .60 → hover .90 → active 1); `--surface-elevated` / `--surface-hover` → the canonical `--color-surface-*` (contact-us chips, cards, checked/focus states fell through to transparent); `--transition-fast` (every chip, field, radio and submit button on contact-us snapped with no transition — properties listed explicitly rather than `all`, since those five are the only ones those rules change).
  - **Fixed the §3 width offender** — `.global-final-cta` was the only block that paints a background *and* is itself the `.wrap`, so its yellow box spanned the full 1280px border box while the nav and every other section stop at the content edge inside the gutter. Moved `.wrap` to a parent `div.final-cta-wrap` in `FooterCTA.astro`; the painted panel is now that wrap's content box, so it's the same width as the nav at every viewport by construction. Vertical rhythm unchanged (margins collapse through the wrapper). Production build clean.
  - **Not a bug, left alone**: the spec's second §3 finding (social discs crossing the panel's bottom edge) is deliberate and documented in `FooterCTA.astro` — `bottom: -14%` under `overflow: hidden`, "the discs are meant to sit in the bottom of the box and be cropped by its edge".
  - **Blocker 2 of 4 resolved**: the "Kits Responsive Token Contract — sm/md/lg (normative, v2, committed 31 Aug 2026)" the spec defers to **does not exist in this repo** — zero matches for `sm/md/lg` or `3-tuple` outside the spec itself, and no `kits_design_system/` commits in that window. Either it lives elsewhere (Notion? a separate Kits repo?) or it was never written. **Ask before deferring to it again.**
  - **Kits vs spec conflict, needs a decision**: `kits_design_system/docs/tokens/breakpoints.md` documents six breakpoints (480/640/768/1024/1280/1440); spec §2 wants three (0/768/1200). More seriously, `typography.md`'s fluid scale is *the thing spec §4 diagnoses as broken* — `--fluid-caption: clamp(0.625rem, 0.05vw + 0.62rem, 0.75rem)` computes to exactly the 10.1px paragraph the spec measured at 390px, and `0.05vw` means it stays static until ~2500px. The spec's caveat says "if Kits differs, Kits wins" — **applying that rule here would re-enshrine the bug**. Recommend the spec's scale (anchored min@360 / max@1280) wins and Kits' typography.md is rewritten to match.
  - **Duplicate token definitions resolved (2026-09-23)** — spec §5 flagged `--shadow` / `--shadow-lg` as "each defined twice with different values"; the real count was four tokens, and one was a live bug. `--shadow-lg` was defined three times: the Kits scale step (`0 16px 48px`), then clobbered by a "legacy alias" line below it (`var(--shadow-md)` = `0 8px 24px`), so the scale's lg step silently resolved to md for every consumer. Kept the scale definition, deleted the clobbering alias. Also removed the superseded Framer-era `--shadow`/`--shadow-lg` pair, the repeated `--shadow-nav`, and the duplicate `--radius-full`. **No visual change**: `--shadow` and `--elevation-4` (the only `--shadow-lg` consumer) both have zero call sites, and the other two duplicates were byte-identical. `--shadow` kept as the one legacy alias, since the scale has no plain `--shadow` step. Zero duplicate definitions remain in `global.css`; build exit 0.
  - **Service pills fixed (§8, 2026-09-23)** — the mid-word breaks in `01-new-pills-390.png` ("experienc/e", "growt/h", "bran/d"). Four of the audit's five causes were still live in `ServiceTagField.astro`: the label used `--fluid-h1` (a 32px reading floor the pill can't hold on a phone); `overflow-wrap: anywhere` under 600px permitted breaks mid-glyph; three competing max-width caps (`min(26rem, 84%)`, `calc(100% - var(--gap-4))` under 600px, `92%` under 640px); and `touch-action: none` handed every touch to the drag solver, so a thumb landing on a tag couldn't scroll the page. Fixed: added the **graphic display tier** from §4.2 to `global.css` (`--type-graphic-l/m/s`, sized in `cqi` not `vw` — additive, no conflict with Kits), field gets `container-type: inline-size`, label moves to `--type-graphic-s` + `white-space: nowrap` + tight leading/tracking, one cap instead of three, `touch-action: pan-y`.
    - **The fifth cause was already fixed and the audit missed it**: `clampToField()` in `draggable-tags.ts` already clamps every tag's right edge into the field using real measured widths, after fonts settle and on resize. The audit measured `wugweb.pages.dev`, which predates the Service Tag Field extraction (`5963e361`) — so some §8 findings describe a build that is no longer what the repo contains. **Re-measure against a current deploy before actioning the rest of the audit.** Added a container-query clamp as the first-paint half (tags otherwise paint at authored offsets and get yanked left when the JS pass runs); the JS remains authoritative via inline style. If the pill's intrinsic width changes, the `17.5rem` in that rule needs updating with it.
    - Stale comment corrected in the same file: it warned that `--shadow-lg` was unusable because a legacy alias overrode the scale. That root cause was fixed earlier the same day, so the note now records the history instead of a live constraint. Shadow ladder values left alone (md → xl → 2xl) to avoid an unrelated visual change.
  - **Audit re-verified against current code (2026-09-23)** — prompted by the §8 discovery that the audit measured a deploy older than the repo. Results: **§10 PWA — all four findings still live and now fixed** (below). **§2 breakpoints — worse than reported**: the audit found seven (600/640/700/768/900/1024/1200); current code has **nine** — 600 is gone but 480, 500 and **992 (13 uses)** have appeared. **§5 hardcoded values** — at least as large as reported; my grep counts 294 hex / 801 px across `src/**/*.astro`, but the methodology differs from the audit's 108/280 so the numbers aren't directly comparable.
  - **PWA safe-area work done (§10, 2026-09-23)** — added `viewport-fit=cover` to the viewport meta (absent, so `env()` could never resolve), plus `--safe-top/right/bottom/left` tokens in `global.css` wrapping `env(safe-area-inset-*)` with a `0px` fallback so they're inert off-notch. Applied to the three elements pinned to a screen edge: the sticky `SiteHeader` bar, the fixed cookie banner, and the blog reading-progress bar. Confirmed the audit was right that the **maskable icon reuses the 512 "any" icon** — `manifest.webmanifest` lists `/brand/pwa-512.png` twice, once `any` and once `maskable`, so Android crops the logo.
    - **Two §10 items deliberately NOT done**: (1) the maskable icon needs its own PNG with safe-zone padding (~20% inset) — an asset job, not a code one. (2) `vh → dvh` standardisation (10 `vh`, 1 `svh`, 2 `dvh` remain): a blanket switch is wrong for the sticky full-height panels on `/services` and `ProcessMap`, where `dvh` re-resizes as the address bar hides and causes scroll jank. Those want `svh`; only genuinely address-bar-tracking elements want `dvh`. Needs a per-call-site pass with visual checking, which this sandbox can't do.
  - **Mobile menu: scroll lock + card height fixed (§7, 2026-09-23)** — all five §7 behaviour claims re-verified as still live in the current code before touching anything. Fixed the two that need no design decision: (1) **scroll lock** — `document.body.style.overflow = 'hidden'` in `site-header.ts` is ignored by iOS Safari, so the page scrolled behind the open menu (visible in `02-new-menu-open-390.png`). Replaced with `position: fixed` plus saved/restored scroll offset, guarded by a `locked` flag so the restore can't fire on the resize and link-click paths that also call `setOpen(false)`. (2) **open card overflowed** — it was a flat `max-height: 100dvh` while `.site-header` adds its own top padding above it, so the card was that much taller than the screen; now `calc(100dvh - var(--safe-top) - var(--gap-4))`, plus `overscroll-behavior: contain`.
    - **Three §7 items deliberately NOT done.** §7.1 (nothing animates — `transition: min-height` but the open state changes `max-height`) and §7.2 (icon swap via `display`, not a morph) both need the **hamburger→X motion recording, open item §13.4**; the audit's 0.4s/bounce-0.2 spring is its own stated assumption, not a measurement, and animating `max-height` badly is worse than the current instant swap. §7.5 (toggle jumps on open) is a **DOM restructure, not a CSS tweak**: `.site-links` sits *inside* `.nav-top`, so `flex-wrap: wrap` reflows that row and drags the logo and toggle down with it. The fix is to make it a sibling of `.nav-top` like `.menu-meta` already is — which also collapses the three left edges the audit measured down to one — but that rearranges the desktop bar too, and this sandbox can't verify it visually.
  - **§5 step 4 measured properly — the audit's "108 hardcoded hex colours" is mostly a false positive (2026-09-23).** Classifying every hex inside `<style>` blocks by kind: **65 are `var()` fallbacks** (already tokenised — and deliberately so; commit `4f72510b` was literally "fix fallback drift"), **9 sit in comments** as prose, **0 are token definitions**, and **103 are genuinely bare — of which 86 are in `pages/kits.astro`**, the token showcase page, where literal values are arguably the point. That leaves **17 real hardcoded hex values across the whole rest of the site**, not 108.
    - **12 substituted** — only where a token's resolved value is byte-identical, so rendering provably cannot change: `#fff`→`--neutral-0` ×5, `#2b2b2b`→`--surface-2`/`--color-border-subtle` ×4 (property-aware), `#000`→`--neutral-10`, `#fa4108`→`--svc-strategy`, `#3ed219`→`--color-feedback-success`. Bare count outside the showcase page is now **5**.
    - **5 deliberately left.** `#ffd000` in `work/[slug]`'s gold badge is the second yellow — audit §5 **step 3, blocked on Branding**, and tokenising it now would silently pick a side. `#10b981` ×2 (contact-us) and `#2b70f0` ×2 (subscription) are **off-palette** — no token has those values, and the nearest (`--color-green` `#3ED219`, `--color-blue` `#2368D7`) are visibly different, so mapping them would be a design change, not a refactor. They need either a new token or a decision to snap them to the palette.
    - **Method note for whoever does the px pass**: two earlier versions of my classifier were wrong — one counted `var()` fallbacks as hardcoded, another mis-scored them by balancing parens over a fixed window. A naive regex sweep here would have written `var(--x, var(--x))` and self-referential token definitions. Strip comments, scope to the declaration, and check for an unclosed `var(` before touching anything.
  - **§5 step 4, px pass (2026-09-23)** — same measure-first method as the hex pass. Of px literals inside `<style>` blocks: 40 in comments, **93 inside `@media` conditions where a CSS variable is impossible by spec**, 24 `var()` fallbacks, 620 genuinely bare (audit said 280). Substituted **251** where a token's value is byte-identical and the property makes the mapping unambiguous: **169 border widths → `--stroke-*`** (`border`, `border-top/bottom/left`, `outline` — `border-radius`/`-color`/`-image` explicitly excluded) and **82 spacing → `--gap-*`** (`gap`, `padding*`, `margin*`). Bare px now **369**, of which 201 are in `pages/kits.astro`.
    - Verified after applying: 0 radius properties given a stroke token, 0 nested `var(var(`, 0 `@media` conditions touched, 0 negative margins mangled, and every emitted token landed on a property of the right kind (stroke → border/outline only; gap → gap/padding/margin only). Build exit 0.
    - The remaining 369 need judgement, not a sweep: `box-shadow` offsets, `transform` distances, `width`/`height`, `grid-template-columns` tracks and `max-width` values mostly have no token with a matching value, and inventing one per literal would grow the token set rather than shrink the debt.
  - **First visual verification of the session (2026-09-23)** — `preview_start` is still TCC-blocked, but the Bash tool has Documents access, so the dev server was started from there and driven through the browser pane. Findings against the five earlier commits:
    - **§3 CTA width — confirmed fixed.** At 390px: nav 343px, painted CTA 334.4px (inside the nav, was ~22px wider), and `document.scrollWidth === innerWidth`, so the horizontal page overflow the audit reported is gone.
    - **§8 pill type — confirmed fixed.** `white-space: nowrap` applied, `container-type: inline-size` active, every label computed at 28px on one line. No mid-word breaks.
    - **§7 scroll lock — confirmed, after finding two real bugs in my own fix.** (1) The restore ran before layout recovered the document height, so it clamped against the collapsed height and landed near the top; fixed with a reflow read. (2) More seriously, `global.css` sets `html { scroll-behavior: smooth }`, which a plain `window.scrollTo` obeys — so closing the menu **animated** the page from the top back down, measured climbing 0 → 1 → 4.5 → 11 → 21.5 across frames. Now `behavior: 'instant'`. Verified: body `fixed` with `top: -1200px` while open, page cannot scroll behind it, restore lands on the first frame with 0 drift.
    - **Removed my `@container` pill clamp.** On the live page the tags are positioned by a GSAP scroll-scrubbed transform, and `clampToField()` then writes an inline `left` in px. A CSS `left` is a third authority the inline style overrides anyway and which cannot see the transform. The first-paint jump it was meant to prevent does not exist — the tags deliberately start outside the field and fly in.
  - **⚠️ Open, needs a person: the mobile pill composition.** With `nowrap` the pills are now 250–330px wide in a 358px field, so the authored x-scatter (up to 55%) cannot survive — they collapse into a near-vertical stack and labels cover each other ("strategy" under "brand", "engineering" under "growth"). The audit's §4.2 sanity check predicted the width and accepted it, but did not consider the pile. Three options, all design decisions: lower the `--type-graphic-s` floor below `1.75rem` for narrow containers, re-author mobile-specific `pos` values in `service-tags-data.ts`, or scale the whole group as §8 suggests. **Do not tune this blind** — the entry timeline is scroll-scrubbed, so synthetic scrolling lands it mid-flight and measurements taken then are meaningless.
  - **§7.5 fixed and measured (2026-09-23)** — previously deferred only because it couldn't be checked visually. Opening the menu wraps `.site-links` into `.nav-top` as a second flex line, so `.nav-top`'s `min-height` stopped governing the first line and the toggle rode **17px upward** (measured: closed top 33 → open top 16, container 78px → 374px). Fixed with `align-content: flex-start` plus `min-height: var(--nav-height)` on the logo, holding line 1 at the closed bar's height. Also removed the doubled gutter on `.site-links` — `.nav-top` already applies `padding-inline`, so links and CTA sat 32px in while logo/contact/legal sat at 16px. **Verified: toggle jump 0px, toggle x-shift 0px, and 1 distinct left edge** (audit measured 3; the current build had 2). No DOM restructure was needed after all — the desktop bar is untouched.
  - **§8 pill composition, settled read (2026-09-23)** — the earlier unstable measurements were my own error: the entry timeline is `toggleActions: 'play reverse play reverse'`, **not scrubbed**, and I kept scrolling past `end: 'bottom 40%'`, which fired the reverse and flew the tags back out. At a proper resting position all six labels render on one line with no mid-word breaks, and five of six are fully legible. **One residual collision: "growth" covers "engineering"** (tops 204 vs 229, pills ~80px tall, authored y 46% vs 52% = 29px apart at a 480px field). Field height won't fix it — the gap is proportional. Needs mobile-specific `pos` values in `service-tags-data.ts`, which is a design decision, not a bug fix.
  - **Expanded menu is now a full-height sheet (2026-09-23, user-requested)** — was sizing to its content (670px, 79.4% of an 844px viewport). Now `height: calc(100dvh - safe-top - safe-bottom - gap-4*2)` with a `100svh` first declaration as the fallback, `max-height: none`, and `padding-bottom` that clears the home indicator. Measured: **812px, 96.2% of viewport**, symmetric 16px insets top and bottom, links at the top and contact/legal pinned to the bottom via the existing `margin-top: auto`, toggle still at 33px (no jump), no internal scroll needed at this height. `svh` is deliberately the fallback rather than `dvh`: it is the stable small viewport, so the sheet never grows past the screen when the address bar retracts.
  - **Old vs new menu compared directly (both at 390×844)** — the audit's §7 table is substantially out of date. Already matching: card top 16, inset 16/16, width 358, links centre-aligned. (The audit reported inset ~6, logo 82, links left-aligned — all measured against a stale deploy.) The old menu is **not** full height either: 677px / 80.2%, near-identical to what the new one was before this change. Two real differences remain, both deliberate-looking rather than bugs: **"Let's Talk" is yellow (50px) on the new site vs the same grey as the other links (58px) on the old** — the yellow nav CTA is a deliberate decision recorded in CLAUDE.md, so this is parity we chose to break; and **contact rows are two separate cards vs one grouped block** on the old. Neither is actioned; flag for a design call.
  - **§9 hero — functional half fixed, composition half still open (2026-09-23)** — measured against the old site at matched viewports. The audit's `h1 top = 683px` is **exactly right** (I briefly mis-measured 1511px by leaving the menu open from a previous test; the header is fine at 94px). Root cause found: `.hero { min-height: 100svh }` sits *below* a 94px in-flow sticky header, so the section ended one header-height past the fold and **both hero CTAs were off the first screen** (buttons at 921px in an 891px viewport). Now `calc(100svh - var(--nav-height) - var(--gap-4) - var(--safe-top))`. Verified: hero ends exactly at the fold, both CTAs visible, h1 moved from 82% down to 70%.
    - **Still open, and it needs two decisions.** Old site puts h1 at 308px / 35% down with headline, subhead and both buttons comfortably on screen; new is at 70%. Closing that gap means un-pinning `.hero-content` from the bottom (`margin-top: auto`), which is a composition change to a deliberate video-hero layout — a design call. And the type gap (h1 40px vs old 48px, eyebrow **10.1px** vs 12px) is the Kits `--fluid-*` scale, still waiting on the ruling recorded above. The 10.1px eyebrow is the exact `--fluid-caption` computation predicted earlier, now confirmed live.
  - **§7.1 + §7.2 done — the blocker dissolved (2026-09-23)** — these were parked on open item §13.4, "no recording of the hamburger→X motion". With the old site live in a second tab I tried to extract its timing frame-by-frame; Framer animates a wrapper rather than the card, so the sample showed it already at full height. User then delegated the motion ("hamburger animation i leave it on you"), so it is designed off the existing tokens rather than copied. **§13.4 can be closed.**
    - **Morph, not a swap**: the three bars now become the cross — staggered widths (18/14/10) even to 18, the middle rule collapses via `opacity` + `scaleX(0)`, and the outer two translate ±6px to the centre line and rotate ±45°. The 6px comes from the stack geometry (2+4+2+4+2 = 14px tall). The dead `×` text glyph is deleted from markup and CSS. Verified live: `matrix(0.707…, 0, 6)` / `matrix(…, 0, -6)` with middle opacity 0.
    - **§7.1 the menu actually animates now**: the transition read `min-height` while the open state changes `height`, so it could never fire. Both ends are definite values (closed `height: var(--nav-height)` on mobile only; desktop keeps `height: auto`), measured animating 78 → 96 → 812.
    - Reduced motion needs no new guard — `global.css` already forces `transition-duration: 0.01ms !important` globally.
  - **Logo was undersized** — old site's wordmark is ~125 wide at 390px, ours was 94. Now 45px tall = **124 wide**. (Audit said 125 vs 82; it had drifted to 94 since.) Navbar height needs no change: both sites are 78px closed, as the audit also found.
  - **⚠️ Open — background is flat where the old site is layered.** User observation, confirmed by measurement. Old site uses **four** dark values across sections: `#050505` (body), `#000000` (4 sections, tallest 1864px), `#191919` (929px section), `#2B2B2B` (menu card). The new site has **no dark section backgrounds at all** — only `#F4F4F4` light blocks ×3 and the `#FFBE1A` CTA, everything else transparent over body `#050505`. All four values already exist as tokens (`--neutral-9`, `--neutral-10`, `--color-surface-elevated`, `--neutral-7`), so this is a question of which sections get which, not of new tokens. Needs a design pass deciding the rhythm; not actioned.
  - **Site now scales proportionally above 1440px (2026-09-23, user-requested)** — previously the layout stayed pinned at a 1280px cap while the margins grew, so a 1920 or 2400 screen showed the same small page in more empty space. Converted the layout tokens from px to rem (`--s`/`--p`/`--gap` ramp, `--r-*` radii, `--space-section-*`, `--space-page-*`, `--nav-height`, and both container caps → `80rem` / `90rem`), then added one rule: `:root { font-size: clamp(16px, calc(100vw / 90), 24px) }`. Below 1440 it resolves to 16px and nothing changes; above it the root grows with the viewport and everything in rem follows. Capped at 24px (~2160px) so it stops before a 4K panel.
    - **Verified by ratio, which is the real test**: nav ÷ viewport is **0.889 at 1440 and 0.889 at 1920** — the same design scaled, not stretched. Root 16 → 21.33px, nav 1280 → 1707, nav height 78 → 104, h1 80 → 107px.
    - **Deliberately not scaled**: `--stroke-*` stays px so hairlines stay crisp rather than blurring to 1.33px; `--r-full` is a sentinel not a size; `@media` breakpoints stay px because they switch layout rather than size it.
    - One hard `max-width: 1280px` in `SiteHeader.astro` had to go too — it pinned the bar at 1280 while the content inside it scaled, which is the one thing that must not drift apart.
  - **Desktop nav proportions** — the bar is 78px but its controls were ~30px, leaving 24px of dead space above and below that read as over-padding. Rather than shrink the bar (78px matches the old site and the closed mobile bar, and `--nav-height` feeds the hero's height calc), the controls grew to 48px: an even 15px band each side.
  - Still open from the spec: nav inset values (§3), brand yellow `#FFBE1A` vs `#FFD000`×17 (§5, needs Branding), hamburger→X timing (§11, needs a recording), old aspect-ratio mapping (§13.5). Content flags in §14 are logged there, not here.
  - Note: the dev server can't start in the Claude Code sandbox (`EPERM: uv_cwd` from the preview launcher, before Astro is reached), so these changes are build-verified and reasoned from the CSS, **not** visually confirmed. Worth an eyeball at `/contact-us`, `/services` and any page foot.
- [x] **Storybook wired up for the component library (2026-09-16)** — Installed `@storybook-astro/framework` (community Storybook renderer for Astro 5/6, Container-API SSR) + `storybook` 10.6, plus `@storybook/addon-a11y` (live axe-core scan per story) and `@chromatic-com/storybook`. (`@storybook/addon-vitest` was installed then removed 2026-09-23 — see below.) `npm run storybook` (port 6006) / `npm run storybook:build` (→ `storybook-static/`, gitignored, not deployed).
  - **Root cause found & fixed along the way**: story canvases rendered fully blank at first — not a bug, `global.css` ships `[data-reveal] { opacity: 0 }` and relies on `initScrollAnimations()` (normally called once from `BaseLayout.astro`) to reveal it via GSAP ScrollTrigger, which no story goes through. Added `.storybook/decorators/RevealDecorator.astro`, a global decorator (bare-component sugar form) whose own `<script>` calls `initScrollAnimations()` on every story load — confirmed working (screenshot + interaction test).
  - **Extracted 4 components' inline `<script>` blocks into `src/lib/`** (`faq-accordion.ts`, `bento-block.ts`, `process-map.ts`, `site-header.ts`) so Storybook stories have something importable to run — the Container API that renders `.astro` stories emits HTML without executing script tags, but a component's own script (now a thin import + call) still ships as part of the real page document and runs normally once loaded in a browser, whether that's the live site or the Storybook preview iframe. Verified live: FAQ accordion click-to-expand/collapse works in the canvas, ProcessMap's orbital hubs/springs render and light on hover, BentoBlock's cursor-invert + video lazy-play wire up. Production build (`npm run build`) re-verified clean after the extraction — no regression.
  - Stories written for `BentoBlock`, `ProcessMap`, `FaqAccordion`, `TeamGrid`, `InsightsBlock`, `SiteHeader` (`src/components/*.stories.ts`), each with 2–4 variant fixtures matching the specs in `kits_design_system/docs/blocks/`.
  - **Known gap vs. the existing `/kits` route** (2026-08-11, still live): that page is the production-token showcase for a non-technical review pass; this Storybook instance is the dev-facing isolated component catalog (per-prop Controls, a11y scan, visual-test hook). Keep both — they serve different audiences, not a migration.
  - **Full library mapped (2026-09-16, same day)** — added stories for the remaining components (`SiteFooter`, `TrustBadges`, `PortableTextRenderer` — the last with plain-block fixtures so it doesn't depend on a live Sanity connection to render) so every component in `src/components/` has coverage. Extracted `/kits`'s token dataset (colors incl. 6 pillars, typography scale, spacing/radius/opacity ramps, motion easings) out of its frontmatter into `src/lib/design-tokens.ts` — one source both `/kits` and Storybook read, so they can't drift. Built `TokenGallery.astro` + stories (`Tokens/Token Gallery` — All / Colors / Typography / Spacing & Radius / Opacity & Motion) as a Storybook-only swatch reference.
  - **`@storybook/addon-vitest` removed, not fixed (2026-09-23)** — traced the benign-looking "Tests panel doesn't work" gap to its actual root: the addon's CLI hard-codes a 12-entry framework allowlist (`react-vite`, `vue3-vite`, `svelte-vite`, … — `AddonVitestService.constants.ts`, found via `node_modules/storybook/dist/_node-chunks/chunk-XGT335GY.js`) and rejects anything outside it in `validateCompatibility()` before any vitest.config wiring is even reached. `@storybook-astro/framework` isn't and can't be added to that list from our side — this was never a config gap, so there was nothing to finish. Uninstalled the addon (`vitest` itself stays — real peer dep of `@storybook-astro/framework`, used for its portable-stories testing utilities) and removed it from `.storybook/main.ts`'s `addons` array with a comment pointing at the exact source. This also resolved the `SyntaxError: Unexpected identifier 'as'` that had been firing on every story's console since the same-day install — that was the addon's own unconfigured client bundle failing to load, not anything in our code. Verified: fresh `storybook dev` boots with a clean console, a11y and Chromatic panels still present and working, FAQ accordion still interactive.
  - **`FaqAccordion`'s off-scale `900px` breakpoint fixed (2026-09-23)** — snapped to `--breakpoint-md` (768px, "Tablet" on the documented scale in `tokens/breakpoints.md`). It only ever controlled a padding-comfort bump, not a layout switch, so moving it to 768 just widens the range where the roomier padding applies.
  - **Reconciled against `kits_design_system/docs/components.md`'s maintained list (2026-09-16, same day)** — that doc already named `src/components/FooterCTA.astro` as a component; the file didn't exist, the CTA banner was still inline in `BaseLayout.astro`. Extracted it for real: moved the markup, its ~190-line CSS block (kept `.sr-only` in `global.css` as a shared utility, everything else CTA-specific into the component's own scoped `<style>`), and its `initBallField()` call into `FooterCTA.astro`'s own script (removed the now-duplicate call from `BaseLayout`'s bottom script — it was the only consumer). Added `Blocks/Footer CTA` stories and updated the doc entry's stale description (ash panel / `laptop-mockup.png` — neither matches the live flat-yellow, draggable-discs implementation) to match reality. Verified in Storybook: sheen, dark button, and physics-driven discs all render correctly post-extraction; production build clean.
  - **The three flagged blocks extracted too, on request (2026-09-16, same day)** — after flagging Service Spotlight Panel, Client Assembly Grid, and Service Tag Field as deliberately not touched (unreviewed compositions, GSAP Draggable+Inertia+Flip), the user asked for them anyway. All three moved out of `services/[slug].astro` / `index.astro` into real components (`ServiceSpotlightPanel.astro`, `ClientAssemblyGrid.astro`, `ServiceTagField.astro`), each with its markup, scoped CSS, and behaviour extracted verbatim, plus Storybook stories and a shared-data module where the original had page-inline authored content (`src/lib/service-tags-data.ts` for the tag field's six pillars). Data-shaping that was previously duplicated inline (logo padding/split math, pillar-question mapping) now lives in the component/data module instead, so the page just hands over raw content.
    - `ServiceSpotlightPanel`: takes an explicit `themeBase` prop (defaults to the site accent) instead of relying on an ancestor's `--theme-base`, so it renders correctly standalone. Also needed its own copy of `.glass-panel` (Astro scopes styles per file — the page's version wouldn't have matched the component's `data-astro-cid`).
    - `ClientAssemblyGrid`: `data-scroll="assemble"` is handled generically by `scroll-animations.ts` already, so no motion code needed moving — only markup, CSS and the padding/split math.
    - `ServiceTagField`: the one that actually broke, twice. First, a genuine async race — the page's original dynamic `await import('../lib/draggable-tags')` left a gap where a Storybook Container-API re-render could swap the `[data-tag-field]` node out from under the still-pending import, so `initDraggableTags()` ran against a DOM that no longer had it and silently bound nothing; fixed by switching to a static import (Astro still code-splits it into the component's own chunk either way, so no regression to the "only pay the GSAP Draggable weight where this renders" property). Second, and the more important find: the component's script briefly had a TS type annotation (`let killTags: (() => void) | null`); Astro's dev server strips TypeScript from a component's `<script>`, but `@storybook-astro/framework`'s script pipeline does not, so the raw `:` reached the browser as a syntax error — and because Storybook loads every story's module graph together, that one throw silently broke every story's client bundle, not just this one (traced by adding temporary `console.log` instrumentation and watching it never fire). Fixed by writing the script in plain JS, matching every other component's inline script in this repo. Re-verified clean afterward: drag with momentum, click-to-expand with real copy, and the "Learn more" full-bleed launch all confirmed working in the Storybook canvas.
    - `kits_design_system/docs/components.md` updated for all three (no longer "page blocks", now real components with Storybook entries).
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
