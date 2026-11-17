# Storybook, the living reference

Checked 2026-11-17 on main. `.storybook/main.ts` uses `@storybook-astro/framework`, stories at `src/**/*.stories.ts`, addons a11y and Chromatic. `preview.ts` loads `global.css`, runs the scroll animations through `RevealDecorator`, and sets a dark background `#0b0b0b`, which matches no token (the page canvas is `--color-surface-page` `#050505`; finding, report only). `npm run storybook` serves on 6006; `npm run storybook:build` builds (passed 2026-11-17). It is not deployed: `wugweb.pages.dev/storybook/` returns 404.

## How to use it in an audit

1. Run `npm run storybook` and open the component's story.
2. Check states, variants and reduced motion there, and the a11y panel; record the result as measured, not claimed.
3. Check the story against its block doc or `components.md` entry. A story is evidence of the component, not its spec: the doc wins.
4. Measure layout at 375, 768 and 1200 with the viewport tool.

## Story map

| Story | Spec | Rules most in play |
|---|---|---|
| BentoBlock | `blocks/bento-block.md` | `kits-bento-never-even`, `kits-animated-block-lint` |
| ButtonShowcase | `components.md` | `kits-button-tiers`, `kits-states-on-btn`, `kits-radius-by-role` |
| ClientAssemblyGrid | `blocks/client-assembly-grid.md` | `kits-animated-block-lint`, `label-lists-are-lists` |
| CookieBannerShowcase | none | `label-skip-and-landmarks`, `kits-tokens-only` |
| FaqAccordion | none | `label-heading-order`, `kits-states-on-btn` |
| FooterCTA | `components.md` | `kits-yellow-budget`, `shell-rhythm-exemption` |
| InsightsBlock | `components.md` | `label-lists-are-lists`, `label-alt-always` |
| PortableTextRenderer | none | `kits-tokens-only`, `label-heading-order` |
| ProcessMap | `blocks/process-map.md` | `kits-animated-block-lint` |
| SectorShowcase | `blocks/sector-showcase.md` | `label-id-and-name` |
| ServiceSpotlightPanel | `blocks/service-spotlight-panel.md` | `kits-gsap-owns-motion` (loops), `label-alt-always`, `shell-no-retired-values` |
| ServiceTagField | `blocks/service-tag-field.md` | `kits-animated-block-lint` |
| SiteFooter | `components.md` | `label-skip-and-landmarks` |
| SiteHeader | `components.md` | `shell-header-derived`, `shell-mobile-menu` |
| TeamGrid | none | `label-lists-are-lists`, `label-alt-always` |
| TokenGallery | `components.md` | showcase file, exempt from token findings |
| TrustBadges | `components.md` | `label-alt-always` |
| industries/IndustriesHero | `blocks/industries-directory.md` | `shell-safe-areas-and-hero` |
| industries/SectorRow | `blocks/industries-directory.md` | `label-lists-are-lists` |

Components with no story: `JsonLd` (no visual output) and `PostCard`. Stories with no spec: CookieBannerShowcase, FaqAccordion, PortableTextRenderer, TeamGrid. Block doc with no story: `blocks/blog-post.md` (a page template).
