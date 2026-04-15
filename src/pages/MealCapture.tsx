import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { demoMeals } from '@/data/demoData';
import { format } from 'date-fns';

const alignBadge = (a: string) => {
  if (a === 'on-plan') return 'bg-momentum/10 text-momentum';
  if (a === 'mostly') return 'bg-priority-high/10 text-priority-high';
  return 'bg-priority-critical/10 text-priority-critical';
};

export default function MealCapture() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 module-health" />
        <h1 className="text-xl font-bold">Meals</h1>
      </div>
      <p className="text-sm text-muted-foreground">Slimming World aligned meal logging</p>

      <div className="space-y-2">
        {demoMeals.map((meal, i) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs text-muted-foreground capitalize">{meal.mealType} · {format(meal.timestamp, 'EEE d MMM')}</p>
                <p className="text-sm font-medium mt-0.5">{meal.summary}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${alignBadge(meal.swAlignment)}`}>
                {meal.swAlignment}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
              {meal.freeFood && <p>✅ Free Food base</p>}
              <p>HE: {meal.healthyExtras}</p>
              {meal.energyCheck && <p>⚡ {meal.energyCheck}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
