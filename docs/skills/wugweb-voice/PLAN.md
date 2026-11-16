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

- **`SKILL.md` stands alone.** Other tools may not load reference files on demand, so `SKILL.md` carries the core rules itself: the always-on voice rules, the fixed owner rules, the short banned list and the voice check. The reference files add depth, not anything the core depends on.
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

## 14. Extracted and absorbed

Owner, 2026-11-16, as relayed by the coordinating session: "push all the skills and plugins to the subsessions so that they can extract skills and even absorb them", then "provide them with more".

How this was done: three read-only passes over the installed skills and plugins on 2026-11-16. Nothing was installed, removed or edited. Nothing is copied word for word; each useful rule is to be restated in our own plain words, with its source named here. Owner rules win in every clash. Everything absorbed is a candidate rule: it becomes confirmed only when the owner rules on it or his samples show it.

Decisions: ABSORB (restate inside this skill so it works without the helper), HELPER (keep as an optional aid only), IGNORE.

### Calibration and samples

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `copywriting-kit:brand-voice` | Only the writer's own or authorised samples; choose samples across audience, channel and situation and state the coverage; one sample gives a provisional profile; label a rule as from interview or from a sample; "sounds like" lines must be real owner sentences; describe rhythm, do not set it as a standard | `corpus.md`, `voice.md` | ABSORB, HELPER | Its template uses en dashes and can record dash use as a habit. No dashes wins. |
| `social-media-skills:voice-builder` | Rules come from quoted samples, not adjectives; 5 to 10 samples ideal, 3 the floor; leave out text edited by others, boilerplate, AI-written, outdated or outlier pieces; never average samples that disagree, ask which is the target; a short list of 5 to 7 distinctive, testable signatures plus a "never" list; name the gaps when samples are thin | `corpus.md`, `voice.md` | ABSORB, HELPER | Its "stance" layer reads beliefs and emotional register: dropped, except person and address. It keeps founder and company voices apart: ignored, one voice. Its "aspirational voice" calibrates on other writers: ignored. Em dashes in its examples. |
| `brand-voice:discover-brand` (skill and agent) | An explicit instruction outranks an observed pattern; superseded material is kept listed as stale, not used; a conflict is written as both sides with dates | `sources` notes in `corpus.md` | ABSORB the ranking ideas only | It searches every connected platform, including other people's writing and calls. That breaks "only what the owner supplies". The search itself is IGNORED. |
| `brand-voice:conversation-analysis` agent | A pattern needs at least three occurrences; separate the owner's lines from other speakers before analysing; tie each quote to its transcript | Spoken mode in `modes.md` | HELPER, only on transcripts he authorises | It lists "personality traits" as something to extract: not done. |
| `brand-voice:document-analysis` agent | Every extracted statement cites its document; explicit mention is kept apart from inferred pattern | `corpus.md` | HELPER (already used once, read-only, on `brand_guidelines/`) | It extracts "personality descriptors": not done. |
| Granola meeting transcripts (connector) | A possible source of his spoken voice | `corpus.md`, only if listed there | Listed, not run | Used only for specific meetings he authorises. |

### Describing the voice

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `brand-voice:guideline-generation` | A paired "is / is not" row with evidence; three confidence levels, each with why it is limited and what would raise it; a four-tier word list (must use, preferred, avoid with alternative, never with reason); version line and archiving the old version | `voice.md`, `words.md`, the confidence rule in `SKILL.md` | ABSORB, HELPER | It has a "brand personality" and archetype section: ignored. Its confidence counts sources only; ours adds the confirmed or observed label. Em dashes, American spelling, title case in its templates. |
| `marketing:brand-review` | A four-line card per trait (is, is not, sounds like, does not sound like); tone by situation (bad news, incident, success story) beside tone by form; a table for style decisions; "use this, not this" word pairs | `voice.md`, `modes.md`, `words.md` | ABSORB, HELPER | Starts from "brand as a person": ignored. An invented metric and em dashes in its examples. "Excited" launch tone against no hype. |
| `social-media-skills:brand-profile` | A place for "how we say hard things" (price rise, mistake, outage); a spelling and style choices block; examples he likes and dislikes, each with a reason | `voice.md`, `words.md` | ABSORB | It drafts a profile from a website and social handles without sample-by-sample consent: not done. |
| `~/.claude/skills/brand` (voice framework) | "X, not Y" trait pairs; the question "would a competitor say this?" | `voice.md`, voice check | ABSORB | Traits are chosen, not drawn from samples: ours need a source. Generic example lines not carried. |
| `brand-voice:brand-voice-enforcement` | "More casual" changes tone, never voice; lead with 2 to 3 traits per form; before and after pairs with each change tagged by the rule behind it; on a conflict, explain, recommend, give options | `modes.md`, `examples/`, `SKILL.md` | ABSORB, HELPER | Its examples add invented numbers to sound data-driven: never. "Exclamation-worthy" energy against no hype. |

