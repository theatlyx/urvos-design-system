import type { Meta, StoryObj } from "@storybook/react";
import { UnifiedClinicalInbox } from "./UnifiedClinicalInbox";

const meta = {
  title: "Templates/Authentication & Communication/UnifiedClinicalInbox",
  component: UnifiedClinicalInbox,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnifiedClinicalInbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
