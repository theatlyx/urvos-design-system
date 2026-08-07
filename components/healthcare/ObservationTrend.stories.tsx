import type { Meta, StoryObj } from "@storybook/react";
import { ObservationTrend } from "./ObservationTrend";
import type { Observation } from "@medplum/fhirtypes";

const meta: Meta<typeof ObservationTrend> = {
  title: "Healthcare/ObservationTrend",
  component: ObservationTrend,
  tags: ["autodocs"],
};

export default meta;

const mockData: Observation[] = [
  {
    resourceType: "Observation",
    status: "final",
    code: { text: "Weight" },
    effectiveDateTime: "2023-01-01T10:00:00Z",
    valueQuantity: { value: 75, unit: "kg" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { text: "Weight" },
    effectiveDateTime: "2023-02-01T10:00:00Z",
    valueQuantity: { value: 74.2, unit: "kg" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { text: "Weight" },
    effectiveDateTime: "2023-03-01T10:00:00Z",
    valueQuantity: { value: 73.5, unit: "kg" }
  },
  {
    resourceType: "Observation",
    status: "final",
    code: { text: "Weight" },
    effectiveDateTime: "2023-04-01T10:00:00Z",
    valueQuantity: { value: 72.8, unit: "kg" }
  }
];

export const Default = {
  args: {
    title: "Weight Trend",
    observations: mockData,
    yAxisDomain: [60, 80],
  },
};

export const WithReferenceRange = {
  args: {
    title: "Weight Trend (Target)",
    observations: mockData,
    yAxisDomain: [60, 80],
    referenceRange: { high: 74, low: 65 }
  },
};

export const Empty = {
  args: {
    title: "Empty Trend",
    observations: [],
  },
};
