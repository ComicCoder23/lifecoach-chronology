import { type ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { COMPANION_SCENES, pickDog, pickScene, type CompanionScene, type ModuleScene } from '@/lib/themes';

interface CompanionHeroProps {
  /** Explicit scene from the library — wins over `module` */
  scene?: CompanionScene;
  /** Smart scene assignment based on which module is rendering. Picks a unique DOG hero. */
  module?: ModuleScene;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  /** Higher = stronger image visibility (0–1). Default 0.85 — dogs should feel present */
  imageOpacity?: number;
  rounded?: boolean;
  priority?: boolean;
  /** Minimum height — defaults to 180px so the dog has room */
  minHeight?: number;
}

export function CompanionHero({
  scene,
  module,
  title,
  subtitle,
  children,
  className = '',
  imageOpacity = 0.85,
  rounded = true,
  priority = false,
  minHeight = 180,
}: CompanionHeroProps) {
  const { scene: themeScene } = useTheme();

  // Priority: explicit scene > module-based DOG > theme scene
  const sceneKey: CompanionScene =
    scene ?? (module ? pickDog(module) : themeScene.scene);

  const def = COMPANION_SCENES[sceneKey];

  // Optional landscape behind the dog for richer atmosphere
  const backdropKey: CompanionScene | null = module ? pickScene(module) : null;
  const backdropDef = backdropKey ? COMPANION_SCENES[backdropKey] : null;

  return (
    <div
      className={`relative overflow-hidden ${rounded ? 'rounded-b-3xl' : ''} ${className}`}
      style={{ minHeight }}
    >
      {/* Landscape backdrop layer (very faded) */}
      {backdropDef && backdropDef.kind === 'image' && (
        <img
          src={backdropDef.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
      )}

      {/* Main hero — dog photo (or override) */}
      {def.kind === 'image' ? (
        <img
          src={def.src}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
          style={{ opacity: imageOpacity }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: def.gradient, opacity: imageOpacity }}
        >
          <span className="text-7xl drop-shadow-md select-none">{def.emoji}</span>
        </div>
      )}

      {/* Warm tint overlay — keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--background) / 0.10) 0%, hsl(var(--background) / 0.55) 60%, hsl(var(--background) / 0.95) 100%)',
        }}
      />

      <div className="relative">
        {(title || subtitle) && (
          <div className="px-5 pt-6 pb-4">
            {subtitle && (
              <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wide drop-shadow-sm">
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
