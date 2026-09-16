import type { Meta, StoryObj } from '@storybook-astro/framework';
import TrustBadges from './TrustBadges.astro';

/**
 * Global trust/recognition strip (Clutch, DesignRush, GoodFirms). No props —
 * the badge list is fixed data sourced from the digital-presence registry,
 * not passed in. One story is the whole surface area.
 */
const meta: Meta<typeof TrustBadges> = {
  title: 'Components/Trust Badges',
  component: TrustBadges,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TrustBadges>;

export const Default: Story = { args: {} };
