import { type ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { COMPANION_SCENES, pickScene, type CompanionScene, type ModuleScene } from '@/lib/themes';

interface CompanionHeroProps {
  /** Explicit scene from the library — wins over `module` */
  scene?: CompanionScene;
  /** Smart scene assignment based on which module is rendering */
  module?: ModuleScene;
  /** Optional title rendered over the image */
  title?: string;
  /** Optional subtitle rendered under the title */
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  /** Higher = stronger image visibility (0–1). Default 0.6 */
  imageOpacity?: number;
  rounded?: boolean;
  priority?: boolean;
  /** Minimum height — defaults to 160px */
  minHeight?: number;
}

export function CompanionHero({
  scene,
  module,
  title,
  subtitle,
  children,
  className = '',
  imageOpacity = 0.35,
  rounded = true,
  priority = false,
  minHeight = 160,
}: CompanionHeroProps) {
  const { scene: themeScene } = useTheme();

  const sceneKey: CompanionScene = scene ?? (module ? pickScene(module) : themeScene.scene);
  const def = COMPANION_SCENES[sceneKey];

  return (
    <div
      className={`relative overflow-hidden ${rounded ? 'rounded-b-3xl' : ''} ${className}`}
      style={{ minHeight }}
    >
      {def.kind === 'image' ? (
        <img
          src={def.src}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: imageOpacity }}
          onError={(e) => {
            // Hard fallback: warm gradient if the network image fails
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: def.gradient, opacity: imageOpacity + 0.25 }}
        >
          <span className="text-7xl drop-shadow-md select-none" style={{ opacity: 0.85 }}>
            {def.emoji}
          </span>
        </div>
      )}

      {/* Warm tint overlay — keeps text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--background) / 0.30) 0%, hsl(var(--background) / 0.80) 70%, hsl(var(--background) / 0.98) 100%)',
        }}
      />

      <div className="relative">
        {(title || subtitle) && (
          <div className="px-5 pt-6 pb-4">
            {subtitle && (
              <p className="text-xs font-medium text-foreground/70 uppercase tracking-wide drop-shadow-sm">
                {subtitle}
              </p>
            )}
            {title && (
              <h1 className="text-2xl font-bold mt-1 drop-shadow-sm">{title}</h1>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
