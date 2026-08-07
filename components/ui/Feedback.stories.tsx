import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./Feedback";

const meta: Meta<typeof EmptyState> = {
  title: "UI/Empty State Feedback",
  component: EmptyState,
};

export default meta;

export const Default: StoryObj<typeof EmptyState> = {
  args: {
    title: "No Lab Orders Found",
    description: "There are currently no active lab orders matching your search query.",
    action: <button className="btn btn--primary font-xs">+ Order New Lab Test</button>,
  },
};

export const Compact: StoryObj<typeof EmptyState> = {
  args: {
    title: "No Recent Vitals",
    description: "Patient vitals have not been logged for this encounter.",
    compact: true,
  },
};
