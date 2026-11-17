# Layout shell values (copied from the doc)

Source: `kits_design_system/docs/tokens/layout-shell.md`, read 2026-11-16. The doc wins; if this differs, this copy is stale.

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

**Checked against `global.css` on 2026-11-16, read only.** These match the doc: `--shell-gutter` 16 / 32 / 48, `--grid-gap` 16 / 24 / 32, `--header-pad-block` 16 then 20, `--control-size` 44px, `--nav-logo-height` 2.5rem (40px), `--breakpoint-xl` 1200px, `--duration-spring` 400ms, `--layer-nav` 10, `--nav-bar-pad` 12px, the section tokens at 48 and 70, and `max-width: 1280px` on the nav bar. Not re-read in this check: the 96 desktop step of the section tokens, and the button text, padding and gap.



## Breakpoints table, verbatim from the doc

Copied exactly; `validate.mjs` fails if it differs from the doc's Breakpoints table.

<!-- doc-table:breakpoints -->
| | small · mobile | medium · tablet | large · desktop |
|---|---|---|---|
| canvas width | **375** | **768** | **1200** |
| section padding (T R B L) | `48 16 48 16` | `70 32 70 32` | `96 48 96 48` |
| content max-width | 1200 | 1200 | 1200 |
| layout grid columns | **4** | **8** | **12** |
| column gap | **16** | **24** | **32** |
| grid margin (= gutter) | **16** | **32** | **48** |
| header padding | `16` | `20` | `20` |
| header height (derived) | **100** | **108** | **108** |
| header position | sticky, top 0 | sticky, top 0 | sticky, top 0 |
| nav bar height | 68 | 68 | 68 |
| nav bar inset (all sides) | 12 | 12 | 12 |
| button height (links, CTA, menu) | 44 | 44 | 44 |
| button text / padding / gap | 16 / `10 12` / 12 | 16 / `10 12` / 12 | 16 / `10 12` / 12 |
| logo height | 40 | 40 | 40 |
<!-- end doc-table -->

## Section, content and nav details (from "Exact declarations")

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Section `align-items` and `align-content` | center | flex-start | center |
| Section `overflow` | hidden | hidden | visible |
| Content `z-index` | 1 | 1 | none |

Canvas: flex column, sections stack on padding only, never margin, `gap: 0`. Content: `padding: 0`, never a gutter. Top nav: sticky, top 0, z index 10, `will-change: transform`, `cursor: grab` with links and buttons keeping `cursor: pointer`. Spring: 0.4s, bounce 0.2, delay 0, as `--duration-spring` and `--ease-spring` (a sampled `linear()` curve, about 1.5% overshoot); every nav transition uses it and GSAP stays the engine for scroll animation.

## Every page is indexed (from "Canvas, every page is indexed")

On every route: `<html lang>`; a skip link as the first focusable element targeting `#main`; `<main id="main" tabindex="-1">` named by the page title; `<header>` for the sticky nav and `<footer id="site-footer">` named "Site footer"; exactly one h1 inside main; `main[data-scroll-flow]` lists the section ids in order and every top level section gets `data-scroll-index` 1 to n (set in `BaseLayout`); `scroll-margin-top: var(--header-height)` on sections.

## Mobile menu, required behaviour

Covers the screen: `100dvh` with a `100svh` fallback, minus safe areas. Scrolls internally on short screens with `overscroll-behavior: contain`. Scroll lock by `position: fixed` on body with the scroll position restored, because iOS ignores `overflow: hidden` (`src/lib/site-header.ts`). The toggle keeps the exact coordinates it has when closed. One left edge for logo, links, contact and legal. Links at the top; contact and legal pinned to the bottom. Open and close use the nav spring; links fade and rise with about 40ms stagger; the toggle morphs by transform.

## Motion

Nav and hover use the spring. Load and scroll in: opacity and translateY through GSAP (`[data-reveal]`), first group at 0.4s, second at 0.9s. Transform based only; everything behind `prefers-reduced-motion`.

## PWA and safe areas

`viewport-fit=cover`; `env(safe-area-inset-*)` through `--safe-*` on the nav; a dedicated maskable icon (`pwa-maskable-512.png`); `dvh` with an `svh` fallback.

## Hero, first screen

On a 390 x 844 phone the headline, subhead and primary action sit on the first screen, not under the cookie banner. The doc marks this as a rule not re-measured.
