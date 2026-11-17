---
title: Safe Areas and the First Screen
impact: MEDIUM
impactDescription: content under the notch or a hero action below the fold loses the first view
tags: shell, mobile, pwa
---

## Safe Areas and the First Screen

Use viewport-fit=cover with env(safe-area-inset-*) through the --safe-* tokens on the nav, dvh with an svh fallback, and the maskable icon. On a 390 x 844 phone the headline, subhead and primary action sit on the first screen, not under the cookie banner.

**Incorrect:**

```html
<meta name="viewport" content="width=device-width">
```

**Correct:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Source: layout-shell.md, PWA and safe areas, Hero.
