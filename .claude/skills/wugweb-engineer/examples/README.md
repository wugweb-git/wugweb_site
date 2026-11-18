# Examples

Every document in this folder is invented. Nothing here was read from or written to Sanity.

| File | What it shows |
|---|---|
| `posts-schematype.backup.json` | A backup in the shape `scripts/backup.mjs` writes: query, count, hash, whole documents |
| `posts-schematype.backup.json.plan.json` | A one-value plan made from it with `--set '"BlogPosting"'`: one published post, its draft, and one post already right |
| `service-faqs.backup.json` | A backup of one service document with no `faqs` |
| `service-faqs.values.json` | A per-document values file, the shape item G uses |
| `service-faqs.backup.json.plan.json` | The plan made with `--values`; note the `_key` added to the array item |
| `change-report.md` | The change report shown to the owner, and the apply dry run |

Run them again from the skill folder:

```bash
cd examples
node ../scripts/plan-patch.mjs --backup posts-schematype.backup.json --field schemaType --set '"BlogPosting"'
node ../scripts/apply-plan.mjs --plan posts-schematype.backup.json.plan.json
```

`plan-patch.mjs` refuses to overwrite a plan, so run them on a copy of this folder.
