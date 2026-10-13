# Wugweb site — UI audit and spec (handoff to Claude Code)

Date: 22 Sep 2026
Old site: https://wugweb.com (Framer)
New site: https://wugweb.pages.dev (Astro on Cloudflare Pages)

Scope: UI mechanics only — breakpoints, width rules, type scale, tokens, components, nav, motion, PWA.
Content (copy, case studies, logos) is out of scope and listed at the end as flags only.

Method: both sites fetched and rendered in headless Chromium at 360 / 390 / 430 / 810 / 1024 / 1200 / 1440 / 1920 px.
All numbers below are measured, not estimated.

Caveats:
- Headless Chromium only. iOS Safari behaviour (dvh, body scroll lock, address bar) is untested.
- Safe-area insets read as 0 in headless, so notch spacing is unverified.
- The Kits "Responsive Token Contract — sm/md/lg" (normative, v2, committed 31 Aug 2026) has NOT been
  read yet. If its values differ from section 2 and 4 below, Kits wins and this spec must be reconciled.
- Storybook returns 404 on pages.dev and the repo is private, so nothing here was checked against stories.

---

## 1. Old site contract (the parity target)

Breakpoints (Framer, three):
- mobile: 0 ≤ w < 768
- tablet: 768 ≤ w < 1200
- desktop: 1200 ≤ w

Width locks:
- section inner container: max 1200 px, centred
- nav: sticky, 20 px outer inset, inner container max 1280 px

Section padding (block / inline):
- mobile: 48 / 16
- tablet: 70 / 32
- desktop: 96 / 48

Aspect ratios used on media: 1, 3.75, 2.857, 1.76, 1.75, 1.71, 1.206
(not yet mapped to individual sections — see open items)

---

## 2. Breakpoints — fix

New site currently uses seven: 600, 640, 700, 768, 900, 1024, 1200.

Target (mobile-first, min-width only):
- base: 0
- md: 768
- lg: 1200

Delete 600, 640, 700, 900, 1024. Breakpoint tokens exist but are unused and define 1024 / 1280;
either align them to 768 / 1200 or delete them (media queries cannot read CSS variables anyway —
if they must be tokenised, do it at build time).

---

## 3. Width rule — nothing wider than the nav

Stated rule: no container may exceed the width of the nav.

Measured (nav width / widest non-full-bleed block):

| viewport | old | new |
|---|---|---|
| 390  | 358 / 358  | 358 / 380  FAIL |
| 810  | 746 / 794 FAIL | 762 / 790  FAIL |
| 1280 | 1240 / 1240 | 1184 / 1248 FAIL |
| 1440 | 1280 / 1280 | 1280 / 1280 |
| 1920 | 1280 / 1280 | 1280 / 1280 |

Single offender on the new site, present on every page: `.wrap.global-final-cta`
(380 px at 390, 1248 px at 1280). Screenshot: `03-new-width-390.png`, `03-new-width-1280.png`.

Implementation:
```
--shell-inset: <nav inset, see below>;
--shell-max: 1280px;
--shell: min(calc(100vw - 2 * var(--shell-inset)), var(--shell-max));
```
- nav and every container use `width: var(--shell)` (or `max-width`), centred
- `.wrap.global-final-cta` must not opt out with its own padding/width

Nav inset — DECISION NEEDED:
- old: 16 / 32 / 20 px (mobile / tablet / desktop) — non-monotonic
- new: 16 / 24 / 48 px — at 1280 this makes the nav narrower than content
- proposal: single fluid value 16 → 32 px, or keep the old stepped values. Vedanshu to pick.

Second bug visible in the same screenshots: social icons overflow the bottom edge of the yellow
final-CTA panel at both 390 and 1280.

---

## 4. Type scale

Problem with the current fluid scale: the vw term is too small relative to the min, so sizes only
start moving above ~580–640 px. On every phone the scale is effectively static, and smaller than the
old site.

Measured at 390 px: new h1 = 40 px (old 48), new h2 = 20 px (old 30), first paragraph = 10.1 px.

### 4.1 Text scale (reading hierarchy)

