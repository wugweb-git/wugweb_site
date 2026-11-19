# Layout grammar

> **Owner: `wugweb-work`.** This file is the block catalogue and the layout grammar for every piece this skill makes: the adaptive rules, the 23 blocks, tiers, screen selection, the All screens block and the viewer, motion, accessibility and performance. It is held here in full and is not a pointer; this skill needs no other skill to lay out a page. Token names and the layout shell values come from the design system document `kits_design_system/docs/tokens/layout-shell.md` and are restated in section 8 so this file works alone. Where a line below is stricter than the media rule in `media-standard.md` ("never cropped"), read it as: no mask or fit hides the part of a screen that proves the claim.

How a parsed body plus its media manifest becomes a block plan. The page is never one fixed composition: it adapts to the content. Vendor-neutral; this site's components are named in `ops-cycle.md`.

## Contents

1. Adaptive UX: the seven lines
2. Block catalogue
3. Hero, stats and summary
4. Chapters and points
5. Media in a chapter
6. Rhythm
7. Closing blocks
8. Tiers and mobile
9. Identity
10. Motion
11. Accessibility in the layout
12. Performance in the layout
13. Screen selection, All screens and the viewer

## 1. Adaptive UX: the seven lines

| Adapts to | Rule | Checked by |
|---|---|---|
| Content shape | Layout comes from what the body holds: number of points (1, 2 to 3, 4 to 6, 7 or more), number and shape of media, quotes, tables, results, timelines. No empty cells, no filler media. | Block plan fixtures for 8 different case studies |
| Content depth | Rich body, thin text-only body and no body each get a complete page. Results, quotes and credits appear only when they exist. | Thin and no-body previews |
| Kind of work | Product UI, brand identity, campaign and stats-led, multi-workstream. Screens group by audience, then flow; mockups are support, never the proof. | Archetype table |
| Volume | 3 screens or 200. A chapter shows only its proof screens; the rest go to one All screens block. | 31-screen and 200-screen cases |
| Device | 375, 768, 1200. One column on phone, rails that show the next item, targets of 44 px or more, a file shown above its natural size is flagged, no sideways page scroll. | Gate at the edge widths |
| Capability and conditions | Works without JavaScript. Reduced motion stops loops and reveals. Videos are muted and load only when near. Heavy pages stay under 25 MB by showing less at first, never by resizing files. | No-JS check, reduced-motion check, byte total |
| Client identity | One accent colour from the client's palette, contrast-checked, for rules and numerals only. | Contrast check on every accent |

The same rules drive the other forms (see `forms.md`).

## 2. Block catalogue (23)

`hero`, `summary`, `stats`, `chapter`, `points`, `figure`, `split`, `pair`, `rail`, `mosaic`, `wall`, `scrollshot`, `loop`, `video`, `quote`, `table`, `timeline`, `results`, `screens`, `credits`, `presence`, `related`, `next`.

A block plan uses only these types. Entries with `dupOf`, `nearDupOf` or a status other than 200 never render.

## 3. Hero, stats and summary

The hero and its meta list are not composed by this skill (owner, 2026-11-19): the meta keys are the owner's and render as he wrote them. The lines below describe how the site shows them, so the body can follow on from them.

- Brand label above the H1: the short title (the brand), else the client name. H1 = the title, which says what was built and does not repeat the brand. The source keeps the two apart: Title holds no brand, Short Title is the brand. Then the subtitle and a meta list holding present keys only.
- Cover, in this order: the body's Cover; else the record's cover path image; else the file with the highest `heroScore` from the visual read; else no image and a text hero on the accent surface. The cover pick is this skill's call, reported with its reason (owner, 2026-11-11); when the visual read scores a folder file above the current cover, the proposal names it as the new Cover line.
- The cover rule: project-specific, legible at small size, never a generic laptop or dashboard. A device mockup is never the hero when a project-specific visual exists. `wugweb-brand-os` may check the pick (`.claude/skills/wugweb-brand-os/references/review-gates.md`, gate 6).
- `stats` under the hero when 2 to 4 verified results exist; the rest go to the Results chapter.
- Summary = the first chapter's lead when it is 40 to 60 words; otherwise no summary block.

