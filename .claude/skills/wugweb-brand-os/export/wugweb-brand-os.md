<!-- wugweb-brand-os 0.1.0. Built by scripts/build-export.mjs. Do not edit; edit the source files. -->

# wugweb-brand-os

The single place that says who Wugweb is and what its visuals must mean. It holds brand strategy, approved facts about Wugweb, brand rules and Visual OS (art direction). It is reference only: it answers, checks and proposes. It never authors or rewrites content, and it writes nothing anywhere.

## Status: read this first

Version 0.1.0 holds the structure and every rule that has a source. Four core items are blank because the owner has not supplied them yet:

- **Positioning line:** not decided. The owner will supply it. Neither line in use is chosen.
- **Values:** not decided. The owner will supply them. The ten principles stay as principles.
- **Audience:** not decided. The owner will supply it.
- **Facts about Wugweb:** only the six pillars are approved. Every other fact is unverified.

Fourteen more questions are open; the list is in `references/source-map.md`. When an answer depends on an open item, say "not decided: the owner decides" and report what exists with its source. Never fill a gap from the 2023 profile, a helper skill, a case study or general knowledge. A gap reported as a gap is a correct answer.

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

1. Describe what is there: subject, composition, lighting, colour, style, mood.
2. Name the one visual mode. Two modes blended casually is a fail.
3. Run the check list in `references/review-gates.md`, looking as `references/visual-os/judging-a-visual.md` describes.
4. Report findings as must fix, should fix or nice to have, each with its rule, its file and the fix as current to proposed.
5. Report points that rest on an open owner question as "not decided", not as a pass or a fail.
6. Say what could not be judged, for example when only a brief was supplied.

### Fact check

In: copy that makes claims about Wugweb. Out: each claim marked approved, unverified or stale.

1. List every claim: numbers, names, dates, places, counts, descriptors, superlatives.
2. Look each up in `references/brand-facts.md`.
3. Mark it **approved** (status approved or fixed), **unverified** (not approved, or absent) or **stale** (only from a retired source such as the 2023 profile).
4. Never soften, round or replace a number. Report it and stop.
5. Claims about a client belong to the case study in `wugweb-work`.

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
- Multi-workstream engagements are the norm ("does a lot, into one"). Whether that phrase is public wording is not decided.
- Every asset has one claim, one audience tension, one proof and one outcome, in the order Problem to Insight to System to Outcome.

**Visual**

- A case-study cover shows a project-specific object or outcome, never a generic laptop or dashboard.
- One dominant anchor per composition. Pick one of the five visual modes and do not blend them.
- Robots, AI brains, neural webs, circuitry and holograms are never used, least of all as a shortcut for AI.
- Yellow is an accent at 10% or less, reserved for the one conversion action per page and the footer banner. The final call to action stays yellow.
- Structure stays in brand ink. An accent is spent on one or two things, and a pillar colour does not paint structure.
- Text is never pure white. The live colour values must not change.
- The logo lockup is two-tone, and two-tone titles mirror it. Use the real logo file.
- Surfaces are a black canvas with glass panels; corner radius is set by role.
- Motion: one spring with a slight bounce for nav and hover; load and scroll-in are a fade plus a rise; everything respects reduced motion.
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
- Turn a helper skill's advice into a rule without the owner's ruling.

---

<!-- references/audience.md -->

# Audience

**Not decided: owner.** Answered 2026-11-16: the owner will supply the audience. No approved source says who Wugweb is for. Until it arrives, answer "audience: not decided, the owner supplies it". Never infer the audience from case studies, the site or the 2023 profile.

## Slots, all empty

| Slot | Status |
| --- | --- |
| Segments (one to three) | Not decided: owner |
| The job each segment needs done | Not decided: owner |
| Pains and objections per segment | Not decided: owner |
| What they already know | Not decided: owner |
| The buying group (roles involved in one decision) | Not decided: owner |
| What we still do not know | Not decided: owner |

## Shape to use when the owner supplies it

1. Describe each segment by the job it needs done, not by demographics.
2. Keep to one to three segments. Each has pains and objections in the audience's own words where a source exists.
3. Treat the audience as a buying group of several roles, not one person.
4. Keep observation apart from interpretation: what was seen or said, then what it may mean.
5. Mark anything without a source "assumed".
6. End with "what we still do not know".

Not taken from the helpers: rough segment sizes, tools that expose people's names and emails.

---

<!-- references/brand-facts.md -->

# Brand facts

Facts about Wugweb, each with its source and status. `wugweb-seo` reads this file one way and never rewrites it.

**Nothing here is approved yet except the six pillars.** The owner began confirming these on 2026-11-16 (question 4) and has not finished. Until a row says "approved" with a date, the fact is unverified and copy that uses it fails the fact check.

| Fact | What exists today | Source | Status |
| --- | --- | --- | --- |
| Brand name and spelling | "Wugweb"; the 2023 profile also writes "WugWeb" | Site, `CLAUDE.md`, 2023 profile | Unverified. Owner to confirm one spelling |
| Legal name | Two forms: "Wug Web Service Pvt Ltd" and "WugWeb Services Pvt Ltd" | 2023 profile (stale) | Unverified. Owner to say which |
| One fixed line: what Wugweb is, for whom, what is distinct | Three competing descriptors | Site, `BRAND_POSITION.md`, 2023 profile | Blank. Owner will supply |
| Six pillars | Strategy, Brand, Experience, Engineering, Growth, Operations | `CLAUDE.md` | Approved, fixed |
| Website | `wugweb.com` | `CLAUDE.md` | Exists |
| Phone | The WhatsApp number used in the site nav | `CLAUDE.md` | Unverified. Owner to confirm it is the public number |
| Email | `hello@wugweb.com` | 2023 profile (stale) | Unverified |
| Address | One Noida address | 2023 profile (stale) | Unverified |
| Founding date | 4 December 2020 | 2023 profile (stale) | Unverified |
| Team size | "5-10 people" | 2023 profile (stale) | Unverified |
| Projects delivered | Both "200+" and "400+" | 2023 profile (stale) | Unverified. Two figures conflict |
| Markets served | Several lists that differ | 2023 profile (stale) | Unverified |
| Official profile links | 59 Presence records in Sanity; Clutch, DesignRush and GoodFirms named in the repo | `CLAUDE.md` | Not read. Owner to say which are official |

## Rules for using facts

- A fact is usable only when its status is "approved" with a date, or "fixed".
- Name, address, phone and profile links are identical everywhere they appear: the site, profiles and listings.
- One spelling of the brand everywhere, with the full name at first mention.
- The one fixed line, once supplied, is used unchanged on the site, profiles and listings.
- The official profile links are the list `wugweb-seo` uses in organisation markup.

## Provenance

- Every fact carries its source and the date it was approved.
- A newer source wins over an older one, unless the older is the owner's ruling.
- This file reports which sources exist. The owner decides which to adopt.
- Each usable proof also records its usage rights (see the labels in `review-gates.md`).

