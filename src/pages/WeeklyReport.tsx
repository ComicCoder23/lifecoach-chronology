import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';

const weekData = [
  { area: 'Recovery', module: 'recovery' as const, trend: 'up', detail: 'All AM prayers completed. Gratitude list 6/7 days.' },
  { area: 'Content', module: 'content' as const, trend: 'up', detail: '5-day posting streak. 2 posts got 20+ shares.' },
  { area: 'Health', module: 'health' as const, trend: 'stable', detail: 'Supplements consistent. 3 walks. SW meals 5/7.' },
  { area: 'Family', module: 'family' as const, trend: 'up', detail: 'Visited Mum. Replied to Lisa. Babysitting confirmed.' },
  { area: 'ADP', module: 'adp' as const, trend: 'up', detail: 'GP letter captured. 2 new evidence items.' },
  { area: 'Debt', module: 'debt' as const, trend: 'stable', detail: 'Payment on time. Credit builder used under 30%.' },
  { area: 'Faith', module: 'faith' as const, trend: 'down', detail: 'Missed evening prayer 3 days. Grace seed only 2 days.' },
];

const TrendIcon = ({ t }: { t: string }) => {
  if (t === 'up') return <ArrowUp className="w-4 h-4 text-momentum" />;
  if (t === 'down') return <ArrowDown className="w-4 h-4 text-priority-critical" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export default function WeeklyReport() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        <h1 className="text-xl font-bold">Weekly Evolution</h1>
      </div>
      <p className="text-sm text-muted-foreground">Week of 7–13 April 2026</p>

      <div className="space-y-2">
        {weekData.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <TrendIcon t={w.trend} />
                <p className="text-sm font-medium">{w.area}</p>
              </div>
              <ModuleBadge module={w.module} />
            </div>
            <p className="text-xs text-muted-foreground ml-6">{w.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
