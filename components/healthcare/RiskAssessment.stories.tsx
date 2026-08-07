import type { Meta, StoryObj } from "@storybook/react";
import { RiskAssessment } from "./RiskAssessment";

const meta: Meta<typeof RiskAssessment> = {
  title: "Healthcare Organisms/RiskAssessment",
  component: RiskAssessment,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <RiskAssessment
      className="max-w-2xl"
      scores={[
        { name: "CHADS2-VASc Score", score: "4 / 9", level: "high", description: "High risk of thromboembolism; oral anticoagulation indicated." },
        { name: "Framingham 10-Yr CVD Risk", score: "18.5%", level: "moderate", description: "Moderate cardiovascular disease risk; lipid panel monitoring recommended." },
        { name: "LACE Readmission Index", score: "11 pts", level: "high", description: "High risk of 30-day post-discharge hospital readmission." },
      ]}
    />
  ),
};
