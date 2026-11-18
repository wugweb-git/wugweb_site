// src/lib/case-layout.ts
//
// Pure, deterministic layout resolver for /work/[slug]. Reads the
// parsed body (case-body.ts v2), an optional media manifest, and the
// Sanity doc; returns an ordered array of blocks the page renders.
//
// No Sanity import here. Erasable TypeScript. Unit-tested from fixtures.
// Full rules in docs/skills/wugweb-work/PLAN.md "Layout grammar".

import type {
  CaseBody, Media, MetaItem, PresenceLink, Quote, Result,
  Section, Table, Tile, Milestone
} from './case-body';

// ---------- Manifest shape (subset the resolver reads) ----------

/** One manifest entry per media URL. Entries with status != 200 or dupOf set are skipped. */
export interface ManifestEntry {
  url: string;
  status?: number;
  dupOf?: string;
  bytes?: number;
  width?: number;
  height?: number;
  kind?: string;
  audience?: 'member' | 'admin' | 'public' | 'partner';
  flow?: string;
  step?: number;
  posterAt?: number;
  alt?: string;
  caption?: string;
  heroScore?: number;
}

export interface MediaManifest {
  slug: string;
  ownFolder?: string;
  entries: ManifestEntry[];
}

// ---------- Related / next doc shape ----------

export interface RelatedDoc {
  slug: string;
  title: string;
  shortTitle?: string;
  coverPath?: string;
  thumbnailPath?: string;
  industry?: string;
}

// ---------- Hero / doc shape (resolver reads a narrow slice) ----------

export interface CaseDoc {
  slug: string;
  title: string;
  shortTitle?: string;
  subtitle?: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
  coverPath?: string;
  thumbnailPath?: string;
  ogImage?: string;
  accent?: string;
  year?: number;
  timeline?: string;
  country?: string;
  platform?: string | string[];
  projectType?: string;
  engagementType?: string;
  specialThanks?: string;
  team?: string[];
  clientName?: string;
  industry?: string;
  services?: Array<{ title: string; slug: string }>;
  tags?: string[];
  related?: RelatedDoc[];
  next?: RelatedDoc;
}

// ---------- Block union ----------

export type Block =
  | HeroBlock
  | SummaryBlock
  | StatsBlock
  | ChapterBlock
  | PointsBlock
  | FigureBlock
  | SplitBlock
  | PairBlock
  | RailBlock
  | MosaicBlock
  | WallBlock
  | ScrollshotBlock
  | LoopBlock
  | VideoBlock
  | QuoteBlock
  | TableBlock
  | TimelineBlock
  | ResultsBlock
  | ScreensBlock
  | CreditsBlock
  | PresenceBlock
  | RelatedBlock
  | NextBlock;

export interface HeroBlock {
  type: 'hero';
  title: string;
  subtitle?: string;
  clientName?: string;
  industry?: string;
  cover?: Media;
  meta: Array<{ key: string; value: string; text: string; links: Array<{ text: string; href: string }> }>;
  accent?: string;
  tags: string[];
}

export interface SummaryBlock { type: 'summary'; text: string }
export interface StatsBlock { type: 'stats'; items: Result[] }
export interface ChapterBlock {
  type: 'chapter';
  id: string;
  title: string;
  lead?: string;
  paras: string[];
  index: number;
}
export interface PointsBlock { type: 'points'; items: Tile[]; chapterId: string }
export interface FigureBlock { type: 'figure'; media: Media; chapterId: string }
export interface SplitBlock { type: 'split'; left: Media; right: Media; chapterId: string }
export interface PairBlock { type: 'pair'; left: Media; right: Media; chapterId: string }
export interface RailBlock {
  type: 'rail';
  items: Media[];
  chapterId: string;
  flow?: string;
}
export interface MosaicBlock { type: 'mosaic'; items: Media[]; chapterId: string }
export interface WallBlock { type: 'wall'; items: Media[]; chapterId: string }
export interface ScrollshotBlock { type: 'scrollshot'; media: Media; chapterId: string }
export interface LoopBlock { type: 'loop'; media: Media; poster?: string; chapterId: string }
export interface VideoBlock { type: 'video'; media: Media; poster?: string; chapterId: string }
export interface QuoteBlock { type: 'quote'; text: string; by?: string; chapterId: string }
export interface TableBlock { type: 'table'; head: string[]; rows: string[][]; chapterId: string }
export interface TimelineBlock { type: 'timeline'; items: Milestone[]; chapterId: string }
export interface ResultsBlock { type: 'results'; items: Result[] }
export interface ScreensBlock {
  type: 'screens';
  sets: Array<{
    audience: 'member' | 'admin' | 'public' | 'partner' | 'other';
    flows: Array<{ flow: string; items: Media[] }>;
  }>;
}
export interface CreditsBlock { type: 'credits'; items: Record<string, string> }
export interface PresenceBlock { type: 'presence'; links: PresenceLink[] }
export interface RelatedBlock { type: 'related'; items: RelatedDoc[] }
export interface NextBlock { type: 'next'; item: RelatedDoc }

