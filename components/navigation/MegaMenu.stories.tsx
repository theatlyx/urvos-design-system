import type { Meta, StoryObj } from "@storybook/react";
import { MegaMenu } from "../navigation/MegaMenu";
import { Stethoscope, Activity, Pill, HeartPulse } from "lucide-react";

const meta: Meta<typeof MegaMenu> = {
  title: "Navigation/MegaMenu",
  component: MegaMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="p-12">
      <MegaMenu
        label="Clinical Services"
        categories={[
          {
            category: "Diagnostics & Imaging",
            items: [
              { title: "EHR Flowsheet", description: "Realtime vital signs & lab trends", href: "#", icon: <Activity className="w-4 h-4" /> },
              { title: "Radiology Viewer", description: "DICOM PACS image integration", href: "#", icon: <Stethoscope className="w-4 h-4" /> },
            ],
          },
          {
            category: "Therapeutics & Orders",
            items: [
              { title: "CPOE E-Prescribing", description: "Medication order entry & interactions", href: "#", icon: <Pill className="w-4 h-4" /> },
              { title: "Cardiac Telemetry", description: "ECG rhythm strip telemetry", href: "#", icon: <HeartPulse className="w-4 h-4" /> },
            ],
          },
        ]}
      />
    </div>
  ),
};
