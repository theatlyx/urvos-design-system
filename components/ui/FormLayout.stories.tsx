import type { Meta, StoryObj } from "@storybook/react";
import { FormLayout } from "./FormLayout";
import { Field, Input } from "./Form";

const meta: Meta<typeof FormLayout> = {
  title: "UI/FormLayout",
  component: FormLayout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const TwoColumnForm = {
  render: () => (
    <FormLayout columns={2} className="max-w-xl">
      <Field label="First Name">
        <Input placeholder="John" />
      </Field>
      <Field label="Last Name">
        <Input placeholder="Doe" />
      </Field>
      <Field label="Date of Birth">
        <Input type="date" />
      </Field>
      <Field label="Phone Number">
        <Input placeholder="(555) 000-0000" />
      </Field>
    </FormLayout>
  ),
};
