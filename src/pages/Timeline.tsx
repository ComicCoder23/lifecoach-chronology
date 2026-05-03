import { motion } from 'framer-motion';
import { ModuleBadge } from '@/components/ModuleBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { recentEvents } from '@/data/demoData';
import { format } from 'date-fns';
import { CompanionHero } from '@/components/CompanionHero';

export default function Timeline() {
  const sorted = [...recentEvents].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="timeline" title="Life Timeline" subtitle="🐾 Pawprints across the timeline" className="mb-4" />
      <div className="px-4 space-y-3">
        {sorted.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-medium">{event.title}</p>
              <ModuleBadge module={event.module} />
            </div>
            {event.note && <p className="text-xs text-muted-foreground mb-2">{event.note}</p>}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{format(event.timestamp, 'EEE d MMM, h:mma')}</span>
              <PriorityBadge priority={event.priority} />
              {event.evidenceRelevance === 'high' && (
                <span className="text-xs bg-module-adp module-adp px-1.5 py-0.5 rounded-full">📋 ADP</span>
              )}
              {event.mediaType && event.mediaType !== 'none' && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">📎 {event.mediaType}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
