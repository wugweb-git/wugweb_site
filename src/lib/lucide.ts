/**
 * Lucide icons as inline SVG strings, server side only (frontmatter). The
 * raw files are bundled once; nothing reaches the client unless a component
 * renders the returned string. Names are kebab-case Lucide names, e.g.
 * "heart-pulse" (lucide.dev/icons), as stored on `sector.icon`.
 *
 * Unknown or empty name → null; callers drop the icon and may log a warning.
 */
const ICONS = import.meta.glob('/node_modules/lucide-static/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function lucideSvg(name: string | undefined, className: string): string | null {
  const key = (name || '').trim().toLowerCase();
  if (!key) return null;
  const raw = ICONS[`/node_modules/lucide-static/icons/${key}.svg`];
  if (!raw) return null;
  return raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*class="[^"]*"/, ` class="${className}" aria-hidden="true" focusable="false"`)
    .replace(/\s*width="24"\s*height="24"/, '')
    .replace(/\s+/g, ' ')
    .trim();
}
