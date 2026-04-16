export interface FlowSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  happinessSpike: number;
  outputQuality: number;
  musicTrigger: string;
  taskType: string;
  sleepScore: number;
  breakfastLane: string;
  anklePain: number;
  creativeConfidence: number;
  ideasGenerated: number;
}

export interface MusicTrigger {
  id: string;
  artist: string;
  title: string;
  genre: string;
  emotionalTone: string;
  anxietyReduction: number;
  workConsistency: number;
  outputBoost: number;
  ideasGenerated: number;
  replayCount: number;
  category: 'focus' | 'writing' | 'recovery-reflection' | 'mood-reset';
}

export interface BreakfastPerformance {
  id: string;
  date: string;
  type: string;
  flowScore: number;
  gymOutput: number;
  cravingLevel: number;
  crashRisk: number;
  emotionalSteadiness: number;
  recoveryConsistency: number;
  performanceScore: number;
}

export interface SleepEntry {
  id: string;
  date: string;
  hoursSlept: number;
  cpapQuality: number;
  nightStackComplete: boolean;
  ankleFlare: boolean;
  flowQualityNext: number;
  happinessLikelihood: number;
  moodStability: number;
  bestCreativeHour: string;
  recoveryRisk: number;
}

export interface PositiveFunctionEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  impactScore: number;
  emoji: string;
}

// Demo flow sessions
export const demoFlowSessions: FlowSession[] = [
  {
    id: 'flow-1', date: '16/04/2026', startTime: '11:00', endTime: '12:00',
    happinessSpike: 9, outputQuality: 8, musicTrigger: 'Fred again.. – Danielle',
    taskType: 'Writing', sleepScore: 7, breakfastLane: 'Porridge',
    anklePain: 3, creativeConfidence: 8, ideasGenerated: 4,
  },
  {
    id: 'flow-2', date: '15/04/2026', startTime: '11:15', endTime: '12:10',
    happinessSpike: 7, outputQuality: 9, musicTrigger: 'Barry Can\'t Swim – Sunsleeper',
    taskType: 'Content creation', sleepScore: 8, breakfastLane: 'Smoothie',
    anklePain: 2, creativeConfidence: 9, ideasGenerated: 6,
  },
  {
    id: 'flow-3', date: '14/04/2026', startTime: '11:00', endTime: '11:45',
    happinessSpike: 6, outputQuality: 5, musicTrigger: 'Tourist – We Stayed Up All Night',
    taskType: 'Planning', sleepScore: 5, breakfastLane: 'Yogurt',
    anklePain: 6, creativeConfidence: 5, ideasGenerated: 2,
  },
  {
    id: 'flow-4', date: '13/04/2026', startTime: '11:00', endTime: '12:30',
    happinessSpike: 10, outputQuality: 9, musicTrigger: 'Jasper Tygner – Live Set',
    taskType: 'Deep writing', sleepScore: 9, breakfastLane: 'Porridge',
    anklePain: 1, creativeConfidence: 10, ideasGenerated: 7,
  },
];

// Music trigger library
export const musicTriggers: MusicTrigger[] = [
  {
    id: 'mt-1', artist: 'Fred again..', title: 'Danielle (smile on my face)',
    genre: 'Electronic / Emotional', emotionalTone: 'Euphoric & uplifting',
    anxietyReduction: 9, workConsistency: 8, outputBoost: 9, ideasGenerated: 5,
    replayCount: 47, category: 'focus',
  },
  {
    id: 'mt-2', artist: 'Barry Can\'t Swim', title: 'Sunsleeper',
    genre: 'Deep house / Melodic', emotionalTone: 'Calm & focused',
    anxietyReduction: 8, workConsistency: 9, outputBoost: 8, ideasGenerated: 4,
    replayCount: 32, category: 'writing',
  },
  {
    id: 'mt-3', artist: 'Jasper Tygner', title: 'Live Boiler Room Set',
    genre: 'House / Groove', emotionalTone: 'Energised & confident',
    anxietyReduction: 7, workConsistency: 7, outputBoost: 9, ideasGenerated: 6,
    replayCount: 28, category: 'focus',
  },
  {
    id: 'mt-4', artist: 'Tourist', title: 'We Stayed Up All Night',
    genre: 'Ambient electronic', emotionalTone: 'Reflective & gentle',
    anxietyReduction: 9, workConsistency: 6, outputBoost: 5, ideasGenerated: 3,
    replayCount: 19, category: 'recovery-reflection',
  },
  {
    id: 'mt-5', artist: 'Fred again..', title: 'Marea (we\'ve lost dancing)',
    genre: 'Electronic / Emotional', emotionalTone: 'Bittersweet & moving',
    anxietyReduction: 8, workConsistency: 7, outputBoost: 7, ideasGenerated: 4,
    replayCount: 38, category: 'mood-reset',
  },
  {
    id: 'mt-6', artist: 'Barry Can\'t Swim', title: 'Nobody Else',
    genre: 'Deep house', emotionalTone: 'Warm & grounding',
    anxietyReduction: 7, workConsistency: 8, outputBoost: 7, ideasGenerated: 3,
    replayCount: 22, category: 'writing',
  },
];

