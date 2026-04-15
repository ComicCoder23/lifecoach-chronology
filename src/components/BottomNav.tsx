import { Home, Rocket, Shield, Calendar, Zap, Users, MoreHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/launch', icon: Rocket, label: 'Launch' },
  { path: '/adp-vault', icon: Shield, label: 'ADP Vault' },
  { path: '/calendar', icon: Calendar, label: 'Calendar + Diary' },
  { path: '/capture', icon: Zap, label: 'Capture' },
  { path: '/family', icon: Users, label: 'Family' },
  { path: '/more', icon: MoreHorizontal, label: 'More' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t safe-bottom md:hidden">
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
              <span className="text-[9px] mt-0.5 font-medium leading-tight text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
