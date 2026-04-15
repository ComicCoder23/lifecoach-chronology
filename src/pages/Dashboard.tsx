import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Calendar, Heart, CreditCard, Users, Mail, Shield, BookOpen, TrendingUp, Sun, CloudSun, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModuleBadge } from '@/components/ModuleBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { launchSteps, promises, appointments, recentEvents } from '@/data/demoData';
import { format } from 'date-fns';

const morningStates = [
  { icon: Sun, label: 'Great', color: 'text-momentum' },
  { icon: CloudSun, label: 'OK', color: 'text-faith' },
  { icon: Cloud, label: 'Tough', color: 'text-muted-foreground' },
];

const quickTiles = [
  { icon: Rocket, label: 'Launch', path: '/launch', color: 'bg-module-recovery border-module-recovery module-recovery' },
  { icon: Calendar, label: 'Calendar', path: '/calendar', color: 'bg-module-health border-module-health module-health' },
  { icon: Mail, label: 'Mail', path: '/mail', color: 'bg-module-mail border-module-mail module-mail' },
  { icon: CreditCard, label: 'Debt', path: '/debt', color: 'bg-module-debt border-module-debt module-debt' },
  { icon: Users, label: 'Family', path: '/family', color: 'bg-module-family border-module-family module-family' },
  { icon: Shield, label: 'Evidence', path: '/evidence', color: 'bg-module-adp border-module-adp module-adp' },
  { icon: Zap, label: 'Capture', path: '/capture', color: 'bg-module-content border-module-content module-content' },
  { icon: TrendingUp, label: 'Weekly', path: '/weekly', color: 'bg-module-faith border-module-faith module-faith' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [morningState, setMorningState] = useState<number | null>(null);

  const completedLaunch = launchSteps.filter(s => s.completed).length;
  const totalLaunch = launchSteps.length;
  const launchPercent = Math.round((completedLaunch / totalLaunch) * 100);

  const sobrietyDays = 487;
  const momentumScore = 72;
  const contentStreak = 5;
  const evidenceCount = 14;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Good Morning ☀️</h1>
        <p className="text-muted-foreground text-sm">{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
      </motion.div>

      {/* Morning State Selector */}
      <motion.div className="bg-card rounded-xl border p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <p className="text-sm font-medium mb-2">How are you feeling?</p>
        <div className="flex gap-2">
          {morningStates.map((state, i) => (
            <button
              key={i}
              onClick={() => setMorningState(i)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${morningState === i ? 'bg-accent border-foreground/20 scale-105' : 'hover:bg-accent/50'}`}
            >
              <state.icon className={`w-6 h-6 ${state.color}`} />
              <span className="text-xs font-medium">{state.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Momentum + Key Stats */}
      <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs text-muted-foreground mb-1">Daily Momentum</p>
          <p className="text-3xl font-bold text-momentum">{momentumScore}%</p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div className="bg-momentum h-2 rounded-full transition-all" style={{ width: `${momentumScore}%` }} />
          </div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <p className="text-xs text-muted-foreground mb-1">Sobriety</p>
          <p className="text-3xl font-bold module-recovery">{sobrietyDays}</p>
          <p className="text-xs text-muted-foreground">days strong 💚</p>
        </div>
      </motion.div>

      {/* Content & Audience Flywheel */}
      <motion.div className="bg-card rounded-xl border p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium module-content">Content & Audience</p>
          <ModuleBadge module="content" />
        </div>
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <p className="text-xl font-bold">{contentStreak}</p>
            <p className="text-xs text-muted-foreground">day streak</p>
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold">{evidenceCount}</p>
            <p className="text-xs text-muted-foreground">ADP evidence</p>
          </div>
          <div className="flex-1">
            <p className="text-xl font-bold">{launchPercent}%</p>
            <p className="text-xs text-muted-foreground">AM launch</p>
          </div>
        </div>
      </motion.div>

      {/* Launch Progress */}
      <motion.button
        className="w-full bg-card rounded-xl border p-4 text-left"
        onClick={() => navigate('/launch')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">AM Launch</p>
          <span className="text-xs text-muted-foreground">{completedLaunch}/{totalLaunch}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-momentum h-2.5 rounded-full transition-all" style={{ width: `${launchPercent}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Next: {launchSteps.find(s => !s.completed)?.title}</p>
      </motion.button>

      {/* Quick Tiles */}
      <motion.div className="grid grid-cols-4 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {quickTiles.map(tile => (
          <button
            key={tile.path}
            onClick={() => navigate(tile.path)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all hover:scale-105 ${tile.color}`}
          >
            <tile.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{tile.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Upcoming Promises */}
      <motion.div className="bg-card rounded-xl border p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <p className="text-sm font-medium mb-3 module-family">Family Promises</p>
        <div className="space-y-2">
          {promises.slice(0, 3).map(p => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm">{p.promise}</p>
                <p className="text-xs text-muted-foreground">{p.person} · {p.due}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'overdue' ? 'bg-priority-critical/10 text-priority-critical' : 'bg-muted text-muted-foreground'}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Next Appointment */}
      {appointments[0] && (
        <motion.div className="bg-card rounded-xl border p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <p className="text-sm font-medium mb-2 module-health">Next Appointment</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{appointments[0].type}</p>
              <p className="text-xs text-muted-foreground">{appointments[0].date} · {appointments[0].nextMove}</p>
            </div>
            <ModuleBadge module={appointments[0].module} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
