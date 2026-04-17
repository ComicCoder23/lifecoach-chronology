import { type ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { COMPANION_SCENES } from '@/lib/themes';

interface CompanionHeroProps {
  /** Optional override scene; otherwise uses current theme */
  scene?: keyof typeof COMPANION_SCENES;
  children: ReactNode;
  className?: string;
  /** Higher = stronger image visibility (0–1). Default 0.55 */
  imageOpacity?: number;
  rounded?: boolean;
  priority?: boolean;
}

export function CompanionHero({
  scene,
  children,
  className = '',
  imageOpacity = 0.55,
  rounded = true,
  priority = false,
}: CompanionHeroProps) {
  const { scene: themeScene } = useTheme();
  const imgSrc = scene ? COMPANION_SCENES[scene] : themeScene.hero;

  return (
    <div className={`relative overflow-hidden ${rounded ? 'rounded-b-3xl' : ''} ${className}`}>
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        loading={priority ? 'eager' : 'lazy'}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: imageOpacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.85) 65%, hsl(var(--background) / 0.98) 100%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
