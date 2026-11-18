# API keys and secrets: the standard

Applies to every skill in the Wugweb Skill System, every script in this
repo, and every chat about this work. This file names the shape, the
place and the handling. Each skill reads it and repeats none of it.

## One name per use

Every key or secret has one UPPER_SNAKE_CASE name that says the provider
and what it is. No aliases.

| Shape | Example |
|---|---|
| `<PROVIDER>_API_KEY` | `OPENROUTER_API_KEY`, `GROQ_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` |
| `<PROVIDER>_<PURPOSE>_TOKEN` | `SANITY_SYNC_TOKEN`, `NOTION_API_TOKEN`, `CLOUDFLARE_API_TOKEN` |
| `<APP>_<PURPOSE>_SECRET` | `NEON_SYNC_SECRET`, `PREVIEW_SECRET` |
| Model names, pinned | `GROQ_MODEL`, `OPENROUTER_MODEL`, `GEMINI_MODEL` |
| Database URL | `DATABASE_URL` |

A key that works against more than one provider gets the strict provider
name of where it lives, not a generic one.

## One place per environment

| Environment | Where the real value lives | Where the name is tracked |
|---|---|---|
| The repo | Not in the repo | `.env.example` (tracked), listing every name used, with a placeholder value |
| Local dev | `.env`, gitignored | `.env.example` |
| Cloudflare Pages runtime | `wrangler pages secret put <NAME>` or the dashboard | `wrangler.jsonc` references by name only |
| Hostinger apps | `hosting_nodejs_replace-environment-variables`; PHP from a config file outside the repo | Hostinger panel |
| A skill's scripts | `process.env.<NAME>` | The script's README or comment |
| A worker's `.env` for a long-running job | The deploy system's secret store, never the repo | The provider's dashboard |
| Catalogue of what each project uses | One Notion page per project (Animal Writes: "AI keys and models"; this site: this file plus `CLAUDE.md`) | The page itself |

A secret is never a value in code, a value in a committed file, a value
in a URL query string, or a value in a comment. A placeholder like
`OPENROUTER_API_KEY=sk-or-v1-REPLACE_ME` in `.env.example` is fine.

## Policy before balance

The paid-provider rule wins. A provider on the paid list is blocked at
the code level, whatever its balance. The present paid list is DeepSeek,
OpenAI, Moonshot, MiniMax, xAI, Anthropic. A free-tier Claude key via
Anthropic does not change that: the skill system uses Claude through
Claude Code, not through an API key in a script.

Blocked providers stay listed in the catalogue with their status; they
are not quietly deleted. The owner decides a delete.

Free-tier routing (OpenRouter and the like) pins one model name per
pinned use. An unpinned OpenRouter call can resolve to a paid route; the
owner's 2026-11-19 rule says it must never be billed.

## Handling a key in chat

Every skill in the Wugweb Skill System follows these rules when a key
or secret appears in a session, for any reason:

- Never echo the key back in a reply, even redacted.
- Never write the key to a file, a draft, a commit message or a comment.
- Never put the key in a request to a third party.
- Never store the key in memory beyond the session.
- The right action is to refuse the key and ask the owner to set it in
  the environment the script reads. What happens to a pasted key after
  that is the owner's call (owner's rule, 2026-11-19: no key rotation,
  never).

The same rules bind third-party helper skills that this system calls.

## Scripts that need a key

A script lives in a skill, is plain Node and no secret is a default.
The shape:

```
const key = process.env.OPENROUTER_API_KEY
if (!key) { console.error('Set OPENROUTER_API_KEY in your environment.'); process.exit(2) }
const model = process.env.OPENROUTER_MODEL
if (!model) { console.error('Set OPENROUTER_MODEL to a verified free model, e.g. nvidia/nemotron-3.5-lightning:free'); process.exit(2) }
```

No fallback model. No hardcoded key, even redacted. No echo of the key
in the script's output. A failure says what name is missing, not what
value it would have had.

## The catalogue

One Notion page per project tracks every key that project uses: provider,
purpose, used-by code paths, status, limits, last checked. The repo
keeps `.env.example` with every name used, placeholders only. Where the
two disagree, the catalogue wins.

On this site:

- `DATABASE_URL`, `SANITY_SYNC_TOKEN`, `NEON_SYNC_SECRET`, `PREVIEW_SECRET`
  are the Cloudflare Pages runtime secrets; `CLAUDE.md` names them.
- `NOTION_API_TOKEN` lives in the local `.env` for the sync scripts; it
  is not a Cloudflare secret because the sync runs from a workstation.
- Every other provider follows this document.

## Where this fits

This document is the one home for API keys and secret handling across
the Wugweb Skill System. The standing rules file points here. Every
skill that calls out has a line in its skill-map or ops reference that
names the environment variable, with no value.

Which AI models each sibling skill reads sits in
[`AI-MODELS.md`](AI-MODELS.md), the companion to this file. That file
names models; this file names keys.

If a skill ever hardcodes a key or echoes one back, that is a bug in
the skill and is fixed before the next commit.
