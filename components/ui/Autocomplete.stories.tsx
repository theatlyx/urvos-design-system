import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";
import { useState } from "react";

const meta: Meta<typeof Autocomplete> = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
};

export default meta;

const options = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Australia", value: "au" },
];

export const Default = {
  render: () => {
    const [selected, setSelected] = useState<string>("");
    return (
      <Autocomplete
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select a country..."
        className="w-[250px]"
      />
    );
  },
};
