import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Rocket, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleBadge } from '@/components/ModuleBadge';
import { CompletionDrawer } from '@/components/CompletionDrawer';
import { launchSteps as initialSteps } from '@/data/demoData';
import { LaunchStep } from '@/types';

export default function LaunchMode() {
  const [steps, setSteps] = useState<LaunchStep[]>(initialSteps);
  const [drawerStep, setDrawerStep] = useState<LaunchStep | null>(null);
  const [rescueMode, setRescueMode] = useState(false);

  const displaySteps = rescueMode ? steps.filter(s => s.isRescueStep) : steps;
  const completed = displaySteps.filter(s => s.completed).length;
  const total = displaySteps.length;
  const percent = Math.round((completed / total) * 100);
  const nextStep = displaySteps.find(s => !s.completed);
  const allDone = completed === total;

  const handleComplete = (step: LaunchStep) => {
    setSteps(prev => prev.map(s => s.id === step.id ? { ...s, completed: true } : s));
    setDrawerStep(null);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Rocket className="w-5 h-5 module-recovery" />
          <h1 className="text-xl font-bold">Launch Mode</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {allDone ? 'All done! You\'re launched. 🚀' : rescueMode ? 'Late start — essentials only' : 'Your morning chain'}
        </p>
      </motion.div>

      {/* Progress */}
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{completed}/{total} complete</span>
          <span className="text-sm font-bold text-momentum">{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <motion.div
            className="bg-momentum h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Rescue toggle */}
      <div className="flex gap-2">
        <Button
          variant={rescueMode ? 'outline' : 'default'}
          size="sm"
          onClick={() => setRescueMode(false)}
          className={!rescueMode ? 'bg-momentum hover:bg-momentum/90 text-primary-foreground' : ''}
        >
          Full Chain
        </Button>
        <Button
          variant={rescueMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setRescueMode(true)}
          className={rescueMode ? 'bg-priority-high hover:bg-priority-high/90 text-primary-foreground' : ''}
        >
          <AlertTriangle className="w-3 h-3 mr-1" /> Late Start
        </Button>
      </div>

      {/* Start button */}
      {!allDone && nextStep && (
        <Button
          onClick={() => setDrawerStep(nextStep)}
          className="w-full h-14 text-lg bg-momentum hover:bg-momentum/90 text-primary-foreground rounded-xl"
        >
          <Rocket className="w-5 h-5 mr-2" />
          {completed === 0 ? 'Start My Day' : `Continue: ${nextStep.title}`}
        </Button>
      )}

      {/* Steps list */}
      <div className="space-y-2">
        {displaySteps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-xl border p-3 flex items-center gap-3 transition-all ${step.completed ? 'opacity-60' : nextStep?.id === step.id ? 'ring-2 ring-momentum/50' : ''}`}
          >
            <button
              onClick={() => step.completed ? null : setDrawerStep(step)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${step.completed ? 'bg-momentum border-momentum' : 'border-muted-foreground/30 hover:border-momentum'}`}
            >
              {step.completed && <Check className="w-4 h-4 text-primary-foreground" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>{step.title}</p>
            </div>
            <ModuleBadge module={step.module} />
          </motion.div>
        ))}
      </div>

      <CompletionDrawer
        open={!!drawerStep}
        title={drawerStep?.title || ''}
        onClose={() => setDrawerStep(null)}
        onComplete={() => drawerStep && handleComplete(drawerStep)}
      />
    </div>
  );
}
