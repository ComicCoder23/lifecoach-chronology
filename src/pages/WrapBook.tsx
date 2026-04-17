import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { CompanionHero } from '@/components/CompanionHero';
import { COMPANION_SCENES } from '@/lib/themes';

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

export default function WrapBook() {
  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero scene="forest" imageOpacity={0.55} className="px-5 pt-6 pb-8 mb-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 module-faith" />
            <p className="text-sm font-medium text-muted-foreground">Memory Album</p>
          </div>
          <h1 className="text-2xl font-bold drop-shadow-sm">Wrap Book</h1>
          <p className="text-sm text-foreground/75 mt-1">Your beautiful reflection pages</p>
        </motion.div>
      </CompanionHero>

      <div className="px-4 space-y-5">
        {pages.map((page, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-warm rounded-2xl border overflow-hidden"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={COMPANION_SCENES[page.scene]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, hsl(var(--background) / 0) 40%, hsl(var(--background) / 0.95) 100%)',
                }}
              />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-semibold drop-shadow-sm">{page.title}</h3>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-muted-foreground">{page.summary}</p>
              <div className="bg-momentum/10 text-momentum rounded-lg p-3 text-sm font-medium text-center">
                🏆 {page.highlight}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
