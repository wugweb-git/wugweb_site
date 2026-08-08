# Changelog

All notable changes to the Wugweb site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

## [Unreleased]

### Added
- **Contact V2 Page (`src/pages/contact-v2.astro`)**: Introduced Driftime.com-inspired layout with interactive project enquiry flow, service pillar selector, direct reach-out sidebar, and response SLA card. Kept alongside `/contact-us` V1 internally.
- **`CHANGELOG.md`**: Initialized project changelog and updated `governance.md` with Rule 11 mandating `CHANGELOG.md` maintenance on every commit.
- **`kits_design_system/` Sync**: Mapped component specs and token updates for Contact V2, Service Media, and Blog/Work UI polish.

### Changed
- **Service Pages UI/UX Revamp**: Refactored `src/pages/services/[slug].astro` to feature a dynamic UI with glowing theme gradients, glassmorphism, micro-animations, and dynamic pillar color tokens.
- **Service Media Normalization**: Organized `public/assets/services/` into standard 6-pillar directories (`strategy/`, `brand/`, `experience/`, `growth/`, `engineering/`, `operations/`) and updated `src/lib/services-data.ts`.
- **Blog & Work UI Polish**: Refined typography, sticky table of contents, author cards, 16:9 hero video integration, and gallery layouts.

### Fixed
- Archived audit headers across documentation (`docs/`, `brand_guidelines/`, `scripts/`).
