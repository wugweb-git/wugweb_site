---
title: Merge on Role, Never on Appearance
impact: MEDIUM-HIGH
impactDescription: look-alike merges produce components that fork within a quarter
tags: reuse, taxonomy
---

## Merge on Role, Never on Appearance

Two things that render as a small rounded rectangle with a label are not
necessarily the same component. A filter chip is interactive, removable, and
reflects query state. A status badge is static, semantic, and reflects data. Merge
them because they look alike and within a quarter you have `Badge` with an
`onRemove` prop, an `interactive` boolean, and a comment explaining when each
applies — the exact mess the merge was meant to prevent.

Ask three questions before merging: does the user do the same thing with both?
Do they carry the same kind of meaning? Would a change to one plausibly apply to
the other? Three yeses is a merge. Anything less is two components that happen to
share tokens.

**Incorrect:**

```tsx
type BadgeProps = {
  label: string
  tone: 'info' | 'success' | 'warning'
  interactive?: boolean
  onRemove?: () => void
  isFilter?: boolean
}
```

**Correct:**

```tsx
// Static, semantic, non-interactive
<Tag variant="success">Paid</Tag>

// Interactive, reflects query state, removable
<FilterChip onDismiss={() => remove('status:paid')}>Paid</FilterChip>
```

```json
{
  "Tag":        { "role": "communicates state of data", "interactive": false },
  "FilterChip": { "role": "communicates and edits query state", "interactive": true }
}
```

They can share `space.inset.xs`, `radius.pill` and the type ramp. Sharing tokens
is the reuse; sharing a component is not.
