import sunrise from '@/assets/companion-sunrise.jpg';
import calm from '@/assets/companion-calm.jpg';
import loyal from '@/assets/companion-loyal.jpg';
import forest from '@/assets/nature-forest.jpg';
import water from '@/assets/nature-water.jpg';
import evening from '@/assets/nature-evening.jpg';

export type ThemeMode = 'companion' | 'nature' | 'sunrise' | 'evening';

export const THEME_MODES: Record<ThemeMode, {
  id: ThemeMode;
  label: string;
  emoji: string;
  description: string;
  hero: string;
  overlay: string;
}> = {
  companion: {
    id: 'companion',
    label: 'Companion Mode',
    emoji: '🐕',
    description: 'Loyal warmth · grounded',
    hero: loyal,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.55) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  nature: {
    id: 'nature',
    label: 'Nature Calm',
    emoji: '🌲',
    description: 'Forest hush · steady',
    hero: forest,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  sunrise: {
    id: 'sunrise',
    label: 'Sunrise Energy',
    emoji: '🌅',
    description: 'Golden hour · open day',
    hero: sunrise,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.45) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
  evening: {
    id: 'evening',
    label: 'Evening Wind-down',
    emoji: '🌙',
    description: 'Soft dusk · close the day',
    hero: evening,
    overlay: 'linear-gradient(180deg, hsl(38 35% 96% / 0.5) 0%, hsl(38 35% 96% / 0.95) 70%)',
  },
};

// Contextual scene picker for emotional moments
export const COMPANION_SCENES = {
  sunrise,
  calm,
  loyal,
  forest,
  water,
  evening,
};

const STORAGE_KEY = 'soj.themeMode';

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'sunrise';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored && stored in THEME_MODES) return stored;
  // Auto-pick by time of day on first load
  const h = new Date().getHours();
  if (h < 10) return 'sunrise';
  if (h < 17) return 'companion';
  if (h < 21) return 'nature';
  return 'evening';
};

export const setStoredTheme = (mode: ThemeMode) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, mode);
};
