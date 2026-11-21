import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Award, CalendarDays, Flame, Rocket, Users } from 'lucide-react';
import { HERO_MEDIA, type PageId } from '../../data/fessData';
import { Scene3DCanvas } from '../Scene3DCanvas';
import { FESS_EASE, ImageWithFallback } from '../MotionPrimitives';
import { ShatterType } from '../ui/shatter-type';
import { VoxelArc } from '../ui/voxel-arc';
import { HeroAuraButton } from '../ui/hero-aura-button';

export interface Hero25Props {
  onNavigate: (page: PageId) => void;
}

export function Hero25({ onNavigate }: Hero25Props) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduce = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  return (
    <section
      ref={heroRef}
      data-testid="hero-25"
      className="relative min-h-[80vh] sm:min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#141923] text-white"
    >
      {/* Layer 0: Parallax Architectural Skyscraper Backdrop */}
      <motion.div
        style={shouldReduce ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <ImageWithFallback
          src={HERO_MEDIA.image}
          alt={HERO_MEDIA.alt}
          fallbackLabel="FESS Innovation Towers"
          className="w-full h-full object-cover object-center opacity-40 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1018]/85 via-[#141923]/68 to-[#141923]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.26)_0%,transparent_66%)]" />
      </motion.div>

      {/* Layer 1: Existing Interactive 3D Polyhedron & Constellation Canvas */}
      <Scene3DCanvas />

      {/* Layer 2: Hero 25 Rolling Voxel Sea Canvas & Luminous Curved Horizon */}
      <VoxelArc
        eventTargetRef={heroRef}
        accentColor="#F59E0B"
        secondaryColor="#DC2626"
        horizon={0.54}
        curvature={0.52}
        waveHeight={1.05}
        waveLength={1.0}
        speed={0.55}
        turbulence={0.48}
        density={1}
        voxelSize={0.56}
        roundness={0.22}
        glow={1.05}
        haze={0.74}
        brightness={1.05}
        interactive
        className="z-[12] opacity-85"
      />

      {/* Layer 3: Foreground Content */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center"
        style={shouldReduce ? undefined : { perspective: 1200 }}
      >
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 12, rotateX: 25 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, ease: FESS_EASE }}
          className="text-[11px] sm:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-amber-200/95 mb-4 sm:mb-5"
        >
          FAST Entrepreneurship and Startup Society
        </motion.p>

        {/* Giant ShatterType Headline + Mirrored Voxel-Sea Reflection */}
        <div className="relative mb-5 sm:mb-7">
          <ShatterType />

          {/* Luminous Horizon Waterline */}
          <div
            aria-hidden="true"
            className="mx-auto mt-2.5 sm:mt-3 h-px w-[78%] max-w-2xl bg-gradient-to-r from-transparent via-amber-400/55 to-transparent"
          />

          {/* Hero 25 Mirrored Reflection in the Rolling Voxel Sea */}
          <div
            data-testid="hero25-mirror"
            aria-hidden="true"
            className="pointer-events-none select-none overflow-hidden h-9 sm:h-14 flex items-start justify-center opacity-35"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.28) 52%, transparent 96%)',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.28) 52%, transparent 96%)',
            }}
          >
            <motion.div
              animate={
                shouldReduce
                  ? undefined
                  : {
                      skewX: [-1.4, 1.4, -1.4],
                      y: [0, 1.5, 0],
                    }
              }
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{ transform: 'scaleY(-1)' }}
              className="font-extrabold tracking-tight leading-[1.02] blur-[1px] origin-center"
            >
              <span
                className="block bg-gradient-to-r from-red-300 via-amber-200 to-red-300 bg-clip-text text-transparent"
                style={{ fontSize: 'clamp(2.25rem, 5.1vw, 4.4rem)' }}
              >
                Starts Here.
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: FESS_EASE }}
          className="max-w-2xl mx-auto text-sm sm:text-xl text-slate-200/95 leading-relaxed mb-7 sm:mb-9"
        >
          Join ambitious students building the next unicorn startups. Don&apos;t just
          dream it—launch it.
        </motion.p>

        {/* Aesthetic Spotlight & Shimmer Hero CTA Buttons */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease: FESS_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-9 sm:mb-12"
        >
          <HeroAuraButton
            variant="crimson"
            onClick={() => onNavigate('events')}
            className="w-full sm:w-auto"
          >
            <span>Explore Our Flagship Event</span>
            <Flame className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
          </HeroAuraButton>

          <HeroAuraButton
            variant="ivory"
            onClick={() => onNavigate('teams')}
            className="w-full sm:w-auto font-bold"
          >
            <span>Meet Our Teams</span>
            <Users className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </HeroAuraButton>

          <HeroAuraButton
            variant="obsidian"
            onClick={() => onNavigate('connect')}
            className="w-full sm:w-auto"
          >
            <span>Connect With FESS</span>
            <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </HeroAuraButton>
        </motion.div>

        {/* Society Pillars & Flagship Event Bridge Strip */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: FESS_EASE }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto"
        >
          <div className="px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 flex items-center gap-3.5 text-left">
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

          <div className="px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 flex items-center gap-3.5 text-left">
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

          <motion.button
            type="button"
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
            onClick={() => onNavigate('events')}
            className="px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/18 backdrop-blur-md border border-amber-400/35 flex items-center gap-3.5 text-left transition-colors duration-150 group"
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
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero25;
