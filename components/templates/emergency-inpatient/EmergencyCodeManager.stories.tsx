import type { Meta, StoryObj } from "@storybook/react";
import { EmergencyCodeManager } from "./EmergencyCodeManager";

const meta: Meta<typeof EmergencyCodeManager> = {
  title: "Templates/Emergency & Inpatient/Emergency Code Manager",
  component: EmergencyCodeManager,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof EmergencyCodeManager> = {};
