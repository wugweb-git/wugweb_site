# Copy and SEO

> **Held here in full.** Every rule a mode needs is in this file, with its value: the twelve rules, the lengths, the claim order, the brief template and the on-page SEO rules. This skill writes the words and applies the limits itself. `wugweb-voice` checks the draft (agreed 2026-11-17; its side is in `.claude/skills/wugweb-voice/references/modes.md`, `.claude/skills/wugweb-voice/references/words.md` and `.claude/skills/wugweb-voice/SKILL.md`): rules marked *candidate* are working rules here that it may confirm or change with the owner's yes or writing samples. `wugweb-seo` checks the page against the same on-page limits (agreed 2026-11-17). Where a sibling's rule differs from a line here, raise it with the owner. Unmarked rules are this skill's own (structure, format, consistency, claims), as are the evidence rule, case-study lengths, metrics, approvals and the brief template.

The voice for every case study and every other form, the brief template, and the on-page SEO rules. Sources: the brand copy guidelines (direct, intelligent, specific; outcomes over hype), the messaging framework (one claim, one tension, one proof, one outcome; Problem, Insight, System, Outcome), the owner's rules and the research digest.

## Tone in one line (candidate)

A senior practitioner explaining what was built and why, to a peer. Calm, exact, no selling.

## Twelve rules

All twelve are written out here so the list is whole. Four of them (evidence or nothing, British English, no dashes, sentence case) are also the owner's standing rules in `standing-rules.md`. *Candidate* marks a working rule that `wugweb-voice` may confirm.

