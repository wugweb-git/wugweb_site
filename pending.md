# Pending — wugweb.com rebuild

Keep this file synced. Before any new session, read this first. After significant work, update it.

Also read: [`governance.md`](governance.md) (Rule 1/2, ownership, Notion seed, industry master) · [`CLAUDE.md`](CLAUDE.md).

**2026-11-19: wugweb-work Part 2, step 5 landed; step 8 docs started. ON MAIN (`4b834c9`).**
- Resolver `src/lib/case-layout.ts` and 18 components under `src/components/work/` plus `CaseBlocks.astro` (the switch). W3C APG rail and `<dialog>` lightbox client logic. Unlinked preview route at `/work/preview/<slug>`.
- Gate script `scripts/check-case-page.mjs`: 15 checks per the plan's D1. Uses `node-html-parser`. JSON-LD check is `n/a` unless `--host <canonical>` is passed.
- CSS guard `scripts/check-case-css.mjs`: `.case-*` selectors may only live in `src/components/work/*.astro`. Legacy `/work/[slug].astro` exempted by name until the flip. Wired into `prebuild`.
- Block doc `kits_design_system/docs/blocks/case-study.md` and the case-study section added to `kits_design_system/docs/components.md`.
- 57 tests pass; `npm run build` succeeds.
- Next, open: step 4 Sanity sync (blocked on a new `NOTION_TOKEN`; current one returns 401); step 6 previews on the 8 slugs via `/work/preview/<slug>` (owner-review in the pane); the flip from the legacy template to the thin one (owner decision, 2026-11-19: waits for step 6); step 7 skill eval loop (waits for the owner to set the eval workspace up).
- Step 3b visual read: not owner-gated per case study (owner clarification, 2026-11-19). It runs when the skill is invoked on a case study; the skill reads the source then.

**2026-11-19: API keys and secrets standard. ON MAIN (`c46bae1` then follow-up), owner rules applied.**
- The one home: [`docs/skills/SECRETS.md`](docs/skills/SECRETS.md). The standing-rules file points there; four skill mirrors synced byte-identical (wugweb-work, wugweb-voice, wugweb-seo, wugweb-kits). wugweb-work outputs regenerated; validate 30 checks, 0 errors.
- [`governance.md`](governance.md) gains Rule 3 next to Rule 1 and Rule 2.
- Repo tracks [`.env.example`](.env.example) with every environment variable name used, placeholders only. `.gitignore` keeps `.env` and `.env.*` out.
- Owner rule, 2026-11-19: a key that reaches a chat, a file, a log or a commit is not echoed, written or sent further. What happens to that key after is the owner's call. No key rotation, never. (Earlier draft of SECRETS.md had a rotation section; removed in the follow-up commit.)
- Three OpenRouter helper scripts live at `scripts/openrouter-chat.mjs`, `scripts/openrouter-vision.mjs`, `scripts/openrouter-audit-case.mjs`. Each reads the key and model from the environment, blocks paid routes at the code level (model must end `:free`), exits 2 on missing env or arguments. Smoke tests pass; no live calls made (no key set in this session).
- Open: Notion registry page "Wugweb Skill Management System" does not yet carry the new standing-rules clause. Owner updates when ready (project rule: Notion only when asked). wugweb-work 0.5.0 zip re-upload to the registry is also owner's choice; the repo master is the source of truth.
- Not scoped to this change: wugweb-work Part 2 steps 4+ (Sanity schema, GROQ, resolveLayout, 18 Astro components, thin template, rail and lightbox, QA, running the 14 evals, 8-slug previews, docs and ship). Each step still needs per-step owner-go per the Notion plan.

