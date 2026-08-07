import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Observation, ServiceRequest } from "@medplum/fhirtypes";
import { Button } from "../ui/Button";
import { Plus, Trash2, FlaskConical } from "lucide-react";

const labResultsListVariants = cva("lab-results-list", {
  variants: {
    variant: {
      default: "lab-results-list--default",
      compact: "lab-results-list--compact",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LabResultsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof labResultsListVariants> {
  labs: (Observation | ServiceRequest)[];
  onAddLab?: () => void;
  onRemoveLab?: (id: string) => void;
}

export const LabResultsList = React.forwardRef<HTMLDivElement, LabResultsListProps>(
  ({ className, variant, labs, onAddLab, onRemoveLab, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={clsx(labResultsListVariants({ variant }), className)}
        {...props}
      >
        <div className="lab-results-list__header flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-urvos-primary" />
            Labs
          </h3>
          <Button variant="secondary" size="sm" onClick={onAddLab} className="gap-2">
            <Plus className="w-4 h-4" />
            Order Lab
          </Button>
        </div>

        {labs.length === 0 ? (
          <div className="lab-results-list__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border">
            No lab results documented.
          </div>
        ) : (
          <ul className="lab-results-list__list space-y-2">
            {labs.map((lab, idx) => {
              const codeDisplay = lab.code?.text || lab.code?.coding?.[0]?.display || "Unknown Lab Test";
              const status = lab.status;
              const date = (lab as Observation).effectiveDateTime || (lab as ServiceRequest).authoredOn;

              return (
                <li key={lab.id || idx} className="lab-results-list__item flex justify-between items-center p-3 rounded-lg border border-urvos-border hover:bg-urvos-surface-muted transition-colors">
                  <div className="lab-results-list__item-content">
                    <div className="font-medium text-urvos-text">
                      {codeDisplay}
                    </div>
                    <div className="text-sm text-urvos-text-subtle flex gap-2">
                      {status && (
                        <span className="capitalize font-semibold text-urvos-primary">
                          {status}
                        </span>
                      )}
                      {date && (
                        <span>
                          • {new Date(date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {onRemoveLab && lab.id && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemoveLab(lab.id!)}
                      aria-label="Remove lab"
                      className="text-urvos-text-subtle hover:text-urvos-danger"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

LabResultsList.displayName = "LabResultsList";
