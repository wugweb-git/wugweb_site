---
title: Retired Shell Values Never Return
impact: HIGH
impactDescription: retired values reappear from old docs and Framer references
tags: shell, tokens
---

## Retired Shell Values Never Return

These are retired: content max 1280, desktop gutter 44, desktop breakpoint 1280, flat section tokens 40, 48, 64, 80, flat gap 16, a 12 column switch at 1024, fluid header padding, header 110, 118, 118, nav z index 50. Any of them in a shell context is a blocker.

**Incorrect:**

```css
.wrap { max-width: 1280px; }
.site-header { z-index: 50; }
```

**Correct:**

```css
.wrap { /* 1200 via the shell */ }
.site-header { z-index: var(--layer-nav); }
```

Source: layout-shell.md, history.
