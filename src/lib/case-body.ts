/**
 * Case-study body parser, v2 (2026-11-17). Notion "Body Content" is the case
 * study; the sync stores it in Sanity as `bodyMarkdown`, media already on R2.
 * This turns that markdown into what the page lays out. No fixed blocks, no
 * slot counts. The full grammar is in the wugweb-work skill
 * (`references/body-content-standard.md`); in short:
 *
 *   ## <title>                       ignored (the page has its own H1)
 *   **Key:** value lines             meta (META_KEYS → hero <dl>; Live, App Store,
 *                                    Play Store, Behance, Dribbble, Awards → links;
 *                                    Accent → accent; Results: + "- a | b | c | d")
 *   ### Chapter                      a section; any count
 *   Layout: rail                     optional hint, directly under the heading
 *   lead, paragraphs, *Group*, points, media lines, > quotes, | tables |,
 *   YYYY-MM: milestones (3 or more in one chapter), ### Results lines
 *   ## Media                         v1: labelled media routed by label words or
 *                                    a "Section: <chapter> | <label>" prefix
 *   ## Sanity site copy              v1: long-form copy, preferred when present
 *   ## Gallery (site assets)         v1: closing media
 *
 * v1 bodies parse as before, with these fixes: lines are trimmed before any
 * matching (tab-indented headings no longer collapse into the chapter above),
 * `- **Title**` + an indented description is one point, `#` runs are stripped
 * from titles, a trailing colon on a bold title is dropped, `---` rules and
 * empty list markers are skipped, and a `##` chapter heading after the title
 * line is a chapter. Pure functions only: no imports, safe for node --test.
 */

export interface Tile { group?: string; title?: string; text: string }
export type MediaKind =
  | 'cover' | 'screen' | 'states' | 'web' | 'dashboard' | 'mockup' | 'styles' | 'logo'
  | 'type' | 'colour' | 'pattern' | 'application' | 'print' | 'social' | 'photo' | 'diagram'
  | 'chart' | 'before' | 'after' | 'video' | 'loop' | 'press' | 'award'
  | 'challenge' | 'solution' | 'philosophy' | 'conclusion' | 'about' | 'thumbnail' | 'figure';
export interface Media {
  label: string;
  url: string;
  video: boolean;
  /** What the label says it is; unknown labels are 'figure'. */
  kind: MediaKind;
  /** Caption seed: the text after "Kind:", or the whole label when the kind is unknown. */
  caption?: string;
}
export interface Quote { text: string; by?: string }
export interface Table { head: string[]; rows: string[][] }
export interface Milestone { date: string; text: string }
export interface Result { value: string; what: string; source?: string; asOf?: string }
export interface MetaLink { text: string; href: string }
export interface MetaItem {
  key: string;
  /** The value as written (markdown links included). */
  value: string;
  /** The value with markdown links reduced to their text. */
  text: string;
  /** Markdown links found in the value, in order. */
  links: MetaLink[];
}
export interface PresenceLink { value: string; text: string; href?: string }
export const LAYOUT_HINTS = ['rail', 'split', 'mosaic', 'chapter', 'stats', 'quote', 'timeline', 'gallery'] as const;
export type LayoutHint = typeof LAYOUT_HINTS[number];
export interface Section {
  title: string;
  lead?: string;
  paras: string[];
  tiles: Tile[];
  media: Media[];
  styles: Media[];
  layoutHint?: LayoutHint;
  quotes: Quote[];
  tables: Table[];
  milestones: Milestone[];
}
export interface CaseBody {
  meta: MetaItem[];
  subtitle: string;
  tags: string[];
  cover?: Media;
  sections: Section[];
  closing: Media[];
  results: Result[];
  /** Presence keys (Live, App Store, Play Store, Behance, Dribbble, Awards); never in the hero <dl>. */
  links: Record<string, PresenceLink>;
  /** `Accent:` as a #hex, when it is one. Contrast is checked at render. */
  accent?: string;
  /**
   * The client's brand values as the owner supplied them with the content:
   * `Brand colours:`, `Brand fonts:` and `Brand site:`. They are the first source
   * for colour and type; nothing here is guessed.
   */
  brand?: Brand;
}
export interface BrandColour { hex: string; name?: string }
export interface Brand {
  colours: BrandColour[];
  fonts: string[];
  /** The client's site or product address, whose stylesheet the brand read may open. */
  site?: string;
}
export interface ParseOptions {
  /**
   * The case study's own R2 folder under assets/work/ (from the media
   * manifest). When absent, the folder most of the `## Media` and gallery
   * images live in is used, as in v1.
   */
  ownFolder?: string;
}

