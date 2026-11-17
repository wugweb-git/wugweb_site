# Spec templates

Three levels, no clash. Pick by what is being specified.

1. **Entry in `components.md`.** Keeps its own shape: purpose, tokens consumed, Storybook, status, headline tokens, rules it demonstrates.
2. **Block.** A full block spec uses the block doc template in `kits_design_system/docs/blocks/`. The five blocks that awaited sign-off were signed off by the owner on 2026-11-17.
3. **Single component.** Use the mapper sheet: role, anatomy, built from, tokens consumed, variants, states, API, accessibility, do and don't, used by. Add the `components.md` fields: status, headline tokens, rules demonstrated.

Rules for all three: state measured contrast (`node scripts/contrast.mjs`), never a claim; write the don'ts from real misuse found in an audit; give wording slots limits where `wugweb-work` supplies the copy; no dashes in any block doc, ranges written out.
