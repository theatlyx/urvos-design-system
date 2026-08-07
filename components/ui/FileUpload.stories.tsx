import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "UI/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    label: "Upload your documents",
    maxFiles: 3,
    maxSizeMB: 5,
  },
};

export const ErrorState = {
  args: {
    label: "Upload your documents",
    error: "File is too large",
  },
};
