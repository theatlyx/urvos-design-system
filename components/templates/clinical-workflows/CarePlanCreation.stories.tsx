import type { Meta, StoryObj } from "@storybook/react";
import { CarePlanCreation } from "./CarePlanCreation";

const meta: Meta<typeof CarePlanCreation> = {
  title: "Templates/Clinical Workflows/Care Plan Creation",
  component: CarePlanCreation,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof CarePlanCreation> = {};
