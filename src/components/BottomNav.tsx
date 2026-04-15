import { Home, Rocket, CheckSquare, Clock, Zap, Calendar, Users, MoreHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/launch', icon: Rocket, label: 'Launch' },
  { path: '/disciplines', icon: CheckSquare, label: 'Habits' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/capture', icon: Zap, label: 'Capture' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/family', icon: Users, label: 'Family' },
  { path: '/more', icon: MoreHorizontal, label: 'More' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t safe-bottom md:hidden">
      <div className="flex justify-around items-center h-16 px-1">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${active ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <tab.icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
