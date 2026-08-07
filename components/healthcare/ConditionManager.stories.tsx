import type { Meta, StoryObj } from "@storybook/react";
import { ConditionManager } from "./ConditionManager";
import type { Condition } from "@medplum/fhirtypes";

const meta: Meta<typeof ConditionManager> = {
  title: "Healthcare/ConditionManager",
  component: ConditionManager,
  tags: ["autodocs"],
};

export default meta;

const mockConditions: Condition[] = [
  {
    resourceType: "Condition",
    id: "c1",
    subject: { reference: "Patient/123" },
    code: { text: "Essential Hypertension" },
    clinicalStatus: { coding: [{ code: "active" }] },
    recordedDate: "2023-01-15T10:00:00Z"
  },
  {
    resourceType: "Condition",
    id: "c2",
    subject: { reference: "Patient/123" },
    code: { text: "Asthma" },
    clinicalStatus: { coding: [{ code: "active" }] },
    recordedDate: "2022-11-20T09:30:00Z"
  }
];

export const Default = {
  args: {
    conditions: mockConditions,
    onAddCondition: () => console.log("Add clicked"),
    onRemoveCondition: (id: string) => console.log("Remove clicked for", id),
  },
};

export const Empty = {
  args: {
    conditions: [],
    onAddCondition: () => console.log("Add clicked"),
  },
};
