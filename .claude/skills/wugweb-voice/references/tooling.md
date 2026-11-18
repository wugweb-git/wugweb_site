# Tooling

The only file in this skill that names tools, vendors and helper skills. Every step can be done by hand without them. Helpers return proposals only; the owner's rules win in every clash.

## Helper skills

Status: decided by the owner, 2026-11-16, and confirmed 2026-11-17: the system's eight plus the extras below, listed only in this file. All return proposals only, and none can set a rule.

| Helper | Used for | Status |
| --- | --- | --- |
| `copywriting-kit:brand-voice` | Capturing a profile from samples | Waiting on samples |
| `copywriting-kit:copy-edit` | Fact list before rewrite; change log | Method absorbed into the voice check |
| `copywriting-kit:copy-diagnose` | Finding shape: quote, problem, effect | Method absorbed into the report |
| `rampstack-seo:content-and-copy` | Sentence-level editing pass | Optional |
| `design:ux-copy` | Interface wording | Optional |
| `brand-voice:brand-voice-enforcement` | Applying rules to a draft | Waiting on rules |
| `brand-voice:guideline-generation` | Conflict table | Order of work step 3 |
| `marketing:brand-review` | Review against rules | Waiting on rules |

Extras, approved by the owner on 2026-11-16: `brand-voice` agents (document-analysis, conversation-analysis, content-generation, quality-assurance), `social-media-skills:voice-builder`, `social-media-skills:writing-style-and-tone`, `anthropic-skills:skill-creator`, `copywriting-kit:copy-proof-check`.

## Sources and systems

| System | Use | Write rule |
| --- | --- | --- |
| Notion, wugweb-voice page | Source of truth for the plan | Only with approval of the exact change, backup first |
| Notion registry, Wugweb Skill Management System | The skill's row | Same |
| Sanity "Brand voice" draft | Candidate rules | Never written from this skill |
| `brand_guidelines/` in the site repo | Candidate rules | Read only |
| Claude memory, working-style note | Not calibration | Read only |
| `wugweb-strategy` `references/topics-and-calendar.md` | Reader words as vocabulary candidates, never rules | Read only |
| Meeting transcripts (any connector) | Spoken mode, only meetings the owner names | Read only |

## Claude-only features and the manual route

| Feature | Outside Claude |
| --- | --- |
| Loading by trigger phrases in the `SKILL.md` frontmatter | Paste or attach `export/wugweb-voice.md` |
| Helper skills and agents | Follow the Markdown rules by hand |
| Running `evals/evals.json` through `anthropic-skills:skill-creator` | Run the inputs by hand; compare against the expected flags |
