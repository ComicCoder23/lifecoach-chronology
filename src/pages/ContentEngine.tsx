import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, Copy, MessageCircle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { upsertLifeEvent } from '@/lib/lifeEvents';
import { toast } from '@/hooks/use-toast';
import { CompanionHero } from '@/components/CompanionHero';

type ReadingSource = 'Bible verse' | 'AA Big Book' | 'Just For Today';
type Channel = 'CSD' | "Who's Funny Anyway" | "Jesus I'm Learning" | 'TTM' | 'Health Transformation';

interface ContentPostLog {
  id: string;
  date: string;
  source: ReadingSource;
  channel: Channel;
  post: string;
  readingPreview: string;
  ts: number;
}

const sources: ReadingSource[] = ['Bible verse', 'AA Big Book', 'Just For Today'];
const channels: Channel[] = ['CSD', "Who's Funny Anyway", "Jesus I'm Learning", 'TTM', 'Health Transformation'];

const channelMeta: Record<Channel, { tagline: string; hashtags: string }> = {
  'CSD': { tagline: 'Choosing Sobriety Daily', hashtags: '#ChoosingSobrietyDaily #Recovery #OneDayAtATime #ScotlandRecovery' },
  "Who's Funny Anyway": { tagline: 'Finding the funny in the mess', hashtags: '#WhosFunnyAnyway #RecoveryHumour #SoberLife' },
  "Jesus I'm Learning": { tagline: 'Faith, slowly and honestly', hashtags: '#JesusImLearning #Faith #Grace #StillLearning' },
  'TTM': { tagline: 'Tools that move things forward', hashtags: '#TTM #Discipline #ResultsOverNoise' },
  'Health Transformation': { tagline: '31 stone and rebuilding', hashtags: '#HealthTransformation #WeightLoss #OneStoneAtATime' },
};

const todayKey = format(new Date(), 'yyyy-MM-dd');

const buildPost = (channel: Channel, source: ReadingSource, reading: string): string => {
  const cleaned = reading.trim();
  if (!cleaned) return '';

  // TODO: Replace local templates with secure backend Claude API call when key is available.
  switch (channel) {
    case 'CSD':
      return `Choosing Sobriety Daily ☀️\n\nFrom today's ${source.toLowerCase()}:\n"${cleaned}"\n\nThis is the bit I'm taking with me — I don't have to fix the whole road, just the next honest step. Recovery keeps reminding me that steadiness beats chaos, and showing up beats hiding.\n\nOne day. This day. Sober.\n\n${channelMeta[channel].hashtags}`;
    case "Who's Funny Anyway":
      return `Right, so today's ${source.toLowerCase()} said:\n"${cleaned}"\n\nMeanwhile I'm sitting here in trackies, on my third cup of tea, pretending I've got my life together. 😅 Recovery is mostly admin and snacks, let's be honest. But I'm clean, I'm laughing, and that'll do for a Tuesday.\n\n${channelMeta[channel].hashtags}`;
    case "Jesus I'm Learning":
      return `Still learning. 🙏\n\n"${cleaned}"\n— ${source}\n\nI don't have this figured out. Most days I'm just trying to listen a wee bit more than I speak, and trust that grace is doing the heavy lifting. Faith for me right now is small, slow and honest — and that's enough.\n\n${channelMeta[channel].hashtags}`;
    case 'TTM':
      return `Today's input → today's action.\n\nSource: ${source}\n"${cleaned}"\n\nThe takeaway: clarity over noise, reps over hype, and one disciplined decision repeated until it compounds. That's the whole game.\n\n${channelMeta[channel].hashtags}`;
    case 'Health Transformation':
      return `Started this journey at 31 stone. Today I'm still showing up. 💪\n\nFrom today's ${source.toLowerCase()}:\n"${cleaned}"\n\nWhat it's teaching me — progress isn't a straight line, it's a repeated honest choice. Weigh-in, walk, water, repeat. Every stone lost is proof that the slow way works.\n\n${channelMeta[channel].hashtags}`;
  }
};

