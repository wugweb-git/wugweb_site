---
name: wugweb-brand-os
description: "Holds Wugweb's brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts about Wugweb, brand rules and Visual OS (art direction), and returns reference answers and check findings as proposals. This skill should be used when the user asks 'what is Wugweb's positioning', 'who is Wugweb's audience', 'what are our values', 'how are we different', 'what is our messaging framework', 'is this artwork on brand', 'how should this card, slide or cover look', 'is this claim about Wugweb approved', or asks to change a brand rule. Use it for any question about who Wugweb is or whether a visual or a claim about Wugweb is on brand, even when the user does not say 'brand'. It does not cover content strategy (topics, calendar, briefs: wugweb-strategy), voice and tone (wugweb-voice), or tokens and components (wugweb-kits)."
metadata:
  author: wugweb
  version: "0.1.0"
  status: "structure and sourced rules built; positioning, values, audience and facts waiting on the owner"
---

# wugweb-brand-os

The single place that says who Wugweb is and what its visuals must mean. It holds brand strategy, approved facts about Wugweb, brand rules and Visual OS (art direction). It is reference only: it answers, checks and proposes. It never authors or rewrites content, and it writes nothing anywhere.

## Status: read this first

Version 0.1.0 holds the structure and every rule that has a source. Four core items are blank because the owner has not supplied them yet:

- **Positioning line:** not decided. The owner will supply it. Neither line in use is chosen.
- **Values:** not decided. The owner will supply them. The ten principles stay as principles.
- **Audience:** not decided. The owner will supply it.
- **Facts about Wugweb:** only the six pillars are approved. Every other fact is unverified.

Four more questions are open or only partly answered (4, 10, 12, 14); the list is in `references/source-map.md`. When an answer depends on an open item, say "not decided: the owner decides" and report what exists with its source. Never fill a gap from the 2023 profile, a helper skill, a case study or general knowledge. A gap reported as a gap is a correct answer.

Read `docs/skills/STANDING-RULES.md` in the repo first. The owner's standing rules live there and are not repeated here; where this skill or a helper disagrees with that file, that file wins. Cite the reference file behind every answer. Keep observation (what is visible or written) apart from interpretation (what it means).

## When to use

- A question about Wugweb's identity, positioning, values, audience, differentiation or messaging framework.
- A question about how a visual should look, or whether an artwork or artwork brief is on brand.
- Copy that makes claims about Wugweb and needs a fact check.
- A request to add or change a brand rule or a brand fact.
- Another Wugweb skill needs the brand name, descriptor, pillars, approved facts or Visual OS direction.

## When not to use

| Matter | Owner |
| --- | --- |
| Voice, tone, wording, banned words | `wugweb-voice`. Point there; hold and check no voice rule here |
| What to publish, topics, calendar, briefs, refresh and retire | `wugweb-strategy` |
| Token values, components, layout, radius, accessibility | `wugweb-kits`. State the look and feel here; every value lives there |
| Keywords, title and description lengths, schema | `wugweb-seo` |
| Writing or producing any piece, sizes and counts per form | `wugweb-work` |
| A client's brand | Stays with that case study |

If a question could belong to two skills, say so and ask. Do not answer it from both.

## Source order

1. **Owner decisions**, with their date. They win over everything.
2. **Approved patterns**: repeated across several sources and promoted.
3. **Observations**: seen once. Never applied as a rule.

Label what is said: **confirmed** (the owner said it), **source** (written in a named file, not yet ruled on), **not decided** (the owner decides). Never present a source rule as the owner's confirmed preference. `brand_guidelines/` is the evidence archive: read it, never edit it.

## The four modes

Every output is a proposal or a finding. State which mode is running.

### Answer

In: a brand question. Out: the rule, with its label and the reference file that holds it.

1. Find the one reference file that owns the matter (see the index below).
2. Give the rule and cite that file.
3. If the item is blank, say "not decided: the owner decides", then list what exists with source and status.
4. If sources conflict, show both sides and the question number from `references/source-map.md`. Do not pick a side.

### Visual check

In: an artwork or an artwork brief. Out: the mode chosen, banned motifs found, pass or fail, and what to fix.

