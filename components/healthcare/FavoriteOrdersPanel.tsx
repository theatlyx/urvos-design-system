"use client";

import React from "react";
import { clsx } from "clsx";
import { Star, Pill, TestTube, Plus, Check } from "lucide-react";
import { Button } from "../ui/Button";

export interface OrderTemplate {
  id: string;
  name: string;
  type: "Medication" | "Laboratory" | "Imaging" | "Procedure";
  details: string;
  frequency?: string;
}

export interface FavoriteOrdersPanelProps {
  orders: OrderTemplate[];
  onAddOrder?: (order: OrderTemplate) => void;
  className?: string;
}

export function FavoriteOrdersPanel({ orders, onAddOrder, className }: FavoriteOrdersPanelProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-4 space-y-3 max-w-sm", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-2">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-urvos-warning fill-urvos-warning" />
          <h4 className="font-semibold text-sm text-urvos-text">Favorite Clinical Order Sets</h4>
        </div>
      </div>

      <div className="space-y-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-3 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-primary/30 transition-colors flex items-center justify-between gap-2 text-xs"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center space-x-2">
                {order.type === "Medication" ? <Pill className="w-3.5 h-3.5 text-urvos-primary" /> : <TestTube className="w-3.5 h-3.5 text-urvos-success" />}
                <span className="font-bold text-urvos-text truncate">{order.name}</span>
              </div>
              <div className="text-[11px] text-urvos-text-subtle truncate">{order.details}</div>
            </div>

            {onAddOrder && (
              <Button size="sm" variant="secondary" className="text-[11px] py-1 px-2 shrink-0" onClick={() => onAddOrder(order)}>
                <Plus className="w-3 h-3 mr-0.5" /> Order
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
