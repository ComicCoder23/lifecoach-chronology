import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { DesktopSidebar } from './DesktopSidebar';
import { COMPANION_SCENES, pickBackdropForPath } from '@/lib/themes';

export function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const sceneKey = pickBackdropForPath(pathname);
    const def = COMPANION_SCENES[sceneKey];
    setSrc(def.kind === 'image' ? def.src : null);
  }, [pathname]);

  return (
    <div className="min-h-screen relative">
      {/* Full-page faded landscape backdrop — fixed, non-interactive */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: 'hsl(var(--background))' }}
      >
        {src && (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: 0.18 }}
          />
        )}
        {/* Cream wash to keep contrast warm + readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.92) 70%, hsl(var(--background) / 0.98) 100%)',
          }}
        />
      </div>

      <DesktopSidebar />
      <main className="pb-20 md:pb-0 md:ml-56 relative">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
