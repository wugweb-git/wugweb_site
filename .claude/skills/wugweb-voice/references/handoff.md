# Handoff contract

Matches the matrix row on the Wugweb Skill Management System registry and the wugweb-voice Notion page.

## Links

| Direction | Skill | What |
| --- | --- | --- |
| Gives to | `wugweb-work` | Voice rules, mode settings, text in voice, voice-check results with confidence |
| Gives to | `wugweb-brand-os` | The voice rules it points to |
| Takes from | `wugweb-brand-os` | Identity, positioning, audience |
| Reads, read only | `wugweb-strategy` | `references/topics-and-calendar.md` in `wugweb-strategy`, its signal log of reader words. Words found there are vocabulary candidates labelled by source: never rules, never the owner's voice (his ruling, relayed 2026-11-17) |
| Takes from | `wugweb-work` | Draft text with its form, mode, and the audience and purpose from the brief |

No other link with `wugweb-strategy`, and none with `wugweb-seo` or `wugweb-kits`. If either of the last two needs visible wording, it asks `wugweb-work`, which writes it and runs the voice check. The check happens in one place only.

No link with `wugweb-engineer`, the seventh skill, which owns changes to Sanity and Notion data, schema edits and the sync scripts. It writes no visible copy. A field label or help text a visitor never sees is not voice work; a field value a visitor sees comes from `wugweb-work`.

## Request

| Field | Required | Notes |
| --- | --- | --- |
| text or brief | Yes | The draft, or the brief to write from |
| form | Yes | As named by `wugweb-work` |
| mode | Yes | A key from `modes.md` |
| audience, purpose | If known | From the `wugweb-strategy` brief, passed through `wugweb-work` |
| sources | If the text has facts | For every number, quote and named fact |
| client terms | If any | Quotes and on-screen terms to keep unchanged |

## Response

| Field | Notes |
| --- | --- |
| summary | 40 to 60 words: the result, the main findings and the confidence, for a caller that shows one short line |
| result | pass, needs revision, or fail |
| text | The text in voice, or proposed wording as current → proposed |
| rules applied | Each with its ID and label |
| confidence | high, medium or low, with the reason |
| untraced | Every number, quote or fact with no source |
| not observed | What the check could not see |

## Boundaries

- The response is a proposal. `wugweb-work` decides what ships; the owner approves.
- This skill never changes format, length, evidence, SEO or positioning rules.
- Client quotes and on-screen terms are returned unchanged.
- Translated copy is out of scope for now. It waits until the English voice is calibrated.
- Working preferences (how the owner wants replies to him) stay in project instructions and memory, never in this skill.
- Helper skills return proposals only. Only a Wugweb skill writes anything, and only after the owner's approval.
