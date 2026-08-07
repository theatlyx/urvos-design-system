import type { Meta, StoryObj } from "@storybook/react";
import { PediatricGrowthSchedule } from "./PediatricGrowthSchedule";

const meta: Meta<typeof PediatricGrowthSchedule> = {
  title: "Templates/Specialty Care/Pediatric Growth Schedule",
  component: PediatricGrowthSchedule,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PediatricGrowthSchedule> = {};
