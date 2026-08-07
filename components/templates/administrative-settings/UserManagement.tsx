"use client";

import React from "react";
import { clsx } from "clsx";
import { Users, Plus, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Feedback";

export function UserManagement({ className }: { className?: string }) {
  const users = [
    { id: "USR-1", name: "Dr. Anita Sharma", role: "Attending Physician (MD)", email: "anita.sharma@fortis.in", status: "Active" },
    { id: "USR-2", name: "Nurse Sarah Jenkins", role: "Ward Nurse (RN)", email: "sarah.j@fortis.in", status: "Active" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Staff User Management & Role RBAC Permissions</h1>
          <p className="text-xs text-urvos-text-subtle">Provider accounts, HPR registration, role-based access control</p>
        </div>
        <Button size="sm">+ Add Staff Account</Button>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <Avatar name={u.name} size="sm" />
              <div>
                <div className="font-bold text-urvos-text">{u.name}</div>
                <div className="text-urvos-text-subtle">{u.role} • {u.email}</div>
              </div>
            </div>
            <Badge variant="success">{u.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
