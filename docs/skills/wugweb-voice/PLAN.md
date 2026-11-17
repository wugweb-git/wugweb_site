> STATUS, 2026-11-17, written by the coordinator session from main. This block replaces any older status, version or "not built" line further down. The skill sessions build the skill; the coordinator keeps this plan and the Notion page.
>
> - Built. Version 0.3.0 on main (locked by the owner), 57 files, last skill commit 27e3874a. Version 0.2.1 (portability package) came before it.
> - Skill file body: 2,000 words by the shared count, exactly the limit. Any edit that adds a word must cut one.
> - Tests pass. Single-file export is in the skill folder.
> - Claude app and Cowork: not installed after the app reset on 2026-11-17. The voice session built the upload zip; the owner uploads it.
> - Owner rulings since the plan: wugweb-voice may read wugweb-strategy's signal log directly, read only (given in the strategy session; voice has asked for the owner's word in its own session and whether the version stays 0.3.0).
> - Open with the owner: writing samples, the marked-copy question, the helper list, working preferences, translated copy, the we or I rule, the summary field.

> PLAN READY FOR VETTING, 2026-11-16. Version 0.3.0 of the skill exists; see Status. The owner approved writing this plan to the skill's Notion page (https://app.notion.com/p/41abb710b9ab81ffa0caeb0d74be903e) and to this file; he has not yet approved its open choices. Items marked CONFIRM need his yes before they count as decided. The Notion page and this file carry the same plan text.

# wugweb-voice skill: plan

## 1. Skill card

| Field | Value |
|---|---|
| Name | `wugweb-voice` |
| Type | Claude Code Agent Skill: one `SKILL.md` plus `references/`, `examples/`, `evals/` |
| Version | 0.3.0 (locked by the owner) |
| Family | Wugweb Skill System |
| Development chat | https://claude.ai/chat/942cbd9e-e68d-4679-9923-ef4e030440d8 |
| Repo plan | `https://github.com/wugweb-git/wugweb_site/blob/main/docs/skills/wugweb-voice/PLAN.md` |
| Status | Plan ready for vetting. Skill development started on 2026-11-16 in the development chat: version 0.3.0 exists (locked by the owner), structure and method only. No approved writing samples yet, so no rule drawn from samples exists. |
| Real copy | `.claude/skills/wugweb-voice/` in the repo (owner, 2026-11-16: "The full folder"). Version 0.3.0, 57 files, on `main` (version locked in commit `27e3874a`). Its own tests pass. |
| Other copy | The Claude app on the owner's Mac carried the same 51 files as the repo folder at 0.2.0 (checked identical on 2026-11-17); the app was reset that day, and the 0.3.0 zip is for the owner to upload. Not the source; the repo folder is. |
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

Changed from the approved plan: `working-rules.md` and `facts.md` are removed. Working preferences are out of this skill (open question 5). Facts about the studio belong to `wugweb-brand-os`.

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
| The owner's standing rules in `docs/skills/STANDING-RULES.md` (on `main` since commit `1ccb099e`) | Confirmed. That file is their one home: its Writing section (spelling, case, dashes) and its Truth and evidence section (nothing invented). This plan points to it and does not restate them. |
| "No filler words" | A voice rule, so it lives here. Which words count waits on his ruling. |
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

Matrix row, as held on the registry:

- **Owns:** the one Wugweb voice: voice, tone, phrasing and structure rules; word lists; how it sounds per form and platform; the ledger of owner-approved samples; the pre-post voice check.
- **Reads (sources):** writing and transcripts the owner supplies or authorises; his edits and fixed rules; the draft "Writing style and tone" section of the wugweb-work plan.
- **Gives to:** `wugweb-work` (voice rules, mode settings, text in voice, voice-check results with confidence); `wugweb-brand-os` (the voice rules it points to).
- **Takes from:** `wugweb-brand-os` (identity, positioning, audience); `wugweb-work` (draft text with its form, mode, and the audience and purpose from the brief).
- **Never does:** guesses personality, beliefs or decision style; copies typos; invents numbers, quotes or facts; rewrites client quotes or on-screen terms; changes format, length, SEO or positioning rules; publishes; uses unapproved samples.
- No direct link with `wugweb-strategy`, `wugweb-seo` or `wugweb-kits`.

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

