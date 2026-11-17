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
