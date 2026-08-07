import type { Meta, StoryObj } from "@storybook/react";
import { IdleTimer } from "../utilities/IdleTimer";

const meta: Meta<typeof IdleTimer> = {
  title: "Utilities/IdleTimer",
  component: IdleTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const DemoTenSecondTimeout = {
  render: () => (
    <div className="p-4 text-xs text-urvos-text-subtle border rounded-xl">
      Stop interacting for 10 seconds to trigger HIPAA session auto-lock modal.
      <IdleTimer timeoutMs={10000} />
    </div>
  ),
};
