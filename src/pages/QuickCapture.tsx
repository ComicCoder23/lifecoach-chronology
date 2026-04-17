import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, Lightbulb, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CaptureEntry {
  id: string;
  mode: 'journal' | 'idea';
  text: string;
  ts: number;
}

export default function QuickCapture() {
  const [mode, setMode] = useState<'journal' | 'idea'>('journal');
  const [text, setText] = useState('');
  const [entries, setEntries] = useLocalStorage<CaptureEntry[]>('captures', []);

  const handleSave = () => {
    if (!text.trim()) return;
    const entry: CaptureEntry = {
      id: crypto.randomUUID(),
      mode,
      text: text.trim(),
      ts: Date.now(),
    };
    setEntries([entry, ...entries]);
    setText('');
    toast({ title: mode === 'journal' ? '📖 Journal saved' : '💡 Idea captured', description: 'Back to flow.' });
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 module-content" />
        <h1 className="text-xl font-bold">Quick Capture</h1>
      </div>

      <div className="flex gap-2">
        <Button variant={mode === 'journal' ? 'default' : 'outline'} size="sm" onClick={() => setMode('journal')}>
          <BookOpen className="w-4 h-4 mr-1" /> Journal
        </Button>
        <Button variant={mode === 'idea' ? 'default' : 'outline'} size="sm" onClick={() => setMode('idea')}>
          <Lightbulb className="w-4 h-4 mr-1" /> Idea
        </Button>
      </div>

      <motion.div layout className="bg-card rounded-xl border p-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSave(); }}
          placeholder={mode === 'journal' ? "What's on your mind? How are you feeling..." : 'Quick idea — capture it and go...'}
          className="w-full bg-transparent resize-none h-32 focus:outline-none text-sm"
          autoFocus
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{mode === 'journal' ? '📖 Smart Journal' : '💡 Instant Idea'} · ⌘↵ to save</p>
          <Button onClick={handleSave} size="sm" className="bg-momentum hover:bg-momentum/90 text-primary-foreground" disabled={!text.trim()}>
            Save & Return
          </Button>
        </div>
      </motion.div>

      {entries.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent ({entries.length})</p>
          <AnimatePresence>
            {entries.slice(0, 20).map(entry => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card rounded-xl border p-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs">{entry.mode === 'journal' ? '📖' : '💡'}</span>
                      <span className="text-[10px] text-muted-foreground">{format(entry.ts, 'EEE d MMM, h:mma')}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">{entry.text}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-priority-critical p-1"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
