import type { Meta, StoryObj } from "@storybook/react";
import { useResponsive } from "./useResponsive";

function ResponsiveDemo() {
  const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className="p-6 border rounded-xl bg-urvos-surface space-y-4 max-w-md">
      <h3 className="text-base font-bold text-urvos-text">Responsive State Monitor</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 border rounded bg-slate-50 font-mono">Width: <strong>{width}px</strong></div>
        <div className="p-2 border rounded bg-slate-50 font-mono">Height: <strong>{height}px</strong></div>
        <div className="p-2 border rounded bg-slate-50 font-mono">Breakpoint: <strong className="uppercase text-urvos-primary">{breakpoint}</strong></div>
        <div className="p-2 border rounded bg-slate-50 font-mono">Device Type: <strong>{isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}</strong></div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Utilities/useResponsive",
  component: ResponsiveDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <ResponsiveDemo />,
};
