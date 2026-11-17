# wugweb-strategy (single-file export for other tools, v0.1.2)

Built from the files in this folder. Rebuild whenever the skill or `docs/skills/STANDING-RULES.md` changes. Read the skill first, then the reference a mode names.

## Owner's standing rules

Copied from `docs/skills/STANDING-RULES.md`. That file is the source; if this block differs, that file wins.

These apply to every skill in the Wugweb Skill System and to every session.
Each skill reads this file and repeats none of it. A skill's own rules live in
that skill. Where a helper skill or tool disagrees with a rule here, this file
wins. Dates show when the owner set or confirmed a rule, where known.

## Truth and evidence

- Nothing is invented: no numbers, quotes or facts.
- A claim needs a screen, a sourced number or a named fact. "Unvalidated" is a complete answer.
- Existing content is an input, not the benchmark. (2026-10-19)
- Every number in a report is computed, never estimated.

## Sources and approval

- Notion is the source for case studies and blog posts. (2026-10-13)
- One source, from the owner. Content is enriched only as a proposal. (2026-10-19)
- Changes are shown as current to proposed, with the reason.
- Nothing is written to the content source or the CMS without the owner's approval of that exact change, with a backup first.
- Nothing is deleted without asking: no data, files, records or pages.
- Nothing is posted or scheduled without the owner's yes for that post. (2026-11-16)
- Third-party helper skills return proposals or reports. Only a Wugweb skill writes, and only after approval. (2026-11-16)
- Nothing goes to development until the owner says so. (2026-11-16)

## Media

- Media lives in the owner's media store only: no uploads, no local copies.
- Files are never cropped or re-encoded.
- Media may be shown at any size if the original aspect ratio is kept. Clipping masks are allowed. (2026-11-16)
- Resizing and masks are done on the page, never by making new files. (confirmed 2026-11-16)
- A mask must not hide the part of a screen that proves the claim. (confirmed 2026-11-16)
- A file shown above its natural size is flagged, not banned. (confirmed 2026-11-16)
- No sound anywhere. Every video is muted. (2026-11-11)
- A new image file is made only when nothing existing fits, one file at a time, on the owner's yes for that file. (2026-11-11)

## Writing

- British English.
- Sentence case.
- No em or en dashes in anything a visitor reads. Ranges are written out.

## Working with the owner

- Replies are short and plain, result first.
- Do exactly what is asked. No side tasks.
- Full output: complete files, no placeholders, no "rest unchanged".
- Do not raise the domain cutover, asset clean-up or the cookie policy unless asked.

## Limits

- Never exceed any vendor's free tier. No feature that needs a paid plan unless the owner asks.
- No dependency on Framer: no Framer URLs, redirects or assets. (2026-10-13)
- One slug per page; no redirects for old URLs. (2026-10-13)

## The skill system

- One home per rule. Each rule lives in exactly one skill; the others point to it. (2026-11-16)
- One Notion page per skill: no sub-pages, nothing elsewhere. The repo keeps one copy as that skill's PLAN file. (2026-11-16)
- Every skill must be usable in GPT, Cursor and other tools, not only Claude. (2026-11-16)
- The layout values in the design system's layout shell document are binding. Skills read that document and point to `wugweb-kits`. (2026-11-16)

## Git, only when asked to commit

- Commit by path. Never add everything at once.
- The only trailer is `Co-Authored-By: Wugweb <admin@wugweb.com>`.
- Check for an index lock first; other sessions share the checkout.
- Every commit adds a line to the changelog.
- Push only on the owner's go.

## Working caution, not an owner rule

- When writing to Notion, never write a bare word-colon-word pattern or a bare
  file name ending in a dot and "md". Notion turns them into links and can
  corrupt the page. Put them in inline code or reword. (found 2026-11-16)

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
4. **Starting numbers are blank.** Cadence, promotional and reactive shares, backlog size and refresh thresholds stay "owner to set" until a baseline exists (decisions 8 and 18). Pillars are the six services (decision 2).
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

The Wugweb site blog, the Wugweb LinkedIn company page, Wugweb Behance, Wugweb Dribbble, the owner's LinkedIn, the owner's Medium, and the email newsletter. The owner's five personal Behance projects are out of scope (decision 13).

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


---

<!-- references/strategy.md -->

# Strategy

The top layer of the plan: goals, pillars, the mix, the editorial stance and what Wugweb does not publish. Everything below it (topics, calendar, briefs) must trace back to this file.

## Order of work

Set the layers in this order. Do not skip ahead.

1. **Goals.** From the owner.
2. **Audiences.** Quoted from `wugweb-brand-os`.
3. **Pillars and mix.** The six services.
4. **Editorial stance.** One sentence.
5. **Channels.** The accounts in scope, each with its job.
6. **What Wugweb does not publish.**

## 1. Goals

Goals come from the owner (decision 9). Write each as goal, then objective, then one main metric per account.

- Keep it to a handful of measures. A measure that would not change next month's plan is a diagnostic, not a goal.
- A target needs a real baseline. With none, set a learning goal for the first quarter: "Find out which pillar gets replies on LinkedIn", not "Grow reach by an invented amount".
- Every growth target has a quality guardrail written beside it, so the number cannot be hit by lowering the work.
- Write action thresholds in advance: what result makes the plan change.

If the owner has given no goals, stop and ask. Do not infer goals from positioning.

## 2. Audiences

