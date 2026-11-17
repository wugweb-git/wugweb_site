# Handoffs to and from other skills

This skill owns search: phrases, intent, title and description limits, schema,
indexing, crawler access and reporting. Every link below reads the same on
both sides. Neither side edits code. This skill never writes copy and never
writes to the source, the CMS or the media store.

If a named skill is not installed, do the step with this skill's own rules, say
which handoff was skipped, and label the result a manual check.

## The links

| With | Gives | Takes |
|---|---|---|
| `wugweb-strategy` | Site keyword and intent map, topic gaps, refresh list; link rules and the link audit; search reports; the per-piece keyword note for the brief (field 9) | Business goal, audience, page list, pillar and cluster structure, the proof map |
| `wugweb-work` | Fix list for a finding on one page, JSON-LD check, citability score. Asks it for any visible wording, such as a title option. Reads the keyword note from the brief, not from this skill | Topic, client, audience; approved body; rendered page address; the wording, voice-checked |
| `wugweb-kits` | A finding that repeats on every page using a block: alt text, lazy loading, heading order, image sizes | Its check result |
| `wugweb-brand-os` | Nothing | One way: the approved brand name, descriptor and approved facts about Wugweb, for titles and organisation markup. Never rewritten |
| The voice skill | No link | No link. Voice checks pass through `wugweb-work` |

## Requests this skill answers

### 1. Site keyword and intent map

Asked by `wugweb-strategy`.

Receive the business goal, the audience and the page list. Return the clusters,
one page per cluster, topic gaps and pages to refresh, in the shape in
`references/plan.md`. What to publish and when stays with `wugweb-strategy`.

### 2. Search input for one brief

`wugweb-seo` writes one keyword note per piece: the search note and, where the
piece has those forms, the LinkedIn, Behance and Dribbble title and tag note.
`wugweb-strategy` pastes that note unchanged into brief field 9; `wugweb-work`
reads it from the brief and does not ask `wugweb-seo` separately.

To write the note, receive the page, its type, what was built, the audience and
the candidate phrases. Return it in the shape in `references/plan.md`. The maker
uses these as constraints. It keeps its headings and adds no FAQ block for
search, no keyword counts and no sections written for search. The link targets
come from `wugweb-strategy`; this skill gives the link rules.

### 3. Platform keyword note

The platform part of the per-piece note (section 2), written when the piece has
a LinkedIn, Behance or Dribbble form.

Return terms for the title, first line and tags on LinkedIn, Behance or
Dribbble, each sourced or marked "unvalidated". Never write the post. Tags are
few and specific; the keyword in the body comes first.

### 4. Audit of a rendered page

Asked by `wugweb-work`.

Receive the rendered address or HTML, the approved body and the planned
JSON-LD. Return the scripted results, the manual checks, the citability score
with the three weakest sections named, and the fix list split three ways. The
shape is in `references/audit.md`.

### 5. Search report

Asked by `wugweb-strategy`, and by `wugweb-work` for a traffic note after a
launch.

Receive the addresses and the launch date of any new page. Return the report in
`references/report.md`, with the date range and source of every number.
Reporting on posts belongs to `wugweb-strategy`.

## Requests this skill sends

### Findings that repeat across a block

Send to `wugweb-kits`: the block, the pages it appears on and the finding.

Expect back: its check result.

### Visible wording

`wugweb-strategy` sets the pillar and cluster structure, and the proof map
wins on which case study backs a page. This skill picks the other link targets
for a brief around that, owns the link rules (anchor wording, no orphans or
dead ends, depth, how many) and checks the links in the audit.

Send to `wugweb-work`: the limit, for example a title of 51 characters or
fewer naming the primary phrase.

Expect back: the wording, voice-checked.

## Helper skills

Every helper is optional. Each part can be done by hand with the absorbed rules
in the references. Helpers return proposals or reports only; this skill applies
its own fixed rules before passing anything on.

| Part | Lead | Second opinion |
|---|---|---|
| Plan | `rampstack-seo:seo-keyword`, `searchfit-seo:content-brief` | `searchfit-seo:create-topic` |
| Plan, platform keyword note | `social-media-skills:social-seo` | `social-media-skills:hashtag-strategy` |
| Audit | `rampstack-seo:seo-onpage`, `searchfit-seo:generate-schema` | `searchfit-seo:schema-markup`, `seo-skills:seo-schema`, `searchfit-seo:on-page-seo`, `seo-skills:seo-geo`, `rampstack-seo:seo-aeo-geo`, `sanity:seo-aeo-best-practices`, `searchfit-seo:seo-check`, `seo-skills:seo-images` |
| Audit, technical checks | `searchfit-seo:technical-seo` | |
| Report | `analytics-skills:traffic-change-diagnosis` | |
| Report, after deploy | `aeotester:audit`, `aeo-brand-scan:scan` | |

`aeo-brand-scan:scan` sends brand and competitor names to a third-party
service. Run it only after the owner's yes.

## Findings to decline

Decline and record any helper answer that asks for:

- `HowTo`, review stars or aggregate ratings, or `FAQPage` for questions the page does not show;
- `llms.txt` as a lever, or a change to the existing `llms.txt` and `ai-context.txt`;
- a keyword density target, or hashtag stuffing;
- a question heading in place of the copy's heading, or a rewrite of approved copy;
- a redirect for an old or Framer address, or a redirect as the default fix;
- an `author` on a case study;
- flagging dashes in titles;
- re-encoding an image;
- a number with no source, or a score with no stated rubric.
