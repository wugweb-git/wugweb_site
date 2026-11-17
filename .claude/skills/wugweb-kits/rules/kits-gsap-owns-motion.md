---
title: GSAP Owns Motion, One Owner Per Property
impact: HIGH
impactDescription: two owners of one property cause jitter and fights
tags: kits, motion
---

## GSAP Owns Motion, One Owner Per Property

Animation runs through GSAP with data-reveal, data-scroll and data-reveal-delay. A property has one owner: no CSS transition and GSAP tween on the same property. All loops stop under reduced motion. Loops stay 15 seconds or less and a loop over 5 seconds carries a pause control.

**Incorrect:**

```html
.card { transition: transform .3s; }
/* and gsap.to(".card", { y: -8 }) */
```

**Correct:**

```html
<div class="card" data-reveal></div>
```

Source: components.md, motion.
