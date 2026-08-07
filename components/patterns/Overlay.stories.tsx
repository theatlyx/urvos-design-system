import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, Dropdown } from "./Overlay";

const meta: Meta<typeof Tooltip> = {
  title: "Patterns/Overlay Components",
  component: Tooltip,
};

export default meta;

export const TooltipExample: StoryObj<typeof Tooltip> = {
  render: () => (
    <div className="p-10 flex items-center justify-center">
      <Tooltip label="HIPAA Audit Log Verified">
        <button className="btn btn--secondary font-xs">Hover for Tooltip</button>
      </Tooltip>
    </div>
  ),
};

export const DropdownExample: StoryObj = {
  render: () => (
    <div className="p-10 flex items-center justify-center">
      <Dropdown
        trigger={<button className="btn btn--primary font-xs">Actions ▾</button>}
        items={[
          { label: "View Full EMR Chart", onSelect: () => alert("Chart clicked") },
          { label: "Print Prescription", onSelect: () => alert("Print clicked") },
          { label: "Cancel Appointment", onSelect: () => alert("Cancel clicked"), danger: true },
        ]}
      />
    </div>
  ),
};
