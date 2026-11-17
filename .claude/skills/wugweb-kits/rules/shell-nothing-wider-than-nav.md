---
title: No Block Is Wider Than the Nav Unless Full Bleed
impact: MEDIUM
impactDescription: a block wider than the nav breaks the edge alignment of the page
tags: shell, layout
---

## No Block Is Wider Than the Nav Unless Full Bleed

The nav inner container caps at 1280 and the content box at 1200. A block that is not full bleed must not exceed the nav width.

**Incorrect:**

```css
.stat-band { max-width: 1440px; }
```

**Correct:**

```css
.stat-band { /* inside .wrap, 1200 */ }
```

Source: layout-shell.md, nav inner.
