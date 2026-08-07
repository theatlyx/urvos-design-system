import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Observation } from "@medplum/fhirtypes";
import { Table } from "../patterns/Table";

const flowsheetVariants = cva("clinical-flowsheet", {
  variants: {
    density: {
      default: "clinical-flowsheet--default",
      compact: "clinical-flowsheet--compact",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export interface ClinicalFlowsheetProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flowsheetVariants> {
  observations: Observation[];
  timepoints: Date[];
  codes: { code: string; display: string }[];
}

export const ClinicalFlowsheet = React.forwardRef<HTMLDivElement, ClinicalFlowsheetProps>(
  ({ className, density, observations, timepoints, codes, ...props }, ref) => {
    
    // Sort timepoints ascending
    const sortedTimepoints = [...timepoints].sort((a, b) => a.getTime() - b.getTime());

    const getObservationValue = (code: string, timepoint: Date) => {
      // Find observation closest to timepoint (within 1 hour for simplicity)
      const obs = observations.find(o => {
        if (!o.effectiveDateTime) return false;
        const obsTime = new Date(o.effectiveDateTime).getTime();
        const tpTime = timepoint.getTime();
        // same time exactly or within range
        const isMatch = Math.abs(obsTime - tpTime) < 3600000; 
        const isCodeMatch = o.code?.coding?.some(c => c.code === code);
        return isMatch && isCodeMatch;
      });

      if (!obs) return "-";

      if (obs.valueQuantity) {
        return `${obs.valueQuantity.value} ${obs.valueQuantity.unit || ""}`;
      }
      if (obs.valueString) {
        return obs.valueString;
      }
      return "Recorded";
    };

    return (
      <div
        ref={ref}
        className={clsx(flowsheetVariants({ density }), className)}
        {...props}
      >
        <div className="overflow-x-auto">
          <table className="clinical-flowsheet__table">
            <thead>
              <tr>
                <th className="clinical-flowsheet__th clinical-flowsheet__th--sticky">Vitals / Measurements</th>
                {sortedTimepoints.map((tp, idx) => (
                  <th key={idx} className="clinical-flowsheet__th">
                    <div className="text-sm font-medium">{tp.toLocaleDateString()}</div>
                    <div className="text-xs text-urvos-text-subtle">{tp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {codes.map((codeDef) => (
                <tr key={codeDef.code} className="clinical-flowsheet__tr">
                  <td className="clinical-flowsheet__td clinical-flowsheet__td--sticky font-medium text-urvos-text">
                    {codeDef.display}
                  </td>
                  {sortedTimepoints.map((tp, idx) => {
                    const val = getObservationValue(codeDef.code, tp);
                    return (
                      <td key={idx} className="clinical-flowsheet__td text-center text-urvos-text-subtle">
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

ClinicalFlowsheet.displayName = "ClinicalFlowsheet";