### Tone by form

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `social-media-skills:writing-style-and-tone` | Voice is constant, tone is chosen per moment; cleverness drops as stakes rise; hide the name and ask whether it is still recognisable | `modes.md`, voice check | ABSORB | It refuses punctuation bans outright. The owner's no-dash rule wins. Its third-party statistics are not carried. |
| `social-media-skills:cross-platform-repurposing` | The idea and the voice stay; opening, length, structure and register change | `modes.md` | ABSORB | None found. |
| `thread-writer`, `carousel-writer`, `story-writer`, `quote-cards-and-text-graphics` | One idea per unit, the point first, each unit readable on its own; a slide is a headline plus at most one line | `modes.md` (draft text for the carousel gap in section 7a) | ABSORB the wording rules | Example hooks with invented figures and emoji: not carried. |
| `text-post-and-microblog`, `threads-post`, `linkedin-post-writer` | No greeting or announcement opener; one idea; short paragraphs; at most one emphasis; end on a real, specific question; the peer test ("would I say this to a respected peer's face?"); named things to avoid (one dramatic fragment per line, bait, invented parables); only verifiable results in a case-study post | `modes.md`, voice check | ABSORB | "Hot take" as a default and hype phrases: not carried. |
| `reply-and-comment-writer` | A reply is slightly looser, same voice; every reply adds something; shape by message type (praise, question, criticism: acknowledge, fix, take private) | `modes.md` (chat and reply) | ABSORB | Unverified engagement figures not carried. |
| `hook-writer`, `caption-writer` | Take the opening from the piece's true strongest element; a truth gate (the piece must deliver what the opening promises); templates are shapes to rewrite in voice; lead with the value, not "thrilled to announce" | `modes.md` (openings) | ABSORB, HELPER | Several mechanisms lean on hype or fear of missing out: not carried. |
| `behind-the-scenes-and-founder`, `contrarian-and-opinion` | "I" in a first-person piece, "we" for the studio, one per piece; never write feelings or opinions he has not stated | `modes.md` | ABSORB the pronoun rule only | It splits founder voice from brand voice: ignored, one voice. Example figures invented. |
| `talking-head-and-piece-to-camera`, `short-form-video-script` | Spoken wording only: fix the first and last lines, keep the middle in his own words; no wind-up; a line that fails three times is rewritten; cut any line that does not move the answer on | `modes.md` (spoken answer, draft until transcripts exist) | ABSORB the wording rules | Filming, audio and delivery coaching: ignored. No sound is produced. |
| `design:ux-copy` | Tone keyed to the reader's state (success, error, warning, neutral); one term per thing | `modes.md` | ABSORB, HELPER | "Celebratory" success tone against no hype. Title case in its template. |
| `copywriting-kit:landing-page-copy` | The reader as subject where natural; "we" kept for commitments and about copy; headings state the point | `voice.md` | ABSORB | Very few. Mostly British spelling already. |

### Words and phrases

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `copywriting-kit` stock-phrasing catalogue (in `copy-edit`, `copy-diagnose`, `landing-page-copy`) | Seven families of empty phrasing (empty scaffolding, unearned emphasis, padding, hidden actor, manufactured tension, template residue, hedge stacks), each with a note on when it is not a fault; remove a stock phrase, never swap in another | `words.md` | ABSORB as the skeleton | It is a starting list, not the owner's. His banned lists (wugweb-work section 5, Sanity draft) come first. |
| `writing-style-and-tone`, `voice-builder`, `text-post-and-microblog`, `reply-and-comment-writer` | Further candidate words and openers (for example delve, tapestry, leverage, "in today's fast-paced world", "I'm excited to announce", "great post") | `words.md`, marked as candidates | ABSORB as candidates | "utilize" is American: both spellings listed. |
| `rampstack-seo:content-and-copy` | Sentence-level list: nominalisations, throat-clearing, filler intensifiers, hedges, pronoun drift, internal jargon leaking into customer copy; weak opener and weak closer types | `words.md`, `voice.md` | ABSORB, HELPER | It treats em dashes as a style choice to honour: no. American spelling. Its "contrarian" and "quotable line" advice not carried. |
| `anthropic-skills:full-output-enforcement` | A short list of assistant leftovers to strip ("let me know if you want me to continue", "for brevity") | `words.md` | ABSORB the list only | "Do not optimise for brevity" is about completeness, not copy: ignored for voice. |

