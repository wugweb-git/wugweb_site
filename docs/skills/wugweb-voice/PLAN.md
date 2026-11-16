> PLAN READY FOR VETTING, 2026-11-16. Nothing is built. The owner approved writing this plan to the skill's Notion page (https://app.notion.com/p/41abb710b9ab81ffa0caeb0d74be903e) and to this file; he has not yet approved its open choices. Items marked CONFIRM need his yes before they count as decided. The Notion page and this file carry the same plan text.

# wugweb-voice skill: plan

## 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-voice` |
| Type | Claude Code Agent Skill: one `SKILL.md` plus `references/`, `examples/`, `evals/` |
| Version | 0.1.0 (planned) |
| Family | Wugweb Skill System |
| Status | Plan only. No files built. No approved writing samples yet. Nothing goes to development until the owner says so. |
| Lives in | `~/.claude/skills/wugweb-voice/` proposed, so every project sees it. CONFIRM |
| Covers | How Wugweb and Vedanshu write and speak: voice, tone, phrasing, structure |
| Does not cover | Personality, beliefs, decision style, working preferences, brand identity, positioning, audience, case-study structure, SEO, design |

## 2. About

One skill that holds the voice. Wugweb's voice and Vedanshu's voice are one voice, because Vedanshu is the author of Wugweb (owner, 2026-11-16: "wugweb and vedanshu is same"; and on the name: "because it is the same"). Other skills load it when they write. Client voices are separate and stay with each case study.

## 3. Why

The voice is written down in six places that do not agree: the owner's pasted persona outline, `docs/skills/wugweb-work/PLAN.md` section 5, the Sanity Brand voice draft, `brand_guidelines/`, the 2023 Notion profile pages, and the working rules in Claude memory. One tested source ends that.

## 4. What it captures, and what it must not

Captures, only as shown in his own samples:
- Vocabulary and phrasing.
- Sentence structure, length and cadence.
- Formality and punctuation.
- Humour and idioms, only if they appear in the samples.
- Spoken fillers, only from real transcripts.
- Variants by context: quick chat, formal document, spoken answer.

Must not:
- Guess personality, beliefs or decision style from how he writes.
- Copy typos or inconsistent spelling. Clean up, keep the intended voice.
- State a tentative observation as a confirmed preference. Every rule is labelled confirmed (he said it or approved it) or observed (seen in samples, count given).

## 5. Standard structure

```
wugweb-voice/
├── SKILL.md              frontmatter: third-person description with trigger phrases
│                         body 1,500 ≤ words ≤ 2,000: purpose, when to use and when not,
│                         always-on rules, modes, how to state confidence, pointers
├── references/
│   ├── voice.md          each rule: confirmed or observed, do, don't, on-voice and off-voice example
│   ├── modes.md          tone and shape by context (chat, email, formal document, spoken, case study, LinkedIn, deck)
│   ├── words.md          banned words, preferred terms, spelling, no dashes
│   ├── corpus.md         the calibration ledger (section 6)
│   ├── handoff.md        the contract with other skills (section 7)
│   └── tooling.md        the only file that names tools and vendors (section 13)
├── examples/             before and after pairs, each tied to a corpus entry
├── evals/evals.json      per-task tests (section 8)
├── scripts/              plain Node only: build the export, run the word and dash checks
└── export/wugweb-voice.md   single-file export for GPT, Cursor or any other tool (section 13)
```

Changed from the approved plan: `working-rules.md` and `facts.md` are removed. Working preferences are out of this skill (open question 2). Facts about the studio belong to `wugweb-brand-os`.

## 6. Calibration corpus, consent and provenance

Rule: the skill is calibrated only on writing or speech the owner supplies or authorises. Nothing is searched for in email, Drive or meeting transcripts unless he names it.

`references/corpus.md` holds one row per sample:

| Field | Meaning |
|---|---|
| ID | Stable short id |
| What | Email, note, draft, post, transcript, or an edit he made to a draft |
| Context | Quick chat, formal, spoken, public post |
| Date written | |
| Supplied by owner on | The consent date |
| Location | Where the original lives. Private text is not copied into the skill; a short excerpt only with his yes. |
| Status | In use, or removed on (date) |

He can add or remove a sample at any time. Removing one triggers a re-check of every observed rule that cited it.

Source classes:

| Source | Use |
|---|---|
| Writing and transcripts he supplies | Calibration |
| His edits and corrections to drafted copy | Confirmed preferences |
| Rules he has already fixed: British English; sentence case; no em or en dashes in visible copy; never invent a number, quote or fact; no filler words | Confirmed. The voice must respect them. |
| `PLAN.md` section 5 | The starting material, but a draft to calibrate. The coordinating session wrote it from his decisions in that work plus research; he has not yet reviewed it. |
| Sanity Brand voice draft, `brand_guidelines/` copy files (a few lines each), the pasted persona outline | Candidate rules. Each becomes confirmed only when he rules on it. |
| The "working-style" memory note (short, plain, result first) | How he wants replies written to him. Not a sample of how he writes. Not calibration. |
| His chat messages in sessions | Fast and full of typos. Not calibration. |
| Notion profile pages (2023, Grok, Gemini) | Stale background. Not calibration. CONFIRM |
| Identity Prism (Notion pages and the `memory` repo) | A related product, background only |

