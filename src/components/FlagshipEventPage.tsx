import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
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
import { PageHero } from './ui/page-hero';

interface FlagshipEventPageProps {
  onOpenRegister: (event?: CompetitionName) => void;
  introDelay?: number;
}

const DAY_TABS: { id: DayFilter; label: string }[] = [
  { id: 'all', label: 'Both days' },
  { id: '1', label: 'Day one' },
  { id: '2', label: 'Day two' },
];

const DAY_META = {
  '1': { name: 'Day one', date: '3 December' },
  '2': { name: 'Day two', date: '4 December' },
} as const;

const HEADLINE = 'font-[family-name:var(--font-headline)]';

export function FlagshipEventPage({ onOpenRegister, introDelay = 0 }: FlagshipEventPageProps) {
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const [activeStackIndex, setActiveStackIndex] = useState(0);

  const visibleSchedule = filterScheduleByDay(SCHEDULE_ITEMS, dayFilter);
  const day1Items = visibleSchedule.filter((item) => item.day === '1');
  const day2Items = visibleSchedule.filter((item) => item.day === '2');

  const dayColumns = [
    { key: '1' as const, items: day1Items },
    { key: '2' as const, items: day2Items },
  ].filter((col) => col.items.length > 0);

  const jumpTargets = [
    ...COMPETITIONS.map((c, idx) => ({
      idx,
      targetId: `comp-detail-${c.number}`,
      label: `${c.number} ${c.id}`,
    })),
    { idx: 3, targetId: 'comp-detail-04', label: '04 Evening nights' },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Flagship event · 3–4 December"
        title="Flagship event"
        accent="outline & timeline."
        subtitle="Over two days we are hosting an Enterprise Expo, a startup Pitch Arena, and a Sell Me This Pen challenge, with a Movie Night and a Qawali Night to close each day."
        introDelay={introDelay}
      />

      {/* A. TIMELINE */}
      <section className="bg-[#FAF6F0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">Schedule</p>
              <h2
                className={`${HEADLINE} mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-[#141923] sm:text-6xl`}
              >
                Event timeline
              </h2>
            </div>

            {/* Day filter: quiet text tabs with a sliding underline */}
            <div
              role="tablist"
              aria-label="Filter event schedule by day"
              className="flex gap-6 border-b border-dashed border-[#141923]/25"
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
                    className={`relative min-h-[44px] whitespace-nowrap pb-3 pt-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                      active ? 'text-[#991B1B]' : 'text-[#141923]/55 hover:text-[#141923]'
                    }`}
                  >
                    {tab.label}
                    {active && (
                      <motion.span
                        layoutId="scheduleDayTab"
                        transition={{ duration: 0.25, ease: FESS_EASE }}
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#991B1B]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={dayFilter}
              data-testid="schedule-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: FESS_EASE }}
              className={`mt-12 grid gap-12 sm:mt-16 ${
                dayFilter === 'all' ? 'lg:grid-cols-2 lg:gap-16' : ''
              }`}
            >
              {dayColumns.map((col) => (
                <div key={col.key} className="min-w-0">
                  <div className="flex items-baseline justify-between border-b border-[#141923]/30 pb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#141923]/60">
                      {DAY_META[col.key].name}
                    </span>
                    <span className="font-serif text-xl italic leading-none text-[#991B1B]">
                      {DAY_META[col.key].date}
                    </span>
                  </div>
                  <ul>
                    {col.items.map((item) => (
                      <li
                        key={`d${col.key}-${item.title}`}
                        className="grid gap-x-6 gap-y-1 border-b border-dashed border-[#141923]/25 py-6 sm:grid-cols-[11rem_1fr]"
                      >
                        <span className="pt-1.5 font-mono text-xs tabular-nums text-[#991B1B]">
                          {item.time}
                        </span>
                        <div>
                          <h3
                            className={`font-serif text-3xl leading-none ${
                              item.category === 'evening'
                                ? 'italic text-[#141923]/70'
                                : 'text-[#141923]'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* B. FEES LEDGER */}
      <section className="bg-[#0C0F16] py-20 text-[#FAF6F0] sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">Summary</p>
            <h2
              className={`${HEADLINE} mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl`}
            >
              Registration fees <span className="text-[#C4121F]">at a glance.</span>
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-dashed border-white/30 sm:mt-16">
            {COMPETITIONS.map((comp, idx) => (
              <Reveal key={comp.id} delay={idx * 0.06}>
                <div className="grid gap-x-8 gap-y-4 border-b border-dashed border-white/30 py-8 md:grid-cols-[3rem_1.3fr_1fr_1.8fr_auto] md:items-center">
                  <span className="font-mono text-xs text-amber-300">{comp.number}</span>
                  <div>
                    <h3 className="font-serif text-3xl leading-none sm:text-4xl">{comp.id}</h3>
                    <p className="mt-2 text-sm text-slate-400">{comp.participantsLabel}</p>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-[#FAF6F0]">
                    {comp.id === 'Enterprise Expo'
                      ? 'PKR 8,000 per stall'
                      : `PKR ${comp.feeNumeric.toLocaleString('en-US')}`}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">{comp.prizeSummary}</p>
                  <button
                    type="button"
                    onClick={() => onOpenRegister(comp.id)}
                    className="group inline-flex items-center gap-2 justify-self-start text-sm font-semibold text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300 md:justify-self-end"
                  >
                    Register
                    <ArrowUpRight className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* C. SHOWCASE (SCROLL STACK) */}
      <section
        aria-labelledby="flagship-events-showcase-heading"
        className="bg-[#FAF6F0] py-20 pb-28 sm:py-28 sm:pb-36"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 sm:mb-16">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">
                  Flagship events showcase
                </p>
                <h2
                  id="flagship-events-showcase-heading"
                  className={`${HEADLINE} mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-[#141923] sm:text-6xl`}
                >
                  Competition &amp; night <span className="text-[#991B1B]">breakdown.</span>
                </h2>
              </div>
              <div className="shrink-0 font-mono text-xs tabular-nums text-[#991B1B]">
                {String(activeStackIndex + 1).padStart(2, '0')} / 04
              </div>
            </div>

            {/* Quick-jump: text tabs */}
            <div className="mt-10 flex gap-6 overflow-x-auto border-b border-dashed border-[#141923]/25 no-scrollbar">
              {jumpTargets.map((item) => {
                const isCurrent = activeStackIndex === item.idx;
                return (
                  <button
                    key={item.targetId}
                    type="button"
                    onClick={() => {
                      document
                        .getElementById(item.targetId)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`relative min-h-[44px] shrink-0 whitespace-nowrap pb-3 pt-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                      isCurrent ? 'text-[#991B1B]' : 'text-[#141923]/55 hover:text-[#141923]'
                    }`}
                  >
                    {item.label}
                    {isCurrent && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#991B1B]" />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <ScrollStack
            useWindowScroll
            variant="stack"
            stackPosition="96px"
            itemStackDistance={10}
            itemDistance={48}
            itemScale={0.035}
            baseScale={0.89}
            blurAmount={0.55}
            dim={0.14}
            peek={8}
            onActiveIndexChange={setActiveStackIndex}
          >
            {COMPETITIONS.map((comp) => (
              <ScrollStackItem key={comp.id} id={`comp-detail-${comp.number}`}>
                <article className="overflow-hidden rounded-xl border border-white/10 bg-[#0C0F16] text-[#FAF6F0] shadow-[0_30px_60px_-20px_rgba(12,15,22,0.5)]">
                  <div className="flex items-center justify-between border-b border-dashed border-white/25 px-6 py-4 sm:px-8">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                      Competition {comp.number}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-slate-300">
                      {comp.feeLabel}
                    </span>
                  </div>

                  <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
                    <div className="h-48 overflow-hidden rounded-lg sm:h-60 lg:col-span-5 lg:h-auto lg:min-h-[18rem]">
                      <ImageWithFallback
                        src={comp.image}
                        alt={comp.imageAlt}
                        fallbackLabel={comp.id}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between lg:col-span-7">
                      <div>
                        <h3 className="font-serif text-4xl leading-none sm:text-5xl">{comp.id}</h3>
                        <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                          {comp.fullDesc}
                        </p>

                        <dl className="mt-7 grid gap-x-8 sm:grid-cols-2">
                          {comp.facts.map((fact) => (
                            <div
                              key={fact.label}
                              className={`border-t border-dashed border-white/25 py-3 ${
                                fact.spanTwo ? 'sm:col-span-2' : ''
                              }`}
                            >
                              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                                {fact.label}
                              </dt>
                              <dd
                                className={`mt-1 text-sm tabular-nums ${
                                  fact.highlight ? 'font-semibold text-amber-300' : 'text-[#FAF6F0]'
                                }`}
                              >
                                {fact.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenRegister(comp.id)}
                        className="group mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300"
                      >
                        Register for {comp.id}
                        <ArrowUpRight className="h-4 w-4 text-amber-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </ScrollStackItem>
            ))}

            {/* Evening nights */}
            <ScrollStackItem key="evening-nights" id="comp-detail-04">
              <article className="relative overflow-hidden rounded-xl bg-[#8B0A14] text-[#FAF6F0] shadow-[0_30px_60px_-20px_rgba(12,15,22,0.5)]">
                <ImageWithFallback
                  src={EVENING_MEDIA.image}
                  alt={EVENING_MEDIA.alt}
                  fallbackLabel="Evening Nights"
                  className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
                />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-dashed border-white/30 px-6 py-4 sm:px-8">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                      Track 04 · closing each day
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[#FAF6F0]/75">
                      7:00 PM – 10:00 PM nightly
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2">
                    {EVENING_NIGHTS.map((night, i) => (
                      <div
                        key={night.title}
                        className={`p-8 sm:p-10 ${
                          i === 0
                            ? 'border-b border-dashed border-white/30 md:border-b-0 md:border-r'
                            : ''
                        }`}
                      >
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                          {night.day} · {night.time}
                        </p>
                        <h3 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">
                          {night.title}
                        </h3>
                        <p className="mt-4 text-sm text-[#FAF6F0]/75">{night.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>
    </div>
  );
}
