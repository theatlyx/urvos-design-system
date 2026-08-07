import type { Meta, StoryObj } from '@storybook/react';
import { ThemePlayground } from './ThemePlayground';

const meta = {
  title: 'Templates/Application Shells/ThemePlayground',
  component: ThemePlayground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemePlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
