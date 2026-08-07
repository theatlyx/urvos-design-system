import type { Meta, StoryObj } from "@storybook/react";
import { EnterpriseSsoLogin } from "./EnterpriseSsoLogin";

const meta = {
  title: "Templates/Authentication & Communication/EnterpriseSsoLogin",
  component: EnterpriseSsoLogin,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EnterpriseSsoLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
