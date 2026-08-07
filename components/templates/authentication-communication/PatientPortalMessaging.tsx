"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { MessageSquare, Paperclip, Send, AlertTriangle, ShieldCheck, Plus, X } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { Avatar } from "../../ui/Feedback";

export interface PatientPortalMessagingProps {
  className?: string;
  patientName?: string;
}

export function PatientPortalMessaging({ className, patientName = "John Doe" }: PatientPortalMessagingProps) {
  const [message, setMessage] = useState("");
  
  return (
    <div className={clsx("max-w-4xl mx-auto flex flex-col h-[700px] bg-urvos-background font-sans text-urvos-text border border-urvos-border rounded-xl overflow-hidden shadow-sm", className)}>
      
      {/* Header */}
      <header className="h-16 flex-shrink-0 border-b border-urvos-border bg-urvos-surface flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary font-bold">
            DR
          </div>
          <div>
            <h1 className="text-sm font-semibold">Dr. Rajesh Kumar</h1>
            <p className="text-xs text-urvos-text-subtle">Cardiology Department</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-urvos-success bg-urvos-success-bg px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure Connection
        </div>
      </header>

      {/* Emergency Disclaimer */}
      <div className="bg-urvos-danger-bg border-b border-urvos-danger p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-urvos-danger mt-0.5 flex-shrink-0" />
        <p className="text-xs text-urvos-danger">
          <strong>This messaging system is not for medical emergencies.</strong> If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately. Messages are typically answered within 2 business days.
        </p>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Timestamp */}
        <div className="flex justify-center">
          <span className="text-[10px] font-medium text-urvos-text-subtle uppercase tracking-wider bg-urvos-surface-hover px-2 py-1 rounded-md">
            Tuesday, Oct 24
          </span>
        </div>

        {/* Patient Message */}
        <div className="flex gap-3 justify-end">
          <div className="max-w-[75%]">
            <div className="bg-urvos-primary text-white p-3 rounded-2xl rounded-tr-sm shadow-sm">
              <p className="text-sm">Hi Dr. Kumar, I've been checking my blood pressure daily like you asked. It's been hovering around 135/85. Is this okay or should I adjust my medication?</p>
            </div>
            <p className="text-xs text-right text-urvos-text-subtle mt-1">10:14 AM</p>
          </div>
        </div>

        {/* Provider Message */}
        <div className="flex gap-3">
          <div className="mt-auto">
            <Avatar name="Dr. Rajesh Kumar" size="sm" />
          </div>
          <div className="max-w-[75%]">
            <div className="bg-urvos-surface border border-urvos-border p-3 rounded-2xl rounded-tl-sm shadow-sm">
              <p className="text-sm">Hello John. 135/85 is slightly elevated but acceptable for now as your body adjusts to the new dosage. Let's not change the medication yet.</p>
              <p className="text-sm mt-2">Please continue to monitor it daily and we will review the full log at your next appointment in two weeks.</p>
            </div>
            <p className="text-xs text-urvos-text-subtle mt-1">11:30 AM</p>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="p-4 bg-urvos-surface border-t border-urvos-border">
        <div className="flex flex-col gap-3 bg-urvos-background border border-urvos-border rounded-xl p-3 focus-within:ring-2 focus-within:ring-urvos-primary/30 transition-shadow">
          <textarea 
            className="w-full bg-transparent border-none focus:outline-none resize-none text-sm min-h-[80px]"
            placeholder="Type your message to Dr. Kumar..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <button className="p-2 text-urvos-text-subtle hover:text-urvos-text hover:bg-urvos-surface-hover rounded-full transition-colors" title="Attach file">
                <Paperclip className="w-4 h-4" />
              </button>
              <span className="text-xs text-urvos-text-subtle">Supported: PDF, JPG, PNG (Max 5MB)</span>
            </div>
            <Button size="sm" disabled={!message.trim()} className="gap-2">
              Send <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
