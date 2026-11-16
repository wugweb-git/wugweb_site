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
