import type { Meta, StoryObj } from "@storybook/react";
import { GoalTracker } from "./GoalTracker";

const meta: Meta<typeof GoalTracker> = {
  title: "Healthcare Organisms/GoalTracker",
  component: GoalTracker,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <GoalTracker
      className="max-w-xl"
      goals={[
        { id: "g-1", title: "Maintain HbA1c below 7.0%", targetDate: "Dec 31, 2023", progressPct: 80, status: "in-progress", category: "Endocrinology" },
        { id: "g-2", title: "Walk 30 minutes 5 days/week", targetDate: "Nov 15, 2023", progressPct: 60, status: "in-progress", category: "Physical Therapy" },
      ]}
    />
  ),
};
