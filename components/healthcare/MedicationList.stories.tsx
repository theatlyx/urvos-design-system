import type { Meta, StoryObj } from "@storybook/react";
import { MedicationList } from "./MedicationList";
import type { MedicationRequest } from "@medplum/fhirtypes";

const meta: Meta<typeof MedicationList> = {
  title: "Healthcare/MedicationList",
  component: MedicationList,
  tags: ["autodocs"],
};

export default meta;

const mockMedications: MedicationRequest[] = [
  {
    resourceType: "MedicationRequest",
    id: "m1",
    status: "active",
    intent: "order",
    subject: { reference: "Patient/123" },
    medicationCodeableConcept: { text: "Lisinopril 10 MG Oral Tablet" },
    dosageInstruction: [{ text: "Take 1 tablet by mouth daily" }]
  },
  {
    resourceType: "MedicationRequest",
    id: "m2",
    status: "completed",
    intent: "order",
    subject: { reference: "Patient/123" },
    medicationCodeableConcept: { text: "Amoxicillin 500 MG Oral Capsule" },
    dosageInstruction: [{ text: "Take 1 capsule by mouth every 8 hours for 10 days" }]
  }
];

export const Default = {
  args: {
    medications: mockMedications,
  },
};

export const Empty = {
  args: {
    medications: [],
  },
};
