# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**2026-10-13 → 14 — Page SEO, share images, Notion (pages + services session).**
Done:
- **Page meta:** 14 site pages (incl. legal) use the titles/descriptions from the old live site (`scripts/restore-framer-page-meta.mjs`); every page template reads seoTitle/seoDescription/ogImagePath from Sanity (old text only as fallback). A title that already names Wugweb is used as stored (no doubled " | Wugweb").
- **Services:** the six pillar titles/descriptions are keyword-led and use only real sub-services (`scripts/service-pillar-meta.json`, `apply-service-pillar-meta.mjs`). The services overview description names the six pillars. Old Framer service URLs (`/services/experience-design` etc.) now 404.
- **Share images:** every page and pillar has a 1200×630 image in R2 (`site/<page>/og.jpg`, `site/services/<pillar>/og.jpg`); Strategy's is cropped from `unsorted/AdobeStock_369559718.jpeg`. The service template now passes `ogImagePath` (schema field added, Studio deployed).
- **URLs:** no legacy slugs or short-URL redirects for case studies or blog posts; unknown slugs 404.
- **Notion:** Site Pages v2 synced from Sanity (SEO, slug, keywords, OG); notes rewritten. Wugweb HQ now has **Wugweb Website** (hub) and **Wugweb SEO** (website-wide → page by page → section/component). Neon notes moved to a "Neon & owner model (deferred)" sub-page. SEO-as-a-service docs stay under Services (future "Marketing" label).
- **Clean-up:** 18 finished script reports deleted from `docs/`; the Framer media scraper (`sync-extracted-media.mjs`) and its cover list removed.
Open: 404 page — pick `/404` or the alternative `/404-2`. `docs/r2-asset-map.json` predates the R2 reorganisation (three asset scripts still read it). Site Pages v2 is not shared with the `neon_sync` integration (Neon deferred), so it is updated through the Notion connector.

**2026-10-14 — Open items from the blog/media/nav session (audited against live R2, Sanity and the site).**
Resolved and verified: all 103 posts have a cover; 0 Framer URLs in Sanity and none in live `og:image`; 0 image assets missing alt; old Airtel logo keys and the 10 VSB banners are gone from R2; nav = 100px / 60px bar / 40px logo on every breakpoint (`layout-shell.md`).
Still open:
1. ~~blog1/blog3~~ Done 2026-10-14: both deleted (crops of the 0072 / 0053 covers) with their 2 asset records.
2. ~~Shared service clips (the 2 flagged groups)~~ Done 2026-10-14: new clips from unused R2 videos for strategy/ai-readiness-assessment (`unsorted/ggt3onRY2bwahSVu.mp4`), operations/product-optimization (`unsorted/3q0z9N9vBgdAAdWC.mp4`), operations/qa-and-test-automation (`unsorted/viTy_9OHBd_a1M55.mp4`), posters regenerated. **Done 2026-10-14: all 61 sub-services have their own clip** (17 more copied from unused R2 videos into their slot files, posters regenerated; 61 slots = 61 distinct clips, all service pages 200). The 20 duplicate source clips were deleted by the owner (`scripts/owner-delete-clip-originals.mjs`, ~110 MB, with their 20 asset records).
3. ~~Brand & Strategy~~ Done: Brand and Strategy are two separate topics. Any new Notion category must also be added to the `topic` list in `sanity/schemaTypes/post.ts`.
4. Blog sync is manual: `node scripts/sync-notion-blogs.mjs` (dry run) then `WRITE=1`. Automating it (GitHub Action or a local schedule) was offered, not decided.
5. ~~Obsolete owner scripts~~ Removed (Airtel and VSB delete scripts; targets already gone).
6. R2 reorganisation is DONE (other session, 34 verified delete batches): `framer/`, `uncode/`, `more/`, `about/` are gone; media lives in `assets/work/` (967), `blog/` (369), `assets/site/` (210), `assets/logos/` (257). Bucket 2,282 objects / 1.55 GiB (2026-10-14). The 2026-10-12 plan (`backups/asset-reorg-plan.csv`) is obsolete — ignore it. **Left to sort: `assets/unsorted/` — 300 files, 348 MiB.**
7. Not investigated (owner: leave it): the first request after a Pages deploy sometimes 404s, then 200 on retry.
8. Uncommitted case-study body work in the tree (`src/lib/case-body.ts`, `work/[slug].astro`, `queries.ts`, `sync-notion-case-studies.mjs`) belongs to the `wip/case-study-body` session — left alone on purpose.

**2026-10-13 — Notion Case Studies is the source for slugs, legacy slugs and share images.** `scripts/notion-legacy-redirects.mjs` turned `Legacy Slugs` on Published rows into 29 more 301 redirects. 29/29 verified, and all 8 overlaps agree with the earlier 12. **Owner decisions:**
(1) ~~OG~~ **Done:** Notion `OG Image` + `Cover Image` on the 19 rows now hold the R2 cover URL (`scripts/fix-notion-case-study-media.mjs`, backup `backups/notion-case-study-media-before-2026-10-13.json`). 0 Framer URLs left in either column.
(2) ~~musiclinkd~~ **Done:** Sanity slug + canonical renamed to `musiclinkd` (doc id stays `caseStudy-musiclinkd`), 301 `/work/musiclinkd` → `/work/musiclinkd`, legacy long slug in `work-redirects.ts` points straight there. Verified on UAT: 200 / 301 / 301.
(3) ~~Canonical URL~~ **Done:** 12 Notion rows set to relative `/work/<slug>` (the format the route and the sync need). musiclinkd waits on (2). `sync-notion-case-studies.mjs` dry run afterwards: 0 to patch.
(4) ~~Draft vs published~~ **Done:** those six are now Status = Published in Notion (backup `backups/notion-publish-six-before-2026-10-13.json`).
~~**New (2026-10-13 04:44 UTC):** 11 Canonical URLs on new long slugs~~ **Done 2026-10-13:** Notion changed 11 slugs (CS-002/005/008/009/011/016/019/024/038/040/042) to the brand + title long form. `sync-notion-case-studies.mjs` now also syncs Title, Short Title and Slug, so the canonicals resolve and were applied (38 docs; CS-024 kept `caseStudy-musiclinkd`). `notion-legacy-redirects.mjs` created 18 301s and repointed 11 older redirects to the new slugs; `work-redirects.ts` points straight at the current slugs. Order matters: run the case-study sync first, then the redirect script.
**Superseded later 2026-10-13 (owner decision): one slug per case study, no Legacy Slugs, no redirects.** The old URLs were only ever public on pages.dev; Framer URLs stay on Framer. Removed `scripts/notion-legacy-redirects.mjs` and `src/lib/work-redirects.ts`; unknown `/work/` slugs 404. All 60 Sanity redirect docs backed up to `backups/redirects-all-2026-10-13.json` for deletion. Owner can drop the Notion `Legacy Slugs` column. Old-URL handling for Framer pages is a DNS-cutover decision, not now.
~~**Framer URL redirects (2026-10-13, owner order):** 15 Sanity redirects for old Framer URLs~~ **Deleted same day, owner decision: Framer is being removed; no redirects for Framer URLs.** 0 redirect docs remain; backup `backups/redirects-framer15-deleted-2026-10-13.json`. Content counts unchanged (44 case studies, 103 posts, 1987 assets).
**Case-study SEO/AEO audit (2026-10-13):** 35 Notion rows fixed + synced (avg keyword score 67→88, none <70; brand spellings Metcred, Inkompass, ToT Bridal, Valyu.ai). Code: BreadcrumbList on case studies; cookie banner headings no longer jump h2→h4. **Hidden from search (Sanity `noIndex`, backup `backups/caseStudy-noindex-before-2026-10-13.json`) until real copy exists:** Bodyshop, Eastman, Hyatt Restaurants, PharmaDropper (pages show NTUC U Care's copy) and Spark Logistics, TheBizGift, MusicLinkd (placeholder "Complete original markdown…"). Unset `noIndex` once Notion Body Content is written and synced. **Owner content to add in Notion:** Results (7/44 filled — main AEO gap), Cover/Client Logo Alt on CS-014/021/022/023/025/027, Engagement Type, Primary Discipline (CS-010), Platform (CS-043); Client Logo column holds Framer URLs on 19 rows (Framer goes away); CS-037 subtitle/body/tags still say Framer. Owner: Last Updated not needed; Assets, Publications, Published At, Published On are important — keep.
**Notion field fill (2026-10-13, owner approved):** 40 rows written. Client Logo: 19 Framer URLs → R2 (Sadhan corrected to its own logo; Inkompass to `/assets/work/inkompass/client-logo-9fd5.png`). Cover/Client Logo Alt on CS-014/021/022/023/025/027. Results on 30 rows, taken only from each case study's own Sanity impact copy (Gratify's 4 real metrics; Woodkraft's 580+ projects); not invented. Engagement Type = Client on 7; Primary Discipline CS-010 = Product Design; Platform CS-043 = Web Platform. CS-037 Framer mentions kept (owner). Backup `backups/notion-case-studies-fields-before-2026-10-13.json`. Sanity: Sadhan client logo fixed (was ToT's); 19 case studies' Framer clientLogoPath/ogImage/coverImage replaced with R2 or cleared where an R2 version exists (backup `backups/sanity-framer-fields-before-2026-10-13.json`) — 0 Framer URLs left in Sanity case studies. **Still open:** Results for the 7 hidden pages (need real copy first).
(5) 17 Sanity drafts not in Notion (mostly old long-slug drafts). Listed, never deleted.

