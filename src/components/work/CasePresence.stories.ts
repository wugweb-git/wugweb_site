import type { Meta, StoryObj } from '@storybook-astro/framework';
import CasePresence from './CasePresence.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Where the work is live or written up elsewhere. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CasePresence> = {
  title: 'Case study/Presence',
  component: CasePresence,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CasePresence>;

export const Default: Story = {
  args: { block: { type: 'presence', links: [ { value: 'Behance', text: 'Behance', href: 'https://www.behance.net/' }, { value: 'Dribbble', text: 'Dribbble', href: 'https://dribbble.com/' } ] } },
};

