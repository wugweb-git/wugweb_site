# Plan: one shared voice skill (working name `wugweb-voice`)

## Context
The "digital twin" idea began as one sentence from another assistant: a standalone skill holding shared voice and behaviour references that wugweb-work and other skills read from. On 2026-11-16 the owner settled two things: Wugweb and Vedanshu are one voice (Vedanshu is the author of Wugweb), and the next step is a plan for one voice skill. Today the voice is written down in at least six places that do not agree. This skill makes one tested source that any skill or session can load.

Nothing is built yet. This plan needs the owner's approval first.

## What it is
A Claude Code Agent Skill, the same shape as the planned wugweb-work skill: one short `SKILL.md` plus `references/`, `examples/`, `evals/`.

| Field | Proposed | Owner decides |
|---|---|---|
| Name | `wugweb-voice` | Yes |
| Location | `~/.claude/skills/wugweb-voice/` (personal, so every project sees it) | Yes |
| Speaker | "We" for Wugweb, "I" for Vedanshu, one voice behind both | Yes |
| Covers | How to write and how to behave for the owner | |
| Does not cover | Case-study structure, SEO, layout (wugweb-work and wugweb-seo keep those) | |

## Files
```
wugweb-voice/
├── SKILL.md                  when to use, the always-on rules, pointers
├── references/
│   ├── voice.md              each attribute: rule, do, don't, on-voice and off-voice example
│   ├── tone-map.md           how tone shifts by form (case study, LinkedIn, email, chat, deck)
│   ├── words.md              banned words, preferred terms, spelling, no dashes
│   ├── working-rules.md      how assistants work for the owner (short, result first, ask before Notion writes)
│   ├── facts.md              sourced facts only: who Wugweb is, roles, positioning line
│   └── sources.md            ledger: every rule, its source, date, and the owner's ruling on conflicts
├── examples/                 before and after pairs taken from real text
└── evals/evals.json          test prompts with expected passes and flags
```

## Sources (all read-only)
Already read:
- Owner's pasted "Wugweb Persona and Voice" outline (grounded, plainspoken, curious, minimalist, warm; voice constant, tone map; dos and don'ts with examples).
- `docs/skills/wugweb-work/PLAN.md` section 5 (calm, exact, no selling; evidence or nothing; plain words; British English; no dashes; tone by form).
- Claude memory notes: working-style, no-dashes-visible-copy, notion-is-source-dont-author, dont-mention, client-work-content-rules.
- Notion: Vedanshu Profile (Master) 2023 and VS profile reference 2023 (first-person writing).
- Identity Prism repo `docs/layer-4-persona-module.md` (what the built persona layer measures).

To read in step 1:
- `brand_guidelines/03_MARKETING_SYSTEM/14_COPY_GUIDELINES.md`, `02_MESSAGING_FRAMEWORK.md`, `01_BRAND_STORY.md`.
- Sanity `siteSettings` Brand voice values (fields defined in `sanity/schemaTypes/siteSettings.ts` lines 158 to 189; draft from 2026-10-13).
- Any past writing the owner points to.

Not used as voice evidence: the Grok and Gemini profile pages (AI-written, unsourced numbers) and the April 2026 PIP pages (out of date). Personal ID and contact details on the Master profile are never copied.

## Steps
1. **Source ledger.** Read the remaining sources. List every voice and behaviour statement with its source and date.
2. **Conflict table for the owner.** Show statements that disagree side by side, as current to proposed. Known ones: "slightly playful" against "calm, no selling"; "experimental product/design studio" against "product & experience architecture studio"; "I" against "we"; long warm 2023 bios against short plain working rules. The owner rules on each. Nothing is written until then.
3. **Draft the skill files** from the approved rulings only. No invented attributes, facts or numbers. Anything inferred is marked as inferred.
4. **Sample round.** Five short pieces (case-study paragraph, LinkedIn post, email reply, 50-word bio, chat reply). The owner marks each "sounds like me" or not. Revise.
5. **Evals.** `evals/evals.json` with off-voice inputs and the flags expected (banned word, dash, unbacked claim, wrong spelling, over-length sentence).
6. **Report and stop.** Show the finished files. Wiring it into other skills is a later decision (below).

