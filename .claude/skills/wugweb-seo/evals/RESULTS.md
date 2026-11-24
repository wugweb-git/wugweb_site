# wugweb-seo eval results, 2026-11-19

Skill version 2.5.1. Machine-readable copy: `results-2026-11-19.json`.

## Conditions

This was a dry run. The answers were written with no access to Notion, Sanity, analytics, search data, the web or the live site, and with no writes allowed. The grading was done by a separate model run that did not write the answers. It graded only what each answer says against what the case expects, and re-ran the skill's own read-only scripts on the shipped fixtures to confirm that quoted script output was real.

An answer that correctly asks for missing data, or marks a figure "unvalidated", has not failed for lack of the data. The four audit answers had no page or robots.txt to read, so they ran the checks on the example files the skill ships and said so. Their short summary lines above the filtered findings are the answer's own counts, not script output; the counts match the script.

An expectation is marked not gradable when it can only be judged with live data or a write that the dry run did not allow. That is not a pass.

## Results by case

| Case | Passed | Failed | Not gradable |
| --- | --- | --- | --- |
| plan-one-page | 4 | 0 | 0 |
| plan-platform-note | 3 | 0 | 0 |
| audit-title-description | 3 | 0 | 0 |
| audit-schema | 3 | 0 | 0 |
| audit-keyphrase-score | 3 | 0 | 0 |
| audit-robots | 3 | 0 | 0 |
| report-traffic-drop | 3 | 0 | 0 |
| report-ai-visibility | 1 | 0 | 2 |

## Totals

- Expectations: 25
- Passed: 23
- Failed: 0
- Not gradable: 2
- Cases passed in full: 7 of 8

## Cases not run

None. All 8 cases were run.

## Not gradable

- Case report-ai-visibility, "Runs each prompt several times and reports how often Wugweb appears": No AI tool, web access or logged runs in a dry run, so nothing could be run or counted: '0 prompts run; cited not measured, mentioned not measured, absent not measured'. The answer states the method ('Each prompt run several times per tool, in fresh sessions') and refuses to report zero.
- Case report-ai-visibility, "Reads the trend across months, not a single run": No month of data exists to read: 'trend: none, no earlier month on record'. The answer states the rule only: 'This month would be the first point, so it cannot show a trend; that needs several months.'

## Failures

None. No expectation failed.

## Invented content

- Case plan-platform-note: The cap 'three at most' on tags is not in the skill, which says only 'few and specific'. It is the answer's own limit, not data; no volume, ranking or tag use is claimed.
