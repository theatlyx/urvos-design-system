import type { Meta, StoryObj } from "@storybook/react";
import { FavoriteOrdersPanel } from "./FavoriteOrdersPanel";

const meta: Meta<typeof FavoriteOrdersPanel> = {
  title: "Healthcare/Favorite Orders Panel",
  component: FavoriteOrdersPanel,
};

export default meta;

export const Default: StoryObj<typeof FavoriteOrdersPanel> = {
  args: {
    orders: [
      { id: "ORD-1", name: "Amoxicillin-Clavulanate 625mg", type: "Medication", details: "Oral • 1 tab PO BID x 7 days" },
      { id: "ORD-2", name: "Glycated Hemoglobin (HbA1c)", type: "Laboratory", details: "Venous Blood • Fasting 8hrs" },
      { id: "ORD-3", name: "Chest X-Ray PA View", type: "Imaging", details: "STAT • Evaluate Pulmonary Infiltrates" },
    ],
  },
};
