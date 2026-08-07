import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "./Sheet";
import { Button } from "./Button";

const meta: Meta<typeof Sheet> = {
  title: "Overlays/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open Patient Panel</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Patient Details - John Doe</SheetTitle>
          <SheetDescription>MRN: #94021 - Admitted to ICU Bed 4B</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-urvos-text-subtle uppercase">Vitals Overview</h4>
            <p className="text-sm font-medium mt-1">HR: 78 bpm | BP: 120/80 mmHg | SpO2: 98%</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-urvos-text-subtle uppercase">Active Allergies</h4>
            <p className="text-sm font-medium mt-1 text-urvos-danger">Penicillin (Severe anaphylaxis)</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close Panel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
