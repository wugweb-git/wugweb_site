---
title: No Max Width on a Section
impact: HIGH
impactDescription: a capped section breaks the full bleed background and the shell
tags: shell, layout
---

## No Max Width on a Section

The section owns the gutter and spans the page. The content box inside it owns the 1200 max width. A max-width on the section narrows its background and stops the gutter from doing its job.

**Incorrect:**

```css
.section { max-width: 1200px; margin-inline: auto; }
```

**Correct:**

```css
.section { padding-inline: var(--shell-gutter); }
.wrap { /* content box owns the cap */ }
```

Source: layout-shell.md, section and content.
