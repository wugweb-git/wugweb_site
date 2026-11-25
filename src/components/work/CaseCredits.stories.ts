import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseCredits from './CaseCredits.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Who worked on it. Keys and values come straight from the body. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseCredits> = {
  title: 'Case study/Credits',
  component: CaseCredits,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseCredits>;

export const Default: Story = {
  args: { block: { type: 'credits', items: { 'Design lead': 'Sample Person', 'Research': 'Sample Person', 'Engineering': 'Sample Team' } } },
};

