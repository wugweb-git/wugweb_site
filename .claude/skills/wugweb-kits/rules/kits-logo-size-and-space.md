---
title: Logo Minimum Size And Clear Space
impact: MEDIUM
impactDescription: a logo below the floor or crowded by other elements loses its mark
tags: kits, brand, logo
---

## Logo Minimum Size And Clear Space

Kits measures two sizes. The logo is never shown below 40px high (`--nav-logo-height`), the nav logo size and the floor. It keeps clear space on every side equal to the rendered height of the mark, so 40px at 40px. Values in `references/component-sizes.md`. The logo rules and the logo checks (files, tones, ground) are owned by `wugweb-brand-os`: `.claude/skills/wugweb-brand-os/references/visual-os/art-direction.md`, Logo section. Kits holds the sizes and checks only those.

**Incorrect:**

```css
.footer-logo { height: 28px; margin: 4px; }
```

**Correct:**

```css
.footer-logo { height: var(--nav-logo-height); margin: var(--nav-logo-height); }
```

Source: wugweb-brand-os art-direction.md (owner, 2026-11-17).
