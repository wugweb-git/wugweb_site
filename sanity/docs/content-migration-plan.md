# Sanity content migration plan

## Status

Phase 1 is intentionally non-destructive. No production documents are deleted, unpublished, merged, or republished by this branch.

## Canonical identity rules

- One published document per canonical URL slug and content type.
- Singleton pages are addressed by a fixed `pageId` and Studio structure document ID.
- Ordinary documents keep Sanity-generated `_id` values.
- Legacy/source IDs belong in explicit migration metadata, not document IDs.
- References must point to the canonical Sanity document `_id`.

## Current duplicate classes to resolve

### Services

Known duplicate slug families include `brand`, `strategy`, `experience`, `engineering`, `growth`, `operations`, `brand-strategy`, `experience-design`, `lead-generation`, `martech-genai`, `no-code-solutions`, `qa-testing`, and `web-app-development`.

Do not choose a winner from slug alone. Compare:

1. published/draft state
2. `_updatedAt`
3. content completeness
4. inbound references
5. frontend URL usage
6. media completeness
7. SEO metadata

### Case studies

Identify duplicate slug families and compare the narrative/body, client references, services, media, SEO and inbound references. Preserve the most complete canonical document and migrate references before retiring the duplicate.

### Posts

Audit duplicate slug families and near-duplicate titles separately. A matching title is not sufficient evidence for merging. Preserve distinct articles when their body/content differs.

### Singleton pages

`pageId` must be unique. The Studio structure already uses fixed document IDs for the known page IDs; duplicate production records must be reconciled before the generic Pages table is treated as authoritative.

## Migration sequence

1. Export/read-only inventory.
2. Produce duplicate groups and a proposed canonical document for human review.
3. Check inbound references to every proposed duplicate.
4. Check public URL usage and redirects.
5. Patch references to the canonical document.
6. Migrate missing fields/media into the canonical document.
7. Re-run the inventory until duplicate groups are empty or explicitly accepted.
8. Only then unpublish/archive legacy documents as a separate approved operation.

## Required safety checks

- Never delete a document because it has a duplicate slug.
- Never overwrite the richer document with a sparse import.
- Never publish migration output automatically.
- Never change public slugs without checking redirects.
- Keep legacy media fields read-only/deprecated until all consumers have migrated.

## Queries for the read-only audit

```groq
// Service candidates
*[_type == "service" && defined(slug.current)] | order(slug.current asc, _updatedAt desc){
  _id,
  title,
  "slug": slug.current,
  _updatedAt,
  seoTitle,
  seoDescription,
  coverImage,
  coverPath,
  "inboundReferences": count(*[references(^._id)])
}

// Singleton page candidates
*[_type == "singletonPage" && defined(pageId)] | order(pageId asc, _updatedAt desc){
  _id,
  pageId,
  title,
  language,
  _updatedAt,
  seoTitle,
  seoDescription,
  heroImage,
  heroPath
}

// Broken/orphaned references
*[_type in ["service", "caseStudy", "post"]]{
  _id,
  _type,
  "refs": references(*)._id
}
```

The final migration execution should be implemented as an explicit, reviewable Sanity migration or controlled patch job after the canonical mapping has been approved.
