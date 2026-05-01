import { motion } from 'framer-motion';
import { Link2, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Status = 'Connected' | 'Coming Soon' | 'Manual';

interface Integration {
  name: string;
  status: Status;
  lastSynced?: string;
  manualNote: string;
}

interface Category {
  key: string;
  label: string;
  emoji: string;
  color: string;
  items: Integration[];
}

const CONNECTED = new Set([
  'Google Calendar', 'Gmail', 'Notion', 'Airtable', 'GitHub', 'Canva',
]);

const build = (name: string, manualNote: string): Integration => ({
  name,
  status: CONNECTED.has(name) ? 'Connected' : 'Coming Soon',
  lastSynced: CONNECTED.has(name) ? '2 hours ago' : undefined,
  manualNote,
});

const categories: Category[] = [
  {
    key: 'health',
    label: 'Health',
    emoji: '💪',
    color: 'module-health',
    items: [
      build('myAir', 'Screenshot CPAP score and paste into Health page.'),
      build('Sleep Cycle', 'Log sleep hours manually each morning.'),
      build('Samsung Health', 'Manually enter steps + weight in Health Transformation.'),
      build('Google Fit', 'Add daily activity totals manually.'),
      build('Slimming World', 'Toggle SW mode in Health page and log syns by hand.'),
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    emoji: '💷',
    color: 'module-debt',
    items: [
      build('Experian', 'Screenshot monthly credit score into Debt Tracker.'),
      build('TransUnion', 'Paste score updates into Debt Tracker notes.'),
      build('Equifax', 'Manually update score in Debt Tracker.'),
      build('Tesco Clubcard', 'Log point balance and vouchers manually.'),
      build('Debt Tracker (internal)', 'Use built-in Debt Tracker module directly.'),
    ],
  },
  {
    key: 'recovery',
    label: 'Recovery',
    emoji: '💚',
    color: 'module-recovery',
    items: [
      build('I Am Sober', 'Sobriety counter is tracked locally on Dashboard.'),
      build('Bible App', 'Save daily reading via Quick Capture with #faith tag.'),
      build('AA Meeting Finder', 'Log attended meetings in Disciplines or Calendar.'),
    ],
  },
  {
    key: 'social',
    label: 'Social',
    emoji: '📣',
    color: 'module-content',
    items: [
      build('WhatsApp', 'Forward important messages to Quick Capture manually.'),
      build('Instagram', 'Post Content Engine output by hand.'),
      build('TikTok', 'Copy generated scripts into the app.'),
      build('YouTube', 'Paste video links and notes into Scrapbook.'),
      build('Facebook', 'Manual cross-post from Content Engine.'),
      build('Substack', 'Copy long-form posts into Substack manually.'),
      build('LinkedIn', 'Paste professional posts by hand.'),
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    emoji: '🛠️',
    color: 'module-adp',
    items: [
      build('Notion', 'Auto-syncing notes & databases.'),
      build('Airtable', 'Auto-syncing structured records.'),
      build('Google Calendar', 'Two-way calendar sync enabled.'),
      build('Gmail', 'Inbox triage available in Post & Mail.'),
      build('GitHub', 'Repo activity feeding evidence vault.'),
      build('Canva', 'Designs linked into Content Engine.'),
    ],
  },
];

const statusStyle = (status: Status) => {
  switch (status) {
    case 'Connected': return 'bg-module-recovery-light text-module-recovery border-module-recovery/30';
    case 'Coming Soon': return 'bg-module-faith-light text-module-faith border-module-faith/30';
    case 'Manual': return 'bg-muted text-muted-foreground border-border';
  }
};

export default function IntegrationsHub() {
  const total = categories.reduce((acc, c) => acc + c.items.length, 0);
  const connected = categories.reduce((acc, c) => acc + c.items.filter(i => i.status === 'Connected').length, 0);
  const coming = categories.reduce((acc, c) => acc + c.items.filter(i => i.status === 'Coming Soon').length, 0);

  return (
    <div className="max-w-lg mx-auto pb-24">
      <div className="hero-gradient px-5 pt-6 pb-8 rounded-b-3xl mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Plug className="w-5 h-5" />
            <p className="text-sm font-medium text-muted-foreground">Integrations & Connections</p>
          </div>
          <h1 className="text-2xl font-bold">Integrations Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All your tools in one place. Connect, sync, or feed manually.
          </p>
        </motion.div>

        <motion.div className="mt-4 grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{connected}</p>
            <p className="text-[10px] text-muted-foreground">Connected</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{coming}</p>
            <p className="text-[10px] text-muted-foreground">Coming Soon</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border p-3 text-center">
            <p className="text-lg font-bold">{total}</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-6">
        {categories.map((cat, ci) => (
          <motion.section
            key={cat.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.05 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 px-1">
              <span className="text-xl">{cat.emoji}</span>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {cat.label}
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">{cat.items.length}</span>
            </div>

            <div className="grid gap-3">
              {cat.items.map(item => (
                <div key={item.name} className="card-warm rounded-2xl border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full border font-medium bg-${cat.color}-light text-${cat.color}`}>
                        {cat.label}
                      </span>
                    </div>
                    <span className={`shrink-0 text-[10px] px-2 py-1 rounded-full border font-medium ${statusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last synced: <span className="font-medium">{item.lastSynced ?? '—'}</span>
                  </p>

                  <div className="text-[11px] text-muted-foreground bg-accent/40 rounded-lg p-2 border border-border/50">
                    <span className="font-semibold">Manual fallback:</span> {item.manualNote}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    disabled={item.status === 'Connected'}
                  >
                    <Link2 className="w-3.5 h-3.5 mr-1" />
                    {item.status === 'Connected' ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
