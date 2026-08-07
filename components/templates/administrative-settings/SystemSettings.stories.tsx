import type { Meta, StoryObj } from "@storybook/react";
import { SystemSettings } from "./SystemSettings";

const meta: Meta<typeof SystemSettings> = {
  title: "Templates/Administrative & Settings/System Settings",
  component: SystemSettings,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof SystemSettings> = {};
