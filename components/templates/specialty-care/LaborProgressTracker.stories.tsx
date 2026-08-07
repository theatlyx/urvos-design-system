import type { Meta, StoryObj } from "@storybook/react";
import { LaborProgressTracker } from "./LaborProgressTracker";

const meta: Meta<typeof LaborProgressTracker> = {
  title: "Templates/Specialty Care/Labor Progress Tracker",
  component: LaborProgressTracker,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof LaborProgressTracker> = {};
