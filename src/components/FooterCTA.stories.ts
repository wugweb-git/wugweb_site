import type { Meta, StoryObj } from '@storybook-astro/framework';
import FooterCTA, { type SocialDisc } from './FooterCTA.astro';

/**
 * The yellow device-backdrop banner above the footer — on every page that
 * doesn't opt out via `hideGlobalSections`. Interaction to check in the
 * canvas: the social discs are draggable, bounce off the panel's edges, and
 * squash on impact (`src/lib/ball-field.ts`); hover lifts the sheen and
 * adds a soft glow to the whole panel.
 */
const meta: Meta<typeof FooterCTA> = {
  title: 'Blocks/Footer CTA',
  component: FooterCTA,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof FooterCTA>;

const socialDiscs: SocialDisc[] = [
  { platform: 'Instagram', profileUrl: 'https://instagram.com/wugweb' },
  { platform: 'LinkedIn', profileUrl: 'https://linkedin.com/company/wugweb' },
  { platform: 'X', profileUrl: 'https://x.com/wugweb' },
  { platform: 'YouTube', profileUrl: 'https://youtube.com/@wugweb' },
];

export const Default: Story = {
  args: { socialDiscs },
};

export const NoSocialDiscs: Story = {
  name: 'No social discs (none live)',
  args: { socialDiscs: [] },
};

export const CustomCopy: Story = {
  args: {
    socialDiscs,
    heading: 'Ready when you are.',
    copy: 'Tell us what you’re building — we’ll tell you what it takes.',
    ctaLabel: 'Start a conversation',
  },
};
