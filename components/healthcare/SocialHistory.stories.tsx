import type { Meta, StoryObj } from "@storybook/react";
import { SocialHistory } from "./SocialHistory";

const meta: Meta<typeof SocialHistory> = {
  title: "Healthcare Organisms/SocialHistory",
  component: SocialHistory,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <SocialHistory
      className="max-w-xl"
      factors={[
        { category: "Tobacco", status: "Former Smoker", detail: "Quit 5 yrs ago (10 pack-years total)" },
        { category: "Alcohol", status: "Moderate Use", detail: "1-2 drinks per week" },
        { category: "Housing", status: "Stable", detail: "Lives with spouse in private residence" },
        { category: "Exercise", status: "Active", detail: "30 mins walking 4x weekly" },
      ]}
    />
  ),
};