Audiences are defined by `wugweb-brand-os`. Quote them exactly as written there, by name. Never merge, split, rename or describe them in new words. If an audience a piece needs is not in the brand-os list, raise it as an owner question for brand-os.

Unsourced claims about what an audience wants are marked "assumed" until a signal in the signal log backs them.

## 3. Pillars and mix

The pillars are the six Wugweb services (decision 2). Their names are taken from the Sanity `service` documents, exactly as published.

- A pillar is a theme, not a format or an intent. "How-to" and "case study" are formats; "launch" is a campaign.
- Test each pillar: ten useful ideas should come easily. If they do not, flag the pillar for the owner.
- One pillar may be named the signature pillar by the owner. Do not choose it.
- Record each pillar with: name, the service page it maps to, its intended share of the mix, and the case studies that back it (from the proof map).
- The intended shares are "owner to set" until a baseline exists (decision 18).
- The "ownable" test of a pillar belongs to `wugweb-brand-os`. Do not run it here.
- Refresh a pillar when its angles run dry: propose it, do not rename it.

Count the mix from the plan database, where each piece carries its pillar. Report it as pieces per pillar against the intended share, once shares are set.

## 4. Editorial stance

One sentence (decision 21): what Wugweb publishes, for whom, to what end, and how it differs from what else is out there. Build it from the positioning in `wugweb-brand-os`. It never restates or changes the positioning; it says what the publishing does with it.

The sentence is approved by the owner. Until it is, write "Editorial stance: owner to approve" and show the proposed sentence as a proposal.

## 5. Channels

Judge each account on four things: does the audience use it, does the format suit the work, does it serve a goal, and is there capacity to keep it up.

| Account | Default job | Note |
| --- | --- | --- |
| Wugweb site blog | The record: posts that back the service pages | Canonical home of long pieces |
| Wugweb LinkedIn page | Announcements, the record, case studies | Case studies need client permission |
| Owner's LinkedIn | Opinion, stories, the reach channel for a small team | Slot a post only when someone can be present after it |
| Owner's Medium | Syndication of site posts | Canonical points to the site post; see `editorial-standards.md` |
| Wugweb Behance | Case study projects | Refresh order in `campaigns-and-repurposing.md` |
| Wugweb Dribbble | Shots from case studies | Refresh order in `campaigns-and-repurposing.md` |
| Newsletter | Owned audience; two-way loop with social | Sending needs the owner's yes (decision 19) |

These jobs are defaults for the owner to confirm. Win one channel before adding effort to another. Name any channel dropped and why.

## 6. What Wugweb does not publish

Keep a written list. Start with these, from the owner's standing rules (`docs/skills/STANDING-RULES.md`); the owner adds the rest:

- Anything with an invented number, quote or result.
- A client name, logo or work without a recorded permission status.
- Engagement bait: share prompts, comment gating, false urgency, giveaways.
- Trends Wugweb has no standing in.
- Trending audio or any sound.
- Competitor-brand topics, unless the owner opts in.

## Output

A strategy output is one page: goals, audiences (quoted), pillars with shares, stance, channels with jobs, the do-not-publish list, and every "owner to set" item.


---

<!-- references/topics-and-calendar.md -->

# Topics and calendar

From signal to a dated row in the plan database.

## Topic intake

Take ideas from these sources, in this order of weight:

1. **The signal log.** Readers' own questions and objections.
2. **`wugweb-seo`.** The site keyword and intent map, topic gaps and the refresh list.
3. **Existing inventory.** Pieces to refresh or expand before writing new ones.
4. **Case studies.** Proof that has no post or page using it yet.
5. **The owner's ideas.** Marked "owner idea".
6. **Competitor gaps.** A topic table by competitor, dated; inferred items marked apart from observed. No review sites as a source.

## The signal log

A list of what readers ask and object to, in their own words. It lives here; `wugweb-voice` may read it directly but may not edit it (owner decision 2026-11-17).

| Field | Rule |
| --- | --- |
| Words | As said or written, unchanged |
| Source | Where it came from: a call, a message, a comment, a search query |
| Date | When |
| Audience | From the brand-os list, or "unknown" |
| Client | Removed unless the client has given permission |

Never put a client's name or confidential detail in the log without permission.

## Backlog card

One card per topic, in the plan database with status Idea.

| Field | Content |
| --- | --- |
| Topic | A plain working label, not a headline |
| Pillar | One of the six |
| Audience | One, from brand-os |
| Intent | One: learn, compare, decide, act, or follow |
| Signal | The source of the idea, linked or quoted |
| Demand evidence | From `wugweb-seo`, with source; or "none" |
| Proof available | Case study IDs from the proof map, or "none" |
| Effort | Small, medium or large |
| Action | New, expand or refresh |
| Status | Idea, parked or killed with a reason |

## Scoring

Score each card on four things, each low, medium or high:

- **Pillar fit:** does it serve its pillar and the editorial stance?
- **Evidence:** is there a real signal and real proof?
- **Goal:** does it move an owner goal?
- **Effort:** inverted; a small piece scores higher.

Put demand next to fit and effort, never alone. A topic with demand and no proof waits for proof. Produce the top share first; keep a deferred list and a skip list, each with reasons, and a list of pieces to defend.

Rules:
- Existing pieces before new ones.
- One topic, one page. Same intent with a different angle means differentiate, not merge.
- Many gaps on one theme become one hub with spokes.
- A parked idea is not a dead one. Kill only with a reason.
- Try a cheap test (a post) before an expensive piece (a long article).
- Thin material means a smaller plan, not filler.

