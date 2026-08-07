import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonCard, SkeletonTableRows, EmptyState } from "./Feedback";
import { Button } from "./Button";
import { FileX, FlaskConical } from "lucide-react";

// ─── SKELETON ─────────────────────────────────────────────────

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { variant: "text", width: 200 } };
export const Title: Story = { args: { variant: "title", width: 300 } };
export const AvatarSkeleton: Story = { args: { variant: "avatar" } };

export const Card: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SkeletonCard />
    </div>
  ),
};

export const PatientListLoader: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: 16, background: "var(--surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
          <Skeleton variant="avatar" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
            <Skeleton variant="title" width="60%" />
            <Skeleton width="40%" />
          </div>
          <Skeleton width={80} />
        </div>
      ))}
    </div>
  ),
};

// ─── EMPTY STATE ──────────────────────────────────────────────

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={<FlaskConical style={{ width: 48, height: 48, color: "var(--text-3)" }} />}
      title="No lab results yet"
      description="Lab results for this patient will appear here once processed by the laboratory."
      action={<Button variant="secondary">Request labs</Button>}
    />
  ),
};

export const CompactEmpty: Story = {
  render: () => (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
      <EmptyState title="No records found" description="Adjust your search filters." compact />
    </div>
  ),
};

export const NoData: Story = {
  render: () => (
    <EmptyState
      icon={<FileX style={{ width: 48, height: 48, color: "var(--text-3)" }} />}
      title="Nothing here yet"
      description="Once data is recorded it will appear here."
    />
  ),
};
