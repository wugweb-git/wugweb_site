# Body Content standard (v2)

The editorial contract for one case study. One Body Content document per case study, written by the owner. The agent writes only proposals in this grammar; the owner approves before anything reaches the source.

## Contents

1. Principles
2. The grammar
3. Meta keys
4. Chapters and points
5. Media lines and labels
6. Results lines
7. Quotes, tables and milestones
8. What becomes what on the page
9. v1 compatibility
10. Examples per archetype

## 1. Principles

- Everything works with no hints. Hints only override.
- Media kinds decide blocks; counts and shapes decide sizes.
- Order is preserved: media render in body order inside their chapter.
- One copy per body. Never keep a short copy and a long copy of the same story.
- Only proof screens are linked inside a chapter. All other approved screens stay folder-only and reach the All screens block through the manifest.

## 2. The grammar

```
## Title line                                  ignored by the page (human label)
**Subtitle:** one line, ≤ 90 chars             hero line
**Client:** Name or [Name](https://…)          meta; link rendered as a link
**Industry:** … **Partner:** … **Disciplines:** … **Team:** … **Timeline:** … **Year:** … **Country:** … **Platform:** … **Special Thanks:** …
**Category:** … **Tags:** a, b, c
**Live:** https://…  **App Store:** …  **Play Store:** …  **Behance:** …  **Dribbble:** …  **Awards:** …
**Accent:** #hex                               optional identity; contrast-checked at render, else ignored
**Results:**                                   optional; or a `### Results` section
- 42% | fewer HR tickets | Internal helpdesk report, Jan to Jun 2026 | as of 2026-07
### Claim heading                              a chapter; any count
Layout: rail | split | mosaic | chapter | stats | quote | timeline | gallery     optional hint, directly under the heading
Lead sentence that answers the heading. Paragraphs follow.
*Group label*                                  optional; groups the points below
- **Point title**: text                        or `1.` numbered, or `- **Title**` + indented description
![Screens: Onboarding 1](https://…/01.png)     media anywhere; label = kind[: name][ n]
- Video: https://…/clip.mp4                    or ![Video: name](url.mp4)
> "Quote text."
> Name, Role, Organisation
| Table | rows |
2026-03: dated milestone                       3 or more dated lines become a timeline
## Media                                       v1 compatibility only
## Gallery (site assets)                       v1 compatibility only
```

Write each meta key on its own line in proposals. Leading tabs and spaces are ignored by the parser, but proposals do not use them.

Body markdown uses only constructs the sync can convert to blocks: links, bold and italic, and lists with a type and level. Anything else is flagged in the audit.

## 3. Meta keys

| Key | Goes to | Notes |
|---|---|---|
| Subtitle | Hero line | 90 characters or fewer; says what was built |
| Client | Hero meta | Markdown link allowed |
| Industry, Partner, Disciplines, Team, Timeline, Year, Country, Platform, Special Thanks, Category, Tags | Hero meta and credits | Present keys only; empty keys never render |
| Live, App Store, Play Store, Behance, Dribbble, Awards | Presence block | Never in the hero meta; a dead URL is kept in the source and skipped on the page |
| Accent | Identity | One hex from the client's own palette; see `layout-grammar.md` for the contrast rule |
| Results | Results | See section 6 |

## 4. Chapters and points

- A chapter is a `###` heading. Any number of chapters. Prefer claim headings (see `copy-and-seo.md`); generic labels are tolerated in v1 bodies and flagged by the audit.
- The first sentence under the heading is the lead and answers the heading.
- Points: `- **Title**: text`, or a numbered list, or `- **Title**` with the description on the next indented line.
- `*Group label*` on its own line groups the points that follow under an h3.
- A chapter with no media is prose. A chapter with only media is allowed.

## 5. Media lines and labels

A media line is an image `![Label](url)` or a video line `- Video: url`, `- Loop: url`, or `![Video: name](url.mp4)`. Media anywhere inside a chapter attaches to that chapter in order.

Label form: `kind[: name][ n]`, for example `Screens: Member 4, Application start with Retrieve MyInfo`. The text after the kind is the caption seed.

| Kind words | Meaning |
|---|---|
| cover, hero | Cover image |
| screen, screens, flow, mobile, states | App or web screens; `States` makes a states set |
| web, dashboard | Desktop screens |
| mockup | Device mockup (support only) |
| styles, style board, moodboard | Style tiles; Styles always render as a pair |
| logo, mark, client logo | Marks |
| type, colour, pattern, application, print, social, photo, diagram, chart, before, after | Brand and campaign assets |
| video, loop | Video; 15 seconds or less loops (pause control rule: `media-standard.md`), longer is muted click-to-play |
| press, award | Presence items |
| challenge, solution, design philosophy, dp, conclusion, filler, about, thumbnail | v1 slot labels; routed for compatibility |

Unknown label: rendered as a figure with the label as caption, and flagged in the audit. The visual read corrects the kind when the label is wrong.

## 6. Results lines

Form: `value | what | source | as of`, with period and baseline or benchmark written inside `what` or `source`. A line without them parses, but is shown as "unvalidated" unless the owner says so (metric form: `copy-and-seo.md`).

```
- 42% | fewer HR tickets | Internal helpdesk report, Jan to Jun 2026 | as of 2026-07
```

- The two-part form `value | what` is accepted from older bodies and flagged as missing source and date.
- A number without a source is not a result. Mark it "unvalidated" or leave it out.
- Results appear only when they exist. 2 to 4 go under the hero as stats; the rest go to the Results chapter.

## 7. Quotes, tables and milestones

- Quote: `> "Text."` then `> Name, Role, Organisation`. 3 lines or fewer. A quote without a named person is not used.
- Table: a markdown table renders as a table block.
- Milestones: lines of the form `YYYY-MM: text`. Three or more in one chapter become a timeline.

## 8. What becomes what on the page

| Body | Page |
|---|---|
| Title line | Nothing (human label) |
| Subtitle, meta | Hero |
| First chapter lead of 40 to 60 words | Summary |
| `###` | Chapter (`article` with h2 and id) |
| `*Group*` | h3 sub-list |
| Media in a chapter | Figure, split, pair, rail, mosaic, wall, scrollshot, loop or video (see `layout-grammar.md`) |
| Folder-only screens | All screens block, grouped by audience then flow |
| Results | Stats and Results chapter |
| Live, stores, Behance, Dribbble, Awards | Presence block |

## 9. v1 compatibility

Older bodies were written for fixed slots: About, Challenges, Solutions, Design Philosophy, Conclusion, often with a short copy plus a longer duplicate under a site-copy heading (the exact heading for this site is in `ops-cycle.md`).

- When both copies exist, the long site copy wins. The proposal collapses them into one copy.
- `## Media` items route by label words or a `Section:` prefix; `## Gallery` goes to the closing media.
- Tab-indented headings, `####` runs inside titles, trailing colons and raw markdown links in meta are parser cases, not owner errors. The audit lists them; the proposal fixes them.

## 10. Examples per archetype

- Web platform: `examples/body-ntuc-u-care.md` (complete proposal).
- Stats-led, multi-workstream: `examples/body-animal-writes.md` (skeleton with owner-input markers).
- Large screen set: `examples/body-musiclinkd.md` (skeleton grouped by flows).
