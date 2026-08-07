"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "default" | "nord" | "dental" | "therapy" | "cardiology" | "pediatrics" | "oncology" | "neurology";
export type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  colorMode: ColorMode;
  colorTheme: ColorTheme;
  setColorMode: (mode: ColorMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default");

  useEffect(() => {
    // Load from local storage on mount
    const savedMode = localStorage.getItem("urvos-color-mode") as ColorMode;
    const savedTheme = localStorage.getItem("urvos-color-theme") as ColorTheme;
    if (savedMode) setColorMode(savedMode);
    if (savedTheme) setColorTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Handle Dark Mode
    let isDark = colorMode === "dark";
    if (colorMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.removeAttribute("data-theme");
    }

    // Handle Color Theme
    const themes = ["theme-nord", "theme-dental", "theme-therapy", "theme-cardiology", "theme-pediatrics", "theme-oncology", "theme-neurology"];
    root.classList.remove(...themes);
    
    if (colorTheme !== "default") {
      root.classList.add(`theme-${colorTheme}`);
    }

    // Save to local storage
    localStorage.setItem("urvos-color-mode", colorMode);
    localStorage.setItem("urvos-color-theme", colorTheme);

  }, [colorMode, colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorMode, colorTheme, setColorMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
