/**
 * Step icons — a stroked set matched on a step's own wording.
 *
 * Self-contained: no icon dependency and no new assets. Shared by the
 * ProcessMap and the approach cards so a step called "Discovery" gets the same
 * mark in both places.
 *
 * The old-site art in `public/assets/services/reference/` was the alternative
 * and was rejected on inspection: four icons exist for Experience but only one
 * is genuinely multicolour, the other two are flat #D0D0D0, and no other pillar
 * has more than one. A consistent set beats a grab-bag.
 *
 * First match wins, so order matters — the general terms sit at the bottom.
 */
const ICONS: [RegExp, string][] = [
  [/kick.?off|handover|handoff|meeting|workshop|stakeholder|collabor/i, 'M3 13a4 4 0 0 1 8 0M7 5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4M11.5 13a3.2 3.2 0 0 1 4.5-2.9'],
  [/interview|conversation|voice|survey|feedback|immersive/i, 'M2.5 4.5h11v7h-6l-3 2.5v-2.5h-2z'],
  [/competitor|benchmark|market|audit|analys|analyz|result|measur|metric|report|analytic|data.?driven|data/i, 'M2.5 13.5h11M4.5 11V7M8 11V3.5M11.5 11V8.5'],
  [/brain|storm|ideat|concept|idea|hypoth|principl/i, 'M8 2.2a4 4 0 0 1 2.4 7.2v1.6h-4.8V9.4A4 4 0 0 1 8 2.2ZM6.4 13.2h3.2'],
  [/journey|flow|route|roadmap|path|mapping/i, 'M3 12.5c3 0 2-8 5-8s2 5 5 5M3 12.5h.01M13 9.5h.01'],
  [/sitemap|architect|structure|taxonom|hierarch|design system|system/i, 'M8 2.5v3M4 13.5v-3M12 13.5v-3M4 10.5h8v-2H4zM6.5 5.5h3v3h-3z'],
  [/wireframe|prototyp|layout|frame|draft|sketch/i, 'M2.5 3.5h11v9h-11zM2.5 6.5h11M6 6.5v6'],
  [/usability|user test|testing|validat|qa|quality|review/i, 'M6.5 2.5h3v2h-3zM4 4.5h8v9H4zM6.2 9l1.3 1.3 2.4-2.6'],
  [/accessib|inclusive|wcag/i, 'M8 2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2M4 6.4h8M8 6.4v3.2M8 9.6l-1.8 3.8M8 9.6l1.8 3.8'],
  [/look and feel|visual|ui design|palette|identity|craft|art direction/i, 'M8 2.5a5.5 5.5 0 1 0 0 11c.9 0 1.2-.7.7-1.3-.5-.7-.2-1.7.8-1.7h1a3 3 0 0 0 3-3c0-2.8-2.5-5-5.5-5M5.5 7.5h.01M8 5.5h.01M10.5 7.5h.01'],
  [/research|discover|explore|insight|persona|study/i, 'M7.2 2.6a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2M10.6 10.6 13.5 13.5'],
  [/build|develop|engineer|code|implement|integrat|automat/i, 'M6 5.5 3 8l3 2.5M10 5.5 13 8l-3 2.5'],
  [/launch|ship|deploy|go.?live|scale|optimi|growth|iterat|refine|post.?launch/i, 'M8 2.5c2.4 1.6 3.4 4 3.4 6.4L8 12l-3.4-3.1c0-2.4 1-4.8 3.4-6.4ZM6.6 12.2 5.4 14M9.4 12.2l1.2 1.8'],
  [/content|copy|narrative|messag|document|spec|guideline/i, 'M4 2.5h8v11H4zM6 5.5h4M6 8h4M6 10.5h2.5'],
  [/govern|operat|process|training|enable|support|maintain/i, 'M8 5.9a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2M8 2.5v1.6M8 11.9v1.6M13.5 8h-1.6M4.1 8H2.5M11.9 4.1l-1.1 1.1M5.2 10.8l-1.1 1.1M11.9 11.9l-1.1-1.1M5.2 5.2 4.1 4.1'],
];

const FALLBACK = 'M8 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7';

export function iconFor(text: string): string {
  return ICONS.find(([re]) => re.test(text))?.[1] ?? FALLBACK;
}
