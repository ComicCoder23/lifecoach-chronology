import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import { appointments } from '@/data/demoData';
import { CompanionHero } from '@/components/CompanionHero';

export default function LifeAdmin() {
  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="admin" title="Life Admin" subtitle="🗂️ Appointments · paperwork · next moves" className="mb-4" />
      <div className="px-4 space-y-4">

      <h2 className="text-sm font-semibold text-muted-foreground">Appointments</h2>
      <div className="space-y-2">
        {appointments.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-semibold">{a.type}</p>
              <ModuleBadge module={a.module} />
            </div>
            <p className="text-xs text-muted-foreground">{a.date} · {a.impactArea}</p>
            <p className="text-xs text-muted-foreground mt-1">Next move: {a.nextMove}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}
