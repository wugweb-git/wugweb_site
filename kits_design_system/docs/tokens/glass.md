# Glass

Source of truth: `src/styles/global.css` `:root`. Glass = blur + border + tint combined.

## Glass Tokens (`--glass-*`)

| Token | Backdrop-filter | Use |
|---|---|---|
| `--glass-light` | `blur(16px) saturate(1.2)` | Small floating chips, inputs |
| `--glass-medium` | `blur(24px) saturate(1.3)` | Nav bar, glass panel, mega menu |
| `--glass-heavy` | `blur(40px) saturate(1.4)` | Modals, full-screen menus |
| `--glass-dark` | `blur(24px) saturate(1.2)` | Dark scrim overlays |

Pair with a tint + border:

```css
/* Glass card (pillars panel on home) */
.glass-panel {
  background: color-mix(in srgb, var(--neutral-8) 42%, transparent);
  border: 1px solid color-mix(in srgb, var(--neutral-0) 12%, transparent);
  backdrop-filter: var(--glass-medium);
  -webkit-backdrop-filter: var(--glass-medium);
  box-shadow: var(--shadow-xl);
}
```

## Usage

- Glass Cards
- Modal
- Mega Menu
- Floating Nav
- Hero Overlay
