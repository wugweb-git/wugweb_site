# Eval results: wugweb-engineer 0.3.2, 2026-11-19

## Conditions

Dry run. The runner had no access to Notion, Sanity, R2 or the live site, and no script that writes was allowed. The answers were graded by a separate model run that did not write them. Each expectation was judged only against the written answer and the case's grader files. Repo facts that an answer cited (file names, field names, recorded counts and dates) were checked against the repo to look for invented data.

## Results by case

| Case | Blind | Passed | Failed | Not gradable |
| --- | --- | --- | --- | --- |
| delete-unclaimed-r2-folders | yes | 4 | 0 | 0 |
| faqs-field-on-posts | yes | 4 | 0 | 0 |
| notion-sync-401 | yes | 4 | 0 | 0 |
| posts-to-blogposting | yes | 6 | 0 | 0 |
| service-faqs-from-review | yes | 5 | 0 | 0 |
| undeclared-case-study-fields | yes | 4 | 0 | 0 |
| routing-check | no | 20 | 0 | 0 |

## Totals

- Expectations: 47
- Passed: 47
- Failed: 0
- Not gradable: 0
- Cases passed in full: 7 of 7

## Failures

None. No expectation failed.

## Invented data

- routing-check: the count line says wugweb-seo received 4 prompts. The answer's own table shows 3 (prompts 11, 19 and 20), and the listed counts add up to 11 where the answer states 10. A wrong count, not covered by any expectation.
- Nothing else found. The file names, field names, script flags, item letters, the 19 posts recorded on 2026-11-18, the 401 recorded on 2026-11-17, the 56 declared fields and the 15 undeclared keys with their counts all match the repo or the skill's own references, and each recorded figure is dated and marked as not re-read.

## Notes

- routing-check was not answered blind. The file holds the expected skill beside each prompt, so its 20 passes are weak evidence.
- notion-sync-401: the 401 comes from the recorded state of 2026-11-17, not a fresh test. The answer says so.
- service-faqs-from-review: the case's expected outcome asks the answer to read FAQ-REVIEW.md. The answer says it did not read the review's rows and relied on the skill's open items; it also leaves out the 5 rows on /faq. No grader file covers either point, so they are not scored.
- posts-to-blogposting and delete-unclaimed-r2-folders: the report tables are shapes with no real rows, because no Sanity or R2 read was possible.
- No expectation in these cases needed live data to judge, so none is marked not gradable.
