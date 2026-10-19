import type { Meta, StoryObj } from '@storybook-astro/framework';
import SectorRow from './SectorRow.astro';

/**
 * One row of the /footer/industries directory. Spec:
 * `kits_design_system/docs/blocks/industries-directory.md`. Labels are plain
 * text, not links or buttons, so there are no hover or focus states to check.
 * Resize across 1024 to see the stacked and split layouts.
 */
const meta: Meta<typeof SectorRow> = {
  title: 'Blocks/Industries/Sector Row',
  component: SectorRow,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof SectorRow>;

const consumer = {
  slug: 'consumer-retail',
  index: 2,
  name: 'Consumer & Retail',
  description: 'Retail lives on conversion and repeat purchase, so every step from discovery to checkout has to earn its place.',
  industries: ['Food & Beverage', 'eCommerce', 'Luxury & Jewellery', 'Tobacco', 'Fashion & Lifestyle', 'Home & Furniture', 'Beauty & Personal Care', 'Corporate Gifting'].map((name) => ({ name })),
};

export const Plain: Story = { name: 'Plain tone', args: { ...consumer, tone: 'plain' } };

export const Tint: Story = { name: 'Tint tone (alternate rows)', args: { ...consumer, tone: 'tint' } };

export const OneIndustry: Story = {
  name: 'One industry',
  args: {
    slug: 'telecom',
    index: 12,
    name: 'Telecom',
    description: 'Telecom customers manage plans, devices and services in one place, so complexity has to stay out of sight.',
    industries: [{ name: 'Telecommunications' }],
  },
};

export const NoLine: Story = { name: 'No sector line, no industries', args: { slug: 'education', index: 1, name: 'Education', industries: [] } };

export const LongLabels: Story = {
  name: 'Long labels wrap inside the label',
  args: { ...consumer, industries: [{ name: 'Petrochemicals, Environmental Services and Industrial Waste Management Solutions' }, { name: 'Renewable Energy' }] },
};
