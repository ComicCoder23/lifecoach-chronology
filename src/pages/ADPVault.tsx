import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Camera, Activity, Brain, Footprints, ArrowUpDown, Bath, Download, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adpEntries, type ADPEntry } from '@/data/demoData';

const typeConfig: Record<string, { label: string; icon: any; color: string }> = {
  'flare-day': { label: 'Flare Day', icon: Activity, color: 'text-priority-critical' },
  'photo': { label: 'Photo Evidence', icon: Camera, color: 'module-adp' },
  'daily-living': { label: 'Daily Living', icon: Bath, color: 'module-health' },
  'mobility': { label: 'Mobility', icon: Footprints, color: 'module-adp' },
  'mental': { label: 'Mental Impact', icon: Brain, color: 'module-adp' },
  'fatigue': { label: 'Fatigue', icon: Activity, color: 'text-priority-high' },
  'walking': { label: 'Walking Tolerance', icon: Footprints, color: 'module-health' },
  'stairs': { label: 'Stairs Difficulty', icon: ArrowUpDown, color: 'module-adp' },
  'self-care': { label: 'Washing / Dressing', icon: Bath, color: 'module-health' },
};

const filterTypes = ['all', 'flare-day', 'fatigue', 'mobility', 'mental', 'self-care', 'stairs', 'walking', 'daily-living'] as const;

export default function ADPVault() {
  const [filter, setFilter] = useState<string>('all');
  const entries = filter === 'all' ? adpEntries : adpEntries.filter(e => e.type === filter);
  const exportReady = adpEntries.filter(e => e.exportReady).length;
  const avgSeverity = Math.round(adpEntries.reduce((s, e) => s + e.severity, 0) / adpEntries.length * 10) / 10;

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 module-adp" />
        <h1 className="text-xl font-bold">ADP Evidence Vault</h1>
      </div>
      <p className="text-sm text-muted-foreground">Your daily living evidence, export-ready for ADP review</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl border p-3 text-center">
          <p className="text-2xl font-bold module-adp">{adpEntries.length}</p>
          <p className="text-xs text-muted-foreground">Total Entries</p>
        </div>
        <div className="bg-card rounded-xl border p-3 text-center">
          <p className="text-2xl font-bold text-priority-critical">{avgSeverity}</p>
          <p className="text-xs text-muted-foreground">Avg Severity</p>
        </div>
        <div className="bg-card rounded-xl border p-3 text-center">
          <p className="text-2xl font-bold text-momentum">{exportReady}</p>
          <p className="text-xs text-muted-foreground">Export Ready</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-module-adp border-module-adp module-adp hover:opacity-80" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Log Entry
        </Button>
        <Button className="flex-1" variant="outline">
          <Camera className="w-4 h-4 mr-1" /> Ankle Photo
        </Button>
        <Button variant="outline" size="icon">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {filterTypes.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${filter === t ? 'bg-accent font-medium border-foreground/20' : 'hover:bg-accent/50'}`}
          >
            {t === 'all' ? 'All' : typeConfig[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entries.map((entry, i) => {
          const config = typeConfig[entry.type] || { label: entry.type, icon: Activity, color: '' };
          const Icon = config.icon;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl border p-4"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <p className="text-sm font-medium">{entry.title}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${entry.severity >= 8 ? 'bg-priority-critical/10 text-priority-critical' : entry.severity >= 6 ? 'bg-priority-high/10 text-priority-high' : 'bg-muted text-muted-foreground'}`}>
                    {entry.severity}/10
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{entry.note}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{entry.date}</span>
                <span className="bg-module-adp module-adp px-1.5 py-0.5 rounded-full text-[10px]">{config.label}</span>
                {entry.photoSlot && <span className="bg-muted px-1.5 py-0.5 rounded-full">📷 Photo</span>}
                {entry.exportReady && <span className="text-momentum">✓ Export ready</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