## 4. Chapters and points

- Chapter = head (h2, lead, paragraphs) then its items in body order.
- Points take a form chosen from what they are, never from how many there are: prose, statement, editorial list, numbered sequence, lead and supports, two-column text, definition list, annotated screen, paired with media, comparison, table, cards or stat row. The forms, when each is used, how a count of 1 to 7 or more sits without an orphan, and the balance and variety rules are in `composition.md`, which wins on how points are shown (owner, 2026-11-19: no default boxes, no fixed number of points). A card grid is one form and must be earned. Groups become h3 sub-lists.
- Tiles carry no decorative cards on mobile. On desktop, a surface step or a subtle border separates them; never a hairline stroke.
- Numbered process steps are not a block type of their own: `steps` is not one of the 23. Numbered steps that match a process visible in the screens render as a `timeline`, each step citing the screen that proves it; numbered steps with no such order render as `points`.
- A quote sits after the chapter text as a `quote` block: a `figure` holding a `blockquote` and a `figcaption` with the name, role and organisation.
- A markdown table becomes a `table` block. Three or more dated lines in one chapter become a `timeline`.

## 5. Media in a chapter

These values are confirmed by the owner (2026-11-17): rail items at 85vw and never past the 1200 content maximum, a next-item peek of 20%, a signature width of 2400 px, and lines of 35 to 60 characters. In the site stylesheet they are the tokens `--rail-width`, `--rail-peek`, `--signature-width`, `--measure-min` and `--measure-max`.

| Media | Block |
|---|---|
| 1 image, chapter text 120 words or fewer, not a phone screen | `split` (alternate sides) |
| 1 image otherwise | `figure`, contained, captioned |
| The single widest landscape of 2400 px or more on the page | May be the one full-bleed signature `figure` |
| 2 images of the same shape | `pair`, 50:50, uncropped (Styles always a pair) |
| 3 to 8 phone or tall | `rail` per flow, captions, counter, buttons, proximity snap, next item peeks about 20% |
| 9 or more phone | Rails per flow of 8 or fewer; remainder to a `wall` with viewer |
| 2 to 6 landscape or mixed | `mosaic` (the bento-style media grid): spans from shapes, cell count equals media count, source order kept, UI never cropped |
| 7 or more landscape | `wall` with viewer; when the set's bytes exceed the page budget, a lazy `rail` instead |
| Scrollshot | Fixed-height figure showing the top; "View full page" opens the viewer |
| Video 15 s or less | `loop`: muted, playsinline, a poster or `#t=` start frame, the source held in `data-src` so it loads only when near; `aria-hidden` only when 5 s or less and with no control, otherwise a pause control and not hidden |
| Video over 15 s | `video`: muted, click to play, in its own chapter and never looping in a rail; a play and pause button only, with no unmute control and no native volume controls; `preload="none"`, a poster or start frame, never `aria-hidden`; or left off the page when a short cut of it exists |
| GIF | Image |
| States set | `rail` or `pair` with the state as caption |
| Mockup | Figure; at most 2 per page; never the only evidence in a chapter |

### How case-study media is laid out and loaded

- A multi-screen composite that exists only as one baked image is shown as that image. Screens that exist as separate files are laid out in code, never baked.
- A dashboard or web screen: one overview plus two to four detail views, cut by CSS masks, each with a focal point. The file is never cropped.
- At most two or three aspect ratio families on one page.
- Sticky text beside scrolling media only at 1200 and above; stacked below that.
- Full-bleed media keeps the safe area on the left and right.
- DOM order is reading order. Nothing is reordered by `order` or grid placement where order carries meaning.
- A before and after slider has a real button to toggle and arrow keys on the handle, or it is not used.
- Video: `preload="none"`, a start frame or poster always, the source attached only when the video is near, no video bytes on first load. Only muted decorative loops play by themselves.
- At most one or two high-priority images per page; the hero's start frame is the largest paint.

A small file gets a contained cell sized to the file, so it is never shown above its natural size by the layout. Where a file is still shown larger, it is flagged when it looks soft (a flag, not a ban).

