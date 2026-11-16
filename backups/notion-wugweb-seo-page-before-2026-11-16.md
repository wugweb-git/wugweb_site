<!--
Backup of the Notion page "wugweb-seo" before the alignment-plan merge.
URL: https://app.notion.com/p/41abb710b9ab818b8481d42beb053fef
Page last edited: 2026-11-16T16:25:29.005Z
Fetched for backup: 2026-11-16
Format: Notion-flavoured Markdown as returned by the Notion fetch. Icon: 🔎. Title: wugweb-seo.
-->

<callout icon="📌" color="gray_bg">
Part of the Wugweb Skill System. Plan stage only. Nothing goes to development until the owner says.
</callout>

## Skill card

| Field | Value |
| --- | --- |
| Name | <code>wugweb-seo</code> |
| Type | Claude skill, already installed as one skill |
| Status | Version 2.1.0 built on the owner's instruction, 2026-11-16. Files in the Skills project under <code>skills/wugweb-seo/</code>. The installed copy changes only when the owner saves it. |
| Planned in session | wugweb-seo |

## What it owns

Keywords and search intent, on-page rules (title, description, headings), schema, AI search readiness, technical checks and reporting, for the whole site. One skill with three parts inside:

| Part | Does |
| --- | --- |
| Plan | Keyword and intent notes, outline and constraints for a brief. Never writes copy. |
| Audit | Checks the rendered page and returns a prioritised fix list. Changes nothing itself. |
| Report | Rankings, traffic and AI answer visibility. Advisory. |

## What it does not own

- Writing the copy.
- Layout, tokens and code.

## Rules already fixed

- One slug per case study. No redirects for old or Framer addresses.
- Title 51 characters or fewer in the source; the site adds " \| Wugweb". Description 140 to 160.
- Structured data only on the main site address: WebPage, CreativeWork, BreadcrumbList. Wugweb is creator and publisher; no author.
- Never FAQPage, HowTo or review stars. No llms.txt.
- Notion is the source for case-study SEO fields and for blog posts.

## Helper skills

Lead: <code>searchfit-seo:generate-schema</code>, <code>rampstack-seo:seo-onpage</code>, <code>rampstack-seo:seo-keyword</code>, <code>searchfit-seo:content-brief</code>. Second opinion: <code>schema-markup</code>, <code>seo-schema</code>, <code>on-page-seo</code>, <code>seo-geo</code>, <code>seo-aeo-geo</code>, <code>sanity:seo-aeo-best-practices</code>, <code>seo-check</code>, <code>seo-images</code>. After deploy: <code>aeotester:audit</code>, <code>aeo-brand-scan:scan</code>. Added in 2.0.0 as a plan second opinion: <code>searchfit-seo:create-topic</code>.

## Hands off to and from

| With | Gives | Takes |
| --- | --- | --- |
| <code>wugweb-work</code>, <code>wugweb-content</code> | Keyword notes before writing; fix list after | Topic, then the rendered page |
| <code>wugweb-kits</code> | Requests to check alt text and lazy loading | Confirmation |

## Waiting on the owner

- [ ] Sign in to the SEO data connectors the report part needs.
- [ ] What the skill should cover for blogs and service pages.
- [ ] Confirm the title rule's reach: the skill applies "51 characters or fewer" to case studies only and marks other page types not decided.
- [ ] The title limit for blog posts and service pages.
- [ ] Whether AI training bots may crawl, per property. Search and citation bots stay allowed.
- [ ] Confirm the rule "headings are claims; never ask for a question heading" lives in <code>wugweb-voice</code> or <code>wugweb-work</code>. wugweb-seo only points to it.
- [ ] Save the 2.1.0 card so the installed skill matches these files.

## Plan

Alignment plan, 2026-11-16. Built as version 2.1.0. The page as it stood before this update is backed up in the Skills project at <code>claude/backups/notion-wugweb-seo-2026-11-16.md</code>.

### What changed from the installed 1.0.0

| Current (1.0.0) | Proposed and built (2.1.0) | Why |
| --- | --- | --- |
| Seven modes in one file | Three parts: plan, audit, report | This page fixes one skill with three parts |
| FAQPage schema suggested for comparison pages | Never FAQPage, HowTo or review stars | Rule already fixed on this page |
| llms.txt "optional, low priority" | No llms.txt | Rule already fixed on this page |
| Title 50 to 60 characters, brand last | Case-study source title 51 characters or fewer; site adds " \| Wugweb" | Rule already fixed on this page |
| H2 headings phrased as questions | Headings belong to the copy; the skill checks them, never rewrites | Wugweb headings are claims |
| Organization, WebSite, BreadcrumbList sitewide | WebPage, CreativeWork, BreadcrumbList; creator and publisher, no author | Rule already fixed on this page |
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
| Audit | Scripted checks, manual checks, citability score, fix list | <code>check-page.mjs</code> (13 checks), <code>check-robots.mjs</code> (15 bots) |
| Report | Period comparison, risers and fallers, quick wins, AI answer presence, cause of a drop | Search Console export or a connected data tool |

### Checks run on 2.1.0

- Format validator: 33 checks, 0 errors, 0 warnings. Body 1,566 words.
- Self-test: 17 of 17 passed on a passing page, a failing page and a sample robots.txt.
- Agent Skills validator: passed.
- The six evals are written and have not been run.
