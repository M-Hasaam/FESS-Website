import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export type HeroAuraVariant = 'crimson' | 'ivory' | 'obsidian';

export interface HeroAuraButtonProps {
  children: React.ReactNode;
  variant?: HeroAuraVariant;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
}

const VARIANT_STYLES: Record<HeroAuraVariant, string> = {
  crimson:
    'bg-gradient-to-br from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] text-white border border-amber-300/35 shadow-[0_16px_38px_-10px_rgba(153,27,27,0.65)] hover:shadow-[0_22px_46px_-8px_rgba(220,38,38,0.65)]',
  ivory:
    'bg-gradient-to-b from-white to-[#FAF6F0] text-[#991B1B] border border-amber-200/70 shadow-[0_14px_34px_-10px_rgba(12,16,24,0.45)] hover:shadow-[0_20px_42px_-8px_rgba(245,158,11,0.35)]',
  obsidian:
    'bg-white/10 hover:bg-white/16 backdrop-blur-md text-white border border-white/25 hover:border-amber-300/45 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]',
};

const SPOTLIGHT_TINTS: Record<HeroAuraVariant, string> = {
  crimson: 'rgba(251, 191, 36, 0.28)',
  ivory: 'rgba(153, 27, 27, 0.14)',
  obsidian: 'rgba(251, 191, 36, 0.22)',
};

export function HeroAuraButton({
  children,
  variant = 'crimson',
  onClick,
  className = '',
  strength = 0.22,
  ariaLabel,
}: HeroAuraButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 320, damping: 24 });
  const springY = useSpring(magY, { stiffness: 320, damping: 24 });

  const cursorX = useMotionValue(110);
  const cursorY = useMotionValue(24);
  const spotlight = useMotionTemplate`radial-gradient(150px circle at ${cursorX}px ${cursorY}px, ${SPOTLIGHT_TINTS[variant]}, transparent 74%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    cursorX.set(localX);
    cursorY.set(localY);
    magX.set((localX - rect.width / 2) * strength);
    magY.set((localY - rect.height / 2) * strength);
  };

  const handlePointerLeave = () => {
    magX.set(0);
    magY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={shouldReduce ? undefined : { x: springX, y: springY }}
      whileHover={shouldReduce ? undefined : { y: -2, scale: 1.02 }}
      whileTap={shouldReduce ? undefined : { scale: 0.97 }}
      className={`group relative overflow-hidden min-h-[48px] px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 ${VARIANT_STYLES[variant]} ${className}`}
    >
      {/* Interactive cursor spotlight aura */}
      {!shouldReduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: spotlight }}
        />
      )}

      {/* Aesthetic diagonal specular light sweep */}
      {!shouldReduce && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[320%] transition-all duration-700 ease-out"
        />
      )}

      {/* Crisp inner top rim highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />

      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
