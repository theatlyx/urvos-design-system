import type { Meta, StoryObj } from "@storybook/react";
import { AdvancedDirective } from "./AdvancedDirective";

const meta: Meta<typeof AdvancedDirective> = {
  title: "Healthcare Organisms/AdvancedDirective",
  component: AdvancedDirective,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <AdvancedDirective className="max-w-xl" />,
};