**2026-10-13 — DNS cutover prep done (cutover itself still on hold).** Verified on `wugweb.pages.dev`:
- **Redirects:** 12 `redirect` docs (301) for the Framer URLs that 404'd; all 12 return 301 to the right Location, and every destination returns 200. Created by `scripts/cutover-redirects.mjs`, backup in `backups/cutover-redirects-2026-10-13.json`. Adneto → `crafting-digital-authority-the-adneto-website-showcase` is the closest match, **owner to confirm**. Expect a minute of lag after creating a redirect (Sanity CDN plus the 60 s rule cache).
- **`siteSettings.siteUrl`:** null → `https://www.wugweb.com` (backup `backups/siteSettings-before-siteUrl-2026-10-13.json`).
- **og:image:** the 19 case studies with a Framer CDN og:image now have `ogImagePath` = their own `coverPath`. All 19 are images and return 200 on R2, so the og-default fallback wasn't needed. 19/19 pages now emit the R2 cover in og:image and twitter:image. `ogImage`, `coverImage` and `clientLogoPath` are untouched (backup `backups/casestudy-og-paths-before-2026-10-13.json`).
- **Subscribe:** shows success only if Sanity or Neon accepted the email; otherwise `/contact-error?reason=subscribe-failed` with a retry link. **Contact:** name, a valid email and a message of at least 20 characters are required server-side (`/contact-error?reason=…`). Logic is in `src/lib/forms.ts`; `npm run test:forms` (19 tests).
- **Fixed in passing:** `import.meta.env.SANITY_TOKEN` in the contact route was inlining the local `.env` token into `dist/_worker.js`. The routes now read the token from runtime env only.
- **Token in earlier deploys:** unknown whether any shipped it. Any build made with `.env` present baked the token into that Worker bundle. The bundle isn't served publicly, but rotate the token if that matters to you (owner call; not done).
- **Still open:** `/footer/subscription` (the pricing page) ignores `?subscribed=1` and `?error=invalid-email`, so a newsletter subscriber still sees no confirmation. The preview environment has no secrets. GTM/Hotjar decision. Search Console verification method. A real Neon write is unproven until one real submission after cutover.

**2026-10-12 — Blog images in R2:** 236/237 manifest rows live under `blog/<slug>/…` (no `assets/` prefix). Open: POST-0063 cover has a truncated source URL; owner to switch Notion links; the 66 posts without `coverPath` can now be mapped to `blog/<slug>/cover.*` once the owner confirms the no-`assets/` key prefix (assetUrl() would need to pass these through).

**2026-10-12 — Site media is CMS-driven.** Deployed at 79986707.wugweb.pages.dev. Open: (1) the blog-image R2 manifest job (`blog-image-r2-manifest.csv`, `blog-0093-uploads/`) has NOT run, as neither file was found and it includes deletes; (2) page-media folder rule is `site/<pageId>/` (e.g. `site/services/`), pageId being the singletonPage key; (3) the reorg plan reads `public/assets`, which no longer exists locally, so it needs to read R2 before it can be re-run; (4) first request after a Pages deploy sometimes returns 404 for a route and then 200.

**2026-10-12 — Reorg plan updated (still PLAN ONLY):** rule is now page media -> `site/<pageId>/`, case study -> `work/<slug>/`, post -> `blog/`, client logo -> `logos/<client-slug>`. The 21 existing `about/` files move to `site/about/`; team portraits go there too. Plan: 433 files, 0 collisions, 12 unsure (the `more/home` and `more/about` clips, also used in `src/`), 74 unreferenced. `about-message.mp4` and its poster match by hash, so they are copied once. Awaiting "apply".

**2026-10-12 — Airtel logos fixed** (XSafe/Xstream were sharing one file). Owner: run `scripts/owner-delete-old-airtel-logo-keys.sh` when happy (it removes the 4 old keys and local files); the old Sanity asset records for those keys remain until you archive them. The reorg plan no longer treats the logo as contested (the two `framer/` copies are now unreferenced duplicates).

**2026-10-12 — asset.alt shipped; asset reorganisation is PLAN ONLY, awaiting "apply".** 308 image assets still need alt (`backups/asset-alt-missing.csv`; framer/ 252, blog 21, tools 21, logos 20, about 15; only the owner can say what the images show). One logo (`asset-logos-client-logo-c6rj-png`) is claimed by two clients (Airtel Xstream / Airtel XSafe) and was skipped. Reorg plan: `backups/asset-reorg-summary.md` + `asset-reorg-plan.csv`. Apply must: copy to new key (never overwrite), repoint all references in one batch after a backup JSON, verify 200 locally and on R2, keep old keys/files, and emit a delete script for the OWNER to run. Notion rows that carry paths were not checked (Notion MCP unavailable).

**2026-10-12 — Completeness vs Checks** shipped (see CHANGELOG). Still failing on live content (published, CDN read): posts 100 rows — title length 46, description length 67, body <300 words 61, no headings 52, description = excerpt 38, slug 14; case studies 44 — description length 35, title length 10, alt text 5; pages 20 — title length 16, description length 13, duplicate seoDescription 3. Follow-ups, deliberately out of scope (need a crawl or external APIs): technical SEO, schema/JSON-LD validation, Core Web Vitals, backlinks, Search Console data. Also open: no `coverAlt` field exists, so the cover-alt check is not possible until one is added.

**2026-10-12 — Studio Media assign/unassign shipped** (`a0c558df`, `0c0419bf`, `539e6515`; Studio redeployed). Needs the owner: (1) run the manual test on a throwaway case study (assign → "Used by" → unassign → Undo); (2) 3 pre-existing `tsc` errors, not from this work: `src/lib/draggable-tags.ts:79` (`gsap.utils.debounce`) and `src/lib/scroll-animations.ts:265-266` (`offsetWidth` on `Element`); (3) "Used by" labels fully refresh on the next `scripts/scan-asset-usage.mjs` run with `WRITE=1`. Nothing deleted, no Neon sync run.

**2026-10-04 session — open items**
- Sub-service merge (85 → 61: Strategy 9, Engineering 12, Growth 10, Operations 10, Brand 10, Experience 10) **applied 2026-10-04** to Sanity (`service.capabilities` for the 4 pillars; 41 `taxonomy` sub-service docs renamed with merged descriptions) and Notion (Sub Service rows renamed, pillar relations reset to the keepers). **Owner action:** delete the 24 merged-away Sanity taxonomy docs (`subservice-taxonomy-delete-list.json`, outside the repo) and the 24 Notion rows whose Status reads "Merged into … - delete". Still to align: `services-data.ts` fallback names and any case-study tags using old sub-service names.
- Owner deletes still to run after deploy: old R2 keys (list in `r2-move-list.csv`, outside repo), old local service folders, 7 Sanity services + drafts. Hard deletes are not run by the assistant.
- Naming variants between systems (Web Application vs Web App Development, SEO vs Search Engine Optimization (SEO), CRO vs Conversion Rate Optimization, Mobile Application vs Mobile App) need one chosen wording.
- 13 duplicate long-slug case studies in Sanity (duplicates of the short-slug ones) + 3 body-less case studies: cleanup waiting on owner decision.
- Notion Pages DB has no row for `contact-v2` (redirect) or `404-2` (alt design); Kits excluded by decision.

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

## ⚡ What is actually pending — *2026-09-28*

Everything below this block is history; **this is the live list.** Full detail
in §1s and `~/.claude/plans/snoopy-splashing-pearl.md`.

