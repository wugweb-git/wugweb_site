# Open with the owner

Two matters are not decided. The owner decides each one. Until then the skill works on the assumption in the last column, and any output that depends on an open item says so in one line: "Open: <item>".

| Item | What is open | Working assumption until decided |
|---|---|---|
| NTUC facts | Results with source and date; the live URL; the number of programme-builder steps; the heading typeface | None is stated. The NTUC examples carry no results and list these as owner questions |
| Social, remaining | Where made files are kept before posting; whether a scheduling tool is connected for the LinkedIn page and the owner's LinkedIn, and to which accounts | Made files stay in the media store the owner names. A LinkedIn post is handed over as an approved draft when no connected tool is confirmed |

## Also open, shared with `wugweb-kits`

- Card thumbnails: the work card uses a 16:10 frame and the thumbnail videos are 4:3. Under the media rule a file is shown whole, so either the file sits inside the frame with space around it, or the card changes shape. Until decided: show the file whole at its own ratio.
- Loop pause and hidden loops: loops are `aria-hidden` by rule, but a pause control must be reachable. Either a loop over 5 seconds is not hidden and carries the control, or loops stay at 5 seconds or less. `wugweb-kits` decides which; until then the gate lists any loop over 5 seconds as "open".
- The four held numbers: the 85vw rail item width, the 20% peek, the 2400 px signature width and the 35 to 60 character line. They are proposals from this skill; `wugweb-kits` decides and the owner approves. Output that uses them is marked "open".
- The existing blocks of the site awaiting the owner's sign-off; the bento layout on the case study page is the one this work replaces.
- Old media ratios from the previous site are not mapped to sections. The manifest's shape field is the input for that mapping.

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
| Loop pause | A loop longer than 5 seconds gets a pause control (a `wugweb-kits` rule) | `media-standard.md`; `wugweb-kits` owns the layout side |

## Settled on 2026-11-17

| Matter | The owner's decision | Where the rule lives |
|---|---|---|
| CMS fields on case studies | `faqs` is kept, but feeds FAQPage only where every question and answer is visibly on the rendered page. `seoCanonicalUrl`, `schemaType`, `aiSummary` and `keyTakeaways` are dropped for case studies: canonicals come from the owner's source document with one slug, the schema type is fixed (CreativeWork for case studies, BlogPosting for posts), and the owner's Body Content is the single source. Posts and pages keep the canonical field | `kits_design_system/docs/tokens/layout-shell.md` (owned by `wugweb-kits`, which follows `wugweb-seo`); `schema-jsonld.md` is held for `wugweb-seo` |

## Settled on 2026-11-17 (owner, answered in the wugweb-work session)

| Matter | The owner's decision | Where the rule lives |
|---|---|---|
| Plan vetting | The plan is approved as it stands and Part 1 stays locked. Starting Part 2 (site code) still needs the owner's own go | the plan; `SKILL.md` |
| Replies and outreach | Out of the Forms module. A reply or pitch asked for is drafted as a one-off, with no fact ledger | `forms.md` |
| LinkedIn tags | None | `forms.md`, `forms/linkedin-post.md` |
| Medium | Not a form of its own: the approved blog post, unchanged, with a link to the original | `forms.md` |
| Behance and Dribbble uploads | The owner uploads. The skill hands over an ordered list, never an upload | `forms/behance.md`, `forms/dribbble.md` |
| Dribbble canvas | A screen is shown alone at its own ratio, never on a plain canvas | `forms/dribbble.md` |
| Made-file sizes | Confirmed: Behance cover at least 808 x 632, Dribbble shot at least 1600 wide, story 1080 x 1920 (safe zone unverified: use the wider margins). Each file is still made only on the owner's yes for that file | `forms.md` |

## When an item is decided

Change the rule in its one home, move the row to the settled table, and add a changelog line. Do not leave the old assumption in any file.
