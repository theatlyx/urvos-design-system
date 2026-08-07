import type { Meta, StoryObj } from "@storybook/react";
import { BedManagementSystem } from "./BedManagementSystem";

const meta: Meta<typeof BedManagementSystem> = {
  title: "Templates/Emergency & Inpatient/Bed Management System",
  component: BedManagementSystem,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof BedManagementSystem> = {};
