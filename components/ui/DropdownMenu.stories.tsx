import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "./Button";
import { Edit, Trash2, Eye, Download, Share2, Copy, MoreHorizontal } from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary" size="sm">Actions ▾</Button>,
    items: [
      { label: "View record",   icon: <Eye style={{ width: 16, height: 16 }} />,      onSelect: () => alert("View") },
      { label: "Edit record",   icon: <Edit style={{ width: 16, height: 16 }} />,     onSelect: () => alert("Edit") },
      { label: "Export PDF",    icon: <Download style={{ width: 16, height: 16 }} />, shortcut: "⌘E", onSelect: () => alert("Export") },
      { type: "separator" as const },
      { label: "Delete record", icon: <Trash2 style={{ width: 16, height: 16 }} />,   danger: true, onSelect: () => alert("Delete") },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    trigger: <Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal style={{ width: 18, height: 18 }} /></Button>,
    groups: [
      {
        label: "Document",
        items: [
          { label: "Copy link", icon: <Copy style={{ width: 16, height: 16 }} />,   shortcut: "⌘C", onSelect: () => {} },
          { label: "Share",     icon: <Share2 style={{ width: 16, height: 16 }} />, shortcut: "⌘S", onSelect: () => {} },
          { label: "Download",  icon: <Download style={{ width: 16, height: 16 }} />, onSelect: () => {} },
        ],
      },
      {
        label: "Danger zone",
        items: [
          { label: "Delete",    icon: <Trash2 style={{ width: 16, height: 16 }} />, danger: true, onSelect: () => {} },
        ],
      },
    ],
  },
};
