import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseLoop from './CaseLoop.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A short silent loop. It stops under reduced motion. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseLoop> = {
  title: 'Case study/Loop',
  component: CaseLoop,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseLoop>;

export const Default: Story = {
  args: { block: { type: 'loop', chapterId: 'ch-1', media: video(clip.kia, 'Loop'), poster: poster.kia } },
};

