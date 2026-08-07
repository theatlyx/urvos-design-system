"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Heart, User, Mail, Phone, Building2, FileText, Eye, EyeOff, CheckCircle2, Upload } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { Badge } from "../../ui/Badge";

export function SignUpPage({ className }: { className?: string }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("Urvos@2026!");

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*#?&]/.test(password) ? 4 : 3;
  const strengthColors = ["", "bg-urvos-danger-bg", "bg-urvos-warning-bg", "bg-urvos-warning-bg", "bg-urvos-success-bg"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 py-10 font-sans text-urvos-text", className)}>
      {/* BRANDING */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs">
          <Heart className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
        <span className="text-xl font-semibold tracking-tight">Urvos</span>
        <Badge variant="info" className="ml-1">Provider Registration</Badge>
      </div>

      {/* STEPPER */}
      <div className="flex items-center gap-2 mb-6 text-xs">
        {["Account", "Credentials", "Facility"].map((label, i) => (
          <React.Fragment key={label}>
            <div className={clsx("flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-full", step === i + 1 ? "bg-urvos-primary text-white" : step > i + 1 ? "bg-urvos-success-bg/10 text-urvos-success" : "bg-urvos-surface text-urvos-text-subtle border border-urvos-border")}>
              {step > i + 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-4 h-4 rounded-full bg-current/10 flex items-center justify-center text-[10px]">{i + 1}</span>}
              {label}
            </div>
            {i < 2 && <div className="w-6 h-px bg-urvos-border" />}
          </React.Fragment>
        ))}
      </div>

      <Card className="w-full max-w-md p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5">

        {/* STEP 1 — PERSONAL ACCOUNT */}
        {step === 1 && (
          <>
            <div><h2 className="text-lg font-semibold">Personal Information</h2><p className="text-xs text-urvos-text-subtle">Create your provider account.</p></div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-urvos-text-subtle">First Name</label>
                  <input type="text" defaultValue="Rajesh" className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-urvos-text-subtle">Last Name</label>
                  <input type="text" defaultValue="Kumar" className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input type="email" defaultValue="dr.rajesh@apollohospitals.com" className="w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full justify-center" onClick={() => setStep(2)}>Continue →</Button>
          </>
        )}

        {/* STEP 2 — MEDICAL CREDENTIALS */}
        {step === 2 && (
          <>
            <div><h2 className="text-lg font-semibold">Medical Credentials</h2><p className="text-xs text-urvos-text-subtle">We verify all healthcare providers.</p></div>
            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">HPR ID (Health Professional Registry)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input type="text" defaultValue="HPR-2026-DR-88192" className="w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Medical License / Certificate</label>
                <div className="border-2 border-dashed border-urvos-border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-urvos-primary/50 hover:bg-urvos-primary/5 transition-colors">
                  <Upload className="w-6 h-6 text-urvos-text-subtle" />
                  <p className="text-xs text-urvos-text-subtle text-center">Drop your MCI/NMC license PDF here, or <span className="text-urvos-primary font-medium">browse</span></p>
                  <p className="text-[10px] text-urvos-text-subtle">PDF, JPG, PNG up to 5MB</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-urvos-success-bg border border-urvos-success rounded-lg text-xs text-urvos-success">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  MCI_License_Rajesh_Kumar.pdf — verified ✓
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm pr-10" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={clsx("h-1 flex-1 rounded-full transition-colors", i <= pwStrength ? strengthColors[pwStrength] : "bg-urvos-border")} />
                  ))}
                </div>
                {password && <p className={clsx("text-[10px] font-medium", pwStrength >= 4 ? "text-urvos-success" : pwStrength >= 2 ? "text-urvos-warning" : "text-urvos-danger")}>{strengthLabels[pwStrength]} password</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setStep(1)}>← Back</Button>
              <Button size="sm" className="flex-1 justify-center" onClick={() => setStep(3)}>Continue →</Button>
            </div>
          </>
        )}

        {/* STEP 3 — FACILITY */}
        {step === 3 && (
          <>
            <div><h2 className="text-lg font-semibold">Your Facility</h2><p className="text-xs text-urvos-text-subtle">Associate your account with a healthcare facility.</p></div>
            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">Facility / Hospital Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
                  <input type="text" defaultValue="Apollo Hospitals, Mumbai" className="w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-urvos-text-subtle">HFR ID (Facility Registry)</label>
                <input type="text" defaultValue="IN2610300009" placeholder="HFR facility ID" className="w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" />
              </div>
              <div className="flex items-start gap-2 p-3 bg-urvos-background border border-urvos-border rounded-lg">
                <input type="checkbox" id="tos" defaultChecked className="mt-0.5 w-4 h-4 rounded accent-urvos-primary" />
                <label htmlFor="tos" className="text-xs text-urvos-text-subtle leading-relaxed cursor-pointer">
                  I agree to the <span className="text-urvos-primary hover:underline font-medium">Terms of Service</span> and <span className="text-urvos-primary hover:underline font-medium">Privacy Policy</span>. I confirm I am a licensed healthcare professional.
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setStep(2)}>← Back</Button>
              <Button size="sm" className="flex-1 justify-center">
                <FileText className="w-4 h-4 mr-1.5" /> Create Account
              </Button>
            </div>
          </>
        )}
      </Card>

      <p className="mt-6 text-xs text-urvos-text-subtle">© 2026 Urvos Technologies. All rights reserved.</p>
    </div>
  );
}
