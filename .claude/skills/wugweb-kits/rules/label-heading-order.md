---
title: One h1, No Skipped Levels
impact: HIGH
impactDescription: a broken outline misleads screen reader users and search engines
tags: label, a11y, seo
---

## One h1, No Skipped Levels

Each page has one h1 and levels never skip. Where a section has no visible heading, add a screen reader only h2. Measured 2026-11-16: one h1 on every route.

**Incorrect:**

```html
<h1>A</h1><h4>B</h4>
```

**Correct:**

```html
<h1>A</h1><h2>B</h2>
```

Source: layout-shell.md, headings.
