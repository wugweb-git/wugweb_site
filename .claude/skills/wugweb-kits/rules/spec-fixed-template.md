---
title: One Fixed Spec Shape Across the Library
impact: MEDIUM
impactDescription: variable doc shapes make specs unscannable and ungenerable
tags: spec, documentation
---

## One Fixed Spec Shape Across the Library

Specs are read by someone comparing two components at speed. A shape that varies
per component forces a re-read of the structure every time, and it makes the docs
ungenerable from the map — which means they will be hand-written, which means
they will go stale.

Same headings, same order, every component. Missing sections stay present and say
"none", because an absent heading is ambiguous between "not applicable" and
"nobody wrote it".

**Incorrect:**

```markdown
# Button
Buttons are used for actions. There are a few kinds — primary is the main one,
secondary is quieter. Use the danger one carefully. Accepts a size prop.
```

**Correct:**

```markdown
# Button

**Layer** 5 · **Status** stable · **Since** 2.3.0

## Role
Triggers a single action. (If this sentence needs "and", split the component.)

## Anatomy
container → leading slot → label → trailing slot

## Built from
Box, Text, Icon

## Tokens consumed
| Token | Applied to |
|---|---|
| button.primary.bg | container background, default |
| space.inset.md | container padding |
| radius.control | container corners |

## Variants
| Variant | When to use | Differs by |
|---|---|---|
| primary | The single main action on a view | background, label color |
| danger | Destructive and irreversible | background, confirm required |

## States
default · hover · active · focus-visible · disabled · loading

## API
| Prop | Type | Default | Notes |
|---|---|---|---|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' | 'secondary' | |
| size | 'sm' \| 'md' \| 'lg' | 'md' | maps to space.inset scale |

## Accessibility
Role, keyboard operation, focus behaviour, measured contrast, target size,
screen-reader announcement per state.

## Do / Don't
- Do: one primary per view.
- Don't: use `danger` for anything reversible.

## Used by
LoginForm, Toolbar, EmptyState
```

`Tokens consumed` and `Used by` come straight from the map — generate them rather
than typing them, and they cannot drift.
