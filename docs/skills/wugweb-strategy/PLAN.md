# wugweb-strategy skill: plan (for vetting)

> Plan only, 2026-11-16. Nothing is built: no skill files, no site code, no write to Sanity or R2, no change to any Notion database. Named `wugweb-content` until the owner renamed it on 2026-11-16. Registry: "Wugweb Skill Management System" in Notion (https://app.notion.com/p/41abb710b9ab81a38ca7fbd947b47298).

## Skill card

| Field | Value |
|---|---|
| Name | `wugweb-strategy` |
| Type | Claude Code project skill: one `SKILL.md` plus `references/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned) |
| Status | Plan for vetting. Not built. |
| Owner | Vedanshu, Wugweb |
| Lives at | `.claude/skills/wugweb-strategy/` |
| Question it answers | What does Wugweb want to say, to whom, and when? |
| Sources | Notion Blogs, Notion Case Studies, Notion Publications, Sanity `service` documents (all read only) |
| Hands to | `wugweb-work`, as a brief |
| Scripts | None in v0.1 |

## About

**What it is.** A written standard and procedure for deciding what Wugweb says, to whom and when. It ends in a brief.

**What it is not.** It writes no piece, headline or body. It is content strategy only, not brand strategy.

**When it triggers.** Requests about what to write next, the editorial or social calendar, a brief, a campaign, repurposing, refreshing or retiring a piece, or which case study should back a page.

**The working line (owner, 2026-11-16).** Strategy hands work a brief; work hands back a finished piece.

| Mode | In | Out |
|---|---|---|
| Strategy | Brand-os positioning and audiences, owner goals | Goals, pillar mix, what Wugweb does not publish |
| Topics | Strategy, seo keyword notes, existing inventory | Scored topic backlog |
| Calendar | Backlog, capacity, accounts | Dated plan: what, which account, which date, status |
| Brief | One calendar item | One-page brief for `wugweb-work` |
| Proof map | Case-study inventory, service pages | Which case studies back which page or article |
| Review | Inventory, seo audit data | Keep, refresh, merge or retire, per piece |
| Campaign | A goal and a date range | Campaign plan as a set of briefs, including a launch spread over several posts |
| Repurpose | One approved piece | Which other forms, on which platform, in what order; the Behance and Dribbble refresh order |
| Report | Post results | What changes in the next plan |
| Model | A gap found in any mode | Content-model change, current → proposed |

## What it owns

- Content strategy, and the content pillars and the mix across them.
- Topics and the calendar: what goes out, on which account, on which date.
- Briefs handed to production.
- The structure a piece's message takes in a brief.
- Editorial standards.
- Content models.
- Deciding what gets refreshed or retired.
- Deciding which case studies back which service page or article.
- Campaign plans, including a launch spread over several posts.
- Repurposing plans: which pieces, in what order, and which form suits which piece and platform.
- Client co-posts and partner tagging, as a plan.
- The order in which the existing Behance projects and Dribbble shots are refreshed.
- Reading how posts performed, to feed the next plan.

## What it does not own

- **Brand strategy.** Positioning, values, audience definition and the messaging framework belong to `wugweb-brand-os`. This skill builds on them and quotes them as written. It never redefines them. Asked a brand-positioning question, it names `wugweb-brand-os` as the owner and stops.
- **Making any piece.** `wugweb-work` does that in two tracks: client work (case studies, portfolio), and Wugweb's own content (blog posts, service pages, site and landing copy, social and deck versions). Work also publishes each post, on the owner's yes per post.
- **Voice and tone.** `wugweb-voice`.
- **Keyword data and SEO rules.** `wugweb-seo`.
- **Layout and tokens.** `wugweb-kits`.

## Why

1. Planning lives in no skill today. `wugweb-work` makes pieces but nothing says which piece, for whom, or in what order.
2. The planning data is thin. In Notion Blogs, Status has one option, Published. There is no audience, pillar, intent, brief or review field.
3. Proof is not wired. The case-study inventory says Services, Related Case Studies and Related Posts are filled in Notion but empty in Sanity.
4. Proof is scarce. Of 44 case studies, 19 are rich, 18 are text-only, 7 are hidden stubs, and 7 carry metrics. Choosing proof has to be deliberate.
5. Social planning needs a home. There is no social skill; making went to `wugweb-work`, planning comes here.

## Findings that shape the plan

- **The calendar cannot sit in Notion Blogs as it is.** `scripts/sync-notion-blogs.mjs` reads every row that is not in the trash, whatever its Status, and creates a Sanity post for any row it cannot match. A planned row would become a post on the next write.
- **"Brief" is claimed three times:** by this skill, by the Brief mode in `wugweb-work`, and by the "ski-ramp content briefs" in the installed `wugweb-seo`.
- **There is no written strategy to start from.** No audience list, goals, cadence or agreed pillar set was found in the sources read.
- **Notion Publications already has planning statuses** (Planned, Scheduled, Published, Removed) with one row per place a post or case study is published. It is a natural home for the repurposing plan.

## Standard structure

```
---
name: wugweb-strategy
description: This skill should be used when the user asks "what should we write next", "plan the content calendar", "plan the social calendar", "write a brief for", "plan a campaign", "which case study backs this page", "should this post be refreshed or retired", or "plan the repurposing" for Wugweb. It governs content strategy only: topics, pillar mix, the editorial and social calendar, briefs handed to wugweb-work, editorial standards, content models, the proof map, and refresh or retire decisions. It does not write any piece, and it does not cover brand strategy: positioning, values, audience definition and the messaging framework belong to wugweb-brand-os.
version: 0.1.0
---
```

- **Body:** 1,500 to 2,000 words, imperative voice. Purpose, when to use and when not, the ten modes (one paragraph each), the rules that always apply, and a reference index.
- **Trigger phrases** are all about content planning. None uses "strategy" on its own, "positioning", "brand" or "messaging".
- **The owner's standing rules** are read from the shared file, not copied.
- **No duplication:** a rule lives in one file only.

```
.claude/skills/wugweb-strategy/
├── SKILL.md
├── references/
│   ├── strategy.md
│   ├── topics-and-calendar.md
│   ├── brief-format.md
│   ├── piece-structures.md
│   ├── editorial-standards.md
│   ├── content-models.md
│   ├── proof-map.md
│   ├── refresh-retire.md
│   ├── campaigns-and-repurposing.md
│   ├── performance-review.md
│   ├── skill-map.md
│   └── ops.md
├── examples/
└── evals/
    └── evals.json
```

## What each reference file holds

| File | Holds |
|---|---|
| `strategy.md` | Goals, the pillar set and mix, what Wugweb does not publish. Audiences and positioning are pointed to in brand-os, not restated. |
| `topics-and-calendar.md` | Topic intake, scoring, backlog fields, statuses, cadence, accounts |
| `brief-format.md` | The brief template and its variants per piece type |
| `piece-structures.md` | The shape a piece's message takes in a brief (claim, tension, proof, outcome), per piece type |
| `editorial-standards.md` | What makes a piece worth publishing: one audience, one claim, a named proof, byline, canonical and syndication rules |
| `content-models.md` | Content types, what each is for, planning fields, relations between types |
| `proof-map.md` | Rules for which case study may back what; the map itself stays in Notion relations |
| `refresh-retire.md` | Decision rules and the evidence each decision needs |
| `campaigns-and-repurposing.md` | Campaign shape, repurposing sequences, form per platform, co-posts and tagging, Behance and Dribbble refresh order, use of Publications |
| `performance-review.md` | The Report mode: which numbers are read and how they change the next plan |
| `skill-map.md` | Helpers per mode and what each may not do |
| `ops.md` | This workspace's wiring: the Notion databases and how the sync behaves. The only file that names vendors. |
| `examples/` | Brief for a blog post, a service page and a refresh; a calendar skeleton with owner-input markers and no invented topics |
| `evals/evals.json` | Test prompts and assertions |

## The brief handed to wugweb-work

| # | Field | Note |
|---|---|---|
| 1 | Brief ID, piece type, forms wanted | Post, service page, site copy, social post, case study slot |
| 2 | Why now | Goal, campaign, target date |
| 3 | Audience and their tension | One audience, named from the brand-os list |
| 4 | The one claim | One sentence |
| 5 | Proof | Case-study IDs from the proof map, facts with source; "unvalidated" is allowed |
| 6 | Outcome | One action wanted from the reader |
| 7 | Piece structure | Pointer to one structure |
| 8 | Points the piece must make | Up to five; no headings, no copy |
| 9 | Search block | Pasted from `wugweb-seo` unchanged: keyword, intent, questions |
| 10 | Links | Service pages, posts and case studies it must connect to |
| 11 | Source | Notion row; for a refresh, the keep, change and remove list |
| 12 | Must not say | Permissions, sensitive clients |
| 13 | Account and platform | Where it goes out |
| 14 | Co-post and tagging | Who is named or tagged, with permission status |
| 15 | Publish dependency | For example a linked page that must be live first |
| 16 | Repurposing | Other forms, where, order |
| 17 | Acceptance | What strategy checks on return |
| 18 | Owner questions | Asked once |

Work returns the finished piece as a proposal, with a note of where it left the brief and which facts it could not back.

## Boundary: why each item is here

| Item | Not work's because | Not seo's because | Not brand-os's because |
|---|---|---|---|
| Content strategy | Work makes one piece at a time | Search is one input, not the goal | Positioning says who Wugweb is, not what to publish |
| Pillars and the mix | Work does not choose between pieces | Not a search matter | The positioning behind the pillars stays in brand-os; the mix is a publishing choice |
| Topics and calendar, by account and date | Work starts once a piece is chosen | Seo supplies demand, not the choice or date | No dates in a brand system |
| Briefs | Work consumes them | Seo fills one block only | Brand is quoted, not assigned |
| Piece structures | Work fills the structure with words | Not a search matter | Brand-os owns the messaging framework; this is only the shape per piece |
| Editorial standards | Body format and quality gate stay in work | On-page rules stay in seo | Brand rules cover identity, not publishability |
| Content models | Body Content grammar stays in work | Schema markup stays in seo | Not a brand matter; Sanity schema stays with engineering rules |
| Refresh or retire | Work does the rewrite | Seo supplies the audit; the decision weighs more than rank | None |
| Proof map | Work picks screens inside a case study, not which case study | Internal-link rules stay in seo | None |
| Campaign and repurposing plans | Work makes each form | Not a search matter | Art direction for a campaign stays in brand-os |
| Form per piece and platform | Platform specs and how each form is built stay in work | Not a search matter | None |
| Co-posts and partner tagging, as a plan | Work writes the post and tags | Not a search matter | None |
| Behance and Dribbble refresh order | Work does each refresh | Not a search matter | None |
| Post-performance read | Work publishes; it does not plan from results | Search reporting stays in seo | None |

## Handoff contract

| Skill | Goes in | Comes out | Strategy may not |
|---|---|---|---|
| `wugweb-work` | A brief | A finished piece and a return note; post results | Write or edit copy, choose screens, set layout, publish |
| `wugweb-seo` | Topic or URL list | Keyword and intent notes; audit data for review | Change keywords, titles or on-page rules |
| `wugweb-brand-os` | A request for audiences, messages, positioning | Those, as written | Restate or alter them |
| `wugweb-voice` | Nothing at brief stage | Nothing; work reads voice directly | Set tone or phrasing in a brief |
| `wugweb-kits` | Nothing | Nothing | Name a layout or block |

Helpers return proposals only. The owner's rules win over anything a helper says.

| Mode | Helpers |
|---|---|
| Strategy | `rampstack-seo:content-strategy`, `searchfit-seo:content-strategy`, `social-media-skills:content-pillars` |
| Topics | `searchfit-seo:create-topic` |
| Calendar | `social-media-skills:content-calendar`, `social-media-skills:batch-content-plan` |
| Brief | `searchfit-seo:content-brief`, `marketing:content-creation` (format reference only) |
| Review | `rampstack-seo:seo-content-audit` |
| Campaign | `marketing:campaign-plan` |
| Repurpose | `social-media-skills:content-recycling`, `social-media-skills:cross-platform-repurposing` |
| Building the skill | `anthropic-skills:skill-creator`, `anthropic-skills:skill-development` |

## Per-task tests

| Task | Passes when |
|---|---|
| Brief | All 18 fields filled or marked as an owner question; one audience, one claim; no headline or body copy; search block identical to the seo note |
| Proof map | Every case study named is published, indexed and has a body; no metric quoted that is not in the source |
| Calendar | Every item has audience, pillar, one account, date and status; no topic or date presented as decided without the owner |
| Co-posts | No co-post is planned without a permission status |
| Review | Each decision cites its evidence; nothing deleted; retire is a proposal |
| Report | Quotes only numbers it was given |
| Boundary with work | Asked to "write the post", the skill hands a brief to work and writes nothing |
| Boundary with brand-os | Asked "what is Wugweb's positioning?" or "define our audience", the skill writes nothing and points to `wugweb-brand-os` |
| Writes | No Notion or Sanity write without approval of that exact change and a backup |
| Style | British English, sentence case, no dashes |

## Open questions for the owner

1. **Calendar home.** Recommended: a separate Notion database for the plan. The alternative is planned rows in Blogs plus a Status filter in the sync, which is a code change.
2. **Pillar set.** Recommended: the six service pillars. The other candidates are the 13 Notion blog categories and the lists in `brand_guidelines/03_MARKETING_SYSTEM/13_CONTENT_PILLARS.md`, which gives two different sets.
3. **Piece structures.** Brand-os owns the messaging framework. Is it right for this skill to hold the per-piece structure?
4. **One brief.** Proposed: this skill owns the brief, seo fills its search block, and work's Brief mode stays for client work only.
5. **Case studies.** Does this skill decide which case study is done next and which service it backs? Proposed: yes, but never the claim or body.
6. **Service-page briefs.** Service pages live in Sanity, not Notion. Where should their briefs sit?
7. **Retiring a post.** Does the URL return 404, or redirect? Deletion stays an owner-run script.
8. **Cadence and capacity.** How many pieces a month, and who writes?
9. **Audiences and goals.** Do these come from the owner or from the brand-os plan?
10. **Old calendar.** A "Content calendar" database sits under the owner's personal area in Notion, last edited 2026-04-13. It was not opened. Use it or ignore it?
11. Merged into question 13.
12. **Notion pages.** The skill page and the registry still say `wugweb-content`, and the skill page still shows the old "Not decided" card. Rename and replace them?
13. **Accounts.** Which accounts are in scope, including the owner's own Medium and LinkedIn, and are the 5 personal Behance projects included?
14. **Linked pages.** Does a post wait until the page it links to is live?
15. **Client permission.** Is it needed before a client is named or tagged?
16. **Social numbers.** Who pulls them for the Report mode? Proposed: this skill reads them for planning, and `wugweb-seo` keeps search reporting.
17. **The name.** Does `wugweb-strategy` mean content strategy only? The plan keeps it to that.

## Source gaps

- **Marketing system.** `brand_guidelines/03_MARKETING_SYSTEM/` has 16 files; 14 are 7 lines long and mostly about visuals. The messaging framework is two sentences and one line. Copy guidelines are three sentences.
- **Format decision matrix.** It is not in that folder. It is in `brand_guidelines/08_ARTWORK_FORMULAS/`, 13 lines, and covers artwork, not content formats.
- **Planning backlog.** `pending.md` has no content strategy or calendar items.
- **Receiving side.** Work's procedure for blog posts and service pages (its Part 3) is not written yet.
- **Sibling plans.** The registry was read, but not the voice, brand-os, kits or seo pages, so the handoffs above are proposed, not agreed.
- **Search data.** None was pulled. The Wugweb SEO page says current titles are based on sub-services, not measured demand.
- **Behance and Dribbble.** Reported by the social session as 7 projects and 8 shots; not checked against the live profiles.
- **Not checked.** The Notion Blogs rows were not counted, no post body was read, and no helper skill was run.

## MATRIX ROW: wugweb-strategy

- **Owns:** Content strategy only: pillar mix, topics, the editorial and social calendar, briefs, per-piece structures, editorial standards, content models, the proof map, refresh or retire decisions, campaign and repurposing plans, and the post-performance read for planning.
- **Reads:** Notion Blogs, Case Studies and Publications; Sanity service documents; positioning, audiences and messaging framework from `wugweb-brand-os`; keyword, intent and audit notes from `wugweb-seo`; return notes and post results from `wugweb-work`.
- **Produces:** One-page briefs for `wugweb-work`, a scored topic backlog, a dated calendar by account, the proof map, keep or refresh or retire proposals, campaign and repurposing plans, and content-model changes as current to proposed.
- **Calls:** `wugweb-seo` for keyword notes and audit data; `wugweb-brand-os` for audiences and messages; `wugweb-work` to make each piece. Third-party helpers for content strategy, topics, calendar, briefs, audits, campaigns and repurposing, as proposals only.
- **May not change:** Positioning, values, audience definitions or the messaging framework; any copy, headline or body; voice; keywords, titles or on-page rules; layout or tokens; Sanity schema. No Notion or Sanity write without approval and backup. Deletes and publishes nothing.

## Change log

| Date | Change |
|---|---|
| 2026-11-16 | First plan, as `wugweb-content`. |
| 2026-11-16 | Planning side of social added (owner, through the coordinating session). |
| 2026-11-16 | Renamed `wugweb-strategy` (owner). Scope unchanged. Brand strategy stated as out of scope. |
