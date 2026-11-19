# Open with the owner

One matter is open with the owner: the newsletter's sending tool, list and cadence (`forms/newsletter.md`; not decided, owner 2026-11-19). Any output that depends on an open item says so in one line: "Open: <item>".

## Also open, shared with `wugweb-kits`

- Old media ratios from the previous site are not mapped to sections. The manifest's shape field is the input for that mapping. This stays open in the layout shell document owned by `wugweb-kits`.

## Settled on 2026-11-16 (kept here so the old assumptions are not reused)

| Matter | The owner's decision | Where the rule lives |
|---|---|---|
| Media rule readings | Confirmed: resizing and masks are done in CSS only, never as new files; a mask must not hide the part of a screen that proves the claim; a file shown above its natural size is flagged, not banned | `media-standard.md` |
| Token findings | Reported only at first; blocking comes later, on a short list | `handoffs.md`, handoff 4 |
| Brief | Brief mode is for client work only, and is written in this skill. `wugweb-strategy` owns the brief for Wugweb's own content; `wugweb-seo` fills its search block | `SKILL.md`, `own-content.md` |
| Hero subtitle | 90 characters | `copy-and-seo.md` |
| Share image | 1200 x 630 | `forms.md` |
| Accounts in scope | The Wugweb company accounts (site blog, LinkedIn page, Behance, Dribbble), the owner's LinkedIn and the owner's Medium. The 5 personal Behance projects are out | `forms.md` |
| Timing and naming | A post waits until the page it links to is live. No client is named or tagged without permission on record | `forms/publish-approval.md` |
| Newsletter | In scope. Sending needs the owner's yes | `forms/newsletter.md` |
| Loop pause | Superseded on 2026-11-17: see the table below | `media-standard.md` |

## Settled on 2026-11-17

| Matter | The owner's decision | Where the rule lives |
|---|---|---|
| CMS fields on case studies | `faqs` is kept, but feeds FAQPage only where every question and answer is visibly on the rendered page. `seoCanonicalUrl`, `schemaType`, `aiSummary` and `keyTakeaways` are dropped for case studies: canonicals come from the owner's source document with one slug, the schema type is fixed (CreativeWork for case studies, BlogPosting for posts), and the owner's Body Content is the single source. Posts and pages keep the canonical field | `kits_design_system/docs/tokens/layout-shell.md` (the design system document); the graph and its rules are held in `schema-jsonld.md` |

## Also settled on 2026-11-17 (owner, answered in the wugweb-work session and relayed from the sibling skills)

| Matter | The owner's decision | Where the rule lives |
|---|---|---|
| Plan vetting | The plan is approved as it stands and Part 1 stays locked. Starting Part 2 (site code) still needs the owner's own go | the plan; `SKILL.md` |
| Replies and outreach | Out of the Forms module. A reply or pitch asked for is drafted as a one-off, with no fact ledger | `forms.md` |
| Made files and scheduling | Made files are kept in the media store named in `ops-cycle.md`, under the piece's own folder, each only on the owner's yes for that file; the owner puts the file there, and this skill never uploads. No scheduling tool is connected: every post is handed to the owner as an approved draft to post | `forms.md`, `forms/publish-approval.md` |
| Proposal on request | A direct request for a v2 proposal still runs Audit, Media and Look first, in the same task | `SKILL.md` step 5 |
| Published v1 body as proof | Counts for the facts it already publishes; any other claim needs an approved v2 body or the owner's answer | `handoffs.md`, handoff 7 |
| Hero subtitle timing | Proposed only after the body is read, never from the name or partner alone | `copy-and-seo.md` |
| LinkedIn tags | None | `forms.md`, `forms/linkedin-post.md` |
| NTUC | Not an open input: NTUC U Care is a worked example only. Its missing facts (results, live URL, builder steps, heading typeface) are shown in the examples as the owner questions a real piece would raise | `examples/` |
| Medium | Not a form of its own: the approved blog post, unchanged, with a link to the original | `forms.md` |
| Behance and Dribbble uploads | The owner uploads. The skill hands over an ordered list, never an upload | `forms/behance.md`, `forms/dribbble.md` |
| Dribbble canvas | A screen is shown alone at its own ratio, never on a plain canvas | `forms/dribbble.md` |
| Made-file sizes | Confirmed: Behance cover at least 808 x 632, Dribbble shot at least 1600 wide, story 1080 x 1920 (no official pixel safe zone: keep the edges clear, wider margins). Each file is still made only on the owner's yes for that file | `forms.md` |
| Loops | A loop is 15 seconds or less. A loop over 5 seconds has a pause control and is not hidden from assistive technology; a loop of 5 seconds or less with no control stays hidden; all loops stop under reduced motion | `media-standard.md` (the rule is held here; the control is part of the page build) |
| Card thumbnails | Every card is 16/10. The original ratio is kept and the frame is a mask: no crop of the source, no re-encode | `forms.md` (held here; `wugweb-kits` may check the built card) |
| Layout sizes | Rail items 85vw and never past the 1200 content maximum; peek 20%; signature width 2400 px; line length 35 to 60 characters | `layout-grammar.md` (held here; `wugweb-kits` may check the result) |
| Existing blocks | The five existing blocks are signed off | `layout-grammar.md` |
| Share and made-file sizes | Adopted as written: og 1200 x 630; LinkedIn link image at least 1200 x 627, 1.91:1, 5 MB; Behance cover at least 808 x 632; Dribbble 1600 wide, 10 MB image, 20 MB video; story 1080 x 1920 | `forms.md` |
| Brief field 9 | The brief from `wugweb-strategy` carries the `wugweb-seo` keyword note pasted unchanged; no separate per-brief request to `wugweb-seo` for own content | `handoffs.md`, handoff 7 |
| Token check in CI | Report only first; blocking once the case study components are clean. The token scan is run by `wugweb-kits`; the publish gate is this skill's | `handoffs.md`, handoff 4 |

## When an item is decided

Change the rule in its one home, move the row to the settled table, and add a changelog line. Do not leave the old assumption in any file.
