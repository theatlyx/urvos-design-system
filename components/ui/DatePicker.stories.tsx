import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xs p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof DatePicker> = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-urvos-text">Select Date</label>
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date..." />
        {date && (
          <p className="text-sm text-urvos-text-muted">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const Prefilled: StoryObj<typeof DatePicker> = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date("2024-01-15"));
    return <DatePicker value={date} onChange={setDate} />;
  },
};
