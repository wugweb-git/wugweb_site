# Composition: balance, variety and the client's brand on the page

> Owner: `wugweb-work`. Written after the owner's review of 2026-11-19: "you stick to boxes even though they were not balanced", "why you stick to the same number of bullets when you can play around", "no creativity in layout", and "usage of icons and usage of colours and branded visuals and content is totally lacking". This file is how a page is composed once `layout-grammar.md` has said which blocks exist. Where the two differ on how points are shown, this file wins.

The block catalogue says what a page may be made of. This file says how to make it a composed page and not a template: which form a set of points takes, how many there are, how chapters differ from each other, and how the client's own colour, icons and brand assets come onto the page.

## Contents

1. The default is not a box
2. Forms for a set of points
3. The count comes from the content
4. Balance
5. Variety down the page
6. Mixed compositions
7. The client's brand on the page
8. Icons
9. Branded visuals
10. Content richness
11. Recomposing across widths
12. Composition checks
13. What goes in the decision log

## 1. The default is not a box

A card is one form among many, and it is the wrong default. A grid of equal boxes says every point weighs the same, reads the same and is the same length. Content is rarely like that.

- Choose the form from what the points are, never from how many there are.
- A box is earned: use cards only when every point is a separate, parallel thing of similar length, and each could be read alone.
- Never put text of unequal length into equal boxes. It leaves one box crowded and the next half empty.
- Never use a box to hold a single sentence. A sentence is a list item or a statement.
- A page where every chapter is "heading, paragraph, grid of boxes" has failed, whatever the boxes hold.

## 2. Forms for a set of points

Pick one form per set. The same content could take several; pick the one that fits what the points do.

| Form | Use it when | Do not use it when | Rendered by |
|---|---|---|---|
| Prose | There is one point, or the points are steps in one argument | The points are parallel and scannable | `chapter` paragraphs |
| Statement | One line carries the chapter: a decision, a principle, a result | It needs a list to make sense | A large lead line in `chapter`, or `quote` when it is someone's words |
| Editorial list | Two to seven parallel points of unequal length | Each point needs its own picture | `points` as a plain list: a bold lead-in and its sentence, no surface, hairline-free dividers by space only |
| Numbered sequence | The order is real: steps, phases, a journey | The order is arbitrary | `timeline`, each step citing the screen that proves it |
| Lead and supports | One point matters most and the others back it | All points weigh the same | `points` with the first item wide and the rest beside or under it |
| Two-column text | Four or more short parallel points, text only | The points differ a lot in length | `points` in two text columns with no cards |
| Definition list | Term and explanation pairs: features, roles, modules | The terms are sentences | `points` as term and description rows |
| Annotated screen | The points describe parts of one screen | No single screen holds them | `split`: the screen on one side, its points beside it, each naming the part |
| Paired with media | Each point has its own screen or image | A point has no media of its own | `split` rows that alternate sides, or a `rail` with one point per slide |
| Comparison | Before and after, old and new, two audiences | There is nothing to compare | `pair` or `table` |
| Table | Three or more items compared on the same attributes | The cells hold sentences | `table` |
| Cards | Parallel, self-contained points of similar length, three or six of them, ideally each with an icon or a number of its own | Lengths differ; the count leaves a hole; the page already has a card grid | `points` as a grid |
| Stat row | Each point is a number with its source | Any number lacks a source | `stats` or `results` |

Rules:

- State the form in the block plan, beside the block: `points (editorial list)`, `points (lead and supports)`.
- The body may ask for a form with its `Layout:` hint. A hint that the content cannot fill is reported, never forced.
- A form the site cannot render yet is listed as a gap in the block plan, with the nearest form used meanwhile. It is never faked with a card grid.

## 3. The count comes from the content

There is no house number of points. Four points in every chapter is a symptom of the old fixed schema, and it is banned as a habit.

- Write as many points as the evidence gives: one, three, five, seven. A chapter with one strong point is finished.
- Never pad to fill a grid and never cut a real point to fit one.
- Two chapters next to each other should not have the same count unless the content truly gives it. When they do, they take different forms.
- Points need not be the same length. Parallel grammar is good; forced symmetry is not.
- A point with no evidence is cut, even when that breaks a tidy count.

How a count sits, when the form is a grid or columns:

| Count | Arrangements that balance | Never |
|---|---|---|
| 1 | Prose or a statement | A lone box |
| 2 | Two columns; or a comparison | Two boxes floating in a three-column grid |
| 3 | Three columns; or one lead above two | Two then one |
| 4 | Two by two; or one lead beside three; or an editorial list | Three then one |
| 5 | One lead and four; or two then three with the two wider; or an editorial list | Three then two equal boxes with a hole; four then one |
| 6 | Three by two; or two by three; or one lead and five as a list | Four then two |
| 7 or more | An editorial list, two-column text, or groups with h3 sub-lists | A card grid |

