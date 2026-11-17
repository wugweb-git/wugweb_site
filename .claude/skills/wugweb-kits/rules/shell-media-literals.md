---
title: Media Query Literals And .98
impact: HIGH
impactDescription: an off-list or overlapping breakpoint leaves widths matching neither side or a stray step
tags: shell, breakpoints
---

## Media Query Literals And .98

Media queries use only the literals 480, 640, 768, 1024 and 1200. Going down uses max-width at .98 below a step (639.98, 767.98, 1023.98), because viewport widths can be fractional and `max-width: 640px` beside `min-width: 640px` matches both. There is no step below 480. Any other value, such as 600, is a finding.

**Incorrect:**

```css
@media (min-width: 600px) { .bento { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .nav { display: none; } }
```

**Correct:**

```css
@media (min-width: 640px) { .bento { grid-template-columns: 1fr 1fr; } }
@media (max-width: 639.98px) { .nav { display: none; } }
```

Source: breakpoints.md; layout-shell.md, Breakpoints.