// ---------- Rail cap and heuristics ----------

const RAIL_MAX = 8;
const MOSAIC_MIN = 3;
const MOSAIC_MAX = 6;
const WALL_MIN = 7;

const GENERIC_CHAPTER = /^(about|challenges?|solutions?|design philosophy|conclusion|overview|introduction)\s*$/i;

/** Slugify a chapter title: lowercase, hyphenated, ASCII-ish. */
export function slugifyChapter(title: string, fallbackIndex: number): string {
  const s = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s || `chapter-${fallbackIndex + 1}`;
}

/** Return a unique id by appending -2, -3 … if the base is taken. */
function uniqueId(base: string, used: Set<string>): string {
  if (!used.has(base) && base !== 'case-study' && base !== 'work-cover') {
    used.add(base);
    return base;
  }
  let n = 2;
  while (used.has(`${base}-${n}`) || `${base}-${n}` === 'case-study' || `${base}-${n}` === 'work-cover') n++;
  const id = `${base}-${n}`;
  used.add(id);
  return id;
}

/** True when a manifest entry blocks its URL from rendering (dead or duplicate). */
function skipManifest(url: string, index: Map<string, ManifestEntry>): boolean {
  const entry = index.get(url);
  if (!entry) return false; // unknown URL: render. The manifest is a skip-list, not an allow-list.
  if (entry.dupOf) return true;
  if (entry.status != null && entry.status !== 200) return true;
  return false;
}

function usableMedia(items: Media[], index: Map<string, ManifestEntry>): Media[] {
  return items.filter(m => !skipManifest(m.url, index));
}

/** The chapter's media classified by kind. A scrollshot is a tall screen above a threshold. */
function classifyMedia(items: Media[]): {
  videos: Media[];
  loops: Media[];
  scrollshots: Media[];
  screens: Media[];
  figures: Media[];
} {
  const videos: Media[] = [];
  const loops: Media[] = [];
  const scrollshots: Media[] = [];
  const screens: Media[] = [];
  const figures: Media[] = [];
  for (const m of items) {
    if (m.kind === 'loop' || (m.video && isLoopLike(m.label))) {
      loops.push(m);
    } else if (m.video) {
      videos.push(m);
    } else if (m.kind === 'screen' || m.kind === 'states' || m.kind === 'mockup') {
      screens.push(m);
    } else if (looksScrollshot(m.label)) {
      scrollshots.push(m);
    } else {
      figures.push(m);
    }
  }
  return { videos, loops, scrollshots, screens, figures };
}

function isLoopLike(label: string): boolean {
  return /\b(loop|hover|anim|interaction|preview)\b/i.test(label);
}

function looksScrollshot(label: string): boolean {
  return /\bscroll(shot)?\b/i.test(label);
}

// ---------- Hero meta key allowlist ----------

const HERO_META_KEYS = [
  'Category', 'Client', 'Partner', 'Industry', 'Disciplines',
  'Team', 'Timeline', 'Platform', 'Year', 'Country', 'Special Thanks'
];

function heroMeta(meta: MetaItem[]): HeroBlock['meta'] {
  const out: HeroBlock['meta'] = [];
  for (const key of HERO_META_KEYS) {
    const m = meta.find(x => x.key === key);
    if (m) out.push({ key: m.key, value: m.value, text: m.text, links: m.links });
  }
  return out;
}

// ---------- Credits from doc fields ----------

function credits(doc: CaseDoc): Record<string, string> {
  const out: Record<string, string> = {};
  if (doc.team && doc.team.length > 0) out['Team'] = doc.team.join(', ');
  if (doc.specialThanks) out['Special thanks'] = doc.specialThanks;
  if (doc.engagementType) out['Engagement'] = doc.engagementType;
  if (doc.projectType) out['Project type'] = doc.projectType;
  if (doc.timeline) out['Timeline'] = doc.timeline;
  if (doc.year != null) out['Year'] = String(doc.year);
  if (doc.country) out['Country'] = doc.country;
  return out;
}

