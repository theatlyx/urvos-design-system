import type { Meta, StoryObj } from "@storybook/react";
import { TabsVertical } from "../navigation/TabsVertical";
import { User, Activity, Pill } from "lucide-react";

const meta: Meta<typeof TabsVertical> = {
  title: "Navigation/TabsVertical",
  component: TabsVertical,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <TabsVertical
      className="max-w-2xl"
      items={[
        { id: "demo", label: "Demographics", icon: <User className="w-4 h-4" />, content: <div className="text-xs">Patient legal name, MRN, insurance data</div> },
        { id: "vitals", label: "Vitals Summary", icon: <Activity className="w-4 h-4" />, content: <div className="text-xs">Blood pressure, pulse, SpO2 trend history</div> },
        { id: "rx", label: "Active Orders", icon: <Pill className="w-4 h-4" />, content: <div className="text-xs">Medication orders & active prescriptions</div> },
      ]}
    />
  ),
};
