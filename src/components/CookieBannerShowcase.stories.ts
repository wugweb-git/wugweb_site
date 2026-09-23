import type { Meta, StoryObj } from '@storybook-astro/framework';
import CookieBannerShowcase from './CookieBannerShowcase.astro';

/**
 * Visual reference for the cookie-consent banner — the real thing lives in
 * BaseLayout.astro (sitewide chrome), shown once per visitor. See the
 * component file header for why the markup/CSS is duplicated here.
 */
const meta: Meta<typeof CookieBannerShowcase> = {
  title: 'Foundations/Cookie Banner',
  component: CookieBannerShowcase,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CookieBannerShowcase>;

export const Default: Story = {};