| Rule | How |
|---|---|
| Say what was built (candidate) | Name the thing: "a member portal and a back office", not "a holistic digital ecosystem". |
| Evidence or nothing | Every claim points to a screen, a number with its source and date, or a named fact. No evidence: cut the claim or mark it "unvalidated". Numbers are never invented. |
| Headings are claims | "Members apply in one guided flow", not "Solutions". 70 characters or fewer. Question form where natural. Generic labels only in the chapter nav (not one of the 23 catalogue blocks; its spec is written in `.claude/skills/wugweb-kits/references/media-and-widgets.md` and it is not built). |
| Answer first | The first sentence under a heading answers it. The first third of the page carries the main facts. |
| Short, whole sentences | Fact sentences of 6 to 20 words (candidate) that make sense on their own. One idea per sentence. |
| Plain words (candidate) | Use, build, show, help. See the banned list below. |
| Active, with a named doer (candidate) | "Staff set the workflow per programme", not "workflows were streamlined". "We" or "I" is the owner's pick for each piece (owner, 2026-11-17): ask him in the brief or the proposal. |
| The client's own words | Use the terms on the client's screens, as the client wrote them (NTUC writes "Programmes"). One spelling per name (iCube, not Icube). |
| British English | programme, centralised, colour, organisation. |
| No dashes | No em or en dashes in anything a visitor reads. Ranges are written out ("3 to 5"). |
| Sentence case | Headings, labels and buttons. No Title Case, no ALL CAPS. |
| Credit honestly | Name partners and the team. Say what Wugweb did and did not do (the claim is this skill's; the phrasing is a candidate in `wugweb-voice`). |

## Structure rules

- One chapter per thing that was delivered. Drop a chapter that has no real material.
- No throat-clearing openers such as "In this case study" (candidate). The main claim sits in the first third of the text.
- Paragraphs of 2 to 4 sentences. Each chapter stands alone: no "as mentioned above".
- State each fact once, with its context: number, unit, period and source.
- A number is identical everywhere it appears: hero stats, Results chapter, cards, decks and posts.
- Link labels start with a verb and name the outcome: "View the live portal", not "Learn more".
- Not-templated test: the hero line, the chapter headings and one signature layout must not work unchanged for another client.

## Approvals and permissions

- Client approval is needed for logos, screens, metrics and quotes before they publish. Record who approved and when in the proposal.
- A quote is verified word for word with the person named.
- Work under a non-disclosure agreement is anonymised the same way everywhere, or left out. A client marked NDA in the client record is never named in this skill's files, evals or examples.
- Facts about Wugweb itself (spelling, contact, address, founding date) come only from `wugweb-brand-os` (`.claude/skills/wugweb-brand-os/references/brand-facts.md`). Never state a figure it does not hold, such as team size, projects delivered or markets served.
- Screens from social services, health or finance work are checked for personal data before use (see `media-standard.md`).

## Banned words (candidate)

pivotal, robust, seamless, seamlessly, meticulous, holistic, cutting-edge, leverage, leveraging, empower, empowering, empowers, unlock, world-class, revolutionary, game-changing, innovative, state-of-the-art, synergy, best-in-class, next-generation, transformative, sophisticated, delve, elevate.

This is the one list. `scripts/case-audit.mjs` carries the same 25 words and `scripts/validate.mjs` reads them from it and fails when this line differs; change both together. A banned word may stay only inside a client's own product name or a direct quote.

## Lengths

| Item | Length |
|---|---|
| Subtitle | 90 characters or fewer (settled by the owner, 2026-11-16); proposed only after the body is read, never from the name or partner alone (owner, 2026-11-17) |
| Summary | 40 to 60 words |
| Chapter | 30 to 150 words. Its first sentence answers the heading; where an older example opens with context and answers later, the rule stands and the example is wrong |
| Point title | 2 to 6 words |
| Point text | One sentence |
| Caption | 25 words or fewer, saying why the screen matters |
| Alt text | 10 to 125 characters, saying what the screen shows and lets the user do |
| SEO title | 60 characters or fewer as rendered, the one limit for every page type (owner, 2026-11-19) |
| Meta description | 140 to 160 characters |
| Quote | 3 lines or fewer, with name, role and organisation; the person's photo only when the owner supplies it |

## Before and after (NTUC)

| Before | After | Why |
|---|---|---|
| Empowering low-income families through a holistic digital ecosystem. | One portal for members to apply for aid, one back office for NTUC to run every programme. | Says what was built |
| A robust administrative backend was developed to centralize and automate critical operations via sophisticated dashboards. | Staff start from a programme template, then set fields, workflow and eligibility rules. | Named doer, plain words, visible in the screens |
| The transformation delivered measurable improvements. | (cut until a number with a source exists) | No evidence |
| Design Philosophy: Accessibility as a core principle. | Errors give a next step: a blocked application shows a phone number and hours. | A decision plus the screen that shows it |

## Tone by form (candidate, except the no hashtag lists and captions only rules, which are this skill's)

- Case study page: full sentences, evidence in every chapter.
- Card and tile: client, one line of what was built, no adjectives.
- Deck: one claim per slide; the screen does the talking.
- LinkedIn: "we" or "I" per `wugweb-voice`, one lesson from the project, no hashtag lists, same facts as the page.
- Behance and Dribbble: captions only, flow by flow.

## Metrics

A metric is value + what + period + baseline or benchmark + source + as-of date. Anything less is shown as a fact only when the owner says so, and otherwise is "unvalidated". Helper skills may advise on framing a baseline; they never supply a number.

## Brief template (one page)

```
Client and project:
Case read (one line): sector, buyer, disciplines delivered, dominant evidence (media, product, brand, proof or systems), sensitivity (public or social sector, luxury, regulated, none):
Motion level from the case read (low for trust-first sectors, richer for brand-led work):
What was built (one sentence, plain words):
Audience(s) of the product:
Claim (one sentence the page proves):
Tension (what stood in the way):
Proof (screens, numbers with source and date, named facts):
Outcome (what exists now; numbers only with source):
Search phrase (one, natural; what someone would type to find this):
Archetype:
Media needed (the screens, loops and files the page needs; what is missing):
What makes this piece different (one line):
Owner questions (exact, numbered; "unvalidated" is a complete answer):
```

The claim order: Problem, Insight, System, Outcome. One claim, one tension, one proof, one outcome. The page answers first, then follows that order. `wugweb-brand-os` may check it (`.claude/skills/wugweb-brand-os/references/messaging.md`).

## On-page SEO

The values below are held here and applied by this skill. They were agreed with `wugweb-seo` (2.5.0, 2026-11-17), which checks the page against the same limits; its file is named beside each rule. Keyword research, technical SEO and reports are its work; ask through `handoffs.md`.

- H1 wording: what was built, with the brand shown in the label above it. The source keeps the two apart: Title holds no brand, Short Title is the brand. The SEO title names the client and what was built (this skill's; `wugweb-seo` checks there is one H1 and that it agrees with the title).
- SEO title: 60 characters or fewer as rendered, the one limit for every page type (owner, 2026-11-19). It is stored without a site suffix; the layout adds " | Wugweb" only when the total still fits in 60. Checked by `wugweb-seo` as `title-rendered` (`.claude/skills/wugweb-seo/references/audit.md`).
- Meta description: 140 to 160 characters. The wording states what was built and for whom. Checked by `wugweb-seo` as `description-length` (`.claude/skills/wugweb-seo/references/audit.md`).
- One slug per page and no redirects for an old address (owner, 2026-10-13); `wugweb-seo` holds the same rule (`.claude/skills/wugweb-seo/references/handoffs.md`).
- Entities named in full at first mention: `.claude/skills/wugweb-seo/references/audit.md` (citability). Which ones: client, partner, platform and country, once in the body and in the schema (this skill's list).
- Internal links: one link up to the service page, two or three across to sibling case studies, descriptive anchors, no orphans; `wugweb-seo` checks them (`.claude/skills/wugweb-seo/references/audit.md`). No link up to a sector page (owner, 2026-11-17).
- Key facts are in the server HTML and images are in `img src`; `wugweb-seo` checks both (`.claude/skills/wugweb-seo/references/audit.md`).
- No keyword counts and no `llms.txt` (`wugweb-seo` holds the same line: `.claude/skills/wugweb-seo/references/handoffs.md`).
- FAQ blocks: the line agreed by `wugweb-strategy` and `wugweb-seo` (`.claude/skills/wugweb-seo/references/handoffs.md`, "1a. FAQ blocks"), applied in `own-content.md`.
- Share image: `og:image` present and `og:url` equal to the canonical (`.claude/skills/wugweb-seo/references/audit.md`, `share-tags`, `share-url`); pick a project-specific existing file first, a new file only through the Forms gate. The 1200 x 630 size is the adopted made-file size, held in `forms.md`.

### What stays here and what goes to `wugweb-seo`

This skill does the search work for the piece it is making and holds the values it needs. It does not carry the search skill's method.

| Request | Where it is done |
|---|---|
| Title, description, slug, headings, alt text and internal links for one piece | Here, to the values above |
| The JSON-LD graph for one piece | Here (`schema-jsonld.md`) |
| One search phrase and intent for a case-study brief | Asked of `wugweb-seo` (handoff 1); marked "unvalidated" when it cannot answer |
| The keyword note for a blog post or service page | Read from the brief `wugweb-strategy` supplies; not asked for again |
| Keyword research, a keyword map, topic gaps | `wugweb-seo` |
| A general SEO brief for a blog post or service page | `wugweb-seo` plans it and `wugweb-strategy` briefs it; this skill then writes the piece |
| Site-wide and technical search work: crawling, indexing, sitemaps, crawler access | `wugweb-seo` |
| Search and AI answer reports | `wugweb-seo` |
| A check of the built page | `wugweb-seo` may check it; its findings return as a fix list and enter the proposal |

## How it is checked

The audit lists every banned word, dash, unbacked claim, generic heading and over-length item. The body proposal shows current → proposed for each. Helper skills for this: see the Body row of `skill-map.md`.