Anchors: min value at 360 px, max value at 1280 px (same point as the width lock), locked beyond.

| tier | old mob / tab / desk | fluid |
|---|---|---|
| Display   | 48 / 64 / 80 | `clamp(3rem, 2.217rem + 3.478vw, 5rem)` |
| H1        | 36 / 40 / 48 | `clamp(2.25rem, 1.957rem + 1.304vw, 3rem)` |
| H2        | 30 / 32 / 36 | `clamp(1.875rem, 1.728rem + 0.652vw, 2.25rem)` |
| H3        | 21 / 22 / 24 | `clamp(1.3125rem, 1.239rem + 0.326vw, 1.5rem)` |
| H4        | 18 / 19 / 20 | `clamp(1.125rem, 1.076rem + 0.217vw, 1.25rem)` |
| H5        | 16 / 19 / 20 | `clamp(1rem, 0.902rem + 0.435vw, 1.25rem)` |
| Body L    | 16 / 17 / 18 | `clamp(1rem, 0.951rem + 0.217vw, 1.125rem)` |
| Body      | 14 / 15 / 16 | `clamp(0.875rem, 0.826rem + 0.217vw, 1rem)` |
| Body S    | 13 / 13 / 14 | `clamp(0.8125rem, 0.788rem + 0.109vw, 0.875rem)` |
| Caption   | 12 / 13 / 14 | `clamp(0.75rem, 0.701rem + 0.217vw, 0.875rem)` |
| Label     | 16 flat      | `1rem` |

Remove the parallel static `ts-*` sizes so there is one source per tier.

### 4.2 Graphic display tier (new — for graphics, not reading)

Separate from the text scale. Sizes to its container (`cqi`), never wraps, not tied to heading tags.

| token | use | value |
|---|---|---|
| `--type-graphic-l` | hero-scale words | `clamp(4rem, 14cqi, 12rem)` |
| `--type-graphic-m` | feature graphics | `clamp(2.5rem, 9cqi, 7rem)` |
| `--type-graphic-s` | pills, tags, badges as graphics | `clamp(1.75rem, 6cqi, 4rem)` |

Rules:
- parent needs `container-type: inline-size`
- `white-space: nowrap`; never `overflow-wrap: anywhere`
- line-height 0.9–1.0, negative tracking
- decorative instances hidden from assistive tech; real labels stay readable text with this styling
- scale / rotate / drag effects belong to this tier only, never to reading text

Sanity check at 390 px: field ≈ 358 px → Graphic S = 28 px → "engineering" ≈ 170 px, fits on one line
with the index number and the + button. At 1280 px it caps at 64 px.

### 4.3 Spacing (fluid, desktop included)

- gutters: 16 → 48 px, `clamp(1rem, 0.217rem + 3.478vw, 3rem)`
- section padding-block: 48 → 96 px, `clamp(3rem, 1.826rem + 5.217vw, 6rem)`

---

## 5. Tokens (new site: 378 defined)

- 184 defined but never used
- 25 referenced but never defined, including `--svc-accent`, `--svc-bg`, `--svc-fg`
  (this is why service colours do not apply)
- duplicate scales: `gap` / `s` / `p` (same 4px scale, `s` unused); `r` / `radius`; `z` / `layer`;
  `shadow` / `elevation`
- `--easing-spring` is identical to `--easing-bounce`
- conflicting definitions: `--shadow` and `--shadow-lg` each defined twice with different values
- two yellows: token `#FFBE1A`, hardcoded `#FFD000` used 17 times (old Framer site also used `#FCDD33`)
- 108 hardcoded hex colours, 280 hardcoded px values outside token definitions

Merge order:
1. delete the 25 undefined references or define them (fix service colours first — user-visible)
2. collapse duplicate scales to one each
3. resolve the two yellows against Branding (blocked — see open items)
4. replace hardcoded hex and px with tokens
5. delete unused tokens last, after 1–4, so nothing is deleted that step 4 would have used

---

## 6. Components to consolidate

