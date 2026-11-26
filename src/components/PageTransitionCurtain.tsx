import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import emblemMark from '../assets/logo/fess-emblem-mark.png';
import { LIGHT_QUERY_STRING, isLightCurtain } from '../utils/curtainMode';

interface PageTransitionCurtainProps {
  isVisible: boolean;
  label: string;
}

const EXPO = [0.16, 1, 0.3, 1] as const;
const SWELL = [0.65, 0, 0.35, 1] as const;
const WIPE = [0.77, 0, 0.175, 1] as const;

type Bead = { x: number; y: number };

// Wave 1: crimson, sweeps left to right
const CRIMSON: Bead[] = [
  { x: 4, y: 28 },
  { x: 10, y: 82 },
  { x: 22, y: 8 },
  { x: 28, y: 58 },
  { x: 40, y: 100 },
  { x: 46, y: 24 },
  { x: 56, y: 70 },
  { x: 66, y: 4 },
  { x: 72, y: 46 },
  { x: 80, y: 96 },
  { x: 90, y: 20 },
  { x: 96, y: 68 },
];

// Wave 2: dark, sweeps right to left and closes over the crimson
const DARK: Bead[] = [
  { x: 96, y: 50 },
  { x: 88, y: 92 },
  { x: 82, y: 8 },
  { x: 70, y: 66 },
  { x: 62, y: 28 },
  { x: 52, y: 96 },
  { x: 44, y: 50 },
  { x: 30, y: 12 },
  { x: 20, y: 84 },
  { x: 8, y: 40 },
  { x: 0, y: 0 },
  { x: 100, y: 100 },
  { x: 100, y: 0 },
  { x: 0, y: 100 },
];

const STAGGER = 0.016;
const BEAD_TIME = 0.36;
const SECOND_WAVE_DELAY = 0.22;

function Wave({
  beads,
  size,
  colors,
  enterDelay,
  exitDelay,
}: {
  beads: Bead[];
  size: number; // vmax diameter at full scale
  colors: [string, string];
  enterDelay: number;
  exitDelay: number;
}) {
  return (
    <div
      className="absolute inset-0"
      // Own GPU layer so the full-screen filter doesn't repaint the page underneath
      style={{ filter: 'url(#fess-goo)', transform: 'translateZ(0)', willChange: 'transform' }}
    >
      {beads.map((bead, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${bead.x}%`,
            top: `${bead.y}%`,
            width: `${size}vmax`,
            height: `${size}vmax`,
            marginLeft: `-${size / 2}vmax`,
            marginTop: `-${size / 2}vmax`,
            background: i % 3 === 0 ? colors[1] : colors[0],
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: { duration: BEAD_TIME, delay: enterDelay + i * STAGGER, ease: SWELL },
          }}
          exit={{
            scale: 0,
            transition: {
              duration: BEAD_TIME,
              delay: exitDelay + (beads.length - 1 - i) * STAGGER,
              ease: SWELL,
            },
          }}
        />
      ))}
    </div>
  );
}

/** Phones and touch screens: no filter, only transforms and opacity (all GPU-composited). */
function useLightMode() {
  const [light, setLight] = useState(isLightCurtain);

  useEffect(() => {
    const mq = window.matchMedia(LIGHT_QUERY_STRING);
    const onChange = () => setLight(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return light;
}

export function PageTransitionCurtain({
  isVisible,
  label,
}: PageTransitionCurtainProps) {
  const shouldReduce = Boolean(useReducedMotion());
  const light = useLightMode();
  const liquid = !light && !shouldReduce;

  // Content cues arrive earlier on the shorter mobile timeline
  const base = light ? 0.26 : 0.42;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="page-curtain"
          aria-hidden="true"
          className="pointer-events-auto fixed inset-0 z-50 overflow-hidden"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          // Keeps the wrapper mounted while the layers drain away
          exit={{ y: 0, transition: { duration: shouldReduce ? 0.15 : light ? 0.6 : 0.95 } }}
        >
          {liquid && (
            <>
              {/* Goo filter: lets neighbouring beads fuse like the emblem's connected dots */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <filter id="fess-goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
                    />
                  </filter>
                </defs>
              </svg>
              <Wave
                beads={CRIMSON}
                size={46}
                colors={['#A7020E', '#7A0711']}
                enterDelay={0}
                exitDelay={0.3}
              />
              <Wave
                beads={DARK}
                size={44}
                colors={['#0C0F16', '#12161F']}
                enterDelay={SECOND_WAVE_DELAY}
                exitDelay={0}
              />
            </>
          )}

          {light && !shouldReduce && (
            <>
              {/* Two curved panels sliding up: crimson leads, dark follows */}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[112%] bg-[#A7020E]"
                style={{
                  borderTopLeftRadius: '50% 7vh',
                  borderTopRightRadius: '50% 7vh',
                  willChange: 'transform',
                }}
                initial={{ y: '105%' }}
                animate={{ y: '0%', transition: { duration: 0.38, ease: WIPE } }}
                exit={{ y: '-112%', transition: { duration: 0.38, delay: 0.06, ease: WIPE } }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[112%] bg-[#0C0F16]"
                style={{
                  borderTopLeftRadius: '50% 7vh',
                  borderTopRightRadius: '50% 7vh',
                  willChange: 'transform',
                }}
                initial={{ y: '105%' }}
                animate={{ y: '0%', transition: { duration: 0.38, delay: 0.08, ease: WIPE } }}
                exit={{ y: '-112%', transition: { duration: 0.38, ease: WIPE } }}
              />
            </>
          )}

          {shouldReduce && (
            <motion.div
              className="absolute inset-0 bg-[#0C0F16]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}

          {/* Content arrives on the dark layer */}
          <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-12 sm:py-12 lg:px-28">
            <motion.img
              src={emblemMark}
              alt=""
              className="pointer-events-none absolute -right-[18vw] top-1/2 w-[80vw] -translate-y-1/2 select-none lg:-right-[8vw] lg:w-[46vw]"
              initial={shouldReduce ? false : light ? { opacity: 0 } : { opacity: 0, rotate: -28, scale: 0.86 }}
              animate={
                light
                  ? { opacity: 1, transition: { duration: 0.35, delay: base, ease: EXPO } }
                  : {
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                      transition: { duration: 0.8, delay: base, ease: EXPO },
                    }
              }
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            />

            <motion.p
              className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300 sm:text-xs"
              initial={shouldReduce ? false : { opacity: 0, x: -12 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, delay: base + 0.03, ease: EXPO },
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              FAST Entrepreneurship &amp; Startup Society
            </motion.p>

            <div className="relative overflow-hidden pb-[0.24em]">
              <motion.div
                className="font-[family-name:var(--font-headline)] text-[15vw] font-medium leading-[0.95] tracking-[-0.035em] text-[#FAF6F0] sm:text-[11vw]"
                initial={shouldReduce ? false : { y: '105%' }}
                animate={{
                  y: 0,
                  transition: { duration: light ? 0.42 : 0.5, delay: base, ease: EXPO },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                {label}
                <span className="text-amber-300">.</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
