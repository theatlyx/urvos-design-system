"use client";

import React, { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { Search, Command, X, User, FileText, Pill, Calendar } from "lucide-react";

export interface SearchResult {
  id: string;
  type: "patient" | "document" | "medication" | "appointment";
  title: string;
  subtitle?: string;
  url: string;
}

interface GlobalSearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  results?: SearchResult[];
  className?: string;
}

export function GlobalSearchBox({ 
  placeholder = "Search patients, records, or press Cmd+K", 
  onSearch, 
  results = [], 
  className 
}: GlobalSearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "patient": return <User className="w-4 h-4 text-blue-500" />;
      case "document": return <FileText className="w-4 h-4 text-emerald-500" />;
      case "medication": return <Pill className="w-4 h-4 text-amber-500" />;
      case "appointment": return <Calendar className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className={clsx("relative w-full max-w-lg", className)} ref={containerRef}>
      <div className={clsx(
        "relative flex items-center px-4 py-2.5 rounded-full border transition-all duration-200 bg-urvos-surface",
        isFocused ? "border-urvos-primary shadow-urvos-glow" : "border-urvos-border shadow-urvos-soft hover:border-urvos-border-hover"
      )}>
        <Search className={clsx("w-5 h-5 shrink-0 transition-colors", isFocused ? "text-urvos-primary" : "text-urvos-text-subtle")} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-sm font-medium text-urvos-ink placeholder:text-urvos-text-muted px-3"
        />

        {query ? (
          <button 
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="p-1 rounded-full text-urvos-text-subtle hover:bg-urvos-surface-alt hover:text-urvos-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-urvos-surface-alt border border-urvos-border shrink-0">
            <Command className="w-3 h-3 text-urvos-text-subtle" />
            <span className="text-[10px] font-semibold text-urvos-text-subtle">K</span>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-urvos-surface border border-urvos-border rounded-xl shadow-urvos-popout z-urvos-dropdown overflow-hidden">
          {results.length > 0 ? (
            <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-urvos-surface-alt transition-colors group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-urvos-surface border border-urvos-border group-hover:border-urvos-border-hover transition-colors shrink-0">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-urvos-ink truncate">
                      {result.title}
                    </div>
                    {result.subtitle && (
                      <div className="text-xs text-urvos-text-subtle truncate">
                        {result.subtitle}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-8 h-8 mx-auto text-urvos-text-subtle mb-3 opacity-50" />
              <p className="text-sm font-medium text-urvos-ink">No results found for "{query}"</p>
              <p className="text-xs text-urvos-text-subtle mt-1">Try checking for typos or using different keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
