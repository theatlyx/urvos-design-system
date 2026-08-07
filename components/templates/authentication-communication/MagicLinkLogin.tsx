"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Wand2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface MagicLinkLoginProps {
  className?: string;
  onRequestLink?: (email: string) => void;
  onUsePassword?: () => void;
}

export function MagicLinkLogin({ className, onRequestLink, onUsePassword }: MagicLinkLoginProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"request" | "sent">("request");

  const handleRequest = () => {
    if (!email) return;
    setStep("sent");
    onRequestLink?.(email);
  };

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className)}>
      <Card className="w-full max-w-sm p-8 shadow-sm border border-urvos-border bg-urvos-surface space-y-6">
        
        {step === "request" && (
          <>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-urvos-primary/10 flex items-center justify-center text-urvos-primary shadow-sm border border-urvos-primary/20">
                <Wand2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Magic Link Sign In</h1>
                <p className="text-sm text-urvos-text-subtle mt-1">
                  Enter your email and we'll send you a secure, passwordless link to sign in instantly.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-urvos-text">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" 
                    placeholder="patient@example.com"
                  />
                </div>
              </div>
              
              <Button size="md" className="w-full justify-center" onClick={handleRequest}>
                Send Magic Link
              </Button>
            </div>

            <div className="pt-4 border-t border-urvos-border text-center">
              <button 
                onClick={onUsePassword}
                className="text-sm text-urvos-text-subtle hover:text-urvos-text font-medium transition-colors"
              >
                Sign in with Password instead
              </button>
            </div>
          </>
        )}

        {step === "sent" && (
          <div className="flex flex-col items-center text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-urvos-success-bg border border-urvos-success flex items-center justify-center text-urvos-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Check your email</h1>
              <p className="text-sm text-urvos-text-subtle mt-2">
                We've sent a magic link to <br/>
                <span className="font-medium text-urvos-text">{email}</span>
              </p>
              <p className="text-xs text-urvos-text-subtle mt-3 bg-urvos-surface-hover p-3 rounded-lg border border-urvos-border">
                Click the link in the email to securely sign in to your patient portal. The link expires in 15 minutes.
              </p>
            </div>
            
            <button 
              onClick={() => setStep("request")}
              className="text-sm text-urvos-primary font-medium hover:underline mt-4"
            >
              Try another email address
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
