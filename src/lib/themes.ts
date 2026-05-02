// Companion image library — landscapes via picsum.photos (reliable seeded source)
// and warm gradient "dog" scenes for characterful, never-broken visuals.

const pic = (seed: string) => `https://picsum.photos/seed/${seed}/1200/600`;

// A scene is either a real image URL, or a CSS gradient + emoji (for dogs).
export type SceneDef =
  | { kind: 'image'; src: string }
  | { kind: 'gradient'; gradient: string; emoji: string };

const img = (seed: string): SceneDef => ({ kind: 'image', src: pic(seed) });
const dog = (gradient: string, emoji: string): SceneDef => ({ kind: 'gradient', gradient, emoji });

export const COMPANION_SCENES = {
  // Dogs — warm gradients with character emoji (always visible, never broken)
  dogGolden: dog('linear-gradient(135deg, hsl(38 90% 70%), hsl(24 85% 55%))', '🐕'),
  dogCorgi: dog('linear-gradient(135deg, hsl(32 90% 75%), hsl(18 80% 58%))', '🐶'),
  dogCollie: dog('linear-gradient(135deg, hsl(28 70% 35%), hsl(38 80% 60%))', '🐕‍🦺'),
  dogSpaniel: dog('linear-gradient(135deg, hsl(36 85% 72%), hsl(20 75% 55%))', '🐶'),
  dogPug: dog('linear-gradient(135deg, hsl(40 80% 75%), hsl(28 70% 55%))', '🐕'),
  dogSheepdog: dog('linear-gradient(135deg, hsl(220 15% 35%), hsl(38 60% 70%))', '🐕‍🦺'),
  dogResting: dog('linear-gradient(135deg, hsl(20 70% 45%), hsl(8 65% 30%))', '🐶'),

  // Landscapes — picsum seeded (deterministic, reliable)
  sunrise: img('sunrise-morning'),
  goldenHour: img('golden-fields'),
  mountains: img('highland-peaks'),
  loch: img('still-loch'),
  coast: img('sea-cliffs'),
  forest: img('misty-forest'),
  autumn: img('autumn-canopy'),
  moorland: img('open-moor'),
  storm: img('stormy-sky'),
  desert: img('desert-dunes'),
  countryPath: img('country-track'),
  starfield: img('night-stars'),
  evening: img('dusk-sky'),
  stone: img('stone-wall'),
  meadow: img('green-meadow'),
} as const;

export type CompanionScene = keyof typeof COMPANION_SCENES;

// === Theme modes (cycle on Dashboard) ===
export type ThemeMode = 'morning' | 'goldenHour' | 'stormy' | 'night' | 'seasons';

export const THEME_MODES: Record<ThemeMode, {
  id: ThemeMode;
  label: string;
  emoji: string;
  description: string;
  scene: CompanionScene;
  overlay: string;
}> = {
  morning: {
    id: 'morning', label: 'Morning', emoji: '🌅',
    description: 'Sunrise · open day',
    scene: 'sunrise',
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.45) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  goldenHour: {
    id: 'goldenHour', label: 'Golden Hour', emoji: '🌇',
    description: 'Warm light · slow down',
    scene: 'goldenHour',
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  stormy: {
    id: 'stormy', label: 'Stormy', emoji: '⛈️',
    description: 'Wild sky · grounded',
    scene: 'storm',
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.55) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  night: {
    id: 'night', label: 'Night', emoji: '🌌',
    description: 'Stars · deep rest',
    scene: 'starfield',
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.55) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  seasons: {
    id: 'seasons', label: 'Seasons', emoji: '🍂',
    description: 'Rotates with the year',
    scene: 'autumn',
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
};

// === Module → scene assignment ===
export type ModuleScene =
  | 'dashboard' | 'dashboard-evening' | 'rescue' | 'scrapbook'
  | 'health' | 'adp' | 'family' | 'launch' | 'disciplines'
  | 'content' | 'calendar' | 'promises' | 'debt' | 'meals' | 'capture';

const seasonForMonth = (m: number): CompanionScene => {
  if (m <= 1 || m === 11) return 'mountains';   // winter
  if (m <= 4) return 'sunrise';                   // spring
  if (m <= 7) return 'goldenHour';                // summer
  return 'autumn';                                // autumn
};

export const pickScene = (module: ModuleScene, now = new Date()): CompanionScene => {
  const h = now.getHours();
  switch (module) {
    case 'dashboard':
      if (h < 10) return 'sunrise';
      if (h < 17) return 'dogGolden';
      if (h < 21) return 'goldenHour';
      return 'dogResting';
    case 'dashboard-evening': return 'dogResting';
    case 'rescue': return 'loch';
    case 'scrapbook': return 'countryPath';
    case 'health': return 'mountains';
    case 'adp': return 'stone';
    case 'family': return 'goldenHour';
    case 'launch': return 'sunrise';
    case 'disciplines': return 'sunrise';
    case 'content': return 'coast';
    case 'calendar': return seasonForMonth(now.getMonth());
    case 'promises': return 'goldenHour';
    case 'debt': return 'loch';
    case 'meals': return 'meadow';
    case 'capture': return 'evening';
    default: return 'sunrise';
  }
};

const STORAGE_KEY = 'soj.themeMode';

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'morning';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored && stored in THEME_MODES) return stored;
  const h = new Date().getHours();
  if (h < 10) return 'morning';
  if (h < 18) return 'goldenHour';
  if (h < 22) return 'stormy';
  return 'night';
};

export const setStoredTheme = (mode: ThemeMode) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, mode);
};
