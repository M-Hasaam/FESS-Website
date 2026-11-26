import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import emblemMark from '../../assets/logo/fess-emblem-mark.png';

const EXPO = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  eyebrow: string;
  /** Main headline (ivory) */
  title: string;
  /** Closing words of the headline, shown in the logo red */
  accent?: string;
  subtitle?: ReactNode;
  /** Extra seconds before the intro plays (so it starts as the page curtain lifts) */
  introDelay?: number;
  children?: ReactNode;
}

/**
 * Shared header for inner pages: dark, left-aligned type, the two-tone emblem bleeding in
 * from the right. Sits under the transparent navbar like the home hero.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  introDelay = 0,
  children,
}: PageHeroProps) {
  const shouldReduce = Boolean(useReducedMotion());

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#0C0F16] text-white sm:-mt-[72px]">
      <motion.img
        aria-hidden="true"
        alt=""
        src={emblemMark}
        initial={shouldReduce ? false : { opacity: 0, rotate: -24, scale: 0.86 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1.7, delay: introDelay, ease: EXPO }}
        className="pointer-events-none absolute -right-[30vw] top-[-6%] w-[90vw] select-none lg:-right-[12vw] lg:-top-[40%] lg:w-[52vw]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-[8.5rem] sm:px-6 sm:pb-24 sm:pt-[10rem] lg:px-8 lg:pb-28 lg:pt-[11rem]">
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: introDelay + 0.1, ease: EXPO }}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300 sm:text-xs sm:tracking-[0.2em]"
        >
          {eyebrow}
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-headline)] text-5xl font-medium leading-[1] tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]">
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <motion.span
              className="block"
              initial={shouldReduce ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: introDelay + 0.2, ease: EXPO }}
            >
              {title}
              {accent ? <span className="text-[#C4121F]"> {accent}</span> : null}
            </motion.span>
          </span>
        </h1>

        {subtitle ? (
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: introDelay + 0.5, ease: EXPO }}
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {children}
      </div>
    </section>
  );
}

export default PageHero;
