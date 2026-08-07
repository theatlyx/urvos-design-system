import type { Meta, StoryObj } from "@storybook/react";
import { FullEHRApplicationShell } from "./FullEHRApplicationShell";

const meta: Meta<typeof FullEHRApplicationShell> = {
  title: "Templates/Application Shells/Full EHR Application Shell",
  component: FullEHRApplicationShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof FullEHRApplicationShell> = {
  args: {
    activeNav: "clinical",
    children: (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-urvos-border pb-4">
          <div>
            <h1 className="text-xl font-bold text-urvos-text">Clinical Encounter Workspace</h1>
            <p className="text-xs text-urvos-text-subtle">OPD Consultation • Patient: Rajesh Kumar (MRN-2026-8819)</p>
          </div>
          <button className="btn btn--primary font-xs">+ Sign Encounter Note</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border border-urvos-border bg-urvos-surface rounded-xl space-y-2">
            <div className="text-xs font-bold text-urvos-primary">Primary Complaint</div>
            <div className="text-sm font-semibold text-urvos-text">Chest tightness & exertion dyspnea x 3 days</div>
          </div>

          <div className="p-5 border border-urvos-border bg-urvos-surface rounded-xl space-y-2">
            <div className="text-xs font-bold text-emerald-600">Vitals Status</div>
            <div className="text-sm font-semibold text-urvos-text">BP: 138/88 mmHg • HR: 82 bpm • SpO2: 98%</div>
          </div>

          <div className="p-5 border border-urvos-border bg-urvos-surface rounded-xl space-y-2">
            <div className="text-xs font-bold text-amber-600">Active Orders</div>
            <div className="text-sm font-semibold text-urvos-text">ECG 12-Lead • Inj. Pantoprazole 40mg</div>
          </div>
        </div>
      </div>
    ),
  },
};
