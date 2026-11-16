<callout icon="📌" color="gray_bg">
Part of the Wugweb Skill System. Plan stage only. Nothing goes to development until the owner says.
</callout>

## Skill card

| Field | Value |
| --- | --- |
| Name | <code>wugweb-kits</code> |
| Type | Claude Code project skill (Agent Skill) |
| Version | 0.1.0 (planned) |
| Status | Renamed copy is on <code>main</code> (name change only). Enhancements are plan only. |
| Installed copies | Repo: <code>.claude/skills/wugweb-kits/</code> on <code>main</code>, 1.0.0. Claude app on this Mac: still <code>ui-system-mapper</code> 1.0.0; no <code>wugweb-kits</code> there. |
| Planned in session | wugweb-kits (<code>local_31fbe87e-842d-4d48-a8fb-8b3fe7768756</code>) |
| [SKILL.md](http://SKILL.md) written in session | <code>cse_01H6F5RsB2d6PFWpQpS932gi</code> (owner, 2026-11-16: the session where this discussion is converted to [SKILL.md](http://SKILL.md)) |
| Will live at | <code>.claude/skills/wugweb-kits/</code> |

## What it owns

The Kits design system: UI tokens, layout shell (page, section, content, blocks), components, primitives, patterns, block docs, layout rules for pages, adaptive UX, motion rules and accessibility. It is <code>ui-system-mapper</code> renamed and enhanced: the six-layer token model, the 21 rules and the audit workflow carry over.

## What it does not own

- Page content and copy.
- Which media proves which point (<code>wugweb-work</code> decides; kits decides how media is shown).
- High-level art direction (<code>wugweb-brand-os</code>).

## Rules already fixed

- Tokens only: no hardcoded colour, spacing, radius, opacity, shadow, blur, z-index or easing.
- The section owns the gutter; content is capped at 1200.
- Tiers 375, 768, 1200.
- Every section has an id and an accessible name.
- Media keeps its original aspect ratio; clipping masks are allowed.
- The token audit reports findings; it never deletes tokens or refactors without the owner's yes.

## Adaptive UX

The page adapts to content shape, content depth, kind of work, volume of screens, device, capability and conditions, and client identity. Full table on the wugweb-work plan page; it moves here.

## Helper skills

<code>design-qa</code>, <code>responsive-token-engine</code>, <code>design:design-system</code>, <code>frontend-design</code>, <code>design-taste-frontend</code>, <code>design:accessibility-review</code>, <code>ux-ui-audit</code>, <code>ui-ux-pro-max</code>, <code>gsap-react</code>, <code>web-quality-accessibility</code>.

## Hands off to and from

| With | Gives | Takes |
| --- | --- | --- |
| <code>wugweb-work</code> | Layout, blocks, how media is shown | Content shape and chosen media |
| <code>wugweb-brand-os</code> | Design-system detail | Visual OS direction |
| <code>wugweb-seo</code> | Confirmation of alt text and lazy loading | Requests to check |

## Waiting on the owner

- [ ] Should serious token findings block a merge, or only be reported?
- [ ] Confirm that resizing and masks are done on the page, not by making new files.

## Plan

Plan for vetting, 2026-11-16. Same content as <code>docs/skills/wugweb-kits/PLAN.md</code> in the repo. Both are at revision 6, 2026-11-16. Nothing is built.

### 1. Skill card

| Field | Value |
| --- | --- |
| Name | <code>wugweb-kits</code> |
| Type | Claude Code project skill: one <code>SKILL.md</code> plus <code>rules/</code>, <code>references/</code>, <code>scripts/</code>, <code>examples/</code>, <code>evals/</code> |
| Version | 0.1.0 (planned) |
| Status | Renamed copy is on <code>main</code>. Enhancements are plan only. Version is open, see section 16. |
| Installed copies | Repo: <code>.claude/skills/wugweb-kits/</code> on <code>main</code>, version 1.0.0, name change only. Claude app on this Mac: still <code>ui-system-mapper</code> 1.0.0, unchanged since 2026-11-14; no <code>wugweb-kits</code> installed there. |
| Owner | Vedanshu, Wugweb |
| Planned in session | wugweb-kits (<code>local_31fbe87e-842d-4d48-a8fb-8b3fe7768756</code>) |
| [SKILL.md](http://SKILL.md) written in session | <code>cse_01H6F5RsB2d6PFWpQpS932gi</code> (owner, 2026-11-16) |
| Lives at | <code>.claude/skills/wugweb-kits/</code> |
| Source of token values | <code>src/styles/global.css</code> <code>:root</code> |
| Source of specs | <code>kits_design_system/docs/</code> (<code>tokens/layout-shell.md</code> is authoritative for the shell) |
| Built in | <code>ui-system-mapper</code>, renamed to wugweb-kits and enhanced (owner, 2026-11-16). Baseline carried over: six-layer model, 21 rules, workflow, scripts. See section 13. |
| Used by | <code>wugweb-work</code>, any session touching UI |
| Writes | Nothing on its own. Returns reports and current to proposed change sets. |

### 2. About

<b>What it is.</b> The rulebook and procedure for the Kits design system: tokens, the layout shell (page, section, content, blocks), components, primitives, patterns, block docs, adaptive UX, motion and accessibility.

<b>What it is not.</b> It does not write copy, set voice or art direction, do SEO, or own build and deploy code. It decides how media is shown, never which media proves which point.

| Mode | In | Out |
| --- | --- | --- |
| Inventory | <code>global.css</code>, components, pages | Counts of raw values and tokens in use, measured |
| Map | Inventory | <code>system-map.json</code>: tokens by layer, components, consumes, used by, status |
| Audit | Files or a rendered page | Findings by rule id, with measured values and file and line, plus a delete candidates list |
| Refactor proposal | Audit findings | Current to proposed change set; nothing applied |
| Spec | A new or changed component or block | Component spec sheet or block doc, as a proposal |
| Layout | A block plan or page brief | Layout decision per block and tier (375, 768, 1200) |
| Gate | Rendered page | Pass or fail table at 375, 767, 768, 769, 1199, 1200, 1201 |

Every mode reports. None deletes tokens or refactors without the owner's yes.

### 3. Why

1. The rules exist but are spread over <code>design.md</code>, 24 token docs, <code>components.md</code>, 8 block docs, memory notes and the wugweb-work plan. Sessions apply them unevenly.
2. Docs and code have drifted (section 12). No one skill keeps them equal.
3. The case-study rebuild adds about 19 <code>Case*</code> components. Without one gate they will repeat old defects: hardcoded values, hairlines, a property with two owners.
4. Only one blocking check exists today (<code>check-sector-css.mjs</code>). Everything else is by hand.

### 4. Standard structure

```javascript
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

<b>Frontmatter (draft).</b>

```javascript
---
name: wugweb-kits
description: This skill should be used when the user asks to "check the tokens", "audit the design system", "map the UI", "write a block doc", "spec a component", "add or change a token", "fix the layout", "check the page at 375, 768 and 1200", "check the gutter or section padding", "review motion or reduced motion", or "check accessibility" on the Wugweb site, or mentions Kits, global.css, the layout shell, sections, blocks, breakpoints, buttons, chips, the yellow rule or GSAP reveals. It governs the Wugweb Kits design system: tokens, page, section, content and block layout, components, block docs, adaptive UX, motion and accessibility.
version: 0.1.0
---
```

<b>Body, 1,500 to 2,000 words, imperative.</b> Purpose, when to use and when not, the seven modes in one paragraph each, the always-on rules (15 or fewer, each with its reason), the never-do list, the reference index. Reference and rule files load only when a mode needs them.

### 5. What each reference file holds

| File | Holds |
| --- | --- |
| <code>six-layers.md</code> | The mapper's layer model mapped onto Kits (section 6) |
| <code>layout-shell.md</code> | Pointer to <code>kits_design_system/docs/tokens/layout-shell.md</code> plus a one-page summary: section owns the gutter, content max 1200, gutter 16 / 32 / 48, rhythm 48 / 70 / 96, columns 4 / 8 / 12, nav formula (68 bar, 100 / 108 header, 44 buttons), filters inside the grid section |
| <code>layout-grammar.md</code> | Media to block rules, rhythm, tiers, full-bleed method, identity accent |
| <code>block-catalogue.md</code> | The 23 block types and the <code>Case*</code> component list with their CSS rules |
| <code>adaptive-ux.md</code> | The seven adaptive lines, each with its rule and check |
| <code>composition.md</code> | One focal point per chapter, hierarchy, caption next to media, rhythm, white space, alignment to the 4 / 8 / 12 grid |
| <code>media-display.md</code> | Resize only with the original aspect ratio, clipping masks allowed, <code>object-fit</code> never <code>cover</code> on UI screens, all video muted (three readings open, section 10) |
| <code>patterns-rail-viewer.md</code> | Rail, All screens block and viewer specs (section 8) |
| <code>motion.md</code> | GSAP via <code>data-reveal</code>, <code>data-reveal-delay</code>, <code>data-scroll</code>; nav spring; duration and easing tokens; reduced motion; one owner per animated property; rails never auto-advance |
| <code>accessibility.md</code> | Every section has an id and an accessible name; one h1; no skipped levels; 44px targets; focus ring; contrast measured through the whole ancestor stack |
| <code>spec-templates.md</code> | Mapper spec sheet for components; <code>sector-showcase.md</code> shape for blocks. No dashes, ranges as inequalities. |
| <code>token-change.md</code> | How to propose a token add, change or removal: current to proposed, consumer list, doc to update |
| <code>gate.md</code> | Gate checklist, widths, severity list |
| <code>pane-measuring.md</code> | Hidden browser pane caveats, iframe <code>border: 0</code>, test at 1200 and never 1440 |
| <code>skill-map.md</code> | Helper skills per mode and what each may not do |

<b>Kits rules in </b><b><code>rules/</code></b><b>, beside the 21 mapper rules:</b> tokens only; radius by role (buttons <code>--radius-sm</code>, chips <code>--radius-full</code>, cards <code>--radius-lg</code>, panels <code>--radius-2xl</code>); yellow 10% or less, with <code>FooterCTA</code> staying yellow; live colour values frozen; no hairlines in the rendered result; nothing wider than the nav; nothing scales past the max width; breakpoints literal 480 / 640 / 768 / 1024 / 1200; block CSS lives only in its own component.

### 6. The mapper's six layers on Kits

<code>global.css</code> has 392 token declarations; 112 point at another token.

| Layer | Mapper meaning | In Kits today |
| --- | --- | --- |
| 1 Primitive token | Raw value, no meaning | <code>--neutral-0..10</code>, <code>--color-yellow</code>, <code>--svc-*</code> bases, <code>--r-*</code>, <code>--s-*</code>, <code>--opacity-*</code>, <code>--blur-*</code>, <code>--duration-*</code>, <code>--ts-*</code>, <code>--core-*</code> |
| 2 Semantic token | Role | <code>--color-surface-*</code>, <code>--color-text-*</code>, <code>--color-border-*</code>, <code>--fg</code>, <code>--fg-muted</code>, <code>--accent</code>, <code>--radius-sm..2xl</code>, <code>--gap-*</code>, <code>--fluid-*</code>, <code>--easing-*</code>, <code>--focus-*</code>, <code>--layer-*</code>, and the shell tokens <code>--shell-gutter</code>, <code>--section-y</code>, <code>--grid-gap</code>, <code>--header-height</code> |
| 3 Component token | Scoped binding | <code>--nav-*</code>, <code>--control-size</code>, <code>--article-*</code>, <code>--theme-*</code>, <code>--tag-hue</code>, planned <code>--case-accent</code> |
| 4 Primitive component | Structure only | <code>.wrap</code> (section), <code>.grid</code>, <code>.btn</code>, <code>.sr-only</code>, <code>.glass-panel</code> |
| 5 Component | Named UI role | <code>SiteHeader</code>, <code>SiteFooter</code>, <code>PostCard</code>, <code>FaqAccordion</code>, <code>FooterCTA</code>, planned <code>Case*</code> |
| 6 Composition | Assembled | Blocks (<code>SectorShowcase</code>, <code>BentoBlock</code>, <code>ProcessMap</code> and the like), then page sections |

The layout-shell values are layer 2 tokens stepped by breakpoint. Breakpoints stay literals in <code>@media</code>, so the raw-value check skips <code>@media</code> conditions.

<b>The 21 rules.</b>

| Rule | Verdict | Note for this repo (Astro, plain CSS variables, no Tailwind) |
| --- | --- | --- |
| <code>token-no-raw-values-in-components</code> | As is | Skip <code>var()</code> fallbacks, comments, <code>@media</code> literals and data values |
| <code>token-semantic-names-describe-role</code> | Adapt | Kits names are flat CSS variables. Apply to new tokens only; no renames. |
| <code>token-one-way-references</code> | Adapt | Components read primitives today. Report; do not auto-fix. |
| <code>token-no-alias-chains</code> | Adapt | Report chains longer than 2 hops; <code>--fg</code> and <code>--accent</code> shorthands are allowed |
| <code>token-component-tokens-earn-their-place</code> | As is | One-use tokens are reported |
| <code>map-single-source-of-truth</code> | Adapt | <code>global.css</code> stays the source; <code>system-map.json</code> is generated from it |
| <code>map-record-consumes-and-usedby</code> | As is | Built by scanning <code>.astro</code> style blocks and imports |
| <code>map-count-before-you-propose</code> | As is |  |
| <code>map-deprecate-with-a-pointer</code> | As is |  |
| <code>component-complete-state-set</code> | As is |  |
| <code>component-variants-not-booleans</code> | Adapt | Astro props and class modifiers |
| <code>component-slots-for-content</code> | Adapt | Astro <code><slot></code> and props |
| <code>component-no-outside-in-restyling</code> | Adapt | Looks for <code>:global()</code> overrides, <code>class</code> passthrough, block selectors outside their component |
| <code>reuse-promotion-ladder</code> | As is |  |
| <code>reuse-same-role-not-same-look</code> | As is |  |
| <code>reuse-collapse-duplicates-with-a-survivor</code> | Adapt | Proposal only; no merge without the owner's yes |
| <code>reuse-every-audit-ends-in-deletions</code> | Adapt | Becomes "every audit ends with a delete candidates list". Nothing is deleted without the owner's yes. |
| <code>spec-fixed-template</code> | Adapt | Two templates: component sheet and block doc |
| <code>spec-generate-dont-maintain</code> | Adapt | Only tokens consumed and used by are generated |
| <code>spec-measure-dont-claim</code> | As is |  |
| <code>spec-donts-from-real-misuse</code> | As is |  |

<b>Scripts.</b> The mapper's <code>audit.mjs</code> becomes <code>kits-inventory.mjs</code>, adapted to scan <code>.astro</code> files and skip the three false-positive classes. <code>validate.mjs</code>, <code>build.mjs</code> and <code>lib.mjs</code> are carried to lint and compile the rule files. The installed <code>ui-system-mapper</code> is left untouched.

### 7. Taken over from the wugweb-work plan

| Section of <code>docs/skills/wugweb-work/PLAN.md</code> | Lands in |
| --- | --- |
| "Adaptive UX" (seven-line table) | <code>adaptive-ux.md</code> |
| "Layout grammar" | <code>layout-grammar.md</code>, <code>motion.md</code>, <code>accessibility.md</code> |
| C1 block catalogue | <code>block-catalogue.md</code> |
| C2 <code>Case*</code> component list and CSS rules | <code>block-catalogue.md</code>, one spec per component |
| C4 client logic (rail, viewer) | <code>patterns-rail-viewer.md</code> |
| C5 CSS ownership guard | A rule in <code>rules/</code> |
| Composing-the-page half of design principles | <code>composition.md</code> |
| Media rule, display half | <code>media-display.md</code> |
| Standing rule 5 (tokens, yellow, GSAP, radius, breakpoints, PWA, hairlines) | <code>rules/</code> |
| Skill list rows: layout and adaptive UX, ship gate, accessibility second opinions | <code>skill-map.md</code> |
| Handoff rows: design review, layout helpers, ui-system-mapper | <code>skill-map.md</code> |
| Per-task tests: All screens block, viewer, layout, page gate | Section 9 |

Stays with <code>wugweb-work</code>: content rules, lengths, which screens prove which chapter, the reading-the-client's-work half of design principles, and the file half of the media rule (R2 only, no uploads, no crops, no re-encodes, no sound).

### 8. Pattern specs added

<b>All screens block.</b>

| Part | Spec |
| --- | --- |
| In a chapter | 1 ≤ proof screens ≤ 4, short captions, beside the text |
| Closing block | Set chips with counts (NTUC: Member 8, States 4, Dashboard 9, Back office 7, Cases 3) |
| Thumbnail grid, mobile | 3 columns for phone screens; 1 to 2 columns for desktop screens |
| Thumbnail grid, desktop | Denser; column counts open |
| Viewer | Full size, caption, "n of N, set name", previous and next buttons ≥ 44px, close, swipe; focus returns to the thumbnail |
| No JavaScript | Every set renders stacked under its own heading |

<b>Layout rules from the NTUC audit.</b>

| Rule | Check |
| --- | --- |
| Rail items fit the viewport | Item width ≤ 85vw on mobile |
| Snap | <code>proximity</code>, never <code>mandatory</code> |
| No empty grid cells | Cell count equals item count |
| Device mockups | ≤ 2 per page; never the only evidence in a chapter |
| Styles pair | 50:50 image pair at native ratio |
| Client accent | One per client. Rules and large numerals need ≥ 3:1; text needs ≥ 4.5:1. NTUC red <code>#EA1828</code> is 3.9:1, so rules and large numerals only. |

### 9. Handoff contracts and tests

| Skill | Goes in to kits | Comes out of kits | Kits may not |
| --- | --- | --- | --- |
| <code>wugweb-work</code> (every piece: case studies, blog posts, service pages, social and deck versions) | Block plan, media shapes, page brief | Layout per block and tier, gate result, block doc proposal | Write copy; decide which media proves which point |
| <code>wugweb-brand-os</code> | Visual OS: art direction, mood, colour meaning, type character | Tokens, components and layout rules that express it; contrast results | Set art direction; change brand colours or logo |
| <code>wugweb-seo</code> | Request to confirm alt text, lazy loading, headings, landmarks | Pass or fail list with file and line | Change titles, meta, schema or canonicals |
| <code>wugweb-strategy</code> | Nothing directly; it reaches kits through <code>wugweb-work</code> | Nothing | n/a |
| Ordinary engineering work under <code>CLAUDE.md</code> (there is no engineering skill) | Code, diffs, preview URL | Findings by rule id, current to proposed fixes, specs. Kits owns the check; engineering wires it into the build. | Edit code or build config; run build, sync or deploy |
| <code>wugweb-voice</code> | Nothing | Nothing | Touch writing style |

<b>Visual OS line.</b> Brand-os says what the brand should look and feel like and why. Kits turns that into exact values and rules and checks the code against them. A change of direction starts in brand-os; a change of value starts in kits as current to proposed.

<b>Helpers (proposals and reports only; the owner's rules win).</b> <code>anthropic-skills:design-qa</code>, <code>anthropic-skills:responsive-token-engine</code>, <code>design:design-system</code>, <code>anthropic-skills:frontend-design</code>, <code>anthropic-skills:design-taste-frontend</code>, <code>design:accessibility-review</code>, <code>anthropic-skills:web-quality-accessibility</code>, <code>ux-ui-audit</code>, <code>ui-ux-pro-max</code>, <code>anthropic-skills:gsap-react</code> (motion reference only), <code>anthropic-skills:skill-creator</code>, <code>anthropic-skills:skill-development</code>.

<b>Per-task tests.</b>

| Task | How it is tested | Passes when |
| --- | --- | --- |
| Inventory | Fixtures with planted hardcoded values, <code>var()</code> fallbacks, comments, <code>@media</code> literals | Every planted value found; zero false positives |
| Doc drift | <code>global.css</code> against <code>docs/tokens/</code> | Every token reported as documented, missing or mismatched |
| Shell | Rendered pages at 375, 768, 1200 | Gutter 16 / 32 / 48, rhythm 48 / 70 / 96, columns 4 / 8 / 12, no sideways scroll |
| Section labels | Rendered HTML of all routes | Every section has an id and an accessible name; 0 duplicate ids; 0 dangling references |
| Nav | 375, 768, 1200 | Bar 68, header 100 / 108 / 108, buttons 44, logo 40 |
| Yellow rule | Audit eval | <code>FooterCTA</code> not flagged; a planted second yellow surface flagged |
| Motion | Reduced-motion run; owner scan | Nothing animates under reduced motion; no property has two owners |
| Media display | Page with phone, landscape and masked media | No ratio change; no <code>cover</code> on UI screens; soft upscale reported |
| All screens block | NTUC page | Chips show 8, 4, 9, 7, 3; with JavaScript off every set is on the page |
| Viewer | Keyboard and touch | Caption and "n of N, set name"; previous, next, Esc and swipe work; focus returns |
| Rail | 375 | Every item ≤ 85vw; snap is <code>proximity</code> |
| Layout | Block-plan fixtures for 8 case studies | No block outside the catalogue; no empty cells |
| Block doc | Eval: write the doc for one block | Matches the template; no dashes |
| Token change | Eval: "add a token for X" | Current to proposed with consumers; nothing deleted or written |
| Boundaries | Eval: "rewrite this heading" | Hands off; does not do it |
| Page gate | 375, 767, 768, 769, 1199, 1200, 1201 | Pass or fail table with counts |

### 10. Owner decisions

<b>Decided.</b>

| Date | Decision |
| --- | --- |
| 2026-11-16 | <code>ui-system-mapper</code> is renamed wugweb-kits and enhanced (first stated as built in) |
| 2026-11-16 | Six skills: <code>wugweb-voice</code>, <code>wugweb-brand-os</code>, <code>wugweb-kits</code>, <code>wugweb-work</code>, <code>wugweb-strategy</code>, <code>wugweb-seo</code>. No engineering or social skill. |
| 2026-11-16 | The plan is saved on the Notion page and in the repo |

<b>Open.</b>

1. Should serious token findings block a merge, or only be reported? Recommendation: report only for v0.1, then block on a short list (hardcoded colour, z-index, block CSS outside its own component) once the inventory shows zero false positives. About 369 untokenized px literals exist today. Until decided: report only.
2. Media rule, three readings to confirm: resize and masks are done on the page in CSS, not by making new files; a mask must not hide the part of a screen that proves the claim; showing a file larger than its natural size is a quality flag, not a ban.
3. For the rail, viewer and CSS guard, kits owns the spec. Settled: the code is ordinary engineering work under <code>CLAUDE.md</code>, built to the kits spec.
4. Settled by section 13: the owner retires the installed <code>ui-system-mapper</code> in the Claude app after the renamed copy passes its checks.

### 11. Other open questions

1. Where rules live: proposed that token values and block docs stay in <code>kits_design_system/docs/</code> and the skill points to them.
2. The severity list: proposed colour and z-index serious, spacing px minor.
3. Path of the shared standing-rules file.
4. One definition of primitive, component, pattern and block across <code>widgets.md</code>, <code>components.md</code> and <code>blocks/</code>.
5. Whether the <code>/kits</code> showcase page and Storybook are in scope here or are ordinary engineering work under <code>CLAUDE.md</code>.
6. Whether <code>system-map.json</code> is committed, and where. Proposed: <code>kits_design_system/system-map.json</code>, generated.
7. Layer skips and alias chains already in the code: report only, or plan a clean-up pass?
8. Five block sign-offs are still open (Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map): approved patterns or drafts?
9. Desktop column counts for the All screens thumbnail grid.

### 12. Source gaps

| Gap | Where |
| --- | --- |
| <code>design.md</code> lists breakpoints 768 / 1024 / 1280; code says 1200 | <code>kits_design_system/docs/design.md</code> |
| <code>design.md</code> says yellow is never a surface; <code>FooterCTA</code> is the agreed exception | <code>design.md</code>, <code>components.md</code> |
| <code>design.md</code> source S1 points at <code>component/</code>, which was deleted | <code>design.md</code> |
| <code>--color-accent-primary</code> resolves to <code>--neutral-2</code>, not yellow as documented; never decided | <code>global.css</code>, <code>pending.md</code> |
| Motion is documented twice | <code>docs/motion.md</code>, <code>docs/tokens/motion.md</code> |
| No <code>components.md</code> entry for <code>FaqAccordion</code>, <code>InsightsBlock</code>, <code>PostCard</code>, <code>TeamGrid</code>, <code>PortableTextRenderer</code>, <code>industries/*</code> | <code>components.md</code> |
| <code>layout-shell.md</code> was verified at 1440; the rule is test at 1200 | <code>layout-shell.md</code> |
| The "Kits Responsive Token Contract" named by the 2026-09-22 audit does not exist | <code>pending.md</code> |
| Framer media aspect ratios are not mapped to sections | <code>layout-shell.md</code> |
| <code>--breakpoint-2xl</code> 1440 is declared and unused | <code>breakpoints.md</code> |
| <code>SiteFooter</code> entry lists <code>--line</code> as a top border, which may read as a hairline | <code>components.md</code> |
| <code>CLAUDE.md</code> still lists <code>motion</code> as a dependency | <code>CLAUDE.md</code> |
| The mapper's inventory script does not scan <code>.astro</code> files | <code>ui-system-mapper/scripts/audit.mjs</code> |
| No <code>blocks/case-study.md</code> and no <code>src/components/work/</code> yet | Planned |

None of these were changed. Each comes to the owner as current to proposed once the skill runs its first Map.

### 13. Rename: ui-system-mapper becomes wugweb-kits

The existing skill is the starting point. It gets the new name and is then enhanced. Rename done 2026-11-16 on the owner's go: the renamed copy is at <code>.claude/skills/wugweb-kits/</code>, uncommitted. The installed skill is untouched. Enhancements are not made.

<b>Baseline that carries over.</b>

| Part | Carries over |
| --- | --- |
| Six-layer model and the one-way rule | Unchanged |
| Workflow: inventory, map, audit, make it recyclable, spec sheets, keep it true | Unchanged |
| 21 rule files, <code>_sections.md</code>, <code>_template.md</code> | All kept; 10 as is, 11 adapted (section 6) |
| <code>system-map.json</code> shape, audit checks 1 to 12, findings format | Unchanged |
| Component spec sheet template | Unchanged, used for components |
| <code>validate.mjs</code>, <code>build.mjs</code>, <code>lib.mjs</code> | Unchanged |
| <code>AGENTS.md</code> | Still generated by <code>build.mjs</code> |
| <code>README.md</code>, <code>metadata.json</code> | Kept, name and abstract updated |
| Stance | Reports findings; never deletes tokens or refactors without the owner's yes |

<b>Enhancements.</b> The Kits tokens and layout shell as the concrete system map; Astro and plain CSS notes in the adapted rules; new rule sections <code>shell-*</code>, <code>kits-*</code>, <code>media-*</code>, <code>motion-*</code>, <code>a11y-*</code>; <code>references/</code>, <code>examples/</code>, <code>evals/</code>; the block doc template; <code>kits-doc-drift.mjs</code> and <code>kits-check-page.mjs</code>; <code>audit.mjs</code> adapted to scan <code>.astro</code> files. The mapper's <code>SKILL.md</code> is already 1,919 words, so enhancements go into rules and references. One exception is proposed in section 20, row 1.

<b>Read-only findings, 2026-11-16.</b>

- The installed folder is managed by the Claude app (its "Anthropic-managed skills for Claude Desktop" plugin, with a <code>manifest.json</code> that lists each skill by id). An in-place rename on disk is not safe.
- No secrets or personal paths in its 31 files (4 top-level files, 23 in <code>rules/</code>, 4 scripts).
- The skill names itself in 6 places: <code>SKILL.md</code> frontmatter and title, <code>AGENTS.md</code> title, <code>README.md</code> title and folder tree, and the title string in <code>scripts/build.mjs</code>.

<b>Result of the check: 31 files and 21 rules in both copies; only </b>[<b>SKILL.md</b>](http://SKILL.md)<b>, </b>[<b>AGENTS.md</b>](http://AGENTS.md)<b>, </b>[<b>README.md</b>](http://README.md)<b> and scripts/build.mjs differ; validate.mjs reports 0 errors; build.mjs --check reports </b>[<b>AGENTS.md</b>](http://AGENTS.md)<b> up to date; the old name remains only in the README rename line. How the rename was done.</b>

1. Copy the 31 files to <code>.claude/skills/wugweb-kits/</code> in the repo. The installed copy is not touched.
2. Change only the 6 name references and add one line to <code>README.md</code>: renamed from ui-system-mapper on 2026-11-16; enhancements are planned and not yet made.
3. Check: file and rule counts match, <code>validate.mjs</code> and <code>build.mjs --check</code> run, no leftover old name.
4. Leave it uncommitted until the owner says.
5. Two skills then exist side by side. Retiring the old <code>ui-system-mapper</code> is the owner's step in the Claude app's skill settings.

### 14. Two kinds of page

The detailed block catalogue so far was designed only for case studies. Blog posts and service pages have no equivalent catalogue yet.

| Rule or block | Case study | Blog post | Service page |
| --- | --- | --- | --- |
| Layout shell, tiers, nav, section labels | Yes | Yes | Yes |
| Tokens only, radius, yellow, hairlines, max width | Yes | Yes | Yes |
| Motion and accessibility rules | Yes | Yes | Yes |
| Media display rule | Yes | Yes | Yes |
| Adaptive UX: device, capability, content depth | Yes | Yes | Yes |
| Adaptive UX: kind of work, volume, client identity | Yes | No | No |
| Case-study block catalogue, All screens block, viewer | Yes | No | No |
| <code>figure</code>, <code>quote</code>, <code>table</code>, <code>video</code>, <code>loop</code> | Yes | Likely reusable in the article body; not yet specified | Not yet specified |
| Blog layout (<code>blocks/blog-post.md</code>, <code>--article-*</code> tokens) | No | Yes, already built | No |
| Service blocks (<code>BentoBlock</code>, <code>ServiceSpotlightPanel</code>, <code>ProcessMap</code>, toolkit grid, pillar theme tokens) | No | No | Yes, already built; five sign-offs open |

Still to plan: a block list for the blog article body, a block list for service pages, and which case-study blocks are promoted to shared ones. Proposed order: case studies first.

### 15. Og image, cards, tiles and made files

| Part | Owner |
| --- | --- |
| Which file is used (an existing R2 file first) | <code>wugweb-work</code> |
| How the og image, cards and tiles are composed on the site | wugweb-kits |
| Wiring the og image into the page head | Ordinary engineering work under <code>CLAUDE.md</code> |

<b>Made files outside the site (deck slides, carousel slides, charts)</b> take their values from the token map so they do not drift:

1. <code>src/styles/global.css</code> stays the source; the generated <code>system-map.json</code> is the portable copy.
2. The Map mode also outputs a short token sheet: colours as hex, type families and weights, the type scale as fixed px, the spacing ramp, radius by role.
3. The same rules apply: yellow 10% or less, text never pure white, buttons <code>--radius-sm</code>, chips <code>--radius-full</code>.
4. A made file lists the token names it used; a value with no token is a finding.
5. Kits supplies values and rules only. <code>wugweb-work</code> makes the file, per file, on the owner's yes.

### 16. Matrix row (superseded by section 23) and new open questions

<b>MATRIX ROW: wugweb-kits</b>

- <b>Owns:</b> The Kits design system: tokens, layout shell, components, block docs, block catalogue, adaptive UX, motion and accessibility rules, how media is shown, composition of og images, cards and tiles, and the token audit itself.
- <b>Reads:</b> <code>src/styles/global.css</code>, <code>kits_design_system/docs/</code>, component and page code, rendered pages. From <code>wugweb-work</code>: content shape and chosen media. From <code>wugweb-brand-os</code>: art direction. From <code>wugweb-seo</code>: requests to check.
- <b>Produces:</b> Inventory, system map, audit findings by rule id, current to proposed change sets, component specs and block docs, layout per block and tier, gate results, a token sheet for decks and cards.
- <b>Calls:</b> <code>design-qa</code>, <code>responsive-token-engine</code>, <code>design:design-system</code>, <code>frontend-design</code>, <code>design-taste-frontend</code>, <code>design:accessibility-review</code>, <code>web-quality-accessibility</code>, <code>ux-ui-audit</code>, <code>ui-ux-pro-max</code> and <code>gsap-react</code> for second opinions; <code>skill-creator</code> and <code>skill-development</code> to build itself. Reports only.
- <b>May not change:</b> Copy, voice, art direction, SEO fields, chosen media or media files, site code, build config, Notion, Sanity, R2. No token, component or file is deleted or refactored without the owner's yes. Live colour values stay.

<b>New open questions.</b>

1. Done: the rename copy exists. Open: when to commit it, and when the owner retires the old skill in the Claude app.
2. Version after the rename: the mapper is 1.0.0 and this plan says 0.1.0. Proposed: 2.0.0.
3. Home: repo only, or also re-uploaded to the Claude app as wugweb-kits. Proposed: repo first.
4. Should the generic mapper core stay usable on other projects, with the Wugweb parts in separate rule sections? Proposed: yes.
5. Fixed type sizes per format for decks and cards (for example 1200 x 630, 1080 x 1350, 16:9). None exist today.

### 17. Links with the other skills, final

Every link reads the same on both sides. This table replaces the <code>wugweb-seo</code> and <code>wugweb-voice</code> rows in section 9.

| With | Link |
| --- | --- |
| <code>wugweb-work</code> | Work gives content shape and chosen media; kits gives layout, blocks, gate results and block docs. When kits needs visible wording (a label, alt text), it asks work, which writes it and runs the voice check. |
| <code>wugweb-brand-os</code> | Brand-os gives art direction (Visual OS); kits gives design-system detail and contrast results. |
| <code>wugweb-seo</code> | Split by where the fault is. An audit finding on one page goes from seo to <code>wugweb-work</code> as a fix list. A finding that repeats on every page using a block (alt text, lazy loading, heading order, image sizes) comes to kits, and kits answers with its check result. Neither edits code. |
| <code>wugweb-voice</code> | No link. |
| <code>wugweb-strategy</code> | No direct link; it reaches kits through <code>wugweb-work</code>. |

### 18. Works beyond Claude

The skill must be usable from GPT, Cursor or another tool, not only Claude.

| Requirement | How the plan meets it |
| --- | --- |
| Rules in plain Markdown any model can follow | One rule per file in <code>rules/</code>, each with an incorrect and a correct example. No Claude-specific syntax in rules or references. |
| Claude-only helpers are optional | Every helper skill, plugin and connector is a second opinion. Each mode has a by-hand procedure in the skill itself; a missing helper is skipped and reported. |
| Scripts are plain Node | <code>kits-inventory.mjs</code>, <code>kits-doc-drift.mjs</code>, <code>kits-check-page.mjs</code>, <code>validate.mjs</code>, <code>build.mjs</code>: Node 18 or later, zero dependencies, no Claude tooling. They run from a terminal or CI. |
| Tool and vendor wiring in one file | <code>references/skill-map.md</code> holds the helper names and anything that names Claude, Notion, Sanity, R2 or Cloudflare. Nothing else in the skill names a vendor. |
| Single-file export | <code>AGENTS.md</code>, already generated by <code>build.mjs</code> from the rule files, extended to include the workflow and the references. It can be pasted or attached in GPT, and Cursor reads <code>AGENTS.md</code> by convention. <code>build.mjs --check</code> fails when it is stale. |
| Same result from the export | An eval runs the same audit prompt on a fixed fixture twice: once with the skill loaded in Claude, once with only <code>AGENTS.md</code> given to a model with no skill. Passes when both return the same findings by rule id. |

<b>What works only in Claude today, stated plainly.</b>

| Item | Why | Outside Claude |
| --- | --- | --- |
| Automatic triggering from the <code>SKILL.md</code> description | Agent Skills feature | The user attaches <code>AGENTS.md</code> or points the tool at it |
| Rendered-page checks: gutter, rhythm and columns at 375, 768, 1200; sideways scroll; contrast through the ancestor stack; reduced motion; viewer keyboard and swipe | Need a real browser; today done in the Claude browser pane | Done by hand in any browser from the gate checklist. Markup checks (ids, names, alt, headings, lazy loading) run from <code>kits-check-page.mjs</code> anywhere. |
| Helper skills and the Notion connector | Claude plugins | Skipped; the by-hand procedure is used |
| <code>pane-measuring.md</code> | About the Claude browser pane only | Not needed |

<b>Open question.</b> Automating the rendered-page checks outside Claude needs a headless browser such as Playwright, which is a new dev dependency. Proposed: not for v0.1; keep them by hand outside Claude.

### 19. Extracted and absorbed

Read only, 2026-11-16. 28 installed skills were read for what wugweb-kits can take. Absorb means the rule is rewritten in our own plain words inside the skill, so it works with no helper installed. Nothing was installed, removed or edited. Where a helper clashes with an owner rule or with <code>kits_design_system/docs/</code>, the owner rule and the docs win.

| Source skill | What is taken | Lands in | Decision | Clash |
| --- | --- | --- | --- | --- |
| <code>token-mapping-engine</code> | Class every token as derived, scaled or explicit. Name coupling groups (radius with shadow, font size with line height). Before a token edit, list its aliases, derived tokens, family and group peers, with counts. | <code>references/token-change.md</code>, new rule <code>token-change-impact</code> | Absorb; keep as optional helper | Expects a <code>tokens.map.json</code>. Ours is <code>system-map.json</code>, generated from <code>global.css</code>. |
| <code>responsive-token-engine</code> | Mobile value sits in <code>:root</code>; larger tiers override only where the value differs; each value is assigned, never computed from another; no device words in token names. | New rule <code>shell-responsive-values</code> | Absorb, adapted; keep as optional helper | Assumes three breakpoints and a JSON source. House rule is five literal breakpoints and <code>global.css</code>. |
| <code>3x-token-emitter</code> | Compare the documented values with the source on every run; never invent a value the owner did not give. | <code>kits-doc-drift.mjs</code> (already planned) | Absorb those two; ignore the rest | Forbids literal breakpoints in stylesheets. House rule uses literals. |
| <code>design-qa</code> | Gate order: static checks first, rendered checks second, manual sign-off last. Check every component state, not only default. Manual list: keyboard, 400% reflow, 200% text spacing, reduced motion, forced colours. | <code>references/gate.md</code> | Absorb; keep as optional helper | Stored screenshot baselines are not used. |
| <code>design:design-system</code> | Token coverage per category (tokens defined against hardcoded uses found). Before a new component, list the existing ones and why each is not enough. | Audit report format, <code>references/spec-templates.md</code> | Absorb; keep as optional helper | None |
| <code>design:design-handoff</code> | Content edge cases in every spec: character limits, truncation, empty and long text. One row per tier saying what changes and why. Motion table: element, trigger, animation, duration token, easing token. | Block doc and component spec templates | Absorb | Its breakpoint bands. Ours are the 375, 768, 1200 tiers. |
| <code>design-system</code> (owner's own) | State priority when several apply: disabled, loading, active, focus, hover, default. Variants set the component's own custom properties in the modifier class. | Rules <code>component-complete-state-set</code>, <code>component-variants-not-booleans</code> | Absorb those two; ignore the rest | Its checker lets pure white and black through; sample button radius and rem values differ; has a Tailwind file. |
| <code>musiclinkd-design-system-live</code> | A token budget: a new token needs a written reason and the count of literals it replaces. Third repeat of an inline value means a token is missing. A dated anti-pattern log. Counts are dated snapshots, re-measured before they are quoted. | <code>references/token-change.md</code>, new <code>references/anti-pattern-log.md</code> | Absorb | Its deprecation ends in removal and its self-update writes files. Here both are proposals needing the owner's yes. |
| <code>ux-ui-audit</code> | Every finding carries a measurement; text over an image or gradient is reported as unverifiable, never a pass. Large text is 24px, or 18.66px bold. Test focus only after a real Tab press. Count distinct rendered sizes, spacings, radii and colours as a conformance number. Test an intermittent fault 4 times. | <code>references/accessibility.md</code>, <code>references/gate.md</code> | Absorb; keep as the lead optional helper | May flag the yellow final CTA. Its screenshots are not saved. |
| <code>web-quality-accessibility</code> | Focus ring via <code>:focus-visible</code>, never removed; a focused item never sits under the sticky header; <code>aria-current</code> on the current nav link. | <code>a11y-*</code> rules | Absorb; keep as optional helper | Flags muted autoplay video; gives the wrong sizes for large text; fixes code. |
| <code>design:accessibility-review</code> | Report tables: contrast (element, colours, ratio, required, pass) and keyboard (tab order, Enter, Escape, arrows). | Gate report format | Absorb the format; keep as optional helper | Flags muted autoplay; can create tickets. |
| <code>website-design:review-page</code> | A page that was not rendered is reported as not seen. Fixes are tiered: must, should, nice to have. The main action is on the first screen at 375. Lines are 75 characters or fewer. | <code>references/gate.md</code>, <code>references/composition.md</code> | Absorb; keep as optional helper | Tests at 1440; calls glass panels generic. |
| <code>website-design:design-system</code> | Every token is documented with its value and its role. Body text is 16px or more. | Doc drift check | Absorb those two; ignore the rest | It picks a new design direction. Ours is fixed. |
| <code>gsap-react</code> | One scoped GSAP context per block, reverted on teardown. Selectors never match outside the block. GSAP runs in the browser only. Plugins are registered once. On change, revert and rebuild. | <code>motion-*</code> rules | Absorb the principles; keep as optional helper | Its code is React. The site has no React components. |
| <code>ui-ux-pro-max</code> | Exits run faster than enters. A stagger covers about 8 items at most. At most 2 pinned sections a page. Refresh ScrollTrigger after fonts and images load. Loops pause off screen. Fixed bars keep safe-area padding. Chips wrap before their labels shrink. 8px between tap targets. | <code>motion-*</code>, <code>a11y-*</code>, <code>kits-*</code> rules | Absorb; keep as optional lookup | Generates palettes and fonts; suggests 1440; has parallax and auto-rotate presets. |
| <code>design-taste-frontend</code> | The hero fits the first screen. A bento has as many cells as content. Every block states how it collapses below 768. Animate transform and opacity only. No window scroll listeners. | <code>references/layout-grammar.md</code>, <code>references/composition.md</code>, <code>motion-*</code> rules | Absorb those; otherwise optional | Tailwind, React and the Motion library; own fonts and palettes; other breakpoints; parallax; 1px glass borders. |
| <code>frontend-design</code> | One motion moment per page. Numbering only for a real sequence. Review from the rendered page, not the code. Check that section padding and component rules do not cancel each other. | <code>references/composition.md</code>, <code>references/gate.md</code> | Absorb those; otherwise optional | Its purpose is a new identity; accepts hairlines. |
| <code>superdesign</code> | Variations explore layout and structure, never style. A logo slot shows the real logo. | <code>references/composition.md</code> | Absorb those two; ignore the tool | Tailwind templates; crops images; uploads to its own storage. |
| <code>banner-design</code>, <code>design</code> | For og images and cards: key content in the central 80%; headline 32px or more and body 16px or more at 1200 wide; one action. Size list: og 1200 x 630, LinkedIn 1200 x 627, square 1080 x 1080, portrait 1080 x 1350, story 1080 x 1920. | Section 15, token sheet for made files | Absorb the sizes and safe zone; ignore the tools | They generate new images and save them locally. |
| <code>design:design-critique</code> | Nothing written in. |  | Optional helper | No exemptions, so it may flag the yellow final CTA. |
| <code>cloudflare:web-perf</code> | Images without width and height cause layout shift (already a kits rule). | Existing rule | Optional helper | Recommends re-encoding images. |
| <code>tailwind-design-system</code>, <code>ui-styling</code> | Nothing. |  | Ignore | Tailwind, shadcn and React. |
| <code>system-design</code> | Nothing. |  | Ignore | Backend architecture, not design systems. |
| <code>sleek-design-mobile-apps</code> | Nothing. |  | Ignore | A paid native-app generator; no PWA layout rules. |
| <code>html-css-to-image:hcti-open-graph-images</code> | Nothing for kits. |  | Ignore | Hosts new images outside R2. |
| <code>web-design-guidelines</code> | Nothing. |  | Ignore | Its rules are fetched from an unpinned remote file. |

<b>Limits of this read.</b>

- Five skills (<code>responsive-token-engine</code>, <code>token-mapping-engine</code>, <code>3x-token-emitter</code>, <code>tailwind-design-system</code>, <code>design-qa</code>) are a <code>SKILL.md</code> only on this machine. The scripts they mention are not installed, so kits writes its own checks.
- <code>ui-ux-pro-max</code> data files and four <code>superdesign</code> reference files were sampled, not read in full.
- Not read, outside this skill's ownership: <code>brandkit</code>, <code>brand-guidelines</code>, <code>theme-factory</code>, <code>refactor</code>, <code>web-artifacts-builder</code>.
- The rules above are restated, not copied. Each absorbed rule file will name its source.

<b>House rules that override the helpers.</b> Tap targets: buttons and links are 44px; under 24px fails. Muted looping video is allowed. The yellow final CTA is never flagged. Tiers are 375, 768 and 1200.

<b>Passed to other skills.</b>

- FOR <code>wugweb-seo</code>: the og and twitter tag set must be in server HTML; a unique title per route; Core Web Vitals thresholds (LCP 2.5s, CLS 0.1, INP 200ms) as audit lines.
- FOR <code>wugweb-work</code>: hero copy limits (headline 2 lines or fewer, subtext 20 words or fewer); the two-second test and five lenses from <code>design:design-critique</code> for the Look mode; which platform size a made file uses.
- FOR <code>wugweb-brand-os</code>: <code>brandkit</code>, <code>brand-guidelines</code> and <code>theme-factory</code> were not read here and sit in its domain.
- FOR engineering under <code>CLAUDE.md</code>: GSAP runs in the browser only; ScrollTrigger refresh after fonts and images load.

<b>Second batch, 2026-11-16.</b> 19 more skills, same method. Already covered in the first batch and not re-read: <code>sleek-design-mobile-apps</code>, <code>website-design:design-system</code>, <code>website-design:review-page</code>, <code>hcti-open-graph-images</code>, <code>musiclinkd-design-system-live</code>.

| Source skill | What is taken | Lands in | Decision | Clash |
| --- | --- | --- | --- | --- |
| <code>musiclinkd-design-system</code>, <code>musiclinkd-design-system-live</code> (as worked examples of shape) | A short <code>SKILL.md</code> with a "where truth lives" table, a few numbered "rules that actually get broken" each with measured evidence, and a before, during and before-shipping rhythm. References point at the repo's docs and do not restate values. Before reporting a finding, check whether the repo already logs it. The hit area is 44px even when the visible control is smaller. Never <code>maximum-scale=1</code>. | <code>SKILL.md</code> body, <code>references/</code>, <code>a11y-*</code> rules | Absorb the shape and those rules | Its scales and token ceiling are MusicLinkd's and are not imported. |
| <code>code-review</code> (plugin command) | Two passes: find, then verify each finding separately; an unverified finding is dropped. A rule is cited only when it can be quoted and applies to that file. A written list of known false positives. One entry per issue. "No findings" also says what was checked. | <code>references/gate.md</code>, new <code>references/false-positives.md</code> | Absorb the method; keep as optional helper | It can post comments on a pull request. Kits only reports. |
| <code>refactor</code> | Its smell names as audit categories (a magic number is a hardcoded value where a token exists). For a refactor proposal: behaviour stays identical, one change at a time, never mixed with a feature change. | Refactor proposal mode | Absorb the vocabulary; ignore the actions | It edits code and deletes dead code. |
| <code>data:data-visualization</code> | Colour is never the only signal (add labels or patterns). One accent for the key point, grey for the rest. 8 hues at most. Alt text states the finding. | New <code>references/charts.md</code>, token sheet for made files | Absorb; keep as optional helper | Ships its own colour palettes. Ours use existing tokens only. |
| <code>website-design:landing-page</code> | The hero image loads first and the rest lazily. Fonts must not hide text while loading. The report says what could not be checked. | <code>references/gate.md</code> | Absorb those; keep as optional helper | Checks at 1440; writes copy and builds. |
| <code>seo-skills:seo-images</code> | Every image has width and height, or an aspect ratio. The attribute ratio is within 5% of the displayed ratio. The largest first-screen image is not lazy and has high fetch priority. Images below the first screen are lazy with async decoding. Alt is present; empty alt only for decoration. | <code>media-*</code> rules, <code>kits-check-page.mjs</code> | Absorb the display side; keep as optional helper | Recommends converting, compressing, resizing into variants and renaming files. The media rule forbids all four. Needs a Firecrawl connector. |
| <code>rampstack-seo:seo-technical</code>, <code>searchfit-seo:technical-seo</code> | Nothing on the first screen is lazy loaded. No sideways scroll; viewport meta set. Body text 16px or more. Layout causes of shift named in the gate: unsized media, late-injected content, font swap. | <code>references/gate.md</code> | Absorb the layout side only | Ask for format conversion; list FAQ and HowTo schema; framed as audit and fix. |
| <code>seo-skills:seo-sxo</code> | Nothing new for kits (first-screen composition is already covered). |  | Ignore for kits | Recommends FAQPage and HowTo schema. |
| <code>hcti-image-generation</code> | Nothing. |  | Ignore | Every call makes a new image hosted outside R2. |
| <code>social-media-skills:platform-specs-and-validation</code> | Nothing. It holds no pixel sizes, ratios or safe areas. |  | Ignore for kits | Uploads media and publishes posts. |
| <code>web-artifacts-builder</code>, <code>theme-factory</code> | Nothing. |  | Ignore | React and Tailwind; new palettes and fonts. |
| <code>brightdata-plugin:design-mirror</code> | Nothing. |  | Ignore; do not run | Scrapes other sites and restyles the codebase to match them; its scripts turn off certificate checking. |
| <code>framer</code>, <code>framer-code-components</code> | Nothing. |  | Ignore | Zero Framer rule; React. |

<b>Notes on the second batch.</b>

- Not on disk, so not read: <code>dataviz</code>, <code>artifact-design</code>, <code>simplify</code> and the built-in <code>code-review</code>. They are built into Claude. The <code>data-visualization</code> skill and the <code>code-review</code> plugin command were read in their place.
- Severity: only the mapper itself has a severity scale (Blocker, High, Medium, Low). No other skill read has rule ids with severity, so kits extends the mapper's scale to its new rule sections.
- Card and tile sizes are thin. The skills disagree on the og image (1200 x 630 from <code>hcti-open-graph-images</code>, 1200 x 628 from <code>banner-design</code>) and on the story safe zone, and give nothing for Behance or Dribbble covers. Proposed: og 1200 x 630; the rest stays open until the owner gives sizes. This corrects the first batch row, which gave 1200 x 630 as if <code>banner-design</code> said so.

<b>Passed to other skills, second batch.</b>

- FOR <code>wugweb-seo</code>: alt wording, file names and image weight are its side of <code>seo-images</code> (weights reported as facts only, since files are not re-encoded); the <code>seo-sxo</code> page-type scoring; both technical SEO skills recommend FAQPage and HowTo, which the owner rule forbids.
- FOR <code>wugweb-work</code>: <code>platform-specs-and-validation</code> covers per-platform text limits and a validate-before-publish call for the social module; it holds no image sizes.

<b>Third batch, 2026-11-16.</b> Routed from the <code>wugweb-brand-os</code> reading as proposals to check. Three skills were new; the other five named (<code>ui-ux-pro-max</code>, <code>design:design-critique</code>, <code>website-design:review-page</code>, <code>website-design:design-system</code>, <code>design-taste-frontend</code>) are already in the tables above.

| Source skill | What is taken | Lands in | Decision | Clash |
| --- | --- | --- | --- | --- |
| <code>brand</code> (owner's own) | The shape of a logo slot spec: a minimum size, and clear space equal to the height of the mark. An accent share of 5% to 10%, which matches the yellow rule. | <code>kits-*</code> rules for logo slots; the values come from <code>wugweb-brand-os</code> | Absorb the spec shape; ignore the values | Its type scale, fonts and colours are a generic template. Its sync script writes a token file from a brand document; here <code>global.css</code> is the source, so it is not run. |
| <code>social-media-skills:infographic-and-data-viz</code> | Bars start at zero. No 3D, area distortion or dual axis. Labels sit on the data, not in a legend. One colour plus one accent. Source and date shown. One or two numbers are a big stat or a table, not a chart. Alt text states the takeaway. | <code>references/charts.md</code> | Absorb; keep as optional helper | Publishes through a third-party service; allows AI-made visuals. |
| <code>brand-guidelines</code> | Only the pattern: one treatment for text at or above a size threshold, another below it. Kits already assigns weight by role, so nothing new is written. |  | Ignore | Its colours and fonts are another company's brand. |

<b>Notes on the third batch.</b>

- <code>ui-ux-pro-max</code> was proposed as "nearly all of it". The first batch sampled its 14 data files and did not read them in full. It stays an optional lookup; its palette, font and style generator is never used. A full read of its UX, chart and Astro rows can be done on request.
- Path correction noted: plugin skills live under the Claude app's own folders, not <code>~/.claude/plugins/</code>. Both batches already read them from there.

<b>Passed to other skills, third batch.</b>

- FOR <code>wugweb-brand-os</code>: the actual logo minimum sizes and clear space for Wugweb are its values to give; kits holds only the slot rule.
- FOR <code>wugweb-work</code>: "the chart title states the takeaway, not the axes" is a copy rule from <code>infographic-and-data-viz</code>.

<b>Addition to section 18: </b>[<b>SKILL.md</b>](http://SKILL.md)<b> carries the core rules on its own.</b> Other tools may not load reference files on demand. So the always-on rules and the key numbers (gutter 16 / 32 / 48, rhythm 48 / 70 / 96, content max 1200, tiers 375 / 768 / 1200, buttons 44, contrast 4.5:1 and 3:1, yellow 10% or less) sit in the <code>SKILL.md</code> body itself, and <code>AGENTS.md</code> inlines every rule and reference. Open question: the mapper's body is already 1,919 words, so either its long phase text moves into references or the body limit rises above 2,000 words. Proposed: move the phase text.

<b>Fourth item, 2026-11-16.</b> Routed from the <code>wugweb-voice</code> reading as a proposal to check. It holds.

| Source skill | What is taken | Lands in | Decision | Clash |
| --- | --- | --- | --- | --- |
| <code>design:ux-copy</code> | No wording. Only the list of places a component needs words: button label, error, empty state, confirmation, loading, success. Each component spec and block doc names its wording slots and gives each a length limit. | Component spec and block doc templates (the content edge cases row) | Absorb the slot list; the skill itself belongs to <code>wugweb-work</code> | Kits writes no copy. <code>wugweb-work</code> writes the words and runs the voice check. |

- FOR <code>wugweb-work</code>: the copy patterns in <code>design:ux-copy</code> (errors, empty states, confirmations, buttons) are its to use; kits hands it the slot names and limits.

<b>Fifth item, 2026-11-16.</b> Routed from the <code>wugweb-work</code> extraction as proposals to check. Most are already in the tables above. New for kits:

- Deck type sizes from <code>pptx</code> (title 36pt to 44pt, body 14pt to 16pt) go into the token sheet for made files as a proposal.
- One renderer per custom block type (<code>sanity:portable-text-serialization</code>) matches the planned one component per block. Noted in <code>references/block-catalogue.md</code>.
- Tables are for data only. Added to the <code>a11y-*</code> rules.
- Open clash for the owner: two helpers say a loop that plays by itself needs a pause control. The plan today has short muted loops with no control, stopped only by reduced motion. Proposed: keep loops at 15 seconds or less and add a pause control to any loop longer than 5 seconds.
- <code>wugweb-work</code> did not take the hero copy limits kits passed on; it has put that clash to the owner. Kits holds no copy limit of its own.

### 20. Enhancement inputs from the Skills project copy

A 48-file rebuild of the mapper sits in the Claude project "Skills" at <code>skills/wugweb-kits/</code> (session <code>cse_01H6F5RsB2d6PFWpQpS932gi</code>). It is not the skill. The owner decided on 2026-11-16 to keep it as a source of fixes only; the repo copy stays the skill. Each row is an input to the enhancement stage. Nothing here is applied.

The defects were first found in the installed <code>ui-system-mapper</code> 1.0.0. All six were then checked in the repo copy at <code>.claude/skills/wugweb-kits/</code> on 2026-11-16 and are present there.

| # | Current (repo copy, mapper 1.0.0) | Proposed | Ready in the project copy | Checked in the repo copy |
| --- | --- | --- | --- | --- |
| 1 | <code>SKILL.md</code> never names the <code>rules/</code> files or the scripts. It restates rule text as "audit checks 1 to 12", a second home for the rules. | <code>SKILL.md</code> states each of the 21 rules in one line and points to its file. | <code>SKILL.md</code>. Needs the Kits scope and the reporting stance added. | Confirmed: 0 mentions of <code>rules/</code> or <code>scripts/</code>. |
| 2 | <code>rules/spec-measure-dont-claim.md</code> gives 5.17:1, 6.31:1 and 2.31:1. | Computed values: 5.17:1, 6.70:1 and 2.33:1. | The rule file | Confirmed for the second and third values. The first computes to 5.169, which rounds to 5.17, so it is already right; the project copy's 5.16 should not be carried over. |
| 3 | The same rule calls <code>scripts/contrast.mjs</code>, which does not exist. | Ship the script, or remove the call. | <code>scripts/contrast.mjs</code> | Confirmed: called in the rule and in <code>AGENTS.md</code>; no such file. |
| 4 | <code>rules/reuse-every-audit-ends-in-deletions.md</code> uses <code>--include='*.{css,ts,tsx}'</code>, which matches no files. | One <code>--include</code> per file type. | The rule file | Confirmed: the pattern matched 0 files in a test; a plain <code>*.css</code> matched 1. |
| 5 | <code>validate.mjs</code> lints rule files only, so "0 errors" does not cover rows 1 to 4. | A validator that checks the whole skill. | <code>scripts/validate.mjs</code>, 41 checks | Confirmed: it reads rules and sections only. |
| 6 | <code>audit.mjs</code> does not scan <code>.astro</code> files. | Scan <code>.astro</code> and count <code>@media</code> literals apart. | <code>scripts/audit.mjs</code>. Not ready: on a fixture with 1 real value it reported 6. Comments, <code>var()</code> fallbacks and data values still need skipping. | Confirmed: <code>.astro</code> is not in its file types. |

Not to carry over, because they conflict with this plan: <code>system-map.json</code> as the hand-edited source, the "delete list" wording, the pointers to <code>token-mapping-engine</code> and <code>token-emit-engine</code>, and version 2.0.0 (the version is still an open owner decision).

Effect on section 13: the statement that <code>validate.mjs</code> reports 0 errors is true but narrow. It does not mean the skill is free of defects.

### 21. Sizes for made files

Proposed, awaiting the owner's confirmation. The source list is on the registry page "Wugweb Skill Management System" under "Sizes for made files"; this table is what kits uses from it for composition and safe zones. If the two differ, the registry wins.

| Surface | Size | Safe zone | Status |
| --- | --- | --- | --- |
| Link share image (og) | 1200 x 630 | Key content in the central 80% | LinkedIn Help read directly: at least 1200 x 627, ratio 1.91:1, 5 MB at most. This settles the 630 or 628 question from section 19. |
| Behance cover | Upload at least 808 x 632; shown at 202 x 158 | Must read at 202 x 158 | Reported by search from the Behance Help Center; figures date from 2020; page not read directly. Unverified. |
| Dribbble shot | At least 1600 wide, no fixed ratio, up to 10 MB | Central 80% | Dribbble Help Center read directly. 1600 x 1200 is convention only. |
| Story | 1080 x 1920 | Top 270px, bottom 670px, 6% each side kept clear | Canvas size agreed. Safe zone not confirmed by any official page; the widest margins found are used. Unverified. |

The media rule still applies: these sizes are for files made on the owner's yes, per file. An existing R2 file is shown at these sizes only with its aspect ratio kept.

### 22. Routed from the wugweb-seo extraction

Proposals to check, 2026-11-16. Points on tap targets, body text size, image dimensions, contrast, focus, reduced motion and the skip link are already in section 19.

| Item | Decision |
| --- | --- |
| Links have a real <code>href</code>; no click handlers on bare <code>div</code> elements; buttons are named; inputs are labelled (<code>aeotester</code>) | Absorb into the <code>a11y-*</code> rules. The first two are new; the last two are already in <code>layout-shell.md</code>. |
| No render-blocking scripts in the head; hero image preloaded; server response under 800 ms (<code>cloudflare:web-perf</code>) | Not a kits rule. Passed on as engineering work under <code>CLAUDE.md</code>. Kits keeps only the layout causes of shift. |
| <code>web-review</code>, <code>ux-ui-audit</code>, <code>accessibility-review</code> and <code>design-qa</code> belong with kits | Agreed. All four are already optional helpers of kits in section 19. |

<b>Finding on the live code, recorded only.</b> <code>src/layouts/BaseLayout.astro</code> emits 9 of the 12 share tags. Missing: <code>og:site_name</code>, <code>og:image:alt</code>, <code>twitter:image:alt</code>. Reported by <code>wugweb-seo</code>; checked read only by kits on 2026-11-16 and confirmed. No code is edited. The tag set belongs to <code>wugweb-seo</code>; the fix is engineering work on the owner's go.

### 23. The enhancement as a spec, the settled matrix row, one more owner question

<b>Today's skill refers to none of this.</b> The skill at <code>.claude/skills/wugweb-kits/</code> is <code>ui-system-mapper</code> renamed. Checked on 2026-11-16: no file in it mentions <code>kits_design_system</code>, <code>global.css</code> or the layout shell. Everything below is a spec. Nothing is built.

<b>What </b><b><code>references/layout-shell.md</code></b><b> will hold.</b> A one-page summary, with every value pointing back to its source doc and none restated as a second source of truth.

| Part | Content | Source doc |
| --- | --- | --- |
| The rule | The section owns the gutter; the content owns the max width; blocks live inside content | <code>kits_design_system/docs/tokens/layout-shell.md</code> |
| Tiers | 375, 768, 1200; the shell steps only at 768 and 1200 | <code>layout-shell.md</code>, <code>breakpoints.md</code> |
| Gutter, rhythm, grid | Gutter 16 / 32 / 48; section padding 48 / 70 / 96; columns 4 / 8 / 12; column gap 16 / 24 / 32 | <code>layout-shell.md</code> |
| Max width | Content 1200; nav bar 1280; nothing non-full-bleed wider than the nav; nothing scales past the max width | <code>layout-shell.md</code> |
| Header and nav | Nav bar 68 on every tier; header 100 mobile, 108 tablet and desktop, derived never set; buttons 44; logo 40; bar inset 12 | <code>layout-shell.md</code>, <code>sizing.md</code> |
| Breakpoints | Literal 480 / 640 / 768 / 1024 / 1200 in <code>@media</code>; going down uses the step minus 0.02 | <code>breakpoints.md</code> |
| Labelling | Every section has an id and an accessible name; the five labelling defects | <code>layout-shell.md</code> |
| Checks | How each value is measured on a rendered page, and the measuring notes | <code>layout-shell.md</code> |

<b>The three design-system docs it points to:</b> <code>kits_design_system/docs/tokens/layout-shell.md</code> (authoritative), <code>kits_design_system/docs/tokens/breakpoints.md</code> and <code>kits_design_system/docs/tokens/sizing.md</code>. If the skill and a doc disagree, the doc wins and the skill is corrected.

<b>MATRIX ROW: wugweb-kits (settled links; replaces the row in section 16)</b>

- <b>Owns:</b> The Kits design system: tokens, layout shell, components, block docs, block catalogue, adaptive UX, motion and accessibility rules, how media is shown, composition of og images, cards and tiles, and the token audit itself.
- <b>Reads (sources):</b> <code>src/styles/global.css</code>, <code>kits_design_system/docs/</code> (<code>layout-shell.md</code> authoritative), component and page code, rendered pages at 375, 768 and 1200, its own rules and system map.
- <b>Gives to:</b> <code>wugweb-work</code>: layout and blocks per tier, gate results, block docs, wording slots with length limits, a token sheet for decks and cards. <code>wugweb-brand-os</code>: design-system detail and contrast results. <code>wugweb-seo</code>: its check result for a fault that repeats on every page using a block.
- <b>Takes from:</b> <code>wugweb-work</code>: content shape, chosen media, and any visible wording. <code>wugweb-brand-os</code>: art direction (Visual OS), logo sizes and clear space. <code>wugweb-seo</code>: block-wide findings to check. No link with <code>wugweb-voice</code>. <code>wugweb-strategy</code> reaches it only through <code>wugweb-work</code>.
- <b>Never does:</b> Writes copy, sets voice or art direction, edits SEO fields, picks or alters media files, edits site code or build config, writes Notion, Sanity or R2 outside its own plan page, or deletes or refactors tokens, components or files without the owner's yes.

<b>One more owner question: hero copy limits.</b> A helper skill (<code>design-taste-frontend</code>) gives a hero limit of a headline of 2 lines or fewer and subtext of 20 words or fewer. The <code>wugweb-work</code> plan already sets the subtitle at 90 characters or fewer. These differ. Kits holds no copy limit of its own; it needs one figure so the hero block's wording slot can state it. Which stands?