---
name: wugweb-brand-os
description: This skill should be used when the user asks "what is Wugweb's positioning", "who is Wugweb's audience", "what are our values", "how are we different", "what is our messaging framework", "is this artwork on brand", "how should this card, slide or cover look", "is this claim about Wugweb approved", or asks to change a brand rule. It holds Wugweb's brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts and Visual OS (art direction), and returns reference answers and check findings as proposals. It does not cover content strategy (topics, calendar, briefs: wugweb-strategy), voice and tone (wugweb-voice), or tokens and components (wugweb-kits).
version: 0.1.0
---

# wugweb-brand-os

## Purpose

Hold the single reference for who Wugweb is and what its visuals must mean. Answer brand questions, check artwork against the art direction, check claims about Wugweb against approved facts, and put proposed rule changes to the owner.

This skill is reference only. It never writes or rewrites a piece of content, never makes or edits a media file, and never writes to a content source. Every output is an answer, a finding or a proposal.

This is version 0.1.0. Several parts are waiting on the owner and are marked "not yet approved". Report those gaps as gaps. Never fill them.

## When to use and when not

Use this skill for:

- Questions about Wugweb's identity, positioning, values, audience, differentiation or messaging framework.
- Questions about how a visual should look and feel: a blog hero, case-study cover, social card, carousel slide, deck slide, thumbnail or campaign.
- A check of an artwork or an artwork brief against the brand.
- A check of any claim about Wugweb (numbers, names, dates, places, profiles).
- A request to add or change a brand rule.

Hand off instead when the question is about:

| Topic | Goes to |
|---|---|
| How to write: voice, tone, wording, banned words | `wugweb-voice` |
| What to publish, for whom, when; topics, calendar, briefs | `wugweb-strategy` |
| Tokens, components, layout, accessibility, any measured value | `wugweb-kits` |
| Keywords, titles, schema, search reports | `wugweb-seo` |
| Producing a case study, post, page, deck or social piece | `wugweb-work` |
| A client's own brand | The case study it belongs to, through `wugweb-work` |

## Rules that always apply

1. Read `docs/skills/STANDING-RULES.md` in the repo first. The owner's standing rules live there and are not repeated here. Where anything in this skill or a helper disagrees with that file, that file wins.
2. Invent nothing. A fact about Wugweb is used only when `references/brand-facts.md` marks it approved. Anything else is reported as "not yet approved by the owner".
3. Follow the source order: an approved owner decision beats a pattern, a pattern beats a single observation, and one attractive reference never becomes a rule.
4. Cite the reference file behind every answer.
5. Keep observation and interpretation apart. Say what is visible or written, then say what it means.
6. State a rule; never hold a value. Colour codes, sizes, spacing and timings live in `wugweb-kits`.
7. Hold no voice rule. Point to `wugweb-voice`.
8. Show every proposed change as current to proposed, with the reason and the evidence. Nothing becomes a rule until the owner approves it.

## Brand rules already fixed

These are settled. Apply them without asking.

- **Six pillars, in this order:** Strategy, Brand, Experience, Engineering, Growth, Operations. Older service lists are reference only.
- **Many things, one team:** multi-workstream engagements are the norm for Wugweb, not the exception.
- **One claim per asset:** every asset has one claim, one audience tension, one proof and one outcome. The story order is problem, insight, system, outcome.
- **Case-study covers:** show a project-specific object or outcome. Never a generic laptop or dashboard.
- **Yellow is a reservation, not an emphasis level.** It is the resting fill only on the one conversion action per page and on the closing call-to-action banner, and it stays at 10% or less of any page. Other buttons may use it only on hover or tap.
- **Structure stays in brand ink.** An accent is spent on one or two things only. A pillar colour never paints structure.
- **Text is never pure white.** The live colour values must not change.
- **Logo:** the lockup is two-tone, and two-tone titles mirror it. Use the real logo file, never a redrawn or recoloured mark.
- **Feel:** rounded geometry, a black canvas with glass panels on the site, calm motion that respects reduced motion, and layouts that never resolve into an even grid.

## What is not yet approved

Version 0.1.0 is a first draft. These parts are waiting on the owner, so answers about them must say so:

- The positioning line and the one fixed descriptor that other skills and search tools read.
- Values, audience and brand strategy. The owner's own documents for these have not been supplied.
- Most facts about Wugweb: the legal name, address, phone, team size, project count, markets and official profiles. Only the six pillars and the website are approved.
- Which of two conflicting rules wins for artwork: the guideline palette against the site's pillar colours, the light default background against the black canvas, and the gradient and motion rules.
- The wording of "crop" in the guideline files.

When asked about any of these, give the open question, show what exists as background labelled unapproved, and stop. Never pick a side for the owner and never fill the gap from memory or from the stale 2023 profile.

