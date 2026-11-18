# Schema changes and the schema check

## What a schema change is

The files in `sanity/schemaTypes/` tell Studio which fields to show and validate. Changing them changes Studio only. Stored values stay in every document whatever the schema says: a removed field's data remains, and a field that was never declared can still hold data (the engineering page counted 22 such fields on case studies on 2026-11-17; live reads of the 44 published case studies found 21 on 2026-11-18 and 15 on 2026-11-19, after main `6e290b0` declared six of them; see `references/open-items.md`).

So keep two things apart:

- **Schema change:** edit a `.ts` file. Reversible with git.
- **Data change:** patch documents. Follows `references/data-patch-runbook.md`.

A request such as "remove the faqs field" is a schema change only. Unsetting the stored values is a second, separate data change that needs its own go.

## Procedure

1. **Read the ruling.** Which fields a type has is decided by `wugweb-strategy`; which schema types and markup a page emits is decided by `wugweb-seo`. Quote the ruling and its date in the change report. No ruling: say "not decided" and name who decides.
2. **Branch.** One branch per change, named for it.
3. **Edit.** Change the one file. Keep field names, ids and option values stable unless the change is the rename.
4. **Build and test.** `npm run build` at the repo root, then `npm run test:sanity` (the root `package.json` has no `test` script; its tests are the `test:*` scripts). In `sanity/`, run `npm run build`: its `package.json` has no type-check script, and the Studio build is the check that the schema compiles. All must pass.
5. **Look.** Run the local Studio and open one document of the type. Confirm the field shows, hides or validates as intended.
6. **Show.** Current → proposed for the lines changed, the build and test result, and what the owner will see in Studio.
7. **Merge on go.** The owner says go; merge to main by the site-code steps in the repo's `AGENTS.md`.
8. **Deploy on go.** Studio deploy is the owner's step. Say so and stop.

## Never

- Never remove `blockContent` from the types array in `sanity/schemaTypes/index.ts`. Every document using Portable Text breaks with "Unknown type".
- Never rename a field and patch its data in the same step.
- Never add an option the rules forbid. Example: `FAQPage` is offered in `singletonPage.schemaType` options, against the ruling that no page emits FAQPage; removing it is item B on the engineering page, waiting for the owner's go.
- Never deploy the schema or Studio yourself.

## The schema check

`scripts/schema-fields.mjs` compares declared fields with stored keys.

```
node $S/schema-fields.mjs --schema sanity/schemaTypes
node $S/schema-fields.mjs --schema sanity/schemaTypes --type caseStudy --data backups/<case-studies backup>.json
```

- Without `--data`, it lists each type and its declared top-level field names, read from the `.ts` files.
- With `--data`, it lists keys that documents hold but the schema does not declare, with how many documents hold each, and declared fields no document fills.
- System keys (`_id`, `_type`, `_rev`, `_createdAt`, `_updatedAt`, `_key`, `_system`) are ignored.
- The parse is textual: it reads `name: '<field>'` inside `fields: [...]`. A spread of a helper exported as `export const x = defineField({ name: ... })` in the same folder is resolved. Anything else it cannot read is counted as "unresolved"; check those elements by hand before calling a stored key undeclared.

Report undeclared fields as findings. Declaring them, ignoring them or unsetting them is a decision for the skill that owns the field (usually `wugweb-strategy`, with `wugweb-seo` for SEO fields) and then the owner.