- The last row is never short by accident. If the count leaves an orphan, change the arrangement or the form.
- On a phone every arrangement becomes one column, so the order of points must make sense read straight down.

## 4. Balance

Balance is judged on the rendered page, at 375, 768 and 1200.

- **Weight.** A large image, a dark surface, a big numeral and a block of bold text are heavy. A row should not put all the weight on one side unless a lighter side is clearly the supporting one.
- **Height.** Items in one row should end within about a quarter of the row's height of each other. A tall item beside short ones needs a different arrangement, not stretched boxes.
- **Length.** In any set shown as equal cells, the longest text is no more than about one and a half times the shortest. Past that, use an editorial list.
- **Edges.** Items align to the column grid. A mixed composition keeps consistent gaps and shared edges, so it reads as one composition.
- **Asymmetry is allowed and often better.** A wide column beside a narrow one, or a lead item beside a stack, balances by weight and not by size.
- **Empty space is a choice.** Space beside a short text is fine when it is deliberate and repeated; a hole in a grid is not.

## 5. Variety down the page

A reader should feel the page change as the story changes.

- No two chapters in a row use the same form for their points.
- No more than one card grid on a page, unless the content is truly a catalogue.
- A page of five or more chapters uses at least three different forms and at least four block families.
- Alternate density: after a text-heavy chapter comes a media-led one, and after a wall of screens comes a quiet line of text.
- Change the measure: a statement runs wide and large; an argument runs at reading width; a list may sit in a narrower column beside media.
- One signature composition per page: the moment that could only belong to this project. It comes from the content: the one screen that explains the product, the mark at full size, the before and after, the number that matters.
- Do not vary for its own sake. Each change of form has a reason from the content, and the reason goes in the decision log.

## 6. Mixed compositions

A bento is one composition in which text and media share a grid at different sizes. It is never a grid of equal text cards.

- It has one dominant cell, usually the strongest screen or image. The rest support it.
- Cell sizes come from what is in them: a wide screen takes a wide cell, a phone screen a tall one, a statement a wide short one, a number a small one.
- Text cells are few and short: a claim, a number, a caption. Long text does not go in a cell.
- No holes and no filler. If the cells do not tile, change the spans or the set.
- Media is never cropped or reshaped to fit a cell. The cell takes the media's shape.
- At 375 a mixed composition becomes a sequence: the dominant cell first, then the others in reading order.

## 7. The client's brand on the page

A case study should look like the client's project inside Wugweb's frame. The Wugweb system holds the page: its type, spacing, header, footer and its one yellow note. Inside the body, the client's own colour, icons and assets are used on purpose.

Read the client's palette in Look mode from their own material: the mark, the screens, the brand files in the piece's folder. Record each colour with where it was read.

| Role on the page | What may carry client colour | Limit |
|---|---|---|
| Accent | Rules, stat numerals, group labels, the current chip, list markers, the icon tint | One colour, at 3:1 or more against the surface; as text only at 4.5:1 or more |
| Ground for screens | The surface behind a device-less screen, a rail, a mosaic or the All screens block: a tint or shade of a client colour | Chosen so the screens stand out from it; body text never sits on it unless it passes 4.5:1 |
| Brand band | One full-width band in the client's colour for the signature moment: the mark, a statement, a key screen | At most one per page; text on it passes 4.5:1, or 3:1 when it is large |
| Chapter tint | A very low tint of a client colour on one or two chapter surfaces, to mark a change of subject | Subtle enough that the Wugweb surface still reads as the page; never on consecutive chapters |
| Data | Chart series in the client's palette | Distinguishable without colour alone; each series labelled |

Rules:

- Up to three client colours on a page: one accent and up to two for grounds and bands. More reads as a different website.
- Every colour pair that carries text or meaning is measured, and the ratio is written in the review. A client colour that fails is shifted in lightness for use here and the shift is noted; the client's mark itself is never recoloured.
- Client colour is content. It arrives through the body's `Accent` value and the palette record, never as a value written into a stylesheet.
- Yellow stays Wugweb's: the client's colour never competes with the one yellow action, and a client whose colour is yellow gets it as a ground or band, never on an action.
- The site's own text and surface colours are never changed.
- When no client colour can be read from real material, none is invented: the house accent is used and the gap is an owner question.

## 8. Icons

Icons explain or identify. They do not decorate.

