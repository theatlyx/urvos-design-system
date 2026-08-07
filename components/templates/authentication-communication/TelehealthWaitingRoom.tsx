"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Video, Mic, MicOff, VideoOff, CheckCircle2, AlertCircle, Settings, PhoneForwarded } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface TelehealthWaitingRoomProps {
  className?: string;
  providerName?: string;
  appointmentTime?: string;
  onJoinCall?: () => void;
}

export function TelehealthWaitingRoom({ 
  className,
  providerName = "Dr. Rajesh Kumar",
  appointmentTime = "Today, 10:30 AM",
  onJoinCall
}: TelehealthWaitingRoomProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  
  const [micTested, setMicTested] = useState(true);
  const [camTested, setCamTested] = useState(true);
  const [netTested, setNetTested] = useState(true);

  // Simulating a provider joining shortly
  const [providerReady, setProviderReady] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProviderReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center p-4 font-sans text-urvos-text", className)}>
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        
        {/* Left Side - Video Preview */}
        <div className="md:col-span-3 space-y-4">
          <div className="relative w-full aspect-video bg-urvos-ink rounded-2xl overflow-hidden shadow-md flex items-center justify-center border border-urvos-border">
            {camEnabled ? (
              <div className="text-center text-white space-y-2 opacity-50">
                <Video className="w-12 h-12 mx-auto" />
                <p>Camera Preview Active</p>
              </div>
            ) : (
              <div className="text-center text-white space-y-2 opacity-50">
                <VideoOff className="w-12 h-12 mx-auto text-urvos-danger" />
                <p>Camera is off</p>
              </div>
            )}
            
            {/* Overlay controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-urvos-ink/80 backdrop-blur-md rounded-full">
              <button 
                onClick={() => setMicEnabled(!micEnabled)}
                className={clsx("w-12 h-12 rounded-full flex items-center justify-center transition-colors", micEnabled ? "bg-white/10 hover:bg-white/20 text-white" : "bg-urvos-danger-bg hover:bg-urvos-danger-bg text-white")}
              >
                {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setCamEnabled(!camEnabled)}
                className={clsx("w-12 h-12 rounded-full flex items-center justify-center transition-colors", camEnabled ? "bg-white/10 hover:bg-white/20 text-white" : "bg-urvos-danger-bg hover:bg-urvos-danger-bg text-white")}
              >
                {camEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
              
              <div className="w-px h-8 bg-white/20 mx-2"></div>
              
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info & Checks */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 border border-urvos-border shadow-sm">
            <h1 className="text-xl font-bold mb-1">Telehealth Visit</h1>
            <p className="text-sm text-urvos-text-subtle mb-6">with {providerName} • {appointmentTime}</p>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-urvos-text-subtle">System Check</h3>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface">
                <div className="flex items-center gap-3">
                  <Mic className="w-4 h-4 text-urvos-text-subtle" />
                  <span className="text-sm font-medium">Microphone</span>
                </div>
                {micTested ? <CheckCircle2 className="w-5 h-5 text-urvos-success" /> : <AlertCircle className="w-5 h-5 text-urvos-danger" />}
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-urvos-text-subtle" />
                  <span className="text-sm font-medium">Camera</span>
                </div>
                {camTested ? <CheckCircle2 className="w-5 h-5 text-urvos-success" /> : <AlertCircle className="w-5 h-5 text-urvos-danger" />}
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface">
                <div className="flex items-center gap-3">
                  <PhoneForwarded className="w-4 h-4 text-urvos-text-subtle" />
                  <span className="text-sm font-medium">Connection</span>
                </div>
                {netTested ? <CheckCircle2 className="w-5 h-5 text-urvos-success" /> : <AlertCircle className="w-5 h-5 text-urvos-danger" />}
              </div>
            </div>

            {providerReady ? (
              <div className="space-y-4">
                <div className="bg-urvos-success-bg border border-urvos-success text-urvos-success text-sm p-4 rounded-lg flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-urvos-success-bg animate-pulse mt-1.5 flex-shrink-0"></div>
                  <p><strong>{providerName} is ready.</strong> You can now join the secure video consultation.</p>
                </div>
                <Button size="lg" className="w-full text-base" onClick={onJoinCall}>
                  Join Consultation
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-urvos-warning-bg border border-urvos-warning text-urvos-warning text-sm p-4 rounded-lg flex gap-3">
                  <div className="w-4 h-4 border-2 border-urvos-warning border-t-transparent rounded-full animate-spin mt-0.5 flex-shrink-0"></div>
                  <p>Please wait here. <strong>{providerName}</strong> will join the call shortly when they are ready.</p>
                </div>
                <Button size="lg" className="w-full text-base" disabled>
                  Waiting for Provider...
                </Button>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
