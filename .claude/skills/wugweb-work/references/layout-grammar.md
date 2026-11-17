# Layout grammar

> **Owner: `wugweb-kits`.** The block catalogue, tiers, motion, accessibility and performance rules below belong to `wugweb-kits`. Held here until that skill is approved and installed; then it wins and this file becomes a pointer. Do not copy these rules into another file. One part stays with this skill: which block a content shape gets. Where a line below is stricter than the media rule in `media-standard.md` ("never cropped"), read it as: no mask or fit hides the part of a screen that proves the claim.

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

- Brand label: short title, else client name. H1 = the title (client + what was built). Then the subtitle and a meta list holding present keys only.
- Cover: the body's Cover, else the highest `heroScore` from the visual read, else no image and a text hero on the accent surface. Never a generic device mockup when a project-specific visual exists.
- `stats` under the hero when 2 to 4 verified results exist; the rest go to the Results chapter.
- Summary = the first chapter's lead when it is 40 to 60 words; otherwise no summary block.

## 4. Chapters and points

- Chapter = head (h2, lead, paragraphs) then its items in body order.
- Points: 1 → prose. 2 to 3 → columns. 4 to 6 → grid (3 columns when the count is 3 or 6, else 2). 7 or more → two-column list. Groups become h3 sub-lists.
- Tiles carry no decorative cards on mobile. On desktop, a surface step or a subtle border separates them; never a hairline stroke.
- Numbered steps that match a process visible in the screens may become a steps or `timeline` block, each step citing the screen that proves it.

## 5. Media in a chapter

Four numbers below are not layout shell values. They are held proposals for `wugweb-kits`, which decides them: the 85vw rail item width, the 20% peek, the 2400 px signature width and the 35 to 60 character line. Until kits answers, use them and mark any output that depends on them "open". Widths, gutters and columns are never set here.

| Media | Block |
|---|---|
| 1 image, chapter text 120 words or fewer, not a phone screen | `split` (alternate sides) |
| 1 image otherwise | `figure`, contained, captioned |
| The single widest landscape of 2400 px or more on the page | May be the one full-bleed signature `figure` |
| 2 images of the same shape | `pair`, 50:50, uncropped (Styles always a pair) |
| 3 to 8 phone or tall | `rail` per flow, captions, counter, buttons, proximity snap, next item peeks about 20% |
| 9 or more phone | Rails per flow of 8 or fewer; remainder to a `wall` with viewer |
| 2 to 6 landscape or mixed | `mosaic`: spans from shapes, cell count equals media count, source order kept, UI never cropped |
| 7 or more landscape | `wall` with viewer; when the set's bytes exceed the page budget, a lazy `rail` instead |
| Scrollshot | Fixed-height figure showing the top; "View full page" opens the viewer |
| Video 15 s or less | `loop`: muted, playsinline, poster or `#t=` start frame, loads when near, `aria-hidden` |
| Video over 15 s | `video`: muted, click to play, play and pause button only, `preload="none"`, never `aria-hidden`; or left off the page when a short cut of it exists |
| GIF | Image |
| States set | `rail` or `pair` with the state as caption |
| Mockup | Figure; at most 2 per page; never the only evidence in a chapter |

Rail items are never wider than 85vw on mobile, so a whole screen is always visible. A screen that is the only proof of a claim never appears only inside a rail; it is also in All screens.

### Content-shape rules (owned by this skill)

- Per block, state the limits: the maximum length of each field, and what shows when a field or a media item is missing.
- Numbering and labels must reflect a true order or structure in the content.
- Show real screens, not icon cards. One main point and one visual per section.

### Fit with the design system (rules owned by `wugweb-kits`; pointers only)

- Structure is page, section, content, blocks. The section owns the gutter and the content owns the maximum width.
- Every section needs an id and an accessible name, so every chapter needs a real heading.
- Filters sit inside the grid they filter, never as a section of their own.
- First screen: at the narrowest gate width the headline, subhead and primary action are visible without scrolling.
- One yellow conversion action per page; labels describe the action; yellow stays under 10% of the page.
- The site's existing blocks are awaiting the owner's sign-off; the bento layout on the case study page is the one this work replaces.
- The CMS fields are owned by `wugweb-kits` and `wugweb-seo` (settled 2026-11-17, see `open-items.md`): `faqs` is kept and feeds FAQPage only where every question and answer is visibly on the page; this skill still never writes FAQ blocks for schema, and no case study body carries one unless the owner supplies the source Q and A.

