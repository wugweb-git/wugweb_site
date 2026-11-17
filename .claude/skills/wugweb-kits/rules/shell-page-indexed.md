---
title: Every Page Is Indexed
impact: HIGH
impactDescription: missing lang, landmarks or scroll flow break navigation and anchors
tags: shell, a11y
---

## Every Page Is Indexed

Every route carries html lang, a skip link to #main, one main named by the page title, header and footer landmarks, one h1 inside main, main[data-scroll-flow] listing the section ids in order with data-scroll-index on each top level section, and scroll-margin-top equal to --header-height on sections.

**Incorrect:**

```html
<html><body><div class="page">...</div></body></html>
```

**Correct:**

```html
<html lang="en"><body><a href="#main">Skip to content</a><header>...</header>
<main id="main" tabindex="-1" aria-label="Work" data-scroll-flow="hero work-grid">
  <section id="hero" data-scroll-index="1">...</section>
</main><footer id="site-footer" aria-label="Site footer">...</footer></body></html>
```

Source: layout-shell.md, Canvas, every page is indexed.
