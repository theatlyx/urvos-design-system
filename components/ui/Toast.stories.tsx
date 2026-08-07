import type { Meta, StoryObj } from "@storybook/react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-6 bg-urvos-background min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Toast> = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Appointment Scheduled</ToastTitle>
          <ToastDescription>
            Dr. Arun Kumar — Friday, January 15, 2024 at 10:30 AM
          </ToastDescription>
        </div>
        <ToastAction altText="Undo" className="btn btn--secondary btn--sm">
          Undo
        </ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: StoryObj<typeof Toast> = {
  render: () => (
    <ToastProvider>
      <Toast variant="danger">
        <div className="grid gap-1">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>
            Failed to save patient record. Please try again.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithoutAction: StoryObj<typeof Toast> = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Lab Results Ready</ToastTitle>
          <ToastDescription>
            CBC panel results for MRN-0042 are now available.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
