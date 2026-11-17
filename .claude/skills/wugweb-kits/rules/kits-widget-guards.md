---
title: Widget Guards
impact: HIGH
impactDescription: each guard prevents a known break: stretched media, poking corners, sideways scroll or a fight over opacity
tags: kits, widgets, motion
---

## Widget Guards

Dim with `filter: brightness()`, never `opacity`, because GSAP owns opacity. A 100vw bleed needs `overflow: clip` on its section and breaks inside any ancestor with transform, filter or contain. A rounded card with square media carries `overflow: hidden`. A ratio tile in a flex row needs `align-items: flex-start`, or stretch overrides the ratio. Assemble motion is transform only. The drag echo is skipped under reduced motion. Resting `%` positions are clamped into their field once widths are known.

**Incorrect:**

```css
.tile.dim { opacity: .4; }
.logo-row { display: flex; } /* stretch breaks 16/9 */
```

**Correct:**

```css
.tile.dim { filter: brightness(.4); }
.logo-row { display: flex; align-items: flex-start; }
```

Source: widgets.md.
