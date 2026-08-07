import type { Meta, StoryObj } from "@storybook/react";
import { PrePostOpCarePlan } from "./PrePostOpCarePlan";

const meta: Meta<typeof PrePostOpCarePlan> = {
  title: "Templates/Surgical Services/Pre Post Op Care Plan",
  component: PrePostOpCarePlan,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PrePostOpCarePlan> = {};
