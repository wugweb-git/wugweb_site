import type { Meta, StoryObj } from '@storybook-astro/framework';
import ButtonShowcase from './ButtonShowcase.astro';

/**
 * Living reference for the .btn family — see
 * kits_design_system/docs/components.md "Buttons" for the written spec
 * this mirrors (tier, size, composition, width, states).
 */
const meta: Meta<typeof ButtonShowcase> = {
  title: 'Foundations/Buttons',
  component: ButtonShowcase,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ButtonShowcase>;

export const AllVariants: Story = {
  name: 'All tiers, sizes, states',
};
