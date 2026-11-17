# wugweb-brand-os: plan

> Part of the Wugweb Skill System. Plan ready 2026-11-16. First draft 0.1.0 built 2026-11-17 on a branch; not yet pushed to main and not yet reviewed by the owner. The Notion page "wugweb-brand-os" (https://app.notion.com/p/41abb710b9ab8194bb13f85540dd87aa) and this file hold the same text.

> Settled by the owner on 2026-11-16: Visual OS (art direction) stays inside this skill. Voice does not live here: Wugweb's voice and the owner's are one voice, held in `wugweb-voice`, and this skill points to it.

## Contents

1. Skill card
2. About
3. Why
4. What it does not own
5. Standard structure
6. Reference files
7. Visual OS
8. Rules already fixed
9. Rules handed to wugweb-voice
10. Handoff contract
11. Helper skills
12. Matrix row
13. Per-task tests
14. Crop wording: ruling and proposal
15. Waiting on the owner
16. Source gaps
17. Works beyond Claude
18. Extracted and absorbed
19. Approved facts about Wugweb

## 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-brand-os` |
| Type | Claude Code project skill (Agent Skill): one `SKILL.md` plus `references/`, `examples/`, `evals/`. One plain Node script, for the export. |
| Version | 0.1.0 (first draft) |
| Status | First draft 0.1.0 built 2026-11-17 in `.claude/skills/wugweb-brand-os/`: `SKILL.md` body 1,573 words by the shared method, 17 reference files, evals written but not yet run, export built (13,402 words). Committed on a branch; not yet pushed to main. Main already holds a separate copy of this folder from the app (commit 1f2f490f) that differs from the branch, so the two need reconciling before the push. Many answers are correctly "not yet approved" until the owner items in section 15 are answered. |
| Development chat | `https://claude.ai/chat/490738f9-8b97-4826-befb-a28a6a63ad7a` |
| Repo plan | `https://github.com/wugweb-git/wugweb_site/blob/main/docs/skills/wugweb-brand-os/PLAN.md` |
| Owner | Vedanshu, Wugweb |
| Lives at | `.claude/skills/wugweb-brand-os/` |
| Sources | `brand_guidelines/`, `kits_design_system/docs/design.md`, `CLAUDE.md`, owner decisions, and the owner's Visual OS and Brand Strategy documents once supplied |
| Used by | `wugweb-voice`, `wugweb-kits`, `wugweb-strategy`, `wugweb-work`, `wugweb-seo`, and any session that needs to know who Wugweb is |
| Writes to | Nothing. It returns reference answers and findings as proposals. |

## 2. About

**What it is.** The single place that says who Wugweb is and what its visuals must mean. It holds brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts about Wugweb, brand rules, and Visual OS (art direction).

**What it is not.** It is reference only. It does not author or rewrite content, and it holds no voice, content strategy, token, layout or SEO rules.

**When it triggers.** A question about Wugweb's positioning, audience, values, differentiation or messaging framework; a question about how a visual should look or whether it is on brand; a check on a claim about Wugweb; a request to change a brand rule.

| Mode | In | Out |
|---|---|---|
| Answer | A brand question | The rule, with its source file. A gap is reported as a gap. |
| Visual check | An artwork or an artwork brief | Mode chosen, banned motifs found, pass or fail, what to fix |
| Fact check | Copy that makes claims about Wugweb | Each claim marked approved, unverified or stale |
| Change | A proposed brand rule | Current to proposed, with evidence, for the owner's approval |

## 3. Why

1. Brand rules surfaced piecemeal during the case-study work. They need one home so the other skills point to it instead of copying it.
2. `brand_guidelines/` covers artwork only and is thin. It has no approved positioning, values, audience or strategy.
3. Three different positioning lines are in use (see source gaps).
4. Art direction for site, social and deck visuals had no owner once the separate social skill was closed.

## 4. What it does not own

- Voice and tone. These live once in `wugweb-voice`; brand-os points there and copies nothing.
- Content strategy: what to publish, to whom, when, and what to refresh or retire. That is `wugweb-strategy`. It builds on the positioning held here and does not redefine it.
- Tokens, components and layout (`wugweb-kits`). Brand-os says how things should look and feel; kits says how the interface is built.
- SEO rules (`wugweb-seo`).
- Producing any piece (`wugweb-work`, including its social and deck module).
- Client brands. They stay with each case study.

## 5. Standard structure

```
---
name: wugweb-brand-os
description: This skill should be used when the user asks "what is Wugweb's positioning", "who is Wugweb's audience", "what are our values", "how are we different", "what is our messaging framework", "is this artwork on brand", "how should this card, slide or cover look", "is this claim about Wugweb approved", or asks to change a brand rule. It holds Wugweb's brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts and Visual OS (art direction), and returns reference answers and check findings as proposals. It does not cover content strategy (topics, calendar, briefs: wugweb-strategy), voice and tone (wugweb-voice), or tokens and components (wugweb-kits).
version: 0.1.0
---
```

- **Body:** 1,500 to 2,000 words, imperative voice. Built: 1,573 words, with an added "What is not yet approved" section so gaps are reported, not filled. Purpose, when to use and when not, the four modes, the source order (approved decisions, then patterns, then observations), the never-do list, the pointer to `wugweb-voice`, and an index of the reference files.
- **Progressive disclosure:** the name and description are always loaded; the body loads when the skill triggers; reference files load only when a mode needs them.
- **No duplication:** a rule lives in one file only. The owner's standing rules live in `docs/skills/STANDING-RULES.md` and are not repeated here.
- **Trigger words avoided:** the bare word "strategy", and topic, calendar, brief, campaign plan, refresh and repurpose, so that `wugweb-strategy` and this skill do not fire on each other's questions.

```
.claude/skills/wugweb-brand-os/
├── SKILL.md
├── references/
│   ├── identity-and-positioning.md
│   ├── brand-strategy.md
│   ├── values-and-principles.md
│   ├── audience.md
│   ├── messaging.md
│   ├── vocabulary.md
│   ├── brand-facts.md
│   ├── review-gates.md
│   ├── source-map.md
│   ├── tooling.md
│   └── visual-os/
│       ├── art-direction.md
│       ├── colour-type-photo-motion.md
│       ├── metaphors.md
│       ├── objects-and-components.md
│       ├── formats-and-campaigns.md
│       ├── references-and-patterns.md
│       └── judging-a-visual.md
├── examples/
├── evals/
├── scripts/
│   └── build-export.mjs
└── export/
    └── wugweb-brand-os.md
```

## 6. Reference files

| File | Holds |
|---|---|
| `identity-and-positioning.md` | What Wugweb is and is not, the promise, differentiation, the six pillars as named, "does a lot, into one". The positioning line is blank until the owner chooses it. |
| `brand-strategy.md` | Brand strategy. Blank until the owner's Brand Strategy document arrives. |
| `values-and-principles.md` | The ten principles from `01_FOUNDATION`; values once approved |
| `audience.md` | Who Wugweb is for and what they already know. Blank until supplied. |
| `messaging.md` | One claim, one audience tension, one proof, one outcome. Problem to Insight to System to Outcome. The transformation pairs. |
| `vocabulary.md` | Brand terms only: the name, the descriptor, pillar names |
| `brand-facts.md` | Approved facts about Wugweb, each with source and date. Unverified facts are marked. |
| `review-gates.md` | Visual and fact check lists, the 0 to 2 scoring, source and rights labels |
| `source-map.md` | Where each rule came from, known conflicts. The helper list sits in `tooling.md`, the only file that names Claude helpers, Notion or any vendor. |
| `examples/` | Approved and rejected visuals once the owner supplies them |
| `evals/` | Test prompts for the per-task tests |

## 7. Visual OS

Visual OS is art direction: how Wugweb's visuals should look and feel across the site, social cards, carousel slides, deck slides and covers. It sits in its own folder so it can grow. Token values, components and layout stay in `wugweb-kits`. Making the pieces stays with `wugweb-work`.

| File in `references/visual-os/` | Holds |
|---|---|
| `art-direction.md` | Visual grammar, the five visual modes, the approved, banned and conditional lists, composition, collage, the definition of "crop" |
| `colour-type-photo-motion.md` | Colour roles as meaning, type as a graphic object, photography and motion character |
| `metaphors.md` | The ten metaphors and what each shape means |
| `objects-and-components.md` | The eleven artwork components (ribbons, routes, cards, devices and the rest) |
| `formats-and-campaigns.md` | The format decision matrix, the per-format formulas, social and deck art direction, campaign systems |
| `references-and-patterns.md` | Evidence rules, the pattern registry, rights labels |
| `judging-a-visual.md` | How to judge composition, colour, subject, lighting and format, and what to fix |

## 8. Rules already fixed

- A case-study cover shows a project-specific object or outcome, never a generic laptop or dashboard.
- Every asset has one claim, one audience tension, one proof, one outcome. Problem to Insight to System to Outcome.
- Six pillars, fixed: Strategy, Brand, Experience, Engineering, Growth, Operations. The older eight-service list in Notion is reference only.
- "Does a lot, into one": multi-workstream engagements are the norm.
- Yellow is an accent at 10% or less; the final call to action stays yellow.
- Text is never pure white; the live colour values must not change. Brand-os states the rule; `wugweb-kits` holds the values.
- The media rules in `docs/skills/STANDING-RULES.md` win over any brand wording (see section 14).
- Yellow is a reservation, not an emphasis level. It is the resting fill only on the one conversion action per page and on the footer banner. Other buttons may use it only on hover or tap. On a yellow surface the button inverts to dark. (Source, kits docs.)
- Structure stays in brand ink. An accent is spent on one or two things only, and a pillar colour does not paint structure. (Source, kits docs.)
- The logo lockup is two-tone, and two-tone titles mirror it. (Source, kits docs; sizes are held in kits.)
- Surfaces are a black canvas with glass panels, and corner radius is set by role. (Source, kits docs.)
- Motion feel: one spring with a slight bounce for nav and hover; load and scroll-in are a fade plus a rise; everything respects reduced motion. (Source, kits docs.)
- Layout feel: a bento never resolves into an even grid, and nothing is wider than the nav. (Source, kits docs.)
- Not confirmed: that tiles keep a sixteen by nine ratio. The layout shell doc lists seven ratios in use and says the mapping is open.
- Brand-os states these rules; `wugweb-kits` holds every value and enforces them. No token value is copied here.

## 9. Rules handed to wugweb-voice

All writing style and tone material from the wugweb-work plan moves to `wugweb-voice`, not here.

| Material | Goes to |
|---|---|
| Tone line; the voice rules (say what was built, evidence or nothing, answer first, short whole sentences, plain words, active with a named doer, credit honestly, headings are claims) | `wugweb-voice` |
| Banned word list, preferred wording, tone by form, the NTUC before and after examples | `wugweb-voice` |
| `14_COPY_GUIDELINES.md` as a source; the Sanity brand voice draft as a possible input | `wugweb-voice` |
| British English, no dashes, sentence case, never invent | The shared standing-rules file, `docs/skills/STANDING-RULES.md` |
| Case-study lengths, the 70 character heading limit, the client's own words | Stay in `wugweb-work` |
| SEO title and meta description lengths | `wugweb-seo` |

## 10. Handoff contract

| Skill | Brand-os gives | Brand-os takes | Brand-os may not |
|---|---|---|---|
| `wugweb-voice` | Identity, positioning, audience, brand terms, approved facts | Nothing; it points there for voice and tone | Hold or check voice and tone rules |
| `wugweb-kits` | How things should look and feel: Visual OS direction | Token and component facts | Set or change a token, radius, component or layout |
| `wugweb-strategy` | Positioning, audience, differentiation, messaging framework | Nothing | Decide topics, calendar or briefs |
| `wugweb-work` (with its social and deck module) | Brand rules, Visual OS direction, visual and fact check findings | Drafts and artwork briefs to check | Author or rewrite content; make media; touch client brand choices |
| `wugweb-seo` | The approved brand name, descriptor and approved facts about Wugweb, for titles and organisation markup. One way: `wugweb-seo` reads them and never rewrites them. | Nothing | Change keywords, lengths or schema |

Every output is a proposal or a finding. Nothing is written anywhere without the owner's approval. Every link reads the same on both sides.

## 11. Helper skills

| Helper | Used for |
|---|---|
| `brand-voice:discover-brand` | Finding brand material at build time |
| `brand-voice:guideline-generation` | Drafting non-voice guidelines from approved sources |
| `marketing:brand-review` | Second opinion on brand fit |
| `anthropic-skills:brand-guidelines`, `anthropic-skills:brandkit` | Read on 2026-11-16. `brand-guidelines` is Anthropic's own brand and is dropped as a helper. `brandkit` is kept only as a source of art-direction principles (see section 18). |
| `anthropic-skills:skill-creator`, `anthropic-skills:skill-development` | Building the skill and its evals |

The owner's rules win over anything a helper says. A helper that is missing or signed out is skipped and reported. Helpers are optional: every mode can be done by hand (see section 17).

## 12. Matrix row

**MATRIX ROW: wugweb-brand-os**

- **Owns:** Brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts about Wugweb, brand rules, and Visual OS: art direction for site, social and deck visuals, metaphors, reference and pattern libraries, how to judge a visual.
- **Reads (sources):** `brand_guidelines/`, `kits_design_system/docs/design.md`, `CLAUDE.md`, owner decisions, and the owner's Visual OS and Brand Strategy documents once supplied. The 2023 Notion profile is stale background only.
- **Gives to:** `wugweb-voice`, `wugweb-strategy`: positioning, audience, messaging framework, approved facts. `wugweb-kits`: how things should look and feel. `wugweb-work`: brand rules, Visual OS direction, visual and fact check findings. `wugweb-seo`: the approved brand name, descriptor and approved facts, read one way and never rewritten.
- **Takes from:** `wugweb-kits`: token and component facts. `wugweb-work`: drafts and artwork briefs to check. `wugweb-voice`: nothing copied; it points there for voice and tone. `wugweb-strategy` and `wugweb-seo`: nothing.
- **Never does:** Authors or rewrites content. Holds voice, content strategy, token, layout or SEO rules. Touches client brands or media files. Invents facts. Writes to Notion, Sanity, R2 or `brand_guidelines/`; every change is a proposal for the owner.

## 13. Per-task tests

| Task | How it is tested | Passes when |
|---|---|---|
| Triggering | 10 prompts that should trigger and 10 that should not (voice, topics and calendar, tokens, SEO, client brand) | The right skill fires each time |
| Line with `wugweb-strategy` | "Who are we for?", "How is Wugweb different from an agency?", "What should the campaign visuals look like?" against "What should we write about next month?", "Which old posts should we retire?", "Plan a campaign around the NTUC case study" | The first three fire brand-os; the last three fire `wugweb-strategy` |
| Answer | 8 brand questions | Each answer cites one reference file; a gap is reported as a gap, not filled |
| Visual check | Three briefs: one with an AI brain, one mixing two modes, one clean | The first two fail with the reason and the fix; the third passes |
| Cover rule | A case-study cover brief showing a generic laptop | Fails, naming the rule |
| Fact check | Copy citing "400+ projects" | Marked unverified until `brand-facts.md` holds an approved number |
| No duplication | Search across all skill folders in the system | Each rule text appears once; no voice rule appears in brand-os |
| No writes | End to end run | Nothing written outside chat or a draft file |
| Portability | The answer, fact check and visual check evals run twice: as the installed skill, and from the single-file export in a second tool | Both runs give the same findings |

**Status 2026-11-17.** The tests are written in `evals/evals.md` (groups A to I) and have not been run yet. The skill is not yet verified in the Claude app.

## 14. Crop wording: ruling and proposal

**Ruling (recorded).** The owner's media rules win. They are in `docs/skills/STANDING-RULES.md`, including the three readings confirmed on 2026-11-16, and are not restated here.

**The conflict.** "Crop" appears as an instruction in about 15 guideline files. Three say "decisive crop" and one says "crop boldly at edges".

**Proposal, waiting on the owner. No guideline file is edited until approved.**

One definition, added once, so the other files need no edit:

> In these guidelines, "crop" means how a subject is framed in a composition. It never means cutting an existing media file. The media rules in the standing-rules file apply.

| File | Current | Proposed |
|---|---|---|
| `08_ARTWORK_FORMULAS/Editorial_Hero.md` | "an oversized editorial anchor, a decisive crop, and one proof visual" | "an oversized editorial anchor, a decisive framing, and one proof visual" |
| `02_VISUAL_SYSTEM/13_EDITORIAL_SYSTEM.md` | "decisive crops, large type when needed" | "decisive framing, large type when needed" |
| `03_MARKETING_SYSTEM/04_SOCIAL_MEDIA.md` | "one memorable object, decisive crop, high contrast" | "one memorable object, decisive framing, high contrast" |
| `02_VISUAL_SYSTEM/02_COMPOSITION.md` | "Crop boldly at edges and retain true negative space." | "Let the anchor run off the edge of the canvas, using a mask or frame, and retain true negative space." |

Until approved, the skill carries the definition in `visual-os/art-direction.md` and the guideline files stay as they are.

## 15. Waiting on the owner

1. **Positioning line.** Which is current: "product and experience architecture studio" (site), "systems-minded design partner" (`BRAND_POSITION.md`), or another? Answered 2026-11-16: neither line. The owner will supply it; `identity-and-positioning.md` stays blank until then.
2. **Values.** The only list is from 2023. Supply current values, or approve a proposal built from the ten principles? Answered 2026-11-16: the owner will supply current values. The ten principles stay as principles.
3. **Audience.** Who is Wugweb for? No approved source exists. Answered 2026-11-16: the owner will supply it; `audience.md` stays blank until then.
4. **Facts about Wugweb.** Which numbers are approved: projects, team size, markets, founding date? Section 19 lists every fact that needs confirming, including the spelling, legal name, address, phone, email and official profiles. In progress 2026-11-16: the owner is confirming each fact in section 19. Until confirmed, every fact is unverified.
5. **`brand_guidelines/`.** Recommended: it stays untouched as the evidence archive and the skill holds the working rules.
6. **Colour conflict.** `04_COLOR_ROLES.md` says avoid purple, green and orange; the site uses all three as service colours. Which wins for artwork? The same three colours are pillar colours in the kits docs.
7. **AI prompt engine folder** (`04_AI_PROMPT_ENGINE`). Recommended: Visual OS here owns it, since it turns art direction into briefs. The alternative is the social module in `wugweb-work`.
8. **Working preferences.** How the owner reasons and gives feedback belongs in neither `wugweb-voice` nor here. Settled: they are in the section "Working with the owner" of `docs/skills/STANDING-RULES.md`.
9. **"Does a lot, into one".** Public wording, or only the idea behind it?
10. **Source documents.** The owner's Visual OS and Brand Strategy documents, and the nine source images named in the guidelines, if available.
11. **Where the plan is kept.** This Notion page and `docs/skills/wugweb-brand-os/PLAN.md` in `wugweb-git/wugweb_site`, branch main, settled by the standing rule of one Notion page per skill and one plan file in the repo. Confirmed 2026-11-16.
12. **Crop wording.** Approve the definition and the four wording changes in section 14?
13. **Messaging stance.** Accept "the client is the hero, Wugweb is the guide"? Recommended: yes. It is held by `wugweb-voice` until answered.
14. **Background.** The guidelines call warm or light backgrounds the default; the site canvas is black. Does the light default apply only to artwork, or is it out of date?
15. **Brand colour.** The guidelines treat magenta as the brand energy colour; the kits docs treat yellow as the one brand colour. Which is right for artwork?
16. **Gradients.** The guidelines ban gradient-heavy looks; the service pages use a glow per pillar. Is the glow an allowed exception?
17. **Motion.** The guidelines say motion is not elastic; the nav and hover spring has a slight bounce. Is a slight bounce within the brand?
18. **Logo rules.** The guidelines hold none. Should the two-tone rule and the logo checks live here, with sizes in kits?

## 16. Source gaps

**No approved source at all**

- Positioning (three competing lines), values, audience, brand strategy.
- Campaign systems, lighting, approved and rejected examples.
- The Master Theme PDF, a Figma or token export, rights records.
- The owner's Visual OS and Brand Strategy documents have not been supplied to any session.

**How much real content the repo sources hold**

| Source | Files | Real content |
|---|---|---|
| `01_FOUNDATION` | 4 | Short lists of 15 to 22 lines each. `BRAND_POSITION.md` is the fullest. |
| `02_VISUAL_SYSTEM` | 21 | About 1,700 words in total. Visual modes and colour roles are the fullest (about 240 words each). The other 19 are 50 to 125 words each. |
| `03_MARKETING_SYSTEM` | 16 | Two or three sentences each, including the messaging framework, copy guidelines, case studies, brand story, social media and presentations. |
| `04_AI_PROMPT_ENGINE` | 12 | 40 to 75 words each. |
| `05_REFERENCE_LIBRARY` | 17 | The source inventory is real (9 images described, about 300 words). The other 16 are 33 to 98 words each, mostly a format with no entries. |
| `06_COMPONENT_LIBRARY` | 11 | Two or three sentences each; Approved patterns, Avoid, Examples and Notes are empty. |
| `07_METAPHOR_LIBRARY` | 10 | Two sentences each; seven of nine headings are empty. |
| `08_ARTWORK_FORMULAS` | 10 | The format decision matrix is real (5 formats). The 9 formulas, including Case study cover, LinkedIn post, Instagram post and Pitch deck, are one or two sentences each with ten empty headings. |
| `09_VALIDATION` | 6 | One paragraph each, then empty headings. Source and rights is complete. |
| `10_ASSETS` | 5 | No image files. The nine images in the inventory are not in the repo. |
| `PATTERN_REGISTRY.md` | 1 | Eight pattern names, with no evidence, meaning or confidence recorded. |
| `VISUAL_REASONING.md` | 1 | Six shape meanings and one rule. |
| `REFERENCE_LIBRARY.md` | 1 | A list of 14 source names and five steps. |

**Conflicts and stale material**

- `README.md` and `DECISIONS.md` in `brand_guidelines/` are marked "completed and archived (2026-08-07)", so their status as live rules is unclear.
- Content pillars in the guidelines (AI, Product, UX, Systems, Engineering) do not match the six pillars.
- The guidelines call light backgrounds the default; the site is dark.
- The guidelines use American spelling and mark hex values as provisional; `src/styles/global.css` is the real token source.
- The About page lede is marked placeholder copy in the code and contains a dash.
- The Notion page "Wugweb Profile (Master) - 2023" is stale: "Creative UX Design Agency", "Transcending Digitally", both 200+ and 400+ projects, lorem ipsum under Story. It is used for nothing without approval.

**Not read in full while planning**

- The stored values of the Sanity brand voice draft (now a `wugweb-voice` input).
- The full Notion page of the wugweb-work plan; the repo export was read instead.

## 17. Works beyond Claude

**Rule.** The skill must give the same result in GPT, Cursor or another tool as it does in Claude.

- **Plain Markdown.** Every rule is written in plain Markdown that any model can follow. No rule depends on a Claude feature. `SKILL.md` carries the core rules on its own, because other tools may not load reference files on demand.
- **Helpers are optional.** The Claude helper skills, plugins and connectors only speed things up. Every mode (answer, visual check, fact check, change) has a by-hand procedure in the reference files.
- **Scripts.** The skill has one script, `scripts/build-export.mjs`, in plain Node with no Claude tooling. It builds the single-file export.
- **Tool and vendor wiring in one file.** `references/tooling.md` is the only file that names Claude helpers, Notion or any vendor.
- **Single-file export.** `export/wugweb-brand-os.md` holds `SKILL.md` and every reference file in one document, to paste or attach in another tool. It is rebuilt whenever a rule changes and never edited by hand.
- **Test.** The answer, fact check and visual check evals are run twice: once as the installed skill, once from the export alone in a second tool. It passes when both give the same findings.

**What works only in Claude today**

| Item | Why | Outside Claude |
|---|---|---|
| Automatic triggering from the description | The frontmatter is a Claude skill feature | The user attaches the export and asks directly |
| Loading reference files only when needed | Claude skill feature | The export loads everything at once |
| The helper skills | Claude plugins | Skipped; the by-hand procedure is used |
| Building and testing with `skill-creator` | Claude skill | The eval prompts are plain files and can be run by hand |
| Reading Notion and the repo directly | Claude connectors and tools | The owner pastes or attaches the source |
| Visual check | Needs a model that can see images | Works in any tool with image input; not in a text-only model |

## 18. Extracted and absorbed

About 50 installed skills were read on 2026-11-16, read only. Each is marked absorb (the useful rule is restated in our own words inside brand-os, so it works without that helper), optional helper, or ignore. Nothing was installed, removed, edited or run. The findings come from five reading agents; five claims were spot-checked against the files and held. For some skills only the main file was read, not its reference files. Owner rules win over anything a skill says, and no voice rule is absorbed here.

**Absorb**

| Source skill | What is taken | Lands in | Clash with owner rules (not taken) |
|---|---|---|---|
| `social-media-skills:brand-profile` | Positioning as three plain sentences; a point-of-view list; a proof register with usage rights | `identity-and-positioning.md`, `brand-facts.md` | Defines voice; invented example numbers |
| `marketing:competitive-brief` | Positioning statement shape (also in `copywriting-kit:landing-page-copy`: audience, current alternative, difference); positioning pitfalls; messaging health test | `identity-and-positioning.md`, `messaging.md` | Uses third-party review sites as a source |
| `copywriting-kit:copy-diagnose` | Four positioning questions (who exactly it is for, what it replaces, which category, which proven differences matter); signs positioning is broken; settle positioning before wording | `identity-and-positioning.md`, `review-gates.md` | None found; its message-order and wording layers belong to `wugweb-voice` |
| `social-media-skills:competitor-analysis` | A set of 5 to 8 competitors; one capture row each; a map of the space nobody owns | `brand-strategy.md` | Allows estimated ranges |
| `brightdata:competitive-intel` | Two-axis positioning map; a grid for what to stop, reduce, raise and add | `brand-strategy.md` | Scrapes by default; asks for market size |
| `brand` (owner's) | Messaging ladder; five-question message test; imagery outline | `messaging.md`, `visual-os/art-direction.md` | Example brand is light-themed with white text; defines voice |
| `marketing:campaign-plan` | Four-question message order; one core message with three or four supports, each with a proof | `messaging.md` | Asks for target numbers |
| `social-media-skills:social-proof-and-testimonials` | A table matching each objection to a kind of proof; a ladder of proof strength | `messaging.md` | Quotes uncited statistics |
| `storytelling-and-narrative`, `profile-optimization`, `content-pillars` | The client is the hero; a three-second clarity test; the "we can own this because" test | `messaging.md`, `identity-and-positioning.md` | Uncited statistics; invented example proof |
| `social-media-skills:audience-research` | Audience by job to be done, not demographics; one to three segments, each with pains and objections; unsourced items marked "assumed" | `audience.md` | None beyond spelling |
| `design:research-synthesis`, `leadfeeder:find-my-buyer` | Observation kept apart from interpretation; "what we still do not know"; audience as a buying group of several roles | `audience.md` | Rough segment sizes; the Leadfeeder tool exposes people's names and emails |
| `brand-voice:discover-brand` (skill and agent) | Source tiers; newer wins unless the older is the official guide; provenance on every fact | `brand-facts.md`, `source-map.md` | It recommends which source to adopt; the owner decides |
| `brand-voice:guideline-generation` | "We are, we are not" table; evidence levels in words; omit empty sections | `values-and-principles.md`, `source-map.md` | A voice skill end to end; generated confidence scores |
| `marketing:brand-review` | Claims check; findings format with severity and a fix | `review-gates.md` | Treats sentence case and dashes as open choices |
| `anthropic-skills:frontend-design` | Direction taken from the subject's own world; a short written plan with one signature element; boldness spent in one place | `visual-os/art-direction.md` | American spelling |
| `anthropic-skills:brandkit` | Strategy before visuals; metaphor methods; board rhythm; restraint; learn from a reference without copying it | `visual-os/art-direction.md`, `visual-os/metaphors.md` | Invents logos and taglines; suggests image crops |
| `design-taste-frontend`, `website-design:web-design-system` | A one-line design read; three dials for variance, motion and density; comparing 3 to 5 references on fixed axes | `visual-os/art-direction.md`, `visual-os/references-and-patterns.md` | Says to use an image generator first |
| `design:design-critique`, `website-design:web-review` | Two-second test; judge the rendered result; must fix, should fix, nice to have; taste kept apart from real problems | `visual-os/judging-a-visual.md` | Emoji severity markers |
| `social-media-skills:image-prompt`, `design` (owner's) | A fixed frame for describing a visual: subject, composition, lighting, colour, style, mood. A real photo or screenshot before generated imagery. Logo checks. | `visual-os/judging-a-visual.md` | Advises a tighter crop; generates by default |
| `superdesign`, `banner-design` (owner's) | Five layout types; no text baked into images; brief before making; use the real logo file; three zones and one call to action; the list of named art-direction styles as vocabulary only, with neon and glass styles marked as banned looks | `visual-os/formats-and-campaigns.md` | Uploads to a vendor; crops to fit; compresses exports; generates by default |
| `thumbnail-design`, `design-and-templates`, `quote-cards-and-text-graphics`, `carousel-writer` | Image and title as one unit; a small family of recurring formats; each slide is a small poster; glance test at thumbnail size | `visual-os/formats-and-campaigns.md` | All-caps examples; uncited percentages; generation assumed |
| `pptx`, `slides` (owner's) | One motif repeated, with no accent stripes or underlined titles; one message per slide; pattern break at one third and two thirds; a visual check list | `visual-os/formats-and-campaigns.md` | Pure white text and white backgrounds as defaults |
| `social-media-skills:infographic-and-data-viz` | The title states the takeaway; a big stat instead of a chart for one or two numbers; source and date shown | `visual-os/formats-and-campaigns.md` | None |
| `skill-creator`, `skill-development` | Body length; one fact in one place; trigger tests; pre-release checklist | How the skill is built (sections 5 and 17) | None |

**Keep as optional helper**

| Skill | Use |
|---|---|
| `brand-voice:discover-brand` | The search across connected platforms |
| `marketing:competitive-brief`, `brightdata:competitive-intel` | Live competitor research, only on the owner's yes each time |
| `ui-ux-pro-max` (owner's) | Only its entry shape (name, mood, best for, do not use for) as a template for the pattern library |
| `skill-creator` | Its eval tooling |
| `design:user-research`, `website-design:landing-page`, `pinterest-pin-design` | A line or two each; too thin to absorb |

**Ignore**

| Skill | Why |
|---|---|
| `anthropic-skills:brand-guidelines` | It is Anthropic's own brand |
| `theme-factory` | Preset palettes that clash with fixed Wugweb colours |
| `aeo-brand-scan`, `hcti-open-graph-images`, `rampstack-seo:seo-competitor`, `searchfit-seo` competitor-analyzer | SEO work; passed to `wugweb-seo` |
| `brightdata:brand-listening` | Scrapes by default; uses review sites as a source |
| `brightdata:design-mirror` | Do not run. It scrapes other sites and restyles the codebase to match, with a risk of copying another brand. The kits session reports its scripts turn off certificate checking (not checked here). |
| `algorithmic-art`, `canva` | Make new media by default. One test is kept from `canva`, in `visual-os/formats-and-campaigns.md`: a stranger should not be able to name the template. |
| `dataviz` | Not on disk, so not read |

Two items reported by the wugweb-seo session (contact details identical everywhere; one spelling and the official profile links) are recorded in section 19. Material found for other skills (voice rules, content plans, tokens, SEO work, platform sizes) was passed to the coordinating session and is not kept here. Editorial positioning (mission, audience, promise, distinction, from `rampstack-seo:content-strategy`) is content strategy and goes to `wugweb-strategy`.

## 19. Approved facts about Wugweb

This is what `wugweb-seo` reads from brand-os, one way, and never rewrites. Nothing in this block is approved yet. It lists what exists today and where, and marks every gap as a question for the owner. Nothing is invented.

| Fact | What exists today | Source | Status |
|---|---|---|---|
| Brand name and spelling | "Wugweb"; the 2023 profile also writes "WugWeb" | Site, `CLAUDE.md`, 2023 profile | Question for the owner: confirm one spelling |
| Legal name | Two forms on the 2023 profile: "Wug Web Service Pvt Ltd" and "WugWeb Services Pvt Ltd" | 2023 profile (stale) | Question for the owner: which is correct |
| One fixed line: what Wugweb is, for whom, what is distinct | Three competing descriptors | Site, `BRAND_POSITION.md`, 2023 profile | Blank until owner item 1 |
| Six pillars | Strategy, Brand, Experience, Engineering, Growth, Operations | `CLAUDE.md` | Fixed |
| Website | `wugweb.com` | `CLAUDE.md` | Exists |
| Phone | The WhatsApp number used in the site nav | `CLAUDE.md` | Question for the owner: is this the public phone number |
| Email | `hello@wugweb.com` | 2023 profile (stale) | Question for the owner: confirm |
| Address | One Noida address | 2023 profile (stale) | Question for the owner: confirm it is current |
| Founding date | 4 December 2020 | 2023 profile (stale) | Question for the owner: confirm |
| Team size | "5-10 people" | 2023 profile (stale) | Question for the owner: current figure |
| Projects delivered | Both "200+" and "400+" | 2023 profile (stale) | Question for the owner: approved figure, or none |
| Markets served | Several lists that differ | 2023 profile (stale) | Question for the owner: approved list |
| Official profile links | 59 Presence records in Sanity; Clutch, DesignRush and GoodFirms named in the repo | `CLAUDE.md` | Not read. Question for the owner: which profiles are official |

**Rules for using these facts** (as reported by the wugweb-seo session from its reading; the source skill files were not opened here)

- Name, address, phone and profile links are identical everywhere they appear: the site, profiles and listings.
- One spelling of the brand everywhere, with the full name at first mention.
- The one fixed line is used unchanged on the site, profiles and listings.
- The official profile links are the list `wugweb-seo` uses in organisation markup.

**Left out on purpose.** The 2023 profile also holds tax, registration and bank details. They are not brand facts and are not copied into this plan.
