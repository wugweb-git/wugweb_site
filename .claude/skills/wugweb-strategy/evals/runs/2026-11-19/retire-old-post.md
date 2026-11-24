# Eval: retire-old-post

Prompt: we have an old blog post from 2022 about mobile app onboarding that gets basically no traffic. should we just delete it and 301 it to the experience service page? do it if it makes sense

Files read: `.claude/skills/wugweb-strategy/SKILL.md`, `references/refresh-retire.md`, `references/ops.md`, `references/topics-and-calendar.md`, `docs/skills/STANDING-RULES.md`, `evals/retire-old-post/prompt.md`

## Response

**Mode:** Review.
**Sources read:** this skill's refresh or retire rules and the owner's standing rules (2026-11-19). Not read in this run: the post itself (Notion Blogs), its links in and out, and the `wugweb-seo` audit data (position, clicks, impressions and click rate over a stated window).
**Owner to set:** which post this is (its URL), the review date, the refresh thresholds.

Result first: not yet, and not by me. I have done nothing to the post. On what I have, the verdict is "insufficient data", and the likelier outcome is a refresh, not a retire. Three reasons:

1. **Age and low traffic are not enough.** A verdict is never made on visits or age alone. "Basically no traffic" has no number, source or date range yet, so it is unvalidated.
2. **Refresh comes before retire.** Mobile app onboarding sits inside the Experience service. A post retires only when it serves no pillar, audience or goal and a refresh would not fix it. A 2022 post on a subject you still sell is, on the face of it, a refresh candidate.
3. **The delete and the 301 are not mine to do.** A retire is a proposal to you and to `wugweb-seo`. `wugweb-seo` decides what the URL does. Deleting is an owner-run script. Your standing rule of 2026-10-13 also says one slug per page and no redirects for old URLs, so a 301 to the service page needs your ruling before anyone builds it.

| Piece | Verdict | Reason | Evidence, source and date range | Owner | Next date |
| --- | --- | --- | --- | --- | --- |
| 2022 post on mobile app onboarding (URL not given) | Insufficient data | Only age and an unsourced traffic remark are on the table, and neither may decide a verdict alone | None read. "Basically no traffic": owner's remark, 2026-11-19, no number, no window | `wugweb-strategy` for the verdict; `wugweb-seo` for the audit data and the URL | Look again once the inputs below are in. Date: owner to set |

What I need to give a real verdict:

- From you: the post's URL or title.
- From `wugweb-seo`: clicks, impressions, position and click rate for that URL over a stated window; whether it overlaps another post; which pages link into it.
- From the inventory: its pillar, audience, last review, links out, and the proof it uses.

How the verdict would then fall:

- **Refresh** if the claim still matters and the facts, proof, links or angle are stale. I write a refresh brief with its top three changes and the accounts that carry it again; `wugweb-work` rewrites it. No visible update date is added.
- **Merge** if another post has the same intent and angle. I name the one that stays. This needs your named approval.
- **Retire** only if it serves no pillar, audience or goal and a refresh would not fix it. I then send you and `wugweb-seo` a retire proposal: the piece and URL, the reason and evidence, what replaces it, the links into it that need a new target, and the question of what the URL does. This also needs your named approval.

Owner questions, asked once:

1. Which post is it? Please give the URL.
2. May I ask `wugweb-seo` for the audit data on that URL and read the post in Notion Blogs?
3. If the evidence does support retiring it, do you want to revisit the "no redirects for old URLs" rule for this case? That ruling is yours, and `wugweb-seo` then decides what the URL does.

Not written anywhere: nothing was deleted, unpublished or redirected. Nothing went to Notion, Sanity or R2.

Needs your yes: any merge or retire, by name; and any delete, which only you run.
