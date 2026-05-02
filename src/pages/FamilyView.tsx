import { motion } from 'framer-motion';
import { Users, Phone, MessageCircle, Gift, Calendar, Sparkles } from 'lucide-react';
import { familyContacts, promises } from '@/data/demoData';
import { CompanionHero } from '@/components/CompanionHero';

export default function FamilyView() {
  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="family" title="Family" subtitle="💛 Stay connected · show up" className="mb-4" />
      <div className="px-4 space-y-4">

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

              {/* Cadence + contact info */}
              <div className="text-xs text-muted-foreground space-y-0.5 mb-2">
                {fc.lastContact && <p>Last contact: {fc.lastContact}</p>}
                {fc.contactCadence && <p>📱 Contact: {fc.contactCadence}</p>}
                {fc.visitCadence && <p>🏠 Visits: {fc.visitCadence}</p>}
                {fc.birthday && (
                  <p className="flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Birthday: {fc.birthday}
                  </p>
                )}
                {fc.nextReminder && <p>⏰ Next reminder: {fc.nextReminder}</p>}
              </div>

              {/* Smart prompts */}
              {fc.smartPrompts && fc.smartPrompts.length > 0 && (
                <div className="mb-2 space-y-1">
                  {fc.smartPrompts.map((prompt, pi) => (
                    <button key={pi} className="w-full text-left text-xs bg-module-family rounded-lg px-3 py-2 border border-module-family flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Sparkles className="w-3 h-3 module-family flex-shrink-0" />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Promises */}
              {personPromises.length > 0 && (
                <div className="pt-2 border-t space-y-1">
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
    </div>
  );
}