## 6. Rhythm

- Consecutive chapters do not repeat the same media family when another fits. A page with 8 or more chapters uses at least 4 block families.
- `split` alternates sides; no more than 2 zigzags in a row.
- At most 1 full-bleed per chapter; full-bleed only for the hero and one signature moment.
- White space between chapters is at least the space inside them.

## 7. Closing blocks, in order

1. `results`, when results exist and no chapter is named Results.
2. `screens`, titled "All screens": every approved screen not shown in a chapter. Set chips with counts (audience, then flow), a thumbnail grid (3 columns for phone screens and 1 to 2 for desktop on mobile, denser on desktop), and a dialog viewer with caption, "n of N, set name", a visible close button, previous and next buttons of 44 px or more, and swipe. Buttons are required because swipe needs a single-pointer alternative. Without JavaScript every set renders stacked under its own heading.
3. `credits`: team, partner, special thanks, services, year or timeline, country, platform.
4. `presence`: Live, stores, Behance, Dribbble, awards.
5. `related`: 3 items from the source relation; fallback by pillar then industry.
6. `next`: next by publish date in the same pillar, with brand, title and industry.

The site's one call to action stays in the global footer. No second CTA.

## 8. Tiers and mobile

- Below 768: one column, media edge to edge within the gutter, rails horizontal, points stacked.
- 768 to below 1200: two columns for points, mosaics and pairs.
- 1200 and above: full composition. The content width and the widest a screen may be shown come from the layout shell; photography may full-bleed (hero and signature figure only).
- Micro-adjustments stay inside a tier. Breakpoints are literal values and come from the layout shell.
- Layout values are not restated here. Widths, section padding, columns, gaps and header heights are read from `wugweb-kits` and `kits_design_system/docs/tokens/layout-shell.md`, and nowhere else. The page adds no new shell values and a block plan never sets its own gutter or width. One top-level section holds the page; chapters are `article` elements inside it.
- Mobile is the installed app experience: use small and dynamic viewport units, a full-bleed welcome, and no page-level horizontal overflow.

## 9. Identity

- `Accent` from the body, validated at 3:1 or more against the page surface; text use only at 4.5:1 or more. Otherwise the house accent.
- Used for rules, stat numerals and group labels. Never as a surface above 10% of the page.
- Proposed from the client's own palette, read in Look mode.

## 10. Motion

- Reveal on chapter heads and figures, with small staggers.
- Motion level follows the case read in the brief: low for trust-first sectors, richer for brand-led work.
- Rails never auto-advance. No parallax on UI screens. No scroll-jacking or pinning on mobile.
- Reduced motion stops loops and reveals.

## 11. Accessibility in the layout

- h1, then h2 for chapters, then h3 for groups and points. No skipped levels.
- Alt: owner-edited alt wins; else "{brand}: {label}" when the label is descriptive; else "{brand} {kind} {n} of {N}"; 125 characters or fewer.
- `figure` and `figcaption` for captioned media. Rails follow the W3C carousel pattern: a `region` or `group` with `aria-roledescription="carousel"` and a name that does not contain the word carousel; each slide a `group` with `aria-roledescription="slide"` and a name such as "3 of 8"; native previous and next buttons; a visible counter.
- Rail arrows sit on a solid backing that holds 3:1 contrast over any screenshot.
- A long video has an `aria-label` that says what it shows. A loop longer than 5 seconds has a pause control (owner, 2026-11-16; the control is built by `wugweb-kits`).
- AA contrast on client colours; focus visible and never hidden under the sticky header; chapter anchors clear the sticky header.
- A rail's scroll area is reachable by keyboard (`tabindex="0"` where the browser does not do it) and uses `overscroll-behavior-x: contain`.
- The viewer shows an image at its natural size, at least twice the thumbnail.
- Before and after pairs stack with labels on mobile.
- Body text is 16 px or larger; lines run 35 to 60 characters on mobile.

## 12. Performance in the layout

- Width and height on every image, from the manifest.
- Hero image high priority, never lazy. Everything else lazy and async.
- `content-visibility: auto` only on media containers that carry no reveal.
- Videos `preload="none"`, start when near.
- Never request a URL that is a duplicate or not 200. Report rendered bytes per page; warn above 25 MB.
