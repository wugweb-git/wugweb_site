---
title: Skip Link, Main Landmark, Scroll Offset
impact: HIGH
impactDescription: keyboard users cannot bypass the sticky header without them
tags: label, a11y
---

## Skip Link, Main Landmark, Scroll Offset

Each page has a skip link first, one main landmark, and an anchor scroll offset equal to the sticky header height so targets are not hidden.

**Incorrect:**

```html
<body><header>...</header><div>content</div></body>
```

**Correct:**

```html
<body><a href="#main" class="skip">Skip to content</a><header>...</header><main id="main">...</main></body>
```

Source: layout-shell.md, landmarks.
