import { motion } from 'framer-motion';
import { CreditCard, TrendingUp } from 'lucide-react';
import { debtItems } from '@/data/demoData';

export default function DebtTracker() {
  const totalDebt = debtItems.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <CreditCard className="w-5 h-5 module-debt" />
        <h1 className="text-xl font-bold">Debt & Credit</h1>
      </div>
      <p className="text-sm text-muted-foreground">Climbing the ladder, not drowning in shame.</p>

      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
        <p className="text-2xl font-bold module-debt">£{totalDebt.toLocaleString()}</p>
        <div className="flex items-center gap-1 mt-1 text-momentum text-xs">
          <TrendingUp className="w-3 h-3" /> Reducing steadily
        </div>
      </div>

      <div className="space-y-2">
        {debtItems.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-semibold">{d.creditor}</p>
              <p className="text-sm font-bold module-debt">£{d.balance}</p>
            </div>
            <p className="text-xs text-muted-foreground">{d.status}</p>
            <p className="text-xs text-muted-foreground mt-1">Next: {d.nextMove}</p>
            {d.paymentPlan && <p className="text-xs text-momentum mt-1">Plan: {d.paymentPlan}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
