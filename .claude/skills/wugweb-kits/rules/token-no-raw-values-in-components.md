---
title: No Raw Values Inside Components
impact: CRITICAL
impactDescription: every raw value is a change the system cannot make
tags: tokens, components, audit
---

## No Raw Values Inside Components

A hex, a px, an rgba typed into a component is a value with no home. Nothing can
find it, so nothing can rebrand it, theme it, or scale it. One raw value is a
typo; two hundred is why the redesign was quoted at six weeks.

This is the first check of any audit and the only one worth failing a build over,
because every other rule assumes values are addressable.

**Incorrect:**

```css
.card {
  background: #f4f4f5;
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

**Correct:**

```css
.card {
  background: var(--color-surface-subtle);
  padding: var(--space-inset-md);
  border-radius: var(--radius-surface);
  box-shadow: var(--shadow-raised);
}
```

The exceptions are narrow and worth naming so they do not become loopholes:
`0`, `1px` hairline borders, `100%`, `auto`, and values inside the token
definitions themselves. Everything else resolves to a token.
