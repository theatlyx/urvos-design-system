import type { Meta, StoryObj } from "@storybook/react";
import { MedicationAdministration } from "./MedicationAdministration";

const meta: Meta<typeof MedicationAdministration> = {
  title: "Healthcare/Medication Administration Log (MAR)",
  component: MedicationAdministration,
};

export default meta;

export const Default: StoryObj<typeof MedicationAdministration> = {
  args: {
    title: "Medication Administration Record (MAR)",
    items: [
      { id: "MAR-1", medicationName: "Inj. Paracetamol 1000mg", dosage: "100 mL IV Infusion", route: "IV", status: "completed", administeredAt: "2026-07-24 08:00 AM", practitionerName: "Nurse Sarah (RN)" },
      { id: "MAR-[#2]", medicationName: "Tab. Pantoprazole 40mg", dosage: "1 tab Oral", route: "Oral", status: "completed", administeredAt: "2026-07-24 08:15 AM", practitionerName: "Nurse Sarah (RN)" },
      { id: "MAR-3", medicationName: "Inj. Enoxaparin 40mg", dosage: "0.4 mL Subcutaneous", route: "Subcutaneous", status: "in-progress", administeredAt: "Scheduled 20:00 PM", practitionerName: "Nurse David (RN)" },
    ],
  },
};
