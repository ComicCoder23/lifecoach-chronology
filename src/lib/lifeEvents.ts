import { useEffect, useState } from 'react';
import type { ModuleType } from '@/types';

export const LIFE_EVENTS_KEY = 'life-os-events';
const LIFE_EVENTS_CHANGED = 'life-os-events-changed';

export type LifeOsEventType = 'promise' | 'appointment' | 'discipline' | 'capture' | 'content-post' | 'adp';

export interface LifeOsEvent {
  id: string;
  type: LifeOsEventType;
  sourceId: string;
  module: ModuleType;
  title: string;
  date: string;
  timestamp: number;
  note?: string;
  status?: string;
  completed?: boolean;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export const readLifeEvents = (): LifeOsEvent[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LIFE_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLifeEvents = (events: LifeOsEvent[]) => {
  window.localStorage.setItem(LIFE_EVENTS_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent(LIFE_EVENTS_CHANGED));
};

export const upsertLifeEvent = (event: LifeOsEvent) => {
  const events = readLifeEvents();
  const next = [event, ...events.filter(e => !(e.type === event.type && e.sourceId === event.sourceId))]
    .sort((a, b) => b.timestamp - a.timestamp);
  writeLifeEvents(next);
};

export function useLifeEvents() {
  const [events, setEvents] = useState<LifeOsEvent[]>(readLifeEvents);

  useEffect(() => {
    const sync = () => setEvents(readLifeEvents());
    window.addEventListener('storage', sync);
    window.addEventListener(LIFE_EVENTS_CHANGED, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(LIFE_EVENTS_CHANGED, sync);
    };
  }, []);

  return events;
}