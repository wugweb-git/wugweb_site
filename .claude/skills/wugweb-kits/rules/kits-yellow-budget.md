---
title: Yellow Is Accent Only, At Most 10%
impact: HIGH
impactDescription: yellow overuse removes its signal
tags: kits, brand
---

## Yellow Is Accent Only, At Most 10%

Yellow is an accent and a resting fill on brand buttons only, at most 10% of a page. The final CTA stays yellow by owner decision.

**Incorrect:**

```css
.section-bg { background: var(--color-yellow); }
```

**Correct:**

```css
.btn-solid { background: var(--color-yellow); }
```

Source: components.md, colour.
