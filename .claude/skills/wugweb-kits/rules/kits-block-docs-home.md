---
title: Block Specs Live in docs/blocks
impact: MEDIUM
impactDescription: specs scattered elsewhere go stale
tags: kits, docs
---

## Block Specs Live in docs/blocks

A section level block is specified once in kits_design_system/docs/blocks/ using the block doc template. The owner signed off the five blocks that awaited sign-off on 2026-11-17.

**Incorrect:**

```text
Block spec pasted into a pull request description.
```

**Correct:**

```text
kits_design_system/docs/blocks/<block>.md
```

Source: components.md, blocks.
