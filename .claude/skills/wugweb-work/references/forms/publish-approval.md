# Publish approval

Eight steps. Each one stops the work when it fails.

1. **The body is approved.** If not, stop.
2. **Fact ledger.** Every sentence in the form maps to a body line.
3. **Voice.** The text has passed the `wugweb-voice` check. Until that skill is installed, check against the held voice rules in `copy-and-seo.md` and say so.
4. **Format.** The form meets the platform spec, checked and dated.
5. **Media.** Each file is listed with its source. Each made file is named.
6. **The owner's yes per made file.**
7. **The owner's yes per post.** The owner sees the exact text, media, account, date and time. A post whose linked page is not live is held. A client is named or tagged only with permission on record.
8. **Send or schedule**, with the scheduling tool named in `ops-cycle.md`, then report what went where. Any later edit needs a new yes.

Show exactly what will happen and get a yes per action. Create the post as a draft first; moving it to the queue is its own step. Publishing now and deleting are separate actions, each with its own yes.

Whether the scheduling tool is connected is open (see `open-items.md`). When no connected tool is confirmed, stop after step 7 and hand the owner the approved draft to post.

## Hard stops

- "Post it now" still stops at step 7.
- An unapproved body stops at step 1.
- A changed word after step 7 returns to step 7.
- A linked page that is not live holds the post.
- No permission on record: the client is not named or tagged.
