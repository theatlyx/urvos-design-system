"use client";

import React from "react";
import { clsx } from "clsx";
import { QrCode, ShieldCheck, HeartPulse } from "lucide-react";

export interface KioskCheckinShellProps {
  facilityName: string;
  children: React.ReactNode;
  className?: string;
}

export function KioskCheckinShell({
  facilityName = "Fortis Hospital & Research Center",
  children,
  className,
}: KioskCheckinShellProps) {
  return (
    <div className={clsx("min-h-screen bg-urvos-surface text-urvos-text flex flex-col justify-between font-sans p-8", className)}>
      <header className="flex items-center justify-between border-b border-urvos-border pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-urvos-primary text-white flex items-center justify-center font-extrabold text-xl shadow-md">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-urvos-text tracking-tight">{facilityName}</h1>
            <p className="text-xs text-urvos-text-subtle">Patient Self-Service Check-in Kiosk • ABHA & Insurance Enabled</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-urvos-text-subtle">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>ABDM Verified Terminal</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center my-8">{children}</main>

      <footer className="border-t border-urvos-border pt-4 text-center text-xs text-urvos-text-subtle">
        Touch anywhere on screen or scan your ABHA Health ID QR code to begin check-in.
      </footer>
    </div>
  );
}
