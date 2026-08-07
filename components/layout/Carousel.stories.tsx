import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const meta: Meta<typeof Carousel> = {
  title: "Data Display/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const PatientEducationCards = {
  render: () => (
    <Carousel className="w-[500px]">
      <Card className="border-0 shadow-none p-6 bg-urvos-surface">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg">Module 1: Managing Hypertension</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-sm text-urvos-text-subtle">
          Learn how sodium intake, regular exercise, and medication compliance contribute to optimal blood pressure regulation.
        </CardContent>
      </Card>
      <Card className="border-0 shadow-none p-6 bg-urvos-surface">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg">Module 2: Blood Glucose Tracking</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-sm text-urvos-text-subtle">
          Understand fasting glucose ranges, HbA1c target metrics, and dietary adjustments.
        </CardContent>
      </Card>
      <Card className="border-0 shadow-none p-6 bg-urvos-surface">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg">Module 3: Post-Operative Wound Care</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-sm text-urvos-text-subtle">
          Step-by-step guidance on sterile dressing changes, infection warning signs, and activity limits.
        </CardContent>
      </Card>
    </Carousel>
  ),
};
