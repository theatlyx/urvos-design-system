import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalReportsDashboard } from "./ClinicalReportsDashboard";

const meta: Meta<typeof ClinicalReportsDashboard> = {
  title: "Templates/Analytics & Reporting/Clinical Reports Dashboard",
  component: ClinicalReportsDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ClinicalReportsDashboard> = {};
