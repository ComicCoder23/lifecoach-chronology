import { type ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { COMPANION_SCENES, pickScene, type CompanionScene, type ModuleScene } from '@/lib/themes';

interface CompanionHeroProps {
  /** Explicit scene from the library — wins over `module` */
  scene?: CompanionScene;
  /** Smart scene assignment based on which module is rendering */
  module?: ModuleScene;
  children: ReactNode;
  className?: string;
  /** Higher = stronger image visibility (0–1). Default 0.55 */
  imageOpacity?: number;
  rounded?: boolean;
  priority?: boolean;
}

export function CompanionHero({
  scene,
  module,
  children,
  className = '',
  imageOpacity = 0.55,
  rounded = true,
  priority = false,
}: CompanionHeroProps) {
  const { scene: themeScene } = useTheme();

  const imgSrc = scene
    ? COMPANION_SCENES[scene]
    : module
      ? COMPANION_SCENES[pickScene(module)]
      : themeScene.hero;

  return (
    <div className={`relative overflow-hidden ${rounded ? 'rounded-b-3xl' : ''} ${className}`}>
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        loading={priority ? 'eager' : 'lazy'}
        width={1600}
        height={900}
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
