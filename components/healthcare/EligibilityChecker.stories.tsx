import type { Meta, StoryObj } from "@storybook/react";
import { EligibilityChecker } from "./EligibilityChecker";

const meta: Meta<typeof EligibilityChecker> = {
  title: "Healthcare/Insurance Eligibility Checker",
  component: EligibilityChecker,
};

export default meta;

export const ActivePolicy: StoryObj<typeof EligibilityChecker> = {
  args: {
    initialData: {
      policyNumber: "POL-STAR-88192",
      payerName: "Star Health Insurance",
      subscriberName: "Sanjay Mehta",
      status: "ACTIVE",
      copayAmount: "₹500 / visit",
      deductibleRemaining: "₹15,000",
      annualMaxLimit: "₹5,000,000",
      coverageEndDate: "2027-03-31",
      requiresPreAuth: true,
    },
  },
};
