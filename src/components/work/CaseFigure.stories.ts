import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseFigure from './CaseFigure.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * One image at its own ratio, with the caption underneath. Also renders a scrollshot. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseFigure> = {
  title: 'Case study/Figure',
  component: CaseFigure,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseFigure>;

export const Default: Story = {
  args: { block: { type: 'figure', chapterId: 'ch-1', media: image(poster.kia, 'The redesigned dashboard') } },
};

export const Scrollshot: Story = {
  args: { block: { type: 'scrollshot', chapterId: 'ch-1', media: image(poster.adneto, 'Full page website', 'web') } },
};
