export type ModuleType = 'recovery' | 'health' | 'content' | 'adp' | 'faith' | 'family' | 'mail' | 'debt';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type EventType = 'completion' | 'journal' | 'idea' | 'proof' | 'appointment' | 'promise' | 'post' | 'debt-action' | 'family-action' | 'meal' | 'launch-step';

export interface LifeEvent {
  id: string;
  timestamp: Date;
  module: ModuleType;
  title: string;
  eventType: EventType;
  note?: string;
  mediaType?: 'photo' | 'voice' | 'document' | 'none';
  evidenceRelevance?: 'high' | 'medium' | 'low' | 'none';
  contentPotential?: boolean;
  priority: Priority;
  completed?: boolean;
}

export interface LaunchStep {
  id: string;
  order: number;
  title: string;
  module: ModuleType;
  completed: boolean;
  isRescueStep: boolean;
}

export interface Discipline {
  id: string;
  title: string;
  module: ModuleType;
  timeBlock: 'am' | 'day' | 'pm' | 'weekly';
  why: string;
  when: string;
  unlocks: string;
  completed: boolean;
  contentTrigger?: boolean;
}

export interface Promise {
  id: string;
  promise: string;
  person: string;
  due: string;
  status: 'pending' | 'done' | 'overdue';
  trustImpact: 'high' | 'medium' | 'low';
  module: ModuleType;
}

export interface Appointment {
  id: string;
  type: string;
  date: string;
  nextMove: string;
  impactArea: string;
  outcome?: string;
  attachments: string[];
  module: ModuleType;
}

export interface DebtItem {
  id: string;
  creditor: string;
  balance: number;
  status: string;
  nextMove: string;
  paymentPlan?: string;
  module: ModuleType;
}

export interface MealEntry {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  summary: string;
  swAlignment: 'on-plan' | 'mostly' | 'off-plan';
  freeFood: boolean;
  healthyExtras: string;
  energyCheck?: string;
  bodyConfidence?: string;
  timestamp: Date;
}

export interface FamilyContact {
  id: string;
  name: string;
  relationship: string;
  lastContact?: string;
  nextReminder?: string;
  notes: string[];
}

export const MODULE_LABELS: Record<ModuleType, string> = {
  recovery: 'Recovery',
  health: 'Health',
  content: 'Content',
  adp: 'ADP',
  faith: 'Faith',
  family: 'Family',
  mail: 'Mail',
  debt: 'Debt',
};
