import { motion } from 'framer-motion';
import { Mail, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanionHero } from '@/components/CompanionHero';

const demoMail = [
  { id: '1', title: 'GP Letter — Fatigue Assessment', state: 'Needs action' as const, deadline: '2026-04-20', evidence: true },
  { id: '2', title: 'Council Tax Bill', state: 'Captured' as const, deadline: '2026-04-30', evidence: false },
  { id: '3', title: 'Pharmacy Prescription', state: 'Done/evidence' as const, deadline: '', evidence: true },
];

const stateStyle = (s: string) => {
  if (s === 'Needs action') return 'bg-priority-high/10 text-priority-high';
  if (s === 'Done/evidence') return 'bg-momentum/10 text-momentum';
  return 'bg-muted text-muted-foreground';
};

export default function PostMail() {
  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="mail" title="Post & Mail" subtitle="✉️ Letters · evidence · action" className="mb-4" />
      <div className="px-4 space-y-4">

      <Button className="w-full bg-mail hover:bg-mail/90 text-primary-foreground">
        <Camera className="w-4 h-4 mr-2" /> Capture New Post
      </Button>

      <div className="space-y-2">
        {demoMail.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-medium">{item.title}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stateStyle(item.state)}`}>{item.state}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {item.deadline && <span>Due: {item.deadline}</span>}
              {item.evidence && <span className="bg-module-adp module-adp px-1.5 py-0.5 rounded-full">📋 ADP</span>}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}
