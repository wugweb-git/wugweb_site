# Consolidation targets

From the UI spec of 2026-09-22, section 6, re-checked against code 2026-11-17. This is the only home of these targets now that the spec is retired. Each is a `reuse-collapse-duplicates-with-a-survivor` job: count consumers first (`map-count-before-you-propose`), pick a survivor, and end with deletions.

| Target | Survivor | Still separate in code (2026-11-17) |
|---|---|---|
| Button | `.btn` with tiers (`kits-button-tiers`) | `svc-btn` and `approach-cta-btn` sit on `.btn` with their own CSS; `nav-cta`, `mobile-cta`, `desktop-cta` (SiteHeader) and `footer-action-btn` (SiteFooter) stand alone; `.btn-partners-cta` is dead CSS |
| Chip | one Chip, `--radius-full` | `filter-chip` (styled in both blog and work index), `pm-chip`, `bento-chip`, `chips-row`, `tag` |
| Hero | one Hero | `.hero`, `.about-hero`, `.services-hero`, `.blog-hero`, `.contact-v2-hero` |
| Bento | `BentoBlock.astro` | `work/[slug].astro` keeps its own `.bento` grid |
| Eyebrow | one `.eyebrow` in `global.css` | restyled in 9 files |
| Surface | one glass panel | `.glass-panel` styled in 5 files |

Done since the spec: PostCard (one card for InsightsBlock, blog index and post; `.global-blog-list` is dead CSS).

Each target is a site change: its own branch, preview and the owner's go.
