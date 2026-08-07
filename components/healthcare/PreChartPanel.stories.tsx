import type { Meta, StoryObj } from "@storybook/react";
import { PreChartPanel } from "./PreChartPanel";

const meta: Meta<typeof PreChartPanel> = {
  title: "Healthcare/Pre-Chart Panel",
  component: PreChartPanel,
};

export default meta;

export const Default: StoryObj<typeof PreChartPanel> = {
  args: {
    data: {
      patientName: "Arjun Reddy",
      age: 48,
      gender: "Male",
      chiefComplaint: "Acute Shortness of Breath & Chest Tightness",
      riskScore: "HIGH",
      lastVitals: {
        bp: "142/90",
        hr: 98,
        temp: "98.6 °F",
        spo2: 94,
      },
      activeDiagnoses: ["Bronchial Asthma", "Essential Hypertension", "Dyslipidemia"],
      pendingOrders: ["STAT ECG 12-Lead", "Troponin-I Blood Panel", "Chest X-Ray PA View"],
    },
  },
};