// Breakfast performance data
export const breakfastPerformance: BreakfastPerformance[] = [
  { id: 'bp-1', date: '16/04/2026', type: 'Porridge', flowScore: 9, gymOutput: 7, cravingLevel: 2, crashRisk: 1, emotionalSteadiness: 8, recoveryConsistency: 9, performanceScore: 88 },
  { id: 'bp-2', date: '15/04/2026', type: 'Smoothie', flowScore: 8, gymOutput: 8, cravingLevel: 3, crashRisk: 2, emotionalSteadiness: 7, recoveryConsistency: 8, performanceScore: 82 },
  { id: 'bp-3', date: '14/04/2026', type: 'Yogurt', flowScore: 6, gymOutput: 6, cravingLevel: 4, crashRisk: 4, emotionalSteadiness: 6, recoveryConsistency: 7, performanceScore: 65 },
  { id: 'bp-4', date: '13/04/2026', type: 'Porridge', flowScore: 9, gymOutput: 8, cravingLevel: 1, crashRisk: 1, emotionalSteadiness: 9, recoveryConsistency: 9, performanceScore: 92 },
  { id: 'bp-5', date: '12/04/2026', type: 'Banana before coffee', flowScore: 7, gymOutput: 7, cravingLevel: 3, crashRisk: 3, emotionalSteadiness: 7, recoveryConsistency: 8, performanceScore: 74 },
  { id: 'bp-6', date: '11/04/2026', type: 'Dioralyte + CPAP morning', flowScore: 5, gymOutput: 4, cravingLevel: 5, crashRisk: 5, emotionalSteadiness: 5, recoveryConsistency: 6, performanceScore: 52 },
];

// Sleep entries
export const sleepEntries: SleepEntry[] = [
  { id: 'sl-1', date: '16/04/2026', hoursSlept: 7.5, cpapQuality: 8, nightStackComplete: true, ankleFlare: false, flowQualityNext: 9, happinessLikelihood: 85, moodStability: 8, bestCreativeHour: '11:00', recoveryRisk: 1 },
  { id: 'sl-2', date: '15/04/2026', hoursSlept: 8, cpapQuality: 9, nightStackComplete: true, ankleFlare: false, flowQualityNext: 8, happinessLikelihood: 80, moodStability: 8, bestCreativeHour: '11:00', recoveryRisk: 1 },
  { id: 'sl-3', date: '14/04/2026', hoursSlept: 5.5, cpapQuality: 4, nightStackComplete: false, ankleFlare: true, flowQualityNext: 5, happinessLikelihood: 40, moodStability: 4, bestCreativeHour: '14:00', recoveryRisk: 6 },
  { id: 'sl-4', date: '13/04/2026', hoursSlept: 8.5, cpapQuality: 9, nightStackComplete: true, ankleFlare: false, flowQualityNext: 10, happinessLikelihood: 92, moodStability: 9, bestCreativeHour: '11:00', recoveryRisk: 0 },
];

// Positive function evidence
export const positiveFunctionEntries: PositiveFunctionEntry[] = [
  { id: 'pf-1', date: '16/04/2026', category: 'Music-triggered happiness', description: 'Fred again.. Danielle during flow block — sustained focus for 55 mins, felt genuinely happy', impactScore: 9, emoji: '🎵' },
  { id: 'pf-2', date: '15/04/2026', category: 'Writing deep work', description: 'Wrote 1,200 words for Jesus I\'m Learning post — best writing session this week', impactScore: 8, emoji: '✍️' },
  { id: 'pf-3', date: '15/04/2026', category: 'Exercise confidence', description: 'Completed full gym session despite ankle — adapted exercises, felt strong', impactScore: 8, emoji: '💪' },
  { id: 'pf-4', date: '14/04/2026', category: 'Family warmth', description: 'Video call with Mum — she was laughing, felt connected and present', impactScore: 9, emoji: '💝' },
  { id: 'pf-5', date: '14/04/2026', category: 'Spiritual lift', description: 'Morning prayer felt genuine — read Psalm 23, felt held', impactScore: 8, emoji: '🙏' },
  { id: 'pf-6', date: '13/04/2026', category: 'Social confidence', description: 'Shared at AA meeting without notes — felt authentic and received well', impactScore: 9, emoji: '🟢' },
  { id: 'pf-7', date: '13/04/2026', category: 'Flow state productivity', description: '90 min deep work with Jasper Tygner set — generated 7 content ideas', impactScore: 10, emoji: '✨' },
  { id: 'pf-8', date: '12/04/2026', category: 'Improv boost', description: 'Improvised a new recipe — felt creative in a non-screen way', impactScore: 7, emoji: '🍳' },
];

// Category configs for music triggers
export const triggerCategories = [
  { key: 'focus' as const, label: 'Focus Triggers', emoji: '🎯', description: 'Best for deep work and flow states' },
  { key: 'writing' as const, label: 'Writing Triggers', emoji: '✍️', description: 'Best for content creation and journaling' },
  { key: 'recovery-reflection' as const, label: 'Recovery Reflection', emoji: '🌿', description: 'Best for step work and evening inventory' },
  { key: 'mood-reset' as const, label: 'Mood Reset', emoji: '🔄', description: 'Best for lifting flat or anxious moments' },
];

// Breakfast type configs
export const breakfastTypes = [
  { type: 'Porridge', emoji: '🥣', avgScore: 90, note: 'Highest flow + lowest crash risk' },
  { type: 'Smoothie', emoji: '🥤', avgScore: 80, note: 'Great gym days, moderate crash risk' },
  { type: 'Yogurt', emoji: '🫙', avgScore: 65, note: 'Quick & easy, moderate performance' },
  { type: 'Banana before coffee', emoji: '🍌', avgScore: 74, note: 'Good energy start, needs follow-up' },
  { type: 'Dioralyte + CPAP morning', emoji: '💧', avgScore: 52, note: 'Recovery day — gentle start needed' },
];
