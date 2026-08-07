import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { MedicationRequest } from "@medplum/fhirtypes";
import { Pill, AlertCircle } from "lucide-react";

const medicationListVariants = cva("medication-list", {
  variants: {
    variant: {
      default: "medication-list--default",
      compact: "medication-list--compact",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface MedicationListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof medicationListVariants> {
  medications: MedicationRequest[];
  onAddMedication?: () => void;
  onRemoveMedication?: (id: string) => void;
}

export const MedicationList = React.forwardRef<HTMLDivElement, MedicationListProps>(
  ({ className, variant, medications, onAddMedication, onRemoveMedication, ...props }, ref) => {
    
    return (
      <div
        ref={ref}
        className={clsx(medicationListVariants({ variant }), className)}
        {...props}
      >
        <div className="medication-list__header">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Pill className="w-5 h-5 text-urvos-primary" />
            Medications
          </h3>
          {onAddMedication && (
            <button
              type="button"
              onClick={onAddMedication}
              className="ml-auto text-sm font-medium text-urvos-primary hover:underline"
            >
              Add
            </button>
          )}
        </div>

        {medications.length === 0 ? (
          <div className="medication-list__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border flex flex-col items-center gap-2">
            <AlertCircle className="w-6 h-6 text-urvos-text-muted" />
            <p>No active medications found.</p>
          </div>
        ) : (
          <ul className="medication-list__items">
            {medications.map((med, idx) => (
              <li key={med.id || idx} className="medication-list__item">
                <div className="medication-list__item-icon">
                  <Pill className="w-5 h-5 text-urvos-text-subtle" />
                </div>
                <div className="medication-list__item-content">
                  <div className="font-medium text-urvos-text">
                    {med.medicationCodeableConcept?.text || 
                     med.medicationCodeableConcept?.coding?.[0]?.display || 
                     "Unknown Medication"}
                  </div>
                  <div className="text-sm text-urvos-text-subtle">
                    {med.dosageInstruction?.[0]?.text || "No dosage instruction provided"}
                  </div>
                  {med.status && (
                    <div className="mt-1 text-xs px-2 py-0.5 rounded-full bg-urvos-surface-muted border border-urvos-border w-fit capitalize">
                      {med.status}
                    </div>
                  )}
                  {onRemoveMedication && (
                    <button
                      type="button"
                      onClick={() => onRemoveMedication(med.id || "")}
                      className="mt-1 text-xs font-medium text-urvos-text-danger hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

MedicationList.displayName = "MedicationList";