// ---------- Screens bucket (grouped by audience then flow) ----------

function screensBucket(all: Media[], index: Map<string, ManifestEntry>): ScreensBlock {
  const sets = new Map<string, Map<string, Media[]>>();
  for (const m of all) {
    if (skipManifest(m.url, index)) continue;
    if (m.kind !== 'screen' && m.kind !== 'states' && m.kind !== 'mockup' && m.kind !== 'web' && m.kind !== 'dashboard') continue;
    const entry = index.get(m.url);
    const audience = entry?.audience ?? 'other';
    const flow = entry?.flow ?? 'unsorted';
    if (!sets.has(audience)) sets.set(audience, new Map());
    const flows = sets.get(audience)!;
    if (!flows.has(flow)) flows.set(flow, []);
    flows.get(flow)!.push(m);
  }
  // Order inside each flow by step; stable tiebreak by original index.
  const indexOf = new Map<Media, number>();
  all.forEach((m, i) => indexOf.set(m, i));
  const orderedSets: ScreensBlock['sets'] = [];
  const audOrder: Array<'member' | 'admin' | 'public' | 'partner' | 'other'> = ['member', 'admin', 'public', 'partner', 'other'];
  for (const aud of audOrder) {
    const flows = sets.get(aud);
    if (!flows) continue;
    const flowList = Array.from(flows.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([flow, items]) => ({
        flow,
        items: items
          .slice()
          .sort((a, b) => {
            const sa = index.get(a.url)?.step ?? Number.MAX_SAFE_INTEGER;
            const sb = index.get(b.url)?.step ?? Number.MAX_SAFE_INTEGER;
            if (sa !== sb) return sa - sb;
            return (indexOf.get(a) ?? 0) - (indexOf.get(b) ?? 0);
          })
      }));
    orderedSets.push({ audience: aud, flows: flowList });
  }
  return { type: 'screens', sets: orderedSets };
}

// ---------- The resolver ----------

