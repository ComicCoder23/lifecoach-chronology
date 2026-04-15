import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickCapture() {
  const [mode, setMode] = useState<'journal' | 'idea'>('journal');
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    setSaved(true);
    setText('');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 module-content" />
        <h1 className="text-xl font-bold">Quick Capture</h1>
      </div>

      <div className="flex gap-2">
        <Button
          variant={mode === 'journal' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('journal')}
        >
          <BookOpen className="w-4 h-4 mr-1" /> Journal
        </Button>
        <Button
          variant={mode === 'idea' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('idea')}
        >
          <Lightbulb className="w-4 h-4 mr-1" /> Idea
        </Button>
      </div>

      <motion.div layout className="bg-card rounded-xl border p-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={mode === 'journal' ? 'What\'s on your mind? How are you feeling...' : 'Quick idea — capture it and go...'}
          className="w-full bg-transparent resize-none h-32 focus:outline-none text-sm"
          autoFocus
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{mode === 'journal' ? '📖 Smart Journal' : '💡 Instant Idea'}</p>
          <Button onClick={handleSave} size="sm" className="bg-momentum hover:bg-momentum/90 text-primary-foreground">
            Save & Return
          </Button>
        </div>
      </motion.div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-momentum/10 text-momentum rounded-xl p-3 text-center text-sm font-medium"
        >
          ✅ Captured! Back to flow.
        </motion.div>
      )}
    </div>
  );
}
