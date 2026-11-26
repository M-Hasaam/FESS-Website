import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { COMPETITIONS, SCHEDULE_ITEMS, type PageId } from '../../data/fessData';
import emblemMark from '../../assets/logo/fess-emblem-mark.png';

export interface Hero25Props {
  onNavigate: (page: PageId) => void;
}

const DAYS = ['1', '2'] as const;
const DAY_NAMES: Record<(typeof DAYS)[number], string> = { '1': 'one', '2': 'two' };
const DAY_DATES: Record<(typeof DAYS)[number], string> = {
  '1': '3 December',
  '2': '4 December',
};

const EXPO = [0.16, 1, 0.3, 1] as const;
const WORDMARK = ['F', 'E', 'S', 'S'];

export function Hero25({ onNavigate }: Hero25Props) {
  const shouldReduce = Boolean(useReducedMotion());

  return (
    <section
      data-testid="hero-25"
      className="relative -mt-16 overflow-hidden bg-[#0C0F16] text-white sm:-mt-[72px]"
    >
      {/* Emblem sitting behind the wordmark, pushed to the right and cropped by the edge */}
      <motion.img
        aria-hidden="true"
        alt=""
        src={emblemMark}
        initial={shouldReduce ? false : { opacity: 0, scale: 0.82, rotate: -28 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.9, ease: EXPO }}
        className="pointer-events-none absolute right-[-28vw] top-[2%] w-[96vw] select-none lg:right-[-14vw] lg:top-[-18%] lg:w-[78vw]"
      />

      {/* Giant wordmark, cropped by the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none justify-center font-[family-name:var(--font-headline)] font-extrabold leading-[0.8] tracking-[-0.06em] text-[#991B1B] [font-size:46vw] translate-y-[16%] lg:[font-size:40vw]"
      >
        {WORDMARK.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={shouldReduce ? false : { y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25 + i * 0.1, ease: EXPO }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C0F16]/60 to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-4 pb-24 pt-[7.5rem] sm:px-6 sm:pb-32 sm:pt-[9.5rem] lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pb-64 lg:pt-[10.5rem]">
        {/* Left: type does the work */}
        <div className="min-w-0">
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-300 sm:text-xs sm:tracking-[0.2em]"
          >
            FAST Entrepreneurship &amp; Startup Society
          </motion.p>

          <h1 className="font-[family-name:var(--font-headline)] text-5xl font-medium leading-[1] tracking-[-0.03em] [word-spacing:0.06em] sm:text-7xl lg:text-[5.25rem]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={shouldReduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
              >
                Pitch it. Sell it.
              </motion.span>
            </span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={shouldReduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.34, ease: EXPO }}
              >
                Launch it<span className="text-amber-300">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EXPO }}
            className="mt-7 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Two days, three competitions and two nights on campus. Best pitch
            takes home PKR 15,000.
          </motion.p>
        </div>

        {/* Right: the real flagship programme, doubling as the one call to action */}
        <motion.aside
          initial={shouldReduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EXPO }}
          aria-label="Flagship event programme"
          className="relative min-w-0 [filter:drop-shadow(0_24px_36px_rgba(0,0,0,0.55))]"
        >
          {/* Ticket body: semicircular notches are cut out of both edges at the dashed tear line */}
          <motion.div
            className="overflow-hidden rounded-sm bg-[#FAF6F0] text-[#141923]"
            initial={shouldReduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.2, delay: 0.55, ease: EXPO }}
            style={{
              WebkitMask:
                'radial-gradient(circle 11px at 0 64px, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 64px, #0000 98%, #000) right / 51% 100% no-repeat',
              mask: 'radial-gradient(circle 11px at 0 64px, #0000 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 11px at 100% 64px, #0000 98%, #000) right / 51% 100% no-repeat',
            }}
          >
          <div className="flex items-center justify-between border-b border-dashed border-[#141923]/25 px-6 py-5">
            <h2 className="font-serif text-2xl font-normal leading-none">The Programme</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#991B1B]">
              2 days · 3 competitions
            </span>
          </div>

          {DAYS.map((day) => (
            <div key={day} className="border-b border-[#141923]/10 last:border-b-0">
              <p className="flex items-center justify-between px-6 pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#141923]/55">
                  Day {DAY_NAMES[day]}
                </span>
                <span className="font-serif text-lg italic leading-none text-[#991B1B]">
                  {DAY_DATES[day]}
                </span>
              </p>
              <ul className="px-6 pb-3 pt-1">
                {SCHEDULE_ITEMS.filter((item) => item.day === day).map((item) => {
                  const comp = COMPETITIONS.find((c) => c.id === item.title);
                  const order = SCHEDULE_ITEMS.indexOf(item);
                  return (
                    <motion.li
                      key={`${day}-${item.title}`}
                      initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.95 + order * 0.08, ease: EXPO }}
                      className="border-t border-dashed border-[#141923]/15 first:border-t-0"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate('events')}
                        className="group -mx-2 flex w-[calc(100%+1rem)] flex-wrap items-center gap-x-3 gap-y-1 rounded px-2 py-3.5 text-left transition-colors hover:bg-[#991B1B]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#991B1B]"
                      >
                        <span className="w-6 shrink-0 font-mono text-[11px] leading-none text-[#991B1B]">
                          {comp ? comp.number : ''}
                        </span>
                        <span
                          className={
                            comp
                              ? 'font-serif text-lg font-normal leading-none'
                              : 'font-serif text-lg italic leading-none text-[#141923]/60'
                          }
                        >
                          {item.title}
                        </span>
                        {comp ? (
                          <span className="whitespace-nowrap rounded-full border border-[#991B1B]/30 px-2 py-0.5 font-mono text-[10px] text-[#991B1B]">
                            {comp.feeShort}
                          </span>
                        ) : null}
                        <span className="w-full pl-9 font-mono text-xs leading-none text-[#141923]/60 sm:ml-auto sm:w-auto sm:pl-0">
                          {item.time}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onNavigate('events')}
            className="group flex w-full items-center justify-between bg-[#141923] px-6 py-4 text-sm font-semibold text-[#FAF6F0] transition-colors hover:bg-[#B91C1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            Register for the flagship
            <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
          </button>
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
}

export default Hero25;
