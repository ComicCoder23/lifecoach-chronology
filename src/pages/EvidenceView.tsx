import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { recentEvents } from '@/data/demoData';
import { format } from 'date-fns';

export default function EvidenceView() {
  const evidenceEvents = recentEvents.filter(e => e.evidenceRelevance && e.evidenceRelevance !== 'none');
  const highCount = evidenceEvents.filter(e => e.evidenceRelevance === 'high').length;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 module-adp" />
        <h1 className="text-xl font-bold">ADP Evidence</h1>
      </div>

      <div className="bg-card rounded-xl border p-4">
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <p className="text-2xl font-bold module-adp">{evidenceEvents.length}</p>
            <p className="text-xs text-muted-foreground">Total Evidence</p>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-priority-critical">{highCount}</p>
            <p className="text-xs text-muted-foreground">High Relevance</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {evidenceEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-medium">{event.title}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.evidenceRelevance === 'high' ? 'bg-module-adp module-adp' : 'bg-muted text-muted-foreground'}`}>
                {event.evidenceRelevance} relevance
              </span>
            </div>
            {event.note && <p className="text-xs text-muted-foreground mb-2">{event.note}</p>}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{format(event.timestamp, 'EEE d MMM')}</span>
              <PriorityBadge priority={event.priority} />
              {event.mediaType && <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">📎 {event.mediaType}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