## The four modes

### Answer

1. Find the reference file that owns the topic (see the index below).
2. Give the rule in one or two sentences, then name the file.
3. If the file marks the topic "not yet approved", say so and name the open owner question. Offer what does exist as background, labelled as unapproved.
4. If the question belongs to another skill, name that skill and stop.

### Visual check

Judge the rendered result, never a description of it. This mode needs a model that can see images; without one, check the written brief only and say that the artwork itself was not seen.

1. Name the format and its job (see `references/visual-os/formats-and-campaigns.md`).
2. Name the one visual mode it uses. The five modes are editorial thought leadership, campaign collage, product proof, systems and architecture, and typographic presentation. Mixing modes casually is a finding.
3. Run the two-second test: what does the eye hit first, is that the right thing, and is the one claim clear without the headline?
4. Describe the visual in a fixed frame: subject, composition, colour, lighting and treatment, type, format fit.
5. Check the banned list: robots, AI brains, neural webs, circuitry, holograms, dense node graphs, random technology icons, tiny floating analytics widgets, dashboard-heavy compositions (unless the subject is software), gradient-heavy looks, stock corporate teams and handshakes, clutter, and anything copied from another studio's signature work.
6. Check the fixed rules above, and the media rules in the standing-rules file. Where a guideline says "crop", read it as how a subject is framed in a composition. It never means cutting an existing media file.
7. Report: overall impression, findings ranked must fix, should fix, nice to have, what works, and the top three fixes. Each finding says where, why, and a fix in the piece's own style. Keep taste apart from real problems.
8. Give a pass or fail. Scoring detail is in `references/review-gates.md`.

### Fact check

1. List every claim about Wugweb in the copy: numbers, names, dates, places, clients, awards, profiles.
2. Look each one up in `references/brand-facts.md`.
3. Mark each claim approved, not yet approved, or stale, and give the source.
4. Flag superlatives without evidence, comparisons with competitors, and quotes without a named source.
5. Do not correct the copy. Hand the findings to whoever is writing it.

### Change

1. State the proposed rule and what prompted it.
2. Gather the evidence: where it appears, how often, and whether an owner decision already covers it.
3. Check it against the fixed rules and the standing rules. If it conflicts, say so.
4. Present current to proposed, with the reason, and name the reference file it would change.
5. Wait for the owner. Do not edit `brand_guidelines/` or any reference file without approval.

## Working without helpers

Every mode above can be done by hand from this file and the reference files. Helper skills, plugins and connectors are optional and are listed only in `references/tooling.md`. A helper that is missing or signed out is skipped and reported, never a blocker. Where a helper disagrees with this skill or with the owner's rules, the helper loses.

In a tool that does not load reference files on demand, use the single-file export at `export/wugweb-brand-os.md`. It holds this file, every reference file and a copy of the standing rules in one document.

## Reference files

Read only what the question needs.

| File | Read it when |
|---|---|
| `references/identity-and-positioning.md` | Anyone asks what Wugweb is, is not, or how it differs |
| `references/brand-strategy.md` | Positioning is being compared with competitors or reviewed |
| `references/values-and-principles.md` | Values, beliefs or working principles come up |
| `references/audience.md` | Anyone asks who Wugweb is for |
| `references/messaging.md` | A message, claim or proof is being planned or checked |
| `references/vocabulary.md` | The brand name, descriptor or pillar names are being written |
| `references/brand-facts.md` | Any claim about Wugweb is being made or checked |
| `references/review-gates.md` | Running a visual check or a fact check |
| `references/source-map.md` | Asking where a rule came from or how strong its source is |
| `references/tooling.md` | Looking for an optional helper |
| `references/visual-os/art-direction.md` | Setting or checking the direction of any visual |
| `references/visual-os/colour-type-photo-motion.md` | Colour roles, type, photography or motion character |
| `references/visual-os/metaphors.md` | Choosing or checking a visual metaphor |
| `references/visual-os/objects-and-components.md` | Choosing objects, devices, cards, routes or other parts |
| `references/visual-os/formats-and-campaigns.md` | Any specific format: hero, cover, card, slide, thumbnail, campaign |
| `references/visual-os/references-and-patterns.md` | Using a reference, or promoting a pattern to a rule |
| `references/visual-os/judging-a-visual.md` | Running a visual check in full |

## Never do

- Never state a positioning line, value, audience or fact that the owner has not approved.
- Never hold or restate a voice rule, a token value or an SEO rule.
- Never write, rewrite, generate or edit content or media.
- Never write to Notion, the CMS, the media store or `brand_guidelines/`.
- Never use the 2023 company profile as truth. It is stale background.
- Never treat a helper's output as approved.
