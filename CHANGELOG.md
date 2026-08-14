# Changelog

All notable changes to the Wugweb site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

## [Unreleased]

### Fixed
- **Owner field**: Added `none` option to `sanity/schemaTypes/ownerField.ts` (owner ∈ {vedanshu, wugweb, both, none}); reflected in `governance.md` and `CLAUDE.md`.
- **Studio crash: Dashboard + SEO Manager tools**: Both rendered `<StudioErrorBoundary>` without importing it, throwing `ReferenceError` on open (Dashboard is the first tool in the nav). Added the missing imports in `tools/DashboardTool.tsx` and `tools/SeoTool.tsx`.
- **SEO Manager badges always red**: `SeoTool.tsx` compared the `seoLevel()` return object directly to string literals (`level === 'good'`), which is always false — badges never reflected real score. Fixed to compare `level.severity`.
- **Unpublish/Archive unreachable from UI**: `docActions.ts` had working `unpublishDocs`/`archiveDocs` functions never wired to any bulk-action bar (contrary to the "verified live" note in `pending.md`). Wired into both `DocumentListPane.tsx` and `TablesTool.tsx`.
- **Tables/Media icon collision**: both Studio tools used the identical `▦` glyph; Media now uses `🖼`.
- **DataTable row crash**: body cells were built via `table.getRow(id).getVisibleCells()`, which throws `TypeError: rt.getVisibleCells is not a function` under the installed `@tanstack/react-table` v9 setup (row lookup isn't reliable with the minimal feature set wired here) — this crashed every table row in every content list (Content, Business, Brand & Assets, Settings panes, Tables tool). Not caught by `tsc` since it type-checks but fails at runtime. Rewrote to render cells directly from `columns` config + row data, bypassing the fragile TanStack row lookup entirely — same pattern already used for the Title column.

### Added
- **Contact Page Redesign (`src/pages/contact-us.astro`)**: Rolled out Driftime.com-inspired V2 layout & hierarchy directly to `/contact-us` (6-pillar selector grid, timeline & budget chips, responsive layout, SLA badge, direct channels). Set `/contact-v2` to 301 redirect to `/contact-us`. Enriched `/api/contact` with `timeline` handling.
- **`CHANGELOG.md`**: Initialized project changelog and updated `governance.md` with Rule 11 mandating `CHANGELOG.md` maintenance on every commit.
- **`kits_design_system/` Sync**: Mapped component specs and token updates for Contact V2, Service Media, and Blog/Work UI polish.

### Changed
- **Service Pages UI/UX Revamp**: Refactored `src/pages/services/[slug].astro` to feature a dynamic UI with glowing theme gradients, glassmorphism, micro-animations, and dynamic pillar color tokens.
- **Service Media Normalization**: Organized `public/assets/services/` into standard 6-pillar directories (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`) and updated `src/lib/services-data.ts`.
- **Blog & Work UI Polish**: Refined typography, sticky table of contents, author cards, 16:9 hero video integration, and gallery layouts.

### Fixed
- Archived audit headers across documentation (`docs/`, `brand_guidelines/`, `scripts/`).
