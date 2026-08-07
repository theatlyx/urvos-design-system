import type { Meta, StoryObj } from "@storybook/react";
import { OrScheduleBoard } from "./OrScheduleBoard";

const meta: Meta<typeof OrScheduleBoard> = {
  title: "Templates/Surgical Services/OR Schedule Board",
  component: OrScheduleBoard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof OrScheduleBoard> = {};
