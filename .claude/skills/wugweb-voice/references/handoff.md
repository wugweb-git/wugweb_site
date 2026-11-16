# Handoff contract

Version 0.2.0. Matches the matrix row on the Wugweb Skill Management System registry and the wugweb-voice Notion page.

## Links

| Direction | Skill | What |
| --- | --- | --- |
| Gives to | `wugweb-work` | Voice rules, mode settings, text in voice, voice-check results with confidence |
| Gives to | `wugweb-brand-os` | The voice rules it points to |
| Takes from | `wugweb-brand-os` | Identity, positioning, audience |
| Takes from | `wugweb-work` | Draft text with its form, mode, and the audience and purpose from the brief |

No direct link with `wugweb-strategy`, `wugweb-seo` or `wugweb-kits`. If either of the last two needs visible wording, it asks `wugweb-work`, which writes it and runs the voice check. The check happens in one place only.

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
- Helper skills return proposals only. Only a Wugweb skill writes anything, and only after the owner's approval.
