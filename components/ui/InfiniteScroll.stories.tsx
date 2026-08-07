import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll } from "./InfiniteScroll";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

const meta: Meta<typeof InfiniteScroll> = {
  title: "UI/InfiniteScroll",
  component: InfiniteScroll,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="max-w-md">
      <InfiniteScroll hasMore={true} loadMore={() => {}} isLoading={true}>
        <div className="space-y-3">
          <Card className="p-4">
            <CardTitle className="text-sm font-semibold">Patient Note #102</CardTitle>
            <CardContent className="p-0 text-xs text-urvos-text-subtle mt-1">
              Patient reported mild dizziness post-medication dosage.
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardTitle className="text-sm font-semibold">Patient Note #101</CardTitle>
            <CardContent className="p-0 text-xs text-urvos-text-subtle mt-1">
              Vital signs stabilized after IV fluids infusion.
            </CardContent>
          </Card>
        </div>
      </InfiniteScroll>
    </div>
  ),
};
