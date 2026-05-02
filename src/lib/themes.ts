// Companion image library — dogs + landscapes, sourced from Unsplash for a rich,
// breathing visual system. All URLs use Unsplash's image CDN with sizing params
// tuned for mobile hero display.
//
// Two themes working together: characterful dogs and breathtaking landscapes
// across all elements (earth, fire, water, wind, sand, sea, mountain, sky,
// country, forest, night).

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

// === 20-scene companion library ===
export const COMPANION_SCENES = {
  // Dogs — expressive, warm, characterful
  dogGolden: u('photo-1552053831-71594a27632d'),       // golden retriever, joyful
  dogCorgi: u('photo-1612536057832-2ff7ead58194'),     // corgi, cheeky
  dogCollie: u('photo-1568572933382-74d440642117'),    // border collie, alert
  dogSpaniel: u('photo-1583337130417-3346a1be7dee'),   // spaniel, soft eyes
  dogPug: u('photo-1517849845537-4d257902454a'),       // pug, character
  dogSheepdog: u('photo-1537151608828-ea2b11777ee8'),  // sheepdog, working
  dogResting: u('photo-1450778869180-41d0601e046e'),   // dog by the fire, calm

  // Landscapes — elements & moods
  sunrise: u('photo-1500964757637-c85e8a162699'),       // mountain sunrise
  goldenHour: u('photo-1470770841072-f978cf4d019e'),    // golden field
  mountains: u('photo-1454496522488-7a8e488e8606'),     // highland peaks
  loch: u('photo-1501785888041-af3ef285b470'),          // loch / water
  coast: u('photo-1507525428034-b723cf961d3e'),         // sea cliffs
  forest: u('photo-1448375240586-882707db888b'),        // misty forest
  autumn: u('photo-1507783548227-544c3b8fc065'),        // autumn canopy
  moorland: u('photo-1483728642387-6c3bdd6c93e5'),      // open moor / wind
  storm: u('photo-1419833173245-f59e1b93f9ee'),         // stormy sky
  desert: u('photo-1473580044384-7ba9967e16a0'),        // desert dunes / sand
  countryPath: u('photo-1500382017468-9049fed747ef'),   // farm track / country
  starfield: u('photo-1419242902214-272b3f66ee7a'),     // night sky / stars
  evening: u('photo-1495616811223-4d98c6e9c869'),       // dusk landscape
} as const;

export type CompanionScene = keyof typeof COMPANION_SCENES;

// === Theme modes (cycle on Dashboard) ===
export type ThemeMode = 'morning' | 'goldenHour' | 'stormy' | 'night' | 'seasons';

export const THEME_MODES: Record<ThemeMode, {
  id: ThemeMode;
  label: string;
  emoji: string;
  description: string;
  hero: string;
  overlay: string;
}> = {
  morning: {
    id: 'morning',
    label: 'Morning',
    emoji: '🌅',
    description: 'Sunrise · open day',
    hero: COMPANION_SCENES.sunrise,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.45) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  goldenHour: {
    id: 'goldenHour',
    label: 'Golden Hour',
    emoji: '🌇',
    description: 'Warm light · slow down',
    hero: COMPANION_SCENES.goldenHour,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  stormy: {
    id: 'stormy',
    label: 'Stormy',
    emoji: '⛈️',
    description: 'Wild sky · grounded',
    hero: COMPANION_SCENES.storm,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.55) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  night: {
    id: 'night',
    label: 'Night',
    emoji: '🌌',
    description: 'Stars · deep rest',
    hero: COMPANION_SCENES.starfield,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.55) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  seasons: {
    id: 'seasons',
    label: 'Seasons',
    emoji: '🍂',
    description: 'Rotates with the year',
    hero: COMPANION_SCENES.autumn,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
};

// === Module → scene assignment ===
// Returns a scene that fits the mood of each module. `seasons` rotates by month.
export type ModuleScene =
  | 'dashboard'
  | 'dashboard-evening'
  | 'rescue'
  | 'scrapbook'
  | 'health'
  | 'adp'
  | 'family'
  | 'launch'
  | 'disciplines'
  | 'content'
  | 'calendar';

const seasonForMonth = (m: number): CompanionScene => {
  // 0=Jan
  if (m <= 1 || m === 11) return 'mountains';   // winter
  if (m <= 4) return 'sunrise';                  // spring
  if (m <= 7) return 'goldenHour';               // summer
  return 'autumn';                               // autumn
};

export const pickScene = (module: ModuleScene, now = new Date()): CompanionScene => {
  const h = now.getHours();
  switch (module) {
    case 'dashboard':
      if (h < 10) return 'sunrise';
      if (h < 17) return 'dogGolden';
      if (h < 21) return 'goldenHour';
      return 'dogResting';
    case 'dashboard-evening':
      return 'dogResting';
    case 'rescue':
      return 'loch';
    case 'scrapbook':
      return 'countryPath';
    case 'health':
      return 'mountains';
    case 'adp':
      return 'moorland';
    case 'family':
      return 'goldenHour';
    case 'launch':
      return h < 12 ? 'sunrise' : 'dogCollie';
    case 'disciplines':
      return 'dogCollie';
    case 'content':
      return 'coast';
    case 'calendar':
      return seasonForMonth(now.getMonth());
    default:
      return 'sunrise';
  }
};

const STORAGE_KEY = 'soj.themeMode';

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'morning';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored && stored in THEME_MODES) return stored;
  // Auto-pick by time of day on first load
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
