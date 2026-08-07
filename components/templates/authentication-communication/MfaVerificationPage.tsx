"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ShieldCheck, Smartphone, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface MfaVerificationPageProps {
  className?: string;
  defaultMethod?: "sms" | "email" | "authenticator";
  phoneNumber?: string;
  email?: string;
  onVerify?: (code: string) => void;
  onBack?: () => void;
  onResend?: () => void;
}

export function MfaVerificationPage({
  className,
  defaultMethod = "sms",
  phoneNumber = "***-***-4321",
  email = "d***@hospital.com",
  onVerify,
  onBack,
  onResend
}: MfaVerificationPageProps) {
  const [method, setMethod] = useState(defaultMethod);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  
  const handleVerify = () => {
    onVerify?.(code.join(""));
  };

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className)}>
      <Card className="w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5">
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-urvos-text">Two-Step Verification</h1>
          <p className="text-sm text-urvos-text-subtle">
            {method === "sms" && <span>Enter the 6-digit code sent to <br/><span className="font-medium text-urvos-text">{phoneNumber}</span></span>}
            {method === "email" && <span>Enter the 6-digit code sent to <br/><span className="font-medium text-urvos-text">{email}</span></span>}
            {method === "authenticator" && <span>Enter the 6-digit code from your <br/><span className="font-medium text-urvos-text">Authenticator App</span></span>}
          </p>
        </div>

        <div className="flex gap-2 justify-center py-2">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => {
                const next = [...code];
                next[i] = e.target.value.slice(-1);
                setCode(next);
              }}
              className="w-10 h-12 text-center text-lg font-semibold border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/50 text-urvos-text"
            />
          ))}
        </div>

        <div className="space-y-3">
          <Button size="md" className="w-full justify-center" onClick={handleVerify}>
            Verify Code
          </Button>
          
          <div className="flex flex-col gap-2 pt-2 border-t border-urvos-border">
            {method !== "sms" && (
              <button 
                onClick={() => setMethod("sms")} 
                className="flex items-center gap-2 text-sm text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors"
              >
                <Smartphone className="w-4 h-4" /> Send code via SMS
              </button>
            )}
            {method !== "email" && (
              <button 
                onClick={() => setMethod("email")}
                className="flex items-center gap-2 text-sm text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors"
              >
                <Mail className="w-4 h-4" /> Send code via Email
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={onBack}
            className="text-xs text-urvos-text-subtle hover:text-urvos-text flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Login
          </button>
          <button 
            onClick={onResend}
            className="text-xs text-urvos-primary font-medium hover:underline"
          >
            Resend Code
          </button>
        </div>
      </Card>
    </div>
  );
}
