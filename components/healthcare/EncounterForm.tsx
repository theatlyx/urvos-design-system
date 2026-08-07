import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Encounter, Condition, Patient } from "@medplum/fhirtypes";
import { Button } from "../ui/Button";
import { Field, Input } from "../ui/Form";
import { Textarea } from "../ui/Textarea";

const encounterFormVariants = cva("encounter-form", {
  variants: {
    layout: {
      default: "encounter-form--default",
      sidebar: "encounter-form--sidebar",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

export interface EncounterFormProps extends React.FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof encounterFormVariants> {
  patient?: Patient;
  encounter?: Encounter;
  conditions?: Condition[];
  onSubmitEncounter?: (data: any) => void;
}

export const EncounterForm = React.forwardRef<HTMLFormElement, EncounterFormProps>(
  ({ className, layout, patient, encounter, conditions, onSubmitEncounter, ...props }, ref) => {
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      onSubmitEncounter?.(data);
    };

    return (
      <form
        ref={ref}
        className={clsx(encounterFormVariants({ layout }), className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="encounter-form__section">
          <h3 className="encounter-form__heading">Subjective</h3>
          <div className="encounter-form__grid">
            <Field label="Chief Complaint">
              <Input name="chiefComplaint" placeholder="E.g., patient complains of headache for 3 days" />
            </Field>
            <Field label="History of Present Illness (HPI)">
              <Textarea name="hpi" rows={3} placeholder="Provide detailed history..." />
            </Field>
          </div>
        </div>

        <div className="encounter-form__section">
          <h3 className="encounter-form__heading">Objective</h3>
          <div className="encounter-form__grid">
            <Field label="Physical Exam">
              <Textarea name="physicalExam" rows={3} placeholder="Findings from physical exam..." />
            </Field>
          </div>
        </div>

        <div className="encounter-form__section">
          <h3 className="encounter-form__heading">Assessment & Plan</h3>
          <div className="encounter-form__grid">
            <Field label="Diagnoses">
              <Input name="diagnoses" placeholder="Enter primary diagnosis or ICD-10" />
            </Field>
            <Field label="Plan">
              <Textarea name="plan" rows={4} placeholder="Treatment plan, medications, follow-up..." />
            </Field>
          </div>
        </div>

        <div className="encounter-form__footer">
          <Button type="button" variant="secondary">Cancel</Button>
          <Button type="submit">Sign & Save Encounter</Button>
        </div>
      </form>
    );
  }
);

EncounterForm.displayName = "EncounterForm";