## Calendar

The calendar is the plan database, one row per piece. Never use Notion Blogs: its sync turns planned rows into posts.

### Row fields

Topic, pillar, one intent, format, audience, account, target date with timezone, status, brief link, campaign label, proof, permission status, publish dependency, review verdict, review date.

### Statuses

Idea → Planned → Briefed → In production → Approved → Published, or Killed with a reason, or Parked. Only the owner moves a row to Approved.

### Cadence

Cadence per account is "owner to set" until a baseline exists (decisions 8 and 18). Until then, plan what the owner says can be done, and record what actually shipped each week. That record is the baseline.

When a cadence is set:
- Set it to what a bad week can hold, below full throughput.
- Raise it only once the current one has held.
- Split slots into planned, flexible and update slots.
- Reserve a share for reactive items; the share is "owner to set".

### Mix rules

- Three tags per row: pillar, one intent, format.
- Promotion is a clear minority.
- No two asks in a row on one account; no long run of one format.
- One or two named series at most; a series is a commitment, so plan only what can be kept up.
- Where two accounts share an audience, change the angle, not just the wording.

### Dependencies

A post waits while a page it links to is not live (decision 14). Pages waiting on these blocks are not final: Service Spotlight Panel (`/services/brand`), Client Assembly Grid and Service Tag Field (homepage), Bento Block (`/about` and the six service pages), Process Map (`/services/experience`). Re-check this list in `wugweb-kits` before each plan.

### Planning rhythm

Weekly: review the next two weeks. Monthly: prune the backlog. Quarterly: rebalance the mix and re-run the gap check with `wugweb-seo`. Annually: review the strategy layer.

## Output

A calendar output is a table of rows, sorted by date, with each date marked "proposed" until the owner confirms it. No row is written to Notion without the owner's yes to that row.


---

<!-- references/brief-format.md -->

# Brief format

One brief per piece, one page long, handed to `wugweb-work`. It says what the piece must do, never how it reads. No headings, headline, title, hook, caption or body copy.

`wugweb-work` checks every brief for: the reader, what they know now, what they should know and do after, the goal, the format, and which case studies back it. A brief missing any of these goes back. Fields 3, 6, 19, 2, 1 and 5 carry them.

## The 21 fields

| # | Field | How to fill it |
| --- | --- | --- |
| 1 | Brief ID, piece type, forms wanted | ID from the plan row. Type: post, service page, site copy, social post, newsletter issue, case study slot. Forms: other versions wanted later |
| 2 | Why now | The goal it serves, the campaign label if any, the target date with timezone |
| 3 | Audience and their tension | One audience, named exactly as in `wugweb-brand-os`. The tension: what they are stuck on, from the signal log or marked "assumed" |
| 4 | The one claim | One sentence. If it needs two, it is two pieces |
| 5 | Proof | Case study IDs from the proof map, and facts each with its source. "Unvalidated" is allowed and must be marked |
| 6 | Outcome | One action wanted from the reader |
| 7 | Piece structure | A pointer to one structure in `piece-structures.md` |
| 8 | Points the piece must make | Up to five, as plain notes. No headings, no copy |
| 9 | Search | Pasted from `wugweb-seo` unchanged: its keyword note for this piece (cluster, primary phrase, limits). This skill never restates a search rule (owner decision 2026-11-17) |
| 10 | Links | Which service pages, posts and case studies it links to. Pasted from `wugweb-seo` unchanged: the link targets for this piece, picked inside the pillar and cluster structure this skill sets (decision 20). The proof map decides which case study backs the page (decision 23) |
| 11 | Source | The Notion row. For a refresh: the keep, change and remove list |
| 12 | Must not say | Permissions not given, sensitive clients, claims with no source |
| 13 | Account and platform | One account in scope (decision 13) |
| 14 | Co-post and tagging | Who is named or tagged, each with permission status. No client named or tagged without permission (decision 15) |
| 15 | Publish dependency | A linked page that is not live yet holds the post back (decision 14) |
| 16 | Repurposing | Other forms, where, in what order |
| 17 | Acceptance | What this skill checks when the piece comes back |
| 18 | Owner questions | Asked once, numbered |
| 19 | What the reader already knows | Sets the starting point of the piece |
| 20 | Success metric | One measure with its window, or "baseline" if none is set |
| 21 | Out of scope | What the piece is not about |

Every field is filled or marked as an owner question. "Not applicable" needs a reason.

## Load-bearing claims

List the claims the piece rests on under field 5. If there are more than three, consider two pieces. Nothing is scheduled until its claims are verified. With no source, a claim becomes an owned observation ("in our projects we have seen") or is cut; never a general fact.

## Variants

| Piece type | What changes |
| --- | --- |
| Blog post | All 21 fields |
| Service page | Field 2 names the service. Field 11 links the Sanity service document. Field 5 names only case studies that back that service. Field 15 names any block awaiting sign-off |
| Site or landing copy | Field 3 may name more than one audience only if the page is shared; the brief says which comes first |
| Social post | Fields 8 and 16 shrink: one point per post. Field 13 names one account. Field 20 is replies or saves, not likes |
| Newsletter issue | Field 6 is one call to action. Field 16 names the social posts it loops with. Sending needs the owner's yes |
| Case study slot | Strategy fills fields 1, 2, 3, 10, 13, 14, 15. The claim, screens and body belong to `wugweb-work` |
| FAQ block | See "FAQ block" below |
| Refresh | Field 11 carries keep, change and remove. Field 17 adds "facts re-checked" |

