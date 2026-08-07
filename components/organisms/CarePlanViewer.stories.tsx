import type { Meta, StoryObj } from "@storybook/react";
import { CarePlanViewer } from "./CarePlanViewer";

const meta: Meta<typeof CarePlanViewer> = {
  title: "Organisms/Care Plan Viewer",
  component: CarePlanViewer,
};

export default meta;

export const Default: StoryObj<typeof CarePlanViewer> = {
  args: {
    title: "Post-Myocardial Infarction Rehabilitation & Management",
    category: "Cardiovascular Rehab",
    status: "active",
    goals: [
      { id: "G-1", description: "Maintain Systolic BP under 130 mmHg", targetDate: "2026-09-30", status: "in-progress" },
      { id: "G-2", description: "Complete 30 minutes daily low-impact cardiac walk", targetDate: "2026-08-15", status: "in-progress" },
      { id: "G-3", description: "Achieve HbA1c level < 6.5%", targetDate: "2026-07-01", status: "achieved" },
    ],
    activities: [
      { id: "A-1", title: "Take Aspirin 75mg PO daily", frequency: "Daily at 08:00 AM" },
      { id: "A-2", title: "Monitor blood glucose log", frequency: "Fasting & 2hrs post-meal" },
    ],
  },
};
