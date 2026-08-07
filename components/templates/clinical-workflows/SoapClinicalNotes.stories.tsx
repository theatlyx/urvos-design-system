import type { Meta, StoryObj } from "@storybook/react";
import { SoapClinicalNotes } from "./SoapClinicalNotes";

const meta: Meta<typeof SoapClinicalNotes> = {
  title: "Templates/Clinical Workflows/SOAP Clinical Notes",
  component: SoapClinicalNotes,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof SoapClinicalNotes> = {};