### The voice check

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `copywriting-kit:copy-edit` | Before any rewrite, list every number, name, quote and scope word (all, every, only, never) and re-check them after; a voice rule never beats a fact; a missing fact is named after the text, never filled in; change log with a reason about the reader | Voice check steps 3 and 6 (section 7a) | ABSORB, HELPER | None found. Closest fit to the owner's rules. |
| `copywriting-kit:copy-proof-check` | A ledger row shape (item, location, source line quoted exactly, status, action); a status is always relative to what was supplied; unconfirmed wording is paraphrased with attribution, never put in quotation marks; where sources conflict, show both | `corpus.md` row shape, voice check step 3 | ABSORB the shape, HELPER | None found. |
| `copywriting-kit:copy-diagnose` | A finding is quote, problem, effect on the reader; separate "does not apply" from "could not tell"; say what the check could not observe | Voice check report | ABSORB, HELPER | En dashes in its text. |
| `brand-voice:quality-assurance` agent | Three results (pass, needs revision, fail); pass or fail per check; each finding names the rule it breaks and gives a fix; three severity levels | Voice check report | ABSORB, HELPER | None beyond the personality framing. |
| `brand-voice:content-generation` agent | A short notes block after any output: voice, tone, words, adaptations | What a caller gets back (section 7) | ABSORB, HELPER | None in its rules. |
| `writing-style-and-tone` | Four passes in order: substance, weight, rhythm read aloud, stock phrases; a visible placeholder where a real fact is missing | Voice check | ABSORB | As above. |
| `rampstack-seo:content-and-copy` | Edit for voice after structure and substance; note what already works before editing; "could a stranger place this as us?" | Voice check | ABSORB | As above. |

### Tests and building the skill

| Source | What is taken | Lands in | Decision | Clash with an owner rule |
|---|---|---|---|---|
| `voice-builder` (validation) | The blind test: write a new piece on a topic he has not covered, from the rules alone; compare unlabelled against a real sample; score hit or miss per rule; fix the rule behind each miss; two clean passes is the bar; if it cannot pass, ask for better samples | Section 8, `evals/` | ABSORB | Its worked examples are invented: ours use real samples only. |
| `anthropic-skills:skill-creator` | The description decides when the skill loads; test with requests that should load it and near misses that should not (format, SEO, positioning); blind A or B comparison with a simple rubric; people judge style, automatic checks cover spelling, dashes, case and invented numbers; one reference file per form | Section 5, section 8 | ABSORB the method, HELPER for running it | Its tooling is Claude-only (section 13). |
| `anthropic-skills:skill-development`, `rampstack-seo:skill-creation-walkthrough` | A "when not to use" block pointing to sibling skills; no content repeated between `SKILL.md` and references; every reference named in `SKILL.md` | Section 5 | ABSORB | The three guides give three different length limits. The system's 1,500 to 2,000 words stays. |
| `voice-builder` evals | Scenario tests that include refusal cases: no samples (must not invent), one thin sample, samples that disagree | `evals/` | ABSORB | None found. |

### Ignored for voice

| Source | Why |
|---|---|
| `marketing:draft-content`, `marketing:content-creation`, `marketing:email-sequence` | No voice method. Example hooks use invented numbers, urgency and title case. |
| `storytelling-and-narrative`, `educational-content-and-how-to`, `listicle-and-roundup` | Structure and strategy, not voice. |
| `anthropic-skills:brand-guidelines` | Another organisation's colours and fonts. |
| `anthropic-skills:docx` | File mechanics only. Usable as a helper if a Word file is ever asked for. |

### Passed to the coordinating session for other skills

