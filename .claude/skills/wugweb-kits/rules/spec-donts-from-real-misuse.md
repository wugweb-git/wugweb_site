---
title: Write Don'ts From Misuse You Actually Found
impact: MEDIUM
impactDescription: invented don'ts get skipped; observed ones get read
tags: spec, documentation, audit
---

## Write Don'ts From Misuse You Actually Found

Generic guidance — "don't overuse primary buttons" — reads as filler and gets
skipped. A Don't that names a mistake somebody on the team actually made, with
the file it happened in, gets read and gets fixed. The audit already produced
this list; the spec is where it becomes prevention rather than a one-time
cleanup.

**Incorrect:**

```markdown
## Do / Don't
- Do: use buttons for actions.
- Don't: overuse primary buttons.
- Don't: make buttons too small.
```

**Correct:**

```markdown
## Do / Don't
- Do: one `primary` per view. The settings page had four (`SettingsPanel.tsx`);
  three became `secondary` and the save action stayed primary.
- Don't: use `danger` for reversible actions. "Archive" shipped as `danger`
  (`InboxToolbar.tsx:88`) and support saw users treating archive as delete.
- Don't: pass `className` to restyle. Six call sites did (`grep -rn 'Button className'`)
  and every one of them was reaching for `size="lg"`, which now exists.
```

Each Don't carries its evidence, so the next person can see the failure mode
rather than take the rule on faith — and when the evidence goes stale, the rule
is visibly due for review.
