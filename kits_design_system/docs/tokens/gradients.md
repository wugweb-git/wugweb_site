# Gradients

Source of truth: `src/styles/global.css` `:root`. Never create gradients manually — use tokens.

## Gradient Tokens (`--gradient-*`)

| Token | Value | Use |
|---|---|---|
| `--gradient-brand` | `linear-gradient(135deg, #FFBE1A, #E54F30)` | Brand / CTA accents |
| `--gradient-strategy` | `linear-gradient(135deg, #FA4108, #FF8F66)` | Strategy panels |
| `--gradient-experience` | `linear-gradient(135deg, #09E2C0, #6EF0DC)` | Experience panels |
| `--gradient-engineering` | `linear-gradient(135deg, #2167E9, #7FA8F3)` | Engineering panels |
| `--gradient-growth` | `linear-gradient(135deg, #3ED219, #9BE97F)` | Growth panels |
| `--gradient-operations` | `linear-gradient(135deg, #7A4DFF, #B49CFF)` | Operations panels |

## Service Gradient → Service Color Mapping

| Service | Gradient | Base color |
|---|---|---|
| Strategy | `--gradient-strategy` | `--svc-strategy` `#FA4108` |
| Brand | `--gradient-brand` | `--svc-brand` `#E6309F` |
| Experience | `--gradient-experience` | `--svc-experience` `#09E2C0` |
| Engineering | `--gradient-engineering` | `--svc-engineering` `#2167E9` |
| Growth | `--gradient-growth` | `--svc-growth` `#3ED219` |
| Operations | `--gradient-operations` | `--svc-operations` `#7A4DFF` |

## Usage

```css
background: var(--gradient-strategy);
```
