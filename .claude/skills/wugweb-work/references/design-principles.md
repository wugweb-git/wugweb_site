# Design principles

> **Owner: `wugweb-work`.** The design vocabulary and the critique pass are held here in full and used by this skill in the Look, Layout and Ship modes. This file is not a pointer.

One vocabulary, used two ways: to read the client's work as evidence, and to compose the page. A principle is named only when a screen proves it. A law name used as decoration is cut.

## Vocabulary

**Elements.** Point, line, shape, form, space (positive and negative), colour (hue, value, saturation, temperature), type (family, weight, scale, measure, leading), texture, imagery, scale, motion.

**Principles.** Hierarchy, contrast, emphasis and focal point, balance (symmetric, asymmetric, radial), alignment and grid, proximity, repetition and rhythm, pattern, movement and flow, white space, proportion, unity and variety, figure and ground, Gestalt (similarity, continuity, closure, common region).

**UX laws and heuristics.** Nielsen's 10 heuristics; Fitts's law; Hick's law; Jakob's law; Miller's law; Tesler's law; Doherty threshold; aesthetic-usability effect; Von Restorff effect; Zeigarnik effect; serial position effect; peak-end rule; affordance and feedback; accessibility to WCAG 2.2 AA.

## Use 1: reading the client's work

The visual read names which elements carry the brand and which principles the UI applies, with the screen that proves it.

Form: principle, the decision, the screen.

- "One primary action per step (Hick's law): each step has a single red button. See Member 4 and the declaration state."
- "Status is always visible (Nielsen, visibility of system status): a member sees In Process and the award. See Member 7."
- "Errors give a next step (Nielsen, help users recover from errors): a blocked application shows a phone number and hours. See States."

This replaces the old "Design Philosophy" filler. A chapter of design decisions lists 3 to 6 decisions, each with its screen. A decision with no screen is cut.

Never claim a principle that the assets do not show. Never infer intent ("the team wanted users to feel safe") from a screen.

## Use 2: composing the page

Every block and rhythm rule in `layout-grammar.md` maps to a principle:

| Page rule | Principle |
|---|---|
| One focal point per chapter | Emphasis |
| h1, h2, lead, points in that order and scale | Hierarchy |
| Caption sits next to its media | Proximity |
| Stat numerals in the accent at large size | Contrast |
| The client accent repeats on rules and numerals | Repetition, unity |
| Space between chapters is at least the space inside them | White space, common region |
| Everything aligns to the column grid in the layout shell | Alignment |
| Media families rotate between chapters | Unity and variety, rhythm |
| Rails show the next item | Continuity, affordance |
| Button target size, set in `wugweb-kits` | Fitts's law |
| A chapter shows 1 to 4 screens | Miller's law, Hick's law |

## The critique pass

In Ship mode, a design critique scores the rendered page at the narrow and wide tiers of the layout shell on hierarchy, focal point, rhythm, contrast, consistency and legibility, each 1 to 5 with one line of reason and the block it refers to. A score of 2 or lower is a finding to fix before the owner sees the preview.
