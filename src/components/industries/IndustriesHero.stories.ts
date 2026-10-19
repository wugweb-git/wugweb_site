import type { Meta, StoryObj } from '@storybook-astro/framework';
import IndustriesHero from './IndustriesHero.astro';

/**
 * /footer/industries hero. Spec: `kits_design_system/docs/blocks/industries-directory.md`.
 * Live data: the Sanity sectors ticked for the showcase, in showcase order.
 * Fixtures use real sector names. Resize the canvas to check the tiers:
 * x < 480 no diagram; 480 ≤ x < 768 four nodes; 768 ≤ x < 1024 stacked;
 * x ≥ 1024 split.
 */
const meta: Meta<typeof IndustriesHero> = {
  title: 'Blocks/Industries/Hero',
  component: IndustriesHero,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof IndustriesHero>;

const copy = {
  title: 'We understand the context behind the product.',
  lead: 'Every industry has different customers, constraints, regulations and ways of working. We bring cross-industry experience to build products and systems that fit the world they operate in.',
};

const eight = [
  { name: 'Fintech', icon: 'wallet' },
  { name: 'BFSI', icon: 'landmark' },
  { name: 'Consumer & Retail', icon: 'shopping-bag' },
  { name: 'Technology', icon: 'cpu' },
  { name: 'Healthcare', icon: 'heart-pulse' },
  { name: 'Travel & Hospitality', icon: 'plane' },
  { name: 'Automotive & Mobility', icon: 'car' },
  { name: 'Energy & Industrial', icon: 'zap' },
];

export const EightSectors: Story = { name: '8 showcase sectors', args: { ...copy, sectors: eight } };

export const FourSectors: Story = { name: '4 sectors (cross only)', args: { ...copy, sectors: eight.slice(0, 4) } };

export const MissingIcon: Story = {
  name: 'Unknown or missing icon (label only)',
  args: { ...copy, sectors: [{ name: 'Social Services' }, { name: 'Telecom', icon: 'not-a-lucide-icon' }, ...eight.slice(0, 2)] },
};

export const NoSectors: Story = { name: '0 sectors (no diagram)', args: { ...copy, sectors: [] } };
