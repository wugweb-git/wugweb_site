# Component sizes (copied from the doc)

Source: `kits_design_system/docs/tokens/sizing.md`, read 2026-11-17. The doc wins; if this differs, this copy is stale. Each row is a value to check against its token in `src/styles/global.css`.

| Component | Value | Token |
|---|---|---|
| Nav bar height | 68px (44 + 2 x 12), every breakpoint | `--nav-height` (derived) |
| Header height | 100px mobile, 108px tablet and desktop | `--header-height` (derived) |
| Nav button | 44px tall, 16px text, 10 12 padding, 12 gap | `--control-size` |
| Nav logo | 40px high, every breakpoint | `--nav-logo-height` |
| Mobile menu max | 100dvh (single scroll) | none |
| Pillar thumb | 88px (mobile 62px) | `--pillar-thumb`, `--pillar-thumb-sm` |
| Toggle chip | 44px | none named |
| Author photo | 56px circle | none named |
| Team photo | 1:1 aspect | none |
| Work and blog thumb | 16/10 aspect | none |
| Bento tile min height | 180px | `--bento-min` |
| Stat number | `--fluid-h3` | `--fluid-h3` |

`--pillar-thumb`, `--pillar-thumb-sm` and `--bento-min` are declared and no component references them with `var()` yet (2026-11-16). Toggle chip 44 and author photo 56 show no token in the doc and are not yet checked in code.

Icons: WhatsApp nav CTA 16px; toolkit icons between 16px and 18px; bento stack icons 18px; logo lockup 149 x 54 and mark 54 x 54 (SVG intrinsic).

## Sizes confirmed by the owner, 2026-11-17

These four are confirmed by the owner but are not yet in `sizing.md` or any design doc. The docs stay the source; add them there before relying on them.

| Item | Value |
|---|---|
| Rail width | 85vw, never wider than the 1200 content max on desktop |
| Rail peek | 20% |
| Signature width | 2400px |
| Line length | 35 to 60 characters |

Token names approved by the owner 2026-11-17, not yet in `global.css` (site code, waits for the owner's go): `--rail-width: min(85vw, 1200px)`, `--rail-peek: 20%`, `--signature-width: 2400px`, `--measure-min: 35ch`, `--measure-max: 60ch`.

## Made-file sizes adopted by the owner, 2026-11-17

Relayed through the coordinating session from the `wugweb-seo` rulings. Source is the owner, not a design doc.

| File | Size |
|---|---|
| Og image | 1200 x 630, key content in the central 80% |
| LinkedIn link image | 1200 x 627 minimum |
| Behance cover | 808 x 632 minimum |
| Dribbble | 1600 wide |
| Story | 1080 x 1920, safe zone unverified |

## Card thumbnails, owner 2026-11-17

One thumbnail ratio, 16/10, on every card, not only work and blog. The original file ratio is kept and the 16/10 frame is a mask on the page. Old Framer media ratios stay an open item in `layout-shell.md`.

## Deck and card type sizes, owner approved 2026-11-17

Kits proposed these from the existing site scale and the owner approved. No new token; the three graphic tokens scale with their container (container query units), so they fit any made-file size.

| Role on a deck slide or card | Token | Range |
|---|---|---|
| Title | `--type-graphic-l` | 4rem to 12rem, 14% of container width |
| Subtitle or key figure | `--type-graphic-m` | 2.5rem to 7rem, 9% |
| Label or tag | `--type-graphic-s` | 1.75rem to 4rem, 6% |
| Body text | `--fluid-body-md`, `--fluid-body-sm` | unchanged |

The element that holds the text must be a size container (`container-type: inline-size`). Only `--type-graphic-s` is used in code today (`ServiceTagField`); all three are in `typography.md` (2026-11-17).
