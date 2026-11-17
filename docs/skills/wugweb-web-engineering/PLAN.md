# wugweb-web-engineering: status and pending

> Last updated 2026-11-17 by the wugweb-web-engineering session.
> Notion record: https://app.notion.com/p/41abb710b9ab812e8370da0ebf13f46f
> Registry: https://app.notion.com/p/41abb710b9ab81a38ca7fbd947b47298

## 1. What this is

| Field | Value |
|---|---|
| Name | `wugweb-web-engineering` |
| Type | Not a skill. A working session for Sanity, data and site-code changes that the skill work throws up. |
| Decided | Owner, 2026-11-16: engineering is not a skill for now. Build, deploy and git rules stay in `CLAUDE.md`. |
| Owns | Sanity schema and data fixes, the Notion to Sanity sync scripts, R2 media rules, tests, build guards, preview and deploy, free-tier limits, git workflow. |
| Does not own | What a page says (`wugweb-work`), planning (`wugweb-strategy`), voice (`wugweb-voice`), brand (`wugweb-brand-os`), tokens and layout (`wugweb-kits`), search rules (`wugweb-seo`). |
| Part 2 of the case-study plan | Not here. It runs as an ordinary build plan in another session, on its own branch. |

## 2. Decisions on record

| Date | Decision | By |
|---|---|---|
| 2026-11-16 | Engineering is not a skill for now. | Owner |
| 2026-11-16 | FAQ blocks on service pages and blog posts only; never on case studies. Schema types fixed: `CreativeWork` for case studies, `BlogPosting` for posts. | Owner, `wugweb-seo` |
| 2026-11-17 | Sanity and data questions: "let strategy decide". | Owner |
| 2026-11-17 | Stored `aiSummary` and `schemaType` on the 44 case studies and 91 posts are kept; nothing deleted. No new `aiSummary` until a page shows it. | `wugweb-strategy` |
| 2026-11-17 | No `faqs` field on posts until a post has an owner-approved question list. | `wugweb-strategy` |
| 2026-11-17 | The 10 `/faq` questions stay typed in `src/pages/faq.astro`; only service-page FAQs move to Sanity. | `wugweb-strategy` |
| 2026-11-17 | `/kits` is exempt from the FAQ rule (design-system documentation). | `wugweb-strategy` |
| 2026-11-17 | Training bots are allowed on wugweb.com. | Owner, via `wugweb-seo` |

Options compared for how Sanity and data work is governed, answer still "hold": (a) no skill, tidy `CLAUDE.md` and add one runbook `docs/sanity-data.md` (recommended); (b) a narrow data and CMS skill; (c) the broad engineering skill.

## 3. Done

| Item | Result |
|---|---|
| F. Dashes removed from visible copy | On main as `ce8be99e`. Six FAQ answers (Brand 2, 5, 8; Experience 7; Growth 2; `/faq` "Do you work with startups?"), the app name in `manifest.webmanifest`, the site-name and copyright fallbacks. Built, 86 unit tests pass, each changed page returned 200 twice on the local preview. Live check on uat pending the Cloudflare build. |
| Staging 500 on repeat page loads | Cause found by this session: the 60 second page cache added to `src/middleware.ts` in `79487fda` returned a cached response with locked headers. Fixed by the Sanity audit session in `7bfb9ff3`. Verified healthy on uat and pages.dev. |
| Old-doc check | Findings from `content-inventory.md`, `code-map.md` and the September UI spec checked against main, Sanity and uat (section 6). |
| Stale markdown review | Verdicts sent to the coordinator, who removes and updates the files. |

Overtaken by other sessions' work, no action needed: the `faqs` field wording and item shape on site pages (the field was removed in `79487fda`); the `pending.md` skill version lines.

## 4. Pending, each on the owner's go

