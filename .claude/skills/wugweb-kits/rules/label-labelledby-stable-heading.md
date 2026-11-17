---
title: aria-labelledby Points to a Heading That Always Renders
impact: HIGH
impactDescription: a dangling reference leaves the section unnamed
tags: label, a11y
---

## aria-labelledby Points to a Heading That Always Renders

aria-labelledby must name a heading present on every render. If the heading is conditional, use aria-label or a screen reader only h2.

**Incorrect:**

```html
<section aria-labelledby="maybe-h">{show && <h2 id="maybe-h">Title</h2>}</section>
```

**Correct:**

```html
<section aria-label="Selected work">...</section>
```

Source: layout-shell.md, labelling.