export function resolveLayout(
  body: CaseBody | null,
  manifest: MediaManifest | undefined,
  doc: CaseDoc
): Block[] {
  const blocks: Block[] = [];
  const index = new Map<string, ManifestEntry>();
  if (manifest) for (const e of manifest.entries) index.set(e.url, e);

  // ---------- Hero ----------
  const cover = body?.cover && !skipManifest(body.cover.url, index)
    ? body.cover
    : (doc.coverPath ? makeCoverFromPath(doc.coverPath) : undefined);
  blocks.push({
    type: 'hero',
    title: doc.title,
    subtitle: body?.subtitle || doc.subtitle,
    clientName: doc.clientName,
    industry: doc.industry,
    cover,
    meta: body ? heroMeta(body.meta) : [],
    accent: body?.accent || doc.accent,
    tags: doc.tags ?? body?.tags ?? []
  });

  // ---------- Summary ----------
  if (doc.summary) {
    blocks.push({ type: 'summary', text: doc.summary });
  } else if (doc.seoDescription) {
    blocks.push({ type: 'summary', text: doc.seoDescription });
  }

  // ---------- Stats (from doc.results if present as proof of outcome) ----------
  // Stats is reserved for the top-of-page metric row; Results is the full
  // list at the bottom. Only show stats if the page has 3+ clean metrics.
  if (body?.results && body.results.length >= 3) {
    const topThree = body.results.slice(0, 3);
    blocks.push({ type: 'stats', items: topThree });
  }

  // ---------- Body chapters ----------
  const usedIds = new Set<string>();
  const sections = body?.sections ?? [];
  sections.forEach((section, i) => {
    if (GENERIC_CHAPTER.test(section.title.trim())) {
      // Keep the chapter but tag the id; the audit would flag it. We still render.
    }
    const slug = slugifyChapter(section.title, i);
    const id = uniqueId(slug, usedIds);

    blocks.push({
      type: 'chapter',
      id,
      title: section.title,
      lead: section.lead,
      paras: section.paras,
      index: i
    });

    // Points tiles under the chapter head
    if (section.tiles && section.tiles.length > 0) {
      blocks.push({ type: 'points', items: section.tiles, chapterId: id });
    }

    // Quotes before media (short, striking)
    for (const q of section.quotes ?? []) {
      blocks.push({ type: 'quote', text: q.text, by: q.by, chapterId: id });
    }

    // Tables
    for (const t of section.tables ?? []) {
      blocks.push({ type: 'table', head: t.head, rows: t.rows, chapterId: id });
    }

    // Timeline
    if (section.milestones && section.milestones.length > 0) {
      blocks.push({ type: 'timeline', items: section.milestones, chapterId: id });
    }

    // Media inside this chapter, classified and bucketed
    const sectionMedia = usableMedia(section.media ?? [], index);
    const { videos, loops, scrollshots, screens, figures } = classifyMedia(sectionMedia);

    // Loops first (short, atmospheric), then any > 15 s video gets its own block.
    for (const loop of loops) {
      const poster = index.get(loop.url)?.posterAt != null
        ? `${loop.url}#t=${index.get(loop.url)!.posterAt}`
        : undefined;
      blocks.push({ type: 'loop', media: loop, poster, chapterId: id });
    }
    for (const v of videos) {
      const poster = index.get(v.url)?.posterAt != null
        ? `${v.url}#t=${index.get(v.url)!.posterAt}`
        : undefined;
      blocks.push({ type: 'video', media: v, poster, chapterId: id });
    }

    // Scrollshots are tall; one per block
    for (const s of scrollshots) {
      blocks.push({ type: 'scrollshot', media: s, chapterId: id });
    }

    // Figures: respect the section's layoutHint where it fits
    const hint = section.layoutHint;
    if (hint === 'split' && figures.length >= 2) {
      blocks.push({ type: 'split', left: figures[0], right: figures[1], chapterId: id });
      for (const f of figures.slice(2)) blocks.push({ type: 'figure', media: f, chapterId: id });
    } else if (hint === 'mosaic' && figures.length >= MOSAIC_MIN) {
      const items = figures.slice(0, MOSAIC_MAX);
      blocks.push({ type: 'mosaic', items, chapterId: id });
      for (const f of figures.slice(MOSAIC_MAX)) blocks.push({ type: 'figure', media: f, chapterId: id });
    } else if (hint === 'gallery' && figures.length >= WALL_MIN) {
      blocks.push({ type: 'wall', items: figures, chapterId: id });
    } else {
      for (const f of figures) blocks.push({ type: 'figure', media: f, chapterId: id });
    }

    // Screens inside a chapter: proof rail, max RAIL_MAX
    if (screens.length > 0) {
      const sorted = screens
        .slice()
        .sort((a, b) => {
          const sa = index.get(a.url)?.step ?? Number.MAX_SAFE_INTEGER;
          const sb = index.get(b.url)?.step ?? Number.MAX_SAFE_INTEGER;
          return sa - sb;
        })
        .slice(0, RAIL_MAX);
      const flow = index.get(sorted[0]?.url ?? '')?.flow;
      blocks.push({ type: 'rail', items: sorted, chapterId: id, flow });
    }

    // Styles pair (the 50:50 image pair for colour and type)
    if (section.styles && section.styles.length >= 2) {
      const [a, b] = section.styles;
      if (!skipManifest(a.url, index) && !skipManifest(b.url, index)) {
        blocks.push({ type: 'pair', left: a, right: b, chapterId: id });
      }
    }
  });

  // ---------- Closing media (All screens block) ----------
  const allMedia: Media[] = [];
  if (body) {
    for (const s of body.sections) allMedia.push(...s.media);
    allMedia.push(...body.closing);
  }
  const screens = screensBucket(allMedia, index);
  const hasScreens = screens.sets.some(s => s.flows.some(f => f.items.length > 0));
  if (hasScreens) blocks.push(screens);

  // ---------- Results (full list at the bottom) ----------
  if (body?.results && body.results.length > 0) {
    blocks.push({ type: 'results', items: body.results });
  }

  // ---------- Credits ----------
  const cred = credits(doc);
  if (Object.keys(cred).length > 0) blocks.push({ type: 'credits', items: cred });

  // ---------- Presence (Live, App Store, Play Store, Behance, Dribbble, Awards) ----------
  if (body?.links) {
    const links = Object.values(body.links);
    if (links.length > 0) blocks.push({ type: 'presence', links });
  }

  // ---------- Related + Next ----------
  if (doc.related && doc.related.length > 0) blocks.push({ type: 'related', items: doc.related });
  if (doc.next) blocks.push({ type: 'next', item: doc.next });

  return blocks;
}

// ---------- Helpers ----------

function makeCoverFromPath(path: string): Media {
  return {
    label: 'Cover',
    url: path,
    video: /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(path),
    kind: 'cover'
  };
}

// ---------- Exports for tests ----------

export const __internal = {
  slugifyChapter,
  uniqueId,
  classifyMedia,
  screensBucket,
  heroMeta,
  credits
};