## Skill map: installed skills behind each step
Added 2026-11-16 at the owner's request ("use skills to enhance"). Same convention as the wugweb-work skill map: the skills are helpers, and the owner's rules and this plan win over anything a skill suggests. Mapped from each skill's listed description; each is read in full before first use, and any that does not fit is dropped and reported.

| Step | Skills and agents |
|---|---|
| 1. Source ledger: find material | `brand-voice:discover-brand` (skill and agent) across Notion and Drive; `Notion:find`, `Notion:search` |
| 1. Source ledger: extract statements | `brand-voice:document-analysis` agent for the brand guideline files and profile pages; `brand-voice:conversation-analysis` agent for meeting transcripts (Granola is connected), only if the owner says transcripts count |
| 1. Voice from real writing | `social-media-skills:voice-builder`, `social-media-skills:writing-style-and-tone`, `copywriting-kit:brand-voice` on the owner's own first-person text |
| 2. Conflict table | `brand-voice:guideline-generation` to structure the candidates; `~/.claude/skills/brand` (`references/voice-framework.md`, `messaging-framework.md`) as the framework checklist |
| 3. Draft the skill files | `anthropic-skills:skill-creator`, `anthropic-skills:skill-development` for folder shape, `SKILL.md` description and trigger phrases |
| 3. Facts and claims | `copywriting-kit:copy-proof-check` so every fact in `facts.md` has a source |
| 4. Sample round | `brand-voice:content-generation` agent and `brand-voice:enforce-voice` to write the five pieces; `copywriting-kit:copy-edit`, `design:ux-copy`, `rampstack-seo:content-and-copy` per form |
| 5. Evals and checks | `brand-voice:quality-assurance` agent, `brand-voice:brand-voice-enforcement`, `marketing:brand-review`; `anthropic-skills:skill-creator` to run the evals |
| Working rules | `anthropic-skills:consolidate-memory` (read-only pass) to gather the rules already in Claude memory |

Limits on the helpers:
- They read only. No skill writes to Notion, Sanity, Neon, Drive or memory under this plan.
- Email and meeting transcripts are private. Neither is searched unless the owner names them as a source.
- A skill's own template never adds an attribute, fact or number that is not in the owner's sources.
- The Sanity plugin needs sign-in, so the Brand voice values are read through the repo's existing Sanity client instead.

## Out of scope, each a separate owner decision later
- Making wugweb-work read from this skill. Its plan stays untouched and self-contained from here.
- Syncing the Sanity Brand voice fields to match.
- Feeding from or into the Identity Prism persona layer (Neon).
- A Notion page for this plan. Any Notion write is proposed first and waits for approval.

## Rules this work follows
Never invent facts. Delete nothing without asking. No Notion, Sanity or Neon writes. No edits to `docs/skills/wugweb-work/` or the Identity Prism repo. Commit by path with the Wugweb trailer only when asked.

## Verification
- Run the evals; every expected flag is raised and clean text passes.
- Run the skill on three texts it has not seen (one case-study paragraph, one LinkedIn post, one email) and check output against `words.md` (no dashes, no banned words, British spelling).
- Validate the skill folder with the `anthropic-skills:skill-creator` skill.
- Independent check: the `brand-voice:quality-assurance` agent reviews the finished files against `sources.md` without seeing my drafts' reasoning.
- Owner sign-off on the sample round in step 4.

## Still open
- Whether the other assistant's own plan exists (owner: not sure).
- Which past writing counts as voice (owner to point to it).
- The "Product & UX Strategy" Notion page was not found.
