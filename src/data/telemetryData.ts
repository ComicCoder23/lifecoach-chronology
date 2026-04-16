export interface EmotionalSpike {
  id: string;
  timestamp: string;
  type: 'spike' | 'drop';
  emotion: string;
  intensity: number; // 1-10
  timeOfDay: string;
  taskContext: string;
  triggerSource: string;
  bodySensation: string;
  outputChange: 'increase' | 'decrease' | 'no-change';
  nextActionTaken: string;
  recoverySpeed: 'fast' | 'moderate' | 'slow';
}

export interface MomentumRescue {
  id: string;
  intervention: string;
  type: 'music' | 'recovery' | 'faith' | 'meal' | 'task' | 'movement';
  emoji: string;
  successRate: number;
  avgRecoveryMins: number;
  description: string;
}

export interface VoiceAudit {
  id: string;
  date: string;
  type: 'voice-reflection' | 'video-audit' | 'confidence-snapshot' | 'workflow-proof';
  title: string;
  durationSecs: number;
  summary: string;
  tags: string[];
  linkedSpike?: string;
}

export interface ConnectorSource {
  id: string;
  name: string;
  icon: string;
  category: 'spiritual' | 'recovery' | 'health' | 'delivery' | 'communication' | 'calendar';
  status: 'connected' | 'manual' | 'placeholder';
  lastSynced?: string;
  description: string;
  manualFallback: string;
  useCases: string[];
}

// Proven momentum rescue interventions
export const momentumRescues: MomentumRescue[] = [
  { id: 'mr-1', intervention: 'Fred again.. – Danielle', type: 'music', emoji: '🎵', successRate: 92, avgRecoveryMins: 8, description: 'Proven happiness spike trigger — play immediately during slump' },
  { id: 'mr-2', intervention: 'Barry Can\'t Swim – Sunsleeper', type: 'music', emoji: '🎧', successRate: 85, avgRecoveryMins: 12, description: 'Deep focus reset — calms anxiety, restores work rhythm' },
  { id: 'mr-3', intervention: 'Call sponsor', type: 'recovery', emoji: '📞', successRate: 88, avgRecoveryMins: 15, description: 'Immediate grounding — reconnects purpose and accountability' },
  { id: 'mr-4', intervention: 'Read Just For Today card', type: 'recovery', emoji: '📖', successRate: 78, avgRecoveryMins: 5, description: 'Quick spiritual reset — refocuses on today only' },
  { id: 'mr-5', intervention: 'Psalm 23 + short prayer', type: 'faith', emoji: '🙏', successRate: 82, avgRecoveryMins: 7, description: 'Spiritual grounding — proven to reduce anxiety within minutes' },
  { id: 'mr-6', intervention: 'Porridge + Dioralyte', type: 'meal', emoji: '🥣', successRate: 80, avgRecoveryMins: 30, description: 'Energy stabilisation — prevents crash cascade' },
  { id: 'mr-7', intervention: 'Preview app progress', type: 'task', emoji: '✨', successRate: 90, avgRecoveryMins: 5, description: 'Visual proof of capability — confidence restoration' },
  { id: 'mr-8', intervention: 'Easiest content post', type: 'task', emoji: '📱', successRate: 75, avgRecoveryMins: 10, description: 'Low-barrier win — post a quote or photo to build momentum' },
  { id: 'mr-9', intervention: '5-min walk (ankle-safe)', type: 'movement', emoji: '🚶', successRate: 72, avgRecoveryMins: 10, description: 'Gentle movement — clears mental fog without flare risk' },
];

