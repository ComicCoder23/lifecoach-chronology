import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { DesktopSidebar } from './DesktopSidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <DesktopSidebar />
      <main className="pb-20 md:pb-0 md:ml-56">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
