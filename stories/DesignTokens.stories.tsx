import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokensData from "../tokens/tokens.json";
import { Copy, Check, Search, Moon, Sun, Palette, Sliders, ShieldCheck, Code, Layers, Type, Box, MoveRight } from "lucide-react";

const meta: Meta = {
  title: "Design System/Design Tokens",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Comprehensive, single source of truth Design Tokens showcase mirroring Nordhealth Design Tokens system. Supports interactive theme switching, WCAG contrast verification, one-click copy, and multi-format consumption documentation.",
      },
    },
  },
};

export default meta;

// --- CONTRAST RATIO CALCULATOR UTILITY ---
function getLuminance(hexColor: string): number {
  let hex = hexColor.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return 0.5;

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrast(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
  } catch (e) {
    return 1;
  }
}

// --- INTERACTIVE DESIGN TOKENS COMPONENT ---
export function DesignTokensShowcase() {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "spacing" | "borders" | "shadows" | "transitions" | "zindex" | "docs">("colors");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<"default" | "therapy" | "dental" | "nord">("default");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState<"css" | "scss" | "ts" | "json" | "android" | "ios">("css");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const surfaceBg = isDarkMode ? "#16142A" : "#FFFFFF";

  // Category Tabs
  const tabs = [
    { id: "colors", label: "Color System", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "spacing", label: "Spacing & Sizing", icon: Box },
    { id: "borders", label: "Borders & Radii", icon: Sliders },
    { id: "shadows", label: "Shadows", icon: Layers },
    { id: "transitions", label: "Transitions", icon: MoveRight },
    { id: "zindex", label: "Z-Index", icon: Layers },
    { id: "docs", label: "Installation & Code", icon: Code },
  ] as const;

  const brands = [
    { id: "default", name: "Urvos Clinical", color: "#0B5B8E" },
    { id: "therapy", name: "Therapy Theme", color: "#7C5CFC" },
    { id: "dental", name: "Dental Theme", color: "#0EA968" },
    { id: "nord", name: "Nord Theme", color: "#2F6FED" },
  ] as const;

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isDarkMode ? "bg-[#0D0B1F] text-[#F4F5FA] dark" : "bg-[#F4F5FA] text-[#111322]"
      } ${selectedBrand !== "default" ? `theme-${selectedBrand}` : ""}`}
      style={{
        padding: "2rem",
      }}
    >
      {/* HEADER BAR */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E9F2] dark:border-[#2A2D3D] pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-[#0B5B8E]/10 text-[#0B5B8E] dark:text-[#38BDF8] text-xs font-semibold rounded-full uppercase tracking-wider">
                System Single Source of Truth
              </span>
              <span className="text-xs text-[#6B7089] font-mono">v1.0.0</span>
            </div>
            <h1 className="text-3xl font-bold mt-2 tracking-tight">Design Tokens</h1>
            <p className="text-[#5A5E72] dark:text-[#A3A7BA] text-sm mt-1 max-w-2xl">
              Centralized design decisions consumed across CSS, SCSS, TypeScript, JSON, Android, and iOS. Mirrors the Nordhealth Tokens specification.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">
            {/* BRAND SELECTOR */}
            <div className="flex items-center bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-lg p-1 shadow-sm">
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedBrand === b.id
                      ? "bg-[#F4F5FA] dark:bg-[#222040] shadow-xs text-[#111322] dark:text-white"
                      : "text-[#5A5E72] hover:text-[#111322] dark:hover:text-white"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center space-x-2 px-3 py-2 bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-lg text-xs font-medium shadow-sm hover:bg-[#F7F8FC] dark:hover:bg-[#1F1D38] transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>

        {/* SEARCH & CATEGORY TABS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* SEARCH INPUT */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7089]" />
              <input
                type="text"
                placeholder="Filter tokens by name, hex, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-lg text-sm placeholder-[#6B7089] focus:outline-none focus:ring-2 focus:ring-[#0B5B8E]/40"
              />
            </div>
          </div>

          {/* TABS */}
          <div className="flex items-center space-x-2 border-b border-[#E7E9F2] dark:border-[#2A2D3D] overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? "border-[#0B5B8E] text-[#0B5B8E] dark:text-[#38BDF8] bg-[#FFFFFF] dark:bg-[#16142A]"
                      : "border-transparent text-[#5A5E72] dark:text-[#A3A7BA] hover:text-[#111322] dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENT */}

        {/* 1. COLOR SYSTEM */}
        {activeTab === "colors" && (
          <div className="space-y-8">
            {Object.entries(tokensData.tokens.color).map(([groupName, groupItems]) => {
              const filteredItems = Object.entries(groupItems).filter(([name, def]: [string, any]) => {
                const q = searchQuery.toLowerCase();
                return (
                  name.toLowerCase().includes(q) ||
                  def.value.toLowerCase().includes(q) ||
                  (def.nAlias && def.nAlias.toLowerCase().includes(q)) ||
                  (def.description && def.description.toLowerCase().includes(q))
                );
              });

              if (filteredItems.length === 0) return null;

              return (
                <div key={groupName} className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089] border-b border-[#E7E9F2] dark:border-[#2A2D3D] pb-2">
                    {groupName.replace(/([A-Z])/g, " $1")} Colors
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map(([name, def]: [string, any]) => {
                      const colorVal = isDarkMode && def.darkValue ? def.darkValue : def.value;
                      const tokenVar = def.nAlias || `--n-color-${groupName}-${name}`;
                      const contrast = calculateContrast(colorVal, surfaceBg);
                      const passesAA = contrast >= 4.5;
                      const passesAAA = contrast >= 7.0;

                      return (
                        <div
                          key={name}
                          className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                          <div>
                            {/* COLOR SWATCH */}
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-12 h-12 rounded-lg border border-black/10 dark:border-white/10 shadow-inner flex items-center justify-center font-mono text-xs text-white"
                                style={{ backgroundColor: colorVal }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">{name}</div>
                                <div className="font-mono text-xs text-[#5A5E72] dark:text-[#A3A7BA]">{colorVal}</div>
                              </div>
                            </div>

                            <p className="text-xs text-[#6B7089] dark:text-[#7E839C] mt-3">{def.description}</p>
                          </div>

                          <div className="pt-3 border-t border-[#E7E9F2] dark:border-[#2A2D3D] flex items-center justify-between">
                            {/* TOKEN CSS VAR & COPY BUTTON */}
                            <button
                              onClick={() => handleCopy(`var(${tokenVar})`)}
                              className="font-mono text-xs px-2.5 py-1 bg-[#F4F5FA] dark:bg-[#222040] hover:bg-[#EEF0F7] rounded border border-[#E7E9F2] dark:border-[#3D4155] flex items-center space-x-1.5 transition-colors group"
                            >
                              <span>{tokenVar}</span>
                              {copiedToken === `var(${tokenVar})` ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3 text-[#6B7089] group-hover:text-[#111322]" />
                              )}
                            </button>

                            {/* CONTRAST BADGE FOR TEXT COLORS */}
                            {groupName === "text" && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  passesAAA
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : passesAA
                                    ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                    : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                                }`}
                              >
                                {contrast}:1 {passesAAA ? "AAA" : passesAA ? "AA" : "Fail"}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. TYPOGRAPHY */}
        {activeTab === "typography" && (
          <div className="space-y-8">
            {/* FONT FAMILIES */}
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Font Families</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(tokensData.tokens.typography.fontFamily).map(([name, family]) => (
                  <div key={name} className="p-4 bg-[#F4F5FA] dark:bg-[#222040] rounded-lg space-y-2">
                    <div className="text-xs font-semibold uppercase text-[#6B7089]">{name}</div>
                    <div className="text-lg font-bold" style={{ fontFamily: family }}>
                      Aa Bb Cc 123
                    </div>
                    <div className="font-mono text-xs text-[#5A5E72] dark:text-[#A3A7BA]">{family}</div>
                    <button
                      onClick={() => handleCopy(`var(--n-fontFamily-${name})`)}
                      className="font-mono text-[11px] text-[#0B5B8E] dark:text-[#38BDF8] flex items-center space-x-1"
                    >
                      <span>--n-fontFamily-{name}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FONT SIZES & SPECIMENS */}
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Font Size Scale & Visual Specimens</h3>
              <div className="divide-y divide-[#E7E9F2] dark:divide-[#2A2D3D]">
                {Object.entries(tokensData.tokens.typography.fontSize).map(([sizeKey, sizeVal]) => (
                  <div key={sizeKey} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="w-48 space-y-1">
                      <div className="font-semibold text-sm capitalize">{sizeKey}</div>
                      <div className="font-mono text-xs text-[#6B7089]">{sizeVal}</div>
                      <button
                        onClick={() => handleCopy(`var(--n-fontSize-${sizeKey})`)}
                        className="font-mono text-[11px] text-[#0B5B8E] dark:text-[#38BDF8] flex items-center space-x-1"
                      >
                        <span>--n-fontSize-{sizeKey}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex-1 truncate" style={{ fontSize: sizeVal }}>
                      The quick brown fox jumps over the lazy dog.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. SPACING & SIZING */}
        {activeTab === "spacing" && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">4pt Space Scale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(tokensData.tokens.spacing.space).map(([key, val]) => (
                  <div key={key} className="p-4 bg-[#F4F5FA] dark:bg-[#222040] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">Space {key}</span>
                      <span className="font-mono text-xs text-[#6B7089]">{val}</span>
                    </div>
                    {/* VISUAL RULER BAR */}
                    <div className="h-6 bg-[#0B5B8E]/20 border border-[#0B5B8E]/40 rounded flex items-center justify-center text-[10px] font-mono text-[#0B5B8E] dark:text-[#38BDF8]" style={{ width: val === "0px" ? "100%" : val, maxWidth: "100%" }}>
                      {val}
                    </div>
                    <button
                      onClick={() => handleCopy(`var(--n-space-space-${key})`)}
                      className="font-mono text-[11px] text-[#0B5B8E] dark:text-[#38BDF8] flex items-center space-x-1"
                    >
                      <span>--n-space-space-{key}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. BORDERS & RADII */}
        {activeTab === "borders" && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Border Radius Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(tokensData.tokens.border.radius).map(([key, val]) => (
                  <div key={key} className="p-4 bg-[#F4F5FA] dark:bg-[#222040] rounded-lg flex flex-col items-center space-y-3 text-center">
                    <div
                      className="w-16 h-16 bg-[#0B5B8E] text-white flex items-center justify-center font-bold text-xs shadow-md"
                      style={{ borderRadius: val }}
                    >
                      {key}
                    </div>
                    <div className="font-semibold text-xs capitalize">{key}</div>
                    <div className="font-mono text-[11px] text-[#6B7089]">{val}</div>
                    <button
                      onClick={() => handleCopy(`var(--n-border-radius-${key})`)}
                      className="font-mono text-[10px] text-[#0B5B8E] dark:text-[#38BDF8]"
                    >
                      --n-border-radius-{key}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. SHADOWS */}
        {activeTab === "shadows" && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Box Shadows & Elevation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(tokensData.tokens.shadow.boxShadow).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-6 bg-[#FFFFFF] dark:bg-[#1F1D38] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl space-y-3 transition-transform hover:-translate-y-1"
                    style={{ boxShadow: val }}
                  >
                    <div className="font-semibold text-sm capitalize">{key} Elevation</div>
                    <div className="font-mono text-xs text-[#6B7089] break-words">{val}</div>
                    <button
                      onClick={() => handleCopy(`var(--n-shadow-${key})`)}
                      className="font-mono text-[11px] text-[#0B5B8E] dark:text-[#38BDF8] flex items-center space-x-1"
                    >
                      <span>--n-shadow-{key}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. TRANSITIONS */}
        {activeTab === "transitions" && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Transition Timing & Easing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(tokensData.tokens.transition.timing).map(([key, val]) => (
                  <div key={key} className="p-4 bg-[#F4F5FA] dark:bg-[#222040] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm capitalize">{key}</span>
                      <span className="font-mono text-xs text-[#6B7089]">{val}</span>
                    </div>
                    {/* INTERACTIVE ANIMATED BOX */}
                    <div className="h-10 bg-[#0B5B8E] text-white rounded-lg flex items-center justify-between px-4 hover:translate-x-4 cursor-pointer font-xs font-semibold shadow-xs" style={{ transition: `all ${val}` }}>
                      <span>Hover me to test transition</span>
                      <MoveRight className="w-4 h-4" />
                    </div>
                    <button
                      onClick={() => handleCopy(`var(--n-transition-${key})`)}
                      className="font-mono text-[11px] text-[#0B5B8E] dark:text-[#38BDF8]"
                    >
                      --n-transition-{key}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. Z-INDEX */}
        {activeTab === "zindex" && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Layered Z-Index Stack</h3>
              <div className="relative h-64 border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl overflow-hidden bg-[#F4F5FA] dark:bg-[#0D0B1F] p-4 flex flex-col justify-end space-y-2">
                {Object.entries(tokensData.tokens.zIndex.scale).map(([key, val], idx) => (
                  <div
                    key={key}
                    className="p-3 bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-lg shadow-sm flex items-center justify-between font-mono text-xs"
                    style={{ zIndex: Number(val) }}
                  >
                    <span className="font-semibold text-[#0B5B8E] dark:text-[#38BDF8]">z-{key}</span>
                    <span className="text-[#6B7089]">value: {val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. INSTALLATION & CODE DOCS */}
        {activeTab === "docs" && (
          <div className="space-y-8">
            {/* CODE SNIPPET TABS */}
            <div className="bg-[#FFFFFF] dark:bg-[#16142A] border border-[#E7E9F2] dark:border-[#2A2D3D] rounded-xl p-6 shadow-xs space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7089]">Multi-Format Token Imports</h3>

              <div className="flex items-center space-x-2 border-b border-[#E7E9F2] dark:border-[#2A2D3D] pb-2">
                {(["css", "scss", "ts", "json", "android", "ios"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCodeTab(fmt)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-colors ${
                      codeTab === fmt
                        ? "bg-[#0B5B8E] text-white"
                        : "text-[#5A5E72] hover:bg-[#F4F5FA] dark:hover:bg-[#222040]"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* CODE BLOCK */}
              <div className="bg-[#0D0B1F] text-emerald-400 font-mono text-xs p-4 rounded-xl relative overflow-x-auto border border-[#2A2D3D]">
                <button
                  onClick={() =>
                    handleCopy(
                      codeTab === "css"
                        ? `@import 'urvos-design-system/tokens.css';`
                        : codeTab === "ts"
                        ? `import { nColorAccent } from 'urvos-design-system/tokens';`
                        : codeTab === "scss"
                        ? `@use 'urvos-design-system/tokens' as *;`
                        : `npm install urvos-design-system`
                    )
                  }
                  className="absolute right-3 top-3 text-[#6B7089] hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>

                {codeTab === "css" && (
                  <pre>{`/* Import tokens in CSS */
@import 'urvos-design-system/tokens.css';

.button {
  background-color: var(--n-color-accent);
  color: var(--n-color-text-inverse);
  padding: var(--n-space-space-4);
  border-radius: var(--n-border-radius-md);
}`}</pre>
                )}

                {codeTab === "ts" && (
                  <pre>{`// Import tokens in React / TypeScript
import { nColorAccent, nSpaceSpace4, nTokens } from 'urvos-design-system/tokens';

const style = {
  backgroundColor: nColorAccent,
  padding: nSpaceSpace4,
};`}</pre>
                )}

                {codeTab === "scss" && (
                  <pre>{`// Import tokens in SCSS
@use 'urvos-design-system/tokens' as *;

.card {
  background-color: $n-color-surface;
  padding: $n-space-space-4;
}`}</pre>
                )}

                {codeTab === "json" && (
                  <pre>{`// Import tokens JSON
import tokens from 'urvos-design-system/tokens.json';

console.log(tokens.color.general.accent.value);`}</pre>
                )}

                {codeTab === "android" && (
                  <pre>{`<!-- Android XML Resources (urvos-design-system/tokens-android.xml) -->
<color name="n_color_general_accent">#0B5B8E</color>
<dimen name="n_space_space_4">16px</dimen>`}</pre>
                )}

                {codeTab === "ios" && (
                  <pre>{`// iOS JSON Dictionary (urvos-design-system/tokens-ios.json)
{
  "n_color_general_accent": { "type": "color", "value": "#0B5B8E" }
}`}</pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const StorybookShowcase: StoryObj = {
  render: () => <DesignTokensShowcase />,
};
