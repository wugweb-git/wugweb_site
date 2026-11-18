> STATUS, 2026-11-17, written by the coordinator session from main. This block replaces any older status, version or "not built" line further down. The skill sessions build the skill; the coordinator keeps this plan and the Notion page.
>
> - Built. Version 2.0.0 on main, 67 files, last skill commit acf19e9e. 26 rule files, the references and the scripts are written; the six mapper defects are fixed. Validate 0 errors, self test 7 of 7, doc drift 0 findings (as reported by the kits session).
> - Skill file body: 1,916 words by the shared count. Single-file export is in the skill folder.
> - Claude app and Cowork: not installed after the app reset on 2026-11-17. The kits session built the upload zip; the owner uploads it. The old ui-system-mapper is merged into this skill and retired.
> - Owner rulings applied: loops are 15 seconds or less, a loop over 5 seconds gets a pause control and is not hidden from assistive tech, a loop of 5 seconds or less with no control stays hidden, all loops stop under reduced motion. Rail 85vw and never past the 1200 content max, peek 20 percent, signature width 2400 px, line length 35 to 60 characters. The five blocks are signed off. Card thumbnails are 16/10 on every card, original ratio kept, the frame is a mask. Deck and card type sizes use the existing graphic type tokens with a size container. Token check is report only first, blocking once the case-study components are clean; the CI wiring waits for the owner's go. Made-file sizes are adopted (og 1200 x 630, LinkedIn link image at least 1200 x 627, Behance cover at least 808 x 632, Dribbble 1600 wide, story 1080 x 1920 with the safe zone unverified).
> - The faqs field stays in the layout shell doc; how it is used is decided by wugweb-strategy with wugweb-seo. The other four proposed fields are dropped on case studies.
> - Design docs updated by the kits session: the sizing doc has the four sizes, the components doc marks the five blocks signed off.
> - Token names approved by the owner for the four sizes (kits commit 8e456fc0): `--rail-width: min(85vw, 1200px)`, `--rail-peek: 20%`, `--signature-width: 2400px`, `--measure-min: 35ch`, `--measure-max: 60ch`. They are recorded in the skill only; adding them to the site stylesheet is site code and waits for his go.
> - The typography doc now has a "Graphic Type Scale" section for decks and cards.
> - Standing rules: the skill carries a marked copy of the shared standing-rules file, built into its export, with a test that fails if the copy drifts from the home file (commit 3da8d322). The home file wins. This replaces any older "keep the pointer" line below.
> - Layout shell absorbed on the owner's yes ("Yes, absorb them", commit 18ccbf3a): the skill's layout shell reference now carries the breakpoints table verbatim, the section, content and nav details, every page indexed, the mobile menu, motion, PWA and safe areas, and the hero first screen. Three new rules, 50 in all. Validate fails if the copied breakpoints table differs from the doc, and the doc-drift check covers the gutter, grid gap, header padding and section rhythm steps and computes nav 68 and header 100 and 108 from the tokens. Not absorbed by design: the CMS fields section and the verification records.
> - Pointers to wugweb-brand-os added on four rules it owns (commit e2e4a89c).
> - FINAL REPORT, 2026-11-17: version 2.0.0 at the time (2.1.0 later the same day). Last skill commit 6fa3e421. Validate: 50 rules, 0 errors. Self test 10 of 10. Evals: a runner with 17 cases, 16 pass, 0 fail, 1 blocked by the staging fault of that day (a page cache in the site middleware from another commit, not kits).
> - Site changes made on the owner's go: the five size tokens are in the site stylesheet and named in the sizing doc (3ff10105); the GSAP fonts refresh and the report-only token check are live on staging. Token check is phased: phase 1 done, the three showcase files are exempt and warnings fell from 1,042 to 715; phase 2 is a current-to-proposed list of 186 case-study findings waiting for the owner; blocking comes only once those files reach zero.
> - Old Framer media ratios: closed by the owner.
> - Storybook is mapped in the skill (`references/storybook.md`): 19 stories mapped to spec and rules; it builds; it is not deployed; no story for JsonLd and PostCard; four stories have no spec (CookieBannerShowcase, FaqAccordion, PortableTextRenderer, TeamGrid); the preview background matches no token.
> - Pointers to wugweb-brand-os added for radius by role and the motion feel; the yellow rule now says yellow rests only on the one conversion action per page and the footer banner.
> - Found in the built Service Spotlight Panel: a 1024 breakpoint, and a looping video hidden from assistive tech with no pause control; clip lengths are being measured.
> - Later on 2026-11-17, on the owner's go: the stale Kits design docs were corrected (a7436497) and the five block docs are marked signed off; the skill is version 2.1.0 with 58 rules, body 1,982 words, validate clean, evals 17 of 17 (acf19e9e). New rules cover media literals, warm and cool panel order, headings never smaller than body, icons, poster-first media, widget guards, case media layout and the media viewer; the contrast rule now measures the composited overlay and sets 44 touch targets. New references hold the clip measurements, a chapter-nav block spec (not built) and the September UI spec's consolidation targets.
> - Owner ruling: all six pillar colours stand (orange, magenta, teal, blue, green, purple) and the accent stays grey.
> - Spotlight Panel clips measured: 35 of 61 run over 5 seconds and need a pause control; 12 run over 15 seconds and break the cap.
> - Superseded 2026-11-18: the owner said "Yes, all branches" and "Yes, push to main". All site fixes are on main (last 469c08f5); skill 2.1.1 with 59 rules; every open item is in section 29.

