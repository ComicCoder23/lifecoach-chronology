import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Camera, Mic, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionDrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onComplete: (extras?: { note?: string; media?: string }) => void;
}

export function CompletionDrawer({ open, title, onClose, onComplete }: CompletionDrawerProps) {
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  const handleComplete = () => {
    onComplete(note ? { note } : undefined);
    setNote('');
    setShowNote(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-foreground/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl p-6 safe-bottom shadow-lg border-t"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{title}</h3>
              <button onClick={onClose} className="text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <Button onClick={handleComplete} className="w-full mb-3 h-12 text-base bg-momentum hover:bg-momentum/90 text-primary-foreground">
              <Check className="w-5 h-5 mr-2" /> Mark Complete
            </Button>

            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowNote(!showNote)}>
                <FileText className="w-4 h-4 mr-1" /> Note
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Camera className="w-4 h-4 mr-1" /> Photo
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Mic className="w-4 h-4 mr-1" /> Voice
              </Button>
            </div>

            {showNote && (
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a quick note..."
                className="w-full rounded-lg border bg-secondary p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
