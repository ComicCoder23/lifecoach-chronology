import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, Calendar, Heart, CreditCard, Users, Mail, Shield, TrendingUp, ChevronRight, Moon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModuleBadge } from '@/components/ModuleBadge';
import { launchSteps, promises, appointments } from '@/data/demoData';
import { emotionalStates, type EmotionalState } from '@/data/emotionalStates';
import { format } from 'date-fns';

// Sobriety calc
const SOBRIETY_START = new Date('2025-01-14');
const getSobrietyData = () => {
  const now = new Date();
  const diff = now.getTime() - SOBRIETY_START.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const milestones = [30, 60, 90, 180, 365, 500, 730, 1000];
  const nextMilestone = milestones.find(m => m > days) || days + 100;
  const daysToNext = nextMilestone - days;
  const pct = Math.min(100, Math.round((days / nextMilestone) * 100));
  return { days, weeks, months, nextMilestone, daysToNext, pct };
};

const quickTiles = [
  { icon: Rocket, label: 'Launch', path: '/launch', color: 'bg-module-recovery border-module-recovery module-recovery' },
  { icon: Calendar, label: 'Calendar + Diary', path: '/calendar', color: 'bg-module-health border-module-health module-health' },
  { icon: Mail, label: 'Mail', path: '/mail', color: 'bg-module-mail border-module-mail module-mail' },
  { icon: CreditCard, label: 'Debt', path: '/debt', color: 'bg-module-debt border-module-debt module-debt' },
  { icon: Users, label: 'Family', path: '/family', color: 'bg-module-family border-module-family module-family' },
  { icon: Shield, label: 'ADP Vault', path: '/adp-vault', color: 'bg-module-adp border-module-adp module-adp' },
  { icon: Zap, label: 'Capture', path: '/capture', color: 'bg-module-content border-module-content module-content' },
  { icon: Moon, label: 'PM Close', path: '/launch', color: 'bg-module-recovery border-module-recovery module-recovery' },
];

