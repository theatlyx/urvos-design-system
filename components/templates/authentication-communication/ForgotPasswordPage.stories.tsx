import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordPage } from "./ForgotPasswordPage";

const meta: Meta<typeof ForgotPasswordPage> = {
  title: "Templates/Authentication & Access/Forgot Password Page",
  component: ForgotPasswordPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof ForgotPasswordPage> = {};
