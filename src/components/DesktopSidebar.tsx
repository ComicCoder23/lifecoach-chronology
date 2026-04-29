import { Home, Rocket, CheckSquare, Clock, Zap, Calendar, Users, CreditCard, Mail, FileText, BookOpen, TrendingUp, Shield, Heart, Utensils, Sparkles, Link2, Brain } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/launch', icon: Rocket, label: 'Launch Mode' },
  { path: '/adp-vault', icon: Shield, label: 'ADP Evidence Vault' },
  { path: '/calendar', icon: Calendar, label: 'Calendar + Diary' },
  { path: '/flow', icon: Sparkles, label: 'Positive Flow' },
  { path: '/content', icon: Sparkles, label: 'Content Engine' },
  { path: '/rescue', icon: Brain, label: 'Momentum Rescue' },
  { path: '/sources', icon: Link2, label: 'Trusted Sources' },
  { path: '/capture', icon: Zap, label: 'Quick Capture' },
  { path: '/family', icon: Users, label: 'Family' },
  { path: '/promises', icon: Heart, label: 'Promise Tracker' },
  { path: '/meals', icon: Utensils, label: 'Meals & SW Coach' },
  { path: '/debt', icon: CreditCard, label: 'Debt & Credit Builder' },
  { path: '/mail', icon: Mail, label: 'Post & Mail Triage' },
  { path: '/disciplines', icon: CheckSquare, label: 'Disciplines' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/admin', icon: FileText, label: 'Life Admin' },
  { path: '/wrap', icon: BookOpen, label: 'Wrap Book' },
  { path: '/weekly', icon: TrendingUp, label: 'Weekly Evolution' },
];

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-sidebar min-h-screen p-3 gap-0.5 fixed left-0 top-0 bottom-0 overflow-y-auto">
      <div className="px-3 py-4 mb-2">
        <h2 className="font-bold text-base" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Smart Organiser</h2>
        <p className="text-xs text-muted-foreground">Your Life OS</p>
      </div>
      {navItems.map(item => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
