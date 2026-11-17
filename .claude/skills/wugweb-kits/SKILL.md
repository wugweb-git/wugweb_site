---
name: "wugweb-kits"
description: "Maps the Wugweb site to the Kits design system: tokens, layout shell, components, block docs, motion and accessibility. Use when asked to audit a page or block against the shell, check tokens or hardcoded values, spec a component or block, map sections to the six layers, check labelling and headings, or find drift between docs and global.css. Triggers: kits, design system, tokens, layout shell, section padding, gutter, header height, block doc, component spec, audit page."
license: MIT
metadata:
  author: wugweb
  version: "2.0.0"
  argument-hint: <file-or-page>
---

# Wugweb Kits

Kits is the design system of wugweb.com: Astro with plain CSS variables, no Tailwind, no React components. This skill checks code and pages against it, maps every value to a home, and writes specs. It edits no site code and no build config. Engineering is ordinary work under CLAUDE.md. Status: the mapper core, the 26 Wugweb rule files, the references and the scripts are in place.

## Standing rules

Read `docs/skills/STANDING-RULES.md` first. This skill repeats none of it except the block below, copied verbatim from that file. The full copy is in `references/standing-rules.md`. If they differ, the docs file wins.

<!-- copied from docs/skills/STANDING-RULES.md -->
- Nothing is invented: no numbers, quotes or facts.
- A claim needs a screen, a sourced number or a named fact.
- Changes are shown as current to proposed, with the reason.
- Nothing is deleted without asking: no data, files, records or pages.
- Nothing goes to development until the owner says so.
- No em or en dashes in anything a visitor reads. Ranges are written out.
- Media lives in the owner's media store only: no uploads, no local copies.
- Media may be shown at any size if the original aspect ratio is kept. Clipping masks are allowed.
- No sound anywhere. Every video is muted.
<!-- end copied block -->

## Source of truth

Token values live in `src/styles/global.css`. The docs in `kits_design_system/docs/` win: `tokens/layout-shell.md` is authoritative, with `tokens/sizing.md` and `components.md` beside it. Code that disagrees with `layout-shell.md` is wrong, not the doc. Report it as a finding against the code. Never correct a doc to match code, and never carry a value this skill cannot check against a doc.

## What this skill owns

- Layout, tokens, components, block docs, motion and accessibility of the site.
- Not wording. Visible copy comes through `wugweb-work`, which supplies content shape and chosen media and takes layout, blocks and wording slots with limits.
- Not art direction. `wugweb-brand-os` gives the Visual OS and the logo rules; logo sizes live in kits (logo 40 in the nav); kits gives brand-os design-system detail and contrast results. Yellow is the one brand colour; purple, green and orange are allowed as pillar colours, pillar glow is an allowed exception, a slight bounce is within the brand, and black is the default canvas, light only where the owner says (brand-os rulings relayed 2026-11-17).
- `wugweb-seo` sends block-wide findings here; kits answers with a check result. One-page findings go to `wugweb-work`.
- `wugweb-strategy` reaches kits only through `wugweb-work`. There is no link to `wugweb-voice`.

## The shell

A page holds sections; a section holds one content box; the content holds blocks. The section owns the gutter, the content owns the max width. Values below were read from `layout-shell.md` and `sizing.md`; `references/layout-shell.md` has the full table.

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Canvas | 375 | 768 | 1200 |
| Section padding | 48 16 48 16 | 70 32 70 32 | 96 48 96 48 |
| Content max width | 1200 | 1200 | 1200 |
| Columns | 4 | 8 | 12 |
| Column gap | 16 | 24 | 32 |
| Gutter | 16 | 32 | 48 |
| Header padding | 16 | 20 | 20 |
| Header height | 100 | 108 | 108 |

Everywhere: nav bar 68, bar inset 12, buttons 44 (text 16, padding 10 12, gap 12), logo 40, nav inner max 1280, header sticky at top 0 on layer 10, spring 400ms with bounce 0.2. The header is derived: 24 + 2 x 10 = 44, 44 + 2 x 12 = 68, 68 + 2 x 20 = 108, and 16 + 68 + 16 = 100 on mobile. Never set it by hand.

Tokens and selectors: `--shell-gutter`, `--section-y` with every `--space-section-*`, `--grid-gap`, `--header-height` (`--nav-height` plus 2 x `--header-pad-block`), `--control-size`, `--nav-logo-height`, `--breakpoint-xl`, `--ease-spring`, `--duration-spring`, `.wrap`, `.grid`. The bar inset is `--nav-bar-pad` in code; the doc names no token for it.

