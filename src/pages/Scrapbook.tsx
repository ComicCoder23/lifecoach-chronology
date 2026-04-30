import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { COMPANION_SCENES } from '@/lib/themes';
import { useLifeEvents } from '@/lib/lifeEvents';
import { format } from 'date-fns';

const pages = [
  {
    title: 'Week of 7 April',
    summary: 'Strong recovery week. 5-day content streak. Visited Mum twice. GP letter captured for ADP.',
    highlight: 'Sobriety day 480 milestone',
    scene: 'loyal' as const,
  },
  {
    title: 'Week of 31 March',
    summary: 'Launched morning chain. First 3 days solid. Meal logging started. Debt payment on time.',
    highlight: 'Morning chain created',
    scene: 'sunrise' as const,
  },
];

export default function Scrapbook() {
  const memoryEvents = useLifeEvents().filter(e => e.type === 'capture' && e.tags?.includes('memory'));
  const scrapbookPages = [
    ...memoryEvents.map(e => ({
      title: format(e.timestamp, 'EEE d MMM'),
      summary: e.note || e.title,
      highlight: 'Memory captured',
      scene: 'forest' as const,
    })),
    ...pages,
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-5 pt-6 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-sm border bg-card px-5 py-6 shadow-sm">
          <div className="absolute left-0 right-0 top-0 h-3 bg-background" style={{ clipPath: 'polygon(0 0, 6% 80%, 13% 35%, 21% 95%, 30% 45%, 39% 85%, 48% 30%, 58% 90%, 69% 40%, 80% 80%, 91% 35%, 100% 90%, 100% 0)' }} />
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 module-faith" />
            <p className="text-sm font-medium text-muted-foreground">Memory Album</p>
          </div>
          <h1 className="text-3xl font-bold">Scrapbook</h1>
          <p className="text-sm text-muted-foreground mt-1">Recovery weeks kept like real pages</p>
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto px-5 space-y-7">
        {scrapbookPages.map((page, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative bg-card border p-3 shadow-md ${i % 2 === 0 ? 'rotate-[-1.5deg]' : 'rotate-[1deg]'}`}
            style={{ clipPath: 'polygon(0 1%, 8% 0, 15% 1.4%, 24% 0, 34% 1%, 45% 0, 55% 1.5%, 66% 0, 76% 1.2%, 88% 0, 100% 1%, 99% 100%, 89% 98.8%, 78% 100%, 66% 98.6%, 54% 100%, 43% 99%, 31% 100%, 19% 98.7%, 8% 100%, 0 99%)' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={COMPANION_SCENES[page.scene]}
                alt={page.title}
                loading="lazy"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-2 pt-4 pb-3 space-y-3">
              <h3 className="text-xl font-semibold">{page.title}</h3>
              <p className="text-base leading-relaxed text-foreground/80" style={{ fontFamily: "'Comic Sans MS', 'Bradley Hand', cursive" }}>{page.summary}</p>
              <div className="bg-momentum/10 text-momentum rounded-sm p-3 text-sm font-medium text-center border border-module-recovery">
                🏆 {page.highlight}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
