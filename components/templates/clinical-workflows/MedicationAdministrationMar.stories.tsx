import type { Meta, StoryObj } from "@storybook/react";
import { MedicationAdministrationMar } from "./MedicationAdministrationMar";

const meta: Meta<typeof MedicationAdministrationMar> = {
  title: "Templates/Clinical Workflows/Medication Administration MAR",
  component: MedicationAdministrationMar,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof MedicationAdministrationMar> = {};