## FAQ block

The `faqs` field stays in the layout shell. This skill decides when a piece gets one; `wugweb-seo` decides what that means for schema (this skill does not restate it). Agreed with `wugweb-seo` (owner ruling 2026-11-17 that strategy decides this with seo). The case-study `faqs` field stays unused unless the owner supplies visible questions.

- **Which pieces:** service pages and blog posts only. Never a social post, newsletter issue, site or landing copy, or case study slot.
- **When:** only if the signal log holds real reader questions for the piece. No log entry, no block. A block is never added for search alone.
- **Who supplies the questions:** this skill proposes them from the signal log, each with its source. The owner approves the list.
- **Who supplies the answers:** the owner's source (the Notion row or an owner-written answer). `wugweb-work` does not invent an answer; with no source the question is cut or marked "owner to answer".
- **How many:** owner to set. Never padded to reach a number.
- **Where it sits in the brief:** field 8 lists the approved questions under "Questions on the page", each marked with its signal-log source; field 11 names the answer source for each. A piece with no block says "no FAQ block" in field 8.
- **Visibility:** every question and answer in the block appears on the page for the reader. `wugweb-seo` checks this.

## Acceptance (field 17)

When the piece comes back, check that it:
- makes the one claim and serves the one audience;
- uses only the proof named, or says which proof it could not back;
- links the targets in field 10;
- asks for the outcome in field 6, once;
- stays out of the field 21 topics.

`wugweb-work` returns the piece as a proposal with a note of where it left the brief and which facts it could not back. Record that note against the plan row and in the proof map.

## Examples

See `examples/brief-blog-post.md`, `examples/brief-service-page.md` and `examples/brief-refresh.md`.


---

<!-- references/piece-structures.md -->

# Piece structures

The shape a piece's message takes, named in brief field 7. A structure is an order of moves, not headings or wording. `wugweb-brand-os` owns the messaging framework; quote its core messages as written and use these shapes only to order them in one piece. `wugweb-work` fills the shape with words and owns the body standard.

## The base shape

Four moves, in this order:

1. **Claim.** What the piece says, in one sentence.
2. **Tension.** Why the reader cares: what they are stuck on.
3. **Proof.** What shows the claim is true: case studies, sourced facts, owned observations.
4. **Outcome.** What the reader can do next. One action.

The message hierarchy behind it: why care, the answer, why Wugweb, what next. One core message; each supporting point has its own proof. A supporting point with no proof is cut or marked.

## By job

The kind of job the reader has points to the kind of piece.

| Reader's job | Structure | Shape |
| --- | --- | --- |
| Learn how | Teach | Claim, the one thing taught, steps, a limit, outcome. One thing per piece; more becomes a series |
| Decide between options | Compare | Claim, the options, the criteria, where each fits, a fit condition, outcome |
| Check if it is for them | Fit | Claim, who it suits and who not, how it works, proof, outcome |
| Believe it works | Proof | Claim, the situation, what was done, what changed with sourced results, outcome |
| Rethink a view | Argue | Claim, the common view, why it falls short, evidence, outcome |
| Follow the work | Story | Claim, the moment, the choice, what was learned, outcome |

## By piece type

| Type | Default structure | Note |
| --- | --- | --- |
| Blog post | Teach, Compare or Argue | One teachable thing |
| Service page | Fit | What it does and for whom, the problem removed, how it works, what it needs from the client, proof, limits, one action |
| Site or landing copy | Fit | The first screen says what, for whom, and one action |
| Social post | One move of the base shape | One goal, so one point; if the goal needs two asks, it is two posts |
| Thread or carousel | Teach or Story | Only when the idea needs several beats |
| Newsletter issue | Teach or Story, plus one call to action | |
| Case study slot | Proof | The body belongs to `wugweb-work` |

## Goal decides the ask

One goal per post; the goal decides the kind of ask: learn (a soft next step), engage (a question only when it is real), act (one clear action). The wording of the ask belongs to `wugweb-work`. No engagement bait.


---

<!-- references/editorial-standards.md -->

# Editorial standards

What makes a piece worth publishing. This file holds no tone, phrasing or word rules; those belong to `wugweb-voice`. The body format and the quality gate on a draft belong to `wugweb-work`. On-page search rules belong to `wugweb-seo`.

## A piece is worth publishing when

1. **One audience.** Named from `wugweb-brand-os`.
2. **One claim.** Stated in one sentence.
3. **Named proof.** A case study, a sourced number or a named fact. An owned observation is allowed and labelled as one.
4. **First-hand.** It shows something Wugweb has done or seen, not a summary of what others say.
5. **Not a template.** Pieces in a series do not all share one skeleton.
6. **A reason now.** Field 2 of the brief is filled.

## The publish verdict

Give one of three verdicts on a returned piece:

- **Publish:** all six hold and the brief's acceptance checks pass.
- **Revise:** a named gap, sent back to `wugweb-work` with the field it fails.
- **Hold:** blocked. An unsourced factual claim always blocks. So does a missing permission, or a linked page not live yet.

## Sources and claims

