---
title: Every Audit Ends With a Delete List
impact: MEDIUM
impactDescription: a system that only accretes stops being a system
tags: reuse, audit, hygiene
---

## Every Audit Ends With a Delete List

Additive audits are comfortable and useless. If a pass produces only new tokens
and new components, the map grew and the codebase got harder to navigate. Orphan
tokens, pass-through component tokens, dead variants and zero-consumer components
are all findable mechanically, and removing them is the cheapest clarity
available.

**Incorrect:**

```text
Added 34 semantic tokens and 6 new components. The system now covers 89% of
the UI.
```

Nothing was removed, so the 47 original raw colors are probably still there too,
now alongside 34 tokens.

**Correct:**

```bash
# Orphan tokens: declared, never referenced
comm -23 \
  <(grep -ohE '^\s*--[a-z0-9-]+' src/tokens/*.css | tr -d ' :' | sort -u) \
  <(grep -rohE 'var\(--[a-z0-9-]+' src/ --include='*.css' --include='*.ts' --include='*.tsx' --include='*.astro' | sed 's/var(//' | sort -u)

# Components with zero importers
for f in src/ui/*.tsx; do
  n=$(basename "$f" .tsx)
  c=$(grep -rl "\b$n\b" src --include='*.tsx' --include='*.astro' | grep -v "$f" | wc -l)
  [ "$c" -eq 0 ] && echo "DEAD  $f"
done
```

```
DELETE LIST (this pass)
  11 orphan tokens          src/tokens/color.css, spacing.css
   6 pass-through layer-3   button.*, card.padding
   3 dead variants          Button ghost-sm, Tag neutral-outline
   1 zero-consumer          src/ui/Callout.tsx
  → net map size: 214 → 193 entries
```

Report the net number. A pass that ends larger needs a reason, not a shrug.
