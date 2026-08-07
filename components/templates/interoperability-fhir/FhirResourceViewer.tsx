"use client";

import React from "react";
import { clsx } from "clsx";
import { Code, CheckCircle2, Copy } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function FhirResourceViewer({ className }: { className?: string }) {
  const sampleFhirJson = JSON.stringify(
    {
      resourceType: "Patient",
      id: "pat-99182",
      active: true,
      name: [{ family: "Kumar", given: ["Rajesh"] }],
      gender: "male",
      birthDate: "1981-08-15",
      identifier: [
        { system: "https://healthid.abdm.gov.in", value: "91-8829-1029-4410" },
      ],
    },
    null,
    2
  );

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">FHIR R4 Resource Explorer & JSON Inspector</h1>
          <p className="text-xs text-urvos-text-subtle">Structure definition viewer, schema validation, and HL7 FHIR payload inspector</p>
        </div>
        <Badge variant="success">FHIR R4 Validated</Badge>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-bold text-urvos-primary">Resource: Patient/pat-99182</span>
          <button className="flex items-center text-urvos-text-subtle hover:text-urvos-text"><Copy className="w-3.5 h-3.5 mr-1" /> Copy JSON</button>
        </div>
        <pre className="p-4 bg-urvos-background border border-urvos-border rounded-lg font-mono text-xs text-emerald-600 dark:text-emerald-400 overflow-x-auto">
          {sampleFhirJson}
        </pre>
      </div>
    </div>
  );
}
