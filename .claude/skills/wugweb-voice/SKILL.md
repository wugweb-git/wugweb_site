---
name: wugweb-voice
description: "Holds the one Wugweb voice, which is also the owner's voice, and runs the voice check on any visible Wugweb copy. This skill should be used when asked to check the voice, make text sound like Wugweb or like the owner, rewrite in our voice, run a voice check before posting, say whether a draft is on voice, or when wugweb-work passes draft text with its form and mode. It covers vocabulary, phrasing, sentence structure, cadence, formality and punctuation only. It does not cover personality, beliefs, decision style, format, length, SEO, positioning or design."
license: MIT
metadata:
  author: wugweb
  version: "0.3.0"
  status: "structure only; version locked at 0.3.0; voice rules waiting on owner samples"
---

# wugweb-voice

Wugweb and Vedanshu write in one voice, because Vedanshu is the author of Wugweb. This skill holds that voice and checks copy against it. Other skills ask for it; they never keep voice rules of their own.

## Status: read this first

Version 0.3.0 is structure only. The owner has supplied no writing samples yet, so no rule drawn from samples exists. What works today:

- The fixed owner rules (below). They are confirmed and always on.
- The voice check method, with its mechanical parts in `scripts/check.mjs`.
- The calibration ledger in `references/corpus.md`, empty.
- The mode list in `references/modes.md`, every mode waiting on samples.

What does not work yet: writing or rewriting "in the voice" beyond the fixed rules. When asked to do that, apply the fixed rules, say plainly that the voice is not calibrated, and give confidence as low. Never fill the gap from helper skills, from the draft wugweb-work section 5 or from general good-writing advice. Those are candidates until the owner rules on them.

## When to use

- A draft of visible Wugweb copy needs a voice pass: a case study, a post, a page, a deck, an email, a caption, a button label.
- Someone asks whether text sounds like Wugweb or like the owner.
- A post is about to go out. "Voice checked against wugweb-voice" is the approval step before any post.
- The owner supplies a writing sample, an edit he made to a draft, or a ruling on a candidate rule. Record it (see "Adding a sample").

## When not to use

| Matter | Owner |
| --- | --- |
| Structure, lengths, evidence rules, forms, SEO fields of a piece | `wugweb-work` |
| Identity, positioning, values, audience, messaging, Visual OS | `wugweb-brand-os` |
| Keywords, schema, on-page SEO, reporting | `wugweb-seo` |
| Where wording sits in the interface | `wugweb-kits` |
| Briefs: audience, purpose, form | `wugweb-strategy`, through `wugweb-work` |
| Sanity and Notion data changes, schema edits, sync scripts | `wugweb-engineer` |
| Client voices, quotes and on-screen terms | Stay as the client wrote them |
| Personality, beliefs, decision style, working preferences | Out of scope. Decline. |

If asked "what kind of person writes this", describe the style only and say the skill does not profile people.

## Fixed owner rules (confirmed, always on)

These come from the owner's standing rules, not from samples. They apply to all visible copy.

1. British English.
2. Sentence case for headings, labels and buttons.
3. No em or en dashes in visible copy. Write ranges out ("3 to 5").
4. Never invent a number, quote or fact. A claim needs a screen, a sourced number or a named fact.
5. No filler words. Which words count is waiting on his ruling; until then raise candidates, never remove them (`references/words.md`).

Internal documents are not visible copy, but this skill's own files follow the same rules so the export stays clean.

## Rule labels

Every rule in `references/` carries one label:

- **confirmed**: the owner said it or approved it, with the date.
- **observed**: seen in his samples, with the sample IDs and a count. Needs at least three unedited samples in the mode, a feature that did not shift when the latest sample was added, and, for a word or phrase rule, more than one topic. Prefer rules on function words, punctuation and structure; never base a rule on sentence length alone, because it changes with topic.
- **candidate**: found in a document or helper skill, not yet ruled on. Never applied as a rule. May be shown to the owner as a question.
- **waiting on samples**: a slot that exists so the structure is complete, with nothing in it.

