/**
 * Helpers for assigning / unassigning a media asset to a document.
 *
 * Matching is by VALUE (the path string), never by a stored array index: the
 * usage scan records `galleryPaths[3]`, but removing item 1 shifts every later
 * index, so an index recorded earlier can point at the wrong file by the time
 * someone clicks "Unassign". Walking the document at click time is always right.
 */

export type FieldKind = 'string' | 'array' | 'body';

export interface AssignField {
  key: string;
  label: string;
  kind: FieldKind;
}

export interface AssignTarget {
  type: string;
  label: string;
  fields: AssignField[];
}

/** Where a file can be assigned. Mirrors the path fields in schemaTypes/*. */
export const ASSIGN_TARGETS: AssignTarget[] = [
  {
    type: 'caseStudy',
    label: 'Case study',
    fields: [
      { key: 'coverPath', label: 'Cover image', kind: 'string' },
      { key: 'thumbnailPath', label: 'Thumbnail', kind: 'string' },
      { key: 'thumbnailVideoPath', label: 'Thumbnail video', kind: 'string' },
      { key: 'aboutVideoPath', label: 'About video', kind: 'string' },
      { key: 'designPhilosophyVideoPath', label: 'Design philosophy video', kind: 'string' },
      { key: 'clientLogoPath', label: 'Client logo', kind: 'string' },
      { key: 'ogImagePath', label: 'Social (OG) image', kind: 'string' },
      { key: 'galleryPaths', label: 'Gallery (add)', kind: 'array' },
      { key: 'bodyContent', label: 'Body (add media block)', kind: 'body' },
    ],
  },
  {
    type: 'post',
    label: 'Blog post',
    fields: [
      { key: 'coverPath', label: 'Cover image', kind: 'string' },
      { key: 'ogImagePath', label: 'Social (OG) image', kind: 'string' },
      { key: 'body', label: 'Body (add media block)', kind: 'body' },
    ],
  },
  {
    type: 'singletonPage',
    label: 'Page',
    fields: [
      { key: 'heroPath', label: 'Hero', kind: 'string' },
      { key: 'ogImagePath', label: 'Social (OG) image', kind: 'string' },
      { key: 'mediaPaths', label: 'Page media (add)', kind: 'array' },
      { key: 'body', label: 'Body (add media block)', kind: 'body' },
    ],
  },
  {
    type: 'service',
    label: 'Service',
    fields: [
      { key: 'coverPath', label: 'Cover image', kind: 'string' },
      { key: 'ogImagePath', label: 'Social (OG) image', kind: 'string' },
      { key: 'galleryPaths', label: 'Gallery (add)', kind: 'array' },
      { key: 'body', label: 'Body (add media block)', kind: 'body' },
    ],
  },
  { type: 'client', label: 'Client', fields: [{ key: 'logoPath', label: 'Logo', kind: 'string' }] },
  { type: 'person', label: 'Person', fields: [{ key: 'photoPath', label: 'Photo', kind: 'string' }] },
  { type: 'testimonial', label: 'Testimonial', fields: [{ key: 'photoPath', label: 'Photo', kind: 'string' }] },
  { type: 'industry', label: 'Industry', fields: [{ key: 'iconPath', label: 'Icon', kind: 'string' }] },
  { type: 'taxonomy', label: 'Taxonomy (tool / tag)', fields: [{ key: 'iconPath', label: 'Icon', kind: 'string' }] },
];

export interface AssetPaths {
  relativePath?: string;
  sitePath?: string;
}

/** Any path-ish string -> asset relative key (no leading slash, no "assets/"). */
export function toRel(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  let v = value.trim();
  if (!v || v.length > 600) return null;
  if (/^https?:\/\//i.test(v)) {
    try {
      v = new URL(v).pathname;
    } catch {
      return null;
    }
  }
  v = v.split(/[?#]/)[0];
  try {
    v = decodeURIComponent(v);
  } catch {
    /* keep raw */
  }
  v = v.replace(/^\/+/, '').replace(/^assets\//, '');
  return v || null;
}

/** The path we write into a document for this asset. */
export function assetWritePath(a: AssetPaths): string {
  return a.sitePath || (a.relativePath ? `/assets/${a.relativePath}` : '');
}

export function matchesAsset(value: unknown, a: AssetPaths): boolean {
  const rel = toRel(value);
  if (!rel) return false;
  const keys = [toRel(a.relativePath), toRel(a.sitePath)].filter(Boolean) as string[];
  return keys.includes(rel);
}

const SYSTEM_KEYS = new Set(['_id', '_type', '_rev', '_createdAt', '_updatedAt']);

/**
 * Deep-copy `node` with every reference to `asset` removed.
 *  - string property that matches        -> property deleted
 *  - string in an array that matches     -> item dropped
 *  - mediaUrl block whose url matches    -> whole block dropped
 */
export function removeAsset(node: any, asset: AssetPaths): { value: any; removed: number } {
  let removed = 0;
  const walk = (n: any): any => {
    if (Array.isArray(n)) {
      const out: any[] = [];
      for (const item of n) {
        if (typeof item === 'string' && matchesAsset(item, asset)) {
          removed++;
          continue;
        }
        if (item && typeof item === 'object' && item._type === 'mediaUrl' && matchesAsset(item.url, asset)) {
          removed++;
          continue;
        }
        out.push(walk(item));
      }
      return out;
    }
    if (n && typeof n === 'object') {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(n)) {
        if (!SYSTEM_KEYS.has(k) && !k.startsWith('_') && typeof v === 'string' && matchesAsset(v, asset)) {
          removed++;
          continue;
        }
        out[k] = k.startsWith('_') ? v : walk(v);
      }
      return out;
    }
    return n;
  };
  return { value: walk(node), removed };
}

/** Top-level fields that differ between two versions of a document. */
export function diffTopLevel(before: Record<string, any>, after: Record<string, any>) {
  const set: Record<string, any> = {};
  const unset: string[] = [];
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const k of keys) {
    if (SYSTEM_KEYS.has(k)) continue;
    const a = before[k];
    const b = after[k];
    if (JSON.stringify(a) === JSON.stringify(b)) continue;
    if (b === undefined) unset.push(k);
    else set[k] = b;
  }
  return { set, unset };
}

export function randomKey(): string {
  return Math.random().toString(36).slice(2, 12);
}

/** Build the next value for `field` after assigning `path`. */
export function assignedValue(field: AssignField, current: any, path: string): any {
  if (field.kind === 'string') return path;
  if (field.kind === 'array') {
    const arr: string[] = Array.isArray(current) ? current : [];
    return arr.some((p) => toRel(p) === toRel(path)) ? arr : [...arr, path];
  }
  const blocks: any[] = Array.isArray(current) ? current : [];
  if (blocks.some((b) => b?._type === 'mediaUrl' && toRel(b.url) === toRel(path))) return blocks;
  return [...blocks, { _type: 'mediaUrl', _key: randomKey(), url: path, alt: '', caption: '' }];
}
