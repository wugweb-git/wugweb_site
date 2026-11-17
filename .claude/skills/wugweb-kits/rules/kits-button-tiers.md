---
title: Three Button Tiers, Sized by Class
impact: HIGH
impactDescription: one off button CSS creates silent variants
tags: kits, components
---

## Three Button Tiers, Sized by Class

Tiers are .btn-solid (brand), .btn (primary) and .btn-ghost. Size and width come from .btn-sm, .btn-lg and .btn-block. Never write border-radius, size or width on a variant in component CSS.

**Incorrect:**

```html
.hero .btn { width: 220px; border-radius: 6px; }
```

**Correct:**

```html
<a class="btn btn-lg btn-block">Start</a>
```

Source: components.md, buttons.
