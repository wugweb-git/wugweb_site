---
title: Images Always Carry Alt
impact: HIGH
impactDescription: a missing alt fails assistive tech and search
tags: label, a11y
---

## Images Always Carry Alt

Every img has an alt attribute. Informative images describe the content. Decorative images use an empty alt, and decorative muted loops are hidden from assistive tech with aria-hidden. A loop that carries a pause control is not hidden.

**Incorrect:**

```html
<img src="/assets/x.webp">
```

**Correct:**

```html
<img src="/assets/x.webp" alt="Checkout flow on mobile">
```

Source: layout-shell.md, images.
