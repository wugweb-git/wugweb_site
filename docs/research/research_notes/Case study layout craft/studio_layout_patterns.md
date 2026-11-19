# Studio case-study layout patterns (how leading studios lay out the body of a case study, 2024 to 2026)

Method note for the report writer. All studio pages below were read on 2026-11-19 by downloading the served HTML and reading its structure: order of elements, text lengths in characters, image dimensions, and the layout class names (column spans, module names). Nothing was rendered in a browser, so:

- "Observed" means it is present in the served HTML (element order, counts, class names, sizes).
- Where a visual behaviour is deduced from a class name (for example `Sticky`, `masonry`, `carousel`, `col-start-7`), it is listed under Inferences, not as an observation.
- Character counts are of visible text and are approximate.
- Studios read successfully (12): Pentagram, Fantasy, Instrument, Work and Co, Wolff Olins, Order, Koto, Collins, Clay, Area 17, Huge, Metalab (hero only).
- Not read: Locomotive (bot challenge page, not bypassed), Ragged Edge (no case URL found in served HTML), Ramotion (only category pages found), DIA, Ueno archive. See Gaps.

## 1. What does a typical case-study body look like at each named studio?

### Takeaway
None of the twelve pages is "heading, paragraph, equal grid" repeated. Each uses a small vocabulary of 5 to 9 distinct module types, and the strongest structural split is between studios that run a media stream with text pulled out to the side or into a panel (Pentagram, Wolff Olins, Collins, Order) and studios that run labelled editorial chapters where each chapter has one short paragraph and a different media arrangement (Koto, Area 17, Fantasy, Instrument, Clay, Huge, Work and Co).

### Cited Findings

**Pentagram, Alpha Bank** (https://www.pentagram.com/work/alpha-bank, read 2026-11-19)
- Observed: the body is 46 media figures, all carrying a `workMedia--masonry` class; 43 are the default size and 3 carry an extra `workMedia--half` modifier. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank))
- Observed: 7 pull statements are interleaved in the media stream as `blockquote` elements set in a heading size (`f-heading-4`), each 129 to 192 characters, one after every 3 to 8 media items. They are sentences lifted from the project text, not client testimonials. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank))
- Observed: there are no image captions and no section headings in the body. The full narrative is 12 rich-text paragraphs of 280 to 554 characters that sit in the HTML after the whole media stream, followed by a metadata block (Client, Sector, Discipline) built from 3-column-wide stacks. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank))

**Fantasy, Art Basel** (https://fantasy.co/work/art-basel, read 2026-11-19)
- Observed sequence: full-screen media hero with breadcrumb and title; a video in a rounded frame beside one 128-character statement at h4 size; then repeated chapters, each opened by a small eyebrow label ("Overview", "Innovation", "Global Impact"), a 70 to 74 character headline at h6 size, and exactly one paragraph of 470 to 530 characters, followed by 1 to 3 full video figures. (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel))
- Observed: a "Strategic Objectives" list of 4 items built as rows on a 12-column grid. Each row has a top hairline border, the number ("01.") in a 1-column cell, and the sentence (80 to 89 characters) in a 5-column cell that starts at column 7, leaving columns 2 to 6 empty. (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel))
- Observed: four feature notes (65 to 140 characters each) whose headings exist only for screen readers (`sr-only`); the visible unit is media plus one short sentence. Their wrappers use `col-start-7 col-span-5` with a very large vertical gap between items (`gap-y-96` to `gap-y-120`). (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel))
- Observed: results are `stats-carousel-slide` cards with a fixed minimum width (33rem), each holding a large figure ("4.5", "$547 M"), a one-line label, and a supporting sentence at 60% opacity. (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel))

**Instrument, Oura** (https://www.instrument.com/work/oura-smart-ring, read 2026-11-19)
- Observed sequence: text hero (title, breadcrumb, tag); a 243-character intro set at heading size with a contact button; video; "The Challenge:" as a run-in label followed by a 262-character statement at headline size; video; h2 plus one 795-character body paragraph; a 2-image gallery; "Our Approach:" statement (279 characters); video; h2 plus 874-character body; one wide image (1920 by 992); h2 plus a 307-character body in a smaller text style; video; "The Impact:" statement; video; a centred standalone client quote at display size with portrait, name and role; outbound link; awards; services list. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring))
- Observed: the three "Challenge / Approach / Impact" blocks share one module (`messaging messaging--left messaging--large`): a short label and a large left-aligned statement, with no body text. Body paragraphs live in a separate centred `text-block` module. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring))
- Observed: media modules are sized by a modifier: 17 are `media-component--center media-component--xx-large` and 2 are `media-component--full`. The 2-image gallery pairs images of unequal height (908 by 1050 and 908 by 1241). (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring))
- Observed: the impact stats are three plain lines of text at headline size in a list ("42% increase in sales per day" and two more), not cards. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring))
- Observed: awards are shown as two galleries of 6 square images each, every image with a one-line caption. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring))

