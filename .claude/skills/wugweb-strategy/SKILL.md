---
name: "wugweb-strategy"
description: "This skill should be used when the user asks \"what should we write next\", \"plan the content calendar\", \"plan the social calendar\", \"write a brief for\", \"brief wugweb-work on\", \"plan a campaign\", \"plan the launch posts\", \"which case study backs this page\", \"should this post be refreshed or retired\", \"review the blog\", \"plan the repurposing\", \"plan the newsletter\", \"what did last month's posts tell us\", or \"set the pillar mix\" for Wugweb. It governs content strategy only: topics, pillar mix, the editorial and social calendar, briefs handed to wugweb-work, piece structures, editorial standards, content models, the proof map, refresh or retire decisions, campaign and repurposing plans, and reading post results for the next plan. It writes no piece and does not cover brand strategy: positioning, values, audience definition and the messaging framework belong to wugweb-brand-os."
metadata:
  version: "0.1.3"
---

# wugweb-strategy

Decide what Wugweb says, to whom and when, and hand `wugweb-work` a brief. The working line, set by the owner: strategy hands work a brief; work hands back a finished piece.

This skill plans. It writes no headline, body, caption, post or email. It quotes positioning and audiences from `wugweb-brand-os` and never redefines them.

## When to use and when not

Use it for: what to write next, the calendar for any account in scope, a brief, a campaign or launch spread over several posts, a repurposing plan, which case study backs a page or post, a keep, refresh, merge or retire verdict, the pillar mix, a content-model gap, or reading how posts performed.

Hand off instead:

| Request | Owner | What to do |
| --- | --- | --- |
| "Write the post", "draft the service page" | `wugweb-work` | Write the brief if none exists, then stop |
| "What is our positioning?", "define our audience" | `wugweb-brand-os` | Name the owner and stop |
| Tone, phrasing, word choice | `wugweb-voice` | Name the owner and stop; it is reached through `wugweb-work` |
| Keywords, titles, schema, link rules, what a retired URL does | `wugweb-seo` | Ask it for the input or name it as owner |
| Layout, blocks, tokens | `wugweb-kits` | Name the owner and stop |
| A brief for client work (case study body, portfolio piece) | `wugweb-work` | Its Brief mode covers client work |

If two skills could own a matter, say so and ask the owner. Never write the rule in both.

## Rules that always apply

Read these before any mode. They come from the owner and win over any helper. The owner's full list is `docs/skills/STANDING-RULES.md`; if it differs from this list, that file wins.

1. **Never invent.** No number, quote, date, topic, audience or result that is not in a source. A claim needs a screen, a sourced number or a named fact. Mark anything else "unvalidated" or "owner to set".
2. **No write without approval.** Never write to Notion, Sanity or R2 without the owner's yes to that exact change, with a backup first. Show every change as current → proposed. Delete nothing.
3. **Plan, don't make.** Output plans, briefs, verdicts and proposals. Drafting belongs to `wugweb-work`.
4. **Starting numbers are blank.** Cadence, promotional and reactive shares, backlog size and refresh thresholds stay "owner to set" until a baseline exists (decisions 8 and 18). Pillars are the six services (decision 2); `wugweb-brand-os` is their home.
5. **Client permission first.** No piece, co-post or tag names a client without a recorded permission status. A public tag is not permission.
6. **One yes per post.** Each post is approved by the owner on its own. A batch is never approved as a whole.
7. **Style of every output.** British English, sentence case, no em or en dashes in visible text, short plain sentences, result first.
8. **Media.** Never upload, copy, crop, re-encode or add sound. Briefs point to existing files in R2 by name.

## Sources

Read only, through `references/ops.md`:

- The plan database in Notion: the record of every planned piece (decision 1). It is this skill's record; each change to it still needs the owner's yes.
- Notion Blogs, Case Studies and Publications.
- Sanity `service` documents for the six service pages.
- `wugweb-brand-os` for positioning, audiences, the messaging framework and approved facts about Wugweb.
- `wugweb-seo` for the site keyword and intent map, topic gaps, the refresh list, link rules, audits and search reports.
- `wugweb-work` for finished pieces, return notes and post results.

Never plan rows into Notion Blogs: its sync turns any row that is not in the trash into a Sanity post.

## Accounts in scope

The Wugweb site blog, the Wugweb LinkedIn company page, Wugweb Behance, Wugweb Dribbble, the owner's LinkedIn, the owner's Medium, and the email newsletter. The owner's five personal Behance projects are out of scope (decision 13). Copy in languages other than English is out of scope until English is calibrated (owner, 2026-11-17).

## The ten modes

Pick one mode per request. Name it at the top of the output. Each mode has a by-hand procedure in its reference file, so no helper skill is required.

### 1. Strategy

In: brand-os positioning and audiences, the owner's goals. Out: goals, the pillar mix, the editorial stance sentence, and the list of what Wugweb does not publish. Audiences are quoted, never restated in new words. Goals come from the owner; if none are given, ask, and offer a learning goal for the first quarter. Read `references/strategy.md`.

### 2. Topics

In: the strategy, the seo site map and topic gaps, existing inventory, the signal log of readers' own questions. Out: a scored topic backlog. Existing pieces come before new ones: refresh or expand before adding. Every topic carries its source signal; a topic with no signal is marked "owner idea". Read `references/topics-and-calendar.md`.

### 3. Calendar

