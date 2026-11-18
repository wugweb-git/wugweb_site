# AI models per skill

One home for which AI models each Wugweb skill uses and under which
environment-variable name. The standard that names, places and handles
the keys is [`SECRETS.md`](SECRETS.md). This file names the models
each skill calls and nothing else.

Two rules sit above every line below:

- Right now we build the skills; we are not running them on real work
  yet. Entries marked "planned" are what a sibling script will read on
  the day it runs, not today.
- Pinned free only. Every model name must end `:free` so OpenRouter
  cannot fall back to a paid route. Owner's rule, 2026-11-19: no key
  rotation, never.

## Shared environment variables

| Name | Shape | Default for the Wugweb Skill System |
|---|---|---|
| `OPENROUTER_API_KEY` | `<PROVIDER>_API_KEY` | Owner's key; never in the repo |
| `OPENROUTER_MODEL` | Model name, pinned, ends `:free` | `nvidia/nemotron-3.5-lightning:free` |
| `OPENROUTER_VISION_MODEL` | Model name, pinned, ends `:free` | `nvidia/nemotron-3.5-super-vl:free` |

The two model names are suggested defaults for a first live run. The
owner changes either in `.env` (local) or the runtime store (deployed)
without editing any skill or script. A script that needs another free
model may override with a sibling name such as `OPENROUTER_LONG_MODEL`,
same shape, same `:free` suffix.

## Per skill

| Skill | Text use | Vision use | Env vars read | Status |
|---|---|---|---|---|
| wugweb-work | Audit grader before the publish gate; voice and dash checks on draft bodies | Look mode on every screen and video poster in a case study's R2 folder | `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_VISION_MODEL` | Three helper scripts live at `scripts/openrouter-chat.mjs`, `scripts/openrouter-vision.mjs`, `scripts/openrouter-audit-case.mjs`. Plumbing ready; not invoked. |
| wugweb-brand-os | Short checks on claim strings | "Is this artwork on brand" check on a proposed cover or visual | `OPENROUTER_API_KEY`, `OPENROUTER_VISION_MODEL` | Planned. No sibling script yet. |
| wugweb-voice | Voice check on any visible Wugweb copy at scale | None | `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` | Planned. No sibling script yet. |
| wugweb-kits | None | Layout and spacing checks on screenshots; token hygiene flags from a rendered page | `OPENROUTER_API_KEY`, `OPENROUTER_VISION_MODEL` | Planned. No sibling script yet. |
| wugweb-seo | Keyword drafts, schema drafts, meta description drafts | None | `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` | Planned. No sibling script yet. |
| wugweb-strategy | Light use: brief polish, calendar description drafts | None | `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` | Planned. No sibling script yet. |

A planned entry commits to a name and a shape, not to a timeline. Each
sibling script is built on the owner's go, not before.

## What never calls an AI model from a sibling script

- The publish gate. A human reads the diff and approves.
- The Notion write. The owner approves the exact change, with a backup.
- The Sanity write. Same rule.
- Any media step: no upload, no local copy, no crop, no re-encode. See
  the owner's standing rules.

## Where this fits

`SECRETS.md` names, places and handles the keys. This file names the
models. Each sibling skill's own ops or skill-map reference points
here when it is time to read the env vars; until then, the pointer
below is enough.

Pointer line to paste into a sibling skill's nearest reference when a
first script lands:

```
AI models: see docs/skills/AI-MODELS.md. This skill reads
OPENROUTER_API_KEY and <OPENROUTER_MODEL | OPENROUTER_VISION_MODEL>
from the environment; no key in the repo; paid routes blocked.
```
