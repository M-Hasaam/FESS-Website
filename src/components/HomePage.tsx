import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  COMPETITIONS,
  EVENING_MEDIA,
  EVENING_NIGHTS,
  SOCIETY_PILLARS,
  type CompetitionName,
  type PageId,
} from '../data/fessData';
import { PastEventsLibrary } from './PastEventsLibrary';
import { Hero25 } from './blocks/hero-25';
import { ImageWithFallback, Reveal } from './MotionPrimitives';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenRegister: (event?: CompetitionName) => void;
}

export function HomePage({ onNavigate, onOpenRegister }: HomePageProps) {
  return (
    <div>
      {/* 1A. HERO */}
      <Hero25 onNavigate={onNavigate} />

      {/* 1B. INFINITE SOCIETY MARQUEE */}
      <div className="bg-[#991B1B] text-white py-3 overflow-hidden border-y border-red-950/30 marquee-wrapper">
        <div className="marquee-track font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex items-center gap-8 px-4">
              <span>FAST Entrepreneurship &amp; Startup Society</span>
              <span className="text-amber-300">·</span>
              <span>#GameChangersOnly</span>
              <span className="text-amber-300">·</span>
              <span>Where Future Leaders Are Born</span>
              <span className="text-amber-300">·</span>
              <span>Flagship Event: Enterprise Expo · Pitch Arena · Sell Me This Pen</span>
              <span className="text-amber-300">·</span>
              <span>Movie Night &amp; Qawali Night</span>
              <span className="text-amber-300">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1C. WHO WE ARE: manifesto statement + numbered pillars */}
      <section className="bg-[#FAF6F0] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:px-8">
          <Reveal className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#991B1B]">
              #GameChangersOnly
            </p>
            <h2 className="font-[family-name:var(--font-headline)] mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-[#141923] sm:text-6xl">
              While others talk about changing the world, we&apos;re{' '}
              <span className="text-[#991B1B]">building it.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
              Join the most ambitious student entrepreneurs who refuse to settle for
              ordinary. Your breakthrough startup is one decision away.
            </p>
          </Reveal>

          <ol className="min-w-0 self-center border-t border-dashed border-[#141923]/25">
            {SOCIETY_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.id} delay={idx * 0.08}>
                <li className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-dashed border-[#141923]/25 py-8 transition-colors hover:bg-[#991B1B]/[0.04] sm:grid-cols-[3.5rem_1fr] sm:px-3">
                  <span className="pt-2 font-mono text-xs text-[#991B1B]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl leading-none text-[#141923] transition-colors group-hover:text-[#991B1B] sm:text-4xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
                      {pillar.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 1D. FLAGSHIP EVENT: image-led competitions + evening nights */}
      <section className="bg-[#0C0F16] py-20 text-[#FAF6F0] sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                Upcoming flagship · 3–4 December
              </p>
              <h2 className="font-[family-name:var(--font-headline)] mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Two days. Three competitions.{' '}
                <span className="text-[#C4121F]">Two evening nights.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300 md:self-auto"
            >
              Full timeline &amp; rules
              <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
            {COMPETITIONS.map((comp, idx) => (
              <Reveal key={comp.id} delay={idx * 0.08} className="h-full">
                <article className="group relative flex h-full min-h-[28rem] flex-col justify-between overflow-hidden rounded-xl bg-[#141923]">
                  <ImageWithFallback
                    src={comp.image}
                    alt={comp.imageAlt}
                    fallbackLabel={comp.id}
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F16] via-[#0C0F16]/70 to-[#0C0F16]/10" />

                  <div className="relative p-6 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300">
                    {comp.number} · {comp.dayLabel}
                  </div>

                  <div className="relative p-6">
                    <h3 className="font-serif text-4xl leading-none">{comp.id}</h3>
                    <p className="mt-4 line-clamp-2 min-h-[2.9rem] text-sm leading-relaxed text-slate-300">
                      {comp.shortDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenRegister(comp.id)}
                      className="group/cta mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#FAF6F0] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-amber-300"
                    >
                      {comp.ctaLabel}
                      <ArrowUpRight className="h-4 w-4 text-amber-300 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Evening nights: one quiet band, two columns split by a tear line */}
          <Reveal>
            <div className="relative mt-5 overflow-hidden rounded-xl bg-[#141923]">
              <ImageWithFallback
                src={EVENING_MEDIA.image}
                alt={EVENING_MEDIA.alt}
                fallbackLabel="Evening Entertainment"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F16] via-[#0C0F16]/80 to-[#0C0F16]/50" />
              <div className="relative grid md:grid-cols-2">
                {EVENING_NIGHTS.map((night, i) => (
                  <div
                    key={night.title}
                    className={`p-6 sm:p-8 ${
                      i === 0
                        ? 'border-b border-dashed border-white/25 md:border-b-0 md:border-r'
                        : ''
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                      {night.day} · {night.time}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl leading-none sm:text-4xl">
                      {night.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1E. PAST EVENTS ARCHIVE LIBRARY (SKEWED CAROUSEL) */}
      <PastEventsLibrary
        onExploreUpcoming={() => onNavigate('events')}
        onOpenRegister={(event) => onOpenRegister(event)}
      />

      {/* 1F. CLOSING: manifesto + two ways in */}
      <section className="bg-[#8B0A14] py-20 text-[#FAF6F0] sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
          <Reveal direction="left" className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Your journey starts here
            </p>
            <h2 className="font-[family-name:var(--font-headline)] mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-7xl">
              The future
              <br />
              is ours.
            </h2>
            <blockquote className="mt-10 max-w-lg font-serif text-xl italic leading-relaxed text-[#FAF6F0]/85 sm:text-2xl">
              We&apos;re not just building startups, we&apos;re creating the next generation
              of industry leaders. The question is: will you join us or watch from the
              sidelines?
            </blockquote>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FAF6F0]/55">
              FESS Executive Manifesto · 2026
            </p>
          </Reveal>

          <Reveal direction="right" className="min-w-0 self-end">
            <h3 className="font-serif text-4xl leading-none sm:text-5xl">Ready to dominate?</h3>
            <p className="mt-4 text-base text-[#FAF6F0]/70">
              Stop dreaming. Start building. Your empire awaits.
            </p>

            <div className="mt-8 border-t border-dashed border-white/30">
              {[
                {
                  title: "Let's talk business",
                  desc: 'Turn your idea into reality or connect with FESS.',
                  page: 'connect' as PageId,
                },
                {
                  title: 'Meet the powerhouse',
                  desc: 'The Executive Council and Tech Team driving FESS forward.',
                  page: 'teams' as PageId,
                },
              ].map((row) => (
                <button
                  key={row.title}
                  type="button"
                  onClick={() => onNavigate(row.page)}
                  className="group flex w-full items-center justify-between gap-6 border-b border-dashed border-white/30 py-7 text-left transition-colors hover:bg-white/[0.04] sm:px-3"
                >
                  <span>
                    <span className="block font-serif text-3xl leading-none sm:text-4xl">
                      {row.title}
                    </span>
                    <span className="mt-3 block text-sm text-[#FAF6F0]/65">{row.desc}</span>
                  </span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-amber-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