Judge the rendered result, never a description of it. This mode needs a model that can see images; without one, check the written brief only and say the artwork was not seen.

1. Describe what is there in a fixed frame: subject, composition, lighting and treatment, colour, type, format fit, mood.
2. Name the one visual mode. Two modes blended casually is a fail. Run the two-second test: what the eye hits first, whether that is right, and whether the one claim is clear without the headline.
3. Run the check list in `references/review-gates.md`, looking as `references/visual-os/judging-a-visual.md` describes. The banned list in `references/visual-os/art-direction.md` is a fail when met: robots, AI brains, neural webs, circuitry, holograms, dense dashboards, tiny analytics widgets, node webs as texture, icon clouds, stock teams and handshakes, clutter, and anything copied from another studio's signature work.
4. Report findings as must fix, should fix or nice to have, each with its rule, its file and the fix as current to proposed.
5. Report points that rest on an open owner question as "not decided", not as a pass or a fail.
6. Say what could not be judged, for example when only a brief was supplied. Report overall impression, what works, and the top three fixes. Keep taste apart from real problems.

### Fact check

In: copy that makes claims about Wugweb. Out: each claim marked approved, unverified or stale.

1. List every claim: numbers, names, dates, places, counts, descriptors, superlatives.
2. Look each up in `references/brand-facts.md`.
3. Mark it **approved** (status approved or fixed), **unverified** (not approved, or absent) or **stale** (only from a retired source such as the 2023 profile).
4. Never soften, round or replace a number. Report it and stop.
5. Flag superlatives without evidence, comparisons with competitors, and quotes without a named source.
6. Give the source for each mark. Do not correct the copy; hand the findings to whoever is writing it.
7. Claims about a client belong to the case study in `wugweb-work`.

### Change

In: a proposed brand rule or fact. Out: current to proposed, with evidence, for the owner's approval.

1. Name the file and the exact text that would change.
2. Show current to proposed.
3. Give the evidence and its label.
4. Check that the rule belongs here and lives nowhere else. If another skill owns it, point there.
5. Wait for the owner's approval. Apply nothing.

## Rules already fixed

These are confirmed. They hold in every mode.

**Brand**

- Six pillars, fixed: Strategy, Brand, Experience, Engineering, Growth, Operations. The older eight-service list is reference only.
- Multi-workstream engagements are the norm ("does a lot, into one"). It is an idea, not public wording, until the owner picks the wording.
- The client is the hero, Wugweb is the guide.
- Every asset has one claim, one audience tension, one proof and one outcome, in the order Problem to Insight to System to Outcome.

**Visual**

- A case-study cover shows a project-specific object or outcome, never a generic laptop or dashboard.
- One dominant anchor per composition. Pick one of the five visual modes and do not blend them.
- Robots, AI brains, neural webs, circuitry and holograms are never used, least of all as a shortcut for AI.
- Yellow is the one brand colour. It is an accent at 10% or less, reserved for the one conversion action per page and the footer banner. The final call to action stays yellow.
- Structure stays in brand ink. An accent is spent on one or two things, and a pillar colour does not paint structure.
- Text is never pure white. The live colour values must not change.
- Other buttons may use yellow only on hover or tap.
- Purple, green and orange are allowed as pillar colours, and the pillar glow is the one allowed gradient exception.
- The logo lockup is two-tone, and two-tone titles mirror it. Use the real logo file. Logo checks live here; sizes live in kits.
- Surfaces are a black canvas with glass panels, and the black canvas is also the artwork default. Light backgrounds only where the owner says. Corner radius is set by role.
- Motion: one spring with a slight bounce, which is within the brand, for nav and hover; load and scroll-in are a fade plus a rise; everything respects reduced motion.
- A bento never resolves into an even grid, and nothing is wider than the nav.

**Media**

- The media rule wins over any brand wording. An existing media file is never cropped or re-encoded. It is resized only with its aspect ratio kept, or shown through a mask or frame. A mask must not hide the part that proves the claim.
- In the guidelines, "crop" means how a subject is framed in a composition, never the cutting of a file.

