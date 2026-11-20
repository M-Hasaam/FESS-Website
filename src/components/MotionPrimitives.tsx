import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

export const FESS_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50 bg-gradient-to-r from-[#7F1D1D] via-[#DC2626] to-[#D97706] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.24,
  className = '',
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 24 });
  const springY = useSpring(y, { stiffness: 320, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      style={shouldReduce ? undefined : { x: springX, y: springY }}
      whileTap={shouldReduce ? undefined : { scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(153, 27, 27, 0.1)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(120);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 250, damping: 22 });
  const hoverScale = useSpring(1, { stiffness: 260, damping: 24 });

  const background = useMotionTemplate`radial-gradient(440px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 76%)`;

  const updateTiltFromClientPoint = (clientX: number, clientY: number) => {
    if (shouldReduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    rotateX.set(rx);
    rotateY.set(ry);
    hoverScale.set(1.015);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateTiltFromClientPoint(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      updateTiltFromClientPoint(touch.clientX, touch.clientY);
    }
  };

  const handleReset = () => {
    rotateX.set(0);
    rotateY.set(0);
    hoverScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleReset}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleReset}
      whileTap={shouldReduce ? undefined : { scale: 0.985 }}
      style={
        shouldReduce
          ? undefined
          : {
              transformPerspective: 950,
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
              scale: hoverScale,
            }
      }
      className={`relative overflow-hidden transition-shadow duration-200 ${className}`}
    >
      {!shouldReduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background }}
        />
      )}
      <div
        className="relative z-20 h-full"
        style={shouldReduce ? undefined : { transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  enable3D?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  enable3D = true,
  className = '',
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  const initialTransform =
    shouldReduce || direction === 'none'
      ? { x: 0, y: 0, rotateX: 0, rotateY: 0 }
      : direction === 'left'
        ? { x: -24, y: 0, rotateX: 0, rotateY: enable3D ? -10 : 0 }
        : direction === 'right'
          ? { x: 24, y: 0, rotateX: 0, rotateY: enable3D ? 10 : 0 }
          : { x: 0, y: 26, rotateX: enable3D ? 12 : 0, rotateY: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...initialTransform }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.58, delay, ease: FESS_EASE }}
      style={
        shouldReduce || !enable3D
          ? undefined
          : { transformPerspective: 1100, transformStyle: 'preserve-3d' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel = 'FESS Visual',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#141923] via-[#3A0C12] to-[#991B1B] text-white/80 p-6 ${className}`}
      >
        <ImageIcon className="w-8 h-8 mb-2 text-amber-300/80" />
        <span className="text-xs font-medium tracking-wide text-center text-white/90">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
