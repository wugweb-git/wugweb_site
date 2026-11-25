import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseBlocks from './CaseBlocks.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related } from './story-fixtures';

/**
 * The switch that renders a whole case study: it takes the ordered blocks the
 * layout resolver returns and groups each chapter with the blocks under it.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseBlocks> = {
  title: 'Case study/Full page',
  component: CaseBlocks,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof CaseBlocks>;

export const Default: Story = {
  args: {
    blocks: [
      { type: 'hero', title: 'A clearer path through a crowded dashboard', subtitle: 'Redesigning the member dashboard so the main task takes four steps, not nine.', clientName: 'Sample Client', industry: 'Fintech', cover: image(poster.kia, 'Cover', 'cover'), meta: [{ key: 'Year', value: '2026', text: '2026', links: [] }, { key: 'Timeline', value: '12 weeks', text: '12 weeks', links: [] }], tags: ['Product design'] },
      { type: 'stats', items: results },
      { type: 'chapter', id: 'ch-1', index: 1, title: 'The problem', lead: 'Members could not find the one thing they came to do.', paras: ['The old dashboard grew one feature at a time.'] },
      { type: 'points', chapterId: 'ch-1', items: tiles },
      { type: 'figure', chapterId: 'ch-1', media: image(poster.kia, 'The redesigned dashboard') },
      { type: 'chapter', id: 'ch-2', index: 2, title: 'The work', paras: ['We tested a single route with real members.'] },
      { type: 'rail', chapterId: 'ch-2', flow: 'Onboarding', items: six },
      { type: 'quote', chapterId: 'ch-2', text: 'The first flow our members have not asked us to explain.', by: 'Head of Product, Sample Client' },
      { type: 'timeline', chapterId: 'ch-2', items: milestones },
      { type: 'related', items: related },
    ],
  },
};
