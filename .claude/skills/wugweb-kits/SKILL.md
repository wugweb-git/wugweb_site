---
name: "wugweb-kits"
description: "Map a UI to its design system — trace values from primitive token → semantic token → primitive component → component, audit code for hardcoded values, drift and duplication, then write reusable component spec sheets."
license: MIT
metadata:
  author: wugweb
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Wugweb Kits

Most UI decay has one cause: values enter a codebase without a home. A hex lands in a
component, a spacing number gets typed inline, a third dropdown gets written because
nobody could find the first two. This skill builds the map that gives every value a
home, audits the code against it, and emits specs so the next person reuses instead of
rewrites.

Work in this order. Skipping to specs before the audit produces documentation of a mess.

## The six-layer model

Every visual value in a UI belongs to exactly one layer, and references flow in exactly
one direction: **down, one step at a time.**

| # | Layer | Holds | Names describe | Example |
|---|-------|-------|----------------|---------|
| 1 | **Primitive token** | Raw value, zero meaning | The value | `color.blue.600`, `size.4`, `font.size.14` |
| 2 | **Semantic token** | Role / intent | The job | `color.text.muted`, `space.inset.md`, `radius.control` |
| 3 | **Component token** | Scoped binding | The part | `button.primary.bg`, `card.padding` |
| 4 | **Primitive component** | Structure, no domain meaning | The mechanic | `Box`, `Stack`, `Text`, `Icon`, `Surface` |
| 5 | **Component** | A named UI role | The role | `Button`, `Field`, `Toast`, `Avatar` |
| 6 | **Composition** | Assembled components | The situation | `LoginForm`, `EmptyState`, `DataTable` |

**The one-way rule.** Layer N may reference only layer N-1.

- A component (5) reads component tokens (3) or semantic tokens (2) - never a primitive
  token (1), never a raw value.
- A semantic token (2) resolves to a primitive token (1) - never to another semantic token,
  which creates alias chains nobody can trace.
- A composition (6) contains components (5); it never restyles them from outside. If it
  needs to, the component is missing a variant.

Violations are the entire audit. Everything below is machinery for finding them.

**Layer 3 is optional and often harmful.** Add a component token only when a component
genuinely needs an override point that consumers will theme. If `button.primary.bg` is
just an alias for `color.action.primary` used once, delete it - it doubles the map for
nothing. Prefer 5 -> 2 directly.

## Phase 0 - Inventory before opinions

Do not propose a system before you know what exists. Count, do not guess.

```bash
# Distinct raw colors actually in use
grep -rhoE '#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)' src/ | sort | uniq -c | sort -rn

# Distinct spacing / size literals
grep -rhoE '\b[0-9]+(\.[0-9]+)?(px|rem|em)\b' src/ | sort | uniq -c | sort -rn

# Font sizes and weights
grep -rhoE 'font-size:[^;]+|font-weight:[^;]+' src/ | sort | uniq -c | sort -rn

# Existing token declarations and their usage counts
grep -rhoE '\-\-[a-z0-9-]+' src/ | sort | uniq -c | sort -rn
```

Report the shape of the problem in one table before touching anything:

| Dimension | Distinct values found | Values that survive |
|---|---|---|
| Color | 47 | 12 |
| Spacing | 23 | 7 |
| Radius | 9 | 3 |
| Font size | 14 | 6 |
| Shadow | 11 | 4 |

The gap between those columns is the work. Say the numbers out loud to the user - a
47-to-12 collapse is the argument for the whole exercise, and it is more persuasive than
any principle.

## Phase 1 - Build the map

Produce `system-map.json`. This is the single source of truth; everything else is
generated from or checked against it.

```json
{
  "tokens": {
    "primitive": { "color.blue.600": "#2563eb", "size.4": "16px" },
    "semantic":  { "color.action.primary": "{color.blue.600}",
                   "space.inset.md": "{size.4}" },
    "component": { "button.primary.bg": "{color.action.primary}" }
  },
  "components": {
    "Button": {
      "layer": 5,
      "builtFrom": ["Box", "Text", "Icon"],
      "consumes": ["button.primary.bg", "space.inset.md", "radius.control"],
      "variants": ["primary", "secondary", "ghost", "danger"],
      "states": ["default", "hover", "active", "focus-visible", "disabled", "loading"],
      "usedBy": ["LoginForm", "Toolbar", "EmptyState"],
      "status": "stable"
    }
  }
}
```

Three fields carry the weight:

- **`consumes`** makes the token->component direction traceable. Change a token, know what
  breaks.
- **`usedBy`** makes it reversible. Deprecate a component, know who to tell. Without this
  field nothing can ever be safely deleted, and a system nobody can delete from only grows.
- **`status`** - `stable` | `beta` | `deprecated:<replacement>`. Deprecation is a pointer,
  never a tombstone.

**Naming.** One grammar, applied everywhere: `category.role.variant.state`. Roles beat
appearances - `color.text.muted` survives a rebrand, `color.text.gray` does not. Never
encode a value in a semantic name (`space.16`), and never encode a component in a semantic
token (`space.card`) - that is layer 3.

## Phase 2 - Audit

Run every check. Report findings as a table sorted by severity, with file and line.

