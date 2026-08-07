import type { Meta, StoryObj } from "@storybook/react";
import { LabResultsList } from "./LabResultsList";
import type { Observation, ServiceRequest } from "@medplum/fhirtypes";

const meta: Meta<typeof LabResultsList> = {
  title: "Healthcare/LabResultsList",
  component: LabResultsList,
  tags: ["autodocs"],
};

export default meta;

const mockLabs: (Observation | ServiceRequest)[] = [
  {
    resourceType: "Observation",
    id: "l1",
    status: "final",
    code: { text: "HbA1c" },
    effectiveDateTime: "2023-01-10T08:00:00Z"
  },
  {
    resourceType: "ServiceRequest",
    id: "l2",
    status: "active",
    intent: "order",
    code: { text: "Comprehensive Metabolic Panel" },
    authoredOn: "2023-02-15T09:00:00Z"
  }
];

export const Default = {
  args: {
    labs: mockLabs,
    onAddLab: () => console.log("Order Lab clicked"),
    onRemoveLab: (id: string) => console.log("Remove clicked for", id),
  },
};

export const Empty = {
  args: {
    labs: [],
    onAddLab: () => console.log("Order Lab clicked"),
  },
};
