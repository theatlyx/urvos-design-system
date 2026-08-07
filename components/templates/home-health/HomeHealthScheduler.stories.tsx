import type { Meta, StoryObj } from "@storybook/react";
import { HomeHealthScheduler } from "./HomeHealthScheduler";

const meta: Meta<typeof HomeHealthScheduler> = {
  title: "Templates/Home Health/Home Health Scheduler",
  component: HomeHealthScheduler,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof HomeHealthScheduler> = {};
