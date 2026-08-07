import type { Meta, StoryObj } from "@storybook/react";
import { TelehealthWaitingRoom } from "./TelehealthWaitingRoom";

const meta = {
  title: "Templates/Authentication & Communication/TelehealthWaitingRoom",
  component: TelehealthWaitingRoom,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TelehealthWaitingRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
