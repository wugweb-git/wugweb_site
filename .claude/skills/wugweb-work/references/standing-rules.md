<!-- Copied from docs/skills/STANDING-RULES.md. Do not edit here. Change the source file, then copy it again. -->

# Owner's standing rules

These apply to every skill in the Wugweb Skill System and to every session.
Each skill reads this file and repeats none of it. A skill's own rules live in
that skill. Where a helper skill or tool disagrees with a rule here, this file
wins. Dates show when the owner set or confirmed a rule, where known.

## Truth and evidence

- Nothing is invented: no numbers, quotes or facts.
- A claim needs a screen, a sourced number or a named fact. "Unvalidated" is a complete answer.
- Existing content is an input, not the benchmark. (2026-10-19)
- Every number in a report is computed, never estimated.

## Sources and approval

- Notion is the source for case studies and blog posts. (2026-10-13)
- One source, from the owner. Content is enriched only as a proposal. (2026-10-19)
- Changes are shown as current to proposed, with the reason.
- Nothing is written to the content source or the CMS without the owner's approval of that exact change, with a backup first.
- Nothing is deleted without asking: no data, files, records or pages.
- Nothing is posted or scheduled without the owner's yes for that post. (2026-11-16)
- Third-party helper skills return proposals or reports. Only a Wugweb skill writes, and only after approval. (2026-11-16)
- Nothing goes to development until the owner says so. (2026-11-16)

## Media

- Media lives in the owner's media store only: no uploads, no local copies.
- Files are never cropped or re-encoded.
- Media may be shown at any size if the original aspect ratio is kept. Clipping masks are allowed. (2026-11-16)
- Resizing and masks are done on the page, never by making new files. (confirmed 2026-11-16)
- A mask must not hide the part of a screen that proves the claim. (confirmed 2026-11-16)
- A file shown above its natural size is flagged, not banned. (confirmed 2026-11-16)
- No sound anywhere. Every video is muted. (2026-11-11)
- A new image file is made only when nothing existing fits, one file at a time, on the owner's yes for that file. (2026-11-11)

## Writing

- British English.
- Sentence case.
- No em or en dashes in anything a visitor reads. Ranges are written out.

## Working with the owner

- Replies are short and plain, result first.
- Do exactly what is asked. No side tasks.
- Full output: complete files, no placeholders, no "rest unchanged".
- Do not raise the domain cutover, asset clean-up or the cookie policy unless asked.

## Limits

- Never exceed any vendor's free tier. No feature that needs a paid plan unless the owner asks.
- No dependency on Framer: no Framer URLs, redirects or assets. (2026-10-13)
- One slug per page; no redirects for old URLs. (2026-10-13)

## The skill system

- One home per rule. Each rule lives in exactly one skill; the others point to it. (2026-11-16)
- One Notion page per skill: no sub-pages, nothing elsewhere. The repo keeps one copy as that skill's PLAN file. (2026-11-16)
- Every skill must be usable in GPT, Cursor and other tools, not only Claude. (2026-11-16)
- The layout values in the design system's layout shell document are binding. Skills read that document and point to `wugweb-kits`. (2026-11-16)

## Git, only when asked to commit

- Commit by path. Never add everything at once.
- The only trailer is `Co-Authored-By: Wugweb <admin@wugweb.com>`.
- Check for an index lock first; other sessions share the checkout.
- Every commit adds a line to the changelog.
- Push only on the owner's go.

## Working caution, not an owner rule

- When writing to Notion, never write a bare word-colon-word pattern or a bare
  file name ending in a dot and "md". Notion turns them into links and can
  corrupt the page. Put them in inline code or reword. (found 2026-11-16)
