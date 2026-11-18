# Voice rules

Status: waiting on samples. No observed rule exists yet.

Each rule has this shape:

| Field | Meaning |
| --- | --- |
| ID | V-01, V-02 and so on |
| Rule | One sentence, testable |
| Label | confirmed (date) / observed (sample IDs, count) / candidate (source) |
| Do | An on-voice line. From a sample only; never invented |
| Don't | An off-voice line, with the reason |
| Modes | All, or the modes it applies to |

## Confirmed

From the owner's standing rules. These are not drawn from samples.

| ID | Rule | Label | Modes |
| --- | --- | --- | --- |
| V-01 | British English | confirmed (owner standing rule) | All |
| V-02 | Sentence case for headings, labels and buttons | confirmed (owner standing rule) | All |
| V-03 | No em or en dashes; ranges written out | confirmed (owner standing rule) | All |
| V-04 | Never invent a number, quote or fact | confirmed (owner standing rule) | All |
| V-05 | No filler words (list waiting on his ruling, see `words.md`) | confirmed (owner standing rule) | All |
| V-06 | One voice for Wugweb and the owner; modes are settings, not voices | confirmed (owner, 2026-11-16) | All |

## Observed

Waiting on samples. Slots to fill from the corpus:

| Area | Status |
| --- | --- |
| Vocabulary and phrasing | Waiting on samples |
| Sentence structure, length and cadence | Waiting on samples |
| Formality and punctuation | Waiting on samples |
| Openings and endings | Waiting on samples |
| How hard things are said (a mistake, bad news, a no) | Waiting on samples |
| Humour and idioms (only if present) | Waiting on samples |
| Spoken fillers (only from transcripts) | Waiting on samples |

## Candidates

Not applied. Each waits on the owner's ruling, and is shown to him as current → proposed in the conflict table (order of work, step 3).

| ID | Candidate | Source | Status |
| --- | --- | --- | --- |
| C-01 | The rules in the "Writing style and tone" table (say what was built, answer first, short whole sentences, plain words, active with a named doer, credit honestly) | `docs/skills/wugweb-work/PLAN.md` section 5 | Waiting on ruling |
| C-02 | "Tone in one line: a senior practitioner explaining what was built and why, to a peer" | Same | Waiting on ruling |
| C-03 | Copy and messaging lines in `brand_guidelines/` | `brand_guidelines/03_MARKETING_SYSTEM/14_COPY_GUIDELINES.md`, `02_MESSAGING_FRAMEWORK.md` | Not yet read in full |
| C-04 | Sanity "Brand voice" draft | Sanity site settings | Not yet read in full; marks its own audience line as inferred |
| C-05 | "Not decorative or hype-driven": use words that describe systems and relationships, not decorative or hype-driven language | `brand_guidelines/01_FOUNDATION/VOCABULARY.md` (line 22); routed 2026-11-17 by `wugweb-brand-os`'s audit via the coordinator | Waiting on the owner's ruling; put to him with the other candidates |
| C-06 | "Outcomes over hype": prefer claims about outcomes, decisions, systems and experiences over hype | `brand_guidelines/03_MARKETING_SYSTEM/14_COPY_GUIDELINES.md` (line 5); same routing | Waiting on the owner's ruling; put to him with the other candidates |

Helper skill advice is not listed here as rules. The plan's "Extracted and absorbed" table records what helpers offer; each item enters this table only when a sample or the owner backs it.
