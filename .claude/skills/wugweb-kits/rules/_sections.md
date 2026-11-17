# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Token Layering (token)

**Impact:** CRITICAL
**Description:** How raw values become named, referenceable tokens, and the
one-way reference direction that keeps the map traceable.

## 2. System Map (map)

**Impact:** HIGH
**Description:** The single machine-readable record of tokens, components and
their relationships — what makes change and deletion safe.

## 3. Component Contracts (component)

**Impact:** HIGH
**Description:** The API surface a component exposes: variants, slots, states.
A component is reusable only to the degree its contract is honest.

## 4. Recyclability (reuse)

**Impact:** MEDIUM-HIGH
**Description:** When to promote, when to leave duplication alone, and how to
collapse duplicates without stranding consumers.

## 5. Spec Sheets (spec)

**Impact:** MEDIUM
**Description:** The generated documentation layer — fixed shape, measured
claims, real misuse.

## 6. Layout Shell (shell)

**Impact:** HIGH
**Description:** The page, section, content and block structure, with the binding
values from layout-shell.md. The doc is the source; code that disagrees is wrong.

## 7. Labelling (label)

**Impact:** HIGH
**Description:** Ids, accessible names, headings, lists, alt and landmarks.
Contrast, focus and target rules belong with the component specs.

## 8. Kits Components and Motion (kits)

**Impact:** HIGH
**Description:** Wugweb specific component, token, colour and motion rules from
components.md and CLAUDE.md.
