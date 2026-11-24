# Eval: faqs-field-on-posts

Prompt: add a faqs field to the post schema so we can start putting FAQs on blog posts

Files read: `.claude/skills/wugweb-engineer/SKILL.md`, `references/schema-change.md`, `references/handoffs.md`, `references/open-items.md`, `references/tooling.md`, `docs/skills/STANDING-RULES.md`, `sanity/schemaTypes/post.ts` (the faqs comment), `sanity/schemaTypes/service.ts` (the faqs field), `evals/faqs-field-on-posts/prompt.md`

## Response

Mode: Schema change. Not built: the ruling says wait.

Result first: I have not added the field. Which fields a content type has is decided by `wugweb-strategy`, and its ruling of 2026-11-17 is: no `faqs` field on posts until a post has an owner-approved question list. I build the field as ruled, on your go; I do not decide it.

The schema file says the same. `sanity/schemaTypes/post.ts` carries a note that `faqs` is designed but deliberately not added yet, because it needs a visible answer block and a renderer first, and fields that shipped ahead of their consumer rendered nothing.

Two more things the field alone would not give you:

- **Showing FAQs on a post.** The blog page has to read and show the field. That is site code and follows the repo's `AGENTS.md`.
- **Markup for search.** What a post's FAQ block means for schema is `wugweb-seo`'s call.

What unblocks it:

1. A post with a question list you have approved (questions from real reader questions, answers from your source; that list comes through `wugweb-strategy` and `wugweb-work`), or
2. Your word that the ruling is lifted.

If you say go, this is the change as proposed. It is a Studio change only; it touches no stored data and nothing a visitor sees.

```
Change: declare a faqs field on the post type
Mode: Schema change
File: sanity/schemaTypes/post.ts (one file)
Ruling: wugweb-strategy, 2026-11-17: no faqs field on posts until a post has an owner-approved question list. Not met yet.

Current: post has no faqs field.
Proposed: faqs, an array of objects with q (string, Question) and a (text, Answer),
          the same shape as the faqs field on service. Group and position in Studio: to confirm.

Data change: none. No document is patched.
Visible on the site: no, until the blog page is built to read it.
Undo: revert the commit; no stored values are affected.
```

Steps I would follow, none run here:

1. One branch, named for the change.
2. Edit the one file. `blockContent` stays in the types array untouched.
3. `npm run build` and `npm run test:sanity` at the repo root, then `npm run build` in `sanity/`. All must pass.
4. Run the local Studio, open one post, confirm the field shows and saves.
5. Show you the lines as current → proposed, the build and test results, and what you will see in Studio.
6. You say go; merge to main by the site-code steps in the repo's `AGENTS.md`.
7. Studio deploy is your step. I stop there.

Filling FAQs on any post afterwards is a separate data change with its own backup, plan and go.

Questions for you:

1. Is there a post with an approved question list, or do you lift the 2026-11-17 ruling?
2. If yes, same `q` and `a` shape as on services?
3. Do you want the blog page work (showing the block) raised as its own site-code task?

Waiting for: your answer to question 1. No file was edited.