export default function ContentEngine() {
  const [source, setSource] = useState<ReadingSource>('Bible verse');
  const [reading, setReading] = useState('');
  const [channel, setChannel] = useState<Channel>('CSD');
  const [post, setPost] = useState('');
  const [logs, setLogs] = useLocalStorage<ContentPostLog[]>('contentEngine.posts', []);
  const [readingDone, setReadingDone] = useLocalStorage<boolean>(`discipline.dailyReading.${todayKey}`, false);

  const prompt = useMemo(() => {
    return `Channel: ${channel} (${channelMeta[channel].tagline})\nSource: ${source}\n\nReading:\n${reading.trim() || '[paste reading here]'}`;
  }, [channel, source, reading]);

  const handleGenerate = () => {
    if (!reading.trim()) return;
    setPost(buildPost(channel, source, reading));
    toast({ title: '✨ Draft ready', description: `${channel} tone applied.` });
  };

  const handleCopy = async (text: string, label: string) => {
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: label });
  };

  const handleLogPost = () => {
    if (!post.trim()) return;
    const entry: ContentPostLog = {
      id: crypto.randomUUID(),
      date: todayKey,
      source,
      channel,
      post,
      readingPreview: reading.trim().slice(0, 120),
      ts: Date.now(),
    };
    setLogs([entry, ...logs]);
    setReadingDone(true);
    upsertLifeEvent({
      id: `content-post-${entry.id}`,
      type: 'content-post',
      sourceId: entry.id,
      module: 'content',
      title: `${entry.channel} · ${entry.source}`,
      date: entry.date,
      timestamp: entry.ts,
      note: entry.readingPreview,
      completed: true,
      metadata: { channel: entry.channel, source: entry.source },
    });
    upsertLifeEvent({
      id: `discipline-${todayKey}-daily-reading`,
      type: 'discipline',
      sourceId: `${todayKey}-daily-reading`,
      module: 'faith',
      title: 'Daily Reading',
      date: todayKey,
      timestamp: Date.now(),
      completed: true,
      metadata: { disciplineId: 'daily-reading' },
    });
    toast({ title: '📱 Post logged', description: 'Daily reading marked done.' });
  };

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="content" title="CSD — Choosing Sobriety Daily" subtitle="🐩 Morning reading · channel post · discipline done" className="mb-4" />
      <div className="px-4 space-y-4">

      {/* Step 1: source + reading */}
      <motion.div layout className="bg-card rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Step 1 · Daily reading</p>
            <p className="text-xs text-muted-foreground">{format(new Date(), 'EEEE d MMMM')}</p>
          </div>
          <label className="flex items-center gap-2 text-xs font-medium">
            <Checkbox checked={readingDone} onCheckedChange={(v) => {
              const done = v === true;
              setReadingDone(done);
              if (done) {
                upsertLifeEvent({
                  id: `discipline-${todayKey}-daily-reading`,
                  type: 'discipline',
                  sourceId: `${todayKey}-daily-reading`,
                  module: 'faith',
                  title: 'Daily Reading',
                  date: todayKey,
                  timestamp: Date.now(),
                  completed: true,
                  metadata: { disciplineId: 'daily-reading' },
                });
              }
            }} />
            Done
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {sources.map(item => (
            <button
              key={item}
              onClick={() => setSource(item)}
              className={`rounded-xl border px-2 py-2 text-[11px] font-semibold transition-colors ${source === item ? 'bg-module-content border-module-content module-content' : 'bg-background text-muted-foreground'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <Textarea
          value={reading}
          onChange={(e) => setReading(e.target.value)}
          placeholder="Type or paste today's reading here..."
          className="min-h-32 resize-none"
        />
      </motion.div>

      {/* Step 2: channel */}
      <div className="bg-card rounded-xl border p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold">Step 2 · Choose channel</p>
          <p className="text-xs text-muted-foreground">{channelMeta[channel].tagline}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {channels.map(c => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={`rounded-xl border px-2 py-2 text-[11px] font-semibold transition-colors text-left ${channel === c ? 'bg-module-content border-module-content module-content' : 'bg-background text-muted-foreground'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: generate */}
      <div className="bg-card rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 module-content" />
            <p className="text-sm font-semibold">Step 3 · Generate</p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => handleCopy(prompt, 'Prompt copied')}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <Textarea value={prompt} readOnly className="min-h-24 resize-none text-xs bg-muted/40" />
        <Button onClick={handleGenerate} disabled={!reading.trim()} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground">
          <Sparkles className="w-4 h-4" /> Generate {channel} post
        </Button>
      </div>

      {/* Step 4: result */}
      <AnimatePresence>
        {post && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-card rounded-xl border p-4 space-y-3">
            <div>
              <p className="text-sm font-semibold">Step 4 · Copy & post</p>
              <p className="text-xs text-muted-foreground">{channel}</p>
            </div>
            <Textarea value={post} onChange={(e) => setPost(e.target.value)} className="min-h-48 resize-none" />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleCopy(post, channel)}>
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button onClick={handleLogPost}>
                <Check className="w-4 h-4" /> Mark posted
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 module-faith" />
          <h2 className="text-sm font-semibold">Completed posts ({logs.length})</h2>
        </div>
        {logs.slice(0, 8).map(log => (
          <div key={log.id} className="bg-card rounded-xl border p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{log.channel}</p>
                <p className="text-xs text-muted-foreground">{format(log.ts, 'EEE d MMM')} · {log.source}</p>
              </div>
              <span className="text-[10px] bg-module-content module-content px-2 py-1 rounded-full">Posted</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{log.post.slice(0, 140)}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