The three tiers are 375, 768 and 1200. The breakpoint literals are 480, 640, 768, 1024 and 1200, and the shell steps only at 768 and 1200. Measure at 375, 768 and 1200; a measuring iframe needs `border: 0` or 768 reads as mobile.

Retired, never to return: content max 1280, desktop gutter 44, desktop breakpoint 1280, flat section tokens 40, 48, 64, 80, flat gap 16 (or 24, 24, 0), a 12 column switch at 1024, fluid header padding, header 110, 118, 118, nav z index 50. Any of these in a shell context is a blocker.

## Six layers

Every value belongs to one layer and references flow down one step at a time.

| # | Layer | Example |
|---|---|---|
| 1 | Primitive token | a raw value |
| 2 | Semantic token | a role such as muted text |
| 3 | Component token | a scoped binding, only when earned |
| 4 | Primitive component | structure classes such as `.wrap`, `.btn` |
| 5 | Component | a named part with its own file |
| 6 | Block | a section level composition with its own block doc |

A component reads layer 2 or 3, never a raw value and never layer 1. A block never restyles a component from outside; if it must, the component lacks a variant. Pattern means a reusable arrangement specified once, such as the rail or the viewer.

## Work in this order

1. Inventory. Count raw colours, size literals and token use. Report the shape in one table before proposing anything. `node scripts/kits-inventory.mjs src/ --findings` runs it; it does not yet read `.astro` files.
2. Map. Record each component's tokens consumed, used by and status. `system-map.json` is generated, committed at `kits_design_system/system-map.json`, never hand edited.
3. Audit against the severity list: Blocker is hardcoded colour, z index, a retired shell value, or a section with no id or name. High is a layer skip, missing states, or block CSS outside its component. Medium is spacing literals and alias chains. Low is a one use component token. Report only; the token check in CI warns first and flips to blocking once case-study components are clean (owner, 2026-11-17), each finding giving file and line, the literal and the token to use. CI wiring and clean up passes wait for the owner.
4. Spec. A single component uses the mapper sheet with the `components.md` fields added. A full block uses the block doc in `kits_design_system/docs/blocks/`. The owner signed off the five blocks that were awaiting it (2026-11-17); `components.md` may still mark them as drafts, which is a doc to update, not a reason to treat them as drafts. State measured contrast, not claims.
5. Keep it true. Compare doc and code and report drift.

Findings are one line each: severity, file and line, what, fix. Give totals plainly. If the system is clean, say so and stop.

## Rules from the mapper

Files in `rules/`; the compiled copy is `AGENTS.md`.

- `token-no-raw-values-in-components`, `token-one-way-references`, `token-no-alias-chains`, `token-semantic-names-describe-role`, `token-component-tokens-earn-their-place`.
- `map-single-source-of-truth`, `map-record-consumes-and-usedby`, `map-deprecate-with-a-pointer`, `map-count-before-you-propose`.
- `component-variants-not-booleans`, `component-slots-for-content`, `component-complete-state-set`, `component-no-outside-in-restyling`.
- `reuse-promotion-ladder`, `reuse-same-role-not-same-look`, `reuse-collapse-duplicates-with-a-survivor`, `reuse-every-audit-ends-in-deletions`.
- `spec-fixed-template`, `spec-measure-dont-claim`, `spec-donts-from-real-misuse`, `spec-generate-dont-maintain`.

## Wugweb rules

Shell group, source `layout-shell.md`:

- `shell-no-section-max-width`: no max width on a section.
- `shell-no-gutter-below-section`: nothing below the section sets a page gutter.
- `shell-grid-gap-token`: grid gaps use `--grid-gap`, never a section token.
- `shell-rhythm-exemption`: only `.global-final-cta` is exempt from the section rhythm.
- `shell-filters-are-toolbars`: filters are toolbars inside the grid, not sections.
- `shell-nothing-wider-than-nav`: no block that is not full bleed is wider than the nav.
- `shell-header-derived`: header height comes from its formula, never a literal.
- `shell-no-retired-values`: the retired list above is never reintroduced.

Label group, source `layout-shell.md`:

- `label-id-and-name`: every section has an id and an accessible name.
- `label-labelledby-stable-heading`: `aria-labelledby` points only to a heading that always renders.
- `label-no-loop-labels`: never label a section from a heading inside a loop.
- `label-heading-order`: one h1, no skipped levels, a screen reader only h2 where no heading shows.
- `label-lists-are-lists`: card lists are lists.
- `label-alt-always`: every image has alt; decorative muted loops are hidden from assistive tech.
- `label-skip-and-landmarks`: skip link, main landmark, scroll offset under the sticky header.
- `label-contrast-measured`: contrast is measured and stated.

Kits group, source `components.md`:

- `kits-tokens-only`: no hardcoded colour, spacing, radius, opacity, shadow, blur or z index.
- `kits-button-tiers`: `.btn-solid` brand, `.btn` primary, `.btn-ghost`; size by `.btn-sm`, `.btn-lg`, `.btn-block`, never one off CSS.
- `kits-yellow-budget`: yellow is accent only, at most 10%; the final CTA stays yellow.
- `kits-radius-by-role`: buttons `--radius-sm`, chips `--radius-full`, cards `--radius-lg`, panels `--radius-2xl`.
- `kits-states-on-btn`: states live on `.btn`.
- `kits-gsap-owns-motion`: animation is GSAP through `data-reveal` and `data-scroll`; no property has two owners.
- `kits-animated-block-lint`: Service Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map and any block marked "Animated block" are linted for transition and tween clashes.
- `kits-bento-never-even`: a bento never resolves into an even grid.
- `kits-block-docs-home`: block specs live in `kits_design_system/docs/blocks/`.
- `kits-live-colours-frozen`: text `#f4f4f4`, muted `#bababa`, surfaces `#191919` and `#2b2b2b` are never changed.

Loops stay 15 seconds or less, any loop over 5 seconds gets a pause control and is not hidden from assistive tech, and all loops stop under reduced motion. Deck and card type uses `--type-graphic-l`, `-m` and `-s` for title, subtitle and label (owner, 2026-11-17). Confirmed sizes (owner, 2026-11-17, not yet in a doc): rail 85vw and never past 1200, peek 20%, signature width 2400px, line length 35 to 60 characters.

## Report shape

Open with the result in one or two plain sentences. Then one table of findings sorted by severity, then totals, then the delete list if the audit found dead tokens or variants. Each finding shows current and proposed with the reason. Example lines:

BLOCKER  src/components/Card.astro:34  hardcoded colour, use the surface token
HIGH     kits_design_system/docs/components.md  doc says focus uses `--focus-primary`, code uses `--neutral-3`; report, do not fix

Recorded and not yet resolved: the hero of `/footer/reviews` has 216px inline padding at 1200 where the shell gives 48; six sections on `/work/[slug]` have no id; `/contact-us` has no section inside the main landmark; grid columns 4, 8 and 12 are not measured; `--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` exist and no component uses them yet. The `faqs` field in `layout-shell.md` stays (owner, 2026-11-17); how it is used, FAQPage included, is decided by `wugweb-strategy` with `wugweb-seo`, not by kits. Framer media ratios are not mapped to sections.

## Using this outside Claude

`SKILL.md` carries the core rules alone, because other tools may not load references. `AGENTS.md` is the single file export for GPT and Cursor, generated by `scripts/build.mjs`; regenerate it after any change and run `node scripts/validate.mjs`. Scripts are plain Node with no dependencies.

## Scripts

All plain Node, no dependencies, run from the skill folder or the repo root.

- `node scripts/kits-inventory.mjs src/ --findings`: counts raw values, orphan tokens and `@media` literals, and lists heuristic shell and kits findings.
- `node scripts/kits-check-page.mjs <file-or-url>`: ids, names, headings, alt, skip link and main on rendered HTML.
- `node scripts/kits-doc-drift.mjs`: doc against `global.css`, from the repo root.
- `node scripts/contrast.mjs <fg> <bg>`: computed ratio.
- `node scripts/validate.mjs`, `node scripts/build.mjs`, `node scripts/test.mjs`.

The scripts report and never edit. The page check reads static HTML; measuring at 375, 768 and 1200 needs a browser and is done by hand.

References: `references/layout-shell.md`, `references/component-sizes.md`, `references/six-layers.md`, `references/spec-templates.md`, `references/known-doc-clashes.md`, `references/standing-rules.md`.

## When the code is unreachable

Say so, work from what is given, and mark every inferred count as inferred. Rendered page checks need a browser and are done by hand outside Claude.