Founder "I" against studio "we": several helper skills treat these as two voices. The owner ruled one voice (2026-11-16), so here it is a pronoun setting only. A bylined or first-person piece uses "I", studio copy uses "we", one per piece, and the voice rules are the same for both. Whether that is one fixed rule or his call per piece is open question 8.

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
2. Writing samples: which emails, posts, notes or transcripts count as his voice, and may meeting transcripts be used? Nothing can be calibrated without them.
3. Where the skill lives: `.claude/skills/wugweb-voice/` in the repo, or the personal skills folder `~/.claude/skills/wugweb-voice/` so every project sees it.
4. The helper list: the system's eight only, or the extras in section 10 as well.
5. Where working preferences live (how he wants assistants to reason, prioritise and report). Today they are in Claude memory. They are out of this skill.
6. Whether translated copy is in scope for the voice.
7. Settled 2026-11-16: this plan file is on `main` (commits up to `97ea8ec4`), pushed on the owner's yes.
8. "We" for the studio and "I" in bylined or personal writing: one fixed rule, or his call per piece?
9. CONFIRM that the Notion profile pages (2023, Grok, Gemini) are background only, not calibration.
10. CONFIRM that `SKILL.md` and the export may carry the standing rules as a marked copy (section 13).

Settled 2026-11-16: the plan goes on the skill's one Notion page and in this file. Any further Notion write still waits for his yes.

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
- **Standing rules travel as a marked copy.** The owner's standing rules live in `docs/skills/STANDING-RULES.md` and nowhere else. A tool that cannot open a second file still needs the three writing rules and "nothing invented", so `SKILL.md` and the export carry them as a copy, labelled as copied from that file and never edited in the skill. This sits between two of his rules (one home per rule; usable beyond Claude). CONFIRM that a marked copy is acceptable.
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

### Routed from the other skills' readings, 2026-11-16

Proposals passed on by the coordinating session from the wugweb-brand-os, wugweb-work, wugweb-strategy and wugweb-seo readings. They are proposals, not owner rulings. Every source below was read by this session, in the named section only, in a fourth read-only pass. Items that repeat a row above are not listed again.