In: the backlog, capacity, accounts. Out: a dated plan with one row per piece: what, pillar, one intent, audience, account, date with timezone, status, brief link. Never present a topic or date as decided without the owner. A post waits while a page it links to is not live (decision 14). Read `references/topics-and-calendar.md`.

### 4. Brief

In: one calendar item. Out: one brief in the 21-field format, handed to `wugweb-work`. One audience, one claim, one outcome. No headings, headline or body copy. Every field is filled or marked as an owner question. Read `references/brief-format.md` and `references/piece-structures.md`.

### 5. Proof map

In: the case-study inventory and the service pages. Out: which case studies back which page or post. Only published, indexed case studies with a body may be named. No metric is quoted that is not in the source. The map itself lives as Notion relations; this skill proposes changes. Read `references/proof-map.md`.

### 6. Review

In: the inventory and seo audit data. Out: one verdict per piece: keep, refresh, merge, retire, or "insufficient data, look again on" a date. Each verdict has a one-sentence reason that points to evidence. Retire is a proposal; `wugweb-seo` decides what the URL does (decision 7). Read `references/refresh-retire.md`.

### 7. Campaign

In: a goal and a date range. Out: a campaign plan as a set of briefs: one goal, one metric, phases, dependencies, approvals. Plan backwards from the date. Urgency must be real. Read `references/campaigns-and-repurposing.md`.

### 8. Repurpose

In: one approved piece. Out: which other forms, on which account, in what order and spacing, plus the Behance and Dribbble refresh order. Each version stands alone and suits its platform. Some pieces should not travel; say so. Read `references/campaigns-and-repurposing.md`.

### 9. Report

In: post results from `wugweb-work` or the owner, and search reports from `wugweb-seo`. Out: what changes in the next plan, ending in three actions: scale, cut, test. Quote only numbers given, with source and date range. A first reading is a baseline, not growth. Read `references/performance-review.md`.

### 10. Model

In: a gap found in any mode. Out: a content-model change as current → proposed. Sanity schema changes are development and an owner decision; this skill only proposes them. Pillar and review date stay on the plan database, not in Sanity (decision 22). Read `references/content-models.md`.

## Handoffs

Every link reads the same on both sides.

| Skill | Gives this skill | Takes from this skill | This skill may not |
| --- | --- | --- | --- |
| `wugweb-work` | Finished pieces, return notes, post results | Briefs, the calendar, the proof map, repurposing and campaign plans, refresh or retire decisions | Write or edit copy, choose screens, set layout, publish |
| `wugweb-seo` | Site keyword and intent map, topic gaps, refresh list, link targets, link rules and link audit, search reports, what a retired URL does | Business goal, audience, page list, the pillar and cluster structure, the proof map, retire proposals | Change keywords, titles, link rules, on-page rules or a retired URL's behaviour |
| `wugweb-brand-os` | Positioning, audiences, messaging framework, approved facts | Requests only | Restate or alter any of it |
| `wugweb-voice` | Nothing | The signal log, read only | Set tone or phrasing; `wugweb-work` passes audience, purpose and form to voice |
| `wugweb-kits` | Nothing | Nothing | Name a layout or block |

Internal links (decision 20): this skill sets the pillar and cluster structure and the proof map. `wugweb-seo` returns the link targets for each piece, owns the link rules (anchor wording, no orphans or dead ends, depth, how many) and audits the result. If the proof map names a case study for a page, it wins on that case study (decision 23); `wugweb-seo` picks the other targets around it.

If a named skill is not installed, do the step by hand with this skill's own rules, say which handoff was skipped, and label the result a manual check. Helper skills are listed in `references/skill-map.md`; they return proposals only.

## Output shape

Every output starts with three lines: the mode, the sources read with their dates, and what is still "owner to set". Then the plan, brief or verdicts. Then owner questions, asked once. End by saying what was not written anywhere and what needs the owner's yes.

## Checks before handing over

- One audience and one claim per brief; no headline or body copy.
- Every number, quote and case study traces to a source, or is marked.
- No client named or tagged without a permission status.
- No date presented as decided without the owner.
- Every calendar row shows its status, even when all rows share one.
- No Notion or Sanity change made; changes shown as current → proposed.
- British English, sentence case, no dashes.

## Additional resources

Read only the file the mode needs. If these files are not beside this file, read them from the Skills project under `skills/wugweb-strategy/`.

- **`references/strategy.md`**: goals, pillars and mix, editorial stance, what Wugweb does not publish.
- **`references/topics-and-calendar.md`**: intake, scoring, backlog fields, statuses, cadence, accounts, the signal log.
- **`references/brief-format.md`**: the 21-field brief and its variants.
- **`references/piece-structures.md`**: the message shape per piece type.
- **`references/editorial-standards.md`**: what makes a piece worth publishing.
- **`references/content-models.md`**: content types, planning fields, relations.
- **`references/proof-map.md`**: which case study may back what.
- **`references/refresh-retire.md`**: verdicts and the evidence each needs.
- **`references/campaigns-and-repurposing.md`**: campaigns, repurposing, co-posts, newsletter, Behance and Dribbble order.
- **`references/performance-review.md`**: the Report mode.
- **`references/skill-map.md`**: optional helpers per mode and what each may not do.
- **`references/ops.md`**: this workspace's wiring. The only file that names tools and vendors.
- **`examples/`**: a blog post brief, a service page brief, a refresh brief, a calendar skeleton.
- **`evals/`**: test cases, one folder each, with the prompt and what a pass looks like.
- **`export/wugweb-strategy.md`**: the whole skill in one file for GPT, Cursor or another tool.
