import { Home, Rocket, CheckSquare, Clock, Zap, Calendar, Users, CreditCard, Mail, FileText, BookOpen, TrendingUp, Shield, Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/launch', icon: Rocket, label: 'Launch Mode' },
  { path: '/disciplines', icon: CheckSquare, label: 'Disciplines' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/capture', icon: Zap, label: 'Quick Capture' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/evidence', icon: Shield, label: 'Evidence' },
  { path: '/promises', icon: Heart, label: 'Promises' },
  { path: '/family', icon: Users, label: 'Family' },
  { path: '/meals', icon: BookOpen, label: 'Meals' },
  { path: '/debt', icon: CreditCard, label: 'Debt' },
  { path: '/mail', icon: Mail, label: 'Post/Mail' },
  { path: '/admin', icon: FileText, label: 'Life Admin' },
  { path: '/wrap', icon: BookOpen, label: 'Wrap Book' },
  { path: '/weekly', icon: TrendingUp, label: 'Weekly Report' },
];

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-card min-h-screen p-3 gap-0.5 fixed left-0 top-0 bottom-0 overflow-y-auto">
      <div className="px-3 py-4 mb-2">
        <h1 className="font-bold text-base">Smart Organiser</h1>
        <p className="text-xs text-muted-foreground">& Journal</p>
      </div>
      {navItems.map(item => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
