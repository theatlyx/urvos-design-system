import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./Feedback";
import { Search } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <Search className="w-12 h-12" />,
    title: "No results found",
    description: "We couldn't find anything matching your search. Please try again with different keywords.",
    action: <Button variant="secondary">Clear search</Button>,
  },
};
