"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { CreditCard, QrCode, DollarSign, CheckCircle2, Receipt } from "lucide-react";
import { Button } from "../ui/Button";

export interface CollectPaymentPanelProps {
  patientName: string;
  encounterId: string;
  dueAmount: string;
  onProcessPayment?: (method: "Card" | "UPI" | "Cash", amount: string) => void;
  className?: string;
}

export function CollectPaymentPanel({
  patientName,
  encounterId,
  dueAmount,
  onProcessPayment,
  className,
}: CollectPaymentPanelProps) {
  const [method, setMethod] = useState<"Card" | "UPI" | "Cash">("UPI");
  const [amount, setAmount] = useState(dueAmount.replace(/[^0-9]/g, ""));
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    onProcessPayment?.(method, amount);
    setIsSuccess(true);
  };

  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4 max-w-sm", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-urvos-primary" />
          <div>
            <h4 className="font-semibold text-base text-urvos-text">Point of Care Payment</h4>
            <p className="text-xs text-urvos-text-subtle">
              Patient: <strong>{patientName}</strong> ({encounterId})
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-4 bg-urvos-success-bg border border-urvos-success/20 rounded-lg text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-urvos-success mx-auto" />
          <div className="font-bold text-sm text-urvos-success">Payment Collected Successfully</div>
          <div className="text-xs text-urvos-text-subtle">Receipt #RCT-99182 sent via SMS to patient.</div>
          <Button size="sm" variant="secondary" onClick={() => setIsSuccess(false)}>
            Collect Another Payment
          </Button>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          {/* METHOD SELECTOR */}
          <div className="grid grid-cols-3 gap-2">
            {(["UPI", "Card", "Cash"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={clsx(
                  "p-2.5 rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all",
                  method === m
                    ? "border-urvos-primary bg-urvos-primary/10 text-urvos-primary font-bold shadow-xs"
                    : "border-urvos-border bg-urvos-background text-urvos-text-subtle"
                )}
              >
                {m === "UPI" ? <QrCode className="w-4 h-4" /> : m === "Card" ? <CreditCard className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                <span>{m}</span>
              </button>
            ))}
          </div>

          {/* AMOUNT INPUT */}
          <div className="space-y-1">
            <label className="font-semibold text-urvos-text">Amount to Collect (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm font-bold border border-urvos-border rounded bg-urvos-background focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>

          <Button size="sm" className="w-full" onClick={handlePay}>
            Process ₹{amount} ({method})
          </Button>
        </div>
      )}
    </div>
  );
}
