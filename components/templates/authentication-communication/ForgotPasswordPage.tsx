"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Heart, Mail, ArrowLeft, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export function ForgotPasswordPage({ className }: { className?: string }) {
  const [step, setStep] = useState<"request" | "otp" | "reset" | "success">("request");
  const [identifier, setIdentifier] = useState("dr.rajesh@urvos.health");
  const [otp, setOtp] = useState(["", "", "", ""]);

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className)}>
      {/* BRANDING */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs">
          <Heart className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
        <span className="text-xl font-semibold tracking-tight">Urvos</span>
      </div>

      <Card className="w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5">

        {/* STEP 1 — REQUEST OTP */}
        {step === "request" && (
          <>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">Forgot Password?</h1>
              <p className="text-sm text-urvos-text-subtle">Enter your registered HPR ID or mobile number to receive a reset OTP.</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">HPR ID / Mobile / Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
                    placeholder="dr.name@hospital.com"
                  />
                </div>
              </div>
              <Button size="sm" className="w-full justify-center" onClick={() => setStep("otp")}>
                Send Reset OTP
              </Button>
              <button onClick={() => {}} className="w-full text-xs text-urvos-text-subtle hover:text-urvos-text flex items-center justify-center gap-1 mt-1">
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — OTP VERIFICATION */}
        {step === "otp" && (
          <>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">Enter OTP</h1>
              <p className="text-sm text-urvos-text-subtle">A 6-digit OTP was sent to <span className="font-medium text-urvos-text">{identifier}</span></p>
            </div>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => {
                    const next = [...otp];
                    next[i] = e.target.value.slice(-1);
                    setOtp(next);
                  }}
                  className="w-10 h-12 text-center text-lg font-bold border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/40"
                />
              ))}
            </div>
            <div className="space-y-2">
              <Button size="sm" className="w-full justify-center" onClick={() => setStep("reset")}>
                Verify OTP
              </Button>
              <p className="text-xs text-center text-urvos-text-subtle">
                Didn&apos;t receive it?{" "}
                <button className="text-urvos-primary font-medium hover:underline">Resend OTP</button>
              </p>
            </div>
          </>
        )}

        {/* STEP 3 — NEW PASSWORD */}
        {step === "reset" && (
          <>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">New Password</h1>
              <p className="text-sm text-urvos-text-subtle">Choose a strong password for your account.</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">New Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input type="password" defaultValue="SecurePass@123" className="w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
                </div>
                {/* Password strength bar */}
                <div className="flex gap-1 mt-1">
                  {["bg-urvos-danger-bg", "bg-urvos-warning-bg", "bg-urvos-success-bg", "bg-urvos-success-bg"].map((c, i) => (
                    <div key={i} className={clsx("h-1 flex-1 rounded-full", c)} />
                  ))}
                </div>
                <p className="text-[10px] text-urvos-success font-medium">Strong password</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Confirm New Password</label>
                <input type="password" defaultValue="SecurePass@123" className="w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
              </div>
              <Button size="sm" className="w-full justify-center" onClick={() => setStep("success")}>
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Reset Password
              </Button>
            </div>
          </>
        )}

        {/* STEP 4 — SUCCESS */}
        {step === "success" && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-urvos-success-bg flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-urvos-success" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Password Reset!</h1>
              <p className="text-sm text-urvos-text-subtle mt-1">Your password has been updated. You can now sign in.</p>
            </div>
            <Button size="sm" className="w-full justify-center">Back to Login</Button>
          </div>
        )}
      </Card>

      <p className="mt-8 text-xs text-urvos-text-subtle">© 2026 Urvos Technologies. All rights reserved.</p>
    </div>
  );
}
