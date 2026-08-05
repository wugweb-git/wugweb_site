# Icons

## Brand Assets (public/brand/)

| Asset | Source | Use |
|---|---|---|
| `logo-large.svg` | `assets/brand/Logo Large.svg` | SiteHeader lockup, bento CTA (white "wug" + grey "web") |
| `logo-small.svg` | `assets/brand/Logo Small.svg` | Apple touch icon, favicon fallback |
| `favicon-16.png` / `favicon-32.png` | `assets/brand/` | Favicons |
| `og-default.png` | `assets/brand/full.png` | Default OG image (logo lockup) |
| `wugweb-mark.png` | legacy | Fallback mark |

The `Logo Large.svg` lockup has the "wug" in white (`--neutral-0`) and "web" in grey
(`--color-grey`) baked in — matches the dark interface; no CSS color overrides needed.

## Toolkit Icons

89 tool icons extracted from Framer live in `public/assets/tools/*` with `taxonomy.tech-stack` records (`iconPath`). Rendered via `assetUrl(iconPath)` in:
- Service detail toolkit chips (`services/[slug].astro`)
- About bento stack chips

## Icon Usage Rules

- Inline SVG for UI icons (WhatsApp, plus/close, arrows) — `currentColor`, `16px` default.
- Never hotlink external icon CDNs.
- All icons used in content come from the Sanity taxonomy `tech-stack` vocabulary.
