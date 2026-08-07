"use client";

import React from "react";
import { clsx } from "clsx";
import { QrCode, CheckCircle2, Shield, User, Calendar, MapPin } from "lucide-react";

export interface ABHAHealthIDCardProps {
  abhaNumber: string;
  abhaAddress: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  mobile: string;
  state: string;
  district: string;
  isVerified?: boolean;
  className?: string;
}

export function ABHAHealthIDCard({
  abhaNumber,
  abhaAddress,
  name,
  gender,
  dateOfBirth,
  mobile,
  state,
  district,
  isVerified = true,
  className,
}: ABHAHealthIDCardProps) {
  return (
    <div
      className={clsx(
        "w-full max-w-md bg-urvos-primary text-urvos-surface rounded-2xl p-5 shadow-xl border border-urvos-border/20 relative overflow-hidden space-y-4",
        className
      )}
    >
      {/* WATERMARK SHIELD */}
      <Shield className="w-48 h-48 absolute -right-10 -bottom-10 opacity-10 pointer-events-none" />

      {/* CARD HEADER */}
      <div className="flex items-center justify-between border-b border-urvos-surface/20 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-urvos-surface/20 flex items-center justify-center font-bold text-xs">
            🇮🇳
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-urvos-surface/90">Ayushman Bharat Digital Mission</h4>
            <div className="text-[10px] text-urvos-surface/70">National Health Authority • Govt. of India</div>
          </div>
        </div>

        {isVerified && (
          <span className="flex items-center space-x-1 px-2 py-0.5 bg-urvos-success-bg border border-urvos-success/40 rounded-full text-[10px] font-semibold text-urvos-success">
            <CheckCircle2 className="w-3 h-3 text-urvos-success" />
            <span>ABHA Verified</span>
          </span>
        )}
      </div>

      {/* CARD BODY */}
      <div className="flex items-center justify-between gap-4">
        {/* DEMOGRAPHICS */}
        <div className="space-y-2 min-w-0">
          <div>
            <div className="text-[10px] uppercase text-urvos-surface/70 tracking-wider">Patient Name</div>
            <div className="font-bold text-lg truncate">{name}</div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div>
              <span className="text-urvos-surface/70">ABHA Address:</span>
              <div className="font-mono font-semibold text-urvos-surface/90 truncate">{abhaAddress}</div>
            </div>
            <div>
              <span className="text-urvos-surface/70">ABHA Number:</span>
              <div className="font-mono font-semibold text-urvos-surface/90 truncate">{abhaNumber}</div>
            </div>
            <div>
              <span className="text-urvos-surface/70">DOB / Gender:</span>
              <div className="font-medium text-urvos-surface">{dateOfBirth} ({gender[0]})</div>
            </div>
            <div>
              <span className="text-urvos-surface/70">Location:</span>
              <div className="font-medium text-urvos-surface truncate">{district}, {state}</div>
            </div>
          </div>
        </div>

        {/* QR CODE MOCK */}
        <div className="w-20 h-20 bg-urvos-surface p-1.5 rounded-xl flex flex-col items-center justify-center shadow-inner text-urvos-ink shrink-0">
          <QrCode className="w-14 h-14 text-urvos-text" />
          <span className="text-[8px] font-mono text-urvos-text-subtle uppercase font-bold">ABDM Scan</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t border-urvos-surface/10 text-[10px] text-urvos-surface/60 flex items-center justify-between font-mono">
        <span>Linked Mobile: +91 {mobile}</span>
        <span>NHA Ref: {abhaNumber.replace(/-/g, "").slice(0, 8)}</span>
      </div>
    </div>
  );
}
