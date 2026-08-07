"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { MessageSquare, Send, Phone, Video, Paperclip, Search, UserCircle2, CheckCheck, Clock } from "lucide-react";
import { Avatar } from "../../ui/Feedback";
import { Badge } from "../../ui/Badge";

const conversations = [
  { id: 1, name: "Dr. Priya Nair", role: "Cardiologist", lastMsg: "Please review ECG for MRN-8819", time: "2m", unread: 2, online: true, patientCtx: "Rajesh Kumar" },
  { id: 2, name: "Nurse Anita Desai", role: "ICU RN", lastMsg: "Potassium level critical — action?", time: "12m", unread: 1, online: true, patientCtx: "Bed 14A" },
  { id: 3, name: "Dr. Vikram Shah", role: "Radiologist", lastMsg: "CT chest report uploaded", time: "1h", unread: 0, online: false, patientCtx: "Meena Iyer" },
  { id: 4, name: "PharmD. Renu", role: "Pharmacist", lastMsg: "Drug interaction flagged on eRx", time: "3h", unread: 0, online: false, patientCtx: null },
];

const messages = [
  { id: 1, sender: "Dr. Priya Nair", mine: false, text: "Dr. Sharma, patient Rajesh Kumar (MRN-8819) is showing ST-depression on the ECG. Can you review?", time: "10:32 AM" },
  { id: 2, sender: "me", mine: true, text: "Reviewing now. What was his troponin at last draw?", time: "10:34 AM" },
  { id: 3, sender: "Dr. Priya Nair", mine: false, text: "Troponin I = 0.12 ng/mL (borderline). Repeat in 3h ordered.", time: "10:35 AM" },
  { id: 4, sender: "me", mine: true, text: "Agreed. Start aspirin 325mg stat + Ticagrelor 180mg loading. Prep cath lab on standby. I'll be there in 10.", time: "10:36 AM", read: true },
  { id: 5, sender: "Dr. Priya Nair", mine: false, text: "Roger. Cath lab notified. Patient is on O2 2L NC, stable BP 118/76.", time: "10:37 AM" },
];

export function SecureTeamMessaging({ className }: { className?: string }) {
  const [activeConv, setActiveConv] = useState(1);
  const [draft, setDraft] = useState("");
  const active = conversations.find(c => c.id === activeConv)!;

  return (
    <div className={clsx("h-[600px] flex overflow-hidden rounded-xl border border-urvos-border bg-urvos-surface font-sans text-urvos-text shadow-sm", className)}>
      {/* CONVERSATION LIST */}
      <div className="w-72 shrink-0 border-r border-urvos-border flex flex-col">
        <div className="p-3 border-b border-urvos-border space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-urvos-primary" /> Clinical Messaging</h2>
            <Badge variant="info" className="text-[10px]">HIPAA Secure</Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" />
            <input type="text" placeholder="Search colleagues..." className="w-full pl-8 pr-3 py-2 text-xs border border-urvos-border rounded-lg bg-urvos-background focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-urvos-border">
          {conversations.map(conv => (
            <button key={conv.id} onClick={() => setActiveConv(conv.id)} className={clsx("w-full text-left p-3 transition-colors hover:bg-urvos-background", activeConv === conv.id && "bg-urvos-primary/5 border-r-2 border-urvos-primary")}>
              <div className="flex items-start gap-2.5">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold">
                    {conv.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-urvos-success-bg rounded-full border-2 border-urvos-surface" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold truncate">{conv.name}</p>
                    <span className="text-[10px] text-urvos-text-subtle shrink-0 ml-1">{conv.time}</span>
                  </div>
                  <p className="text-[10px] text-urvos-primary font-medium">{conv.role}</p>
                  {conv.patientCtx && <p className="text-[10px] text-urvos-text-subtle truncate">📋 {conv.patientCtx}</p>}
                  <p className="text-[10px] text-urvos-text-subtle truncate mt-0.5">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && <span className="shrink-0 w-4 h-4 rounded-full bg-urvos-primary text-white text-[9px] font-bold flex items-center justify-center">{conv.unread}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-urvos-border bg-urvos-surface shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold">
                {active.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              {active.online && <span className="absolute bottom-0 right-0 w-2 h-2 bg-urvos-success-bg rounded-full border-2 border-urvos-surface" />}
            </div>
            <div>
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="text-[10px] text-urvos-text-subtle">{active.role} {active.online ? "· Online" : "· Offline"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {active.patientCtx && <Badge variant="info" className="text-[10px]">📋 {active.patientCtx}</Badge>}
            <button className="p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle" aria-label="Call"><Phone className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle" aria-label="Video"><Video className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-urvos-background/50">
          {messages.map(msg => (
            <div key={msg.id} className={clsx("flex", msg.mine ? "justify-end" : "justify-start")}>
              <div className={clsx("max-w-[75%] space-y-1")}>
                {!msg.mine && <p className="text-[10px] text-urvos-text-subtle px-1">{msg.sender}</p>}
                <div className={clsx("px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-xs", msg.mine ? "bg-urvos-primary text-white rounded-br-sm" : "bg-urvos-surface border border-urvos-border text-urvos-text rounded-bl-sm")}>
                  {msg.text}
                </div>
                <div className={clsx("flex items-center gap-1 text-[10px] text-urvos-text-subtle px-1", msg.mine && "justify-end")}>
                  <Clock className="w-2.5 h-2.5" /> {msg.time}
                  {msg.mine && msg.read && <CheckCheck className="w-3 h-3 text-urvos-primary" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HIPAA disclaimer */}
        <div className="px-4 py-1 bg-urvos-warning-bg border-t border-urvos-warning text-center text-[10px] text-urvos-warning shrink-0">
          🔒 This conversation is HIPAA-compliant and encrypted. Do not share patient data externally.
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-urvos-border bg-urvos-surface shrink-0">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle shrink-0"><Paperclip className="w-4 h-4" /></button>
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Type a secure message… (Shift+Enter for new line)"
              className="flex-1 px-3 py-2 text-xs border border-urvos-border rounded-xl bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
            />
            <button className={clsx("p-2 rounded-xl shrink-0 transition-colors", draft ? "bg-urvos-primary text-white" : "bg-urvos-border text-urvos-text-subtle")} aria-label="Send">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
