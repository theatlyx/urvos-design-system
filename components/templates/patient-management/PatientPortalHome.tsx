"use client";

import React from "react";
import { clsx } from "clsx";
import { Calendar, Download, CreditCard, MessageSquare, Video } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";

export function PatientPortalHome({ className }: { className?: string }) {
  return (
    <div className={clsx("max-w-4xl mx-auto space-y-6 font-sans text-urvos-text", className)}>
      <div className="p-6 bg-urvos-primary text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <h1 className="text-xl font-extrabold">Welcome back, Ananya!</h1>
          <p className="text-xs text-white/80 mt-1">Your next appointment is today at 04:30 PM with Dr. Anita Sharma.</p>
        </div>
        <Button size="sm" variant="secondary" className="bg-white text-urvos-primary border-none font-bold">
          <Video className="w-4 h-4 mr-1.5" /> Join Tele-Consult
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text flex items-center"><Calendar className="w-4 h-4 mr-2 text-urvos-primary" /> Appointments</h3>
          <p className="text-xs text-urvos-text-subtle">1 Upcoming • 4 Past Visits</p>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text flex items-center"><Download className="w-4 h-4 mr-2 text-emerald-500" /> Lab Reports</h3>
          <p className="text-xs text-urvos-text-subtle">Blood Test Report Available</p>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text flex items-center"><CreditCard className="w-4 h-4 mr-2 text-amber-500" /> Bills & Payments</h3>
          <p className="text-xs text-urvos-text-subtle">₹0 Balance Due</p>
        </div>
      </div>
    </div>
  );
}