- Keep a source log with the calendar: each outside claim, its source, the date read.
- An outside statistic is used only with its source and date, and is marked as the source's claim.
- No rounding up. A small sample is directional and is called that.
- A claim about a client project must match that project's approved case study.

## Byline

The byline names who wrote it. A case study carries no author. Whether a post shows the owner or Wugweb as author is "owner to set".

## Canonical and syndication

- Long pieces are published first on the Wugweb site. That page is the canonical home.
- A Medium copy goes out after the site post is live, with its canonical link pointing to the site post. Plan a gap of days between them; the length is "owner to set".
- A LinkedIn article or post that repeats a site piece links to it.
- Never publish the same piece twice on the site.

## Dates on pages

No visible "last updated" date on posts (owner decision, 2026-10-13). The review date is a planning date on the plan row only.

## Original research

Before planning a study, test it: is the question one only Wugweb can answer, is the data Wugweb's to use, and is there enough of it? Design the method before collecting. Client data needs permission. A visible update stamp is not used.


---

<!-- references/content-models.md -->

# Content models

The content types, what each is for, where each is stored, and the planning fields. Sanity schema changes are development and an owner decision; this skill only proposes them, as current → proposed.

## Types

| Type | Job | Stored in | Planning record |
| --- | --- | --- | --- |
| Blog post | Teach, compare or argue; back a service page | Notion Blogs → Sanity `post` (by sync) | Plan database row |
| Service page | Say what a service does, for whom, with proof | Sanity `service` | Plan database row linked to the Sanity document (decision 6) |
| Case study | Proof of work | Notion Case Studies → Sanity `caseStudy` | Plan database row for the slot; the body is `wugweb-work`'s |
| Site or landing copy | First screen, fit, one action | Sanity | Plan database row |
| Social post | One point on one account | The platform | Plan database row; Notion Publications for where it went out |
| Newsletter issue | Owned audience loop | The sending tool | Plan database row |
| Behance project, Dribbble shot | Portfolio form of a case study | The platform | Notion Publications |

## Shape of the cluster

Hub and spoke: a service page is the hub; posts are spokes. One topic, one page. No mixed intents in one cluster. No orphan piece: every post links to at least one service page and to others in its cluster. Which pages are linked is decided here (proof map and brief field 10); how links are made is `wugweb-seo`'s.

## Planning fields

All on the plan database (decision 1), none in Sanity (decision 22):

| Field | Type | Note |
| --- | --- | --- |
| Topic | Title | Working label, not a headline |
| Pillar | Select | The six services |
| Intent | Select | Learn, compare, decide, act, follow |
| Format | Select | From the types above |
| Audience | Select | Names from `wugweb-brand-os` |
| Account | Select | The accounts in scope |
| Target date | Date with time and timezone | Proposed until confirmed |
| Status | Status | Idea, Planned, Briefed, In production, Approved, Published, Killed, Parked |
| Kill reason | Text | Required when Killed |
| Brief | Text or link | The 21-field brief |
| Campaign | Select | One label per campaign |
| Proof | Relation to Case Studies | From the proof map |
| Permission status | Select | Given, asked, not asked, refused, not needed |
| Publish dependency | Relation or text | A page that must be live first |
| Source piece | Relation to Blogs, or a Sanity link | For refreshes and published pieces |
| Review verdict | Select | Keep, refresh, merge, retire, insufficient data |
| Review date | Date | Planning only; never shown on a page |

Creating this database is a Notion write: propose the schema, get the owner's yes, then it is built.

## Fields proposed elsewhere

`kits_design_system/docs/tokens/layout-shell.md` proposes CMS fields on `caseStudy` and `post`. Read them this way:

| Field | Whose |
| --- | --- |
| `focusKeyword`, `secondaryKeywords`, `searchIntent`, `schemaType`, canonical, `noIndex`, share image, breadcrumb | `wugweb-seo` |
| `aiSummary`, `keyTakeaways` | `wugweb-work` writes them; `wugweb-seo` sets limits |
| `faqs` | Kept (owner, 2026-11-17). This skill decides which pieces get one, and the questions come from the signal log (see "FAQ block" in `brief-format.md`). `wugweb-seo` owns what it means for schema |
| `lastReviewedAt` | Not added; the review date stays on the plan row (decision 22) |

## Model mode

When any mode finds a gap (a field missing, a relation empty, a type with no home), write it as:

- **Current:** what exists, with where it was read.
- **Proposed:** the change.
- **Why:** the mode and the case that found it.
- **Who decides:** the owner; engineering for Sanity.


---

<!-- references/proof-map.md -->

# Proof map

Which case studies back which service page, post or campaign. The map itself lives in Notion relations (Case Studies to Services, Related Case Studies, Related Posts). This file holds the rules. Changes to the relations are proposals for the owner.

## What may be named as proof

A case study may back a piece only when all of these hold:

1. It is published and indexed on the site.
2. It has a body, not a stub.
3. The claim it is used for matches its approved body.
4. Any metric quoted is in its source, exactly.
5. Its permission status allows the use: naming, tagging or showing on a given account.

A text-only case study may back a claim about process, not about visual result. A hidden stub backs nothing.

## Matching proof to the objection

Pick the proof that answers what the reader doubts:

| Objection | Proof that answers it |
| --- | --- |
| "Can they do this kind of work?" | A case study in the same service |
| "Have they worked with teams like us?" | A case study with a similar client type, if permitted |
| "Does it make a difference?" | A case study with sourced metrics |
| "How do they work?" | A case study with process shown |

