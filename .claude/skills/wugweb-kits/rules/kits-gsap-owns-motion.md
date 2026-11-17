---
title: GSAP Owns Motion, One Owner Per Property
impact: HIGH
impactDescription: two owners of one property cause jitter and fights
tags: kits, motion
---

## GSAP Owns Motion, One Owner Per Property

Animation runs through GSAP with data-reveal, data-scroll and data-reveal-delay. A property has one owner: no CSS transition and GSAP tween on the same property. Scroll in is opacity and translateY only, transform based. In the hero (the first section in main) the headline group, h1 and eyebrow, starts at a 0.4s delay and everything else (supporting copy, buttons) at 0.9s; sections below reveal on scroll with no added delay, and an explicit data-reveal-delay wins (owner, 2026-11-17; `revealDelay` in scroll-animations.ts). All of it is behind prefers-reduced-motion; nav and hover use the spring (layout-shell.md, Motion). All loops stop under reduced motion. Loops stay 15 seconds or less and a loop over 5 seconds carries a pause control and is not hidden from assistive tech; a loop of 5 seconds or less with no control stays hidden. Owner confirmed 2026-11-17.

**Incorrect:**

```html
.card { transition: transform .3s; }
/* and gsap.to(".card", { y: -8 }) */
```

**Correct:**

```html
<div class="card" data-reveal></div>
```

Source: components.md, motion. The motion feel is owned by `wugweb-brand-os`; kits holds the timings and the check.