## 7. Handoff contract

The Wugweb Skill System has six skills (settled 2026-11-16, as relayed by the coordinating session): `wugweb-voice`, `wugweb-brand-os`, `wugweb-kits`, `wugweb-work`, `wugweb-strategy`, `wugweb-seo`. Registry: https://app.notion.com/p/41abb710b9ab81a38ca7fbd947b47298

- **`wugweb-brand-os`**: keeps identity, positioning, values, audience, messaging and Visual OS. It keeps no voice rules of its own; it points here.
- **`wugweb-work`** (consumer): produces every finished piece, including case studies, portfolio, blog posts, service pages, site copy, and their social and deck versions. It loads `wugweb-voice` for voice and keeps its own structure, lengths, evidence and SEO rules. In the table below, "the content skill" means `wugweb-work`.
- **`wugweb-strategy`**: no direct link. Its brief names audience, purpose and form; `wugweb-work` passes those here with the draft.
- **`wugweb-seo`, `wugweb-kits`**: no direct link. If either needs visible wording, it asks `wugweb-work`, which writes it and runs the voice check. The voice check happens in one place only.

Links, to read the same on both sides:

| Direction | Skill | What |
|---|---|---|
| Gives to | `wugweb-work` | Voice rules, mode settings, text in voice, voice-check results with confidence |
| Gives to | `wugweb-brand-os` | The voice rules it points to |
| Takes from | `wugweb-brand-os` | Identity, positioning, audience |
| Takes from | `wugweb-work` | Draft text with its form, mode, and the audience and purpose from the brief |
- **Client voice**: quotes and on-screen terms from a client stay in the client's words. This skill never rewrites them.

What a caller passes in: the text or brief, the mode, and the audience if known. What it gets back: the text in voice, the rules applied, a confidence level (high, medium, low) with the reason, and any claim it could not support.

What would move in from `PLAN.md` section 5 (that file is not edited from here; the move is for its own session to make):

| From section 5 | Goes to |
|---|---|
| Tone in one line | `voice.md` |
| Say what was built; evidence or nothing; answer first; short whole sentences; plain words and the banned list; active with a named doer; British English; no dashes; sentence case | `voice.md`, `words.md` |
| Tone by form | `modes.md` |
| NTUC before and after table | `examples/` |
| Lengths per element, headings as claims at 70 characters, the client's own words, credit honestly, how the audit checks it | Stay in the content skill |

## 7a. Modes by form and platform, and the voice check

There is one voice (owner, 2026-11-16: "me and wugweb are same"). Modes are settings of that one voice, never personal against company. Format rules (sizes, counts, layout) live in `wugweb-work`; this skill owns only how each form should sound. Inherited from the closed social planning session.

Starting text, from "Tone by form" in the wugweb-work plan. Draft until the owner reviews it:

| Form | How it sounds (draft) |
|---|---|
| Case study page | Full sentences, evidence in every chapter |
| Card and tile | Client, one line of what was built, no adjectives |
| Deck slide | One claim per slide, the screen does the talking |
| LinkedIn post | First person plural, one lesson from the project, no hashtag stuffing, same facts as the page |
| Behance and Dribbble | Captions only, flow by flow |
| Carousel | Not in the starting text. Gap: needs the owner's ruling or a sample. |
| Quick chat, formal document, spoken answer | No starting text. Each needs samples. |

"Voice checked against wugweb-voice" is the approval step before any post. The check is:

1. No banned or filler words (`words.md`).
2. No em or en dashes; British spelling; sentence case.
3. Every number, quote and fact traces to a source. Anything untraced is flagged, not rewritten.
4. The piece matches its mode in `modes.md`.
5. Client quotes and on-screen terms are unchanged.
6. Result: pass, or a list of flags with proposed wording, plus a confidence level. The check proposes; it does not publish or edit the piece itself.

## 8. Per-task tests

| Task | Test |
|---|---|
| Rewrite off-voice text | Every banned word, dash, unbacked claim, wrong spelling and over-length sentence is flagged and fixed |
| Write in a mode | Output matches that mode's shape in `modes.md` |
| Clean a typo-heavy note | Typos gone, wording and order kept |
| Blind comparison | The owner sees real samples and skill outputs unlabelled and picks which are his. The target pass mark is his to set. |
| Stated confidence | Low when the mode has fewer than three samples behind it |
| No profiling | Asked "what kind of person writes this", the skill declines and describes style only |
| Same result from the export | The same test inputs are run from `export/wugweb-voice.md` in a tool other than Claude. The flags raised and the rules applied must match the Claude run. |

