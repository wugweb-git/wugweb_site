# Source map

Where each rule came from, what conflicts, and what is still open. Tool and vendor names are in `tooling.md` only.

## Source order

1. Owner decisions, with date. They win over everything.
2. Approved patterns: repeated across several sources and promoted.
3. Observations: seen once or in one source. Never a rule.



## Sources

| Source | Used for | Standing |
| --- | --- | --- |
| Owner decisions, 2026-11-16 | Scope, the media rule, pillars, answers to questions 1 to 4 and 11 | Highest |
| `brand_guidelines/` | Principles, visual modes, metaphors, components, formulas, validation | Evidence archive. Never edited by this skill. Its `README.md` and `DECISIONS.md` are marked archived (2026-08-07) |
| `kits_design_system/docs/design.md` and kits docs | Yellow, ink, logo, surface, motion and layout feel | Rules restated here; every value stays in `wugweb-kits` |
| `CLAUDE.md` | Six pillars, website, contact channel | Fixed for pillars |
| The site | One positioning line in use | In use, not chosen |
| Owner's Visual OS and Brand Strategy documents | Not yet supplied | Waiting |

## Where each file comes from

| File | Main source | Strength |
| --- | --- | --- |
| `identity-and-positioning.md` | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md`, `CLAUDE.md`, the site | Thin; the line itself is not approved |
| `brand-strategy.md` | Method only | No Wugweb source yet |
| `values-and-principles.md` | `01_FOUNDATION/PHILOSOPHY.md`, `PRINCIPLES.md` | Short lists; values not approved |
| `audience.md` | Method only | No Wugweb source yet |
| `messaging.md` | `03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md`, `01_BRAND_STORY.md`, `02_VISUAL_SYSTEM/09_NARRATIVE_SYSTEMS.md` | Two or three sentences each |
| `vocabulary.md` | `01_FOUNDATION/VOCABULARY.md`, `CLAUDE.md` | Short list |
| `brand-facts.md` | `CLAUDE.md`, the site | Thin |
| `review-gates.md` | `02_VISUAL_SYSTEM/20_DESIGN_CHECKLIST.md`, `09_VALIDATION/` | One paragraph each |
| `visual-os/art-direction.md` | `02_VISUAL_SYSTEM/` files 01, 02, 06, 07, 08, 12, 13, 21; `DECISIONS.md` | Modes and decisions are the fullest sources |
| `visual-os/colour-type-photo-motion.md` | `02_VISUAL_SYSTEM/` files 04, 05, 15, 16; the kits docs | Colour roles are full; the rest short |
| `visual-os/metaphors.md` | `07_METAPHOR_LIBRARY/`, `VISUAL_REASONING.md`, `02_VISUAL_SYSTEM/03` and `10` | Two sentences per metaphor |
| `visual-os/objects-and-components.md` | `06_COMPONENT_LIBRARY/`, `02_VISUAL_SYSTEM/` files 11, 14, 19 | Two or three sentences each |
| `visual-os/formats-and-campaigns.md` | `08_ARTWORK_FORMULAS/`, `03_MARKETING_SYSTEM/` | The format matrix is full; each formula is one or two sentences |
| `visual-os/references-and-patterns.md` | `05_REFERENCE_LIBRARY/`, `PATTERN_REGISTRY.md`, `OBSERVATIONS.md` | Rules are clear; the library itself is nearly empty |
| `visual-os/judging-a-visual.md` | `09_VALIDATION/`, plus methods restated from helper skills | Method |

The brand rules sourced from the design system docs (yellow as a reservation, structure in brand ink, the two-tone logo, surfaces, motion and layout feel) come from `kits_design_system/docs/components.md`, `tokens/layout-shell.md` and `tokens/sizing.md`. Their values stay in `wugweb-kits`.

## Known weaknesses in the sources

- `brand_guidelines/README.md` and `DECISIONS.md` are marked archived (2026-08-07), so their status as live rules is unclear.
- Most files in `brand_guidelines/` hold one to three sentences. Several are headings with no content.
- No image files are in the repo. The nine reference images described in the guidelines are not available.
- There is no source at all for lighting, or approved and rejected examples.
- The owner's Visual OS and Brand Strategy documents have not been supplied.
- The 2023 company profile is stale and contradicts itself.

## Known conflicts

| Matter | One source says | Another says | Status |
| --- | --- | --- | --- |
| Positioning | "product and experience architecture studio" (site) | "systems-minded design partner" (guidelines) | Owner will supply a new line |
| Pillar colours | Avoid purple, green and orange (`04_COLOR_ROLES.md`) | Six pillar colours on the site and in kits | All six stand; accent stays grey. Confirmed 2026-11-17 (questions 6 and 21) |
| Brand colour | Magenta is brand energy (guidelines) | Yellow is the one brand colour (kits) | Yellow. Confirmed 2026-11-17 (question 15) |
| Background | Warm or light default (guidelines) | Black canvas (site, kits) | Black canvas everywhere. No format uses a light background until the owner names one (question 14, 2026-11-17) |
| Gradients | Banned (guidelines) | A glow per pillar on service pages | The pillar glow is an exception. Confirmed 2026-11-17 (question 16) |
| Motion | Not elastic (guidelines) | Slight bounce on nav and hover (kits) | A slight bounce is within the brand. Confirmed 2026-11-17 (question 17) |
| "Crop" | An instruction in about 15 guideline files | The owner's media rule: no file is cropped | Media rule wins. The definition lives only in the skill; the four guideline edits are dropped (question 12, 2026-11-17) |
| Content pillars | AI, Product, UX, Systems, Engineering | Six pillars | Six pillars win |
| Spelling | American in the guidelines | British English | Settled by the standing rules |
| Tiles | Sixteen by nine assumed | Seven ratios in use | Not confirmed |
| Logo rules | The guidelines hold none | Sizes are in the design system | Logo rules live here, sizes in kits. Confirmed 2026-11-17 (question 18) |

Until each "not decided" row is answered, report both sides and do not pick one. One attractive reference never becomes a rule.

## Open questions for the owner

The owner will supply every open item below, and positioning, values, audience and logo answers, in Notion (2026-11-17). When a Notion page arrives, show current to proposed and apply nothing until the owner approves.

| No. | Question | Status |
| --- | --- | --- |
| 1 | Positioning line | Answered 2026-11-17: owner picks from the lines in Notion or writes one |
| 2 | Values | Answered 2026-11-17: the 2023 five |
| 3 | Audience | Answered 2026-11-17: stays blank |
| 4 | Facts about Wugweb | Answered 2026-11-17: see `brand-facts.md`; legal name, team size, projects, markets and profiles still open |
| 5 | `brand_guidelines/` stays untouched as the archive | Confirmed 2026-11-17 |
| 6 | Purple, green and orange in artwork | Confirmed: all six pillar colours stand (see 21) |
| 7 | Who owns `04_AI_PROMPT_ENGINE` | Confirmed: Visual OS here owns it |
| 8 | Where working preferences live | Closed: in the standing rules (`standing-rules.md`) |
| 9 | "Does a lot, into one" as public wording | Answered: an idea, not public wording, until the owner picks the wording |
| 10 | Visual OS and Brand Strategy documents, nine source images | Open: none in Notion (2026-11-17); owner to name the pages if they exist |
| 11 | Where the plan is kept | Confirmed |
| 12 | Crop definition and four wording changes | Answered: definition approved and held only in the skill; the four guideline edits are dropped |
| 13 | "The client is the hero" | Confirmed |
| 14 | Light or dark background default for artwork | Answered: black canvas; no format uses light until the owner names one |
| 15 | Magenta or yellow as brand colour in artwork | Confirmed: yellow |
| 16 | Pillar glow as a gradient exception | Confirmed: allowed |
| 17 | Slight bounce in motion | Confirmed: within the brand |
| 18 | Logo rules live here, sizes in kits | Confirmed |
| 19 | Logo files, tones, exemption, clear space, minimum size, one-colour version, unused PNG | Answered 2026-11-17: see `visual-os/art-direction.md`. Mark construction and live type stay open |
| 20 | "Brand identity" as a case-study archetype with ToT as the example | Answered 2026-11-17: keep the archetype, do not name ToT (client record is under NDA); ToT fixes belong to `wugweb-work` |
| 21 | Secondary colours: kits README, code and question 6 differed | Answered 2026-11-17: all six pillar colours stand (Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple); the accent stays grey; yellow stays the one brand colour |

## Rules restated from helper skills

Read on 2026-11-16, restated in our own words so the skill works without them. The owner's rules win over anything a helper says, and no voice rule was taken.

| Lands in | What was taken |
| --- | --- |
| `identity-and-positioning.md` | Three plain sentences; four positioning questions; statement shape; three-second test; "we can own this because" |
| `brand-strategy.md` | Competitor set and capture row; two-axis map; stop, reduce, raise, add grid |
| `messaging.md` | Message order; core message with supports; objection to proof table; proof strength |
| `audience.md` | Job to be done; one to three segments; buying group; observation apart from interpretation |
| `brand-facts.md` | Provenance on every fact; proof with usage rights |
| `values-and-principles.md` | "We are, we are not"; evidence levels in words |
| `review-gates.md` | Claims check; findings with severity and a fix |
| `visual-os/` | Direction from the subject's world; one signature element; restraint; dials; fixed-axis comparison; two-second test; description frame; layout types; slide rules; chart title rule |

Methods restated from helper skills are listed with their sources in section 18 of `docs/skills/wugweb-brand-os/PLAN.md`.

Left out on purpose: defining voice, invented numbers, estimated ranges, scraping by default, generating media by default, cropping to fit, uploading to a vendor, pure white text, emoji severity marks.

## When sources disagree

List both sides, with where each is written and its date. Give a recommendation if there is a basis for one. The owner decides. Record the decision here with its date.
