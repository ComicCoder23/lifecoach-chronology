import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { promises } from '@/data/demoData';

export default function PromiseTracker() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 module-family" />
        <h1 className="text-xl font-bold">Promise Tracker</h1>
      </div>
      <p className="text-sm text-muted-foreground">Keep your word. Build trust.</p>

      <div className="space-y-2">
        {promises.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-medium">{p.promise}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'overdue' ? 'bg-priority-critical/10 text-priority-critical' : p.status === 'done' ? 'bg-momentum/10 text-momentum' : 'bg-muted text-muted-foreground'}`}>
                {p.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{p.person} · Due: {p.due}</p>
            <p className="text-xs mt-1">Trust impact: <span className={`font-medium ${p.trustImpact === 'high' ? 'text-priority-high' : 'text-muted-foreground'}`}>{p.trustImpact}</span></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