| # | Change | Touches | Backup | Undo | State |
|---|---|---|---|---|---|
| B | Remove the FAQPage option from the site-page type list | One line in `sanity/schemaTypes/singletonPage.ts`, then the owner's Studio deploy. No document uses it. | Git history | Revert, redeploy | Waiting for go |
| A | Stored `schemaType` `TechArticle` to `BlogPosting` on 19 posts | Sanity data, one field on 19 posts. No visible change: the post page already outputs `BlogPosting`. | JSON of the old values in `backups/` first | Restore from the backup | Waiting for go |
| G | Fill `service.faqs` on the six service documents from the approved rows in `docs/skills/wugweb-strategy/FAQ-REVIEW.md` (41 kept plus the 6 dash-fixed; shape `q` / `a`) | Sanity data, six service documents | JSON backup first | Restore from the backup | Waiting for go. The 10 "answer again" rows wait for the owner's facts. |
| H | Replace `NOTION_TOKEN` in `.env` | Owner's step. Notion returned 401 on 2026-11-17. None of the three `sync-notion-*.mjs` scripts can run until it is replaced. | n/a | n/a | With the owner |
| I | A test for the 60 second page cache | New script: start the local preview, request the same page twice, fail unless both are 200 with a full page. Run by hand before a deploy, not in the Cloudflare build. | Git history | Revert | Proposed |
| J | `pg` in `package.json` | Keep it (two local scripts need it: `apply-schema.cjs`, `sync-sanity-to-neon.mjs`) and correct the `CLAUDE.md` line that says it is unused | Git history | Revert | Proposed |
| K | Unused brand files in `public/brand/` | `og-default.png` (965 x 306, no longer the default share image), `favicon-16`, `favicon-64` (really 648 px), `apple-touch-icon`, `wugweb-mark`, `trust/topdevelopers`. Recommendation: leave them; removal is a delete and needs a yes. | Git history | Revert | Proposed |
| L | Content flags still true from the September spec | Hand to `wugweb-work` and `wugweb-kits`: MusicLinkd has no thumbnail; IndusInd Bank uses the IndusNinja logo; Bankco, Gratify and Adneto share one logo; the "Trusted by" heading sits inside the logo list; home services DOM order is 01, 03, 06, 02, 04, 05. Not re-checked by this session. | n/a | n/a | Proposed |

The 19 posts in A: AI Meets Design Systems; AI-Assisted Wireframing; AI-Powered UX Research; Accessibility is Good Product Design; Design Systems Beyond UI Kits; Designing AI Workflows; Designing Better SaaS Products; Designing Products That Scale; Designing for Accessibility First; Designing with Data; Human-Centered AI Products; Product Thinking vs Feature Thinking; Responsible AI Design Principles; Scaling UX in Enterprise Organizations; The Technology Stack Every Product Designer Should Know; The UX Maturity Model Explained; UX Debt is Real; Why Every Designer Should Understand APIs; Why Every Startup Needs a Design System.

## 5. Open questions for the owner

1. Go or no on B, A, G, I, J, K, L above.
2. Sanity and data governance: option (a), (b) or (c). Still on hold.
3. The live footer reads "Copyright 2020-2025 © Wugweb®". That text comes from Sanity site settings, not from the code. Should the year be updated? It is a Sanity write.
4. The home page title still has an em dash after "Wugweb" (before "Digital Experience Agency"). It is a stored page title, so it belongs to the search source. Should the dash go?
5. Does "resizing is allowed" (2026-11-16) mean display size only, or may smaller files be generated? This decides whether an image pipeline is ever in scope.
6. Strategy's review says to soften "always" in the Brand answer to "Do you design logos only?". Not changed; wording is the owner's.
7. `scripts/apply-schema.cjs` line 5 holds a Neon connection string with a password and has been tracked in git since 2026-07-28. The password should be rotated and the script changed to read it from `.env`. Not acted on.
8. The embedded Studio at `/admin` (`c223ac6f`) is now on main. `pending.md` used to say that work must not merge without the owner's approval. Confirm it was approved.
9. The main checkout at `/Users/abcom/Documents/GitHub/wugweb_site` holds an unpushed commit `59e7083c`, the older copy of `79487fda`. Recommendation: do not push it; reset that checkout to main after checking nothing is missing.

## 6. Facts gathered from the other docs (checked 2026-11-17)

### Sanity schema and data

