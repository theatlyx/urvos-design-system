import type { Meta, StoryObj } from "@storybook/react";
import { KioskCheckinShell } from "./KioskCheckinShell";

const meta: Meta<typeof KioskCheckinShell> = {
  title: "Templates/Application Shells/Kiosk Check-in Shell",
  component: KioskCheckinShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof KioskCheckinShell> = {
  args: {
    facilityName: "Fortis Healthcare Center",
    children: (
      <div className="max-w-md w-full p-8 border border-urvos-border bg-urvos-background rounded-2xl shadow-xl text-center space-y-6">
        <h2 className="text-2xl font-black text-urvos-text">Welcome to OPD Check-in</h2>
        <p className="text-sm text-urvos-text-subtle">Scan your ABHA QR Code or enter your registered mobile number.</p>
        <button className="btn btn--primary w-full py-4 text-base font-bold rounded-xl shadow-md">
          Start Check-in
        </button>
      </div>
    ),
  },
};
