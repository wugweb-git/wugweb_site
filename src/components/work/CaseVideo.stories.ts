import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseVideo from './CaseVideo.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A video with one play and pause button, poster first, no autoplay. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseVideo> = {
  title: 'Case study/Video',
  component: CaseVideo,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseVideo>;

export const Default: Story = {
  args: { block: { type: 'video', chapterId: 'ch-1', media: video(clip.adtech, 'Walkthrough'), poster: poster.adtech } },
};

