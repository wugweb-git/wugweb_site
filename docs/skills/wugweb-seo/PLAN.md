> STATUS, 2026-11-17, written by the coordinator session from main. This block replaces any older status, version or "not built" line further down. The skill sessions build the skill; from 2026-11-17 the seo session keeps this plan and the Notion page directly (the coordinator split was lifted).
>
> - Built. Version 2.5.0 on main (owner: no new version, this is 2.5), 25 files, last skill commit f1ce006f. The keyphrase score is part of 2.5.0.
> - Skill file body: 1,906 words by the shared count; the validator now counts the same way. Validate 34 checks, 0 errors, 0 warnings; tests pass (as reported by the seo session). Single-file export is in the skill folder.
> - Claude app and Cowork: not installed after the app reset on 2026-11-17. The seo session built the upload zip and gave it to the owner.
> - Owner rulings applied: made-file sizes adopted; the story safe zone stays unverified because no official pixel figure exists (checked the Meta Business Help safe-zone page directly, read 2026-11-17: the 1080x1920 canvas and 9:16 are official, but the inner top and bottom margins are only an in-tool guardrail, not published pixels; the common 250 or 340px numbers are secondary). Token check for case-study components is report only first and is a wugweb-kits gate. Brief field 9: seo writes one keyword note per piece, strategy pastes it into the brief unchanged, work reads it there. On case studies the faqs field is kept and the other four proposed fields are dropped. FAQPage only where every question and answer is visible on the page; no HowTo, review stars or ratings.
> - FAQ block: agreed with wugweb-strategy and recorded in the handoffs file (commit 90340cf9). Strategy decides when a piece gets one: service pages and blog posts only, questions from the signal log and approved by the owner, answers from the owner's source. Seo only audits that the markup matches the visible questions. Case studies never carry a block.
> - Story safe zone: no official pixel figure exists. Meta gives a visual guardrail and says to keep the edges of a 9:16 ad clear, plus the bottom 40% free of text for Reels ad disclaimers (Meta Business Help Center, read directly 2026-11-17). The 1080 x 1920 canvas is official.
> - Standing rules: the skill carries a marked copy of the shared standing-rules file, built into its export, with a test that fails if the copy drifts from the home file (commit f405bec3). The home file wins. This replaces any older "keep the pointer" line below.
>
> - Retired URLs and dates: a page wugweb-strategy retires returns 410 Gone or 404, with no redirect, and leaves the sitemap; the slug is not reused (commit 68f79ac0). dateModified reflects a real content edit, not the record's every-save update time (commit f1ce006f). The FAQ end date 7 May 2026 is verified against Google's official changelog. No organisation facts are stated in the skill; it reads them from wugweb-brand-os.
> - Eval run, 2026-11-17, two agents (one answered from the skill, one graded): 1 pass, 1 fail, 2 blocked. The fail (the plan outline withheld) is fixed in 68f79ac0 so the outline is always returned. The two blocked, traffic-drop and AI-visibility, wait on external data (a Search Console export and an AI-visibility prompt sample) and run when the owner supplies or connects it; Ahrefs and OpenSEO are the source.
> - Older docs reviewed 2026-11-17, safe to retire as seo references: research/case-study-system-2026-10-19/skills-and-research.md (its SEO and schema rules are in 2.5.0, FAQ end date verified), code-map.md section 3 (matches BaseLayout), ui-spec-2026-09-22 section 14 (og:image and meta-ellipsis defects resolved; the retired-URL rule and the slug check cover the rest). One open item routed to web-engineering: confirm no case study still has duplicate slugs, and consolidate to one slug with no 301s if any remain. Two Sanity-schema proposals also bear on seo and are not deployed: kits_design_system/docs/tokens/layout-shell.md and docs/schema-template-section-component-level.md both add a SEO/AI-Answers field group to caseStudy and post (ogImagePath, canonicalUrl, focusKeyword, aiSummary, keyTakeaways, faqs, schemaType and the like). seo's field decisions govern and the schema-template doc partly conflicts with them: faqs only where the page shows the questions; no seoCanonicalUrl, aiSummary or keyTakeaways on case studies; schemaType must not offer Article for case studies (fixed CreativeWork) or for posts (BlogPosting). Reconcile both docs to those decisions before any deploy; the Sanity schema is web-engineering and kits, not the seo skill. Other docs checked and not seo's: content-assets.md, r2-assets.md, admindesign.md, the media-manifest and content-inventory research files (wugweb-work), governance.md and CLAUDE.md (project rules); pending.md already points here.
> - Coordinator split lifted 2026-11-17: the seo session now keeps this plan and the Notion page directly and works with the owner. Commit trailer: Co-Authored-By: Wugweb admin@wugweb.com.
> - FINAL REPORT, 2026-11-17: version 2.5.0, last skill commit 68f79ac0, body 1,868 words, validate 34 checks with 0 errors and 0 warnings, tests pass. Evals: 8 cases; the seo session marked all 8 as passing by its own reasoned assessment, not by a scored or independent run (three of them are backed by scripts the tests already exercise). A scored run needs an eval harness the skill does not ship.
> - Parked by the seo session: the proposal to retire the redundant stored schemaType field.
> - Owner answers, 2026-11-17: training bots are allowed on wugweb.com (GPTBot, ClaudeBot, Google-Extended, CCBot and the like), and search and citation bots stay allowed; making robots.txt say so is a site item for web engineering. Search data comes from the Ahrefs and OpenSEO connectors already attached; no sign-in, and SE Ranking is not needed.
> - Closed later on 2026-11-17 (commit 68f79ac0, still 2.5.0): a retired page returns 410 Gone or 404, keeps no redirect, leaves the sitemap, and its slug is not reused (strategy decision 7, now explicit in the skill). FAQ rich results: verified against Google's official changelog that they stopped appearing on 7 May 2026 and HowTo in September 2023; the agreed FAQ line is unchanged, since FAQPage earns no Google rich result and is allowed only where the questions are visible.
> - Scored eval run, two agents (one answered from the skill alone, one graded), on the four cases not backed by scripts: 1 pass, 1 fail, 2 blocked on missing external data (correct halts). The fail (the plan withheld the topic outline) was traced to the skill's wording and fixed in the same commit. The four script-backed cases pass through the test script.
> - Older docs: the SEO parts of the 2026-10-19 research docs and section 14 of the 2026-09-22 UI spec are covered by 2.5.0 or resolved in code, and are safe to retire as seo references.
> - Open with the owner: uploading the 2.5.0 zip to the Claude app. Nothing else is open on this skill.

# wugweb-seo: alignment plan

> CHECKED AGAINST MAIN, 2026-11-19 (coordinator, from the files; no skill file was edited): version 2.5.0 on main, 25 files, skill file body 1,906 words, last skill commit 5bec58b9. The Cursor rule, ChatGPT instructions and Codex settings are on main. The single-file export the Cowork seo session added on 2026-11-19 is still not on main; the seo session commits it.

