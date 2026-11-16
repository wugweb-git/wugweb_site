# Calibration corpus

Version 0.2.0. The ledger of writing and speech the owner has supplied or named for calibrating the voice. Status: empty. No samples supplied yet.

Rule: only samples the owner supplies or names. Nothing is searched for in email, Drive, Notion or meeting transcripts unless he names the item. Private text is not copied here; the Location column says where the original lives. A short excerpt only with his yes.

This file is left out of the single-file export.

## Samples

`scripts/check.mjs` counts rows per mode that are "in use", "unedited" and not held back, to set confidence. Keep the table shape and column order.

| ID | What | Context | Mode | Date written | Supplied by owner on | Location | Status | Notes | Words | Edit status | Others' words removed | Held back | Used in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Field meanings:

- **ID**: S-001, S-002 and so on. Never reused.
- **What**: email, note, draft, post, transcript, or an edit he made to a draft.
- **Context**: quick chat, formal, spoken, public post.
- **Mode**: a key from `modes.md`.
- **Supplied by owner on**: the consent date.
- **Status**: `in use`, `left out (reason)`, or `removed on YYYY-MM-DD`.
- **Notes**: why left out (boilerplate, AI-written, outlier), and the original purpose of the piece.
- **Words**: word count of his own lines only.
- **Edit status**: `unedited`, `edited by others` or `AI-assisted`. Only unedited samples count towards confidence or support a rule on their own.
- **Others' words removed**: `none present`, or what was taken out (a quoted reply, other speakers' turns) and whether the raw file was deleted.
- **Held back**: `yes` for unseen text kept for the blind test; never used for rules or examples.
- **Used in**: every rule ID and example that rests on this sample, so removing it shows what to rebuild.

## Owner edits and rulings

Edits he makes to drafted copy, and his rulings on candidates. Each becomes a confirmed rule.

| ID | Date | What he changed or ruled | Rule it confirms | Source |
| --- | --- | --- | --- | --- |
| R-001 | 2026-11-16 | "wugweb and vedanshu is same" | V-06 one voice | wugweb-voice session |
| R-002 | 2026-11-16 | The skill lives in both places: the site repo `.claude/skills/wugweb-voice/` as the source, and a copy in `~/.claude/skills/wugweb-voice/` | Not a voice rule; install location | wugweb-voice session |
| R-003 | 2026-11-16 | Helpers: the system's eight plus the extras | Not a voice rule; see `tooling.md` | wugweb-voice session |
| R-004 | 2026-11-16 | Working preferences stay in project instructions and Claude memory, not in this skill | Scope | wugweb-voice session |
| R-005 | 2026-11-16 | Translated copy is out of scope for now | Scope; see `modes.md` | wugweb-voice session |

## Not calibration

| Source | Why |
| --- | --- |
| His chat messages in working sessions | Fast and full of typos |
| The working-style memory note | How he wants replies, not how he writes |
| Notion profile pages (2023, Grok, Gemini) | Stale background; pending his confirmation |
| Identity Prism pages and the `memory` repo | A related product; background only |

## Removing a sample

Set its status to `removed on YYYY-MM-DD`. Then rebuild and re-test every rule and example in its "Used in" column; drop any rule that falls below the observed bar. He may also withdraw part of a sample.

## Other people's words

Email threads and transcripts hold other people's personal data. Keep only his own lines, take out names where they are not needed, and record the step in the row. Under UK and EU data protection guidance the likely lawful basis is legitimate interests, which has to be tested, not assumed. Not legal advice: a lawyer should confirm the basis for client threads and transcripts.
