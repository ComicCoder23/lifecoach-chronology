import { LaunchStep, Discipline, Promise, Appointment, DebtItem, LifeEvent, FamilyContact, MealEntry } from '@/types';

// ===== LAUNCH STACKS =====
export interface StackItem {
  id: string;
  title: string;
  completed: boolean;
  contentTrigger?: boolean;
}

export interface LaunchStack {
  id: string;
  name: string;
  module: import('@/types').ModuleType;
  priority: number; // lower = higher priority
  icon: string;
  items: StackItem[];
}

export const launchStacks: LaunchStack[] = [
  {
    id: 'stack-aa',
    name: 'AA Stack',
    module: 'recovery',
    priority: 1,
    icon: '🟢',
    items: [
      { id: 'aa1', title: 'Morning Prayer', completed: false },
      { id: 'aa2', title: 'Read Gratitude List From Last Night', completed: false },
      { id: 'aa3', title: 'Read Just For Today Card', completed: false },
      { id: 'aa4', title: 'Read Big Book Page', completed: false },
      { id: 'aa5', title: 'Call 3 Alcoholics', completed: false },
      { id: 'aa6', title: 'Sponsor Check-In', completed: false },
      { id: 'aa7', title: 'Attend Meeting / Zoom Fallback', completed: false },
      { id: 'aa8', title: 'Service Task', completed: false },
      { id: 'aa9', title: 'Help Someone Anonymously', completed: false },
      { id: 'aa10', title: 'Evening Inventory Handoff', completed: false },
    ],
  },
  {
    id: 'stack-faith',
    name: 'Faith Reset + Content Seed',
    module: 'faith',
    priority: 2,
    icon: '✝️',
    items: [
      { id: 'fa1', title: 'Daily Verse', completed: false },
      { id: 'fa2', title: 'Short Reflection', completed: false },
      { id: 'fa3', title: 'Suggested Facebook Post Hook', completed: false, contentTrigger: true },
      { id: 'fa4', title: 'Prayer Note (optional)', completed: false },
    ],
  },
  {
    id: 'stack-nutrition',
    name: 'Nutrition + Med Stack',
    module: 'health',
    priority: 3,
    icon: '💊',
    items: [
      { id: 'nu1', title: 'Coffee Ritual', completed: true },
      { id: 'nu2', title: 'Collagen', completed: true },
      { id: 'nu3', title: 'Creatine', completed: false },
      { id: 'nu4', title: 'NG Stack', completed: false },
      { id: 'nu5', title: 'Capsules', completed: false },
      { id: 'nu6', title: 'Prescribed Meds', completed: false },
      { id: 'nu7', title: 'Hydration (500ml+)', completed: false },
    ],
  },
  {
    id: 'stack-content',
    name: 'Content Stack',
    module: 'content',
    priority: 4,
    icon: '📱',
    items: [
      { id: 'co1', title: 'CSD — Choosing Sobriety Daily WhatsApp', completed: false, contentTrigger: true },
      { id: 'co2', title: 'Jesus I\'m Learning Facebook', completed: false, contentTrigger: true },
      { id: 'co3', title: 'Pick Post Topic', completed: false, contentTrigger: true },
    ],
  },
  {
    id: 'stack-productivity',
    name: 'Open Today Command Centre',
    module: 'content',
    priority: 5,
    icon: '📋',
    items: [
      { id: 'pr1', title: 'Open Calendar', completed: false },
      { id: 'pr2', title: 'Review Diary Notes', completed: false },
      { id: 'pr3', title: 'Check Appointments', completed: false },
      { id: 'pr4', title: 'Check Family Promises', completed: false },
      { id: 'pr5', title: 'Check Debt / Post Deadlines', completed: false },
    ],
  },
];

// Content prompt suggestions
export const contentPrompts = [
  { id: 'cp1', source: 'Bible Verse', hook: 'What today\'s verse taught me about letting go...' },
  { id: 'cp2', source: 'Big Book Reading', hook: 'The page that hit different this morning...' },
  { id: 'cp3', source: 'Current Struggle', hook: 'Real talk: here\'s what I\'m working through right now...' },
  { id: 'cp4', source: 'Yesterday\'s Win', hook: 'Small win, big meaning — yesterday I...' },
  { id: 'cp5', source: 'Health Milestone', hook: 'My body is changing and here\'s what I notice...' },
];

