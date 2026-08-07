import type { Meta, StoryObj } from "@storybook/react";
import { MedicationInventory } from "./MedicationInventory";

const meta: Meta<typeof MedicationInventory> = {
  title: "Templates/Inventory & Pharmacy/Medication Inventory",
  component: MedicationInventory,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof MedicationInventory> = {};
