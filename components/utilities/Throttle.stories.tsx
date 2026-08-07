import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { useThrottle } from "../utilities/Throttle";

function ThrottleDemo() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 500);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4 border rounded-xl space-y-2 text-xs">
      <p>Scroll Y position: <strong>{scrollY}px</strong></p>
      <p>Throttled Y position (500ms): <strong>{throttledScrollY}px</strong></p>
    </div>
  );
}

const meta: Meta = {
  title: "Utilities/Throttle",
  component: ThrottleDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <ThrottleDemo />,
};