> Plan for vetting, revision 24, 2026-11-16. Part of the Wugweb Skill System. Same content as the Plan section of the Notion page "wugweb-kits" (https://app.notion.com/p/41abb710b9ab81db87c5e03d81341818). Plan stage only: nothing goes to development until the owner says.

# wugweb-kits skill: plan

> CHECKED AGAINST MAIN, 2026-11-19 (coordinator, from the files; no skill file was edited): version 2.1.3 on main, 59 rules, 88 files, skill file body 1,995 words by the shared count, 19 of 19 evals pass as the changelog records. 2.1.2 rewrote the frontmatter to the skill-development spec, added a phases note, corrected the stale `.astro` claim, rewrote the metadata abstract, rebuilt `AGENTS.md` and added two regression evals. 2.1.3 added the sibling files (changelog, Cursor rule, ChatGPT instructions, Codex settings, single-file export); no rule, reference or script changed. Commits 587c0299, a8ff7003, 7631fdad, merged to main as a4950eb3. Upload files built by the kits session (`wugweb-kits.skill` and the 2.1.3 zip) are in the Downloads folder `wugweb-skills-2026-11-18`.

## Plan

### 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-kits` |
| Type | Claude Code project skill: one `SKILL.md` plus `rules/`, `references/`, `scripts/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned; open, see section 16) |
| Status | Renamed copy is on `main`. Enhancements are plan only. |
| Installed copies | Repo: `.claude/skills/wugweb-kits/` on `main`, version 1.0.0, name change only. Claude app on this Mac: still `ui-system-mapper` 1.0.0, unchanged since 2026-11-14; no `wugweb-kits` installed there. |
| Owner | Vedanshu, Wugweb |
| Planned in session | wugweb-kits (`local_31fbe87e-842d-4d48-a8fb-8b3fe7768756`) |
| SKILL.md written in session | `cse_01H6F5RsB2d6PFWpQpS932gi` (owner, 2026-11-16: the session where this discussion is converted to SKILL.md) |
| Development chat | `https://claude.ai/chat/6c433bf2-08a6-8902-be3f-6b6831e4c30a` (given by the owner, 2026-11-16). Not confirmed to be the same chat as the `cse_` id above; both are kept. |
| Repo plan | `https://github.com/wugweb-git/wugweb_site/blob/main/docs/skills/wugweb-kits/PLAN.md` |
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
| Audit | Files or a rendered page | Findings by rule id, with measured values and file and line, plus a delete candidates list |
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
| `wugweb-seo` | A finding that repeats on every page using a block (alt text, lazy loading, heading order, image sizes). See section 17. | The check result, with file and line | Change titles, meta, schema or canonicals; edit code |
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
| 2026-11-16 | The 22 answers in section 26 are confirmed, including: token findings are reported only at first; the three media rule readings hold; version 2.0.0 for the enhanced skill; a pause control on loops longer than 5 seconds; og image 1200 x 630 |

**Open.**

1. Should serious token findings block a merge, or only be reported? Recommendation: report only for v0.1, then block on a short list (hardcoded colour, z-index, block CSS outside its own component) once the inventory shows zero false positives. About 369 untokenized px literals exist today. Until decided: report only.
2. Media rule, three readings to confirm: resize and masks are done on the page in CSS, not by making new files; a mask must not hide the part of a screen that proves the claim; showing a file larger than its natural size is a quality flag, not a ban.
3. For the rail, viewer and CSS guard, kits owns the spec. Settled: the code is ordinary engineering work under `CLAUDE.md`, built to the kits spec.
4. Settled by section 13: the owner retires the installed `ui-system-mapper` in the Claude app after the renamed copy passes its checks.

### 11. Other open questions

1. Where rules live: proposed that token values and block docs stay in `kits_design_system/docs/` and the skill points to them.
2. The severity list: proposed colour and z-index serious, spacing px minor.
3. Path of the shared standing-rules file. Settled 2026-11-16: `docs/skills/STANDING-RULES.md` on `main`. The skill points to it for the owner's standing rules and does not restate them; its own rules (tokens, layout, motion, accessibility) stay in the skill.
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

The existing skill is the starting point. It gets the new name and is then enhanced. Rename done 2026-11-16 on the owner's go: the renamed copy is at `.claude/skills/wugweb-kits/`, on `main`. The installed skill is untouched. Enhancement built 2026-11-17 on the owner's go (commits 18fa8b9f and dca682ce): SKILL.md reconciled, 26 shell, label and kits rule files, references, scripts, and the six defects in section 20 fixed. Version stays 1.0.0 until the owner decides.

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

**MATRIX ROW: wugweb-kits** (superseded by the row in section 23)

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

### 22. Routed from the wugweb-seo extraction

Proposals to check, 2026-11-16. Points on tap targets, body text size, image dimensions, contrast, focus, reduced motion and the skip link are already in section 19.

| Item | Decision |
|---|---|
| Links have a real `href`; no click handlers on bare `div` elements; buttons are named; inputs are labelled (`aeotester`) | Absorb into the `a11y-*` rules. The first two are new; the last two are already in `layout-shell.md`. |
| No render-blocking scripts in the head; hero image preloaded; server response under 800 ms (`cloudflare:web-perf`) | Not a kits rule. Passed on as engineering work under `CLAUDE.md`. Kits keeps only the layout causes of shift. |
| `web-review`, `ux-ui-audit`, `accessibility-review` and `design-qa` belong with kits | Agreed. All four are already optional helpers of kits in section 19. |

**Finding on the live code, recorded only.** `src/layouts/BaseLayout.astro` emits 9 of the 12 share tags. Missing: `og:site_name`, `og:image:alt`, `twitter:image:alt`. Reported by `wugweb-seo`; checked read only by kits on 2026-11-16 and confirmed. No code is edited. The tag set belongs to `wugweb-seo`; the fix is engineering work on the owner's go.

### 23. The enhancement as a spec, the settled matrix row, one more owner question

**Binding values (owner, 2026-11-16).** The values in `kits_design_system/docs/tokens/layout-shell.md` are binding in this spec, not a pointer only. The table below was copied by reading the doc on 2026-11-16 (the file is the same as on `main`), not from memory or from any message.

| | Mobile | Tablet | Desktop | Token or selector | Named in |
|---|---|---|---|---|---|
| Canvas width | 375 | 768 | 1200 | `--breakpoint-xl` (1200) | `layout-shell.md` |
| Section padding (top right bottom left) | 48 16 48 16 | 70 32 70 32 | 96 48 96 48 | Block: `--section-y` and every `--space-section-*`. Inline: `--shell-gutter` | `layout-shell.md` |
| Content max-width | 1200 | 1200 | 1200 | `.wrap`, by `padding-inline: max(var(--shell-gutter), calc((100% - 1200px) / 2))` | `layout-shell.md` |
| Layout grid columns | 4 | 8 | 12 | `.grid`, switching at 768 and 1200 | `layout-shell.md` |
| Column gap | 16 | 24 | 32 | `--grid-gap` | `layout-shell.md` |
| Grid margin (the gutter) | 16 | 32 | 48 | `--shell-gutter` | `layout-shell.md` |
| Header padding | 16 | 20 | 20 | `--header-pad-block` on `.site-header` | `layout-shell.md` |
| Header height (derived) | 100 | 108 | 108 | `--header-height` = `--nav-height` + 2 × `--header-pad-block` | `layout-shell.md` |
| Header position | sticky, top 0 | sticky, top 0 | sticky, top 0 | `z-index: var(--layer-nav)` (10) | `layout-shell.md` |
| Nav bar height | 68 | 68 | 68 | `--nav-height` | `layout-shell.md` |
| Nav bar inset (all sides) | 12 | 12 | 12 | No token named in the doc. In code: `--nav-bar-pad` | `global.css` |
| Button height (links, CTA, menu) | 44 | 44 | 44 | `--control-size` | `sizing.md` |
| Button text, padding, gap | 16, 10 12, 12 | 16, 10 12, 12 | 16, 10 12, 12 | No token named in the doc | |
| Logo height | 40 | 40 | 40 | `--nav-logo-height` | `sizing.md` |
| Nav inner container | max 1280 | max 1280 | max 1280 | No token; `max-width: 1280px` in `SiteHeader.astro` | `layout-shell.md` |
| Spring | 400ms, bounce 0.2, delay 0 | same | same | `--duration-spring`, `--ease-spring` | `layout-shell.md` |

**Header formula (owner, 2026-10-21), as the doc gives it.** 24px line height + 2 × 10px button padding = 44px button. 44 + 2 × 12 = 68px bar. 68 + 2 × 20 = 108px header. Mobile uses 16px outer spacing: 16 + 68 + 16 = 100. The nav bar and its 44px buttons are the same on every tier; the header height is derived, never set by hand.

**Rules that go with the table.**

1. The doc is the source. The skill's copy is made by reading the doc. `validate.mjs` fails if any value in the skill's copy differs from the doc.
2. Code or another doc that disagrees is reported as a finding against the code or that doc, as the first paragraph of `layout-shell.md` says. The skill never "corrects" the doc to match code.
3. Old values are never reintroduced. The doc's gap correction: the column gap is 16 / 24 / 32, not 24 / 24 / 0. From its History table, these are retired:

| | Retired | Current |
|---|---|---|
| Content max-width | 1280 | 1200 |
| Desktop gutter | 44 | 48 |
| Desktop breakpoint | 1280 | 1200 |
| Section tokens | flat 40 / 48 / 64 / 80 | one rhythm, 48 / 70 / 96 |
| Column gap | flat 16 | 16 / 24 / 32 |
| 12-column switch | 1024 | 1200 |
| Header padding | fluid 16 to 32, no bottom | 16 / 20 / 20 |
| Header height | 110 / 118 / 118 | 100 / 108 / 108 |
| Nav z-index | 50 | 10 |

The audit flags any retired value found in a shell context as a finding.

**Checked against `global.css` on 2026-11-16, read only.** These match the doc: `--shell-gutter` 16 / 32 / 48, `--grid-gap` 16 / 24 / 32, `--header-pad-block` 16 then 20, `--control-size` 44px, `--nav-logo-height` 2.5rem (40px), `--breakpoint-xl` 1200px, `--duration-spring` 400ms, `--layer-nav` 10, `--nav-bar-pad` 12px, the section tokens at 48 / 70 / 96, and `max-width: 1280px` on the nav bar. Not re-read in this check: the button text, padding and gap.

**Today's skill refers to none of this.** The skill at `.claude/skills/wugweb-kits/` is `ui-system-mapper` renamed. Checked on 2026-11-16: no file in it mentions `kits_design_system`, `global.css` or the layout shell. Everything below is a spec. Nothing is built.

**What `references/layout-shell.md` will hold.** A one-page summary, with every value pointing back to its source doc and none restated as a second source of truth.

| Part | Content | Source doc |
|---|---|---|
| The rule | The section owns the gutter; the content owns the max width; blocks live inside content | `kits_design_system/docs/tokens/layout-shell.md` |
| Tiers | 375, 768, 1200; the shell steps only at 768 and 1200 | `layout-shell.md`, `breakpoints.md` |
| Gutter, rhythm, grid | Gutter 16 / 32 / 48; section padding 48 / 70 / 96; columns 4 / 8 / 12; column gap 16 / 24 / 32 | `layout-shell.md` |
| Max width | Content 1200; nav bar 1280; nothing non-full-bleed wider than the nav; nothing scales past the max width | `layout-shell.md` |
| Header and nav | Nav bar 68 on every tier; header 100 mobile, 108 tablet and desktop, derived never set; buttons 44; logo 40; bar inset 12 | `layout-shell.md`, `sizing.md` |
| Breakpoints | Literal 480 / 640 / 768 / 1024 / 1200 in `@media`; going down uses the step minus 0.02 | `breakpoints.md` |
| Labelling | Every section has an id and an accessible name; the five labelling defects | `layout-shell.md` |
| Checks | How each value is measured on a rendered page, and the measuring notes | `layout-shell.md` |

**The three design-system docs it points to:** `kits_design_system/docs/tokens/layout-shell.md` (authoritative), `kits_design_system/docs/tokens/breakpoints.md` and `kits_design_system/docs/tokens/sizing.md`. If the skill and a doc disagree, the doc wins and the skill is corrected. Corrected 2026-11-16: the owner named the three docs as `layout-shell.md`, `sizing.md` and `components.md`; `breakpoints.md` is a fourth source, for the breakpoint literals only. See section 24.

**MATRIX ROW: wugweb-kits (settled links; replaces the row in section 16)**

- **Owns:** The Kits design system: tokens, layout shell, components, block docs, block catalogue, adaptive UX, motion and accessibility rules, how media is shown, composition of og images, cards and tiles, and the token audit itself.
- **Reads (sources):** `src/styles/global.css`, `kits_design_system/docs/` (`layout-shell.md` authoritative), component and page code, rendered pages at 375, 768 and 1200, its own rules and system map.
- **Gives to:** `wugweb-work`: layout and blocks per tier, gate results, block docs, wording slots with length limits, a token sheet for decks and cards. `wugweb-brand-os`: design-system detail and contrast results. `wugweb-seo`: its check result for a fault that repeats on every page using a block.
- **Takes from:** `wugweb-work`: content shape, chosen media, and any visible wording. `wugweb-brand-os`: art direction (Visual OS), logo sizes and clear space. `wugweb-seo`: block-wide findings to check. No link with `wugweb-voice`. `wugweb-strategy` reaches it only through `wugweb-work`.
- **Never does:** Writes copy, sets voice or art direction, edits SEO fields, picks or alters media files, edits site code or build config, writes Notion, Sanity or R2 outside its own plan page, or deletes or refactors tokens, components or files without the owner's yes.

**One more owner question: hero copy limits.** A helper skill (`design-taste-frontend`) gives a hero limit of a headline of 2 lines or fewer and subtext of 20 words or fewer. The `wugweb-work` plan already sets the subtitle at 90 characters or fewer. These differ. Kits holds no copy limit of its own; it needs one figure so the hero block's wording slot can state it. Which stands?

### 24. Connecting the skill to the three design-system docs

A spec, not built. No skill file is edited until the owner says go. The owner named the three docs on 2026-11-16. All three were read, read only.

| Doc | Path | Holds |
|---|---|---|
| Layout shell | `kits_design_system/docs/tokens/layout-shell.md` (424 lines) | The page, section, content, block skeleton; tiers; gutter, rhythm, grid; max width; header and nav formula; section labelling; motion and PWA notes; how it is implemented and verified |
| Sizing | `kits_design_system/docs/tokens/sizing.md` (30 lines) | Component sizes (nav bar 68, header 100 / 108, button 44, logo 40, thumbs and tiles) and icon sizes |
| Components | `kits_design_system/docs/components.md` (219 lines) | Buttons (tiers, composition, size, width, states), core components, 11 page blocks, each with tokens consumed, status and the rules it demonstrates |

Today's skill at `.claude/skills/wugweb-kits/` refers to none of them.

**(a) Which skill file points to which doc, and for what.**

| Skill file | Layout shell | Sizing | Components |
|---|---|---|---|
| `SKILL.md` (core summary) | Gutter 16 / 32 / 48, rhythm 48 / 70 / 96, content max 1200, tiers | Nav bar 68, header 100 / 108, buttons 44 | Button tiers and the yellow-fill rule, in one line each |
| `references/layout-shell.md` | Everything in the shell: rule, tiers, grid, max width, header formula, labelling, verification | Nav, button and logo sizes | |
| `references/component-sizes.md` (new) | | The component size table, icon sizes, fixed media ratios (16/10 thumbs, 1:1 team) | |
| `references/six-layers.md` | Shell tokens as layer 2 | Size tokens as layer 3 (`--nav-height`, `--control-size`, `--header-height`) | Which names are layer 4, 5 and 6 |
| `references/block-catalogue.md` | | | The 11 page blocks, their status and their block docs |
| `references/spec-templates.md` | | | The entry shape: purpose, tokens consumed, accessibility, status, rules it demonstrates |
| `references/accessibility.md` | Section id and name rules, semantic naming table | 44px controls | Focus, disabled and icon-only button rules |
| `references/motion.md` | Nav spring, reveal timing, reduced motion | | "One property, one owner" as shown by Bento Block and Process Map |
| `references/gate.md`, `references/pane-measuring.md` | The verified table and the measuring note | | |
| `scripts/kits-doc-drift.mjs` | Reads it | Reads it | Reads it |
| `system-map.json` (generated) | | Size tokens | `consumes` and `usedBy` seeded from each entry |

**(b) The rule.** The docs are the source. The skill points to them and does not copy their values. Two exceptions, both marked so the check in (d) can find them: the short core summary inside `SKILL.md`, and the one-page summary in `references/layout-shell.md`. They exist so the skill still works in GPT or Cursor, where reference files may not load. Every number in them carries a marker naming its doc and heading. If a marked value and its doc disagree, the doc wins and the skill is corrected.

**(c) Which of the 23 rule files need a pointer.** The folder has 21 rules plus `_sections.md` and `_template.md`. 15 need a pointer; 8 do not.

| Rule file | Points to | For |
|---|---|---|
| `token-no-raw-values-in-components` | Components, Layout shell | Tokens each component consumes; `@media` literals are the allowed exception |
| `token-component-tokens-earn-their-place` | Sizing | `--nav-height`, `--control-size`, `--header-height` as tokens that earn their place |
| `map-single-source-of-truth` | All three | The docs and `global.css` are the source; the map is generated |
| `map-record-consumes-and-usedby` | Components | Tokens consumed and "used by" per entry |
| `component-complete-state-set` | Components | Button states: hover, active, focus-visible, disabled |
| `component-variants-not-booleans` | Components | Button tier, size and width as class modifiers |
| `component-slots-for-content` | Components | Label only, label plus icon, icon only |
| `component-no-outside-in-restyling` | Components, Layout shell | The `.btn-block` case; a card must not opt out of the shell with its own gutter |
| `reuse-collapse-duplicates-with-a-survivor` | Components | Component status |
| `reuse-every-audit-ends-in-deletions` | Components | Unused components and built-but-unused kinds, as candidates only |
| `spec-fixed-template` | Components | The entry shape |
| `spec-generate-dont-maintain` | Components | Token counts per block are generated, not typed |
| `spec-measure-dont-claim` | Layout shell | The verified table and the measuring note |
| `spec-donts-from-real-misuse` | Components, Layout shell | "Rules it demonstrates" and the labelling defects |
| `_sections.md` | All three | The new rule sections name their source doc |

No pointer needed: `token-one-way-references`, `token-no-alias-chains`, `token-semantic-names-describe-role`, `map-count-before-you-propose`, `map-deprecate-with-a-pointer`, `reuse-promotion-ladder`, `reuse-same-role-not-same-look`, `_template.md`.

**(d) The check that fails on disagreement.** `kits-doc-drift.mjs`, plain Node, read only, exit code 1 on any failure. It fails when:

1. A marked value in the skill differs from the value under the named heading in its doc.
2. A doc value differs from `src/styles/global.css` (for example `--nav-height`, `--shell-gutter`, `--grid-gap`).
3. One of the 15 rule files above has no link to its doc, or the link points at a file or heading that does not exist.
4. A skill file other than the two marked summaries contains one of the shell or sizing numbers with no marker.

It reports each failure as file, line, value in the skill, value in the doc. It changes nothing. Whether it runs in `prebuild` is the open merge-blocking decision.

**Found while reading, not changed.** `sizing.md` uses a long dash as an empty cell and writes one range with a dash ("16 to 18px" for toolkit icons). The doc rule is no dashes and ranges as inequalities. Proposed, current to proposed: empty cells become blank; the range becomes "16px ≤ size ≤ 18px".

### 25. Enhancement to-do, checked against the three docs

A spec, not built. The coordinating session sent this list after reading the three docs; each point was checked against the docs and `global.css` on 2026-11-16, read only. No skill file is edited until the owner says go.

**The gap.** The skill today is a generic design-system mapper: the six-layer model, phases 0 to 5, 21 rules in five groups (token, map, component, reuse, spec), three scripts, and notes on Tailwind. It holds nothing specific to Wugweb. The three docs hold the Wugweb rules.

| # | To do | Source | Check result |
|---|---|---|---|
| 1 | A "source of truth" section in `SKILL.md`: token values live in `src/styles/global.css`; the docs in `kits_design_system/docs/` win; code that disagrees with `layout-shell.md` is wrong, not the doc. The skill points to the docs and never carries a value it cannot check. | `layout-shell.md` | Holds |
| 2 | A core summary in `SKILL.md`: page, section, content, blocks; the section owns the gutter, the content owns the max width (1200); tiers 375 / 768 / 1200; section padding 48 16, 70 32, 96 48; columns 4 / 8 / 12; gap 16 / 24 / 32; nav bar 68; header 100 / 108 / 108; buttons 44; logo 40; bar inset 12; nav inner max 1280; sticky, layer 10; spring 0.4s, bounce 0.2. | `layout-shell.md`, `sizing.md` | Holds, with one correction: 375 / 768 / 1200 are the tiers. The breakpoint literals are 480 / 640 / 768 / 1024 / 1200, and the shell steps only at 768 and 1200. |
| 3 | New rule group `shell`: no max-width on a section; nothing below the section sets a page gutter; grid gaps use `--grid-gap`, never a section token; only `.global-final-cta` is exempt from the rhythm rule; filters are toolbars inside the grid, not sections; no non-full-bleed block is wider than the nav. | `layout-shell.md` | Holds |
| 4 | New rule group `label`: every section has an id and an accessible name; `aria-labelledby` only to a heading that always renders; never label a section from a heading inside a loop; one h1, no skipped levels, a screen-reader-only h2 where there is no visible heading; card lists as lists; alt always; decorative muted loops hidden from assistive tech; skip link, main landmark, scroll offset under the sticky header. | `layout-shell.md` | Holds. This replaces the `a11y-*` name used earlier in this plan for the labelling rules; contrast, focus and target rules stay in `a11y-*`. |
| 5 | Sizing checks: each row of the size table is a value checked against its token. | `sizing.md`, `global.css` | Corrected. The list said pillar thumb 88 / 62 and bento min-height 180 have no token. They do: `--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` are in `global.css`. So the finding is that `sizing.md` is behind the code, not that tokens are missing. Toggle chip 44 and author photo 56 show no token in the doc; not yet checked in the code. |
| 6 | Component rules: three button tiers (`.btn-solid` brand, `.btn` primary, `.btn-ghost`); yellow as a resting fill on brand only; size and width by class (`.btn-sm`, `.btn-lg`, `.btn-block`), never one-off CSS; states on `.btn`; radius by role; GSAP owns motion and no property has two owners; the animated-block lint set (Service Spotlight Panel, Client Assembly Grid, Service Tag Field, Bento Block, Process Map, and any block marked "Animated block"); a bento never resolves into an even grid; block specs live in `kits_design_system/docs/blocks/`. | `components.md` | Holds |
| 7 | Spec sheet template: which shape wins. | `components.md`, the mapper's phase 4 | Proposed: three levels, no clash. The entry in `components.md` keeps its own shape (purpose, tokens consumed, Storybook, status, headline tokens, rules it demonstrates). A full block spec uses the block doc template. The mapper's sheet is used for single components and gains those fields. The rule `spec-fixed-template` is adapted to name all three. |
| 8 | Measuring: check at 375, 768 and 1200; the measuring iframe needs `border: 0` or 768 reads as mobile. | `layout-shell.md` | Holds. The doc's own last pass used 1440; the owner's rule is 1200. |
| 9 | What the scripts would check. | Below | Spec only |
| 10 | Clashes inside the docs, listed and not fixed. | Below | Confirmed |
| 11 | Keep the generic method (phases 0 to 5 and the 21 rules); the Wugweb parts are added on top. The Tailwind notes in `SKILL.md` are marked as not applying to this repo. | The skill | Holds |

**Item 9: what the scripts would check, as a spec.**

| Script | Checks from items 3 to 6 |
|---|---|
| `audit.mjs` (becomes `kits-inventory.mjs`) | A `max-width` declared on a section selector. A page gutter set below the section (`padding-inline` using `--shell-gutter` anywhere but `.wrap`). A grid `gap` that uses a `--space-section-*` or `--section-y` token. A `border-radius`, size or width on a `.btn` variant written in component CSS. A property that has both a CSS transition and a GSAP tween in an animated block. A raw size where `--nav-height`, `--header-height`, `--control-size` or `--nav-logo-height` exists. |
| `kits-check-page.mjs` | On rendered HTML: every section has an id and a name; no dangling `aria-labelledby`; no duplicate ids; one h1; no skipped level; images with alt; a skip link and a main landmark. |
| `validate.mjs` | Every rule file in the `shell` and `label` groups names its source doc and heading, and has one incorrect and one correct example. The core summary numbers in `SKILL.md` carry their doc markers. |
| `kits-doc-drift.mjs` | As in section 24 (d), plus: every token named in `sizing.md` exists in `global.css`, and every sizing token in `global.css` appears in `sizing.md`. |

**Item 10: clashes inside the docs, for the owner. Nothing is changed.**

| Clash | Where | Note |
|---|---|---|
| A proposed `faqs` field for FAQPage JSON-LD | `layout-shell.md`, CMS fields section | Breaks the no-FAQPage rule. Also FOR `wugweb-seo`. |
| The CMS fields section is a proposal, not deployed | `layout-shell.md` | It sits in the authoritative doc but is not live. |
| Framer media aspect ratios are not mapped to sections | `layout-shell.md`, "Open" | Still open. |
| Line numbers for the button rules are stale | `components.md` cites `global.css:855-924`; `.btn` now starts at line 911 and `.btn-ghost` at 1024 | Proposed: cite the selector, not line numbers. |
| A hardcoded `#000` for the WhatsApp button text | `components.md`, SiteHeader entry | Against tokens only. Recorded as a finding. |
| `sizing.md` shows no token for sizes that have one | `sizing.md` against `global.css` | See item 5. |
| The last verification used 1440 | `layout-shell.md` | The rule is 1200. |
| Five blocks are "awaiting sign-off" | `components.md` | The skill treats them as drafts until the owner signs off. |

**Settled: two max widths, not a clash (2026-11-16).** A point routed from `wugweb-brand-os`: `components.md` gives the nav bar a max width of 1280, while `layout-shell.md` calls 1200 "the only max-width in the shell". These are two different boxes. The 1200 is the content box inside every section. The 1280 is the nav bar's inner container, listed in the same doc's "Width rule" table and set as `max-width: 1280px` in `SiteHeader.astro`. Both docs and the code agree. One wording note for the owner, not a finding: the comment "the only max-width in the shell" sits in the content block and could be read as covering the nav. Proposed: "the only max-width on section content".

**Scope of the 16 by 9 tile rule.** The fixed 16/9 tile ratio in `components.md` belongs to the Client Assembly Grid only. It is not a general rule and is not written into the skill as one.

### 26. Answers to the open decisions, confirmed by the owner

Proposed by the planning session and confirmed by the owner on 2026-11-16 ("Confirm all"). All 22 rows below are now owner decisions. They settle the open items in sections 10, 11, 16, 18 and 23. Confirming them is not the go to build: no skill file is edited until the owner says so.

| # | Decision | Answer (owner, 2026-11-16) | Why |
|---|---|---|---|
| 1 | Should serious token findings block a merge? | Report only for the first version. Later, block on a short list: hardcoded colour, z-index, and block CSS outside its own component. | About 369 untokenized px literals exist today; blocking now would stop every build. |
| 2 | Media rule: resize and masks are done on the page in CSS, not by making new files | Yes | It keeps every file in R2 untouched. |
| 3 | Media rule: a mask must not hide the part of a screen that proves the claim | Yes | The screen is evidence. |
| 4 | Media rule: showing a file larger than its natural size is a quality flag, not a ban | Yes | A soft image is reported and the owner decides. |
| 5 | Version after the rename | 2.0.0 for the enhanced skill. The renamed copy stays 1.0.0 until then. | The mapper is already 1.0.0; a rename with added scope is a major change. |
| 6 | Loops that play by themselves | Loops stay 15 seconds or less. Any loop longer than 5 seconds gets a pause control. All loops stop under reduced motion. | Two helper skills and the accessibility guidance ask for it. |
| 7 | Og image size | 1200 x 630, key content in the central 80% | Read directly from LinkedIn Help by the coordinating session. |
| 8 | Other made-file sizes | As in section 21. Behance cover and story safe zone stay marked unverified until the owner gives figures. | No official page confirmed them. |
| 9 | Hero copy limit | The `wugweb-work` figure stands: subtitle 90 characters or fewer. The helper's "20 words" is dropped. | Copy limits belong to `wugweb-work`; kits only states the limit in the wording slot. |
| 10 | Home of the skill | Repo first. Upload to the Claude app only after the enhancement passes its evals. | One copy to keep true. |
| 11 | Does the generic mapper core stay usable on other projects? | Yes. Wugweb parts live in their own rule groups (`shell`, `label`, `kits`, `media`, `motion`, `a11y`). | MusicLinkd and client work can use the core. |
| 12 | The installed `ui-system-mapper` | Keep it until the enhancement passes. Then the owner decides whether to retire it. | It is still the generic tool for other projects. |
| 13 | Where rules live | The design-system docs are the source; the skill points to them (section 24). | One home per rule. |
| 14 | Severity list | The mapper's scale. Blocker: hardcoded colour, z-index, a retired shell value, a section with no id or name. High: layer skips, missing states, block CSS outside its component. Medium: spacing px literals, alias chains. Low: one-use component tokens. | It follows the mapper's own audit table. |
| 15 | `system-map.json` | Generated, committed at `kits_design_system/system-map.json`, never edited by hand. | The docs and `global.css` stay the source. |
| 16 | Layer skips and alias chains already in the code | Report only. No clean-up pass until the owner asks. | Nothing is refactored without a yes. |
| 17 | Five blocks awaiting sign-off | Treated as drafts until the owner signs each off. | `components.md` marks them so. |
| 18 | The `/kits` showcase page and Storybook | Engineering work under `CLAUDE.md`. Kits supplies the specs they show. | Kits edits no code. |
| 19 | `SKILL.md` body length | Move the mapper's long phase text into references to make room for the core summary. Keep the body at 2,000 words or fewer. | Other tools may not load reference files. |
| 20 | Rendered-page checks outside Claude | By hand for the first version. No headless browser dependency yet. | A new dependency needs its own decision. |
| 21 | One definition of the four words | Primitive: a layer 4 structure class such as `.wrap` or `.btn`. Component: a layer 5 named part with its own file. Pattern: a reusable arrangement specified once and used inside blocks, such as the rail or the viewer. Block: a layer 6 section-level composition with its own block doc. | `widgets.md`, `components.md` and `blocks/` use them loosely today. |
| 22 | Desktop columns for the All screens grid | 6 columns for phone screens, 3 for desktop screens, at 1200 | A starting figure only; to be checked on the NTUC page. |

**Still open, with no proposal.** Fixed type sizes per format for decks and cards. Whether to fix the wording "the only max-width in the shell" in `layout-shell.md`.

### 27. Doc fixes made on the owner's word, 2026-11-16

The owner said to fix five of the doc clashes listed in sections 12, 24 and 25. Three design-system docs were edited. No site code and no skill file changed.

| Clash | Fix made | File |
|---|---|---|
| The last verification used 1440; the rule is 1200 | The shell was measured again at 375, 768 and 1200 on `wugweb.pages.dev` (24 routes) and a new record was added above the old one. The old 2026-10-03 record is kept as history. | `layout-shell.md` |
| Dashes for empty cells and one range | Empty cells are blank; the toolkit icon range reads `16px` ≤ size ≤ `18px` | `sizing.md` |
| No token shown for pillar thumb and bento min-height | `--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` are named, with a note that no component references them yet | `sizing.md` |
| Stale line numbers for the button rules | The two references now cite the `.btn` rules by selector, not by line | `components.md` |
| A hardcoded `#000` recorded for the WhatsApp button text | The doc was wrong, not the code. The code uses `--color-ash`; the doc now says so. | `components.md` |

**Result of the new measurement.**

| | Mobile 375 | Tablet 768 | Desktop 1200 |
|---|---|---|---|
| Top-level sections on spec | 99 of 99 | 99 of 99 | 98 of 99 |
| Header height | 100 | 108 | 108 |
| Nav bar, buttons, logo | 68, 44, 40 | 68, 44, 40 | 68, 44, 40 |
| Gutter and gap tokens | 16 and 16 | 32 and 24 | 48 and 32 |
| Sideways scroll | None | None | None |

One h1 on every route, 0 duplicate ids, 99 of 99 sections named. On a 1792 wide screen the content box is 1200 and the nav bar 1280.

**New findings from the measurement and the fixes. Recorded only.**

1. `/footer/reviews`: the hero section has 216px inline padding at 1200 where the shell gives 48.
2. `/work/[slug]`: 6 sections have no id (five bento sections and the screens carousel). This page is due for the rebuild.
3. `/contact-us` has no section inside the main landmark.
4. Grid columns 4 / 8 / 12 were not measured; the homepage has no grid element to read them from.
5. `--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` are declared and unused. They are candidates under the rule on component tokens.
6. `components.md` says button focus uses `--focus-primary`. The code has `outline: 2px solid var(--neutral-3)` on `.btn:focus-visible`. Doc and code disagree; not fixed.

**Still open from the clash list:** the `faqs` field for FAQPage in `layout-shell.md`, the unmapped Framer ratios, and the five block sign-offs.

### 28. wugweb-seo position on the proposed CMS fields, confirmed by the owner 2026-11-17

Relayed by the coordinating session on 2026-11-17. `wugweb-seo` says the owner delegated this list to it on 2026-11-17. Neither the coordinating session nor this session has seen that ruling, so this is seo's position, not an owner ruling, and the owner can override it. The owner confirmed in the kits session on 2026-11-17 ("Yes, edit doc") and `layout-shell.md` was edited: the case-study rows above are marked, and "the only max-width in the shell" now reads as the content max width with the nav inner container capped separately at 1280.

| Field (case studies) | seo position |
|---|---|
| `faqs` | Keep. It feeds FAQPage only where the rendered page visibly shows every question and answer. |
| `seoCanonicalUrl` | Drop. Canonicals come from Notion, one slug. |
| `schemaType` | Drop. Fixed as CreativeWork for case studies and BlogPosting for posts. |
| `aiSummary` and `keyTakeaways` | Drop on case studies, because Notion Body Content is the single source. No objection on posts or pages. |

This replaces the earlier clash note that `faqs` breaks the no-FAQPage rule: under seo's position the field stays, with the visible-content condition.

### 29. Where everything stands, end of 2026-11-17 (written by the kits session on the owner's ask)

The owner asked for every pending item from the kits session in one place, here and on the Notion page. This section brings in the findings that until now lived only in the session, the audit reports and the untracked `kits-case-study-token-fixes.md`.

**On main and live on staging**

| Commit | What |
|---|---|
| a7436497 | Stale Kits design docs corrected (breakpoints, section rhythm, reveal and scroll values, header layer, grey focus and accent, `--t-h5`, work card radius, README pillar colours); five block docs signed off |
| acf19e9e | Skill 2.1.0: eight new rules, two references (media and widgets, consolidation targets) |
| c25a2ed3 | `process-map.md` height follows `--header-height` |
| f3073bd7 | Yellow kept to the one conversion action and the footer banner; `/services/brand` no longer shows the yellow brand gradient (it was a bug: the Brand pillar resolved to `--gradient-brand`) |
| 7ebb3e72 | CSS cleanup: tag pill radius, true type-scale comments, `--shell-inset`, `.btn-partners-cta` and `.global-blog-list` removed, ProcessMap height on `--header-height`, bare vh to svh and dvh |
| a662b18f | Spotlight Panel: 15 second cap, pause control over 5 seconds, 1024 to 1200 (merged from the first push, see below) |
| a80dc32a | Lazy video stops under reduced motion; scroll in is opacity and y only; nested main on `/contact-us` fixed; blog posts in an `article` |

Checked on staging after the deploy: pages 200 on two requests, evals 17 of 17, validate 58 rules 0 errors, doc drift 0.

**Pushed to main on the owner's go, 2026-11-18** (rebased on main, `npm ci`, build passes, `test:case` 39 of 39, validate 59 rules 0 errors, drift 0, seven local pages 200 twice, page check 0 findings). Ids after the rebase:

| Commit | What |
|---|---|
| 30328a71 | Spotlight follow-up: a662b18f only starts a clip when the panel reports on screen; where that report is wrong, clips never play. One line fix |
| 3458649d | Case-study tokens: 119 of the 186 findings applied with zero rendered change (698 declarations compared); section ids `b-s-N`, `b-screens`, `b-closing`; 600 to 640; the cover video waits on reduced motion |
| 830a0e55 | Hero reveal groups (owner ruling: hero only, delays): h1 and eyebrow at 0.4s, the rest at 0.9s, measured in Chrome at about 0.38 and 0.84; the home headline blur tween removed |
| 570ef6f9 | Skill 2.1.1: the motion rule defines the hero groups; the case-study eval now expects every section labelled (it fails until 3458649d is live) |
| 340b96ea | Skill: `kits-logo-size-and-space`, logo values from the brand-os rulings (f66bb666) in `component-sizes.md` |
| 469c08f5 | `public/brand/wugweb-mark.png` removed (owner, 2026-11-18) |

**Waiting on the owner**

1. Done 2026-11-18: the five commits are pushed.
2. Done 2026-11-18: `wugweb-mark.png` removed (469c08f5).
3. The 67 case-study lines with no token of the same role and value: translucent white fills and borders (`rgba(255,255,255, .02 to .1)`), letter spacing (-0.015em, 0.06em, 0.05em, -0.01em), small paddings (`10px 14px`, `2px 6px`, 0.625rem, 0.35rem), `scroll-margin-top 6rem`, `text-underline-offset 3px`, max widths 540, 140, 88, height 20, avatar 40, media heights (`max-height 720px`, `clamp(220px, 32vw, 380px)`, 240px, `min(62svh, 560px)`), grid minimums 140 and 160, hover lifts -3 and -5 (`--hover-card` is -4), the stat number and CTA clamps and the CTA radial gradient. Each needs a token chosen by role, or a new token.
4. Logo clear space clash: the ruling is clear space equal to the mark height (40px at the 40px nav logo), but the nav bar gives 14px above and below. For brand-os and the owner; kits reports only.
5. The 12 Spotlight clips over 15 seconds are capped in code; trimming the files in R2 stays his call.
6. Storybook stays local unless he says otherwise.
7. Uploading the rebuilt skill zip to the Claude app.

**Open in code, no fix made yet** (each a site change: its own commit, checks and his go)

- Scroll animations: `assemble` keeps an x scatter and the banner sheen keeps `xPercent`; strict y only would need another pass.
- About 114 unused tokens; duplicate scales `--p-*` and `--gap-*`, `--r-*` and `--radius-*`, `--elevation-*` and `--shadow-*`; `--easing-spring` equals `--easing-bounce` (kept, Storybook uses it).
- About 305 raw px literals outside media queries (top: `footer/subscription` 71, `services/[slug]` 35, `PortableTextRenderer` 26, `SiteHeader` 26, `work/[slug]` 24).
- Bare vh left: `footer/subscription.astro` 90vh, `services/[slug].astro` 80vh.
- Open-menu nav sizes are raw clamps in `SiteHeader.astro`, not the 44 and 16 layout-shell values.
- Menu links have no 40ms stagger (`shell-mobile-menu`).
- The home hero video autoplays and loops hidden from assistive tech; its length is not measured and it is outside lazy-video's reduced-motion check.
- `.btn:focus-visible` is a raw outline, not `--focus-button`.
- Token check: `.b-carousel` at `work/[slug].astro:780` sets a gutter below the section.
- `/footer/reviews` hero has 216px inline padding at 1200.
- Consolidation targets (Button, Chip, Hero, Bento, Eyebrow, Surface) in `references/consolidation-targets.md`.
- `motion` still listed in `CLAUDE.md` line 30 and `AGENTS.md` line 30; it is not in `package.json`.
- Brand files: `og-default.png` is 965 x 306, not 1200 x 630; `favicon-64.png` is 648px; the `/assets/brand/small.jpg` fallback in `BaseLayout` is missing locally (R2 unchecked); `favicon-16.png`, `favicon-64.png`, `apple-touch-icon.png` and `trust/topdevelopers.svg` are unreferenced; the manifest name and two `BaseLayout` fallbacks carry dashes in visible text.

**Docs and skill, open**

- Nine plain token lists in `kits_design_system/docs/tokens/` are left as they are (owner).
- Block docs for sector showcase, industries directory and blog post still say awaiting sign-off.
- Storybook: no story for JsonLd and PostCard; four stories have no spec (CookieBannerShowcase, FaqAccordion, PortableTextRenderer, TeamGrid); the preview background matches no token; the Spotlight Dense story is still named "1024px+".
- Skill 2.1.1, 59 rules. Upload zip rebuilt after the push: `wugweb-kits.zip` in the kits worktree root (87 files).
- From 2026-11-18 the coordinator split is lifted: the kits session keeps this plan and its Notion page itself and works directly with the owner.

**Not verified in a browser:** reduced motion on every path, phone and touch, the Spotlight dense layout at 1200, a real clip over 15 seconds. The in-app browser pane draws no animation frames, so motion was measured in Chrome.