Rail items are never wider than 85vw on mobile, so a whole screen is always visible. A screen that is the only proof of a claim never appears only inside a rail; it is also in All screens.

### Layout words the owner uses

No layout and no count is fixed. The old fixed sections (About, Challenges, Impact with 4, 6 and 3 points) are gone: the content shapes the layout. These words map to the catalogue; none adds a block type.

| Owner's word | What it means here |
|---|---|
| Bento, bento-style grid | `mosaic` for the media, composed with the chapter's head and points. A bento is one composition where text and media share the grid at different sizes; it is never a grid of equal text cards |
| Columned | `split`, `pair` and point columns (2 to 3 points in columns, 4 to 6 in a grid) |
| Slides, slide-like | One claim per screen, as in the deck form (`forms/deck.md`): one chapter per claim, with its proof |

Media is part of the narrative: it sits between and inside the chapters, in body order, never as a block of filler at the end.

### Content-shape rules (owned by this skill)

- Per block, state the limits: the maximum length of each field, and what shows when a field or a media item is missing.
- Numbering and labels must reflect a true order or structure in the content.
- Show real screens, not icon cards. One main point and one visual per section.
- Icons are used only where they carry meaning, from the client's own material first (`composition.md`, Icons).

### Fit with the design system

- Structure is page, section, content, blocks. The section owns the gutter and the content owns the maximum width.
- Every section needs an id and an accessible name, so every chapter needs a real heading.
- Filters sit inside the grid they filter, never as a section of their own.
- First screen: on a 390 by 844 phone, and at the narrowest gate width, the headline, subhead and primary action are visible without scrolling.
- One yellow conversion action per page; labels describe the action. Yellow stays under 10% of the page. The footer call to action stays yellow and is the page's one yellow note. `wugweb-brand-os` may check the result (`.claude/skills/wugweb-brand-os/references/visual-os/colour-type-photo-motion.md`).
- Tokens only: no hardcoded colour, spacing, radius, opacity, shadow, blur, z-index or easing. Buttons use `--radius-sm`, chips `--radius-full`, cards `--radius-lg`. Reveals run through `data-reveal` and `data-scroll`. Breakpoints are literal values. The client accent is content: it is set from the validated `Accent` value, never as a hex in a stylesheet. No stroke that reads as a hairline in the rendered result.
- The five existing site blocks are signed off by the owner (2026-11-17). Bento has two meanings: the Bento Block is the site block for points on service and about pages, and it never resolves into an even grid; a bento-style media grid inside a case study is the `mosaic` block. The single bento composition that the case study page used before is the layout this work replaces.
- The CMS fields are owned by `wugweb-kits` and `wugweb-seo` (settled 2026-11-17, see `open-items.md`): `faqs` is kept and feeds FAQPage only where every question and answer is visibly on the page; a case study never carries a `faqs` block; the FAQ rules for service pages and blog posts are in `own-content.md`.

## 6. Rhythm

- Consecutive chapters do not repeat the same media family when another fits. A page with 8 or more chapters uses at least 4 block families.
- `split` alternates sides; no more than 2 zigzags in a row.
- At most 1 full-bleed per chapter; full-bleed only for the hero and one signature moment.
- White space between chapters is at least the space inside them.

## 7. Closing blocks, in order

1. `results`, when results exist and no chapter is named Results.
2. `screens`, titled "All screens": every approved screen not shown in a chapter. Set chips with counts (audience, then flow), a thumbnail grid (3 columns for phone screens and 1 to 2 for desktop on mobile, denser on desktop), and a dialog viewer with caption, "n of N, set name", a visible close button, previous and next buttons of 44 px or more, and swipe. Buttons are required because swipe needs a single-pointer alternative. Focus is trapped while the viewer is open and returns to the thumbnail on close; pinch zoom is allowed; the back action closes it; every item has a deep link that opens the viewer at that item. The full rules are in section 13. Without JavaScript every set renders stacked under its own heading.
3. `credits`: team, partner, special thanks, services, year or timeline, country, platform.
4. `presence`: Live, stores, Behance, Dribbble, awards.
5. `related`: 3 items from the source relation; fallback by pillar then industry.
6. `next`: next by publish date in the same pillar, with brand, title and industry.

