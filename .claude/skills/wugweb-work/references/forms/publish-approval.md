# Publish approval

Eight steps. Each one stops the work when it fails.

1. **The body is approved.** If not, stop.
2. **Fact ledger.** Every sentence in the form maps to a body line.
3. **Voice.** The text has passed the `wugweb-voice` check. Until the voice is calibrated with the owner's samples, its findings are low confidence; say so.
4. **Format.** The form meets the platform spec, checked and dated.
5. **Media.** Each file is listed with its source. Each made file is named.
6. **The owner's yes per made file.**
7. **The owner's yes per post.** The owner sees the exact text, media, account, date and time. A post whose linked page is not live is held. A client is named or tagged only with permission on record.
8. **Hand over.** No scheduling tool is connected (owner, 2026-11-17): give the owner the approved draft, its media and the account, date and time to post. Report what was handed over. Any later edit needs a new yes.

Show exactly what will happen and get a yes per action. Create the post as a draft first; moving it to the queue is its own step. Publishing now and deleting are separate actions, each with its own yes.

Step 6 applies only when the form has a made file; with none, say "step 6: no made file" and go to step 7. Made files are kept in the media store named in `ops-cycle.md`, under the piece's folder; the owner puts each there, and this skill never uploads.

## Hard stops

- "Post it now" still stops at step 7.
- An unapproved body stops at step 1.
- A changed word after step 7 returns to step 7.
- A linked page that is not live holds the post.
- No permission on record: the client is not named or tagged.