const VIDEO = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;
const MEDIA_FILE = /\.(png|jpe?g|webp|gif|avif|svg|mp4|webm|mov|m4v)(\?|#|$)/i;
/** Notion bold comes through as **…**; structure (keys, headings, titles) ignores it. */
const plainB = (s: string) => s.replace(/\*\*/g, '').trim();
/** Title cleanup: bold, `#` runs (`#### Title`, `**#### Title**`), a trailing colon. */
const cleanTitle = (s: string) => plainB(s).replace(/^#+\s*/, '').replace(/\s*#{2,}\s*/g, ' ').replace(/\s*:\s*$/, '').trim();
const META = /^([A-Z][A-Za-z ()/&]{1,30}):\s+(.+)$/;
/** The allowlist for the hero <dl>. Nothing else reaches it. */
export const META_KEYS = ['Category', 'Client', 'Partner', 'Industry', 'Disciplines', 'Team', 'Timeline', 'Platform', 'Year', 'Country', 'Special Thanks'];
export const PRESENCE_KEYS = ['Live', 'App Store', 'Play Store', 'Behance', 'Dribbble', 'Awards'];
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const LIST = /^(?:\d+\.|[-*•])\s+(.*)$/;
const EMPTY_MARKER = /^(?:\d+\.|[-*•])$/;
const RULE = /^(?:-{3,}|\*{3,}|_{3,})$/;
const MILESTONE = /^(?:[-*•]\s+)?(\d{4}(?:-\d{2}){0,2}):\s+(.+)$/;
const QUOTE_MARK = /^["“”‘’']/;

const KINDS: [RegExp, MediaKind][] = [
  [/^(cover|hero)\b/, 'cover'],
  [/^states?\b/, 'states'],
  [/^(screens?|flows?|mobile)\b/, 'screen'],
  [/^web\b/, 'web'],
  [/^dashboards?\b/, 'dashboard'],
  [/^mockups?\b/, 'mockup'],
  [/^(style ?boards?|styles?|mood ?boards?)\b/, 'styles'],
  [/^(client logo|logos?|marks?)\b/, 'logo'],
  [/^(type|typography|typeface)\b/, 'type'],
  [/^colou?rs?\b/, 'colour'],
  [/^patterns?\b/, 'pattern'],
  [/^applications?\b/, 'application'],
  [/^print\b/, 'print'],
  [/^social\b/, 'social'],
  [/^(photos?|photography)\b/, 'photo'],
  [/^diagrams?\b/, 'diagram'],
  [/^charts?\b/, 'chart'],
  [/^before\b/, 'before'],
  [/^after\b/, 'after'],
  [/^loops?\b/, 'loop'],
  [/^videos?\b/, 'video'],
  [/^press\b/, 'press'],
  [/^awards?\b/, 'award'],
  [/^challenges?\b/, 'challenge'],
  [/^solutions?\b/, 'solution'],
  [/^(design philosophy|dp)\b/, 'philosophy'],
  [/^(conclusion|filler)\b/, 'conclusion'],
  [/^about\b/, 'about'],
  [/^thumbnail\b/, 'thumbnail'],
];
/** Labels that name nothing ("Gallery", "Image 3"): a figure with no caption. */
const GENERIC_LABEL = /^(gallery|image|img|media)?\s*\d*$/i;

/** Kind and caption from a media label (`kind[: name][ n]`). */
export function mediaKind(label: string, url = ''): { kind: MediaKind; caption?: string } {
  const l = label.trim();
  const head = l.split(':')[0].trim().toLowerCase();
  const rest = l.includes(':') ? l.slice(l.indexOf(':') + 1).trim() : '';
  const isVideo = VIDEO.test(url);
  for (const [re, kind] of KINDS) {
    if (!re.test(head)) continue;
    const k: MediaKind = isVideo && kind !== 'loop' && kind !== 'video' ? 'video' : kind;
    return rest ? { kind: k, caption: rest } : { kind: k };
  }
  if (isVideo) return l && !GENERIC_LABEL.test(l) ? { kind: 'video', caption: l } : { kind: 'video' };
  return l && !GENERIC_LABEL.test(l) ? { kind: 'figure', caption: l } : { kind: 'figure' };
}

function mediaOf(label: string, url: string): Media {
  return { label, url, video: VIDEO.test(url), ...mediaKind(label, url) };
}

/** A media line in `## Media` / `## Gallery` (v1): image, "- Label: url", or a bare url. */
function mediaFrom(line: string): Media | null {
  const s = line.trim();
  const img = s.match(/^!\[([^\]]*)\]\((https?:[^)\s]+)\)/);
  if (img) return mediaOf(img[1].trim(), img[2]);
  const named = s.match(/^-\s*([^:]+?):\s*(https?:\/\/\S+)$/);
  if (named) return mediaOf(named[1].trim(), named[2]);
  const bare = s.match(/^-?\s*(https?:\/\/\S+)$/);
  if (bare) return mediaOf('', bare[1]);
  return null;
}

/**
 * A media line inside a chapter or the head. Stricter than `mediaFrom` so a
 * point such as "- Website: https://…" stays a point: an image, or a labelled
 * or bare line whose URL is a media file or whose label is Video/Loop.
 */
function inlineMedia(line: string): Media | null {
  const s = line.trim();
  const img = s.match(/^!\[([^\]]*)\]\((https?:[^)\s]+)\)/);
  if (img) return mediaOf(img[1].trim(), img[2]);
  const named = s.match(/^[-*]\s*([^:]+?):\s*(https?:\/\/\S+)$/);
  if (named && (MEDIA_FILE.test(named[2]) || /\b(video|loop)\b/i.test(named[1]))) return mediaOf(named[1].trim(), named[2]);
  const bare = s.match(/^[-*]?\s*(https?:\/\/\S+)$/);
  if (bare && MEDIA_FILE.test(bare[1])) return mediaOf('', bare[1]);
  return null;
}