| # | Check | How to find it | Severity |
|---|-------|----------------|----------|
| 1 | Hardcoded value in a component | grep hex / px / rgba inside component files | **Blocker** |
| 2 | Layer skip (component -> primitive token) | component files referencing `--color-blue-600` style names | **Blocker** |
| 3 | Near-duplicate token | values within ~2% of each other (`#2563eb` vs `#2564ec`) | High |
| 4 | Orphan token | declared, zero references | High |
| 5 | Duplicate component | two files, same role, different name | High |
| 6 | Outside-in restyling | composition passing `className`/`style` to override a component | High |
| 7 | Missing state | component lacks `focus-visible`, `disabled`, `loading`, or error | High |
| 8 | Naming drift | token or component off the declared grammar | Medium |
| 9 | Alias chain | semantic -> semantic -> semantic | Medium |
| 10 | Magic number | unexplained literal in layout (`margin-top: 37px`) | Medium |
| 11 | One-use component token | layer 3 entry with a single consumer | Low |
| 12 | Undocumented variant | variant in code, absent from the spec | Low |

Findings format - one line each, no prose padding:

```
BLOCKER  src/ui/Card.tsx:34   hardcoded #f4f4f5 -> use {color.surface.subtle}
HIGH     tokens.json:88       orphan token space.inset.xxl (0 refs) -> delete
HIGH     src/ui/{Chip,Tag}.tsx  duplicate role -> merge into Tag, Chip = deprecated:Tag
```

Be blunt about totals. "68 blockers across 22 files" is the useful sentence; "there are
some opportunities for improvement" is not.

## Phase 3 - Make it recyclable

Reuse is a consequence of two things: a component being *findable* and being *bendable
enough*. Both are design decisions, not documentation.

**The promotion ladder.** Move up only on evidence:

1. **One use** - leave it local. Premature abstraction costs more than duplication.
2. **Two uses** - extract only if the two are genuinely the same role. Similar-looking is
   not the same role; a `Chip` on a filter bar and a `Badge` on an avatar diverge fast.
3. **Three uses** - promote to a shared component. Record it in `system-map.json`.
4. **Three components need the same value** - promote the value to a semantic token.

**Bendable enough.** A component that cannot be adapted gets forked, and a fork is a
permanent duplicate. Give components:

- **Variants** for role differences (`primary` / `danger`) - closed enumeration.
- **Slots** for content differences (`leading`, `trailing`, `footer`) - open.
- **Size scale** from semantic tokens, not free numbers.
- Nothing else. `style` and `className` passthrough is how systems die; every escape hatch
  used twice is a missing variant, and the fix is to add the variant.

**Collapsing duplicates.** For each duplicate cluster: pick the survivor (most used, best
a11y, not most recent), map the loser's API onto it, mark the loser
`deprecated:<survivor>`, keep it working for one release, then delete. A deprecation that
never gets deleted teaches the team that the map is decorative.

**Deletion is part of the job.** Every audit ends with a delete list - orphan tokens,
one-use component tokens, dead variants. Report what you removed with counts; a system
that only accretes is not a system.

## Phase 4 - Component spec sheets

One file per component. Use this template exactly - a predictable shape is what makes
specs readable across a library.

```markdown
# <ComponentName>

**Layer** 5 - **Status** stable - **Since** v2.3

## Role
One sentence on the job it does. If this sentence needs "and", the component does
two things and should be split.

## Anatomy
Ordered parts, outside in: container -> leading slot -> label -> trailing slot.

## Built from
Box, Text, Icon

## Tokens consumed
| Token | Applied to |
|---|---|
| color.action.primary | container background, default |
| space.inset.md | container padding |
| radius.control | container corners |

## Variants
| Variant | When to use | Differs by |
|---|---|---|
| primary | The single main action on a view | background, label color |
| danger | Destructive and irreversible | background, confirm required |

## States
default - hover - active - focus-visible - disabled - loading
Note what each changes and what it must not change (never reflow layout on hover).

## API
| Prop | Type | Default | Notes |
|---|---|---|---|

## Accessibility
Role, keyboard operation, focus behaviour, contrast result (state the measured ratio),
touch target size, what the screen reader announces in each state.

## Do / Don't
- Do: one primary per view.
- Don't: use `danger` for anything reversible.

## Used by
LoginForm, Toolbar, EmptyState
```

Two rules for spec quality: state the **measured** contrast ratio rather than claiming
compliance, and write the Don'ts from real misuse found in the audit, not from
imagination. A Don't that names a mistake somebody actually made gets read.

## Phase 5 - Keep it true

A map goes stale in weeks unless something enforces it. Leave behind whichever of these
the project can actually run:

- A lint rule failing the build on raw hex or px inside component files (check 1).
- A CI diff on `system-map.json` - token or component removed without a `deprecated`
  pointer fails.
- Generated docs, so specs are built from the map rather than typed beside it.
- A coverage number reported per PR: percentage of visual values resolving to tokens.
  One number, trending - teams move it when they can see it.

## Working notes

**Framework-agnostic by construction.** The layers hold whether the output is CSS custom
properties, Tailwind theme config, Style Dictionary, iOS asset catalogs, or Figma
variables. Map first in `system-map.json`, choose the emission format last, and never let
a framework's vocabulary redefine the layers - Tailwind's `theme.colors` is layer 1, not
layer 2, and treating it as semantic is the most common way a Tailwind system loses its
meaning.

**When the codebase is unreachable**, say so and work from what is available - a
screenshot, a Figma file, pasted CSS. Mark every inferred count as inferred. Do not
present a guessed inventory as measured; the numbers are the credibility of the whole
report.

**When the user only asks for one phase**, do that phase, then name the single most
valuable adjacent one in a sentence. Do not silently expand scope, and do not run a full
six-phase pass on someone who asked for a button spec.

**Report honestly.** If the system is already clean, say it is clean and stop. Inventing
findings to justify the exercise is the failure mode this skill exists to prevent.