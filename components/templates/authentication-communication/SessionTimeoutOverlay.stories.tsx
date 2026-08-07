import type { Meta, StoryObj } from "@storybook/react";
import { SessionTimeoutOverlay } from "./SessionTimeoutOverlay";

const meta = {
  title: "Templates/Authentication & Communication/SessionTimeoutOverlay",
  component: SessionTimeoutOverlay,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SessionTimeoutOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
