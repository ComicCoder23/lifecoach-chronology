import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ModuleBadge } from '@/components/ModuleBadge';
import { Button } from '@/components/ui/button';
import { appointments, promises, familyContacts } from '@/data/demoData';
import { useLifeEvents, upsertLifeEvent } from '@/lib/lifeEvents';
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { CompanionHero } from '@/components/CompanionHero';

type ViewMode = 'month' | 'week';

interface DiaryEntry {
  date: Date;
  text: string;
}

const calendarEvents = [
  ...appointments.map(a => ({ date: new Date(a.date), title: `${a.type} — ${a.nextMove}`, module: a.module, type: 'appointment' as const })),
  ...promises.filter(p => p.status !== 'done').map(p => ({ date: new Date(p.due), title: p.promise, module: p.module, type: 'promise' as const })),
  ...familyContacts.filter(fc => fc.birthday).map(fc => ({
    date: (() => { const [d, m] = fc.birthday!.split('/'); return new Date(2026, parseInt(m) - 1, parseInt(d)); })(),
    title: `🎂 ${fc.name}'s Birthday`, module: 'family' as const, type: 'birthday' as const,
  })),
];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const lifeEvents = useLifeEvents();
  const [diaryEntries] = useState<DiaryEntry[]>([
    { date: new Date('2026-04-14'), text: 'Good day overall. Walked 20 mins. Feeling positive about recovery.' },
    { date: new Date('2026-04-15'), text: 'Tough morning but got through launch. Visited Mum — lifted my mood.' },
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const days = viewMode === 'month'
    ? eachDayOfInterval({ start: startOfWeek(monthStart, { weekStartsOn: 1 }), end: endOfMonth(currentDate) })
    : eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });

  // Pad month view to full weeks
  const monthDays = viewMode === 'month' ? (() => {
    const s = startOfWeek(monthStart, { weekStartsOn: 1 });
    const lastDay = endOfMonth(currentDate);
    const e = addDays(startOfWeek(lastDay, { weekStartsOn: 1 }), 6);
    return eachDayOfInterval({ start: s, end: e });
  })() : days;

  const displayDays = viewMode === 'month' ? monthDays : days;

  const busEvents = lifeEvents
    .filter(e => ['appointment', 'promise'].includes(e.type))
    .map(e => ({ date: new Date(e.date), title: e.title, module: e.module, type: e.type as 'appointment' | 'promise' }));
  const allCalendarEvents = [...calendarEvents, ...busEvents];
  const getEventsForDate = (date: Date) => allCalendarEvents.filter(e => isSameDay(e.date, date));
  const getDiaryForDate = (date: Date) => diaryEntries.find(d => isSameDay(d.date, date));

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const selectedDiary = selectedDate ? getDiaryForDate(selectedDate) : null;

  return (
    <div className="max-w-lg mx-auto pb-24">
      <CompanionHero module="calendar" title="Calendar & Diary" subtitle="📅 Seasons · time mapped" className="mb-4" />
      <div className="px-4 space-y-4">

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Button size="sm" variant={viewMode === 'month' ? 'default' : 'outline'} onClick={() => setViewMode('month')}>Month</Button>
          <Button size="sm" variant={viewMode === 'week' ? 'default' : 'outline'} onClick={() => setViewMode('week')}>Week</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => setCurrentDate(v => viewMode === 'month' ? subMonths(v, 1) : addDays(v, -7))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {format(currentDate, viewMode === 'month' ? 'MMMM yyyy' : "'W/c' dd/MM/yyyy", { locale: enGB })}
          </span>
          <Button size="icon" variant="ghost" onClick={() => setCurrentDate(v => viewMode === 'month' ? addMonths(v, 1) : addDays(v, 7))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-card rounded-xl border p-3">
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {displayDays.map((day, i) => {
            const events = getEventsForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const diary = getDiaryForDate(day);

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all relative ${
                  isSelected ? 'bg-accent ring-2 ring-foreground/20 font-bold' :
                  isToday(day) ? 'bg-momentum/10 font-bold' :
                  isCurrentMonth ? 'hover:bg-accent/50' : 'text-muted-foreground/40'
                }`}
              >
                <span>{format(day, 'd')}</span>
                {events.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {events.slice(0, 3).map((e, j) => (
                      <div key={j} className={`w-1 h-1 rounded-full bg-module-${e.module === 'family' ? 'family' : e.module === 'health' ? 'health' : 'adp'}`}
                        style={{ backgroundColor: `hsl(var(--${e.module}))` }}
                      />
                    ))}
                  </div>
                )}
                {diary && <div className="w-1 h-1 rounded-full bg-foreground/30 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: enGB })}</h2>
            <Button size="sm" variant="outline" onClick={() => {
              const title = window.prompt('Appointment title or next move?');
              if (!title?.trim() || !selectedDate) return;
              const id = crypto.randomUUID();
              upsertLifeEvent({
                id: `appointment-${id}`,
                type: 'appointment',
                sourceId: id,
                module: 'health',
                title: title.trim(),
                date: format(selectedDate, 'yyyy-MM-dd'),
                timestamp: selectedDate.getTime(),
                note: 'Calendar appointment',
                completed: false,
              });
            }}><Plus className="w-3 h-3 mr-1" /> Add</Button>
          </div>

          {selectedDiary && (
            <div className="bg-card rounded-xl border p-3">
              <p className="text-xs text-muted-foreground mb-1">📝 Diary</p>
              <p className="text-sm">{selectedDiary.text}</p>
            </div>
          )}

          {selectedEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedEvents.map((event, i) => (
                <div key={i} className="bg-card rounded-xl border p-3 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                  </div>
                  <ModuleBadge module={event.module} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl border p-4 text-center text-sm text-muted-foreground">
              No events for this date
            </div>
          )}

          {!selectedDiary && (
            <Button variant="outline" className="w-full text-sm">
              📝 Write diary entry for {format(selectedDate, 'dd/MM')}
            </Button>
          )}
        </motion.div>
      )}
      </div>
    </div>
  );
}
