import type { Meta, StoryObj } from '@storybook-astro/framework';
import SiteHeader from './SiteHeader.astro';

/**
 * Global nav. Interaction to check in the canvas below 768px: the menu
 * toggle opens/closes `#site-nav`, locks body scroll while open, and closes
 * itself when a link is clicked or the viewport crosses back to desktop.
 */
const meta: Meta<typeof SiteHeader> = {
  title: 'Components/Site Header',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  args: { companyEmail: 'hello@wugweb.com' },
};
