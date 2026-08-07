import type { Meta, StoryObj } from "@storybook/react";
import { Patient360Summary } from "./Patient360Summary";

const meta: Meta<typeof Patient360Summary> = {
  title: "Templates/Patient Management/Patient 360 Summary",
  component: Patient360Summary,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof Patient360Summary> = {};
