> STATUS, 2026-11-19. Kept by the brand-os session (the coordinator handed it over on 2026-11-17). This block replaces any older status line further down. The Notion page "wugweb-brand-os" (https://app.notion.com/p/41abb710b9ab8194bb13f85540dd87aa) and this file hold the same text.
>
> - **Built.** Version 0.3.2 on main (2026-11-19, 78eb6e4). 0.3.2 carries the standing rules inside the skill: `scripts/build.mjs` writes `references/standing-rules.md`, a marked copy of `docs/skills/STANDING-RULES.md`, as `wugweb-seo`, `wugweb-voice`, `wugweb-kits` and `wugweb-work` do (`wugweb-strategy` and `wugweb-engineer` do not carry that file), so the rules load in the Claude app and the `.skill` file; no rule changed. 0.3.1 gives the colour rules one home (`visual-os/colour-type-photo-motion.md`) and the logo rules one home (the Logo section of `visual-os/art-direction.md`). `SKILL.md` body 1,999 words by the shared count (limit 2,000) after the review fixes of 2026-11-19, 18 reference files, one `evals/evals.json` with 39 cases. Same shape as the other Wugweb skills: `README.md`, `metadata.json`, a generated `AGENTS.md`, export, Cursor rule, ChatGPT instructions and Codex settings, built by `scripts/build.mjs` and checked by `scripts/test.mjs`; both pass. 0.3.0 also points to the standing rules for media instead of restating them, drops the pixel value for the logo, names a client's brand as out of scope, and records that open items are filled through use, by the owner's approval.
> - **Upload.** The Claude app has 0.3.1 installed (seen 2026-11-19). `wugweb-brand-os.skill` (0.3.2, built from main on 2026-11-19) replaces it; the owner uploads it. A full zip of the folder, `wugweb-brand-os-0.3.2.zip` (31 files, with `evals/`), was delivered the same day.
> - **Evals.** 35 runnable, three wait on owner material, one (36, triggering) waits on the app upload. Full run on 0.2.0: 32 of 36 pass. Rerun on 0.3.0 of the 11 tests this change touched: 9 pass; 6 and 22 now pass. Rerun on 0.3.1 of tests 3, 20 and 25: 3 of 3 pass. Open: 38 only (nine brand-os rules are restated in `wugweb-kits` and `wugweb-work`; their sessions own that fix). No invented facts in any run. Every grade was by a separate agent. Routing check on 0.3.1 (a stand-in for 36, run by a separate agent because the command-line run could not sign in): 20 of 20 prompts routed to the right skill, 10 brand prompts to brand-os and 10 near misses to voice, strategy, kits, work and seo. This is not the real trigger rate, which needs a run in the app.
> - **Open items are filled through use** (owner, 2026-11-19). The positioning line, audience, five facts and the Visual OS and Brand Strategy documents arrive as the skill is used, here or in another skill's session. Each comes back here as a Change proposal and is applied on the owner's yes. Other skills read these items from here and never hold them.
> - **Sources the owner approved.** The Notion page "Wugweb Profile (Master) - 2023" and what is in Notion, for this skill and for `wugweb-voice`.
>
> **Commits on main, 2026-11-17 to 19**
>
> | Commit | What |
> |---|---|
> | 9c8d0c95 | Merge of the session draft and the app copy; the eight contradiction rulings declared null; no campaign system; the other seven removed |
> | cadac03a | Eval fixes: the Intelligence metaphor and the crop definition |
> | df1e8dc2 | The export carries the standing rules; the build check fails on drift |
> | 625ccf22, b9b2cb8c | No writing-style rule held here; dangling four-role pointer dropped |
> | 877f4178 | Crop edits dropped; no format uses a light background until the owner names one |
> | 691c368d, 9e7c93bb | Open items to come from Notion; logo, archetype and secondary colour questions recorded |
> | 18138ec2 | All six pillar colours stand; accent grey |
> | f66bb666 | Notion answers for questions 4, 19 and 20 applied |
> | 40dc6e8d | This plan, pending.md and the Notion page brought up to date; on main as 5361f4e6 |
> | 64d5e11, ed89d37 | 0.2.0: skill text in line with the 2026-11-17 rulings; evals rerun |
> | ed63f4a, 1a3fa1a | 0.3.0: same shape as the other Wugweb skills; media rules as pointers; open items filled through use |
> | 3f06039 | 0.3.1: one home for the colour rules and the logo rules inside the skill |
> | 78eb6e4 | 0.3.2: the standing rules travel with the skill as a marked copy |
>
> **Owner rulings that stand (2026-11-16 and 17)**
>
> - The client is the hero, Wugweb is the guide. Yellow is the one brand colour, an accent at 10% or less. All six pillar colours stand (Strategy orange, Brand magenta, Experience teal, Engineering blue, Growth green, Operations purple); the accent stays grey; the pillar glow is the one allowed gradient exception. A slight bounce is within the brand.
> - Black canvas everywhere; no format uses a light background until the owner names one.
> - The crop definition is approved and lives only in the skill; the four edits to `brand_guidelines/` are dropped. `brand_guidelines/` stays an untouched archive (the only home of the AI prompt engine section, the nine image filenames, the asset conventions and the source citations).
> - Logo rules live here, sizes in `wugweb-kits`. "Does a lot, into one" is an idea, not public wording. Wugweb has no campaign system. The case-study cover rule stays. A fact is marked approved or not approved.
> - Facts (question 4), approved: the spelling "Wugweb"; the WhatsApp number in the site nav; `hello@wugweb.com`; WeWork Berger Delhi One, Floor 19, Sector 16B, Noida 201301, while current; founded 4 December 2020. Team size, projects and markets carry no figure until the owner gives one.
> - Values: User-Centricity, Innovation, Collaboration, Excellence, Social Impact. The ten principles stay principles.
> - Logo (question 19): `public/brand/logo-large.svg` is the lockup, `logo-small.svg` the mark; fixed tones (lockup white and grey, mark yellow and white); both exempt from the pure white and yellow rules; clear space equals the mark height; the 40px nav is the minimum size floor (values in `wugweb-kits`); black only; no one-colour version yet; the unused `public/brand/wugweb-mark.png` was deleted on 2026-11-18 (469c08f5).
> - Archetype (question 20): "brand identity" is kept without naming the client, because that client record is under NDA.
>
> **Pending**
>
> | No. | Item | Waiting on | Candidate found in Notion |
> |---|---|---|---|
> | 2 | Positioning line | Owner pick | The seven lines listed in `identity-and-positioning.md`. One more line was found in Notion and is recorded here only, not in the skill: "Wugweb is a digital experience agency where design meets engineering to shape what is next." (Content, Pages, home, 2026-10-13) |
> | 3 | Audience | Owner | None |
> | 4 | Official profile links | Owner | None |
> | 5 | Team size, projects delivered, markets | Owner figures | Conflicting 2023 values only |
> | 6 | Logo mark construction, live type in the lockup | Owner | None |
> | 7 | Visual OS and Brand Strategy documents, nine source images (question 10) | Owner names the pages if they exist | None |
> | 8 | Upload `wugweb-brand-os.skill` (0.3.2) to the Claude app; 0.3.1 is installed | Owner | |
> | 9 | Three evals blocked on owner material; one real trigger run in the app | Items 7 and 8 | |
> | 10 | `wugweb-work`: one eval prompt names a client under NDA; that client's case study has spelling, country, pasted copy and Framer link problems | The `wugweb-work` session | |

# wugweb-brand-os: plan

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
| Type | Agent Skill in the open format: one `SKILL.md` plus `references/`, `examples/`, `evals/`, two plain Node scripts (build and self-test) and the generated portable files. |
| Version | 0.3.2 |
| Status | 0.3.2 on main (2026-11-19). `SKILL.md` body 1,999 words by the shared method, 18 reference files, one `evals/evals.json` (39 cases). `scripts/build.mjs --check` and `scripts/test.mjs` pass. Upload file built; the app has 0.3.1 and the owner uploads 0.3.2. Open items are filled through use, by the owner's approval. |
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
| Fact check | Copy that makes claims about Wugweb | Each claim marked approved or not approved, with the status and source `brand-facts.md` records |
| Change | A proposed brand rule | Current to proposed, with evidence, for the owner's approval |

## 3. Why

1. Brand rules surfaced piecemeal during the case-study work. They need one home so the other skills point to it instead of copying it.
2. `brand_guidelines/` covers artwork only and is thin. It has no approved positioning, values, audience or strategy.
3. Seven different positioning lines are found, two of them in use on the site (see source gaps).
4. Art direction for site, social and deck visuals had no owner once the separate social skill was closed.

## 4. What it does not own

- Voice and tone. These live once in `wugweb-voice`; brand-os points there and copies nothing.
- Content strategy: what to publish, to whom, when, and what to refresh or retire. That is `wugweb-strategy`. It builds on the positioning held here and does not redefine it.
- Tokens, components and layout (`wugweb-kits`). Brand-os says how things should look and feel; kits says how the interface is built.
- SEO rules (`wugweb-seo`).
- Producing any piece (`wugweb-work`, including its social and deck module).
- Changes to Sanity and Notion data, schema edits, the sync scripts and backups (`wugweb-engineer`). Brand-os gives it nothing and takes nothing.
- Client brands. They stay with each case study.

## 5. Standard structure

```
---
name: wugweb-brand-os
description: "Holds Wugweb's brand strategy (identity, positioning, values, audience, differentiation, messaging framework), approved facts about Wugweb, brand rules and Visual OS (art direction), and returns reference answers and check findings as proposals. This skill should be used when the user asks 'what is Wugweb's positioning', 'who is Wugweb's audience', 'what are our values', 'how are we different', 'what is our messaging framework', 'is this artwork on brand', 'how should this card, slide or cover look', 'is this claim about Wugweb approved', or asks to change a brand rule. Use it for any question about who Wugweb is or whether a visual or a claim about Wugweb is on brand, even when the user does not say 'brand'. It does not cover content strategy (topics, calendar, briefs: wugweb-strategy), voice and tone (wugweb-voice), tokens and components (wugweb-kits), or a client's brand, which stays with its case study."
metadata:
  author: wugweb
  version: "0.3.2"
  status: "owner rulings of 2026-11-17 applied; positioning line, audience and five facts waiting on the owner"
---
```

- **Body:** 1,500 to 2,000 words, imperative voice. Built: 1,999 words, with a status section at the top so gaps are reported, not filled. Purpose, when to use and when not, the four modes, the source order (approved decisions, then patterns, then observations), the never-do list, the pointer to `wugweb-voice`, and an index of the reference files.
- **Progressive disclosure:** the name and description are always loaded; the body loads when the skill triggers; reference files load only when a mode needs them.
- **No duplication:** a rule lives in one file only. The owner's standing rules live in `docs/skills/STANDING-RULES.md`; the skill carries a generated marked copy, `references/standing-rules.md`, and the home file wins.
- **Trigger words avoided:** the bare word "strategy", and topic, calendar, brief, campaign plan, refresh and repurpose, so that `wugweb-strategy` and this skill do not fire on each other's questions.

```
.claude/skills/wugweb-brand-os/
├── SKILL.md
├── README.md
├── metadata.json
├── CHANGELOG.md
├── AGENTS.md                  (generated)
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
│   ├── standing-rules.md      (generated)
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
│   ├── build.mjs
│   └── test.mjs
├── adapters/
│   ├── cursor/wugweb-brand-os.mdc     (generated)
│   └── chatgpt/instructions.md        (generated)
├── agents/
│   └── openai.yaml                    (generated)
└── export/
    └── wugweb-brand-os.md             (generated)
```

## 6. Reference files

| File | Holds |
|---|---|
| `identity-and-positioning.md` | What Wugweb is and is not, the promise, differentiation, the six pillars as named, "does a lot, into one". The positioning line is blank until the owner chooses it. |
| `brand-strategy.md` | Brand strategy. Blank until the owner's Brand Strategy document arrives. |
| `values-and-principles.md` | The five approved values (2026-11-17) and the ten principles from `01_FOUNDATION` |
| `audience.md` | Who Wugweb is for and what they already know. Blank until supplied. |
| `messaging.md` | One claim, one audience tension, one proof, one outcome. Problem to Insight to System to Outcome. The client is the hero, Wugweb is the guide. Transformation pairs removed by the owner, 2026-11-17. |
| `vocabulary.md` | Brand terms only: the name, the descriptor, pillar names |
| `brand-facts.md` | Facts about Wugweb, each with source and status; approved rows carry the date |
| `review-gates.md` | Visual and fact check lists, the 0 to 2 scoring, source and rights labels |
| `source-map.md` | Where each rule came from, known conflicts. The helper list sits in `tooling.md`, the only reference file that names helper skills; other files name Notion only as a source. |
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
| `formats-and-campaigns.md` | The format decision matrix, the per-format formulas, social and deck art direction. Wugweb has no campaign system (owner, 2026-11-17) |
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
| `wugweb-engineer` | Nothing | Nothing | Change Sanity or Notion data, a schema or a sync script |

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
- **Reads (sources):** `brand_guidelines/`, `kits_design_system/docs/design.md`, `CLAUDE.md`, owner decisions, the Notion page "Wugweb Profile (Master) - 2023" and what is in Notion (approved sources, owner 2026-11-17), and the owner's Visual OS and Brand Strategy documents once supplied.
- **Gives to:** `wugweb-voice`, `wugweb-strategy`: positioning, audience, messaging framework, approved facts. `wugweb-kits`: how things should look and feel. `wugweb-work`: brand rules, Visual OS direction, visual and fact check findings. `wugweb-seo`: the approved brand name, descriptor and approved facts, read one way and never rewritten. `wugweb-engineer`: nothing given.
- **Takes from:** `wugweb-kits`: token and component facts. `wugweb-work`: drafts and artwork briefs to check. `wugweb-voice`: nothing copied; it points there for voice and tone. `wugweb-strategy` and `wugweb-seo`: nothing. `wugweb-engineer`: nothing taken.
- **Never does:** Authors or rewrites content. Holds voice, content strategy, token, layout or SEO rules. Touches client brands or media files. Invents facts. Writes to Notion, Sanity, R2 or `brand_guidelines/`; every change is a proposal for the owner.

## 13. Per-task tests

| Task | How it is tested | Passes when |
|---|---|---|
| Triggering | 10 prompts that should trigger and 10 that should not (voice, topics and calendar, tokens, SEO, client brand) | The right skill fires each time |
| Line with `wugweb-strategy` | "Who are we for?", "How is Wugweb different from an agency?", "What should the campaign visuals look like?" against "What should we write about next month?", "Which old posts should we retire?", "Plan a campaign around the NTUC case study" | The first three fire brand-os; the last three fire `wugweb-strategy` |
| Answer | 8 brand questions | Each answer cites one reference file; a gap is reported as a gap, not filled |
| Visual check | Three briefs: one with an AI brain, one mixing two modes, one clean | The first two fail with the reason and the fix; the third passes |
| Cover rule | A case-study cover brief showing a generic laptop | Fails, naming the rule |
| Fact check | Copy citing "400+ projects" | Marked not approved until `brand-facts.md` holds an approved number |
| No duplication | Search across all skill folders in the system | Each rule text appears once; no voice rule appears in brand-os |
| No writes | End to end run | Nothing written outside chat or a draft file |
| Portability | The answer, fact check and visual check evals run twice: as the installed skill, and from the single-file export in a second tool | Both runs give the same findings |

**Status 2026-11-19.** The tests are in `evals/evals.json` (39 cases): 35 runnable, three waiting on owner material, one (36) waiting on the app upload. Full run on 0.2.0: 32 of 36 pass. Rerun on 0.3.0 of the 11 tests the change touched: 9 pass. Rerun on 0.3.1 of tests 3, 20 and 25: 3 of 3 pass. Routing check on 0.3.1, a stand-in for 36: 20 of 20. Open: 38 (see the status block). The real trigger rate in the Claude app is not yet measured.

## 14. Crop wording: ruling and proposal

**Ruling (recorded).** The owner's media rules win. They are in `docs/skills/STANDING-RULES.md`, including the three readings confirmed on 2026-11-16, and are not restated here.

**The conflict.** "Crop" appears as an instruction in about 15 guideline files. Three say "decisive crop" and one says "crop boldly at edges".

**Ruled 2026-11-17 (question 12): the definition is approved and lives only in the skill; the four edits below are dropped and no guideline file is edited.** Kept for the record:

One definition, added once, so the other files need no edit:

> In these guidelines, "crop" means how a subject is framed in a composition. It never means cutting an existing media file. The media rules in the standing-rules file apply.

| File | Current | Proposed |
|---|---|---|
| `08_ARTWORK_FORMULAS/Editorial_Hero.md` | "an oversized editorial anchor, a decisive crop, and one proof visual" | "an oversized editorial anchor, a decisive framing, and one proof visual" |
| `02_VISUAL_SYSTEM/13_EDITORIAL_SYSTEM.md` | "decisive crops, large type when needed" | "decisive framing, large type when needed" |
| `03_MARKETING_SYSTEM/04_SOCIAL_MEDIA.md` | "one memorable object, decisive crop, high contrast" | "one memorable object, decisive framing, high contrast" |
| `02_VISUAL_SYSTEM/02_COMPOSITION.md` | "Crop boldly at edges and retain true negative space." | "Let the anchor run off the edge of the canvas, using a mask or frame, and retain true negative space." |

The skill carries the definition in `visual-os/art-direction.md`; the guideline files stay as they are.

## 15. Waiting on the owner

The open list is the Pending table in the status block at the top. Every question asked so far, with its answer:

| No. | Question | Answer |
|---|---|---|
| 1 | Positioning line | Open. The owner picks from the lines in Notion or writes one; blank until then |
| 2 | Values | 2026-11-17: User-Centricity, Innovation, Collaboration, Excellence, Social Impact |
| 3 | Audience | Open. Blank; nothing in Notion |
| 4 | Facts about Wugweb | 2026-11-17: approved in part (see section 19); team size, projects, markets and profiles open; the legal name is out of scope (owner, 2026-11-19) |
| 5 | `brand_guidelines/` | 2026-11-17: stays untouched as the archive |
| 6 | Purple, green and orange | 2026-11-17: allowed as pillar colours (see 21) |
| 7 | AI prompt engine folder | 2026-11-17: Visual OS here owns it |
| 8 | Working preferences | Settled: in `docs/skills/STANDING-RULES.md` |
| 9 | "Does a lot, into one" | 2026-11-17: an idea, not public wording |
| 10 | Visual OS and Brand Strategy documents, nine images | Open. None in Notion; the owner names the pages if they exist |
| 11 | Where the plan is kept | 2026-11-16: this page and `PLAN.md` |
| 12 | Crop wording | 2026-11-17: definition approved, held only in the skill; the four edits dropped |
| 13 | The client is the hero | 2026-11-17: yes |
| 14 | Background | 2026-11-17: black canvas; no format uses light until the owner names one |
| 15 | Brand colour in artwork | 2026-11-17: yellow |
| 16 | Pillar glow | 2026-11-17: allowed exception |
| 17 | Slight bounce | 2026-11-17: within the brand |
| 18 | Logo rules | 2026-11-17: live here, sizes in kits |
| 19 | Logo files, tones, exemption, clear space, minimum size, versions, unused PNG | 2026-11-17: approved as proposed (see the status block); mark construction and live type open |
| 20 | "Brand identity" archetype with a client under NDA | 2026-11-17: kept without naming the client (NDA) |
| 21 | Secondary colours | 2026-11-17: all six pillar colours stand; accent grey; yellow the one brand colour |

## 16. Source gaps

**No approved source at all**

- Positioning (seven competing lines), audience, brand strategy.
- Lighting, approved and rejected examples. (Wugweb has no campaign system, by ruling.)
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
- The guidelines call light backgrounds the default; ruled 2026-11-17: black canvas everywhere.
- The guidelines use American spelling and mark hex values as provisional; `src/styles/global.css` is the real token source.
- The About page lede is marked placeholder copy in the code and contains a dash.
- The Notion page "Wugweb Profile (Master) - 2023" is an approved source (owner, 2026-11-17) but holds conflicts: "Creative UX Design Agency", both 200+ and 400+ projects, three market lists, lorem ipsum under Story.

**Not read in full while planning**

- The stored values of the Sanity brand voice draft (now a `wugweb-voice` input).
- The full Notion page of the wugweb-work plan; the repo export was read instead.

## 17. Works beyond Claude

**Rule.** The skill must give the same result in GPT, Cursor or another tool as it does in Claude.

- **Plain Markdown.** Every rule is written in plain Markdown that any model can follow. No rule depends on a Claude feature. `SKILL.md` carries the core rules on its own, because other tools may not load reference files on demand.
- **Helpers are optional.** The Claude helper skills, plugins and connectors only speed things up. Every mode (answer, visual check, fact check, change) has a by-hand procedure in the reference files.
- **Scripts.** Two scripts in plain Node with no packages and no network: `scripts/build.mjs` generates `AGENTS.md`, the export, the Cursor rule, the ChatGPT instructions and the Codex settings (`--check` exits 1 when any is stale); `scripts/test.mjs` is the self-test. The same shape as the other Wugweb skills.
- **Install routes.** `README.md` gives the route for the Claude app and Claude Code, Cursor, Codex and the ChatGPT app, a custom GPT, and agents with no skill support.
- **Helper wiring in one file.** `references/tooling.md` is the only reference file that names helper skills. Other files name Notion only as a source, or as a place the skill never writes to.
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

This is what `wugweb-seo` reads from brand-os, one way, and never rewrites. The table is the one in `references/brand-facts.md`, copied as it stood on 2026-11-19; if they differ, that file wins. A fact is usable only when its status says approved or fixed.

| Fact | What exists today | Source | Status |
| --- | --- | --- | --- |
| Brand name and spelling | "Wugweb" | Site, owner | Approved 2026-11-17 |
| One fixed line: what Wugweb is, for whom, what is distinct | Seven competing lines (see `identity-and-positioning.md`) | Site, Notion 2023 to 2026 | Blank. Owner to pick or write |
| Six pillars | Strategy, Brand, Experience, Engineering, Growth, Operations | `CLAUDE.md` | Approved, fixed |
| Website | `wugweb.com` | `CLAUDE.md` | Exists |
| Phone | The WhatsApp number used in the site nav | `CLAUDE.md`, owner | Approved 2026-11-17 |
| Email | `hello@wugweb.com` | 2023 profile, owner | Approved 2026-11-17 |
| Address | WeWork Berger Delhi One, Floor 19, Sector 16B, Noida 201301 | 2023 profile, owner | Approved 2026-11-17, while it stays current |
| Founding date | 4 December 2020 | 2023 profile, owner | Approved 2026-11-17 |
| Team size | "5-10 people" (2023) against 21 names in the July 2026 team capability profile | Notion | No figure until the owner gives one |
| Projects delivered | Both "200+" and "400+" on one 2023 page | 2023 profile | No figure until the owner picks |
| Markets served | Three lists that differ | 2023 profile | No list until the owner picks |
| Official profile links | No Wugweb links in Notion; Behance and Dribbble "wugweb" named without URLs; 59 Presence records in Sanity | Notion, `CLAUDE.md` | Open. Owner to say which are official |

**Rules for using these facts** (as reported by the wugweb-seo session from its reading; the source skill files were not opened here)

- Name, address, phone and profile links are identical everywhere they appear: the site, profiles and listings.
- One spelling of the brand everywhere, with the full name at first mention.
- The one fixed line is used unchanged on the site, profiles and listings.
- The official profile links are the list `wugweb-seo` uses in organisation markup.

**Left out on purpose.** The 2023 profile also holds tax, registration and bank details. They are not brand facts and are not copied into this plan.

## Full read, 2026-11-19: the md files and what needs changing

Every file of the skill was read on 2026-11-19 from main (`4fbf334c`) by a read-only reviewer for the coordinator. Nothing in the skill folder was changed. The skill's own checks pass (`build.mjs --check` all fresh, `test.mjs` all passed). The three large generated files were checked by script, not read line by line. The list below is for the brand-os session to act on; line numbers are as of that commit.

### The md files the skill carries

| File | What it is | Kind |
| --- | --- | --- |
| `SKILL.md` | Status, four modes, fixed rules, boundaries, file index | Authored |
| `README.md` | Package table, install routes, run steps | Authored |
| `CHANGELOG.md` | History | Authored |
| `references/identity-and-positioning.md` | Is and is not, pillars, candidate lines, tests | Authored |
| `references/brand-strategy.md` | Blank slots, competitor method | Authored |
| `references/values-and-principles.md` | Five values, ten principles | Authored |
| `references/audience.md` | Blank slots, the shape to fill | Authored |
| `references/messaging.md` | Messaging rule, tests, proof | Authored |
| `references/vocabulary.md` | Name, pillar names, terms | Authored |
| `references/brand-facts.md` | Facts with source and status | Authored |
| `references/review-gates.md` | Check lists, scoring, rights labels | Authored |
| `references/source-map.md` | Sources, conflicts, the 21 questions | Authored |
| `references/tooling.md` | Helpers and vendors | Authored |
| `references/visual-os/` (7 files) | Art direction, colour and type, formats, judging a visual, metaphors, objects, references and patterns | Authored |
| `examples/README.md` | Empty record shape | Authored |
| `references/standing-rules.md` | Marked copy of the home file; matches it | Generated |
| `AGENTS.md`, `export/wugweb-brand-os.md`, `adapters/cursor/wugweb-brand-os.mdc`, `adapters/chatgpt/instructions.md` | Built by `scripts/build.mjs` | Generated |

### Needs changing in the skill

1. The NDA client is named: `references/source-map.md` line 98 (three times), carried into `AGENTS.md` and the export at line 818, and `CHANGELOG.md` line 40.
2. `wugweb-engineer` is named nowhere: `SKILL.md` lines 37 to 44 and 151 to 157, `metadata.json`, `README.md` lines 9 to 11, eval 36's near misses. The skill file body is 1,996 of 2,000 words, so adding a row needs a cut.
3. `CHANGELOG.md` line 5 implies every sibling carries a standing-rules copy; strategy and engineer do not carry that file.
4. `references/brand-facts.md` line 11 says "Five competing lines"; `identity-and-positioning.md` lists seven and at line 68 says "three lines in use".
5. `references/vocabulary.md` line 35 says the legal name has two forms; `brand-facts.md` line 10 says three.
6. `references/source-map.md` line 30 says "values not approved"; they were approved on 2026-11-17. Also stale: `values-and-principles.md` line 49, `source-map.md` lines 17 and 75.
7. `references/source-map.md` lines 79 and 81 mark questions 1 and 3 "Answered"; this plan says "Open". `SKILL.md` line 23 says only question 10 is open.
8. Light background: `references/visual-os/formats-and-campaigns.md` lines 27 and 51 still allow a light field, against `art-direction.md` line 79 and `SKILL.md` line 126.
9. `references/visual-os/colour-type-photo-motion.md`: lines 26 and 31 (magenta as brand energy; avoid purple, green, orange) sit under "not yet ruled on" but are overruled at lines 45 to 47.
10. The same file, lines 63 to 68, still holds logo rules that `CHANGELOG.md` line 15 says were removed.
11. The description frame has seven parts in `SKILL.md` line 75 and six in `judging-a-visual.md` line 11.
12. `references/messaging.md` says three seconds at line 24 and five at line 58.
13. `references/tooling.md` line 3 and `README.md` line 42 say only `tooling.md` names Notion; seven other authored files name it.
14. `README.md` lines 109 to 111 list four blank items; `SKILL.md` line 16 says two.
15. `CHANGELOG.md` line 10 says the zip has "42 files"; the folder has 31 files and 11 folders.

### Needs changing in this plan

- The NDA client is named at lines 36, 52 and 340.
- The frontmatter example (lines 132 to 137) is the old one: version 0.1.0, the old description, "1,979 words".
- "42 files" at line 4 (see item 15).
- Section 19 says it mirrors `brand-facts.md` but adds a fourth legal name the skill lacks; line 43 gives a positioning candidate that is not in `identity-and-positioning.md` and says "six other lines" where seven are listed.
- Line 50 keeps a finished item in Pending. The matrix row does not name `wugweb-engineer`.

### Worth knowing

- `scripts/build.mjs` lines 122 to 123 hardcode a short restatement of the standing rules into the ChatGPT instructions; it will not follow the home file.
- Eval 38's open finding may be out of date: a sample found restated brand rules only in the kits skill file, none in work.
- `docs/skills/AI-MODELS.md` line 36 gives this skill a key name and a vision model; the skill mentions neither.
- `references/tooling.md` names helpers under plugin names that differ from the installed ones.
- Eval 17 is marked "waiting on the owner" but needs a run in another tool; one eval expects campaign systems "reported as not defined" while `formats-and-campaigns.md` line 84 says not to report one as missing.

### Fixed 2026-11-19

Fixed 2026-11-19: skill items 1 to 15 and all five plan items. Not fixed: none. The "Worth knowing" notes were out of scope and are unchanged. Choices made: item 11 keeps the six-part frame of `judging-a-visual.md`; item 12 keeps three seconds, the rule in `identity-and-positioning.md` and the message test; item 5 adds the fourth legal name form to `brand-facts.md` from the site's terms of use page; item 13 rewords the statement, because Notion is named as a source in seven other files. `SKILL.md` body is 1,999 words; `build.mjs --check` and `test.mjs` pass. The Notion copy of this plan was not updated in this pass. Changed back the same day at the owner's word: the fourth legal name form taken from the terms of use page is removed from `brand-facts.md`, `vocabulary.md` and section 19; the facts file lists the three forms from the 2023 profile, as before.

Owner, 2026-11-19: this skill has nothing to do with the legal name of the entity. The legal name is removed from `brand-facts.md`, `vocabulary.md`, the skill file, the README and the source map, and from the Pending table and section 19 of this plan. It is not an open question for this skill.
