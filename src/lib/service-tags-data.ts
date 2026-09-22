/**
 * Default content for `ServiceTagField.astro` — one draggable tag per
 * service pillar, framed as the question it answers. Extracted out of
 * `index.astro`'s frontmatter (2026-09-16) so the homepage and Storybook
 * fixtures share one source.
 */
import { hardcodedServices } from './services-data';

export interface ServiceTag {
  title: string;
  slug: string;
  /** Authored resting position, [x%, y%] within the field. */
  pos: [number, number];
  /** Authored resting tilt, degrees. */
  rot: number;
  n: string;
  q: string;
  copy: string;
  body: string;
  video: string;
}

/** The six service pillars, each framed as the question it answers. Media
 *  are the client's own hosted clips. */
const PILLARS = [
  { n: '01', title: 'Strategy',    q: 'What should we build?',                     video: '/assets/services/martech-genai/digital-transformation-roadmaps.mp4' },
  { n: '02', title: 'Engineering', q: 'How do we build and scale it?',             video: '/assets/more/home/web-app-development.mp4' },
  { n: '03', title: 'Brand',       q: 'How should we be perceived?',               video: '/assets/more/home/brand-strategy.mp4' },
  { n: '04', title: 'Growth',      q: 'How do we acquire and retain customers?',   video: '/assets/more/home/martech-genai.mp4' },
  { n: '05', title: 'Operations',  q: 'How do we run, secure and improve it?',     video: '/assets/services/martech-genai/seamless-platform-integration.mp4' },
  { n: '06', title: 'Experience',  q: 'How should people interact with us?',       video: '/assets/more/home/experience-design.mp4' },
];

/** Authored positions/rotations, matching how the reference gives every tag
 *  its own placement and tilt. */
const LAYOUT: { title: string; slug: string; pos: [number, number]; rot: number }[] = [
  { title: 'Strategy',    slug: 'strategy',    pos: [6, 8],   rot: -6 },
  { title: 'Brand',       slug: 'brand',       pos: [52, 2],  rot: 4 },
  { title: 'Experience',  slug: 'experience',  pos: [30, 30], rot: -3 },
  { title: 'Engineering', slug: 'engineering', pos: [2, 52],  rot: 7 },
  { title: 'Growth',      slug: 'growth',      pos: [55, 46], rot: -5 },
  { title: 'Operations',  slug: 'operations',  pos: [26, 68], rot: 6 },
];

export const SERVICE_TAGS: ServiceTag[] = LAYOUT.map((t) => {
  const pillar = PILLARS.find((p) => p.title === t.title);
  const svc = hardcodedServices[t.slug];
  return {
    ...t,
    n: pillar?.n ?? '',
    q: pillar?.q ?? '',
    // Real service copy, not a rewrite — the pillar's question as the lead
    // and the service page's own subtitle/body as the supporting line.
    copy: svc?.subtitle || '',
    body: (typeof svc?.body === 'string' ? svc.body : '').split('. ').slice(0, 2).join('. '),
    video: pillar?.video ?? '',
  };
});
