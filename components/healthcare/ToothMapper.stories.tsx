import type { Meta, StoryObj } from '@storybook/react';
import { ToothMapper } from './ToothMapper';

const meta = {
  title: 'Healthcare/ToothMapper',
  component: ToothMapper,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ToothMapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
