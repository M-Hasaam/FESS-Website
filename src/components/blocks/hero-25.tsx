import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { COMPETITIONS, HERO_MEDIA, SCHEDULE_ITEMS, type PageId } from '../../data/fessData';
import { FESS_EASE, ImageWithFallback } from '../MotionPrimitives';

export interface Hero25Props {
  onNavigate: (page: PageId) => void;
}

const DAYS = ['1', '2'] as const;

export function Hero25({ onNavigate }: Hero25Props) {
  const shouldReduce = Boolean(useReducedMotion());

  const rise = (delay: number) => ({
    initial: shouldReduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: FESS_EASE },
  });

  return (
    <section
      data-testid="hero-25"
      className="relative overflow-hidden bg-[#141923] text-white"
    >
      {/* One calm backdrop: photo, darkened, no particles or effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <ImageWithFallback
          src={HERO_MEDIA.image}
          alt={HERO_MEDIA.alt}
          fallbackLabel="FESS Innovation Towers"
          className="h-full w-full object-cover object-center opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141923] via-[#141923]/85 to-[#141923]/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        {/* Left: type does the work */}
        <div className="min-w-0">
          <motion.p
            {...rise(0)}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.2em] text-amber-200/90"
          >
            <span className="hidden h-px w-8 shrink-0 bg-amber-300/70 sm:block" />
            FAST Entrepreneurship &amp; Startup Society
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="font-serif text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.5rem]"
          >
            Pitch it.
            <br />
            Sell it.
            <br />
            <span className="italic text-amber-300">Launch it.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Two days, three competitions and two nights on campus. Best pitch
            takes home PKR 15,000.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#B91C1C] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#991B1B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Register for the flagship
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('teams')}
              className="text-sm font-medium text-slate-200 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-amber-300"
            >
              Meet the teams
            </button>
            <button
              type="button"
              onClick={() => onNavigate('connect')}
              className="text-sm font-medium text-slate-200 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-amber-300"
            >
              Connect
            </button>
          </motion.div>
        </div>

        {/* Right: the real flagship programme */}
        <motion.aside
          {...rise(0.2)}
          aria-label="Flagship event programme"
          className="relative min-w-0 rounded-sm bg-[#FAF6F0] text-[#141923] shadow-2xl shadow-black/50"
        >
          {/* Ticket perforation notches */}
          <span aria-hidden="true" className="absolute -left-2.5 top-[3.6rem] h-5 w-5 rounded-full bg-[#141923]" />
          <span aria-hidden="true" className="absolute -right-2.5 top-[3.6rem] h-5 w-5 rounded-full bg-[#141923]" />
          <div className="flex items-baseline justify-between border-b border-dashed border-[#141923]/25 px-6 py-4">
            <h2 className="font-serif text-xl font-bold">The Programme</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#991B1B]">
              2 days · 3 competitions
            </span>
          </div>

          {DAYS.map((day) => (
            <div key={day} className="border-b border-[#141923]/10 last:border-b-0">
              <p className="px-6 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#141923]/55">
                Day {day}
              </p>
              <ul className="px-6 pb-3 pt-1">
                {SCHEDULE_ITEMS.filter((item) => item.day === day).map((item) => {
                  const comp = COMPETITIONS.find((c) => c.id === item.title);
                  return (
                    <li key={`${day}-${item.title}`} className="border-t border-dashed border-[#141923]/15 first:border-t-0">
                      <button
                        type="button"
                        onClick={() => onNavigate('events')}
                        className="group -mx-2 flex w-[calc(100%+1rem)] flex-wrap items-baseline gap-x-3 gap-y-1 rounded px-2 py-2.5 text-left transition-colors hover:bg-[#991B1B]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#991B1B]"
                      >
                        <span className="w-6 shrink-0 font-mono text-[11px] text-[#991B1B]">
                          {comp ? comp.number : ''}
                        </span>
                        <span
                          className={
                            comp
                              ? 'font-serif text-base font-bold'
                              : 'font-serif text-base italic text-[#141923]/70'
                          }
                        >
                          {item.title}
                        </span>
                        {comp ? (
                          <span className="whitespace-nowrap rounded-full border border-[#991B1B]/30 px-2 py-0.5 font-mono text-[10px] text-[#991B1B]">
                            {comp.feeShort}
                          </span>
                        ) : null}
                        <span className="w-full pl-9 font-mono text-xs text-[#141923]/60 sm:ml-auto sm:w-auto sm:pl-0">
                          {item.time}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onNavigate('events')}
            className="group flex w-full items-center justify-between bg-[#141923] px-6 py-4 text-sm font-semibold text-[#FAF6F0] transition-colors hover:bg-[#991B1B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            Full details and fees
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.aside>
      </div>
    </section>
  );
}

export default Hero25;