// Demo emotional spikes
export const demoSpikes: EmotionalSpike[] = [
  { id: 'sp-1', timestamp: '16/04/2026 11:15', type: 'spike', emotion: 'creative', intensity: 9, timeOfDay: '11:15', taskContext: 'Writing session', triggerSource: 'Fred again.. + porridge morning', bodySensation: 'Energised, clear-headed', outputChange: 'increase', nextActionTaken: 'Continued writing for 55 mins', recoverySpeed: 'fast' },
  { id: 'sp-2', timestamp: '16/04/2026 09:00', type: 'spike', emotion: 'grateful', intensity: 8, timeOfDay: '09:00', taskContext: 'Morning prayer', triggerSource: 'Psalm 23 + gratitude list', bodySensation: 'Calm, centred', outputChange: 'increase', nextActionTaken: 'Started launch stack with energy', recoverySpeed: 'fast' },
  { id: 'sp-3', timestamp: '15/04/2026 15:30', type: 'drop', emotion: 'flat', intensity: 4, timeOfDay: '15:30', taskContext: 'Afternoon admin', triggerSource: 'DWP letter + ankle pain spike', bodySensation: 'Heavy, tired, frustrated', outputChange: 'decrease', nextActionTaken: 'Played Tourist set + tea', recoverySpeed: 'moderate' },
  { id: 'sp-4', timestamp: '15/04/2026 11:00', type: 'spike', emotion: 'proud', intensity: 9, timeOfDay: '11:00', taskContext: 'App preview session', triggerSource: 'Lovable MVP visual proof', bodySensation: 'Excited, confident', outputChange: 'increase', nextActionTaken: 'Generated 6 content ideas', recoverySpeed: 'fast' },
  { id: 'sp-5', timestamp: '14/04/2026 20:00', type: 'drop', emotion: 'isolated', intensity: 3, timeOfDay: '20:00', taskContext: 'Evening alone', triggerSource: 'No calls today + ankle flare', bodySensation: 'Lonely, restless', outputChange: 'decrease', nextActionTaken: 'Called AA friend + evening inventory', recoverySpeed: 'slow' },
  { id: 'sp-6', timestamp: '14/04/2026 10:30', type: 'spike', emotion: 'energised', intensity: 8, timeOfDay: '10:30', taskContext: 'Gym session', triggerSource: 'Adapted exercises despite ankle', bodySensation: 'Strong, capable', outputChange: 'increase', nextActionTaken: 'Smoothie + flow prep', recoverySpeed: 'fast' },
];

// Demo voice audits
export const demoVoiceAudits: VoiceAudit[] = [
  { id: 'va-1', date: '16/04/2026', type: 'confidence-snapshot', title: 'Morning clarity after prayer', durationSecs: 45, summary: 'Felt genuinely hopeful after reading Psalm 23. Ankle pain manageable. Ready for flow block.', tags: ['recovery', 'faith', 'morning'] },
  { id: 'va-2', date: '15/04/2026', type: 'workflow-proof', title: 'App MVP preview reaction', durationSecs: 120, summary: 'Reviewed Smart Organiser progress — genuine excitement about capability. This is real proof I can build things.', tags: ['content', 'confidence', 'proof'] },
  { id: 'va-3', date: '15/04/2026', type: 'voice-reflection', title: 'DWP letter stress reflection', durationSecs: 90, summary: 'Letter triggered anxiety. Used Tourist set + tea as rescue. Recovered in 20 mins. Evidence logged for ADP.', tags: ['recovery', 'adp', 'rescue'] },
  { id: 'va-4', date: '14/04/2026', type: 'video-audit', title: 'Evening inventory — honest share', durationSecs: 180, summary: 'Day had both highs and lows. Gym was great. Evening loneliness was hard. Called AA friend. Learned: proactive connection prevents isolation drops.', tags: ['recovery', 'learning', 'evening'] },
];

