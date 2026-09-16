import type { Meta, StoryObj } from '@storybook-astro/framework';
import SiteFooter from './SiteFooter.astro';

/**
 * Global footer — sitemap links, legal notices, device-backdrop banner.
 * Interaction to check in the canvas: the footer link underline wipe on
 * hover (`::after` scaleX with direction) and sibling dimming.
 */
const meta: Meta<typeof SiteFooter> = {
  title: 'Components/Site Footer',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: { companyEmail: 'hello@wugweb.com' },
};
