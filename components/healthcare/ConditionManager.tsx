import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Condition } from "@medplum/fhirtypes";
import { Button } from "../ui/Button";
import { Plus, Trash2, Activity } from "lucide-react";

const conditionManagerVariants = cva("condition-manager", {
  variants: {
    variant: {
      default: "condition-manager--default",
      compact: "condition-manager--compact",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ConditionManagerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof conditionManagerVariants> {
  conditions: Condition[];
  onAddCondition?: () => void;
  onRemoveCondition?: (id: string) => void;
}

export const ConditionManager = React.forwardRef<HTMLDivElement, ConditionManagerProps>(
  ({ className, variant, conditions, onAddCondition, onRemoveCondition, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={clsx(conditionManagerVariants({ variant }), className)}
        {...props}
      >
        <div className="condition-manager__header flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-urvos-danger" />
            Problems
          </h3>
          <Button variant="secondary" size="sm" onClick={onAddCondition} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {conditions.length === 0 ? (
          <div className="condition-manager__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border">
            No medical problems recorded.
          </div>
        ) : (
          <ul className="condition-manager__list space-y-2">
            {conditions.map((condition, idx) => (
              <li key={condition.id || idx} className="condition-manager__item flex justify-between items-center p-3 rounded-lg border border-urvos-border hover:bg-urvos-surface-muted transition-colors">
                <div className="condition-manager__item-content">
                  <div className="font-medium text-urvos-text">
                    {condition.code?.text || condition.code?.coding?.[0]?.display || "Unknown Condition"}
                  </div>
                  <div className="text-sm text-urvos-text-subtle flex gap-2">
                    {condition.clinicalStatus?.coding?.[0]?.code && (
                      <span className="capitalize font-semibold text-urvos-primary">
                        {condition.clinicalStatus.coding[0].code}
                      </span>
                    )}
                    {condition.recordedDate && (
                      <span>
                        • Recorded {new Date(condition.recordedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                {onRemoveCondition && condition.id && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemoveCondition(condition.id!)}
                    aria-label="Remove condition"
                    className="text-urvos-text-subtle hover:text-urvos-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

ConditionManager.displayName = "ConditionManager";