Never state an observed or candidate rule as a confirmed preference. Never average two samples that disagree; ask which one is the target. Meeting the observed bar only earns the right to ask; the owner's yes is what confirms. Research finds no word count that makes a voice reliable, so treat counts as minimums and stability as the test (`references/blind-test.md` has the sources).

## Modes

There is one voice. Modes are settings of it, never a second voice. The modes are listed in `references/modes.md`: case study page, card and tile, deck slide, LinkedIn post, carousel, Behance and Dribbble captions, interface wording, quick chat and reply, email, formal document, spoken answer. Every mode is waiting on samples. Format rules for each form (sizes, counts, layout) live in `wugweb-work`.

Pronouns: "we" for studio copy, "I" in bylined or first-person writing, one per piece. The owner picks per piece; it is not a fixed rule.

## The voice check

Run this on any draft before it is posted or published. The check proposes; it never publishes or edits the piece itself.

1. **List the facts first.** Before any change, list every number, name, quote and scope word (all, every, only, never). `scripts/check.mjs` prints this list. Re-check the list after any rewrite. A voice rule never beats a fact.
2. **Mechanical rules.** Dashes, US spellings, heading case and confirmed banned words. `scripts/check.mjs` flags these.
3. **Trace.** Every number, quote and fact traces to a source the caller supplied. Anything untraced is flagged as "no source", not rewritten and not filled in.
4. **Mode.** The piece matches its mode in `references/modes.md`. While a mode is waiting on samples, report "mode not calibrated" and skip this step.
5. **Client words.** Client quotes and on-screen terms are unchanged.
6. **Voice rules.** Apply confirmed and observed rules from `references/voice.md`. While there are none, report "voice not calibrated". Candidate rules may be listed as questions for the owner, never as flags.
7. **Failure checks.** Once a mode has samples, compare the draft with them: a phrase used far more often than in his samples (overuse), a trait pushed further than he takes it (caricature), and sentence lengths or openings more uniform than his (flattening). If an AI judge is used, run it with the two texts in both orders and drop any verdict that flips; one judge never passes a draft alone.
8. **Report.** Result: pass, needs revision, or fail. Each finding gives the quoted text, the rule it breaks with its label, and proposed wording shown as current → proposed. Say what the check could not observe.

### Results and confidence

- **pass**: no flags in steps 2, 3 and 5, and no rule broken in 6 or 7. A pass means "not detected", never "proven on voice": small checks catch clear misses but cannot prove a match. A fail is strong evidence and blocks.
- **needs revision**: flags with proposed wording, nothing untraced.
- **fail**: any untraced number, quote or fact, or any changed client word.

Confidence is high, medium or low. Always give the evidence with it: samples in use, pooled words, how many are unedited, whether the features held steady when the last sample was added, and the latest blind test result with its number of items.

- **low** when the mode has fewer than three unedited samples in use in `references/corpus.md`, or its features are still moving. That is every mode today. Short modes (chat, captions) may stay low; pool their samples rather than force rules.
- **medium** when the mode has at least three unedited samples, its features held steady, and the rules applied are observed.
- **high** only when, in addition, the rules applied are confirmed and a blind test (`references/blind-test.md`) did not detect the drafts at the stated number of items.

Run the mechanical part with:

```
node scripts/check.mjs <file.md> [--mode <mode>] [--sources] [--json]
cat draft.txt | node scripts/check.mjs - --mode linkedin-post
```

It exits 1 on any flag or a fail result, otherwise 0.

## What a caller passes and gets back

Passes: the text or brief, the form and mode, the audience and purpose if known, and the sources for any facts. Gets back: the text in voice (or the check report), the rules applied with their labels, the confidence with its reason, and every claim it could not support. Full contract: `references/handoff.md`.

## Adding a sample

Calibration uses only writing or speech the owner supplies or names. Never search email, Drive, Notion or meeting transcripts for samples unless he names the item.

