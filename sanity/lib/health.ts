import { toRel } from './assetUsage.ts';

// Health / completeness scoring shared by tables, lists, and dashboard widgets.
// seoScore() only checks that fields are filled. It is NOT a ranking-quality score.
// seoChecks() adds rule-based content checks (length, alt text, duplicates...).
// All purely client-side over already-fetched rows (free-tier safe).

export type Severity = 'good' | 'warn' | 'bad';

export interface HealthFlag {
  severity: Severity;
  label: string;
}

/** 0..100 completeness for a content doc: are the SEO-relevant fields filled? Not a quality measure. */
export function seoScore(row: Record<string, unknown>): number {
  let score = 0;
  const has = (k: string) => {
    const v = row[k];
    return v != null && v !== '' && v !== false && !(Array.isArray(v) && v.length === 0);
  };

  // Title + slug are the foundation
  if (has('title')) score += 25;
  if (has('slug')) score += 15;

  // A description matters for search snippets
  if (has('seoDescription') || has('summary') || has('excerpt')) score += 20;

  // Featured image / cover
  if (has('coverImage') || has('coverPath') || has('ogImage')) score += 15;

  // Meta title override
  if (has('seoTitle')) score += 10;

  // Body / substance
  if (has('body')) score += 15;

  return Math.min(score, 100);
}

export function seoLevel(score: number): { label: string; severity: Severity } {
  if (score >= 80) return { label: 'Good', severity: 'good' };
  if (score >= 50) return { label: 'Needs work', severity: 'warn' };
  return { label: 'Poor', severity: 'bad' };
}

export interface HealthSummary {
  score: number;
  flags: HealthFlag[];
}

/** Composite health for a row across the fields a type cares about. */
export function healthFlags(type: string, row: Record<string, unknown>): HealthSummary {
  const flags: HealthFlag[] = [];
  const has = (k: string) => {
    const v = row[k];
    return v != null && v !== '' && v !== false && !(Array.isArray(v) && v.length === 0);
  };

  switch (type) {
    case 'post':
      if (!has('coverImage') && !has('coverPath')) flags.push({ severity: 'warn', label: 'No cover' });
      if (!has('seoDescription')) flags.push({ severity: 'warn', label: 'No SEO desc' });
      if (!has('ogImage')) flags.push({ severity: 'warn', label: 'No OG' });
      break;
    case 'caseStudy':
      if (!has('thumbnailPath') && !has('coverImage')) flags.push({ severity: 'warn', label: 'No thumb' });
      if (!has('clientRef') && !has('client')) flags.push({ severity: 'warn', label: 'No client' });
      if (!has('seoDescription')) flags.push({ severity: 'warn', label: 'No SEO desc' });
      break;
    case 'service':
      if (!has('heroText') && !has('summary')) flags.push({ severity: 'warn', label: 'No hero' });
      if (!has('coverPath') && !has('coverImage')) flags.push({ severity: 'warn', label: 'No cover' });
      break;
    case 'client':
      if (!has('logo') && !has('logoPath')) flags.push({ severity: 'warn', label: 'No logo' });
      if (!has('industry')) flags.push({ severity: 'warn', label: 'No industry' });
      break;
    case 'person':
      if (!has('photo') && !has('photoPath')) flags.push({ severity: 'warn', label: 'No photo' });
      break;
    case 'asset':
      if (!has('relativePath') && !has('sitePath') && !has('r2Key')) flags.push({ severity: 'bad', label: 'No path' });
      if (row.status === 'Archived') flags.push({ severity: 'warn', label: 'Archived' });
      break;
    default:
      break;
  }

  return { score: seoScore(row), flags };
}

// ───────────────────────── Rule-based content checks ─────────────────────────
// Pure, no network, no AI-authorship detection. Each check only runs when the
// doc type's schema actually has the field it reads.

export interface SeoCheck {
  id: string;
  label: string;
  pass: boolean;
  severity: 'warn' | 'bad';
  hint: string;
}

/** Duplicate lookup built once per type from one cached query. Keys are normalised text. */
export interface DuplicateIndex {
  seoTitle?: Map<string, number>;
  seoDescription?: Map<string, number>;
}

/** Which schema fields exist per type. Mirrors sanity/schemaTypes — do not add fields that are not there. */
const TYPE_FIELDS: Record<string, { description: string[]; body?: string; seoTitle: boolean; seoDescription: boolean; focusKeyword?: boolean; slug: boolean }> = {
  post: { description: ['seoDescription', 'excerpt'], body: 'body', seoTitle: true, seoDescription: true, slug: true },
  caseStudy: { description: ['seoDescription', 'summary'], body: 'bodyContent', seoTitle: true, seoDescription: true, slug: true },
  service: { description: ['seoDescription', 'summary'], body: 'body', seoTitle: true, seoDescription: true, slug: true },
  singletonPage: { description: ['seoDescription'], body: 'body', seoTitle: true, seoDescription: true, focusKeyword: true, slug: false },
};