| current | count | target |
|---|---|---|
| btn, svc-btn, footer-action-btn, nav-cta, mobile-cta, desktop-cta, approach-cta-btn, btn-partners-cta, btn-sm (cookie) | 9 | Button (variants) |
| filter-chip, pm-chip, bento-chip, ind-pill, badge-pill, tag, chips-row | 7 | Chip |
| global-blog-list card, blog-teaser-card, blog-grid post | 3 | PostCard |
| hero, about-hero, services-hero, blog-hero, contact-v2-hero | 5 | Hero |
| bento, case-bento-grid | 2 | Bento |
| eyebrow, glass-panel (repeated per page scope) | many | Eyebrow, Surface |

These belong in Kits, not in the site repo. The site consumes them.

---

## 7. Nav and menu

Measured, open state, at 411 px CSS width:

| | old | new |
|---|---|---|
| card inset | 16 | ~6 |
| inner padding | 12 | varies |
| logo width | 125 | 82 |
| toggle | 47 px, 15 px from card top | 45 px, flush with card top |
| distinct left edges | 1 | 3 (logo 31, links 40, contact 23) |
| link height | 58 | 58 |
| link gap | 10 | 8 |
| link text | left, ~26 px | centred, ~20 px |
| Let's Talk | same as other links, 58 px | yellow, 52 px |
| contact rows | one grouped block | two separate cards |

Behaviour bugs on the new site:
1. no animation — open swaps `display: none` → `flex`; the transition is on `min-height` while the
   open state changes `max-height`, so nothing animates
