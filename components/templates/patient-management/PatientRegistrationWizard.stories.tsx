import type { Meta, StoryObj } from "@storybook/react";
import { PatientRegistrationWizard } from "./PatientRegistrationWizard";

const meta: Meta<typeof PatientRegistrationWizard> = {
  title: "Templates/Patient Management/Patient Registration Wizard",
  component: PatientRegistrationWizard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PatientRegistrationWizard> = {};
