---
title: Mobile Menu Required Behaviour
impact: HIGH
impactDescription: a menu that leaks scroll or moves its toggle breaks the phone experience, which is the PWA
tags: shell, mobile, motion
---

## Mobile Menu Required Behaviour

The menu covers the screen with 100dvh and a 100svh fallback minus safe areas, scrolls internally with overscroll-behavior contain, locks page scroll by position fixed on body and restores the position, keeps the toggle at its closed coordinates, holds one left edge, puts links at the top and contact and legal at the bottom, and opens with the nav spring. Links fade and rise in with a stagger of about 40ms after the card opens (open in code as of 2026-11-17: `.site-links` swaps display with no tween).

**Incorrect:**

```css
.menu { height: 100vh; }
body.menu-open { overflow: hidden; }
```

**Correct:**

```css
.menu { height: 100svh; height: 100dvh; overflow-y: auto; overscroll-behavior: contain; }
body.menu-open { position: fixed; } /* scroll position restored on close */
```

Source: layout-shell.md, Mobile menu.
