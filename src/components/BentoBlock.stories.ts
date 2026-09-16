import type { Meta, StoryObj } from '@storybook-astro/framework';
import BentoBlock, { type BentoTile } from './BentoBlock.astro';

/**
 * The "Why Wugweb" bento used on `/services` and each `/services/[slug]`
 * page. Spec: `kits_design_system/docs/blocks/bento-block.md`.
 *
 * Interaction to check in the canvas: hover any tile for the cursor-invert
 * dot; a `video` tile with `fit: 'cover'` autoplays once it scrolls into
 * view and pauses when it leaves.
 */
const meta: Meta<typeof BentoBlock> = {
  title: 'Blocks/Bento Block',
  component: BentoBlock,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof BentoBlock>;

const whyWugwebTiles: BentoTile[] = [
  { col: 0, span: 'tall', kind: 'reason', tone: 'dark', eyebrow: 'Why Wugweb', title: 'Six disciplines, one team', body: 'Strategy, brand, experience, engineering, growth and operations sit under one roof, so a handoff never means starting over.' },
  { col: 0, span: 'short', kind: 'stat', tone: 'light', value: '44', label: 'Industries served' },
  { col: 1, span: 'mid', kind: 'media', tone: 'accent', image: '/assets/services/brand/posters/Brand Identity Systems.webp', fit: 'cover', title: 'Proven across sectors', chips: [{ value: 'Fintech' }, { value: 'D2C' }, { value: 'SaaS' }] },
  { col: 1, span: 'slim', kind: 'reason', tone: 'dark', title: 'Systems, not one-offs', body: 'Every deliverable plugs into the next — a brand system feeds the design system, which feeds the build.' },
  { col: 2, span: 'mid', kind: 'checklist', tone: 'light', title: 'Start smart, start small', list: ['Scoped pilot engagement', 'Fixed-fee discovery sprint', 'Clear go/no-go gate'] },
  { col: 2, span: 'strip', kind: 'cta', tone: 'accent', title: 'Talk to the team', href: '/contact-us', linkLabel: 'Start a project' },
];

export const WhyWugweb: Story = {
  args: {
    heading: 'Why Wugweb',
    lede: 'A studio built to run the whole arc, not just one leg of it.',
    tiles: whyWugwebTiles,
    columns: 3,
    showNumbers: false,
  },
};

const services: Story = {
  args: {
    heading: 'What we bring',
    tiles: whyWugwebTiles.slice(0, 3),
    columns: 3,
    showNumbers: true,
  },
};
export const Numbered: Story = services;

export const TwoColumn: Story = {
  args: {
    heading: 'Compact layout',
    tiles: whyWugwebTiles.slice(0, 4),
    columns: 2,
    showNumbers: false,
  },
};
