"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

export interface TelehealthViewerProps {
  patientName?: string;
  providerName?: string;
  duration?: string;
  className?: string;
}

export function TelehealthViewer({
  patientName = "Eleanor Vance",
  providerName = "Dr. Sarah Jenkins",
  duration = "08:42",
  className,
}: TelehealthViewerProps) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-2xl overflow-hidden shadow-xl text-urvos-text-inverse flex flex-col h-[400px]", className)}>
      <header className="p-4 bg-urvos-background/80 backdrop-blur-md flex items-center justify-between z-10">
        <div>
          <h4 className="text-sm font-bold">{patientName} — Virtual Consultation</h4>
          <span className="text-xs text-urvos-text-muted">Attending: {providerName}</span>
        </div>
        <span className="text-xs font-mono bg-urvos-error-bg text-urvos-error px-2 py-0.5 rounded border border-urvos-error/30">
          LIVE {duration}
        </span>
      </header>

      <main className="flex-1 relative bg-urvos-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-20 w-20 rounded-full bg-urvos-surface flex items-center justify-center text-3xl font-bold mx-auto text-urvos-text-muted">
            {patientName.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-urvos-text-subtle block">{patientName}</span>
        </div>

        <div className="absolute bottom-4 right-4 h-28 w-44 rounded-xl border border-urvos-border bg-urvos-surface shadow-lg overflow-hidden flex items-center justify-center text-xs text-urvos-text-muted">
          Provider Video Stream
        </div>
      </main>

      <footer className="p-4 bg-urvos-background/80 backdrop-blur-md flex items-center justify-center gap-4 z-10">
        <button
          onClick={() => setMuted(!muted)}
          className={clsx("p-3 rounded-full transition-colors", muted ? "bg-urvos-error text-urvos-text-inverse" : "bg-urvos-surface hover:bg-urvos-surface/90 text-urvos-text-inverse")}
        >
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setVideoOff(!videoOff)}
          className={clsx("p-3 rounded-full transition-colors", videoOff ? "bg-urvos-error text-urvos-text-inverse" : "bg-urvos-surface hover:bg-urvos-surface/90 text-urvos-text-inverse")}
        >
          {videoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </button>
        <button className="p-3 rounded-full bg-urvos-error hover:bg-urvos-error/90 text-urvos-text-inverse transition-colors">
          <PhoneOff className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}
