# Editorial layout principles: balance, rhythm, variety and lists without equal boxes

Research date: 2026-11-19. Target widths: phone 375, tablet 768, desktop 1200.
Labels used below: [EVIDENCE] = research-backed (study cited by the source); [GUIDELINE] = published guidance from a standards body, vendor or canonical text; [OPINION] = practitioner opinion; [SPEC] = documented CSS behaviour.
Every rule is written so it can be checked (a count, a selector, a threshold or a yes/no test).

## 1. Visual balance: symmetric versus asymmetric, visual weight, and avoiding an unbalanced grid for 2 to 7 items

### Takeaway
Balance is about equal visual weight, not equal boxes: one dominant element can be balanced by two or more lighter ones, and the two checkable failure modes in a grid are (a) an orphan in the last row that reads as emphasised by accident and (b) siblings whose inner parts do not line up. Both have known CSS fixes keyed to item count.

### Cited Findings
- [OPINION, 2015, updated 2017] Four balance types: symmetrical (equal weight either side of an axis; formal, can be static), asymmetrical (unequal weights offset; more dynamic, harder to get right), radial, and mosaic (many elements of uniform emphasis and no hierarchy). Source: [Steven Bradley, Smashing Magazine](https://www.smashingmagazine.com/2015/06/design-principles-compositional-balance-symmetry-asymmetry/)
- [OPINION, 2015/2017] Visual weight rises with size, darker value, contrasting colour, and subject interest (for example a person in an image). Source: [Bradley, Smashing Magazine](https://www.smashingmagazine.com/2015/06/design-principles-compositional-balance-symmetry-asymmetry/)
- [OPINION, 2015/2017] Three ways to balance one large element: move the heavy element nearer the centre (seesaw rule); offset it with two or more lighter focal points on the other side; or counter it with a small element of strong colour or contrast. Negative space counts as an element to be balanced. Source: [Bradley, Smashing Magazine](https://www.smashingmagazine.com/2015/06/design-principles-compositional-balance-symmetry-asymmetry/)
- [GUIDELINE, 2021-01-17] Limit large, attention-grabbing elements to two per view; use no more than three type sizes and no more than three contrast variations; give important elements more surrounding space; verify with a squint or blur test. Source: [Kelley Gordon, NN/g, Visual Hierarchy in UX](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [GUIDELINE] NN/g treats balance (symmetry, asymmetry, radial) as one of its named visual design principles alongside scale, hierarchy, contrast and Gestalt. Only the video page was reachable; the article URL returned 404, so no detailed NN/g wording is recorded here. Source: [NN/g video, Balance in UX Design](https://www.nngroup.com/videos/balance-in-ux-design/)
- [OPINION, Every Layout] Orphan problem stated precisely: when a wrapping row leaves one item alone on the last line at a different width from its siblings, readers can take it as highlighted or more important. The Switcher fixes this by allowing only two states, one row or one column, with no intermediate wrap, switched on a container threshold (example 30rem). Source: [Every Layout, The Switcher](https://every-layout.dev/layouts/switcher/)
- [OPINION, Every Layout] Count limit for a single row: beyond a set number of items the row is forced to stack. The CSS example uses `:nth-last-child(n+5)` (five or more items stack); the component's `limit` prop defaults to 4. The two values differ in the source. Source: [Every Layout, The Switcher](https://every-layout.dev/layouts/switcher/)
- [OPINION, 2019-04-13] Leftover items in a 3-column grid can be detected in CSS and either centred or widened. On a 6-track grid where each item spans 2 tracks: a single leftover is `li:last-child:nth-child(3n - 2)` and is centred with `grid-column-end: 5`; two leftovers are `li:nth-last-child(2):nth-child(3n + 1)` and `li:last-child:nth-child(3n - 1)`, centred as a pair. The author notes centring is often preferable to spanning because a wider item draws more attention than intended. Source: [Michelle Barker, CSS In Real Life](https://css-irl.info/controlling-leftover-grid-items/)
- [OPINION, 2022-07-25] The "dangler": an odd count in a 2-column grid leaves one item alone. Fix: when the count is odd, make the first item span the full width, then let that item change its inner composition with a container query. Selector: `.items:has(.item:last-of-type:nth-of-type(odd)) .item:first-of-type { grid-column: 1 / -1; }`; inner switch to a horizontal row at container width of at least 400px. Source: [Dave Rupert](https://daverupert.com/2022/07/solving-the-dangler-conundrum-with-has-and-container-queries)
- [SPEC, 2023-09-28] One tall card beside short ones, and uneven text lengths in equal boxes: subgrid lets sibling cards share the parent's row tracks so the tallest content in each slot sets the row and headings, text and links line up across cards. Baseline Newly available since 2023-09-15 (Chrome 117, Edge 117, Firefox 71, Safari 16); test with `@supports (grid-template-columns: subgrid)`. Source: [web.dev, CSS subgrid](https://web.dev/articles/css-subgrid)
- [GUIDELINE, 2017-04-09] For any list, keep items related and of equal importance and of roughly the same length so that no one item dominates. Source: [Hoa Loranger, NN/g, 7 Tips for Presenting Bulleted Lists](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [OPINION, 2026] In mixed-size grids, equal tiles signal equal importance, which is rarely true; the largest tile should go to the most important item. Source: [SaaSFrame, Designing Bento Grids That Actually Work](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)

### Inferences
These combine the cited rules into a per-count table. They are my synthesis, not a published table. Columns assumed: 1 at 375, 2 at 768, 3 or 4 at 1200.

| Items | Desktop 1200 | Tablet 768 | Phone 375 | Rule it follows |
|---|---|---|---|---|
| 2 | One row of two, either equal or lead and support (wider plus narrower) | Same, or stack | Stack | Switcher: row or column only |
| 3 | One row of three, or one lead spanning the full width or left column with two stacked beside it | Lead full width, two below (Rupert odd-count rule) | Stack | Odd count in 2 columns must promote one item |
| 4 | Two by two, or one row of four if every item is short | Two by two | Stack | Switcher limit of 4 in a row |
| 5 | Lead plus four (lead full width or spanning 2 columns and 2 rows, four in a 2 by 2), never 3 plus 2 left-aligned | Lead full width, then 2 by 2 | Stack | Odd-count promotion; Barker leftover rule if kept as 3 plus 2, centre the pair |
| 6 | Three by two or two by three; equal cells are acceptable only when texts are of similar length | Two by three | Stack | No orphan at 2 or 3 columns |
| 7 | Lead plus six (3 by 2), or 4 plus 3 with the last row centred; otherwise change the form to a plain list | Lead full width, then 2 by 3 | Stack | Odd-count promotion; over 5 items a row always stacks |

- Checkable orphan test for an engine: for item count n and column count c, if n mod c equals 1 the layout is rejected unless one item is promoted to a wider span or the last row is centred; if n mod c is between 2 and c minus 1 the last row must be centred or spans redistributed.
- Checkable weight test: at most two elements per viewport may use the largest size step (NN/g limit of two attention-grabbing elements).
- Checkable length test for equal boxes: if the longest item's text is much longer than the shortest (a ratio threshold has no published value; a figure such as 2 to 1 would be an engineering choice), do not use equal cards; use a list, or subgrid rows so the parts align.
- A promoted first item is safer than a widened last item: Barker observes that a wide leftover gains unintended emphasis, while Rupert promotes the first item, where emphasis is expected.

### Gaps
- No source gives a published per-count table for 2 to 7 items; the table above is inference.
- No quantified threshold was found for how much text-length variance makes equal cards look unbalanced.
- The NN/g article on balance (as opposed to the video) could not be retrieved, so NN/g's definitions of visual weight are not quoted.
- Rudolf Arnheim's work on visual weight (the usual primary source for weight by position) was not consulted; only the Smashing summary was.

## 2. Alternatives to cards for a list of points, and the evidence on cards versus lists

### Takeaway
Cards suit browsing of mixed, unequal content that links elsewhere; for homogeneous points that readers scan or compare, a list or table is better supported, and the evidence behind this is qualitative eyetracking rather than measured performance. A set of text points with no link target fails the card definition altogether.

### Cited Findings
- [GUIDELINE, 2016-11-06] Definition: a card is a container for a few short, related pieces of information that acts as a linked preview of a single concept, with detail on another page. Source: [Page Laubheimer, NN/g, Cards: UI-Component Definition](https://www.nngroup.com/articles/cards-component/)
- [GUIDELINE, 2016] Use cards when users browse rather than search, when content is heterogeneous (mixed types on one page), and when items need different elements. Source: [Laubheimer, NN/g](https://www.nngroup.com/articles/cards-component/)
- [GUIDELINE with qualitative EVIDENCE, 2016] Do not use cards when: users search (cards de-emphasise ranking); users scan for a specific detail (element positions are less predictable than in a list); users compare (they look back and forth between cards); items are homogeneous (similar items work better as a list, photos as a grid); space matters (fewer cards fit per screen, so more scrolling and more load on short-term memory). The evidence cited is the author's eyetracking research, shown through a single gaze plot, with no sample size or quantitative result given. Source: [Laubheimer, NN/g](https://www.nngroup.com/articles/cards-component/)
- [GUIDELINE] Material Design 1 describes cards as for content made of different elements whose size or supported actions vary, and as an entry point to more detailed information. Retrieved only as a search snippet; the Material 2 and Material 3 card pages render by script and could not be read. Source: [Material Design 1, Cards](https://m1.material.io/components/cards.html)
- [GUIDELINE, 2017-04-09] Numbered lists only when order or count matters (steps, rankings); readers may assume every numbered item must be completed. Otherwise bullets. Source: [Loranger, NN/g](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [GUIDELINE, 2017] Use a vertical list for three or more items worth emphasis; shorter sets read better inline in a sentence. Avoid nested lists. Every list needs a lead-in sentence saying what the list is and why it matters. Source: [Loranger, NN/g](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [GUIDELINE, 2024-02-09] Comparison table: use when users must choose among a small set of similar offerings and weigh several attributes; skip when items are too unlike to share attributes. Limit to 5 items or fewer; every item needs complete, consistent attribute data; keep cell text short with no full sentences; options as columns, attributes as rows. On mobile expect about 2 items visible at once; converting to tabs or lists is possible but weakens side-by-side comparison. Source: [Kate Moran and Taylor Dykes, NN/g, Comparison Tables](https://www.nngroup.com/articles/comparison-tables/)
- [EVIDENCE, 2017-11-12] Eyetracking (2006 study; 2017 study with 47 participants; heatmap from more than 45 participants) shows scanning patterns: F-shaped, layer-cake (headings only), spotted (hunting for numbers, links, word shapes), commitment (reads everything, uncommon). Formatting that prevents F-pattern loss: key points in the first two paragraphs, visible headings that start with meaningful words, small related blocks grouped by a border or background, sparing bold, bulleted or numbered lists for items and steps, cut content. Source: [Kara Pernice, NN/g, F-Shaped Pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [OPINION, Refactoring UI] Do not reach for a border to separate two elements; use spacing, a different background colour or a soft shadow instead. Source: [Adam Wathan and Steve Schoger, 7 Practical Tips for Cheating at Design](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)
- [OPINION, 2026] Do not use a tile grid for a single message or for a long feature list; one strong block communicates more than a grid in those cases. Source: [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)

### Inferences
Decision rules an engine could apply, derived from the findings above:

| Content shape | Preferred form | Basis |
|---|---|---|
| 1 point | Single emphasised statement (large type, open space), no container | SaaSFrame: no grid for one message; NN/g: at most two large elements |
| 2 points | Inline in a sentence, or a two-column text block | Loranger: fewer than 3 items read better inline |
| 3 or more short parallel fragments, no order | Plain list with a lead-in | Loranger; Laubheimer on homogeneous items |
| Steps or ranked items | Numbered sequence | Loranger: numbers only when order or count matters |
| Term plus explanation pairs | Definition list (term in one column, text in the other at 768 and above) | Follows from the scanning argument: fixed positions are predictable |
| One point clearly outweighs the rest | Lead item plus supporting items | Bradley: dominant balanced by several lighter; Rupert promotion |
| Items share 2 or more attributes, 5 or fewer items | Comparison table | Moran and Dykes |
| Mixed media, unequal parts, each links to a detail page | Cards | Laubheimer; Material 1 |

- A case-study "points" block has no link target per item and items are homogeneous text, so by the NN/g definition it is a list, not a card set. Putting each point in a bordered box adds chrome without adding function.
- Because the F-pattern evidence says readers take the first words of each line and the left edge, list items should be set flush left with distinct opening words, and the lead-in doubles as the layer-cake heading.
- The cards-versus-lists claim rests on qualitative evidence; it should be reported as guidance with supporting observation, not as a measured effect.

### Gaps
- Baymard: the list-versus-grid article was behind a research wall and returned no content. I found no free Baymard finding to cite. Baymard's known work concerns product listings, which is a different task from reading prose points.
- Material 2 and Material 3 "when to use cards" text could not be retrieved (script-rendered pages); only the Material 1 snippet is cited. Apple Human Interface Guidelines likewise returned no body text and are not cited.
- No controlled study was found comparing cards and lists for reading comprehension or scan time on editorial pages.
- No source found on definition lists specifically; the row above is inference.
- The Refactoring UI book itself is paid; only the free article is cited. The phrase "not everything needs a card" could not be confirmed in a primary source.

## 3. Rhythm and pacing down a long page

### Takeaway
The canonical texts agree on a constrained system with variation inside it: a fixed measure and a small set of sizes produce calm, and rhythm comes from changing how many fields an element spans, with white space treated as an active element. Web sources turn this into checkable values: a measure cap near 60ch, one type and space scale, and at most three type sizes per view.

### Cited Findings
- [GUIDELINE, 1981] The grid divides the page into fields whose depth is a whole number of text lines and whose width is a column width; fields may be equal or unequal. Gaps between fields keep images apart and leave room for captions; vertical gaps are one or more text lines. Source: [Josef Müller-Brockmann, Grid Systems in Graphic Design, excerpt](https://neugraphic.com/muller-brockmann/muller-brockmann-text2.html)
- [GUIDELINE, 1981] Images and figures each span one to four grid fields, which limits the number of image sizes; fewer size differences give a calmer design. The arrangement on the grid produces the page's rhythm. Source: [Müller-Brockmann excerpt](https://neugraphic.com/muller-brockmann/muller-brockmann-text2.html)
- [GUIDELINE, 1981] The book covers grids of 8 to 32 fields. Source: [Draw Down listing for Grid Systems in Graphic Design](https://draw-down.com/products/grid-systems-in-graphic-design)
- [OPINION, 2010, via secondary summaries] Vignelli: white space matters more than the black of the type; set outside margins first (his stated preference is narrow margins for tension), then derive the grid from the publication; 2, 3 or 4 columns for a book or brochure, 6 or more for a newspaper. Wording is approximate because only summaries were reachable. Source: [summary of The Vignelli Canon](https://andrewclark.super.site/all-media/the-vignelli-canon); [issuu copy](https://issuu.com/aclizano/docs/the_vignelli_canon/41)
- [OPINION, Every Layout] Measure axiom: line length should never exceed 60ch, within a reasonable range of 45 to 75 characters. Apply as a maximum (`max-inline-size`) held in one custom property, with wrappers (`div`, `header`, `main` and similar) exempt so they can go full width. Use tolerances, not fixed widths. Source: [Every Layout, Axioms](https://every-layout.dev/rudiments/axioms/)
- [OPINION, 2018, via interview and reviews] Tim Brown: a text block has three properties, font size, measure and line spacing; lock the font size and let measure and line spacing flex; use a modular scale so sizes stay related and so the rate of change between conditions is set by the scale. Source: [Type Thursday interview on Flexible Typesetting](https://medium.com/type-thursday/how-can-flexible-typesetting-make-you-a-better-designer-62b7b2cf0061); [A List Apart excerpt](https://alistapart.com/article/flexible-typesetting/)
- [OPINION, 2020-02-01] Utopia: define one type scale for the small screen and one for the large screen and interpolate between them instead of stepping at breakpoints. Example values: ratio 1.2 at 320px and 1.333 at 1500px. Breakpoint-based sizing is described as guesswork that leaves devices on the wrong side of a threshold. Source: [James Gilyead, Utopia, Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
- [GUIDELINE, 2021] No more than three type sizes; important elements get more surrounding space; headings sit close to their content; add borders or backgrounds only when spacing alone fails. Source: [Gordon, NN/g](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [EVIDENCE, 2017] Most readers scan; layer-cake scanning means headings carry the page, so each section needs a visible heading that works alone. Source: [Pernice, NN/g](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [OPINION, 2026] In a set of tiles, not everything should animate at once; variety should come from content, with background, radius, padding and type scale held constant. Source: [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)

### Inferences
- Rhythm rule: hold constant the gap, the type scale, the radius and the measure cap; vary only span (how many columns a block takes) and density (text versus media). This is Müller-Brockmann's "one to four fields" restated for the web.
- Span budget: allow at most four block widths on the 1200 grid (for example text measure, two thirds, full container, full bleed). More than four breaks the "fewer sizes is calmer" rule.
- Alternation check: no two consecutive sections should use the same block type and the same span. An engine can test this on the resolved block list.
- Density check: after two or three dense text sections, insert an open element (a full-width figure or a single statement). A full-width element changes the measure and so reads as a reset. This is inference from the white-space and span findings; no source gives a count.
- Measure check: body text blocks must stay at or below 60ch at 1200; with a text column narrower than the 1200 container the remaining columns are available for a side note, a figure or deliberate white space, which is how varying measure produces asymmetry without changing type size.
- At 375 the measure is set by the screen (well under 45 characters at common body sizes), so rhythm on phone must come from vertical spacing and from the alternation of text and full-width media, not from column changes.

### Gaps
- Ellen Lupton, Thinking with Type (grid chapter): the site did not respond; nothing from Lupton is cited.
- Mark Boulton (Designing for the Web, content-out grids): not retrieved.
- Vignelli Canon primary text was not read directly; quotes are from summaries and should be checked against the free PDF from Vignelli's estate before being quoted in a report.
- Tim Brown's specific numbers are in the paid book; only the framework is cited.
- No source gives a measured rule for how often a full-width element should appear on a long page. The pacing counts above are inference.

## 4. Bento-style and asymmetric grids: what works, what fails, and CSS that prevents holes

### Takeaway
A mixed-size grid works when size encodes importance, one cell dominates, gaps and styling are uniform and every span is a multiple of one unit; it fails with holes, with equal cells full of text, and with too many tiles. Holes are a documented consequence of auto-placement with spans and are prevented by dense flow (only for unordered content), by span rules keyed to item count, or by explicit placement.

### Cited Findings
- [SPEC, MDN, last modified 2026-10-08] Auto-placement fills cells in source order. When a spanning item does not fit the current row it moves to the next row and leaves empty cells; later items do not backfill by default. Source: [MDN, Auto-placement in grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout)
- [SPEC, MDN] `grid-auto-flow: dense` backfills earlier gaps with later items that fit, which changes visual order away from DOM order. Tab and screen-reader order still follow the DOM. MDN says dense suits unordered content such as galleries and is not appropriate when sequence matters. Source: [MDN, Auto-placement in grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout)
- [SPEC, MDN] Giving only a span (`grid-column-end: span 2`) lets auto-placement choose the start line; explicitly placed items are positioned first and auto-placed items flow around them. Example pattern: 4 columns, `grid-auto-rows` fixed, every `4n + 1` item spans 2 by 2, with dense flow. Source: [MDN, Auto-placement in grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout)
- [SPEC, 2023] Subgrid aligns inner parts of sibling cells to shared tracks (see section 1). Source: [web.dev, CSS subgrid](https://web.dev/articles/css-subgrid)
- [OPINION, 2022 and 2019] Span rules by item count: promote the first item to full width on odd counts with `:has()` and `:nth-of-type(odd)`; centre or widen leftovers with `:last-child:nth-child(3n - 2)` style selectors. Source: [Dave Rupert](https://daverupert.com/2022/07/solving-the-dangler-conundrum-with-has-and-container-queries); [Michelle Barker](https://css-irl.info/controlling-leftover-grid-items/)
- [OPINION, 2022] `auto-fit` instead of `auto-fill` prevents empty ghost columns when there are fewer items than tracks. Source: [Dave Rupert](https://daverupert.com/2022/07/solving-the-dangler-conundrum-with-has-and-container-queries)
- [OPINION, 2024-10-28] A component can pick its internal layout from the number of children: `:has(.badge:last-child:nth-child(-n + 3))` means three or fewer, combined with `@container (width > 38rem)`, wrapped in `@supports (container-type: inline-size)` so older browsers get the stacked default. Source: [Eric Bailey, Piccalilli](https://piccalil.li/blog/making-content-aware-components-using-css-has-grid-and-quantity-queries/)
- [OPINION, 2026, published 2026-02-03, updated 2026-11-12] Bento rules: 4 to 8 tiles (most examples 4 to 7); size by importance, largest tile for the main point; each tile carries real content plus a caption of one or two lines ending in a concrete claim; a tile must make sense alone; background, radius, padding and type scale constant across tiles. Failures: decorative tiles, too many tiles, captions over two lines, everything animating, a grid where one block would do. Source: [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [OPINION, vendor blogs, 2026, low reliability] Commonly repeated values: one gap value throughout (roughly 8 to 16px for a dense look, 24 to 32px for an editorial look); three or four size variants only (1 by 1, 2 by 1, 1 by 2, 2 by 2); sizes as multiples of one base unit; a large cell must have enough content to justify it. These came from search summaries of vendor posts and were not individually verified. Source: [Studio Meyer, Bento grid layouts](https://studiomeyer.io/en/blog/bento-grid-layouts); [camoa dev guide, Bento grid](https://camoa.github.io/dev-guides/css/css-craft/bento-grid/)
- [GUIDELINE, 1981] Print precedent for the same idea: elements span one to four fields, and fewer distinct sizes read as calmer. Source: [Müller-Brockmann excerpt](https://neugraphic.com/muller-brockmann/muller-brockmann-text2.html)

### Inferences
- Hole test (checkable before render): for a grid of c columns and a set of spans, sum of cell areas must equal c times the number of rows used. If it does not, either change one span or do not use the mosaic for that count.
- Dense flow is unsafe for case-study points because their order carries meaning and reading order would diverge from DOM order. Prefer span rules by count, which keep DOM order, over `grid-auto-flow: dense`. Dense is acceptable for an unordered wall of screens.
- Text-only cells should not be bento tiles. A mixed-size grid needs content whose natural size differs (a wide screenshot, a tall phone screen, a number). If every cell is a sentence, sizes are arbitrary and the list forms in section 2 apply.
- Content-driven spans: derive span from the asset's aspect ratio (landscape gets 2 by 1, portrait gets 1 by 2, the single dominant asset gets 2 by 2) and allow exactly one 2 by 2 per grid.
- Minimum and maximum: fewer than 4 items is a pair or a lead plus support, not a mosaic; more than 8 should be split or shown as a wall or rail.

### Gaps
- No standards-body guidance on bento grids exists; everything here beyond the CSS behaviour is practitioner or vendor opinion.
- Apple's own guidance on its bento-style marketing layouts was not found.
- CSS masonry (grid-lanes or `display: masonry`) status was not checked in this pass.
- No usability evidence was found that mixed-size grids are read better or worse than uniform ones.

## 5. Responsive behaviour between 375, 768 and 1200

### Takeaway
The sources favour components that choose their composition from their own container width and item count, with only two or three deliberate states and no awkward in-between wraps; type and space should interpolate rather than jump. Stacking is the phone state, not the only response.

### Cited Findings
- [GUIDELINE, web.dev] Media queries handle page-level (macro) layout; container queries handle layout inside a component (micro). The same card can sit in a hero, a sidebar or a grid and switch to a horizontal arrangement when its container is at least 350px wide, with no media query. Requires `container-type: inline-size` on the parent. The article predates stable support. Source: [Una Kravets, web.dev, The new responsive](https://web.dev/articles/new-responsive)
- [OPINION, Every Layout] Switch on container width, not viewport, and allow only all-in-a-row or all-stacked, with a count limit, so intermediate states with an orphan never occur. Source: [Every Layout, The Switcher](https://every-layout.dev/layouts/switcher/)
- [OPINION, 2022] Tablet is where odd counts hurt most: collapsing to one column early gives stretched or centred layouts on tablets; the fix is a 2-column grid with a promoted full-width first item whose inner layout turns horizontal at 400px container width. Source: [Dave Rupert](https://daverupert.com/2022/07/solving-the-dangler-conundrum-with-has-and-container-queries)
- [OPINION, 2020] Fluid scales: interpolate type between a small-screen scale (ratio 1.2 at 320px) and a large-screen scale (1.333 at 1500px) so contrast between heading and body grows with the screen. Source: [Utopia](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
- [OPINION, Every Layout] Cap measure at 60ch as a maximum, so wide screens do not lengthen lines. Source: [Every Layout, Axioms](https://every-layout.dev/rudiments/axioms/)
- [OPINION, 2026] On phone, collapse a mixed grid to one column in order of importance; markup order must equal the intended reading order; each tile must be self-contained with its own heading and must not depend on a neighbour for meaning. Source: [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [SPEC, MDN] Visual reordering (dense flow, `order`) does not change tab or screen-reader order, so reordering by CSS creates a mismatch that needs care. Source: [MDN, Auto-placement in grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout)
- [GUIDELINE, 2024] Tables on phone show about two items at once; converting to tabs or a list is allowed but costs side-by-side comparison. Source: [Moran and Dykes, NN/g](https://www.nngroup.com/articles/comparison-tables/)
- [EVIDENCE, 2017] Scanning patterns were also observed on mobile (marking: the eye stays in one place while the page scrolls), so the first words of each item matter most on phone. Source: [Pernice, NN/g](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)

### Inferences
Per-width composition rules, synthesised:

| Width | Columns | What changes besides stacking |
|---|---|---|
| 375 | 1 | Lead item keeps a larger type step; supporting items become a plain list with hairline or space separation; media goes full width between text groups; tables show 2 columns or become a list; no mosaics over 2 columns |
| 768 | 2 (or 6 tracks) | Odd counts promote the first item to full width with a horizontal inner layout; text plus media sits side by side only if the text column keeps at least about 45 characters, otherwise stack; definition lists go two-column |
| 1200 | 3 or 4 (or 12 tracks) | Body text held to 60ch, leaving columns for asymmetry; lead plus support in a row; one 2 by 2 cell allowed in a mosaic; last-row centring rules apply |

- Recompute the orphan test (section 1) at each width, since n mod c changes with c. A count that is clean at 3 columns (6 items) is also clean at 2; a count of 5 or 7 needs promotion at both.
- When to reorder: only by changing DOM order at build time, or not at all. The MDN warning means CSS-only reordering is acceptable for decorative media but not for points whose sequence carries meaning. On phone, media should follow the text it supports, which is the DOM order anyway.
- Component thresholds should be container based (for example a split block turns horizontal at a container width near 640 to 700px, the width at which two 45-character columns fit at body size). The exact number depends on the font and is an engineering choice.
- Nothing should scale past the 1200 container: the measure cap and a fixed maximum container give the same result as a fluid scale that stops at its maximum viewport.

### Gaps
- Apple Human Interface Guidelines layout page could not be read; no Apple guidance is cited.
- Material Design window-size classes and canonical layouts were not retrieved.
- No source gives rules specific to exactly 375, 768 and 1200; the table is inference from general guidance.
- The web.dev article gave no date in the retrieved text and describes container queries as flagged; current support (container size queries are widely available) was not re-verified in this pass.

## 6. The text itself: varying number and length of points; parallel structure versus forced symmetry

### Takeaway
Guidance asks for parallel grammar and similar length within one list, and for cutting content, but nothing asks for the same number of points in every section; counts should follow the content, and the layout should be chosen from the count. Forced symmetry (padding to three, or equal-length filler) conflicts with the "cut unnecessary content" and "equal importance" rules.

### Cited Findings
- [GUIDELINE, 2017-04-09] Parallel structure: every item in a list starts with the same part of speech and all items are fragments or all are sentences. Avoid repeating the same opening words, so the first words tell items apart. Source: [Loranger, NN/g](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [GUIDELINE, 2017] Items in one list should be related, equally important and of roughly the same length so none dominates. Source: [Loranger, NN/g](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [GUIDELINE, 2017] Do not overuse lists; three or more items justify a vertical list, fewer read better inline. Source: [Loranger, NN/g](https://www.nngroup.com/articles/presenting-bulleted-lists/)
- [EVIDENCE, 2017] Readers skip repeated opening words in a list (the bypassing pattern) and read mostly the first words of lines; cutting unnecessary content is a listed remedy. Source: [Pernice, NN/g](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [GUIDELINE, 2024] Where items are compared on shared attributes, data must be complete and consistent for every item, with short neutral cell text; where items are too unlike to share attributes, do not force them into a table. Source: [Moran and Dykes, NN/g](https://www.nngroup.com/articles/comparison-tables/)
- [GUIDELINE, 2016] Cards exist partly because items can have different elements (not every card needs a title or byline); uniform items do not need them. Source: [Laubheimer, NN/g](https://www.nngroup.com/articles/cards-component/)
- [OPINION, 2026] Equal tiles claim equal importance, which is rarely accurate; a caption should be one or two lines and end in a concrete claim. Source: [SaaSFrame](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [GUIDELINE, 2021] Review the real content against the template, since strong content can override the template's intended hierarchy. Source: [Gordon, NN/g](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [OPINION, 2024] Layout thresholds based on count are content-dependent "magic numbers" and may need to differ by language because word lengths differ. Source: [Eric Bailey, Piccalilli](https://piccalil.li/blog/making-content-aware-components-using-css-has-grid-and-quantity-queries/)

### Inferences
- Parallel structure is a rule about grammar inside one list. It does not imply equal counts across sections. An engine should accept any count from 1 to about 7 per section and pick the form from the count (section 1 table, section 2 table).
- Checkable content rules: (a) within a list, all items share a grammatical form; (b) the first two words of each item are unique in that list; (c) if one item is much longer than the rest, it is either the lead item (promote it) or it should be split or moved to body prose; (d) a section with one point is a statement, with two is a sentence or pair, never a padded list of three.
- If lengths in a set differ a lot, that is information about importance. Showing it as a lead plus support is more honest than trimming or padding to equal boxes.
- Varying the count between sections (for example 3, then 5, then 1, then 4) also produces the alternation of dense and open sections that section 3 asks for, so content variety and layout rhythm reinforce each other.
- Because thresholds depend on word length, length checks should count characters of the rendered language rather than assume a fixed number of words.

### Gaps
- No source was found that directly addresses "forced symmetry" or the habit of writing three points per section; the conclusion is inferred from list and hierarchy guidance.
- GOV.UK and Mailchimp content style guides, which have explicit list rules, were not consulted in this pass.
- No research was found on an optimal number of points per section on editorial pages. Claims about a "rule of three" were not verified and are not included.
