# Known doc clashes

Recorded, not resolved unless marked. Source: plan sections 25 and 27, checked 2026-11-16.

| Clash | Where | Status |
|---|---|---|
| Proposed `faqs` field for FAQPage JSON-LD against the no-FAQPage rule | `layout-shell.md`, CMS fields | Resolved 2026-11-17: the field stays (owner); strategy and seo agreed a faqs block only on service pages and blog posts; case studies never carry one, so the case-study field stays unused unless the owner supplies visible questions. Case-study `seoCanonicalUrl`, `schemaType`, `aiSummary`, `keyTakeaways` dropped. |
| The CMS fields section is a proposal, not deployed, inside the authoritative doc | `layout-shell.md` | Open |
| Framer media aspect ratios are not mapped to sections | `layout-shell.md`, "Open" | Closed 2026-11-17 (owner): not mapped, the site's own ratios stand |
| Button focus: doc says `--focus-primary`, code uses `outline: 2px solid var(--neutral-3)` on `.btn:focus-visible` | `components.md` and `global.css` | Docs updated 2026-11-17 (focus tokens are `--neutral-3`); the raw outline on `.btn:focus-visible` is still a code finding, report only |
| "The only max-width in the shell" wording may mislead | `layout-shell.md` | Fixed 2026-11-17 |
| Five blocks awaiting sign-off | `components.md`, `blocks/` | Signed off by the owner 2026-11-17; `components.md` and the five block docs updated (a7436497) |
| Stale values: 1280 breakpoint, section 32 to 80, reveal 30px at 85%, rise 80, scale 0.92, header z 50, yellow accent and focus, `--t-h5`, work card radius | `design.md`, `tokens/*.md`, `motion.md`, `components.md` | Fixed 2026-11-17 (a7436497) |
| README secondary colours against the pillar ruling | `kits_design_system/README.md` | Fixed 2026-11-17: all six pillar colours stand and the accent is grey (owner) |
| `--theme-glow` documented, never defined | `motion.md`, `components.md` | Docs note it as undefined; code unchanged |
| Last verified at 1440 | `layout-shell.md` | Fixed 2026-11-16, measured at 375, 768, 1200 |
| Dashes for empty cells | `sizing.md` | Fixed 2026-11-16 |
| No token shown for pillar thumb and bento min height | `sizing.md` | Fixed 2026-11-16 |
| Stale line numbers for button rules | `components.md` | Fixed, cited by selector |
| Hardcoded `#000` on the WhatsApp button text | `components.md` | Fixed, code uses `--color-ash` |

Findings on pages: `/footer/reviews` hero has 216px inline padding at 1200 where the shell gives 48; `/contact-us` nests a second `main` inside the page main (`contact-us.astro:62`); grid columns 4, 8, 12 are not measured.
