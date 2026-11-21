import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  getNeonOrigin,
  getSpillGradientDirection,
  resolveNeonCubicBezier,
  type NeonDirection,
  type NeonEasing,
  type NeonExpandFrom,
} from '../../utils/neonRevealConfig';

export interface NeonRevealHandle {
  replay: () => void;
}

export interface NeonRevealProps {
  colors?: [string, string];
  backgroundColor?: string;
  direction?: NeonDirection;
  expandFrom?: NeonExpandFrom;
  trigger?: 'mount' | 'inView' | 'manual';
  scrollThreshold?: number;
  revealDelay?: number;
  revealDuration?: number;
  easing?: NeonEasing;
  thickness?: number;
  glow?: number;
  spill?: number;
  reach?: number;
  intensity?: number;
  onStart?: () => void;
  onComplete?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const NeonReveal = forwardRef<NeonRevealHandle, NeonRevealProps>(function NeonReveal(
  {
    colors = ['#991B1B', '#F59E0B'],
    backgroundColor = 'transparent',
    direction = 'down',
    expandFrom = 'center',
    trigger = 'mount',
    scrollThreshold = 0.3,
    revealDelay = 0,
    revealDuration = 1600,
    easing = 'out',
    thickness = 3,
    glow = 1,
    spill = 1,
    reach = 1,
    intensity = 1,
    onStart,
    onComplete,
    children,
    className = '',
    style,
  },
  ref
) {
  const shouldReduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: scrollThreshold });

  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'revealing' | 'revealed'>(
    shouldReduce || trigger !== 'manual' ? 'idle' : 'idle'
  );

  const timerRef = useRef<{ start?: number; done?: number }>({});

  const clearTimers = () => {
    if (timerRef.current.start) window.clearTimeout(timerRef.current.start);
    if (timerRef.current.done) window.clearTimeout(timerRef.current.done);
  };

  const runSequence = useCallback(() => {
    clearTimers();
    if (shouldReduce) {
      setPhase('revealed');
      onStart?.();
      onComplete?.();
      return;
    }

    setPhase('idle');
    timerRef.current.start = window.setTimeout(() => {
      setPhase('revealing');
      onStart?.();

      timerRef.current.done = window.setTimeout(() => {
        setPhase('revealed');
        onComplete?.();
      }, revealDuration);
    }, Math.max(16, revealDelay));
  }, [shouldReduce, revealDelay, revealDuration, onStart, onComplete]);

  useImperativeHandle(
    ref,
    () => ({
      replay: () => {
        setCycle((c) => c + 1);
        runSequence();
      },
    }),
    [runSequence]
  );

  useEffect(() => {
    if (trigger === 'mount') {
      runSequence();
    } else if (trigger === 'inView' && inView) {
      runSequence();
    }
    return clearTimers;
  }, [trigger, inView, runSequence]);

  const [primaryColor, secondaryColor] = colors;
  const bezier = resolveNeonCubicBezier(easing);
  const origin = getNeonOrigin(expandFrom, direction);
  const spillAngle = getSpillGradientDirection(direction);

  const tubeDurationSec = Math.max(0.35, (revealDuration * 0.42) / 1000);
  const lightDurationSec = Math.max(0.45, (revealDuration * 0.65) / 1000);

  const isHorizontalTube = direction === 'down' || direction === 'up';
  const isActive = shouldReduce || phase !== 'idle';

  const tubeStyle: React.CSSProperties = {
    ...(isHorizontalTube
      ? {
          left: 0,
          right: 0,
          height: `${thickness}px`,
          top: direction === 'down' ? 0 : undefined,
          bottom: direction === 'up' ? 0 : undefined,
          backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
        }
      : {
          top: 0,
          bottom: 0,
          width: `${thickness}px`,
          left: direction === 'right' ? 0 : undefined,
          right: direction === 'left' ? 0 : undefined,
          backgroundImage: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
        }),
    transformOrigin: origin,
    boxShadow: `0 0 ${14 * glow * intensity}px ${primaryColor}, 0 0 ${28 * glow * intensity}px ${secondaryColor}66`,
  };

  const spillHeightPct = Math.min(100, Math.round(78 * reach));
  const spillOpacity = Math.min(0.42, 0.22 * spill * intensity);

  return (
    <div
      ref={rootRef}
      data-testid="neon-reveal"
      data-neon-state={shouldReduce ? 'revealed' : phase}
      onClick={trigger === 'manual' ? runSequence : undefined}
      style={{ backgroundColor, ...style }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      {/* Glowing Neon Tube Bar */}
      <motion.div
        key={`tube-${cycle}`}
        aria-hidden="true"
        initial={
          shouldReduce
            ? { opacity: 1, scaleX: 1, scaleY: 1 }
            : isHorizontalTube
              ? { opacity: 0.2, scaleX: 0 }
              : { opacity: 0.2, scaleY: 0 }
        }
        animate={
          isActive
            ? { opacity: 1, scaleX: 1, scaleY: 1 }
            : isHorizontalTube
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 0, scaleY: 0 }
        }
        transition={{
          duration: shouldReduce ? 0 : tubeDurationSec,
          ease: bezier,
        }}
        style={tubeStyle}
        className="pointer-events-none absolute z-20 rounded-full"
      />

      {/* Volumetric Light Spill Pouring From the Tube */}
      <motion.div
        key={`spill-${cycle}`}
        aria-hidden="true"
        initial={shouldReduce ? { opacity: spillOpacity } : { opacity: 0, scaleY: 0.25 }}
        animate={
          isActive
            ? { opacity: spillOpacity, scaleY: 1 }
            : { opacity: 0, scaleY: 0.25 }
        }
        transition={{
          duration: shouldReduce ? 0 : lightDurationSec,
          delay: shouldReduce ? 0 : tubeDurationSec * 0.28,
          ease: bezier,
        }}
        style={{
          transformOrigin:
            direction === 'down'
              ? 'top center'
              : direction === 'up'
                ? 'bottom center'
                : direction === 'right'
                  ? 'left center'
                  : 'right center',
          height: isHorizontalTube ? `${spillHeightPct}%` : '100%',
          backgroundImage: `linear-gradient(${spillAngle}, ${primaryColor}55 0%, ${secondaryColor}26 42%, transparent 100%)`,
        }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
      />

      {/* Illuminated Content Reveal */}
      <motion.div
        key={`content-${cycle}`}
        initial={
          shouldReduce
            ? { opacity: 1, y: 0, filter: 'brightness(1)' }
            : { opacity: 0, y: direction === 'up' ? -14 : 14, filter: 'brightness(0.75)' }
        }
        animate={
          isActive
            ? { opacity: 1, y: 0, filter: 'brightness(1)' }
            : { opacity: 0, y: 14, filter: 'brightness(0.75)' }
        }
        transition={{
          duration: shouldReduce ? 0 : lightDurationSec,
          delay: shouldReduce ? 0 : tubeDurationSec * 0.35,
          ease: bezier,
        }}
        className="relative z-20 text-center"
      >
        {children ?? (
          <div className="px-6 py-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#991B1B] mb-3">
              The Powerhouse Behind FESS
            </p>
            <h1
              className="font-extrabold text-[#991B1B] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.85rem)' }}
            >
              Meet Our Teams
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              The passionate innovators, visionaries, and builders making the impossible
              possible
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
});
