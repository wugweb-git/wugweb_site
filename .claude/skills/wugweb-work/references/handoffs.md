# Handoffs to sibling skills

This skill makes the piece and is the hub for wording. It asks each sibling a defined question and applies the answer. A sibling never writes the piece, and never writes to the source, the CMS or the media store on this skill's behalf. Every link below must read the same on the sibling's side.

Each handoff asks for a check or an input. This skill holds the rule and does the step; the sibling may check the result. Every question below can be answered from this skill's own file, named in the last column. When a sibling cannot be reached, do the step from that file, mark every search figure "unvalidated", and say which check was skipped.

## Links

| Sibling | This skill gives | This skill takes | This skill's own file for the step |
|---|---|---|---|
| `wugweb-strategy` | The finished piece; what proof exists | A brief for own content: what to say, to whom, when, which case studies back it, and which pages it links to (strategy picks the targets; `wugweb-seo` owns the link rules and fills the brief's search block) | None. With no brief, ask for one |
| `wugweb-voice` | The draft, with its form, mode, audience and purpose | A voice check: breaks and fixes | `copy-and-seo.md` (voice part) |
| `wugweb-brand-os` | Cover picks and visuals to check | A check against the brand and art-direction rules; approved facts about Wugweb | `layout-grammar.md` (cover rule, yellow share), `copy-and-seo.md` (claim order); the brand guidelines in the site repository |
| `wugweb-kits` | The block plan and the built page; visible wording it asks for (labels, alt text) | A token and accessibility check of the result, by rule id | `layout-grammar.md`, `design-principles.md`, `qa-checklist.md` |
| `wugweb-seo` | The approved body and page URL; visible wording it asks for (title options) | Keyword notes; a check of the title, description and schema against the limits; a fix list for one page | `schema-jsonld.md`, `copy-and-seo.md` (on-page part) |

- `wugweb-voice` has no direct link with strategy, seo or kits. The voice check happens here only.
- A finding on one page comes here as a fix list. A finding that repeats on every page using a block goes from `wugweb-seo` to `wugweb-kits`; neither edits code.
- Client case studies have no strategy brief. They start from the client's project and the brief is written here. Brief mode is for client work only (owner, 2026-11-16).
- Interface copy (errors, empty states, confirmations, button labels) is written here and voice-checked. `wugweb-kits` names which component states need wording.
- Made files: this skill picks which platform size a file uses; the sizes and the safe-zone rule are held in `forms.md`. `wugweb-kits` may check a made file against its tokens.
- Layout values are held in `layout-grammar.md` section 8, restated from `kits_design_system/docs/tokens/layout-shell.md`; that document wins if it changes.

Brand rulings held from `wugweb-brand-os` (owner, 2026-11-17; the brand skill owns them, this skill applies them to cover picks, social visuals and made files): the client is the hero and Wugweb is the guide; "does a lot, into one" is an idea, not public wording; the canvas for any made file is black by default and light only where the owner says; Wugweb has no campaign system, so no campaign look is invented (brand skill, 2026-11-17).

## When to send what

| Mode | Question | To |
|---|---|---|
| Brief | Which one search phrase and intent should this page target? | `wugweb-seo` (plan part) |
| Body, Forms | Does the text match the voice for this form and audience? | `wugweb-voice` |
| Look, Forms | Does this cover or visual fit the art direction? | `wugweb-brand-os` |
| Layout, after the block plan is resolved here | Does this block plan hold against the design system: tokens, shell values, component states? | `wugweb-kits` |
| SEO and schema, Ship | Does the rendered page pass on-page, technical and citability checks? | `wugweb-seo` (audit part) |
| Ship | Does every value in the page's components resolve to a token? Does the page pass the accessibility checks? | `wugweb-kits` |
| After deploy | How did the pages perform, with dates and sources? | `wugweb-seo` (report part) |
| After approval | Here is the finished piece and the proof it used | `wugweb-strategy` |

## Handoff 1: search input for the brief

Send:

```
Page: <path> | Kind: <case study archetype, blog post, service page> | Client or topic: <name>
What it is about (one sentence):
Audience:
Candidate phrases from the body (owner's words only):
Question: which one phrase and intent should this page target?
```

Expect back:

- Search intent and audience.
- One primary phrase and up to three supporting phrases, each with its source or "unvalidated".
- The result format that ranks now, and up to three competing pages.
- Entities and evidence the page must name.
- Title, description and heading limits, as limits, not wording.
- Schema requirements.
- Internal links: up to the service pillar, across to two or three sibling pieces.

Then: use these as constraints in the brief. Keep claim headings. Add no FAQ block, no keyword counts and no extra sections written for search.

## Handoff 2: audit of the rendered page

Send: the rendered URL (a local preview with the canonical Host header, or the live page), the approved body and the planned JSON-LD.

Expect back: pass or fail on title, description, H1, canonical, indexability, content in server HTML, image markup and schema validity; a citability score with the three weakest blocks named, not rewritten; a fix list split into content and code.

Then: content fixes return to the proposal as current → proposed. Code fixes go to the build task list. A finding that conflicts with the owner's rules is recorded and declined.

## Handoff 3: performance report

Send: the list of URLs and the launch date of the new page.

Expect back: impressions, clicks, click-through rate and position per page, before and after, with the date range and source; presence in AI answers from a fixed monthly prompt sample.

Then: pass the report on to `wugweb-strategy`, which chooses what to improve next. Never place these numbers on a case study as a client result.

## Handoff 4: token and accessibility check

Send: the path of the page's components and styles, and the rendered URL.

Expect back: findings by rule id: counts of raw colour and size values, layer skips, orphan tokens and duplicate components, each with file and line; accessibility results with measured values.

Then: report the findings in the Ship table. They are reported only at first; blocking begins once the case study components are clean, on a short list the owner sets (owner, 2026-11-16 and 2026-11-17). The publish gate is this skill's (`qa-checklist.md`), and the tokens-only rule is held in `layout-grammar.md`; the token scan and its continuous integration check are run by `wugweb-kits`, and its findings enter the Ship table. Literal breakpoint values in media queries are allowed. Check that the scan includes the site's component file type before trusting a clean result. No token is deleted and nothing is refactored without the owner's yes.

## Handoff 5: voice check

Send:

```
Form: <case study, blog post, service page, LinkedIn post, carousel, deck>
Mode: <as the voice skill names it>
Audience and purpose (from the brief):
Draft:
```

Expect back: a summary row of 40 to 60 words, then a list of voice breaks, each with the line, the reason and a fix, and a confidence level. Read the summary row first.

The voice is uncalibrated until the owner supplies writing samples (owner, 2026-11-17): treat every voice finding as low confidence and say so wherever it is reported. "We" or "I" is the owner's pick for each piece, not a fixed rule; the brief or this skill's proposal asks him. Translated copy is out of scope until English is calibrated.

Then: apply fixes that keep the meaning. A fix that changes a fact, a client's on-screen term or a quote is declined. Length, evidence and format rules stay with this skill.

## Handoff 6: layout check

This skill resolves the layout itself, from `layout-grammar.md`: which block each content shape gets, and the layout per tier (375, 768, 1200). The handoff asks for a check of that result.

Send: the block plan per tier, the content shape behind it (chapters, number of points, number and shape of media per chapter, quotes, tables, results), the chosen proof screens, the archetype and the client accent.

Expect back: findings against the design system: a block that breaks a token or a shell value, a component state that needs wording, and any content that does not fit a block.

Then: this skill decides and corrects the plan. Content that does not fit returns to the proposal as an owner question. No block type outside the catalogue is added without the owner's yes.

## Handoff 7: brief in, piece out

The brief from `wugweb-strategy` carries the `wugweb-seo` keyword note pasted unchanged (field 9, owner decision 2026-11-17). For own content this skill does not ask `wugweb-seo` for a separate per-brief note. Field 8 lists the approved FAQ questions and field 11 names each answer's source; "no FAQ block" means none (see `own-content.md`). Handoff 1 still applies to a client work brief, which is written here.

Take from `wugweb-strategy`: its brief (`.claude/skills/wugweb-strategy/references/brief-format.md`).

Check it: the six check fields are present (the reader, what they know now, what they should know and do after, the goal, the format, the case studies that back it), and the proof exists in an approved body. A published v1 body counts for the facts it already publishes; any other claim needs an approved v2 body or the owner's answer (owner, 2026-11-17). Return it with questions when one is missing. Do not rewrite the plan.

Give back after approval: the finished piece, the proof used, and proof that was asked for and does not exist.

## Declined findings

Decline and record any answer that asks for:

- HowTo or Review star schema, `llms.txt`, keyword density, or FAQPage where the questions and answers are not visible on the page.
- A number without a source, or a benchmark shown as the client's result.
- Cropping a file, re-encoding, uploading, a local copy or making media. Resizing with the ratio kept and clipping masks are allowed.
- Title Case, dashes, American spelling or banned words.
- A rewrite of approved copy.
- A redirect as the fix for a broken link, a 0 to 100 score that is not computed from something real, or a hook built on a made-up statistic.
- A billed service, or sending private data to a third party.
