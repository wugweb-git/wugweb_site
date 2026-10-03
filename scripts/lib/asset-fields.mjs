/**
 * Which asset fields a human owns, and which a script owns.
 *
 * EDITORIAL fields are the ones a person sets — in the Studio Media table
 * (sanity/lib/tableConfigs.tsx) or the asset document form. A script may SEED
 * them on a brand-new document, but must never overwrite them on an existing
 * one: use `.setIfMissing(editorial)`, never `.set()` or `createOrReplace`.
 *
 * Everything else is a FILE FACT (relativePath, sitePath, r2Key, fileName,
 * mimeType, localExists, …). The file on disk is the truth for those, so
 * scripts overwrite them freely with `.set(facts)`.
 *
 * Why this exists: four import scripts used createOrReplace or .set() on
 * existing assets, so one run silently wiped every alt text, reset every
 * hand-archived asset to Active, and replaced edited groups with guesses
 * derived from the file path. Add a field here the moment the Studio makes
 * it editable.
 */
export const EDITORIAL_ASSET_FIELDS = [
  'displayName',
  'alt',
  'assetGroup',
  'mediaType',
  'status',
  'usage',
  'linkedCaseStudy',
  'linkedPost',
  'linkedClient',
  'linkedPageId',
];

/** Split a doc into { facts, editorial }, dropping _id / _type. */
export function splitAssetFields(doc) {
  const facts = {};
  const editorial = {};
  for (const [key, value] of Object.entries(doc)) {
    if (key === '_id' || key === '_type' || value === undefined) continue;
    (EDITORIAL_ASSET_FIELDS.includes(key) ? editorial : facts)[key] = value;
  }
  return { facts, editorial };
}
