import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, ChevronDown, ChevronRight, Utensils } from 'lucide-react';
import { demoMeals, mealSuggestions, type MealSuggestion } from '@/data/demoData';
import { format } from 'date-fns';

const alignBadge = (a: string) => {
  if (a === 'on-plan') return 'bg-momentum/10 text-momentum';
  if (a === 'mostly') return 'bg-priority-high/10 text-priority-high';
  return 'bg-priority-critical/10 text-priority-critical';
};

const mealCategories: { key: string; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙' },
  { key: 'emergency', label: 'Emergency Low-Energy', emoji: '⚡' },
  { key: 'protein-first', label: 'Protein-First', emoji: '💪' },
  { key: 'gym-day', label: 'Gym Day', emoji: '🏋️' },
];

export default function MealCapture() {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 module-health" />
        <h1 className="text-xl font-bold">Meals & SW Coach</h1>
      </div>
      <p className="text-sm text-muted-foreground">Slimming World aligned meal logging + daily suggestions</p>

      {/* SW Suggestions */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="p-4 flex items-center gap-2 border-b">
          <Lightbulb className="w-4 h-4 module-content" />
          <p className="text-sm font-semibold">Today's Meal Suggestions</p>
        </div>
        <div className="divide-y">
          {mealCategories.map(cat => {
            const suggestions = mealSuggestions.filter(s => s.mealType === cat.key);
            if (suggestions.length === 0) return null;
            const isExpanded = expandedCat === cat.key;
            return (
              <div key={cat.key}>
                <button
                  onClick={() => setExpandedCat(isExpanded ? null : cat.key)}
                  className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-accent/50 transition-colors"
                >
                  <span>{cat.emoji}</span>
                  <span className="text-sm font-medium flex-1">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{suggestions.length} ideas</span>
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                {isExpanded && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-3 space-y-2">
                    {suggestions.map(sg => (
                      <div key={sg.id} className="bg-accent/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{sg.name}</p>
                          {sg.freeFood && <span className="text-[10px] bg-momentum/10 text-momentum px-1.5 py-0.5 rounded-full">Free Food ✓</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{sg.description}</p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>HE: {sg.healthyExtras}</span>
                        </div>
                        <p className="text-xs module-content mt-1">💡 {sg.swTip}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logged Meals */}
      <div className="flex items-center gap-2">
        <Utensils className="w-4 h-4" />
        <h2 className="text-sm font-semibold">Your Logged Meals</h2>
      </div>
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
