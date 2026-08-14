# Changelog

All notable changes to the Wugweb site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

## [Unreleased]

### Fixed
- **Owner field**: Added `none` option to `sanity/schemaTypes/ownerField.ts` (owner ∈ {vedanshu, wugweb, both, none}); reflected in `governance.md` and `CLAUDE.md`.

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