**2026-11-19: `wugweb-brand-os` skill. 0.3.2 ON MAIN, same shape as the other Wugweb skills; carries a marked copy of the standing rules.**
- One source of truth: the Notion page "wugweb-brand-os" under Wugweb HQ / Wugweb Skill Management System (https://app.notion.com/p/41abb710b9ab8194bb13f85540dd87aa); repo mirror `docs/skills/wugweb-brand-os/PLAN.md`. Do not copy the plan into this file. The brand-os session keeps both (coordinator handover 2026-11-17).
- Waiting on the owner: legal name (Notion terms of use say "Wug Web Services Private Limited"); positioning line (seven candidates); audience; official profile links; team size, projects and markets figures; logo mark construction and live type; Visual OS and Brand Strategy documents and nine images; upload of the 0.3.2 `wugweb-brand-os.skill` (0.3.1 is installed in the app). These open items are filled through use, by the owner's approval (2026-11-19), not chased. For `wugweb-kits` and `wugweb-work`: eval 38 finds nine brand-os rules restated in their files; each should point to brand-os instead. The unused `public/brand/wugweb-mark.png` was deleted on 2026-11-18 (469c08f5).
- For `wugweb-work`: one eval names "ToT Bridal" although the client is under NDA.

**2026-11-17: Sanity audit fixes (items 3-7, 13-14, 17, 21-32). DONE: on main (`79487fda`) and live on UAT.**
- Backend: `/api/sync` fails closed, own secret `NEON_SYNC_SECRET`, type allow-list, size caps, owner now updates. `/api/preview` takes `PREVIEW_SECRET` (no token in URL or cookie), same-site redirects only. Anonymous pages cached 60 s at the edge (Workers Cache API, free); preview responses `no-store`. JSON-LD escaped. `/work/[slug]` other-cases in one query.
- Studio: upgraded sanity 3.99 to 6.23.0 with React 19.3, @sanity/table 3.1.21, @sanity/ui 4 subpath imports. Smart typography turned off (it writes dashes). Publish/Duplicate/Archive fixed, singletons locked, Kits / Trust badges publishable (initial value templates), View on Site uses `route`, dashboard date tiles fixed, desk in CLAUDE.md order with Brand Assets and Experiments. TypeGen: `npm --prefix sanity run typegen` writes `sanity.types.ts` (schema types only; queries are not `defineQuery` yet).
- Schema: `extraMedia` and `subtitle` declared; empty unused SEO/AI fields removed; `schemaType` deprecated; SEO length warnings (60/160).
- Data: 13 stale page drafts discarded, backup `backups/stale-singleton-drafts-2026-11-17.json`.
- Edge cache fix (`7bfb9ff3`): `79487fda` returned the cached Response as is on a hit, its headers are immutable, so every repeat GET was a 500. Now returns a copy. Checked on UAT: repeat GETs of /, /about, /work, /blog, /services, /contact-us all 200. No test covers the cache yet.
- Hosted Studio deployed by the owner (wugweb.sanity.studio, 6.23, schema 1 of 1). Studio appId pinned in `sanity/sanity.cli.ts` (`535a881c`). Notion Deploy Log updated.
- Owner to do: set `NEON_SYNC_SECRET` and `PREVIEW_SECRET` on Pages (until then both routes return 503); item 28 (Sanity-hosted media and the orphan `project` doc) waiting on a decision. `wip/embedded-studio` pins sanity 3.99 and now conflicts with the 6.23 Studio.

**2026-11-17: Notion restructured (Cowork).** Hub "Wugweb Website" rewritten (status, ordered plan, content sources, skills, sub-page index); Pending, Route & Content Inventory, Health & Audits, Deploy Log, Sanity and Overview updated or marked superseded; Industries spec moved to its own sub-page. Nothing deleted (Notion page history keeps every earlier version). Sanity counts were not refreshed (Sanity unreachable from that session). The Wugweb SEO page was left to its own session.

**2026-11-16: Open from the industries / blog / media session. All shipped work is on main and live on UAT. Waiting on the owner:**
1. Blog covers: 92.5 MB across 103 files (48 PNGs over 1 MB). Smaller R2 copies need owner OK (no-uploads rule).
2. 66 legacy industry records with no sector: merge or delete.
3. Case-study Services: not synced from Notion to Sanity yet.
4. Logo band: the 14 colour logos render smaller than the grey ones (padded 1500x876 canvas).
5. `wip/embedded-studio`: pushed to GitHub, merge to main waits for owner approval. Also needs the owner to add `https://uat.wugweb.com` (later `https://www.wugweb.com`, credentials allowed) to the Sanity CORS list.

**2026-11-14: Case study rebuild and the `wugweb-work` skill. SKILL BUILT (0.5.0), PLAN APPROVED, PART 2 STARTED ON A BRANCH.**
- One source of truth: the Notion page "wugweb-work" (until 2026-11-16 titled "wugweb-work skill: plan (final for vetting)") under Wugweb HQ / Wugweb Skill Management System (https://app.notion.com/p/415bb710b9ab818b8057cc9b2c2ed922). Do not copy the plan into this file; update the Notion page.
- State: plan is final. The skill is built (Part 1): repo master `.claude/skills/wugweb-work/` at 0.5.0 (2026-11-17); the app copy is the owner's upload of the zip. Evals in the repo, run and graded 2026-11-17. Part 2 step 2 (parser v2) is on branch `case-body-v2`, not on main; its merge waits for the owner's go. No Sanity write, no case-study row changed in Notion.
- Done, read-only: three research reports (`docs/research/case-study-system-2026-10-19/`), the NTUC U Care reference audit and the NTUC Body Content v2 proposal (both on the Notion page).
- The 2026-10-19 bento layout on `/work/[slug]` (item 8 below) is being replaced under this plan. Do not rework that page outside the plan.
- Waiting on the owner: approval after vetting; NTUC inputs (results with source, live URL, number of builder steps); a working `NOTION_TOKEN`.
- `docs/skills/wugweb-work/PLAN.md` is the export of the Notion page for other tools (do not edit it; re-export after the Notion page changes). After approval: step 0 of the plan.

**2026-11-17: `wugweb-seo` skill. PLAN ONLY, waiting for the owner's vetting.**
- One source of truth: the Notion page "wugweb-seo" under Wugweb HQ / Wugweb Skill Management System (https://app.notion.com/p/41abb710b9ab818b8481d42beb053fef). Do not copy the plan into this file; update the Notion page. The repo mirror is `docs/skills/wugweb-seo/PLAN.md`.
- State: version 2.4.1, repo master at `.claude/skills/wugweb-seo/`; the app copy reads 2.4.0 until the owner re-saves it. Planned, not built: the Rank Math on-page keyphrase score (broken into functions for `scripts/score-page.mjs`) and the internal-link SEO checks. The 83 Rank Math PRO features are mapped and translated to the Astro stack.
- Score uses the real Rank Math weights (`seo-by-rank-math` 1.0.280). Power words use a public list; sentiment uses AFINN-165, English only. Do not edit `SKILL.md` from here; the skill is the dev session's (`cse_01UQ9TRqokKf1xMCS1JD3brM`).
- Waiting on the owner: the list on the Notion page (re-save the app copy to 2.4.1, supply `evals/evals.json`, schema for service, home and about, title limits, training bots per property, connector sign-in, standing-rules block vs pointer). A recommendation is recorded beside each.
- RankWeb is a separate WordPress plugin (Animal Writes) with its own Notion page and a Rank Math score reference; it is not in this repo.

**2026-10-21: Header and nav bar spec, root scale, deploy facts. DONE, live on uat.wugweb.com (81cc95d2).**
- Names (owner): "header" is the whole sticky section; "nav bar" is the grey box inside it.
- Formula: button 44 (10 + 24 line + 10, `--control-size`) + 12 + 12 = nav bar 68 on every breakpoint. Header is derived, never set: 68 + 2 x header padding = 100 mobile (16), 108 tablet and desktop (20). Buttons 16px text, 10 / 12 padding, 12 gap; logo 40; bar inset 12. Tablet side padding is 20 (was 32). Spec in `kits_design_system/docs/tokens/layout-shell.md`.
- Root font fixed at 16px (4bbca720). It used to grow above 1440px (`clamp(16px, 100vw/90, 24px)`), which inflated every rem size site-wide (nav logo 49px at 1760px). This is site-wide, not nav-only. Wide-screen scaling is a phase 2.0/3.0 discussion with the owner.
- Breakpoints to test: 375 / 768 / 1200 (desktop is 1200).
- Verified on UAT 2026-10-21: all 162 sitemap URLs return 200; nav measured at all three widths.
- Deploy facts (corrected 2026-10-21): GitHub auto-builds do NOT skip commits. The free plan builds one at a time, so close pushes queue and a build can land ~15 min after the push. Do not `wrangler pages deploy` over a queued build: an older build finishing later replaces it (089f1e5c's build briefly undid 4bbca720 this way). After a push, wait for that commit's own `github:push` build to show success, then check the live CSS on uat. Wrangler works through the owner's OAuth login (account 76fe2175…).
- Dead tokens in `.env` (owner to rotate): `CLOUDFLARE_API_TOKEN` (Invalid API Token) and `NOTION_TOKEN` (invalid). Scripts that read them (R2 object listing, `sync-notion-*.mjs`) fail until replaced. Sanity token works (editor).
- Embedded Studio at `/admin` (branch `wip/embedded-studio`, pushed 2026-11-17, not merged; commits 35ec86a4 deps, 04df1b11 wiring). `@sanity/astro` with `studioBasePath: '/admin'`, noindex via `X-Robots-Tag`, disallowed in robots, excluded from sitemap and the redirect and 404 logger, not linked. Measured against main: Worker 3096 KiB to 3160 KiB (+64 KiB, free limit 64 MiB), files 68 to 71 in the Worker, dist 125 to 147 files, largest file 1.4 MB to 5.1 MB (limit 25 MiB), build 14 s to 41 s (limit 20 min). Public page weight identical on `/`, `/about`, `/services`, `/work`, `/blog`, `/contact-us`; all 162 sitemap URLs return 200; tests pass. Checked 2026-11-17 in Chrome on localhost:3333: sign-in, Dashboard, Tables, Media and the post editor all work, no console errors. Dashboard counts (103 posts, 44 case studies, 6 services, 1971 assets) differ from the CLAUDE.md content table (124, 82, 19, 553); cause not checked. Do not merge to main without owner approval.

**2026-10-19 — Homepage logo band. DONE.**
- Live on wugweb.pages.dev: 28 logos in the band, in order, all loading. Each client's `bandLogoPath` points at a file already in R2 (nothing copied or uploaded, owner rule): 14 colour originals `assets/logos/NN_Name.png`, 14 grey copies `assets/logos/grey/<slug>-300w|150w.png` (Acko and Cartier stay on 150w grey). `logoPath` untouched.
- Sanity: 22 clients patched, 6 created (ITC Limited, Airtel, AG&P, iMedia, MDA, Surya — names from the logo files, owner to check), 8 unflagged (RideEV, Airtel XSafe, Valyu.ai, Plufo, Axis Bank, Bankco, Gratifi, Kia). Backup `backups/sanity-pre-logo-band.json`. 1.4s after the first apply, something under the owner's Sanity login `createOrReplace`d 7 of the clients and wiped the band fields; re-applied, 28/28 held.
- Studio deployed (`bandLogoPath` / `bandOrder` visible). Nav at 2000px: bar 1280px centred, content 1200px.
- `owner-copy-band-logos.mjs` deleted (uploads are banned).
- Open: the 14 colour originals sit on a padded 1500×876 canvas, so they render smaller in their tiles than the grey ones.

**2026-10-19: Blog post layout, poster fix, audits.**
- Posters: `posterFor()` now resolves service clips to `site/services/<pillar>/posters/<file>.webp` (b47be4ee). Homepage Strategy and Operations tags no longer 404.
- Fixed 2026-10-21: /about and /services pointed at pre-reorg `more/` keys; now `site/about/about_5.webp`, `site/about/about-7.mp4`, `site/services/service_benefit_6.webp` (existing R2 files).
- Delinked 2026-10-21 (owner): `industryRef` unset on the 19 case studies (+13 drafts) that pointed only at legacy sectorless industries. Backup `backups/sanity-pre-legacy-industry-delink-2026-10-21T15-32-48-459Z.json`.
- `/blog/[slug]`: Fabrica-style split at lg (sticky cover 5/12, reading column 7/12), one column at sm/md; related posts use PostCard. Tokens `--article-*` (sm/md/lg). Spec: `kits_design_system/docs/blocks/blog-post.md`.
- Blog covers are 92.5 MB across 103 files (48 PNGs over 1 MB); /blog decodes slowly. Needs smaller R2 copies (owner decision: no new uploads).
- Industry icons: 0 of 45 industries have an icon in Notion or Sanity (Notion Industry "Icon" is a URL field). Sectors: Notion and Sanity match on all 17 (icons, showcase ticks, order, lines) and all 45 industry links and card ticks.

**2026-10-19: Industries page rebuilt as a static showcase (PR #2, merged 252fa40c, live on UAT).**
- `/footer/industries`: hero (owner H1 and lead, Lucide diagram of the 8 showcase sectors), 17 sector rows (`#<sector-slug>`, muted number, name, sector line, every industry as a plain label), cross-industry, "Don't see your industry?", final CTA. All sectors, lines, icons and industries come from Sanity; the page hardcodes none.
- Removed: the 9 hardcoded groups, 34 buttons, alias map, `industryPreviews`, drawer, search, filters, case-study query and capability matrix. Cross-industry em-dash is now a comma.
- SectorShowcase cards link to `/footer/industries#<sector-slug>`.
- Components: `src/components/industries/IndustriesHero.astro`, `SectorRow.astro` (+ stories). Lucide loader moved to `src/lib/lucide.ts`. Spec: `kits_design_system/docs/blocks/industries-directory.md`.
- "View our services" on "Don't see your industry?" now links to `/services` (owner decision 2026-10-19).

**2026-10-19 — Industry and sectors check (read-only, nothing changed).**
- Sanity has **111** industries, not 66: 45 were created today (`industry-IND-27`…) by another session. **28 names exist twice and share the same slug** (Mental Health, Logistics, Banking, SaaS, …). Content mostly moved to the new copies (26 of 28 pairs), and 5 old copies are still referenced too. Needs the owner to pick one set and merge.
- **Icons:** none anywhere. 0 of 111 industries have `icon`, `iconPath` or `linkedAsset`; no industry icon files in R2; the page and homepage show text only.
- **Sectors:** no sector field in Sanity. The 9 sector groups and 34 sub-industry buttons on `/footer/industries` are typed into the page. Buttons link to case studies by industry slug (+ aliases): 18 of 34 show real work; 16 are empty (aviation, construction, d2c, diagnostics, energy, healthcare, impact, insurtech, music, pharma, platforms, retail, services, sports, travel, wellness). 16 industries that do have case studies have no button (events, smart-home, beauty-personal-care, digital-finance, fashion-lifestyle, mental-health, blockchain-web3, petrochemicals-waste, gig-economy, mobility, hotels-restaurants, renewable-energy, food-beverage, architecture-interiors, design-technology, advertising-marketing).
- Case studies with an industry: 44 (all 44 published).

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
Resolved and verified: all 103 posts have a cover; 0 Framer URLs in Sanity and none in live `og:image`; 0 image assets missing alt; old Airtel logo keys and the 10 VSB banners are gone from R2; nav bar 68 / header 100 mobile, 108 tablet and desktop / 40px logo (`layout-shell.md`).
Still open:
1. ~~blog1/blog3~~ Done 2026-10-14: both deleted (crops of the 0072 / 0053 covers) with their 2 asset records.
2. ~~Shared service clips (the 2 flagged groups)~~ Done 2026-10-14: new clips from unused R2 videos for strategy/ai-readiness-assessment (`unsorted/ggt3onRY2bwahSVu.mp4`), operations/product-optimization (`unsorted/3q0z9N9vBgdAAdWC.mp4`), operations/qa-and-test-automation (`unsorted/viTy_9OHBd_a1M55.mp4`), posters regenerated. **Done 2026-10-14: all 61 sub-services have their own clip** (17 more copied from unused R2 videos into their slot files, posters regenerated; 61 slots = 61 distinct clips, all service pages 200). The 20 duplicate source clips were deleted by the owner (`scripts/owner-delete-clip-originals.mjs`, ~110 MB, with their 20 asset records).
3. ~~Brand & Strategy~~ Done: Brand and Strategy are two separate topics. Any new Notion category must also be added to the `topic` list in `sanity/schemaTypes/post.ts`.
4. Blog sync is manual: `node scripts/sync-notion-blogs.mjs` (dry run) then `WRITE=1`. Automating it (GitHub Action or a local schedule) was offered, not decided.
5. ~~Obsolete owner scripts~~ Removed (Airtel and VSB delete scripts; targets already gone).
6. R2 reorganisation is DONE (other session, 34 verified delete batches): `framer/`, `uncode/`, `more/`, `about/` are gone; media lives in `assets/work/` (967), `blog/` (369), `assets/site/` (210), `assets/logos/` (257). Bucket 2,282 objects / 1.55 GiB (2026-10-14). The 2026-10-12 plan (`backups/asset-reorg-plan.csv`) is obsolete — ignore it. **Left to sort: `assets/unsorted/` — 300 files, 348 MiB.**
7. Not investigated (owner: leave it): the first request after a Pages deploy sometimes 404s, then 200 on retry.
8. ~~Uncommitted case-study body work~~ **Shipped 2026-10-19 (owner: deploy):** `/work/[slug]` renders the Notion body (`bodyMarkdown`) via `src/lib/case-body.ts`. Live: all 44 case studies 200, no Framer URLs; 37 have a body, 7 without one keep the old layout (bodyshop, eastman, hyatt, musiclinkd, pharmadropper, spark-logistics, thebizgift). `scripts/.tmp-cands.mjs` left uncommitted (one-off scratch). The `wip/case-study-body` branch is now superseded.

**Case-study SEO/AEO audit (2026-10-13):** 35 Notion rows fixed + synced (avg keyword score 67→88, none <70; brand spellings Metcred, Inkompass, ToT Bridal, Valyu.ai). Code: BreadcrumbList on case studies; cookie banner headings no longer jump h2→h4. **Hidden from search (Sanity `noIndex`, backup `backups/caseStudy-noindex-before-2026-10-13.json`) until real copy exists:** Bodyshop, Eastman, Hyatt Restaurants, PharmaDropper (pages show NTUC U Care's copy) and Spark Logistics, TheBizGift, MusicLinkd (placeholder "Complete original markdown…"). Unset `noIndex` once Notion Body Content is written and synced. **Owner content to add in Notion:** Results (7/44 filled — main AEO gap), Cover/Client Logo Alt on CS-014/021/022/023/025/027, Engagement Type, Primary Discipline (CS-010), Platform (CS-043); Client Logo column holds Framer URLs on 19 rows (Framer goes away); CS-037 subtitle/body/tags still say Framer. Owner: Last Updated not needed; Assets, Publications, Published At, Published On are important — keep.
**Notion field fill (2026-10-13, owner approved):** 40 rows written. Client Logo: 19 Framer URLs → R2 (Sadhan corrected to its own logo; Inkompass to `/assets/work/inkompass/client-logo-9fd5.png`). Cover/Client Logo Alt on CS-014/021/022/023/025/027. Results on 30 rows, taken only from each case study's own Sanity impact copy (Gratify's 4 real metrics; Woodkraft's 580+ projects); not invented. Engagement Type = Client on 7; Primary Discipline CS-010 = Product Design; Platform CS-043 = Web Platform. CS-037 Framer mentions kept (owner). Backup `backups/notion-case-studies-fields-before-2026-10-13.json`. Sanity: Sadhan client logo fixed (was ToT's); 19 case studies' Framer clientLogoPath/ogImage/coverImage replaced with R2 or cleared where an R2 version exists (backup `backups/sanity-framer-fields-before-2026-10-13.json`) — 0 Framer URLs left in Sanity case studies. **Still open:** Results for the 7 hidden pages (need real copy first).
(5) 17 Sanity drafts not in Notion (mostly old long-slug drafts). Listed, never deleted.

**2026-10-13 — DNS cutover prep (cutover itself NOT done, on hold).** Verified on `wugweb.pages.dev`:
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

**Last verified:** 2026-08-30 (**Sanity Studio Advanced Suite & Interactive Topology** — Native `r2AssetSource` custom asset source implemented for direct image/file picking from 550+ R2 catalog; `PreviewDocumentAction` custom action added for instant live site previewing; `CopyArticleAction` custom document action added for 1-click Markdown, Plain Text, and JSON export; `ArticleExportTool` studio tool created; `GraphTool` interactive reference topology visualizer with spring physics & pan/zoom; `@sanity/code-input` and `@sanity/table` plugins installed; custom `StudioLogo` lockup and `StudioNavbar` quick action toolbar integrated; `blockContent` enhanced with `callout` alerts, `quoteBlock` testimonials, `comparisonTable` grids, `internalLink` reference annotations, and `highlight` mark decorators; `PortableTextRenderer.astro` updated with fluid glassmorphic rendering; `scripts/populate-missing-covers.mjs` matching tool created; Sanity smoke suite 19/19 ✅; Astro & Studio builds passing with 0 errors ✅).

Authoritative Framer/build matrix: [`docs/framer-full-audit.md`](docs/framer-full-audit.md). Kits type roles: [`design.md`](design.md) §3 (+ C-6 superseded). Design system (single source of truth): [`kits_design_system/`](kits_design_system/) — `docs/design.md` + `docs/tokens/`.

---

## ⚡ What is actually pending — *2026-09-28*

Everything below this block is history; **this is the live list.** Full detail
in §1s and `~/.claude/plans/snoopy-splashing-pearl.md`.

**Added 2026-10-12:** run `bash scripts/owner-delete-old-vsb-banners.sh` (10 VSB banners + their asset records, copies live under `blog/<slug>/`). Framer `og:image` hotlinks on 19 case studies need `ogImagePath` set (see CLAUDE.md debt #3). Duplicate Airtel logo asset records left in place: `asset-logos-client-logo-c6rj-png`, `asset-framer-airtel-xsafe-securing-homes-with-intuitive-digital-experiences-client-logo-c6rj-png`, `asset-logos-client-logo-8gyg-png`, `asset-framer-airtel-xstream-play-digital-entertainment-ux-web-design-client-logo-8gyg-png`.

**Added 2026-10-13 — redirects:** the `redirect` type works (middleware + `src/lib/redirects.ts`) but 0 redirect docs exist and none are wanted: owner decision, one URL per page, no Framer or legacy-slug redirects.

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

## History removed 2026-11-19

The finished history that sat below this point (the 2026-09-24 Framer notes and sections 1 to 1ab, about 1,300 lines) was cut on 2026-11-19. It is in git: `git show a4950eb3:pending.md`.

The open leftovers found in that history are listed in [`docs/skills/wugweb-engineer/WEB-ENGINEERING-SESSION.md`](docs/skills/wugweb-engineer/WEB-ENGINEERING-SESSION.md), under "Open leftovers found in the pending.md history". Skill plans are in `docs/skills/<skill>/PLAN.md`.

---

## ⏸️ Deferred

| Item | Status | Reason |
|---|---|---|
| Homepage chat hero | ⏸️ Deferred | Keep video hero |
| Hyperdrive / SESSION KV | ⏸️ Deferred | Only if runtime needs |
| footer/subscription | ⏸️ Deferred | Payment gateway scoping |
| Credential rotation | ⏸️ Deferred | Unless user asks |

**Added 2026-11-25 — Storybook:** one published Storybook at https://wugweb-git.github.io/wugweb_site/ (GitHub Pages, noindex), rebuilt from main by `.github/workflows/storybook.yml` on pushes that touch components, tokens, `/kits` or `.storybook/` and weekly. 41 components, 41 stories (22 added: the 19 case-study components, `CaseBlocks`, `JsonLd`, `PostCard`; sample data in `src/components/work/story-fixtures.ts`, images already in R2). `scripts/check-storybook-sync.mjs --strict` fails the run on a missing story, an orphan story, token drift or an undefined token on `/kits`. `/kits` and Storybook both stay. Open: set the weekly cron if the owner wants a different day.
