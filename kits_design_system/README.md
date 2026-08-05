# Wugweb Kits — Design System

The Kits design system for the wugweb.com rebuild.

## Contents

| File | Description |
|---|---|
| [`docs/tokens.md`](docs/tokens.md) | **Complete token reference** — every token + value from `src/styles/global.css` (type, color, spacing, radius, shadow, motion, breakpoints, grid) |
| [`docs/components.md`](docs/components.md) | Component library — each component's token usage |

## Sources

- **Implemented tokens**: `src/styles/global.css` `:root` (source of truth)
- **Spec / rationale**: [`design.md`](../design.md) — Parts 1–4 (Framer export, component specs, Kits reference, conflicts)

## Rules

1. Always use tokens — never hardcode color/font/spacing/radius values.
2. Breakpoints: use literal pixel values in `@media` (tokens are documentation-only).
3. The `--ts-*` / `--fluid-*` / `--core-*` hierarchy is Kits; `--t-*` / `--gap-*` / `--fg-*` are legacy aliases kept until migration completes.
