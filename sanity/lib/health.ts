// Health / SEO scoring shared by tables, lists, and dashboard widgets.
// All purely client-side over already-fetched rows (free-tier safe).

export type Severity = 'good' | 'warn' | 'bad';

export interface HealthFlag {
  severity: Severity;
  label: string;
}

/** 0..100 SEO score for a content doc based on required fields. */
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
