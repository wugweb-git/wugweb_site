# Eval results: wugweb-kits 2.1.4, 2026-11-19

These cases are scripted: `node evals/run.mjs` runs each check against the repository and reports pass, fail or blocked. No model writes or grades an answer, there is no network call and nothing is written.

Result: 19 passed, 0 failed, 0 blocked, of 19 cases.

| Case | Result |
|---|---|
| validate passes | pass |
| AGENTS.md export is current | pass |
| self test passes | pass |
| doc and global.css agree (drift 0) | pass |
| inventory runs on src and reports, not blocks | pass |
| inventory --block exits 1 while warnings remain | pass |
| live /: labels, headings, alt, landmarks clean | pass |
| live /work: labels, headings, alt, landmarks clean | pass |
| live /blog: labels, headings, alt, landmarks clean | pass |
| live /services: labels, headings, alt, landmarks clean | pass |
| live /about: labels, headings, alt, landmarks clean | pass |
| live /contact-us: labels, headings, alt, landmarks clean | pass |
| live /faq: labels, headings, alt, landmarks clean | pass |
| live /footer/reviews: labels, headings, alt, landmarks clean | pass |
| live case study: every section has an id and a name (blocked if the page is not 200) | pass |
| contrast: live text #f4f4f4 on #191919 passes AA | pass |
| contrast: muted #bababa on #191919 passes AA | pass |
| no retired shell values live in global.css | pass |
| SKILL.md version matches metadata.json | pass |

What this does not test: whether an audit the skill writes for a person is good. That needs a model run on real prompts, and no such cases exist for this skill yet.
