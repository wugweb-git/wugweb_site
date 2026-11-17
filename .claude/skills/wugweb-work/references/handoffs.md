# Handoffs to sibling skills

This skill makes the piece and is the hub for wording. It asks each sibling a defined question and applies the answer. A sibling never writes the piece, and never writes to the source, the CMS or the media store on this skill's behalf. Every link below must read the same on the sibling's side.

If a sibling is not installed, answer the same question from the held file named in the last column, mark every search figure "unvalidated", and say which handoff was skipped.

## Links

| Sibling | This skill gives | This skill takes | Held file until the sibling is installed |
|---|---|---|---|
| `wugweb-strategy` | The finished piece; what proof exists | A brief for own content: what to say, to whom, when, which case studies back it, and which pages it links to (strategy picks the targets; `wugweb-seo` owns the link rules and fills the brief's search block) | None. With no brief, ask for one |
| `wugweb-voice` | The draft, with its form, mode, audience and purpose | A voice check: breaks and fixes | `copy-and-seo.md` (voice part) |
| `wugweb-brand-os` | Cover picks and visuals to check | Brand and art-direction rules; approved facts about Wugweb | The brand guidelines in the site repository |
| `wugweb-kits` | Content shape and chosen media; visible wording it asks for (labels, alt text) | Blocks, layout, tokens; gate and token results | `layout-grammar.md`, `design-principles.md` |
| `wugweb-seo` | The approved body and page URL; visible wording it asks for (title options) | Keyword notes; title and schema rules to apply; a fix list for one page | `schema-jsonld.md`, `copy-and-seo.md` (on-page part) |

- `wugweb-voice` has no direct link with strategy, seo or kits. The voice check happens here only.
- A finding on one page comes here as a fix list. A finding that repeats on every page using a block goes from `wugweb-seo` to `wugweb-kits`; neither edits code.
- Client case studies have no strategy brief. They start from the client's project and the brief is written here. Brief mode is for client work only (owner, 2026-11-16).
- Interface copy (errors, empty states, confirmations, button labels) is written here and voice-checked. `wugweb-kits` names which component states need wording.
- Made files: this skill picks which platform size a file uses; `wugweb-kits` supplies the size list and the safe zone.
- Layout values are read from `wugweb-kits` and `kits_design_system/docs/tokens/layout-shell.md`. This skill restates none of them.

Brand rulings held from `wugweb-brand-os` (owner, 2026-11-17; the brand skill owns them, this skill applies them to cover picks, social visuals and made files): the client is the hero and Wugweb is the guide; a claim about Wugweb is marked "unverified" until the brand skill approves it; "does a lot, into one" is an idea, not public wording; a dashboard appears in a visual only when the subject is software; the canvas for any made file is black by default and light only where the owner says; campaign systems are not decided, so no campaign look is invented.

## When to send what

| Mode | Question | To |
|---|---|---|
| Brief | Which one search phrase and intent should this page target? | `wugweb-seo` (plan part) |
| Body, Forms | Does the text match the voice for this form and audience? | `wugweb-voice` |
| Look, Forms | Does this cover or visual fit the art direction? | `wugweb-brand-os` |
| Layout | Given this content shape and media, what is the layout? | `wugweb-kits` |
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

Then: report the findings in the Ship table. They are reported only at first; blocking begins once the case study components are clean, on a short list the owner sets (owner, 2026-11-16 and 2026-11-17). The gate and the continuous integration check belong to `wugweb-kits`. Literal breakpoint values in media queries are allowed. Check that the scan includes the site's component file type before trusting a clean result. No token is deleted and nothing is refactored without the owner's yes.

## Handoff 5: voice check

Send:

```
Form: <case study, blog post, service page, LinkedIn post, carousel, deck>
Mode: <as the voice skill names it>
Audience and purpose (from the brief):
Draft:
```

Expect back: a list of voice breaks, each with the line, the reason and a fix, and a confidence level.

Then: apply fixes that keep the meaning. A fix that changes a fact, a client's on-screen term or a quote is declined. Length, evidence and format rules stay with this skill.

## Handoff 6: layout request

Send: the content shape (chapters, number of points, number and shape of media per chapter, quotes, tables, results), the chosen proof screens, the archetype and the client accent. Which block a content shape gets is decided here and sent as part of the request.

Expect back: the layout per tier (375, 768, 1200), the blocks used, and any content that does not fit a block.

Then: content that does not fit returns to the proposal as an owner question. No block type outside the catalogue is added without the owner's yes.

## Handoff 7: brief in, piece out

The brief from `wugweb-strategy` carries the `wugweb-seo` keyword note pasted unchanged (field 9, owner decision 2026-11-17). For own content this skill does not ask `wugweb-seo` for a separate per-brief note. Handoff 1 still applies to a client work brief, which is written here.

Take from `wugweb-strategy`: a one-page brief with the reader, what they know now, what they should know and do after, the goal, the format, the date, the case studies that back it, and the pages it links to.

Check it: every field is present, and the proof exists in an approved body. Return it with questions when one is missing. Do not rewrite the plan.

Give back after approval: the finished piece, the proof used, and proof that was asked for and does not exist.

## Declined findings

Decline and record any answer that asks for:

- FAQPage, HowTo or Review star schema, `llms.txt`, or keyword density.
- A number without a source, or a benchmark shown as the client's result.
- Cropping a file, re-encoding, uploading, a local copy or making media. Resizing with the ratio kept and clipping masks are allowed.
- Title Case, dashes, American spelling or banned words.
- A rewrite of approved copy.
- A redirect as the fix for a broken link, a 0 to 100 score that is not computed from something real, or a hook built on a made-up statistic.
- A billed service, or sending private data to a third party.
