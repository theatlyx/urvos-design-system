"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Heart, Mail, Key, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface HealthcareLoginProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onEmailLogin?: () => void;
  onPasswordLogin?: () => void;
  onSignupClick?: () => void;
  className?: string;
}

export function HealthcareLogin({
  onGoogleLogin,
  onAppleLogin,
  onEmailLogin,
  onPasswordLogin,
  onSignupClick,
  className,
}: HealthcareLoginProps) {
  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className)}>
      {/* BRANDING LOGO */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs">
          <Heart className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
        <span className="text-xl font-semibold text-urvos-text tracking-tight">Urvos</span>
      </div>

      {/* LOGIN CARD */}
      <Card className="w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface">
        <h1 className="text-xl font-semibold mb-1 text-urvos-text">Welcome to Urvos</h1>
        <p className="text-sm mb-6 text-urvos-text-subtle">Sign in to your healthcare workspace.</p>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" size="lg" className="w-full justify-center" onClick={onGoogleLogin}>
            Continue with Google
          </Button>

          <Button variant="secondary" size="lg" className="w-full justify-center" onClick={onAppleLogin}>
            Continue with Apple
          </Button>

          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-urvos-border" />
            <span className="text-xs text-urvos-text-subtle">or</span>
            <div className="flex-1 h-px bg-urvos-border" />
          </div>

          <Button variant="primary" size="lg" className="w-full justify-center" onClick={onEmailLogin}>
            <Mail className="w-4 h-4 mr-2" /> Continue with Email
          </Button>

          <Button variant="secondary" size="lg" className="w-full justify-center" onClick={onPasswordLogin}>
            <Key className="w-4 h-4 mr-2" /> Continue with Password
          </Button>
        </div>

        <p className="text-xs text-center mt-6 text-urvos-text-subtle">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSignupClick} className="text-urvos-primary font-medium hover:underline cursor-pointer">
            Create Account
          </button>
        </p>
      </Card>

      {/* PATIENT PORTAL LINK BANNER */}
      <div className="mt-4 w-full max-w-sm rounded-xl border border-urvos-primary/30 bg-urvos-primary/5 px-4 py-3 text-center">
        <p className="text-xs font-medium text-urvos-primary">
          <a href="/patient-portal/login" className="hover:underline">Patient Portal →</a>
        </p>
      </div>

      <p className="mt-8 text-xs text-urvos-text-subtle">© 2026 Urvos Technologies. All rights reserved.</p>
    </div>
  );
}
