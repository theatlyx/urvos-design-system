import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "react-day-picker";

const meta: Meta<typeof DateRangePicker> = {
  title: "UI/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-xs p-6 bg-urvos-background min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof DateRangePicker> = {
  render: () => {
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 10),
      to: addDays(new Date(2024, 0, 10), 14),
    });
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-urvos-text">Date Range</label>
        <DateRangePicker value={date} onChange={setDate} />
        {date?.from && date?.to && (
          <p className="text-xs text-urvos-text-muted">
            {date.from.toLocaleDateString()} → {date.to.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const Empty: StoryObj<typeof DateRangePicker> = {
  render: () => {
    const [date, setDate] = useState<DateRange | undefined>();
    return <DateRangePicker value={date} onChange={setDate} placeholder="Select admission period..." />;
  },
};
