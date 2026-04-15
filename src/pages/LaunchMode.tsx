import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Rocket, ChevronDown, ChevronRight, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleBadge } from '@/components/ModuleBadge';
import { CompletionDrawer } from '@/components/CompletionDrawer';
import { launchStacks as initialStacks, contentPrompts, type LaunchStack, type StackItem } from '@/data/demoData';

export default function LaunchMode() {
  const [stacks, setStacks] = useState<LaunchStack[]>(initialStacks);
  const [expandedStack, setExpandedStack] = useState<string | null>('stack-aa');
  const [drawerItem, setDrawerItem] = useState<{ stackId: string; item: StackItem } | null>(null);
  const [showPrompts, setShowPrompts] = useState(false);

  const totalItems = stacks.reduce((sum, s) => sum + s.items.length, 0);
  const completedItems = stacks.reduce((sum, s) => sum + s.items.filter(i => i.completed).length, 0);
  const percent = Math.round((completedItems / totalItems) * 100);

  const handleComplete = (stackId: string, itemId: string) => {
    setStacks(prev => prev.map(s =>
      s.id === stackId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, completed: true } : i) }
        : s
    ));
    setDrawerItem(null);
  };

  const getStackProgress = (stack: LaunchStack) => {
    const done = stack.items.filter(i => i.completed).length;
    return { done, total: stack.items.length, percent: Math.round((done / stack.items.length) * 100) };
  };

  const nextIncomplete = stacks.flatMap(s => s.items.map(i => ({ stackId: s.id, item: i }))).find(x => !x.item.completed);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Rocket className="w-5 h-5 module-recovery" />
          <h1 className="text-xl font-bold">Launch Mode</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {completedItems === totalItems ? 'All stacks complete! You\'re launched. 🚀' : 'Your morning stacks — grouped by source of truth'}
        </p>
      </motion.div>

      {/* Overall progress */}
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{completedItems}/{totalItems} complete</span>
          <span className="text-sm font-bold text-momentum">{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <motion.div className="bg-momentum h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* Start / Continue button */}
      {nextIncomplete && (
        <Button
          onClick={() => setDrawerItem(nextIncomplete)}
          className="w-full h-14 text-lg bg-momentum hover:bg-momentum/90 text-primary-foreground rounded-xl"
        >
          <Rocket className="w-5 h-5 mr-2" />
          {completedItems === 0 ? 'Start My Day' : `Continue: ${nextIncomplete.item.title}`}
        </Button>
      )}

      {/* Stack cards */}
      <div className="space-y-3">
        {stacks.map((stack, si) => {
          const progress = getStackProgress(stack);
          const isExpanded = expandedStack === stack.id;
          const allDone = progress.done === progress.total;

          return (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.05 }}
              className={`bg-card rounded-xl border overflow-hidden transition-all ${allDone ? 'opacity-60' : ''}`}
            >
              {/* Stack header */}
              <button
                onClick={() => setExpandedStack(isExpanded ? null : stack.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <span className="text-lg">{stack.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{stack.name}</p>
                    <ModuleBadge module={stack.module} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-momentum h-1.5 rounded-full transition-all"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{progress.done}/{progress.total}</span>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>

              {/* Stack items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-1.5">
                      {stack.items.map((item) => {
                        const isNext = nextIncomplete?.item.id === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${item.completed ? 'opacity-50' : isNext ? 'bg-accent ring-1 ring-momentum/30' : 'hover:bg-accent/50'}`}
                          >
                            <button
                              onClick={() => !item.completed && setDrawerItem({ stackId: stack.id, item })}
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.completed ? 'bg-momentum border-momentum' : 'border-muted-foreground/30 hover:border-momentum'}`}
                            >
                              {item.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                            </button>
                            <p className={`text-sm flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.title}
                            </p>
                            {item.contentTrigger && (
                              <span className="text-xs bg-module-content text-content px-1.5 py-0.5 rounded-full module-content">
                                <Sparkles className="w-3 h-3 inline" /> Content
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Content Prompt Suggestions */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <button
          onClick={() => setShowPrompts(!showPrompts)}
          className="w-full p-4 flex items-center gap-3 text-left"
        >
          <Lightbulb className="w-5 h-5 module-content" />
          <p className="text-sm font-semibold flex-1">Post Topic Suggestions</p>
          {showPrompts ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {showPrompts && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {contentPrompts.map(cp => (
                  <div key={cp.id} className="p-3 bg-module-content rounded-lg border border-module-content">
                    <p className="text-xs font-medium module-content mb-1">{cp.source}</p>
                    <p className="text-sm">{cp.hook}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CompletionDrawer
        open={!!drawerItem}
        title={drawerItem?.item.title || ''}
        onClose={() => setDrawerItem(null)}
        onComplete={() => drawerItem && handleComplete(drawerItem.stackId, drawerItem.item.id)}
      />
    </div>
  );
}