This skill states these rules. `wugweb-kits` holds every value and enforces them on the interface. No token value is written in this skill.

## The five visual modes

| Mode | Use for |
| --- | --- |
| Editorial thought leadership | Blog heroes, thumbnails, strategic ideas. One visual sentence, generous space, little or no text |
| Campaign collage | Social campaigns, collateral, posters. Bolder type and colour, still one hierarchy and one metaphor |
| Product proof | A real product experience. One credible interface module as evidence |
| Systems and architecture | A process, route or relationship. Grids and connectors only because they are the metaphor |
| Typographic presentation | Posters, dividers, covers. Type is the hero |

Detail, the approved, banned and conditional lists, and composition are in `references/visual-os/art-direction.md`.

## What other skills get and give

| Skill | Gets from here | Gives | This skill may not |
| --- | --- | --- | --- |
| `wugweb-voice` | Identity, positioning, audience, brand terms, approved facts | Nothing; this skill points there for voice | Hold or check voice and tone rules |
| `wugweb-kits` | How things should look and feel | Token and component facts | Set or change a token, radius, component or layout |
| `wugweb-strategy` | Positioning, audience, differentiation, messaging framework | Nothing | Decide topics, calendar or briefs |
| `wugweb-work` | Brand rules, Visual OS direction, check findings | Drafts and artwork briefs to check | Author or rewrite content, make media, touch client brand choices |
| `wugweb-seo` | Brand name, descriptor, approved facts, read one way | Nothing | Change keywords, lengths or schema |

## Reference files

Load only the file a mode needs.

| File | Holds |
| --- | --- |
| `references/identity-and-positioning.md` | What Wugweb is and is not, the promise, pillars, positioning tests. Line blank |
| `references/brand-strategy.md` | Blank until the owner's document arrives; the method for a competitor read |
| `references/values-and-principles.md` | The ten principles, philosophy. Values blank |
| `references/audience.md` | Blank; the shape to fill |
| `references/messaging.md` | The messaging rule, transformation pairs, message tests |
| `references/vocabulary.md` | The name, pillar names, system terms |
| `references/brand-facts.md` | Every fact with source and status |
| `references/review-gates.md` | Visual and fact check lists, scoring, rights labels |
| `references/source-map.md` | Sources, conflicts, the 18 owner questions and their status |
| `references/tooling.md` | The only file that names helpers and vendors |
| `references/visual-os/art-direction.md` | Grammar, modes, approved, banned and conditional lists, composition, "crop" |
| `references/visual-os/colour-type-photo-motion.md` | Colour roles as meaning, type, photography, motion |
| `references/visual-os/metaphors.md` | Shape meanings and the ten metaphors |
| `references/visual-os/objects-and-components.md` | The eleven artwork components |
| `references/visual-os/formats-and-campaigns.md` | Format matrix, formulas, social and deck direction |
| `references/visual-os/references-and-patterns.md` | Evidence rules, pattern registry, reference inventory |
| `references/visual-os/judging-a-visual.md` | How to judge a visual and what to fix |
| `examples/` | Approved and rejected visuals, once the owner supplies them |
| `evals/evals.json` | Per-task tests |
| `scripts/build-export.mjs` | Builds and checks the single-file export |

## Works outside Claude

This file carries the status, the modes, the fixed rules and the boundaries, so it stands alone where reference files do not load. Every file is plain Markdown. Helpers are optional; each mode has a by-hand procedure above. `node scripts/build-export.mjs` writes `export/wugweb-brand-os.md`, one file to attach in another tool. The export is rebuilt when a rule changes and is never edited by hand. The Visual check needs a model that can see images.

## Never

- Invent a number, quote, fact, value, audience or positioning line, or fill a missing one.
- Pick between conflicting sources. Show both and ask.
- Hold, check or restate a voice rule, or write a token value.
- Author or rewrite content, or make, crop or re-encode media.
- Touch a client's brand.
- Edit `brand_guidelines/`.
- Write to Notion, Sanity or R2. Every change is a proposal for the owner.
- Use the 2023 company profile as truth. It is stale background.
- Turn a helper skill's advice into a rule without the owner's ruling.