Ladder of strength, strongest first: a sourced metric, a permitted client quote from the case study, shown work, a described process, an owned observation. Place proof at the point where the reader decides.

## Rules

- Each service page names its backing case studies; each post links to its service page and, where it fits, one case study.
- Prefer spreading proof: the same case study should not back every page. Flag any case study used on more than half the pages.
- Note proof that is asked for and does not exist. That list goes to the owner as candidates for the next case study (decision 5): this skill proposes which case study is done next and which service it backs, never its claim or body.
- `wugweb-work` reports which proof it used and which it could not find. Record both.
- The proof map wins on which case study backs a page (decision 23). `wugweb-seo` picks the other link targets around it and may not drop or swap a case study the map names.
- Metrics are scarce; choose them deliberately. Never infer a metric from a screen.

## Output

A proof map output is a table: page or post, the case studies proposed, why each fits (objection and strength), permission status, and the proposed relation change as current → proposed.


---

<!-- references/refresh-retire.md -->

# Refresh or retire

One verdict per piece, with evidence. This skill decides the verdict. `wugweb-work` does the rewrite. `wugweb-seo` supplies the audit data and decides what a retired URL does (decision 7). Deletion is an owner-run script, never run here.

## Verdicts

| Verdict | When | Next |
| --- | --- | --- |
| Keep | The piece serves its pillar and audience and its facts hold | Set the next review date |
| Refresh | The claim still matters but facts, proof, links or angle are stale | A refresh brief with its top three changes |
| Merge | Two pieces share one intent and one angle | Name the piece that stays; the other's useful parts move into it |
| Differentiate | Two pieces share an intent but have different angles | Sharpen each angle; no merge |
| Retire | The piece no longer serves any pillar, audience or goal, and a refresh would not fix it | A retire proposal to the owner and `wugweb-seo` |
| Insufficient data | Too new or too little traffic to judge | "Look again on" a date |

## Rules

- Each verdict has a one-sentence reason that points to evidence: a number with source and date range, a stale fact, a broken link, an overlap with a named piece.
- Never decide on visits or age alone.
- Default to keep for new pieces and for cornerstone pieces.
- Merge before refreshing two overlapping pieces.
- Refresh before retire.
- Merge and retire need the owner's named approval.
- A refresh names its top three changes and is paired with its distribution (which accounts carry it again).
- Facts are re-checked on every refresh.
- No visible update date is added (owner decision, 2026-10-13). The review date goes on the plan row.

## Evidence

From `wugweb-seo`: position, clicks, impressions and click rate over a stated window; the refresh list; overlap between pieces.
From the inventory: pillar, audience, last review date, links in and out, proof used.
From `wugweb-work`: post results for social versions.

With thin data, review the structure only (pillar fit, facts, links) and say so.

## Retire proposal

Send to the owner, with a copy to `wugweb-seo`:

- the piece and its URL;
- the reason and evidence;
- what replaces it, if anything;
- links into it that need a new target, from `wugweb-seo`, inside the structure this skill sets;
- the question for `wugweb-seo`: what the URL does.

Nothing is unpublished, redirected or deleted by this skill.

## Re-measure

After a refresh, look again at 30, 60 and 90 days. These intervals are defaults for the owner to confirm (decision 18).

## Output

A review output is a table: piece, verdict, reason, evidence with source and date range, owner, next date. See `examples/brief-refresh.md` for a refresh brief.


---

<!-- references/campaigns-and-repurposing.md -->

# Campaigns and repurposing

Plans for a campaign, a launch over several posts, repurposing, co-posts, the newsletter, and the Behance and Dribbble refresh order. Making each form belongs to `wugweb-work`; art direction for a campaign belongs to `wugweb-brand-os`.

## Campaign

A campaign is time-boxed, with one goal and one metric.

Plan it as a one-page campaign brief:

| Field | Content |
| --- | --- |
| Name and label | One campaign label for every row |
| Goal and metric | One each, with the window |
| Audience | From brand-os |
| Story | One line the whole campaign tells |
| Phases | Before, launch, after; told as one story, with a hero piece in each |
| Pieces | A list of briefs, one per piece, by account and date |
| Dependencies | Pages that must be live, permissions, assets in R2 |
| Approvals | Who says yes to what, agreed in advance; each post still gets its own yes |
| Risks | What could stop it |
| Debrief | Date and what will be read |

Rules:
- Plan backwards from the date, using production lead times.
- Urgency must be real: no invented deadlines or scarcity.
- Proof posts need client permission.
- No invented targets or budget tables. Targets come from a baseline or are learning goals.
- A debrief is required; it feeds the Report mode.

### From a search gap

When `wugweb-seo` reports gaps: scope them, group into a few themes each with an evidence line, show the owner the themes before any briefs, keep one intent per piece traceable to its gap, and class topics as owned, contested or missing, with a testable hypothesis each.

### Dated moments and trends

A dated moment must fit a pillar and Wugweb must have standing to speak. A trend passes fit, then safety, then timing, or is left alone. Keep a written list of what is never joined. Trending sounds are excluded. A fast lane still ends in a yes per post.

## Repurposing

Plan from one approved piece.

