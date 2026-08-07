"use client";

import React, { useRef, useState } from "react";
import { clsx } from "clsx";
import { PenTool, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export interface SignatureCaptureProps {
  signatoryName: string;
  signatoryRole: string;
  onSaveSignature?: (signatureDataUrl: string) => void;
  className?: string;
}

export function SignatureCapture({
  signatoryName,
  signatoryRole,
  onSaveSignature,
  className,
}: SignatureCaptureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0B5B8E";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSigned) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSaveSignature?.(dataUrl);
  };

  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4 max-w-md", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center space-x-2">
          <PenTool className="w-5 h-5 text-urvos-primary" />
          <div>
            <h4 className="font-semibold text-base text-urvos-text">Digital Signature Capture</h4>
            <p className="text-xs text-urvos-text-subtle">
              Signatory: <strong>{signatoryName}</strong> ({signatoryRole})
            </p>
          </div>
        </div>
      </div>

      {/* CANVAS CONTAINER */}
      <div className="relative border border-dashed border-urvos-border rounded-lg bg-urvos-background overflow-hidden flex flex-col items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={380}
          height={140}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair bg-urvos-surface rounded shadow-inner"
        />

        {!hasSigned && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-urvos-text-subtle italic">
            Draw electronic signature above using mouse or touch...
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <button onClick={handleClear} className="flex items-center space-x-1 text-urvos-text-subtle hover:text-urvos-text">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Signature</span>
        </button>

        <Button size="sm" onClick={handleSave} disabled={!hasSigned}>
          <CheckCircle2 className="w-4 h-4 mr-1" /> Apply Signature & Lock
        </Button>
      </div>
    </div>
  );
}
