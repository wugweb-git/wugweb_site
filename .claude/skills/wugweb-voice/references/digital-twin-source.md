# Source: the digital-twin plan document

A record of one document the owner supplied, and what this skill took from it.

## What the document is

| Field | Value |
|---|---|
| Title | "Wugweb Digital-Twin Skill: wugweb-work" |
| Form | A seven-page plan, written by an AI assistant in another tool and exported as a PDF |
| Supplied | By the owner, 2026-11-19, with the instruction "add this in wugweb-voice skill" |
| What it proposes | One "final boss" skill that acts as a digital twin of the agency: a persona and voice, an orchestrator with specialist sub-skills, a content workflow, a design-system audit, three search skills and a tool list |
| Standing here | A source of candidates. It is not a writing sample and not a ruling |

**Why it is not a sample.** It was written by an AI model about the voice, not by the owner in the voice. Calibration uses only writing or speech the owner supplies as his own (`SKILL.md`, Adding a sample). Nothing in it can back an observed rule, raise the confidence of any mode, or be quoted as how he writes.

**Why it is here at all.** The owner chose to put it in this skill, and its voice and persona section states things about the voice that he may confirm. Each such statement is listed in the candidate table of `voice.md` (C-07 to C-15) and waits on his ruling, like every other candidate.

## What was taken, as candidates

From the document's "Wugweb Persona and Voice" section and its note on conversational style. The wording below is the document's, shortened; the full rows are in `voice.md`.

| Candidate | What the document says |
|---|---|
| Attributes | Grounded, plainspoken, curious, minimalist, warm |
| Register | Clear and factual, "slightly playful"; professional and concise, never hyperbolic or generic |
| Grounded, as a testable rule | Claim only what can be shown; cite a source for a number; no empty superlatives without evidence |
| Voice and tone | One constant voice; tone shifts with context, held in a tone map per form |
| Constant qualities | Evidence-based, systems-minded, collaborative |
| Address | Plain English, written to one person as "you", answers broken into clear sections |
| Words to avoid | "seamless", "state-of-the-art", "game-changing", and jargon with no explanation |
| Method | Each attribute gets on-brand and off-brand example sentences; sample dialogues are worked through with the owner before the voice is fixed |
| Speaking as the owner | Drafts and chat answers "in the user's voice only with explicit intent"; otherwise a default studio persona |

## Where the document disagrees with what is already settled

These are held for the owner. Nothing below was changed in this skill.

| Matter | The document | Already settled | What stands meanwhile |
|---|---|---|---|
| One voice or two | A default studio persona, and the owner's own voice only when he asks for it | "wugweb and vedanshu is same as vedanshu is the author of wugweb" (owner, 2026-11-16): one voice, with modes as settings of it | One voice. The document's split is candidate C-15 and is not applied |
| A persona with an identity | Defines who the agent "is", with values and brand metaphors | This skill describes style only and does not profile a person or build a personality (`SKILL.md`, When not to use) | Style only. Identity, values and positioning belong to the brand skill |
| Rules without samples | Sets attributes and examples up front | No rule drawn from samples exists until the owner supplies samples; a candidate is never applied as a rule | Every item stays a candidate |
| Banned words | Names three words to avoid | "seamless" is already a candidate; none of the three is confirmed | They sit in the candidate list of `words.md` and are reported as questions, never removed from a draft |

## What the document holds that is not voice

Listed so nothing in it is lost. None of it was adopted here, because it is not this skill's matter, and several points differ from decisions the owner has since made. Each is for the owner to rule on in the skill it belongs to.

| In the document | Belongs with | Note |
|---|---|---|
| One orchestrator skill with eleven named sub-skills | The skill system as a whole | The system on main is seven skills, each working alone |
| Case-study sections About, The challenge, What we built, How we approached it, The outcome, FAQ | `wugweb-work` | The owner has ruled out a fixed section pattern and an FAQ block on a case study |
| Search split into plan, audit and report skills | `wugweb-seo` | One skill with those three parts exists |
| A check for `llms.txt`; an `author` on a case study | `wugweb-seo`, `wugweb-work` | Both are ruled out in those skills |
| Six-layer token model and a rules audit | `wugweb-kits` | Held there |
| Media manifest, proof screens per chapter, an "All screens" gallery, a viewer | `wugweb-work` | Held there and built |
| Tool and connector list, with consent before any write | Each skill's own helper list | No tool is named in this file |
| Phases: discover, plan, draft, review, approve, monitor | `wugweb-work` | Its own cycle has nine modes |

## How to use this file

- Do not quote the document as the owner's words.
- When he rules on a candidate, move it in `voice.md` to confirmed with the date, or remove it, and note the ruling here.
- When he supplies writing of his own, the samples decide; where a sample and a candidate from this document disagree, the sample wins.
