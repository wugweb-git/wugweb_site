# Example change report

Built from `posts-schematype.backup.json` in this folder, which holds invented documents. The shape is the one SKILL.md sets; the values are not real.

```
Change: set schemaType on posts from TechArticle to BlogPosting
Mode: Plan a change (wugweb-seo set the value; wugweb-engineer applies it)
Touches: post, schemaType, 2 documents (1 published, 1 draft); visible on the site: no
Backup: examples/posts-schematype.backup.json (3 documents)
Plan: examples/posts-schematype.backup.json.plan.json

| Document | Field | Current | Proposed |
|---|---|---|---|
| post-example-one | schemaType | TechArticle | BlogPosting |
| drafts.post-example-one | schemaType | TechArticle | BlogPosting |

No change: 1 document already holds the proposed value.
Undo: node scripts/plan-patch.mjs --backup <fresh backup> --field schemaType --restore examples/posts-schematype.backup.json, then apply on the owner's go.
Waiting for: your go on this plan.
```

The apply dry run on that plan prints the two guarded patches it would send and sends nothing:

```
2 patch mutations on field schemaType; 1 document needs no change
{"patch":{"id":"post-example-one","ifRevisionID":"rEXAMPLE1","set":{"schemaType":"BlogPosting"}}}
{"patch":{"id":"drafts.post-example-one","ifRevisionID":"rEXAMPLE2","set":{"schemaType":"BlogPosting"}}}
dry run: nothing sent. Add --go only after the owner says go to this plan.
```
