import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Check } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const stepperVariants = cva("stepper", {
  variants: {
    orientation: {
      horizontal: "stepper--horizontal",
      vertical: "stepper--vertical",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps & VariantProps<typeof stepperVariants>>(
  ({ className, steps, currentStep, orientation, onStepClick, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(stepperVariants({ orientation }), className)} {...props}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className={clsx("stepper__item", { "stepper__item--active": isActive, "stepper__item--completed": isCompleted })}>
              <div 
                className="stepper__indicator-wrapper" 
                onClick={() => onStepClick?.(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onStepClick?.(index); }}
              >
                <div className={clsx("stepper__indicator", { "stepper__indicator--active": isActive, "stepper__indicator--completed": isCompleted })}>
                  {isCompleted ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
                </div>
                {!isLast && <div className="stepper__separator" />}
              </div>
              <div className="stepper__content">
                <div className="stepper__title">{step.title}</div>
                {step.description && <div className="stepper__description">{step.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";
