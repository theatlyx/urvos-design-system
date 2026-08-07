import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "UI/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xs p-6 bg-urvos-background min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof TimePicker> = {
  render: () => {
    const [time, setTime] = useState<string>("");
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-urvos-text">Appointment Time</label>
        <TimePicker value={time} onChange={setTime} />
        {time && <p className="text-sm text-urvos-text-muted">Selected: {time}</p>}
      </div>
    );
  },
};

export const Prefilled: StoryObj<typeof TimePicker> = {
  render: () => {
    const [time, setTime] = useState<string>("09:30");
    return <TimePicker value={time} onChange={setTime} />;
  },
};

export const WithError: StoryObj<typeof TimePicker> = {
  render: () => {
    const [time, setTime] = useState<string>("");
    return (
      <div className="flex flex-col gap-2">
        <TimePicker value={time} onChange={setTime} error />
        <p className="text-xs text-urvos-destructive">Please select a valid time.</p>
      </div>
    );
  },
};
