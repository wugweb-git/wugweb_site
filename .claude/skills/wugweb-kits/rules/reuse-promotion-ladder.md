---
title: Promote on Evidence, Not on Instinct
impact: MEDIUM-HIGH
impactDescription: premature abstraction costs more than the duplication it prevents
tags: reuse, process
---

## Promote on Evidence, Not on Instinct

The instinct to generalise on first sight produces components with six props and
one consumer, which are harder to delete than the duplication they replaced. Wait
for evidence, then move deliberately.

- **One use** — leave it local. It is not a pattern yet.
- **Two uses** — extract only if the two are genuinely the same *role*. Similar
  appearance is not evidence; see `reuse-same-role-not-same-look`.
- **Three uses** — promote to a shared component and record it in the map.
- **Three components needing the same value** — promote the value to a semantic
  token.

**Incorrect:**

```tsx
// First and only usage, already generalised into a config object
function DataDisplay({
  layout, density, sortable, selectable, groupBy,
  renderCell, renderHeader, emptyState, pagination,
}: DataDisplayProps) { /* 400 lines */ }
```

**Correct:**

```tsx
// Use 1: local, honest, 30 lines
function InvoiceTable() { /* … */ }

// Use 2: second table appears. Same role? Compare columns, sorting, selection.
// Different enough — keep both, note the pair in the map as a watch item.

// Use 3: third table, same role as the first two. Now extract:
function DataTable({ columns, rows, sort }: DataTableProps) { /* … */ }
```

Record watch items in the map so the third use is noticed rather than
rediscovered:

```json
{ "watch": [{ "role": "tabular data", "instances": ["InvoiceTable", "MemberTable"] }] }
```
