import type { Meta, StoryObj } from '@storybook-astro/framework';
import TokenGallery from './TokenGallery.astro';

/**
 * The Kits design-token map — colors (pillars, secondary, neutrals),
 * typography scale, spacing/radius/opacity ramps, and motion easings.
 *
 * Data is shared with the production `/kits` showcase page via
 * `src/lib/design-tokens.ts` — one source, two audiences. This component
 * itself only exists for Storybook.
 */
const meta: Meta<typeof TokenGallery> = {
  title: 'Tokens/Token Gallery',
  component: TokenGallery,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof TokenGallery>;

export const All: Story = { args: {} };

export const Colors: Story = { args: { sections: ['colors'] } };

export const Typography: Story = { args: { sections: ['typography'] } };

export const SpacingAndRadius: Story = {
  name: 'Spacing & radius',
  args: { sections: ['spacing', 'radius'] },
};

export const OpacityAndMotion: Story = {
  name: 'Opacity & motion',
  args: { sections: ['opacity', 'motion'] },
};
