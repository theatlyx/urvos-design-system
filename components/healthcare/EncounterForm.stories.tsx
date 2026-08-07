import type { Meta, StoryObj } from "@storybook/react";
import { EncounterForm } from "./EncounterForm";

const meta: Meta<typeof EncounterForm> = {
  title: "Healthcare/EncounterForm",
  component: EncounterForm,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    onSubmitEncounter: (data: any) => console.log("Encounter Submitted:", data),
  },
};
