import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Film,
  Flame,
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
  HERO_MEDIA,
  SOCIETY_PILLARS,
  type CompetitionName,
  type PageId,
} from '../data/fessData';
import { Scene3DCanvas } from './Scene3DCanvas';
import {
  FESS_EASE,
  ImageWithFallback,
  MagneticButton,
  Reveal,
  SpotlightCard,
} from './MotionPrimitives';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenRegister: (event?: CompetitionName) => void;
}

export function HomePage({ onNavigate, onOpenRegister }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  const pillarIcons = {
    ideas: Lightbulb,
    network: UsersRound,
    launch: Rocket,
  };

  return (
    <div>
      {/* 1A. CINEMATIC SOCIETY HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#141923] text-white"
      >
        {/* Parallax Architectural Skyscraper Backdrop */}
        <motion.div
          style={shouldReduce ? undefined : { y: bgY, scale: bgScale }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <ImageWithFallback
            src={HERO_MEDIA.image}
            alt={HERO_MEDIA.alt}
            fallbackLabel="FESS Innovation Towers"
            className="w-full h-full object-cover object-center opacity-45 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1018]/80 via-[#141923]/65 to-[#141923]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.24)_0%,transparent_68%)]" />
        </motion.div>

        {/* Interactive 3D Polyhedron & Constellation Canvas */}
        <Scene3DCanvas />

        {/* Hero Foreground Content */}
        <div
          className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center"
          style={shouldReduce ? undefined : { perspective: 1200 }}
        >
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 12, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, ease: FESS_EASE }}
            className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-amber-200/95 mb-5"
          >
            FAST Entrepreneurship and Startup Society
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={shouldReduce ? false : { opacity: 0, y: 36, rotateX: 22 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: FESS_EASE }}
              className="font-extrabold tracking-tight leading-[1.06] text-white"
              style={{ fontSize: 'clamp(2.65rem, 5.4vw, 4.75rem)' }}
            >
              Your Startup{' '}
              <span className="block bg-gradient-to-r from-white via-amber-100 to-red-200 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: FESS_EASE }}
            className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200/95 leading-relaxed mb-10"
          >
            Join ambitious students building the next unicorn startups. Don&apos;t just
            dream it—launch it.
          </motion.p>

          {/* Primary + Secondary CTAs */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: FESS_EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-14"
          >
            <MagneticButton
              onClick={() => onNavigate('events')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white font-semibold text-sm sm:text-base shadow-[0_14px_34px_-6px_rgba(153,27,27,0.5)] border border-red-400/25 transition-colors duration-150 flex items-center justify-center gap-2 group whitespace-nowrap shrink-0"
            >
              <span>Explore Our Flagship Event</span>
              <Flame className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            </MagneticButton>

            <MagneticButton
              onClick={() => onNavigate('teams')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#991B1B] font-bold text-sm sm:text-base shadow-xl transition-colors duration-150 flex items-center justify-center gap-2 group whitespace-nowrap shrink-0"
            >
              <span>Meet Our Teams</span>
              <Users className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </MagneticButton>

            <MagneticButton
              onClick={() => onNavigate('connect')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm sm:text-base border border-white/20 transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Connect With FESS</span>
              <ArrowUpRight className="w-4 h-4 text-amber-300" />
            </MagneticButton>
          </motion.div>

          {/* Society Pillars & Flagship Event Bridge Strip */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: FESS_EASE }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 max-w-3xl mx-auto"
          >
            <div className="px-5 py-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base text-white leading-tight">
                  Startup Culture
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Student Ventures &amp; Founders
                </div>
              </div>
            </div>

            <div className="px-5 py-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-red-500/25 flex items-center justify-center text-red-300 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base text-white leading-tight">
                  Industry Panels
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Direct Business Leader Feedback
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/18 backdrop-blur-md border border-amber-400/35 flex items-center gap-3.5 text-left transition-colors duration-150 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/25 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base text-amber-200 leading-tight">
                  Flagship 2-Day Event
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  3 Competitions · 2 Nights
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

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
      <section className="py-20 sm:py-24 bg-[#FAF6F0] bg-arch-grid border-b border-[#991B1B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-3">
              Who We Are
            </p>
            <h2 className="font-extrabold text-3xl sm:text-5xl text-[#991B1B] tracking-tight mb-4">
              #GameChangersOnly
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#991B1B] to-transparent mb-6" />
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              While others talk about changing the world, we&apos;re building it. Join the
              most ambitious student entrepreneurs who refuse to settle for ordinary. Your
              breakthrough startup is one decision away.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {SOCIETY_PILLARS.map((pillar, idx) => {
              const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons];
              const isWarm = pillar.tone === 'amber';
              const iconBg =
                pillar.tone === 'amber'
                  ? 'bg-amber-100/90 border-amber-300/60 text-amber-700'
                  : pillar.tone === 'blue'
                    ? 'bg-blue-50 border-blue-200/70 text-blue-700'
                    : 'bg-emerald-50 border-emerald-200/70 text-emerald-700';

              return (
                <Reveal key={pillar.id} delay={idx * 0.08}>
                  <SpotlightCard
                    className={`group h-full rounded-3xl p-8 sm:p-9 text-center shadow-[0_18px_38px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_26px_48px_-12px_rgba(153,27,27,0.15)] border ${
                      isWarm
                        ? 'bg-[#F7F1E7] border-amber-900/12 fess-card-border-warm'
                        : 'bg-white border-slate-200/80 fess-card-border'
                    }`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl border flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-110 ${iconBg}`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3
                      className={`font-extrabold text-2xl mb-3 transition-colors ${
                        isWarm
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
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1D. FLAGSHIP EVENT SPOTLIGHT */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#991B1B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#991B1B] mb-2.5">
                Upcoming Flagship Event
              </p>
              <h2 className="font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Two Days. Three Competitions.{' '}
                <span className="text-[#991B1B]">Two Evening Nights.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2.5 leading-relaxed">
                Over two days we are hosting an Enterprise Expo, a startup Pitch Arena, and
                a Sell Me This Pen challenge, with a Movie Night and a Qawali Night to close
                each day.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6F0] border border-[#991B1B]/20 text-[#991B1B] font-semibold text-sm hover:bg-[#991B1B] hover:text-white transition-colors duration-150 shrink-0 whitespace-nowrap"
            >
              <span>Full Timeline &amp; Rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>

          {/* 3 Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {COMPETITIONS.map((comp, idx) => (
              <Reveal key={comp.id} delay={idx * 0.08}>
                <SpotlightCard className="group h-full rounded-3xl bg-[#FAF6F0]/75 border border-slate-200/85 shadow-[0_16px_34px_-14px_rgba(20,25,35,0.08)] hover:shadow-[0_24px_44px_-12px_rgba(153,27,27,0.16)] fess-card-border flex flex-col">
                  <div className="flex flex-col justify-between h-full p-6 sm:p-7">
                    <div>
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-slate-200/80">
                        <ImageWithFallback
                          src={comp.image}
                          alt={comp.imageAlt}
                          fallbackLabel={comp.id}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                        <span className="font-mono font-semibold text-slate-700">
                          {comp.dayLabel}
                        </span>
                        <span className="font-mono font-bold text-[#991B1B] tabular-nums">
                          {comp.feeShort}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-2xl text-slate-900 mb-2.5 group-hover:text-[#991B1B] transition-colors">
                        {comp.id}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {comp.shortDesc}
                      </p>

                      <div className="py-3 px-4 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 mb-6">
                        <span className="font-bold text-[#991B1B]">Prizes &amp; Awards: </span>
                        <span>{comp.prizeSummary}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenRegister(comp.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-colors duration-150 whitespace-nowrap ${
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

      {/* 1E. "THE FUTURE IS OURS" & "READY TO DOMINATE?" SPLIT SECTION */}
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
