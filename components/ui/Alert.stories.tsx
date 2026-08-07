import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertInfo, AlertSuccess, AlertWarning, AlertError } from "./Alert";
import { Button } from "./Button";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", title: "System update scheduled", children: "The system will be unavailable on Saturday between 02:00–04:00 IST for scheduled maintenance." },
};

export const Success: Story = {
  args: { variant: "success", title: "Patient record saved", children: "All changes have been saved and synced to the EMR." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Lab results pending", children: "2 critical lab results are awaiting review. Please check the lab panel." },
};

export const Error: Story = {
  args: { variant: "error", title: "Submission failed", children: "Could not save the encounter form. Please check your connection and try again." },
};

export const Dismissible: Story = {
  args: { variant: "warning", title: "Incomplete medication history", children: "Patient's medication list may be incomplete. Please verify before prescribing.", dismissible: true },
};

export const WithAction: Story = {
  args: {
    variant: "info",
    title: "Drug interaction detected",
    children: "Amoxicillin may interact with Warfarin. Review before proceeding.",
    action: <Button variant="secondary" size="sm">Review interactions</Button>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AlertInfo title="Info">Informational message for the clinician.</AlertInfo>
      <AlertSuccess title="Success">Action completed successfully.</AlertSuccess>
      <AlertWarning title="Warning">Please review before continuing.</AlertWarning>
      <AlertError title="Error">An error occurred. Please retry.</AlertError>
    </div>
  ),
};
