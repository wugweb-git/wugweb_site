---
title: Media Viewer Contract
impact: HIGH
impactDescription: a viewer that traps nothing or ignores back strands keyboard and phone users
tags: kits, media, a11y
---

## Media Viewer Contract

A full-screen media viewer traps focus while open and returns it to the opener on close, allows pinch zoom, closes on the browser back action, and gives every item a deep link that opens the viewer at that item.

**Incorrect:**

```html
<div class="viewer"> <!-- no focus trap, no history entry, touch-action: none --></div>
```

**Correct:**

```html
<dialog class="viewer" aria-label="Project images"> <!-- focus trapped; history.pushState('#img-3'); popstate closes --></dialog>
```

Source: wugweb-work research on case-study media (2026-11-17).
