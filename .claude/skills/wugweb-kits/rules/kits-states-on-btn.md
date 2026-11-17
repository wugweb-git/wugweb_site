---
title: States Live on .btn
impact: MEDIUM
impactDescription: state styles scattered across pages drift
tags: kits, components
---

## States Live on .btn

Hover, active, focus-visible and disabled are defined once on .btn. Doc and code currently disagree on the focus outline: the doc says --focus-primary, the code uses var(--neutral-3). That is a finding, not fixed here.

**Incorrect:**

```css
.cta:hover { background: #333; }
```

**Correct:**

```css
.btn:hover { /* defined once on .btn */ }
```

Source: components.md, buttons.
