import type { Meta, StoryObj } from "@storybook/react";
import { AbdmGatewayDashboard } from "./AbdmGatewayDashboard";

const meta: Meta<typeof AbdmGatewayDashboard> = {
  title: "Templates/Interoperability & FHIR/ABDM Gateway Dashboard",
  component: AbdmGatewayDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof AbdmGatewayDashboard> = {};