export const norm = (v: unknown) => String(v ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const STOP_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'are', 'your', 'our', 'how']);

function blocks(v: unknown): any[] {
  return Array.isArray(v) ? v : [];
}
function blockText(b: any): string {
  return Array.isArray(b?.children) ? b.children.map((c: any) => c?.text || '').join('') : '';
}
export function bodyText(body: unknown): string {
  return blocks(body).filter((b) => b?._type === 'block').map(blockText).join(' ').replace(/\s+/g, ' ').trim();
}
const words = (t: string) => (t ? t.split(/\s+/).filter(Boolean) : []);

/** Build a duplicate index from rows of ONE type (title/description counts, published docs only). */
export function buildDuplicateIndex(rows: Record<string, unknown>[]): DuplicateIndex {
  const count = (k: string) => {
    const m = new Map<string, number>();
    for (const r of rows) {
      const n = norm(r[k]);
      if (n) m.set(n, (m.get(n) ?? 0) + 1);
    }
    return m;
  };
  return { seoTitle: count('seoTitle'), seoDescription: count('seoDescription') };
}

/** toRel(path) -> alt text, for every asset that has one. Prefetched by the caller (one query). */
export type AltLookup = Map<string, string>;

const COVER_FIELD_TYPES = new Set(['post', 'caseStudy', 'service']);
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;

