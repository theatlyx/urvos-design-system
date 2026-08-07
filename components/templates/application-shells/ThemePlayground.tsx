"use client";

import React, { useState } from "react";
import { ThemeProvider, useTheme } from "../../utilities/ThemeProvider";
import { ThemeSelector } from "../../organisms/ThemeSelector";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card";
import { PatientTimelineView } from "../../healthcare/PatientTimelineView";
import { ClinicalDataChart } from "../../healthcare/ClinicalDataChart";
import { GlobalSearchBox } from "../../organisms/GlobalSearchBox";

function ThemePlaygroundContent() {
  const { colorMode } = useTheme();

  return (
    <div className="min-h-screen bg-urvos-surface-alt transition-colors duration-300 font-sans">
      {/* Header / Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-urvos-surface border-b border-urvos-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-urvos-primary flex items-center justify-center text-white font-bold">
            U
          </div>
          <h1 className="text-lg font-semibold text-urvos-ink">Urvos Design System</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <GlobalSearchBox placeholder="Search components, tokens, or guidelines..." className="w-64" />
          <ThemeSelector />
        </div>
      </header>

      {/* Main Content: Kitchen Sink */}
      <main className="p-8 max-w-7xl mx-auto space-y-12">
        
        {/* Section 1: Typography & Colors */}
        <section className="space-y-6">
          <div className="border-b border-urvos-border pb-2">
            <h2 className="text-2xl font-bold text-urvos-ink">Typography & Colors</h2>
            <p className="text-urvos-text-subtle">Core design tokens responding to current theme.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-urvos-ink">Heading 1</h1>
                  <p className="text-sm text-urvos-text-subtle mt-1">Inter / Bold / 36px</p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-urvos-ink">Heading 2</h2>
                  <p className="text-sm text-urvos-text-subtle mt-1">Inter / Semibold / 24px</p>
                </div>
                <div>
                  <p className="text-base text-urvos-ink">Body Text. The quick brown fox jumps over the lazy dog. Healthcare requires precision and clarity.</p>
                  <p className="text-sm text-urvos-text-subtle mt-1">Inter / Regular / 16px</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-primary shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-secondary shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Secondary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-success shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Success</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-warning shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Warning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-error shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Error</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-urvos-surface border border-urvos-border shadow-sm"></div>
                    <span className="text-sm font-medium text-urvos-ink">Surface</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: UI Primitives */}
        <section className="space-y-6">
          <div className="border-b border-urvos-border pb-2">
            <h2 className="text-2xl font-bold text-urvos-ink">UI Primitives</h2>
            <p className="text-urvos-text-subtle">Buttons, badges, and interactive elements.</p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-urvos-ink uppercase tracking-wider">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button intent="danger">Danger</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-urvos-ink uppercase tracking-wider">Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="info">New Feature</Badge>
                  <Badge variant="neutral">Draft</Badge>
                  <Badge variant="success">Completed</Badge>
                  <Badge variant="caution">Pending Review</Badge>
                  <Badge variant="critical">Critical Alert</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Clinical Components */}
        <section className="space-y-6">
          <div className="border-b border-urvos-border pb-2">
            <h2 className="text-2xl font-bold text-urvos-ink">Clinical Components</h2>
            <p className="text-urvos-text-subtle">Complex healthcare-specific widgets and visualizations.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-urvos-ink">Patient Timeline</h3>
              <PatientTimelineView 
                events={[
                  {
                    id: "1",
                    date: "2023-10-24T09:00:00Z",
                    type: "visit",
                    title: "Outpatient Visit",
                    description: "Follow-up for hypertension. BP reading 135/85.",
                    provider: "Dr. Sarah Jenkins"
                  },
                  {
                    id: "2",
                    date: "2023-10-15T14:30:00Z",
                    type: "lab",
                    title: "Lipid Panel",
                    description: "LDL 110 mg/dL, HDL 45 mg/dL. Slight improvement.",
                    provider: "Dr. Sarah Jenkins",
                    status: "completed"
                  },
                  {
                    id: "3",
                    date: "2023-09-01T10:15:00Z",
                    type: "prescription",
                    title: "Lisinopril 10mg",
                    description: "Prescription updated. Take 1 tablet daily.",
                    provider: "Dr. Sarah Jenkins",
                    status: "pending"
                  }
                ]}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-urvos-ink">Clinical Data Chart</h3>
              <ClinicalDataChart 
                title="Blood Pressure Trends"
                unit="mmHg"
                data={[
                  { date: "Oct 1", value: 145 },
                  { date: "Oct 8", value: 142 },
                  { date: "Oct 15", value: 138 },
                  { date: "Oct 22", value: 135 },
                  { date: "Oct 29", value: 130 },
                ]}
                normalRange={[90, 120]}
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export function ThemePlayground() {
  return (
    <ThemeProvider>
      <ThemePlaygroundContent />
    </ThemeProvider>
  );
}
