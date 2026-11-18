# Data-patch runbook

The full procedure behind "The data-change procedure" in SKILL.md, with commands. Run every command from the site repo root. The scripts live in `.claude/skills/wugweb-engineer/scripts/`; the examples shorten that to `$S`.

```
S=.claude/skills/wugweb-engineer/scripts
```

## Step 1: read

Write the GROQ query that selects exactly the documents to change, drafts included:

```
*[_type == "post" && schemaType == "TechArticle"]{_id, _rev, title, schemaType}
```

- Select by `_type` and the condition, never by a hand-typed list of ids when a condition exists.
- Include drafts: a token read returns `drafts.*` documents; keep them in the set.
- Report the count, split into published and drafts.

To read without writing a backup, run `node $S/backup.mjs --query '<groq>' --label read --print`. `--print` writes nothing and prints the count and the first rows.

## Step 2: back up

```
node $S/backup.mjs --query '*[_type == "post" && schemaType == "TechArticle"]' --label posts-schematype
```

- Back up whole documents (no projection), so the undo can restore any field.
- Output: `backups/posts-schematype-<UTC timestamp>.json` holding `takenAt`, `query`, `count`, `sha256` of the `docs` array, and `docs`.
- The script refuses to overwrite and refuses `contactSubmission` unless `--out` points outside the repo.

## Step 3: plan

```
node $S/plan-patch.mjs --backup backups/posts-schematype-<ts>.json --field schemaType --set '"BlogPosting"'
```

- `--set` takes a JSON value: `'"text"'`, `'true'`, `'12'`, `'{"_type":"slug","current":"x"}'`.
- `--unset` removes the field instead. Use it only on the owner's explicit word; stored values stay by default.
- `--values <file.json>` gives each document its own value: `{ "service-brand": [ ... ], "service-growth": [ ... ] }`. Use it when the new value differs per document. A draft takes its published id's value; a document with no entry is left alone and listed as "no value given". Objects in an array without `_key` get a stable key made from their content.
- Sanity does not run the schema's validation rules on API writes; they run only in Studio (Sanity docs, "Creating and updating documents with @sanity/client"). So check the proposed value against the field's type in `sanity/schemaTypes/` by hand before showing the plan: right type, required parts present, list options respected.
- The values file is input, not something this skill writes. Visible wording in it (questions, answers, titles) comes from `wugweb-work` after the owner's approval; this skill only checks its shape against the schema.
- Output: `<backup>.plan.json` and a printed current → proposed table.
- The plan holds, per document: `_id`, the `_rev` from the backup, the field, current and proposed values. Documents already holding the value are marked `noChange` and get no mutation.

## Step 4: show

Use the change report format in SKILL.md. Always state:

- whether a visitor will see the change, and on which pages;
- the backup path and its hash prefix;
- the undo in one line.

## Step 5: wait

The go must name or clearly point at this plan. If the owner changes the value or the set, go back to step 3 (or step 1 if the set changed) and show again.

## Step 6: apply

```
node $S/apply-plan.mjs --plan backups/posts-schematype-<ts>.json.plan.json --go
```

What the script does:

1. Reads the plan and its backup, recomputes the backup hash, and stops if it differs.
2. Builds one `patch` mutation per changed document: `{ id, ifRevisionID, set: { field: value } }` or `unset: [field]`.
3. Refuses to run if any mutation is not a patch, names another field, or the plan has no `--go`.
4. Sends the mutations in batches of 50 as transactions. A revision clash fails that batch only; the script reports it and carries on with the next batch.
5. Writes `<plan>.result.json`: written ids, clashed ids, transaction ids, time.

Without `--go` it prints the mutations it would send and exits. That is the dry run of the apply step.

## Step 7: check

```
node $S/backup.mjs --query '*[_id in $ids]' --ids-from <plan>.result.json --label check --print
```

- Every written document holds the proposed value.
- Compare every other field with the backup; report any difference.
- If the field shows on a page, request that page twice on staging; both must return 200.

## Step 8: record

Tell the owner: counts planned, written and clashed; the result log path; the undo command. Add a line to this skill's `CHANGELOG.md` only when the skill itself changed, not for data runs.

## Undo

The undo restores the backed-up values of one field.

```
node $S/backup.mjs --query '*[_id in $ids]' --ids-from <plan>.result.json --label pre-undo
node $S/plan-patch.mjs --backup backups/pre-undo-<ts>.json --restore backups/posts-schematype-<ts>.json --field schemaType
node $S/apply-plan.mjs --plan backups/pre-undo-<ts>.json.plan.json --go
```

- The fresh backup gives current revisions, so the revision guard still works.
- Where the old backup has no value for the field, the undo plan unsets it.
- An undo is a change: show its table and wait for the go, like any other.

## Worked example: item A on the engineering page

Change: the stored `schemaType` on posts from `TechArticle` to `BlogPosting`. The engineering page records 19 posts; recount in step 1 before trusting that number. `wugweb-seo` sets `BlogPosting` for posts; this skill applies it. No visible change: no page reads `schemaType` today (engineering page, 2026-11-17). Backup, plan, show, wait, apply, check, record, exactly as above.

## When to stop

- The count in step 1 differs from the number the owner or another skill gave: report both and ask.
- The token is missing or rejected.
- The plan would touch more than one type, or more than one field.
- Anything in the plan is a create, delete or replace.