**Added 2026-10-12:** run `bash scripts/owner-delete-old-vsb-banners.sh` (10 VSB banners + their asset records, copies live under `blog/<slug>/`). Framer `og:image` hotlinks on 19 case studies need `ogImagePath` set (see CLAUDE.md debt #3). Duplicate Airtel logo asset records left in place: `asset-logos-client-logo-c6rj-png`, `asset-framer-airtel-xsafe-securing-homes-with-intuitive-digital-experiences-client-logo-c6rj-png`, `asset-logos-client-logo-8gyg-png`, `asset-framer-airtel-xstream-play-digital-entertainment-ux-web-design-client-logo-8gyg-png`.

**Added 2026-10-13 — redirects:** the `redirect` type now works (middleware + `src/lib/redirects.ts`). There are 0 redirect docs yet, so add them in the Studio. Unverified in production until the redirect Studio changes are deployed and a real rule is created and curled on `*.pages.dev`. Hit counting is deliberately not built (Rule 1). `wugweb.com` still serves Framer until DNS cutover, so redirects only apply on `*.pages.dev` / `uat`.

**Added 2026-10-13 — brand voice:** a draft guide is in Site Settings → Brand voice. **Edit it, then set it to Approved** to turn on field warnings, badges and help text. Audience is marked as inferred. Remaining queue: integrations, then the `sanity.cli.ts` typegen fix, three `seoChecks`, and the non-Storybook `tsc` errors.

**Added 2026-10-13 — integrations:** needs you: (1) set `INDEXNOW_KEY` (8–128 chars, a-z A-Z 0-9 -) and `INDEXNOW_WEBHOOK_SECRET` (16+ chars) on the Pages project, production; (2) add a Sanity webhook to `https://wugweb.pages.dev/api/indexnow` (the free plan allows 2 GROQ webhooks); (3) decide on the IDs Framer runs today: GTM `GTM-KV9JWXZ` and Hotjar `3239820` (GA4 `G-W5WJ1PMTKD` is already seeded). GTM cannot load while GA4 is active; turning GA4 off is a code decision. The 404 monitor needs one production deploy to pick up the D1 binding.

**Added 2026-10-13 — queue cleared:** typegen config fixed (Studio tsc 0), three seoChecks added, non-Storybook tsc errors fixed (site 42 → 39, all Storybook). The Studio changes are **not deployed** yet (SeoTool queries, live duplicate warnings). Open decisions: GA4 vs GTM, Hotjar ID, en-GB vs en-US, the ALL-CAPS brand names. The main open item after this is the DNS cutover.

**Added 2026-10-13 — Studio tidy-up:** SEO and Copy & Export are folded into Tables, the Voice and Integrations tabs are removed, and the superseded `SeoTool.tsx` / `ArticleExportTool.tsx` files are deleted. **Click through:** the new columns on all four content tables, expanding "Checks passed", Copy as Markdown on one post, bulk copy on 3 rows, and the Auto Meta confirm step. **Brand voice:** the tab and its 14 fields are hidden (`hidden: true`, 2026-10-13); the data is kept, and removing `hidden` restores them. **Decision pending:** how you want to see the top 404s (D1 console query, or a read-only Tables view).

**Needs you, not code:**

| # | Item | Why it is yours |
|---|---|---|
| 1 | ~~**Set `SANITY_SYNC_TOKEN` on the Pages project**~~ **Production done (secret listed 2026-10-13); preview still has no secrets** | Contact submissions reach Neon and **never reach the Studio**. Dashboard action. This is the highest-value open item — leads are being captured but are invisible to whoever works them. |
| 2 | **Delete two marked test rows in Neon** | From the endpoint verification. I have no `DATABASE_URL`. `CLAUDE-TEST-1790319185 DELETE ME` in `contact_submissions`, `claude-test-1790319185@example.invalid` in the subscriber table. The Sanity test doc was already deleted. **Plus one more (2026-10-13 ~04:18 UTC / 09:48 IST):** a probe hit the old contact code before the new deploy went live and wrote an all-empty row (name, email, topic all `''`) to `contact_submissions`. No Sanity doc was created. |
| 3 | **`--color-text-muted` (#7D7D7D)** — 4.23:1 against a 4.5 floor | Design call. 38 usages, 8 files; `#858585` clears it. |
| 4 | **Never-filled fields** — `caseStudy.services` 0/60, `caseStudy.relatedPosts` 0/60, `post.syndicatedTo` 0/100 | Populate or drop. |
| 5 | **Re-authorise the Notion MCP server** | Phase 5 trackers cannot run without it. |

**Blocked on a credential:** Neon leftovers (8 stale `caseStudy` rows,
`[object Object]` slugs, empty `content_relations`) — read-only diagnosis still
needs `DATABASE_URL`, which is a Cloudflare secret.

**Open work, not started, in rough priority order:**

1. Breakpoint + px consolidation — **13 breakpoint values / 11 thresholds** and
   **225 px literals in declarations** (both audit numbers were wrong; see §1s).
   A real refactor with visual risk.
2. Block sign-offs still outstanding: **9a** Client Assembly Grid, **9b**
   Service Tag Field, **9d** Bento Block, **9e** Process Map, and **#4** Service
   Spotlight Panel — none has had a visual review.
3. **#6** service clip library is stock footage, not Wugweb work —
   **re-verified 2026-09-29, still true:** all 9 files in
   `public/assets/services/strategy/` are byte-identical to `brand/`.
4. **#7** 9 clips for 10 brand sub-services — **still true**, 9 mp4s on disk.
   Messaging Framework renders the placeholder.
5. **9a** duplicate `logoPath` on Airtel Xstream/XSafe — **still true**, both
   point at `/assets/logos/client-logo-c6rj.png`.
6. **#8** extract the Spotlight Panel to a component before reusing it.
7. Assets — 112 MB duplication, 685 MB tracked in git. **Last, by your
   instruction.**

> **Note on this list.** An earlier version of it repeated pending.md's claim
> that three service blurbs were still DUMMY COPY. They were not — real copy
> landed 2026-09-23 in `d2b2fcab`, and line 8 of this file said so. I passed
> the stale claim along without checking it. The audit below is the result.

**Deliberately on hold:** DNS (`www.wugweb.com` is still Framer) · Frontend →
Neon swap · Neon sync (user-controlled) · Sanity token rotation.

**Known verification gaps:** JSON-LD cannot be checked on uat or pages.dev
(suppressed on non-canonical hosts by design — needs one re-check after DNS
moves). IntersectionObserver cannot be checked in the browser pane at all
(permanently `document.hidden`).

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **Contact V2 layout (`contact-us.astro`)**, Service media folder normalization (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`), `CHANGELOG.md` integration.

**Enterprise Sanity Studio Overhaul & Bug Resolution (2026-08-11 & 2026-08-30)**: Full CRUD schemas for Brand Assets & Icons (`brandAsset`), Tracking & Custom Scripts (`siteScript`), Navigation Menus (`navigationMenu`). Reorganized Studio desk into operational departments (Content, Brand & Assets, Marketing, Business, Settings, System) + spreadsheet data grid presets. Fixed HTTP 409 revision conflicts, duplication of non-title docs, intent edit routes, publish/unpublish/archive actions. Added R2 Asset Autocomplete picker and rich visual block previews for Portable Text.

**Sanity Studio Advanced Suite & Portable Text Overhaul (2026-08-30)**:
- **Native R2 Custom Asset Source (`r2AssetSource.tsx`)**: Integrates directly with Sanity's `form.image.assetSources` and `form.file.assetSources` allowing editors to browse, search, filter, and pick from all 550+ Cloudflare R2 assets with live previews.
- **Copy Article & Export Document Action (`CopyArticleAction.tsx`)**: Formats Portable Text into standard Markdown, Plain Text, or JSON and copies directly to system clipboard with a single click.
- **Article Export Studio Tool (`ArticleExportTool.tsx`)** — *removed 2026-10-13; folded into Tables (Copy as Markdown / Download .md, Words and Read time columns).* Was: dedicated Studio view for exploring word counts, reading times, and batch Markdown copying across all posts, case studies, and services.
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
| Contact Form Production Verification | **PARTLY WRONG — corrected 2026-09-25** | The Neon half is real: re-verified on the deployed build, 302 → `/thank-you`, which is only reachable **after** the insert. The CSRF note is right (a bare POST 403s without an `Origin` header). **But "authenticated Sanity write client" is FALSE.** No `contactSubmission` document is created, and none ever has been — `SANITY_SYNC_TOKEN` is not bound on the Pages project and `if (token)` skipped the write silently while still returning the success redirect. See §1s. **Fix is a dashboard action, not code.** |
| Frontend → Neon swap | Deferred | Helpers ready (`content.ts`, `NEON` queries); wait until UI/brand mapping done. **User: do not run Neon sync unless asked.** |

---

## 🟡 Open — Medium / Recommended Next Tasks

| # | Item | Priority | Notes |
|---|---|---|---|
| 1 | **Blog 21 Duplicate Stubs Cleanup** | **Done 2026-08-30** | Unpublished all 21 duplicate raw HTML posts, 6 duplicate service pillars, and 4 duplicate singleton pages while re-pointing asset references to canonical records. Sanity health 19/19 ✅ with 0 duplicate slugs or singletons. |
| 2 | **Brand Vector Asset Ingestion** | **Done 2026-08-30** | Ingested official vector SVGs for Clutch, DesignRush, GoodFirms, TopDevelopers, Wugweb Large/Small logo lockups, and social OG/favicon assets into the `brandAsset` schema via `scripts/ingest-brand-assets.mjs`. |
| 3 | **Blog & Case Study Thumbnail Population** | **Done 2026-08-30** | Built automated matcher script `scripts/populate-missing-covers.mjs` and enabled native R2 Custom Asset Picker directly inside all image/file fields in Sanity Studio. |
| 4 | **Service Spotlight Panel** — `/services/brand` only · spec: [`kits_design_system/docs/blocks/service-spotlight-panel.md`](kits_design_system/docs/blocks/service-spotlight-panel.md) | **Awaiting sign-off 2026-09-04** | Replicates the Framer "Glass Showcase" reference: one wide glass panel of rows (number + thumbnail + title), over a **sharp** full-bleed backdrop that crossfades to the active item — the panel's own `backdrop-filter` does the blurring, which is how the reference does it (0 `filter: blur()`, 3 `backdrop-filter` on the live demo). **Active row inverts** to a light surface with dark text and reveals its supporting line; idle rows are title-only. Rows reserve the expanded height so activating one causes **zero layout shift** (verified: all rows 168px before and after). **Phones:** no hover, so an IntersectionObserver spotlights the row crossing the screen's centre as you scroll; supporting copy is hidden entirely. Gated by `showcaseEnabled` in `[slug].astro`; **all five other pillars still render the original `.caps-grouped` panels, verified unchanged**. Cost: +1,514 B min / 669 B gzip JS, no new deps. |
| 5 | **Showcase: 2-line copy per sub-service** | **Done (stopgap) 2026-09-04** | Wired via `src/lib/service-copy.ts`. 7 of 10 blurbs are **verbatim from `Wugweb_Services 2026.md`**; ~~3 (Brand Narrative, Employer Branding, Brand Activation) are **DUMMY COPY** — replace before launch~~ — **STALE, corrected Audited 2026-09-29.** Real copy was written on 2026-09-23 in `d2b2fcab` ("content(services): write real copy for the 3 dummy brand sublines"); no dummy or placeholder marker remains in `service-copy.ts`. Line 8 of this file already said so, so pending.md contradicted itself for six days. Proper home is Sanity: `capabilities[].items` is `string[]`, so it needs promoting to `{title, blurb}` objects (schema + content migration) to retire this file. |
| 6 | **Service clip library is stock footage** | **Open — content** | `public/assets/services/brand/*.mp4` are third-party showreel clips (Dokna Arq branding, a Mailchimp-style ad), not Wugweb work. `services/strategy/` is a byte-identical copy of `brand/`, `operations/` of `engineering/`. Only `brand` is wired in the media map; strategy/operations/growth left unmapped so they render placeholders rather than mislabelled work. |
| 7 | **Messaging Framework has no clip** | **Open — user** | 9 clips for 10 brand sub-services. Item 06 renders the gradient placeholder; user to link the asset from R2 and add the key to `MEDIA_BY_PILLAR.brand`. |
| 8 | **Extract Service Spotlight Panel to a component before recycling** | **Open — blocker for reuse** | The block is 73 lines of markup + ~335 lines of scoped CSS + ~110 lines of JS inline in `[slug].astro`. Reusing it elsewhere today means copy/paste. Needs `src/components/GlassShowcase.astro` taking `{ items, heading, accent, dwellMs }`. Two hard couplings to break: it reads `--theme-base` (injected only by `.service-page-wrapper`), and its data maps are keyed by pillar slug (`MEDIA_BY_PILLAR` / `COPY_BY_PILLAR`). |
| 9a | **Client Assembly Grid** — homepage `Trusted by leading brands` · spec: [`kits_design_system/docs/blocks/client-assembly-grid.md`](kits_design_system/docs/blocks/client-assembly-grid.md) | **Awaiting sign-off 2026-09-08** | Rebuilt from the live Framer section. Full-viewport band, uniform 16:9 tiles (6/6/4 columns), title as a 2-cell grid item at tile height with 2 logos either side, `data-scroll="assemble"` scatter→converge→disperse. Fixed the old ragged flex-wrap (rows of 8/11/**1** at 1440) and defined `--opacity-soft` / `--opacity-strong`, which were referenced in 8 places but never declared. **Open:** mockup logo padding retained by user; ~~9 logo images still only on the Framer CDN~~ — **STALE, corrected Audited 2026-09-29:** zero `framerusercontent.com` references in `src/`, and zero across all 176 routes on the deployed build. **Still true:** duplicate `logoPath` on Airtel Xstream/XSafe — both point at `/assets/logos/client-logo-c6rj.png` (verified against Sanity). |
| 9b | **Service Tag Field** — homepage "What we do" · spec: [`kits_design_system/docs/blocks/service-tag-field.md`](kits_design_system/docs/blocks/service-tag-field.md) | **Awaiting sign-off 2026-09-08** | Six draggable pillar tags rebuilt natively from the Framer *Draggable Tags* reference — GSAP Draggable + InertiaPlugin + Flip + ScrollTrigger (all already in gsap 3.15; **no new dependency, no React**). Fly-in on scroll, momentum drag with echo trail, front-on-touch stacking, expand to media → title → copy → link, and a full-bleed launch into the service page. Replaces the old `.service-cards` teaser. **Open:** ~~clips have no posters~~ (**done 2026-09-24** — `posterFor()` wired; verified 6/6 on the deployed homepage); ~~old `<ol class="service-cards">` still in the DOM as `hidden` with dead CSS~~ — **STALE, corrected Audited 2026-09-29:** no `service-cards` reference anywhere in `src/`; ambient-glow and Fade Up / Instant entry variants not built; composition never visually reviewed. |
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
| Contact form prod verify | **See the corrected row in "Critical / blocked" above.** Neon verified 2026-09-25; the Sanity mirror is inert and needs a secret set in the dashboard. |

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


### 1m. Asset audit + two audit findings re-checked — *2026-09-24*

**Finding 17 is STALE — no action needed.** It claimed `set-cookie` on every
response defeats edge caching. Measured in production: a first request gets one
`set-cookie`, a request carrying `visitor_id` gets **zero**. The middleware only
writes when the cookie is absent (`if (!visitorId)`), which is correct. Only the
first response per visitor is uncacheable, which is unavoidable and fine.

**Finding 8 is ACCURATE, and here is the detail it lacked.**

`public/assets` — 821 files, 697 MB:

| Type | Files | Size |
|---|---|---|
| mp4 | 170 | 315.3 MB |
| jpg | 239 | 265.2 MB |
| png | 286 | 99.8 MB |
| webp | 38 | 11.2 MB |
| svg | 83 | 0.4 MB |

**112 MB is byte-identical duplication** — 86 content hashes, 120 redundant
copies. Two causes: Framer-extracted images duplicated under `work/`, and the
service clip library copied across pillars (`operations`, `engineering` and
`Web & App Development` hold identical mp4s — corroborating #6).

Cross-referenced every duplicate against all 608 `/assets/` paths in Sanity
(including the `asset` registry's `sitePath`) plus every filename appearing
anywhere in `src/`:

- **36 files / 31.4 MB are provably orphaned** — no content field, no asset
  registry entry, no filename match in code.
- 16 candidates were **held back** because their filename appears in `src/`;
  these are the service clips reached through `MEDIA_BY_PILLAR`, which a
  path-only scan would have missed and wrongly deleted.

**NOT DELETED — needs Vedanshu.** 14 of the 36 sit under
`public/assets/services/reference/`, which `.gitignore` excludes via the
`reference/` pattern. They are untracked, so deleting them is **permanent and
unrecoverable**, and they never reach production anyway (Pages builds from git).
The other 22 are tracked and reversible.

**Separate and larger:** **685 MB of assets are tracked in git** (793 of 821
files). Every clone and every CI build carries that. Worth its own decision —
git-lfs, or moving media to R2 properly and out of the repo, which is what
`docs/r2-assets.md` describes but `src/lib/assets.ts` records as never completed.


### 2. Semantic tag selector — *noted only*

Framer lets each frame pick its HTML tag: `article, aside, button, div, figcaption,
figure, footer, header, main, nav, ol, section, ul` (`label` greyed out), with
`section` as the default. Equivalent for us = auditing that our section wrappers
use real landmarks instead of `div` everywhere.

### 3. Scroll-section anchor name — *DONE 2026-10-03*

Framer's "Scroll section" panel: a **Name** field (`# culture`) plus an **Offset Y**,
giving the section a URL hash target with a scroll offset for the fixed nav.
Equivalent for us = `id="culture"` + `scroll-margin-top` on section wrappers, so
`/about#culture` deep-links land clear of the header.

### 4. Per-element accessibility fields — *sections DONE 2026-10-03*

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

### 1n. Perf pass — posters, self-hosted fonts, parallel+cached queries — *2026-09-24*

Four commits, each verified in a browser rather than by reading the diff.

**Video posters (finding 7, second half).** `a7fee115` had already found the
root cause — `autoplay` overrides `preload="none"` per the HTML spec, so 11 MB
of below-fold work-grid video downloaded on first paint regardless of the
hint — and lazy-loaded them. That left a card showing nothing until it scrolled
in. `b516b1a8` generates a poster for all **108 referenced videos**: 2.8 MB
total, 27 KB average, against 228.7 MB of video. Worst case `xsafe-thumb`,
3,320 KB of video to a 44 KB poster.

Details that mattered: the frame is taken at **1 s, not 0 s**, because these
clips open on a fade from black and frame 0 makes a poster that looks broken
(falls back to frame 0 under a second). Generated at **1280 px, 2× a 640 px
card** — posters are where pixelation shows on a dense phone screen. The path
is **derived**, `<name>-poster.webp` beside the source, so there is no
`posterPath` field to keep in sync. ffmpeg comes from the `ffmpeg-static`
devDependency, not a system install. `npm run posters` regenerates; idempotent
on mtime. Measured on the homepage at scroll 0: **6 posters, 160 KB**, where
the same page previously pulled 12.3 MB of video.

**Self-hosted fonts (finding 9) — done.** Two preconnects and a render-blocking
stylesheet to `fonts.googleapis.com`, which cannot even name a font file until
after a DNS lookup, a TLS handshake and a hop to `fonts.gstatic.com`. The exact
woff2 files Google was serving (Inter Tight v9, Fragment Mono v6) are now
committed under `public/fonts/`, with `@font-face` **inline in the head** — a
linked `fonts.css` would reintroduce the blocking request. Two of Google's
seven subsets kept, latin and latin-ext; the `unicode-range` on each face makes
that both safe and lazy. Measured: **2 requests, 59 KB**, no googleapis or
gstatic entry in the resource timeline at all. 300 KB on disk serves 59 KB to
an English reader. Verified via `document.fonts`, not markup.

**Finding 5 — fixed, but not by prerendering.** Prerendering would freeze
content at build time, and nothing triggers a build when someone edits in the
Studio, so every Studio edit would silently stop reaching the site. The cost is
round trips: BaseLayout issued **five, sequentially**, and its own comments
record the workarounds (the platformProfile query widened for two consumers,
the cookie fields folded into the pageSection query) taken to avoid a sixth.
Astro runs layout frontmatter after the page's, so a homepage request
serialised those behind the page's own.

None of the five depends on another. They now run in one `Promise.all`
(removes four round trips) through a new `cachedFetch` in `src/lib/sanity.ts`
(removes the rest on a warm isolate — module scope survives between requests on
Workers). **TTL 60 s**, short enough that a Studio edit appears within a minute
— the property prerendering would have destroyed. In-flight promises are
shared; a rejection is evicted before it propagates. **Per-page content is
deliberately not cached**: a stale post would be visible and specific, sitewide
staleness is uniform and brief.

**Finding 20 is inflated roughly 4×.** The claim is 463 hardcoded colour
values. Excluding `var(--token, #fallback)` forms — where the token IS used and
the hex is only a fallback — leaves **115**. `PortableTextRenderer` alone
accounts for 48 of that gap and is entirely fallbacks. Of the 115: 50 in
`kits.astro` and 7 in `TokenGallery` (internal showcases, colours are the
subject), ~20 inside comments, 12 the `services/index` `fg`/`accent` data
values CLAUDE.md marks intentional, 2 Razorpay's brand blue, 1 a
`<meta name="theme-color">` that cannot take a `var()`. **26 were a real
violation** and are fixed — the industries hero SVG now uses
`--color-yellow` / `--color-surface-page` / `--color-surface-elevated` /
`--color-border-subtle` / `--color-text-primary` plus `--font-body` and
`--font-mono`.

> **Trap worth remembering: `--color-accent-primary` is NOT yellow.** It
> resolves to `--neutral-2` (#DFDFDF). Substituting it for `#FFBE1A` — the
> obvious move, and what the `#FFBE1A` fallbacks written beside it throughout
> `PortableTextRenderer` imply — turns the element grey. Verified by computed
> style: every fill and stroke in the diagram resolves to the exact `rgb()` the
> literal produced, pixel-identical.

**Finding 4 re-checked — already fixed, no action.** The four About cards are
real derived figures, not ordinals: 6 years (from `foundedDate`), 60 case
studies, 44 industries, 119 clients, each counted from Sanity. Reading the DOM
above the fold shows `0 +` on all four, which looks like a bug and is not — the
counter zeroes them and animates on intersection at threshold 0.4. Confirmed by
scrolling the group into view. No-JS renders the real values server-side.

**Still open from §1g:** 8 (assets — user instruction is last), 10 (CSS across
22 inline blocks), 14 (production domain — DNS, do not touch), 16 (consent vs
analytics — user decision), 18 (preview deployment bindings). Findings 1, 2, 3,
4, 5, 6, 7, 9, 11, 12, 13, 15, 19, 20 are done; 17 was stale.

### 1o. Findings 18 and 10 — *2026-09-24*

**Finding 18 — fixed.** "Preview deployment bindings are broken", without the
reason. It is this: on Pages, bindings declared at the top level of
`wrangler.jsonc` apply to the **production environment only**. Every preview
deployment — each branch, each PR — ran with no `ASSETS_BUCKET`, no `SESSION`
and none of the vars, which is exactly the `Invalid binding SESSION` path the
existing comment in that file warns about. The bindings were never wrong; they
were not there. An `env.preview` block now mirrors them.

Mirrored rather than pointed at separate preview resources deliberately: the
bucket is read-only from the app and Rule 2 says one bucket, so a second would
be both pointless and a rule violation. **Secrets are not in the file and must
not be** — `DATABASE_URL` and `SANITY_SYNC_TOKEN` need their own copies set on
the preview environment **in the dashboard**, which is still outstanding and is
a dashboard action, not a file change.

Confirmation the shape is right: `wrangler types` now emits a
`Cloudflare.PreviewEnv` interface carrying all three bindings, where before it
emitted none.

**Finding 10 — not a defect, closed.** "CSS fragmented across 22 inline
`<style>` blocks" describes the source, not what ships. Astro compiles scoped
component styles into per-route hashed files. Measured on the deployed
homepage: **0 inline `<style>` blocks, 2 stylesheet requests**, served from
`/_astro/*` under `max-age=31536000, immutable`. Per-component scoped styles
are the framework idiom; consolidating them by hand would make the source worse
and the output identical.

**Production verification of §1n, on the deployed build:**

| | before | after |
|---|---|---|
| homepage first paint | 12.3 MB of video | 1.15 MB hero + 160 KB posters |
| mp4 requests at scroll 0 | 7 | 1 |
| font files / origins | Google CSS + 2 preconnects | 2 files, 59 KB, 0 third-party |
| TTFB | 1.31 s peak (audit) | 139–216 ms over 5 requests |
| inline `<style>` blocks | claimed 22 | 0 |

Font assets return `content-type: font/woff2` and
`cache-control: public, max-age=31536000, immutable`.

**§1g status after this pass.** Done: 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13,
15, 18, 19, 20. Stale: 17. **Open: 8** (assets — user instruction is to do
these last), **14** (production domain — DNS, do not touch), **16** (consent vs
analytics — user decision, and the user has noted gtag/GA were already shared).

### 1p. GA4 wired, and a staging URL — *2026-09-24*

**Audit finding 16, analytics half — done.** The banner controlled nothing, and
literally so: `applyScripts()` dispatched `wugweb-analytics-allowed` and **no
listener existed anywhere in the codebase**. Accept and Reject produced the
same outcome. `src/lib/analytics.ts` is that listener.

Two gates, both must pass before a byte of gtag is fetched:

1. **Host** — `wugweb.com` / `www.wugweb.com` only, per instruction. pages.dev,
   `uat.wugweb.com`, the uat branch alias, per-branch previews and localhost are
   all excluded. Staging traffic in a production GA4 property inflates sessions,
   poisons conversion rates, and cannot be retroactively removed.
2. **Consent** — no script tag, no request, no dataLayer until accept.
   Deliberately **not** Consent Mode's "load denied, upgrade later": that still
   fetches gtag and still pings Google on every page view, and the banner says
   reject means no tracking.

Consequence worth remembering: because www still serves Framer (which carries
its own copy of this tag), **this code is correct and dormant simultaneously**.
It reports nothing from anywhere today and starts the moment DNS moves.

| Trigger | Event |
|---|---|
| `/thank-you` | `generate_lead` |
| `/contact-error` | `form_error` |
| `/footer/subscription?subscribed=1` | `sign_up` |
| Nav "Let's Talk" ×2 | `cta_click` |
| Contact chips, menu mailto/tel | `contact_click` |

**Conversions key off the redirect target, not the submit click.** Both forms
are plain `method="POST"`, so the browser navigates away on submit and a
submit-time event races that navigation. The redirect is only reached when the
server actually accepted. The checks run inside `loadGtag`, not at init, so a
visitor who accepts consent *while already on* `/thank-you` is still counted.

**Clicks are declarative** — `data-gtag-event` plus any `data-gtag-*` as
parameters, one delegated listener. The nav CTAs mattered most: internal links,
so GA4 Enhanced Measurement recorded nothing for them at all. Scroll depth,
outbound clicks, downloads and video are left to Enhanced Measurement.

Verified on the **deployed build**: 6 tracked elements present, consent stored
as accepted, CTAs clicked → **0 GA requests, gtag undefined, dataLayer empty**
on pages.dev. The host gate holds in production.

**Staging.** `https://uat.wugweb.pages.dev` is live (branch `uat`, kept
fast-forwarded from main). The preview-bindings fix in §1o is what makes it
usable — before it, preview deployments had no R2, KV or vars.

For `uat.wugweb.com` itself: **I was wrong in session that Pages needs the zone
on Cloudflare.** It does not — Pages supports custom domains on external DNS for
subdomains (Workers does not; Pages does). No nameserver move, no Business plan.
Add `uat.wugweb.com` in the Pages dashboard **first**, then at Hostinger replace
the existing `uat` CNAME (currently → `wugweb.com`) with `uat` → `wugweb.pages.dev`.
A CNAME created without associating the domain first fails to resolve.

**Still open on finding 16:** `src/middleware.ts` mints a `visitor_id` UUID
cookie on every request, one-year lifetime, before any consent. Its only reader
is `/api/personalize`, which **nothing in the frontend calls** — grepped, zero
callers. A persistent identifier with consent exposure and no current product
benefit. Removal is a product decision, not taken.

**Also not done:** `robots.txt` does not exclude `uat` once it is on a real
domain. Canonicals point at `www.wugweb.com` so duplicate content is covered,
but a host-based noindex would be better.


### 1q. uat.wugweb.com is live, and staging is out of the index — *2026-09-24*

**`https://uat.wugweb.com` — live, active, HTTPS 200.**

DNS at Hostinger: `uat` CNAME → `wugweb.pages.dev`. The missing half was the
Pages side — the project had **zero** custom domains, which is why the hostname
returned a bare `409` on port 80 and failed the TLS handshake on 443. Added via
the Pages API; cert issued in about 100 seconds (`initializing` → `pending` →
`active`).

Two corrections to things stated earlier in session:

1. **Pages does NOT require the zone on Cloudflare.** It supports custom domains
   on external DNS for subdomains (Workers does not; Pages does). No nameserver
   move, no Business plan. The apex and `www` were never touched.
2. **The `CLOUDFLARE_API_TOKEN` in `.env` is valid.** It fails
   `/user/tokens/verify` because it is an account-scoped `cfat_` token, and that
   endpoint does not accept those — it works fine against the account's Pages
   endpoints.

**Staging was publicly indexable, and is not any more.** Measured on
`uat.wugweb.com` the moment it went live: **no robots meta at all**, and a
`robots.txt` saying `Allow: /`. The canonical correctly named www, but a
canonical is a *hint* — it does not stop a crawl and can be ignored. Same
exposure on `wugweb.pages.dev` and every branch alias.

- `robots.txt` moved **out of `public/` into `src/pages/robots.txt.ts`**. That
  move is what makes it possible at all: a file in `public/` is served from the
  CDN and lands in `_routes.json`'s exclude list, so the Worker never sees the
  request and cannot know which host asked. Non-canonical hosts get
  `Disallow: /`; canonical text unchanged; `Vary: Host` set.
- `BaseLayout` emits `noindex, follow` on any non-canonical host and suppresses
  JSON-LD there — a copy must not assert Organization/WebSite identity under the
  wrong hostname.
- One host list now, `src/lib/hosts.ts`, shared by robots.txt, BaseLayout and
  analytics.ts. Those three drifting apart is exactly how a staging domain gets
  indexed or staging sessions land in a production analytics property.

> **Landmine removed:** a stale `robots.txt` was tracked at the **repo root** —
> apex sitemap URL, missing every `Disallow` and the entire AI-crawler block.
> Never deployed (only `dist/` is), but **Vite serves the project root in dev**,
> so it shadowed the new route and the first local test silently returned it.
> Deleted.

Verified on the deployed build:

| host | robots.txt | robots meta | JSON-LD | GA |
|---|---|---|---|---|
| `uat.wugweb.com` | `Disallow: /` | `noindex, follow` | 0 blocks | 0 requests with consent accepted |
| `wugweb.pages.dev` | `Disallow: /` | `noindex, follow` | 0 blocks | 0 requests with consent accepted |
| canonical | full text, www sitemap | none | 1 block | loads on consent |

All 11 sampled routes 200 on uat.

**Minor leftover:** `public/_headers` still carries a `/robots.txt` cache rule.
It is now dead — the endpoint sets its own `Cache-Control` — and harmless.


### 1r. Bug sweep against the deployed build — *2026-09-24*

Swept `uat.wugweb.com`, not the source.

**Clean:**

| check | result |
|---|---|
| every sitemap URL | 176 / 176 → 200 |
| every referenced asset | 134 / 134 resolve |
| every internal link | 194 / 194 → 200 |
| console errors, failed requests | 0 on every page sampled |
| `framerusercontent.com` hotlinks | **0** across 12 pages — known-debt item 3 looks stale for these templates |
| images without `alt` | 0 of 28 on the homepage |
| `<h1>` per page | 1 |

**Real bug found, and it was mine.** `b516b1a8` generated 108 posters and its
message claimed "every rendered video has one now". It wired **2 of the 11
files** that render `<video>`. Measured before the fix:

- `/` — 6 of 15 videos with no poster (the `ServiceTagField` pills)
- `/work/airtel-xsafe…` — **4 of 4** with no poster, and **7.6 MB of mp4
  downloaded on load**

The 7.6 MB is the same root cause `a7fee115` fixed on the homepage and never
applied elsewhere: **`autoplay` overrides the preload hint per the HTML spec**,
so `preload="metadata"`/`"none"` bought nothing on all 47 case-study pages —
the highest-intent pages on the site. Below-fold videos now use `data-src`
and drop `autoplay`; `initLazyVideo` already ran on every page via BaseLayout,
so this was markup only. **Result: 7.6 MB → 0 mp4 bytes at scroll 0, 108 KB of
posters.**

Deliberate exceptions: the work cover keeps `src` + `autoplay` (above the fold,
the LCP element); PortableText video keeps `src` (it has `controls`, and a play
button on an unloaded `<video>` is a dead control); `about.astro`, `BentoBlock`
and `ServiceSpotlightPanel` already had posters, the latter two through
`service-media.ts`, which uses a **different** `<dir>/posters/<file>.webp`
convention from the derived `<name>-poster.webp` one. Two conventions coexist;
neither is broken, so neither was churned.

> **A wrong conclusion, recorded so it is not re-derived.** I spent a full
> debugging pass concluding `initLazyVideo` was broken sitewide — 0 of 8 videos
> attaching on the homepage, 0 of 4 on a case study, with the module verified as
> running (cookie banner wiring below it works). It was **`document.hidden ===
> true` in the browser pane**: IntersectionObserver does not run for a hidden
> document. The loader is **unproven in that environment, not broken**. Before
> concluding anything from an IO, a rect or a viewport measurement here, check
> `document.visibilityState` first. An earlier "0 width" scare in the same pass
> had the same cause — `<html>` was 0px wide.

**Shipped anyway, because the question should not matter:** `lazy-video.ts` now
sweeps on `visibilitychange` and once three seconds after load, attaching only
videos already inside the viewport. Same shape as the `[data-reveal]` watchdog,
and for the same reason — when this mechanism fails the failure mode is a
permanently blank box, which is worse than the download it avoided.

### 1s. Plan wrap-up — finding 16 closed, endpoints verified — *2026-09-25*

**Finding 16 is CLOSED.** Both halves:
- *Analytics* (2026-09-24) — GA4 behind consent + host gates, so the banner
  controls something real.
- *The cookie* (today) — `visitor_id` removed. It was a random UUID minted on
  **every** request with a one-year lifetime, before the visitor was asked
  anything, and its only reader `/api/personalize` had **zero callers**
  anywhere in the frontend. A persistent identifier with real consent exposure
  and no product behaviour. `/api/personalize` deleted with it, rather than
  left reading a value that no longer exists. `locals.visitorId` gone from
  `env.d.ts`. **`visitor_profiles` in Neon deliberately untouched** — Neon is
  user-controlled and dropping a table is not a code change. If personalisation
  is ever built the cookie must be minted **after** reading consent; the
  comment in `middleware.ts` says so.

**`/api/contact` and `/api/subscribe` verified in production** — open in
`pending.md` for weeks. Note this was a *genuine production* test: a Pages
custom domain serves the **production** environment, so `uat.wugweb.com`
exercised production bindings, not preview.

| | result |
|---|---|
| `/api/contact` → Neon | ✅ 302 → `/thank-you`, only reachable **after** the insert |
| `/api/subscribe` → Neon | ✅ 302 → `?subscribed=1`, same |
| `/api/contact` → Sanity mirror | ❌ **writes nothing, silently** |

> **The Neon-on-Workers connection works.** That note can be closed.

> **New bug: the Sanity mirror is off and has always been off.** No
> `contactSubmission` document appeared after a successful submission.
> Isolated — creating the same document with a local token succeeds, so schema
> and token role are fine; **`SANITY_SYNC_TOKEN` is not bound on the Pages
> environment**. `if (token)` then skipped the write *silently*, which is
> exactly why nobody noticed: the endpoint returns a success redirect either
> way, so every submission since the feature shipped reached Neon and never
> reached the Studio — and `contactSubmission` at 0 documents read as "no
> enquiries yet" rather than "the mirror is off". It now logs loudly.
> **The actual fix is a dashboard action: set `SANITY_SYNC_TOKEN` on the Pages
> project, production and preview.** This also corrects `CLAUDE.md`'s claim
> that "#27 wired: /api/contact mirrors to Sanity" — it is wired but inert.

**403 on a bare POST is not a bug** — it is Astro's CSRF origin check. The
first test got 403 because curl sent no `Origin` header; with one it is 302.

**Framer CDN hotlinks — debt item struck.** All 176 routes swept: **zero**
`framerusercontent.com` references. `CLAUDE.md` item 3 updated.

**Phase C measured, not actioned** (both audit numbers wrong again):

| | audit claim | re-measured |
|---|---|---|
| breakpoints | nine | **13 values / 11 thresholds** — *worse* |
| hardcoded px | ~800 | **225 in declarations**; 104 more inside `@media` where px is correct; 56 of the 225 are `kits.astro` |

**Test data left behind:** the Sanity test doc was deleted (`contactSubmission`
back to 0). Two Neon rows remain that I cannot remove without `DATABASE_URL` —
`CLAUDE-TEST-1790319185 DELETE ME` in `contact_submissions`, and
`claude-test-1790319185@example.invalid` in the subscriber table.

**Still open:** `--color-text-muted` contrast (design call) · breakpoint and px
consolidation · Neon leftovers (needs `DATABASE_URL`) · Notion Phase 5 (MCP
auth) · assets, last by instruction.

### 1t. Audit of pending.md's own claims — *2026-09-29*

This file asserted things that were no longer true, and in one case
contradicted itself. Eight checkable claims tested against the code and the
deployed build.

**Stale — corrected:**

| claim | reality |
|---|---|
| "Contact Form Production Verification … verified **authenticated Sanity write client**" | **False, and never was.** No `contactSubmission` document is created; `SANITY_SYNC_TOKEN` is unbound. The Neon half is real. (§1s) |
| item 5: "3 sublines are **DUMMY COPY** — replace before launch" | Fixed **2026-09-23** in `d2b2fcab`. No dummy marker remains. **Line 8 of this file already said so** — the file contradicted itself for six days, and I repeated the wrong half. |
| 9a: "9 logo images still only on the Framer CDN" | **Zero** `framerusercontent.com` references in `src/`, and zero across all 176 deployed routes. |
| 9b: "old `<ol class=\"service-cards\">` still in the DOM as `hidden` with dead CSS" | No `service-cards` reference anywhere in `src/`. |
| 9b: "clips have no posters" | Fixed 2026-09-24; verified 6/6 on the deployed homepage. |

**Still true — confirmed, not assumed:**

| claim | evidence |
|---|---|
| #6: `services/strategy/` is a byte-identical copy of `brand/` | md5 of all 9 files matches |
| #7: 9 clips for 10 brand sub-services | 9 mp4s on disk |
| 9a: duplicate `logoPath` on Airtel Xstream/XSafe | both → `/assets/logos/client-logo-c6rj.png`, queried from Sanity |

**The pattern, for the third time this week.** Audit and tracker entries decay,
and the decay is invisible because nothing re-checks them. Finding 20's "463"
was 115; finding 10 was not a defect; findings 4 and 17 were already resolved;
Phase C's "~800 px" was 225; "nine breakpoints" was 13. **Treat every number
and every "Open" in this file as a hypothesis with a date on it.**

### 1u. Phase C actioned + two findings — *2026-09-29*

**9 — breakpoints: 13 values → 5.** `480 / 640 / 768 / 1024 / 1200`, with
`max-width` partners at `639.98 / 767.98 / 1023.98`. Scale documented in
`global.css` (CSS custom properties do not work in media queries, so a comment
is the only thing that can enforce it).

> **A real bug found on the way.** `ServiceTagField` and `ClientAssemblyGrid`
> each declared `min-width: 640px` **and** `max-width: 640px`, so at exactly
> 640px an element got the tablet chip *and* the phone min-height. Both
> contradicted their own comments. Verified after: 639 → chip 2.25rem /
> min-h 480px / 3 cols; 640 → 2.5rem / 384px / 6 cols.

**There is no breakpoint below 480, and there should not be.** Verified at 320
and 375: no page overflow, and **no `min-width` tier matches at all** — the CSS
is mobile-first, so those widths get base styles. Adding a `min-width: 375px`
would mean anything narrower gets something different, which is backwards.

**10 — the px consolidation was already essentially done**, which the "~800"
figure hid. Same shape as finding 20's "463 colours":

| | count |
|---|---|
| original claim | ~800 |
| px in declarations | 225 |
| on spacing / radius / stroke properties | 56 |
| of those, in `kits.astro` where px **is** the subject | 32 |
| odd values with **no token on the scale** (2, 6, 10, 14, 30px) | 46 |
| **actually actionable** | **2, on one line** |

`--gap-1` is 4px, so "converting" a 2px padding would be a visual change, not
a consolidation — those are left deliberately.

> **What the pass actually found: 14 `var(--token, fallback)` pairs disagreed
> with their own token.** `--radius-md` is 12px while its fallback said 10px
> (×6) and 8px; `--radius-lg` is 16px while its said 14px and 12px;
> `--nav-height` is 78px, fallback 64px. Eleven are in `PortableTextRenderer`,
> which has a Storybook story — but `.storybook/preview.ts` imports
> `global.css` on line 1, so **the fallbacks never fire anywhere.** Not a
> rendering bug: documentation that lied. Corrected, zero visual risk.

**11 — `--color-text-muted` #7D7D7D → #858585.** The recorded 4.23:1 was right
but incomplete: on the `#050505` page background it was already **4.95:1 and
passing**; only the `#1A1A1A` elevated surfaces failed. Now 4.72:1 there.
**64 of 68 painted elements on `/footer/subscription` pass, up from ~32.**

Four still fail and need **local** fixes — `.item-n` 4.38, `.lane-title` ×2
4.01, `.iq-tag` 4.37 — each on a lighter composited surface where no realistic
value of this token reaches 4.5.

> **Measuring contrast on this site requires compositing the whole ancestor
> stack.** My first sweep reported eight failures at 3.69 and 2.22; both were
> wrong, because the regex took the first three numbers of an `rgba()` and
> discarded the alpha, scoring a 1%-white overlay as opaque white. 3.69 is
> exactly #858585 against #FFFFFF, which is the tell. The surfaces here are
> built from stacked translucent overlays.

**#8 — already done, the sixth stale claim.** `ServiceSpotlightPanel.astro` is
430 lines, imported at `[slug].astro:15`, has a Storybook story, and zero
inline showcase markup remains in the page.

**9a — the duplicate logo is THREE pairs, not one, and worse than recorded:**

| file | rendered as | what the file actually is |
|---|---|---|
| `client-logo-c6rj.png` | Airtel XSafe **+ Airtel Xstream** | the "airtel Xsafe" wordmark |
| `client-logo-k5hy.png` | IndusInd Bank **+ IndusNinja** | the IndusNinja ninja face |
| `client-logo-u2rd.png` | Sadhan **+ TOT** | white-on-white, unidentifiable |

**IndusInd Bank is on the public client wall wearing IndusNinja's logo.**
Not fixable here: no Airtel Xstream, IndusInd or Sadhan/TOT logo asset exists
anywhere in the repo, and both case studies' own `logoPath` is null. **Needs
three logo files from the user.**

### 1v. Phase C actioned in full — *2026-09-29*

Everything in Phase C is done. Detail in `~/.claude/plans/snoopy-splashing-pearl.md`.

| | result |
|---|---|
| breakpoints | **13 values → 5 thresholds** (`480/640/768/1024/1200`, max-partners at `.98`) |
| durations | **98 of 118 tokenised** (300ms ×57 alone) |
| opacity | **17 of 21 tokenised** |
| font-size | **42 brought onto the type scale**, 2 left off deliberately |
| z-index | **two scales merged into one**; `--z-skip-link` never existed |
| contrast | **0 WCAG AA failures** across every affected page |
| `var()` fallbacks | **14 corrected** — they disagreed with their own token |

**Three corrections I had to make to my own work mid-change**, all caught by
measuring rather than reviewing:

1. `--fluid-nano` was written as a `10→12px` clamp. Measured it rendering
   ~12px at desktop — a 20% increase on exactly the five micro-labels the step
   existed to protect. Now flat `0.625rem`, like `--fluid-label`'s flat `1rem`.
   **Bringing a value onto a scale should name it, not resize it.**
2. The contrast sweep reported **eight false failures** because it read
   `rgba()` with a regex that discarded the alpha, scoring a 1%-white overlay
   as opaque white. The tell: 3.69 is exactly `#858585` against `#FFFFFF`.
3. The lazy-video scroll fallback was rAF-throttled — and **rAF is paused in a
   hidden document**, which is one of the conditions that stops IO and brings
   you to the fallback. Timer-throttled now, and **verified on the deployed
   build**: with IO suspended, 4 of 4 videos attach on scroll. That closes a
   verification gap that had been open since the lazy-loading work shipped.

**Two `@media`-adjacent things worth keeping:** there is **no breakpoint below
480 and there should not be** — verified at 320 and 375 that no `min-width`
tier matches, which is mobile-first working. And
`.matrix-row.header { font-size: 10px }` was **dead CSS**; the child
`.matrix-cell` sets its own size, so those cells always rendered at 14px.

### 1w. Layout shell sitewide + every section labelled — *2026-10-03*

**Layout shell** (`kits_design_system/docs/tokens/layout-shell.md`) implemented on
all pages: section owns the gutter, content owns the max-width. Content 1200,
gutter 16/32/48, vertical rhythm 48/70/96. All three deltas resolved —
`--breakpoint-xl` is now 1200, and a stray 68px `.wrap` rule removed.

**Section labels** — these were recorded as *noted only* since 2026-09-24 and had
never been done; I failed to correct "which you did" when it was said. Before:
113 source sections, 15 with an id, **1** with an aria label, **0** with both.
After: **215 of 215 rendered sections across 27 pages** have both, 0 duplicate
IDs, 0 broken references.

The first pass reported 99% at source level and was wrong on render — eight
defects, all from labelling a section with "the first heading inside it":
looped card headings (duplicate IDs, sections named after their first card),
conditional and CMS-fallback headings (dangling references), and two sections
in `src/layouts/` the sweep never scanned. Rules now in `layout-shell.md`.

**Then closed the same day:** vertical rhythm 48/70/96 on every top-level
section and nav padding 16 / 20·32 / 20 — 136 of 136 sections and 22 of 22
navs on spec at all three breakpoints. See layout-shell.md.

### 1x. Layout shell complete — grid, section tokens, filters — *2026-10-03*

- **Every `--space-section-*` token** now steps 48 / 70 / 96 — one section rhythm.
- **Column gap 16 / 24 / 32** (`--grid-gap`) and **12 columns at 1200**, per the
  supplied layout guides; was a flat 16 and a 1024 switch. Four grid gaps that
  borrowed a section token now use `--grid-gap`.
- **Filters are CMS body, not sections** — blog and work chip rows moved inside
  their grid sections as `role="toolbar"` divs. Exemptions down to the CTA card.
- **My doc's content gap (24 / 24 / 0) was wrong**; the guides say 16 / 24 / 32.
- Verified on 22 pages at 375 / 768 / 1440: 137/137 sections and 22/22 navs on
  spec, no overflow; 159/159 sections labelled, 0 duplicate IDs.
- Deploy of `02d3bf9a` failed on Cloudflare with `npm EINTEGRITY` on
  `unist-util-position` — a corrupted download on the builder (lockfile
  unchanged since the last good deploy). Retried.

`layout-shell.md` rewritten as the full spec: structure, breakpoints table,
declarations, labelling rules, implementation map, history, verification.

### 1y. Nav, canvas index, content accessibility — *2026-10-03*

- **Nav 100px on all breakpoints**, sticky top 0, **z-index 10**
  (`--layer-nav`), `cursor: grab` (links/buttons keep pointer). Nav
  transitions use the **Spring** token (`--ease-spring`, 0.4s, bounce 0.2).
- **Sections full width + relative**, content 1200 distributed centre;
  `isolation: isolate`, `scroll-margin-top` under the sticky nav.
- **Canvas index on every page**: `main` labelled with the page title,
  footer landmark, and a **page scroll flow** (`data-scroll-index` per
  section, `main[data-scroll-flow]`).
- **Content accessibility sweep** found and fixed: 5 heading skips (sr-only
  `h2` for heading-less sections; subscription timeline `h4 → h3`),
  4 unnamed form fields, 74 videos with no name (decorative loops
  `aria-hidden`, control videos `aria-label`). Now 0 / 0 / 0 on 22 pages;
  162/162 sections labelled.
- Blog post: title, meta, body share one left edge.
- **Deploy fix**: `package-lock.json` had 340 entries without
  `resolved`/`integrity`, forcing registry metadata fetches that hit a stale
  cached packument → `EINTEGRITY`. Filled from the registry, 0 version
  changes, validated with a clean-cache `npm ci`.
- `layout-shell.md` updated, including the CMS page/section/component field
  map from `docs/schema-template-section-component-level.md` (still a
  proposal — no schema deployed).

### 1z. Blog post template rebuilt to the case-study layout — *2026-10-03*

- **Order and widths match `/work/[slug]`**: title block (h1, excerpt, tags,
  meta row: author · published · updated · reading time · category) at the
  1200 content width → cover image **below** it at 1200 → 720 reading column
  → related sections at 1200. At 1440: h1 120+1200, cover 120+1200, body 360+720.
- **Post fields now used**: `relatedPosts` (set on all 100 posts, never
  rendered before; editor picks lead, then same category, then latest),
  `category`, `language` (`lang` on the article), `syndicatedTo`, author
  `photoPath` and `socialLinks`. All 14 body block types were already rendered.
- **Latent bug fixed**: `internalLink` marks were never dereferenced in the
  query, so every internal link in a body would render `href="#"`. No post
  uses one yet.
- All 100 posts render 200 with the new template.
- **Hero poster: re-encoded, source still the limit.** Poster now native 800×600 at q92 (was a 1280 upscale at q72, 10.5 KB — the first-paint blockiness). `home.mp4` itself is **800×600** — every copy
  in the repo, including `assets/website/home/Home.mp4`. The 1280 poster is
  already an upscale; a sharp full-bleed hero needs a higher-resolution source
  video.
  Checked for a better source: the live Framer site serves the byte-identical
  file (same SHA), and `VS/wordpres/home.mov` (1280×648) is a Driftime screen
  recording, not this footage. Needs a new export of the hero video.
- **Hero re-export done (2026-10-04)** from the only source that exists
  (`assets/assets/website/home/Home.mp4`, 800×600): lanczos upscale to
  1920×1440 + light unsharp, crf 21, audio dropped → 992 KB (was 1.17 MB).
  Poster regenerated from it (1920×1440, q85). Both in `public/` and R2.
  Visible gain is small — source frames are soft/motion-blurred. Searched
  this Mac, iCloud, both Google Drives, R2 and the Framer site: no higher-res
  original exists. True sharpness needs the source project re-exported.

### 1aa. Blog SEO / AEO audit and fixes — *2026-10-13*

Audited all 103 live posts on wugweb.pages.dev. Fixed and re-measured live:

- SEO titles 50 ≤ chars ≤ 60: 79 → **103/103** (23 rewritten in Notion `SEO Title`)
- Meta descriptions 140 ≤ chars ≤ 160: 100 → **103/103** (3 extended)
- Image alt: 47 missing → **0** (Notion caption `Alt: …` = alt only, no visible figcaption)
- Image width/height: 0/223 → **223/223** (measured by the sync with sharp)
- In-body internal links: 102 posts with none → **27** (137 links, anchors on existing words only)
- No "last updated" on posts (owner decision 2026-10-13): Updated row removed, `contentUpdatedAt`
  dropped from schema/sync/data; BlogPosting `dateModified` = `datePublished`.
- BlogPosting audited on all 103 posts, rendered locally as www.wugweb.com (`wrangler pages dev`,
  `Host:` header): 0 errors. Fixed: Organization had no logo (now R2 `assets/brand/small.jpg`, the
  648px W mark), "Wugweb Design" byline was a Person (now → `#organization`). Vedanshu → `#founder`;
  BreadcrumbList; mainEntityOfPage = canonical; images and logo all served from R2 (200).
- Organization sameAs: dropped 4 non-profile URLs (startupindia.gov.in, gem.gov.in,
  admin.skillindiadigital.gov.in, sur.ly) in code; Presence entries untouched. 27 remain.
  behance.net/vedanshu (personal) stays on the Organization — move was proposed, then stopped by owner.
- 27 link sentences (owner-approved) added in Notion + synced: every post now has ≥1 in-body internal link.
- Factual fixes (owner-approved) in Notion + synced: Adobe XD (deal abandoned Dec 2023, XD in
  maintenance mode), GA post (GA4 note + GA4 metric names), Figma Config 2023 (correction note:
  several "updates" predate 2023), AI CX Singularity (unsourced 49/51/36% removed from headings).
  Backups: backups/notion-blogs-pre-{link-sentences,fact-fixes}-2026-10-13.json.
- Briefs for 37 posts delivered as proposals (blog-briefs.csv) — owner writes; not applied.

Open (copy, Vedanshu): the first body paragraph is hidden when it equals the excerpt, so links
there don't render. 27 posts still need link-friendly wording. AEO briefs pending (question H2s,
key takeaways, FAQ) for the no-H2 post, 7 posts with colon headings, 6 generic openers and the
26 shortest posts.
Backups: `backups/notion-blogs-*-pre-seo-2026-10-13.json`, `backups/sanity-pre-notion-blog-sync-2026-10-13T05-*.json`.

### 1ab. Blog + Studio follow-ups — *2026-10-14*

- ParcelShop `02-image.jpg`: Medium's own file was a 60×12 divider; replaced in R2 (same key) with a
  1400×520 research visual in the case study's style; alt updated in Notion; synced. Small body
  images (<400px) now keep their intrinsic size (`.pt-media--small`).
- `SANITY_SYNC_TOKEN` set on Pages production + preview (Sanity editor token); main + uat redeployed.
- 5 Notion case studies created in Sanity as unpublished drafts (CS-003, CS-004, CS-007, CS-015,
  CS-028; ids = Notion "Sanity ID"). Notion bodies are empty; the case-study sync skips drafts.
- Sanity Studio + schema deployed (wugweb.sanity.studio).
- Done by owner: 37 briefs, 7 old media links in Notion case-study bodies, 3 client logos.
- Open: 2 Neon test rows (needs `DATABASE_URL`); contact → Studio mirror not yet tested end to end.
- **Unreviewed case-study page WIP** (another session, 2026-10-13) saved on branch
  `wip/case-study-body` (src/lib/case-body.ts + work/[slug].astro, queries.ts, case-study sync).
  Not merged to main. The same changes are still uncommitted in the local working copy.
