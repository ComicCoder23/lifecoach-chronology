export interface EmotionalState {
  id: string;
  label: string;
  emoji: string;
  recoveryAction: string;
  faithAction: string;
  familyAction: string;
  contentAction: string;
  healthAction: string;
}

export const emotionalStates: EmotionalState[] = [
  {
    id: 'grateful', label: 'Grateful', emoji: '🙏',
    recoveryAction: 'Write gratitude list & share at meeting',
    faithAction: 'Pray a thanksgiving prayer',
    familyAction: 'Text someone you\'re thankful for',
    contentAction: 'Post a gratitude story',
    healthAction: 'Go for a grateful walk',
  },
  {
    id: 'flat', label: 'Flat', emoji: '😐',
    recoveryAction: 'Call your sponsor',
    faithAction: 'Read Psalm 23 slowly',
    familyAction: 'Call Mum for 5 minutes',
    contentAction: 'Share a "real talk" post',
    healthAction: 'Take supplements + hydrate',
  },
  {
    id: 'overwhelmed', label: 'Overwhelmed', emoji: '😵',
    recoveryAction: 'Pause. Breathe. Just For Today.',
    faithAction: 'Pray the Serenity Prayer',
    familyAction: 'Ask for help — it\'s strength',
    contentAction: 'Skip posting today — rest is content too',
    healthAction: 'Speed soup + lie down 20 mins',
  },
  {
    id: 'anxious', label: 'Anxious', emoji: '😰',
    recoveryAction: 'Step 3 — turn it over',
    faithAction: 'Read Philippians 4:6-7',
    familyAction: 'Text Lisa or Danielle',
    contentAction: 'Journal privately, don\'t post anxious',
    healthAction: 'Box breathing + cold water on wrists',
  },
  {
    id: 'tired', label: 'Tired', emoji: '😴',
    recoveryAction: 'Late-start rescue mode',
    faithAction: 'Short prayer from bed',
    familyAction: 'Reschedule — honesty builds trust',
    contentAction: 'Repost or skip — protect energy',
    healthAction: 'Emergency meal + rest',
  },
  {
    id: 'isolated', label: 'Isolated', emoji: '🏠',
    recoveryAction: 'Call 3 alcoholics NOW',
    faithAction: 'Pray for connection',
    familyAction: 'FaceTime Haley Bailey or Lara',
    contentAction: 'Post asking for interaction',
    healthAction: 'Walk outside — even 5 mins',
  },
  {
    id: 'hopeful', label: 'Hopeful', emoji: '🌱',
    recoveryAction: 'Write about this feeling',
    faithAction: 'Read Romans 15:13',
    familyAction: 'Share hope with Mum',
    contentAction: 'Post about the journey',
    healthAction: 'Channel it into a gym session',
  },
  {
    id: 'energised', label: 'Energised', emoji: '⚡',
    recoveryAction: 'Use energy for service',
    faithAction: 'Praise prayer',
    familyAction: 'Visit someone today',
    contentAction: 'Create multiple posts',
    healthAction: 'Full workout + meal prep',
  },
  {
    id: 'proud', label: 'Proud', emoji: '💪',
    recoveryAction: 'Share at a meeting',
    faithAction: 'Thank God for progress',
    familyAction: 'Tell family about your win',
    contentAction: 'Milestone post',
    healthAction: 'Take a progress photo',
  },
  {
    id: 'disconnected', label: 'Disconnected', emoji: '🌫️',
    recoveryAction: 'Step 11 — conscious contact',
    faithAction: 'Sit quietly with God',
    familyAction: 'Send a "thinking of you" text',
    contentAction: 'Consume content, don\'t create',
    healthAction: 'Ground yourself — shower, walk, eat',
  },
  {
    id: 'avoiding', label: 'Avoiding', emoji: '🙈',
    recoveryAction: 'Name what you\'re avoiding',
    faithAction: 'Pray for courage',
    familyAction: 'Make one small callback',
    contentAction: 'Post about avoidance honestly',
    healthAction: 'Do the easiest health task first',
  },
  {
    id: 'creative', label: 'Creative', emoji: '🎨',
    recoveryAction: 'Write recovery story content',
    faithAction: 'Creative worship — music or art',
    familyAction: 'Plan something special',
    contentAction: 'Batch create — ride the wave',
    healthAction: 'Cook something new (SW aligned)',
  },
  {
    id: 'spiritually-low', label: 'Spiritually Low', emoji: '🕯️',
    recoveryAction: 'Step 2 — came to believe',
    faithAction: 'Read your favourite saved prayer',
    familyAction: 'Be honest with someone',
    contentAction: 'Pause content — nourish soul first',
    healthAction: 'Gentle walk in nature',
  },
];

export const contentChannels = [
  { id: 'morning-inspiration', label: 'Morning Inspiration', platform: 'WhatsApp', emoji: '☀️' },
  { id: 'jesus-learning', label: "Jesus I'm Learning", platform: 'Facebook', emoji: '✝️' },
  { id: 'whos-funny', label: "Who's Funny Anyway", platform: 'Social', emoji: '😂' },
  { id: 'ttm-business', label: 'TTM / Business Proof', platform: 'LinkedIn', emoji: '💼' },
  { id: 'recovery-stories', label: 'Recovery Stories', platform: 'Facebook', emoji: '🟢' },
  { id: 'family-memories', label: 'Family Memory Content', platform: 'Private', emoji: '👨‍👩‍👧' },
  { id: 'health-transform', label: 'Health Transformation', platform: 'Instagram', emoji: '💪' },
];

export const prayerLibrary = [
  { id: 'pr1', title: 'Serenity Prayer', category: 'AA', text: 'God, grant me the serenity to accept the things I cannot change, courage to change the things I can, and wisdom to know the difference.', favourite: true },
  { id: 'pr2', title: 'Third Step Prayer', category: 'AA', text: 'God, I offer myself to Thee — to build with me and to do with me as Thou wilt. Relieve me of the bondage of self, that I may better do Thy will.', favourite: true },
  { id: 'pr3', title: 'Seventh Step Prayer', category: 'AA', text: 'My Creator, I am now willing that you should have all of me, good and bad. I pray that you now remove from me every single defect of character which stands in the way of my usefulness to you and my fellows.', favourite: false },
  { id: 'pr4', title: 'Morning Offering', category: 'Personal', text: 'Lord, I give you this day. Guide my steps, guard my heart, and use me for good.', favourite: true },
  { id: 'pr5', title: 'Psalm 23', category: 'Bible', text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.', favourite: true },
  { id: 'pr6', title: 'Evening Surrender', category: 'Personal', text: 'Lord, I hand this day back to you. Forgive where I fell short. Protect me as I sleep. Thank you for another sober day.', favourite: false },
];

export const pmRecoveryStack = [
  { id: 'pm1', title: 'Nightly Prayer', completed: false },
  { id: 'pm2', title: 'Write Gratitude List', completed: false },
  { id: 'pm3', title: 'Evening Inventory', completed: false },
  { id: 'pm4', title: 'Step 4 Mental Block Note', completed: false },
  { id: 'pm5', title: 'Tomorrow Handoff', completed: false },
  { id: 'pm6', title: 'Sponsor Note (if needed)', completed: false },
];
