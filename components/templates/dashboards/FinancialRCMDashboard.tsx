"use client";

import React from "react";
import { clsx } from "clsx";
import { DollarSign, AlertOctagon, Receipt, CheckCircle2 } from "lucide-react";
import { DenialAnalyticsCard } from "../../healthcare/DenialAnalyticsCard";
import { EligibilityChecker } from "../../healthcare/EligibilityChecker";
import { Badge } from "../../ui/Badge";

export function FinancialRCMDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Revenue Cycle Management (RCM & 835 ERA)</h1>
          <p className="text-xs text-urvos-text-subtle">
            Claim denial analysis, insurance pre-authorization queue, and cash flow performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="critical">₹4,85,000 Active Denials</Badge>
          <Badge variant="success">₹12,40,000 Settled (30d)</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DenialAnalyticsCard
          denials={[
            { id: "DEN-1", claimId: "CLM-9918", patientName: "Rahul Verma", denialCode: "CARC 96", denialReason: "Non-covered procedure code without pre-authorization", amount: "₹45,000", suggestedAction: "Attach clinical pre-auth approval letter", deadlineDate: "2026-08-10" },
            { id: "DEN-2", claimId: "CLM-9924", patientName: "Meena Swaminathan", denialCode: "RARC N382", denialReason: "Missing rendering provider NPI / license details", amount: "₹18,500", suggestedAction: "Update provider license info in claim header", deadlineDate: "2026-08-04" },
          ]}
        />

        <EligibilityChecker
          initialData={{
            policyNumber: "POL-CGHS-882190",
            payerName: "Star Health Insurance",
            subscriberName: "Siddharth Das",
            status: "ACTIVE",
            copayAmount: "₹500",
            deductibleRemaining: "₹2,500",
            annualMaxLimit: "₹5,000,000",
            coverageEndDate: "2027-12-31",
            requiresPreAuth: true,
          }}
        />
      </div>
    </div>
  );
}
