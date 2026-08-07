import type { Meta, StoryObj } from "@storybook/react";
import { AllergyManager } from "./AllergyManager";
import type { AllergyIntolerance } from "@medplum/fhirtypes";

const meta: Meta<typeof AllergyManager> = {
  title: "Healthcare/AllergyManager",
  component: AllergyManager,
  tags: ["autodocs"],
};

export default meta;

const mockAllergies: AllergyIntolerance[] = [
  {
    resourceType: "AllergyIntolerance",
    id: "a1",
    patient: { reference: "Patient/123" },
    code: { text: "Penicillin" },
    criticality: "high",
    reaction: [{ manifestation: [{ text: "Hives and swelling" }] }]
  },
  {
    resourceType: "AllergyIntolerance",
    id: "a2",
    patient: { reference: "Patient/123" },
    code: { text: "Peanuts" },
    criticality: "low",
    reaction: [{ manifestation: [{ text: "Mild rash" }] }]
  }
];

export const Default = {
  args: {
    allergies: mockAllergies,
    onAddAllergy: () => console.log("Add clicked"),
    onRemoveAllergy: (id: string) => console.log("Remove clicked for", id),
  },
};

export const Empty = {
  args: {
    allergies: [],
    onAddAllergy: () => console.log("Add clicked"),
  },
};
