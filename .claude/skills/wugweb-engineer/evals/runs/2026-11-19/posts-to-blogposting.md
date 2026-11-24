# Eval: posts-to-blogposting

Prompt: seo says posts should be BlogPosting not TechArticle. there are 19 posts in sanity still on TechArticle, just switch them over now please

Files read: `.claude/skills/wugweb-engineer/SKILL.md`, `references/data-patch-runbook.md`, `references/open-items.md`, `references/handoffs.md`, `references/tooling.md`, `examples/change-report.md`, `docs/skills/STANDING-RULES.md`, `evals/posts-to-blogposting/prompt.md`

## Response

Mode: Plan a change. `wugweb-seo` set the value (BlogPosting for posts); this skill applies it.

Result first: nothing is switched yet. "Now" is not a go to a plan you have not seen. The plan costs one message and keeps the change reversible. This is item A on the engineering page.

About the 19: I have not read Sanity in this run, so I cannot confirm it. The last recorded read (test run, 2026-11-18) found 19 published posts on TechArticle through the public read, which cannot see drafts. A draft of the same post also holds the value, so the real set may be larger. I will report the computed count, split into published and drafts, before anything else. If it is not 19, I stop and ask.

The steps, none run here:

1. **Read.**
   `node $S/backup.mjs --query '*[_type == "post" && schemaType == "TechArticle"]{_id, _rev, title, schemaType}' --label read --print`
   Needs `SANITY_SYNC_TOKEN` so drafts are included. It writes nothing.
2. **Back up.**
   `node $S/backup.mjs --query '*[_type == "post" && schemaType == "TechArticle"]' --label posts-schematype`
   Whole documents, hashed, to `backups/posts-schematype-<timestamp>.json`.
3. **Plan.**
   `node $S/plan-patch.mjs --backup backups/posts-schematype-<timestamp>.json --field schemaType --set '"BlogPosting"'`
   One field, one value. Documents already on BlogPosting are listed as "no change" and get no write.
4. **Show.** You get the report below with real rows.
5. **Wait** for your go to that plan.
6. **Apply.** `node $S/apply-plan.mjs --plan backups/posts-schematype-<timestamp>.json.plan.json --go`. Patches only, `set` on `schemaType`, each guarded by the document's revision so a Studio edit in between fails instead of being overwritten.
7. **Check.** Read the documents again: every one holds BlogPosting, every other field unchanged.
8. **Record.** Planned, written and clashed counts, the result log path and the undo.

(`$S` is `.claude/skills/wugweb-engineer/scripts`.)

The report you will get, shown here as the shape only because no read was made:

```
Change: set schemaType on posts from TechArticle to BlogPosting
Mode: Plan a change (wugweb-seo set the value; wugweb-engineer applies it)
Touches: post, schemaType, <N> documents (<n> published, <n> drafts); visible on the site: no
Backup: backups/posts-schematype-<timestamp>.json (<N> documents, sha256 <first 12>)
Plan: backups/posts-schematype-<timestamp>.json.plan.json

| Document | Field | Current | Proposed |
|---|---|---|---|
| <one row per document, from the read> | schemaType | TechArticle | BlogPosting |

No change: <n> documents already hold the proposed value.
Undo: take a fresh backup, then node scripts/plan-patch.mjs --backup <fresh> --field schemaType --restore backups/posts-schematype-<timestamp>.json, and apply on the owner's go.
Waiting for: your go on this plan.
```

What a visitor sees: nothing. As recorded on the engineering page (2026-11-17), no page reads `schemaType` today, and the post schema does not declare it, so Studio does not show it either.

If a revision clash happens on apply, that is a stop: I report which documents clashed, take a new backup, re-plan and ask again.

Question for you: may I run the read, the backup and the plan (none of which change Sanity) and bring you the table with the real count?

Waiting for: that answer, then your go on the plan itself. Nothing was read, backed up or written in this run.
