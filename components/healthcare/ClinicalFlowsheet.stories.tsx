import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalFlowsheet } from "./ClinicalFlowsheet";
import type { Observation } from "@medplum/fhirtypes";

const meta: Meta<typeof ClinicalFlowsheet> = {
  title: "Healthcare/ClinicalFlowsheet",
  component: ClinicalFlowsheet,
  tags: ["autodocs"],
};

export default meta;

const now = new Date();
const yesterday = new Date(now.getTime() - 86400000);
const tomorrow = new Date(now.getTime() + 86400000);

const mockObservations: Observation[] = [
  {
    resourceType: "Observation",
    status: "final",
    code: { coding: [{ code: "8867-4", display: "Heart rate" }] },
    effectiveDateTime: yesterday.toISOString(),
    valueQuantity: { value: 72, unit: "beats/min" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { coding: [{ code: "8867-4", display: "Heart rate" }] },
    effectiveDateTime: now.toISOString(),
    valueQuantity: { value: 78, unit: "beats/min" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { coding: [{ code: "8480-6", display: "Systolic blood pressure" }] },
    effectiveDateTime: yesterday.toISOString(),
    valueQuantity: { value: 120, unit: "mmHg" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { coding: [{ code: "8480-6", display: "Systolic blood pressure" }] },
    effectiveDateTime: now.toISOString(),
    valueQuantity: { value: 118, unit: "mmHg" }
  }
];

export const Default = {
  args: {
    observations: mockObservations,
    timepoints: [yesterday, now, tomorrow],
    codes: [
      { code: "8867-4", display: "Heart Rate" },
      { code: "8480-6", display: "Systolic BP" },
      { code: "8462-4", display: "Diastolic BP" }
    ]
  },
};
