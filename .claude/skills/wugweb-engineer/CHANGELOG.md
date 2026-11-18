# Changelog

## 0.3.1 (2026-11-19)

- Registered on the owner's word "update notion and commit": row 7 in the Notion registry, a row in the responsibility matrix, and its own Notion page. The wugweb-web-engineering page now points here, and its rotation lines follow the owner's rule "no key rotation, never".
- Status lines in `SKILL.md`, `README.md` and `metadata.json` say so. The skill folder, `docs/skills/wugweb-engineer/PLAN.md` and the `docs/skills/AI-MODELS.md` line are committed in the repo. No rule or script changed.

## 0.3.0 (2026-11-19)

- Renamed from `wugweb-data` to `wugweb-engineer` on the owner's word. Folder, `name:` line, exports (`export/wugweb-engineer.md`), Cursor rule (`adapters/cursor/wugweb-engineer.mdc`), Codex settings, script paths and test tags all carry the new name. The entries below keep the old name as written at the time.
- Scope is unchanged: Sanity and Notion data, the Sanity schema, the sync scripts, backups and undo. Deploy, build and git still stay in the repo's `AGENTS.md`.
- Shipped as `wugweb-engineer.skill`, `wugweb-engineer.md` (the `SKILL.md`) and `wugweb-engineer.zip` (everything else).

## 0.2.3 (2026-11-19)

- Rechecked against main `6e290b0`. The case-study schema now declares six of the fields that were stored but undeclared; a live read of the 44 published case studies finds 15 left (was 21). `references/open-items.md` and `references/schema-change.md` carry the new count.
- `scripts/check-case-page.mjs` (new on main, `wugweb-work`'s publish gate check) added to the script table: 55 scripts.
- Routing check, the same stand-in for the app trigger test that `wugweb-brand-os` used: 19 of 20, recorded in `evals/routing-check.json`. All 10 data prompts routed here and no near miss did; the one mismatch went from `wugweb-work` to `wugweb-voice`.
- Shipped as `wugweb-data.skill` (to install), `wugweb-data.md` (this skill's `SKILL.md`, named after the skill) and `wugweb-data.zip` (everything else).

## 0.2.2 (2026-11-19)

- Shipped like the siblings, as three files named after the skill: `wugweb-data.skill` (to install; leaves out `evals/`), `wugweb-data.zip` (the whole skill with its tests, the plan, the audit and the test review pages) and `wugweb-data.md` (the single-file copy).
- `validate.mjs` skips the test-case checks when `evals/` is absent, so the installed package validates clean.
- SKILL.md counted five test cases; there are six.

## 0.2.1 (2026-11-19)

- Script status rechecked against main `8e1d56d`: 54 scripts. Added `check-case-css.mjs` (read allowed) and the three OpenRouter helpers (wugweb-work’s; never run from this skill, as no data work goes through a model).
- README shows the file count against the siblings.

## 0.2.0 (2026-11-19)

- Brought into line with the siblings' package: `README.md`, `metadata.json`, `license: MIT`, generated `adapters/cursor/wugweb-data.mdc`, `adapters/chatgpt/instructions.md` and `agents/openai.yaml`, and `build.mjs --check`.
- Follows `docs/skills/SECRETS.md` (on main as of `b4ba0a4`): the scripts read `SANITY_SYNC_TOKEN` only and exit 2 naming it when missing; the references name `NOTION_API_TOKEN` and record that the site's sync scripts still read the old names. No key rotation, ever (owner, 2026-11-19): the rotation wording is gone.
- `plan-patch.mjs --values` gives each document its own value, for item G (service FAQs); array objects without `_key` get a stable one.
- New `references/open-items.md`: the engineering page's data and schema items and how each runs here, plus the findings from building this skill.
- Runbook: Sanity does not validate API writes against the schema, so the plan checks the value's shape by hand.
- `examples/`: invented backups, two plans and a change report, checked by the tests.
- Sixth test case, the service FAQs fill. Its runs found that service pages switch wholesale to the Sanity list (`preferArr`), now written into item G in `references/open-items.md`.
- `validate.mjs` and `test.mjs` skip the repo-only checks cleanly when the folder sits outside the site repo.
- Rebuilt the exports against the current standing rules, which gained an "API keys and secrets" section.

## 0.1.1 (2026-11-19)

- schema-fields.mjs resolves fields declared through a helper (such as `ownerField`) and skips helper files as types. Found in the first test round, where `owner` was wrongly reported as undeclared.
- schema-change.md records the live count of 21 undeclared case-study fields.

## 0.1.0 (2026-11-19)

- First build, on the owner's word "create skill" after the 2026-11-18 audit set out option b. Not on main and not in the registry yet.
- SKILL.md with the data-change procedure, nine modes and the change report format.
- References: data-patch runbook, schema change, sync scripts, script status (50 scripts, checked against main `1271b2b`), media read, handoffs, tooling.
- Scripts: backup, plan-patch, apply-plan, schema-fields, scan-scripts, build, validate, test. Plain Node, no packages.
- Five test cases in `evals/`.
