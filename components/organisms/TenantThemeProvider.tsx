"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

/**
 * TENANT THEMING
 * ---------------------------------------------------------------
 * Only the brand accent is tenant-overridable. Signal colors
 * (--sig-critical / caution / success / info) and the pulse accent
 * are intentionally NOT in this type — they are clinical-safety
 * colors and must never vary by tenant. If you find yourself
 * wanting to add them here, stop: that's the one hard boundary
 * this whole system is built around.
 */
export interface TenantTheme {
  tenantId: string;
  name: string;
  logoUrl?: string;
  /** Two-stop gradient, e.g. ["#4F3FE0", "#2F6FED"] */
  brandGradient: [string, string];
  brandSolid: string;
  brandTint: string;
}

export const URVOS_DEFAULT_THEME: TenantTheme = {
  tenantId: "default",
  name: "Urvos",
  brandGradient: ["#4F3FE0", "#2F6FED"],
  brandSolid: "#4F3FE0",
  brandTint: "#EEEBFD",
};

const TenantThemeContext = createContext<{
  theme: TenantTheme;
  setTheme: (t: TenantTheme) => void;
} | null>(null);

export function useTenantTheme() {
  const ctx = useContext(TenantThemeContext);
  if (!ctx) throw new Error("useTenantTheme must be used within <TenantThemeProvider>");
  return ctx;
}

export function TenantThemeProvider({
  initialTheme = URVOS_DEFAULT_THEME,
  children,
}: {
  initialTheme?: TenantTheme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--brand-1", theme.brandGradient[0]);
    root.setProperty("--brand-2", theme.brandGradient[1]);
    root.setProperty("--brand-solid", theme.brandSolid);
    root.setProperty("--brand-tint", theme.brandTint);
    // --grad-brand is defined in tokens.css as a linear-gradient() referencing
    // --brand-1 / --brand-2, so it updates automatically — no need to touch it.
  }, [theme]);

  return (
    <TenantThemeContext.Provider value={{ theme, setTheme }}>{children}</TenantThemeContext.Provider>
  );
}

/**
 * Example fetch — replace with your actual tenant-resolution call
 * (e.g. from subdomain, session, or a /api/tenant/[id] route).
 */
export async function loadTenantTheme(tenantId: string): Promise<TenantTheme> {
  const res = await fetch(`/api/tenants/${tenantId}/theme`);
  if (!res.ok) return URVOS_DEFAULT_THEME;
  return res.json();
}
