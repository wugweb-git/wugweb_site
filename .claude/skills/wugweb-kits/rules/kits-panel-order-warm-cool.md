---
title: Pillar Panels Alternate Warm And Cool
impact: MEDIUM
impactDescription: two similar pillar colours side by side lose the contrast between panels
tags: kits, colour, pillars
---

## Pillar Panels Alternate Warm And Cool

Wherever the six pillars appear in sequence (the `/services` sticky panels, the homepage pillars), the order is Strategy, Engineering, Brand, Growth, Operations, Experience, so warm and cool alternate and similar colours never touch. All six pillar colours stand (owner, 2026-11-17).

**Incorrect:**

```js
const order = ['strategy','brand','experience','engineering','growth','operations']
```

**Correct:**

```js
const order = ['strategy','engineering','brand','growth','operations','experience']
```

Source: service-colors.md, Panel Order.
