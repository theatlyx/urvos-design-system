"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Inbox, Bell, AlertTriangle, FileText, Search, Filter, MoreVertical, Reply, CheckCircle2, CheckCircle, Printer } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Feedback";

type MessageCategory = "all" | "direct" | "labs" | "system";

export interface UnifiedClinicalInboxProps {
  className?: string;
}

export function UnifiedClinicalInbox({ className }: UnifiedClinicalInboxProps) {
  const [activeCategory, setActiveCategory] = useState<MessageCategory>("all");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);

  const messages = [
    {
      id: 1,
      category: "direct",
      sender: "Dr. Sarah Jenkins",
      subject: "Consultation Request: Patient John Doe",
      preview: "Hi Rajesh, I have a complex cardiology case I'd like your opinion on...",
      time: "10:42 AM",
      unread: true,
      urgent: false,
    },
    {
      id: 2,
      category: "labs",
      sender: "Lab System",
      subject: "Critical Value: Potassium 6.2 mEq/L",
      preview: "Patient: Alice Smith. Ordered by: Dr. Rajesh Kumar. Value requires immediate attention.",
      time: "09:15 AM",
      unread: true,
      urgent: true,
    },
    {
      id: 3,
      category: "system",
      sender: "IT Administrator",
      subject: "Scheduled Downtime Tonight",
      preview: "The EHR system will be down for maintenance from 2:00 AM to 4:00 AM.",
      time: "Yesterday",
      unread: false,
      urgent: false,
    },
    {
      id: 4,
      category: "direct",
      sender: "Nurse Jackie",
      subject: "Discharge instructions for Bed 4",
      preview: "Could you review and sign the discharge summary for Mr. Patel?",
      time: "Yesterday",
      unread: false,
      urgent: false,
    }
  ];

  const filteredMessages = messages.filter(m => activeCategory === "all" || m.category === activeCategory);

  return (
    <div className={clsx("h-[800px] max-h-screen flex flex-col bg-urvos-background font-sans text-urvos-text border border-urvos-border rounded-xl overflow-hidden shadow-sm", className)}>
      
      {/* Top Header */}
      <header className="h-16 flex-shrink-0 border-b border-urvos-border bg-urvos-surface flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-urvos-primary/10 flex items-center justify-center text-urvos-primary">
            <Inbox className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-semibold">Clinical Inbox</h1>
          <Badge variant="caution" className="ml-2">2 Unread</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
            />
          </div>
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Message List */}
        <div className="w-full md:w-1/3 flex-shrink-0 border-r border-urvos-border bg-urvos-surface flex flex-col">
          {/* Categories */}
          <div className="flex p-2 gap-1 border-b border-urvos-border overflow-x-auto">
            <button 
              onClick={() => setActiveCategory("all")}
              className={clsx("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "all" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover")}
            >
              All Messages
            </button>
            <button 
              onClick={() => setActiveCategory("direct")}
              className={clsx("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "direct" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover")}
            >
              Direct
            </button>
            <button 
              onClick={() => setActiveCategory("labs")}
              className={clsx("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap flex items-center gap-1", activeCategory === "labs" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover")}
            >
              Labs <span className="w-2 h-2 rounded-full bg-urvos-danger-bg"></span>
            </button>
            <button 
              onClick={() => setActiveCategory("system")}
              className={clsx("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "system" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover")}
            >
              System Alerts
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map(msg => (
              <div 
                key={msg.id} 
                onClick={() => setSelectedMessage(msg.id)}
                className={clsx(
                  "p-4 border-b border-urvos-border cursor-pointer transition-colors relative",
                  selectedMessage === msg.id ? "bg-urvos-primary/5 border-l-2 border-l-urvos-primary" : "hover:bg-urvos-surface-hover border-l-2 border-l-transparent",
                  msg.unread ? "font-semibold" : "font-normal"
                )}
              >
                {msg.unread && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-urvos-primary"></div>}
                
                <div className="flex justify-between items-start mb-1 pr-4">
                  <span className="text-sm truncate mr-2">{msg.sender}</span>
                  <span className="text-xs text-urvos-text-subtle whitespace-nowrap">{msg.time}</span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-1">
                  {msg.urgent && <AlertTriangle className="w-3.5 h-3.5 text-urvos-danger" />}
                  <h4 className="text-sm truncate">{msg.subject}</h4>
                </div>
                
                <p className="text-xs text-urvos-text-subtle line-clamp-2">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane - Message Detail */}
        <div className="hidden md:flex flex-1 bg-urvos-background flex-col">
          {selectedMessage ? (
            <>
              {/* Detail Header */}
              <div className="p-6 border-b border-urvos-border bg-urvos-surface">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {messages.find(m => m.id === selectedMessage)?.urgent && <Badge variant="critical" className="mr-2 mb-1 align-middle">URGENT</Badge>}
                      {messages.find(m => m.id === selectedMessage)?.subject}
                    </h2>
                    <div className="flex items-center gap-3">
                      <Avatar name={messages.find(m => m.id === selectedMessage)?.sender || "U"} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{messages.find(m => m.id === selectedMessage)?.sender}</p>
                        <p className="text-xs text-urvos-text-subtle">To: You • {messages.find(m => m.id === selectedMessage)?.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" title="Mark as Read/Unread">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Detail Body */}
              <div className="p-8 flex-1 overflow-y-auto">
                {messages.find(m => m.id === selectedMessage)?.category === "labs" ? (
                  <Card className="p-5 border-urvos-danger bg-urvos-danger-bg/50 shadow-none mb-6">
                    <div className="flex items-center gap-2 text-urvos-danger font-semibold mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      Critical Lab Result
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                      <div>
                        <p className="text-urvos-text-subtle">Patient</p>
                        <p className="font-medium">Alice Smith (DOB: 12/04/1980)</p>
                      </div>
                      <div>
                        <p className="text-urvos-text-subtle">Collected</p>
                        <p className="font-medium">Today, 08:30 AM</p>
                      </div>
                      <div className="col-span-2 p-3 bg-white rounded border border-urvos-danger">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Potassium (K) Level</span>
                          <span className="text-urvos-danger font-bold text-lg">6.2 mEq/L</span>
                        </div>
                        <p className="text-xs text-urvos-text-subtle mt-1">Reference Range: 3.6 - 5.2 mEq/L</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button size="sm" variant="primary">Open Patient Chart</Button>
                      <Button size="sm" variant="secondary">Acknowledge</Button>
                    </div>
                  </Card>
                ) : (
                  <div className="prose prose-sm max-w-none text-urvos-text">
                    <p>Hi Rajesh,</p>
                    <p>I have a complex cardiology case I'd like your opinion on. The patient presented with atypical chest pain and has a history of severe hypertension.</p>
                    <p>I've attached the latest EKG and echo reports. Could we briefly discuss this during lunch?</p>
                    <p>Thanks,<br/>Sarah</p>
                  </div>
                )}

                {/* Attachments if any */}
                {messages.find(m => m.id === selectedMessage)?.category === "direct" && (
                  <div className="mt-8 border-t border-urvos-border pt-6">
                    <h4 className="text-sm font-medium mb-3">Attachments (2)</h4>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 p-2.5 border border-urvos-border rounded-lg bg-urvos-surface w-48 cursor-pointer hover:border-urvos-primary transition-colors">
                        <div className="w-8 h-8 bg-urvos-glass text-urvos-primary rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-medium truncate">EKG_Tracing_Oct24.pdf</p>
                          <p className="text-[10px] text-urvos-text-subtle">1.2 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 border border-urvos-border rounded-lg bg-urvos-surface w-48 cursor-pointer hover:border-urvos-primary transition-colors">
                        <div className="w-8 h-8 bg-urvos-glass text-urvos-primary rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-medium truncate">Echo_Report.pdf</p>
                          <p className="text-[10px] text-urvos-text-subtle">450 KB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-urvos-text-subtle">
              <Inbox className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
