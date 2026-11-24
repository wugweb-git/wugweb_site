# Eval: routing-check

Prompt: `evals/routing-check.json`, 20 routing prompts. For each: which skill handles it and why. The 20 prompts are quoted in the table below.

Files read: `.claude/skills/wugweb-engineer/SKILL.md`, `references/handoffs.md`, `references/open-items.md`, `references/media-read.md`, `references/script-status.md` (asset rows), `evals/routing-check.json` (the file holds an earlier run's routing beside each prompt; the answers below were decided from the skill's ownership table and handoffs), `.claude/skills/wugweb-strategy/SKILL.md` (handoff table), `.claude/skills/wugweb-brand-os/SKILL.md` (description).

## Response

Mode: routing only. No prompt was carried out; nothing was read from Sanity, Notion or R2, and nothing was written.

| # | Prompt | Skill | Why |
|---|---|---|---|
| 1 | seo wants all the TechArticle posts flipped to BlogPosting in sanity, can you sort that | `wugweb-engineer` | A patch to a stored field on Sanity posts. `wugweb-seo` set the value; this skill plans it, shows it and applies it on the owner's go. |
| 2 | pull last night's blog edits from notion into the cms | `wugweb-engineer` | The Notion to Sanity blog sync: token check, dry run, show, write on go. |
| 3 | before we touch anything, back up every service document in sanity | `wugweb-engineer` | Backups of Sanity documents are this skill's. A read plus a hashed backup file; no change to Sanity. |
| 4 | which fields are sitting on our case study docs that studio doesn't show? | `wugweb-engineer` | The schema against data check. Findings go to `wugweb-strategy` or `wugweb-seo` to rule on. |
| 5 | undo the change you made to the case study canonical urls yesterday | `wugweb-engineer` | Undo mode: fresh backup, restore plan for one field, apply on the owner's go. |
| 6 | is it safe to run scripts/map-assets-to-content.mjs? | `wugweb-engineer` | Script check. The status list marks it "do not run as is": it writes unless `DRY_RUN=1`. |
| 7 | remove the FAQPage option from the singleton page schema type list | `wugweb-engineer` | A Sanity schema edit (item B). `wugweb-seo` ruled that no page emits FAQPage; this skill makes the one-line change on the owner's go. Stored values stay. |
| 8 | the footer still says 2020-2025, fix it in site settings | `wugweb-engineer` | One stored field on the `siteSettings` document. The new wording comes from the owner; this skill plans and patches it. |
| 9 | how many asset records are under work/kia in the registry and do they all load? | `wugweb-engineer` | Media read: the asset registry query and a `HEAD` on each file. Read only. |
| 10 | fill the service FAQs in sanity from the approved review rows | `wugweb-engineer` | A patch to `service.faqs` (item G). The wording comes from `wugweb-work` after the owner's approval; this skill checks shape and applies. |
| 11 | what schema type should our blog posts use for search? | `wugweb-seo` | Which schema type a page uses is a search rule. This skill only applies the answer. |
| 12 | should blog posts have an FAQ section at all? | `wugweb-strategy` | Which pieces get an FAQ block, and whether a content type has the field, is a content-model ruling. |
| 13 | rewrite the brand service page FAQ answers so they sound like us | `wugweb-work` | Writing and rewriting visible copy is `wugweb-work`'s; it reaches `wugweb-voice` for tone. Not a data change until approved wording exists. |
| 14 | write the Kia case study body from its Notion page | `wugweb-work` | Writing a case-study body. This skill would only sync it afterwards. |
| 15 | check the gutter and section padding on the case study page at 375 and 1200 | `wugweb-kits` | Layout values and tokens. |
| 16 | what should we post on LinkedIn next month? | `wugweb-strategy` | Topics and the social calendar. |
| 17 | does this headline sound like Wugweb? | `wugweb-voice` | A tone and phrasing check on a draft. |
| 18 | is this cover artwork on brand? | `wugweb-brand-os` | Brand rules and art direction. |
| 19 | why is the axis bank case study not showing up in google? | `wugweb-seo` | A search visibility question. If the cause is a stored value (noIndex, canonical), `wugweb-seo` names the fix and this skill applies it. |
| 20 | suggest a better meta description for the blog index page | `wugweb-seo` | Meta description rules and audit sit with `wugweb-seo`; the new wording itself is written by `wugweb-work`, and this skill would only store the approved value. |

Count: 10 to `wugweb-engineer` (1 to 10), 10 to other skills (11 to 20): `wugweb-seo` 4, `wugweb-strategy` 2, `wugweb-work` 2, `wugweb-kits` 1, `wugweb-voice` 1, `wugweb-brand-os` 1.

Close calls: 13 could be read as `wugweb-voice`, but a rewrite is making copy, which is `wugweb-work`'s, with voice reached through it. 20 touches two skills (`wugweb-seo` for the rule, `wugweb-work` for the words); the first owner is `wugweb-seo`.
