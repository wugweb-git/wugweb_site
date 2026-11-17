---
title: Card Lists Are Lists
impact: MEDIUM
impactDescription: a div grid of cards hides the item count from assistive tech
tags: label, a11y
---

## Card Lists Are Lists

A set of cards is a list. Use ul and li so the count and position are announced.

**Incorrect:**

```html
<div class="cards"><div class="card">...</div></div>
```

**Correct:**

```html
<ul class="cards"><li class="card">...</li></ul>
```

Source: layout-shell.md, labelling.
