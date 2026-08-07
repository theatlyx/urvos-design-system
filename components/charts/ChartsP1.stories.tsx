import type { Meta, StoryObj } from "@storybook/react";
import { ChartScatter } from "./ChartScatter";
import { ChartRadar } from "./ChartRadar";
import { ChartGauge } from "./ChartGauge";
import { ChartHeatmap } from "./ChartHeatmap";

const meta: Meta = {
  title: "Charts/Advanced P1 Suite",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const ScatterPlot = {
  render: () => (
    <ChartScatter
      data={[
        { x: 110, y: 68 },
        { x: 122, y: 72 },
        { x: 135, y: 84 },
        { x: 148, y: 92 },
        { x: 160, y: 98 },
        { x: 128, y: 76 },
      ]}
      className="max-w-xl"
    />
  ),
};

export const RadarComparison = {
  render: () => (
    <ChartRadar
      data={[
        { subject: "Cardiovascular", A: 85, B: 60 },
        { subject: "Respiratory", A: 90, B: 75 },
        { subject: "Renal Function", A: 65, B: 85 },
        { subject: "Metabolic", A: 70, B: 55 },
        { subject: "Neurological", A: 95, B: 90 },
      ]}
      seriesALabel="Baseline"
      seriesBLabel="Post-Therapy"
      className="max-w-xl"
    />
  ),
};

export const RiskGauge = {
  render: () => (
    <div className="flex gap-4">
      <ChartGauge value={25} title="Sepsis Risk Index" label="Low Risk" className="max-w-xs" />
      <ChartGauge value={62} title="Readmission Risk Index" label="Moderate Risk" className="max-w-xs" />
      <ChartGauge value={88} title="Fall Risk Score" label="High Alert" className="max-w-xs" />
    </div>
  ),
};

export const HeatmapGrid = {
  render: () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const hours = ["08:00", "12:00", "16:00", "20:00"];
    const data = days.flatMap((day) =>
      hours.map((hour) => ({
        day,
        hour,
        intensity: Math.floor(Math.random() * 5),
      }))
    );

    return <ChartHeatmap data={data} className="max-w-2xl" />;
  },
};
