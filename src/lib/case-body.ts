/**
 * Case-study body (2026-10-13). Notion "Body Content" is the case study; the
 * sync stores it in Sanity as `bodyMarkdown`, media already on R2. This turns
 * that markdown into what the page lays out — no fixed blocks, no slot counts:
 *
 *   ## <title>                       ignored (the page has its own H1)
 *   Key: value lines                 meta panel (only the lines present)
 *   ### Section                      short copy — used when there is no site copy
 *   ## Media                         labelled media: ![Cover Image](url), "- About Video URL: url"
 *   ## Sanity site copy              long-form copy, preferred when present
 *   ## Gallery (site assets)         closing media grid
 *
 * Every point becomes a tile (any count fits the grid). Media lands after the
 * section its label names (Challenge Image 1 → Challenges) as a media row;
 * a row of 1 is full width, 2 side by side, 3+ a grid.
 */

export interface Tile { group?: string; title?: string; text: string }
export interface Media { label: string; url: string; video: boolean }
export interface Section { title: string; lead?: string; paras: string[]; tiles: Tile[]; media: Media[]; styles: Media[] }
export interface CaseBody {
  meta: { key: string; value: string }[];
  subtitle: string;
  tags: string[];
  cover?: Media;
  sections: Section[];
  closing: Media[];
}

const VIDEO = /\.(mp4|webm|mov)(\?|$)/i;
/** Notion bold comes through as **…**; structure (keys, headings, titles) ignores it. */
const plainB = (s: string) => s.replace(/\*\*/g, '').trim();
const META = /^([A-Z][A-Za-z ()/&]{1,30}):\s+(.+)$/;
const META_KEYS = ['Category', 'Client', 'Partner', 'Industry', 'Disciplines', 'Team', 'Timeline', 'Platform', 'Year', 'Country', 'Special Thanks'];

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

function mediaFrom(line: string): Media | null {
  const s = line.trim();
  const img = s.match(/^!\[([^\]]*)\]\((https?:[^)\s]+)\)/);
  if (img) return { label: img[1].trim(), url: img[2], video: VIDEO.test(img[2]) };
  const named = s.match(/^-\s*([^:]+?):\s*(https?:\/\/\S+)$/);
  if (named) return { label: named[1].trim(), url: named[2], video: VIDEO.test(named[2]) };
  const bare = s.match(/^-?\s*(https?:\/\/\S+)$/);
  if (bare) return { label: '', url: bare[1], video: VIDEO.test(bare[1]) };
  return null;
}

/** Lines of one section → lead, paragraphs and tiles. */
function build(title: string, lines: string[]): Section {
  const sec: Section = { title, paras: [], tiles: [], media: [], styles: [] };
  let group: string | undefined;
  const clean = lines.map((l) => l.trim()).filter((l) => l && l !== '-' && l !== '**');
  for (let i = 0; i < clean.length; i++) {
    const line = clean[i];
    const g = line.match(/^\*([^*].*?)\*$/); // *For members* → group label (single asterisks only)
    if (g) { group = g[1].trim(); continue; }
    const li = line.match(/^(?:\d+\.|[-*•])\s+(.*)$/);
    if (li) {
      const m = plainB(li[1]).match(/^([^:]{2,70}):\s+(.+)$/);
      sec.tiles.push(m ? { group, title: m[1].trim(), text: m[2].trim() } : { group, text: li[1].trim() });
      continue;
    }
    const next = clean[i + 1] || '';
    // Long copy: a short unpunctuated line followed by a longer sentence is a titled point.
    const bare = plainB(line);
    if (bare.length <= 70 && !/[.:!?]$/.test(bare) && next && !/^(?:\d+\.|[-*•])\s/.test(next) && plainB(next).length > bare.length) {
      sec.tiles.push({ group, title: bare, text: next });
      i++;
      continue;
    }
    if (!sec.tiles.length && !sec.lead) sec.lead = line;
    else sec.paras.push(line);
  }
  return sec;
}

