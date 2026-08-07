import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Bot, FileText, Pill, ListChecks, ClipboardList, PenTool } from "lucide-react";

const clinicalCopilotVariants = cva("clinical-copilot", {
  variants: {
    variant: {
      default: "clinical-copilot--default bg-urvos-surface border border-urvos-border rounded-xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ClinicalCopilotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof clinicalCopilotVariants> {
  onAction?: (actionId: string, label: string) => void;
}

const COPILOT_ACTIONS = [
  { id: "summarize_chart", label: "Summarize chart", icon: FileText },
  { id: "explain_medications", label: "Explain medications", icon: Pill },
  { id: "find_screenings", label: "Find missing screenings", icon: ListChecks },
  { id: "suggest_care_plan", label: "Suggest care plan", icon: ClipboardList },
  { id: "generate_soap", label: "Generate SOAP note", icon: PenTool },
];

export const ClinicalCopilot = React.forwardRef<HTMLDivElement, ClinicalCopilotProps>(
  ({ className, variant, onAction, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={clsx(clinicalCopilotVariants({ variant }), className)}
        {...props}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-urvos-text" />
            <h3 className="text-base font-semibold text-urvos-text">Clinical Copilot</h3>
          </div>
          <div className="space-y-2">
            {COPILOT_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button 
                  key={action.id}
                  onClick={() => onAction?.(action.id, action.label)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-urvos-surface-muted border border-transparent hover:border-urvos-border transition-all text-left group"
                >
                  <Icon className="w-5 h-5 text-urvos-text-subtle group-hover:text-urvos-text transition-colors" />
                  <span className="text-sm font-medium text-urvos-text-subtle group-hover:text-urvos-text transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

ClinicalCopilot.displayName = "ClinicalCopilot";