2. icon swap, not morph — two icons toggled with `display`
3. open card overflows — `max-height: 100dvh` plus header top padding
4. scroll lock relies on `body { overflow: hidden }`, which iOS Safari ignores; page behind still
   scrolls (visible in the user's screenshot and in `02-new-menu-open-390.png`)
5. the toggle jumps on open because the top row reflows (`flex-wrap: wrap` in the open state)

Required behaviour:
- open menu covers the full screen: `height: 100dvh` (`100svh` fallback), top padding
  `calc(env(safe-area-inset-top) + var(--shell-inset))`
- toggle stays at the exact coordinates it occupies when closed
- one left edge for logo, links, contact and legal
- links at the top, contact and legal pinned to the bottom; the card scrolls internally on short
  screens with `overscroll-behavior: contain`
- scroll lock via `position: fixed` on body, saving and restoring scroll position
- closed nav height 78 px (already matches the old site)
- use the new phone number (+91 92059 96219) — decided

Fluid nav values (old values as the caps):
- card inset: `clamp(12px, 3.9vw, 16px)` (pending the nav-inset decision in section 3)
- inner padding: `clamp(10px, 2.9vw, 12px)`
- logo: `clamp(100px, 30.4vw, 140px)`
- toggle: `clamp(44px, 11.4vw, 48px)` square
- link: `min-height: clamp(52px, 14.1vw, 64px)`, `font-size: clamp(22px, 6.3vw, 28px)`,
  `gap: clamp(8px, 2.4vw, 12px)`

---

## 8. Service pills

Causes:
- label uses the H1 size (32 px min on mobile) — too large for the pill
- `overflow-wrap: anywhere` permits mid-word breaks → "experienc / e", "growt / h", "bran / d"
- three conflicting caps: 26rem, 84 %, 92 % of the field, all narrower than "engineering" at that size
- pills positioned at fixed x/y offsets, so they escape the field; the field's `overflow: hidden`
  then clips them
- `touch-action: none` on the field blocks page scrolling when a thumb lands on it (mobile bug)

Fix:
- label uses `--type-graphic-s` with `white-space: nowrap`; remove `overflow-wrap: anywhere`
- field gets `container-type: inline-size`
- pill positions expressed as a percentage of the field, clamped so each pill's right edge stays
  inside the field
- scale the group as one unit, not each pill independently
- `touch-action: pan-y` so vertical scrolling still works; drag stays horizontal

Screenshot: `01-new-pills-390.png`

---

## 9. Hero on mobile

Measured at 390 × 844:
- old: h1 top at ~320 px — headline, subhead and both buttons visible on the first screen
- new: h1 top at 683 px — the headline sits under the cookie banner on load; the first screen is empty
- new h1 renders 40 px (old 48); the eyebrow renders 10 px

Screenshots: `04-old-hero-390.png`, `04-new-hero-390.png`

The hero's own height and spacing rules need to be brought back in line with the old site; the fluid
scale in section 4 fixes the type sizes but not the vertical offset.

---

## 10. PWA

Working: manifest, service worker, standalone display mode.

Missing:
- no `viewport-fit=cover` on the viewport meta tag
- no `env(safe-area-inset-*)` anywhere in the CSS; combined with `black-translucent`, the nav sits
  under the notch and fixed bottom UI sits under the home indicator
- the maskable icon reuses the 512 px "any" icon, so Android crops the logo — needs its own file with
  safe-zone padding
- viewport height units are mixed (`vh`, `svh`, `dvh`) — standardise on `dvh` with `svh` fallback

---

## 11. Motion

Old site: 30 elements animate in on load; spring stiffness 200 / damping 60, delayed 0.4 s (5 elements)
and 0.9 s (6 elements); a faster spring (0.4 s, bounce 0.2) on 5 elements, probably nav and hover;
`will-change: transform` on 173 elements (transform-based).

New site: no load animations at all. Only keyframes present are a marquee, a ball squash and the
cookie banner slide-up.

Target:
- nav open: animate height or clip-path with the 0.4 s spring (bounce 0.2); links fade and slide up
  with ~40 ms stagger; toggle icon morphs via transform
- load / scroll-in: opacity + translateY on IntersectionObserver, `linear()` easing approximating
  the spring; first group at 0.4 s, second at 0.9 s
- everything behind the existing `prefers-reduced-motion` rules

Hamburger → X timing is still unknown (no recording available) — the 0.4 s / bounce 0.2 spring is an
assumption taken from the old site's code, not a measurement.

---

## 12. Storybook

Currently 404 on pages.dev, repo private. To make it useful:
- deploy a public static build (separate Cloudflare Pages project is fine)
- one story per component with every variant and state (default, hover, open, disabled, long label)
- viewport addon set to 360 / 810 / 1280
- a Foundations section rendering tokens, the text scale, the graphic tier and spacing live
- page-section stories for composites: nav (closed and open), service pills, hero, final CTA

Note: Storybook has no official Astro renderer as far as is known here; verify what the current
install actually renders, because a wrapped component can differ from what ships.

---

## 13. Open items (decisions needed before implementation)

1. Nav inset values (section 3) — old stepped 16/32/20 or fluid 16→32
2. Kits responsive token contract not yet read — may override sections 2 and 4
3. Brand values (the yellow, typefaces, logo rules) — the Notion Brand Bible page is empty
4. Screen recording of the old hamburger → X motion, for exact timing
5. Old aspect ratios not yet mapped to individual sections

---

## 14. Content flags (NOT in scope — listed so they are not lost)

- three case studies exist under two slugs each (Airtel Xsafe, Airtel Xstream Play, MusicLinkd);
  old slugs should 301 to new ones rather than exist as duplicate pages
- both MusicLinkd cards have no thumbnail
- shared logo files: Airtel XSafe = Airtel Xstream; IndusInd = IndusNinja; Sadhan = TOT
- IndusNinja, TOT, Valyu.ai, VisiOne still load from `/assets/framer/...`
- "Trusted by leading brands" heading sits inside the logo list
- services numbered 01, 03, 06, 02, 04, 05
- industries marquee contains "Confidential", "Internship Program", "Design System"
- blog cards inconsistent (missing image / missing author); typo "Heres"
- copyright reads 2020–2025
- `og:image` is a relative path; meta description hard-truncated with a literal ellipsis
- phone number: use the new one (+91 92059 96219) — decided

---

## Evidence files (same folder)

- `01-new-pills-390.png` — pills wrapping mid-word and escaping the field
- `02-new-menu-open-390.png` — menu not covering the screen, three left edges, page visible behind
- `03-new-width-390.png`, `03-new-width-1280.png` — green = nav, red = container wider than nav
- `04-old-hero-390.png`, `04-new-hero-390.png` — hero position and type size, old vs new
