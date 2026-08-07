import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Patterns/Combobox",
  component: Combobox,
};

export default meta;

export const Default: StoryObj<typeof Combobox> = {
  args: {
    placeholder: "Select Primary ICD-10 Diagnosis...",
    options: [
      { value: "E11.9", label: "E11.9 - Type 2 Diabetes Mellitus without complications" },
      { value: "I10", label: "I10 - Essential (Primary) Hypertension" },
      { value: "J45.909", label: "J45.909 - Unspecified Asthma, Uncomplicated" },
      { value: "E78.5", label: "E78.5 - Hyperlipidemia, Unspecified" },
    ],
  },
};
