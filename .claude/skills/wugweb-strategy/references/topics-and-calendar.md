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

A list of what readers ask and object to, in their own words. It lives here; `wugweb-voice` may read it directly but may not edit it (owner decision 2026-11-17). Its words are vocabulary candidates for voice, labelled by source, never rules.

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

### Slot rows and Medium rows

- When no sourced topic exists yet, a row is still complete: it carries a proposed pillar (spread across the six, the mix being the owner's to set), a proposed intent, the account, a proposed date with timezone and a status, and its topic reads "slot" or "owner idea". The pillar and intent are proposals, never decisions.
- A Medium row is always a copy of a site post, with its canonical pointing to that post. Plan the site post first and name it in the Medium row. A Medium row with no site post is not a row.

### Dependencies

A post waits while a page it links to is not live (decision 14). Pages waiting on these blocks are not final: Service Spotlight Panel (`/services/brand`), Client Assembly Grid and Service Tag Field (homepage), Bento Block (`/about` and the six service pages), Process Map (`/services/experience`). Re-check this list in `wugweb-kits` before each plan.

### Planning rhythm

Weekly: review the next two weeks. Monthly: prune the backlog. Quarterly: rebalance the mix and re-run the gap check with `wugweb-seo`. Annually: review the strategy layer.

## Output

A calendar output is a table of rows, sorted by date, with each date marked "proposed" until the owner confirms it. No row is written to Notion without the owner's yes to that row.
