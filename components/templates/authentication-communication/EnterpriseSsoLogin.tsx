"use client";

import React from "react";
import { clsx } from "clsx";
import { Server, Building, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface EnterpriseSsoLoginProps {
  className?: string;
  hospitalName?: string;
  onSsoLogin?: (provider: string) => void;
  onStaffLogin?: () => void;
  onPatientLogin?: () => void;
}

export function EnterpriseSsoLogin({ 
  className, 
  hospitalName = "Memorial Healthcare System",
  onSsoLogin,
  onStaffLogin,
  onPatientLogin
}: EnterpriseSsoLoginProps) {

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col md:flex-row font-sans text-urvos-text", className)}>
      {/* Left Pane - Branding & Info */}
      <div className="hidden md:flex flex-col justify-between w-1/3 bg-urvos-surface border-r border-urvos-border p-10">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Urvos Enterprise</span>
          </div>
          
          <h1 className="text-3xl font-semibold leading-tight mb-4">
            Secure Access for <br/> {hospitalName}
          </h1>
          <p className="text-urvos-text-subtle mb-8">
            Access your unified clinical workspace, patient records, and communication tools securely through your organization's identity provider.
          </p>
        </div>
        
        <div className="text-xs text-urvos-text-subtle">
          <p>Protected by Urvos Security Center</p>
          <p className="mt-1">HIPAA Compliant • SOC 2 Type II</p>
        </div>
      </div>

      {/* Right Pane - Login Options */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-20 bg-urvos-background">
        
        {/* Mobile Branding (hidden on desktop) */}
        <div className="flex md:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-urvos-primary flex items-center justify-center">
            <Server className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Urvos Enterprise</span>
        </div>

        <Card className="w-full max-w-md p-8 shadow-sm border border-urvos-border bg-urvos-surface space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <p className="text-sm text-urvos-text-subtle">Choose your authentication method</p>
          </div>

          {/* Primary SSO Options */}
          <div className="space-y-3">
            <button 
              onClick={() => onSsoLogin?.('azure')}
              className="w-full flex items-center justify-between p-4 border border-urvos-border rounded-xl bg-urvos-background hover:bg-urvos-surface-hover hover:border-urvos-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary">
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm group-hover:text-urvos-primary transition-colors">Azure Active Directory</p>
                  <p className="text-xs text-urvos-text-subtle">Corporate Login (Recommended)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-urvos-text-subtle group-hover:text-urvos-primary transition-colors" />
            </button>

            <button 
              onClick={() => onSsoLogin?.('okta')}
              className="w-full flex items-center justify-between p-4 border border-urvos-border rounded-xl bg-urvos-background hover:bg-urvos-surface-hover hover:border-urvos-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm group-hover:text-urvos-primary transition-colors">Okta SSO</p>
                  <p className="text-xs text-urvos-text-subtle">Alternative Corporate Login</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-urvos-text-subtle group-hover:text-urvos-primary transition-colors" />
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-urvos-border"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-urvos-text-subtle uppercase tracking-wider font-medium">Or</span>
            <div className="flex-grow border-t border-urvos-border"></div>
          </div>

          {/* Fallback/Other Logins */}
          <div className="space-y-3">
            <button 
              onClick={onStaffLogin}
              className="w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-urvos-text hover:bg-urvos-surface-hover border border-transparent hover:border-urvos-border rounded-lg transition-colors"
            >
              <KeyRound className="w-4 h-4 text-urvos-text-subtle" />
              Staff Login (Urvos Credentials)
            </button>
            <button 
              onClick={onPatientLogin}
              className="w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-urvos-text hover:bg-urvos-surface-hover border border-transparent hover:border-urvos-border rounded-lg transition-colors"
            >
              Patient Portal Login
            </button>
          </div>
        </Card>
        
        <p className="mt-8 text-xs text-urvos-text-subtle text-center">
          Need help accessing your account? <a href="#" className="text-urvos-primary hover:underline">Contact IT Helpdesk</a>
        </p>
      </div>
    </div>
  );
}