/** Section a media label belongs to (by the words in its label). */
function mediaKey(label: string): string {
  const l = label.toLowerCase();
  if (/styles?/.test(l)) return 'styles';
  if (/challenge/.test(l)) return 'challenges';
  if (/solution/.test(l)) return 'solutions';
  if (/design philosophy|\bdp\b/.test(l)) return 'philosophy';
  if (/conclusion|filler|impact/.test(l)) return 'outcome';
  if (/about|thumbnail/.test(l)) return 'about';
  return '';
}
function sectionKey(title: string): string {
  const t = title.toLowerCase();
  if (/style/.test(t)) return 'styles';
  if (/challenge|problem/.test(t)) return 'challenges';
  if (/solution|approach|what we built/.test(t)) return 'solutions';
  if (/philosoph|insight|thesis/.test(t)) return 'philosophy';
  if (/conclusion|impact|outcome|result/.test(t)) return 'outcome';
  if (/about|context/.test(t)) return 'about';
  return t;
}

const linksIn = (v: string): MetaLink[] => [...v.matchAll(LINK)].map((m) => ({ text: m[1], href: m[2] }));
const linkText = (v: string) => v.replace(LINK, '$1');

/** `value | what | source | as of` (2 to 4 parts). */
function resultFrom(line: string): Result | null {
  const s = line.trim().replace(/^(?:[-*•]|\d+\.)\s+/, '');
  if (s.startsWith('|') || !s.includes('|')) return null;
  const [value, what, source, asOf] = s.split('|').map((p) => plainB(p));
  if (!value || !what) return null;
  const r: Result = { value, what };
  if (source) r.source = source;
  const as = (asOf || '').replace(/^as of\s+/i, '').trim();
  if (as) r.asOf = as;
  return r;
}

