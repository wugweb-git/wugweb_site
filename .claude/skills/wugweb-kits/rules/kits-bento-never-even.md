---
title: A Bento Never Resolves Into an Even Grid
impact: MEDIUM
impactDescription: an even grid removes the hierarchy the bento exists for
tags: kits, layout
---

## A Bento Never Resolves Into an Even Grid

A bento keeps tiles of different spans at every tier. If the tiles collapse to equal cells, use the grid block instead. Tile minimum height is --bento-min.

**Incorrect:**

```css
.bento { grid-template-columns: repeat(3, 1fr); }
```

**Correct:**

```css
.bento { grid-template-columns: repeat(12, 1fr); }
.bento .tile-wide { grid-column: span 6; min-height: var(--bento-min); }
```

Source: components.md, bento.