| Proposal | Source read | Decision | Lands in | Clash with an owner rule |
|---|---|---|---|---|
| Stock-phrase list; opener and closer rules; never make text worse to dodge AI detectors | `copywriting-kit:copy-edit`, `rampstack-seo:content-and-copy` | ABSORB | `words.md`, `voice.md`, voice check | Covered above. "A piece ends, it does not run out" is added to `voice.md`. |
| Words do a job: write from the reader's side, name things as people know them, describe plainly instead of selling; a control says exactly what happens ("Save changes", not "Submit"); errors say what went wrong and how to fix it | `frontend-design` (writing section) | ABSORB | `modes.md` (interface wording) | None found. Already sentence case and no filler. |
| Re-read every visible string before it ships; one register per page; no filler verbs or poetic labels; keep the existing voice when a page is redesigned | `design-taste-frontend` (copy rules) | ABSORB | Voice check, `modes.md`, `words.md` | It also bans em and en dashes, which agrees. It allows made-up "mock" numbers: not carried. It writes ranges with a hyphen; the owner's rule is to write them out. |
| Quotes of three lines at most with name and role; headline and paragraph word limits | `design-taste-frontend` | IGNORE for voice | Stays with `wugweb-work` | Length rules belong to `wugweb-work`, which already has the quote limit. |
| One feature, one name across screens; hunt placeholder copy; a label must match where it leads; check a claim against what the product does | `ux-ui-audit` | ABSORB the naming and placeholder checks, HELPER | Voice check, `words.md` | None found. The claims check itself is FOR `wugweb-work`. |
| Readers' own words, kept word for word and grouped (problem, desire, objection, what they call the thing); a phrase with no evidence is left out or marked assumed | `social-media-skills:audience-research` (voice of customer) | HELPER; ABSORB one rule | `voice.md`: prefer the reader's own term over internal jargon, when the term is evidenced | It gathers from reviews, forums and competitors. Collection and the bank itself are FOR `wugweb-strategy`; the audience definition is `wugweb-brand-os`. |
| Slide copy formulas (problem, call to action, feature, cost of inaction, before and after) | `~/.claude/skills/design` (slides copywriting formulas) | IGNORE for voice | FOR `wugweb-work` | Structure only. Its templates have number slots and "is dead" hype shapes with no rule that figures are real. |
| The client is the hero, the studio is the guide | `storytelling-and-narrative` | Candidate, not absorbed yet | `voice.md`, if `wugweb-brand-os` agrees | It is partly positioning, so brand-os decides first. |
| Founder "I" against studio "we" | `linkedin-post-writer`, `behind-the-scenes-and-founder` | ABSORB as a pronoun setting only | `modes.md` | Both sources treat them as two voices. One voice stands (owner, 2026-11-16). See section 7a. |
| Post habits to avoid: one dramatic fragment per line, "Agree?" closers, staged vulnerability, humble-brag | `linkedin-post-writer`, `behind-the-scenes-and-founder` | ABSORB | `modes.md`, `words.md` | Covered above. |
| Templated pages drift to a generic voice: compare a page with two siblings, and if only the names differ it fails | `rampstack-seo:programmatic-seo` | ABSORB the check | Voice check scope: templated pages are checked too, through `wugweb-work` | None found. The cause (thin data, weak template) is FOR `wugweb-seo` and `wugweb-work`. |
| Stock transitions, heavy dashes and bold in most paragraphs read as low-effort machine text | `seo-skills:seo-content-audit` | ABSORB the two wording signals | Voice check, `words.md` | It tolerates em dashes under a threshold; the owner bans them outright. Its other signals (bylines, posting rate) are FOR `wugweb-seo`. |
| Translate meaning, not words; adapt idioms; keep brand names and technical terms as they are | `searchfit-seo:content-translation` | Held | `modes.md`, only if translated copy is in scope (open question 6) | The skill says nothing about keeping voice or tone. |

### From the design-system docs, 2026-11-16

Source: kits docs (`kits_design_system/docs/components.md` and `tokens/layout-shell.md`), read by this session to confirm the points the coordinating session passed on. `wugweb-voice` owns how these sound, `wugweb-kits` owns where they sit, `wugweb-work` writes them.

| What the docs say | Where it is | For the voice | Lands in |
|---|---|---|---|
| Buttons are led by their label, and the label describes the action. Existing labels: "Start a project", "View all articles", "Chat with us", "Get the deck" | `components.md` lines 22 to 62 | These four are real, shipped examples of the voice in a button: a plain verb and the thing. Usable as on-voice examples, source: kits docs | `modes.md` (interface wording), `examples/` |
| A hidden label is needed only when the visible one does not describe the action (icon-only, a repeated "Learn more") | `layout-shell.md` line 329 | Hidden labels are written in the same voice as visible ones. Prefer a visible label that needs no hidden one | `modes.md` |
| A section with no visible heading still carries a hidden heading | `layout-shell.md` line 213 | Every section has a name someone writes. Hidden headings follow the same heading rules: sentence case, a plain name for what the section holds | `modes.md` |
| "Descriptive anchor text, answer-first copy" is listed as copy guidance for existing fields | `layout-shell.md` line 346 | Agrees with "answer first" in the starting text. Link text says where the link goes | `voice.md` |
| A summary field of 40 to 60 words, shown on the page, is proposed for case studies and posts | `layout-shell.md` line 319, under "Status: proposal, no schema field below is deployed yet" | Not a form yet. If the owner approves the field, it becomes a new mode: a short, answer-first summary. The length belongs to `wugweb-work` | `modes.md`, only if approved |

Note: the docs themselves use em dashes and an en dash in the "40 to 60" range. Those are internal docs, not visible site copy.
