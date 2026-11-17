---
title: Case Study Media Layout
impact: HIGH
impactDescription: case study pages mix ratios, hide detail and lose reading order without these limits
tags: kits, media, case-study
---

## Case Study Media Layout

Multi-screen composites are baked into one image, not assembled in CSS. A product is shown as one overview plus two to four detail views cropped with CSS masks, each mask with a focal point. A page uses at most two or three aspect ratio families. Sticky text beside scrolling media is only at the 1200 tier. Full bleed media respects the safe-area insets. Reading order in the DOM matches the visual order. A before and after slider ships only with a button and keyboard alternative; otherwise it is not used. Long pages use the chapter nav block (`references/media-and-widgets.md`).

**Incorrect:**

```css
.case-media { position: sticky; } /* at every width */
.compare { /* drag only */ }
```

**Correct:**

```css
@media (min-width: 1200px) { .case-media { position: sticky; } }
.compare button { /* plus arrow keys on the handle */ }
```

Source: wugweb-work research on case-study media (2026-11-17); layout-shell.md.