## Adding or changing a fact

Use Change mode: show current to proposed with the evidence, and wait for the owner's approval. Never approve a fact on the owner's behalf.

## Left out on purpose

The 2023 profile also holds tax, registration and bank details. They are not brand facts and are not copied here.

---

<!-- references/brand-strategy.md -->

# Brand strategy

**Not decided: owner.** Blank until the owner's Brand Strategy document arrives (question 10). Do not fill this file from helper skills, the 2023 profile or general advice.

Content strategy (topics, calendar, briefs, refresh and retire) is not here. That is `wugweb-strategy`, which builds on the positioning held in `identity-and-positioning.md`.

## Slots, all empty

| Slot | Status |
| --- | --- |
| Strategic intent | Not decided: owner |
| Competitive set (5 to 8 named competitors) | Not decided: owner |
| Space nobody owns | Not decided: owner |
| What to stop, reduce, raise and add | Not decided: owner |

## Method, for when the owner asks for a competitor read

Use only on the owner's yes, each time. Live research is optional and lives in `tooling.md`.

1. **Set.** Name 5 to 8 competitors the owner agrees.
2. **One row each.** Positioning line as they state it, audience, proof shown, visual mode. Quote their words with the page and date; never estimate their numbers.
3. **Two-axis map.** Pick two axes the owner agrees (for example "template-led to systems-led", "single service to multi-workstream"). Place each competitor from evidence only.
4. **Gap.** The area of the map nobody holds, stated as a question for the owner, never as a decision.
5. **Grid.** What Wugweb should stop, reduce, raise and add. Each cell is a proposal.

Not taken from the helpers: estimated ranges, market sizes, third-party review sites as a source, scraping by default.

---

<!-- references/identity-and-positioning.md -->

# Identity and positioning

What Wugweb is and is not, the promise, the six pillars and "does a lot, into one". Labels: **confirmed** (owner said it, with date), **source** (written in a named file, not yet ruled on by the owner), **not decided** (the owner decides).

## Positioning line

**Not decided: owner.** Answered 2026-11-16: neither line in use is chosen. The owner will supply the line. Until then, leave the line blank and never pick one.

Lines found in use, for reference only. Do not use any of them as the line:

| Line | Where | Status |
| --- | --- | --- |
| "product and experience architecture studio" | The live site | In use, not chosen |
| "systems-minded design partner" | `brand_guidelines/01_FOUNDATION/BRAND_POSITION.md` | Source, not chosen |
| "Creative UX Design Agency" | 2023 Notion profile | Stale. Never use |

When asked for the positioning line, answer "not decided: the owner supplies it" and list the lines above with their status.

## What Wugweb is (source: `BRAND_POSITION.md`)

- A design and product systems practice.
- A visual and strategic systems partner.
- A brand that makes invisible structures visible.
- It sits between business strategy, product execution and emerging AI systems.

## What Wugweb is not (source: `BRAND_POSITION.md`)

- A generic marketing agency.
- A template-led design studio.
- A decorative illustration brand.
- A futuristic AI art style.

## Core promise (source: `BRAND_POSITION.md`)

Make complexity understandable, actionable and scalable. The short form in the same file is "Designing systems that reduce complexity." Neither is confirmed as public wording.

## Six pillars (confirmed, fixed)

Strategy, Brand, Experience, Engineering, Growth, Operations. Source: `CLAUDE.md`. The older eight-service list in Notion is reference only. The content pillars in `brand_guidelines/03_MARKETING_SYSTEM/13_CONTENT_PILLARS.md` (AI, Product, UX, Systems, Engineering) do not match and are not used as pillars. Pillar colour values live in `wugweb-kits`.

## "Does a lot, into one" (confirmed as an idea)

Multi-workstream engagements are the norm: one engagement often spans several pillars. **Not decided: owner** (question 9): whether "does a lot, into one" is public wording or only the idea behind it. Until answered, do not use the phrase in visible copy.

## Differentiation

**Not decided: owner.** No approved source states how Wugweb differs from an agency or a studio. Until the owner supplies it, report the gap. The "what Wugweb is not" list above is the only written contrast.

## Method for when the owner supplies the line

Use these tests (restated from helper skills read on 2026-11-16; see `source-map.md`) to check a proposed line. They test a line; they never write one.

1. **Three plain sentences.** What Wugweb is, who it is for, what is distinct. If any sentence cannot be written, the line is not ready.
2. **Four questions.** Who exactly is it for? What does it replace? Which category does a buyer put it in? Which proven differences matter to that buyer?
3. **Statement shape.** Audience, their current alternative, the difference, the proof.
4. **Three-second test.** A stranger reading the line on the home page can say what Wugweb does.
5. **"We can own this because".** Each claimed difference finishes that sentence with a named fact from `brand-facts.md`.
6. **Settle positioning before wording.** Agree the meaning first; the wording is checked by `wugweb-voice`.

