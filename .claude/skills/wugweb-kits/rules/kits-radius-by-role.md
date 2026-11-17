---
title: Radius Follows Role
impact: MEDIUM
impactDescription: mixed radii make the same role look different
tags: kits, tokens
---

## Radius Follows Role

Buttons use --radius-sm, chips --radius-full, cards --radius-lg, panels --radius-2xl.

**Incorrect:**

```css
.btn { border-radius: var(--radius-full); }
```

**Correct:**

```css
.btn { border-radius: var(--radius-sm); }
```

Source: components.md, radius.
