# Sizing

Component size reference (values currently implemented across the site).

## Component Sizes

| Component | Value | Token |
|---|---|---|
| Nav bar height | `68px` (44 + 2 × 12), every breakpoint | `--nav-height` (derived) |
| Header height | `100px` mobile, `108px` tablet and desktop | `--header-height` (derived) |
| Nav button | `44px` tall, 16px text, 10 · 12 padding, 12 gap | `--control-size` |
| Nav logo | `40px` high, every breakpoint | `--nav-logo-height` |
| Mobile menu max | `100dvh` (single scroll) | |
| Pillar thumb | `88px` (mobile `62px`) | `--pillar-thumb`, `--pillar-thumb-sm` |
| Toggle chip | `44px` | |
| Author photo | `56px` circle | |
| Team photo | 1:1 aspect | |
| Work/blog thumb | 16/10 aspect | |
| Bento tile min-height | `180px` | `--bento-min` |
| Stat number | `--fluid-h3` | |

`--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` are declared in `src/styles/global.css`. As of 2026-11-16 no component references them with `var()`.

## Rail, signature and line length

Confirmed by the owner, 2026-11-17. No token yet.

| Item | Value |
|---|---|
| Rail width | `85vw`, never past the 1200 content max |
| Rail peek | 20% |
| Signature width | `2400px` |
| Line length | 35 to 60 characters |

## Icon Sizes

| Icon | Size |
|---|---|
| WhatsApp (nav CTA) | `16px` |
| Toolkit icons | `16px` ≤ size ≤ `18px` |
| Bento stack icons | `18px` |
| Logo lockup | 149×54 (SVG intrinsic) |
| Logo mark | 54×54 (SVG intrinsic) |
