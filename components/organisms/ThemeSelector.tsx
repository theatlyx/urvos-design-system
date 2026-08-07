"use client";

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { Palette, Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme, ColorTheme, ColorMode } from "../utilities/ThemeProvider";

const THEMES: { id: ColorTheme; label: string; color: string }[] = [
  { id: "default", label: "Default Blue", color: "#0B5B8E" },
  { id: "nord", label: "Nord (Blue)", color: "#2F6FED" },
  { id: "dental", label: "Dental (Green)", color: "#0EA968" },
  { id: "therapy", label: "Therapy (Violet)", color: "#7C5CFC" },
  { id: "cardiology", label: "Cardiology (Crimson)", color: "#E11D48" },
  { id: "pediatrics", label: "Pediatrics (Orange)", color: "#F97316" },
  { id: "oncology", label: "Oncology (Teal)", color: "#0D9488" },
  { id: "neurology", label: "Neurology (Indigo)", color: "#4F46E5" },
];

export function ThemeSelector({ className }: { className?: string }) {
  const { colorMode, colorTheme, setColorMode, setColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-lg bg-urvos-surface border border-urvos-border hover:bg-urvos-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urvos-primary"
        aria-label="Theme settings"
      >
        <Palette className="w-5 h-5 text-urvos-ink" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-urvos-surface border border-urvos-border rounded-xl shadow-urvos-popout z-urvos-dropdown overflow-hidden">
          <div className="p-4 border-b border-urvos-border bg-urvos-surface-alt/50">
            <h3 className="text-sm font-semibold text-urvos-ink mb-3">Appearance</h3>
            <div className="flex bg-urvos-surface-alt p-1 rounded-lg border border-urvos-border">
              <button
                onClick={() => setColorMode("light")}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                  colorMode === "light" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
                )}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button
                onClick={() => setColorMode("dark")}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                  colorMode === "dark" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
                )}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
              <button
                onClick={() => setColorMode("system")}
                className={clsx(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                  colorMode === "system" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
                )}
              >
                <Monitor className="w-4 h-4" /> System
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-semibold text-urvos-ink mb-3">Brand Theme</h3>
            <div className="grid grid-cols-4 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setColorTheme(theme.id)}
                  className="group flex flex-col items-center gap-1.5 focus-visible:outline-none"
                  aria-label={`Select ${theme.label} theme`}
                >
                  <div 
                    className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all group-hover:scale-110",
                      colorTheme === theme.id ? "border-urvos-primary scale-110 shadow-urvos-glow" : "border-transparent shadow-urvos-soft"
                    )}
                    style={{ backgroundColor: theme.color }}
                  >
                    {colorTheme === theme.id && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <span className="text-[10px] text-center font-medium text-urvos-text-subtle group-hover:text-urvos-ink line-clamp-1">
                    {theme.label.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
