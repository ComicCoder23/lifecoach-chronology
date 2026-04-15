import { Rocket, CheckSquare, Clock, Zap, Calendar, Shield, Heart, Users, CreditCard, Mail, FileText, BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const moreItems = [
  { path: '/evidence', icon: Shield, label: 'ADP Evidence', color: 'module-adp' },
  { path: '/promises', icon: Heart, label: 'Promises', color: 'module-family' },
  { path: '/meals', icon: BookOpen, label: 'Meals', color: 'module-health' },
  { path: '/debt', icon: CreditCard, label: 'Debt & Credit', color: 'module-debt' },
  { path: '/mail', icon: Mail, label: 'Post & Mail', color: 'module-mail' },
  { path: '/admin', icon: FileText, label: 'Life Admin', color: '' },
  { path: '/wrap', icon: BookOpen, label: 'Wrap Book', color: 'module-faith' },
  { path: '/weekly', icon: TrendingUp, label: 'Weekly Report', color: '' },
];

export default function MoreMenu() {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-bold">More</h1>
      <div className="space-y-1">
        {moreItems.map((item, i) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left"
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
