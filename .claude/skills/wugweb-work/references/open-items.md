# Open with the owner

Eight matters are not decided. The owner decides each one. Until then the skill works on the assumption in the last column, and any output that depends on an open item says so in one line: "Open: <item>".

| Item | What is open | Working assumption until decided |
|---|---|---|
| NTUC facts | Results with source and date; the live URL; the number of programme-builder steps; the heading typeface | None is stated. The NTUC examples carry no results and list these as owner questions |
| Social, remaining | Who uploads to Behance and Dribbble; where made files are kept before posting; whether a Dribbble shot may sit a screen on a plain canvas; whether the scheduling tool is connected, and to which accounts | Behance and Dribbble output is an ordered list, not an upload. A Dribbble shot shows the screen alone at its own ratio. A post is handed over as an approved draft when no connected tool is confirmed |
| Medium | Whether Medium is a form of its own, or the blog post reposted as is | The approved blog post, unchanged, with a link to the original. No Medium-only rewrite |
| Made-file sizes | The sizes for a Behance cover, a Dribbble shot and a story canvas | The proposed figures in `forms.md` are shown as proposed. No file is made at these sizes without the owner's yes for that file |
| LinkedIn tags | None, or a few specific tags (proposed by `wugweb-seo`) | None |
| Plan vetting | The owner has not yet vetted and approved the plan as a whole | Nothing goes to development until he does |
| Replies and outreach | Whether replies, comment routines and outreach pitches are part of the Forms module | Out. They are conversation, not production from an approved body, so the fact ledger and approval steps do not fit them as written |

## Also open, shared with `wugweb-kits`

- Card thumbnails: the work card uses a 16:10 frame and the thumbnail videos are 4:3. Under the media rule a file is shown whole, so either the file sits inside the frame with space around it, or the card changes shape. Until decided: show the file whole at its own ratio.
- Loop pause and hidden loops: loops are `aria-hidden` by rule, but a pause control must be reachable. Either a loop over 5 seconds is not hidden and carries the control, or loops stay at 5 seconds or less. `wugweb-kits` decides which; until then the gate lists any loop over 5 seconds as "open".
- The `faqs` field clash between the CMS and the page, and the existing blocks awaiting sign-off: both are described in `layout-grammar.md` and are decided with `wugweb-kits`.
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

## When an item is decided

Change the rule in its one home, move the row to the settled table, and add a changelog line. Do not leave the old assumption in any file.
