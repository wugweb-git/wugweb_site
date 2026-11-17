---
title: Every Section Has an Id and a Name
impact: CRITICAL
impactDescription: an unnamed section is invisible to landmarks, links and tests
tags: label, a11y
---

## Every Section Has an Id and a Name

Each top level section carries an id for anchors and an accessible name from aria-labelledby or aria-label. Measured 2026-11-16: 99 of 99 sections named on the site, 6 sections on /work/[slug] without an id.

**Incorrect:**

```html
<section class="bento">...</section>
```

**Correct:**

```html
<section id="work-bento" aria-labelledby="work-bento-h">
  <h2 id="work-bento-h">Selected work</h2>
</section>
```

Source: layout-shell.md, labelling.
