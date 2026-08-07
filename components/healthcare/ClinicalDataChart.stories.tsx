import type { Meta, StoryObj } from '@storybook/react';
import { ClinicalDataChart } from './ClinicalDataChart';

const meta = {
  title: 'Healthcare/ClinicalDataChart',
  component: ClinicalDataChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px] h-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClinicalDataChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalTrend: Story = {
  args: {
    title: 'Heart Rate',
    unit: 'bpm',
    normalRange: [60, 100],
    data: [
      { date: 'Mon', value: 72 },
      { date: 'Tue', value: 75 },
      { date: 'Wed', value: 71 },
      { date: 'Thu', value: 68 },
      { date: 'Fri', value: 74 },
      { date: 'Sat', value: 77 },
      { date: 'Sun', value: 73 },
    ],
  },
};

export const AbnormalTrend: Story = {
  args: {
    title: 'Systolic Blood Pressure',
    unit: 'mmHg',
    normalRange: [90, 120],
    data: [
      { date: 'Mon', value: 115 },
      { date: 'Tue', value: 118 },
      { date: 'Wed', value: 122 },
      { date: 'Thu', value: 128 },
      { date: 'Fri', value: 135 },
      { date: 'Sat', value: 142 },
      { date: 'Sun', value: 145 },
    ],
  },
};
