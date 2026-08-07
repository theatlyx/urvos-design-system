import type { Meta, StoryObj } from "@storybook/react";
import { PatientPortalHome } from "./PatientPortalHome";

const meta: Meta<typeof PatientPortalHome> = {
  title: "Templates/Patient Management/Patient Portal Home",
  component: PatientPortalHome,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PatientPortalHome> = {};
