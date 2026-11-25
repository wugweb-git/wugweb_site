import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseChapter from './CaseChapter.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A chapter heading with its lead and paragraphs. Blocks that follow it share its chapter id. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseChapter> = {
  title: 'Case study/Chapter',
  component: CaseChapter,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseChapter>;

export const Default: Story = {
  args: { block: { type: 'chapter', id: 'ch-1', index: 1, title: 'The problem', lead: 'Members could not find the one thing they came to do.', paras: ['The old dashboard grew one feature at a time, and each team added its own entry point.', 'We started by watching eight members try to finish the same task.'] } },
};