## 9. Order of work

1. Owner supplies or names writing samples. Blocked until then.
2. Source ledger: candidate rules from the existing documents, each with source and date. In progress, read-only.
3. Conflict table: current to proposed, owner rules on each.
4. Draft the files from his rulings and the corpus only.
5. Sample round: five short pieces, he marks each.
6. Evals and blind comparison.

## 10. Skill map

Kept from the approved plan (owner: "use skills to enhance"). Helpers only; they return proposals and the owner's rules win.

The Wugweb Skill System's final list gives this skill eight helpers: `rampstack-seo:content-and-copy`, `copywriting-kit:copy-edit`, `copywriting-kit:copy-diagnose`, `copywriting-kit:brand-voice`, `design:ux-copy`, `brand-voice:brand-voice-enforcement`, `brand-voice:guideline-generation`, `marketing:brand-review`. The table below also names skills outside that list (the brand-voice agents, `voice-builder`, `writing-style-and-tone`, `skill-creator`, `copy-proof-check`). CONFIRM whether those extras stay.

| Step | Skills and agents |
|---|---|
| Find and extract candidate rules | `brand-voice:discover-brand`, `brand-voice:document-analysis` agent |
| Learn from his samples | `social-media-skills:voice-builder`, `social-media-skills:writing-style-and-tone`, `copywriting-kit:brand-voice`; `brand-voice:conversation-analysis` agent for transcripts he supplies |
| Conflict table | `brand-voice:guideline-generation` |
| Build the skill | `anthropic-skills:skill-creator`, `anthropic-skills:skill-development` |
| Sample round | `brand-voice:content-generation` agent, `brand-voice:enforce-voice`, `copywriting-kit:copy-edit` |
| Checks | `brand-voice:quality-assurance` agent, `copywriting-kit:copy-proof-check`, `marketing:brand-review` |

## 11. Open questions for the owner

1. Settled 2026-11-16: one voice, held in `wugweb-voice`. The owner said so in this session ("wugweb and vedanshu is same") and, as relayed, again when asked directly.
2. Where do working preferences live (how he wants assistants to reason, prioritise and report)? Today they are in Claude memory. They are out of this skill.
3. CONFIRM the location: personal skills folder, or the repo.
4. "We" for the studio and "I" in bylined or personal writing: one rule, or his call per piece?
5. Which samples does he supply first, and may meeting transcripts be used?
6. Settled 2026-11-16: the plan goes on the skill's Notion page and in this file. Any further Notion write still waits for his yes.
7. CONFIRM the helper list: the system's eight only, or the extras in section 10 as well.

## 12. Source gaps

- No approved writing samples have been supplied. This is the main gap; steps 4 to 6 cannot start without them.
- No transcripts, so no spoken mode yet.
- The Sanity Brand voice draft marks its own audience line as inferred.
- The Notion page "Product & UX Strategy" was not found.
- Whether the other assistant wrote its own plan is still unknown.

## 13. Works beyond Claude

Owner, 2026-11-16, as relayed by the coordinating session: "make sure all the skills can be utilised by gpt or cursor or beyond claude".

How the skill stays portable:

- **Plain Markdown rules.** `voice.md`, `modes.md`, `words.md`, `corpus.md` and `handoff.md` are written so any model, or a person, can follow them. No Claude-only syntax in them.
- **Helpers are optional.** Every helper skill, plugin and connector in section 10 is an aid. Each mode and the voice check (section 7a) can be done by hand from the Markdown files alone.
- **Scripts are plain Node.** No Claude tooling, no installed packages beyond Node itself.
- **Tool and vendor wiring in one file.** `references/tooling.md` is the only place that names Claude skills, plugins, Notion or Sanity. Every other file is neutral.
- **Single-file export.** `scripts/` builds `export/wugweb-voice.md`: the always-on rules, modes, word lists, the voice check and the examples in one file, to paste or attach in GPT, Cursor or another tool. The corpus ledger is left out of the export unless the owner says otherwise, since it points at private writing.
- **Parity test.** Section 8, last row.

What in this plan works only in Claude today:

| Item | Outside Claude |
|---|---|
| Automatic loading by trigger phrases in the `SKILL.md` frontmatter | Paste or attach the export by hand |
| The helper skills and the brand-voice agents in section 10 | Follow the Markdown rules by hand |
| Running `evals/evals.json` through `anthropic-skills:skill-creator` | Run the same inputs by hand and compare against the expected flags |
| Reading the Notion page and Sanity fields through connectors | Not needed at run time; the rules live in the files |
| The owner's fixed rules held in Claude memory | Copied into `voice.md` and `words.md`, so the skill does not depend on memory |
