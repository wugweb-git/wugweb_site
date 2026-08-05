# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**Last verified:** 2026-08-05 (deep audit run; blog teaser thumbnails; asset path fixes; owner backfill live; R2 cutover; contact mirror; preview mode).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded).

---

## ✅ Completed (high level)

Infrastructure, Sanity Studio, main marketing routes, design tokens (**Kits `--ts-*` / `--fluid-*` + weight hierarchy**; colours from Framer S1), **#16 typography rem/clamp sweep** (pages + components → fluid/ts tokens), Framer→local assets, R2, content↔asset paths, Global Settings, Presence, asset registry, governance, Industry master, service Framer extract + **89** toolkit icons, footer Sitemap + Industries, page capture + SEO salvage, industries route, lead-gen routing. **2026-08-05 arc:** owner backfill (#40), Neon `both` entity (#41), Neon re-sync (owner-aware), blog teaser thumbnails, asset path case fixes, audit script repairs.

Scripts of note: `sync-global-config.mjs`, `sync-asset-registry.mjs`, `link-platform-tech-icons.mjs`, `map-assets-to-content.mjs`, `audit-framer-service-pages.mjs`, `extract-framer-service-pages.mjs`, `salvage-framer-toolkits.mjs`, `sync-framer-tokens.mjs`, `capture-framer-pages.mjs`, `salvage-framer-seo-pages.mjs`, `backfill-owner.mjs`, `sync-sanity-to-neon.mjs`.

---

## 🔴 Open — Critical / blocked

| Item | Status | Notes |
|---|---|---|
| Design token → component migration | Partial | **Type + spacing rem sweeps done.** Residual: one-off layout px / gallery vh clamps. |
| Frontend → Neon swap | Deferred | Helpers ready (`content.ts`, `NEON` queries); wait until UI/brand mapping done. **User: do not run Neon sync unless asked.** |
| Sanity token permissions | Soft | create/replace OK; some update/delete flaky. **Do not rotate unless user asks** |
| Contact form production reliability | Deferred to end | UI + Neon write path exist; Workers/Neon 500 risk deferred |

---

## 🟡 Open — Medium

| # | Item | Notes |
|---|---|---|
| 16 | Design token → component pass | **Type done** + **spacing rem sweep** (padding/margin/gap → `--gap-*` / `--space-section-*`). Gallery vh clamps kept where layout needs them. Residual: a few one-off layout px. |
| 43 | **Typography / fonts** | **Done — Kits hierarchy** — Display 800 / H1 700 / H2–H4 600 / labels 500 / body 400; `--ts-*` / `--fluid-*`. |
| 17 | Service detail rich sections | **Done (Framer extract)** — Why Us / toolkit(+icons) / approach from Sanity; Framer slugs routable |
| 18 | About page | SEO + values from Sanity; stats: **projects** = caseStudy count, **brands** = client count; years/retention need Studio `items` (no invented figures). Stack chips use tech `iconPath`. |
| 20 | Contact form | Deferred production harden (see critical) |

---

## 🔵 Open — Near-term content / data

| # | Item | Notes |
|---|---|---|
| 42 | **Reference/component enrichment** | **Partial** — nav UI from `component/Nav Bar *.png` + design.md §2 wired (yellow CTA, Works label, 698px mobile panel, contact/legal, staggered hamburger). Still open: Framer motion/code components, full layout parity, FAQ body answers. **Keep `reference/` + `component/`.** |
| 23 | Blog body gaps | ~75/96 posts have body; ~21 still need Studio content |
| 30/covers | Blog covers | 43/96 have `coverPath` (21 unique images, all on disk + R2) |
| 25 | Team photos | Verify on deploy; historically Framer CDN hotlinks |
| 32 | Legal / SEO pages | privacy, terms, refund — hardcoded, not Sanity |
| 33 | R2 cutover | **Done 2026-08-05** — all 512 local files mapped + live (81 tools gap uploaded); `PUBLIC_USE_R2_ASSETS=1` set in `wrangler.jsonc`. |
| 34 | Case studies without media | CSV-only clients (Bodyshop, Paragon, etc.) |
| — | Neon re-sync | **Ran 2026-08-05** — 1430 docs owner-aware (asset 553, taxonomy 327, platformProfile 59, syncStatus 21). **Do not re-run unless asked.** Neon audit findings: 8 stale caseStudy rows, `[object Object]` slug bug in older rows, empty `content_relations`. |
| 22 | Preview mode | **Done** — middleware reads `__sanity_preview` cookie → `locals.previewToken`; `/blog/[slug]` uses `getPreviewClient(token)` for draft content. Other pages can opt in the same way. |
| 27 | Contact → Sanity | **Done** — `/api/contact` mirrors each submission into a `contactSubmission` doc (best-effort) so leads show in Studio; Neon write unchanged. |
| — | Audit residuals | 13 assets were missing-on-disk → **6 path-fixed in Sanity**; 7 remain (5 Generated SVG + `more/home/Home.mp4` case). 22 disk files unreferenced in Sanity (framer case-study images + more/ videos). |

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
| post | 96 | 96 | owner: 96 wugweb; body ~75; coverPath 43 |
| person | 12 | 12 | Author byline ≠ owner |
| client | 106 | 106 | owner: 104 wugweb / 1 both / 1 vedanshu |
| industry | 66 | 66 | **Master** (Global Settings) |
| service | 19 | 19 | |
| singletonPage | 18 | 18 | |
| siteSettings | 1 | 1 | |
| syncStatus | 21 | 21 | |
| asset | 553 | 553 | owner: 187 wugweb / 366 both; 6 paths fixed |
| taxonomy | 327 | 327 | tech-stack ~96 terms / **89** with iconPath; platform, tag, types, dept, country |
| platformProfile | 59 | 59 | Presence + credentials |
| engagement | 70 | 70 | |
| contactSubmission | 0 | 0 | #27 wired: `/api/contact` mirrors to Sanity |

**Local media:** `public/assets` (512 files) · R2 map **512 (0 missing)** · **cutover live** (`PUBLIC_USE_R2_ASSETS=1`).  
**Notion = seed only.** Do not reset Sanity to Notion.  
**Folders:** keep `reference/` + `component/` (see `docs/framer-full-audit.md`).  
**Neon sync:** user-controlled — do not run `sync-sanity-to-neon.mjs` or `/api/sync` unless asked.

---

## Key decisions (pointer)

Full rules: [`governance.md`](governance.md).

- Neon shared SSOT (vedanshu + wugweb + `both`)
- Owner ≠ Author
- Industry master (Global Settings) ← content refs
- `reference/` / `component/` enrich by identity — **keep both; do not delete**
- Rule 1 free-tier (incl. Sanity) · Rule 2 R2 ceiling
- Media path map: `public/assets/<path>` ↔ `/assets/<path>` ↔ R2 `assets/<path>`
- Full audit: [`docs/framer-full-audit.md`](docs/framer-full-audit.md)
