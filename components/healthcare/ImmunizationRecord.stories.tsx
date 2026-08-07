import type { Meta, StoryObj } from "@storybook/react";
import { ImmunizationRecord } from "./ImmunizationRecord";

const meta: Meta<typeof ImmunizationRecord> = {
  title: "Healthcare/Immunization Record",
  component: ImmunizationRecord,
};

export default meta;

export const Default: StoryObj<typeof ImmunizationRecord> = {
  args: {
    title: "Patient Immunization History",
    records: [
      { id: "IMM-1", vaccineName: "Covaxin / BBV152", targetDisease: "COVID-19", doseNumber: "Dose 2 of 2", dateGiven: "2026-03-15", manufacturer: "Bharat Biotech", status: "completed" },
      { id: "IMM-2", vaccineName: "Influenza Quadrivalent", targetDisease: "Seasonal Flu", doseNumber: "Annual Booster", dateGiven: "2025-10-10", status: "completed" },
      { id: "IMM-3", vaccineName: "Hepatitis B Recombinant", targetDisease: "Hepatitis B", doseNumber: "Dose 3 of 3", dateGiven: "2026-08-01", status: "scheduled" },
    ],
  },
};