// Predictive nexts
const predictiveNexts = [
  { label: 'GP Appointment', date: '21/04/2026', module: 'health' as const, icon: '🏥' },
  { label: 'AA Meeting', date: 'Today 7pm', module: 'recovery' as const, icon: '🟢' },
  { label: 'Visit Mum', date: '19/04/2026', module: 'family' as const, icon: '💝' },
  { label: 'Babysit for Danielle', date: '19/04/2026', module: 'family' as const, icon: '👶' },
  { label: 'Credit Card Payment', date: '25/04/2026', module: 'debt' as const, icon: '💳' },
  { label: 'Lara\'s Birthday', date: '25/04/2026', module: 'family' as const, icon: '🎂' },
  { label: 'OT Appointment', date: '05/05/2026', module: 'adp' as const, icon: '🩺' },
  { label: 'Post Content', date: 'Today', module: 'content' as const, icon: '📱' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionalState | null>(null);
  const [showAllEmotions, setShowAllEmotions] = useState(false);

  const sobriety = getSobrietyData();
  const completedLaunch = launchSteps.filter(s => s.completed).length;
  const totalLaunch = launchSteps.length;
  const launchPercent = Math.round((completedLaunch / totalLaunch) * 100);
  const momentumScore = 72;

  const visibleEmotions = showAllEmotions ? emotionalStates : emotionalStates.slice(0, 6);

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Hero gradient header */}
      <div className="hero-gradient px-5 pt-6 pb-8 -mx-0 rounded-b-3xl mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-muted-foreground font-medium">{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
          <h1 className="text-3xl font-bold mt-1">Good Morning ☀️</h1>
        </motion.div>

        {/* Recovery Hero Streak Ring */}
        <motion.div
          className="mt-5 bg-card/80 backdrop-blur-sm rounded-2xl border p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="hsl(var(--recovery))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${sobriety.pct * 2.64} ${264 - sobriety.pct * 2.64}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{sobriety.days}</span>
                <span className="text-[10px] text-muted-foreground font-medium">days</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold module-recovery">Sobriety Streak 💚</p>
              <p className="text-xs text-muted-foreground mt-1">{sobriety.weeks} weeks · {sobriety.months} months</p>
              <div className="mt-2 p-2 bg-module-recovery rounded-lg">
                <p className="text-xs font-medium module-recovery">🎯 {sobriety.daysToNext} days to {sobriety.nextMilestone}-day milestone!</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 italic">I Am Sober sync placeholder →</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-5">
        {/* Emotional State Engine */}
        <motion.div className="card-warm rounded-2xl border p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <p className="text-sm font-semibold mb-3">How are you feeling right now?</p>
          <div className="flex flex-wrap gap-2">
            {visibleEmotions.map(state => (
              <button
                key={state.id}
                onClick={() => setSelectedEmotion(selectedEmotion?.id === state.id ? null : state)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  selectedEmotion?.id === state.id
                    ? 'bg-primary text-primary-foreground border-primary scale-105'
                    : 'bg-card hover:bg-accent border-border'
                }`}
              >
                {state.emoji} {state.label}
              </button>
            ))}
            <button
              onClick={() => setShowAllEmotions(!showAllEmotions)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAllEmotions ? 'Show less' : '+ more'}
            </button>
          </div>

          {/* Support routing */}
          <AnimatePresence>
            {selectedEmotion && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggested next steps</p>
                  {[
                    { label: 'Recovery', action: selectedEmotion.recoveryAction, color: 'module-recovery', bg: 'bg-module-recovery' },
                    { label: 'Faith', action: selectedEmotion.faithAction, color: 'module-faith', bg: 'bg-module-faith' },
                    { label: 'Family', action: selectedEmotion.familyAction, color: 'module-family', bg: 'bg-module-family' },
                    { label: 'Content', action: selectedEmotion.contentAction, color: 'module-content', bg: 'bg-module-content' },
                    { label: 'Health', action: selectedEmotion.healthAction, color: 'module-health', bg: 'bg-module-health' },
                  ].map(s => (
                    <div key={s.label} className={`p-3 ${s.bg} rounded-xl border`}>
                      <p className={`text-[10px] font-semibold ${s.color} uppercase tracking-wide`}>{s.label}</p>
                      <p className="text-sm mt-0.5">{s.action}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Momentum + Content Flywheel */}
        <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="card-warm rounded-2xl border p-4">
            <p className="text-xs text-muted-foreground mb-1">Daily Momentum</p>
            <p className="text-3xl font-bold text-momentum">{momentumScore}%</p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-2">
              <div className="bg-momentum h-2.5 rounded-full transition-all" style={{ width: `${momentumScore}%` }} />
            </div>
          </div>
          <button onClick={() => navigate('/launch')} className="card-warm rounded-2xl border p-4 text-left">
            <p className="text-xs text-muted-foreground mb-1">AM Launch</p>
            <p className="text-3xl font-bold">{launchPercent}%</p>
            <p className="text-xs text-muted-foreground mt-1">{completedLaunch}/{totalLaunch} steps</p>
          </button>
        </motion.div>

        {/* Quick Tiles */}
        <motion.div className="grid grid-cols-4 gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          {quickTiles.map(tile => (
            <button
              key={tile.label}
              onClick={() => navigate(tile.path)}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${tile.color}`}
            >
              <tile.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold leading-tight text-center">{tile.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Predictive Nexts — Life Command Routing */}
        <motion.div className="card-warm rounded-2xl border p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-momentum" />
            <p className="text-sm font-semibold">What Matters Next</p>
          </div>
          <div className="space-y-2.5">
            {predictiveNexts.slice(0, 6).map((next, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
                <span className="text-lg">{next.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{next.label}</p>
                  <p className="text-xs text-muted-foreground">{next.date}</p>
                </div>
                <ModuleBadge module={next.module} />
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Family Promises */}
        <motion.div className="card-warm rounded-2xl border p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <p className="text-sm font-semibold mb-3 module-family">Family Promises</p>
          <div className="space-y-2.5">
            {promises.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-card border">
                <div>
                  <p className="text-sm font-medium">{p.promise}</p>
                  <p className="text-xs text-muted-foreground">{p.person} · {p.due}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === 'overdue' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next Appointment */}
        {appointments[0] && (
          <motion.div className="card-warm rounded-2xl border p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className="text-sm font-semibold mb-3 module-health">Next Appointment</p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-card border">
              <div>
                <p className="text-sm font-medium">{appointments[0].type}</p>
                <p className="text-xs text-muted-foreground">{appointments[0].date} · {appointments[0].nextMove}</p>
              </div>
              <ModuleBadge module={appointments[0].module} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
