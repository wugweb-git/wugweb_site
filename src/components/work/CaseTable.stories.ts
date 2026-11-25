import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseTable from './CaseTable.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A small comparison table that scrolls inside its own box on phones. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseTable> = {
  title: 'Case study/Table',
  component: CaseTable,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseTable>;

export const Default: Story = {
  args: { block: { type: 'table', chapterId: 'ch-1', head: ['Measure', 'Before', 'After'], rows: [['Steps to finish', '9', '4'], ['Completion rate', '52%', '90%'], ['Support tickets per week', '140', '61']] } },
};

