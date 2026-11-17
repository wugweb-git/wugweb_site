---
title: Animated Blocks Are Linted
impact: MEDIUM
impactDescription: animated blocks hide the most motion clashes
tags: kits, motion
---

## Animated Blocks Are Linted

Service Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map and any block marked "Animated block" are checked for CSS transitions and tweens on the same property, and for reduced motion handling.

**Incorrect:**

```text
Animated block with a transition on transform and a GSAP y tween.
```

**Correct:**

```text
Animated block: GSAP owns transform; CSS owns colour only.
```

Source: components.md, animated blocks.
