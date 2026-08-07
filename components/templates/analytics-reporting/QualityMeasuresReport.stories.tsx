import type { Meta, StoryObj } from "@storybook/react";
import { QualityMeasuresReport } from "./QualityMeasuresReport";

const meta: Meta<typeof QualityMeasuresReport> = {
  title: "Templates/Analytics & Reporting/Quality Measures Report",
  component: QualityMeasuresReport,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof QualityMeasuresReport> = {};
