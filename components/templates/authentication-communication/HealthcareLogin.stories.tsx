import type { Meta, StoryObj } from "@storybook/react";
import { HealthcareLogin } from "./HealthcareLogin";

const meta: Meta<typeof HealthcareLogin> = {
  title: "Templates/Authentication & Access/Healthcare Login",
  component: HealthcareLogin,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof HealthcareLogin> = {};
