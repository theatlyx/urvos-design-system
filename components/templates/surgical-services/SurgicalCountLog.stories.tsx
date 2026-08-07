import type { Meta, StoryObj } from "@storybook/react";
import { SurgicalCountLog } from "./SurgicalCountLog";

const meta: Meta<typeof SurgicalCountLog> = {
  title: "Templates/Surgical Services/Surgical Count Log",
  component: SurgicalCountLog,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof SurgicalCountLog> = {};
