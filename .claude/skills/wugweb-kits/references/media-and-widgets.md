# Media and widgets

Detail behind `kits-media-poster-first`, `kits-widget-guards`, `kits-case-media-layout` and `kits-media-viewer`. Sources: `kits_design_system/docs/widgets.md` and wugweb-work's read of the old case-study media research (2026-11-17). Media rules from the standing block still hold: aspect ratio is never changed, masks are allowed, no uploads, no sound.

## Video

| Rule | Value |
|---|---|
| Load | `preload="none"`, `poster` always, source in `data-src` |
| Play | IntersectionObserver play and pause; 0 video bytes on load |
| Autoplay | only muted decorative loops |
| Loop length | 15s or less; over 5s gets a pause control and is not `aria-hidden`; all loops stop under reduced motion |
| Hero | the start frame is the LCP image |
| Priority | at most one or two high-priority images per page |

Measured 2026-11-17: of 61 Service Spotlight Panel clips in R2, 35 are over 5s and 12 over 15s (longest 81.5s). The panel has no pause control yet.

## Widget guards

- Dim with `filter: brightness()`; GSAP owns `opacity`.
- `100vw` bleed: `overflow: clip` on the section; breaks inside an ancestor with transform, filter or contain.
- Rounded card holding square media: `overflow: hidden`.
- Ratio tile in a flex row: `align-items: flex-start`; size the logo as a share of the tile, never a px cap.
- Tile `flex: 0 0 auto`; shrink 0 is load-bearing with an explicit min-height.
- Assemble grid: transform only, the parent clips, `data-assemble-static` children stay still, off under reduced motion.
- Drag echo: about 6 nodes at most, skipped under reduced motion.
- Resting `%` positions are clamped into the field once real widths are known.
- Audit overflow with element rects, not `scrollHeight - clientHeight` (over-scale and scrims inflate it).

## Case-study media

- Multi-screen composites are baked into one image.
- One overview plus two to four detail views, cropped by CSS masks, each with a focal point (`object-position` or mask position).
- At most two or three aspect ratio families per page.
- Sticky text beside scrolling media only at the 1200 tier; stacked below it.
- Full bleed media pads with `--safe-left` and `--safe-right`.
- DOM order is reading order; no `order` or grid placement that reorders meaning.
- Before and after slider: a real button to toggle and arrow keys on the handle, or not used.

## Viewer

Focus trapped while open and returned to the opener; pinch zoom allowed (no `touch-action: none` on the image); the back action closes it (a history entry on open, `popstate` closes); every item has a deep link that opens the viewer at that item.

## Chapter nav block (specified, not built)

`wugweb-work` refers to a chapter nav; the block catalogue has none. Spec until it is built:

- A `nav` with `aria-label="Chapters"`, a list of links to section ids on the page.
- Sticky at the 1200 tier beside the content; a horizontal scrolling row under the header below 1200, inside the shell, never wider than the nav.
- The current chapter is marked with `aria-current="true"`, set on scroll by IntersectionObserver.
- Scroll offset under the sticky header comes from the header formula, never a literal.
- Chips use `--radius-full`; no yellow.

When it is built, its block doc goes in `kits_design_system/docs/blocks/` (`kits-block-docs-home`).
