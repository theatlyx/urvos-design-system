import type { Meta, StoryObj } from "@storybook/react";
import { NarcoticSubstanceLog } from "./NarcoticSubstanceLog";

const meta: Meta<typeof NarcoticSubstanceLog> = {
  title: "Templates/Inventory & Pharmacy/Narcotic Substance Log",
  component: NarcoticSubstanceLog,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof NarcoticSubstanceLog> = {};
