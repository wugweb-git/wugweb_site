# wugweb-strategy skill: plan (ready for vetting)

> Plan only, 2026-11-16. Nothing is built: no skill files, no site code, no write to Sanity or R2, no change to any Notion database. Named `wugweb-content` until the owner renamed it on 2026-11-16. Registry: "Wugweb Skill Management System" in Notion (https://app.notion.com/p/41abb710b9ab81a38ca7fbd947b47298).

## Skill card

| Field | Value |
|---|---|
| Name | `wugweb-strategy` |
| Type | Claude Code project skill: one `SKILL.md` plus `references/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned) |
| Status | v0.1.0 built. Master copy in `.claude/skills/wugweb-strategy/`. |
| Notion page | https://app.notion.com/p/41abb710b9ab8187a4a8c5979daff39b (the plan sits on the skill page itself) |
| Owner | Vedanshu, Wugweb |
| Lives at | `.claude/skills/wugweb-strategy/` |
| Question it answers | What does Wugweb want to say, to whom, and when? |
| Sources | Notion Blogs, Notion Case Studies, Notion Publications, Sanity `service` documents (all read only). The new Notion plan database is this skill's record, and each change to it needs the owner's yes. |
| Hands to | `wugweb-work`, as a brief |
| Scripts | None in v0.1 |
| Development chat | `https://claude.ai/chat/2efe7ee5-7636-4241-8794-c34d3c501eed` (given by the owner, 2026-11-16) |
| Repo plan | `https://github.com/wugweb-git/wugweb_site/blob/main/docs/skills/wugweb-strategy/PLAN.md` |

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
- The pillar and cluster structure that each piece and its links sit inside.
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
- **"Brief" is claimed twice:** by this skill and by the Brief mode in `wugweb-work`. The installed `wugweb-seo` (updated 2026-11-16) no longer claims one: it returns "brief constraints", limits only and never wording, which is the search block in this plan. Its boundary table still says `wugweb-content`, not decided. Settled: decision 4.
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
- **The owner's standing rules** are read from the shared file, `docs/skills/STANDING-RULES.md`, and are not restated here.
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
| `strategy.md` | Goals, the pillar set and mix, what Wugweb does not publish. Audiences and positioning are pointed to in brand-os, not restated. One editorial stance sentence, approved by the owner (decision 21). |
| `topics-and-calendar.md` | Topic intake, scoring, backlog fields, statuses, cadence, accounts. The signal log: readers' questions and objections in their own words, each with its source and date, with client names removed unless permitted. |
| `brief-format.md` | The brief template and its variants per piece type |
| `piece-structures.md` | The shape a piece's message takes in a brief (claim, tension, proof, outcome), per piece type |
| `editorial-standards.md` | What makes a piece worth publishing: one audience, one claim, a named proof, byline, canonical and syndication rules. Holds no tone or phrasing rules; it points to `wugweb-voice`. |
| `content-models.md` | Content types, what each is for, planning fields, relations between types |
| `proof-map.md` | Rules for which case study may back what; the map itself stays in Notion relations |
| `refresh-retire.md` | Decision rules and the evidence each decision needs |
| `campaigns-and-repurposing.md` | Campaign shape, repurposing sequences, form per platform, co-posts and tagging, Behance and Dribbble refresh order, use of Publications |
| `performance-review.md` | The Report mode: which numbers are read and how they change the next plan |
| `skill-map.md` | Helpers per mode and what each may not do |
| `ops.md` | This workspace's wiring: the Notion databases and how the sync behaves. The only file that names vendors. |
| `examples/` | Brief for a blog post, a service page and a refresh; a calendar skeleton with owner-input markers and no invented topics |
| `evals/evals.json` | Test prompts and assertions |

## Content model: planning fields

Source: kits docs. `kits_design_system/docs/tokens/layout-shell.md`, section "CMS fields per level", proposes new fields on `caseStudy` and `post`. It is a proposal; nothing is deployed. How this plan reads it:

| Proposed field | Whose it is | This plan's view |
|---|---|---|
| `focusKeyword`, `secondaryKeywords`, `searchIntent`, `schemaType`, canonical, `noIndex`, share-image and breadcrumb fields | `wugweb-seo` | Not planning fields. Notion Blogs already has Focus Keyword and Schema Type. |
| `aiSummary`, `keyTakeaways` | `wugweb-work` writes them; `wugweb-seo` sets any limits | Content of the piece, not planning. Notion Blogs already has AI Summary. |
| `faqs` (for FAQPage markup) | No one | Clashes with the owner's no-FAQPage rule. Not wanted. |
| `lastReviewedAt` | This skill decides the review; `wugweb-seo` and the owner decide how it is exposed | Wanted as a planning date: when a piece was last reviewed for refresh. It must not show as a visible "last updated" date on posts (owner decision, 2026-10-13). |

**Planning fields this skill would want.** None exists today.

- On the plan record, one row per piece: audience, pillar, one intent, status from idea to published or killed with a reason, account, target date, brief link, campaign label, proof (the related case studies), review verdict and review date.
- They live on the new Notion plan database (decision 1). Service-page briefs sit there too, each row linked to its Sanity service document (decision 6).
- On the published document: none. Pillar and review date stay on the plan row (decision 22). No Sanity schema change.

Sanity schema changes are development and an owner decision. This skill only proposes them, as current to proposed.

**Calendar note, from the kits docs and `pending.md`.** Five blocks are awaiting sign-off, so pages that depend on them are not final: Service Spotlight Panel (`/services/brand`), Client Assembly Grid and Service Tag Field (homepage), Bento Block (`/about` and the six service pages), Process Map (`/services/experience`). Briefs for those pages carry this as a publish dependency (brief field 15).

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
| 10 | Links | Pasted from `wugweb-seo` unchanged, like the search block: the link targets for this piece, picked inside the pillar and cluster structure this skill sets (decision 20). |
| 11 | Source | Notion row; for a refresh, the keep, change and remove list |
| 12 | Must not say | Permissions, sensitive clients |
| 13 | Account and platform | Where it goes out: one of the accounts in scope (decision 13) |
| 14 | Co-post and tagging | Who is named or tagged, with permission status. No client is named or tagged without permission (decision 15). |
| 15 | Publish dependency | A linked page that is not live yet holds the post back (decision 14). |
| 16 | Repurposing | Other forms, where, order |
| 17 | Acceptance | What strategy checks on return |
| 18 | Owner questions | Asked once |
| 19 | What the reader already knows | Added after reading the helpers; sets the starting point of the piece |
| 20 | Success metric | One measure, with its window |
| 21 | Out of scope | What the piece is not about |

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
| Refresh or retire | Work does the rewrite | Seo supplies the audit; the decision weighs more than rank; seo decides what a retired URL does (decision 7) | None |
| Proof map | Work picks screens inside a case study, not which case study | Link targets and link rules stay in seo; the proof map is an input it reads | None |
| Campaign and repurposing plans | Work makes each form | Not a search matter | Art direction for a campaign stays in brand-os |
| Form per piece and platform | Platform specs and how each form is built stay in work | Not a search matter | None |
| Co-posts and partner tagging, as a plan | Work writes the post and tags | Not a search matter | None |
| Behance and Dribbble refresh order | Work does each refresh | Not a search matter | None |
| Post-performance read | Work publishes; it does not plan from results | Search reporting stays in seo | None |

## Handoff contract

| Skill | Goes in | Comes out | Strategy may not |
|---|---|---|---|
| `wugweb-work` | A brief | A finished piece and a return note; post results | Write or edit copy, choose screens, set layout, publish. Work's Brief mode is for client work only (decision 4). |
| `wugweb-seo` | Topic or URL list; retire proposals; the pillar and cluster structure; the proof map | Keyword and intent notes; audit data for review, including the position and click-rate signals used for refresh decisions; what a retired URL does; each brief's link targets, the link rules and the link audit | Change keywords, titles, link targets, link rules, on-page rules or what a retired URL does |
| `wugweb-brand-os` | A request for audiences, messages, positioning | Those, as written | Restate or alter them |
| `wugweb-voice` | No direct link. The brief names audience, purpose and form; `wugweb-work` passes those to voice with the draft | Nothing | Set tone or phrasing in a brief or in the editorial standards |
| `wugweb-kits` | Nothing | Nothing | Name a layout or block |

Every link reads the same on both sides: what this plan says goes to or comes from a skill must match that skill's own plan.

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

## Extracted and absorbed

Owner, 2026-11-16: the installed skills and plugins were read so that their useful rules can live inside this skill and work without them. Read only; nothing was installed, removed or edited.

- **How it was done.** About 75 skills across 12 plugins were read (the `SKILL.md` and reference files of each, unless marked). Useful rules are restated in our own words, with the source named. No text is copied.
- **Numbers are starting points.** Any count, ratio or threshold below comes from a helper file. It is a default for the owner to set, not a fact about Wugweb.
- **Platform statistics are not carried over.** The helpers quote many vendor figures about reach and engagement. None is used.
- **Clashes seen across the helpers,** all overridden by the owner's rules: scheduling approved once per batch, media creation and upload, local files as the record in place of Notion, scraping by default, review sites as a source, uncited percentages, FAQ and HowTo schema, keyword counts, visible update dates, redirects and deletes, em dashes, American spelling, title case.

### Absorbed

| Source skill | What was taken, in our words | Lands in | Clash with an owner rule |
|---|---|---|---|
| `rampstack-seo:content-strategy` and its two templates | Strategy in five layers, in order. Pillar record and selection test. Three to five recurring formats. Cadence matched to real capacity, planned below full throughput. The calendar as one record, one row per piece, with fixed columns and statuses that end in Published or Killed with a reason. A split between planned, flexible and update slots. A capped backlog. Weekly, monthly, quarterly and annual reviews. | `strategy.md`, `topics-and-calendar.md` | Its positioning sentence was declined by `wugweb-brand-os` and is taken here only as an editorial stance (decision 21). "Republish as fresh" and visible update dates dropped. Retire by redirect or delete not offered by default. Setting the calendar up in Notion needs approval. |
| `rampstack-seo:content-and-copy` (brief template only) | A reader-first brief: what the reader knows and needs, goal and metric, pillar fit, angle, format, the purpose of each section, sources, distribution, constraints, what is out of scope. A brief is required for cornerstone pieces and anything written by someone else. | `brief-format.md`, `piece-structures.md` | Voice block and slug dropped. The quotes field lists only real, available quotes. |
| `rampstack-seo:seo-content-audit` | One verdict per piece with a one-sentence reason, an owner and a date. Default keep for new and cornerstone pieces. Never decide on visits or age alone. Merge before refreshing. Same intent with a different angle means differentiate, not merge. Named approval for merge and retire. Re-measure at 30, 60 and 90 days. | `refresh-retire.md` | Redirect and delete are not actions this skill takes: zero redirects, and nothing deleted without asking. |
| `seo-skills:seo-page` | Four verdicts: keep, refresh, consolidate, retire. "Insufficient data, look again later" is a valid verdict. A refresh names its top three changes. Every reason points to a number. | `refresh-retire.md` | The measurements come from `wugweb-seo`. Retire stays a proposal. |
| `seo-skills:seo-content-audit` | A three-way publish verdict. An unsourced factual claim blocks publishing. Checks for first-hand experience. A screen for pieces that all share one skeleton. | `editorial-standards.md` | Visible datestamp and author byline requirements dropped. |
| `social-media-skills:content-research-and-sourcing` | Each brief lists its load-bearing claims; too many means two pieces. A source log kept with the calendar. Nothing is scheduled until its claims are verified. With no source, a claim becomes an owned observation or is cut. | `editorial-standards.md`, `brief-format.md` | None. It supports "never invent". |
| `social-media-skills:content-pillars` | A pillar is a theme, not a format or an intent. A small fixed number of pillars. The test that ten ideas come easily. One signature pillar. A pillar record with its share of the mix. Refresh a pillar when its angles run dry. | `strategy.md` | The "ownable" test stays with `wugweb-brand-os`. The record lives in Notion, not a local file. |
| `social-media-skills:batch-content-plan` | Plan in order: parameters, mix, calendar, briefs. Three tags per item: pillar, one intent, format. Promotion is a clear minority. No two asks in a row and no run of one format. Thin material means a smaller plan, not filler. | `topics-and-calendar.md`, `brief-format.md` | Batch approval replaced by a yes per post. Hook lines and asset creation dropped. |
| `social-media-skills:content-calendar` | Cadence set per account to what a bad week can hold. The calendar as a reusable skeleton of pillar, format and slot. One or two named series. A reserved share for reactive items. Launches planned backwards from the date. Raise cadence only once the current one is held. | `topics-and-calendar.md` | A queued buffer assumes scheduled posts. Sample post lines dropped. |
| `social-media-skills:idea-generation-and-ideation` | Ideas sourced first from the audience's own questions. A backlog card with the real source signal, demand evidence, effort and status. Scoring on pillar fit, evidence, goal and effort. Weekly review, monthly prune, quarterly rebalance. A parked idea is not a dead one. A cheap test before an expensive piece. | `topics-and-calendar.md` | Client conversations as a signal need care with names. Vendor figures dropped. |
| `rampstack-seo:seo-keyword`, `rampstack-seo:seo-competitor` (gap method) | Score topic clusters with fit and effort beside demand. Produce the top share first. Keep a deferred list and a skip list with reasons, and a list of what to defend. Existing pieces before new ones. Intent decides the format and the call to action. Re-run quarterly. | `topics-and-calendar.md` | Keyword counts and the llms.txt row dropped. Volume and difficulty figures come only from `wugweb-seo`. |
| `seo-skills:seo-keyword-cluster`, `searchfit-seo:keyword-clustering`, `searchfit-seo:internal-linking` | Hub and spoke shape. One topic, one page. No mixed intents in one cluster. No orphan piece. Each piece in a cluster links to others in it, and posts link to a service page. The owner reviews the top clusters before a quarter is committed. | `content-models.md`, `proof-map.md` | Clustering data, anchor text and word counts belong to `wugweb-seo`. |
| `seo-skills:seo-competitor-gap-analysis` | Each gap maps to one action: new, expand or refresh. The number of competitors covering a topic shows how real it is. Many gaps on one theme become one hub. No competitor-brand topics unless the owner opts in. | `topics-and-calendar.md` | None. |
| `seo-skills:seo-plan` | Always three phases. Lead with the weakest area. Every item has an owner, an effort size and a metric. A map of what blocks what. Old inputs are stale. Do not plan what cannot be done. | `strategy.md`, `campaigns-and-repurposing.md` | Defaults to the US market. Its "pillar" means a score, not a content pillar. |
| `social-media-skills:social-strategy` | One primary objective. Channels judged on audience, format, goal and capacity. Pick a few and name the ones dropped. Win one channel before adding another. A capacity record. | `strategy.md` | Local file as the record. |
| `social-media-skills:goals-and-kpis` | Goal, then objective, then one main metric per channel. A handful of measures at most. Targets come from a real baseline, or a learning goal first. Each growth target has a quality guardrail. Action thresholds are written in advance. | `strategy.md`, `performance-review.md` | Example lift figures dropped. |
| `social-media-skills:linkedin-company-pages`, `linkedin-growth` | Which account carries what: opinion and stories on the personal profile, announcements and the record on the company page, case studies on both. With a small team the founder profile is the reach channel. Slot a post only when someone can be present after it. Fewer, stronger posts. | `topics-and-calendar.md` | Platform statistics dropped. Case studies on both accounts need client permission. Reply routines are not planning. |
| `social-media-skills:x-growth`, `instagram-growth` | A fit test before a channel is added. Each format has a job. Find the one broken stage before changing the mix. A repurposing plan must ask for native versions. | `strategy.md`, `performance-review.md` | Share prompts read as engagement bait. Trending audio breaks the no-sound rule. Their posting frequencies are not adopted. |
| `social-media-skills:campaign-and-launch-planning`, `marketing:campaign-plan` | A campaign is time-boxed with one goal and one metric. A one-page brief. Three phases told as one story, with hero pieces in each. A debrief is required. Plan backwards from production lead times. Dependencies, an asset list, risks and approvals are stated. | `campaigns-and-repurposing.md` | Invented targets and budget tables dropped. Urgency must be real. Proof posts need client permission. |
| `social-media-skills:seasonal-and-moment-marketing`, `trend-jacking` | A dated moment must fit and Wugweb must have standing. Lead times by size of moment. A trend passes fit, then safety, then timing, or is left alone. A written list of what is never joined. An approver agreed in advance. | `campaigns-and-repurposing.md`, `topics-and-calendar.md` | The two sources disagree on the reactive share; the owner sets it. A fast lane still ends in a yes per post. Trending sounds excluded. |
| `social-media-skills:cross-platform-repurposing`, `content-recycling` | Plan in atoms, one point per post. Each version must stand alone and suit its platform. Space versions out. Where two accounts share an audience, change the angle. Some pieces should not travel. Reuse over time only for evergreen, proven pieces, spaced apart, with one thing changed and facts re-checked. | `campaigns-and-repurposing.md` | Media creation and refreshed media dropped. |
| `seo-skills:seo-gaps-to-social-campaign`, `ai-search-gaps-to-social-campaign`, `site-audit-to-social-distribution` | From a search gap to a campaign: scope, a few themes each with an evidence line, the owner sees the themes before any drafting, one intent per item traceable to its source, the owner picks how it is dated, one campaign label. Topics classed as owned, contested or missing, with a testable hypothesis each. A refresh is paired with its distribution. | `campaigns-and-repurposing.md` | Creating posts in an outside tool excluded. Drafting belongs to `wugweb-work`. |
| `social-media-skills:collabs-and-cross-promotion`, `ugc-and-influencer` | A co-post is agreed in full before anything is made: format, who does what, timing, one call to action, what each side says, the metric, disclosure. A lead time. A low-risk first collaboration. Rights agreed in writing. | `campaigns-and-repurposing.md` | The source has no client-permission step; one is added. Giveaway mechanics dropped as engagement bait. |
| `social-media-skills:social-proof-and-testimonials` | Match the proof to the objection. A ladder of proof strength. Proof placed at decision points. A consent check before any proof is planned; a public tag is not permission. | `proof-map.md` | Its case-study shape is not adopted; the body standard belongs to `wugweb-work`. |
| `social-media-skills:audience-research` | The kind of job a reader has points to the kind of piece. Unsourced audience claims are labelled as assumed. | `strategy.md`, `piece-structures.md` | The audience definition itself stays with `wugweb-brand-os`. |
| `marketing:campaign-plan` (message hierarchy), `marketing:content-creation` (section lists only) | A message in four steps: why care, the answer, why us, what next. One core message, with a proof for each supporting point. One primary call to action per piece. | `piece-structures.md` | Its case-study template is not adopted. Hook formulas with invented statistics dropped. |
| `social-media-skills:content-audit` | A fixed look-back window for social. Refresh before retire. A map of pillar coverage against the intended mix. With thin data, audit structure only. | `refresh-retire.md`, `performance-review.md` | None. |
| `social-media-skills:analytics-and-reporting`, `marketing:performance-report`, `seo-skills:seo-ai-social-report` | One primary metric per goal with a fixed window. A metric that would not change next week's action is a diagnostic. A fixed report order ending in three actions: scale, cut, test. A missing number is flagged, never filled. A first snapshot is a baseline, not growth. Partial periods are marked. | `performance-review.md` | Benchmark ranges dropped. Forecasts only as ranges from real data. |
| `analytics-skills` (four skills), `rampstack-seo:seo-traffic-diagnosis` | A noise floor: small samples do not change the plan. Low traffic is read weekly, not daily. Compare like with like. Give absolute and relative change together. Longer windows for a long sales cycle. Rate a channel on volume, engagement and conversion together. Never drop a channel on last-click figures alone. Confirm a change is real before reacting. | `performance-review.md` | Third-party benchmarks only with their source attached. |
| `social-media-skills:experimentation-and-ab-testing`, `viral-reverse-engineering` | One variable per test. The decision rule is written first. A tie is a result. Repeat before anything becomes a rule. One strong post is a hypothesis, checked for luck, account size and timing. | `performance-review.md` | Variants scheduled as a set conflict with a yes per post. |
| `social-media-skills:data-and-original-research` | A test for whether an original study is worth doing. Design before collecting. No rounding up. A small sample is directional. | `campaigns-and-repurposing.md`, `editorial-standards.md` | Visible update stamp dropped. Client data needs permission. |
| `marketing:email-sequence`, `social-media-skills:email-and-newsletter`, `lead-magnets-and-funnels` | A sequence is planned before it is drafted: purpose, timing, one call to action, exit condition. An issue as a plan. A two-way loop between newsletter and social. Pieces matched to funnel stage. | `campaigns-and-repurposing.md` | Comment gating and false urgency dropped. Sending needs the owner's yes. The newsletter is in scope (decision 19). |
| `searchfit-seo:content-strategy`, `create-topic`, the `content-strategist` agent | Intake questions before planning. A four-box priority sort. A list of idea angles. A record per topic. Existing content sorted into strong, thin, overlapping and missing. A plan sized to the team. | `topics-and-calendar.md` | Daily publishing advice rejected. Difficulty with no source and proposed URLs dropped. |
| `marketing:competitive-brief`, `social-media-skills:competitor-analysis` | A topic by competitor gap table. A format coverage table. A small fixed roster. The research date is stated. Inferred is marked apart from observed. | `topics-and-calendar.md` | Review sites as a source excluded. Competitor numbers are marked as estimates. |
| `social-media-skills:caption-writer` (its goal and structure table only) | One goal per post, and the goal decides the structure and the kind of ask. If the goal needs two asks, it is two posts. | `piece-structures.md`, `brief-format.md` | Its sample asks include engagement bait and false urgency; dropped. The wording of an ask belongs to `wugweb-work`. |
| `social-media-skills:educational-content-and-how-to`, `storytelling-and-narrative`, `thread-writer`, `story-writer`, `behind-the-scenes-and-founder` (planning lines only, found by search, not read in full) | One thing taught per piece; more than that becomes a series. A thread only when the idea needs several beats. A recurring series is a commitment, so plan only what can be kept up. Teaching and story pieces are judged on saves, shares and replies, not likes. | `topics-and-calendar.md`, `performance-review.md` | Their vendor statistics dropped. Everything else in them is making. |
| `sanity:content-experimentation-best-practices` (read in part) | Work out the sample a test needs before it starts. Do not stop early on a good-looking result. Decide the smallest change worth acting on first. Log every test. | `performance-review.md` | None. Wugweb's volumes may rarely support a formal test. |
| `marketing:seo-audit`, `social-media-skills:ai-search-optimization`, `social-seo`, `analytics-skills:analytics-diagnostic-method` (as reported by the `wugweb-seo` session; not read here) | Check the plan for missing pieces by buyer stage and for formats competitors use that Wugweb does not. Sources that AI answers cite where Wugweb is absent become a target list for earned mentions. Plan social posts as clusters under a pillar. Check sample size and a change in traffic mix before reading post or channel numbers. | `topics-and-calendar.md`, `campaigns-and-repurposing.md`, `performance-review.md` | No astroturfing: mentions are earned, never planted. The data behind each comes from `wugweb-seo`. |
| `anthropic-skills:skill-creator`, `skill-development` | A third-person description with quoted trigger phrases that also says when to use it. An imperative body. Each reference named with when to read it. No duplication. Realistic evals, including near-miss prompts that must not trigger. | `SKILL.md`, `evals/` | The two disagree on the evals layout (a folder per case, or one `evals.json`). To settle at build time. |

### Kept as optional helpers

| Helper | Used for | Needs | Limit |
|---|---|---|---|
| The helpers already named under "Handoff contract" | Second opinion per mode | Claude | Proposals only |
| `seo-skills:seo-content-brief` | Cross-check of a brief's evidence | SE Ranking, paid | FAQ blocks, FAQ and HowTo schema, word-count floors and dated titles are ignored |
| `seo-skills:seo-keyword-cluster`, `seo-competitor-gap-analysis` (the runs) | Data for the backlog, through `wugweb-seo` | SE Ranking, paid | Run by `wugweb-seo`, not here |
| `brightdata-plugin:competitive-intel`, `live-research` | Topic gaps and research for a brief | Paid tool, login | Scraping only on the owner's yes |
| `tinyfish:tinyfish-research` | Research for a brief | Sign-in | Not signed in today |
| `Notion:database-query` | Reading a calendar kept in Notion | Notion connector | Read only |
| `Notion:create-database-row` | Adding a calendar row | Notion connector | It writes at once; used only after the owner's yes for that row |
| `data:analyze` | Sanity checks on numbers the owner supplies | None | No invented sample data |
| `brightdata-plugin:brand-listening` | Possible input to the Report mode | Paid tool, login | Not read |

### Ignored

| Skill | Reason |
|---|---|
| `social-media-skills:scheduling-and-queue`, `platform-specs-and-validation` | Publishing mechanics. Kept only: every planned date carries a timezone. |
| `social-media-skills:community-management`, `engagement-routine` | Running a community and replying. Kept only: consent before a member is featured. |
| `productivity:task-management` | A second record outside Notion; it creates files without asking. |
| `data:build-dashboard` | Output tooling; with no data it makes up a sample set. |
| `seo-skills:seo-keyword-niche`, `rampstack-seo:programmatic-seo` | Bulk templated pages; not studio scale. Kept only: pilot a few pieces and review before committing to more. |
| `searchfit-seo:keyword-cluster` (command) | Thin duplicate. |
| `activecampaign` marketing-planner agent | Not connected; listed only. |
| `marketing:draft-content`, `brand-review`, the drafting half of `content-creation` | Making and voice. |
| The other writing, design, media and platform-publishing skills in `social-media-skills` | Making. Not read beyond their names. |
| Design and slides skills (deck structures) | Not read. They describe how a deck is built, which is production. |

### Passed to other skills

- **For `wugweb-seo`:** keyword discovery, intent classing, clustering by shared results, all volume and difficulty figures; title, description and slug limits; schema and technical checks; the position and click-rate signals used for refresh decisions, delivered here as inputs; competitor ranking data; link audits. Third-party rules to keep out there too: keyword counts, FAQ and HowTo schema, llms.txt, visible datestamps, redirects and deletes.
- **For `wugweb-work`:** all post, caption, hook, email and newsletter writing; reply and comment routines; advocacy copy; attribution wording on a piece; report pages and charts for original research; outreach pitches; everything to do with scheduling and publishing.
- **For `wugweb-brand-os`:** the "ownable" test for a pillar; the audience definition.
- **For `wugweb-voice`:** how readers phrase things. Collecting and storing readers' own words stays here, as the signal log (see `topics-and-calendar.md`); voice reads it.

### Not read

- `searchfit-seo`: the two other agents and the on-page, schema and technical skills.
- `rampstack-seo:programmatic-seo`: seven of its ten reference files.
- `social-media-skills:ugc-and-influencer`: read in part.
- `evals` fixtures in every plugin.
- The installed `wugweb-seo` has only its `SKILL.md`; the reference files it points to are not in the folder.

## Works beyond Claude

Owner, 2026-11-16: every skill must be usable from GPT, Cursor or another tool.

- **Plain Markdown.** `SKILL.md` and every reference file are plain Markdown that any model can follow. No rule depends on a Claude feature.
- **Core rules in `SKILL.md`.** Other tools may not load reference files on demand, so `SKILL.md` carries the core rules on its own. The reference files hold detail and examples.
- **Absorbed, not borrowed.** The rules in "Extracted and absorbed" are written into this skill, so no mode depends on a helper being installed.
- **Helpers are optional.** The Claude plugins and helper skills named above speed a mode up; none is required. Each mode has its own by-hand procedure in the reference files.
- **Scripts.** None in v0.1. Any script added later is plain Node with no Claude tooling.
- **Wiring in one file.** Tools, vendors and connectors are named only in `references/ops.md`. Moving to another tool means rewriting that file alone.
- **Single-file export.** `wugweb-strategy.export.md`: the `SKILL.md` body and the reference files joined in reading order, to paste or attach in GPT, Cursor or another tool. It is regenerated whenever the skill changes.
- **Export test.** The eval prompts are run from the export alone in another tool. It passes when the output meets the same assertions as the run inside Claude. The wording may differ; the brief fields, boundaries and refusals may not.

**What works only in Claude today**

| Thing | Outside Claude |
|---|---|
| Reading Notion through the connector | Paste or attach an export of the rows, or use the Notion API with a valid token |
| The named helper skills and plugins | Skipped; the by-hand procedure is used |
| Automatic triggering from the frontmatter description | The export is attached by hand, or added as a project rule |
| Running `evals.json` with the skill tooling | The same prompts and assertions are checked by hand |

## Per-task tests

| Task | Passes when |
|---|---|
| Brief | All 21 fields filled or marked as an owner question; one audience, one claim; no headline or body copy; search block identical to the seo note |
| Proof map | Every case study named is published, indexed and has a body; no metric quoted that is not in the source |
| Calendar | Every item has audience, pillar, one account, date and status; no topic or date presented as decided without the owner |
| Co-posts | No co-post is planned without a permission status |
| Review | Each decision cites its evidence; nothing deleted; retire is a proposal |
| Report | Quotes only numbers it was given |
| Boundary with work | Asked to "write the post", the skill hands a brief to work and writes nothing |
| Boundary with brand-os | Asked "what is Wugweb's positioning?" or "define our audience", the skill writes nothing and points to `wugweb-brand-os` |
| Writes | No Notion or Sanity write without approval of that exact change and a backup |
| Style | British English, sentence case, no dashes |
| Absorbed rules | No helper's statistic appears in the skill as a fact; every absorbed number is marked as a default the owner set or has yet to set |
| Portability | Run from the single-file export in another tool, the eval prompts meet the same assertions; no step needs a Claude-only helper |

## Owner decisions (2026-11-16)

1. **Calendar home.** A new Notion plan database. Notion Blogs and the sync stay as they are.
2. **Pillar set.** The six service pillars.
3. **Piece structures.** Held here. Brand-os messaging is quoted as written.
4. **One brief.** This skill owns the brief for Wugweb's own content. Work's Brief mode is for client work only. `wugweb-seo` fills the search block.
5. **Case studies.** This skill decides which case study is done next and which service it backs, never the claim or the body.
6. **Service-page briefs.** In the plan database, each row linked to its Sanity service document.
7. **Retiring a post.** This skill proposes it, and `wugweb-seo` decides what the URL does. Deletion stays an owner-run script.
8. **Cadence and capacity.** Not set. Set from a baseline later.
9. **Audiences and goals.** Audiences come from `wugweb-brand-os` as written. Goals come from the owner and live in `strategy.md`.
10. **Old calendar.** Read on 2026-11-16. It holds Notion's starter template sample rows only, none about Wugweb. Nothing was moved, and its layout may serve as a reference for the plan database.
11. Merged into decision 13.
12. **Notion pages.** Settled earlier: one Notion page per skill, with the plan on it.
13. **Accounts.** In scope: the Wugweb company accounts (site blog, LinkedIn page, Behance, Dribbble), the owner's LinkedIn and the owner's Medium. The 5 personal Behance projects are out.
14. **Linked pages.** A post waits until the page it links to is live.
15. **Client permission.** Always needed before a client is named or tagged.
16. **Social numbers.** This skill reads social numbers for planning; `wugweb-seo` keeps search reporting.
17. **The name.** `wugweb-strategy` means content strategy only.
18. **Starting numbers.** All left blank, marked "owner to set", until there is a baseline. Pillars are six (decision 2).
19. **Newsletter.** In scope. Sending needs the owner's yes.
20. **Internal links in a brief.** `wugweb-strategy` sets the pillar and cluster structure; `wugweb-seo` picks each brief's link targets inside it, owns the link rules and checks the links in the audit. The proof map stays here as the record of which case study backs which page, and `wugweb-seo` reads it when picking targets. This replaces the earlier split.
21. **Editorial stance.** `strategy.md` holds one sentence on what Wugweb publishes, for whom, to what end, and how it differs from what else is out there. It is built from the positioning in `wugweb-brand-os` and never restates or changes it.
22. **Fields on the published document.** None. Pillar and review date stay on the plan database. No Sanity schema change.

**Still to match in two other plans.** In the `wugweb-work` plan: its Brief mode is for client work only (decision 4). In the `wugweb-seo` plan: it decides what a retired URL does (decision 7). The link-target wording (decision 20) already matches the installed `wugweb-seo` 2.2.1.

**Decision 23, proof map and link targets (owner, 2026-11-16).** The proof map wins on which case study backs a page. `wugweb-seo` picks the other link targets for a brief around it. This line is still to go in the `wugweb-seo` plan with the same wording.

## Source gaps

- **Marketing system.** `brand_guidelines/03_MARKETING_SYSTEM/` has 16 files; 14 are 7 lines long and mostly about visuals. The messaging framework is two sentences and one line. Copy guidelines are three sentences.
- **Format decision matrix.** It is not in that folder. It is in `brand_guidelines/08_ARTWORK_FORMULAS/`, 13 lines, and covers artwork, not content formats.
- **Planning backlog.** `pending.md` has no content strategy or calendar items.
- **Receiving side.** Work's procedure for blog posts and service pages (its Part 3) is not written yet.
- **Sibling plans.** The registry was read, but not the voice, brand-os, kits or seo pages, so the handoffs above are proposed, not agreed.
- **Search data.** None was pulled. The Wugweb SEO page says current titles are based on sub-services, not measured demand.
- **Behance and Dribbble.** Reported by the social session as 7 projects and 8 shots; not checked against the live profiles.
- **`wugweb-seo` handoff.** The installed skill has only its `SKILL.md`; the file that lists the fields of its brief constraints is not in the folder, so the search block's exact fields are not confirmed.
- **Not checked.** The Notion Blogs rows were not counted, no post body was read, and no helper skill was run. The helpers were read, not run.

## MATRIX ROW: wugweb-strategy

- **Owns:** Content strategy only: pillar mix, topics, the editorial and social calendar, briefs, per-piece structures, editorial standards, content models, the proof map, refresh or retire decisions, campaign and repurposing plans, and the post-performance read for planning.
- **Reads (sources):** Notion Blogs, Case Studies and Publications; Sanity service documents; the case-study inventory in docs/research; brand_guidelines; the registry. All read only.
- **Gives to:** `wugweb-work`: one-page briefs, the calendar by account and date, the proof map, repurposing and campaign plans, refresh or retire decisions. `wugweb-seo`: topic and URL lists to research or audit; retire proposals; the cluster structure and proof map.
- **Takes from:** `wugweb-brand-os`: positioning, audiences, messaging framework. `wugweb-seo`: keyword, intent, link-target and audit notes, with position and click-rate signals for refresh decisions. `wugweb-work`: finished pieces, return notes, post results. `wugweb-voice` and `wugweb-kits`: nothing directly; `wugweb-work` reads them.
- **Never does:** Writes or edits any piece; publishes; redefines positioning, audiences or messaging; sets voice, keywords, titles, links, layout or tokens; changes Sanity schema; decides what a retired URL does; writes to Notion or Sanity without approval and backup; deletes anything.

## Change log

| Date | Change |
|---|---|
| 2026-11-16 | First plan, as `wugweb-content`. |
| 2026-11-16 | Planning side of social added (owner, through the coordinating session). |
| 2026-11-16 | Renamed `wugweb-strategy` (owner). Scope unchanged. Brand strategy stated as out of scope. |
| 2026-11-16 | Plan moved onto the Notion skill page (owner: one Notion page per skill). Matrix row in the system's five-entry format. |
| 2026-11-16 | Voice link stated (no direct link; through `wugweb-work`). Portability section added (owner: usable beyond Claude). Question 12 settled. |
| 2026-11-16 | "Extracted and absorbed" added after reading the installed skills and plugins (owner). Brief finding corrected. Brief fields 19 to 21 and questions 18 to 20 added. |
| 2026-11-16 | Link-target split with `wugweb-seo` recorded as proposed (question 20). Refresh signals from `wugweb-seo` named in the handoff and matrix row. One routed row added. Editorial stance proposed (question 21). |
| 2026-11-16 | "Content model: planning fields" added from the kits docs: which proposed CMS fields are planning fields, and the five blocks awaiting sign-off. Question 22 added. The signal log of readers' own words kept here; `wugweb-voice` reads it. |
| 2026-11-16 | Open questions 1 to 22 answered by the owner and recorded as decisions. Brief fields 10, 13, 14 and 15, the refresh row, the handoff contract, the planning fields and the matrix row updated to match. Old content calendar read: starter template rows only, nothing moved. |
| 2026-11-16 | Decision 20 replaced (owner, as recorded in `wugweb-seo` 2.2.1): this skill sets the pillar and cluster structure; `wugweb-seo` picks each brief's link targets. Brief field 10, the proof map row, the handoff contract and the matrix row updated. Question 23 added. |
| 2026-11-16 | Question 23 answered by the owner and recorded as decision 23: the proof map wins on which case study backs a page. |
