---
title: Grid Gaps Use the Grid Gap Token
impact: HIGH
impactDescription: a section token as a gap moves the grid when the section rhythm changes
tags: shell, tokens
---

## Grid Gaps Use the Grid Gap Token

The column gap is 16, 24, 32 through --grid-gap. Section tokens set vertical rhythm between sections, not gaps inside a grid. Reusing one couples two unrelated scales.

**Incorrect:**

```css
.grid { gap: var(--space-section-sm); }
```

**Correct:**

```css
.grid { gap: var(--grid-gap); }
```

Source: layout-shell.md, grid.
