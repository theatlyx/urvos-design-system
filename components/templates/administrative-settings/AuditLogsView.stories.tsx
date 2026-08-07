import type { Meta, StoryObj } from "@storybook/react";
import { AuditLogsView } from "./AuditLogsView";

const meta: Meta<typeof AuditLogsView> = {
  title: "Templates/Administrative & Settings/Audit Logs View",
  component: AuditLogsView,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof AuditLogsView> = {};
