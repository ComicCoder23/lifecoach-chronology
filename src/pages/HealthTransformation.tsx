import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Dumbbell, HeartPulse, Plus, Scale, Smartphone } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { upsertLifeEvent } from '@/lib/lifeEvents';
import { toast } from '@/hooks/use-toast';

const START_WEIGHT = 31;
const todayKey = format(new Date(), 'yyyy-MM-dd');

interface WeighIn {
  id: string;
  date: string;
  weight: number;
}

interface HealthTransformationState {
  currentWeight: number;
  goalWeight: number;
  slimmingWorldMode: boolean;
  weighIns: WeighIn[];
  gymVisits: string[];
}

const initialState: HealthTransformationState = {
  currentWeight: 31,
  goalWeight: 18,
  slimmingWorldMode: true,
  weighIns: [],
  gymVisits: [],
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function HealthTransformation() {
  const [health, setHealth] = useLocalStorage<HealthTransformationState>('health-transformation', initialState);
  const [logDate, setLogDate] = useState(todayKey);
  const [logWeight, setLogWeight] = useState(String(health.currentWeight));

  const stonesLost = Math.max(0, START_WEIGHT - health.currentWeight);
  const targetLoss = Math.max(1, START_WEIGHT - health.goalWeight);
  const progress = clamp(Math.round((stonesLost / targetLoss) * 100), 0, 100);
  const gymLoggedToday = health.gymVisits.includes(todayKey);
  const milestones = useMemo(() => Array.from({ length: Math.max(1, Math.ceil(targetLoss)) }, (_, i) => i + 1), [targetLoss]);

  const handleWeightLog = () => {
    const weight = Number(logWeight);
    if (!logDate || Number.isNaN(weight) || weight <= 0) return;
    const entry: WeighIn = { id: crypto.randomUUID(), date: logDate, weight };
    setHealth({ ...health, currentWeight: weight, weighIns: [entry, ...health.weighIns] });
    upsertLifeEvent({
      id: `health-weight-${entry.id}`,
      type: 'adp',
      sourceId: `health-weight-${entry.id}`,
      module: 'health',
      title: `Weight logged: ${weight} st`,
      date: entry.date,
      timestamp: new Date(entry.date).getTime(),
      note: `${Math.max(0, START_WEIGHT - weight).toFixed(1)} stone lost from 2023 starting point`,
      metadata: { evidenceType: 'health-weight', weight, stonesLost: START_WEIGHT - weight },
    });
    toast({ title: '⚖️ Weigh-in saved', description: 'Another honest marker on the journey.' });
  };

  const handleGymToday = () => {
    if (gymLoggedToday) return;
    setHealth({ ...health, gymVisits: [todayKey, ...health.gymVisits] });
    toast({ title: '🏋️ Gym visit logged', description: 'Strong choice. Keep building the new rhythm.' });
  };

  return (
    <div className="max-w-lg mx-auto pb-24">
      <div className="hero-gradient px-5 pt-6 pb-6 rounded-b-3xl mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-5 h-5 module-health" />
            <h1 className="text-2xl font-bold">Health Transformation</h1>
          </div>
          <p className="text-sm text-muted-foreground">Steady weight loss, stronger habits, kinder self-talk.</p>
        </motion.div>

        <div className="mt-4 bg-card/80 backdrop-blur-sm rounded-2xl border p-4">
          <div className="flex items-end justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Stones lost</p>
              <p className="text-3xl font-bold module-health">{stonesLost.toFixed(1)}</p>
            </div>
            <p className="text-xs text-muted-foreground text-right">31 st start · {health.goalWeight} st goal</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div className="bg-momentum h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{progress}% of the journey to goal — one good week at a time.</p>
        </div>
      </div>

      <div className="px-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl border p-4">
            <p className="text-xs text-muted-foreground mb-1">Current weight</p>
            <input type="number" step="0.1" value={health.currentWeight} onChange={e => setHealth({ ...health, currentWeight: Number(e.target.value) || 0 })} className="w-full bg-background border rounded-xl px-3 py-2 text-sm" />
          </div>
          <div className="bg-card rounded-2xl border p-4">
            <p className="text-xs text-muted-foreground mb-1">Goal weight</p>
            <input type="number" step="0.1" value={health.goalWeight} onChange={e => setHealth({ ...health, goalWeight: Number(e.target.value) || 0 })} className="w-full bg-background border rounded-xl px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 module-health" />
              <p className="text-sm font-semibold">Weekly weigh-in</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-medium">
              <input type="checkbox" checked={health.slimmingWorldMode} onChange={e => setHealth({ ...health, slimmingWorldMode: e.target.checked })} />
              SW syns {health.slimmingWorldMode ? 'on' : 'off'}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)} className="bg-background border rounded-xl px-3 py-2 text-sm" />
            <input type="number" step="0.1" value={logWeight} onChange={e => setLogWeight(e.target.value)} className="bg-background border rounded-xl px-3 py-2 text-sm" placeholder="Weight st" />
          </div>
          <Button onClick={handleWeightLog} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground">
            <Plus className="w-4 h-4" /> Save weigh-in
          </Button>
        </div>

        <div className="bg-card rounded-2xl border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 module-health" />
            <p className="text-sm font-semibold">Gym rhythm</p>
          </div>
          <Button onClick={handleGymToday} disabled={gymLoggedToday} variant={gymLoggedToday ? 'secondary' : 'outline'} className="w-full">
            {gymLoggedToday ? 'Today logged — brilliant work' : 'Tap to log today’s gym visit'}
          </Button>
          <p className="text-xs text-muted-foreground">{health.gymVisits.length} gym visits recorded. Every session is evidence of change.</p>
        </div>

        <div className="bg-card rounded-2xl border p-4 space-y-3">
          <p className="text-sm font-semibold">Milestone markers</p>
          <div className="grid grid-cols-4 gap-2">
            {milestones.map(stone => {
              const achieved = stonesLost >= stone;
              return <div key={stone} className={`rounded-xl border p-2 text-center text-xs ${achieved ? 'bg-module-health border-module-health module-health font-semibold' : 'bg-background text-muted-foreground'}`}>{stone} st</div>;
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {['Samsung Health', 'Google Fit'].map(name => (
            <div key={name} className="bg-card rounded-2xl border p-4 space-y-3">
              <Smartphone className="w-4 h-4 module-health" />
              <p className="text-sm font-semibold">{name}</p>
              <Button variant="outline" size="sm" className="w-full">Connect</Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 module-health" />
            <h2 className="text-sm font-semibold">Weigh-in log ({health.weighIns.length})</h2>
          </div>
          {health.weighIns.slice(0, 10).map(entry => (
            <div key={entry.id} className="bg-card rounded-xl border p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{entry.weight} stone</p>
                <p className="text-xs text-muted-foreground">{format(new Date(entry.date), 'EEE d MMM yyyy')}</p>
              </div>
              <span className="text-xs bg-module-health module-health px-2 py-1 rounded-full">ADP evidence</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}