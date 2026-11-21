import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Film,
  Lightbulb,
  Mail,
  Music,
  Rocket,
  Sparkles,
  Users,
  UsersRound,
} from 'lucide-react';
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
import {
  ImageWithFallback,
  Reveal,
  SpotlightCard,
} from './MotionPrimitives';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenRegister: (event?: CompetitionName) => void;
}

export function HomePage({ onNavigate, onOpenRegister }: HomePageProps) {
  const compCarouselRef = useRef<HTMLDivElement>(null);
  const [activeCompSlide, setActiveCompSlide] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const shouldReduce = useReducedMotion();

  const pillarIcons = {
    ideas: Lightbulb,
    network: UsersRound,
    launch: Rocket,
  };

  const handleCarouselScroll = () => {
    const el = compCarouselRef.current;
    if (!el || el.clientWidth === 0) return;
    const cardWidth = el.scrollWidth / COMPETITIONS.length;
    const idx = Math.round(el.scrollLeft / Math.max(1, cardWidth));
    setActiveCompSlide(Math.max(0, Math.min(COMPETITIONS.length - 1, idx)));
  };

  const scrollToCompSlide = (idx: number) => {
    const el = compCarouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / COMPETITIONS.length;
    el.scrollTo({ left: idx * cardWidth, behavior: shouldReduce ? 'auto' : 'smooth' });
    setActiveCompSlide(idx);
  };

  return (
    <div>
      {/* 1A. HERO 25: GIANT HEADLINE MIRRORED IN A ROLLING VOXEL SEA */}
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

      {/* 1C. #GameChangersOnly CORE SOCIETY PILLARS */}
      <section className="py-14 sm:py-24 bg-[#FAF6F0] bg-arch-grid border-b border-[#991B1B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-3">
              Who We Are
            </p>
            <h2 className="font-extrabold text-3xl sm:text-5xl text-[#991B1B] tracking-tight mb-4">
              #GameChangersOnly
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#991B1B] to-transparent mb-5 sm:mb-6" />
            <p className="text-slate-600 text-sm sm:text-lg leading-relaxed">
              While others talk about changing the world, we&apos;re building it. Join the
              most ambitious student entrepreneurs who refuse to settle for ordinary. Your
              breakthrough startup is one decision away.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
            {SOCIETY_PILLARS.map((pillar, idx) => {
              const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons];
              const isWarm = pillar.tone === 'amber';
              const isTapped = selectedPillar === pillar.id;
              const iconBg =
                pillar.tone === 'amber'
                  ? 'bg-amber-100/90 border-amber-300/60 text-amber-700'
                  : pillar.tone === 'blue'
                    ? 'bg-blue-50 border-blue-200/70 text-blue-700'
                    : 'bg-emerald-50 border-emerald-200/70 text-emerald-700';

              return (
                <Reveal key={pillar.id} delay={idx * 0.08}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPillar((prev) => (prev === pillar.id ? null : pillar.id))
                    }
                    className="w-full h-full text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B] rounded-3xl"
                  >
                    <SpotlightCard
                      className={`group h-full rounded-3xl p-6 sm:p-9 text-center shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_26px_48px_-12px_rgba(153,27,27,0.15)] border transition-all ${
                        isTapped
                          ? 'ring-2 ring-[#991B1B]/50 border-[#991B1B]/40'
                          : isWarm
                            ? 'bg-[#F7F1E7] border-amber-900/12 fess-card-border-warm'
                            : 'bg-white border-slate-200/80 fess-card-border'
                      }`}
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 sm:mb-6 rounded-2xl border flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-110 ${iconBg}`}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <h3
                        className={`font-extrabold text-xl sm:text-2xl mb-2.5 sm:mb-3 transition-colors ${
                          isWarm || isTapped
                            ? 'text-[#991B1B]'
                            : 'text-slate-900 group-hover:text-[#991B1B]'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {pillar.description}
                      </p>
                    </SpotlightCard>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1D. FLAGSHIP EVENT SPOTLIGHT */}
      <section className="py-14 sm:py-24 bg-white border-b border-[#991B1B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-2">
                Upcoming Flagship Event
              </p>
              <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Two Days. Three Competitions.{' '}
                <span className="text-[#991B1B]">Two Evening Nights.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
                Over two days we are hosting an Enterprise Expo, a startup Pitch Arena, and
                a Sell Me This Pen challenge, with a Movie Night and a Qawali Night to close
                each day.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="w-full md:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6F0] border border-[#991B1B]/20 text-[#991B1B] font-semibold text-sm hover:bg-[#991B1B] hover:text-white transition-colors duration-150 shrink-0 whitespace-nowrap"
            >
              <span>Full Timeline &amp; Rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>

          {/* Mobile Swipeable Snap Carousel / Desktop 3-Column Grid */}
          <div className="md:hidden flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
            <span>Swipe competitions</span>
            <span className="text-[#991B1B] font-bold">
              0{activeCompSlide + 1} / 0{COMPETITIONS.length}
            </span>
          </div>

          <div
            ref={compCarouselRef}
            onScroll={handleCarouselScroll}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 mb-4 md:mb-10"
          >
            {COMPETITIONS.map((comp, idx) => (
              <div
                key={comp.id}
                className="w-[86vw] sm:w-[70vw] md:w-auto shrink-0 snap-center"
              >
                <Reveal delay={idx * 0.08} className="h-full">
                  <SpotlightCard className="group h-full rounded-3xl bg-[#FAF6F0]/75 border border-slate-200/85 shadow-[0_16px_34px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_24px_44px_-12px_rgba(153,27,27,0.16)] fess-card-border flex flex-col">
                    <div className="flex flex-col justify-between h-full p-5 sm:p-7">
                      <div>
                        <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 sm:mb-5 border border-slate-200/80">
                          <ImageWithFallback
                            src={comp.image}
                            alt={comp.imageAlt}
                            fallbackLabel={comp.id}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2.5">
                          <span className="font-mono font-semibold text-slate-700">
                            {comp.dayLabel}
                          </span>
                          <span className="font-mono font-bold text-[#991B1B] tabular-nums">
                            {comp.feeShort}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 mb-2 group-hover:text-[#991B1B] transition-colors">
                          {comp.id}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5">
                          {comp.shortDesc}
                        </p>

                        <div className="py-3 px-4 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 mb-5">
                          <span className="font-bold text-[#991B1B]">Prizes &amp; Awards: </span>
                          <span>{comp.prizeSummary}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenRegister(comp.id)}
                        className={`w-full min-h-[46px] py-3 px-4 rounded-xl font-semibold text-sm transition-colors duration-150 whitespace-nowrap ${
                          comp.id === 'Enterprise Expo'
                            ? 'bg-slate-900 hover:bg-[#991B1B] text-white'
                            : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                        }`}
                      >
                        {comp.ctaLabel}
                      </button>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">
            {COMPETITIONS.map((comp, idx) => (
              <button
                key={comp.id}
                type="button"
                aria-label={`Show ${comp.id}`}
                onClick={() => scrollToCompSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeCompSlide === idx ? 'w-7 bg-[#991B1B]' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* 2 Evening Entertainment Nights Banner */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-[#141923] text-white shadow-xl border border-slate-800/80">
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={EVENING_MEDIA.image}
                  alt={EVENING_MEDIA.alt}
                  fallbackLabel="Evening Entertainment"
                  className="w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141923]/95 via-[#141923]/80 to-[#450A0A]/85" />
              </div>

              <div className="relative z-10 p-7 sm:p-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                {EVENING_NIGHTS.map((night) => {
                  const Icon = night.type === 'movie' ? Film : Music;
                  return (
                    <div
                      key={night.title}
                      className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-6 flex items-center justify-between gap-4 hover:bg-white/12 transition-colors"
                    >
                      <div>
                        <p className="font-mono text-xs tracking-wider text-amber-300 tabular-nums">
                          {night.day} · {night.time}
                        </p>
                        <h3 className="font-extrabold text-2xl mt-1 text-white">
                          {night.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 mt-1">{night.desc}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/12 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>
                  );
                })}
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

      {/* 1F. "THE FUTURE IS OURS" & "READY TO DOMINATE?" SPLIT SECTION */}
      <section className="py-20 sm:py-24 bg-[#F2EAE0]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B]">
              <Sparkles className="w-4 h-4" />
              <span>Your Journey Starts Here</span>
            </span>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
            {/* Left Column: The Future is Ours */}
            <Reveal direction="left" className="lg:col-span-6 flex flex-col justify-between">
              <div className="mb-8">
                <h2 className="font-extrabold text-4xl sm:text-5xl text-[#991B1B] leading-[1.08] tracking-tight">
                  The Future is{' '}
                  <br />
                  Ours
                </h2>
              </div>

              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-[0_18px_40px_-15px_rgba(20,25,35,0.08)] border border-slate-200/80 flex-1 flex flex-col justify-between">
                <div className="absolute -top-5 left-6 w-11 h-11 rounded-2xl bg-[#991B1B] text-white flex items-center justify-center shadow-md -rotate-6">
                  <span className="font-serif text-3xl font-bold leading-none mt-2">
                    &ldquo;
                  </span>
                </div>

                <blockquote
                  className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6 pt-2"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  We&apos;re not just building startups—we&apos;re creating the next generation
                  of industry leaders. Every student here has the potential to become the
                  next game-changer, the next innovator. The question is: will you join us
                  or watch from the sidelines?
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t border-[#991B1B]/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    FESS Executive Manifesto · 2026
                  </span>
                  <Sparkles className="w-4 h-4 text-[#991B1B]" />
                </div>
              </div>
            </Reveal>

            {/* Right Column: Ready to Dominate? */}
            <Reveal direction="right" className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="font-extrabold text-4xl sm:text-5xl text-[#991B1B] leading-[1.08] tracking-tight mb-3">
                  Ready to{' '}
                  <br />
                  Dominate?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mb-8">
                  Stop dreaming. Start building. Your empire awaits.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => onNavigate('connect')}
                  className="w-full text-left bg-white rounded-2xl p-6 shadow-[0_16px_34px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_24px_42px_-12px_rgba(153,27,27,0.16)] border border-slate-200/80 fess-card-border transition-all duration-200 hover:-translate-y-1 flex items-start gap-5 group"
                >
                  <span className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#991B1B] shrink-0 group-hover:bg-[#991B1B] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span className="flex-1 block">
                    <span className="font-bold text-lg text-slate-900 mb-1 block">
                      Let&apos;s Talk Business
                    </span>
                    <span className="text-sm text-slate-600 mb-3 block">
                      Ready to turn your idea into reality or connect with FESS? Let&apos;s
                      make it happen.
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#991B1B] group-hover:gap-2.5 transition-all">
                      <span>Contact us</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('teams')}
                  className="w-full text-left bg-white rounded-2xl p-6 shadow-[0_16px_34px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_24px_42px_-12px_rgba(153,27,27,0.16)] border border-slate-200/80 fess-card-border transition-all duration-200 hover:-translate-y-1 flex items-start gap-5 group"
                >
                  <span className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#991B1B] shrink-0 group-hover:bg-[#991B1B] group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </span>
                  <span className="flex-1 block">
                    <span className="font-bold text-lg text-slate-900 mb-1 block">
                      Meet the Powerhouse
                    </span>
                    <span className="text-sm text-slate-600 mb-3 block">
                      Explore our Executive Council and Tech Team driving FESS forward.
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#991B1B] group-hover:gap-2.5 transition-all">
                      <span>Meet Our Teams</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
