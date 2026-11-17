---
title: Yellow Is Accent Only, At Most 10%
impact: HIGH
impactDescription: yellow overuse removes its signal
tags: kits, brand
---

## Yellow Is Accent Only, At Most 10%

Yellow is an accent and a resting fill on brand buttons only, at most 10% of a page. The final CTA stays yellow by owner decision. Yellow is the one brand colour. Purple, green and orange are allowed as pillar colours, pillar glow is an allowed exception to the shadow and blur token rules, and black is the default canvas, light only where the owner says (wugweb-brand-os rulings, 2026-11-17).

**Incorrect:**

```css
.section-bg { background: var(--color-yellow); }
```

**Correct:**

```css
.btn-solid { background: var(--color-yellow); }
```

Source: components.md, colour.
