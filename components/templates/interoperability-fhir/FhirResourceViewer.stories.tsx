import type { Meta, StoryObj } from "@storybook/react";
import { FhirResourceViewer } from "./FhirResourceViewer";

const meta: Meta<typeof FhirResourceViewer> = {
  title: "Templates/Interoperability & FHIR/FHIR Resource Viewer",
  component: FhirResourceViewer,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof FhirResourceViewer> = {};