> Mirror of the Notion page "wugweb-seo" (https://app.notion.com/p/41abb710b9ab818b8481d42beb053fef), which is the source. Part of the Wugweb Skill System. Plan stage only. Nothing goes to development until the owner says. Written 2026-11-16.

## Skill card

| Field | Value |
| --- | --- |
| Name | `wugweb-seo` |
| Type | Claude skill, already installed as one skill |
| Status | Version 2.5.0, merged to main 2026-11-17 (merge 4828533d). Master copy in the repo at `.claude/skills/wugweb-seo/`, now carrying `score-page.mjs` and `evals/evals.json`. The app build this came from is also 2.5.0. |
| Alignment plan | Ready for the owner's vetting, 2026-11-16. Written by the wugweb-seo planning session. |
| App copy | 2.4.0, last saved 16 Nov at 23.38, 21 files. The owner saves it from his development chat; the planning session cannot open that chat or session `cse_01UQ9TRqokKf1xMCS1JD3brM`. Files that differ from the repo copy: `SKILL.md`, `README.md`, `CHANGELOG.md`, `metadata.json`, `AGENTS.md`, `adapters/cursor/wugweb-seo.mdc`, `references/handoffs.md`. |
| Planned in session | wugweb-seo |
| Development chat | https://claude.ai/chat/ed3a2346-688c-8096-9572-f2cfe891cfd4 |
| Repo plan | https://github.com/wugweb-git/wugweb_site/blob/main/docs/skills/wugweb-seo/PLAN.md |

## What it owns

Keywords and search intent, on-page rules (title, description, headings), schema, AI search readiness, technical checks and reporting, for the whole site. One skill with three parts inside:

| Part | Does |
| --- | --- |
| Plan | For `wugweb-strategy`: site keyword and intent map, topic gaps, pages to refresh. For `wugweb-work`: keyword and intent notes, outline and constraints for one brief, and a platform keyword note for social and portfolio titles. Never writes copy. |
| Audit | Checks the rendered page and returns a prioritised fix list. Changes nothing itself. |
| Report | Rankings, traffic and AI answer visibility. Advisory. Feeds `wugweb-strategy`. |

## What it does not own

- Writing the copy.
- Layout, tokens and code.
- The publishing plan and reporting on posts (`wugweb-strategy`).

## Rules already fixed

- One slug per case study. No redirects for old or Framer addresses.
- Title 51 characters or fewer in the source; the site adds " \| Wugweb" only when the title does not already name Wugweb and the total fits in 60. Description 140 to 160.
- Structured data only on the main site address. Case studies: WebPage, CreativeWork, BreadcrumbList; Wugweb is creator and publisher; no author. Blog posts: BlogPosting with a Person author. Service pages, home and about: not decided.
- HowTo, review stars and aggregate ratings are never proposed. FAQPage is allowed only for questions the page visibly carries from its `faqs` field, written by `wugweb-work`, and is never asked for as a way to win search. llms.txt is not a lever and is never recommended; the existing `public/llms.txt` and `ai-context.txt` stay as they are.
- Dates: a blog post shows its date; a case study shows none; a shown date matches the schema date. The audit does not check titles for dashes.
- The owner's answers of 2026-11-16 are recorded in the skill's 2.3.0 changelog and were confirmed by the owner in the planning session on 2026-11-17.
- Notion is the source for case-study SEO fields and for blog posts.

## Helper skills

Lead: `searchfit-seo:generate-schema`, `rampstack-seo:seo-onpage`, `rampstack-seo:seo-keyword`, `searchfit-seo:content-brief`. Second opinion: `schema-markup`, `seo-schema`, `on-page-seo`, `seo-geo`, `seo-aeo-geo`, `sanity:seo-aeo-best-practices`, `seo-check`, `seo-images`. After deploy: `aeotester:audit`, `aeo-brand-scan:scan`. Added in 2.0.0 as a plan second opinion: `searchfit-seo:create-topic`.

For the platform keyword note: `social-media-skills:social-seo` (lead), `hashtag-strategy` (second opinion); no hashtag stuffing. Leads named by the owner (2.3.0): `analytics-skills:traffic-change-diagnosis` for the report part, `searchfit-seo:technical-seo` for the technical checks. Tags stay few and specific, with no fixed number.

Every helper is optional. See "Extracted and absorbed" for what the skill now carries itself.

## Hands off to and from

Every link reads the same on both sides. Neither side edits code.

| With | Gives | Takes |
| --- | --- | --- |
| `wugweb-strategy` | Site keyword and intent map, topic gaps, refresh list with the position and click-rate signals behind each suggestion; search reports | Business goal, audience, page list, the pillar and cluster structure, the proof map |
| `wugweb-work` | Keyword notes and budgets for one brief; platform keyword note; fix list for a finding on one page, JSON-LD check, citability score. Asks it for any visible wording, such as a title option | Topic, client, audience; approved body; rendered page URL; the wording, voice-checked |
| `wugweb-kits` | A finding that repeats on every page using a block: alt text, lazy loading, heading order, image sizes | Its check result |
| `wugweb-brand-os` | Nothing | One way: the approved brand name, descriptor and approved facts about Wugweb, for titles and organisation markup. Never rewritten |
| `wugweb-voice` | No link | No link |

Link targets, owner rulings of 2026-11-16 as carried in the repo skill 2.4.1: `wugweb-strategy` sets the pillar and cluster structure. The proof map wins on which case study backs a page. `wugweb-seo` picks the other link targets for a brief around it, owns the link rules (anchor wording, no orphans or dead ends, depth, how many) and checks the links in the audit. This replaces the 2.3.0 wording, in which strategy decided every target.

## Waiting on the owner

**Decided 2026-11-17 (delegated, "diy"), in main 2.5.0 (commit 7a6a5ecd):**

- Schema for service, home and about: service pages carry `Service` and `BreadcrumbList`, home `WebPage`, about `AboutPage`, no author. Folded into 2.5.0, no new version.
- Blog and service page titles: source 52 or fewer, so the " \| Wugweb" suffix fits in 60. Folded into 2.5.0.
- Kits fields: do not adopt `seoCanonicalUrl`, `schemaType`, `aiSummary` or `keyTakeaways` for case studies (canonicals come from Notion, the type is fixed as CreativeWork, the body is the single source). `faqs` was already settled.
- Headings: `wugweb-work` owns them, `wugweb-voice` runs the check, wugweb-seo checks length and order only.
- Standing rules: keep the pointer in `SKILL.md`; the rules inline only in `AGENTS.md` and the single-file export.
- `evals/evals.json`: supplied in 2.5.0 (8 cases).
- App copy: the 2.5.0 zip is built and sent; upload it in the Claude app to bring the app copy up from 2.4.0.

**Still yours, not mine to decide or do:**

- Training bots per property: a business call. Recommended default: allow search and citation bots everywhere, and treat training-bot blocking as a per-property robots.txt choice.
- Made-file share-image sizes: og 1200 by 630 is settled; the platform sizes need your table. Standard values to confirm, not yet in the skill: LinkedIn link image 1200 by 627, Behance cover 808 by 632, Dribbble shot 1600 by 1200, story 1080 by 1920 with about 250px reserved top and bottom.
- Search-data connector sign-in: needs your OAuth; a session cannot sign in. Ahrefs, OpenSEO and OpenRush are already attached if you want those instead.

- [ ] Sign in to any SEO data connector the report part should use. A Search Console export is the standard source (2.3.0); connectors are optional. Recommended: Ahrefs, OpenSEO and OpenRush are attached and usable now; SE Ranking needs sign-in; confirm the Search Console property for first-party clicks and impressions.
- [ ] What the skill should cover for blogs and service pages. A proposal is under "Scope by page type". Recommended: blog posts get the full on-page audit plus BlogPosting; service pages the full on-page audit plus Service schema and links to proof.
- [ ] Confirm the title rule's reach: the skill applies "51 characters or fewer" to case studies only and marks other page types not decided. Recommended: keep 51 for case studies only; blog and service take the limit below.
- [ ] The title limit for blog posts and service pages. Recommended: rendered 60, source 52 so " \| Wugweb" always fits, matching the case-study scheme.
- [ ] Whether AI training bots may crawl, per property. Search and citation bots stay allowed. Your call, a business one; the default stays until you set it per property.
- [ ] Confirm the rule "headings are claims; never ask for a question heading" lives in `wugweb-voice` or `wugweb-work`. wugweb-seo only points to it. The wugweb-work plan says "question form where natural". Recommended: `wugweb-work` owns headings and `wugweb-voice` runs the check; wugweb-seo checks length and order only.
- [ ] Re-save the app copy as 2.4.1 from the repo folder, using the 7 files listed in the skill card. The repo copy is the master. Your action, in the app session; the planning session cannot reach it.
- [x] FAQPage: allowed only where the page shows the questions. Decided, 2.3.0.
- [x] BlogPosting with a Person author stays. Decided, 2.3.0.
- [x] The audit does not check titles for dashes. Decided, 2.3.0.
- [x] Rules for every site, with `wugweb.com` rules in their own section. Decided, 2.3.0.
- [x] Trigger phrases per part, in the skill description. Decided, 2.3.0.
- [x] Leads named: `analytics-skills:traffic-change-diagnosis` and `searchfit-seo:technical-seo`. Decided, 2.3.0.
- [x] Tags stay few and specific, with no fixed number. Decided, 2.3.0.
- [x] Blog posts show their date; case studies show none. Decided, 2.3.0.
- [x] The `faqs` field in the kits layout-shell doc: 2.3.0 allows FAQPage from such a field, so the clash is settled. The field is still a proposal and adding it is development.
- [x] `aeo-brand-scan` runs only after the owner's yes. Decided, 2.2.1.
- [x] Link targets. Decided; see the note above this list.
- [x] Change 11 (the standing-rules path): applied in the repo copy 2.4.1.
- [ ] The owner's standing rules as a copied block marked as from `docs/skills/STANDING-RULES.md`: the skill holds only a pointer. Add a block, or keep the pointer? Recommended: keep the pointer in `SKILL.md` and inline the rules only in `AGENTS.md` and the single-file export, which run without the repo.
- [ ] `evals/evals.json` is in neither the app copy nor the repo copy, although the changelog says eight evals were added. Supply the file. Recommended: draft it as part of the build, so the validator's warning clears.
- [ ] Confirm the kits layout-shell fields seo owns: `seoCanonicalUrl` (clash: case-study canonicals come from Notion, no redirects), `schemaType` (clash for case studies: the type is fixed as CreativeWork), `aiSummary` and `keyTakeaways` (clash on case studies: a second copy source). `faqs` is already settled by 2.3.0. Kits asked seo to answer these.
- [ ] Confirm the made-file share-image sizes for LinkedIn, Behance, Dribbble and the story safe zone; the og image 1200 by 630 is settled. The audit's share-image check reads them; the sizes themselves are a kits or work spec.
- [ ] Re-upload the wugweb-seo skill zip to the Claude app: the app copy was lost with the others. Rebuild from the repo copy (2.4.1) plus the 2.5.0 build once it is pushed here.
- [x] Done in 2.2.0. Take the "Changes to take into the skill session" below into session `cse_01UQ9TRqokKf1xMCS1JD3brM`, or reject them.

## Plan

Alignment plan, 2026-11-16. Built as version 2.1.0. The page as it stood before the 2.1.0 update is backed up in the Skills project at `claude/backups/notion-wugweb-seo-2026-11-16.md`. The page as it stood before this merge is backed up in the repo at `backups/notion-wugweb-seo-page-before-2026-11-16.md`.

### What changed from the installed 1.0.0

| Current (1.0.0) | Proposed and built (2.1.0) | Why |
| --- | --- | --- |
| Seven modes in one file | Three parts: plan, audit, report | This page fixes one skill with three parts |
| FAQPage schema suggested for comparison pages | Never FAQPage, HowTo or review stars | Rule already fixed on this page |
| llms.txt "optional, low priority" | No llms.txt | Rule already fixed on this page |
| Title 50 to 60 characters, brand last | Case-study source title 51 characters or fewer; site adds " \| Wugweb" | Rule already fixed on this page |
| H2 headings phrased as questions | Headings belong to the copy; the skill checks them, never rewrites | Wugweb headings are claims |
| Organization, WebSite, BreadcrumbList sitewide | Organization, WebSite and founder stay sitewide (the layout emits them). Case studies add WebPage, CreativeWork, BreadcrumbList; creator and publisher, no author | Rule already fixed on this page; corrected 2026-11-16 against `BaseLayout.astro` |
| Owner's standing rules copied into the skill | Points to the shared rules file | One home per rule |
| Brief: constraints only | Brief: keyword and intent notes, an outline of topics, and constraints | This page asks for an outline |
| No scripts, tests or references | Two check scripts, a self-test, a format validator, four references, six evals | House skill shape |
| Claude only | Also runs in Cursor, Codex and a custom GPT | Owner asked for portability |

### Added in the skill, not written on this page before

These are now part of wugweb-seo. Each is an SEO matter, so this skill is its home.

- Never set a keyword density target.
- Never place search numbers on a case study as a client result.
- Every phrase, volume and ranking carries its source and date, or is marked "unvalidated".
- Third-party figures about AI answers are directional: give source and date, or leave them out. Where community advice contradicts the search engine's own guidance, follow the search engine.
- When two pages would target one phrase, name both; the owner decides which keeps it.
- Search and citation bots must reach every page that should be found. Training bots are the owner's choice.
- Core Web Vitals limits from field data: LCP 2.5 seconds or less, INP 200 milliseconds or less, CLS 0.1 or less.
- A citability score from 0 to 100 per page, naming the three weakest sections without rewriting them.
- Fix lists split into content (to the maker, as current → proposed) and code (to a developer).

### What the skill holds

| Part | Output | Tool |
| --- | --- | --- |
| Plan | Primary and supporting phrases with sources, intent, outline of topics, title, description, schema and link limits | Reading and helper skills |
| Audit | Scripted checks, manual checks, citability score, fix list | `check-page.mjs` (13 checks), `check-robots.mjs` (15 bots) |
| Report | Period comparison, risers and fallers, quick wins, AI answer presence, cause of a drop | Search Console export or a connected data tool |

### Checks run on 2.1.0

- Format validator: 33 checks, 0 errors, 0 warnings. Body 1,566 words.
- Self-test: 17 of 17 passed on a passing page, a failing page and a sample robots.txt.
- Agent Skills validator: passed.
- The six evals are written and have not been run.

## Alignment with the Wugweb Skill System (2026-11-16, ready for vetting)

Written by the wugweb-seo planning session. It read the installed 2.1.0 `SKILL.md` only; the references, scripts, `AGENTS.md` and adapters were not on this machine and were not read.

### How the 1.0.0 modes map to the parts

| Part | Modes |
| --- | --- |
| Plan | A keyword and intent map, B brief, E comparison pages |
| Audit | C on-page, D technical and AI crawler, G citability |
| Report | F measurement |

### Taken over from the wugweb-work plan

That plan keeps a pointer to this skill.

| Item | Was in |
| --- | --- |
| JSON-LD v2 graph and its "never emit" list | "JSON-LD v2" |
| Title, description and H1 rules | "Rules the references encode", SEO line |
| The `wugweb-seo` and schema-helper rows | "Handoff contracts" |
| The "SEO and schema" row | "Per-task tests" |

### Site-wide: direct or advice only

| Covers directly | Advises only |
| --- | --- |
| Keyword and intent map for the whole site | What to publish and when (`wugweb-strategy`) |
| Technical checks: robots, sitemap, canonicals, indexability, server HTML, Core Web Vitals readings | Any code, schema or config fix |
| On-page pass values | The wording of titles, descriptions and headings (`wugweb-work`) |
| Schema rules per page type | Implementing the JSON-LD |
| Citability scoring | Alt text and lazy loading (`wugweb-kits` confirms) |
| Search reporting | Reporting on posts (`wugweb-strategy`) |

### Scope by page type

| Area | Plan | Audit | Report |
| --- | --- | --- | --- |
| Site-wide | Keyword map, one page per cluster | Technical and sitewide schema | Rankings, traffic, AI answer visibility |
| Blog posts | Brief constraints, link targets, refresh candidates | On-page, BlogPosting, dates | Per-post trends |
| Service pages | Keyword per pillar | On-page, schema, links to proof | Per-pillar trends |
| Case studies | Keyword and intent notes | On-page, JSON-LD v2, citability | Traffic note after launch |

### Platform keyword note

Runs only when asked by `wugweb-work` or `wugweb-strategy`. Gives terms for the title, first line and tags on LinkedIn, Behance or Dribbble, each sourced or marked "unvalidated". Never writes the post. Tags label a post and are few and specific; the keyword in the body comes first.

### Worked example: NTUC U Care

| Check | Found | Result |
| --- | --- | --- |
| Title | 49 characters | Pass |
| Description | 157 characters | Pass |
| Canonical | Correct | Pass |
| `og:image` | A dark device mockup | Flag |
| JSON-LD on the main address | Not checked | Unvalidated |

### Per-task tests

| Task | Passes when |
| --- | --- |
| Keyword map | Every number has a tool and date, or says "unvalidated" |
| Brief | No drafted copy; no FAQ block asked for to win search |
| On-page audit | Title 60 or fewer rendered, description 140 to 160, canonical self, one H1 |
| Schema | WebPage, CreativeWork, BreadcrumbList on a case study; no author, HowTo or Review; FAQPage only where the page shows the questions |
| Technical | Only canonical 200 URLs in the sitemap; staging refused |
| Report | Deltas only from real exports; gaps stated |
| Portability | The same three tasks give the same pass or fail values from the single-file export |

## Changes to take into the skill session

The installed 2.1.0 `SKILL.md` differed from this plan in ten places. All ten were applied in version 2.2.0, checked on 2026-11-16 against the installed 2.2.1 skill body, its changelog and its handoffs reference. They stay here as the record. They were current → proposed text for the owner to take into session `cse_01UQ9TRqokKf1xMCS1JD3brM`. The installed copy has not been edited.

| # | Section of `SKILL.md` | Current | Proposed |
| --- | --- | --- | --- |
| 1 | Boundary table | "Case studies and their other forms: `wugweb-work`" | "Making every piece (case studies, portfolio, blog posts, service pages, site copy, and their social and deck versions): `wugweb-work`" |
| 2 | Boundary table | "Blog posts, service pages and site copy: `wugweb-content` (not decided)" | Row removed. New row: "What to publish, to whom and when; reporting on posts: `wugweb-strategy`" |
| 3 | Boundary table | "Writing and editing the copy, headings included: `wugweb-voice`, and the maker skill that owns the page" | "Writing and editing the copy, headings included: `wugweb-work`. For any visible wording, such as a title option, ask `wugweb-work`; it runs the voice check. This skill has no link with `wugweb-voice`." |
| 4 | Boundary table | No brand row | New row: "Brand name, descriptor and approved facts about Wugweb, for titles and organisation markup: read from `wugweb-brand-os`, never rewritten" |
| 5 | Fixed rules, Title | "the site adds ' \| Wugweb'" | "the site adds ' \| Wugweb' only when the title does not already name Wugweb and the total fits in 60" |
| 6 | Fixed rules, Schema | Case-study types only | Add: "The layout already emits Organization, WebSite and the founder on every page; leave them. Schema for other page types is not decided." |
| 7 | Plan part, opening | "Answer one question: which phrase and intent should this page target?" | Add before it: "Two callers use this part. `wugweb-strategy` asks for the site keyword and intent map, topic gaps and pages to refresh. `wugweb-work` asks for one page, as below, or for a keyword note for a LinkedIn, Behance or Dribbble title and tags. Never write the post; no hashtag stuffing." |
| 8 | Audit, step 5 | "Split it into content fixes and code fixes." | "Split it three ways. A finding on one page goes to `wugweb-work` as current → proposed. A finding that repeats on every page using a block (alt text, lazy loading, heading order, image sizes) goes to `wugweb-kits`, which answers with its check result. A code fix goes in the developer block below." |
| 9 | Report part, opening | Starts at step 1 | Add: "The report feeds `wugweb-strategy`'s planning. Reporting on posts belongs there, not here." |
| 10 | Leave to the owner | "What this skill covers for blog posts and service pages. Not decided." | "Whether `FAQPage` is banned site-wide (the site's page schema has that option). Schema for blog posts, service pages, home and about. What to do with the existing `llms.txt` file." |

`references/handoffs.md` needs changes 1 to 4 and 7 to 9 as well; that was done in 2.2.0. `AGENTS.md` and the adapters are generated, so `scripts/build.mjs` must run after the edits.

Change 11, applied in the repo copy 2.4.1: in the boundary table of the skill body, the row for the owner's standing rules names the shared file by its path, `docs/skills/STANDING-RULES.md`. Change 12, also applied there: the link-target wording, with "the proof map wins". Both reach the app copy when the owner re-saves it. Note: a repo path means nothing where the skill runs without the repo, so the single-file export may need the rules included or attached; that is the owner's call.

## Extracted and absorbed

The helper skills were read on 2026-11-16 (read only) so the skill can work without them. "Absorb" means the rule is restated in our own words inside the skill, with the source noted. Thresholds marked "source's figure" are that helper's claim, not a measured Wugweb number. Owner rules win in every clash. Nothing was installed, removed or edited.

### Absorbed into the plan part

| Rule, in our words | Source | Clash set aside |
| --- | --- | --- |
| Read intent from what ranks on page one, and note the dominant page type. Six or more of one type in the top ten sets the type; otherwise mark it mixed. A page whose type differs from the dominant one is a type mismatch | rampstack seo-keyword, seo-skills seo-content-brief, seo-sxo | Their heading outlines and FAQ blocks |
| Two phrases share a page when their top-ten results overlap heavily: 7 to 10 shared is one page, 4 to 6 the same cluster, 2 to 3 interlink, 0 to 1 separate (source's figures) | seo-skills seo-keyword-cluster, rampstack seo-keyword | Drafted H1 and H2s |
| Clean the phrase list first: lowercase, remove duplicates, merge singular and plural. Brand and comparison terms get their own clusters. Phrases that fit no cluster are listed separately. Each cluster names an existing page or says a new one is needed | searchfit keyword-clustering | Volume columns with no data source |
| Score a cluster as opportunity plus fit minus difficulty, 1 to 5 each, only where real data exists. Log deferred clusters with the reason | rampstack seo-keyword | none |
| Pick competitors by overlap: domains that recur in the top ten across priority phrases. A gap is a phrase where a competitor ranks in the top 20 and Wugweb does not rank. Note how many competitors rank; one alone may be noise. Drop competitor brand terms | rampstack seo-competitor, seo-skills seo-competitor-gap-analysis | llms.txt as a comparison row; review aggregates |
| The brief states what the ranking pages cover and what this page adds that they lack. The link plan lists source page, anchor and target section. Unknown volume or difficulty is written "unknown" | searchfit content-brief, seo-skills seo-content-brief | Keyword density; heading outlines |
| AI prompts usually show no search volume, so prompts are never ranked by volume | seo-skills ai-search-gaps-to-social-campaign | none |
| For templated page sets (Kits, sectors): each page needs facts its siblings lack; sample pages and fail the set if they differ only by name | seo-skills seo-keyword-niche, rampstack programmatic-seo | FAQPage, aggregateRating, authorship on every page |
| Platform keyword note: primary phrase early and natural, once or twice; one search intent per post; never state a volume without a tool. Tags are few and specific | social-media-skills social-seo, hashtag-strategy | none; both refuse stuffing |
| For multi-language client sites only: keywords are researched per market, never translated | searchfit content-translation | Keyword density |

### Absorbed into the audit part

| Rule, in our words | Source | Clash set aside |
| --- | --- | --- |
| Title and description are unique across the site. The title is not word for word the H1. The description does not repeat the title | rampstack seo-onpage, brightdata seo-audit, wugweb-kits routing | Their 50 to 60 and 150 to 160 limits |
| Compare raw HTML with the rendered page: title, H1, description, canonical and robots must match. Never report a tag as missing from a Markdown fetch; confirm in raw HTML or write "not checked" | seo-skills seo-technical-audit, seo-firecrawl | none |
| Key facts are text in server HTML, not held in images, PDFs or iframes. A 200 page with almost no body text is a soft 404 | rampstack seo-aeo-geo, seo-skills seo-technical-audit, aeotester audit | llms.txt, FAQPage, question headings |
| Check the `X-Robots-Tag` header as well as the meta tag. Flag a page that is both noindex and canonicalised elsewhere. An unknown URL returns 404 or 410, not 200. Staging hosts are noindexed | searchfit technical-seo, aeotester audit, rampstack seo-technical | Redirect advice |
| Sitemap: four differences to report. Indexable pages missing from it; entries with no internal links; entries that are not 200; lastmod identical everywhere or stale. No noindexed URL in it. Canonical, sitemap and internal links agree | seo-skills seo-sitemap, rampstack seo-technical, sanity seo-aeo-best-practices | none |
| Internal links: every target returns 200; fragment links point at an id that exists; case and trailing slash match the route. Flag dead-end pages, pages four or more clicks from home, generic anchors, and hubs their spokes do not link back to. A page reachable only through the sitemap is an orphan | searchfit broken-links, internal-linking, rampstack programmatic-seo | A 301 as the default fix: the link itself is fixed |
| JSON-LD hygiene: parses; `@context` is exactly `https://schema.org`; absolute URLs; ISO 8601 dates; no empty values; breadcrumb items carry position, name and item; several types share one graph; present in server HTML; rechecked live after deploy | seo-skills seo-schema, searchfit schema-markup, sanity seo-aeo-best-practices | FAQPage, HowTo, Review, aggregateRating, Article author |
| Share tags in server HTML: og title, type, description, url, site name, image, image alt; twitter card, title, description, image, image alt. `og:url` equals the canonical. Today the layout emits 9 of the 12; site name and the two image alt tags are missing | searchfit seo-audit, sanity seo-aeo-best-practices, aeotester audit, wugweb-kits routing | none |
| Images: alt present, 10 to 125 characters, not a file name, not repeated; largest image not lazy and given high fetch priority; width and height set; below-fold images lazy. A fault on every page using a block goes to `wugweb-kits` | seo-skills seo-images | Its re-encoding advice (media rule) |
| Citability blockers: no answer in the first 300 words; the entity not named in full at first mention; a statistic without a primary source and data date. Where a page shows a date, it matches the schema date; whether pages must show a date is an owner question. No date change without a real edit | seo-skills seo-content-audit, rampstack seo-aeo-geo, sanity seo-aeo-best-practices | Author byline, heading rules, word-count floors |
| Cannibalisation: flag any phrase where two own pages rank or swap. Skip pages under three months old (source's figure). The owner decides which page keeps it | rampstack seo-content-audit, seo-skills seo-page | Merge and redirect actions |
| One verdict per page: keep, refresh, or raise with the owner. Under five ranking queries, say the data is insufficient (source's figure) | seo-skills seo-page | Consolidate or kill by redirect |
| Before and after a deploy, snapshot title, description, H1, canonical, robots, lang, JSON-LD types, word count and internal links. A change to canonical, robots, lang or H1 is red; to title, description or schema is amber | seo-skills seo-drift | none |
| Rank each fix by how much traffic the page has, whether it touches indexing, crawling, rendering or vitals, and effort. Group issues with one template cause into one fix. Name the proof metric before the fix ships. Label a fix as mechanical or needing owner facts | rampstack seo-site-health-audit, aeotester fix | Its parking of title and description warnings |
| Every finding carries its evidence. Unmeasured items are listed as out of scope with the tool that would measure them | brightdata seo-audit | Author byline flag |
| Judge Core Web Vitals on field data at the 75th percentile, not lab runs. A declared canonical that differs from the one Google chose is critical | seo-skills seo-google | none |
| For multi-language sites only: each page lists itself, alternates link back, one x-default, tags only on the canonical URL | seo-skills seo-hreflang, searchfit content-translation | none |

Added 2026-11-16 from the sibling sessions' routing, each checked against the owner's rules:

- Never optimise a page that is not indexable; report the indexing fault first (rampstack seo-content-audit, seo-onpage).
- Image weight is reported as a fact and never fixed by re-encoding. The helper's budgets are thumbnail under 50 KB, content under 100 KB, hero under 200 KB (seo-skills seo-images; source's figures). Alt text that repeats a keyword is flagged.
- Favicon, title, description and share image are present (website-design web-review; routed, not read here).
- A page that already passes is a valid result (cloudflare web-perf). 2.1.0 already says so.
- From the SEO pass in the copy helpers (rampstack content-and-copy, marketing content-creation): slug lowercase and hyphenated; excerpt and description match the piece; decorative images get empty alt. Set aside: their title 50 to 60, description 120 to 160 or under 160, keyword in headline and subheading, FAQ and HowTo schema.
- Outside support for the schema ban: HowTo rich results are retired and FAQ results are restricted (seo-skills seo-schema, as routed by wugweb-work). The repo research file dates the end of FAQ results to 2026-05-07.

### Absorbed into the report part

| Rule, in our words | Source | Clash set aside |
| --- | --- | --- |
| Before any diagnosis, confirm the drop is real: Search Console clicks and analytics sessions move together. Restate the question with the metric, dates and figures | rampstack seo-traffic-diagnosis, analytics analytics-diagnostic-method | none |
| Read the shape first: a one-step cliff points to a deploy, tracking or outage; a slow ramp to decay; a one-day spike to a bot or a viral moment. Every channel falling together points to measurement. Compare the same weekdays | analytics traffic-change-diagnosis | Its fix of adding redirects from old paths |
| Split by country, device, section, and branded or not. Position steady with click rate down means a results feature took the click. If the total moved and no segment did, it is a mix change. End with one evidenced hypothesis; if two causes fit, report both and say what data would separate them | rampstack seo-traffic-diagnosis, analytics analytics-diagnostic-method, anomaly-detection-time-series | Any recovery forecast as a number |
| Search Console data lags two to three days and covers about 16 months (source's claim). State sample size first. Call a trend only with enough points; a benchmark is never a target | seo-skills seo-google, analytics metric-context-and-benchmarks, marketing performance-report | Generic benchmark ranges |
| Junk-traffic check for organic: pages per session near one, very short visits, very low engagement, off-market geography, spam referrers. Direct traffic absorbs branded search | analytics channel-and-funnel-quality | Its thresholds are the source's claims |
| AI answer sample: fixed prompt types (best in category, brand against rival, alternatives, a how-to for the problem, a recommendation for a use case). Per engine record named, linked as a source, or absent, plus position, whether the description is accurate, and which competitors were named. Use fresh sessions. Zero stays zero. Report citation rate as cited over answers present | searchfit ai-visibility, seo-skills seo-ai-search-share-of-voice, seo-geo, social-media-skills ai-search-optimization, aeo-brand-scan | FAQ schema; scores with no rubric |
| Report visits referred by AI assistants as their own line | sanity seo-aeo-best-practices, social-media-skills ai-search-optimization | none |
| Numbers only from supplied exports with the source named; gaps flagged, never estimated. Lead with outcomes, include what underperformed, close with three ranked actions. Each recommendation cites its data point, impact and effort | social-media-skills analytics-and-reporting, marketing performance-report | none |

### Kept as optional helpers

They add tooling or data, or repeat what the skill already holds. No part depends on them.

| Helper | Why optional |
| --- | --- |
| searchfit on-page-seo, seo-check, generate-schema, keyword-cluster; its seo-auditor and competitor-analyzer agents | Repeat held rules; scores have no rubric |
| searchfit content-translation; seo-skills seo-hreflang, seo-local, seo-subdomain | Only for multi-language or local client sites |
| seo-skills seo-plan, seo-backlinks-profile, seo-backlink-gap, seo-ai-social-report | Need SE Ranking data |
| seo-skills seo-google | Needs Google credentials and local scripts; its rules are absorbed |
| marketing seo-audit | Repeats held rules; adds "not updated in 12 months" as a flag |
| aeotester audit and fix | Scripted run; its rubric rewards llms.txt, FAQPage and HowTo, and fix edits files |
| aeo-brand-scan scan | Sends brand and competitor names to a third-party endpoint; needs the owner's yes before any run |
| analytics anomaly-detection-time-series | Needs Python tooling |
| brightdata seo-audit, search | Need a Bright Data account |
| cloudflare web-perf | Needs Chrome DevTools; names the slow part of LCP |
| social-media-skills youtube-publishing-and-metadata | Only if video is ever in scope |
| data build-dashboard, create-viz, analyze, validate-data; dataviz | For charts and checks in the report part. Decided from their descriptions; not read |
| tinyfish research and monitor | Signed out |

### Ignored

| Skill | Why |
| --- | --- |
| rampstack content-strategy; searchfit content-strategy, create-topic, content-strategist agent | Content planning: `wugweb-strategy` |
| searchfit create-content, translate-content; seo-skills seo-competitor-pages, seo-agency-landing-page, site-audit-to-social-distribution | They write copy |
| seo-skills seo-ads, seo-api, local-gmb-visibility, client-onboarding-proposal, seo-gaps-to-social-campaign | Paid search, integration guide, or social posting |
| social-media-skills instagram-seo, pinterest-seo | Nothing new for the three named platforms |
| analytics: the other eight skills | Experiments and event schema, not search |
| web-quality-accessibility, web-design-guidelines, ux-ui-audit | For `wugweb-kits` |
| hcti-open-graph-images | Paid rendering service that makes image files; conflicts with the media rule; not relied on |
| wp-structured-data and every `wp-*` skill | Belongs to Animal Writes. Schema patterns are reference only; not read |

### Clashes found, owner rules kept

- FAQPage, HowTo, review stars or aggregate ratings are recommended by 14 of the helpers read.
- llms.txt is scored or recommended by rampstack seo-aeo-geo, seo-technical, seo-competitor, seo-skills seo-geo and aeotester.
- Title 50 to 60 and description 150 to 160 (or 120 to 160) appear in six helpers; the owner's limits stand.
- Question headings and "keyword in the H1" appear in several; headings belong to the copy.
- Author markup on every page appears in several; case studies carry no author.
- FAQPage or HowTo is also recommended by seo-skills seo-sxo, rampstack seo-technical and searchfit technical-seo.
- Scores from 0 to 100 with no rubric appear in several helpers. The skill's own citability score stays because it has five stated criteria.
- Image re-encoding is advised by seo-skills seo-images; weights are reported only.
- Redirects as a default fix appear in several; `wugweb.com` adds none for old addresses.

### Passed to other skills

Sent to the coordinating session as "FOR" lines: 12 for `wugweb-work`, 9 for `wugweb-strategy`, 6 for `wugweb-kits`, 3 for `wugweb-brand-os`, 2 for `wugweb-voice`.

### What was not read

- Read in part: six rampstack programmatic-seo references; seo-skills seo-google and seo-hreflang; the aeotester rubric and scripts; three analytics skills (outlines only); fifteen low-priority seo-skills skills (skimmed).
- Not read: `wp-structured-data`, the `data` skills, `dataviz`, `hcti-open-graph-images`, `ux-ui-audit`.
- Catalogue scan found three more worth one read for the LinkedIn keyword note: social-media-skills profile-optimization, linkedin-growth, linkedin-company-pages.
- Not on disk, so not read: dataviz, artifact-design, simplify and the built-in code-review.
- Not read: marketing competitive-brief (keyword gaps), a possible plan helper.
- Do not run brightdata design-mirror: it scrapes other sites, restyles the codebase, and its scripts disable certificate checking. Reported by the wugweb-kits session; not checked here.

## From the kits design-system docs

Source: kits docs, `kits_design_system/docs/tokens/layout-shell.md`, read 2026-11-16. `wugweb-kits` owns these rules; this skill only checks them on a rendered page.

- html lang set; skip link to the main landmark; main, header and footer landmarks; exactly one h1.
- Every section has an id and an accessible name; heading levels never skip; every image has alt.
- Baseline for spotting regressions, the doc's own figures from 2026-10-03: 162 of 162 sections labelled, 0 heading skips, 0 images without alt. Not re-run by this session.
- Descriptive anchor text and answer-first copy: the rule is this skill's, the wording is `wugweb-work`'s.

The same doc proposes CMS fields for case studies and posts. Its own status is "proposal", with nothing deployed. Adding any of them is an owner decision and then development.

| Field | Position | Why |
| --- | --- | --- |
| `ogImagePath`, `ogTitle`, `ogDescription` | Support | Share tags are an audit item |
| `noIndex` | Support | Already in use on seven case studies |
| `focusKeyword`, `secondaryKeywords`, `searchIntent` | Support | Match the plan part's output. For case studies they must come from Notion through the sync, not be edited in Studio |
| `breadcrumbLabel` | Support | Feeds BreadcrumbList |
| `relNofollow`, alt made required | Support | Link and image checks |
| `seoCanonicalUrl` | Clash | Case-study canonicals come from Notion and there are no redirects. `pending.md` already calls this field unnecessary |
| `faqs` feeding FAQPage | Support, limited | 2.3.0 allows FAQPage only for questions the page shows from this field. Still a proposal; adding it is development |
| `schemaType` | Clash for case studies | The type is fixed as CreativeWork; offering Article reopens it. Posts are BlogPosting today |
| `aiSummary`, `keyTakeaways` on case studies | Clash | Case-study content is the Notion Body Content only; these would be a second copy source. No clash on posts or pages |
| `lastReviewedAt` | Open | Ties to the question on dates |
| `ariaLabel`, `imageContext` | Not this skill | Accessibility and editor notes belong to `wugweb-kits` |

## Repo master copy (2026-11-17)

On the owner's word, the skill now lives in the repo at `.claude/skills/wugweb-seo/`, beside `wugweb-kits`. Claude Code in the repo loads it directly; `AGENTS.md` and `adapters/` cover other tools.

- Commit 82bc0b9a: the 21 files of 2.4.0, copied unchanged from the app copy. Checked for secrets and personal data: none.
- Commit 825b1aa6: version 2.4.1. The proof-map link wording; the standing-rules path; the script commands moved from the body into `README.md`; the `name:` line unquoted, because a quoted name failed the validator and made the build write a Cursor rule named with quote marks; `AGENTS.md` and the Cursor rule rebuilt.
- Body length, by the method shared by all six skills (frontmatter dropped, fenced code removed, tokens with a letter or digit counted): 1,832 words. Pass range 1,500 to 2,000.
- Validator: 0 errors and 1 warning (the missing evals file). Self-test: all passed. Generated files: all fresh.
- The 2.3.0 owner answers were copied as they are. This page now counts them as decided.

## Staged: 2.4.2 and 2.4.3, for the dev session (2026-11-17)

Update, 2026-11-17: the build session reports the skill built out to 2.5.0 and gives the gap list below, where the skill is ahead of this card (built, not just planned). Checked against the repo the same day: `origin/main` is still 2.4.1, and no `score-page.mjs`, `evals/evals.json` or score fixture exists on any ref. So the 2.5.0 work is not in this GitHub repo; it is in the build session's own copy, and this card stays at 2.4.1 until it lands here. The list is the build session's report, not verified from the planning session.

| # | Reported built in the skill (2.5.0) | On this card |
| --- | --- | --- |
| 1 | Citability figure re-sourced to the study (arXiv 2311.09735) | still credits the restating skill |
| 2 | Report: run each AI prompt several times, report how often Wugweb appears | not there |
| 3 | Content-Signal robots.txt note | not there |
| 4 | Keyphrase score built (`score-page.mjs`, rubric, bands, fixture) | Planned |
| 5 | Internal-link checks built (anchor mix, silo, redirected, nofollow, too-many, cloaked prefix) | Planned |
| 6 | Rank Math PRO net-new built (VideoObject, indexed status, utility noindex, any-URL) | Ingested and planned |
| 7 | `score-good.html` fixture and score self-test cases | not mentioned |
| 8 | `evals/evals.json` exists | card said it was missing |
| 9 | Version 2.5.0 | 2.4.1 |

Caught up, no longer a gap: the standing-rules path and the proof-map link ruling, both repo 2.4.1 edits now folded into 2.5.0.

The versions diverge: app copy 2.4.0, repo master 2.4.1, build copy 2.5.0. The 2.4.2 and 2.4.3 edits below fold into the 2.5.0 sync. Saving and pushing happen from the dev chat (`cse_01UQ9TRqokKf1xMCS1JD3brM`), not from here.

Not applied here. The repo master stays 2.4.1 until the dev session (`cse_01UQ9TRqokKf1xMCS1JD3brM`), the only place that saves the app copy and pushes the skill, applies these, runs the scripts, saves and pushes.

- 2.4.2, `references/report.md`, AI answer sample: run each prompt several times, since the same prompt gives a different answer each run; report how often Wugweb appears across runs, not a single result.
- 2.4.2, `references/audit.md`, citability: re-source the self-contained figure to the study itself (Princeton, Georgia Tech and IIT Delhi, 2024, arXiv 2311.09735; third-party figure). Anchor note: the repo 2.4.1 row reads only "50 to 200 words" and carries no earlier third-party clause, so this adds the study clause to that row rather than replacing one. The paste's "Current" for this edit does not match the repo master.
- 2.4.3, `references/audit.md`, crawler section: after the `sitemap-listed` line, report, but do not require, a Content-Signal line in robots.txt. Emerging AI-usage syntax; no search engine ranks on it; the choice is the owner's.
- Then bump the version to 2.4.3 in `SKILL.md`, `metadata.json` and `README.md`, add the 2.4.2 and 2.4.3 changelog entries, run `node scripts/validate.mjs` and `scripts/test.mjs`, run `scripts/build.mjs` to regenerate `AGENTS.md` and the adapters, save the app copy and push.

### Push and verify 2.5.0 (for the dev session)

This planning session cannot push. The dev chat (`cse_01UQ9TRqokKf1xMCS1JD3brM`) has write access to the repo and the app copy. Give it this runbook plus the 2.5.0 files (the project's `skills/wugweb-seo/`, or the `wugweb-seo-2.5.0.zip` / `wugweb-seo.skill`).

Push, on a branch so main is untouched until diffed:

```bash
git checkout -b skill/wugweb-seo-2.5.0
# copy the 2.5.0 folder over .claude/skills/wugweb-seo/
node .claude/skills/wugweb-seo/scripts/validate.mjs   # expect 34 checks, 0 errors
node .claude/skills/wugweb-seo/scripts/test.mjs       # expect All passed
node .claude/skills/wugweb-seo/scripts/build.mjs      # regenerate AGENTS.md + adapters
git add .claude/skills/wugweb-seo
git commit -m "wugweb-seo 2.5.0: keyphrase score, internal-link + PRO checks, research edits"
git push -u origin skill/wugweb-seo-2.5.0
```

Then diff the branch against the nine:

| # | Claim | Verify in |
| --- | --- | --- |
| 1 | Citability figure sourced to arXiv 2311.09735 | `references/audit.md`, citability table, "Self-contained" row |
| 2 | AI-answer prompts run several times | `references/report.md`, AI answer sample, step 2 |
| 3 | Content-Signal robots.txt note | `references/audit.md`, crawler section, after the sitemap-line sentence |
| 4 | Keyphrase score built | `scripts/score-page.mjs` (new); `references/audit.md` score section; `SKILL.md` audit step 4 |
| 5 | Internal-link checks built | `references/audit.md`, internal-link checks section |
| 6 | Rank Math PRO net-new checks built | `references/audit.md`, PRO net-new section |
| 7 | Score fixture and self-test | `examples/score-good.html` (new); `scripts/test.mjs` score cases |
| 8 | evals present | `evals/evals.json`, 8 cases |
| 9 | Version 2.5.0 | `SKILL.md`, `metadata.json`, `README.md`, `CHANGELOG.md` top |

Fast check of 1 to 4:

```bash
grep -n "2311.09735" references/audit.md
grep -n "several times" references/report.md
grep -n "Content-Signal" references/audit.md
node scripts/score-page.mjs examples/score-good.html --keyword "care booking" --host wugweb.com
# expect a score of 89 of 100 (great)
```

Caveats carried from 2.5.0, so the card stays truthful:

- The keyphrase score, for the score only, scores keyword density, keyword in a subheading and title readability, overriding the skill's "never a density target" and "headings are claims" lines. Owner decision, 2026-11-17. If that changes, those three drop to report-only.
- "keyword not used before" is a warning, not scored, until a site-wide phrase map exists.
- The internal-link and Rank Math PRO checks are documented checks; only the keyphrase and page and robots checks are scripted. The rest run by reading.
- The standing-rules pointer is a repo path; a standalone GPT export needs the rules pasted in.

Divergence, not one of the nine: repo 2.4.1 and this project's 2.4.1 were different edits under the same number. 2.5.0 pulled the repo's two in (the standing-rules path and "proof map wins"), so after the push the branch holds both. Confirm:

```bash
grep -n "STANDING-RULES.md" SKILL.md
grep -n "proof map" references/handoffs.md
```

Pushed 2026-11-17: a verbatim copy of the 2.5.0 app build is on branch `skill/wugweb-seo-2.5.0` (commit fc4042e1), based on `origin/main`, so main stays 2.4.1. The score demo gives 89 of 100 and the four score self-tests pass. Two blockers before merge, from `validate` (2 errors): the `name:` line is re-quoted, regressing the 2.4.1 unquote fix and making `build.mjs` emit a mis-named Cursor adapter; and `evals/evals.json` is absent, so claim 8 is unmet in this copy. Fix the name, add the evals, rebuild, then diff and merge. This closes items 1 to 7 and 9 of the nine, confirmed by the greps and the score run; item 8 (evals) stays open.

Fixed 2026-11-17 (commit 89bb51c1): the `name:` line is unquoted and the skill rebuilt, and `evals/evals.json` is added with 8 cases across plan, audit, score and report. `validate` now reports 34 checks, 0 errors, 0 warnings and the self-tests pass, so all nine claims are met. The branch `skill/wugweb-seo-2.5.0` is ready to diff and merge to main; main is still 2.4.1 until the owner merges.

Merged 2026-11-17 (merge 4828533d) on the owner's instruction: `skill/wugweb-seo-2.5.0` is in main, which now holds 2.5.0 with `score-page.mjs` and `evals/evals.json`. The merge was clean (no file overlap with the doc commits), and `validate` on the merged tree read 34 checks, 0 errors, 0 warnings with the self-tests passing. So the repo master is 2.5.0; the earlier "repo 2.4.1" lines on this page are superseded.

## Planned: on-page keyphrase score (2026-11-17)

The owner asked for a score like Rank Math's, built into the audit part beside the citability score. Citability is the AI-answer score; this is the search score. Source of truth: Rank Math `seo-by-rank-math` 1.0.280, `assets/admin/js/analyzer.js`, read 17 Nov 2026. The engine runs client-side only; the new PHP ability `rank-math/analyze-post-content` hands an agent the content and the rubric link, `rankmath.com/kb/score-100-in-tests/`. The weights below are extracted, not invented. RankWeb has no score of its own; it reads Rank Math's through `rank_math_seo_score`.

One focus keyphrase per page. Each test earns fixed points; sum them, normalise to the applicable maximum, give 0 to 100. Grade bands, the engine's own: bad 50 or less, ok 51 to 80, great over 80.

Owner decision, 17 Nov 2026: build the score faithful to Rank Math, no softening. Keyword density, keyword in a subheading and the title readability tests are scored as below. This overrides, for the score only, the earlier "never propose a density target" and "headings are claims" lines. The skill still writes no copy: it scores, `wugweb-work` acts.

Focus keyphrase:

| Test | Points | Passes when |
| --- | --- | --- |
| keyword in title | 36 (38 non-English) | the title holds the phrase |
| keyword in permalink | 5 | the slug holds the phrase |
| keyword in the first 10% | 3 | the phrase is in the opening tenth of the body |
| keyword in content | 3 | the phrase is in the body |
| keyword in a subheading | 3 | the phrase is in an H2 to H6 |
| keyword in an image alt | 2 | the phrase is in one image's alt |
| keyword in the description | 2 | the phrase is in the meta description |
| title starts with keyword | 3 | the title begins with the phrase |
| keyword density | 0 / 2 / 3 / 6 | below 0.5% fail, 0.5 to 0.75% fair, 0.76 to 1% good, 1% or more best |
| keyword not used before | warning, 0 points | the phrase is not another page's focus |

Content, links, URL, title readability:

| Test | Points |
| --- | --- |
| content length | 2500 words or more 8, 2000 or more 5, 1500 or more 4, 1000 or more 3, 600 or more 2, else 0 |
| has image or video | images (1 is 1, 2 is 2, 3 is 4, 4 or more is 6) plus videos (1 is 1, 2 or more is 2), capped at 6 |
| short paragraphs | 3 |
| table of contents | 2 |
| internal link present | 5 |
| external link present | 4 |
| not all links external | 2 |
| permalink length, URL 75 characters or fewer | 4 |
| title sentiment / power word / number | 1 / 1 / 1 |

Dropped as not on the site: the two WooCommerce tests, product schema and review. The two title word-list tests are no longer blocked. Power words: use a public power-word list; Rank Math ships 1,103 English words per locale at `assets/vendor/powerwords/en.php` (GPL), so the skill ships its own or adapts a public list and copies no plugin file. Sentiment (English only): a title earns the point if it holds any word in the AFINN-165 list (the `sentiment` npm package); non-English scores null, as Rank Math does. Still open: "keyword not used before" needs a site-wide map of each page's phrase.

Build prompt, for the dev session that holds the skill files, not this one:

```
Add an on-page SEO score to wugweb-seo, modelled on Rank Math's engine, as a
new audit step. It scores one page against one focus keyphrase and returns a
0 to 100 number with a per-test breakdown. It does not write copy.

SOURCE OF TRUTH
Rank Math seo-by-rank-math 1.0.280, analyzer.js. Weights and bands below are
extracted from it, not invented. Rubric: rankmath.com/kb/score-100-in-tests/.

GRADE BANDS (the engine's own): bad <=50, ok 51 to 80, great >80.

TESTS AND POINTS
Focus keyphrase: keyword in title 36 (38 non-English); in permalink 5; in
first 10% of body 3; in content 3; in a subheading (H2 to H6) 3; in an image
alt 2; in meta description 2; title starts with keyword 3; keyword density
0/2/3/6 for <0.5% / 0.5 to 0.75% / 0.76 to 1% / >=1%; keyword not used before
= warning, 0 points.
Content: length 8/5/4/3/2/0 at 2500/2000/1500/1000/600/below; assets capped at
6, images {1:1,2:2,3:4,>=4:6} plus videos {1:1,>=2:2}; short paragraphs 3;
table of contents 2.
Links: internal present 5; external present 4; not all external 2.
URL: permalink length 4 when the URL is 75 characters or fewer.
Title readability: sentiment 1, power word 1, number 1.
Score = earned / applicable-max * 100, rounded.

DO NOT soften these to report-only. Density, subheading keyword and the title
readability tests are scored as above (owner decision, 17 Nov 2026, overriding
the earlier "never propose a density target" and "headings are claims"
carve-outs for the score only). The skill still never writes the copy: it
scores, wugweb-work acts.

SITE MAPPING
- permalink = the canonical URL path.
- focus keyphrase = the Notion focusKeyword field (layout-shell proposal), or
  passed in with --keyword. If none, skip the keyphrase tests and say so.
- Drop the two WooCommerce tests (product schema, review).

WORD LISTS (resolved)
- Power words: use a public power-word list. Rank Math ships 1,103 English
  words per locale (assets/vendor/powerwords/en.php, GPL); ship the skill's
  own list, do not copy the plugin file verbatim.
- Sentiment (English only): a title scores the point if it holds any word in
  the AFINN-165 list (the "sentiment" npm package). Non-English scores null.
- "keyword not used before" still needs a site-wide map of each page's phrase.

HOW TO BUILD
- New script scripts/score-page.mjs: reads one HTML file and --keyword, reuses
  the parsing in check-page.mjs, prints per-test points, the total and the
  grade; --json for the machine form. Node 18, no packages.
- New section in references/audit.md with this table and the bands.
- A short audit step in SKILL.md pointing to it, beside the citability score,
  which stays (it is the AI-answer score; this is the search score).
- Fixture + test.mjs cases: one page that scores well, one that scores badly.
- Bump the version, rebuild AGENTS.md and adapters, run validate and test.

Report the files changed, the test output, and any open question.
```

### The build, broken into functions

`scripts/score-page.mjs`, Node 18, no packages. Reuse the HTML parsing in `check-page.mjs`.

Parsing and data:

- `parse(html)` returns `{ title, description, path, body, words, headings, images, links, paragraphs, videos }`. `path` is the canonical URL path; `links` carry `{ href, text, rel, internal }`.
- The file ships three lists: `POWER_WORDS` (a public power-word list), `AFINN` (the sentiment map, English only), `GENERIC_ANCHORS` (click here, read more, this page).

One function per test, each returning `{ id, points, max, pass, note }`:

| Function | Max | Points when |
| --- | --- | --- |
| `keywordInTitle(title, kw)` | 36 | the title holds the phrase |
| `titleStartsWithKeyword(title, kw)` | 3 | the title begins with the phrase |
| `keywordInDescription(desc, kw)` | 2 | the description holds the phrase |
| `keywordInPermalink(path, kw)` | 5 | the slug holds the phrase |
| `keywordInFirst10pct(body, kw)` | 3 | the phrase is in the opening tenth |
| `keywordInContent(body, kw)` | 3 | the phrase is in the body |
| `keywordInSubheadings(headings, kw)` | 3 | the phrase is in any H2 to H6 |
| `keywordInImageAlt(images, kw)` | 2 | the phrase is in one alt |
| `keywordDensity(body, kw)` | 6 | 0 below 0.5%, 2 at 0.5 to 0.75%, 3 at 0.76 to 1%, 6 at 1% or more |
| `keywordNotUsed(kw, siteMap)` | 0 | warning only; needs a site-wide phrase map |
| `contentLength(words)` | 8 | 8, 5, 4, 3, 2, 0 at 2500, 2000, 1500, 1000, 600, below |
| `contentAssets(images, videos)` | 6 | images 1 to 1, 2 to 2, 3 to 4, 4 or more to 6, plus videos 1 to 1, 2 or more to 2, capped at 6 |
| `shortParagraphs(paragraphs)` | 3 | no paragraph over the long-paragraph limit |
| `hasTOC(html)` | 2 | a table of contents of in-page anchors is present |
| `linksHasInternal(links)` | 5 | at least one internal link |
| `linksHasExternal(links)` | 4 | at least one external link |
| `linksNotAllExternal(links)` | 2 | not every link is external |
| `permalinkLength(url)` | 4 | the URL is 75 characters or fewer |
| `titleSentiment(title)` | 1 | the title holds an AFINN word, English only |
| `titleHasPowerWord(title)` | 1 | the title holds a `POWER_WORDS` word |
| `titleHasNumber(title)` | 1 | the title holds a digit |

Aggregate and run:

- `score(results)` returns `{ earned, applicable, value, grade }`, where `value` is `round(earned / applicable * 100)` and `grade` is bad at 50 or less, ok at 51 to 80, great over 80. A test with max 0 and the keyphrase tests when no keyphrase is given are left out of `applicable`.
- `main()` reads `--keyword`, `--host` and `--json`, prints one line per test then the score and grade, and exits 0. A page with no keyphrase runs only the non-keyphrase tests and says so.

### Internal-link checks, broken into functions

For the audit part (a helper beside `check-page.mjs`), each returning findings, never writes:

- `anchorType(text, href, kw, brand, generics)` returns one of exact, partial, branded, generic, naked or image.
- `anchorMix(links)` returns the percent of each type and warns when exact match goes over the setting, default 20%.
- `siloCheck(links, clusters)` flags a supporting-to-supporting link across two clusters; a cross-cluster link should hit the other cluster's hub.
- `tooManyLinks(links, limit)` flags a page over the limit, default off.
- `redirectedInternal(links, redirects)` flags an internal link that lands on a 301.
- `internalNofollow(links)` flags `rel=nofollow` on an internal link.

## Planned: internal-link SEO checks (2026-11-17)

From the four Internal Link Juicer articles (anchor text, silos, link distribution, internal links) and Rank Math's PRO link report, read 14 to 17 Nov 2026. These are SEO audit items, not the score. The audit part already covers orphans, click depth, dead ends, generic anchors, hub backlinks and broken internal links. Net new, proposed for the audit part:

| Check | What | From |
| --- | --- | --- |
| anchor-text type mix | classify each internal anchor as exact, partial, branded, generic, naked or image alt; warn when exact match goes over a set share, default 20% | ILJ anchor text, link distribution |
| silo or cluster coherence | a cluster's supporting pages link to the hub and to each other; a link to another cluster goes to that cluster's hub, not its supporting pages | ILJ silos |
| redirected internal links | an internal link that lands on a 301 points at the final address instead | Rank Math link report |
| internal nofollow | flag `rel=nofollow` on an internal link | ILJ internal links |
| too many links | flag a page over a set link count, default off, a house number, since Google dropped the old 100-link rule | ILJ link distribution |
| cloaked or external prefix | a path prefix the owner sets, such as `/go/`, counts as external for the mix and the audit | Rank Math |

These stay checks, not writes. Findings go to `wugweb-work` (anchor wording, placement) or a developer (`rel`, redirects). `wugweb-strategy` owns the cluster map; the skill checks the links against it.

## Ingested: Rank Math PRO list, mapped to the skill (2026-11-17)

The owner shared the full RankWeb history: the internal-link build and the 83 Rank Math PRO features (`rankmath.com/free-vs-pro`, read 14 Nov 2026). Read from an SEO point of view, most of that list is not new to wugweb-seo. This records where each item lands, so nothing is lost. The RankWeb page holds the 83-feature sort and the build prompts; this is the wugweb.com cross-section only.

Already in the skill's three parts:

- Report part already owns the "InsightWeb" group: rankings and position history, winners and losers, impressions with a low click rate as a quick win, AI-assistant referrals as their own line, and Core Web Vitals or PageSpeed readings (PRO 1, 8, 31 to 37, 53, 66, 68, 69).
- Plan part already owns search intent and the rank-tracker data-source question (PRO 2, 3, 82); the connector list and source gaps hold the data-source decision.
- Audit part already owns the link report, broken links and orphan pages, image alt, schema hygiene and the Rich Results Test, and the cloaked-prefix rule (PRO 6, 7, 65, 18, 39, 74).

Net new for the audit part, proposed:

| Check | What | PRO ref |
| --- | --- | --- |
| VideoObject present | a page that embeds a video carries `VideoObject` with name, thumbnail, upload date and duration. Conditional: the site has little video today | 25, 67 |
| indexed status | read Search Console URL Inspection for a page and report indexed, excluded, or crawled and not indexed. Needs the Search Console connection | 9 |
| utility pages noindex | a thank-you, preview or download page carries `noindex` and stays out of the sitemap | 71, and the ILJ "do not link" list |
| any-URL audit | the audit already reads any HTML, so it runs on a competitor's address for a side-by-side; the plan part's competitor gap uses it | 80, 81 |

Translated to the Astro stack. wugweb.com is Astro on Cloudflare, content in Sanity and Neon, media in R2. There is no WordPress, no Rank Math and no plugin, so the skill is the SEO layer and there is nothing to defer to. Each item below is a skill rule, a spec the skill hands to the layout or a maker, or genuinely not applicable.

Owned by the skill as a rule or spec:

- **Schema spec per page type** (PRO 10, 40 to 48, 73): the skill owns which `@type` each page carries and the shape of the graph, the skill's version of a schema builder. Fixed: case study `WebPage` + `CreativeWork` + `BreadcrumbList`, no author; blog post `BlogPosting` with a `Person` author; `Organization`, `WebSite` and the founder sitewide. To decide: service pages, home, about. Allowed types only; `HowTo`, `Review` and `AggregateRating` stay banned. `JsonLd.astro` builds it from Sanity and Neon; the skill specs and audits it.
- **Per-page schema override and automatic rules** (PRO 38, 43): a per-page schema field (the layout-shell `schemaType` proposal) and a "this section gets this template" rule become Sanity or Neon settings. The skill states the rule; the dev builds it.
- **Import schema from a URL** (PRO 13): the audit may read a competitor's JSON-LD as a reference, never to copy it.
- **Redirects on Cloudflare** (PRO 50, 63, 70): wugweb.com adds no redirects for old or Framer addresses (owner rule), so there is nothing to build; where a client site needs them, redirects live in the Cloudflare `_redirects` file, one hop, and the skill audits the chain. No `.htaccess`: the stack is not Apache.
- **Broken-address and 404 report** (PRO 72): the report part reads 404s from Cloudflare Web Analytics and flags addresses that should 301 or 410.
- **Site-wide SEO field table** (PRO 22, 56, 57, 61 to 64): the "bulk edit" equivalent. The skill produces a table of every page with its title, description, focus keyword, robots and schema state, and proposes fixes as current to proposed; the maker writes them in Notion or Sanity. The skill never bulk-edits a record itself.
- **Share image spec** (PRO 18, 55, 75, 76, 83): `og:image` present, 1200 by 630, with alt; the audit flags a missing or wrong-size share image and weak alt. Generating the image or a watermark is `wugweb-kits` or `wugweb-work`; writing alt is `wugweb-work`.

Client-site only, turned on when a client needs it (the skill covers client sites too):

- Local SEO with several locations and `LocalBusiness` schema (PRO 19, 51); WooCommerce `Product` and `Offer` schema (PRO 20); News and Video sitemaps (PRO 16, 17). None applies to wugweb.com today. The skill holds the rule and turns it on per client site.

Not applicable to a skill:

- Plugin UI and account features: the modules on and off screen, setup wizard, role manager, Tools tab, settings import and export (PRO 54), client management and white label (PRO 12, 26, 30). A skill has no plugin to switch on or accounts to manage. The nearest thing is the owner choosing which of the plan, audit and report parts to run.
- Podcast, EDD, bbPress, Elementor and Divi (PRO 21, 23, 49, 58 to 60): platforms the site does not use.

## Works beyond Claude

| Requirement | Plan |
| --- | --- |
| Rules any model can follow | The skill body and references are plain Markdown, with no Claude-only syntax. The body holds every core rule on its own; references add detail only, because other tools may not load them |
| Helpers optional | Every helper skill, plugin and connector is optional. Each part has a by-hand route: read the page source, export from Search Console, sample prompts by hand. The absorbed rules above make this possible |
| Scripts | Plain Node, no packages, no Claude tooling. They need Node 18 or later. Run here on 2026-11-17: the validator reports 0 errors and the self-test passes |
| Tool and vendor wiring | In one file only. Everything else names no vendor |
| Single-file export | One Markdown file holding the body and references, to paste or attach in GPT, Cursor or another tool. 2.1.0 already generates `AGENTS.md` and adapters |
| Test | The same three tasks (one brief, one page audit, one report) run from the export and from the installed skill; passes when the outputs match on every pass or fail value |

Works only in Claude today:

- The search-data connectors.
- The helper skills from plugins.
- Reading Notion and checking a page through the browser pane.

Outside Claude those steps are done by hand or with that tool's own access.

## Connectors for search data

Listed from the tools attached to the planning session. None was run, so access is unvalidated.

| Connector | What it could supply | State |
| --- | --- | --- |
| Ahrefs | Search Console keywords, pages and history; keyword volume and difficulty; rank tracking; site audit issues; backlinks; Brand Radar for AI answer mentions; web analytics | Attached; plan access not tested |
| OpenSEO | Search Console performance; GA4 organic and landing-page reports; rank tracker; site audit; AI visibility tracker; keyword research | Attached; uses credits; not tested |
| OpenRush | Search performance; website analytics; SERP and keyword facts; backlinks; AI visibility and citations | Attached; needs an owned-data connection for Search Console and analytics |
| SE Ranking | Keyword, rank and audit data for the seo-skills helpers | Signed out; needs the owner's sign-in |
| Similarweb | Competitor traffic | Signed out; optional |
| Search Console and GA4 directly | The source data | No direct connection confirmed; the verification method is open in `pending.md` |

Until one is confirmed, the report part returns "unvalidated" and ranks by intent and business fit.

## Source gaps

- The live case-study page still emits `author` and no WebPage node. That is a code item under the wugweb-work plan.
- No schema rules exist for the blog index, service pages, home or about.
- JSON-LD cannot be checked on staging; only through a local preview with the main site address.
- The shared standing-rules file now exists: `docs/skills/STANDING-RULES.md` on main, approved by the owner in the wugweb-work session. No longer a gap.
- The Notion "Wugweb SEO" page (last updated 2026-10-14) still lists case-study schema as "Organization, Person, CreativeWork, BreadcrumbList".
- The repo copy 2.4.1 was read in full for this update (skill body, changelogs, handoffs). The other references and the scripts were run through the validator and self-test, not read line by line. `evals/evals.json` is missing from both copies.

## Open items from the coordinator (2026-11-17)

Six SEO items the coordinator flagged as not fully handled, mapped to this plan:

1. 2.5.0 build not on main. Tracked under "Staged" above: `origin/main` is 2.4.1; no `score-page.mjs`, evals or fixture on any ref. The build is in the dev chat only and nobody has pushed it here. The biggest gap.
2. Kits field clashes need the owner's answer. The skill's position is under "From the kits design-system docs" (`faqs` settled by 2.3.0; `seoCanonicalUrl`, `schemaType` for case studies, `aiSummary` and `keyTakeaways` are clashes). Owner confirmation added to "Waiting on the owner".
3. Word count. Reported: 1,832 words for the repo 2.4.1 body by the shared method (see "Repo master copy"). The 2.5.0 body will differ once the new audit step lands; recompute then. The old 2,193 and "under 2,000" figures used other methods.
4. Open questions. The owner-decision list is "Waiting on the owner"; the LinkedIn, Behance and Dribbble title and tag notes are specced under "Platform keyword note".
5. Made-file sizes. Open: confirm LinkedIn, Behance, Dribbble and story-safe-zone share-image sizes; og 1200 by 630 is settled. Added to "Waiting on the owner".
6. App copy lost. The wugweb-seo app copy is gone and needs the zip re-uploaded. Owner action; added to "Waiting on the owner". Rebuild from the repo copy plus the 2.5.0 build once pushed.

## Matrix row

- **Owns:** Keywords and search intent; on-page rules for title, description and headings; schema and JSON-LD rules; technical SEO checks; AI search readiness; search reporting, for the whole site: case studies, blog posts, service pages.
- **Reads (sources):** Rendered pages; BaseLayout and JsonLd output; robots.txt and sitemap.xml; Notion Case Studies, Blogs and Wugweb SEO pages; Search Console, GA4 and SEO tool exports; the shared standing rules file, `docs/skills/STANDING-RULES.md`.
- **Gives to:** `wugweb-strategy`: site keyword and intent map, topic gaps, refresh list with position and click-rate signals, search reports. `wugweb-work`: keyword notes and budgets for one brief, platform keyword notes, fix list, JSON-LD check and citability score. `wugweb-kits`: findings that repeat across a block.
- **Takes from:** `wugweb-strategy`: business goal, audience, page list, pillar and cluster structure. `wugweb-work`: topic, client, audience, approved body, rendered page URL, wording. `wugweb-kits`: its check result. `wugweb-brand-os`: approved name, descriptor and facts. Nothing from `wugweb-voice`.
- **Never does:** Writes or changes copy, titles or headings. Writes to Notion, Sanity or R2. Edits code, robots or sitemap. Sets layout, tokens or the publishing plan. Adds HowTo, review stars or llms.txt, or asks for FAQPage to win search. Invents a number.

## Full read, 2026-11-19: the md files and what needs changing

The skill's 26 files were read on 2026-11-19 from main (`4fbf334c`) by a read-only reviewer for the coordinator: 22 in full, the two large single-file copies by their first 150 lines plus a diff, the Cursor rule by its header. Nothing in the skill folder was changed. Checks: `test.mjs` all 25 pass; `build.mjs --check` fails (`AGENTS.md` stale); `validate.mjs` 34 checks with 1 error (the same stale file). The list below is for the seo session to act on; line numbers are as of that commit.

### The md files the skill carries

| File | What it is | Kind |
| --- | --- | --- |
| `SKILL.md` | Method, fixed rules, the three parts | Authored |
| `README.md` | Package table, install, run | Authored |
| `CHANGELOG.md` | History | Authored |
| `references/plan.md`, `audit.md`, `report.md`, `handoffs.md` | Per-part check lists and sibling links | Authored |
| `references/standing-rules.md` | Copy of the home file; matches it | Copy |
| `AGENTS.md` | The whole skill in one file | Generated |
| `adapters/cursor/wugweb-seo.mdc`, `adapters/chatgpt/instructions.md` | Cursor rule and ChatGPT instructions | Generated |
| `export/wugweb-seo.md` | Single-file export | Placed by hand; no script writes it |

### Needs changing in the skill

1. `AGENTS.md` is stale. It lacks the "API keys and secrets" section of the standing rules (reference lines 65 to 71) and still has the `MARKED COPY` comment at line 291, which commit `c46bae17` removed from the reference.
2. Rebuild trap: do not simply run the build. `test.mjs` line 69 requires the text `MARKED COPY` in `AGENTS.md`; the reference now has it only in lower case, so after a rebuild that test fails. Restore the marker or change the test, then rebuild.
3. `export/wugweb-seo.md` (added on 2026-11-19 in `4fbf334c`, copied from the app's installed copy on the owner's word) is `AGENTS.md` plus a 4-line header, so it has the same missing section. Its line 5 says "Generated by scripts/build.mjs", but `build.mjs` writes four outputs and no export. The other six skills' build scripts all write their export.
4. `test.mjs` lines 65 to 70 never open the export; the test named "export carries the marked copy" reads `AGENTS.md`. `validate.mjs` ignores `export/` too.
5. `SKILL.md` line 3: the description has no quoted trigger phrases, unlike the siblings. `validate.mjs` line 34 rejects a description that starts "This skill", so the validator must change with it.
6. `wugweb-engineer` is named nowhere: `SKILL.md` lines 91 to 92 say "the maker skill writes it", line 228 and `audit.md` line 237 say "a developer"; `handoffs.md` has no row although its line 4 says every link reads the same on both sides; `metadata.json` leaves it out. The engineer skill says seo sets schema type and field values and engineer applies them.
7. Keyword note: `SKILL.md` lines 97 to 99 and `plan.md` line 87 say work asks seo; `handoffs.md` lines 16 and 46 to 47, and the work skill, say work reads it from the brief.
8. Link targets: `handoffs.md` lines 92 to 95 say seo "picks the other link targets" (under the wrong heading); `SKILL.md` line 115, `handoffs.md` lines 52 to 53 and `plan.md` line 56 say strategy decides.
9. The 52-character title limit for blog and service pages (`SKILL.md` line 78) is not carried through: `plan.md` line 53 says other types are not decided and `check-page.mjs` line 41 prints the same.
10. `README.md`: line 96 (blog and service limits "not decided") is stale; line 97 says evals have not been run, against this plan; the package table leaves out `references/standing-rules.md`, `export/` and `examples/score-good.html`; line 14 leaves out the keyphrase score.
11. `metadata.json` line 5 says two check scripts; there are three.
12. `audit.md` lines 8 to 16: the contents list is not in section order.
13. `validate.mjs` line 42 says "six skills"; there are seven.
14. `SKILL.md` line 267 still lists training bots as open; the owner allowed them on 2026-11-17.

### Needs changing in this plan

- Lines 3 and 25 say 25 files; there are 26. Line 4 says validate has 0 errors; it has 1.
- Line 25 says the export is still not on main; it is, since `4fbf334c`.
- Line 62 says schema for service, home and about pages is not decided; line 94 and the skill say decided.
- Line 98 ("keep the pointer") and the open boxes at lines 114, 127, 128 and 131 are superseded.

### Worth knowing

- The skill's content changed three times under 2.5.0 with no version change, on the owner's instruction.
- `validate.mjs` lines 72 to 73: the check-id pattern has no `share-` prefix, so `share-tags` and `share-url` are not covered by the documentation check.
- `check-robots.mjs` line 68: `sitemap-listed` prints only in text mode, not with `--json`.
