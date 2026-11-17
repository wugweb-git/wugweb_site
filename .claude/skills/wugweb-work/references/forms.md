# Forms: other versions of an approved piece

The Forms module turns an approved body into its other versions. There is no separate social skill. Planning (the calendar, repurposing order, campaigns, reporting) belongs to `wugweb-strategy`; voice per form belongs to `wugweb-voice`; art direction belongs to `wugweb-brand-os`.

Every form is made from the approved body, takes only the pieces it can hold, and repeats the same facts. No form adds a claim or a number the body does not have. With no approved body, stop.

## Order of work

1. Build the fact pack (`forms/fact-pack.md`).
2. Draft the form from the fact pack, using its file below.
3. Walk the approval steps (`forms/publish-approval.md`). Nothing is posted before step 7.

## Files

| File | Form |
|---|---|
| `forms/fact-pack.md` | The list of facts and approved screens every form draws on |
| `forms/linkedin-post.md` | LinkedIn post |
| `forms/linkedin-carousel.md` | LinkedIn carousel |
| `forms/behance.md` | Behance project |
| `forms/dribbble.md` | Dribbble shot |
| `forms/deck.md` | Deck |
| `forms/pdf.md` | PDF |
| `forms/charts.md` | Charts made from sourced numbers |
| `forms/og-image.md` | The share image of a page |
| `forms/newsletter.md` | Newsletter edition |
| `forms/advocacy.md` | Advocacy copy for the team |
| `forms/presence-compare.md` | Read-only check of a published Behance or Dribbble piece against its case study |
| `forms/publish-approval.md` | The eight approval steps |

Not in this module: replies, comment routines and outreach pitches (owner decision, 2026-11-17: out; each one asked for is a one-off draft).

## Accounts in scope (owner, 2026-11-16)

The Wugweb company accounts (site blog, LinkedIn page, Behance, Dribbble), the owner's LinkedIn and the owner's Medium. The 5 personal Behance projects are out. Medium is not a form of its own (owner decision, 2026-11-17): it carries the approved blog post unchanged, with a link to the original.

Worked examples, made from a proposed body for shape only: `examples/forms-ntuc-fact-pack.md`, `examples/forms-ntuc-linkedin-post.md`, `examples/forms-ntuc-carousel-outline.md`.

## Rules in every form

- Platform sizes and limits are checked when the form is written, with the platform-specs helper in `skill-map.md` or the platform's own help page, and written down with the date. Never from memory.
- Existing media is shown resized with its aspect ratio kept. Clipping masks are allowed. No cropped files, no re-encoding, no sound. "Crop" means framing a subject in a composition, never cutting a media file (defined in `wugweb-brand-os`, `.claude/skills/wugweb-brand-os/references/vocabulary.md`).
- The client's words appear only as a quote that is in the body.
- British English, sentence case, no dashes, no hashtag lists (LinkedIn: tags none).
- Every sentence in a form maps to a body line in the fact ledger.
- Each form stands alone and is rebuilt for its place, not pasted. The facts are the same in all of them.
- A caption adds to the media and does not describe it. One action per caption.
- Before and after are shown under the same conditions, with the middle (process, timeline) included. No cherry-picked result.
- A thread is one idea rebuilt beat by beat, never an article cut up. If it fits one post, it is one post.
- LinkedIn tags: none (owner decision, 2026-11-17).
- A post waits until the page it links to is live. No client is named or tagged without permission on record.

## The gate for new files

A form may need a file that does not exist (a share image, a social card, a Behance cover). For each one:

1. Prefer an existing file. Propose a made file only when nothing fits.
2. Propose it: what it is, its size, what it is made from, where it would live.
3. Make it only after the owner's yes for that one file.
4. Keep it out of the repository. It reaches the site only when the owner puts it in the media store.
5. Never use a made image as evidence inside a case study. Evidence is real work only.

## Sizes for made files

Type on any made file (deck, carousel, cover, share image, story) uses the `wugweb-kits` tokens by role, from its component sizes reference (`.claude/skills/wugweb-kits/references/component-sizes.md` in this repository) (owner, 2026-11-17): title `--type-graphic-l`, subtitle or key figure `--type-graphic-m`, label `--type-graphic-s`, body `--fluid-body-md` or `--fluid-body-sm`. The element holding the text is a size container. No new token, and the values are not restated here.

These are sizes for new made files, never for resizing client media. The share image size is settled by the owner (2026-11-16). The other three were adopted by the owner on 2026-11-17. Check each against the platform's help page and date it when a file is proposed.

| File | Size | Source and standing |
|---|---|---|
| Link share image | 1200 x 630 | Settled by the owner, 2026-11-16. LinkedIn link image: at least 1200 x 627, ratio 1.91:1, 5 MB at most (adopted 2026-11-17) |
| Behance cover | Upload at least 808 x 632; shown at 202 x 158 | Adopted by the owner, 2026-11-17. Behance Help Center as reported by search; figures date from 2020 |
| Dribbble shot | At least 1600 wide (1600 x 1200 by convention); PNG, JPG or GIF up to 10 MB, video up to 20 MB | Adopted by the owner, 2026-11-17. Dribbble Help Center, read directly |
| Story canvas | 1080 x 1920 | Adopted by the owner, 2026-11-17; the canvas is official. Meta gives no official pixel safe zone: keep the top, bottom and sides clear of key elements, text and logos (wider margins), and the bottom 40% clear of text on Reels ads. Never state a pixel figure as a rule |

This skill picks which platform size a file uses; `wugweb-kits` supplies the size list and the safe zone.

## Card (lists and grids)

- One line per card, word for word from the body, attributed, in context. Image and title do not repeat each other. It must read at small size.

- Takes: client, short title, one line of what was built, cover or thumbnail, industry.
- Tone: no adjectives. "Member portal and back office for NTUC U Care Fund."
- Media: the existing thumbnail kept at its own ratio inside a 16/10 frame that acts as a mask, with no crop of the source and no re-encode (owner, 2026-11-17, owned by `wugweb-kits`); a thumbnail video loops muted.

## Showcase tile

- Takes: the hero visual, client, one line, up to one stat when verified.
- One tile per case study. The tile links to the page.

## Logo band

- Takes: client logos from each case study's folder, at their own ratio, in one tone.
- A logo is shown only when it is the client's own file. Alt is the client name.

## Where made files go

Made files are kept in the media store named in `ops-cycle.md`, under the piece's own folder, each only on the owner's yes for that file; the owner puts the file there, and this skill never uploads. No scheduling tool is connected, so every post is handed to the owner as an approved draft (owner, 2026-11-17).
