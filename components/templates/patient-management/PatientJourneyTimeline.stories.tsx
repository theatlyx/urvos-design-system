import type { Meta, StoryObj } from "@storybook/react";
import { PatientJourneyTimeline } from "./PatientJourneyTimeline";

const meta: Meta<typeof PatientJourneyTimeline> = {
  title: "Templates/Patient Management/Patient Journey Timeline",
  component: PatientJourneyTimeline,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PatientJourneyTimeline> = {};
