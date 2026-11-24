# Eval: service-faqs-from-review

Prompt: the faq review is done, put the approved service FAQs into sanity so the service pages read them from the cms

Files read: `.claude/skills/wugweb-engineer/SKILL.md`, `references/data-patch-runbook.md`, `references/open-items.md`, `references/handoffs.md`, `references/tooling.md`, `docs/skills/STANDING-RULES.md`, `sanity/schemaTypes/service.ts` (the faqs field), `evals/service-faqs-from-review/prompt.md`. `docs/skills/wugweb-strategy/FAQ-REVIEW.md` was confirmed to exist and searched for one word only; its rows were not read.

## Response

Mode: Plan a change. Nothing is written yet; one choice of yours comes first.

Result first: I can load the approved FAQs into `service.faqs`, one plan for the six service documents, but not before you decide what happens to five rows. This is item G on the engineering page.

**Why the choice matters.** A service page shows the Sanity `faqs` list instead of the typed list in the code as soon as that service holds any FAQs in Sanity. So if I load only the rows marked keep, the five rows marked "answer again" (Strategy 6, Brand 3, Experience 9, Growth 3, Growth 6, as recorded in this skill's open items) drop off the live pages. The standing ruling is that they stay live while they are reviewed.

**Question 1, yours to answer first.** For those five rows:

- wait, and load all six services once the five are answered again; or
- load the five as they stand now, beside the kept rows; or
- let them drop from the pages.

What happens after your answer, none of it run here:

1. **Wording.** This skill writes no copy. `wugweb-work` turns the chosen rows of `docs/skills/wugweb-strategy/FAQ-REVIEW.md` into a values file: one entry per service document, each a list of `q` and `a`. You approve that wording. One row is recorded as still open: Brand 2 needs "always" softened. Rows marked "owner to confirm" need your facts before they go in.
2. **Read.** Query the service documents, published and drafts, and report the count and which six back the service pages, with what each holds in `faqs` now. I have not read them in this run and will not guess their ids.
3. **Back up.** `scripts/backup.mjs` on those documents, whole and hashed, to `backups/service-faqs-<timestamp>.json`.
4. **Shape check.** Sanity does not validate API writes, so I check the values file by hand against the schema: `faqs` is an array of objects, each with `q` (string) and `a` (text). I check shape only, not wording.
5. **Plan.** `scripts/plan-patch.mjs --backup <backup> --field faqs --values <values file>`. One field. A draft takes its published document's value. A service with no entry is left alone and listed as "no value given".
6. **Show.** The change report: each document, current → proposed, the count, the backup path and hash.
7. **Wait** for your go to that plan.
8. **Apply, check, record.** Patches only, revision-guarded. Then read the documents again, and request each of the six service pages twice on staging, 200 both times.

What a visitor sees: yes, this one is visible, on all six service pages. From the moment a service holds FAQs in Sanity, the page shows that list and no longer the typed one.

Undo: a fresh backup, then `plan-patch.mjs --backup <fresh> --field faqs --restore <the first backup>`, applied on your go. Where a service had no `faqs` before, the undo unsets the field and the page goes back to the typed list.

Questions for you:

1. The five "answer again" rows: wait, load as they stand, or let them drop?
2. Has `wugweb-work` produced the values file from the review, and have you approved its wording, including the Brand 2 fix? If not, that is the next step and it is not mine.
3. Are any "owner to confirm" facts still open?

Waiting for: your answer to question 1. Nothing was read from Sanity, backed up or written in this run.
