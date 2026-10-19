import { urlFor } from './sanity';
import { assetUrl } from './assets';
import { altFor, type AltMap } from './asset-alt';

/**
 * One blog card, one schema. Takes a post as `postsListQuery` returns it and
 * adds the display fields every blog card needs (cover URL + alt, pillar accent,
 * initials for the no-cover state). Used by /blog and by InsightsBlock, so the
 * homepage, service pages and the blog index can never drift apart again.
 * (Moved out of src/pages/blog/index.astro; logic unchanged.)
 */
export interface PostCardData {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  topic?: string;
  topicSlug?: string;
  publishedAt?: string;
  readingTime?: number | string;
  author?: { name?: string } | null;
  coverUrl: string;
  coverAlt: string;
  accent: string;
  pillar: string;
  initials: string;
  [key: string]: any;
}

export function coverUrl(coverImage: any, coverPath?: string): string {
  if (coverPath) return assetUrl(coverPath);
  if (!coverImage) return '';
  try {
    if (typeof coverImage === 'string') return coverImage;
    if (coverImage.asset || coverImage._ref || coverImage._type === 'image') {
      return urlFor(coverImage).width(800).height(600).url();
    }
  } catch {
    return '';
  }
  return '';
}

export function initials(title: string): string {
  const words = (title || '').replace(/[^\w\s]/g, '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return 'Ww';
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() || '').join('');
}

// Each pillar is locked to its own brand accent token (--svc-*) — one colour
// language for "what kind of work is this" across the whole site.
const PILLARS = ['Strategy', 'Brand', 'Experience', 'Engineering', 'Growth', 'Operations'];
const PILLAR_ACCENT: Record<string, string> = {
  Strategy: 'var(--svc-strategy)',
  Brand: 'var(--svc-brand)',
  Experience: 'var(--svc-experience)',
  Engineering: 'var(--svc-engineering)',
  Growth: 'var(--svc-growth)',
  Operations: 'var(--svc-operations)',
};
const CATEGORY_PILLAR: Record<string, string> = {
  'Strategy': 'Strategy', 'Business Strategy': 'Strategy', 'Consulting': 'Strategy',
  'Brand & Strategy': 'Brand', 'Brand': 'Brand', 'Content': 'Brand',
  'Experience Design': 'Experience', 'UX Design': 'Experience', 'UI Design': 'Experience',
  'Web & App Development': 'Engineering', 'Development / Server': 'Engineering',
  'Infrastructure & DevOps': 'Engineering',
  'MarTech': 'Growth', 'Performance Marketing': 'Growth', 'SEO': 'Growth',
  'AI & Automation': 'Growth', 'Data & Analytics': 'Growth',
  'Operations': 'Operations', 'Digital Transformation': 'Operations',
};
export function postPillar(category: string): string {
  return CATEGORY_PILLAR[category] || PILLARS.find((p) => (category || '').toLowerCase().includes(p.toLowerCase())) || 'Experience';
}

export function toPostCard(p: any, altMap: AltMap): PostCardData {
  const pillar = postPillar(p.category);
  return {
    ...p,
    coverUrl: coverUrl(p.coverImage, p.coverPath),
    coverAlt: altFor(altMap, p.coverPath, p.title),
    accent: PILLAR_ACCENT[pillar],
    pillar,
    initials: initials(p.title),
  };
}
