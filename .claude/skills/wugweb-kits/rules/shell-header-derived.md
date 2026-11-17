---
title: Header Height Is Derived, Never Set
impact: HIGH
impactDescription: a literal header height drifts from the nav bar and buttons
tags: shell, tokens
---

## Header Height Is Derived, Never Set

Header height is --nav-height plus twice --header-pad-block. The bar is 44 plus twice 12 = 68, the header 68 plus twice 20 = 108, 100 on mobile. Setting it by hand breaks the chain.

**Incorrect:**

```css
.site-header { height: 108px; }
```

**Correct:**

```css
.site-header { height: var(--header-height); }
```

Source: layout-shell.md, header formula.