| Fact | Status |
|---|---|
| 44 case studies, 37 with a body, 7 without and marked noIndex | Unchanged |
| The 7 no-body case studies still list on `/work` (the list query has no noIndex filter) | Open, Part 2 |
| 22 case-study fields hold data but are not in `caseStudy.ts` (`extraMedia`, `aiSummary`, `status`, `visibility`, `aiKeywords`, `engagementType`, `readTime`, `wordCount`, `platform`, `projectType`, `industryRefs`, `sectorRefs`, `country`, `specialThanks`, `clientLogoPath`, `clientLogoAlt`, `coverAlt`, `year`, three video paths) | Open, Part 2 |
| Notion Services, Related Case Studies, Related Posts and Results never reach Sanity (filled on 0 of 44; `results` is a real array on 1 of 6) | Open, Part 2 |
| 19 case studies hold video paths on the old `wugweb.online` host; 4 bodies link to old hosts | Open, Part 2 |
| 22 case studies have no listing thumbnail (the October inventory said 15; not reconciled) | Open |
| Posts: 103; `schemaType` stored on 91 (72 `BlogPosting`, 19 `TechArticle`); `aiSummary` on 91; neither is in `post.ts` or read by a page | See A |
| Services: 6; `faqs` filled on 0; the FAQ block on each service page comes from `src/lib/services-data.ts` | See G |
| Site pages: `faqs`, `aiSummary`, `keyTakeaways` removed from `singletonPage.ts` in `79487fda`; `schemaType` is read-only and still lists FAQPage | See B |
| No page emits FAQPage markup | True |

### Site code and tooling

| Fact | Status |
|---|---|
| `imageService` is passthrough; no resizing, no `srcset`; `/work/[slug]` images carry no width or height | Open, Part 2 |
| No `.github`, no automated checks on push; `vitest` installed and unused | Open |
| Unit tests run with `node --test` on `.ts` files (86 pass on 2026-11-17) | True |
| Scripts that must not be run as they are: `fix-case-studies.mjs` (deletes, no dry run), `generate-video-posters.mjs` and `upload-assets-to-r2.mjs` (against the no-uploads rule), `populate-missing-covers.mjs` and `map-assets-to-content.mjs` (write by default) | Open |
| `.gitignore` misses `scripts/.tmp-*.mjs` | Open |
| 60 second page cache in `src/middleware.ts` is on and has no test | See I |
| `robots.txt`: on the canonical host CCBot falls under the general rule and is allowed. GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended each have their own allow-all group, so they are not bound by the general blocked paths. Staging blocks everything. | True |
| Phone layout basics from the September spec (viewport-fit, safe-area insets, own maskable icon) | Fixed |
| Two-slug case studies, assets under a Framer folder, relative share image | Fixed |
| `/assets/brand/small.jpg` fallback in `BaseLayout` | Exists in R2 |
| Public Storybook | Not verified; no public address recorded |

### Tokens and access

| Fact | Status |
|---|---|
| Sanity token in `.env` | Works, editor role. Do not rotate unless asked. |
| `NOTION_TOKEN` in `.env` | Rejected (401) on 2026-11-17 |
| `CLOUDFLARE_API_TOKEN` in `.env` | `pending.md` says dead; the owner's memory note says it works for Pages. Not tested. |
| Sanity and Cloudflare plugin connectors | Signed out |

## 7. Working rules this session follows

- One item at a time, each on the owner's go in this session. One branch per item: build, tests, local preview, the same page requested twice, merge to main, confirm on uat.
- Tell the coordinator before each site-code push and send the commit id after.
- Sanity and Notion writes: dry run first, JSON backup in `backups/`, patch a field, never replace a document, never delete.
- No Neon sync, no token rotation, no uploads, unless the owner asks.
- Commit by path, the Wugweb trailer only, a `CHANGELOG.md` line with every commit.

## 8. Part 2 of the case-study plan, for reference

Kept so nothing is lost; it is run by another session under `CLAUDE.md`, not here. Steps: parser v2 with tests (started on a branch); media manifest; sync v2; schema declarations; queries; layout resolver; components and the thin `/work/[slug]` template; guards and the page gate; previews; docs and ship. Source: `docs/skills/wugweb-work/PLAN.md`.