- Break it into atoms: one point per post.
- Each version stands alone and suits its platform. Ask `wugweb-work` for native versions, not copies.
- Space versions out over days or weeks.
- Where two accounts share an audience, change the angle.
- Some pieces should not travel. Say which and why.
- Reuse over time only evergreen, proven pieces, spaced apart, with one thing changed and facts re-checked.
- Record each version in Notion Publications (Planned, Scheduled, Published, Removed).

### Form per account

| Account | Forms that suit it |
| --- | --- |
| Site blog | Long post, the canonical home |
| Owner's LinkedIn | Opinion post, story, short teach post, carousel |
| Wugweb LinkedIn page | Announcement, case study summary, carousel |
| Owner's Medium | Syndicated copy of a site post, canonical to the site |
| Behance | Case study project |
| Dribbble | Shots from a case study |
| Newsletter | Issue that loops to and from social |

How each form is built and its platform specs belong to `wugweb-work`.

## Co-posts and partner tagging

A co-post is agreed in full before anything is made: format, who does what, timing, one call to action, what each side says, the metric, and disclosure. Rights are agreed in writing. Allow a lead time. Start with a low-risk first collaboration. No client is named or tagged without a recorded permission status (decision 15). No giveaway mechanics.

## Newsletter

In scope (decision 19). Plan each issue as a row: purpose, the one call to action, the social posts it loops with, the date. A sequence is planned before it is drafted: purpose, timing, one call to action per email, exit condition. Sending needs the owner's yes. No comment gating or false urgency. The tool is named in `ops.md`.

## Behance and Dribbble refresh order

For the Wugweb accounts only (decision 13). Order the existing projects and shots for refresh by:

1. Case studies that back a service page and have permission.
2. Projects whose case study has changed since the project went up.
3. Projects with no matching case study, last; propose keep, refresh or retire for each.

Record the order with the reason for each place. `wugweb-work` does each refresh. Counts of projects and shots are read live before planning; earlier reported counts are not used as facts.


---

<!-- references/performance-review.md -->

# Performance review

The Report mode: read how posts did and change the next plan. This skill reads social numbers for planning; `wugweb-seo` keeps search reporting and supplies it as input (decision 16).

## What is read

| Source | What |
| --- | --- |
| `wugweb-work` | Post results returned with each published piece |
| The owner | Numbers from platform dashboards, pasted or attached |
| `wugweb-seo` | Search reports, with date range and source |
| Newsletter tool | Opens, clicks, replies, through `ops.md` |

Quote only numbers given, each with its source and date range. A missing number is flagged, never filled.

## Rules

- One primary metric per goal, with a fixed window.
- A metric that would not change next month's plan is a diagnostic; report it below the line.
- A first reading is a baseline, not growth. Say so.
- Mark partial periods.
- Give absolute and relative change together.
- Compare like with like: same account, same format, same window.
- Respect the noise floor: small samples do not change the plan. With low traffic, read weekly or monthly, not daily.
- Use longer windows for a long sales cycle.
- Rate a channel on volume, engagement and conversion together. Never drop a channel on last-click figures alone.
- Confirm a change is real before reacting: check sample size and a change in traffic mix.
- Teaching and story pieces are judged on saves, shares and replies, not likes.
- One strong post is a hypothesis. Check it for luck, timing and account size before it becomes a rule.
- Find the one broken stage (reach, engagement, click, conversion) before changing the mix.
- Forecasts only as ranges from real data.
- Third-party benchmarks only with their source attached.

## Tests

- One variable per test.
- Write the decision rule before the test starts.
- Work out the sample needed first; at Wugweb's volumes a formal test is rarely possible, so say when a result is directional.
- Do not stop early on a good-looking result.
- A tie is a result.
- Repeat before anything becomes a rule.
- Log every test with its rule and result.
- Variants are still approved one post at a time.

## Report order

1. Period, sources, and what is missing.
2. The primary metric per goal, against the baseline or target.
3. Pillar coverage against the intended mix.
4. What worked and what did not, by pillar, format and account.
5. Diagnostics, below the line.
6. Three actions: scale, cut, test. Each names the calendar rows it changes.

## Look-back

Use a fixed look-back window for social; the length is "owner to set". With thin data, audit structure only: pillar coverage, cadence held, briefs returned.


---

<!-- references/skill-map.md -->

# Skill map

Optional helper skills per mode, and what each may not do. Every mode works without them, using the rules in this skill's references. Helpers return proposals only. The owner's rules win over anything a helper says.

## Wugweb skills

| Skill | Link |
| --- | --- |
| `wugweb-work` | Takes briefs and plans; returns pieces, return notes, post results. Its Brief mode is for client work only (decision 4) |
| `wugweb-seo` | Gives the site map, topic gaps, refresh list, link targets, link rules and audit, search reports, retired-URL behaviour. Takes goal, audience, page list, the pillar and cluster structure, the proof map, retire proposals |
| `wugweb-brand-os` | Gives positioning, audiences, messaging, approved facts. Takes requests only |
| `wugweb-voice` | Reads the signal log directly (owner decision 2026-11-17). Read only: it may not edit the log. No other link |
| `wugweb-kits` | No link. Its pending blocks are a calendar dependency |

## Helpers per mode

