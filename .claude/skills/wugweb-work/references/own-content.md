# Track 2: Wugweb's own content

Blog posts, service pages, and site and landing copy. There are no client screens to read, so the cycle is lighter. Planning belongs to `wugweb-strategy`, which also owns the brief for these pieces; `wugweb-seo` fills the brief's search block. This skill makes the piece.

## Sources

Where each kind of piece is stored is in `ops-cycle.md`. Media is existing files in the media store only. A piece starts from a brief handed over by `wugweb-strategy`.

## FAQ block (agreed by `wugweb-strategy` and `wugweb-seo`, 2026-11-17; owner: "let strategy decide that with seo")

- A `faqs` block is allowed on service pages and blog posts only. Case studies never carry one.
- Questions come from the signal log, proposed by `wugweb-strategy` and approved by the owner. Brief field 8 lists the approved questions; field 11 names the source of each answer. A brief with none reads "no FAQ block", and then the piece has none.
- Answers come from the owner's source. This skill and `wugweb-seo` write none. A question with no answer in the source is cut.
- The count is the owner's, never padded.
- FAQPage markup follows `schema-jsonld.md`: only where every question and answer is visibly on the page.

## The eight steps

1. **Check the brief.** It must name the six fields `wugweb-strategy` sets for this check (`.claude/skills/wugweb-strategy/references/brief-format.md`): the reader, what they know now, what they should know and do after, the goal, the format, and which case studies back it. A missing field goes back to `wugweb-strategy`. Links and dates are used when the brief has them; their absence does not stop the draft. Nothing is drafted without a brief.
2. **Audit what exists.** Read the current piece and its live page. Give it one verdict: keep, update, merge or retire. List every claim, link and image, with what is backed and what is not (`evidence.md`).
3. **Media, light.** Measure the cover and inline images already in the store: status, size, pixel size, alt. Look at each one before writing its alt text or caption.
4. **Outline, then draft.** One declared structure, held throughout. Use the body standard for the type, below. Every claim points to a screen, a sourced number, a named fact or a linked case study; anything else is cut or marked unvalidated.
5. **Check the draft.** Fact lock, evidence ledger, source log for outside claims, metric fields, skim test, count of deliverables. Then the voice check through `wugweb-voice`, and the title, description and schema limits in `copy-and-seo.md` and `schema-jsonld.md` (`wugweb-seo` may check them).
6. **Propose.** Current → proposed, with the reason for each change and the questions for the owner.
7. **Owner approval** of that exact text. Only then is the source written, with a backup first, and synced on the owner's go.
8. **Ship gate** on the rendered page at 375, 768 and 1200, then other forms if wanted.

## Body standards (first draft; for the owner's review, not a final standard)

Mark any piece written from these "draft standard", and say in the reply that the standard is a draft awaiting the owner's review.

- **Blog post:** the opening states the claim and who it is for, with no warm-up. One teachable thing; more than one becomes a series. Sections with claim headings, the point first, then the evidence. Limits or trade-offs. A close that resolves the opening with one next step, soft where the page informs.
- **Service page:** what it does and for whom; the problem it removes; how it works (what goes in, what is done, what comes out); what it needs from the client; proof only from real case studies, linked; limits; one action.
- **Site and landing copy:** the first screen says what, for whom, and one action; the reader's situation only if supplied; how it works; real proof; objections answered in the body with one fit condition, never in an FAQ block; the same action repeated.

Rules for all three:

- Each section has one job or it goes. Lead each section with its point.
- No proof supplied means no proof section. State one limit or fit condition.
- Match the action to the reader's intent: a soft next step on a page that informs, one clear action on a page where the reader is ready to act.
- A claim about a client project must match that project's approved case study body. Link the case study.
- A number about Wugweb needs a source and a date, the same as a client result. Approved facts about Wugweb come from `wugweb-brand-os`.

## How the nine modes run for track 2

| Mode | Track 2 |
|---|---|
| Audit | Text, page and links only |
| Brief | Received from `wugweb-strategy`; checked, not written |
| Media | Cover and inline images measured |
| Look | Cover and inline images only |
| Body | Blog or page draft, current → proposed |
| Layout | Existing page templates; a new block is planned here from `layout-grammar.md`, and `wugweb-kits` may check it |
| SEO and schema | The rules in `copy-and-seo.md` and `schema-jsonld.md`; `wugweb-seo` may check the page |
| Ship | The same gate; a media or layout check that does not apply is marked not applicable, with the reason |
| Forms | Social versions mainly |

## Hard stops

The same list in every file of this skill: an unsourced factual claim; an invented number or quote; an undisclosed relationship; no date on time-bound content; a form made from an unapproved body; a track 2 piece with no brief; any write without the owner's approval.

## What goes back to planning

After approval: the finished piece, the proof it used, and any proof that was asked for and does not exist. `wugweb-strategy` uses this for its proof map.

## Images in own content (draft standard, 2026-11-19)

- The cover is specific to the piece: a real screen, a real diagram of what the piece explains, or a made graphic through the gate for new files (`forms/graphics.md`). Never a stock photo and never a generic device.
- Inline images earn their place: each shows the thing the nearby text is about. A screen, a before and after, a diagram of a structure the text states, or a chart of sourced numbers.
- A post that explains work for a client uses that client's screens only with permission on record, and follows the client-brand rules in `composition.md`.
- Every image is measured and looked at, has alt text of 10 to 125 characters saying what it shows, keeps its own ratio and is never shown above its natural size without a flag.
- Text is never set inside a picture when it could be real text. A diagram's labels are real text.
- The composition rules apply to a post or a page as to a case study: forms for points are chosen from the content, counts are not forced, and no two sections in a row take the same form.

## Refreshing an old piece (draft standard, 2026-11-19)

1. Audit it and give one verdict: keep, update, merge or retire. A refresh is the "update" verdict; do not rewrite a piece that should be merged or retired.
2. List every fact with a date or a number and recheck each against its source. A fact that can no longer be sourced is cut or marked "unvalidated".
3. Keep the address. A refresh never changes the slug and never adds a redirect.
4. Propose the changes as current to proposed, with the reason for each, and keep what is still true.
5. State on the page what changed when the change matters to a reader; the visible date and the modified date in the page's data change only for a real change to the content, never for a tidy-up.
6. Run the voice check, the on-page limits and the gate as for a new piece.
7. Nothing is written until the owner approves that exact text.

## Not yet written

No approved track 2 piece exists, so there is no worked example and no track 2 fixture. The first approved piece becomes the example.
