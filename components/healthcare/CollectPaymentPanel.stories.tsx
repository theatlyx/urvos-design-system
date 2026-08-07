import type { Meta, StoryObj } from "@storybook/react";
import { CollectPaymentPanel } from "./CollectPaymentPanel";

const meta: Meta<typeof CollectPaymentPanel> = {
  title: "Healthcare/Point of Care Payment Panel",
  component: CollectPaymentPanel,
};

export default meta;

export const Default: StoryObj<typeof CollectPaymentPanel> = {
  args: {
    patientName: "Meenakshi Sundaram",
    encounterId: "ENC-OPD-9982",
    dueAmount: "1250",
  },
};
