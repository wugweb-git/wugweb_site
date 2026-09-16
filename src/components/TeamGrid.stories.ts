import type { Meta, StoryObj } from '@storybook-astro/framework';
import TeamGrid, { type TeamMember } from './TeamGrid.astro';

/**
 * Team portrait grid on `/about`. Interaction to check in the canvas: hover a
 * card — the photo goes from grayscale to colour and scales up inside the
 * fixed 3:4 frame (never skews).
 */
const meta: Meta<typeof TeamGrid> = {
  title: 'Components/Team Grid',
  component: TeamGrid,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TeamGrid>;

const members: TeamMember[] = [
  { name: 'Vedanshu Jain', role: 'Founder & Principal', photo: '/assets/team/vedanshu-jain.jpg' },
  { name: 'Arjun Mehta', role: 'Design Director', photo: '/assets/team/arjun-mehta.jpg' },
  { name: 'Priya Nair', role: 'Engineering Lead', photo: '/assets/team/priya-nair.jpg' },
  { name: 'Kabir Rao', role: 'Strategy Lead', photo: '/assets/team/kabir-rao.jpg' },
];

export const Default: Story = {
  args: {
    eyebrow: 'The team',
    heading: 'The faces behind the work.',
    headingLead: 2,
    members,
  },
};

export const Compact: Story = {
  args: { members: members.slice(0, 2) },
};
