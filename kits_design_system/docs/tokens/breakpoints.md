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

## Going down: `max-width`

Use the step minus `0.02`, never the step itself:

```css
@media (max-width:  639.98px) { /* phones      */ }
@media (max-width:  767.98px) { /* below tablet */ }
@media (max-width: 1023.98px) { /* below desktop */ }
```

`.98` is not decoration. Viewport widths are not always integers — page zoom
and some devices produce fractional values — so `max-width: 639px` leaves
639.5px matching neither side. And `max-width: 640px` beside `min-width: 640px`
matches **both** at exactly 640, which is a bug this codebase actually had in
`ServiceTagField` and `ClientAssemblyGrid`: a 640px viewport got the tablet chip
and the phone min-height at once, with source order picking the winner.

## There is no step below 480, deliberately

The CSS is mobile-first, so 320px and 375px get the base styles with no media
query at all. Adding a `min-width: 375px` would mean anything narrower gets
something different, which is backwards. Verified at both widths: no horizontal
overflow, and no `min-width` tier matches.

## Reconciled 2026-09-29

The code had drifted to **thirteen** values against the six declared here —
480, 500, 560, 640, 700, 767, 768, 860, 900, 992, 1023, 1024, 1200. `992` was a
Bootstrap value with 13 uses; `1200` matched no token at all and is now 1280
(`--breakpoint-xl`). Every `@media` in `src/` now uses a value from this table.
`--breakpoint-2xl` (1440px) is declared but not yet used.
