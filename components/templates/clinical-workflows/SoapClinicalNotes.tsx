"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FileText, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { Button } from "../../ui/Button";
import { SmartPhrasePanel } from "../../healthcare/SmartPhrasePanel";
import { Combobox } from "../../patterns/Combobox";

export function SoapClinicalNotes({ className }: { className?: string }) {
  const [subjective, setSubjective] = useState("Patient reports 3-day history of exertional dyspnea and tightness.");
  const [objective, setObjective] = useState("Vitals: BP 138/88, HR 82. Lungs clear to auscultation bilaterally.");
  const [assessment, setAssessment] = useState("Essential Hypertension, uncontrolled. Rule out Angina.");
  const [plan, setPlan] = useState("Start Telmisartan 40mg PO. Order 12-lead ECG and Troponin I lab.");

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">SOAP Clinical Note Editor</h1>
          <p className="text-xs text-urvos-text-subtle">
            Structured encounter documentation • Patient: Rajesh Kumar (MRN-8819)
          </p>
        </div>

        <Button size="sm">
          <Lock className="w-3.5 h-3.5 mr-1" /> Sign & Lock Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOAP FIELDS */}
        <div className="lg:col-span-2 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-urvos-primary">S - Subjective</label>
            <textarea
              rows={3}
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              className="w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-urvos-primary">O - Objective</label>
            <textarea
              rows={3}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-urvos-primary">A - Assessment (ICD-10 Search)</label>
            <Combobox
              placeholder="Search ICD-10 Diagnosis..."
              value={assessment}
              onChange={(val) => setAssessment(val)}
              options={[
                { value: "I10", label: "I10 - Essential Hypertension" },
                { value: "E11.9", label: "E11.9 - Type 2 Diabetes Mellitus" },
              ]}
            />
            <textarea
              rows={2}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface mt-2 focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-urvos-primary">P - Plan & eRx</label>
            <textarea
              rows={3}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>
        </div>

        {/* DOT PHRASES DRAWER */}
        <div>
          <SmartPhrasePanel
            phrases={[
              { shortcut: ".ros", title: "Review of Systems - Cardiac", category: "General", content: "Denied syncope, palpitations, orthopnea, or lower extremity edema." },
              { shortcut: ".normexam", title: "Normal Physical Exam", category: "Physical Exam", content: "Alert, oriented x 3. S1, S2 present, no murmurs. Lungs clear." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
