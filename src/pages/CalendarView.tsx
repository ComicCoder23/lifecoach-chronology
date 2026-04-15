import { motion } from 'framer-motion';
import { Calendar as CalIcon } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import { appointments, promises, launchSteps } from '@/data/demoData';

const calendarItems = [
  { time: '07:00', title: 'AM Launch Window', module: 'recovery' as const, type: 'routine' },
  { time: '10:00', title: 'Post content + engage', module: 'content' as const, type: 'task' },
  ...appointments.map(a => ({ time: a.date, title: `${a.type} — ${a.nextMove}`, module: a.module, type: 'appointment' })),
  ...promises.filter(p => p.status !== 'done').map(p => ({ time: p.due, title: p.promise, module: p.module, type: 'promise' })),
];

export default function CalendarView() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <CalIcon className="w-5 h-5 module-health" />
        <h1 className="text-xl font-bold">Calendar & Diary</h1>
      </div>
      <p className="text-sm text-muted-foreground">Everything merged: launches, appointments, promises, diary</p>

      <div className="space-y-2">
        {calendarItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-3 flex items-center gap-3"
          >
            <div className="text-xs text-muted-foreground w-16 flex-shrink-0 text-right">{item.time}</div>
            <div className="flex-1">
              <p className="text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
            </div>
            <ModuleBadge module={item.module} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
