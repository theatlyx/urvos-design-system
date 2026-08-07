import type { Meta, StoryObj } from "@storybook/react";
import { LabOrderEntry } from "./LabOrderEntry";

const meta: Meta<typeof LabOrderEntry> = {
  title: "Templates/Clinical Workflows/Lab Order Entry",
  component: LabOrderEntry,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof LabOrderEntry> = {};
