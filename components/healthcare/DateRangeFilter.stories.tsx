import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeFilter } from './DateRangeFilter';
import { useState } from 'react';

const meta: Meta<typeof DateRangeFilter> = {
  title: 'Healthcare/DateRangeFilter',
  component: DateRangeFilter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-4 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DateRangeFilter>;

// We use a wrapper component to manage the state in Storybook
const DateRangeFilterWithState = (args: any) => {
  const [range, setRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  return <DateRangeFilter {...args} value={range} onChange={setRange} />;
};

export const Default: Story = {
  render: (args) => <DateRangeFilterWithState {...args} />,
};

export const CustomPresets: Story = {
  render: (args) => <DateRangeFilterWithState {...args} />,
  args: {
    presets: [
      {
        label: 'Last 90 Days',
        range: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 90);
          return { startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] };
        }
      },
      {
        label: 'Year to Date',
        range: () => {
          const end = new Date();
          const start = new Date(end.getFullYear(), 0, 1);
          return { startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] };
        }
      }
    ]
  }
};
