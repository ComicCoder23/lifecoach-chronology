import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Utensils, Moon, Heart, TrendingUp, ChevronDown, ChevronUp, Star, Zap, Brain } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import {
  demoFlowSessions, musicTriggers, triggerCategories,
  breakfastPerformance, breakfastTypes,
  sleepEntries, positiveFunctionEntries,
} from '@/data/flowData';
import { expandedTriggers, momentumRescues } from '@/data/telemetryData';
import { useNavigate } from 'react-router-dom';

const ScoreBar = ({ value, max = 10, color = 'bg-momentum' }: { value: number; max?: number; color?: string }) => (
  <div className="w-full bg-muted rounded-full h-2">
    <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${(value / max) * 100}%` }} />
  </div>
);

const ScorePill = ({ value, max = 10, label }: { value: number; max?: number; label: string }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}/{max}</span>
  </div>
);

export default function PositiveFlow() {
  const [expandedSection, setExpandedSection] = useState<string | null>('flow');
  const [expandedTriggerCat, setExpandedTriggerCat] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggle = (section: string) => setExpandedSection(expandedSection === section ? null : section);
  const allTriggers = [...musicTriggers, ...expandedTriggers];

  const latestFlow = demoFlowSessions[0];
  const bestSession = demoFlowSessions.reduce((a, b) => a.happinessSpike + a.outputQuality > b.happinessSpike + b.outputQuality ? a : b);
  const avgHappiness = Math.round(demoFlowSessions.reduce((s, f) => s + f.happinessSpike, 0) / demoFlowSessions.length * 10) / 10;
  const bestBreakfast = breakfastTypes.reduce((a, b) => a.avgScore > b.avgScore ? a : b);
  const latestSleep = sleepEntries[0];

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Hero */}
      <div className="hero-gradient px-5 pt-6 pb-8 rounded-b-3xl mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-momentum" />
            <p className="text-sm font-medium text-muted-foreground">Positive Flow Intelligence</p>
          </div>
          <h1 className="text-2xl font-bold">What Creates Your Best Self</h1>
        </motion.div>

        {/* Today's predictions */}
        <motion.div className="mt-5 bg-card/80 backdrop-blur-sm rounded-2xl border p-4 space-y-3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Today's Predictions</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-module-recovery border border-module-recovery">
              <p className="text-[10px] font-semibold module-recovery uppercase">Best Trigger</p>
              <p className="text-sm font-medium mt-0.5">🎵 Fred again..</p>
            </div>
            <div className="p-3 rounded-xl bg-module-health border border-module-health">
              <p className="text-[10px] font-semibold module-health uppercase">Best Breakfast</p>
              <p className="text-sm font-medium mt-0.5">{bestBreakfast.emoji} {bestBreakfast.type}</p>
            </div>
            <div className="p-3 rounded-xl bg-module-content border border-module-content">
              <p className="text-[10px] font-semibold module-content uppercase">Flow Window</p>
              <p className="text-sm font-medium mt-0.5">⏰ 11:00–12:00</p>
            </div>
            <div className="p-3 rounded-xl bg-module-faith border border-module-faith">
              <p className="text-[10px] font-semibold module-faith uppercase">Mood Rescue</p>
              <p className="text-sm font-medium mt-0.5">🌿 Tourist set</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-4">
        {/* Creative Flow Window */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <button onClick={() => toggle('flow')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-content flex items-center justify-center">
                <Zap className="w-5 h-5 module-content" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Creative Flow Window</p>
                <p className="text-xs text-muted-foreground">11:00–12:00 · Avg happiness {avgHappiness}/10</p>
              </div>
            </div>
            {expandedSection === 'flow' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'flow' && (
            <div className="px-5 pb-5 space-y-4">
              {/* Latest session */}
              <div className="p-4 rounded-xl bg-card border space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Latest Session</p>
                  <span className="text-xs text-muted-foreground">{latestFlow.date}</span>
                </div>
                <ScorePill value={latestFlow.happinessSpike} label="Happiness spike" />
                <ScoreBar value={latestFlow.happinessSpike} color="bg-momentum" />
                <ScorePill value={latestFlow.outputQuality} label="Output quality" />
                <ScoreBar value={latestFlow.outputQuality} color="bg-content" />
                <ScorePill value={latestFlow.creativeConfidence} label="Creative confidence" />
                <ScoreBar value={latestFlow.creativeConfidence} color="bg-faith" />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="text-xs"><span className="text-muted-foreground">Music: </span><span className="font-medium">{latestFlow.musicTrigger}</span></div>
                  <div className="text-xs"><span className="text-muted-foreground">Task: </span><span className="font-medium">{latestFlow.taskType}</span></div>
                  <div className="text-xs"><span className="text-muted-foreground">Breakfast: </span><span className="font-medium">{latestFlow.breakfastLane}</span></div>
                  <div className="text-xs"><span className="text-muted-foreground">Ankle: </span><span className="font-medium">{latestFlow.anklePain}/10</span></div>
                  <div className="text-xs"><span className="text-muted-foreground">Sleep: </span><span className="font-medium">{latestFlow.sleepScore}/10</span></div>
                  <div className="text-xs"><span className="text-muted-foreground">Ideas: </span><span className="font-medium">{latestFlow.ideasGenerated}</span></div>
                </div>
              </div>

              {/* Best session highlight */}
              <div className="p-4 rounded-xl bg-module-content border border-module-content">
                <p className="text-[10px] font-semibold module-content uppercase tracking-wide mb-1">🏆 Best Session This Week</p>
                <p className="text-sm font-medium">{bestSession.date} · {bestSession.musicTrigger}</p>
                <p className="text-xs text-muted-foreground mt-1">Happiness {bestSession.happinessSpike}/10 · Output {bestSession.outputQuality}/10 · {bestSession.ideasGenerated} ideas</p>
              </div>

              {/* Trend insights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Repeatable Triggers</p>
                {[
                  { label: 'Porridge → high flow', detail: '90% flow score on porridge days' },
                  { label: '8+ hrs sleep → peak creativity', detail: 'Best output follows good CPAP nights' },
                  { label: 'Low ankle pain → longer sessions', detail: 'Pain <3 = avg 65 min flow vs 40 min' },
                ].map(t => (
                  <div key={t.label} className="flex items-start gap-2 p-3 rounded-xl bg-card border">
                    <TrendingUp className="w-4 h-4 text-momentum mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Music Trigger Intelligence */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <button onClick={() => toggle('music')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-recovery flex items-center justify-center">
                <Music className="w-5 h-5 module-recovery" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Music Trigger Library</p>
                <p className="text-xs text-muted-foreground">{musicTriggers.length} triggers · 4 categories</p>
              </div>
            </div>
            {expandedSection === 'music' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'music' && (
            <div className="px-5 pb-5 space-y-3">
              {triggerCategories.map(cat => {
                const catTriggers = allTriggers.filter(t => t.category === cat.key);
                const isOpen = expandedTriggerCat === cat.key;
                return (
                  <div key={cat.key} className="rounded-xl border overflow-hidden">
                    <button onClick={() => setExpandedTriggerCat(isOpen ? null : cat.key)} className="w-full flex items-center justify-between p-3 bg-card hover:bg-accent/50 transition-colors">
                      <span className="text-sm font-medium">{cat.emoji} {cat.label}</span>
                      <span className="text-xs text-muted-foreground">{catTriggers.length} tracks</span>
                    </button>
                    {isOpen && (
                      <div className="p-3 space-y-3 bg-card/50">
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                        {catTriggers.map(t => (
                          <div key={t.id} className="p-3 rounded-lg border bg-card space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{t.artist}</p>
                                <p className="text-xs text-muted-foreground">{t.title}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">▶ {t.replayCount}x</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <ScorePill value={t.anxietyReduction} label="Anxiety ↓" />
                              <ScorePill value={t.outputBoost} label="Output ↑" />
                              <ScorePill value={t.workConsistency} label="Consistency" />
                              <ScorePill value={t.ideasGenerated} label="Ideas" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Breakfast Performance */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <button onClick={() => toggle('breakfast')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-health flex items-center justify-center">
                <Utensils className="w-5 h-5 module-health" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Breakfast → Flow Correlation</p>
                <p className="text-xs text-muted-foreground">Best: {bestBreakfast.emoji} {bestBreakfast.type} ({bestBreakfast.avgScore}%)</p>
              </div>
            </div>
            {expandedSection === 'breakfast' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'breakfast' && (
            <div className="px-5 pb-5 space-y-3">
              {/* Rankings */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Performance Rankings</p>
              {breakfastTypes.sort((a, b) => b.avgScore - a.avgScore).map((bt, i) => (
                <div key={bt.type} className="flex items-center gap-3 p-3 rounded-xl bg-card border">
                  <span className="text-lg w-8 text-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : bt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{bt.type}</p>
                      <span className="text-sm font-bold text-momentum">{bt.avgScore}%</span>
                    </div>
                    <ScoreBar value={bt.avgScore} max={100} color="bg-momentum" />
                    <p className="text-[10px] text-muted-foreground mt-1">{bt.note}</p>
                  </div>
                </div>
              ))}

              {/* Recent meals */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-4">Recent Performance</p>
              {breakfastPerformance.slice(0, 4).map(bp => (
                <div key={bp.id} className="p-3 rounded-xl bg-card border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{bp.type}</p>
                    <span className="text-xs text-muted-foreground">{bp.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-lg font-bold text-momentum">{bp.flowScore}</p>
                      <p className="text-[10px] text-muted-foreground">Flow</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-health">{bp.emotionalSteadiness}</p>
                      <p className="text-[10px] text-muted-foreground">Steady</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: bp.crashRisk <= 2 ? 'hsl(var(--recovery))' : 'hsl(var(--priority-high))' }}>{bp.crashRisk}</p>
                      <p className="text-[10px] text-muted-foreground">Crash</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Sleep + CPAP → Creativity */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <button onClick={() => toggle('sleep')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-adp flex items-center justify-center">
                <Moon className="w-5 h-5 module-adp" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Sleep + CPAP → Creativity</p>
                <p className="text-xs text-muted-foreground">Last night: {latestSleep.hoursSlept}hrs · CPAP {latestSleep.cpapQuality}/10</p>
              </div>
            </div>
            {expandedSection === 'sleep' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'sleep' && (
            <div className="px-5 pb-5 space-y-3">
              {/* Recovery → Creativity feedback loop */}
              <div className="p-4 rounded-xl border bg-module-recovery border-module-recovery">
                <p className="text-[10px] font-semibold module-recovery uppercase tracking-wide mb-2">Recovery → Creativity Feedback Loop</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-lg bg-card font-medium">Sleep {latestSleep.hoursSlept}h</span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded-lg bg-card font-medium">CPAP {latestSleep.cpapQuality}/10</span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded-lg bg-card font-medium">Flow {latestSleep.flowQualityNext}/10</span>
                </div>
              </div>

              {/* Predictions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-card border text-center">
                  <p className="text-2xl font-bold text-momentum">{latestSleep.happinessLikelihood}%</p>
                  <p className="text-[10px] text-muted-foreground">Happiness likelihood</p>
                </div>
                <div className="p-3 rounded-xl bg-card border text-center">
                  <p className="text-2xl font-bold text-health">{latestSleep.moodStability}/10</p>
                  <p className="text-[10px] text-muted-foreground">Mood stability</p>
                </div>
                <div className="p-3 rounded-xl bg-card border text-center">
                  <p className="text-2xl font-bold">{latestSleep.bestCreativeHour}</p>
                  <p className="text-[10px] text-muted-foreground">Best creative hour</p>
                </div>
                <div className="p-3 rounded-xl bg-card border text-center">
                  <p className="text-2xl font-bold" style={{ color: latestSleep.recoveryRisk <= 2 ? 'hsl(var(--recovery))' : 'hsl(var(--priority-critical))' }}>{latestSleep.recoveryRisk}/10</p>
                  <p className="text-[10px] text-muted-foreground">Recovery risk</p>
                </div>
              </div>

              {/* Recent nights */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recent Nights</p>
              {sleepEntries.map(se => (
                <div key={se.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border">
                  <div className="text-center w-12">
                    <p className="text-lg font-bold">{se.hoursSlept}</p>
                    <p className="text-[10px] text-muted-foreground">hrs</p>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{se.date}</span>
                      {se.nightStackComplete && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-module-recovery text-foreground font-medium">PM ✓</span>}
                      {se.ankleFlare && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">Flare</span>}
                    </div>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span>CPAP {se.cpapQuality}/10</span>
                      <span>Flow→ {se.flowQualityNext}/10</span>
                      <span>Risk {se.recoveryRisk}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Positive Function Evidence */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <button onClick={() => toggle('function')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-family flex items-center justify-center">
                <Heart className="w-5 h-5 module-family" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Positive Function Evidence</p>
                <p className="text-xs text-muted-foreground">{positiveFunctionEntries.length} entries · Complements ADP</p>
              </div>
            </div>
            {expandedSection === 'function' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'function' && (
            <div className="px-5 pb-5 space-y-2.5">
              <p className="text-xs text-muted-foreground">Tracks what actively improves function and daily living — evidence of what helps.</p>
              {positiveFunctionEntries.map(pf => (
                <div key={pf.id} className="flex items-start gap-3 p-3 rounded-xl bg-card border">
                  <span className="text-lg mt-0.5">{pf.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{pf.category}</p>
                      <span className="text-xs text-muted-foreground">{pf.date}</span>
                    </div>
                    <p className="text-sm mt-0.5">{pf.description}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3 h-3 text-faith" />
                      <span className="text-xs font-medium">{pf.impactScore}/10 impact</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
