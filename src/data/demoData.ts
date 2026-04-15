import { LaunchStep, Discipline, Promise, Appointment, DebtItem, LifeEvent, FamilyContact, MealEntry } from '@/types';

export const launchSteps: LaunchStep[] = [
  { id: 'l1', order: 1, title: 'Morning Prayer', module: 'faith', completed: false, isRescueStep: true },
  { id: 'l2', order: 2, title: 'Read Gratitude List From Last Night', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l3', order: 3, title: 'Read Just For Today Card', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l4', order: 4, title: 'Read Big Book Page', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l5', order: 5, title: 'Boot PC + Open Today View', module: 'content', completed: false, isRescueStep: false },
  { id: 'l6', order: 6, title: 'Brush Teeth', module: 'health', completed: false, isRescueStep: false },
  { id: 'l7', order: 7, title: 'Coffee + Collagen + Creatine Ritual', module: 'health', completed: true, isRescueStep: true },
  { id: 'l8', order: 8, title: 'NG Stack + Meds', module: 'health', completed: false, isRescueStep: false },
  { id: 'l9', order: 9, title: 'Morning Inspiration WhatsApp + Jesus I\'m Learning Facebook', module: 'content', completed: false, isRescueStep: true },
  { id: 'l10', order: 10, title: 'Review Today + Follow Suggested Steps', module: 'recovery', completed: false, isRescueStep: true },
  { id: 'l11', order: 11, title: 'Faith / Grace Seed', module: 'faith', completed: false, isRescueStep: false },
];

export const disciplines: Discipline[] = [
  { id: 'd1', title: 'Morning Prayer', module: 'faith', timeBlock: 'am', why: 'Centres the day in gratitude', when: 'First thing', unlocks: 'Clarity & peace', completed: false },
  { id: 'd2', title: 'Supplements & Meds', module: 'health', timeBlock: 'am', why: 'Brain health & energy', when: '8-9am', unlocks: 'Focus all day', completed: true },
  { id: 'd3', title: 'Post Content', module: 'content', timeBlock: 'day', why: 'Build audience & purpose', when: 'Mid-morning', unlocks: 'Growth & identity', completed: false, contentTrigger: true },
  { id: 'd4', title: 'Walk / Movement', module: 'health', timeBlock: 'day', why: 'Mood, joints, weight', when: 'Afternoon', unlocks: 'Energy + SW alignment', completed: false },
  { id: 'd5', title: 'Evening Gratitude List', module: 'recovery', timeBlock: 'pm', why: 'Recovery anchor', when: 'Before bed', unlocks: 'Tomorrow\'s launch', completed: false },
  { id: 'd6', title: 'Meal Log', module: 'health', timeBlock: 'pm', why: 'SW accountability', when: 'After dinner', unlocks: 'Weight loss momentum', completed: false },
  { id: 'd7', title: 'Weekly Review', module: 'recovery', timeBlock: 'weekly', why: 'See the bigger picture', when: 'Sunday PM', unlocks: 'Growth awareness', completed: false },
];

export const promises: Promise[] = [
  { id: 'p1', promise: 'Visit Mum this week', person: 'Linda (Mum)', due: '2026-04-19', status: 'pending', trustImpact: 'high', module: 'family' },
  { id: 'p2', promise: 'Reply to Lisa about weekend', person: 'Lisa', due: '2026-04-16', status: 'pending', trustImpact: 'medium', module: 'family' },
  { id: 'p3', promise: 'Babysit for Danielle Saturday', person: 'Danielle', due: '2026-04-19', status: 'pending', trustImpact: 'high', module: 'family' },
  { id: 'p4', promise: 'Call Alistair re: garden help', person: 'Alistair', due: '2026-04-17', status: 'overdue', trustImpact: 'medium', module: 'family' },
];

export const appointments: Appointment[] = [
  { id: 'a1', type: 'GP', date: '2026-04-21', nextMove: 'Discuss fatigue levels + meds review', impactArea: 'Health + ADP', outcome: '', attachments: [], module: 'health' },
  { id: 'a2', type: 'Psychiatry', date: '2026-04-28', nextMove: 'Medication review + mood update', impactArea: 'Mental Health + ADP', outcome: '', attachments: [], module: 'health' },
  { id: 'a3', type: 'OT', date: '2026-05-05', nextMove: 'Energy management review', impactArea: 'Daily function + ADP', outcome: '', attachments: [], module: 'adp' },
  { id: 'a4', type: 'MSK Physio', date: '2026-05-10', nextMove: 'Shoulder progress check', impactArea: 'Mobility + ADP', outcome: '', attachments: [], module: 'health' },
];

export const debtItems: DebtItem[] = [
  { id: 'db1', creditor: 'Credit Card A', balance: 2400, status: 'Payment plan active', nextMove: 'Min payment due 25th', paymentPlan: '£45/month', module: 'debt' },
  { id: 'db2', creditor: 'Catalogue Account', balance: 680, status: 'Paying down', nextMove: 'Clear by July target', paymentPlan: '£80/month', module: 'debt' },
  { id: 'db3', creditor: 'Credit Builder Card', balance: 120, status: 'Using for rebuild', nextMove: 'Keep utilisation under 30%', module: 'debt' },
];

export const familyContacts: FamilyContact[] = [
  { id: 'f1', name: 'Linda (Mum)', relationship: 'Mother', lastContact: '2026-04-12', nextReminder: '2026-04-19', notes: ['Visited Saturday, she was in good spirits'] },
  { id: 'f2', name: 'Lisa', relationship: 'Sister', lastContact: '2026-04-10', nextReminder: '2026-04-16', notes: ['Needs reply about weekend plans'] },
  { id: 'f3', name: 'Danielle', relationship: 'Sister', lastContact: '2026-04-13', nextReminder: '2026-04-19', notes: ['Babysitting confirmed for Saturday'] },
  { id: 'f4', name: 'Alistair', relationship: 'Brother', lastContact: '2026-04-05', nextReminder: '2026-04-17', notes: ['Offered to help with garden - follow up'] },
];

export const recentEvents: LifeEvent[] = [
  { id: 'e1', timestamp: new Date('2026-04-15T07:30:00'), module: 'faith', title: 'Morning Prayer', eventType: 'completion', priority: 'high', completed: true },
  { id: 'e2', timestamp: new Date('2026-04-15T07:45:00'), module: 'health', title: 'Coffee + Collagen + Creatine', eventType: 'completion', priority: 'medium', completed: true },
  { id: 'e3', timestamp: new Date('2026-04-14T20:00:00'), module: 'recovery', title: 'Evening Gratitude List', eventType: 'journal', note: 'Grateful for clear head, good walk, Mum visit', priority: 'high', completed: true },
  { id: 'e4', timestamp: new Date('2026-04-14T14:00:00'), module: 'content', title: 'Posted recovery reflection on Facebook', eventType: 'post', note: '23 likes, 4 shares', priority: 'medium', completed: true, contentPotential: true },
  { id: 'e5', timestamp: new Date('2026-04-14T10:00:00'), module: 'adp', title: 'GP letter received — fatigue evidence', eventType: 'proof', note: 'Strong evidence for ADP review', priority: 'critical', evidenceRelevance: 'high', mediaType: 'document', completed: true },
  { id: 'e6', timestamp: new Date('2026-04-13T12:00:00'), module: 'family', title: 'Visited Mum', eventType: 'family-action', note: 'Good visit, she was happy', priority: 'high', completed: true },
  { id: 'e7', timestamp: new Date('2026-04-13T18:30:00'), module: 'health', title: 'SW Dinner — chicken stir fry', eventType: 'meal', note: 'On plan, felt good', priority: 'medium', completed: true },
  { id: 'e8', timestamp: new Date('2026-04-12T09:00:00'), module: 'debt', title: 'Credit card payment sent', eventType: 'debt-action', note: '£45 min payment', priority: 'medium', completed: true },
];

export const demoMeals: MealEntry[] = [
  { id: 'm1', mealType: 'breakfast', summary: 'Overnight oats with berries & fat-free yoghurt', swAlignment: 'on-plan', freeFood: true, healthyExtras: 'HEb — oats', timestamp: new Date('2026-04-15T08:00:00') },
  { id: 'm2', mealType: 'lunch', summary: 'Jacket potato, beans, side salad', swAlignment: 'on-plan', freeFood: true, healthyExtras: 'None used', timestamp: new Date('2026-04-15T12:30:00') },
  { id: 'm3', mealType: 'dinner', summary: 'Chicken stir fry with noodles', swAlignment: 'mostly', freeFood: true, healthyExtras: 'HEa — cheese', energyCheck: 'Good energy 90 mins later', timestamp: new Date('2026-04-14T18:30:00') },
];
