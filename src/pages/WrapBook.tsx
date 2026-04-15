import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function WrapBook() {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 module-faith" />
        <h1 className="text-xl font-bold">Wrap Book</h1>
      </div>
      <p className="text-sm text-muted-foreground">Your beautiful reflection pages</p>

      {[
        { title: 'Week of 7 April', summary: 'Strong recovery week. 5-day content streak. Visited Mum twice. GP letter captured for ADP.', highlight: 'Sobriety day 480 milestone' },
        { title: 'Week of 31 March', summary: 'Launched morning chain. First 3 days solid. Meal logging started. Debt payment on time.', highlight: 'Morning chain created' },
      ].map((page, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl border p-6 space-y-3"
        >
          <h3 className="font-semibold">{page.title}</h3>
          <p className="text-sm text-muted-foreground">{page.summary}</p>
          <div className="bg-momentum/10 text-momentum rounded-lg p-3 text-sm font-medium text-center">
            🏆 {page.highlight}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