export function seoChecks(row: Record<string, unknown>, dupes?: DuplicateIndex, alts?: AltLookup): SeoCheck[] {
  const type = String(row._type ?? '');
  const cfg = TYPE_FIELDS[type];
  if (!cfg) return [];
  const out: SeoCheck[] = [];
  const add = (id: string, label: string, pass: boolean, severity: 'warn' | 'bad', hint: string) =>
    out.push({ id, label, pass, severity, hint });

  const title = str(row.seoTitle) || str(row.title);
  const description = cfg.description.map((k) => str(row[k])).find(Boolean) ?? '';
  const slug = typeof row.slug === 'string' ? row.slug : '';
  const body = cfg.body ? row[cfg.body] : undefined;
  const text = bodyText(body);

  // Title length
  add('title-length', 'Title 30–60 characters', title.length >= 30 && title.length <= 60, 'warn',
    title ? `Now ${title.length} characters.` : 'No title set.');

  // Description length
  add('description-length', 'Description 120–160 characters', description.length >= 120 && description.length <= 160, 'warn',
    description ? `Now ${description.length} characters.` : 'No description set.');

  // Slug hygiene (only where the type has a slug)
  if (cfg.slug) {
    const parts = slug.split('-').filter(Boolean);
    const problems: string[] = [];
    if (!slug) problems.push('no slug');
    else {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) problems.push('use lowercase letters, numbers and single hyphens');
      if (slug.length >= 75) problems.push(`${slug.length} characters, keep under 75`);
      if (/-\d+$/.test(slug)) problems.push('ends in a numeric suffix like "-2" (likely a duplicate)');
      if (parts.length > 3 && parts.filter((w) => STOP_WORDS.has(w)).length / parts.length > 0.4) problems.push('padded with stop words');
    }
    add('slug', 'Slug is clean', problems.length === 0, 'warn', problems.join('; ') || 'OK');
  }

  // Body checks
  if (cfg.body) {
    const wc = words(text).length;
    if (type === 'post') {
      add('body-words', 'Body at least 300 words', wc >= 300, 'warn', `Now ${wc} words.`);
    }
    const bl = blocks(body).filter((b) => b?._type === 'block');
    const h1 = bl.filter((b) => b.style === 'h1').length;
    const headings = bl.filter((b) => /^h[1-6]$/.test(String(b.style))).length;
    // Pages/services often keep their content in structured fields, not the body: only judge a body that exists.
    if (type === 'post' || bl.length > 0) {
      add('headings', 'Body has a heading and at most one H1', headings >= 1 && h1 <= 1, 'warn',
        headings === 0 ? 'No headings in the body.' : h1 > 1 ? `${h1} H1s; the page title is already the H1.` : 'OK');
    }
    const media = blocks(body).filter((b) => b?._type === 'image' || b?._type === 'mediaUrl');
    if (media.length) {
      const missing = media.filter((b) => !str(b.alt)).length;
      add('alt-text', 'Every image has alt text', missing === 0, 'bad', missing ? `${missing} of ${media.length} media blocks have no alt text.` : 'OK');
    }
  }

  // Focus keyword (only singletonPage has the field; skipped when it is empty)
  if (cfg.focusKeyword && str(row.focusKeyword)) {
    const kw = norm(row.focusKeyword);
    const first100 = norm(words(text).slice(0, 100).join(' '));
    const where = [
      ['title', norm(title).includes(kw)],
      ['description', norm(description).includes(kw)],
      ['first 100 words', first100.includes(kw)],
    ] as const;
    const miss = where.filter(([, ok]) => !ok).map(([n]) => n);
    add('focus-keyword', 'Focus keyword in title, description and first 100 words', miss.length === 0, 'warn',
      miss.length ? `Missing from: ${miss.join(', ')}.` : 'OK');
  }

  // Keyword stuffing (only where a focus keyword is set). The plugin trial
  // (2026-10-13) flagged this as a real gap: repetition reads as spam to
  // people and to search engines alike.
  if (cfg.focusKeyword && str(row.focusKeyword)) {
    const kw = norm(row.focusKeyword);
    const kwWords = kw.split(' ').length;
    const count = (hay: string) => (kw ? hay.split(kw).length - 1 : 0);
    const inTitle = count(norm(title));
    const bodyWords = words(text).length;
    const inBody = count(norm(text));
    const density = bodyWords ? (inBody * kwWords) / bodyWords : 0;
    const problems: string[] = [];
    if (inTitle > 1) problems.push(`${inTitle}× in the title`);
    if (inBody >= 3 && density > 0.03) problems.push(`${(density * 100).toFixed(1)}% of the body (${inBody}×), over 3%`);
    add('keyword-stuffing', 'Focus keyword not over-used', problems.length === 0, 'warn',
      problems.length ? `"${String(row.focusKeyword)}" appears ${problems.join(' and ')}. Use synonyms.` : 'OK');
  }

  // Social card: what LinkedIn, X, WhatsApp and Slack show when the page is
  // shared. Mirrors the templates exactly — post: ogImagePath → ogImage →
  // cover; caseStudy: ogImagePath → ogImage → an image coverPath; page:
  // ogImagePath → ogImage. The service template passes no image at all, so
  // services always fall back to the site default until that changes.
  {
    const hasImage =
      !!(str(row.ogImagePath) || row.ogImage) ||
      (type === 'post' && !!(str(row.coverPath) || row.coverImage)) ||
      (type === 'caseStudy' && IMAGE_EXT.test(str(row.coverPath).split(/[?#]/)[0]));
    const cardTitle = str(row.ogTitle) || title;
    const cardDesc = str(row.ogDescription) || description;
    const missing: string[] = [];
    if (type === 'service') missing.push('its own image (the service template always uses the site default)');
    else if (!hasImage) missing.push('its own image (falls back to the site default)');
    if (!cardTitle) missing.push('a title');
    if (!cardDesc) missing.push('a description');
    add('social-card', 'Social card has its own image, title and description', missing.length === 0, 'warn',
      missing.length ? `Missing ${missing.join(', ')}.` : 'OK');
  }

  // Description not a copy of the title or the excerpt
  if (description) {
    const d = norm(description);
    const copies = [d === norm(title) ? 'the title' : '', str(row.excerpt) && str(row.seoDescription) && d === norm(row.excerpt) ? 'the excerpt' : ''].filter(Boolean);
    add('description-distinct', 'Description is not a copy of title/excerpt', copies.length === 0, 'warn',
      copies.length ? `Identical to ${copies.join(' and ')}.` : 'OK');
  }

  // Cover alt: lives on the asset record (asset.alt), looked up by path. Skipped for videos and when no lookup was supplied.
  const cover = str(row.coverPath);
  if (alts && COVER_FIELD_TYPES.has(type) && cover && IMAGE_EXT.test(cover.split(/[?#]/)[0])) {
    const k = toRel(cover);
    const has = !!(k && alts.get(k));
    add('cover-alt', 'Cover image has alt text', has, 'bad', has ? 'OK' : 'The cover file has no alt on its asset record. Add it in the Media tool.');
  }

  // Duplicates across documents of the same type
  if (dupes) {
    const dup = (k: 'seoTitle' | 'seoDescription') => {
      const n = norm(row[k]);
      return n ? (dupes[k]?.get(n) ?? 0) > 1 : false;
    };
    if (cfg.seoTitle && str(row.seoTitle)) add('dup-seo-title', 'SEO title is unique', !dup('seoTitle'), 'warn', dup('seoTitle') ? 'Another document of this type has the same SEO title.' : 'OK');
    if (cfg.seoDescription && str(row.seoDescription)) add('dup-seo-description', 'SEO description is unique', !dup('seoDescription'), 'warn', dup('seoDescription') ? 'Another document of this type has the same SEO description.' : 'OK');
  }

  return out;
}

export function checksSummary(checks: SeoCheck[]): { passed: number; total: number; failed: SeoCheck[] } {
  const failed = checks.filter((c) => !c.pass);
  return { passed: checks.length - failed.length, total: checks.length, failed };
}

export const COMPLETENESS_HELP = 'Checks that fields are filled. It does not measure ranking quality.';
