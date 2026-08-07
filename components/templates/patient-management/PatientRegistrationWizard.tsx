"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { UserCheck, ShieldCheck, CreditCard, FileSignature, CheckCircle2 } from "lucide-react";
import { Button } from "../../ui/Button";
import { ABHAHealthIDCard } from "../../healthcare/ABHAHealthIDCard";
import { SignatureCapture } from "../../healthcare/SignatureCapture";
import { EligibilityChecker } from "../../healthcare/EligibilityChecker";

export function PatientRegistrationWizard({ className }: { className?: string }) {
  const [step, setStep] = useState(1);

  return (
    <div className={clsx("max-w-4xl mx-auto space-y-6 font-sans text-urvos-text", className)}>
      <div className="border-b border-urvos-border pb-4">
        <h1 className="text-xl font-bold text-urvos-text">New Patient Registration & ABDM Verification</h1>
        <p className="text-xs text-urvos-text-subtle">
          Step-by-step registration workflow: Demographics → ABHA Link → Insurance Eligibility → Consent Signature
        </p>
      </div>

      {/* STEPPER BAR */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { num: 1, title: "1. ABHA Health ID" },
          { num: 2, title: "2. Demographics" },
          { num: 3, title: "3. Insurance Pre-Check" },
          { num: 4, title: "4. Consent & Signature" },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            className={clsx(
              "p-2.5 rounded-lg border font-bold cursor-pointer transition-colors",
              step === s.num
                ? "bg-urvos-primary text-white border-urvos-primary shadow-xs"
                : step > s.num
                ? "bg-urvos-surface text-emerald-600 border-emerald-500/30"
                : "bg-urvos-surface text-urvos-text-subtle border-urvos-border"
            )}
          >
            {s.title}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="p-6 bg-urvos-surface border border-urvos-border rounded-xl space-y-4">
        {step === 1 && (
          <ABHAHealthIDCard
            abhaNumber="91-8829-1029-4410"
            abhaAddress="rajesh.kumar@abdm"
            name="Rajesh Kumar"
            gender="Male"
            dateOfBirth="15/08/1981"
            mobile="+91 98765 43210"
            state="Maharashtra"
            district="Mumbai"
            isVerified={true}
          />
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-urvos-text">Personal & Emergency Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" defaultValue="Rajesh Kumar" placeholder="Full Name" className="p-2 border border-urvos-border rounded bg-urvos-background" />
              <input type="text" defaultValue="+91 98765 43210" placeholder="Mobile" className="p-2 border border-urvos-border rounded bg-urvos-background" />
              <input type="text" defaultValue="15/08/1981" placeholder="DOB" className="p-2 border border-urvos-border rounded bg-urvos-background" />
              <input type="text" defaultValue="Spouse: Sunita Kumar (+91 98111 22233)" placeholder="Emergency Contact" className="p-2 border border-urvos-border rounded bg-urvos-background" />
            </div>
          </div>
        )}

        {step === 3 && (
          <EligibilityChecker
            initialData={{
              policyNumber: "POL-CGHS-882190",
              payerName: "Star Health Insurance",
              subscriberName: "Rajesh Kumar",
              status: "ACTIVE",
              copayAmount: "₹500",
              deductibleRemaining: "₹2,500",
              annualMaxLimit: "₹5,000,000",
              coverageEndDate: "2027-12-31",
              requiresPreAuth: true,
            }}
          />
        )}

        {step === 4 && (
          <SignatureCapture
            signatoryName="Rajesh Kumar"
            signatoryRole="Patient / Consent Grantor"
          />
        )}

        <div className="flex justify-between pt-4 border-t border-urvos-border">
          <Button size="sm" variant="secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>
            Back
          </Button>
          <Button size="sm" onClick={() => setStep(Math.min(4, step + 1))}>
            {step === 4 ? "Complete Registration" : "Next Step"}
          </Button>
        </div>
      </div>
    </div>
  );
}
