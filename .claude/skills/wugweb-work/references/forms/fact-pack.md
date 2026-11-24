# Fact pack

The fact pack is the only material a form may use. Build it once per approved body; every form reads it.

## Stop rule

No approved body, no fact pack. A proposed body can be used to rehearse the shape, and the result is labelled "from a proposed body, not for posting".

## What goes in

| Item | Taken from the body | Kept |
|---|---|---|
| Title and subtitle | The title line and the subtitle meta line | Word for word |
| Claim headings | Each chapter heading | Word for word |
| Answer sentences | The first sentence under each heading | Word for word |
| Design decisions | The decisions chapter, one per line | Word for word, with the screens named |
| Delivered facts | The "What was delivered" chapter | Word for word |
| Results | Results lines with value, what, period, source and date | All parts; a result missing a part is left out |
| Quotes | Quotes in the body, with the person and role | Word for word |
| Credits | Team and partner meta lines | Names as written |
| Proof screens | The screens linked inside chapters, with approved alt and caption | URL, alt, caption, chapter, any flag |
| Link | The page URL | Canonical host |

## Format

One row per fact:

```
id | kind | text | body line (chapter and position) | screens
```

## Checks

- Every fact has a body line. A fact with none is removed. The page link is the one item that is not a fact from the body: it carries the page's canonical address in place of a body line, and is kept.
- Flagged screens are marked; forms that ban flagged screens skip them.
- No number appears that lacks its source and date in the body.
- Count the items and state the count.