**Work and Co, Aesop** (https://work.co/clients/aesop/, read 2026-11-19)
- Observed sequence: coloured client header (name plus a 41-character serif line); image; a stack of "info blocks", each a small label heading plus content (Visit link; a 6-item services list in serif type; Outcomes; Overview with two paragraphs of 169 and 272 characters; Awards with logos); then "3 Big Takeaways". (Source: [Work and Co, Aesop](https://work.co/clients/aesop/))
- Observed: "3 Big Takeaways" opens with a mini index listing "01. / 02. / 03." with titles. Each takeaway then starts with the number in its own narrow column (3 of 12 on medium, 4 of 12 on large screens) next to an h1-size title, and is followed by 2 to 4 labelled info blocks, each a short label ("Digital Extension", "Built to Scale") and one paragraph of 180 to 490 characters. (Source: [Work and Co, Aesop](https://work.co/clients/aesop/))
- Observed: the Outcomes block is a right-aligned label with oversized figures (for example "15%") each followed by a one-line caption in body text. (Source: [Work and Co, Aesop](https://work.co/clients/aesop/))

**Wolff Olins, Decathlon** (https://www.wolffolins.com/work/decathlon, read 2026-11-19)
- Observed: text and media are separated. The header carries the title, two metadata fields (Industry, What We Did), a "Download Project Images" link, a 51-character headline and the whole narrative (11 paragraphs of 91 to 924 characters with two h3 subheads). This text block appears twice in the HTML next to a "More Info" control. (Source: [Wolff Olins, Decathlon](https://www.wolffolins.com/work/decathlon))
- Observed: the body is a single `case-study` grid section with large gaps (`gap-16`, `gap-32` on large screens) containing only media: a mix of videos and images in landscape (3000 by 2000) and portrait (1500 by 2000), with no headings or captions between them. (Source: [Wolff Olins, Decathlon](https://www.wolffolins.com/work/decathlon))
- Observed: one client quote sits in the media stream, in a serif face, limited to 36 characters per line (`max-w-[36ch]`), with the attribution as a small caption prefixed by a dash. (Source: [Wolff Olins, Decathlon](https://www.wolffolins.com/work/decathlon))

**Order, AidKit** (https://order.design/project/aidkit, read 2026-11-19)
- Observed header: title in a 6-of-12 cell with three tags; a 269-character description; a full team credit list ("Collaborators") at the top, not the bottom. (Source: [Order, AidKit](https://order.design/project/aidkit))
- Observed: the body is 41 `layoutModule` blocks on a 12-column float grid. Widths in page order begin: 9 (right aligned), 8, 3 (right), 3, 8 (right), 4, 4, 4, 8 (right), 12, 6 + 6, 2 + 8 (right), 12, 9, 12, 12, 7 + 4 (right), 12, 4 + 7 (right), 12, 4 + 4 + 4, 12, 12, 8, 4 + 7 (right), 12, 8 + 3 (right), 12, 9, 12, 12, 12. Width counts: thirteen at 12, six at 4, six at 8, three at 9, three at 7, three at 3, two at 6, one at 2. (Source: [Order, AidKit](https://order.design/project/aidkit))
- Observed: text is minimal. Section intros are single paragraphs of 162 to 185 characters; 10 images carry captions of 19 to 148 characters; section labels are italic h2 words ("Graphic device"). Some captions are three-word fragments forming a sequence across consecutive images ("Through land and water." / "Through complex networks." / "Through technology."). (Source: [Order, AidKit](https://order.design/project/aidkit))

**Koto, Bolt** (https://koto.studio/projects/bolt, read 2026-11-19)
- Observed: header has title, a 26-character tagline, two mono uppercase tags (sector, year), and a two-paragraph intro (200 and 75 characters). An in-page index lists five chapter labels: Challenge, Strategy, Identity, Application, Outcome. (Source: [Koto, Bolt](https://koto.studio/projects/bolt))
- Observed: each chapter is a row with a top border on a 12-column grid (8 columns on mobile), with the label and text each spanning 6 columns. A chapter is a mono uppercase 11px label plus exactly one paragraph of 190 to 320 characters, then media. (Source: [Koto, Bolt](https://koto.studio/projects/bolt))
- Observed: media counts per chapter are uneven (1, 3, 7, 1) and frames use fixed aspect ratios in mixed sizes: 16:9 full rows (13 instances), 4:5 frames at half width (11), 1:1 tiles, and 5:3 rows (6). All frames have rounded corners and an off-black placeholder ground. (Source: [Koto, Bolt](https://koto.studio/projects/bolt))

**Collins, Figma** (https://www.wearecollins.com/case-studies/figma, read 2026-11-19)
- Observed: the page is five named sections: `gallery`, `meta`, `story`, `impact`, `complications`. The gallery is a video plus a carousel with an "Explore the gallery" control and both a `grid` and a `stack` view. Meta is a three-field definition list (Program, Industry, Stage) in a carousel. (Source: [Collins, Figma](https://www.wearecollins.com/case-studies/figma))
- Observed: the story section shows one 183-character opening statement with a `text-scroll-fill` class and a "Read the full story" card. The full text (13 paragraphs of 167 to 402 characters) and the credits (definition list: Collins team, client team, partner) live in a separate `storysheet`. (Source: [Collins, Figma](https://www.wearecollins.com/case-studies/figma))
- Observed: a `complications` section presents a named sub-topic (heading, 192-character body, 3 images, a link). (Source: [Collins, Figma](https://www.wearecollins.com/case-studies/figma))

**Clay, Discover** (https://clay.global/work/discover, read 2026-11-19)
- Observed sequence of named modules: `HeroSection` (title, 39-character subtitle, media); `ProjectInfo` (two intro paragraphs of 120 and 219 characters plus a 4-item services list in columns); then sections on a white ground: h2 plus one ~220-character paragraph with an `AccentLayout` (one square 2040 by 2040 image and two short side notes of 100 and 110 characters); h2 plus two paragraphs with a `VerticalLayout`; a `CarouselSection` with no text. (Source: [Clay, Discover](https://clay.global/work/discover))
- Observed: the ground then changes to black (`Section_black`) for the rest of the page: a `FullscreenSection` with `Sticky`, `Gradient` and `Caption` parts whose caption is one 87-character sentence set as a heading; a `GridLayout` with 3 media items under an h2 and a 124-character paragraph; a full-screen `MediaSection`; a closing h2 plus 267-character paragraph; next-case block. (Source: [Clay, Discover](https://clay.global/work/discover))

**Area 17, Fondation Cartier** (https://area17.com/clients/fondation-cartier, read 2026-11-19)
- Observed: opening headline spans 11 of 12 columns (9 on the widest breakpoint); the intro paragraph (349 characters) is 6 columns wide starting at column 4. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier))
- Observed: the body is 4 anchor sections built from typed blocks: `block-el-title` (4), `block-el-text` (8), `block-el-media` (3), `block-el-media-split` (5), `block-el-metrics` (2), plus 4 `GridMasonry` groups. Section headlines span 9 of 12 columns; body text blocks are 6 columns starting at column 4 (8 columns starting at 3 on tablet), each one paragraph of 298 to 413 characters. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier))
- Observed: split media uses a 6-column cell and a 6-column cell starting at column 7; one split is uneven (5 columns starting at column 8). Masonry groups mix video and still frames with different heights (1000 by 1250, 1000 by 1675, 1000 by 1195, 1000 by 1000). (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier))
- Observed: metrics are bare numerals in a dedicated numeral type style ("+400k", "+50%") with a one-line label, each item 4 of 12 columns (3 of 12 at the widest size), no card. A photo credit appears as a small `figcaption` under one media item. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier))

**Huge, LPGA** (https://www.hugeinc.com/case-study/lpga, read 2026-11-19)
- Observed sequence: title plus 77-character subtitle; "Overview." with three outcome lines in a wrapping flex row (44 to 60 characters each); "The key." with one 77-character bold statement; "The partnership." with an outbound link in a 3-column cell and five paragraphs (130 to 382 characters); an article body of five mini-chapters, each a two- or three-word h2 ending in a full stop ("Empower fandom.", "Game of numbers.") plus one paragraph of 95 to 218 characters in a 6-column cell with a 1920 by 1080 image; "The numbers." (Source: [Huge, LPGA](https://www.hugeinc.com/case-study/lpga))
- Observed: "The numbers." is three rounded cards on a light neutral ground: two with a large percentage and a one-line label ("65%", "75%"), the third with a sentence only and no figure. (Source: [Huge, LPGA](https://www.hugeinc.com/case-study/lpga))
- Observed column spans in the body: 6 starting at column 1 (5 times), 6 (5 times), 6 starting at 7, 7 starting at 4, 8, 5, 3, and full width (2 times). (Source: [Huge, LPGA](https://www.hugeinc.com/case-study/lpga))

**Metalab, Pitch** (https://www.metalab.com/work/pitch, read 2026-11-19)
- Observed (hero only): title; three definition lists side by side (Project Type, Stage, Deliverables); two hero images at 1920 by 1152. The rest of the page is rendered in the browser and was not in the served HTML. (Source: [Metalab, Pitch](https://www.metalab.com/work/pitch))

### Inferences
- Two families exist. Media-first: Pentagram, Wolff Olins, Collins and Order keep prose to a side panel, a sheet, or a header and let the body be a media stream punctuated by large statements or captions. Chaptered editorial: Koto, Area 17, Fantasy, Instrument, Clay and Huge use labelled chapters, each with one short paragraph and its own media arrangement.
- Across the chaptered pages the body paragraph is consistently short: roughly 190 to 530 characters, one paragraph per chapter (Koto 190 to 320; Area 17 298 to 413; Fantasy 470 to 530; Huge 95 to 218; Clay about 220). Instrument is the outlier at 795 and 874.
- Chapter headings come in two tiers on the same page: a tiny label (mono uppercase, eyebrow, or run-in "The Challenge:") plus a separate statement-size line. The label names the chapter; the statement carries the point.
- Pentagram's `masonry` plus `half` classes, and the blockquote's right-only padding, suggest the statements sit inside the media column flow as cells, not as full-width bands. Not confirmed visually.
- Wolff Olins duplicating the narrative next to "More Info", and Collins' `storysheet`, suggest the long text is an overlay or slide-out panel, so the default view is nearly all media. Not confirmed visually.
- Credits placement varies: top (Order), inside the story sheet (Collins), bottom metadata (Pentagram), absent on the page (Fantasy, Koto, Huge, Clay as read).

### Gaps
- Metalab body modules could not be read (client-rendered). Locomotive returned a bot challenge and was not bypassed. Ragged Edge, Ramotion, DIA and Ueno archive case pages were not read: no valid case URL was found in the served HTML within the call budget.
- No page was rendered, so exact pixel sizes, spacing values, hover and scroll behaviour, and mobile layouts are unverified.
- One page per studio was read. Whether each pattern is typical for that studio's other case studies is not confirmed.
- Work and Co's in-body images are lazy-loaded and were not in the HTML, so how media sits against the takeaway text is unknown. Whether this page is still actively maintained was not checked.

## 2. Non-box ways of presenting a list of points or features

### Takeaway
The studios read here almost never put a list of points into equal cards. They use ruled numbered rows with the number in its own narrow column, run-in labels with a large statement, plain large-type lines, labelled definition-style blocks, and short notes attached to a single image.

### Cited Findings
- Ruled numbered rows with an empty middle: Fantasy sets each of 4 objectives as a full-width row with a top hairline, number in 1 column, sentence in 5 columns starting at column 7. (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel), read 2026-11-19)
- Number as a column, followed by labelled sub-blocks: Work and Co puts "01." in a 3 to 4 column cell beside an h1-size takeaway title, then 2 to 4 blocks each made of a short label and one paragraph. A small index of the three takeaways precedes them. (Source: [Work and Co, Aesop](https://work.co/clients/aesop/), read 2026-11-19)
- Run-in label plus one large statement: Instrument's "The Challenge:", "Our Approach:", "The Impact:" are each a label and a 260 to 280 character statement at headline size, left aligned, with no supporting paragraph in the same module. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)
- Plain large-type lines for stats: Instrument lists three results as three lines of headline-size text under a lead-in sentence. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)
- Bare numerals with a one-line label, no container: Area 17 sets "+400k" and "+50%" in a numeral style over a label, each 3 to 4 columns wide. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Definition lists for metadata: Metalab (Project Type, Stage, Deliverables), Collins (Program, Industry, Stage, and credits) and Pentagram (Client, Sector, Discipline) use term and value pairs, not chips or cards. (Sources: [Metalab, Pitch](https://www.metalab.com/work/pitch); [Collins, Figma](https://www.wearecollins.com/case-studies/figma); [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank), read 2026-11-19)
- Side notes beside one image: Clay's `AccentLayout` pairs one square image with two short notes of about 100 characters. (Source: [Clay, Discover](https://clay.global/work/discover), read 2026-11-19)
- Media with a single sentence and a visually hidden heading: Fantasy's four feature notes are 65 to 140 characters each; the heading is only for assistive technology. (Source: [Fantasy, Art Basel](https://fantasy.co/work/art-basel), read 2026-11-19)
- Caption sequences as a list: Order spreads a three-part idea over three consecutive image captions of three or four words each. (Source: [Order, AidKit](https://order.design/project/aidkit), read 2026-11-19)
- Mini-chapters with two-word titles: Huge presents five features as h2 fragments ending in a full stop plus one short paragraph in half the grid, each with one 16:9 image. (Source: [Huge, LPGA](https://www.hugeinc.com/case-study/lpga), read 2026-11-19)
- Pull statements in the media flow: Pentagram places 7 heading-size sentences (129 to 192 characters) among 46 media items. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank), read 2026-11-19)
- Asymmetric two-column and offset rows: Order alternates 9-right, 8-left, 3-right, 2 + 8, 7 + 4 and 4 + 7 rows; Area 17 uses 6 + 6 and one 5-at-column-8 split; Huge uses 7 starting at column 4. (Sources: [Order, AidKit](https://order.design/project/aidkit); [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier); [Huge, LPGA](https://www.hugeinc.com/case-study/lpga), read 2026-11-19)
- Horizontal strips: Fantasy's stat slides have a fixed minimum width in a carousel; Area 17 has slide items sized 8, 5 and 4 columns of viewport width by breakpoint; Collins uses carousels for gallery, meta and impact. (Sources: [Fantasy, Art Basel](https://fantasy.co/work/art-basel); [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier); [Collins, Figma](https://www.wearecollins.com/case-studies/figma), read 2026-11-19)

### Inferences
- Sticky text with scrolling media (or the reverse) is likely in use at Clay (`FullscreenSection_Sticky`) and Fantasy (right-half text column with 96 to 120 unit gaps between notes next to absolutely positioned full media). Class names support this; it was not seen running.
- Collins' `text-scroll-fill` suggests the opening statement fills with colour word by word on scroll, turning one sentence into a paced moment.
- The common thread: a point is expressed as type on the page grid (number, label, sentence, rule), and a box is reserved for results figures only (Huge, Fantasy), if used at all.

### Gaps
- No inline annotated screens (callout lines or numbered hotspots on a UI screenshot) were found in the HTML of any page read. This may exist inside flattened images; it could not be detected.
- No overlapping-layer layouts were confirmed. Detecting overlap needs a rendered view.

## 3. How do they vary rhythm down a long page?

### Takeaway
Rhythm comes from changing three things between consecutive blocks: the width of the block on the 12-column grid, the type scale of the text (label, statement, body), and the ground colour. Every text-heavy block is followed by media, and full-width media recurs every few blocks as a rest.

### Cited Findings
- Width change as the main device: in Order's 41-module body no two consecutive rows repeat the same arrangement for long; a full 12-column image returns 13 times as a reset between narrower and offset rows (9, 8, 7 + 4, 4 + 4 + 4, 2 + 8). (Source: [Order, AidKit](https://order.design/project/aidkit), read 2026-11-19)
- Three text widths on one page: Area 17 sets headlines at 9 to 11 columns, body at a centred 6 columns, and metrics at 3 to 4 columns each. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Alternating statement and body modules with a video between each: Instrument's order is statement, video, body, gallery, statement, video, body, image, body, video, statement, video, quote. No two text modules are adjacent without media between them, except heading plus its own paragraph. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)
- Change of ground: Clay runs the first half on white sections and switches to black sections at the full-screen brand image, staying black to the end. (Source: [Clay, Discover](https://clay.global/work/discover), read 2026-11-19)
- Area 17 carries a behaviour named `InViewport UpdateBodyColor`, and Koto frames media on an off-black ground with ruled chapter dividers. (Sources: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier); [Koto, Bolt](https://koto.studio/projects/bolt), read 2026-11-19)
- Density change by chapter: Koto's chapters carry 1, 3, 7 and 1 media items, so a long image run (Application) sits between two short chapters. (Source: [Koto, Bolt](https://koto.studio/projects/bolt), read 2026-11-19)
- Statement cadence: Pentagram inserts a large sentence after 3, 2, 5, 7, 8, 5 media items (approximate from DOM order), an irregular interval. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank), read 2026-11-19)
- Mixed aspect ratios inside one stream: Wolff Olins alternates landscape 3:2 and portrait 3:4 media with very large gaps and no text; Koto mixes 16:9, 4:5, 1:1 and 5:3. (Sources: [Wolff Olins, Decathlon](https://www.wolffolins.com/work/decathlon); [Koto, Bolt](https://koto.studio/projects/bolt), read 2026-11-19)
- Third-party view: Creative Bloq's 2018 feature on how studios show work describes NB Studio's case studies as image-led with full-screen imagery and a single sparing paragraph of explanation. (Source: [Creative Bloq, "5 unusually effective ways design studios show work", Nick Carson, 16 March 2018](https://www.creativebloq.com/features/5-unusually-effective-ways-design-studios-show-work)). Only the first of five studios was retrievable; the article is older than the 2024 to 2026 window.
- Third-party view (from a search summary of the same Creative Bloq piece, not verified in the page text retrieved): alternating screen backgrounds are credited with making information feel bite-sized. (Source: [Creative Bloq](https://www.creativebloq.com/features/5-unusually-effective-ways-design-studios-show-work)). Treat as low confidence.

### Inferences
- A workable rule drawn from these pages: never place two blocks of the same type and width back to back; after any block with more than about 300 characters of text, the next block is media; after two or three partial-width blocks, the next is full width.
- A ground change is used once or twice per page as a chapter-level signal (Clay's white to black at the brand section), not per block.
- Fixed aspect-ratio frames (Koto) let rows of different counts keep a steady vertical rhythm, while free-height masonry (Area 17, Pentagram) trades that for texture.

### Gaps
- Actual spacing values between blocks were not measured.
- Whether Area 17's body colour changes during the Fondation Cartier page, and to what, is unverified.

## 4. How do they handle many UI screens?

### Takeaway
Among the pages read, many screens are handled by motion and grouping more than by big static grids: looping videos of flows, masonry groups of mixed-height frames, carousels or strips, and a separate "explore the gallery" view that keeps the main narrative short.

### Cited Findings
- Video in place of screen grids: Instrument's Oura page has 4 embedded videos and 3 inline clips against 3 still galleries; Fantasy's Art Basel body is almost entirely video figures. (Sources: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring); [Fantasy, Art Basel](https://fantasy.co/work/art-basel), read 2026-11-19)
- Masonry groups of tall frames: Area 17 has 4 `GridMasonry` groups; one holds a set of 1000 by 1675 portrait frames (phone-proportioned) with one 1000 by 1195, another holds nine or more 1000 by 1000 tiles mixing video and stills. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Looping media in split columns: Area 17 uses `MediaLooper` elements in 6-column halves. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Separate gallery mode: Collins offers "Explore the gallery" with grid and stack views, outside the story. (Source: [Collins, Figma](https://www.wearecollins.com/case-studies/figma), read 2026-11-19)
- Carousel without text between chapters: Clay has a `CarouselSection` flagged `noText`, and a 3-item `GridLayout` for icon and illustration boards. (Source: [Clay, Discover](https://clay.global/work/discover), read 2026-11-19)
- Unequal-height pairs: Instrument pairs two portrait page captures of different heights (1050 and 1241 tall at the same 908 width) in one gallery. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)
- Grouping by topic, with the group named by a caption: Order's image file sequence runs in named sets (upfront, identity, typography, system) and a caption introduces each set. (Source: [Order, AidKit](https://order.design/project/aidkit), read 2026-11-19)
- NN/g guidance (third party): final screenshots alone tell only part of the story; pair each visual with a caption that says what it shows and why it matters. (Source: [NN/g, "5 Steps to Creating a UX-Design Portfolio", Rachel Krause, 4 August 2019](https://www.nngroup.com/articles/ux-design-portfolios/))

### Inferences
- Phone screens appear as tall frames inside masonry or strips, where differing heights are a feature. Squaring them into equal tiles is not what these studios do.
- The grouping unit is a flow or topic with one caption for the group, not a caption per screen.
- A separate full gallery (Collins) is a way to show everything without lengthening the story; relevant where a project has dozens of screens.

### Gaps
- Whether screens are shown device-less on a tinted ground or inside device frames cannot be told from HTML; images are flattened. This needs a visual pass.
- No product-heavy page with a very large screen count (30 or more distinct UI screens) was successfully read; Metalab, the most relevant studio for that, is client-rendered.

## 5. How do they handle uneven counts (5 or 7 items) without a hole in a grid?

### Takeaway
They avoid equal-cell grids for variable counts. The observed tactics are: rows of mixed widths, masonry, horizontal carousels, stacked ruled rows, letting the last cell differ in kind, and deliberately leaving columns empty so a gap reads as intent.

### Cited Findings
- Mixed-width rows: Koto's 7-image chapter draws on full-width 16:9 frames and half-width 4:5 frames, so an odd count resolves as combinations of full rows and pairs. (Source: [Koto, Bolt](https://koto.studio/projects/bolt), read 2026-11-19)
- Rows that deliberately do not sum to 12: Order uses 7 + 4, 4 + 7, 2 + 8 and 8 + 3, and single blocks of 9, 8 or 3 aligned right, leaving 1 to 9 columns empty by design. (Source: [Order, AidKit](https://order.design/project/aidkit), read 2026-11-19)
- A size modifier on single items: Pentagram marks 3 of 46 media as `half` inside a masonry flow. (Source: [Pentagram, Alpha Bank](https://www.pentagram.com/work/alpha-bank), read 2026-11-19)
- Masonry: Area 17's groups hold 5 or more frames of different heights. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Carousel or strip: Fantasy's stat slides have a fixed minimum width, so any count works; Collins puts meta and impact in carousels. (Sources: [Fantasy, Art Basel](https://fantasy.co/work/art-basel); [Collins, Figma](https://www.wearecollins.com/case-studies/figma), read 2026-11-19)
- Stacked full-width ruled rows: Fantasy's 4 objectives and Instrument's 3 stat lines are one item per row, so count never creates a hole. (Sources: [Fantasy, Art Basel](https://fantasy.co/work/art-basel); [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)
- Last cell differs in kind: Huge fills a row of three result cards with two numeric cards and one text-only card. (Source: [Huge, LPGA](https://www.hugeinc.com/case-study/lpga), read 2026-11-19)
- Partial-width items that do not need to fill the row: Area 17's two metrics each take 3 to 4 of 12 columns and the remainder stays empty. (Source: [Area 17, Fondation Cartier](https://area17.com/clients/fondation-cartier), read 2026-11-19)
- Awards as even sets: Instrument shows 12 award tiles as two galleries of 6. (Source: [Instrument, Oura](https://www.instrument.com/work/oura-smart-ring), read 2026-11-19)

### Inferences
- A layout resolver can treat count as an input to a row recipe: 1 = full; 2 = pair or 7 + 5; 3 = full + pair or three ruled rows; 5 = full + pair + pair or pair + triple; 7 = full + pair + full + triple, and so on, choosing by aspect ratio. This recipe is derived from the Koto and Order evidence; neither studio documents such a rule.
- Empty columns are acceptable when alignment is consistent (always right aligned, or always starting at column 7). A hole reads as a mistake only inside an otherwise uniform grid.
- For text points, stacked rows beat a grid at any count.

### Gaps
- The exact arrangement Koto uses for its 7-image chapter (which images are full, which are paired) was not confirmed visually.
- No explicit studio statement or design-system documentation on handling odd counts was found.

## 6. What do juries and critics say makes a case-study page effective or weak?

### Takeaway
Reliable third-party guidance is thin and mostly about UX portfolios, not studio sites: NN/g says readers scan, so keep text short, pair every visual with a meaningful caption, and show impact and decisions, not only final screens. Awwwards scores design and usability far above content. No jury or critic commentary specific to studio case-study body layout was found.

### Cited Findings
- NN/g: hiring managers rarely read a portfolio word for word; case studies should be concise and scannable, broken up with visuals. (Source: [NN/g, "5 Steps to Creating a UX-Design Portfolio", Rachel Krause, 4 August 2019](https://www.nngroup.com/articles/ux-design-portfolios/))
- NN/g lists seven things a case study should cover: the problem, your role, how the solution was reached, whether it solved the problem, challenges including dropped concepts, effect on users and the business, and what was learned. (Source: [NN/g, Krause 2019](https://www.nngroup.com/articles/ux-design-portfolios/))
- NN/g names weak patterns: only final UI and screenshots, overly long descriptions, flashy templates that distract from content. It recommends a consistent template across projects and captions that explain what each image shows and why it matters. (Source: [NN/g, Krause 2019](https://www.nngroup.com/articles/ux-design-portfolios/))
- NN/g on web reading: in Nielsen's study 79% of test users always scanned a new page and 16% read word by word. Recommended formatting: highlighted keywords, meaningful subheadings, bulleted lists, one idea per paragraph, conclusion first, half the word count of conventional writing. (Source: [NN/g, "How Users Read on the Web", Jakob Nielsen, 1997](https://www.nngroup.com/articles/how-users-read-on-the-web/))
- Same study: measured usability improved 58% with concise text, 47% with a scannable layout, 27% with objective language instead of promotional language, and 124% with all three combined. (Source: [NN/g, Nielsen 1997](https://www.nngroup.com/articles/how-users-read-on-the-web/))
- Awwwards scoring weights: design 40%, usability 30%, creativity 20%, content 10%. Each site goes to at least 18 jury members and the 3 scores furthest from the average are removed; 6.5 or higher earns an Honorable Mention; the Developer Award needs more than 7. (Source: [Awwwards, About evaluation](https://www.awwwards.com/about-evaluation/), read 2026-11-19)
- Creative Bloq (2018) praises NB Studio for image-led case studies with full-screen imagery and one sparing paragraph of explanation. (Source: [Creative Bloq, Nick Carson, 16 March 2018](https://www.creativebloq.com/features/5-unusually-effective-ways-design-studios-show-work))
- Lower-confidence claims seen only in search-result summaries, not opened and verified: a design-portfolio guide advises treating a case study like a magazine spread with images beside the relevant copy ([Format Magazine](https://www.format.com/magazine/resources/design/how-to-write-design-case-study)); a blog names "a large wall of text at the top followed by dozens of images stacked below" as a common failure ([source as listed in search](https://monotonomo1-project.pages.dev/journal/case-study-layouts-that-convert), unknown authority); a UX agency blog warns that long-scroll pages with heavy media slow loading and that heavy text loses readers before the key message ([Wavespace](https://www.wavespace.agency/blog/problem-and-solution-long-scroll-single-page-websites)). These are vendor or blog sources; use with caution.

### Inferences
- The studio pages match the NN/g scanning advice closely: one idea per short paragraph, descriptive labels, results stated as figures, statement-size sentences that carry the argument for a reader who only scans.
- Two of the studios (Pentagram, Wolff Olins) go against NN/g's "do not show only final work" advice by showing almost only finished media. NN/g's advice targets job-seeking individuals, where proof of process matters; studio sites sell outcome and taste. The guidance should not be transferred one to one.
- Awwwards' 10% weight for content means an award is weak evidence that a case study's writing or structure communicates well.
- NN/g's 27% gain for objective over promotional language supports plain, factual case-study copy.

### Gaps
- No Brand New, It's Nice That, SiteInspire or Smashing Magazine piece that critiques the body layout of studio case-study pages was found. Smashing's portfolio material surfaced in search is from 2009 to 2013 and concerns whole-site patterns.
- No Awwwards jury commentary on individual case-study pages was found; the evaluation page gives weights only.
- The NN/g video "7 Portfolio Mistakes That Could Hurt Your UX Job Search" (https://www.nngroup.com/videos/7-portfolio-mistakes/) was found but not opened, so its seven points are not recorded here.
- The NN/g reading study dates from 1997; the portfolio article from 2019. Neither is from the 2024 to 2026 window, though both remain on NN/g's site as current guidance.
- The remaining four studios in the Creative Bloq article were cut off in retrieval.
