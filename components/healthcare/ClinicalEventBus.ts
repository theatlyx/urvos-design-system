export type ClinicalEventType = 
  | 'TREATMENT_CREATED'
  | 'TREATMENT_UPDATED'
  | 'TREATMENT_REMOVED'
  | 'FINDING_CREATED'
  | 'FINDING_UPDATED'
  | 'FINDING_REMOVED'
  | 'SURFACE_MODIFIED'
  | 'NOTE_ADDED'
  | 'ENCOUNTER_STATUS_CHANGED';

export interface ClinicalEvent {
  id: string;
  type: ClinicalEventType;
  encounterId?: string;
  toothId?: string;
  recordId?: string;
  payload?: any;
  timestamp: string;
  providerId?: string;
}

type EventCallback = (event: ClinicalEvent) => void;

class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  subscribe(eventType: ClinicalEventType | '*', callback: EventCallback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    return () => this.unsubscribe(eventType, callback);
  }

  unsubscribe(eventType: ClinicalEventType | '*', callback: EventCallback) {
    if (!this.listeners[eventType]) return;
    this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
  }

  publish(event: Omit<ClinicalEvent, 'id' | 'timestamp'>) {
    const fullEvent: ClinicalEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };

    if (this.listeners[fullEvent.type]) {
      this.listeners[fullEvent.type].forEach(cb => cb(fullEvent));
    }
    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => cb(fullEvent));
    }
  }
}

export const ClinicalEventBus = new EventBus();
