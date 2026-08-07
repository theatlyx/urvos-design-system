import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";
import { useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};

export default meta;

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];

export const Default = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={options}
        selected={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
        className="w-[300px]"
      />
    );
  },
};
