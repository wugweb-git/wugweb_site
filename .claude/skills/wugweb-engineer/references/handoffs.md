# Handoffs with the other Wugweb skills

Rule 8 of the registry: every link reads the same on both sides. These contracts are proposals until each other skill lists the same link.

## wugweb-seo gives, wugweb-engineer takes

- **Question:** which value should this field hold for search? (schema type, canonical, noIndex, SEO title length)
- **wugweb-seo returns:** the rule and the value, for example "posts: `schemaType` BlogPosting".
- **wugweb-engineer does:** plans and applies the value on the owner's go. Never picks the value.

## wugweb-strategy gives, wugweb-engineer takes

- **Question:** should this content type have this field, and do stored values stay?
- **wugweb-strategy returns:** the ruling, for example "no faqs field on posts until a post has an owner-approved question list" (2026-11-17), or "stored aiSummary and schemaType stay" (2026-11-17).
- **wugweb-engineer does:** builds the schema change or leaves the field alone, as ruled.

## wugweb-work gives, wugweb-engineer takes

- **Question:** sync this approved piece from Notion to Sanity.
- **wugweb-work gives:** the piece and the owner's approval of its content.
- **wugweb-engineer does:** runs the matching sync script by `references/sync-scripts.md`. Never edits the content; a fault in the content goes back to wugweb-work.

## wugweb-engineer gives, all take

- Change reports (current → proposed), backups, result logs and check results.
- Schema check findings: to wugweb-strategy for content fields, to wugweb-seo for SEO fields.
- Media read reports: to wugweb-work for a piece, to wugweb-kits when the finding is about how a block shows media.

## No link

- **wugweb-voice:** this skill writes no visible copy. A field label or help text a visitor never sees is not voice work; a field value a visitor sees comes from wugweb-work.
- **wugweb-brand-os:** none.
- **wugweb-kits:** none directly. A schema field that drives a block is named in the change report.

## The repo's AGENTS.md

Deploy, build, previews and git stay there. This skill points to it for the site-code steps of a schema change and repeats none of them.
