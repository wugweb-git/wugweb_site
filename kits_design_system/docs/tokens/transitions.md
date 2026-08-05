# Transitions

Source of truth: `src/styles/global.css` `:root`.

## Transition Tokens (`--transition-*`)

| Token | Value |
|---|---|
| `--transition-page` | `opacity var(--duration-normal) var(--easing-smooth), transform var(--duration-normal) var(--easing-smooth)` |
| `--transition-overlay` | `opacity var(--duration-slow) var(--easing-smooth)` |

## Usage

```css
.page-enter {
  transition: var(--transition-page);
}
.overlay {
  transition: var(--transition-overlay);
}
```

See `motion.md` for durations, easings, hover, focus, selection, and cursor tokens.
