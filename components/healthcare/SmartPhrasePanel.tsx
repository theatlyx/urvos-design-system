"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Sparkles, Search, Plus, Copy, Check } from "lucide-react";
import { Button } from "../ui/Button";

export interface SmartPhrase {
  shortcut: string; // e.g., .ros, .normexam, .dm2followup
  title: string;
  category: "General" | "Physical Exam" | "Lab Orders" | "Plan";
  content: string;
}

export interface SmartPhrasePanelProps {
  phrases: SmartPhrase[];
  onInsertPhrase?: (phrase: SmartPhrase) => void;
  className?: string;
}

export function SmartPhrasePanel({ phrases, onInsertPhrase, className }: SmartPhrasePanelProps) {
  const [search, setSearch] = useState("");
  const [copiedShortcut, setCopiedShortcut] = useState<string | null>(null);

  const filteredPhrases = phrases.filter(
    (p) =>
      p.shortcut.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (phrase: SmartPhrase) => {
    navigator.clipboard.writeText(phrase.content);
    setCopiedShortcut(phrase.shortcut);
    setTimeout(() => setCopiedShortcut(null), 2000);
    onInsertPhrase?.(phrase);
  };

  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-4 space-y-4 max-w-sm", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-urvos-primary" />
          <h4 className="font-semibold text-sm text-urvos-text">Clinical Dot-Phrases (.macro)</h4>
        </div>
        <span className="text-[10px] text-urvos-text-subtle font-mono">{phrases.length} available</span>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-urvos-text-subtle" />
        <input
          type="text"
          placeholder="Filter by .shortcut or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-urvos-background border border-urvos-border rounded focus:outline-none"
        />
      </div>

      {/* PHRASE LIST */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.shortcut}
            className="p-2.5 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-primary/40 transition-colors space-y-1 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-urvos-primary">{phrase.shortcut}</span>
              <span className="text-[10px] text-urvos-text-subtle bg-urvos-surface px-1.5 py-0.5 border border-urvos-border rounded">
                {phrase.category}
              </span>
            </div>
            <div className="font-medium text-urvos-text truncate">{phrase.title}</div>
            <div className="text-[11px] text-urvos-text-subtle line-clamp-2 italic">"{phrase.content}"</div>

            <div className="pt-1.5 flex justify-end">
              <Button size="sm" variant="secondary" className="text-[10px] py-0.5 px-2" onClick={() => handleCopy(phrase)}>
                {copiedShortcut === phrase.shortcut ? <Check className="w-3 h-3 text-urvos-success mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedShortcut === phrase.shortcut ? "Copied" : "Insert"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
