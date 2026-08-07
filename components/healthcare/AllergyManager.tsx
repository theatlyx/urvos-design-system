import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { AllergyIntolerance } from "@medplum/fhirtypes";
import { Button } from "../ui/Button";
import { Plus, Trash2, AlertCircle } from "lucide-react";

const allergyManagerVariants = cva("allergy-manager", {
  variants: {
    variant: {
      default: "allergy-manager--default",
      compact: "allergy-manager--compact",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AllergyManagerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof allergyManagerVariants> {
  allergies: AllergyIntolerance[];
  onAddAllergy?: () => void;
  onRemoveAllergy?: (id: string) => void;
}

export const AllergyManager = React.forwardRef<HTMLDivElement, AllergyManagerProps>(
  ({ className, variant, allergies, onAddAllergy, onRemoveAllergy, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={clsx(allergyManagerVariants({ variant }), className)}
        {...props}
      >
        <div className="allergy-manager__header">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-urvos-warning" />
            Allergies & Intolerances
          </h3>
          <Button variant="secondary" size="sm" onClick={onAddAllergy} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {allergies.length === 0 ? (
          <div className="allergy-manager__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border">
            No known allergies recorded.
          </div>
        ) : (
          <ul className="allergy-manager__list">
            {allergies.map((allergy, idx) => (
              <li key={allergy.id || idx} className="allergy-manager__item">
                <div className="allergy-manager__item-content">
                  <div className="font-medium text-urvos-text">
                    {allergy.code?.text || allergy.code?.coding?.[0]?.display || "Unknown Substance"}
                  </div>
                  <div className="text-sm text-urvos-text-subtle flex gap-2">
                    {allergy.criticality && (
                      <span className={clsx("capitalize", allergy.criticality === "high" ? "text-urvos-danger font-semibold" : "")}>
                        {allergy.criticality} risk
                      </span>
                    )}
                    {allergy.reaction && (
                      <span>
                        • {allergy.reaction.map(r => r.manifestation?.[0]?.text).filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                </div>
                {onRemoveAllergy && allergy.id && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemoveAllergy(allergy.id!)}
                    aria-label="Remove allergy"
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

AllergyManager.displayName = "AllergyManager";
