"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Button } from "../ui/Button";
import { StepIndicator } from "../navigation/StepIndicator";

export interface WizardStep {
  title: string;
  component: React.ReactNode;
}

export interface WizardProps {
  steps: WizardStep[];
  onFinish?: () => void;
  className?: string;
}

export function Wizard({ steps, onFinish, className }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const total = steps.length;

  const next = () => {
    if (currentStep < total - 1) setCurrentStep((s) => s + 1);
    else onFinish?.();
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-6", className)}>
      <StepIndicator steps={steps.map((s) => s.title)} currentStep={currentStep} />

      <div className="py-4 border-y border-urvos-border">
        {steps[currentStep]?.component}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={prev} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button variant="primary" onClick={next}>
          {currentStep === total - 1 ? "Finish Workflow" : "Next Step"}
        </Button>
      </div>
    </div>
  );
}
