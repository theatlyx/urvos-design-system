import type { Meta, StoryObj } from "@storybook/react";
import { TherapyPlanViewer } from "./TherapyPlanViewer";

const meta: Meta<typeof TherapyPlanViewer> = {
  title: "Templates/Behavioral & Rehab/Therapy Plan Viewer",
  component: TherapyPlanViewer,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof TherapyPlanViewer> = {};