The site's one call to action stays in the global footer and stays yellow: it is the page's one yellow note. No second CTA.

## 8. Tiers and mobile

- Below 768: one column, media edge to edge within the gutter, rails horizontal, points stacked.
- 768 to below 1200: two columns for points, mosaics and pairs.
- 1200 and above: full composition. Content is capped at 1200 and no UI screen is shown wider than 1200; photography may full-bleed (hero and signature figure only).
- Micro-adjustments stay inside a tier, and only below 480. Breakpoints are literal values: 480, 640, 768, 1024 and 1200; the layout steps only at 768 and 1200. Going down, use 767.98 and 1199.98.
- The layout shell, from `kits_design_system/docs/tokens/layout-shell.md` (that document wins if it changes):

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Canvas | 375 | 768 | 1200 |
| Section padding (top, right, bottom, left) | 48 16 48 16 | 70 32 70 32 | 96 48 96 48 |
| Content max width | 1200 | 1200 | 1200 |
| Columns | 4 | 8 | 12 |
| Column gap | 16 | 24 | 32 |
| Gutter | 16 | 32 | 48 |
| Header height | 100 | 108 | 108 |
| Control height | 44 | 44 | 44 |

- The section owns the gutter and the content owns the maximum width. The page adds no new shell values and a block plan never sets its own gutter or width. One top-level section holds the page; chapters are `article` elements inside it. Full-bleed escapes the content box and the outer section clips sideways overflow.
- Mobile is the installed app experience: use small and dynamic viewport units, a full-bleed welcome, and no page-level horizontal overflow.

## 9. Identity

- `Accent` from the body, validated at 3:1 or more against the page surface; text use only at 4.5:1 or more. Otherwise the house accent.
- The accent is used for rules, stat numerals, group labels, list markers and the icon tint.
- The client's brand is shown on purpose (owner, 2026-11-19): up to three client colours on a page, as the accent, as a ground behind device-less screens, as one brand band for the signature moment and as a low tint on a chapter surface; the client's own icons; and the branded visuals in the piece's folder (mark, type, palette, patterns, illustration, photography, applications). The roles, limits and contrast rules are in `composition.md`. The Wugweb system stays the frame and yellow stays Wugweb's.
- Proposed from the client's own palette, read in Look mode. No client colour is invented.

### Chapter nav

Held here; it is specified and not yet built on this site.

- A `nav` named "Chapters" holding a list of links to the chapter ids on the page. Its labels may be generic (Context, Build, Results); the chapter headings stay claims.
- At 1200 it is sticky beside the content. Below 1200 it is one row that scrolls sideways under the header, inside the shell and never wider than the site nav.
- The current chapter is marked with `aria-current="true"`, set as the reader scrolls. With scripts off it is a plain list of links.
- The scroll offset under the sticky header comes from the header height, never a literal.
- Chips use the full radius. The current chip may take the client accent; never yellow.
- Use it on a page of five or more chapters. A shorter page does not need one.

### A chart in the block plan

A chart on a page is carried as a `figure` block whose media kind is `chart`. It has no image file: it is drawn as HTML or SVG from the results lines of the body, and the block plan names those lines. Its caption is the source line. With scripts off the same numbers show as a `table`. A chart for a deck, a post or a share image is a made file (`forms/charts.md`).

## 10. Motion

- Reveal on chapter heads and figures (`data-reveal`), with small staggers (`data-reveal-delay`).
- Motion level follows the case read in the brief: low for trust-first sectors, richer for brand-led work.
- Rails never auto-advance. No parallax on UI screens. No scroll-jacking or pinning on mobile.
- Reduced motion stops loops and reveals.

## 11. Accessibility in the layout

