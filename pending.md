# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**Last verified:** 2026-08-05 (Phase 1 tokens + Phase 2 completion: PWA, blog enrichment, trust badges, 6-pillar filters, service detail teasers, #5 service copy pass, contact/subscribe resilience, **Studio Phase 7: enterprise operational layer**).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded). Design system (single source of truth): [`kits_design_system/`](kits_design_system/) — `docs/design.md` + `docs/tokens/`.

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **2026-08-05 arc:** owner backfill (#40), Neon `both` entity (#41), Neon re-sync (owner-aware), blog teaser thumbnails, asset path case fixes, audit script repairs.

Scripts of note: `sync-global-config.mjs`, `sync-asset-registry.mjs`, `link-platform-tech-icons.mjs`, `map-assets-to-content.mjs`, `audit-framer-service-pages.mjs`, `extract-framer-service-pages.mjs`, `salvage-framer-toolkits.mjs`, `sync-framer-tokens.mjs`, `capture-framer-pages.mjs`, `salvage-framer-seo-pages.mjs`, `backfill-owner.mjs`, `sync-sanity-to-neon.mjs`.

---

## 🔴 Open — Critical / blocked

| Item | Status | Notes |
|---|---|---|
| Design token → component migration | **Done 2026-08-05 (Phase 1)** | Full token system (opacity/radius/stroke/blur/shadow/elevation/glass/noise/gradient/motion/z-index) consumed everywhere; residual `#555`/`rgba()`/`opacity:`/`blur()` removed from pages/components (only `CATEGORY_COLORS` data map + service-panel `fg`/`accent` data remain). |
| Frontend → Neon swap | Deferred | Helpers ready (`content.ts`, `NEON` queries); wait until UI/brand mapping done. **User: do not run Neon sync unless asked.** |
| Sanity token permissions | Soft | create/replace OK; some update/delete flaky. **Do not rotate unless user asks** |
| Contact form production reliability | **Deferred to end** — UI + Neon write path exist. **2026-08-05:** `/api/contact` + `/api/subscribe` hardened — Neon write is now best-effort (try/catch + `finally` client release), so a DB/Neon hiccup can no longer 500 the visitor; always redirects to thank-you. Prod verify still pending (local 500 = no DATABASE_URL binding, same as before) |

---

## 🟡 Open — Medium

| # | Item | Notes |
|---|---|---|
| 16 | Design token → component pass | **Type done** + **spacing rem sweep** (padding/margin/gap → `--gap-*` / `--space-section-*`). Gallery vh clamps kept where layout needs them. **2026-08-05:** service detail borders → `--stroke-thin`, label tracking → new `--tracking-label` token; residual one-off px cleared on service pages |
| 43 | **Typography / fonts** | **Done — Kits hierarchy** — Display 800 / H1 700 / H2–H4 600 / labels 500 / body 400; `--ts-*` / `--fluid-*`. |
| 17 | Service detail rich sections | **Done (Framer extract)** — Why Us / toolkit(+icons) / approach from Sanity; Framer slugs routable |
| 18 | About page | SEO + values from Sanity; stats: **projects** = caseStudy count, **brands** = client count; years/retention need Studio `items` (no invented figures). Stack chips use tech `iconPath`. |
| 20 | Contact form | Deferred production harden (see critical) |

---

## 🔵 Open — Phase 2 backlog (documented, not started)

| Item | Notes |
|---|---|
| Contact page redesign (#12) | Adapt driftime.com layout/hierarchy/trust/enquiry — **needs reference screenshot from user**; `/api/contact` + Neon stays |
| Full service-page content pass (#5) | **Done 2026-08-05** — 6-pillar copy enriched per `urgent/Wugweb_Services 2026.md` via new `src/lib/services-data.ts`: growth 8 capability groups, engineering 11, operations 10 (doc-accurate), fuller approach/FAQ/why sets; `[slug].astro` now imports shared data (removed inline 290-line block) |
| Trust badge logos | Text badges live site-wide; official Clutch/DesignRush/GoodFirms/TopDevelopers logo assets pending from user |
| Contact form prod verify | Neon write path unverified in production (local 500 = no DATABASE_URL binding) |

---

## 🔵 Open — Near-term content / data

| # | Item | Notes |
|---|---|---|
| 42 | **Reference/component enrichment** | **Done 2026-08-05** — `component/` fully consumed (nav → SiteHeader, style JSON → tokens) and **deleted by user**. `reference/` Framer HTML pages retained as offline archive. WP media (uncode/blog/vedanshu-personal) extracted. |
| 23 | Blog body gaps | **Done** — 0/124 posts missing body (was ~21); 28 WP blog posts imported |
| 30/covers | Blog covers | 55/124 have `coverPath` (43 original + 12 WP covers). Remaining covers need user-supplied art. |
| 25 | Team photos | **Done 2026-08-05** — 10 portraits + wugweb mark + generic avatar wired via `person.photoPath`. |
| 32 | Legal / SEO pages | **Done 2026-08-05** — privacy/terms/refund now CMS-driven from Sanity singletonPage body (hardcoded fallback kept). |
| 33 | R2 cutover | **Done 2026-08-05** — all 746 local files mapped + live; `PUBLIC_USE_R2_ASSETS=1`. |
| 34 | Case studies without media | 43 lack `thumbnailPath` — **work grid renders styled initials placeholder** (41 videos + 41 placeholders, 0 broken). 7 case studies enriched with 126 Uncode UI-mock media in `galleryPaths`. Actual thumbs deferred to user. |
| — | Neon re-sync | **Ran 2026-08-05** — 1430 docs owner-aware. **Do not re-run unless asked.** Neon audit findings: 8 stale caseStudy rows, `[object Object]` slug bug in older rows, empty `content_relations`. |
| 22 | Preview mode | **Done** — middleware reads `__sanity_preview` cookie → `getPreviewClient(token)` on `/blog/[slug]`. |
| 27 | Contact → Sanity | **Done** — `/api/contact` mirrors submissions to `contactSubmission` docs. |
| — | Hardcoded content audit | **Done 2026-08-05** — homepage client logos + industries Sanity-driven. **Kept hardcoded by design**: service teaser/pillars copy, services pricing tiers, contact config, legal fallback. |
| — | Asset registry | **Clean 2026-08-05** — 746 local files / 750 R2 map, 0 missing; 588+ Sanity asset docs. |
| — | Testimonials | **Done** — 14 LinkedIn testimonials for Vedanshu in new `testimonial` schema (source=linkedin, subject=vedanshu). |
| — | WP content archive | **Done** — 3 WP DBs mined: 28 blogs → Sanity, 126 case-study media → galleryPaths, 14 testimonials, personal assets, 32-item cleaned page archive in `notion-data/`. |

---

## ❌ Cancelled / deferred / out of scope

| Item | Status | Reason |
|---|---|---|
| Homepage chat hero | ❌ Cancelled | Keep video hero |
| DNS cutover | ❌ Out of scope | User excluded |
| Hyperdrive / SESSION KV | ❌ Deferred | Only if runtime needs |
| footer/subscription | ❌ Deferred | Payment gateway scoping |
| Live Studio dashboard widgets | ❌ Deferred | Structure filters crashed Studio |
| Credential rotation | ❌ Not needed | Unless user asks |
| about bento imagery | ❌ Blocked | No source assets provided |

---

## ✅ Recently completed (this arc)

- [x] **Studio Phase 7 — Enterprise operational layer (2026-08-05)** — reusable `DataTable` (TanStack v9 + `@sanity/ui`, MIT) with sticky header/resize/visibility/multi-sort/saved views/filters/search/selection/bulk/keyboard/context menu/pagination/density/dark mode; 15 per-type table configs (incl. new `redirect` schema); custom `DocumentListPane` panes replace native lists for major types; new structure Overview/Content/Marketing/Media/Business/Settings; tools: Dashboard (website health + audit + queue), SEO Manager (score + generate meta), Media Library (unused/dup/missing-alt/oversized filters), Advanced Search (field-scoped); schema preview fixes (client false ⚠️ SEO, caseStudy refs, twoColumns layout); removed dead `dashboardWidget`. Build ✅ (`sanity build`).
- [x] **#5 Service-page content pass (2026-08-05)** — 6-pillar copy enriched from `urgent/Wugweb_Services 2026.md` into a new shared module `src/lib/services-data.ts` (typed `ServiceData`): growth now 8 capability groups (Growth Strategy → AI-Powered Growth), engineering 11 (Product Engineering → Platform Modernization), operations 10 (Managed Application Support → Continuous Improvement), plus the doc's fuller approach/FAQ/why sets and toolkits; `[slug].astro` imports it (removed ~290-line inline block), still prefers Sanity where a doc exists.
- [x] **Contact + subscribe API resilience (2026-08-05)** — `/api/contact` + `/api/subscribe` Neon write is now best-effort (try/catch + `finally` release); a DB/Neon/Sanity hiccup can no longer 500 the visitor — always redirects to thank-you. Prod verify still pending.
- [x] **#16 residual token sweep on service pages (2026-08-05)** — all `1px` borders → `--stroke-thin`; `.05em` label tracking → new `--tracking-label: 0.08em` token (global.css, also applied to `.eyebrow`).

- [x] **Phase 2 — Site completion (2026-08-05)**:
  - **`motion` dependency removed** from `package.json` (zero imports remain; GSAP is the single animation system).
  - **PWA**: `public/manifest.webmanifest` + `pwa-192/512.png` + `apple-touch-icon.png` (brand lockup on dark canvas, generated via sharp) + `sw.js` (network-first, cache fallback offline shell); `theme-color`, apple meta, SW registration in BaseLayout.
  - **Blog detail enrichment**: ToC (anchored h2/h3), Last Updated, author bio, share actions (X/LinkedIn/WhatsApp/copy-link), newsletter CTA (→ `/api/subscribe`), Prev/Next, Related articles (category-first).
  - **Trust badges**: `TrustBadges.astro` (Clutch/DesignRush/GoodFirms/TopDevelopers text strip, monochrome) rendered site-wide in BaseLayout + About.
  - **Filters capped to 6 pillars**: work (discipline/tag→pillar map) + blog (category→pillar map) filters now show exactly All + Strategy/Brand/Experience/Engineering/Growth/Operations.
  - **Service detail rebuild**: related work grid + insights teasers (queries existed but were never rendered — now live), dual CTA (Let's Talk + View Our Work). Capability-grouped toolkits + framework already present from Framer extract.
  - **Mobile-first audit**: `.work-meta` single-column on mobile (was 2-col at 320px); verified all grids are `1fr`-base + expand; no horizontal overflow.
- [x] **Phase 1 — Design tokens + site polish (2026-08-05)**:
  - **Effects token system** added to `global.css`: `--opacity-*` (scale + semantic), `--radius-*` aliases, `--stroke-*`, `--blur-*`, `--shadow-*` (scale + glows), `--elevation-*`, `--glass-*`, `--noise-*` (SVG grain), `--gradient-*` (per-service), extended `--duration-*`/`--easing-*` (spring/smooth/editorial), `--transition-*`, hover/focus/selection/cursor presets, `--z-*`/`--layer-*`, `--hero-overlay*`, `--color-surface-hover`.
  - **All residual hardcoded values tokenized** across pages/components — `rgba()`/hex/`blur()`/`opacity:` removed (grep gate clean; only `CATEGORY_COLORS` data map + service-panel `fg`/`accent` data remain).
  - **Kits consolidated** → single source of truth at `kits_design_system/`: `docs/design.md`, `docs/components.md`, `docs/tokens/` (22 token docs incl. colors/typography/spacing/sizing/radius/borders/opacity/shadows/blur/elevation/gradients/glass/noise/motion/transitions/z-index/icons/layout/breakpoints/interaction/accessibility/service-colors). Root `design.md` slimmed to a pointer.
  - **Brand SVG wired**: `assets/brand/` → `public/brand/` (logo-large.svg lockup, logo-small.svg mark, favicon-16/32, og-default.png) — SiteHeader + bento CTA use the SVG lockup, favicon/og updated.
  - **Yellow ≤10% rule**: `.global-final-cta` restyled from full yellow band → ash (`--color-surface-elevated`) with yellow accent button.
  - **Consistent radius**: buttons = `--radius-sm` (8px), chips/tags/pills = `--radius-full`.
  - **Service color sequence rebalanced** (no similar colors adjacent): Strategy → Engineering → Brand → Growth → Operations → Experience (services panels + homepage pillars). Added `.svc-sub` one-line summaries.
  - **GSAP everywhere**: `scroll-animations.ts` now drives `[data-reveal]` + `[data-scroll]` + `data-reveal-delay` stagger; all `motion` imports removed from 16 pages (zero `motion` bundles in dist; `motion` dep kept, drop in Phase 2).
  - **Dead code deleted**: 9 unused `.astro` components + `Hero.tsx`; `src/components/README.md` trimmed.
  - **WhatsApp nav CTA** (nav only): `wa.me/919205996219` + icon, desktop + mobile; `/contact-us` unchanged.
  - **Mobile menu**: capped at `100dvh` with single scroll container (replaces hardcoded 698px).
  - **Contact honeypot** + **`/api/subscribe`** wiring (subscription form → `contact_submissions.newsletter_opt_in`, Sanity mirror).
- [x] **WordPress content extraction (2026-08-05)** — mined 3 WP DBs before deletion:
  - **wugweb.design**: 26 blog posts imported (incl. 13 full bodies), 49 media files
  - **vedanshu.design (Uncode)**: 3 new blogs (Video Commerce 211 blk, AI Search 175 blk, Gandhi 57 blk), **126 case-study media files** (Plufo 24, Cartier 26, Inkompass 23, VALYU 18, VisiONE 17, Sadhan 15, Airtel Xsafe 2) wired into `galleryPaths`, **14 LinkedIn testimonials** (new `testimonial` schema, source=linkedin, subject=vedanshu), personal assets (signature, scene-02, portfolio-06)
  - **vedanshu.me**: single-page template — no real content (resume + signature were the only unique items)
  - **Audit verdict**: Uncode drafts/trash = demo templates (no real content); 2025/03+06 uploads = Uncode demo assets; the 4 draft portfolios (ITC/Aditya/iKan/METCRED) were empty template stubs (projects already in Sanity)
- [x] **Testimonial schema** — new `testimonial` doc type (name, role, company, quote, rating, source, subject) + Studio desk entry under Business.
- [x] **Client linkage fixes (2026-08-05)** — created client docs: **TheBizGift**, **MusicLinkd** (AudioFolio), **Spark Logistics** (distinct from ST Logistics), **Eastman Auto & Power** (fixed broken `caseStudy-None` client text). Linked: Gratify→Adneto, RAK SME→RAK Chambers (per user: "RAK Chamber of Commerce"), AudioFolio×2→MusicLinkd, Spark×2→Spark Logistics, TheBizGift×2, Eastman×2. Only **Greenko** remains unlinked (user unknown — deferred).
- [x] **#25 Team photos** — 10 portraits hash-verified vs live Framer About page → `public/assets/about/team-*.jpg` + `person.photoPath` + About page renders via `assetUrl`.
- [x] **Work grid empty-thumbnail fix (final)** — `findThumbFallback` returns `''` for missing files; `assetUrl('')` bug fixed (was rendering `/assets/` broken video); 41 media-less case studies now render styled initials placeholders (41 videos + 41 placeholders, 0 broken).
- [x] **About page imagery** — hero poster (`about-section.jpg`) + culture visual (`about-section-2.jpg`) wired from extracted assets.
- [x] **Asset registry clean** — 20 about/+more/home + 18 framer case-study images registered; 4 uppercase duplicate videos deleted. 0 unreferenced disk files.
- [x] **#23 Blog body gaps** — verified 0/96 posts missing body (was ~21).
- [x] **component/ audit** — nav screenshots → SiteHeader (yellow CTA, Works, 698px panel); style JSON → tokens. **Safe to delete.**
- [x] **#40 Ownership backfill** — client 106 (104 wugweb/1 both/1 vedanshu), caseStudy 82 (wugweb), post 96 (wugweb), asset 553 (187 wugweb/366 both). Script: `backfill-owner.mjs` (was dry-run only).
- [x] **#41 Neon `both` entity** — seeded; `entities` now vedanshu + wugweb + both.
- [x] **Neon re-sync** — `sync-sanity-to-neon.mjs` owner-aware (falls back to `wugweb`, not vedanshu); added asset/platformProfile/syncStatus to type map; 1430 docs synced 2026-08-05.
- [x] **`/api/sync` owner fix** — same doc.owner logic; no longer hardcodes vedanshu.
- [x] **Blog teaser thumbnails** — BaseLayout blog block now Sanity-driven (latest 3 posts) with cover thumbnails; was hardcoded text-only links with a stale post.
- [x] **Asset path case fixes** — 6 Sanity asset records with wrong-case paths (`Xsafe_about.mp4` → `xsafe-about.mp4`, etc.) patched; case studies already used correct lowercase paths.
- [x] **Audit script repairs** — `data-audit.mjs` GROQ parse error + `inBoth` iterable bug + 10s query timeout all fixed; full audit now completes.
- [x] **#33 R2 cutover** — `upload-tools-gap-to-r2.mjs` (parallel) filled the 81-file `tools/*` gap; map now covers all 512 local files, 0 missing; `PUBLIC_USE_R2_ASSETS=1` in `wrangler.jsonc`.
- [x] **#27 Contact → Sanity** — `/api/contact` creates a `contactSubmission` doc per lead (best-effort) so submissions are visible in Studio.
- [x] **#22 Preview mode** — middleware exposes `__sanity_preview` cookie as `locals.previewToken`; `/blog/[slug]` uses `getPreviewClient(token)` to load drafts.
- [x] R2 `wugweb-assets` + path map + Rule 2 · dual-serve until cutover
- [x] Content ↔ asset mapping (caseStudy/client/page/service/post paths)
- [x] Blog covers from Framer (43/96) · case-study media from `assets/assets/client`
- [x] Global Settings masters: platform, tech-stack, tag, asset-type, content-type, dept, country
- [x] Presence 59 rows + DP2 credentials · Behance → vedanshu
- [x] Asset registry ~431 local files / ~472 Sanity assets · 85 R2 delta · ~514 MiB
- [x] 8 tool/platform icons from reference No-Code page
- [x] Framer services + about extraction: audit → Sanity why/tools/approach/SEO → Astro Sanity-first wire (+ Framer slugs)
- [x] Toolkit salvage (empty-alt icons): 89 tools copied; no-code 24 + experience 39 + shared eng stack
- [x] Full Framer/build audit doc (`docs/framer-full-audit.md`) — not full visual parity; keep reference/ + component/
- [x] **#43 Typography** — Kits weight hierarchy + `--ts-*`/`--fluid-*` on frontend (supersedes Framer-all-400); Display 800 / H1 700 / H2–H4 600 / labels 500 / body 400
- [x] **#16 type sweep** — remaining hardcoded rem/px/clamp font-sizes + line-heights → Kits tokens
- [x] **#16 spacing sweep** — padding/margin/gap rem → `--gap-*` / `--space-section-*`
- [x] **#18 About stats** — projects/brands from Sanity counts; years/retention Studio-ready via `items`
- [x] **Nav UI (§2 / component screenshots)** — yellow Let's Talk, Works label, expanding 698px mobile panel, contact/legal, light chip hamburger/×, active link state; FAQ remains in footer
- [x] Fast salvage pass: Framer **colour** token check + `--svc-*`, capture home/faq/work/blog/lead-gen/industries/subscription, SEO → Sanity, `/footer/industries`, lead-gen routing, home/work/blog SEO wire
- [x] Deploy to Cloudflare Pages — Framer service slugs live on wugweb.pages.dev
- [x] GitHub repo meta: description, homepage, topics (astro, cloudflare-pages, sanity, neon)
- [x] Governance: Rule 1 + Rule 2 + shared Neon + Author ≠ Owner + Notion seed + industry master model
- [x] Studio: Industry master under Global Settings; content uses `industryRef` / `client.industry`
- [x] Sitemap linked in footer
- [x] Industries linked in footer

---

## Data state (Sanity live, 2026-08-05)

| Type | Sanity | Neon | Notes |
|---|---|---|---|
| caseStudy | 82 | 90 (8 stale) | owner: 82 wugweb |
| post | 124 | 124 | owner: 96 wugweb + 28 WP imports; body all filled; coverPath 55 |
| person | 12 | 12 | Author byline ≠ owner |
| testimonial | 14 | — | LinkedIn recs for Vedanshu (source=linkedin, subject=vedanshu) |
| client | 110 | 110 | owner: 104 wugweb / 1 both / 1 vedanshu; +4 new (TheBizGift, MusicLinkd, Spark Logistics, Eastman Auto & Power) |
| industry | 66 | 66 | **Master** (Global Settings) |
| service | 19 | 19 | |
| singletonPage | 18 | 18 | |
| siteSettings | 1 | 1 | |
| syncStatus | 21 | 21 | |
| asset | 588 | 588 | owner: 187 wugweb / 366 both; 525 on disk, all R2-mapped, 0 unreferenced |
| taxonomy | 327 | 327 | tech-stack ~96 terms / **89** with iconPath; platform, tag, types, dept, country |
| platformProfile | 59 | 59 | Presence + credentials |
| engagement | 70 | 70 | |
| contactSubmission | 0 | 0 | #27 wired: `/api/contact` mirrors to Sanity |

**Local media:** `public/assets` (746 files incl. uncode/blog/vedanshu-personal) · R2 map **750 (0 missing)** · **cutover live** (`PUBLIC_USE_R2_ASSETS=1`).  
**Notion = seed only.** Do not reset Sanity to Notion.  
**Folders:** `component/` **deleted** (consumed); `reference/` kept as offline Framer archive (no further extraction needed).  
**Neon sync:** user-controlled — do not run `sync-sanity-to-neon.mjs` or `/api/sync` unless asked.

---

## Key decisions (pointer)

Full rules: [`governance.md`](governance.md).

- Neon shared SSOT (vedanshu + wugweb + `both`)
- Owner ≠ Author
- Industry master (Global Settings) ← content refs
- `reference/` / `component/` enrich by identity — `component/` consumed (delete-safe); `reference/` keep until service-media extraction done
- Rule 1 free-tier (incl. Sanity) · Rule 2 R2 ceiling
- Media path map: `public/assets/<path>` ↔ `/assets/<path>` ↔ R2 `assets/<path>`
- Full audit: [`docs/framer-full-audit.md`](docs/framer-full-audit.md)