## 9. Open leftovers found in `pending.md` history

Sent to the coordinator so none is lost when the history is cut. Line numbers are for `pending.md` at commit `2656b019`.

| # | Leftover | Belongs to |
|---|---|---|
| 1 | Blog sync is manual (`sync-notion-blogs.mjs`, dry run then `WRITE=1`). Automating it was offered, not decided. (line 90) | Engineering, owner to decide |
| 2 | The first request after a Pages deploy sometimes returns 404, then 200 on retry. Owner said leave it. (line 93) | Engineering, parked |
| 3 | `/footer/subscription` ignores `?subscribed=1` and `?error=invalid-email`, so a newsletter subscriber sees no confirmation. The preview environment has no secrets. GTM and Hotjar decision. Search Console verification method. A real Neon write is unproven. (line 106) | Engineering and owner |
| 4 | Content checks still failing on live content as of 2026-10-12 (title and description lengths, short bodies, no headings); no `coverAlt` field, so the cover-alt check is not possible. Counts not re-measured. (line 118) | `wugweb-seo`, `wugweb-work` |
| 5 | Studio Media assign and unassign: the owner's manual test on a throwaway case study; 3 old `tsc` errors in `draggable-tags.ts` and `scroll-animations.ts`; "Used by" labels refresh on the next `scan-asset-usage.mjs` run with `WRITE=1`. (line 120) | Engineering and owner |
| 6 | `--color-accent-primary` is wired to light grey, not brand yellow. Ruled 2026-11-17: the accent stays grey (recorded by `wugweb-brand-os`). (line 157) | Closed by ruling |
| 7 | Section wrappers should use real landmarks, not `div` everywhere. A note, not scheduled. (lines 839 to 845) | `wugweb-kits` |
| 8 | Deferred: homepage chat hero (keep the video hero); Hyperdrive and SESSION KV (only if the runtime needs them); `/footer/subscription` (payment gateway scoping); credential rotation (unless the owner asks). (lines 860 to 869) | Standing |
| 9 | 2 Neon test rows (needs `DATABASE_URL`); contact form to Studio mirror not tested end to end. (line 1598) | Engineering |

## 10. Stale-docs verdicts (2026-11-17)

The coordinator removes and updates; this session only read.

| File | Verdict | Why |
|---|---|---|
| `SANITY_TOKEN_ROTATION.md` | Removed by the coordinator | Said rotate now and that writes fail; both wrong since 2026-09-24 |
| `sanity/docs/content-migration-plan.md` | Removed by the coordinator | Plan for a dedup that ran 2026-08-30 |
| `scripts/AUDIT_REPORT.md` | Removed by the coordinator | Data dump from 2026-08-05, self-marked archived |
| `docs/content-assets.md` | Remove after repointing links | Says the R2 cutover is not live; names folders that are gone. Its path-field table moves into `docs/r2-assets.md` |
| `docs/r2-assets.md` | Update | Still describes `public/assets` on disk, a dead cutover flag, 525 objects and upload commands. The Rule 2 table is right |
| `docs/admindesign.md` | Update | Dated 2026-08-05; desk structure, type count and Studio version are wrong |
| `docs/schema-template-section-component-level.md` | Update | Says nothing is deployed, but several of its fields are live; counts are old |
| `README.md` | Update | Wrong on dual-serve, the animation library, component and route counts, folders that are gone |
| `src/components/README.md` | Update | Lists 5 components; the folder has 20 |
| `governance.md` | Update | Stale lines on `public/assets`, dual-serve, upload scripts, `reference/` and `component/`, old counts. Rules 1 and 2, owner and author, and the Notion exceptions are current |
| `design.md` (root) | Keep | A pointer; both targets exist |
| `pending.md` | Cut the history | The live tracker is the first 44 lines and about half of lines 171 to 232; about 1,360 lines are finished history |
| `docs/research/case-study-system-2026-10-19/` | Keep until Part 2 lands | Still an accurate record |
| September UI spec, sections 10 and 14 | Stale | Both fixed since |
