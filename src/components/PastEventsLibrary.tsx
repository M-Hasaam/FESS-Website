import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Calendar, CheckCircle2, MapPin, Users } from 'lucide-react';
import {
  PAST_EVENTS,
  PAST_EVENT_CATEGORIES,
  type CompetitionName,
  type PastEventCategory,
} from '../data/fessData';
import { filterPastEventsByCategory } from '../utils/fessLogic';
import { FESS_EASE, Reveal } from './MotionPrimitives';
import { SkewedCarousel } from './ui/skewed-carousel';

interface PastEventsLibraryProps {
  onExploreUpcoming: () => void;
  onOpenRegister: (event?: CompetitionName) => void;
}

export function PastEventsLibrary({
  onExploreUpcoming,
  onOpenRegister,
}: PastEventsLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<PastEventCategory>('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredEvents = filterPastEventsByCategory(PAST_EVENTS, selectedCategory);
  const safeIndex =
    filteredEvents.length > 0 ? Math.min(activeIndex, filteredEvents.length - 1) : 0;
  const activeEvent = filteredEvents[safeIndex] ?? PAST_EVENTS[0];

  const handleCategoryChange = (category: PastEventCategory) => {
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  return (
    <section
      id="past-events-library"
      aria-labelledby="past-events-heading"
      className="py-14 sm:py-24 bg-[#FAF6F0] bg-arch-grid border-b border-[#991B1B]/10 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Library Header + Functional Category Filters */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-2">
              Past Events Library
            </p>
            <h2
              id="past-events-heading"
              className="font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight"
            >
              From the Archive.{' '}
              <span className="text-[#991B1B]">Editions That Built FESS.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Browse summits, student expos, overnight sprints, and founder nights from
              previous semesters. Drag, swipe, or select any skewed card to inspect edition
              outcomes.
            </p>
          </div>

          {/* Interactive Archive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter past events by format"
            className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-sm overflow-x-auto no-scrollbar shrink-0"
          >
            {PAST_EVENT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              const label = category === 'All' ? 'All Editions' : category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'text-white' : 'text-slate-600 hover:text-[#991B1B]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pastEventCategoryTab"
                      transition={{ duration: 0.24, ease: FESS_EASE }}
                      className="absolute inset-0 rounded-lg bg-[#991B1B] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Skewed Carousel Gallery */}
        <SkewedCarousel
          items={filteredEvents}
          activeIndex={safeIndex}
          onActiveIndexChange={setActiveIndex}
          skewAngle={-4.5}
          autoPlayMs={5200}
        />

        {/* Selected Edition Dossier Brief */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeEvent.id}
            data-testid="past-event-brief"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: FESS_EASE }}
            className="mt-8 rounded-3xl bg-white border border-slate-200/85 shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] p-6 sm:p-9 fess-card-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-500">
                  <span className="font-bold text-[#991B1B]">{activeEvent.edition}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeEvent.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>{activeEvent.dateLabel}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#991B1B]" />
                    <span>{activeEvent.venue}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  {activeEvent.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeEvent.summary}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-semibold text-slate-800 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 tabular-nums">
                    <Users className="w-4 h-4 text-[#991B1B]" />
                    <span>{activeEvent.attendanceLabel}</span>
                  </span>
                  <span className="text-slate-300" aria-hidden="true">
                    |
                  </span>
                  <span className="text-[#991B1B] font-mono tabular-nums">
                    {activeEvent.outcomeLabel}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-5 lg:border-l lg:border-slate-100 lg:pl-8">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Key Edition Highlights
                  </div>
                  <ul className="space-y-2.5">
                    {activeEvent.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenRegister('Pitch Arena')}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    Join This Year&apos;s Flagship
                  </button>
                  <button
                    type="button"
                    onClick={onExploreUpcoming}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Upcoming Schedule</span>
                    <ArrowRight className="w-4 h-4 text-[#991B1B]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
