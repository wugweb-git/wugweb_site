---
title: Nothing Below the Section Sets a Page Gutter
impact: HIGH
impactDescription: a second gutter doubles the margin and breaks alignment
tags: shell, layout
---

## Nothing Below the Section Sets a Page Gutter

One element owns the page gutter. Setting padding-inline from --shell-gutter on a card or a grid inside the content box pushes it off the column.

**Incorrect:**

```css
.card-grid { padding-inline: var(--shell-gutter); }
```

**Correct:**

```css
.card-grid { /* no page gutter here; .wrap or the section owns it */ }
```

Source: layout-shell.md, gutter.
