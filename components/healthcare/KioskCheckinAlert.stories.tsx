import type { Meta, StoryObj } from "@storybook/react";
import { KioskCheckinAlert } from "./KioskCheckinAlert";

const meta: Meta<typeof KioskCheckinAlert> = {
  title: "Healthcare/Kiosk Check-in Alert",
  component: KioskCheckinAlert,
};

export default meta;

export const Default: StoryObj<typeof KioskCheckinAlert> = {
  args: {
    patientName: "Deepak Joshi",
    checkinTime: "10:14 AM",
    tokenNumber: "A-42",
    assignedRoom: "Consultation Room 3B",
    providerName: "Dr. Ananya Roy",
  },
};
