import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Camera, Activity, Brain, Footprints, ArrowUpDown, Bath, Download, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adpEntries as seedEntries, type ADPEntry } from '@/data/demoData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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
const entryTypes = filterTypes.filter(t => t !== 'all') as ADPEntry['type'][];

export default function ADPVault() {
  const [filter, setFilter] = useState<string>('all');
  const [items, setItems] = useLocalStorage<ADPEntry[]>('adp-entries', seedEntries);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<{ title: string; type: ADPEntry['type']; severity: number; note: string; photoSlot: boolean }>({
    title: '', type: 'flare-day', severity: 5, note: '', photoSlot: false,
  });

  const entries = filter === 'all' ? items : items.filter(e => e.type === filter);
  const exportReady = items.filter(e => e.exportReady).length;
  const avgSeverity = items.length ? Math.round(items.reduce((s, e) => s + e.severity, 0) / items.length * 10) / 10 : 0;

  const handleAdd = () => {
    if (!draft.title.trim()) return;
    const entry: ADPEntry = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      type: draft.type,
      severity: draft.severity,
      note: draft.note.trim(),
      date: format(new Date(), 'dd/MM/yyyy'),
      photoSlot: draft.photoSlot,
      exportReady: true,
    };
    setItems([entry, ...items]);
    setDraft({ title: '', type: 'flare-day', severity: 5, note: '', photoSlot: false });
    setAdding(false);
    toast({ title: '🛡 Evidence logged', description: `${typeConfig[entry.type]?.label} · severity ${entry.severity}/10` });
  };

  const handleExport = () => {
    const ready = items.filter(e => e.exportReady);
    if (!ready.length) {
      toast({ title: 'Nothing ready to export', description: 'Mark entries as export-ready first.' });
      return;
    }
    const lines = ['Date,Type,Title,Severity,Note', ...ready.map(e => `${e.date},${typeConfig[e.type]?.label || e.type},"${e.title.replace(/"/g, '""')}",${e.severity},"${(e.note || '').replace(/"/g, '""')}"`)];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `adp-evidence-${format(new Date(), 'yyyy-MM-dd')}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: '📥 Exported', description: `${ready.length} entries downloaded.` });
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 module-adp" />
        <h1 className="text-xl font-bold">ADP Evidence Vault</h1>
      </div>
      <p className="text-sm text-muted-foreground">Your daily living evidence, export-ready for ADP review</p>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl border p-3 text-center">
          <p className="text-2xl font-bold module-adp">{items.length}</p>
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

      <div className="flex gap-2">
        <Button onClick={() => setAdding(!adding)} className="flex-1 bg-module-adp border-module-adp module-adp hover:opacity-80" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Log Entry
        </Button>
        <Button onClick={() => { setDraft({ ...draft, photoSlot: true, title: draft.title || 'Ankle photo' }); setAdding(true); }} className="flex-1" variant="outline">
          <Camera className="w-4 h-4 mr-1" /> Ankle Photo
        </Button>
        <Button variant="outline" size="icon" onClick={handleExport}>
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-card rounded-xl border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">New evidence entry</p>
              <button onClick={() => setAdding(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="Title (e.g. Couldn't make stairs after 11am)" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value as ADPEntry['type'] })} className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {entryTypes.map(t => <option key={t} value={t}>{typeConfig[t]?.label || t}</option>)}
            </select>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Severity: <span className="font-bold text-foreground">{draft.severity}/10</span></p>
              <input type="range" min={1} max={10} value={draft.severity} onChange={e => setDraft({ ...draft, severity: Number(e.target.value) })} className="w-full" />
            </div>
            <textarea value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} placeholder="Detail what happened — daily living impact" className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20" />
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={draft.photoSlot} onChange={e => setDraft({ ...draft, photoSlot: e.target.checked })} />
              Photo attached (placeholder)
            </label>
            <Button onClick={handleAdd} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground" disabled={!draft.title.trim()}>Save Evidence</Button>
          </motion.div>
        )}
      </AnimatePresence>

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

      <div className="space-y-2">
        <AnimatePresence>
          {entries.map((entry, i) => {
            const config = typeConfig[entry.type] || { label: entry.type, icon: Activity, color: '' };
            const Icon = config.icon;
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl border p-4"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <p className="text-sm font-medium">{entry.title}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${entry.severity >= 8 ? 'bg-priority-critical/10 text-priority-critical' : entry.severity >= 6 ? 'bg-priority-high/10 text-priority-high' : 'bg-muted text-muted-foreground'}`}>
                    {entry.severity}/10
                  </span>
                </div>
                {entry.note && <p className="text-xs text-muted-foreground mb-2">{entry.note}</p>}
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <span>{entry.date}</span>
                  <span className="bg-module-adp module-adp px-1.5 py-0.5 rounded-full text-[10px]">{config.label}</span>
                  {entry.photoSlot && <span className="bg-muted px-1.5 py-0.5 rounded-full">📷 Photo</span>}
                  {entry.exportReady && <span className="text-momentum">✓ Export ready</span>}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
