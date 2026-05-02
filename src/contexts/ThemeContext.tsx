import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getStoredTheme, setStoredTheme, THEME_MODES, type ThemeMode } from '@/lib/themes';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  scene: typeof THEME_MODES[ThemeMode];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('morning');

  useEffect(() => {
    setModeState(getStoredTheme());
  }, []);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    setStoredTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, scene: THEME_MODES[mode] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
