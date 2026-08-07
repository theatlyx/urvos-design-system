import type { Meta, StoryObj } from "@storybook/react";
import { MotherBabyChart } from "./MotherBabyChart";

const meta: Meta<typeof MotherBabyChart> = {
  title: "Templates/Specialty Care/Mother Baby Chart",
  component: MotherBabyChart,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof MotherBabyChart> = {};
