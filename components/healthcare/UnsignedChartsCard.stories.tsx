import type { Meta, StoryObj } from "@storybook/react";
import { UnsignedChartsCard } from "./UnsignedChartsCard";

const meta: Meta<typeof UnsignedChartsCard> = {
  title: "Healthcare/Unsigned Charts Card",
  component: UnsignedChartsCard,
};

export default meta;

export const Default: StoryObj<typeof UnsignedChartsCard> = {
  args: {
    charts: [
      {
        id: "CHART-881",
        patientName: "Kavita Singhania",
        encounterDate: "2026-07-22",
        encounterType: "Telehealth Consultation",
        providerName: "Dr. Ananya Roy",
        daysPending: 2,
        isLockWarning: false,
      },
      {
        id: "CHART-889",
        patientName: "Ramesh Sen",
        encounterDate: "2026-07-20",
        encounterType: "Follow-up OPD",
        providerName: "Dr. Ananya Roy",
        daysPending: 4,
        isLockWarning: true,
      },
    ],
  },
};
