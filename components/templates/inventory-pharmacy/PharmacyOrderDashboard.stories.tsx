import type { Meta, StoryObj } from "@storybook/react";
import { PharmacyOrderDashboard } from "./PharmacyOrderDashboard";

const meta: Meta<typeof PharmacyOrderDashboard> = {
  title: "Templates/Inventory & Pharmacy/Pharmacy Order Dashboard",
  component: PharmacyOrderDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PharmacyOrderDashboard> = {};