- FOR wugweb-brand-os: messaging ladder, positioning and audience material in `~/.claude/skills/brand`, `brand-voice:guideline-generation`, `marketing:brand-review` and `copywriting-kit:copy-diagnose`.
- FOR wugweb-work: page and post structures, lengths, platform limits, hashtags, hook mechanisms, CTA shapes and claims checking in the social writer skills, `marketing:*`, `landing-page-copy`, `copy-proof-check` and `content-and-copy`. Warning: many templates there model invented figures and urgency.
- FOR wugweb-seo: the SEO pass and metadata rules in `rampstack-seo:content-and-copy` and `marketing:content-creation`.
- FOR wugweb-kits: interface copy patterns (errors, empty states, confirmations) in `design:ux-copy`.
- FOR wugweb-strategy: the brief template in `content-and-copy` and the goal tables in `caption-writer`.
- FOR the system: the three skill-building guides disagree on `SKILL.md` length.

### Limits of this read

- The plugins are not under `~/.claude/plugins/`; they were read from the Claude app's session folder. Other copies exist there and were not compared.
- Read in full: the brand-voice plugin, the copywriting-kit skills, `ux-copy`, `brand-review`, `content-and-copy`, `voice-builder`, `writing-style-and-tone`, `hook-writer`, `caption-writer`, `linkedin-post-writer`.
- Read as `SKILL.md` only, with some reference files unopened: the other social writer skills, `brand-profile`, `skill-creation-walkthrough`, parts of `skill-creator`, and most of `~/.claude/skills/brand`.
- Not opened: `email-and-newsletter`, `reels-script`, `tiktok-script`, `scripting-and-storyboarding`, `content-research-and-sourcing`, `crisis-and-moderation`.
- None of the helpers offers a blind comparison against real samples except `voice-builder`.

### Routed from the wugweb-brand-os reading, 2026-11-16

Proposals passed on by the coordinating session, not owner rulings.

| Source | Status here |
|---|---|
| `~/.claude/skills/brand` voice framework; `brand-voice:guideline-generation`; `marketing:brand-review`; `social-media-skills:brand-profile`; `quote-cards-and-text-graphics`; `storytelling-and-narrative` | Already covered in the tables above. |
| `social-media-skills:audience-research` (a bank of customers' own words) | Not read by this session. Likely belongs to `wugweb-strategy` and `wugweb-brand-os`; for voice it would only inform the "client's own words" rule. Decision waits on a read. |
| `~/.claude/skills/design` slides copywriting formulas (PAS, AIDA, FAB) | Not read by this session. Formulas are structure, so likely FOR `wugweb-work`. Decision waits on a read. |
| `frontend-design`, `design-taste-frontend` (their copy self-audit sections) | Not read by this session. Possible extra checks for interface wording. Decision waits on a read. |

### Routed from the wugweb-work extraction, 2026-11-16

Proposals passed on by the coordinating session, not owner rulings. Most repeat rows above; only what is new is listed.

| Proposal | Source named | Status here |
|---|---|---|
| Never make text worse to dodge AI detectors; edit for readers | `copywriting-kit:copy-edit` | ABSORB into the voice check. Matches "do not copy typos". Read by this session. |
| A piece ends, it does not run out; an opening earns the next lines | `rampstack-seo:content-and-copy` | ABSORB into `voice.md`. Read by this session. |
| One register per page | `design-taste-frontend` | Candidate for `modes.md`. Not read by this session. |
| Quotes of three lines at most, with name and role | `design-taste-frontend` | A length rule, so it stays with `wugweb-work`, which already has it. |
| Buttons say what happens; one name per action or feature | `frontend-design`, `ux-ui-audit`, `design:ux-copy` | "One term per thing" is already absorbed. Button wording is candidate text for `modes.md`. Only `ux-copy` was read by this session. |
| The client is the hero, the studio is the guide | `storytelling-and-narrative` | Candidate for `voice.md` (who the subject of a sentence is in client work). It also touches positioning, so `wugweb-brand-os` should agree. |
| Founder "I" against studio "we" | `linkedin-post-writer`, `behind-the-scenes-and-founder` | Kept only as a pronoun rule. One voice stands (owner, 2026-11-16). |
| Translate meaning, not words | `searchfit-seo:content-translation` | Candidate for `modes.md` if translated copy is ever in scope. Not read by this session. Scope is the owner's call. |
