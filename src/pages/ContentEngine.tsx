import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, Copy, MessageCircle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';

type ReadingSource = 'Bible verse' | 'AA Big Book passage' | 'Just For Today';
type PostFormat = 'Instagram caption' | 'WhatsApp message' | 'Short reflection';

interface ContentPostLog {
  id: string;
  date: string;
  source: ReadingSource;
  format: PostFormat;
  post: string;
  readingPreview: string;
  ts: number;
}

const sources: ReadingSource[] = ['Bible verse', 'AA Big Book passage', 'Just For Today'];
const formats: PostFormat[] = ['Instagram caption', 'WhatsApp message', 'Short reflection'];

const todayKey = format(new Date(), 'yyyy-MM-dd');

const createDraft = (source: ReadingSource, reading: string, formatType: PostFormat) => {
  const cleaned = reading.trim();
  if (!cleaned) return '';

  if (formatType === 'Instagram caption') {
    return `Morning reflection ☀️\n\n${cleaned}\n\nWhat stood out to me today is that growth does not need to be dramatic to be real. One honest step, one surrendered thought, one better choice — that is still movement.\n\nToday I am choosing steadiness, gratitude, and the next right thing.\n\n#Recovery #Faith #MorningReflection #OneDayAtATime`;
  }

  if (formatType === 'WhatsApp message') {
    return `Morning thought ☀️\n\n${cleaned}\n\nThis spoke to me today: keep it simple, stay honest, and take the next right step. Hope this brings a bit of peace and strength into your morning.`;
  }

  return `Today’s ${source.toLowerCase()} reminded me to slow down and return to what works.\n\n${cleaned}\n\nThe lesson I’m carrying forward is simple: I do not need to fix the whole day at once. I only need to meet this moment with honesty, gratitude, and willingness.`;
};

export default function ContentEngine() {
  const [source, setSource] = useState<ReadingSource>('Bible verse');
  const [reading, setReading] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<PostFormat>('Instagram caption');
  const [customPrompt, setCustomPrompt] = useState('');
  const [drafts, setDrafts] = useState<Record<PostFormat, string>>({
    'Instagram caption': '',
    'WhatsApp message': '',
    'Short reflection': '',
  });
  const [logs, setLogs] = useLocalStorage<ContentPostLog[]>('contentEngine.posts', []);
  const [readingDone, setReadingDone] = useLocalStorage<boolean>(`discipline.dailyReading.${todayKey}`, false);

  const claudePrompt = useMemo(() => {
    return `Turn this ${source} into a warm, honest morning post for Alan. Keep it simple, recovery-aware, faith-sensitive, and shareable. Give me three options: Instagram caption, WhatsApp message, and short reflection.\n\nReading:\n${reading.trim() || '[paste reading here]'}`;
  }, [reading, source]);

  const activePrompt = customPrompt || claudePrompt;
  const activePost = drafts[selectedFormat];

  const handleCreateDrafts = () => {
    if (!reading.trim()) return;
    setDrafts({
      'Instagram caption': createDraft(source, reading, 'Instagram caption'),
      'WhatsApp message': createDraft(source, reading, 'WhatsApp message'),
      'Short reflection': createDraft(source, reading, 'Short reflection'),
    });
    toast({ title: '✨ Drafts prepared', description: 'Pick the format that fits today.' });
  };

  const handleCopy = async (text: string, label: string) => {
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: label });
  };

  const handleLogPost = () => {
    if (!activePost.trim()) return;
    const entry: ContentPostLog = {
      id: crypto.randomUUID(),
      date: todayKey,
      source,
      format: selectedFormat,
      post: activePost,
      readingPreview: reading.trim().slice(0, 120),
      ts: Date.now(),
    };
    setLogs([entry, ...logs]);
    setReadingDone(true);
    toast({ title: '📱 Post logged', description: 'Daily reading marked done.' });
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 module-content" />
        <h1 className="text-xl font-bold">Content Engine</h1>
      </div>

      <motion.div layout className="bg-card rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Daily reading</p>
            <p className="text-xs text-muted-foreground">{format(new Date(), 'EEEE d MMMM')}</p>
          </div>
          <label className="flex items-center gap-2 text-xs font-medium">
            <Checkbox checked={readingDone} onCheckedChange={(v) => setReadingDone(v === true)} />
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
          className="min-h-36 resize-none"
        />

        <Button onClick={handleCreateDrafts} disabled={!reading.trim()} className="w-full bg-momentum hover:bg-momentum/90 text-primary-foreground">
          <Sparkles className="w-4 h-4" /> Create post drafts
        </Button>
      </motion.div>

      <div className="bg-card rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 module-content" />
            <p className="text-sm font-semibold">Claude prompt</p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => handleCopy(activePrompt, 'Prompt ready for Claude')}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <Textarea value={activePrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="min-h-28 resize-none text-xs" />
      </div>

      <AnimatePresence>
        {activePost && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-card rounded-xl border p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {formats.map(formatType => (
                <button
                  key={formatType}
                  onClick={() => setSelectedFormat(formatType)}
                  className={`rounded-xl border px-2 py-2 text-[11px] font-semibold transition-colors ${selectedFormat === formatType ? 'bg-module-content border-module-content module-content' : 'bg-background text-muted-foreground'}`}
                >
                  {formatType.replace(' ', '\n')}
                </button>
              ))}
            </div>

            <Textarea value={activePost} onChange={(e) => setDrafts({ ...drafts, [selectedFormat]: e.target.value })} className="min-h-48 resize-none" />

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleCopy(activePost, selectedFormat)}>
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button onClick={handleLogPost}>
                <Check className="w-4 h-4" /> Log done
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
                <p className="text-sm font-medium">{log.source}</p>
                <p className="text-xs text-muted-foreground">{format(log.ts, 'EEE d MMM')} · {log.format}</p>
              </div>
              <span className="text-[10px] bg-module-content module-content px-2 py-1 rounded-full">Logged</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{log.readingPreview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}