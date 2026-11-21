import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  computeCursorCrackDisplacement,
  computeShardScatter,
  SHARD_CLIP_PATHS,
} from '../../utils/shatterPhysics';
import { FESS_EASE } from '../MotionPrimitives';

export interface ShatterLine {
  text: string;
  className?: string;
}

export interface ShatterTypeProps {
  lines?: ShatterLine[];
  className?: string;
  crackRadius?: number;
  reassembleDelayMs?: number;
}

const DEFAULT_HERO_LINES: ShatterLine[] = [
  {
    text: 'Your Startup',
    className: 'text-white',
  },
  {
    text: 'Starts Here.',
    className:
      'bg-gradient-to-r from-white via-amber-100 to-red-200 bg-clip-text text-transparent',
  },
];

interface CharToken {
  char: string;
  globalIndex: number;
  lineIndex: number;
  lineClassName: string;
}

export function ShatterType({
  lines = DEFAULT_HERO_LINES,
  className = '',
  crackRadius = 128,
  reassembleDelayMs = 760,
}: ShatterTypeProps) {
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLButtonElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reassembleTimerRef = useRef<number | null>(null);

  const [isAssembled, setIsAssembled] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const [shatterCount, setShatterCount] = useState(0);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [charCenters, setCharCenters] = useState<{ x: number; y: number }[]>([]);

  const { groupedLines, totalChars } = useMemo(() => {
    let idx = 0;
    const grouped: CharToken[][] = lines.map((line, lineIndex) =>
      Array.from(line.text).map((char) => {
        const token: CharToken = {
          char,
          globalIndex: idx++,
          lineIndex,
          lineClassName: line.className || 'text-white',
        };
        return token;
      })
    );
    return { groupedLines: grouped, totalChars: idx };
  }, [lines]);

  // Assemble shards smoothly after initial mount
  useEffect(() => {
    if (shouldReduce) {
      setIsAssembled(true);
      return;
    }
    const raf = window.requestAnimationFrame(() => {
      setIsAssembled(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [shouldReduce]);

  useEffect(() => {
    return () => {
      if (reassembleTimerRef.current !== null) {
        window.clearTimeout(reassembleTimerRef.current);
      }
    };
  }, []);

  const measureCharCenters = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const measured = charRefs.current.slice(0, totalChars).map((el) => {
      if (!el) return { x: -9999, y: -9999 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
      };
    });
    setCharCenters(measured);
  };

  const updatePointer = (clientX: number, clientY: number) => {
    if (shouldReduce || !containerRef.current) return;
    if (charCenters.length !== totalChars) {
      measureCharCenters();
    }
    const rect = containerRef.current.getBoundingClientRect();
    setPointerPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    updatePointer(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    if (touch) {
      updatePointer(touch.clientX, touch.clientY);
    }
  };

  const handlePointerLeave = () => {
    setPointerPos(null);
  };

  const triggerShatter = () => {
    if (shouldReduce) return;
    if (reassembleTimerRef.current !== null) {
      window.clearTimeout(reassembleTimerRef.current);
    }
    setShatterCount((c) => c + 1);
    setIsShattering(true);
    reassembleTimerRef.current = window.setTimeout(() => {
      setIsShattering(false);
    }, reassembleDelayMs);
  };

  const fullText = lines.map((l) => l.text).join(' ');

  if (shouldReduce) {
    return (
      <h1
        data-testid="shatter-type"
        data-shatter-state="reduced-motion"
        className={`font-extrabold tracking-tight leading-[1.06] text-white ${className}`}
        style={{ fontSize: 'clamp(2.45rem, 5.4vw, 4.75rem)' }}
      >
        {lines.map((line, i) => (
          <span key={line.text} className={`${i > 0 ? 'block' : 'inline-block'} ${line.className ?? ''}`}>
            {line.text}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1
      className={`font-extrabold tracking-tight leading-[1.06] text-white ${className}`}
      style={{ fontSize: 'clamp(2.45rem, 5.4vw, 4.75rem)' }}
    >
      <button
        ref={containerRef}
        type="button"
        data-testid="shatter-type"
        data-shatter-state={isShattering ? 'shattering' : isAssembled ? 'assembled' : 'entering'}
        data-shatter-count={shatterCount}
        aria-label={`${fullText} — Interactive glass shatter typography, press to shatter`}
        onPointerEnter={measureCharCenters}
        onPointerMove={handlePointerMove}
        onTouchStart={measureCharCenters}
        onTouchMove={handleTouchMove}
        onPointerLeave={handlePointerLeave}
        onTouchEnd={handlePointerLeave}
        onClick={triggerShatter}
        className="relative inline-block w-full text-center select-none cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-amber-300 rounded-2xl"
      >
        {groupedLines.map((tokens, lineIdx) => (
          <span
            key={lines[lineIdx].text}
            className={lineIdx > 0 ? 'block mt-0.5 sm:mt-1' : 'block'}
          >
            {tokens.map((token) => {
              if (token.char === ' ') {
                return (
                  <span
                    key={`space-${token.globalIndex}`}
                    ref={(el) => {
                      charRefs.current[token.globalIndex] = el;
                    }}
                    className="inline-block w-[0.28em]"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </span>
                );
              }

              const scatter0 = computeShardScatter(token.globalIndex, 0, totalChars);
              const scatter1 = computeShardScatter(token.globalIndex, 1, totalChars);

              let crack0 = { offsetX: 0, offsetY: 0, rotateDeg: 0, intensity: 0 };
              let crack1 = { offsetX: 0, offsetY: 0, rotateDeg: 0, intensity: 0 };

              if (pointerPos && charCenters[token.globalIndex]) {
                const center = charCenters[token.globalIndex];
                const dx = center.x - pointerPos.x;
                const dy = center.y - pointerPos.y;
                crack0 = computeCursorCrackDisplacement(dx, dy, crackRadius, 0);
                crack1 = computeCursorCrackDisplacement(dx, dy, crackRadius, 1);
              }

              const isCracked = crack0.intensity > 0.04 || crack1.intensity > 0.04;
              const shardsActive = !isAssembled || isShattering || isCracked;

              const target0 = !isAssembled
                ? {
                    x: scatter0.enterX,
                    y: scatter0.enterY,
                    rotate: scatter0.enterRotate,
                    scale: 0.9,
                    opacity: 0,
                  }
                : isShattering
                  ? {
                      x: scatter0.burstX,
                      y: scatter0.burstY,
                      rotate: scatter0.burstRotate,
                      scale: 0.84,
                      opacity: 0.16,
                    }
                  : {
                      x: crack0.offsetX,
                      y: crack0.offsetY,
                      rotate: crack0.rotateDeg,
                      scale: 1,
                      opacity: 1,
                    };

              const target1 = !isAssembled
                ? {
                    x: scatter1.enterX,
                    y: scatter1.enterY,
                    rotate: scatter1.enterRotate,
                    scale: 0.9,
                    opacity: 0,
                  }
                : isShattering
                  ? {
                      x: scatter1.burstX,
                      y: scatter1.burstY,
                      rotate: scatter1.burstRotate,
                      scale: 0.84,
                      opacity: 0.16,
                    }
                  : {
                      x: crack1.offsetX,
                      y: crack1.offsetY,
                      rotate: crack1.rotateDeg,
                      scale: 1,
                      opacity: 1,
                    };

              return (
                <span
                  key={`char-${token.globalIndex}`}
                  ref={(el) => {
                    charRefs.current[token.globalIndex] = el;
                  }}
                  className="relative inline-block"
                >
                  {/* Crisp unified base character at rest (eliminates subpixel clip seams) */}
                  <span
                    aria-hidden="true"
                    className={`inline-block transition-opacity duration-100 ${token.lineClassName} ${
                      shardsActive ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {token.char}
                  </span>

                  {/* Upper-Left Glass Shard */}
                  <motion.span
                    aria-hidden="true"
                    initial={{
                      x: scatter0.enterX,
                      y: scatter0.enterY,
                      rotate: scatter0.enterRotate,
                      scale: 0.9,
                      opacity: 0,
                    }}
                    animate={target0}
                    transition={
                      isCracked && !isShattering
                        ? { duration: 0.09, ease: 'easeOut' }
                        : {
                            duration: isShattering ? 0.36 : 0.62,
                            delay: isShattering ? 0 : scatter0.delay,
                            ease: FESS_EASE,
                          }
                    }
                    style={{ clipPath: SHARD_CLIP_PATHS[0] }}
                    className={`pointer-events-none absolute inset-0 inline-block will-change-transform ${token.lineClassName} ${
                      isCracked ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]' : ''
                    }`}
                  >
                    {token.char}
                  </motion.span>

                  {/* Lower-Right Glass Shard */}
                  <motion.span
                    aria-hidden="true"
                    initial={{
                      x: scatter1.enterX,
                      y: scatter1.enterY,
                      rotate: scatter1.enterRotate,
                      scale: 0.9,
                      opacity: 0,
                    }}
                    animate={target1}
                    transition={
                      isCracked && !isShattering
                        ? { duration: 0.09, ease: 'easeOut' }
                        : {
                            duration: isShattering ? 0.38 : 0.64,
                            delay: isShattering ? 0 : scatter1.delay,
                            ease: FESS_EASE,
                          }
                    }
                    style={{ clipPath: SHARD_CLIP_PATHS[1] }}
                    className={`pointer-events-none absolute inset-0 inline-block will-change-transform ${token.lineClassName} ${
                      isCracked ? 'drop-shadow-[0_0_8px_rgba(248,113,113,0.45)]' : ''
                    }`}
                  >
                    {token.char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </button>
    </h1>
  );
}
