---
title: Media Is Poster First
impact: HIGH
impactDescription: autoplaying or eagerly loaded video costs bytes and LCP before anyone asks for it
tags: kits, media, performance
---

## Media Is Poster First

A video ships `preload="none"` and a `poster`, and downloads only when opened or when it scrolls near (play and pause by IntersectionObserver). A cover video without a poster paints empty. At most one or two images per page are high priority; on a video hero the start frame is the LCP image. Autoplay is allowed only for muted decorative loops, which still obey the loop rule (15s or less, a pause control over 5s, stopped under reduced motion).

**Incorrect:**

```html
<video src="clip.mp4" autoplay loop></video>
```

**Correct:**

```html
<video preload="none" poster="clip-poster.webp" muted playsinline data-src="clip.mp4"></video>
```

Source: widgets.md, Poster-First Video Thumb; wugweb-work media research.
