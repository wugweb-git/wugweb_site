# wugweb-voice eval results, 2026-11-19

Skill version 0.3.1. Machine-readable copy: `results-2026-11-19.json`.

## Conditions

This was a dry run. The answers were written with no access to Notion, Sanity, analytics, search data, the web or the live site, and with no writes allowed. The grading was done by a separate model run that did not write the answers. It graded only what each answer says against what the case expects, and re-ran the skill's own read-only scripts on the shipped fixtures to confirm that quoted script output was real.

The voice skill has no writing samples yet. By its own rule every voice result is "not calibrated" with low confidence. An answer that says so correctly has not failed for that.

An expectation is marked not gradable when it can only be judged with live data or a write that the dry run did not allow. That is not a pass.

## Results by case

| Case | Passed | Failed | Not gradable |
| --- | --- | --- | --- |
| 1 | 7 | 0 | 0 |
| 2 | 3 | 0 | 0 |
| 3 | 5 | 0 | 0 |
| 4 | 2 | 0 | 0 |
| 5 | 3 | 0 | 0 |
| 6 | 2 | 0 | 0 |
| 7 | 2 | 0 | 0 |
| 8 | 1 | 0 | 0 |
| 9 | 3 | 0 | 2 |

## Totals

- Expectations: 30
- Passed: 28
- Failed: 0
- Not gradable: 2
- Cases passed in full: 8 of 9

## Cases not run

Cases 10 to 14 were not run. Each has the status "waiting on samples": they need the owner's writing samples in the corpus, and none are on file.

| Case | Name | Status |
| --- | --- | --- |
| 10 | samples that disagree | waiting on samples |
| 11 | write in a mode | waiting on samples |
| 12 | clean a typo-heavy note | waiting on samples |
| 13 | blind comparison | waiting on samples |
| 14 | export parity | waiting on samples |

## Not gradable

- Case 9, "Adds a row to references/corpus.md with all fields, status 'in use'": Dry run with no writes, and the prompt carried '[text]' in place of the email, so no row could be added: 'Nothing has been recorded so far.' The answer does lay out the row it would add, with all 14 ledger fields and 'Status | in use'.
- Case 9, "Cleans typos before reading for voice": No email text was supplied (the prompt has the placeholder '[text]'), so there was nothing to clean. The answer states the step only: 'Typos are cleaned first. They are never copied as voice.'

## Failures

None. No expectation failed.

## Invented content

None found. No invented fact, number, ranking, quote or writing sample in any answer.
