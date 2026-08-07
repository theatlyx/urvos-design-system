import type { Meta, StoryObj } from "@storybook/react";
import { SignUpPage } from "./SignUpPage";

const meta: Meta<typeof SignUpPage> = {
  title: "Templates/Authentication & Access/Sign Up Page",
  component: SignUpPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof SignUpPage> = {};
