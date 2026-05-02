import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, ChevronDown, ChevronRight, Utensils, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { demoMeals, mealSuggestions } from '@/data/demoData';
import type { MealEntry } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CompanionHero } from '@/components/CompanionHero';

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

interface StoredMeal extends Omit<MealEntry, 'timestamp'> { ts: number }

export default function MealCapture() {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [meals, setMeals] = useLocalStorage<StoredMeal[]>(
    'meals',
    demoMeals.map(m => ({ ...m, ts: m.timestamp.getTime() })),
  );
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<{ mealType: MealEntry['mealType']; summary: string; swAlignment: MealEntry['swAlignment']; freeFood: boolean; healthyExtras: string; energyCheck: string }>({
    mealType: 'breakfast', summary: '', swAlignment: 'on-plan', freeFood: true, healthyExtras: '', energyCheck: '',
  });

  const handleAdd = () => {
    if (!draft.summary.trim()) return;
    const meal: StoredMeal = {
      id: crypto.randomUUID(),
      mealType: draft.mealType,
      summary: draft.summary.trim(),
      swAlignment: draft.swAlignment,
      freeFood: draft.freeFood,
      healthyExtras: draft.healthyExtras.trim() || '—',
      energyCheck: draft.energyCheck.trim() || undefined,
      ts: Date.now(),
    };
    setMeals([meal, ...meals]);
    setDraft({ mealType: 'breakfast', summary: '', swAlignment: 'on-plan', freeFood: true, healthyExtras: '', energyCheck: '' });
    setAdding(false);
    toast({ title: '🍽 Meal logged', description: `${meal.mealType} · ${meal.swAlignment}` });
  };

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="meals" title="Meals & SW Coach" subtitle="🌿 Slimming World · daily fuel" className="mb-4" />
      <div className="px-4 space-y-4">

      <Button onClick={() => setAdding(!adding)} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-1" /> Log a meal
      </Button>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-card rounded-xl border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Log a meal</p>
              <button onClick={() => setAdding(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <select value={draft.mealType} onChange={e => setDraft({ ...draft, mealType: e.target.value as MealEntry['mealType'] })} className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option><option value="snack">Snack</option>
            </select>
            <input value={draft.summary} onChange={e => setDraft({ ...draft, summary: e.target.value })} placeholder="Summary (e.g. Porridge + banana + yogurt)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input value={draft.healthyExtras} onChange={e => setDraft({ ...draft, healthyExtras: e.target.value })} placeholder="Healthy Extras (HEa/HEb)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={draft.swAlignment} onChange={e => setDraft({ ...draft, swAlignment: e.target.value as MealEntry['swAlignment'] })} className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="on-plan">On plan</option><option value="mostly">Mostly</option><option value="off-plan">Off plan</option>
            </select>
            <input value={draft.energyCheck} onChange={e => setDraft({ ...draft, energyCheck: e.target.value })} placeholder="Energy 60–90 min later (optional)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={draft.freeFood} onChange={e => setDraft({ ...draft, freeFood: e.target.checked })} />
              Free Food base
            </label>
            <Button onClick={handleAdd} className="w-full" disabled={!draft.summary.trim()}>Save Meal</Button>
          </motion.div>
        )}
      </AnimatePresence>

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
                        <Button
                          size="sm" variant="ghost" className="h-7 text-xs mt-1 -ml-2"
                          onClick={() => { setDraft({ mealType: sg.mealType as MealEntry['mealType'] === 'breakfast' || sg.mealType === 'lunch' || sg.mealType === 'dinner' ? sg.mealType as MealEntry['mealType'] : 'snack', summary: sg.name, swAlignment: 'on-plan', freeFood: !!sg.freeFood, healthyExtras: sg.healthyExtras || '', energyCheck: '' }); setAdding(true); }}
                        >
                          + Log this meal
                        </Button>
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
        <h2 className="text-sm font-semibold">Your Logged Meals ({meals.length})</h2>
      </div>
      <div className="space-y-2">
        <AnimatePresence>
          {meals.map((meal, i) => (
            <motion.div
              key={meal.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-xl border p-4"
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-xs text-muted-foreground capitalize">{meal.mealType} · {format(meal.ts, 'EEE d MMM')}</p>
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
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
