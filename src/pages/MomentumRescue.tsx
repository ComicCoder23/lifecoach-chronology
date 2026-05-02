import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingDown, TrendingUp, Music, Heart, Utensils, BookOpen, Brain, ChevronDown, ChevronUp, Mic, Video, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanionHero } from '@/components/CompanionHero';
import { momentumRescues, demoSpikes, demoVoiceAudits } from '@/data/telemetryData';

const typeIcon = (type: string) => {
  switch (type) {
    case 'music': return Music;
    case 'recovery': return Heart;
    case 'faith': return BookOpen;
    case 'meal': return Utensils;
    case 'task': return Star;
    case 'movement': return Zap;
    default: return Brain;
  }
};

export default function MomentumRescue() {
  const [expandedSection, setExpandedSection] = useState<string | null>('rescue');
  const [logOpen, setLogOpen] = useState(false);
  const toggle = (s: string) => setExpandedSection(expandedSection === s ? null : s);

  const recentDrops = demoSpikes.filter(s => s.type === 'drop');
  const recentSpikes = demoSpikes.filter(s => s.type === 'spike');

  return (
    <div className="max-w-lg mx-auto pb-24">
      {/* Calm grounding scene for slump recovery */}
      <CompanionHero scene="loch" imageOpacity={0.5} className="px-5 pt-6 pb-8 mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-5 h-5 text-momentum" />
            <p className="text-sm font-medium text-muted-foreground">Adaptive Intelligence</p>
          </div>
          <h1 className="text-2xl font-bold drop-shadow-sm">Momentum Rescue Engine</h1>
          <p className="text-sm text-foreground/75 mt-1">Detect slumps · Surface interventions · Restore momentum</p>
        </motion.div>

        <motion.div className="mt-4 flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Button size="sm" className="flex-1 bg-momentum hover:bg-momentum/90 text-primary-foreground" onClick={() => setLogOpen(!logOpen)}>
            <TrendingDown className="w-4 h-4 mr-1" /> Log a Slump
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-card/80 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-1" /> Log a Spike
          </Button>
        </motion.div>
      </CompanionHero>

      <div className="px-5 space-y-4">
        {/* Quick Log Drawer */}
        <AnimatePresence>
          {logOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="card-warm rounded-2xl border p-4 space-y-3">
                <p className="text-sm font-semibold">How are you feeling?</p>
                <textarea placeholder="What happened? What triggered this?" className="w-full rounded-xl border bg-secondary p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring" />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs"><Mic className="w-3.5 h-3.5 mr-1" /> Voice Note</Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs"><Video className="w-3.5 h-3.5 mr-1" /> Video Snap</Button>
                </div>
                <Button size="sm" className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground">Save & Get Rescue</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proven Rescue Interventions */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <button onClick={() => toggle('rescue')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-recovery flex items-center justify-center">
                <Zap className="w-5 h-5 module-recovery" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Proven Rescue Interventions</p>
                <p className="text-xs text-muted-foreground">{momentumRescues.length} interventions · ranked by success</p>
              </div>
            </div>
            {expandedSection === 'rescue' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'rescue' && (
            <div className="px-5 pb-5 space-y-2.5">
              {momentumRescues.sort((a, b) => b.successRate - a.successRate).map((r, i) => {
                const Icon = typeIcon(r.type);
                return (
                  <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl bg-card border">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{r.emoji}</span>
                      <span className="text-[10px] font-bold text-momentum">{r.successRate}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{r.intervention}</p>
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">⏱ ~{r.avgRecoveryMins} min recovery</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs px-2 h-7 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Spike / Drop Timeline */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <button onClick={() => toggle('timeline')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-content flex items-center justify-center">
                <TrendingUp className="w-5 h-5 module-content" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Spike / Drop Telemetry</p>
                <p className="text-xs text-muted-foreground">{demoSpikes.length} entries · {recentSpikes.length} spikes · {recentDrops.length} drops</p>
              </div>
            </div>
            {expandedSection === 'timeline' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'timeline' && (
            <div className="px-5 pb-5 space-y-2.5">
              {demoSpikes.map(sp => (
                <div key={sp.id} className={`flex items-start gap-3 p-3 rounded-xl border ${sp.type === 'spike' ? 'bg-module-recovery border-module-recovery' : 'bg-destructive/5 border-destructive/20'}`}>
                  <div className="mt-0.5">
                    {sp.type === 'spike' ? <TrendingUp className="w-4 h-4 module-recovery" /> : <TrendingDown className="w-4 h-4 text-destructive" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{sp.emotion}</p>
                      <span className="text-xs text-muted-foreground">{sp.timeOfDay}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{sp.triggerSource}</p>
                    <p className="text-xs mt-1">{sp.bodySensation}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${sp.recoverySpeed === 'fast' ? 'bg-module-recovery text-foreground' : sp.recoverySpeed === 'moderate' ? 'bg-module-content text-foreground' : 'bg-destructive/10 text-destructive'}`}>
                        {sp.recoverySpeed} recovery
                      </span>
                      <span className="text-[10px] text-muted-foreground">{sp.timestamp.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Voice + Video Audit Lane */}
        <motion.div className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <button onClick={() => toggle('audits')} className="w-full flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-module-faith flex items-center justify-center">
                <Mic className="w-5 h-5 module-faith" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Voice + Video Audit Lane</p>
                <p className="text-xs text-muted-foreground">{demoVoiceAudits.length} entries · reflections, proofs, snapshots</p>
              </div>
            </div>
            {expandedSection === 'audits' ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expandedSection === 'audits' && (
            <div className="px-5 pb-5 space-y-3">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs"><Mic className="w-3.5 h-3.5 mr-1" /> Record Reflection</Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs"><Video className="w-3.5 h-3.5 mr-1" /> Video Audit</Button>
              </div>
              {demoVoiceAudits.map(va => {
                const typeEmoji = va.type === 'voice-reflection' ? '🎙️' : va.type === 'video-audit' ? '📹' : va.type === 'confidence-snapshot' ? '✨' : '🔧';
                return (
                  <div key={va.id} className="p-3 rounded-xl bg-card border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{typeEmoji}</span>
                        <p className="text-sm font-medium">{va.title}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{va.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{va.summary}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {va.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent font-medium">{tag}</span>
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-auto">{Math.floor(va.durationSecs / 60)}:{(va.durationSecs % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
