# Plan: fold three items from the second assistant's plan into the wugweb-work plan

## Context

A second assistant produced its own "Wugweb Skill System" plan. Most of it conflicts with owner decisions already recorded (fixed About/Challenge/FAQ structure, FAQPage schema, digital twin inside this system, Notion vs Sanity treated as open, keyword-based screen picking). The owner chose to take three useful parts only: handoff contracts, a per-task test table, and the CI question for the token audit. SEO stays as the one installed `wugweb-seo` skill. `ui-system-mapper` is a separate skill and is not changed here.

Docs only. No skill files, no site code, no Sanity write, no case-study row in Notion.

## Changes

Two places get the same three additions, Notion first:

- Notion page "wugweb-work skill: plan (final for vetting)" (`415bb710b9ab818b8057cc9b2c2ed922`): targeted inserts, nothing removed.
- `docs/skills/wugweb-work/PLAN.md`: same text, in part 7 (skill map), part 11 (doing it) and part 2 (decisions). Commit by path, Wugweb trailer, push.

### 1. Handoff contracts (new section after "Skill map")

One table. Columns: Helper · Called in mode · Goes in · Comes out · May not do.

| Helper | Mode | Goes in | Comes out | May not do |
|---|---|---|---|---|
| `wugweb-seo` (one skill; a plan / audit / report split is not installed) | Brief, SEO/Schema, after deploy | Topic, client, audience; later the rendered page URL | Keyword and intent notes for the brief; an issue list for the page; a traffic note after launch | Write case-study copy; add FAQPage, HowTo or llms.txt; change titles in Notion |
| Copy helpers (`content-and-copy`, `copy-proof-check`, `copy-edit`, `ux-copy`) | Body | Draft text plus the owner's evidence | Claims ledger, edit suggestions, caption and alt drafts | Add a fact or number; write to Notion |
| Voice helpers (`brand-voice-enforcement`, `brand-review`) | Body | Draft text, `brand_guidelines/` | List of voice breaks with fixes | Rewrite meaning; override the writing-style rules |
| Design review (`design-critique`, `ux-ui-audit`, `design-qa`, accessibility skills) | Look, Ship | Asset URLs or the rendered page | Findings with measured values | Change code; store screenshots as files |
| Layout helpers (`frontend-design`, `design-taste-frontend`, `superdesign`, `responsive-token-engine`) | Layout | Block plan, tokens, layout shell | Layout options as proposals | Add hardcoded values; add a block type outside the catalogue |
| `ui-system-mapper` (separate skill) | Ship, on request | The `Case*` components and tokens | Findings by rule id | Delete tokens or refactor without the owner's yes |
| Schema helpers (`generate-schema`, `schema-markup`, `seo-schema`) | SEO/Schema | Approved body, page facts | JSON-LD draft | Emit FAQPage, HowTo, Review stars or `author` |
| Sanity helpers | Part 2 only | Schema file | Modelling advice | Deploy the Studio; write documents |
| Forms helpers (slides, pptx, pdf, social writers, `postiz`, dataviz) | Forms | Approved body and media URLs | The other form as a draft | Publish or schedule without the owner's yes; invent facts |
| Media-making helpers (og image, banner, image prompt) | Forms | A request approved per file | One file, proposed first | Run without a yes for that file; place a file in the repo |

Rule under the table: every helper returns a proposal or a report. Only `wugweb-work`, after owner approval, writes anything.

### 2. Per-task test table (new section in "Doing it", before "Definition of done")

| Task | How it is tested | Passes when |
|---|---|---|
| Body parsing | Unit tests on real bodies: rich, thin tab-indented, two-line points, `####`, trailing colon, raw link meta, v2 sample | Every body yields 2 or more sections, no leaked `#`, no lost point |
| Media manifest | Header parsers on fixture bytes; dry run over all bodies | Every file has status, size, pixel size, shape; duplicates and borrowed files flagged |
| Visual read | Eval 5: 12 IndusNinja files plus one loop | Wrong-client files flagged by look; screens ordered by step; each has what, kind, alt, caption |
| Screen selection | NTUC | 12 proof screens in chapters, all 31 in All screens, 2 flagged screens hidden |
| All screens block | NTUC page | Set chips show Member 8, States 4, Dashboard 9, Back office 7, Cases 3; with JavaScript off every set is still on the page |
| Viewer | NTUC page, keyboard and touch | Caption and "n of N, set"; previous, next, Esc and swipe work; focus returns to the thumbnail |
| Layout | Block-plan fixtures for 8 case studies | Plan matches the checked-in fixture; no block outside the catalogue |
| Writing style | Evals 1 to 4 | No banned word, no dash, no unbacked claim, claim headings, lengths in range |
| SEO and schema | Gate script on the preview with the canonical host | Title 60 or fewer, description 140 to 160, canonical self, WebPage + CreativeWork + BreadcrumbList, no FAQPage |
| Page gate | Gate script at 375, 767, 768, 769, 1199, 1200, 1201 | One h1, no skipped level, every image with alt and size, no sideways scroll, nothing upscaled or cropped, all video muted, under 25 MB |
| End to end | One case study from audit to preview | Output matches the approved proposal; nothing written without approval |

### 3. Owner decision added to "Owner inputs"

- Token audit in CI: should serious findings from the token check (hardcoded colour, spacing and the like in `src/components/work/`) block a merge, or only be reported? Until decided: report only; the existing prebuild CSS guard stays as the one blocking check.

### 4. Vetting log and decisions

- Vetting log row, 2026-11-16: second assistant's consolidated plan reviewed. Taken: handoff contracts, per-task test table, CI question. Not taken, with the reason in one line each: fixed About/Challenge/FAQ structure, FAQPage and `author`, digital twin inside this system, Notion vs Sanity as an open question, canonical and redirect question, keyword-based screen picking, "leftover only" gallery, TinyFish and Bright Data as essential, its folder sketch.
- Decisions table row, 2026-11-16: SEO stays one skill (`wugweb-seo`) until a split is actually installed; `ui-system-mapper` is a separate skill.

## Verification

- Notion page: the three new sections are present; search for "FAQPage" still shows only "no FAQPage" wording.
- `PLAN.md`: same three sections; `git status` shows only that file and `CHANGELOG.md`; commit has the Wugweb trailer.
- Nothing else changed: no skill files, no site code.
