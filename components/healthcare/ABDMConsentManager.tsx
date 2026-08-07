"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ShieldCheck, ShieldAlert, ShieldX, Clock, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export interface CareContext {
  id: string;
  patientReference: string;
  careContextReference: string;
  display: string;
}

export interface ConsentRequest {
  id: string;
  purpose: string;
  status: "REQUESTED" | "GRANTED" | "DENIED" | "EXPIRED" | "REVOKED";
  patientAbhaId: string;
  createdAt: string;
  expiresAt: string;
  careContexts: CareContext[];
  hiTypes: string[];
}

export interface ABDMConsentManagerProps {
  consents: ConsentRequest[];
  onRequestConsent?: (abhaId: string, purpose: string, hiTypes: string[]) => void;
  onRevokeConsent?: (consentId: string) => void;
  className?: string;
}

export function ABDMConsentManager({
  consents,
  onRequestConsent,
  onRevokeConsent,
  className,
}: ABDMConsentManagerProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "pending">("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [abhaId, setAbhaId] = useState("");
  const [purpose, setPurpose] = useState("Care Management");

  const getStatusBadge = (status: ConsentRequest["status"]) => {
    switch (status) {
      case "GRANTED":
        return <Badge variant="success" icon={<ShieldCheck className="w-3 h-3" />}>Granted</Badge>;
      case "REQUESTED":
        return <Badge variant="caution" icon={<Clock className="w-3 h-3" />}>Pending</Badge>;
      case "DENIED":
        return <Badge variant="critical" icon={<ShieldX className="w-3 h-3" />}>Denied</Badge>;
      case "EXPIRED":
        return <Badge variant="neutral" icon={<AlertCircle className="w-3 h-3" />}>Expired</Badge>;
      case "REVOKED":
        return <Badge variant="critical" icon={<ShieldAlert className="w-3 h-3" />}>Revoked</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const filteredConsents = consents.filter((c) => {
    if (activeTab === "active") return c.status === "GRANTED";
    if (activeTab === "pending") return c.status === "REQUESTED";
    return true;
  });

  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-5", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-urvos-primary" />
            <h3 className="text-base font-semibold text-urvos-text">ABDM Health Data Consent Manager</h3>
          </div>
          <p className="text-xs text-urvos-text-subtle mt-0.5">
            Manage National Health Stack (ABDM) patient artifact consent requests and care context links.
          </p>
        </div>

        <Button size="sm" onClick={() => setShowNewModal(true)}>
          + Request New Consent
        </Button>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center space-x-2 border-b border-urvos-border pb-2">
        {(["all", "active", "pending"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-3 py-1.2 text-xs font-semibold rounded-md capitalize transition-colors",
              activeTab === tab
                ? "bg-urvos-primary/10 text-urvos-primary"
                : "text-urvos-text-subtle hover:text-urvos-text"
            )}
          >
            {tab} Consents ({tab === "all" ? consents.length : consents.filter((c) => (tab === "active" ? c.status === "GRANTED" : c.status === "REQUESTED")).length})
          </button>
        ))}
      </div>

      {/* CONSENT LIST */}
      <div className="space-y-3">
        {filteredConsents.length === 0 ? (
          <div className="text-center py-8 text-xs text-urvos-text-subtle">
            No consent records found for this filter.
          </div>
        ) : (
          filteredConsents.map((consent) => (
            <div
              key={consent.id}
              className="p-4 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-border-strong transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-urvos-text">{consent.patientAbhaId}</span>
                    {getStatusBadge(consent.status)}
                  </div>
                  <div className="text-xs text-urvos-text-subtle flex items-center space-x-2">
                    <span>Purpose: <strong>{consent.purpose}</strong></span>
                    <span>•</span>
                    <span>Created: {consent.createdAt}</span>
                    <span>•</span>
                    <span>Expires: {consent.expiresAt}</span>
                  </div>
                </div>

                {consent.status === "GRANTED" && onRevokeConsent && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs text-urvos-destructive border-urvos-destructive/30 hover:bg-urvos-destructive/10"
                    onClick={() => onRevokeConsent(consent.id)}
                  >
                    Revoke Consent
                  </Button>
                )}
              </div>

              {/* CARE CONTEXTS & HI TYPES */}
              <div className="pt-2 border-t border-urvos-border/60 text-xs flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-1 flex-wrap gap-1">
                  <span className="text-urvos-text-subtle font-medium">HI Types:</span>
                  {consent.hiTypes.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 bg-urvos-surface border border-urvos-border rounded text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-urvos-text-subtle">
                  Care Contexts: <span className="font-semibold text-urvos-text">{consent.careContexts.length} linked</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* NEW CONSENT MODAL DEMO */}
      {showNewModal && (
        <div className="p-4 border border-urvos-primary/30 bg-urvos-primary/5 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-urvos-primary">Request ABDM Artifact Consent</h4>
            <button onClick={() => setShowNewModal(false)} className="text-xs text-urvos-text-subtle">Close</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Patient ABHA ID (e.g. 91-1234-5678-9012)"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              className="px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-surface"
            />
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-surface"
            >
              <option value="Care Management">Care Management</option>
              <option value="Diagnostic Result Review">Diagnostic Result Review</option>
              <option value="Emergency Consultation">Emergency Consultation</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              size="sm"
              onClick={() => {
                onRequestConsent?.(abhaId, purpose, ["OPConsultation", "Prescription", "DiagnosticReport"]);
                setShowNewModal(false);
              }}
            >
              Send OTP Consent Request
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