| Mode | Helpers |
| --- | --- |
| Strategy | `rampstack-seo:content-strategy`, `searchfit-seo:content-strategy`, `social-media-skills:content-pillars` |
| Topics | `searchfit-seo:create-topic` |
| Calendar | `social-media-skills:content-calendar`, `social-media-skills:batch-content-plan` |
| Brief | `searchfit-seo:content-brief`, `marketing:content-creation` (format reference only) |
| Review | `rampstack-seo:seo-content-audit` |
| Campaign | `marketing:campaign-plan` |
| Repurpose | `social-media-skills:content-recycling`, `social-media-skills:cross-platform-repurposing` |
| Notion reads | `Notion:database-query` (read only) |
| Number checks | `data:analyze`, on numbers the owner supplies only |

## What helpers may not do here

Decline and record any helper answer that:

- schedules or approves a batch of posts at once;
- creates, uploads or edits media, or adds sound or trending audio;
- keeps the plan in local files instead of Notion;
- scrapes by default, or uses review sites as a source;
- uses an uncited percentage or vendor statistic as a fact;
- adds FAQ or HowTo schema, keyword counts, or llms.txt work;
- adds visible update dates or "republish as fresh";
- redirects or deletes as an action;
- writes copy, hooks, captions or headlines;
- uses em dashes, American spelling or title case;
- writes a calendar row to Notion without the owner's yes for that row (`Notion:create-database-row` writes at once).

## Sources of the absorbed rules

The rules in this skill were restated in Wugweb's words from these skills, read on 2026-11-16. No text was copied, and no helper figure is used as a fact.

- `rampstack-seo`: content-strategy, content-and-copy (brief), seo-content-audit, seo-keyword, seo-competitor
- `seo-skills`: seo-page, seo-content-audit, seo-keyword-cluster, seo-competitor-gap-analysis, seo-plan, seo-gaps-to-social-campaign, ai-search-gaps-to-social-campaign, site-audit-to-social-distribution
- `searchfit-seo`: keyword-clustering, internal-linking, content-strategy, create-topic
- `social-media-skills`: content-pillars, batch-content-plan, content-calendar, idea-generation-and-ideation, content-research-and-sourcing, social-strategy, goals-and-kpis, linkedin-company-pages, linkedin-growth, x-growth, instagram-growth, campaign-and-launch-planning, seasonal-and-moment-marketing, trend-jacking, cross-platform-repurposing, content-recycling, collabs-and-cross-promotion, ugc-and-influencer, social-proof-and-testimonials, audience-research, content-audit, analytics-and-reporting, experimentation-and-ab-testing, viral-reverse-engineering, data-and-original-research, email-and-newsletter, lead-magnets-and-funnels, caption-writer (goal table only), competitor-analysis
- `marketing`: campaign-plan, content-creation (section lists), email-sequence, performance-report, competitive-brief
- `analytics-skills` and `rampstack-seo:seo-traffic-diagnosis`: noise floor and comparison rules
- `sanity:content-experimentation-best-practices`: test rules
- `anthropic-skills`: skill-creator, skill-development (for the skill's own shape)


---

<!-- references/ops.md -->

# Ops

This workspace's wiring. The only file that names tools and vendors. Moving to another tool means rewriting this file alone.

## Notion

| Database | Use here | Access |
| --- | --- | --- |
| Plan database | The calendar and backlog, one row per piece (decision 1). Not built yet: its schema is in `content-models.md` and needs the owner's yes | Read; writes only on the owner's yes per change, with a backup first |
| Blogs | Published and draft posts. Never used for planning | Read only |
| Case Studies | Proof inventory and relations (Services, Related Case Studies, Related Posts) | Read only |
| Publications | One row per place a post or case study is published. Status: Planned, Scheduled, Published, Removed | Read only; repurposing rows proposed for the owner's yes |
| Skill registry | "Wugweb Skill Management System" under Wugweb HQ | Read only |

The old "Content calendar" under the owner's personal area holds Notion's starter template rows only (read 2026-11-16). Not used.

### The Blogs sync

`scripts/sync-notion-blogs.mjs` in the site repo reads every Blogs row that is not in the trash, whatever its Status, and creates a Sanity post for any row it cannot match. A planned row in Blogs would become a post on the next write. This is why the plan has its own database.

## Sanity

`service` documents hold the six service pages; `post` and `caseStudy` are written by sync from Notion. Read only. No schema change from this skill (decision 22).

## R2

All media. Briefs name existing files by key. No uploads, copies, crops, re-encoding or sound.

## Before backup and write

Before any approved Notion change: fetch the page or rows, save the backup (for this project, under `claude/backups/` named with the source and date), show current → proposed, apply only what was approved.

## Connectors and tools in Claude

- Notion connector: search, fetch, query data sources.
- `wugweb-seo` reads Search Console and AI answer data; this skill takes its reports, not the raw tools.
- Platform numbers (LinkedIn, Medium, Behance, Dribbble, newsletter) come from the owner or `wugweb-work`. There is no connector for them here.
- The newsletter sending tool is "owner to set".

## Outside Claude

| Thing | Instead |
| --- | --- |
| Reading Notion through the connector | Paste or attach an export of the rows, or use the Notion API with a valid token |
| Helper skills | Skipped; use the by-hand procedure in each reference |
| Automatic triggering | Attach `export/wugweb-strategy.md` by hand, or add it as a project rule |
| Running the `evals/` test cases | Run the same prompts and check the same assertions by hand |

## Repo copy

The plan lives at `docs/skills/wugweb-strategy/PLAN.md` in `wugweb-git/wugweb_site`. The skill is planned to live at `.claude/skills/wugweb-strategy/`. Putting it in the repo needs the owner's word.
