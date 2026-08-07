import type { Meta, StoryObj } from "@storybook/react";
import { MobileProviderShell } from "./MobileProviderShell";

const meta: Meta<typeof MobileProviderShell> = {
  title: "Templates/Application Shells/Mobile Provider Shell",
  component: MobileProviderShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof MobileProviderShell> = {
  args: {
    providerName: "Dr. Anita Desai",
    facilityName: "Max Super Specialty Hospital",
    activeTab: "rounds",
    children: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-urvos-text">On-Call Ward Rounds (4 Inpatients)</h3>
          <span className="text-[10px] text-urvos-primary font-bold">Ward 3B</span>
        </div>

        <div className="p-3 bg-urvos-surface border border-urvos-border rounded-lg space-y-1 text-xs">
          <div className="font-bold text-urvos-text">Bed 302 • Vikram Seth</div>
          <div className="text-urvos-text-subtle">Post-op Day 1 • Vitals Stable</div>
        </div>

        <div className="p-3 bg-urvos-surface border border-urvos-border rounded-lg space-y-1 text-xs">
          <div className="font-bold text-urvos-text">Bed 305 • Sunita Patel</div>
          <div className="text-rose-600 font-semibold">STAT Lab Result: K+ 2.9 mEq/L</div>
        </div>
      </div>
    ),
  },
};