function sections(lines: string[]): Section[] {
  const out: Section[] = [];
  let cur: { title: string; lines: string[] } | null = null;
  for (const line of lines) {
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      if (cur) out.push(build(cur.title, cur.lines));
      cur = { title: plainB(h3[1]).replace(/\s*\((context)\)\s*/i, '').trim(), lines: [] };
    } else if (cur) cur.lines.push(line);
  }
  if (cur) out.push(build(cur.title, cur.lines));
  return out.filter((s) => s.lead || s.paras.length || s.tiles.length);
}

export function parseCaseBody(md: string | null | undefined): CaseBody | null {
  if (!md || !md.trim()) return null;
  const parts: { head: string; lines: string[] }[] = [{ head: '', lines: [] }];
  for (const line of md.replace(/\r/g, '').split('\n')) {
    const h2 = line.match(/^##\s+(?!#)(.*)$/);
    if (h2) parts.push({ head: h2[1].trim(), lines: [] });
    else parts[parts.length - 1].lines.push(line);
  }
  const is = (p: { head: string }, re: RegExp) => re.test(p.head);
  const intro = parts.filter((p, i) => i === 0 || !is(p, /^(media|gallery|(sanity|framer) site copy)/i));
  const mediaPart = parts.find((p) => is(p, /^media/i));
  const copyPart = parts.find((p) => is(p, /^(sanity|framer) site copy/i));
  const galleryPart = parts.find((p) => is(p, /^gallery/i));

  // Meta: "Key: value" lines before the first ### heading.
  const meta: { key: string; value: string }[] = [];
  let subtitle = '';
  let tags: string[] = [];
  const shortLines: string[] = [];
  let inHead = true;
  for (const line of intro.flatMap((p) => p.lines)) {
    if (/^###\s/.test(line)) inHead = false;
    if (!inHead) { shortLines.push(line); continue; }
    const m = plainB(line).match(META);
    if (!m) continue;
    const [, k, raw] = m;
    const v = raw.trim();
    if (!v || /^(none|n\/a|-)$/i.test(v)) continue;
    if (k === 'Subtitle') subtitle = v;
    else if (k === 'Tags') tags = v.split(',').map((t) => t.trim()).filter(Boolean);
    else if (META_KEYS.includes(k)) meta.push({ key: k, value: v });
  }

  const longCopy = copyPart ? sections(copyPart.lines.filter((l) => !/^The long-form copy as published/i.test(l.trim()))) : [];
  const secs = longCopy.length ? longCopy : sections(shortLines);

  // Borrowed stock: images stored in another case study's folder (the old
  // layout reused the same filler shots across many case studies). A case
  // study's own folder is the one most of its images live in; images from any
  // other folder are not shown. Videos are always kept.
  const folderOf = (u: string) => (u.match(/\/assets\/work\/([^/]+)\//) || [])[1] || '';
  const allMedia = [...(mediaPart?.lines || []), ...(galleryPart?.lines || [])].map(mediaFrom).filter((m): m is Media => !!m);
  const counts: Record<string, number> = {};
  for (const m of allMedia) { const f = folderOf(m.url); if (f && !m.video) counts[f] = (counts[f] || 0) + 1; }
  const ownFolder = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const borrowed = (m: Media) => !m.video && !!ownFolder && !!folderOf(m.url) && folderOf(m.url) !== ownFolder;

  // Media → cover, the section it names, or the closing grid.
  let cover: Media | undefined;
  const closing: Media[] = [];
  const seen = new Set<string>();
  const place = (m: Media) => {
    if (!/^https?:/.test(m.url) || seen.has(m.url) || borrowed(m)) return;
    seen.add(m.url);
    if (/client logo/i.test(m.label)) return;
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
  for (const l of mediaPart?.lines || []) { const m = mediaFrom(l); if (m) place(m); }
  for (const l of galleryPart?.lines || []) { const m = mediaFrom(l); if (m) place(m); }

  return { meta, subtitle, tags, cover, sections: secs, closing };
}

/** Escape text and render **bold** and [text](url). */
export function inline(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener" target="_blank">$1</a>');
}