const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
const isTableRule = (row: string) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(row.trim());

/** Lines of one section → lead, paragraphs, points and the v2 blocks. */
function build(title: string, lines: string[]): { sec: Section; results: Result[] } {
  const sec: Section = { title, paras: [], tiles: [], media: [], styles: [], quotes: [], tables: [], milestones: [] };
  const results: Result[] = [];
  const isResults = /^results$/i.test(title);
  const rows = lines
    .map((raw) => ({ t: raw.trim(), indented: /^[\t ]+\S/.test(raw) }))
    .filter(({ t }) => t && t !== '**' && !EMPTY_MARKER.test(t) && !RULE.test(t));
  // Three or more dated lines make a timeline; fewer stay ordinary text (v1).
  const timeline = rows.filter(({ t }) => MILESTONE.test(t)).length >= 3;
  const structural = (t: string) =>
    LIST.test(t) || /^#{2,}/.test(t) || /^!\[/.test(t) || /^>/.test(t) || /^\|/.test(t)
    || /^\*([^*].*?)\*$/.test(t) || (timeline && MILESTONE.test(t)) || !!inlineMedia(t);
  let group: string | undefined;
  let prevQuote = false;
  let lastTable: Table | null = null;
  for (let i = 0; i < rows.length; i++) {
    const line = rows[i].t;
    const next = rows[i + 1];
    const wasQuote = prevQuote;
    prevQuote = false;
    const tableRow = /^\|.*\|$/.test(line);
    if (!tableRow) lastTable = null;

    // Layout hint: only before any content.
    const hint = line.match(/^Layout:\s*([a-z]+)\s*$/i);
    if (hint && (LAYOUT_HINTS as readonly string[]).includes(hint[1].toLowerCase())
      && !sec.lead && !sec.paras.length && !sec.tiles.length && !sec.media.length && !sec.layoutHint) {
      sec.layoutHint = hint[1].toLowerCase() as LayoutHint;
      continue;
    }
    // Media anywhere in the chapter attaches to it, in order.
    const m = inlineMedia(line);
    if (m) {
      if (/client logo/i.test(m.label)) continue;
      if (m.kind === 'styles' && !m.video) sec.styles.push(m); else sec.media.push(m);
      continue;
    }
    // Results lines in a ### Results chapter.
    if (isResults) { const r = resultFrom(line); if (r) { results.push(r); continue; } }
    // > "Quote" then > Name, Role, Organisation.
    if (/^>/.test(line)) {
      const q = line.replace(/^>\s*/, '').trim();
      prevQuote = true;
      if (!q) continue;
      const last = sec.quotes[sec.quotes.length - 1];
      const open = !!last && !last.by && QUOTE_MARK.test(last.text) && !/["”’']$/.test(last.text);
      if (wasQuote && last && !last.by && open) last.text += ` ${q}`;
      else if (wasQuote && last && !last.by && !QUOTE_MARK.test(q)) last.by = q.replace(/^[-~]\s*/, '');
      else sec.quotes.push({ text: q });
      continue;
    }
    // | Markdown | table |
    if (tableRow) {
      if (!lastTable) { lastTable = { head: [], rows: [] }; sec.tables.push(lastTable); }
      if (isTableRule(line)) { if (!lastTable.head.length && lastTable.rows.length === 1) lastTable.head = lastTable.rows.pop() || []; }
      else lastTable.rows.push(cells(line));
      continue;
    }
    // YYYY-MM: milestone (before the titled-point heuristic).
    const ms = timeline ? line.match(MILESTONE) : null;
    if (ms) { sec.milestones.push({ date: ms[1], text: ms[2].trim() }); continue; }
    // *For members* → group label (single asterisks only).
    const g = line.match(/^\*([^*].*?)\*$/);
    if (g) { group = g[1].trim(); continue; }
    // #### Title + description.
    const h4 = line.match(/^#{4,}\s*(.+)$/);
    if (h4) {
      const t = cleanTitle(h4[1]);
      if (next && !structural(next.t)) { sec.tiles.push({ group, title: t, text: next.t }); i++; }
      else if (t) group = t;
      continue;
    }
    const li = line.match(LIST);
    if (li) {
      const body = li[1].trim();
      // - **Title** + (indented) description on the next line = one point.
      const boldOnly = body.match(/^\*\*([^*]+)\*\*\s*:?$/);
      const shortBare = !/[.!?:]$/.test(plainB(body)) && plainB(body).length <= 70;
      if ((boldOnly || (shortBare && next?.indented)) && next && !structural(next.t)) {
        sec.tiles.push({ group, title: cleanTitle(body), text: next.t });
        i++;
        continue;
      }
      const tm = plainB(body).match(/^([^:]{2,70}):\s+(.+)$/);
      sec.tiles.push(tm ? { group, title: cleanTitle(tm[1]), text: tm[2].trim() } : { group, text: boldOnly ? cleanTitle(body) : body });
      continue;
    }
    // A bold-only line followed by text is a titled point (`**Title**`, `**Title:**`).
    const boldLine = line.match(/^\*\*([^*]+)\*\*:?$/);
    if (boldLine && next && !structural(next.t)) {
      sec.tiles.push({ group, title: cleanTitle(boldLine[1]), text: next.t });
      i++;
      continue;
    }
    // Long copy: a short unpunctuated line followed by a longer sentence is a titled point.
    const bare = plainB(line);
    if (bare.length <= 70 && !/[.:!?]$/.test(bare) && next && !structural(next.t) && plainB(next.t).length > bare.length) {
      sec.tiles.push({ group, title: cleanTitle(line), text: next.t });
      i++;
      continue;
    }
    if (!sec.tiles.length && !sec.lead) sec.lead = line;
    else sec.paras.push(line);
  }
  return { sec, results };
}

const hasContent = (s: Section) => !!(s.lead || s.paras.length || s.tiles.length || s.media.length || s.styles.length
  || s.quotes.length || s.tables.length || s.milestones.length);

function sections(lines: string[]): { secs: Section[]; results: Result[] } {
  const out: Section[] = [];
  const results: Result[] = [];
  let cur: { title: string; lines: string[] } | null = null;
  const flush = (c: { title: string; lines: string[] } | null) => {
    if (!c) return;
    const b = build(c.title, c.lines);
    results.push(...b.results);
    out.push(b.sec);
  };
  for (const line of lines) {
    const h3 = line.trim().match(/^###\s+(.*)$/);
    if (h3) {
      flush(cur);
      cur = { title: cleanTitle(h3[1]).replace(/\s*\((context)\)\s*/i, '').trim(), lines: [] };
    } else if (cur) cur.lines.push(line);
  }
  flush(cur);
  return { secs: out.filter(hasContent), results };
}

export function parseCaseBody(md: string | null | undefined, opts: ParseOptions = {}): CaseBody | null {
  if (!md || !md.trim()) return null;
  const parts: { head: string; lines: string[] }[] = [{ head: '', lines: [] }];
  for (const line of md.replace(/\r/g, '').split('\n')) {
    const h2 = line.trim().match(/^##\s+(?!#)(.*)$/);
    if (h2) parts.push({ head: plainB(h2[1]), lines: [] });
    else parts[parts.length - 1].lines.push(line);
  }
  const is = (p: { head: string }, re: RegExp) => re.test(p.head);
  const special = /^(media|gallery|(sanity|framer) site copy)/i;
  const mediaPart = parts.find((p) => is(p, /^media/i));
  const copyPart = parts.find((p) => is(p, /^(sanity|framer) site copy/i));
  const galleryPart = parts.find((p) => is(p, /^gallery/i));

  // Intro = everything but the v1 parts. A `##` before the first `###` is a
  // title line (ignored, so the meta under it is never lost); a `##` after a
  // chapter has started is a chapter written one level too high.
  const introLines: string[] = [];
  let inChapters = false;
  parts.forEach((p, i) => {
    if (i > 0 && is(p, special)) return;
    if (i > 0 && inChapters) introLines.push(`### ${p.head}`);
    for (const l of p.lines) { introLines.push(l); if (/^###\s/.test(l.trim())) inChapters = true; }
  });

  // Head: meta lines, a Results: block and media before the first chapter.
  const meta: MetaItem[] = [];
  const links: Record<string, PresenceLink> = {};
  let subtitle = '';
  let tags: string[] = [];
  let accent: string | undefined;
  const brand: Brand = { colours: [], fonts: [] };
  const results: Result[] = [];
  const headMedia: Media[] = [];
  const shortLines: string[] = [];
  let inHead = true;
  let inResults = false;
  const takeMeta = (k: string, raw: string) => {
    const v = raw.trim();
    if (k === 'Results') { inResults = true; return; }
    inResults = false;
    if (!v || /^(none|n\/a|-)$/i.test(v)) return;
    if (k === 'Subtitle') subtitle = v;
    else if (k === 'Tags') tags = v.split(',').map((t) => t.trim()).filter(Boolean);
    else if (k === 'Accent') { const h = v.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i); if (h) accent = `#${h[1]}`; }
    else if (/^Brand colou?rs?$/i.test(k)) {
      // "#EA1828 primary, #1A1A1A ink" or "primary #EA1828; ink #1A1A1A": each item is one hex and an optional name.
      for (const part of v.split(/[,;]/)) {
        const h = part.match(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i);
        if (!h) continue;
        const name = part.replace(h[0], '').replace(/[()]/g, ' ').trim();
        const hex = `#${h[1]}`.toUpperCase();
        if (!brand.colours.some((c) => c.hex === hex)) brand.colours.push(name ? { hex, name } : { hex });
      }
    }
    else if (/^Brand fonts?$/i.test(k)) brand.fonts = v.split(/[,;]/).map((t) => t.trim()).filter(Boolean);
    else if (/^Brand site$/i.test(k)) { const u = linksIn(v)[0]?.href || (/^https?:\/\/\S+$/.test(v) ? v : undefined); if (u) brand.site = u; }
    else if (PRESENCE_KEYS.includes(k)) {
      const ls = linksIn(v);
      const href = ls[0]?.href || (/^https?:\/\/\S+$/.test(v) ? v : undefined);
      links[k] = href ? { value: v, text: linkText(v), href } : { value: v, text: linkText(v) };
    } else if (META_KEYS.includes(k)) meta.push({ key: k, value: v, text: linkText(v), links: linksIn(v) });
  };
  for (const line of introLines) {
    const t = line.trim();
    if (/^###\s/.test(t)) inHead = false;
    if (!inHead) { shortLines.push(line); continue; }
    if (!t) continue;
    const media = inlineMedia(t);
    if (media) { headMedia.push(media); continue; }
    if (inResults) { const r = resultFrom(t); if (r) { results.push(r); continue; } }
    // Several **Key:** pairs may share one line; one pair per line is the v1 form.
    const pairs = [...t.matchAll(/\*\*([^*:]+):\*\*\s*((?:(?!\*\*[^*:]+:\*\*).)*)/g)];
    if (pairs.length > 1) { for (const p of pairs) takeMeta(p[1].trim(), p[2]); continue; }
    const bareKey = plainB(t).match(/^([A-Z][A-Za-z ]{1,30}):$/);
    if (bareKey) { takeMeta(bareKey[1], ''); continue; }
    const m = plainB(t).match(META);
    if (m) takeMeta(m[1], m[2]);
  }

  const longCopy = copyPart ? sections(copyPart.lines.filter((l) => !/^The long-form copy as published/i.test(l.trim()))) : null;
  const shortCopy = sections(shortLines);
  const chosen = longCopy && longCopy.secs.length ? longCopy : shortCopy;
  const secs = chosen.secs;
  results.push(...chosen.results);

  // Borrowed stock: images stored in another case study's folder (the old
  // layout reused the same filler shots across many case studies). Images
  // from any folder other than the case study's own are not shown. Videos are
  // always kept, and media written inside a chapter is the owner's choice.
  const folderOf = (u: string) => (u.match(/\/assets\/work\/([^/]+)\//) || [])[1] || '';
  const allMedia = [...(mediaPart?.lines || []), ...(galleryPart?.lines || [])].map(mediaFrom).filter((m): m is Media => !!m);
  let ownFolder = opts.ownFolder || '';
  if (!ownFolder) {
    const counts: Record<string, number> = {};
    for (const m of allMedia) { const f = folderOf(m.url); if (f && !m.video) counts[f] = (counts[f] || 0) + 1; }
    ownFolder = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  }
  const borrowed = (m: Media) => !m.video && !!ownFolder && !!folderOf(m.url) && folderOf(m.url) !== ownFolder;

  // Media → cover, the section it names, or the closing grid.
  let cover: Media | undefined;
  const closing: Media[] = [];
  const seen = new Set<string>(secs.flatMap((s) => [...s.media, ...s.styles].map((m) => m.url)));
  const findSection = (name: string) => {
    const n = cleanTitle(name).toLowerCase();
    return secs.find((s) => s.title.toLowerCase() === n)
      || secs.find((s) => s.title.toLowerCase().startsWith(n))
      || secs.find((s) => sectionKey(s.title) === sectionKey(n));
  };
  const place = (m0: Media) => {
    let m = m0;
    if (!/^https?:/.test(m.url) || seen.has(m.url) || borrowed(m)) return;
    seen.add(m.url);
    if (/client logo/i.test(m.label)) return;
    // "Section: <chapter> | <label>" routes to that chapter by name.
    const routed = m.label.match(/^section:\s*([^|]+?)\s*(?:\|\s*(.*))?$/i);
    if (routed) {
      m = mediaOf((routed[2] || '').trim(), m.url);
      const home = findSection(routed[1]);
      if (home) { if (m.kind === 'styles' && !m.video) home.styles.push(m); else home.media.push(m); }
      else closing.push(m);
      return;
    }
    if (/^cover/i.test(m.label) && !m.video) { if (!cover) { cover = m; return; } }
    const key = mediaKey(m.label);
    let target = key && secs.find((s) => sectionKey(s.title) === key);
    if (key === 'styles') {
      // Styles always sit together as their own row, in the About section.
      const home = secs.find((s) => sectionKey(s.title) === 'styles') || secs.find((s) => sectionKey(s.title) === 'about') || secs[0];
      if (home && !m.video) { home.styles.push(m); return; }
    }
    if (!target && key === 'outcome') target = secs[secs.length - 1];
    if (target) target.media.push(m);
    else closing.push(m);
  };
  for (const m of headMedia) place(m);
  for (const l of mediaPart?.lines || []) { const m = mediaFrom(l); if (m) place(m); }
  for (const l of galleryPart?.lines || []) { const m = mediaFrom(l); if (m) place(m); }

  const out: CaseBody = { meta, subtitle, tags, cover, sections: secs, closing, results, links };
  if (accent) out.accent = accent;
  if (brand.colours.length || brand.fonts.length || brand.site) out.brand = brand;
  return out;
}

/** Escape text and render **bold** and [text](url). */
export function inline(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener" target="_blank">$1</a>');
}
