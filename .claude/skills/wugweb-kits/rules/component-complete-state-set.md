---
title: Ship the Whole State Set
impact: HIGH
impactDescription: missing states are re-invented per screen, inconsistently
tags: components, states, accessibility
---

## Ship the Whole State Set

A component that only defines `default` and `hover` forces every consumer to
invent disabled, loading, focus and error themselves. They will invent them
differently, and the focus one they will simply omit — which is how keyboard
users lose the product.

Define the set once, in the component, from tokens. Then the spec sheet lists
real states rather than aspirational ones.

**Incorrect:**

```css
.button { background: var(--color-action-primary); }
.button:hover { background: var(--color-action-primary-hover); }
/* focus, active, disabled, loading: left to callers */
```

**Correct:**

```css
.button { background: var(--color-action-primary); }
.button:hover { background: var(--color-action-primary-hover); }
.button:active { background: var(--color-action-primary-pressed); }

.button:focus-visible {
  outline: var(--border-focus) solid var(--color-focus-ring);
  outline-offset: var(--space-hairline);
}

.button[aria-disabled='true'] {
  background: var(--color-action-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.button[data-state='loading'] { cursor: progress; }
```

The baseline set for anything interactive: `default`, `hover`, `active`,
`focus-visible`, `disabled`, `loading`, and — where the component accepts input —
`error`. Two constraints on all of them: never reflow layout on hover, and use
`:focus-visible` rather than removing `:focus` outright.
