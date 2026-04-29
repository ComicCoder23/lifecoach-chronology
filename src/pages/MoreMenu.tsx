import { Shield, Heart, CreditCard, Mail, FileText, BookOpen, TrendingUp, Utensils, CheckSquare, Clock, Link2, Brain, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const moreItems = [
  { path: '/rescue', icon: Brain, label: 'Momentum Rescue', color: 'module-recovery' },
  { path: '/content', icon: Sparkles, label: 'Content Engine', color: 'module-content' },
  { path: '/sources', icon: Link2, label: 'Trusted Sources', color: 'module-content' },
  { path: '/disciplines', icon: CheckSquare, label: 'Disciplines', color: 'module-recovery' },
  { path: '/timeline', icon: Clock, label: 'Timeline', color: '' },
  { path: '/evidence', icon: FileText, label: 'Evidence Log', color: 'module-adp' },
  { path: '/promises', icon: Heart, label: 'Promise Tracker', color: 'module-family' },
  { path: '/meals', icon: Utensils, label: 'Meals & SW Coach', color: 'module-health' },
  { path: '/debt', icon: CreditCard, label: 'Debt & Credit Builder', color: 'module-debt' },
  { path: '/mail', icon: Mail, label: 'Post & Mail Triage', color: 'module-mail' },
  { path: '/admin', icon: FileText, label: 'Life Admin', color: '' },
  { path: '/wrap', icon: BookOpen, label: 'Wrap Book', color: 'module-faith' },
  { path: '/weekly', icon: TrendingUp, label: 'Weekly Evolution', color: '' },
];

export default function MoreMenu() {
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-6 max-w-lg mx-auto space-y-4 pb-24">
      <h1 className="text-2xl font-bold">More</h1>
      <div className="space-y-1">
        {moreItems.map((item, i) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-accent transition-colors text-left"
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
