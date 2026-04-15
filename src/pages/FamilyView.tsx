import { motion } from 'framer-motion';
import { Users, Phone, MessageCircle } from 'lucide-react';
import { familyContacts, promises } from '@/data/demoData';

export default function FamilyView() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 module-family" />
        <h1 className="text-xl font-bold">Family</h1>
      </div>
      <p className="text-sm text-muted-foreground">Stay connected. Follow through.</p>

      <div className="space-y-3">
        {familyContacts.map((fc, i) => {
          const personPromises = promises.filter(p => p.person.includes(fc.name.split(' ')[0]));
          return (
            <motion.div
              key={fc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold">{fc.name}</p>
                  <p className="text-xs text-muted-foreground">{fc.relationship}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="p-2 rounded-lg bg-module-family border border-module-family">
                    <Phone className="w-3.5 h-3.5 module-family" />
                  </button>
                  <button className="p-2 rounded-lg bg-module-family border border-module-family">
                    <MessageCircle className="w-3.5 h-3.5 module-family" />
                  </button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {fc.lastContact && <p>Last contact: {fc.lastContact}</p>}
                {fc.nextReminder && <p>Next reminder: {fc.nextReminder}</p>}
              </div>
              {personPromises.length > 0 && (
                <div className="mt-2 pt-2 border-t space-y-1">
                  {personPromises.map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                      <p className="text-xs">{p.promise}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${p.status === 'overdue' ? 'bg-priority-critical/10 text-priority-critical' : 'bg-muted text-muted-foreground'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