// Keep backward-compat flat list for dashboard
export const launchSteps: LaunchStep[] = [
  { id: 'l1', order: 1, title: 'Morning Prayer', module: 'faith', completed: false, isRescueStep: true },
  { id: 'l2', order: 2, title: 'Read Gratitude List From Last Night', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l3', order: 3, title: 'Read Just For Today Card', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l4', order: 4, title: 'Read Big Book Page', module: 'recovery', completed: false, isRescueStep: false },
  { id: 'l5', order: 5, title: 'Boot PC + Open Today Command Centre', module: 'content', completed: false, isRescueStep: false },
  { id: 'l6', order: 6, title: 'Brush Teeth', module: 'health', completed: false, isRescueStep: false },
  { id: 'l7', order: 7, title: 'Coffee + Collagen + Creatine Ritual', module: 'health', completed: true, isRescueStep: true },
  { id: 'l8', order: 8, title: 'NG Stack + Meds', module: 'health', completed: false, isRescueStep: false },
  { id: 'l9', order: 9, title: 'CSD — Choosing Sobriety Daily WhatsApp + Jesus I\'m Learning Facebook', module: 'content', completed: false, isRescueStep: true },
  { id: 'l10', order: 10, title: 'Open Today Command Centre', module: 'recovery', completed: false, isRescueStep: true },
  { id: 'l11', order: 11, title: 'Faith Reset + Content Seed', module: 'faith', completed: false, isRescueStep: false },
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
  { id: 'p3', promise: 'Babysit for Dannielle Saturday', person: 'Dannielle', due: '2026-04-19', status: 'pending', trustImpact: 'high', module: 'family' },
  { id: 'p4', promise: 'Call Alasdair re: garden help', person: 'Alasdair', due: '2026-04-17', status: 'overdue', trustImpact: 'medium', module: 'family' },
  { id: 'p5', promise: 'Send birthday card to Alara', person: 'Alara', due: '2026-04-25', status: 'pending', trustImpact: 'medium', module: 'family' },
  { id: 'p6', promise: 'FaceTime Hailie Bailie', person: 'Hailie Bailie', due: '2026-04-20', status: 'pending', trustImpact: 'medium', module: 'family' },
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
  {
    id: 'f1', name: 'Linda', relationship: 'Mum', lastContact: '2026-04-12', nextReminder: '2026-04-19',
    birthday: '15/06', contactCadence: 'weekly', visitCadence: 'weekly',
    notes: ['Visited Saturday, she was in good spirits'],
    smartPrompts: ['Send flowers to Mum 💐', 'Call to check in after GP appointment'],
  },
  {
    id: 'f2', name: 'Lisa', relationship: 'Sister', lastContact: '2026-04-10', nextReminder: '2026-04-16',
    birthday: '22/09', contactCadence: 'weekly', visitCadence: 'fortnightly',
    notes: ['Needs reply about weekend plans'],
    smartPrompts: ['Reply about weekend plans'],
  },
  {
    id: 'f3', name: 'Dannielle', relationship: 'Sister', lastContact: '2026-04-13', nextReminder: '2026-04-19',
    birthday: '08/03', contactCadence: 'weekly', visitCadence: 'weekly',
    notes: ['Babysitting confirmed for Saturday'],
    smartPrompts: ['Confirm babysitting details'],
  },
  {
    id: 'f4', name: 'Alasdair', relationship: 'Brother', lastContact: '2026-04-05', nextReminder: '2026-04-17',
    birthday: '30/11', contactCadence: 'fortnightly', visitCadence: 'monthly',
    notes: ['Offered to help with garden — follow up'],
    smartPrompts: ['Call about garden help', 'Suggest meeting for coffee'],
  },
  {
    id: 'f5', name: 'Alara', relationship: 'Niece', lastContact: '2026-04-08', nextReminder: '2026-04-25',
    birthday: '25/04', contactCadence: 'monthly', visitCadence: 'monthly',
    notes: ['Birthday coming up!'],
    smartPrompts: ['Send birthday card to Alara 🎂', 'Ask about school'],
  },
  {
    id: 'f6', name: 'Hailie Bailie', relationship: 'Niece', lastContact: '2026-04-01', nextReminder: '2026-04-20',
    birthday: '14/07', contactCadence: 'fortnightly', visitCadence: 'monthly',
    notes: ['Haven\'t FaceTimed in a while'],
    smartPrompts: ['FaceTime Hailie Bailie 📱', 'Ask about dance class'],
  },
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

// ===== SW Meal Suggestions =====
export interface MealSuggestion {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'emergency' | 'protein-first' | 'gym-day';
  name: string;
  description: string;
  freeFood: boolean;
  healthyExtras: string;
  swTip: string;
}

export const mealSuggestions: MealSuggestion[] = [
  { id: 'sg1', mealType: 'breakfast', name: 'Overnight Oats', description: 'Oats soaked in fat-free yoghurt with berries', freeFood: true, healthyExtras: 'HEb — 40g oats', swTip: 'Add banana for extra Free Food bulk' },
  { id: 'sg2', mealType: 'breakfast', name: 'Cooked Breakfast (SW Style)', description: 'Bacon medallions, eggs, beans, tomatoes, mushrooms', freeFood: true, healthyExtras: 'None needed', swTip: 'Use Frylight, not oil' },
  { id: 'sg3', mealType: 'lunch', name: 'Jacket Potato & Beans', description: 'Large baked potato with baked beans and side salad', freeFood: true, healthyExtras: 'Optional HEa — 40g cheese', swTip: 'Potato is Free Food — load up' },
  { id: 'sg4', mealType: 'lunch', name: 'Chicken Salad Wrap', description: 'Grilled chicken, salad, fat-free dressing in a wholemeal wrap', freeFood: true, healthyExtras: 'HEb — wholemeal wrap', swTip: 'Bulk with extra salad leaves' },
  { id: 'sg5', mealType: 'dinner', name: 'SW Chicken Stir Fry', description: 'Chicken breast, mixed veg, soy sauce, rice or noodles', freeFood: true, healthyExtras: 'None needed', swTip: 'Use Frylight and bulk with bean sprouts' },
  { id: 'sg6', mealType: 'dinner', name: 'Spaghetti Bolognese (SW)', description: 'Lean mince 5% fat, tinned tomatoes, pasta, herbs', freeFood: true, healthyExtras: 'Optional HEa — parmesan', swTip: 'Drain mince well, use passata for sauce' },
  { id: 'sg7', mealType: 'emergency', name: 'Speed Soup', description: 'Tin of soup + extra veg heated through — ready in 5 mins', freeFood: true, healthyExtras: 'None needed', swTip: 'Keep tins stocked for low-energy days' },
  { id: 'sg8', mealType: 'emergency', name: 'Beans on Toast', description: 'Baked beans on wholemeal toast — minimal effort', freeFood: true, healthyExtras: 'HEb — 2 slices wholemeal', swTip: 'No butter needed — beans provide moisture' },
  { id: 'sg9', mealType: 'protein-first', name: 'Greek Yoghurt Power Bowl', description: 'Fat-free Greek yoghurt, protein powder, berries, seeds', freeFood: true, healthyExtras: 'HEb — seeds/cereal', swTip: 'Great post-workout or high-protein day' },
  { id: 'sg10', mealType: 'gym-day', name: 'Chicken & Rice Prep', description: 'Grilled chicken breast, basmati rice, steamed broccoli', freeFood: true, healthyExtras: 'None needed', swTip: 'Prep in bulk — great gym-day fuel' },
];

// ===== ADP Vault =====
export interface ADPEntry {
  id: string;
  date: string;
  type: 'flare-day' | 'photo' | 'daily-living' | 'mobility' | 'mental' | 'fatigue' | 'walking' | 'stairs' | 'self-care';
  title: string;
  note: string;
  severity: number; // 1-10
  photoSlot?: boolean;
  exportReady: boolean;
}

export const adpEntries: ADPEntry[] = [
  { id: 'adp1', date: '15/04/2026', type: 'flare-day', title: 'Ankle flare — couldn\'t walk to shop', note: 'Swelling returned after 20 min walk. Had to sit down twice.', severity: 8, exportReady: true },
  { id: 'adp2', date: '14/04/2026', type: 'fatigue', title: 'Crashed at 2pm', note: 'Needed to lie down for 90 mins. Couldn\'t prepare dinner.', severity: 7, exportReady: true },
  { id: 'adp3', date: '14/04/2026', type: 'self-care', title: 'Couldn\'t shower standing', note: 'Had to sit on shower stool. Arms too heavy to wash hair properly.', severity: 6, exportReady: true },
  { id: 'adp4', date: '13/04/2026', type: 'mobility', title: 'Ankle photo — visible swelling', note: 'Photo taken for evidence.', severity: 7, photoSlot: true, exportReady: true },
  { id: 'adp5', date: '13/04/2026', type: 'stairs', title: 'Stairs took 3 minutes', note: 'Had to stop halfway. Right ankle gave way briefly.', severity: 8, exportReady: true },
  { id: 'adp6', date: '12/04/2026', type: 'mental', title: 'Anxiety spike after DWP letter', note: 'Felt overwhelmed. Took 2 hours to calm down enough to read it.', severity: 9, exportReady: true },
  { id: 'adp7', date: '12/04/2026', type: 'walking', title: 'Walking tolerance: 8 minutes', note: 'Managed 8 mins before needing to stop. Usually manage 15.', severity: 7, exportReady: true },
  { id: 'adp8', date: '11/04/2026', type: 'daily-living', title: 'Couldn\'t cook — used microwave meal', note: 'Standing at hob too painful. Energy too low to chop veg.', severity: 6, exportReady: true },
];
