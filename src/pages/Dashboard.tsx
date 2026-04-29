import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Calendar, CreditCard, Users, Shield, TrendingUp, ChevronRight, Moon, Sparkles, Brain, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModuleBadge } from '@/components/ModuleBadge';
import { CompanionHero } from '@/components/CompanionHero';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { launchSteps, promises, appointments } from '@/data/demoData';
import { emotionalStates, type EmotionalState } from '@/data/emotionalStates';
import type { ModuleType } from '@/types';
import { format } from 'date-fns';

// Sobriety calc
const SOBRIETY_START = new Date('2024-09-14');
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
  { icon: Brain, label: 'Rescue', path: '/rescue', color: 'bg-module-content border-module-content module-content' },
  { icon: CreditCard, label: 'Debt', path: '/debt', color: 'bg-module-debt border-module-debt module-debt' },
  { icon: Users, label: 'Family', path: '/family', color: 'bg-module-family border-module-family module-family' },
  { icon: Shield, label: 'ADP Vault', path: '/adp-vault', color: 'bg-module-adp border-module-adp module-adp' },
  { icon: Link2, label: 'Content', path: '/content', color: 'bg-module-content border-module-content module-content' },
  { icon: Moon, label: 'PM Close', path: '/launch', color: 'bg-module-recovery border-module-recovery module-recovery' },
];

interface PromiseEntry {
  id: string;
  promise: string;
  person: string;
  due: string;
  status: 'pending' | 'done' | 'overdue';
}

interface ADPEntry {
  id: string;
  title?: string;
  type?: string;
  note?: string;
  date?: string;
  severity?: number;
  ts?: number;
  timestamp?: number;
}

interface CaptureEntry {
  id: string;
  mode: 'journal' | 'idea';
  text: string;
  ts: number;
}

const parseDueDate = (due?: string) => {
  if (!due) return Date.now();
  if (due.toLowerCase() === 'today') return Date.now();
  const ukDate = due.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ukDate) return new Date(Number(ukDate[3]), Number(ukDate[2]) - 1, Number(ukDate[1])).getTime();
  const parsed = new Date(due).getTime();
  return Number.isNaN(parsed) ? Date.now() : parsed;
};

interface WhatMattersItem {
  id: string;
  label: string;
  date: string;
  sortDate: number;
  module: ModuleType;
  icon: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionalState | null>(null);
  const [showAllEmotions, setShowAllEmotions] = useState(false);
  const [storedPromises] = useLocalStorage<PromiseEntry[]>('promises', []);
  const [adpEntries] = useLocalStorage<ADPEntry[]>('adp-entries', []);
  const [captures] = useLocalStorage<CaptureEntry[]>('captures', []);

  const sobriety = getSobrietyData();
  const completedLaunch = launchSteps.filter(s => s.completed).length;
  const totalLaunch = launchSteps.length;
  const launchPercent = Math.round((completedLaunch / totalLaunch) * 100);
  const momentumScore = 72;
  const whatMattersNext: WhatMattersItem[] = [
    ...storedPromises
      .filter(p => p.status !== 'done')
      .map(p => ({
        id: `promise-${p.id}`,
        label: p.promise,
        date: `${p.person} · ${p.due || 'Today'}`,
        sortDate: parseDueDate(p.due),
        module: 'family' as ModuleType,
        icon: '💝',
      })),
    ...adpEntries.map(e => ({
      id: `adp-${e.id}`,
      label: e.title || e.note || 'ADP evidence entry',
      date: e.date || (e.ts || e.timestamp ? format(e.ts || e.timestamp || Date.now(), 'EEE d MMM') : 'Logged'),
      sortDate: e.ts || e.timestamp || parseDueDate(e.date),
      module: 'adp' as ModuleType,
      icon: '🩺',
    })),
    ...captures.map(c => ({
      id: `capture-${c.id}`,
      label: c.mode === 'idea' ? c.text : 'Journal reflection',
      date: format(c.ts, 'EEE d MMM, h:mma'),
      sortDate: c.ts,
      module: 'content' as ModuleType,
      icon: c.mode === 'idea' ? '💡' : '📖',
    })),
  ].sort((a, b) => b.sortDate - a.sortDate);

  const visibleEmotions = showAllEmotions ? emotionalStates : emotionalStates.slice(0, 6);

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Hero with companion image background */}
      <CompanionHero priority imageOpacity={0.6} className="px-5 pt-6 pb-8 mb-5">
        <motion.div
          className="flex items-start justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-sm text-foreground/80 font-medium drop-shadow-sm">{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
            <h1 className="text-3xl font-bold mt-1 drop-shadow-sm">Good Morning ☀️</h1>
          </div>
          <ThemeSwitcher />
        </motion.div>

        {/* Recovery Hero Streak Ring */}
        <motion.div
          className="mt-5 bg-card/85 backdrop-blur-md rounded-2xl border p-5 shadow-lg"
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
      </CompanionHero>

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

        {/* Momentum + Flow + Launch */}
        <motion.div className="grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="card-warm rounded-2xl border p-4">
            <p className="text-xs text-muted-foreground mb-1">Momentum</p>
            <p className="text-2xl font-bold text-momentum">{momentumScore}%</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-momentum h-2 rounded-full transition-all" style={{ width: `${momentumScore}%` }} />
            </div>
          </div>
          <button onClick={() => navigate('/flow')} className="card-warm rounded-2xl border p-4 text-left hover:scale-105 transition-transform">
            <p className="text-xs text-muted-foreground mb-1">✨ Flow</p>
            <p className="text-2xl font-bold module-content">9/10</p>
            <p className="text-[10px] text-muted-foreground mt-1">Best: 11am</p>
          </button>
          <button onClick={() => navigate('/launch')} className="card-warm rounded-2xl border p-4 text-left hover:scale-105 transition-transform">
            <p className="text-xs text-muted-foreground mb-1">Launch</p>
            <p className="text-2xl font-bold">{launchPercent}%</p>
            <p className="text-[10px] text-muted-foreground mt-1">{completedLaunch}/{totalLaunch}</p>
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
            {whatMattersNext.slice(0, 6).map(next => (
              <div key={next.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
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
