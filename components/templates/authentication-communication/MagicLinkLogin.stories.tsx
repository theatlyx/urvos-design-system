import type { Meta, StoryObj } from "@storybook/react";
import { MagicLinkLogin } from "./MagicLinkLogin";

const meta = {
  title: "Templates/Authentication & Communication/MagicLinkLogin",
  component: MagicLinkLogin,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MagicLinkLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
