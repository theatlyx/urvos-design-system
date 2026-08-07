import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../navigation/Sidebar";
import { Users, Calendar, Activity, Settings } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="h-screen flex">
      <Sidebar
        brandName="Urvos Clinical"
        items={[
          { label: "Patients", href: "#", icon: <Users className="w-4 h-4" />, active: true },
          { label: "Schedules", href: "#", icon: <Calendar className="w-4 h-4" /> },
          { label: "Vitals Monitor", href: "#", icon: <Activity className="w-4 h-4" /> },
          { label: "Settings", href: "#", icon: <Settings className="w-4 h-4" /> },
        ]}
      />
    </div>
  ),
};
