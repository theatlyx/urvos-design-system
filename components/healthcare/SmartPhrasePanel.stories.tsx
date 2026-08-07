import type { Meta, StoryObj } from "@storybook/react";
import { SmartPhrasePanel } from "./SmartPhrasePanel";

const meta: Meta<typeof SmartPhrasePanel> = {
  title: "Healthcare/Smart Phrase Panel",
  component: SmartPhrasePanel,
};

export default meta;

export const Default: StoryObj<typeof SmartPhrasePanel> = {
  args: {
    phrases: [
      {
        shortcut: ".normexam",
        title: "Normal Adult Physical Exam",
        category: "Physical Exam",
        content: "HEENT: Normocephalic. Pupils equal, round, reactive to light. Cardiac: Regular rate and rhythm, no murmurs. Lungs: Clear to auscultation bilaterally. Abdomen: Soft, non-tender, non-distended.",
      },
      {
        shortcut: ".rosneg",
        title: "Negative 10-Point Review of Systems",
        category: "General",
        content: "Constitutional: Denies fever/chills. Cardiovascular: Denies chest pain or palpitations. Respiratory: Denies dyspnea or cough. GI: Denies nausea, vomiting, or diarrhea.",
      },
      {
        shortcut: ".dm2plan",
        title: "Type 2 Diabetes Management Plan",
        category: "Plan",
        content: "Continue Metformin 1000mg BID. Order HbA1c, Fasting Lipid Profile, Urine Microalbumin. Dietary counseling provided. Follow up in 3 months.",
      },
    ],
  },
};
