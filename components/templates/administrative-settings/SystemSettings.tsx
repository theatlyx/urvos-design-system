"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Settings, Hospital, Wifi, CreditCard, Bell, Shield, Users, ChevronRight, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";

const tabs = [
  { id: "general", label: "General", icon: Hospital },
  { id: "abdm", label: "ABDM Gateway", icon: Wifi },
  { id: "billing", label: "Billing & Payers", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Access", icon: Shield },
  { id: "team", label: "Team & Roles", icon: Users },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={clsx("w-10 h-5 rounded-full relative transition-colors shrink-0", enabled ? "bg-urvos-primary" : "bg-urvos-border")} aria-label="Toggle">
      <span className={clsx("absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-xs transition-transform", enabled && "translate-x-5")} />
    </button>
  );
}

export function SystemSettings({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("general");
  const [abdmEnabled, setAbdmEnabled] = useState(true);
  const [hipaaAudit, setHipaaAudit] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-urvos-primary" /> System Settings
          </h1>
          <p className="text-xs text-urvos-text-subtle">Facility configuration, integrations, and access management</p>
        </div>
        <Button size="sm"><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</Button>
      </div>

      <div className="flex gap-5">
        {/* SIDEBAR TABS */}
        <div className="w-48 shrink-0 space-y-0.5">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left", activeTab === tab.id ? "bg-urvos-primary/10 text-urvos-primary font-semibold" : "text-urvos-text-subtle hover:bg-urvos-background hover:text-urvos-text")}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
                {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* CONTENT PANEL */}
        <div className="flex-1 min-w-0 bg-urvos-surface border border-urvos-border rounded-xl p-5 space-y-5">

          {activeTab === "general" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold">Facility Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Facility Name", value: "Apollo Hospitals, Mumbai" },
                  { label: "HFR ID", value: "IN2610300009" },
                  { label: "NABH Accreditation No.", value: "NABH-H-2024-0018" },
                  { label: "Primary Contact", value: "+91 22 6671 0000" },
                  { label: "State / District", value: "Maharashtra / Mumbai" },
                  { label: "Time Zone", value: "Asia/Kolkata (IST, UTC+5:30)" },
                ].map(field => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-xs font-medium text-urvos-text-subtle">{field.label}</label>
                    <input type="text" defaultValue={field.value} className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "abdm" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold">ABDM / National Health Stack Integration</h2>
                <Badge variant={abdmEnabled ? "success" : "critical"}>{abdmEnabled ? "Connected" : "Disconnected"}</Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl border border-urvos-border bg-urvos-background space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">ABDM Gateway</p>
                      <p className="text-xs text-urvos-text-subtle">Enables ABHA verification, HIU/HIP consent, and health records exchange.</p>
                    </div>
                    <Toggle enabled={abdmEnabled} onToggle={() => setAbdmEnabled(!abdmEnabled)} />
                  </div>
                </div>
                {[
                  { label: "HIP ID", value: "APOLLO-MUM-HIP-001" },
                  { label: "HIU ID", value: "APOLLO-MUM-HIU-001" },
                  { label: "ABDM Client ID", value: "abdm_prod_cl_****88ef" },
                  { label: "Callback URL", value: "https://api.urvos.health/abdm/callback" },
                ].map(field => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-xs font-medium text-urvos-text-subtle">{field.label}</label>
                    <input type="text" defaultValue={field.value} className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold">Security & Access Controls</h2>
              <div className="space-y-3">
                {[
                  { label: "Two-Factor Authentication (2FA)", desc: "Require TOTP/OTP for all staff logins.", enabled: twoFactor, toggle: () => setTwoFactor(!twoFactor) },
                  { label: "HIPAA Audit Logging", desc: "Log all PHI access events and flag anomalies.", enabled: hipaaAudit, toggle: () => setHipaaAudit(!hipaaAudit) },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between p-3 rounded-xl border border-urvos-border bg-urvos-background">
                    <div>
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="text-xs text-urvos-text-subtle">{row.desc}</p>
                    </div>
                    <Toggle enabled={row.enabled} onToggle={row.toggle} />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-urvos-text-subtle">Session Timeout (minutes)</label>
                  <input type="number" defaultValue={30} className="w-32 px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold">Alert & Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: "Email Alerts", desc: "Critical lab results, missed appointments.", enabled: emailAlerts, toggle: () => setEmailAlerts(!emailAlerts) },
                  { label: "SMS / WhatsApp Alerts", desc: "Emergency codes, drug interactions.", enabled: smsAlerts, toggle: () => setSmsAlerts(!smsAlerts) },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between p-3 rounded-xl border border-urvos-border bg-urvos-background">
                    <div>
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="text-xs text-urvos-text-subtle">{row.desc}</p>
                    </div>
                    <Toggle enabled={row.enabled} onToggle={row.toggle} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "billing" || activeTab === "team") && (
            <div className="flex items-center justify-center h-40 text-urvos-text-subtle text-sm">
              <div className="text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="font-medium">Select a settings section from the left panel.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
