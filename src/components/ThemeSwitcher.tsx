import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { THEME_MODES, type ThemeMode } from '@/lib/themes';

export function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const modes = Object.values(THEME_MODES);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border text-xs font-medium hover:bg-card transition-colors"
        aria-label="Change theme mode"
      >
        <Palette className="w-3.5 h-3.5" />
        <span>{THEME_MODES[mode].emoji}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="absolute right-0 mt-2 w-60 bg-card rounded-2xl border shadow-xl p-2 z-50"
            >
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide px-2 py-1.5">
                Companion Mode
              </p>
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id as ThemeMode);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left hover:bg-accent transition-colors ${
                    mode === m.id ? 'bg-accent' : ''
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{m.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{m.description}</p>
                  </div>
                  {mode === m.id && <Check className="w-4 h-4 text-momentum flex-shrink-0" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
