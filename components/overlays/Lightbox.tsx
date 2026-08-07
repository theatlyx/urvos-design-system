"use client";

import React from "react";
import { clsx } from "clsx";
import { X, ZoomIn } from "lucide-react";
import { Portal } from "../utilities/Portal";

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  title?: string;
}

export function Lightbox({ isOpen, onClose, src, alt = "", title }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close image lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="max-w-4xl max-h-[85vh] flex flex-col items-center space-y-2">
          {title && <h3 className="text-white text-base font-semibold">{title}</h3>}
          <img src={src} alt={alt} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" />
        </div>
      </div>
    </Portal>
  );
}
