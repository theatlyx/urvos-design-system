"use client";

import React from "react";
import { clsx } from "clsx";
import { User, Calendar, Pill, FileText, Bell } from "lucide-react";
import { Button } from "../ui/Button";

export interface PatientPortalProps {
  patientName?: string;
  nextAppointment?: string;
  unreadMessages?: number;
  className?: string;
}

export function PatientPortal({
  patientName = "Eleanor Vance",
  nextAppointment = "Tomorrow at 10:30 AM",
  unreadMessages = 2,
  className,
}: PatientPortalProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-urvos-xl p-6 shadow-urvos-soft space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-urvos-glass text-urvos-primary flex items-center justify-center font-bold text-lg">
            {patientName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-urvos-text">Welcome back, {patientName}</h2>
            <p className="text-xs text-urvos-text-subtle">MyHealth Patient Portal</p>
          </div>
        </div>
        <div className="relative">
          <Button variant="secondary" size="sm" className="gap-2">
            <Bell className="h-4 w-4" /> Messages
          </Button>
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-urvos-danger text-urvos-surface text-[10px] font-bold flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-urvos-border rounded-urvos-lg bg-urvos-surface-alt space-y-2">
          <div className="flex items-center gap-2 text-urvos-primary text-xs font-bold uppercase">
            <Calendar className="h-4 w-4" /> Next Appointment
          </div>
          <p className="text-sm font-bold text-urvos-text">{nextAppointment}</p>
          <span className="text-xs text-urvos-text-subtle block">Dr. Sarah Jenkins (Cardiology)</span>
        </div>

        <div className="p-4 border border-urvos-border rounded-urvos-lg bg-urvos-surface-alt space-y-2">
          <div className="flex items-center gap-2 text-urvos-success text-xs font-bold uppercase">
            <Pill className="h-4 w-4" /> Active Rx Refills
          </div>
          <p className="text-sm font-bold text-urvos-text">Lisinopril 10mg</p>
          <span className="text-xs text-urvos-text-subtle block">Refill ready at CVS Main St</span>
        </div>

        <div className="p-4 border border-urvos-border rounded-urvos-lg bg-urvos-surface-alt space-y-2">
          <div className="flex items-center gap-2 text-urvos-warning text-xs font-bold uppercase">
            <FileText className="h-4 w-4" /> Recent Lab Result
          </div>
          <p className="text-sm font-bold text-urvos-text">Metabolic Panel (Normal)</p>
          <span className="text-xs text-urvos-text-subtle block">Released Oct 22, 2023</span>
        </div>
      </div>
    </div>
  );
}