- Use an icon when it carries meaning a reader would miss without it: a product module, a platform, an audience, a status, a step in a flow.
- Source, in this order: the client's own product icons as they appear in the screens or the brand files; the client's icon set if supplied; the site's icon set. Never mix two families in one set of points. Never use emoji.
- Do not draw a new icon to fill a card. If the points have no natural icons, the form is not cards.
- One size and one stroke weight within a set. Icons sit on the text baseline grid and take the text colour or the client accent.
- An icon beside a label is decorative to assistive technology and is hidden from it; an icon standing alone needs a name.
- A client's icons are shown as the client drew them: not redrawn, recoloured or cropped. They appear with permission, like any brand asset.

## 9. Branded visuals

The client's identity is evidence of the work and of who it was for. Use it.

- From the piece's own folder, find and use: the mark and its lockups, the type specimen, the palette, patterns and graphic devices, the illustration system, photography, motion, and applications (print, signage, packaging, social).
- A product project still has a brand: show the mark with the project title, show the interface type and colour in a Styles pair, and let the screens carry the rest.
- A brand project sequences its chapters as idea, mark, type, colour, system, applications, unless the content gives a better order.
- Show screens without a device frame on a client-coloured ground where the files allow. A device mockup is support, at most two per page.
- A logo is shown at the size and with the clear space its owner asks for, on a ground that passes contrast, and never altered.
- Brand assets are used only with permission on record, and a client who may not be named is not shown by mark, colour or product name.
- When the folder holds no brand assets, say so in the audit and ask the owner for them. Their absence is a finding, not a reason to fall back to mockups.

## 10. Content richness

A thin page is often a content gap, not a layout gap. Before laying out, list what the project could show and what the source holds.

| A full case study can draw on | Shown as |
|---|---|
| The claim, in one line | Hero subtitle or statement |
| Who it was for and what they needed | Context chapter |
| What was built, by audience and flow | Chapters with their proof screens |
| Decisions and why | Statement, annotated screen, comparison |
| The system behind it: components, tokens, rules | Styles pair, mosaic, table |
| The brand: mark, type, colour, applications | Branded visuals (section 9) |
| Process, only where it changed the outcome | Numbered sequence |
| Results with source and date | Stat row, results, chart |
| The client's words, with consent | Quote |
| Scope, team, partners, timeline, links | Meta list, credits, presence |
| Everything else that was made | All screens |

- Each row missing from the source becomes one exact question to the owner. It is never filled by invention.
- Each row present is used once, in the form that suits it. Repeating a fact in three forms is padding.

## 11. Recomposing across widths

A composition is designed three times, not shrunk.

- **375.** One column. The order is the reading order. Media runs to the gutter; sets of screens become rails or three-across thumbnails; a lead item comes first; a mixed composition becomes a sequence. Nothing depends on being beside something else.
- **768.** Two columns where pairs and lead-and-supports can sit side by side. A three-column set becomes two with the remainder handled as in section 3, never an orphan.
- **1200.** The full composition: asymmetric columns, mixed grids, a sticky text beside scrolling media where the content suits it.
- Reorder between widths only when the reading order still holds with scripts off.
- Check each change at the edges (767, 769, 1199, 1201): a composition that breaks one pixel either side of a breakpoint is not finished.

## 12. Composition checks

Pass or fail, on the rendered page. These join the Layout acceptance criteria in `qa-checklist.md`.

| Check | Fails when |
|---|---|
| Forms vary | Two chapters in a row show their points in the same form |
| Card grids are earned | The page has more than one card grid, or a card grid whose longest text is over one and a half times its shortest |
| No orphan | Any grid row is short by accident at 375, 768 or 1200 |
| Counts are real | Every chapter has the same number of points and the source does not explain why |
| Rows balance | Items in a row differ in height by more than a quarter of the row |
| A signature moment exists | No composition on the page could only belong to this project |
| The client is present | No client colour, mark or brand asset appears in the body although the folder holds them |
| Colour is measured | A client colour carries text or meaning without a recorded contrast ratio |
| Icons mean something | An icon set mixes families, or icons were added to fill cards |
| Mockups are support | More than two device mockups, or a mockup where a real screen exists |
| It recomposes | A width is only the wider layout stacked, with a broken reading order or an orphan |

## 13. What goes in the decision log

For each chapter: the form chosen for its points, the forms considered, and the reason from the content. For the page: the signature composition and why it is that one; the client colours with their source and measured ratios; the icon source; which brand assets were used and which were missing. Each entry names the render on which the choice was seen. A composition choice with no render behind it is logged as `not yet seen`.
