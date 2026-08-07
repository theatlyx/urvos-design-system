import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CommandPalette } from "./CommandPalette";
import { Button } from "./Button";
import {
  Users, FlaskConical, FileText, Settings, Bell, Search, Calendar,
  Pill, LayoutDashboard, LogOut, Command,
} from "lucide-react";

const meta: Meta<typeof CommandPalette> = {
  title: "UI/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

const clinicalCommands = [
  { id: "patients",   label: "Patient List",          group: "Navigation",  icon: <Users style={{ width: 16, height: 16 }} />,          shortcut: "G P", onSelect: () => {} },
  { id: "labs",       label: "Lab Results",           group: "Navigation",  icon: <FlaskConical style={{ width: 16, height: 16 }} />,    shortcut: "G L", onSelect: () => {} },
  { id: "dashboard",  label: "Dashboard",             group: "Navigation",  icon: <LayoutDashboard style={{ width: 16, height: 16 }} />, shortcut: "G D", onSelect: () => {} },
  { id: "schedule",   label: "OPD Schedule",          group: "Navigation",  icon: <Calendar style={{ width: 16, height: 16 }} />,        onSelect: () => {} },
  { id: "new-enc",    label: "New Encounter",         group: "Actions",     icon: <FileText style={{ width: 16, height: 16 }} />,        shortcut: "⌘N", onSelect: () => {} },
  { id: "prescribe",  label: "Prescribe Medication",  group: "Actions",     icon: <Pill style={{ width: 16, height: 16 }} />,            shortcut: "⌘P", onSelect: () => {} },
  { id: "search-pt",  label: "Search Patient",        group: "Actions",     icon: <Search style={{ width: 16, height: 16 }} />,          shortcut: "⌘K", onSelect: () => {} },
  { id: "notifs",     label: "Notifications",         group: "Settings",    icon: <Bell style={{ width: 16, height: 16 }} />,            onSelect: () => {} },
  { id: "settings",   label: "Settings",              group: "Settings",    icon: <Settings style={{ width: 16, height: 16 }} />,        shortcut: "⌘,", onSelect: () => {} },
  { id: "logout",     label: "Sign out",              group: "Settings",    icon: <LogOut style={{ width: 16, height: 16 }} />,          onSelect: () => {} },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button onClick={() => setOpen(true)}>
          <Command style={{ width: 14, height: 14, marginRight: 6 }} />
          Open Command Palette (⌘K)
        </Button>
        <CommandPalette
          items={clinicalCommands}
          open={open}
          onOpenChange={setOpen}
          placeholder="Search commands, patients, records…"
        />
        <p style={{ color: "var(--text-2)", fontSize: 13, marginTop: 16 }}>
          Press <kbd style={{ background: "var(--surface-soft)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 5px" }}>⌘K</kbd> to open
        </p>
      </div>
    );
  },
};
