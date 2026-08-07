"use client";

import React from "react";
import { clsx } from "clsx";
import { BellRing, UserCheck, ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export interface KioskCheckinAlertProps {
  patientName: string;
  checkinTime: string;
  tokenNumber: string;
  assignedRoom: string;
  providerName: string;
  onCallPatient?: () => void;
  className?: string;
}

export function KioskCheckinAlert({
  patientName,
  checkinTime,
  tokenNumber,
  assignedRoom,
  providerName,
  onCallPatient,
  className,
}: KioskCheckinAlertProps) {
  return (
    <div className={clsx("bg-urvos-success-bg border border-urvos-success/30 rounded-xl p-4 shadow-sm space-y-3 max-w-sm", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellRing className="w-4 h-4 text-urvos-success animate-bounce" />
          <span className="font-bold text-xs uppercase tracking-wider text-urvos-success">
            Kiosk Patient Arrival Notification
          </span>
        </div>
        <Badge variant="success">Token #{tokenNumber}</Badge>
      </div>

      <div className="space-y-1">
        <div className="text-base font-bold text-urvos-text">{patientName}</div>
        <div className="text-xs text-urvos-text-subtle flex items-center space-x-3">
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Arrived: {checkinTime}</span>
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {assignedRoom}</span>
        </div>
        <div className="text-xs text-urvos-text-subtle">Provider: <strong>{providerName}</strong></div>
      </div>

      {onCallPatient && (
        <Button size="sm" className="w-full bg-urvos-success hover:bg-urvos-success/90 text-urvos-text-inverse" onClick={onCallPatient}>
          Call Patient into {assignedRoom} <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      )}
    </div>
  );
}
