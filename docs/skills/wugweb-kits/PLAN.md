> Plan for vetting, revision 13, 2026-11-16. Part of the Wugweb Skill System. Same content as the Plan section of the Notion page "wugweb-kits" (https://app.notion.com/p/41abb710b9ab81db87c5e03d81341818). Plan stage only: nothing goes to development until the owner says.

# wugweb-kits skill: plan

## Plan

### 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-kits` |
| Type | Claude Code project skill: one `SKILL.md` plus `rules/`, `references/`, `scripts/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned; open, see section 16) |
| Status | Renamed copy is on `main`. Enhancements are plan only. |
| Owner | Vedanshu, Wugweb |
| Planned in session | wugweb-kits (`local_31fbe87e-842d-4d48-a8fb-8b3fe7768756`) |
| SKILL.md written in session | `cse_01H6F5RsB2d6PFWpQpS932gi` (owner, 2026-11-16: the session where this discussion is converted to SKILL.md) |
| Lives at | `.claude/skills/wugweb-kits/` |
| Source of token values | `src/styles/global.css` `:root` |
| Source of specs | `kits_design_system/docs/` (`tokens/layout-shell.md` is authoritative for the shell) |
| Starting point | `ui-system-mapper`, renamed to wugweb-kits and enhanced (owner, 2026-11-16). Baseline carried over: six-layer model, 21 rules, workflow, scripts. See section 13. |
| Used by | `wugweb-work`, any session touching UI |
| Writes | Nothing on its own. Returns reports and current to proposed change sets. |

### 2. About

**What it is.** The rulebook and procedure for the Kits design system: tokens, the layout shell (page, section, content, blocks), components, primitives, patterns, block docs, adaptive UX, motion and accessibility.

**What it is not.** It does not write copy, set voice or art direction, do SEO, or own build and deploy code. It decides how media is shown, never which media proves which point.

| Mode | In | Out |
|---|---|---|
| Inventory | `global.css`, components, pages | Counts of raw values and tokens in use, measured |
| Map | Inventory | `system-map.json`: tokens by layer, components, consumes, used by, status |
| Audit | Files or a rendered page | Findings by rule id, with measured values and file:line, plus a delete candidates list |
| Refactor proposal | Audit findings | Current to proposed change set; nothing applied |
| Spec | A new or changed component or block | Component spec sheet or block doc, as a proposal |
| Layout | A block plan or page brief | Layout decision per block and tier (375, 768, 1200) |
| Gate | Rendered page | Pass or fail table at 375, 767, 768, 769, 1199, 1200, 1201 |

Every mode reports. None deletes tokens or refactors without the owner's yes.

### 3. Why

1. The rules exist but are spread over `design.md`, 24 token docs, `components.md`, 8 block docs, memory notes and the wugweb-work plan. Sessions apply them unevenly.
2. Docs and code have drifted (section 12). No one skill keeps them equal.
3. The case-study rebuild adds about 19 `Case*` components. Without one gate they will repeat old defects: hardcoded values, hairlines, a property with two owners.
4. Only one blocking check exists today (`check-sector-css.mjs`). Everything else is by hand.

### 4. Standard structure

```
.claude/skills/wugweb-kits/
├── SKILL.md
├── rules/                       one file per rule: 21 mapper rules + Kits rules
├── references/
│   ├── six-layers.md
│   ├── layout-shell.md
│   ├── layout-grammar.md
│   ├── block-catalogue.md
│   ├── adaptive-ux.md
│   ├── composition.md
│   ├── media-display.md
│   ├── patterns-rail-viewer.md
│   ├── motion.md
│   ├── accessibility.md
│   ├── spec-templates.md
│   ├── token-change.md
│   ├── gate.md
│   ├── pane-measuring.md
│   └── skill-map.md
├── scripts/                     all read-only
│   ├── kits-inventory.mjs
│   ├── kits-doc-drift.mjs
│   ├── kits-check-page.mjs
│   ├── validate.mjs
│   ├── build.mjs
│   └── lib.mjs
├── examples/
│   ├── block-doc-sector-showcase.md
│   ├── token-change-proposal.md
│   └── audit-report.md
└── evals/
    └── evals.json
```

**Frontmatter (draft).**

```
---
name: wugweb-kits
description: This skill should be used when the user asks to "check the tokens", "audit the design system", "map the UI", "write a block doc", "spec a component", "add or change a token", "fix the layout", "check the page at 375, 768 and 1200", "check the gutter or section padding", "review motion or reduced motion", or "check accessibility" on the Wugweb site, or mentions Kits, global.css, the layout shell, sections, blocks, breakpoints, buttons, chips, the yellow rule or GSAP reveals. It governs the Wugweb Kits design system: tokens, page, section, content and block layout, components, block docs, adaptive UX, motion and accessibility.
version: 0.1.0
---
```

**Body, 1,500 to 2,000 words, imperative.** Purpose, when to use and when not, the seven modes in one paragraph each, the always-on rules (15 or fewer, each with its reason), the never-do list, the reference index. Reference and rule files load only when a mode needs them.

### 5. What each reference file holds

| File | Holds |
|---|---|
| `six-layers.md` | The mapper's layer model mapped onto Kits (section 6) |
| `layout-shell.md` | Pointer to `kits_design_system/docs/tokens/layout-shell.md` plus a one-page summary: section owns the gutter, content max 1200, gutter 16 / 32 / 48, rhythm 48 / 70 / 96, columns 4 / 8 / 12, nav formula (68 bar, 100 / 108 header, 44 buttons), filters inside the grid section |
| `layout-grammar.md` | Media to block rules, rhythm, tiers, full-bleed method, identity accent |
| `block-catalogue.md` | The 23 block types and the `Case*` component list with their CSS rules |
| `adaptive-ux.md` | The seven adaptive lines, each with its rule and check |
| `composition.md` | One focal point per chapter, hierarchy, caption next to media, rhythm, white space, alignment to the 4 / 8 / 12 grid |
| `media-display.md` | Resize only with the original aspect ratio, clipping masks allowed, `object-fit` never `cover` on UI screens, all video muted (three readings open, section 10) |
| `patterns-rail-viewer.md` | Rail, All screens block and viewer specs (section 8) |
| `motion.md` | GSAP via `data-reveal`, `data-reveal-delay`, `data-scroll`; nav spring; duration and easing tokens; reduced motion; one owner per animated property; rails never auto-advance |
| `accessibility.md` | Every section has an id and an accessible name; one h1; no skipped levels; 44px targets; focus ring; contrast measured through the whole ancestor stack |
| `spec-templates.md` | Mapper spec sheet for components; `sector-showcase.md` shape for blocks. No dashes, ranges as inequalities. |
| `token-change.md` | How to propose a token add, change or removal: current to proposed, consumer list, doc to update |
| `gate.md` | Gate checklist, widths, severity list |
| `pane-measuring.md` | Hidden browser pane caveats, iframe `border: 0`, test at 1200 and never 1440 |
| `skill-map.md` | Helper skills per mode and what each may not do |

**Kits rules in `rules/`, beside the 21 mapper rules:** tokens only; radius by role (buttons `--radius-sm`, chips `--radius-full`, cards `--radius-lg`, panels `--radius-2xl`); yellow 10% or less, with `FooterCTA` staying yellow; live colour values frozen; no hairlines in the rendered result; nothing wider than the nav; nothing scales past the max width; breakpoints literal 480 / 640 / 768 / 1024 / 1200; block CSS lives only in its own component.

### 6. The mapper's six layers on Kits

`global.css` has 392 token declarations; 112 point at another token.

| Layer | Mapper meaning | In Kits today |
|---|---|---|
| 1 Primitive token | Raw value, no meaning | `--neutral-0..10`, `--color-yellow`, `--svc-*` bases, `--r-*`, `--s-*`, `--opacity-*`, `--blur-*`, `--duration-*`, `--ts-*`, `--core-*` |
| 2 Semantic token | Role | `--color-surface-*`, `--color-text-*`, `--color-border-*`, `--fg`, `--fg-muted`, `--accent`, `--radius-sm..2xl`, `--gap-*`, `--fluid-*`, `--easing-*`, `--focus-*`, `--layer-*`, and the shell tokens `--shell-gutter`, `--section-y`, `--grid-gap`, `--header-height` |
| 3 Component token | Scoped binding | `--nav-*`, `--control-size`, `--article-*`, `--theme-*`, `--tag-hue`, planned `--case-accent` |
| 4 Primitive component | Structure only | `.wrap` (section), `.grid`, `.btn`, `.sr-only`, `.glass-panel` |
| 5 Component | Named UI role | `SiteHeader`, `SiteFooter`, `PostCard`, `FaqAccordion`, `FooterCTA`, planned `Case*` |
| 6 Composition | Assembled | Blocks (`SectorShowcase`, `BentoBlock`, `ProcessMap` and the like), then page sections |

The layout-shell values are layer 2 tokens stepped by breakpoint. Breakpoints stay literals in `@media`, so the raw-value check skips `@media` conditions.

**The 21 rules.**

| Rule | Verdict | Note for this repo (Astro, plain CSS variables, no Tailwind) |
|---|---|---|
| `token-no-raw-values-in-components` | As is | Skip `var()` fallbacks, comments, `@media` literals and data values |
| `token-semantic-names-describe-role` | Adapt | Kits names are flat CSS variables. Apply to new tokens only; no renames. |
| `token-one-way-references` | Adapt | Components read primitives today. Report; do not auto-fix. |
| `token-no-alias-chains` | Adapt | Report chains longer than 2 hops; `--fg` and `--accent` shorthands are allowed |
| `token-component-tokens-earn-their-place` | As is | One-use tokens are reported |
| `map-single-source-of-truth` | Adapt | `global.css` stays the source; `system-map.json` is generated from it |
| `map-record-consumes-and-usedby` | As is | Built by scanning `.astro` style blocks and imports |
| `map-count-before-you-propose` | As is | |
| `map-deprecate-with-a-pointer` | As is | |
| `component-complete-state-set` | As is | |
| `component-variants-not-booleans` | Adapt | Astro props and class modifiers |
| `component-slots-for-content` | Adapt | Astro `<slot>` and props |
| `component-no-outside-in-restyling` | Adapt | Looks for `:global()` overrides, `class` passthrough, block selectors outside their component |
| `reuse-promotion-ladder` | As is | |
| `reuse-same-role-not-same-look` | As is | |
| `reuse-collapse-duplicates-with-a-survivor` | Adapt | Proposal only; no merge without the owner's yes |
| `reuse-every-audit-ends-in-deletions` | Adapt | Becomes "every audit ends with a delete candidates list". Nothing is deleted without the owner's yes. |
| `spec-fixed-template` | Adapt | Two templates: component sheet and block doc |
| `spec-generate-dont-maintain` | Adapt | Only tokens consumed and used by are generated |
| `spec-measure-dont-claim` | As is | |
| `spec-donts-from-real-misuse` | As is | |

**Scripts.** The mapper's `audit.mjs` becomes `kits-inventory.mjs`, adapted to scan `.astro` files and skip the three false-positive classes. `validate.mjs`, `build.mjs` and `lib.mjs` are carried to lint and compile the rule files. The installed `ui-system-mapper` is left untouched.

### 7. Taken over from the wugweb-work plan

| Section of `docs/skills/wugweb-work/PLAN.md` | Lands in |
|---|---|
| "Adaptive UX" (seven-line table) | `adaptive-ux.md` |
| "Layout grammar" | `layout-grammar.md`, `motion.md`, `accessibility.md` |
| C1 block catalogue | `block-catalogue.md` |
| C2 `Case*` component list and CSS rules | `block-catalogue.md`, one spec per component |
| C4 client logic (rail, viewer) | `patterns-rail-viewer.md` |
| C5 CSS ownership guard | A rule in `rules/` |
| Composing-the-page half of design principles | `composition.md` |
| Media rule, display half | `media-display.md` |
| Standing rule 5 (tokens, yellow, GSAP, radius, breakpoints, PWA, hairlines) | `rules/` |
| Skill list rows: layout and adaptive UX, ship gate, accessibility second opinions | `skill-map.md` |
| Handoff rows: design review, layout helpers, ui-system-mapper | `skill-map.md` |
| Per-task tests: All screens block, viewer, layout, page gate | Section 9 |

Stays with `wugweb-work`: content rules, lengths, which screens prove which chapter, the reading-the-client's-work half of design principles, and the file half of the media rule (R2 only, no uploads, no crops, no re-encodes, no sound).

### 8. Pattern specs added

**All screens block.**

| Part | Spec |
|---|---|
| In a chapter | 1 ≤ proof screens ≤ 4, short captions, beside the text |
| Closing block | Set chips with counts (NTUC: Member 8, States 4, Dashboard 9, Back office 7, Cases 3) |
| Thumbnail grid, mobile | 3 columns for phone screens; 1 to 2 columns for desktop screens |
| Thumbnail grid, desktop | Denser; column counts open |
| Viewer | Full size, caption, "n of N, set name", previous and next buttons ≥ 44px, close, swipe; focus returns to the thumbnail |
| No JavaScript | Every set renders stacked under its own heading |

**Layout rules from the NTUC audit.**

| Rule | Check |
|---|---|
| Rail items fit the viewport | Item width ≤ 85vw on mobile |
| Snap | `proximity`, never `mandatory` |
| No empty grid cells | Cell count equals item count |
| Device mockups | ≤ 2 per page; never the only evidence in a chapter |
| Styles pair | 50:50 image pair at native ratio |
| Client accent | One per client. Rules and large numerals need ≥ 3:1; text needs ≥ 4.5:1. NTUC red `#EA1828` is 3.9:1, so rules and large numerals only. |

### 9. Handoff contracts and tests

| Skill | Goes in to kits | Comes out of kits | Kits may not |
|---|---|---|---|
| `wugweb-work` (every piece: case studies, blog posts, service pages, social and deck versions) | Block plan, media shapes, page brief | Layout per block and tier, gate result, block doc proposal | Write copy; decide which media proves which point |
| `wugweb-brand-os` | Visual OS: art direction, mood, colour meaning, type character | Tokens, components and layout rules that express it; contrast results | Set art direction; change brand colours or logo |
| `wugweb-seo` | A finding that repeats on every page using a block (alt text, lazy loading, heading order, image sizes). See section 17. | The check result, with file:line | Change titles, meta, schema or canonicals; edit code |
| `wugweb-strategy` | Nothing directly; it reaches kits through `wugweb-work` | Nothing | n/a |
| Ordinary engineering work under `CLAUDE.md` (there is no engineering skill) | Code, diffs, preview URL | Findings by rule id, current to proposed fixes, specs. Kits owns the check; engineering wires it into the build. | Edit code or build config; run build, sync or deploy |
| `wugweb-voice` | No link | No link | Write visible wording; it asks `wugweb-work` (section 17) |

**Visual OS line.** Brand-os says what the brand should look and feel like and why. Kits turns that into exact values and rules and checks the code against them. A change of direction starts in brand-os; a change of value starts in kits as current to proposed.

**Helpers (proposals and reports only; the owner's rules win).** `anthropic-skills:design-qa`, `anthropic-skills:responsive-token-engine`, `design:design-system`, `anthropic-skills:frontend-design`, `anthropic-skills:design-taste-frontend`, `design:accessibility-review`, `anthropic-skills:web-quality-accessibility`, `ux-ui-audit`, `ui-ux-pro-max`, `anthropic-skills:gsap-react` (motion reference only), `anthropic-skills:skill-creator`, `anthropic-skills:skill-development`.

**Per-task tests.**

| Task | How it is tested | Passes when |
|---|---|---|
| Inventory | Fixtures with planted hardcoded values, `var()` fallbacks, comments, `@media` literals | Every planted value found; zero false positives |
| Doc drift | `global.css` against `docs/tokens/` | Every token reported as documented, missing or mismatched |
| Shell | Rendered pages at 375, 768, 1200 | Gutter 16 / 32 / 48, rhythm 48 / 70 / 96, columns 4 / 8 / 12, no sideways scroll |
| Section labels | Rendered HTML of all routes | Every section has an id and an accessible name; 0 duplicate ids; 0 dangling references |
| Nav | 375, 768, 1200 | Bar 68, header 100 / 108 / 108, buttons 44, logo 40 |
| Yellow rule | Audit eval | `FooterCTA` not flagged; a planted second yellow surface flagged |
| Motion | Reduced-motion run; owner scan | Nothing animates under reduced motion; no property has two owners |
| Media display | Page with phone, landscape and masked media | No ratio change; no `cover` on UI screens; soft upscale reported |
| All screens block | NTUC page | Chips show 8, 4, 9, 7, 3; with JavaScript off every set is on the page |
| Viewer | Keyboard and touch | Caption and "n of N, set name"; previous, next, Esc and swipe work; focus returns |
| Rail | 375 | Every item ≤ 85vw; snap is `proximity` |
| Layout | Block-plan fixtures for 8 case studies | No block outside the catalogue; no empty cells |
| Block doc | Eval: write the doc for one block | Matches the template; no dashes |
| Token change | Eval: "add a token for X" | Current to proposed with consumers; nothing deleted or written |
| Boundaries | Eval: "rewrite this heading" | Hands off; does not do it |
| Page gate | 375, 767, 768, 769, 1199, 1200, 1201 | Pass or fail table with counts |

### 10. Owner decisions

**Decided.**

| Date | Decision |
|---|---|
| 2026-11-16 | `ui-system-mapper` is renamed wugweb-kits and enhanced (first stated as built in) |
| 2026-11-16 | Six skills: `wugweb-voice`, `wugweb-brand-os`, `wugweb-kits`, `wugweb-work`, `wugweb-strategy`, `wugweb-seo`. No engineering or social skill. |
| 2026-11-16 | The plan is saved on the Notion page and in the repo |

**Open.**

1. Should serious token findings block a merge, or only be reported? Recommendation: report only for v0.1, then block on a short list (hardcoded colour, z-index, block CSS outside its own component) once the inventory shows zero false positives. About 369 untokenized px literals exist today. Until decided: report only.
2. Media rule, three readings to confirm: resize and masks are done on the page in CSS, not by making new files; a mask must not hide the part of a screen that proves the claim; showing a file larger than its natural size is a quality flag, not a ban.
3. For the rail, viewer and CSS guard, kits owns the spec. Settled: the code is ordinary engineering work under `CLAUDE.md`, built to the kits spec.
4. Settled by section 13: the owner retires the installed `ui-system-mapper` in the Claude app after the renamed copy passes its checks.

### 11. Other open questions

1. Where rules live: proposed that token values and block docs stay in `kits_design_system/docs/` and the skill points to them.
2. The severity list: proposed colour and z-index serious, spacing px minor.
3. Path of the shared standing-rules file.
4. One definition of primitive, component, pattern and block across `widgets.md`, `components.md` and `blocks/`.
5. Whether the `/kits` showcase page and Storybook are in scope here or are ordinary engineering work under `CLAUDE.md`.
6. Whether `system-map.json` is committed, and where. Proposed: `kits_design_system/system-map.json`, generated.
7. Layer skips and alias chains already in the code: report only, or plan a clean-up pass?
8. Five block sign-offs are still open (Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map): approved patterns or drafts?
9. Desktop column counts for the All screens thumbnail grid.

### 12. Source gaps

| Gap | Where |
|---|---|
| `design.md` lists breakpoints 768 / 1024 / 1280; code says 1200 | `kits_design_system/docs/design.md` |
| `design.md` says yellow is never a surface; `FooterCTA` is the agreed exception | `design.md`, `components.md` |
| `design.md` source S1 points at `component/`, which was deleted | `design.md` |
| `--color-accent-primary` resolves to `--neutral-2`, not yellow as documented; never decided | `global.css`, `pending.md` |
| Motion is documented twice | `docs/motion.md`, `docs/tokens/motion.md` |
| No `components.md` entry for `FaqAccordion`, `InsightsBlock`, `PostCard`, `TeamGrid`, `PortableTextRenderer`, `industries/*` | `components.md` |
| `layout-shell.md` was verified at 1440; the rule is test at 1200 | `layout-shell.md` |
| The "Kits Responsive Token Contract" named by the 2026-09-22 audit does not exist | `pending.md` |
| Framer media aspect ratios are not mapped to sections | `layout-shell.md` |
| `--breakpoint-2xl` 1440 is declared and unused | `breakpoints.md` |
| `SiteFooter` entry lists `--line` as a top border, which may read as a hairline | `components.md` |
| `CLAUDE.md` still lists `motion` as a dependency | `CLAUDE.md` |
| The mapper's inventory script does not scan `.astro` files | `ui-system-mapper/scripts/audit.mjs` |
| No `blocks/case-study.md` and no `src/components/work/` yet | Planned |

None of these were changed. Each comes to the owner as current to proposed once the skill runs its first Map.

### 13. Rename: ui-system-mapper becomes wugweb-kits

The existing skill is the starting point. It gets the new name and is then enhanced. Rename done 2026-11-16 on the owner's go: the renamed copy is at `.claude/skills/wugweb-kits/`, uncommitted. The installed skill is untouched. Enhancements are not made.

**Baseline that carries over.**

| Part | Carries over |
|---|---|
| Six-layer model and the one-way rule | Unchanged |
| Workflow: inventory, map, audit, make it recyclable, spec sheets, keep it true | Unchanged |
| 21 rule files, `_sections.md`, `_template.md` | All kept; 10 as is, 11 adapted (section 6) |
| `system-map.json` shape, audit checks 1 to 12, findings format | Unchanged |
| Component spec sheet template | Unchanged, used for components |
| `validate.mjs`, `build.mjs`, `lib.mjs` | Unchanged |
| `AGENTS.md` | Still generated by `build.mjs` |
| `README.md`, `metadata.json` | Kept, name and abstract updated |
| Stance | Reports findings; never deletes tokens or refactors without the owner's yes |

**Enhancements.** The Kits tokens and layout shell as the concrete system map; Astro and plain CSS notes in the adapted rules; new rule sections `shell-*`, `kits-*`, `media-*`, `motion-*`, `a11y-*`; `references/`, `examples/`, `evals/`; the block doc template; `kits-doc-drift.mjs` and `kits-check-page.mjs`; `audit.mjs` adapted to scan `.astro` files. The mapper's `SKILL.md` is already 1,919 words, so enhancements go into rules and references. One exception is proposed in section 20, row 1.

**Read-only findings, 2026-11-16.**

- The installed folder is managed by the Claude app (its "Anthropic-managed skills for Claude Desktop" plugin, with a `manifest.json` that lists each skill by id). An in-place rename on disk is not safe.
- No secrets or personal paths in its 31 files (4 top-level files, 23 in `rules/`, 4 scripts).
- The skill names itself in 6 places: `SKILL.md` frontmatter and title, `AGENTS.md` title, `README.md` title and folder tree, and the title string in `scripts/build.mjs`.

**Result of the check.** 31 files and 21 rules in both copies; only `SKILL.md`, `AGENTS.md`, `README.md` and `scripts/build.mjs` differ; `validate.mjs` reports 0 errors; `build.mjs --check` reports `AGENTS.md` up to date; the old name remains only in the README rename line.

**How the rename was done.**

1. Copy the 31 files to `.claude/skills/wugweb-kits/` in the repo. The installed copy is not touched.
2. Change only the 6 name references and add one line to `README.md`: renamed from ui-system-mapper on 2026-11-16; enhancements are planned and not yet made.
3. Check: file and rule counts match, `validate.mjs` and `build.mjs --check` run, no leftover old name.
4. Leave it uncommitted until the owner says.
5. Two skills then exist side by side. Retiring the old `ui-system-mapper` is the owner's step in the Claude app's skill settings.

### 14. Two kinds of page

The detailed block catalogue so far was designed only for case studies. Blog posts and service pages have no equivalent catalogue yet.

| Rule or block | Case study | Blog post | Service page |
|---|---|---|---|
| Layout shell, tiers, nav, section labels | Yes | Yes | Yes |
| Tokens only, radius, yellow, hairlines, max width | Yes | Yes | Yes |
| Motion and accessibility rules | Yes | Yes | Yes |
| Media display rule | Yes | Yes | Yes |
| Adaptive UX: device, capability, content depth | Yes | Yes | Yes |
| Adaptive UX: kind of work, volume, client identity | Yes | No | No |
| Case-study block catalogue, All screens block, viewer | Yes | No | No |
| `figure`, `quote`, `table`, `video`, `loop` | Yes | Likely reusable in the article body; not yet specified | Not yet specified |
| Blog layout (`blocks/blog-post.md`, `--article-*` tokens) | No | Yes, already built | No |
| Service blocks (`BentoBlock`, `ServiceSpotlightPanel`, `ProcessMap`, toolkit grid, pillar theme tokens) | No | No | Yes, already built; five sign-offs open |

Still to plan: a block list for the blog article body, a block list for service pages, and which case-study blocks are promoted to shared ones. Proposed order: case studies first.

### 15. Og image, cards, tiles and made files

| Part | Owner |
|---|---|
| Which file is used (an existing R2 file first) | `wugweb-work` |
| How the og image, cards and tiles are composed on the site | wugweb-kits |
| Wiring the og image into the page head | Ordinary engineering work under `CLAUDE.md` |

**Made files outside the site (deck slides, carousel slides, charts)** take their values from the token map so they do not drift:

1. `src/styles/global.css` stays the source; the generated `system-map.json` is the portable copy.
2. The Map mode also outputs a short token sheet: colours as hex, type families and weights, the type scale as fixed px, the spacing ramp, radius by role.
3. The same rules apply: yellow 10% or less, text never pure white, buttons `--radius-sm`, chips `--radius-full`.
4. A made file lists the token names it used; a value with no token is a finding.
5. Kits supplies values and rules only. `wugweb-work` makes the file, per file, on the owner's yes.

### 16. Matrix row and new open questions

**MATRIX ROW: wugweb-kits**

- **Owns:** The Kits design system: tokens, layout shell, components, block docs, block catalogue, adaptive UX, motion and accessibility rules, how media is shown, composition of og images, cards and tiles, and the token audit itself.
- **Reads:** `src/styles/global.css`, `kits_design_system/docs/`, component and page code, rendered pages. From `wugweb-work`: content shape and chosen media. From `wugweb-brand-os`: art direction. From `wugweb-seo`: requests to check.
- **Produces:** Inventory, system map, audit findings by rule id, current to proposed change sets, component specs and block docs, layout per block and tier, gate results, a token sheet for decks and cards.
- **Calls:** `design-qa`, `responsive-token-engine`, `design:design-system`, `frontend-design`, `design-taste-frontend`, `design:accessibility-review`, `web-quality-accessibility`, `ux-ui-audit`, `ui-ux-pro-max` and `gsap-react` for second opinions; `skill-creator` and `skill-development` to build itself. Reports only.
- **May not change:** Copy, voice, art direction, SEO fields, chosen media or media files, site code, build config, Notion, Sanity, R2. No token, component or file is deleted or refactored without the owner's yes. Live colour values stay.

**New open questions.**

1. Done: the rename copy exists. Open: when to commit it, and when the owner retires the old skill in the Claude app.
2. Version after the rename: the mapper is 1.0.0 and this plan says 0.1.0. Proposed: 2.0.0.
3. Home: repo only, or also re-uploaded to the Claude app as wugweb-kits. Proposed: repo first.
4. Should the generic mapper core stay usable on other projects, with the Wugweb parts in separate rule sections? Proposed: yes.
5. Fixed type sizes per format for decks and cards (for example 1200 x 630, 1080 x 1350, 16:9). None exist today.

### 17. Links with the other skills, final

Every link reads the same on both sides.

| With | Link |
|---|---|
| `wugweb-work` | Work gives content shape and chosen media; kits gives layout, blocks, gate results and block docs. When kits needs visible wording (a label, alt text), it asks work, which writes it and runs the voice check. |
| `wugweb-brand-os` | Brand-os gives art direction (Visual OS); kits gives design-system detail and contrast results. |
| `wugweb-seo` | Split by where the fault is. An audit finding on one page goes from seo to `wugweb-work` as a fix list. A finding that repeats on every page using a block (alt text, lazy loading, heading order, image sizes) comes to kits, and kits answers with its check result. Neither edits code. |
| `wugweb-voice` | No link. |
| `wugweb-strategy` | No direct link; it reaches kits through `wugweb-work`. |

### 18. Works beyond Claude

The skill must be usable from GPT, Cursor or another tool, not only Claude.

| Requirement | How the plan meets it |
|---|---|
| Rules in plain Markdown any model can follow | One rule per file in `rules/`, each with an incorrect and a correct example. No Claude-specific syntax in rules or references. |
| Claude-only helpers are optional | Every helper skill, plugin and connector is a second opinion. Each mode has a by-hand procedure in the skill itself; a missing helper is skipped and reported. |
| Scripts are plain Node | `kits-inventory.mjs`, `kits-doc-drift.mjs`, `kits-check-page.mjs`, `validate.mjs`, `build.mjs`: Node 18 or later, zero dependencies, no Claude tooling. They run from a terminal or CI. |
| Tool and vendor wiring in one file | `references/skill-map.md` holds the helper names and anything that names Claude, Notion, Sanity, R2 or Cloudflare. Nothing else in the skill names a vendor. |
| Single-file export | `AGENTS.md`, already generated by `build.mjs` from the rule files, extended to include the workflow and the references. It can be pasted or attached in GPT, and Cursor reads `AGENTS.md` by convention. `build.mjs --check` fails when it is stale. |
| Same result from the export | An eval runs the same audit prompt on a fixed fixture twice: once with the skill loaded in Claude, once with only `AGENTS.md` given to a model with no skill. Passes when both return the same findings by rule id. |

**SKILL.md carries the core rules on its own.** Other tools may not load reference files on demand. So the always-on rules and the key numbers (gutter 16 / 32 / 48, rhythm 48 / 70 / 96, content max 1200, tiers 375 / 768 / 1200, buttons 44, contrast 4.5:1 and 3:1, yellow 10% or less) sit in the `SKILL.md` body itself, and `AGENTS.md` inlines every rule and reference. Open question: the mapper's body is already 1,919 words, so either its long phase text moves into references or the body limit rises above 2,000 words. Proposed: move the phase text.

**What works only in Claude today, stated plainly.**

| Item | Why | Outside Claude |
|---|---|---|
| Automatic triggering from the `SKILL.md` description | Agent Skills feature | The user attaches `AGENTS.md` or points the tool at it |
| Rendered-page checks: gutter, rhythm and columns at 375, 768, 1200; sideways scroll; contrast through the ancestor stack; reduced motion; viewer keyboard and swipe | Need a real browser; today done in the Claude browser pane | Done by hand in any browser from the gate checklist. Markup checks (ids, names, alt, headings, lazy loading) run from `kits-check-page.mjs` anywhere. |
| Helper skills and the Notion connector | Claude plugins | Skipped; the by-hand procedure is used |
| `pane-measuring.md` | About the Claude browser pane only | Not needed |

**Open question.** Automating the rendered-page checks outside Claude needs a headless browser such as Playwright, which is a new dev dependency. Proposed: not for v0.1; keep them by hand outside Claude.

### 19. Extracted and absorbed

Read only, 2026-11-16. 28 installed skills were read for what wugweb-kits can take. Absorb means the rule is rewritten in our own plain words inside the skill, so it works with no helper installed. Nothing was installed, removed or edited. Where a helper clashes with an owner rule or with `kits_design_system/docs/`, the owner rule and the docs win.

| Source skill | What is taken | Lands in | Decision | Clash |
|---|---|---|---|---|
| `token-mapping-engine` | Class every token as derived, scaled or explicit. Name coupling groups (radius with shadow, font size with line height). Before a token edit, list its aliases, derived tokens, family and group peers, with counts. | `references/token-change.md`, new rule `token-change-impact` | Absorb; keep as optional helper | Expects a `tokens.map.json`. Ours is `system-map.json`, generated from `global.css`. |
| `responsive-token-engine` | Mobile value sits in `:root`; larger tiers override only where the value differs; each value is assigned, never computed from another; no device words in token names. | New rule `shell-responsive-values` | Absorb, adapted; keep as optional helper | Assumes three breakpoints and a JSON source. House rule is five literal breakpoints and `global.css`. |
| `3x-token-emitter` | Compare the documented values with the source on every run; never invent a value the owner did not give. | `kits-doc-drift.mjs` (already planned) | Absorb those two; ignore the rest | Forbids literal breakpoints in stylesheets. House rule uses literals. |
| `design-qa` | Gate order: static checks first, rendered checks second, manual sign-off last. Check every component state, not only default. Manual list: keyboard, 400% reflow, 200% text spacing, reduced motion, forced colours. | `references/gate.md` | Absorb; keep as optional helper | Stored screenshot baselines are not used. |
| `design:design-system` | Token coverage per category (tokens defined against hardcoded uses found). Before a new component, list the existing ones and why each is not enough. | Audit report format, `references/spec-templates.md` | Absorb; keep as optional helper | None |
| `design:design-handoff` | Content edge cases in every spec: character limits, truncation, empty and long text. One row per tier saying what changes and why. Motion table: element, trigger, animation, duration token, easing token. | Block doc and component spec templates | Absorb | Its breakpoint bands. Ours are the 375, 768, 1200 tiers. |
| `design-system` (owner's own) | State priority when several apply: disabled, loading, active, focus, hover, default. Variants set the component's own custom properties in the modifier class. | Rules `component-complete-state-set`, `component-variants-not-booleans` | Absorb those two; ignore the rest | Its checker lets pure white and black through; sample button radius and rem values differ; has a Tailwind file. |
| `musiclinkd-design-system-live` | A token budget: a new token needs a written reason and the count of literals it replaces. Third repeat of an inline value means a token is missing. A dated anti-pattern log. Counts are dated snapshots, re-measured before they are quoted. | `references/token-change.md`, new `references/anti-pattern-log.md` | Absorb | Its deprecation ends in removal and its self-update writes files. Here both are proposals needing the owner's yes. |
| `ux-ui-audit` | Every finding carries a measurement; text over an image or gradient is reported as unverifiable, never a pass. Large text is 24px, or 18.66px bold. Test focus only after a real Tab press. Count distinct rendered sizes, spacings, radii and colours as a conformance number. Test an intermittent fault 4 times. | `references/accessibility.md`, `references/gate.md` | Absorb; keep as the lead optional helper | May flag the yellow final CTA. Its screenshots are not saved. |
| `web-quality-accessibility` | Focus ring via `:focus-visible`, never removed; a focused item never sits under the sticky header; `aria-current` on the current nav link. | `a11y-*` rules | Absorb; keep as optional helper | Flags muted autoplay video; gives the wrong sizes for large text; fixes code. |
| `design:accessibility-review` | Report tables: contrast (element, colours, ratio, required, pass) and keyboard (tab order, Enter, Escape, arrows). | Gate report format | Absorb the format; keep as optional helper | Flags muted autoplay; can create tickets. |
| `website-design:review-page` | A page that was not rendered is reported as not seen. Fixes are tiered: must, should, nice to have. The main action is on the first screen at 375. Lines are 75 characters or fewer. | `references/gate.md`, `references/composition.md` | Absorb; keep as optional helper | Tests at 1440; calls glass panels generic. |
| `website-design:design-system` | Every token is documented with its value and its role. Body text is 16px or more. | Doc drift check | Absorb those two; ignore the rest | It picks a new design direction. Ours is fixed. |
| `gsap-react` | One scoped GSAP context per block, reverted on teardown. Selectors never match outside the block. GSAP runs in the browser only. Plugins are registered once. On change, revert and rebuild. | `motion-*` rules | Absorb the principles; keep as optional helper | Its code is React. The site has no React components. |
| `ui-ux-pro-max` | Exits run faster than enters. A stagger covers about 8 items at most. At most 2 pinned sections a page. Refresh ScrollTrigger after fonts and images load. Loops pause off screen. Fixed bars keep safe-area padding. Chips wrap before their labels shrink. 8px between tap targets. | `motion-*`, `a11y-*`, `kits-*` rules | Absorb; keep as optional lookup | Generates palettes and fonts; suggests 1440; has parallax and auto-rotate presets. |
| `design-taste-frontend` | The hero fits the first screen. A bento has as many cells as content. Every block states how it collapses below 768. Animate transform and opacity only. No window scroll listeners. | `references/layout-grammar.md`, `references/composition.md`, `motion-*` rules | Absorb those; otherwise optional | Tailwind, React and the Motion library; own fonts and palettes; other breakpoints; parallax; 1px glass borders. |
| `frontend-design` | One motion moment per page. Numbering only for a real sequence. Review from the rendered page, not the code. Check that section padding and component rules do not cancel each other. | `references/composition.md`, `references/gate.md` | Absorb those; otherwise optional | Its purpose is a new identity; accepts hairlines. |
| `superdesign` | Variations explore layout and structure, never style. A logo slot shows the real logo. | `references/composition.md` | Absorb those two; ignore the tool | Tailwind templates; crops images; uploads to its own storage. |
| `banner-design`, `design` | For og images and cards: key content in the central 80%; headline 32px or more and body 16px or more at 1200 wide; one action. Size list: og 1200 x 630 (from `hcti-open-graph-images`; `banner-design` says 1200 x 628), LinkedIn 1200 x 627, square 1080 x 1080, portrait 1080 x 1350, story 1080 x 1920. | Section 15, token sheet for made files | Absorb the sizes and safe zone; ignore the tools | They generate new images and save them locally. |
| `design:design-critique` | Nothing written in. | | Optional helper | No exemptions, so it may flag the yellow final CTA. |
| `cloudflare:web-perf` | Images without width and height cause layout shift (already a kits rule). | Existing rule | Optional helper | Recommends re-encoding images. |
| `tailwind-design-system`, `ui-styling` | Nothing. | | Ignore | Tailwind, shadcn and React. |
| `system-design` | Nothing. | | Ignore | Backend architecture, not design systems. |
| `sleek-design-mobile-apps` | Nothing. | | Ignore | A paid native-app generator; no PWA layout rules. |
| `html-css-to-image:hcti-open-graph-images` | Nothing for kits. | | Ignore | Hosts new images outside R2. |
| `web-design-guidelines` | Nothing. | | Ignore | Its rules are fetched from an unpinned remote file. |

**Limits of this read.**

- Five skills (`responsive-token-engine`, `token-mapping-engine`, `3x-token-emitter`, `tailwind-design-system`, `design-qa`) are a `SKILL.md` only on this machine. The scripts they mention are not installed, so kits writes its own checks.
- `ui-ux-pro-max` data files and four `superdesign` reference files were sampled, not read in full.
- Not read, outside this skill's ownership: `brandkit`, `brand-guidelines`, `theme-factory`, `refactor`, `web-artifacts-builder`.
- The rules above are restated, not copied. Each absorbed rule file will name its source.

**House rules that override the helpers.** Tap targets: buttons and links are 44px; under 24px fails. Muted looping video is allowed. The yellow final CTA is never flagged. Tiers are 375, 768 and 1200.

**Passed to other skills.**

- FOR `wugweb-seo`: the og and twitter tag set must be in server HTML; a unique title per route; Core Web Vitals thresholds (LCP 2.5s, CLS 0.1, INP 200ms) as audit lines.
- FOR `wugweb-work`: hero copy limits (headline 2 lines or fewer, subtext 20 words or fewer); the two-second test and five lenses from `design:design-critique` for the Look mode; which platform size a made file uses.
- FOR `wugweb-brand-os`: `brandkit`, `brand-guidelines` and `theme-factory` were not read here and sit in its domain.
- FOR engineering under `CLAUDE.md`: GSAP runs in the browser only; ScrollTrigger refresh after fonts and images load.

**Second batch, 2026-11-16.** 19 more skills, same method. Already covered in the first batch and not re-read: `sleek-design-mobile-apps`, `website-design:design-system`, `website-design:review-page`, `hcti-open-graph-images`, `musiclinkd-design-system-live`.

| Source skill | What is taken | Lands in | Decision | Clash |
|---|---|---|---|---|
| `musiclinkd-design-system`, `musiclinkd-design-system-live` (as worked examples of shape) | A short `SKILL.md` with a "where truth lives" table, a few numbered "rules that actually get broken" each with measured evidence, and a before, during and before-shipping rhythm. References point at the repo's docs and do not restate values. Before reporting a finding, check whether the repo already logs it. The hit area is 44px even when the visible control is smaller. Never `maximum-scale=1`. | `SKILL.md` body, `references/`, `a11y-*` rules | Absorb the shape and those rules | Its scales and token ceiling are MusicLinkd's and are not imported. |
| `code-review` (plugin command) | Two passes: find, then verify each finding separately; an unverified finding is dropped. A rule is cited only when it can be quoted and applies to that file. A written list of known false positives. One entry per issue. "No findings" also says what was checked. | `references/gate.md`, new `references/false-positives.md` | Absorb the method; keep as optional helper | It can post comments on a pull request. Kits only reports. |
| `refactor` | Its smell names as audit categories (a magic number is a hardcoded value where a token exists). For a refactor proposal: behaviour stays identical, one change at a time, never mixed with a feature change. | Refactor proposal mode | Absorb the vocabulary; ignore the actions | It edits code and deletes dead code. |
| `data:data-visualization` | Colour is never the only signal (add labels or patterns). One accent for the key point, grey for the rest. 8 hues at most. Alt text states the finding. | New `references/charts.md`, token sheet for made files | Absorb; keep as optional helper | Ships its own colour palettes. Ours use existing tokens only. |
| `website-design:landing-page` | The hero image loads first and the rest lazily. Fonts must not hide text while loading. The report says what could not be checked. | `references/gate.md` | Absorb those; keep as optional helper | Checks at 1440; writes copy and builds. |
| `seo-skills:seo-images` | Every image has width and height, or an aspect ratio. The attribute ratio is within 5% of the displayed ratio. The largest first-screen image is not lazy and has high fetch priority. Images below the first screen are lazy with async decoding. Alt is present; empty alt only for decoration. | `media-*` rules, `kits-check-page.mjs` | Absorb the display side; keep as optional helper | Recommends converting, compressing, resizing into variants and renaming files. The media rule forbids all four. Needs a Firecrawl connector. |
| `rampstack-seo:seo-technical`, `searchfit-seo:technical-seo` | Nothing on the first screen is lazy loaded. No sideways scroll; viewport meta set. Body text 16px or more. Layout causes of shift named in the gate: unsized media, late-injected content, font swap. | `references/gate.md` | Absorb the layout side only | Ask for format conversion; list FAQ and HowTo schema; framed as audit and fix. |
| `seo-skills:seo-sxo` | Nothing new for kits (first-screen composition is already covered). | | Ignore for kits | Recommends FAQPage and HowTo schema. |
| `hcti-image-generation` | Nothing. | | Ignore | Every call makes a new image hosted outside R2. |
| `social-media-skills:platform-specs-and-validation` | Nothing. It holds no pixel sizes, ratios or safe areas. | | Ignore for kits | Uploads media and publishes posts. |
| `web-artifacts-builder`, `theme-factory` | Nothing. | | Ignore | React and Tailwind; new palettes and fonts. |
| `brightdata-plugin:design-mirror` | Nothing. | | Ignore; do not run | Scrapes other sites and restyles the codebase to match them; its scripts turn off certificate checking. |
| `framer`, `framer-code-components` | Nothing. | | Ignore | Zero Framer rule; React. |

**Notes on the second batch.**

- Not on disk, so not read: `dataviz`, `artifact-design`, `simplify` and the built-in `code-review`. They are built into Claude. The `data-visualization` skill and the `code-review` plugin command were read in their place.
- Severity: only the mapper itself has a severity scale (Blocker, High, Medium, Low). No other skill read has rule ids with severity, so kits extends the mapper's scale to its new rule sections.
- Card and tile sizes are thin. The skills disagree on the og image (1200 x 630 or 1200 x 628) and on the story safe zone, and give nothing for Behance or Dribbble covers. Proposed: og 1200 x 630; the rest stays open until the owner gives sizes.

**Passed to other skills, second batch.**

- FOR `wugweb-seo`: alt wording, file names and image weight are its side of `seo-images` (weights reported as facts only, since files are not re-encoded); the `seo-sxo` page-type scoring; both technical SEO skills recommend FAQPage and HowTo, which the owner rule forbids.
- FOR `wugweb-work`: `platform-specs-and-validation` covers per-platform text limits and a validate-before-publish call for the social module; it holds no image sizes.

**Third batch, 2026-11-16.** Routed from the `wugweb-brand-os` reading as proposals to check. Three skills were new; the other five named (`ui-ux-pro-max`, `design:design-critique`, `website-design:review-page`, `website-design:design-system`, `design-taste-frontend`) are already in the tables above.

| Source skill | What is taken | Lands in | Decision | Clash |
|---|---|---|---|---|
| `brand` (owner's own) | The shape of a logo slot spec: a minimum size, and clear space equal to the height of the mark. An accent share of 5% to 10%, which matches the yellow rule. | `kits-*` rules for logo slots; the values come from `wugweb-brand-os` | Absorb the spec shape; ignore the values | Its type scale, fonts and colours are a generic template. Its sync script writes a token file from a brand document; here `global.css` is the source, so it is not run. |
| `social-media-skills:infographic-and-data-viz` | Bars start at zero. No 3D, area distortion or dual axis. Labels sit on the data, not in a legend. One colour plus one accent. Source and date shown. One or two numbers are a big stat or a table, not a chart. Alt text states the takeaway. | `references/charts.md` | Absorb; keep as optional helper | Publishes through a third-party service; allows AI-made visuals. |
| `brand-guidelines` | Only the pattern: one treatment for text at or above a size threshold, another below it. Kits already assigns weight by role, so nothing new is written. | | Ignore | Its colours and fonts are another company's brand. |

**Notes on the third batch.**

- `ui-ux-pro-max` was proposed as "nearly all of it". The first batch sampled its 14 data files and did not read them in full. It stays an optional lookup; its palette, font and style generator is never used. A full read of its UX, chart and Astro rows can be done on request.
- Path correction noted: plugin skills live under the Claude app's own folders, not `~/.claude/plugins/`. Both batches already read them from there.

**Passed to other skills, third batch.**

- FOR `wugweb-brand-os`: the actual logo minimum sizes and clear space for Wugweb are its values to give; kits holds only the slot rule.
- FOR `wugweb-work`: "the chart title states the takeaway, not the axes" is a copy rule from `infographic-and-data-viz`.

**Fourth item, 2026-11-16.** Routed from the `wugweb-voice` reading as a proposal to check. It holds.

| Source skill | What is taken | Lands in | Decision | Clash |
|---|---|---|---|---|
| `design:ux-copy` | No wording. Only the list of places a component needs words: button label, error, empty state, confirmation, loading, success. Each component spec and block doc names its wording slots and gives each a length limit. | Component spec and block doc templates (the content edge cases row) | Absorb the slot list; the skill itself belongs to `wugweb-work` | Kits writes no copy. `wugweb-work` writes the words and runs the voice check. |

- FOR `wugweb-work`: the copy patterns in `design:ux-copy` (errors, empty states, confirmations, buttons) are its to use; kits hands it the slot names and limits.

**Fifth item, 2026-11-16.** Routed from the `wugweb-work` extraction as proposals to check. Most are already in the tables above. New for kits:

- Deck type sizes from `pptx` (title 36pt to 44pt, body 14pt to 16pt) go into the token sheet for made files as a proposal.
- One renderer per custom block type (`sanity:portable-text-serialization`) matches the planned one component per block. Noted in `references/block-catalogue.md`.
- Tables are for data only. Added to the `a11y-*` rules.
- Open clash for the owner: two helpers say a loop that plays by itself needs a pause control. The plan today has short muted loops with no control, stopped only by reduced motion. Proposed: keep loops at 15 seconds or less and add a pause control to any loop longer than 5 seconds.
- `wugweb-work` did not take the hero copy limits kits passed on; it has put that clash to the owner. Kits holds no copy limit of its own.

### 20. Enhancement inputs from the Skills project copy

A 48-file rebuild of the mapper sits in the Claude project "Skills" at `skills/wugweb-kits/` (session `cse_01H6F5RsB2d6PFWpQpS932gi`). It is not the skill. The owner decided on 2026-11-16 to keep it as a source of fixes only; the repo copy stays the skill. Each row is an input to the enhancement stage. Nothing here is applied.

The defects were first found in the installed `ui-system-mapper` 1.0.0. All six were then checked in the repo copy at `.claude/skills/wugweb-kits/` on 2026-11-16 and are present there.

| # | Current (repo copy, mapper 1.0.0) | Proposed | Ready in the project copy | Checked in the repo copy |
|---|---|---|---|---|
| 1 | `SKILL.md` never names the `rules/` files or the scripts. It restates rule text as "audit checks 1 to 12", a second home for the rules. | `SKILL.md` states each of the 21 rules in one line and points to its file. | `SKILL.md`. Needs the Kits scope and the reporting stance added. | Confirmed: 0 mentions of `rules/` or `scripts/`. |
| 2 | `rules/spec-measure-dont-claim.md` gives 5.17:1, 6.31:1 and 2.31:1. | Computed values: 5.17:1, 6.70:1 and 2.33:1. | The rule file | Confirmed for the second and third values. The first computes to 5.169, which rounds to 5.17, so it is already right; the project copy's 5.16 should not be carried over. |
| 3 | The same rule calls `scripts/contrast.mjs`, which does not exist. | Ship the script, or remove the call. | `scripts/contrast.mjs` | Confirmed: called in the rule and in `AGENTS.md`; no such file. |
| 4 | `rules/reuse-every-audit-ends-in-deletions.md` uses `--include='*.{css,ts,tsx}'`, which matches no files. | One `--include` per file type. | The rule file | Confirmed: the pattern matched 0 files in a test; a plain `*.css` matched 1. |
| 5 | `validate.mjs` lints rule files only, so "0 errors" does not cover rows 1 to 4. | A validator that checks the whole skill. | `scripts/validate.mjs`, 41 checks | Confirmed: it reads rules and sections only. |
| 6 | `audit.mjs` does not scan `.astro` files. | Scan `.astro` and count `@media` literals apart. | `scripts/audit.mjs`. Not ready: on a fixture with 1 real value it reported 6. Comments, `var()` fallbacks and data values still need skipping. | Confirmed: `.astro` is not in its file types. |

Not to carry over, because they conflict with this plan: `system-map.json` as the hand-edited source, the "delete list" wording, the pointers to `token-mapping-engine` and `token-emit-engine`, and version 2.0.0 (the version is still an open owner decision).

Effect on section 13: the statement that `validate.mjs` reports 0 errors is true but narrow. It does not mean the skill is free of defects.

### 21. Sizes for made files

Proposed, awaiting the owner's confirmation. The source list is on the registry page "Wugweb Skill Management System" under "Sizes for made files"; this table is what kits uses from it for composition and safe zones. If the two differ, the registry wins.

| Surface | Size | Safe zone | Status |
|---|---|---|---|
| Link share image (og) | 1200 x 630 | Key content in the central 80% | LinkedIn Help read directly: at least 1200 x 627, ratio 1.91:1, 5 MB at most. This settles the 630 or 628 question from section 19. |
| Behance cover | Upload at least 808 x 632; shown at 202 x 158 | Must read at 202 x 158 | Reported by search from the Behance Help Center; figures date from 2020; page not read directly. Unverified. |
| Dribbble shot | At least 1600 wide, no fixed ratio, up to 10 MB | Central 80% | Dribbble Help Center read directly. 1600 x 1200 is convention only. |
| Story | 1080 x 1920 | Top 270px, bottom 670px, 6% each side kept clear | Canvas size agreed. Safe zone not confirmed by any official page; the widest margins found are used. Unverified. |

The media rule still applies: these sizes are for files made on the owner's yes, per file. An existing R2 file is shown at these sizes only with its aspect ratio kept.
