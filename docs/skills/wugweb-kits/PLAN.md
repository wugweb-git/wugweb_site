> Plan for vetting, revision 6, 2026-11-16. Part of the Wugweb Skill System. Same content as the Plan section of the Notion page "wugweb-kits" (https://app.notion.com/p/41abb710b9ab81db87c5e03d81341818). Plan stage only: nothing goes to development until the owner says.

# wugweb-kits skill: plan

## Plan

### 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-kits` |
| Type | Claude Code project skill: one `SKILL.md` plus `rules/`, `references/`, `scripts/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned; open, see section 16) |
| Status | Renamed copy exists, uncommitted. Enhancements are plan only. |
| Owner | Vedanshu, Wugweb |
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
| `wugweb-seo` | Request to confirm alt text, lazy loading, headings, landmarks | Pass or fail list with file:line | Change titles, meta, schema or canonicals |
| `wugweb-strategy` | Nothing directly; it reaches kits through `wugweb-work` | Nothing | n/a |
| Ordinary engineering work under `CLAUDE.md` (there is no engineering skill) | Code, diffs, preview URL | Findings by rule id, current to proposed fixes, specs. Kits owns the check; engineering wires it into the build. | Edit code or build config; run build, sync or deploy |
| `wugweb-voice` | Nothing | Nothing | Touch writing style |

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

**Enhancements.** The Kits tokens and layout shell as the concrete system map; Astro and plain CSS notes in the adapted rules; new rule sections `shell-*`, `kits-*`, `media-*`, `motion-*`, `a11y-*`; `references/`, `examples/`, `evals/`; the block doc template; `kits-doc-drift.mjs` and `kits-check-page.mjs`; `audit.mjs` adapted to scan `.astro` files. The mapper's `SKILL.md` is already 1,919 words, so enhancements go into rules and references.

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
