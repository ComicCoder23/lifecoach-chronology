// Companion image library — landscapes + dog photos via picsum.photos (reliable, seeded).
// Every page gets BOTH: a faded landscape backdrop AND a unique characterful dog hero.

const pic = (seed: string, w = 1200, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type SceneDef =
  | { kind: 'image'; src: string }
  | { kind: 'gradient'; gradient: string; emoji: string };

const img = (seed: string, w?: number, h?: number): SceneDef => ({ kind: 'image', src: pic(seed, w, h) });
const dogImg = (seed: string): SceneDef => ({ kind: 'image', src: pic(`dog-${seed}`, 1000, 500) });

export const COMPANION_SCENES = {
  // === Dog heroes — unique seeded picsum, one per page ===
  dogGolden: dogImg('golden-retriever'),
  dogCorgi: dogImg('corgi-grin'),
  dogCollie: dogImg('border-collie'),
  dogSpaniel: dogImg('spaniel-soft'),
  dogPug: dogImg('pug-cheeky'),
  dogSheepdog: dogImg('sheepdog-rough'),
  dogResting: dogImg('snoozing-hound'),
  dogDalmatian: dogImg('dalmatian-spots'),
  dogLab: dogImg('chocolate-lab'),
  dogTerrier: dogImg('scruffy-terrier'),
  dogHusky: dogImg('husky-eyes'),
  dogPuppy: dogImg('tiny-puppy'),
  dogBeagle: dogImg('beagle-ears'),
  dogPoodle: dogImg('curly-poodle'),
  dogBoxer: dogImg('boxer-grin'),
  dogShepherd: dogImg('german-shepherd'),
  dogDachshund: dogImg('long-dachshund'),
  dogBulldog: dogImg('bulldog-cuddle'),
  dogPointer: dogImg('pointer-stance'),
  dogStaffie: dogImg('staffie-smile'),
  dogWestie: dogImg('westie-fluff'),
  dogRescue: dogImg('rescue-pup'),

  // === Landscapes — for full-page faded backdrops ===
  sunrise: img('sunrise-morning'),
  goldenHour: img('golden-fields'),
  mountains: img('highland-peaks'),
  loch: img('still-loch'),
  coast: img('sea-cliffs'),
  forest: img('misty-forest'),
  woodland: img('woodland-path'),
  autumn: img('autumn-canopy'),
  moorland: img('open-moor'),
  storm: img('stormy-sky'),
  desert: img('desert-dunes'),
  countryPath: img('country-track'),
  starfield: img('night-stars'),
  evening: img('dusk-sky'),
  stone: img('stone-wall'),
  meadow: img('green-meadow'),
  letters: img('quiet-desk'),
  archive: img('paper-archive'),
  chronology: img('long-horizon'),
} as const;

export type CompanionScene = keyof typeof COMPANION_SCENES;
export type DogScene = Extract<CompanionScene, `dog${string}`>;

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
  | 'content' | 'calendar' | 'promises' | 'debt' | 'meals' | 'capture'
  | 'mail' | 'admin' | 'timeline';

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
      if (h < 17) return 'goldenHour';
      if (h < 21) return 'evening';
      return 'starfield';
    case 'dashboard-evening': return 'evening';
    case 'rescue': return 'loch';
    case 'scrapbook': return 'countryPath';
    case 'health': return 'mountains';
    case 'adp': return 'stone';
    case 'family': return 'meadow';
    case 'launch': return 'sunrise';
    case 'disciplines': return 'sunrise';
    case 'content': return 'coast';
    case 'calendar': return seasonForMonth(now.getMonth());
    case 'promises': return 'woodland';
    case 'debt': return 'loch';
    case 'meals': return 'meadow';
    case 'capture': return 'evening';
    case 'mail': return 'letters';
    case 'admin': return 'archive';
    case 'timeline': return 'chronology';
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
