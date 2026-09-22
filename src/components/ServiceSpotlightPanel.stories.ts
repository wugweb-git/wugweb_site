import type { Meta, StoryObj } from '@storybook-astro/framework';
import ServiceSpotlightPanel, { type SpotlightItem } from './ServiceSpotlightPanel.astro';

/**
 * "What we can do" showcase — one row spotlit at a time by hover, scroll (on
 * touch), or idle auto-advance. Live on `/services/brand` only today; full
 * spec: `kits_design_system/docs/blocks/service-spotlight-panel.md`.
 *
 * Interaction to check in the canvas: hover a row — it inverts to a light
 * surface, its thumbnail grows, its clip (if any) plays, and the backdrop
 * washes with its poster; leave the panel idle a few seconds to see the
 * auto-advance cycle with the dwell progress hairline.
 */
const meta: Meta<typeof ServiceSpotlightPanel> = {
  title: 'Blocks/Service Spotlight Panel',
  component: ServiceSpotlightPanel,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ServiceSpotlightPanel>;

const items: SpotlightItem[] = [
  { title: 'Brand Strategy', n: '01', index: 0, blurb: 'Positioning, architecture and the narrative that ties them together.' },
  { title: 'Brand Positioning', n: '02', index: 1, blurb: 'Where you sit against the category, stated plainly enough to brief a team on.' },
  { title: 'Brand Narrative', n: '03', index: 2, blurb: 'The story a brand tells about itself, consistently, across every surface.' },
  { title: 'Brand Identity Systems', n: '04', index: 3, blurb: 'Mark, type, colour and motion as one governed system, not a logo file.' },
  { title: 'Voice & Tone', n: '05', index: 4, blurb: 'How the brand actually sounds, written down so it survives a handoff.' },
  { title: 'Brand Guidelines', n: '06', index: 5, blurb: 'The reference every future designer and vendor works from.' },
];

export const Default: Story = {
  args: { items, idPrefix: 'brand' },
};

export const Dense: Story = {
  name: 'Dense (two columns, 1024px+)',
  args: { items: [...items, ...items.slice(0, 6).map((it, i) => ({ ...it, index: i + 6, n: String(i + 7).padStart(2, '0') }))], dense: true, idPrefix: 'engineering' },
};

export const CustomTheme: Story = {
  name: 'Custom theme colour',
  args: { items, idPrefix: 'experience', themeBase: '#09E2C0' },
};
