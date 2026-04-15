import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import { CompletionDrawer } from '@/components/CompletionDrawer';
import { disciplines as initialDiscs } from '@/data/demoData';
import { Discipline } from '@/types';

const timeBlocks = [
  { key: 'am', label: '🌅 AM' },
  { key: 'day', label: '☀️ Day' },
  { key: 'pm', label: '🌙 PM' },
  { key: 'weekly', label: '📅 Weekly' },
] as const;

export default function Disciplines() {
  const [discs, setDiscs] = useState<Discipline[]>(initialDiscs);
  const [selected, setSelected] = useState<Discipline | null>(null);

  const handleComplete = (d: Discipline) => {
    setDiscs(prev => prev.map(x => x.id === d.id ? { ...x, completed: true } : x));
    setSelected(null);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <CheckSquare className="w-5 h-5" />
        <h1 className="text-xl font-bold">Disciplines</h1>
      </div>

      {timeBlocks.map(block => {
        const items = discs.filter(d => d.timeBlock === block.key);
        if (!items.length) return null;
        return (
          <div key={block.key}>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">{block.label}</h2>
            <div className="space-y-2">
              {items.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card rounded-xl border p-4 ${d.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => d.completed ? null : setSelected(d)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${d.completed ? 'bg-momentum border-momentum' : 'border-muted-foreground/30'}`}
                      >
                        {d.completed && <span className="text-primary-foreground text-xs">✓</span>}
                      </button>
                      <p className={`text-sm font-medium ${d.completed ? 'line-through text-muted-foreground' : ''}`}>{d.title}</p>
                    </div>
                    <div className="flex gap-1">
                      {d.contentTrigger && <span className="text-xs bg-module-content module-content px-1.5 py-0.5 rounded-full">📸</span>}
                      <ModuleBadge module={d.module} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-8">{d.why} · {d.when}</p>
                  <p className="text-xs text-muted-foreground ml-8 mt-0.5">Unlocks: {d.unlocks}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      <CompletionDrawer
        open={!!selected}
        title={selected?.title || ''}
        onClose={() => setSelected(null)}
        onComplete={() => selected && handleComplete(selected)}
      />
    </div>
  );
}
