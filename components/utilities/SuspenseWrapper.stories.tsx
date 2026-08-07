import type { Meta, StoryObj } from "@storybook/react";
import { SuspenseWrapper } from "../utilities/SuspenseWrapper";

const meta: Meta<typeof SuspenseWrapper> = {
  title: "Utilities/SuspenseWrapper",
  component: SuspenseWrapper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <SuspenseWrapper>
      <div className="p-4 border rounded-xl bg-urvos-surface text-sm font-semibold">
        Suspended Component Content Loaded Successfully
      </div>
    </SuspenseWrapper>
  ),
};
