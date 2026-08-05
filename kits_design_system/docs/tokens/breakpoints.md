# Breakpoints

Documentation-only — CSS custom properties CANNOT be used inside `@media` queries. Use the literal pixel values in `@media` rules.

| Name | Token | Value | Cols |
|---|---|---|---|
| Mobile S | `--breakpoint-xs` | `480px` | 4 |
| Mobile L | `--breakpoint-sm` | `640px` | 4 |
| Tablet | `--breakpoint-md` | `768px` | 8 |
| Desktop S | `--breakpoint-lg` | `1024px` | 12 |
| Desktop M | `--breakpoint-xl` | `1280px` | 12 |
| Desktop L | `--breakpoint-2xl` | `1440px` | 12 |

```css
@media (min-width: 768px) { /* tablet+ */ }
@media (min-width: 1024px) { /* desktop */ }
```

Mobile-first: design for the smallest viewport first, enhance up.
