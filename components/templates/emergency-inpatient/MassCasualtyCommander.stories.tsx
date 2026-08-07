import type { Meta, StoryObj } from "@storybook/react";
import { MassCasualtyCommander } from "./MassCasualtyCommander";

const meta: Meta<typeof MassCasualtyCommander> = {
  title: "Templates/Emergency & Inpatient/Mass Casualty Commander",
  component: MassCasualtyCommander,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof MassCasualtyCommander> = {};
