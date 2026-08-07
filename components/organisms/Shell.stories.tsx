import type { Meta, StoryObj } from "@storybook/react";
import { Shell } from "./Shell";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { StatCard } from "../ui/StatCard";
import { Activity, Users, Calendar, AlertTriangle } from "lucide-react";

const meta: Meta<typeof Shell> = {
  title: "Layout/Shell",
  component: Shell,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

export const ResponsiveClinicalEHRLayout = {
  render: () => (
    <Shell
      user={{
        name: "Dr. Sarah Jenkins",
        role: "Attending Physician (ICU)",
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-urvos-border pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-urvos-text tracking-tight">
              ICU Department Overview
            </h1>
            <p className="text-xs sm:text-sm text-urvos-text-subtle mt-0.5">
              Realtime patient monitoring & department triage dashboard
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-urvos-primary/10 text-urvos-primary border border-urvos-primary/20 rounded-full w-fit">
            System Online (Live Stream)
          </span>
        </div>

        {/* Responsive Stat Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Inpatients" value="48" delta="+4 today" deltaDir="up" icon={<Users className="h-5 w-5 text-urvos-primary" />} />
          <StatCard title="Critical STAT Alerts" value="3" delta="High Priority" deltaDir="down" icon={<AlertTriangle className="h-5 w-5 text-urvos-danger" />} />
          <StatCard title="Telemetry Stream" value="99.4%" delta="Normal" deltaDir="up" icon={<Activity className="h-5 w-5 text-urvos-success" />} />
          <StatCard title="Surgeries Today" value="12" delta="On Schedule" deltaDir="up" icon={<Calendar className="h-5 w-5 text-urvos-primary" />} />
        </div>

        {/* Content Section */}
        <Card className="p-6">
          <CardTitle className="text-base font-bold text-urvos-text">Department Capacity & Responsiveness</CardTitle>
          <CardContent className="p-0 text-xs text-urvos-text-subtle mt-2 space-y-2">
            <p>
              This shell layout automatically adapts across 5 standardized breakpoints (xs: 480px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px).
            </p>
            <ul className="list-disc pl-4 space-y-1 text-urvos-text">
              <li><strong>Desktop (lg+):</strong> Collapsible left sidebar (w-64 expanded to w-16 collapsed).</li>
              <li><strong>Tablet (md):</strong> Persistent collapsed sidebar.</li>
              <li><strong>Mobile (sm-):</strong> Hidden sidebar with slide-in overlay drawer and top-bar hamburger toggle.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Shell>
  ),
};
