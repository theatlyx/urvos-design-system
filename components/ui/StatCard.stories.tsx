import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";
import { Heart, Users, FlaskConical, Activity } from "lucide-react";

const meta: Meta<typeof StatCard> = {
  title: "UI/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: "Active Patients",
    value: "1,284",
    delta: "12%",
    deltaDir: "up",
    deltaLabel: "vs last month",
    icon: <Users style={{ width: 18, height: 18, color: "var(--brand-solid)" }} />,
    iconBg: "var(--brand-tint)",
  },
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <StatCard
        title="Active Patients"
        value="1,284"
        delta="12%"
        deltaDir="up"
        deltaLabel="vs last month"
        icon={<Users style={{ width: 18, height: 18, color: "var(--brand-solid)" }} />}
        iconBg="var(--brand-tint)"
      />
      <StatCard
        title="Critical Alerts"
        value="7"
        delta="3"
        deltaDir="down"
        deltaLabel="fewer than yesterday"
        icon={<Activity style={{ width: 18, height: 18, color: "var(--sig-critical)" }} />}
        iconBg="var(--sig-critical-tint)"
      />
      <StatCard
        title="Labs Pending"
        value="43"
        delta="5%"
        deltaDir="flat"
        deltaLabel="stable"
        icon={<FlaskConical style={{ width: 18, height: 18, color: "var(--sig-caution-dark)" }} />}
        iconBg="var(--sig-caution-tint)"
      />
      <StatCard
        title="Avg. BP (mmHg)"
        value="118/76"
        footer="Last 24h — all wards"
        icon={<Heart style={{ width: 18, height: 18, color: "var(--sig-success-dark)" }} />}
        iconBg="var(--sig-success-tint)"
      />
    </div>
  ),
};
