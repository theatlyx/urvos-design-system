import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { ThemeProvider } from '../utilities/ThemeProvider';

const meta = {
  title: 'Organisms/ThemeSelector',
  component: ThemeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-[400px] h-[300px] flex items-start justify-center pt-8 bg-urvos-surface-alt rounded-xl border border-urvos-border">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