Signs the positioning is broken: three lines in use at once (today's state), a line that a competitor could use unchanged, a difference with no proof.

---

<!-- references/messaging.md -->

# Messaging framework

How a Wugweb message is built. Wording, tone and style are not here; they live in `wugweb-voice`.

## The rule (confirmed, fixed)

Every asset has one claim, one audience tension, one proof and one outcome. The order is Problem to Insight to System to Outcome. Source: `brand_guidelines/03_MARKETING_SYSTEM/02_MESSAGING_FRAMEWORK.md`. The visual expresses the claim through a tangible metaphor and the copy names it. A thumbnail is never asked to carry a whole positioning framework.

## Transformation pairs (source: `01_BRAND_STORY.md`, `09_NARRATIVE_SYSTEMS.md`)

Show a transformation, not a list of services. One pair per asset:

- Unknown to understood.
- Manual to adaptive.
- Noise to signal.
- Process to platform.
- Insight to strategy.
- Person to product to outcome.
- Complexity to clarity.
- Productivity to competitive advantage.

One artwork never explains five transformations.

## Messaging stance

**Not decided: owner** (question 13): "the client is the hero, Wugweb is the guide". Recommended: yes. Until answered, do not state it as a rule.

## Core message and supports

**Not decided: owner.** The core message depends on the positioning line, which is blank. Shape to fill when it exists: one core message with three or four supports, each support with one proof from `brand-facts.md` or a named case study.

## Tests for a message

Run these on any message brief. They return findings, never rewritten copy.

1. **One of each.** Name the claim, the tension, the proof and the outcome. Any missing or doubled item is a finding.
2. **Message order.** Does it answer, in order: what is the problem, what did we see, what system answers it, what changed?
3. **Proof match.** Each likely objection is matched to a kind of proof. Strength, weakest to strongest: our own claim, a described example, a named client, a client's own words, a measured result with its source.
4. **Three-second clarity.** A stranger can say what is being claimed.
5. **Ownable.** The claim finishes "we can own this because" with a named fact.
6. **Facts.** Every number, name and quote goes through the fact check in `review-gates.md`.

Not taken from the helpers: target numbers, uncited statistics, invented example proof.

---

<!-- references/review-gates.md -->

# Review gates

The check lists for Visual check and Fact check, the scoring, and the rights labels. Every result is a finding for the owner; nothing is edited.

## Findings format

One row per finding:

| Field | Holds |
| --- | --- |
| What | The element or the quoted claim |
| Rule | The rule it breaks and the reference file that holds it |
| Severity | Must fix, should fix, or nice to have |
| Fix | What to change, as current to proposed |

Keep taste apart from real problems. A taste note is labelled "taste" and is never a must fix. Use words for severity, not emoji.

## Visual check

Run in this order. How to look at each point is in `visual-os/judging-a-visual.md`.

1. **Mode.** Name the one visual mode. Two modes blended casually is a fail.
2. **Claim.** One claim, one tension, one proof, one outcome. The idea survives with the headline removed.
3. **Anchor.** One dominant anchor and no competing focal point.
4. **Proof.** A meaningful relationship between person, object and interface. A real photo or screenshot comes before generated imagery.
5. **Banned motifs.** Any item on the banned list in `visual-os/art-direction.md` is a fail, named.
6. **Cover rule.** A case-study cover shows a project-specific object or outcome. A generic laptop or dashboard is a fail.
7. **Colour.** Yellow at 10% or less and kept for the final call to action; text never pure white; accents limited. Points still open with the owner are reported as "not decided", not failed.
8. **Media rule.** No existing file is cropped. Resizing keeps the aspect ratio. A mask does not hide the part that proves the claim.
9. **Format.** The format's row in `visual-os/formats-and-campaigns.md` is met, and the piece reads at its final size.
10. **Rights.** Every photograph, screenshot, logo and reference has a rights label.

Result: pass or fail, the mode chosen, each finding, and what could not be judged (for example, a brief with no image).

## Scoring (source: `brand_guidelines/09_VALIDATION/Scoring.md`)

Score each of ten points from 0 to 2: concept, hierarchy, brand language, craft, differentiation, object and interface logic, palette and density, human role, accessibility, compliance. Production work needs 16 out of 20 with no zero. Revise by removing or replacing the weakest component, not by adding.

## Quality gates (source: `Quality_Gates.md`)

- **Concept:** one idea survives without the headline.
- **Composition:** one focal point and adequate negative space.
- **Brand:** palette, rounded language and collage logic are present.
- **Craft:** the interface is credible and no artefacts or text errors remain.
- **Compliance:** no banned motifs and no unsafe claims.

## Common failures (source: `Common_Mistakes.md`)

Adding cards to cover an unclear concept; showing AI as a robot or brain; reusing the same profile-card metaphor; decorative people beside an interface; filling negative space with connectors; using every colour equally; treating a generated scene as a composed collage.

## Fact check

1. List every claim about Wugweb in the copy: numbers, names, dates, places, counts, descriptors, "first", "only", "leading".
2. Look each one up in `brand-facts.md`.
3. Mark each: **approved** (status approved or fixed), **unverified** (present but not approved, or absent), or **stale** (comes only from the 2023 profile or another retired source).
4. Never soften, round or replace an unverified number. Report it.
5. Claims about a client are not checked here; they belong to the case study in `wugweb-work`.
6. Positioning claims are checked against `identity-and-positioning.md`. While the line is blank, any stated positioning line is unverified.

Signs positioning is broken, to report when seen: more than one descriptor in the same piece, a difference with no proof, a line a competitor could use unchanged.

## Rights labels (source: `06_SOURCE_AND_RIGHTS.md`)

Every reusable reference carries one label: `owned`, `licensed`, `public-reference-only`, `generated`, or `unknown: do not reuse`.

- Record the source of every photograph, screenshot, logo, external reference and generated asset.
- Confirm permission or licence for external imagery and fonts.
- No client product screen, customer data or identifiable person without approval.
- Other studios' work is principle-level inspiration only. Never copy a composition, typography, imagery or campaign asset.
- Never present generated work as a real product screenshot, a real client outcome or a real photograph.

---

<!-- references/source-map.md -->

# Source map

Where each rule came from, what conflicts, and what is still open. Tool and vendor names are in `tooling.md` only.

## Source order

1. Owner decisions, with date. They win over everything.
2. Approved patterns: repeated across several sources and promoted.
3. Observations: seen once or in one source. Never a rule.

A newer source wins over an older one unless the older is the owner's ruling. The 2023 Notion profile is stale background and is used for nothing without approval.

## Sources

| Source | Used for | Standing |
| --- | --- | --- |
| Owner decisions, 2026-11-16 | Scope, the media rule, pillars, answers to questions 1 to 4 and 11 | Highest |
| `brand_guidelines/` | Principles, visual modes, metaphors, components, formulas, validation | Evidence archive. Never edited by this skill. Its `README.md` and `DECISIONS.md` are marked archived (2026-08-07) |
| `kits_design_system/docs/design.md` and kits docs | Yellow, ink, logo, surface, motion and layout feel | Rules restated here; every value stays in `wugweb-kits` |
| `CLAUDE.md` | Six pillars, website, contact channel | Fixed for pillars |
| The site | One positioning line in use | In use, not chosen |
| 2023 Notion profile | Nothing | Stale |
| Owner's Visual OS and Brand Strategy documents | Not yet supplied | Waiting |

## Known conflicts

| Matter | One source says | Another says | Status |
| --- | --- | --- | --- |
| Positioning | "product and experience architecture studio" (site) | "systems-minded design partner" (guidelines) | Owner will supply a new line |
| Purple, green, orange | Avoid (`04_COLOR_ROLES.md`) | Pillar colours on the site and in kits | Not decided: owner (question 6) |
| Brand colour | Magenta is brand energy (guidelines) | Yellow is the one brand colour (kits) | Not decided: owner (question 15) |
| Background | Warm or light default (guidelines) | Black canvas (site, kits) | Not decided: owner (question 14) |
| Gradients | Banned (guidelines) | A glow per pillar on service pages | Not decided: owner (question 16) |
| Motion | Not elastic (guidelines) | Slight bounce on nav and hover (kits) | Not decided: owner (question 17) |
| "Crop" | An instruction in about 15 guideline files | The owner's media rule: no file is cropped | Media rule wins. Wording proposal waits (question 12) |
| Content pillars | AI, Product, UX, Systems, Engineering | Six pillars | Six pillars win |
| Spelling | American in the guidelines | British English | British wins |
| Tiles | Sixteen by nine assumed | Seven ratios in use | Not confirmed |

## Open questions for the owner

| No. | Question | Status |
| --- | --- | --- |
| 1 | Positioning line | Answered: neither. Owner will supply |
| 2 | Values | Answered: owner will supply |
| 3 | Audience | Answered: owner will supply |
| 4 | Facts about Wugweb | In progress |
| 5 | `brand_guidelines/` stays untouched as the archive | Open. Treated as untouched meanwhile |
| 6 | Purple, green and orange in artwork | Open |
| 7 | Who owns `04_AI_PROMPT_ENGINE` | Open. Not absorbed here until answered |
| 8 | Where working preferences live | Open |
| 9 | "Does a lot, into one" as public wording | Open |
| 10 | Visual OS and Brand Strategy documents, nine source images | Open |
| 11 | Where the plan is kept | Confirmed |
| 12 | Crop definition and four wording changes | Open |
| 13 | "The client is the hero" | Open |
| 14 | Light or dark background default for artwork | Open |
| 15 | Magenta or yellow as brand colour in artwork | Open |
| 16 | Pillar glow as a gradient exception | Open |
| 17 | Slight bounce in motion | Open |
| 18 | Logo rules live here, sizes in kits | Open |

## Rules restated from helper skills

Read on 2026-11-16, restated in our own words so the skill works without them. The owner's rules win over anything a helper says, and no voice rule was taken.

| Lands in | What was taken |
| --- | --- |
| `identity-and-positioning.md` | Three plain sentences; four positioning questions; statement shape; three-second test; "we can own this because" |
| `brand-strategy.md` | Competitor set and capture row; two-axis map; stop, reduce, raise, add grid |
| `messaging.md` | Message order; core message with supports; objection to proof table; proof strength |
| `audience.md` | Job to be done; one to three segments; buying group; observation apart from interpretation |
| `brand-facts.md` | Provenance on every fact; newer wins; proof with usage rights |
| `values-and-principles.md` | "We are, we are not"; evidence levels in words |
| `review-gates.md` | Claims check; findings with severity and a fix |
| `visual-os/` | Direction from the subject's world; one signature element; restraint; dials; fixed-axis comparison; two-second test; description frame; layout types; slide rules; chart title rule |

Left out on purpose: defining voice, invented numbers, estimated ranges, scraping by default, generating media by default, cropping to fit, uploading to a vendor, pure white text, emoji severity marks.

---

<!-- references/tooling.md -->

# Tooling

The only file that names Claude helpers, Notion or any vendor. Every mode can be done by hand from the other files; nothing here is required.

## Where the skill and its plan live

- Plan: the Notion page "wugweb-brand-os" under "Wugweb Skill Management System", and `docs/skills/wugweb-brand-os/PLAN.md` in `wugweb-git/wugweb_site`, branch main. If they disagree, Notion wins.
- Skill: `.claude/skills/wugweb-brand-os/`.

## Helpers

Helpers return proposals or reports only. The owner's rules win over anything a helper says. A helper that is missing or signed out is skipped and reported.

| Helper | Use | When |
| --- | --- | --- |
| `brand-voice:discover-brand` | Search connected platforms for brand material | At build time, or when the owner asks |
| `brand-voice:guideline-generation` | Draft non-voice guidelines from approved sources | Only from approved sources |
| `marketing:brand-review` | Second opinion on brand fit | Optional, after the Visual check |
| `marketing:competitive-brief`, `brightdata:competitive-intel` | Live competitor research | Only on the owner's yes, each time |
| `skill-creator`, `skill-development` | Building and testing this skill | Development only |

## Do not use

| Skill | Why |
| --- | --- |
| `anthropic-skills:brand-guidelines` | It is Anthropic's own brand |
| `theme-factory` | Preset palettes clash with fixed Wugweb colours |
| `brightdata:brand-listening` | Scrapes by default; uses review sites as a source |
| `brightdata:design-mirror` | Scrapes other sites and restyles the codebase; risk of copying another brand |
| `algorithmic-art`, `canva` | Make new media by default |

## Writes

This skill writes nothing to Notion, Sanity, R2 or `brand_guidelines/`. A Change proposal is shown in chat or saved as a draft file. Any write to Notion needs the owner's approval of the exact change, with a backup first.

## Outside Claude

Attach `export/wugweb-brand-os.md` and ask directly. Rebuild it with `node scripts/build-export.mjs` whenever a rule changes. The Visual check needs a model that can see images.

---

<!-- references/values-and-principles.md -->

# Values and principles

## Values

**Not decided: owner.** Answered 2026-11-16: the owner will supply current values. The only values list on file is from the 2023 Notion profile, which is stale and not used. Until the owner supplies them, answer "values: not decided, the owner supplies them" and never derive values from the principles below.

## Principles (source: `brand_guidelines/01_FOUNDATION/PRINCIPLES.md`)

These stay as principles, not values (owner, 2026-11-16).

1. Systems thinking.
2. Editorial storytelling.
3. Information architecture as art.
4. Clarity before decoration.
5. Metaphor before explanation.
6. Composition before ornament.
7. Human judgement before automation.
8. Simplicity before density.
9. Rounded language over sharp technical forms.
10. One dominant anchor per composition.

Working rule from the same file: if a visual element does not strengthen the story or the system, remove it.

## Philosophy (source: `brand_guidelines/01_FOUNDATION/PHILOSOPHY.md`)

- Wugweb visualises invisible systems. The goal is not decoration; it is making complexity understandable.
- Artwork should feel like a premium editorial composition assembled by an experienced brand designer, not a generic AI illustration.
- Core belief: systems are the product; clarity is the value; design is the language; storytelling is the structure.

## "We are, we are not"

| We are | We are not |
| --- | --- |
| A design and product systems practice | A generic marketing agency |
| A visual and strategic systems partner | A template-led design studio |
| Makers of invisible structures made visible | A decorative illustration brand |
| Editorial and restrained | A futuristic AI art style |

Source: `BRAND_POSITION.md`. The left column is not confirmed as public wording.

## Evidence levels

Say how strong each item is, in words: **confirmed** by the owner, **source** in a named file, **observed** across several references, **assumed**. Leave out any section with nothing in it rather than padding it.

---

<!-- references/vocabulary.md -->

# Vocabulary

Brand terms only. Banned words, preferred wording and tone are in `wugweb-voice`.

## The name

"Wugweb" is the spelling on the site and in `CLAUDE.md`. The 2023 profile also writes "WugWeb". **Not decided: owner** (question 4): confirm one spelling. Until confirmed, write "Wugweb" and flag "WugWeb" as unverified, not as wrong.

## The descriptor

**Not decided: owner.** The descriptor is the positioning line, which is blank. See `identity-and-positioning.md`.

## Pillar names (confirmed, fixed)

Strategy, Brand, Experience, Engineering, Growth, Operations. Use these six names exactly. Do not use the eight-service list or the content pillars as pillar names.

## System terms (source: `brand_guidelines/01_FOUNDATION/VOCABULARY.md`)

Words Wugweb uses internally to describe systems, visuals and strategy: transformation, architecture, signals, networks, blueprint, orchestration, decision, system, capability, structure, flow, clarity, metaphor, composition.

Usage rule from the same file: use words that describe systems and relationships, not decorative or hype-driven language. Whether these words belong in public copy is a voice matter; ask `wugweb-voice`.

## Visual OS terms

| Term | Meaning |
| --- | --- |
| Anchor | The one dominant form in a composition |
| Mode | One of the five visual modes in `visual-os/art-direction.md` |
| Proof | The person, object or real interface that makes the claim tangible |
| Crop | How a subject is framed in a composition. Never the cutting of a media file |
| Visual OS | Wugweb's art direction, held in `visual-os/` |

---

<!-- references/visual-os/art-direction.md -->

# Art direction

How Wugweb's visuals should look and feel across the site, social cards, carousel slides, deck slides and covers. Token values, components and layout are in `wugweb-kits`. Making the pieces is `wugweb-work`.

## Visual grammar (source: `02_VISUAL_SYSTEM/01_VISUAL_GRAMMAR.md`)

Meaning, then metaphor, then anchor, then proof. Start with a business transformation, turn it into a tangible metaphor, set one dominant anchor, then use people, objects and product interface as proof. The design should still say its idea with the headline removed. Nothing is filler; every shape carries meaning (see `metaphors.md`).

## Strategy before visuals

1. State the claim, tension, proof and outcome (`messaging.md`) before any visual choice.
2. Take the direction from the subject's own world: the project's real objects, screens and setting.
3. Write a short plan: the mode, the metaphor, the anchor, the proof and one signature element.
4. Spend boldness in one place. Everything else is quiet.
5. Give a one-line design read before detail: what the piece is trying to be.
6. Three dials describe intent: variance (how far from the usual layout), motion (how much movement is implied) and density (how much is on the canvas). Wugweb defaults to low density.

## The five visual modes (source: `21_VISUAL_MODES.md`)

Pick one mode before briefing. Do not blend modes casually.

| Mode | Use for | Character |
| --- | --- | --- |
| Editorial thought leadership | Blog heroes, article thumbnails, strategic ideas | One visual sentence around a dominant object or geometry anchor, generous space, little or no embedded text. A person or hand is optional |
| Campaign collage | Social campaigns, service collateral, posters, announcements | Bolder type panels, wider approved colour, device frames, photography, controlled overlap. Still one hierarchy and one metaphor |
| Product proof | A real product experience | One credible mobile, browser, map, recommendation, settings or product module as evidence. Never a canvas of fake analytics widgets |
| Systems and architecture | A process, information architecture, route or relationship | Maps, structured cards, linework, dots, grids and connectors, allowed only because they are the metaphor |
| Typographic presentation | Posters, section dividers, presentation covers, editorial social | Type is the hero. Short copy as graphic form, not body text |

Selection questions:

1. Is the claim a strategic idea, a campaign message, a product interaction, a system or a typographic statement?
2. What one piece of evidence makes the claim tangible?
3. Which mode makes that evidence most legible at the delivery format?

## Approved

- Collage-first, designer-made, editorial feel.
- One dominant anchor.
- Rounded geometry: circles, arcs, quarter-circles, pills, rounded rectangles, softly rounded cards.
- Real interface over fake widgets.
- Monochrome people, hands and objects, in active poses.
- A limited palette per artwork.
- Asymmetrical editorial balance and true negative space.
- Metaphor-led visuals.

## Banned

- Robots, android heads, AI brains, neural networks, circuit boards, holograms.
- Cyberpunk, sci-fi cities, glowing blue technology.
- A generic laptop or dashboard, most of all on a case-study cover.
- Dense dashboards, tiny analytics widgets, fake interface filler.
- Stock corporate teams, handshakes, glossy office scenes.
- Ambient node webs, connector lines as texture, icon clouds, technology-logo mosaics.
- Light bulbs, gears, rockets, shields and locks as wallpaper, graduation caps, steering wheels.
- Sharp polygons, hexagon patterns, starbursts, confetti, random blobs, paint splatter.
- Rainbow palettes, neon, unreadable text, watermarks.
- Torn-paper effects, heavy grain, random stickers.
- Neon and glass art styles as a look for artwork.

## Conditional

| Element | Allowed when |
| --- | --- |
| Visible grids, nodes, dots, connectors | The subject is a system, architecture, blueprint or network |
| A device frame | It shows an actual interaction; normally one device |
| Text inside artwork | The format allows it (see `formats-and-campaigns.md`) |
| A literal diagram | Structure itself is the subject |
| A scribble or marker line | Once, as a single human accent |
| Richer collage layers | Campaign collage mode, and every layer clarifies the same visual sentence |
| Purple, green, orange | Not decided: owner (question 6) |
| A glow or gradient | Not decided: owner (question 16) |

## Composition (source: `02_COMPOSITION.md`)

- Asymmetrical editorial balance around one large anchor taking roughly 30 to 60% of the canvas.
- Place the hero object or active monochrome person in relation to the anchor. At most three supporting objects or interface modules.
- Layer on purpose: background field, anchor, photograph or object, realistic interface, one restrained accent.
- Let the anchor run off the edge of the canvas and keep true negative space.
- Avoid centred symmetry, scattered floating components and equal weight everywhere.
- Vary the framing, hero object and placement of negative space between assets. Consistency comes from the visual language, not a repeated template.

## The definition of "crop"

In these guidelines, "crop" means how a subject is framed in a composition. An existing media file is never cropped. It is resized with its aspect ratio kept, or shown through a mask or frame. A mask must not hide the part that proves the claim.

The owner's media rule is confirmed and wins over any guideline wording. This definition, and four wording changes to the guideline files, are a proposal waiting on the owner (question 12). No guideline file is edited.

## Collage (source: `06_COLLAGE_SYSTEM.md`)

Assemble rather than illustrate: a background, one colour anchor, a monochrome person, hand or tangible object, one to three credible interface modules and one small graphic accent. Elements must interact: holding, searching, selecting, assembling, navigating or placing. Use clean cut-outs and natural overlap. Test every layer: does it clarify the same visual sentence? If not, remove it.

## Density (source: `07_VISUAL_DENSITY.md`)

Control density through hierarchy, not component count. Default: one anchor, one interaction, up to three support layers and one optional micro-accent. When work feels weak, remove the least meaningful element first. Never add grids, icons, labels, lines or cards to fill space.

## Rules restated from the kits docs (confirmed; values live in `wugweb-kits`)

- Yellow is an accent at 10% or less, and the final call to action stays yellow.
- Yellow is a reservation, not an emphasis level. It is the resting fill only on the one conversion action per page and on the footer banner. Other buttons may use it only on hover or tap. On a yellow surface the button inverts to dark.
- Structure stays in brand ink. An accent is spent on one or two things only, and a pillar colour does not paint structure.
- Text is never pure white.
- The logo lockup is two-tone, and two-tone titles mirror it.
- Surfaces are a black canvas with glass panels, and corner radius is set by role.
- A bento never resolves into an even grid, and nothing is wider than the nav.
- Not confirmed: that tiles keep a sixteen by nine ratio.

## Learning from a reference

Take the principle, never the composition. Name what the reference does (hierarchy, rhythm, restraint) and apply that. Other studios' work is `public-reference-only`.

## Logo

**Not decided: owner** (question 18): whether the two-tone rule and logo checks live here with sizes in kits. Until answered: use the real logo file, never redraw it, and never bake a generated logo into an image.

---

<!-- references/visual-os/colour-type-photo-motion.md -->

# Colour, type, photography and motion

The character of each, as meaning. No colour value, type size or timing is written here; `wugweb-kits` holds every value.

## Colour roles

### Confirmed (restated from the kits docs)

- Yellow is an accent at 10% or less and is reserved for the one conversion action and the footer banner.
- Structure stays in brand ink. An accent is spent on one or two things.
- A pillar colour marks its pillar and does not paint structure.
- Text is never pure white.
- The live colour values must not change.

### Source, not yet ruled on (`02_VISUAL_SYSTEM/04_COLOR_ROLES.md`)

| Colour | Role in artwork |
| --- | --- |
| Black | Authority and framing |
| White or warm off-white | Clarity |
| Magenta | Human and brand energy |
| Yellow | Focus and opportunity |
| Teal or cyan | Product or digital systems |
| Royal blue | Structure and trust |

Two to four accents per artwork plus neutrals. People and most photography stay monochrome so colour belongs to the brand system. The guideline marks its own colour values as provisional.

Palette behaviour by mode, from the same file:

| Mode | Palette |
| --- | --- |
| Editorial thought leadership | Neutral base plus two or three accents |
| Campaign collage | Black or light base plus three or four approved accents |
| Product proof | Neutral product interface plus one or two structural accents |
| Systems and architecture | Neutral base, one anchor colour, restrained structural blue |
| Typographic presentation | High contrast; one headline colour field may dominate |

### Not decided: owner

- **Question 6.** The guideline says avoid purple, green and orange. The site and kits use all three as pillar colours. Which wins for artwork?
- **Question 15.** The guideline treats magenta as the brand energy colour. Kits treats yellow as the one brand colour. Which is right for artwork?
- **Question 14.** The guideline calls warm or light backgrounds the default. The site canvas is black. Does the light default apply to artwork only, or is it out of date?
- **Question 16.** The guideline bans gradient-heavy looks. Service pages use a glow per pillar. Is the glow an allowed exception?

In a Visual check, report any of these as "not decided: owner" with the question number. Do not pass or fail on them.

## Type as a graphic object (source: `05_TYPOGRAPHY.md`)

- Type is an editorial graphic object: bold, clean, high-contrast sans-serif at decisive scale with generous margins.
- Type can lead posters, covers and presentation dividers. It does not rescue a hero visual that lacks a metaphor.
- In-art text is a strong phrase, a poster fragment or a purposeful card. No paragraphs, tiny labels or decorative fonts.
- Never rely on text baked into a generated image that must be read exactly.
- Typefaces, weights and sizes are in `wugweb-kits`.

## Photography (source: `15_PHOTOGRAPHY_DIRECTION.md`)

- Authentic people, hands and objects, monochrome or tightly controlled, as clean high-contrast cut-outs.
- Natural gestures that advance the metaphor: holding, pointing, searching, building, selecting, navigating, observing.
- Avoid staged smiling teams, handshakes, glossy office stock, colourful clothing that fights the palette, and faces made uncanny by generation tools.
- A real photo or screenshot comes before generated imagery.
- Existing media follows the media rule: no cropping of the file, resize with the aspect ratio kept, masks allowed.

## Lighting

**Not decided: owner.** No approved source covers lighting. Judge it only for consistency within one piece.

## Motion character

### Confirmed (restated from the kits docs)

- One spring with a slight bounce for nav and hover.
- Load and scroll-in are a fade plus a rise.
- Everything respects reduced motion.

### Source (`16_MOTION_LANGUAGE.md`)

- Imply movement with routes, broad ribbons, changing framing, sequencing and purposeful hand action.
- Motion is calm, precise and editorial; never flashy or game-like.
- Animation must clarify a narrative direction. Do not add motion to make a weak concept feel technological.

### Not decided: owner

**Question 17.** The guideline says motion is not elastic; the nav spring has a slight bounce. Is a slight bounce within the brand? Until answered, the kits behaviour stands on the site and artwork motion stays calm.

No sound on any media.

---

<!-- references/visual-os/formats-and-campaigns.md -->

# Formats and campaigns

Art direction per format. Sizes, counts, file handling and production steps are in `wugweb-work`. Layout and tokens are in `wugweb-kits`.

## Format decision matrix (source: `08_ARTWORK_FORMULAS/FORMAT_DECISION_MATRIX.md`)

| Format | Default mode | Text in the artwork | Interface allowed | Priority |
| --- | --- | --- | --- | --- |
| Article thumbnail, blog hero | Editorial thought leadership | None; the headline sits outside the image | None or one proof module | One metaphor readable at small size |
| LinkedIn static post | Campaign collage or typographic presentation | A short statement as graphic form | One credible module | Stop-scroll recognition |
| Carousel, presentation | Typographic presentation or systems and architecture | Allowed; type carries hierarchy | Only when the slide proves an interaction | Sequential clarity |
| Service page, website section | Product proof or campaign collage | Body copy belongs in the page, not the illustration | One credible product proof | Product and service relevance |
| Case study cover | Editorial or product proof | Minimal title treatment | One representative product frame | Recognition and a narrative cue |

"No text inside artwork" is not a universal rule. The format decides whether type is excluded, minimal or central.

## Per-format formulas (source: `08_ARTWORK_FORMULAS/`)

Each formula is one or two sentences in the source; the rest of its headings are empty and wait on the owner.

- **Blog hero.** One insight, one tangible metaphor, one hero object, optional monochrome interaction, zero to three supporting layers. A clear anchor and large negative space. No explanatory text in the visual.
- **Case study cover.** A distinctive project-specific object or product outcome that reflects the actual customer or business transformation. Never a generic laptop or dashboard.
- **Editorial hero.** An oversized editorial anchor, decisive framing and one proof visual. Type may share the hierarchy for a manifesto or cover; for thought-leadership thumbnails keep type outside the artwork.
- **Instagram post.** A square-safe composition with one anchor and strong framing. A carousel may sequence one metaphor across frames; do not repeat one layout or overload one card with text.
- **Landing page.** Keep one side clear for live copy. Product interface only as direct evidence of the page claim. The anchor must survive the change from desktop to mobile.
- **LinkedIn post.** Small-scale recognition: high contrast, one memorable silhouette, platform copy outside the image. Remove tiny detail that will not survive feed size.
- **Pitch deck.** The first slide is a confident editorial statement: a strong dark or light field, one anchor, minimal text. Then one-message slides in the same language, not a dense proposal template.
- **Thumbnail.** One clear subject, contrast and recognisable framing. Remove small interface, labels and thin lines. Test at final size.
- **Website section.** One text-adjacent conceptual visual per section that reinforces, not repeats, the written claim, and reads without embedded type.

## Social art direction (source: `03_MARKETING_SYSTEM/04_SOCIAL_MEDIA.md`)

- Design for recognition in two seconds: one memorable object, decisive framing, high contrast, a hierarchy that survives feed size.
- Hold a campaign together through palette, cut-out treatment, rounded geometry and type. Vary the metaphor and hero object between posts.
- Image and title work as one unit.
- Keep a small family of recurring formats, not a new layout each time.
- Each carousel slide is a small poster with one idea.
- Glance test at thumbnail size before approval.
- A stranger should not be able to name the template.

## Deck art direction (source: `08_PRESENTATIONS.md`)

- Treat slides as editorial pages. One slide answers one question.
- Use oversized type, a dark and light shift, a geometry field running off the edge, or one proof visual.
- One motif repeated through the deck. No accent stripes and no underlined titles.
- Break the pattern at about one third and two thirds of the deck.
- Diagrams only when they clarify the point.

## Charts and numbers

- The title states the takeaway.
- For one or two numbers, use a big stat, not a chart.
- Show the source and the date. A number with no source fails the fact check.

## Layout types

Five types, as vocabulary for briefs: anchor plus interaction, route, builder, signal, editorial statement. A banner or card has three zones (anchor, message, action) and one call to action.

## Making rules that art direction depends on

- Brief before making.
- No text baked into generated images.
- Use the real logo file.
- Existing media: never crop the file, never re-encode, resize only with the aspect ratio kept, masks allowed.

## Campaign systems

**Not decided: owner.** No approved source defines a campaign system (question 10). Until the owner's Visual OS document arrives, a campaign uses campaign collage mode with the social rules above, and anything beyond that is reported as a gap. Planning a campaign is `wugweb-strategy`.

## AI prompt engine

**Not decided: owner** (question 7): whether Visual OS owns `04_AI_PROMPT_ENGINE`. Not absorbed here until answered.

---

<!-- references/visual-os/judging-a-visual.md -->

# Judging a visual

How to look at an artwork or an artwork brief, and what to say. The check list and scoring are in `review-gates.md`.

## Before judging

- Judge the rendered result at its final size, not the idea of it. If only a brief is supplied, say so and judge the brief.
- Describe what is there before judging it, in a fixed frame: subject, composition, lighting, colour, style, mood.
- Keep observation apart from opinion. Taste is labelled as taste.

## The two-second test

Look for two seconds, then look away. Say what the piece was about and what the eye went to first. If neither is clear, the concept or the anchor has failed, and nothing else needs judging until that is fixed.

## What to judge

| Point | Ask | Common fix |
| --- | --- | --- |
| Concept | Does one idea survive with the headline removed? Is there one metaphor? | Restate the claim; pick one metaphor from `metaphors.md` |
| Mode | Is it clearly one of the five modes? | Choose the mode the evidence fits; drop the other mode's elements |
| Composition | One anchor at roughly 30 to 60% of the canvas? Asymmetry? Real negative space? | Remove the least meaningful element; enlarge the anchor |
| Hierarchy | Does it hold in black and white? | Reduce competing weights |
| Subject | Is the hero object or person doing something that advances the metaphor? Is it specific to the project? | Replace the generic prop with the project's own object or outcome |
| Proof | Is the interface credible and real? Real photo or screenshot before generated? | Use one real module; remove fake widgets |
| Colour | Limited accents? Yellow at 10% or less? No pure white text? | Cut accents; return structure to ink |
| Lighting | Consistent within the piece? | Match treatment across cut-outs. No approved lighting rule exists |
| Density | One anchor, one interaction, up to three supports? | Remove, do not add |
| Format | Does it meet its row in `formats-and-campaigns.md` and read at final size? | Remove small interface, labels and thin lines |
| Banned motifs | Anything on the banned list? | Remove and replace through the metaphor |
| Media rule | Was any existing file cropped or re-encoded? Does a mask hide the proof? | Resize with the ratio kept; move the mask |
| Logo | Real file, unaltered? | Use the real file |
| Rights | Is every element labelled? | Label, or remove what is unknown |

## Order of review (source: `09_VALIDATION/Review_Process.md`)

Concept first, then hierarchy in black and white, then palette, then interface plausibility, then legibility at target size. Then score.

## Reporting

- Result: pass or fail, and the mode chosen.
- Findings as must fix, should fix, nice to have, each with the rule and its file, and the fix as current to proposed.
- Points that rest on an open owner question are reported as "not decided: owner", with the question number, and do not decide the result.
- What could not be judged.
- Revise by removing or replacing the weakest component.

Never rewrite the piece, make media or change a file. The report goes to the owner or back to `wugweb-work`.

---

<!-- references/visual-os/metaphors.md -->

# Metaphors

Choose a metaphor before choosing components. Source: `brand_guidelines/07_METAPHOR_LIBRARY/` and `VISUAL_REASONING.md`. In the source, each metaphor has one guidance paragraph; its other headings are empty and are left out here.

## What each shape means

| Shape | Means |
| --- | --- |
| Circle, arc | An ecosystem, market, loop or field of attention |
| Arrow | Transformation, progress, orchestration, movement |
| Grid | Architecture, structure, systems, decision spaces |
| Card, rectangle | A product, module, capability or block of information |
| Rounded container | Calm, premium quality, human-centred design |
| Route | Movement and decision |
| A human hand | Judgement or action |
| Negative space | Clarity, hierarchy, editorial balance |

Never use a shape only because it looks nice. Every shape must carry meaning.

## The ten metaphors

| Metaphor | Use for | Show | Avoid |
| --- | --- | --- | --- |
| Construction | Architecture, capability building, personalisation | Hands assembling cards, blocks, profiles, paper modules or product parts | Hard hats, generic buildings, blueprint wallpaper |
| Creativity | Making, iteration, expressive possibility within a system | Posters, notes, printed fragments, a camera, selected colour fields, meaningful cards | Paint splatter, confetti, chaotic collage |
| Discovery | Research, insight, emerging needs, finding signal | Magnification, search, a folder, a highlighted card, a selected marker | Light bulbs, detective clichés |
| Growth | Momentum, expansion, compounding value | An upward route, a scale shift, a staircase, an expanding field | Rockets, stock-chart arrows |
| Intelligence | Informed action, recognition, recommendation, decisions | Selected signals, knowledge cards, adaptive routes, human judgement | Brains, robots, neural webs, circuitry |
| Learning | Feedback and continuous improvement | An evolving object, an annotated notebook, a loop, a before and after state, an iterative route | Graduation caps |
| Navigation | Direction, customer journey, strategic choice | A map, compass, route, marker or destination card | Steering wheels, ships, GPS dashboards |
| Orchestration | Coordinated systems, full-funnel movement, always-on operations | Routes, modular stations, sparse connected steps directed by human judgement | Dense node webs, dashboard control rooms |
| Transformation | Movement from the current state to a new operating model | A broad ribbon, a route, a changed object, a transition between fields, a hand repositioning a component | Unearned before and after arrows |
| Trust | Credibility, transparent choice, reliability | A document, a verified profile, a signature, a considered action | Shield and lock wallpaper, handshake stock photography |

Robots, brains, circuitry and holograms are never a shortcut for AI.

## Methods for finding a metaphor

1. Start from the transformation pair in `messaging.md`.
2. Ask what the audience would physically do to cause that change: search, assemble, select, navigate, place.
3. Pick the tangible object that carries that act.
4. Check it against the "avoid" column and the banned list in `art-direction.md`.
5. Vary the metaphor and hero object between posts in a series; keep the language constant.

Do not reuse the same profile-card-and-phone layout across unrelated topics because it worked once.

---

<!-- references/visual-os/objects-and-components.md -->

# Objects and components

The eleven artwork components. Source: `brand_guidelines/06_COMPONENT_LIBRARY/` and `02_VISUAL_SYSTEM/14_OBJECT_LIBRARY.md`. These are parts of an artwork, not interface components; interface components are in `wugweb-kits`. Approved patterns and examples are empty in the source and wait on the owner.

Use three to six components at once, never all of them. Each must support the narrative, keep the composition editorial and be used only when it means something.

| Component | Means | Use | Avoid |
| --- | --- | --- | --- |
| Cards | Information, capability or product state | Generous interiors, rounded corners, content that feels real. Stack only to show hierarchy | Scattered generic cards, tiny unreadable fragments |
| Devices | An actual interaction | A phone, tablet or browser frame showing search, a route, a preference, a recommendation, a profile or a selection. Credible, rounded, naturally angled, below the hero metaphor. One is normally enough | A device as the hero; a generic laptop |
| Geometry | The anchor | One oversized circle, rounded field, arc or quarter-circle. Supporting geometry is smaller and quieter | Shapes that compete with the hero |
| Maps | Discovery, journey, territory, context | Simple regions, markers or routes, paired with a human act of reading, selecting or navigating | Literal GPS or dashboard detail |
| Objects | Strategy made tangible | One hero object: compass, map, folder, notebook, puzzle, paper, report, package, magnifier, tab, camera, card or block | Prop piles; light bulbs, gears, rockets, floating technology icons |
| Photography | The human role | High-contrast monochrome cut-outs of real people, hands and objects in an active pose | Colourful corporate stock, decorative faces |
| Primitives | The base vocabulary | Person or hand, hero object, rounded card, credible interface, circle or arc, colour field, route or ribbon, one optional accent | Using the set as a checklist |
| Ribbons | Continuity, movement, transformation | Broad and rounded, leading the eye from origin to outcome, only when the story has real movement | Decorative swirls |
| Routes | Decisions or an orchestrated sequence | Few turns and destinations, a clear origin and outcome | A dense technical process map |
| Scribbles | A single human accent | One scribble, marker line or tiny dotted field | Several marks; marks hiding poor hierarchy |
| Interface modules | Proof of the concept | Plausible profiles, search, recommendations, route cards, preference chips, product cards, notifications, map panels, filters, settings blocks | Fake analytics widgets; modules as filler |

## Icons (source: `19_ICONOGRAPHY.md`)

Icons are secondary. If needed: simple rounded outlines, consistent stroke, nothing emoji-like. Prefer an object or a real interface state. No icon clouds or isolated generic symbols as the central concept.

## Choosing a hero object

Pick the one whose behaviour supports the narrative. A prop belongs only when it directly carries the idea. On a case-study cover the object or outcome is specific to the project.

---

<!-- references/visual-os/references-and-patterns.md -->

# References and patterns

How evidence becomes a rule, the pattern registry, and the reference inventory.

## Evidence rules

1. Order: owner decisions, then approved patterns, then observations.
2. A pattern is promoted only when it repeats across several sources.
3. An observation is never applied as a rule.
4. Every reference carries a rights label from `review-gates.md`.
5. A lesson that would change the system is shown to the owner as a Change proposal before it is treated as a rule.

## Pattern registry (source: `brand_guidelines/PATTERN_REGISTRY.md`)

The source lists eight names with no evidence, meaning or confidence recorded. They are kept as names; each entry waits on evidence.

| Pattern | Evidence | Confidence |
| --- | --- | --- |
| Collage-first composition | Not recorded | Not recorded |
| Designer-made editorial feel | Not recorded | Not recorded |
| Rounded geometry dominance | Not recorded | Not recorded |
| One dominant geometric anchor | Not recorded | Not recorded |
| Real interface over fake widgets | Not recorded | Not recorded |
| Limited palette per artwork | Not recorded | Not recorded |
| Asymmetrical editorial balance | Not recorded | Not recorded |
| Metaphor-led visuals | Not recorded | Not recorded |

Entry shape for a new pattern: name, mood, best for, do not use for, evidence sources, meaning, confidence, rule.

## Reference inventory (source: `05_REFERENCE_LIBRARY/16_PROJECT_SOURCE_INVENTORY.md`)

Nine images are described in the source. None of the image files is in the repo, so they cannot be checked here. They are reference evidence, not approved templates.

| Described reference | Evidence for |
| --- | --- |
| Magenta anchor, yellow path, cyan block, monochrome hand and stairs, dense connectors | The conditional systems and architecture mode; not default density |
| Design-system collateral with a primary pink and a wider named palette | Palette provenance; values to be verified in an owned source |
| Digital Strategy collateral: oversized yellow circle, browser frame, speech bubble, black type panel | Campaign collage and product proof |
| Message Architecture collateral: poster-like type, rounded black title panel | Typographic presentation |
| Social Media Marketing collateral: device frames, portraits, bold colour fields | Device proof in campaign mode |
| Voice and Tone collateral: circular image masks, large type panel | Editorial type and circular masks |
| Creative Direction collateral: framed art, magenta anchor | Curated reference collage |
| User Research collateral: large persona cards, yellow anchor | Information cards as real content |
| Brand Strategy collateral: hands, puzzle object, yellow circle, black title panel | Tangible-object metaphor and hand interaction |

## Missing evidence

No Master Theme PDF, source Figma file, approved token export, approved or rejected examples, or rights records are on file. The owner's Visual OS document has not been supplied (question 10).

## Comparing references

Compare 3 to 5 references on fixed axes: mode, anchor, palette behaviour, density, type role, human role. Record what each does, then the principle to take. Never copy a composition.

---

<!-- examples/README.md -->

# Examples

Empty. Approved and rejected visuals go here once the owner supplies them (question 10).

Each example is a short Markdown record, not a media file. Media lives in R2 only and is never copied here.

| Field | Holds |
| --- | --- |
| Name | A short name for the piece |
| Where the original lives | The R2 path or page |
| Format | From the format matrix |
| Mode | One of the five visual modes |
| Verdict | Approved or rejected, by the owner, with the date |
| Why | The rule it shows or breaks |
| Rights | One rights label |
