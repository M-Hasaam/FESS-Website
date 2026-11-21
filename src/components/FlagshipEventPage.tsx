import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Film, Music } from 'lucide-react';
import {
  COMPETITIONS,
  EVENING_MEDIA,
  EVENING_NIGHTS,
  SCHEDULE_ITEMS,
  type CompetitionName,
  type DayFilter,
} from '../data/fessData';
import { filterScheduleByDay } from '../utils/fessLogic';
import { FESS_EASE, ImageWithFallback, Reveal } from './MotionPrimitives';
import ScrollStack, { ScrollStackItem } from './ui/scroll-stack';

interface FlagshipEventPageProps {
  onOpenRegister: (event?: CompetitionName) => void;
}

const DAY_TABS: { id: DayFilter; label: string }[] = [
  { id: 'all', label: 'Both Days' },
  { id: '1', label: 'Day 1' },
  { id: '2', label: 'Day 2' },
];

export function FlagshipEventPage({ onOpenRegister }: FlagshipEventPageProps) {
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  const visibleSchedule = filterScheduleByDay(SCHEDULE_ITEMS, dayFilter);
  const day1Items = visibleSchedule.filter((item) => item.day === '1');
  const day2Items = visibleSchedule.filter((item) => item.day === '2');

  return (
    <div>
      {/* Sub-page Hero */}
      <section className="bg-[#141923] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/src/assets/images/flagship_pitch_arena_1795208285141.jpg"
            alt="Startup founders presenting at the FESS Flagship Event auditorium"
            fallbackLabel="Flagship Event Stage"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141923] via-[#141923]/90 to-[#450A0A]/80" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300 mb-4">
            FESS Flagship Event · Two Days · Three Competitions · Two Evening Nights
          </p>
          <h1
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
          >
            Flagship Event <span className="text-red-300">Outline &amp; Timeline</span>
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed">
            Over two days we are hosting an Enterprise Expo, a startup Pitch Arena, and a
            Sell Me This Pen challenge, with a Movie Night and a Qawali Night to close each
            day.
          </p>
        </div>
      </section>

      <div className="py-16 sm:py-20 pb-24 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* SECTION A: INTERACTIVE DAY 1 & DAY 2 TIMELINE */}
          <Reveal>
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                    Schedule
                  </span>
                  <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                    Event Timeline
                  </h2>
                </div>

                {/* Animated Segmented Day Filter */}
                <div
                  role="tablist"
                  aria-label="Filter event schedule by day"
                  className="flex w-full sm:w-auto gap-1 bg-[#FAF6F0] p-1.5 rounded-xl border border-[#991B1B]/12"
                >
                  {DAY_TABS.map((tab) => {
                    const active = dayFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setDayFilter(tab.id)}
                        className={`relative flex-1 sm:flex-none min-h-[40px] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                          active
                            ? 'text-white'
                            : 'text-slate-600 hover:text-[#991B1B]'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="scheduleDayTab"
                            transition={{ duration: 0.25, ease: FESS_EASE }}
                            className="absolute inset-0 rounded-lg bg-[#991B1B] shadow-sm"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={dayFilter}
                  data-testid="schedule-grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: FESS_EASE }}
                  className={`grid grid-cols-1 gap-6 sm:gap-8 ${
                    dayFilter === 'all' ? 'lg:grid-cols-2' : ''
                  }`}
                >
                  {day1Items.length > 0 && (
                    <div className="rounded-2xl bg-[#FAF6F0]/80 border border-[#991B1B]/10 p-4 sm:p-6">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#991B1B] mb-4 sm:mb-5">
                        Day 1
                      </div>
                      <div className="space-y-3.5 sm:space-y-4">
                        {day1Items.map((item) => (
                          <div
                            key={`d1-${item.title}`}
                            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-[#991B1B]/30 transition-colors"
                          >
                            <div className="font-mono text-xs font-bold text-[#991B1B] tabular-nums mb-1">
                              {item.time}
                            </div>
                            <div className="font-extrabold text-base sm:text-lg text-slate-900">
                              {item.title}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 mt-0.5">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {day2Items.length > 0 && (
                    <div className="rounded-2xl bg-[#FAF6F0]/80 border border-[#991B1B]/10 p-4 sm:p-6">
                      <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#991B1B] mb-4 sm:mb-5">
                        Day 2
                      </div>
                      <div className="space-y-3.5 sm:space-y-4">
                        {day2Items.map((item) => (
                          <div
                            key={`d2-${item.title}`}
                            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-[#991B1B]/30 transition-colors"
                          >
                            <div className="font-mono text-xs font-bold text-[#991B1B] tabular-nums mb-1">
                              {item.time}
                            </div>
                            <div className="font-extrabold text-base sm:text-lg text-slate-900">
                              {item.title}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 mt-0.5">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* SECTION B: REGISTRATION FEES AT A GLANCE */}
          <Reveal>
            <div className="mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                Summary
              </span>
              <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
                Registration Fees at a Glance
              </h2>
            </div>

            {/* Mobile-First Stacked Interactive Fee Cards */}
            <div className="md:hidden space-y-3.5">
              {COMPETITIONS.map((comp) => (
                <div
                  key={`m-${comp.id}`}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900">{comp.id}</h3>
                      <p className="text-xs text-slate-500">{comp.participantsLabel}</p>
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#991B1B]/20 text-[#991B1B] tabular-nums shrink-0">
                      {comp.feeShort}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Awards:</strong> {comp.prizeSummary}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenRegister(comp.id)}
                    className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-colors ${
                      comp.id === 'Enterprise Expo'
                        ? 'bg-slate-900 hover:bg-[#991B1B]'
                        : 'bg-[#991B1B] hover:bg-[#7F1D1D]'
                    }`}
                  >
                    Register for {comp.id}
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#7F1D1D] to-[#141923] text-white text-xs font-mono uppercase tracking-wider">
                      <th className="py-4 px-6">Event</th>
                      <th className="py-4 px-6">Participants</th>
                      <th className="py-4 px-6">Fee (PKR)</th>
                      <th className="py-4 px-6">Prize / Awards</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {COMPETITIONS.map((comp) => (
                      <tr
                        key={comp.id}
                        className="hover:bg-[#FAF6F0]/60 transition-colors"
                      >
                        <td className="py-5 px-6 font-extrabold text-slate-900 whitespace-nowrap">
                          {comp.id}
                        </td>
                        <td className="py-5 px-6 text-slate-600">
                          {comp.participantsLabel}
                        </td>
                        <td className="py-5 px-6 font-mono font-bold text-[#991B1B] tabular-nums whitespace-nowrap">
                          {comp.id === 'Enterprise Expo'
                            ? '8,000 per stall'
                            : comp.feeNumeric.toLocaleString('en-US')}
                        </td>
                        <td className="py-5 px-6 text-slate-700">{comp.prizeSummary}</td>
                        <td className="py-5 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => onOpenRegister(comp.id)}
                            className={`px-4 py-2 rounded-xl text-white text-xs font-semibold transition-colors whitespace-nowrap ${
                              comp.id === 'Enterprise Expo'
                                ? 'bg-slate-900 hover:bg-[#991B1B]'
                                : 'bg-[#991B1B] hover:bg-[#7F1D1D]'
                            }`}
                          >
                            Register
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* SECTION C: FLAGSHIP EVENTS SHOWCASE (SCROLL STACK) */}
          <section aria-labelledby="flagship-events-showcase-heading">
            <Reveal className="mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                    Flagship Events Showcase
                  </span>
                  <h2
                    id="flagship-events-showcase-heading"
                    className="font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1"
                  >
                    Detailed Competition &amp; Night Breakdown
                  </h2>
                  <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
                    Scroll through the stacked event dossier below or jump straight to a
                    competition track.
                  </p>
                </div>

                <div className="font-mono text-xs font-bold text-[#991B1B] tabular-nums shrink-0">
                  Card {String(activeStackIndex + 1).padStart(2, '0')} / 04
                </div>
              </div>

              {/* Quick-jump stack navigator */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  ...COMPETITIONS.map((c, idx) => ({
                    idx,
                    targetId: `comp-detail-${c.number}`,
                    label: `${Number(c.number)}. ${c.id}`,
                  })),
                  {
                    idx: 3,
                    targetId: 'comp-detail-04',
                    label: '4. Evening Nights',
                  },
                ].map((item) => {
                  const isCurrent = activeStackIndex === item.idx;
                  return (
                    <button
                      key={item.targetId}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(item.targetId);
                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`shrink-0 min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 border ${
                        isCurrent
                          ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-[#991B1B]/40 hover:text-[#991B1B]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <ScrollStack
              useWindowScroll
              variant="stack"
              stackPosition="76px"
              itemStackDistance={10}
              itemDistance={48}
              itemScale={0.035}
              baseScale={0.89}
              blurAmount={0.55}
              dim={0.14}
              peek={8}
              onActiveIndexChange={setActiveStackIndex}
            >
              {COMPETITIONS.map((comp, idx) => (
                <ScrollStackItem key={comp.id} id={`comp-detail-${comp.number}`}>
                  <article className="bg-white rounded-3xl overflow-hidden shadow-[0_22px_50px_-14px_rgba(20,25,35,0.14)] border border-slate-200/90">
                    <div
                      className={`px-4 sm:px-7 py-3.5 sm:py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 ${
                        idx === 1
                          ? 'bg-gradient-to-r from-[#7F1D1D] to-[#141923]'
                          : 'bg-gradient-to-r from-[#7F1D1D] to-[#991B1B]'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-amber-200">
                          Competition {comp.number}
                        </span>
                        <h3 className="font-extrabold text-lg sm:text-2xl">
                          {Number(comp.number)}. {comp.id}
                        </h3>
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-amber-200 tabular-nums">
                        {comp.feeLabel}
                      </span>
                    </div>

                    <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-stretch">
                      <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-200/80 h-36 sm:h-48 lg:h-auto lg:min-h-[200px]">
                        <ImageWithFallback
                          src={comp.image}
                          alt={comp.imageAlt}
                          fallbackLabel={comp.id}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="lg:col-span-8 flex flex-col justify-between">
                        <div>
                          <p className="text-slate-700 text-xs sm:text-base leading-relaxed mb-3.5 sm:mb-6">
                            {comp.fullDesc}
                          </p>

                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                            {comp.facts.map((fact) => (
                              <div
                                key={fact.label}
                                className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6F0] border border-[#991B1B]/10 ${
                                  fact.spanTwo ? 'col-span-2' : ''
                                }`}
                              >
                                <div className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 mb-0.5 sm:mb-1">
                                  {fact.label}
                                </div>
                                <div
                                  className={`font-bold text-xs sm:text-sm tabular-nums ${
                                    fact.highlight ? 'text-[#991B1B]' : 'text-slate-900'
                                  }`}
                                >
                                  {fact.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => onOpenRegister(comp.id)}
                            className={`w-full sm:w-auto min-h-[44px] sm:min-h-[48px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all whitespace-nowrap ${
                              comp.id === 'Enterprise Expo'
                                ? 'bg-slate-900 hover:bg-[#991B1B]'
                                : 'bg-[#991B1B] hover:bg-[#7F1D1D]'
                            }`}
                          >
                            Register for {comp.id}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollStackItem>
              ))}

              {/* Evening Entertainment Card */}
              <ScrollStackItem key="evening-nights" id="comp-detail-04">
                <article className="relative rounded-3xl overflow-hidden bg-[#141923] p-6 sm:p-10 text-white shadow-[0_22px_50px_-14px_rgba(20,25,35,0.28)] border border-slate-800">
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={EVENING_MEDIA.image}
                      alt={EVENING_MEDIA.alt}
                      fallbackLabel="Evening Nights"
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141923]/95 via-[#141923]/85 to-[#450A0A]/80" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
                          Track 04 · Closing Each Day
                        </span>
                        <h3 className="font-extrabold text-2xl sm:text-3xl mt-1">
                          4. Evening Entertainment
                        </h3>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-200 tabular-nums">
                        7:00 PM – 10:00 PM Nightly
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      {EVENING_NIGHTS.map((night) => {
                        const Icon = night.type === 'movie' ? Film : Music;
                        return (
                          <div
                            key={night.title}
                            className="p-6 rounded-2xl bg-white/8 backdrop-blur-md border border-white/12 flex items-center justify-between gap-4"
                          >
                            <div>
                              <div className="text-xs font-mono text-amber-300 uppercase mb-1">
                                {night.day}
                              </div>
                              <div className="font-extrabold text-xl">{night.title}</div>
                              <div className="text-sm text-slate-200 mt-1 tabular-nums">
                                {night.time}
                              </div>
                              <div className="text-xs text-slate-300 mt-1">{night.desc}</div>
                            </div>
                            <Icon className="w-8 h-8 text-amber-300 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </ScrollStackItem>
            </ScrollStack>
          </section>
        </div>
      </div>
    </div>
  );
}
