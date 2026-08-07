import type { Meta, StoryObj } from "@storybook/react";
import { NotificationProvider, NotificationPopover, NotificationCenter, NotificationSettings, type NotificationItem } from "./NotificationSystem";

const meta: Meta<typeof NotificationCenter> = {
  title: "Healthcare/NotificationSystem",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
  },
};

export default meta;

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Critical Lab Result",
    message: "Potassium level is 6.2 mEq/L (High) for patient John Doe.",
    type: "error",
    createdAt: new Date(),
    read: false,
  },
  {
    id: "2",
    title: "New Message",
    message: "Dr. Smith commented on your consult request.",
    type: "info",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
  },
  {
    id: "3",
    title: "System Update",
    message: "Urvos will undergo maintenance on Sunday at 2 AM EST.",
    type: "warning",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
  }
];

type Story = StoryObj<typeof NotificationCenter>;

export const PopoverDemo: StoryObj<typeof NotificationPopover> = {
  render: () => (
    <NotificationProvider initialNotifications={mockNotifications}>
      <div className="p-12 border border-urvos-border border-dashed rounded-lg flex items-start justify-center h-[400px]">
        <NotificationPopover />
      </div>
    </NotificationProvider>
  )
};

export const CenterDemo: Story = {
  render: () => (
    <NotificationProvider initialNotifications={mockNotifications}>
      <NotificationCenter />
    </NotificationProvider>
  )
};

export const SettingsDemo: StoryObj<typeof NotificationSettings> = {
  render: () => (
    <NotificationSettings />
  )
};
