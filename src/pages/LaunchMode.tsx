import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Rocket, ChevronDown, ChevronRight, Sparkles, Lightbulb, Moon, BookOpen, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleBadge } from '@/components/ModuleBadge';
import { CompletionDrawer } from '@/components/CompletionDrawer';
import { launchStacks as initialStacks, contentPrompts, type LaunchStack, type StackItem } from '@/data/demoData';
import { pmRecoveryStack, prayerLibrary, contentChannels } from '@/data/emotionalStates';
import { useLifeEvents } from '@/lib/lifeEvents';
import { CompanionHero } from '@/components/CompanionHero';

export default function LaunchMode() {
  const lifeEvents = useLifeEvents();
  const completedDisciplineTitles = new Set(lifeEvents.filter(e => e.type === 'discipline' && e.completed).map(e => e.title.toLowerCase()));
  const [stacks, setStacks] = useState<LaunchStack[]>(initialStacks);
  const [expandedStack, setExpandedStack] = useState<string | null>('stack-aa');
  const [drawerItem, setDrawerItem] = useState<{ stackId: string; item: StackItem } | null>(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const [showPM, setShowPM] = useState(false);
  const [showPrayers, setShowPrayers] = useState(false);
  const [showChannels, setShowChannels] = useState(false);
  const [pmItems, setPmItems] = useState(pmRecoveryStack.map(i => ({ ...i })));

  const syncedStacks = stacks.map(stack => ({
    ...stack,
    items: stack.items.map(item => ({ ...item, completed: item.completed || completedDisciplineTitles.has(item.title.toLowerCase()) || (item.title.toLowerCase().includes('daily') && completedDisciplineTitles.has('daily reading')) })),
  }));
  const totalItems = syncedStacks.reduce((sum, s) => sum + s.items.length, 0);
  const completedItems = syncedStacks.reduce((sum, s) => sum + s.items.filter(i => i.completed).length, 0);
  const percent = Math.round((completedItems / totalItems) * 100);

  const handleComplete = (stackId: string, itemId: string) => {
    setStacks(prev => prev.map(s =>
      s.id === stackId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, completed: true } : i) }
        : s
    ));
    setDrawerItem(null);
  };

  const handlePMComplete = (id: string) => {
    setPmItems(prev => prev.map(i => i.id === id ? { ...i, completed: true } : i));
  };

  const getStackProgress = (stack: LaunchStack) => {
    const done = stack.items.filter(i => i.completed).length;
    return { done, total: stack.items.length, percent: Math.round((done / stack.items.length) * 100) };
  };

  const nextIncomplete = syncedStacks.flatMap(s => s.items.map(i => ({ stackId: s.id, item: i }))).find(x => !x.item.completed);

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="launch" title="Launch Mode" subtitle="🐕 Morning stacks · paws on the day" className="px-5 pt-2 pb-6 mb-5">
        <div className="px-5 mt-4 bg-card/80 backdrop-blur-sm rounded-2xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{completedItems}/{totalItems} complete</span>
            <span className="text-sm font-bold text-momentum">{percent}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <motion.div className="bg-momentum h-3 rounded-full" initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>
      </CompanionHero>

      <div className="px-5 space-y-4">
        {/* Start / Continue */}
        {nextIncomplete && (
          <Button
            onClick={() => setDrawerItem(nextIncomplete)}
            className="w-full h-14 text-lg bg-momentum hover:bg-momentum/90 text-primary-foreground rounded-2xl"
          >
            <Rocket className="w-5 h-5 mr-2" />
            {completedItems === 0 ? 'Start My Day' : `Continue: ${nextIncomplete.item.title}`}
          </Button>
        )}

        {/* Stack cards */}
        <div className="space-y-3">
          {syncedStacks.map((stack, si) => {
            const progress = getStackProgress(stack);
            const isExpanded = expandedStack === stack.id;
            const allDone = progress.done === progress.total;

            return (
              <motion.div
                key={stack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.04 }}
                className={`card-warm rounded-2xl border overflow-hidden transition-all ${allDone ? 'opacity-60' : ''}`}
              >
                <button onClick={() => setExpandedStack(isExpanded ? null : stack.id)} className="w-full p-4 flex items-center gap-3 text-left">
                  <span className="text-xl">{stack.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{stack.name}</p>
                      <ModuleBadge module={stack.module} />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-1.5">
                        <div className="bg-momentum h-1.5 rounded-full transition-all" style={{ width: `${progress.percent}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{progress.done}/{progress.total}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-4 pb-4 space-y-1.5">
                        {stack.items.map(item => {
                          const isNext = nextIncomplete?.item.id === item.id;
                          return (
                            <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${item.completed ? 'opacity-50' : isNext ? 'bg-accent ring-1 ring-momentum/30' : 'hover:bg-accent/50'}`}>
                              <button
                                onClick={() => !item.completed && setDrawerItem({ stackId: stack.id, item })}
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.completed ? 'bg-momentum border-momentum' : 'border-muted-foreground/30 hover:border-momentum'}`}
                              >
                                {item.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                              </button>
                              <p className={`text-sm flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>{item.title}</p>
                              {item.contentTrigger && (
                                <span className="text-xs bg-module-content text-content px-1.5 py-0.5 rounded-full">
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

        {/* Prayer Library */}
        <div className="card-warm rounded-2xl border overflow-hidden">
          <button onClick={() => setShowPrayers(!showPrayers)} className="w-full p-4 flex items-center gap-3 text-left">
            <BookOpen className="w-5 h-5 module-faith" />
            <p className="text-sm font-semibold flex-1">Prayer Library</p>
            {showPrayers ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showPrayers && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-2">
                  {prayerLibrary.map(prayer => (
                    <div key={prayer.id} className={`p-3 rounded-xl border ${prayer.favourite ? 'bg-module-faith border-module-faith' : 'bg-card'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-semibold module-faith">{prayer.category}</p>
                        {prayer.favourite && <Heart className="w-3 h-3 text-faith fill-current" />}
                      </div>
                      <p className="text-sm font-medium">{prayer.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prayer.text}</p>
                    </div>
                  ))}
                  <button className="w-full p-3 rounded-xl border border-dashed text-sm text-muted-foreground hover:bg-accent transition-colors">
                    + Save a New Prayer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Channels */}
        <div className="card-warm rounded-2xl border overflow-hidden">
          <button onClick={() => setShowChannels(!showChannels)} className="w-full p-4 flex items-center gap-3 text-left">
            <Sparkles className="w-5 h-5 module-content" />
            <p className="text-sm font-semibold flex-1">Content Channels</p>
            {showChannels ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showChannels && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-2">
                  {contentChannels.map(ch => (
                    <div key={ch.id} className="p-3 bg-module-content rounded-xl border border-module-content flex items-center gap-3">
                      <span className="text-lg">{ch.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{ch.label}</p>
                        <p className="text-xs text-muted-foreground">{'description' in ch ? ch.description : ch.platform}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Post Topic Suggestions */}
        <div className="card-warm rounded-2xl border overflow-hidden">
          <button onClick={() => setShowPrompts(!showPrompts)} className="w-full p-4 flex items-center gap-3 text-left">
            <Lightbulb className="w-5 h-5 module-content" />
            <p className="text-sm font-semibold flex-1">Post Topic Suggestions</p>
            {showPrompts ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showPrompts && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-2">
                  {contentPrompts.map(cp => (
                    <div key={cp.id} className="p-3 bg-module-content rounded-xl border border-module-content">
                      <p className="text-xs font-semibold module-content mb-1">{cp.source}</p>
                      <p className="text-sm">{cp.hook}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PM Recovery Close */}
        <div className="card-warm rounded-2xl border overflow-hidden">
          <button onClick={() => setShowPM(!showPM)} className="w-full p-4 flex items-center gap-3 text-left">
            <Moon className="w-5 h-5 module-recovery" />
            <p className="text-sm font-semibold flex-1">PM Recovery Close</p>
            <span className="text-xs text-muted-foreground">{pmItems.filter(i => i.completed).length}/{pmItems.length}</span>
            {showPM ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showPM && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-1.5">
                  {pmItems.map(item => (
                    <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${item.completed ? 'opacity-50' : 'hover:bg-accent/50'}`}>
                      <button
                        onClick={() => handlePMComplete(item.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.completed ? 'bg-momentum border-momentum' : 'border-muted-foreground/30 hover:border-momentum'}`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                      </button>
                      <p className={`text-sm flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
