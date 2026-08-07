import type { Meta, StoryObj } from "@storybook/react";
import { Hl7MessageMonitor } from "./Hl7MessageMonitor";

const meta: Meta<typeof Hl7MessageMonitor> = {
  title: "Templates/Interoperability & FHIR/HL7 Message Monitor",
  component: Hl7MessageMonitor,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof Hl7MessageMonitor> = {};
