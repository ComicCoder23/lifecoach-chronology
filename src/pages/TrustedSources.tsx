import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Upload, Clock, ChevronDown, ChevronUp, RefreshCw, FileText, Camera, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { connectorSources, type ConnectorSource } from '@/data/telemetryData';

const statusStyle = (status: ConnectorSource['status']) => {
  switch (status) {
    case 'connected': return 'bg-module-recovery text-foreground';
    case 'manual': return 'bg-module-content text-foreground';
    case 'placeholder': return 'bg-muted text-muted-foreground';
  }
};

const statusLabel = (status: ConnectorSource['status']) => {
  switch (status) {
    case 'connected': return '✓ Connected';
    case 'manual': return '✎ Manual Feed';
    case 'placeholder': return '◌ Placeholder';
  }
};

const categories = [
  { key: 'spiritual', label: '🙏 Spiritual', description: 'Bible, church, prayer sources' },
  { key: 'recovery', label: '💚 Recovery', description: 'Sobriety, AA, step work' },
  { key: 'health', label: '💪 Health', description: 'Sleep, fitness, body data' },
  { key: 'communication', label: '📬 Communication', description: 'Email, photos, evidence' },
  { key: 'calendar', label: '📅 Calendar', description: 'Events, appointments, sync' },
  { key: 'delivery', label: '🛒 Delivery', description: 'Meals, shopping, rescue orders' },
];

export default function TrustedSources() {
  const [expandedCat, setExpandedCat] = useState<string | null>('spiritual');
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  return (
    <div className="max-w-lg mx-auto pb-24">
      <div className="hero-gradient px-5 pt-6 pb-8 rounded-b-3xl mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Link2 className="w-5 h-5 text-momentum" />
            <p className="text-sm font-medium text-muted-foreground">Trusted Sources</p>
          </div>
          <h1 className="text-2xl font-bold">External Intelligence Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect, sync, or manually feed your trusted data sources</p>
        </motion.div>

        <motion.div className="mt-4 grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{connectorSources.filter(c => c.status === 'connected').length}</p>
            <p className="text-[10px] text-muted-foreground">Connected</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{connectorSources.filter(c => c.status === 'manual').length}</p>
            <p className="text-[10px] text-muted-foreground">Manual Feed</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{connectorSources.filter(c => c.status === 'placeholder').length}</p>
            <p className="text-[10px] text-muted-foreground">Placeholders</p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-3">
        {categories.map((cat, ci) => {
          const sources = connectorSources.filter(c => c.category === cat.key);
          const isOpen = expandedCat === cat.key;
          return (
            <motion.div key={cat.key} className="card-warm rounded-2xl border overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: ci * 0.05 }}>
              <button onClick={() => setExpandedCat(isOpen ? null : cat.key)} className="w-full flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{sources.length}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {sources.map(source => {
                    const isSourceOpen = expandedSource === source.id;
                    return (
                      <div key={source.id} className="rounded-xl border overflow-hidden bg-card">
                        <button onClick={() => setExpandedSource(isSourceOpen ? null : source.id)} className="w-full flex items-center gap-3 p-3">
                          <span className="text-xl">{source.icon}</span>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium">{source.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{source.description}</p>
                          </div>
                          <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusStyle(source.status)}`}>{statusLabel(source.status)}</span>
                        </button>
                        {isSourceOpen && (
                          <div className="px-3 pb-3 space-y-3 border-t pt-3">
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Use Cases</p>
                              <div className="flex flex-wrap gap-1.5">
                                {source.useCases.map(uc => (
                                  <span key={uc} className="text-[10px] px-2 py-1 rounded-lg bg-accent font-medium">{uc}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Manual Workaround</p>
                              <p className="text-xs text-muted-foreground">{source.manualFallback}</p>
                            </div>
                            <div className="flex gap-2">
                              {source.status === 'placeholder' ? (
                                <Button size="sm" variant="outline" className="flex-1 text-xs" disabled>
                                  <Link2 className="w-3.5 h-3.5 mr-1" /> Connect (Coming Soon)
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Sync Now
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="text-xs">
                                <Upload className="w-3.5 h-3.5 mr-1" /> Manual
                              </Button>
                            </div>
                            {source.status === 'manual' && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  <Camera className="w-3.5 h-3.5 mr-1" /> Screenshot
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  <FileText className="w-3.5 h-3.5 mr-1" /> Paste Text
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-xs">
                                  <MessageSquare className="w-3.5 h-3.5 mr-1" /> Voice
                                </Button>
                              </div>
                            )}
                            {source.lastSynced && (
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>Last synced: {source.lastSynced}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
