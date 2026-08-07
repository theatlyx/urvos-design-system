import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordPage } from "./ResetPasswordPage";

const meta = {
  title: "Templates/Authentication & Communication/ResetPasswordPage",
  component: ResetPasswordPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
