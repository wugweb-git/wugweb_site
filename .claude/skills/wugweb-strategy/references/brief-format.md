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
| 9 | Search | The cluster and primary phrase from the `wugweb-seo` site map, copied unchanged. `wugweb-work` asks `wugweb-seo` for the per-brief keyword notes and limits |
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
| Refresh | Field 11 carries keep, change and remove. Field 17 adds "facts re-checked" |

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