// Connector sources
export const connectorSources: ConnectorSource[] = [
  { id: 'cs-1', name: 'Bible Gateway', icon: '📖', category: 'spiritual', status: 'manual', description: 'Daily verse, devotionals, scripture memory', manualFallback: 'Paste verse or screenshot', useCases: ['Daily verse sync', 'Saved prayer sources', 'Devotional prompts', 'Scripture memory lane'] },
  { id: 'cs-2', name: 'Church Suite', icon: '⛪', category: 'spiritual', status: 'placeholder', description: 'Church events, services, prayer meetings', manualFallback: 'Add events manually', useCases: ['Church events', 'Services', 'Prayer meetings', 'Volunteer commitments'] },
  { id: 'cs-3', name: 'I Am Sober', icon: '💚', category: 'recovery', status: 'manual', description: 'Exact sober days, milestones, celebrations', manualFallback: 'Manual day count or screenshot import', useCases: ['Exact sober days', 'Milestone dates', 'Relapse-risk gaps', 'Celebration countdowns'] },
  { id: 'cs-4', name: 'Everything AA', icon: '🟢', category: 'recovery', status: 'manual', description: 'Meeting times, Just For Today, step reflections', manualFallback: 'Copy text or take screenshot', useCases: ['Meeting times', 'Just For Today', 'Prayers', 'Step reflections', 'Sponsor prompts'] },
  { id: 'cs-5', name: 'Gmail', icon: '📧', category: 'communication', status: 'placeholder', description: 'GP letters, DWP/ADP emails, debt notices', manualFallback: 'Forward email or paste text', useCases: ['GP letters → ADP Vault', 'DWP emails → ADP Vault', 'Debt notices → Debt Builder', 'Appointment confirmations → Calendar'] },
  { id: 'cs-6', name: 'Google Calendar', icon: '📅', category: 'calendar', status: 'placeholder', description: 'Appointments, meetings, reminders', manualFallback: 'Add events to Calendar + Diary', useCases: ['Two-way event sync', 'Meeting reminders', 'Appointment visibility'] },
  { id: 'cs-7', name: 'Google Photos', icon: '📸', category: 'communication', status: 'placeholder', description: 'Family photos, ankle evidence, proof reels', manualFallback: 'Upload from camera roll', useCases: ['Family memory content', 'Ankle photo evidence', 'Proof reels for ADP'] },
  { id: 'cs-8', name: 'Samsung Health', icon: '❤️', category: 'health', status: 'placeholder', description: 'Steps, sleep, heart rate, exercise', manualFallback: 'Manual entry or screenshot', useCases: ['Sleep data → creativity loop', 'Step count evidence', 'Exercise sessions'] },
  { id: 'cs-9', name: 'Sleep Cycle', icon: '😴', category: 'health', status: 'placeholder', description: 'Sleep quality, snoring, CPAP correlation', manualFallback: 'Log sleep score manually', useCases: ['Sleep score', 'CPAP quality', 'Next-day flow prediction'] },
  { id: 'cs-10', name: 'Snappy Shopper', icon: '🛒', category: 'delivery', status: 'placeholder', description: 'Meal → shopping list → delivery', manualFallback: 'Manual shopping list', useCases: ['SW-safe shopping', 'Emergency meal rescue', 'Hydration orders'] },
  { id: 'cs-11', name: 'Uber Eats', icon: '🍔', category: 'delivery', status: 'placeholder', description: 'Low-energy fallback meal rescue', manualFallback: 'SW-safe emergency meal list', useCases: ['Fallback meal delivery', 'Low-energy rescue', 'SW-safe options'] },
];

// Additional music triggers for expanded library
export const expandedTriggers = [
  { id: 'et-1', artist: 'Model Man', title: 'Late Night Drives', genre: 'Synth / Cinematic', emotionalTone: 'Atmospheric & dreamy', category: 'writing' as const, anxietyReduction: 7, workConsistency: 8, outputBoost: 7, ideasGenerated: 4, replayCount: 15 },
  { id: 'et-2', artist: 'salute', title: 'True Colours Mix', genre: 'UK Garage / House', emotionalTone: 'Uplifting & confident', category: 'focus' as const, anxietyReduction: 6, workConsistency: 8, outputBoost: 8, ideasGenerated: 5, replayCount: 12 },
];
