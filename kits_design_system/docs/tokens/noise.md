# Noise

"Very Wugweb." Inline SVG grain textures defined as data-URI tokens in `src/styles/global.css`.

## Noise Tokens (`--noise-*`)

| Token | Opacity | Intensity |
|---|---|---|
| `--noise-light` | `0.04` | Subtle grain |
| `--noise-medium` | `0.07` | Standard grain |
| `--noise-heavy` | `0.12` | Strong grain |
| `--noise-editorial` | `0.06` | Editorial / print feel |

## Usage

```css
.hero-overlay::after,
.cta-band {
  background-image: var(--noise-editorial);
}
```

Apply to hero overlays, CTA bands, and large surfaces to add texture without images.
