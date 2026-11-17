---
title: Icons Use currentColor And Local Files
impact: MEDIUM
impactDescription: hotlinked or fixed-colour icons break theming and add a third-party dependency
tags: kits, icons
---

## Icons Use currentColor And Local Files

UI icons are inline SVG with `currentColor`, 16px by default. Never hotlink an icon CDN. Icons shown in content (toolkits, stacks) come from the Sanity `tech-stack` taxonomy through `iconPath` and `assetUrl()`, never a file picked by hand.

**Incorrect:**

```html
<img src="https://cdn.example-icons.com/arrow.svg">
<svg fill="#f4f4f4">...</svg>
```

**Correct:**

```html
<svg width="16" height="16" fill="currentColor" aria-hidden="true">...</svg>
```

Source: icons.md, Icon Usage Rules.