1. Add a row to `references/corpus.md` with every field, including word count, edit status (unedited, edited by others, AI-assisted) and where the original lives. Private text is not copied into the skill; a short excerpt only with his yes.
2. Keep only his own lines. In an email thread or transcript, other people's words are personal data: leave them out before reading, and note in the row what was removed.
3. Clean typos before reading the sample for voice. Typos are never copied as voice.
4. Leave out boilerplate, AI-written text and outliers. Text edited by others or drafted with AI may be kept but never supports a rule on its own. Note why in the row.
5. Read for vocabulary, phrasing, sentence length and cadence, formality, punctuation, openings and endings. Humour, idioms and spoken fillers only if they appear.
6. Write any pattern as an observed rule in `references/voice.md` or `references/modes.md`, citing sample IDs and the count. Below the observed bar it stays a note. Record the rule ID in the sample's "Used in" column.
7. Show the owner each new observed rule as a question. His yes makes it confirmed.
8. Hold back some samples per mode as unseen text (suggested one in five; the owner sets the share): never used for rules or examples, kept for the blind test.
9. Removing a sample: set its status to removed with the date, then rebuild and re-test every rule listed in its "Used in" column.

His chat messages in working sessions, fast and full of typos, are not samples. Nor is the working-style memory note, which says how he wants replies. The Notion page "Wugweb Profile (Master) - 2023" is an approved voice source (owner, 2026-11-17): a source to read, not yet a calibrated sample set.

## Order of work

1. Owner supplies or names samples. Everything below waits on this.
2. Candidate ledger: candidates from existing documents, each with source and date. Read-only.
3. Conflict table: current → proposed; the owner rules on each.
4. Fill `voice.md`, `modes.md` and `words.md` from his rulings and the corpus only.
5. Sample round: five short pieces in different modes; he marks each.
6. Evals and the blind test in `references/blind-test.md`.

When a piece is published, `wugweb-work` records who reviewed it and took editorial responsibility; under the EU AI Act (Article 50(4)) reviewed text is exempt from the AI-disclosure duty. A lawyer should confirm how it applies.

## Files

| File | Holds |
| --- | --- |
| `references/voice.md` | Voice rules with labels; slots waiting on samples |
| `references/modes.md` | One section per mode; all waiting on samples |
| `references/words.md` | Confirmed and candidate word lists, spelling list, proper nouns |
| `references/corpus.md` | The calibration ledger; empty |
| `references/handoff.md` | The contract with other skills |
| `references/blind-test.md` | How to run and score the blind test; evidence behind the thresholds |
| `references/tooling.md` | The only file that names tools, vendors and helper skills |
| `references/standing-rules.md` | Marked copy of the shared standing rules |
| `examples/` | Before and after pairs tied to corpus entries; empty until samples exist |
| `evals/evals.json` | Per-task tests; some runnable now, the rest waiting on samples |
| `scripts/check.mjs` | Mechanical voice check |
| `scripts/build.mjs` | Compiles the portable files |
| `scripts/test.mjs` | Tests the scripts and the skill's own files |
| `AGENTS.md`, `adapters/`, `agents/openai.yaml`, `export/wugweb-voice.md` | Portable copies for other agents (generated) |
| `README.md`, `metadata.json`, `CHANGELOG.md` | Install steps, version and history |

## Works outside Claude

The folder is a standard Agent Skill, so any agent that reads `SKILL.md` loads it as it is: Claude (installed, or at `.claude/skills/wugweb-voice/`), Cursor and Codex. This file carries the fixed rules, the labels and the voice check, so it stands alone where reference files are not loaded. Reference files are plain Markdown; scripts are plain Node with no packages; helpers are optional.

`scripts/build.mjs` compiles the portable files: `AGENTS.md`, the `adapters/`, `agents/openai.yaml` and `export/wugweb-voice.md`. Edit the sources, not the output. Every generated file leaves out the corpus ledger.

## Never

- Guess personality, beliefs or decision style.
- Copy typos.
- Invent a number, quote or fact, or fill a missing one.
- Rewrite client quotes or on-screen terms.
- Change format, length, SEO or positioning rules.
- Publish, post or write to Notion or Sanity.
- Use a sample the owner has not supplied or named.
- Turn a helper skill's advice into a rule without the owner's ruling.
