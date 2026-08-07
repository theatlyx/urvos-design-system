import type { Meta, StoryObj } from "@storybook/react";
import { TabsScrollable } from "../navigation/TabsScrollable";

const meta: Meta<typeof TabsScrollable> = {
  title: "Navigation/TabsScrollable",
  component: TabsScrollable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <TabsScrollable
      className="max-w-md"
      items={[
        { id: "1", label: "General Information", content: <div className="text-xs">Tab 1</div> },
        { id: "2", label: "Medical History", content: <div className="text-xs">Tab 2</div> },
        { id: "3", label: "Surgical Logs", content: <div className="text-xs">Tab 3</div> },
        { id: "4", label: "Immunization Registry", content: <div className="text-xs">Tab 4</div> },
        { id: "5", label: "Insurance Claims", content: <div className="text-xs">Tab 5</div> },
        { id: "6", label: "Audit Logs", content: <div className="text-xs">Tab 6</div> },
      ]}
    />
  ),
};
