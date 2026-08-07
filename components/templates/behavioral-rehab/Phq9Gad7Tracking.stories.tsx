import type { Meta, StoryObj } from "@storybook/react";
import { Phq9Gad7Tracking } from "./Phq9Gad7Tracking";

const meta: Meta<typeof Phq9Gad7Tracking> = {
  title: "Templates/Behavioral & Rehab/PHQ-9 & GAD-7 Tracking",
  component: Phq9Gad7Tracking,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof Phq9Gad7Tracking> = {};
