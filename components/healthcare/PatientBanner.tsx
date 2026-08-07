import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Patient, AllergyIntolerance } from "@medplum/fhirtypes";
import { User, AlertTriangle } from "lucide-react";

const patientBannerVariants = cva(
  "flex items-center justify-between p-4 bg-urvos-surface border border-urvos-border rounded-urvos-md shadow-urvos-soft w-full",
  {
    variants: {
      status: {
        default: "",
        critical: "border-urvos-danger bg-urvos-danger-bg",
        warning: "border-urvos-warning bg-urvos-warning-bg",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export interface PatientBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof patientBannerVariants> {
  patient: Patient;
  allergies?: AllergyIntolerance[];
}

export const PatientBanner = React.forwardRef<HTMLDivElement, PatientBannerProps>(
  ({ className, status, patient, allergies = [], ...props }, ref) => {
    
    // Extract basic demographics
    const name = patient.name?.[0];
    const givenName = name?.given?.join(" ");
    const familyName = name?.family;
    const fullName = [givenName, familyName].filter(Boolean).join(" ") || "Unknown Patient";
    
    const dob = patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : "Unknown DOB";
    const gender = patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : "Unknown";
    
    // Determine age
    let age = "Unknown Age";
    if (patient.birthDate) {
      const birth = new Date(patient.birthDate);
      const today = new Date();
      let ageNum = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        ageNum--;
      }
      age = `${ageNum}y`;
    }

    // Determine status based on allergies or clinical significance
    let bannerStatus = status || "default";
    const criticalAllergies = allergies.filter(a => a.criticality === "high");
    if (criticalAllergies.length > 0) {
      bannerStatus = "critical";
    }

    return (
      <div
        ref={ref}
        className={clsx(patientBannerVariants({ status: bannerStatus }), className)}
        {...props}
      >
        <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-urvos-surface-alt mr-4">
          <User className="w-8 h-8 text-urvos-text-subtle" />
        </div>
        
        <div className="grow flex flex-col justify-center">
          <div className="text-lg font-semibold text-urvos-ink">
            {fullName}
          </div>
          <div className="flex items-center text-sm text-urvos-ink-light gap-2 mt-1">
            <span>DOB: {dob} ({age})</span>
            <span className="text-urvos-border">•</span>
            <span>{gender}</span>
            <span className="text-urvos-border">•</span>
            <span>MRN: {patient.identifier?.[0]?.value || "N/A"}</span>
          </div>
        </div>

        {allergies.length > 0 && (
          <div className="flex items-center gap-2 bg-urvos-surface px-3 py-1.5 rounded-urvos-sm border border-urvos-border shadow-urvos-soft ml-4">
            <AlertTriangle className={clsx("w-5 h-5", criticalAllergies.length > 0 ? "text-urvos-danger" : "text-urvos-warning")} />
            <span className="text-sm font-medium text-urvos-ink">
              {allergies.length} {allergies.length === 1 ? "Allergy" : "Allergies"}
              {criticalAllergies.length > 0 && ` (${criticalAllergies.length} Critical)`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

PatientBanner.displayName = "PatientBanner";
