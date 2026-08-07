import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalCopilot } from "./ClinicalCopilot";

const meta: Meta<typeof ClinicalCopilot> = {
  title: "Healthcare/ClinicalCopilot",
  component: ClinicalCopilot,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    onAction: (id: string, label: string) => console.log(`Action triggered: ${id} - ${label}`),
  },
};
