# Known doc clashes

Recorded, not resolved unless marked. Source: plan sections 25 and 27, checked 2026-11-16.

| Clash | Where | Status |
|---|---|---|
| Proposed `faqs` field for FAQPage JSON-LD against the no-FAQPage rule | `layout-shell.md`, CMS fields | Resolved 2026-11-17: kept, only where every question and answer is visible. Case-study `seoCanonicalUrl`, `schemaType`, `aiSummary`, `keyTakeaways` dropped. |
| The CMS fields section is a proposal, not deployed, inside the authoritative doc | `layout-shell.md` | Open |
| Framer media aspect ratios are not mapped to sections | `layout-shell.md`, "Open" | Open |
| Button focus: doc says `--focus-primary`, code uses `outline: 2px solid var(--neutral-3)` on `.btn:focus-visible` | `components.md` and `global.css` | Open, report only |
| "The only max-width in the shell" wording may mislead | `layout-shell.md` | Fixed 2026-11-17 |
| Five blocks awaiting sign-off | `components.md` | Signed off by the owner 2026-11-17; `components.md` still marks them awaiting, to be updated |
| Last verified at 1440 | `layout-shell.md` | Fixed 2026-11-16, measured at 375, 768, 1200 |
| Dashes for empty cells | `sizing.md` | Fixed 2026-11-16 |
| No token shown for pillar thumb and bento min height | `sizing.md` | Fixed 2026-11-16 |
| Stale line numbers for button rules | `components.md` | Fixed, cited by selector |
| Hardcoded `#000` on the WhatsApp button text | `components.md` | Fixed, code uses `--color-ash` |

Findings on pages: `/footer/reviews` hero has 216px inline padding at 1200 where the shell gives 48; `/work/[slug]` has 6 sections with no id; `/contact-us` has no section inside the main landmark; grid columns 4, 8, 12 are not measured.