- h1, then h2 for chapters, then h3 for groups and points. No skipped levels.
- Alt: owner-edited alt wins; else "{brand}: {label}" when the label is descriptive; else "{brand} {kind} {n} of {N}"; 10 to 125 characters.
- `figure` and `figcaption` for captioned media. Rails follow the W3C carousel pattern: a `region` or `group` with `aria-roledescription="carousel"` and a name that does not contain the word carousel; each slide a `group` with `aria-roledescription="slide"` and a name such as "3 of 8"; native previous and next buttons; a visible counter.
- Rail arrows sit on a solid backing that holds 3:1 contrast over any screenshot.
- A long video has an `aria-label` that says what it shows. Loops follow the pause control rule in `media-standard.md`.
- AA contrast on client colours; focus visible and never hidden under the sticky header; chapter anchors clear the sticky header.
- A rail's scroll area is reachable by keyboard (`tabindex="0"` where the browser does not do it) and uses `overscroll-behavior-x: contain`.
- The viewer shows an image at its natural size, at least twice the thumbnail.
- Before and after pairs stack with labels on mobile.
- Body text is 16 px or larger; lines run 35 to 60 characters on mobile.

## 12. Performance in the layout

- Width and height on every image, from the manifest.
- Hero image high priority, never lazy. Everything else lazy and async.
- `content-visibility: auto` with `contain-intrinsic-size`, only on media containers that carry no reveal and contain none; never on chapters.
- Videos `preload="none"`, with a poster or start frame and the source in `data-src`; they start when near.
- Never request a URL that is a duplicate or not 200. Report rendered bytes per page; warn above 25 MB.

## 13. Screen selection, All screens and the viewer

Three parts, always together (owner, 2026-11-11).

1. **Inside a chapter: only the screens that prove the claim.** One to four screens per chapter, picked in the visual read. The chapter reads as heading, lead, points, then its proof screens with a short caption under each.
2. **Near the end: one All screens block for everything else.** Every other approved screen, so nothing is lost. A row of set chips, each with its count; one chip is selected at a time and the grid below shows that set as thumbnails. Thumbnails keep their own ratio: 3 columns for phone screens and 1 to 2 for desktop screens on mobile, denser on desktop.
3. **On a thumbnail: a full-size viewer, one screen at a time.** The caption, then the position and set as "3 of 8, Member". Previous and next buttons of 44 px or more, a visible close button, swipe, Escape to close.

Worked case: 31 approved screens; 12 stay in chapters as proof; all 31 are in All screens in five sets (Member 8, States 4, Dashboard 9, Back office 7, Cases 3); 2 flagged screens are hidden and listed.

### What a set is

The chips on the page are simple, but the record behind them keeps three things apart, because the sets mix them:

| Field | What it says | Example |
|---|---|---|
| `audience` | Who the screen is for | member, admin, public, partner |
| `flow` | The task the screen belongs to | Apply, Cases, Donations |
| `kind` and `state` | What sort of screen it is | dashboard, mobile screen; error, empty, success |

A set is named from whichever of these tells the reader most ("Member" is an audience, "States" is a state group, "Dashboard" is a kind, "Cases" is a flow). Sets are ordered audience first, then flow. Never store the chip label as the only category.

### Who does what

Each layer does one job and none does another's:

| Layer | Job |
|---|---|
| Body parser | Describes the content: chapters, claims, points, media references, labels, layout hints |
| Media manifest | Describes each file: size, shape, type, status, duplicates, own or borrowed |
| Visual read | Describes what each screen shows: audience, flow, step, kind, state, quality, which chapter it proves |
| Layout resolver | Decides the presentation: proof screens into chapter blocks, every other approved screen into All screens |
| Screens block | Renders All screens: chips, counts, thumbnails |
| Viewer | Opens one screen at a time, with caption, position and navigation |

The parser is never the gallery engine. This site's file for each layer is named in `ops-cycle.md`.

### Viewer rules

- A native dialog. Focus is trapped while it is open and returns to the thumbnail that opened it.
- The image is shown at its natural size, at least twice the thumbnail; pinch zoom is allowed.
- Previous, next and close are real buttons with names; swipe is extra, never the only way.
- The back action closes it, and every item has a deep link that opens the viewer at that item.
- Nothing plays sound. A video in the viewer is muted with a play and pause button only.

### With no JavaScript

Every set renders stacked under its own heading, with every thumbnail and caption in the server HTML. The chips and the viewer are an improvement on top, never the only way to reach a screen.
