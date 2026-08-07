import type { Meta, StoryObj } from '@storybook/react';
import { GlobalSearchBox } from './GlobalSearchBox';

const meta = {
  title: 'Organisms/GlobalSearchBox',
  component: GlobalSearchBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[400px] flex justify-center pt-10 bg-urvos-surface-alt rounded-xl border border-urvos-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalSearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search patients, records, or press Cmd+K',
    results: [
      {
        id: '1',
        type: 'patient',
        title: 'Eleanor Shellstrop',
        subtitle: 'DOB: 10/14/1982 • MRN: 948274',
        url: '#',
      },
      {
        id: '2',
        type: 'patient',
        title: 'Chidi Anagonye',
        subtitle: 'DOB: 02/05/1980 • MRN: 112349',
        url: '#',
      },
      {
        id: '3',
        type: 'medication',
        title: 'Atorvastatin (Lipitor)',
        subtitle: '20mg Tablet • Active',
        url: '#',
      },
      {
        id: '4',
        type: 'document',
        title: 'MRI Brain w/wo Contrast',
        subtitle: 'Imaging Report • 2 days ago',
        url: '#',
      },
      {
        id: '5',
        type: 'appointment',
        title: 'Cardiology Follow-up',
        subtitle: 'Tomorrow at 10:00 AM',
        url: '#',
      },
    ],
  },
};
