import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { promises as seedPromises } from '@/data/demoData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { upsertLifeEvent } from '@/lib/lifeEvents';
import { toast } from '@/hooks/use-toast';
import type { Promise as PromiseT } from '@/types';
import { CompanionHero } from '@/components/CompanionHero';

export default function PromiseTracker() {
  const [items, setItems] = useLocalStorage<PromiseT[]>('promises', seedPromises);
  const [adding, setAdding] = useState(false);
  const [newPromise, setNewPromise] = useState('');
  const [newPerson, setNewPerson] = useState('');
  const [newDue, setNewDue] = useState('');

  const setStatus = (id: string, status: PromiseT['status']) => {
    const next = items.map(p => (p.id === id ? { ...p, status } : p));
    setItems(next);
    const promise = next.find(p => p.id === id);
    if (promise) {
      upsertLifeEvent({
        id: `promise-${promise.id}`,
        type: 'promise',
        sourceId: promise.id,
        module: 'family',
        title: promise.promise,
        date: promise.due,
        timestamp: Date.now(),
        note: promise.person,
        status: promise.status,
        completed: promise.status === 'done',
      });
    }
    if (status === 'done') toast({ title: '✅ Promise kept', description: 'Trust +1.' });
  };

  const handleAdd = () => {
    if (!newPromise.trim() || !newPerson.trim()) return;
    const p: PromiseT = {
      id: crypto.randomUUID(),
      promise: newPromise.trim(),
      person: newPerson.trim(),
      due: newDue.trim() || 'Today',
      status: 'pending',
      trustImpact: 'medium',
      module: 'family',
    };
    setItems([p, ...items]);
    upsertLifeEvent({
      id: `promise-${p.id}`,
      type: 'promise',
      sourceId: p.id,
      module: 'family',
      title: p.promise,
      date: p.due,
      timestamp: Date.now(),
      note: p.person,
      status: p.status,
      completed: false,
    });
    setNewPromise(''); setNewPerson(''); setNewDue('');
    setAdding(false);
    toast({ title: '🤝 Promise logged', description: `To ${p.person}` });
  };

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="promises" title="Promise Tracker" subtitle="🐾 Keep your word · build trust" className="mb-4" />
      <div className="px-4 space-y-4">

      {!adding ? (
        <Button onClick={() => setAdding(true)} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-1" /> New Promise
        </Button>
      ) : (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">New promise</p>
            <button onClick={() => setAdding(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <input value={newPromise} onChange={e => setNewPromise(e.target.value)} placeholder="What did you promise?" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input value={newPerson} onChange={e => setNewPerson(e.target.value)} placeholder="To whom? (Linda, Lisa, Dannielle...)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input value={newDue} onChange={e => setNewDue(e.target.value)} placeholder="Due (e.g. Friday, 24/12/2025)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <Button onClick={handleAdd} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground" disabled={!newPromise.trim() || !newPerson.trim()}>Save Promise</Button>
        </motion.div>
      )}

      <div className="space-y-2">
        <AnimatePresence>
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-xl border p-4"
            >
              <div className="flex items-start justify-between mb-1 gap-2">
                <p className={`text-sm font-medium ${p.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{p.promise}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${p.status === 'overdue' ? 'bg-priority-critical/10 text-priority-critical' : p.status === 'done' ? 'bg-momentum/10 text-momentum' : 'bg-muted text-muted-foreground'}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{p.person} · Due: {p.due}</p>
              <p className="text-xs mt-1">Trust impact: <span className={`font-medium ${p.trustImpact === 'high' ? 'text-priority-high' : 'text-muted-foreground'}`}>{p.trustImpact}</span></p>
              <div className="flex gap-1.5 mt-2">
                {p.status !== 'done' ? (
                  <Button size="sm" variant="outline" onClick={() => setStatus(p.id, 'done')} className="h-7 text-xs">
                    <Check className="w-3 h-3 mr-1" /> Mark done
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => setStatus(p.id, 'pending')} className="h-7 text-xs">
                    <RotateCcw className="w-3 h-3 mr-1" /> Reopen
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
