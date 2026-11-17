---
title: Filters Are Toolbars Inside the Grid
impact: MEDIUM
impactDescription: a filter wrapped as a section adds a spurious landmark and padding
tags: shell, a11y
---

## Filters Are Toolbars Inside the Grid

A filter row is a toolbar that sits inside the grid it controls. Making it a section gives it section padding and a name it does not need.

**Incorrect:**

```html
<section class="filters">...</section>
```

**Correct:**

```html
<div class="grid">
  <div role="toolbar" aria-label="Filter work">...</div>
</div>
```

Source: layout-shell.md, filters.
