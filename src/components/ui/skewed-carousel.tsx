import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { FESS_EASE, ImageWithFallback } from '../MotionPrimitives';
import { stepCarouselIndex } from '../../utils/fessLogic';

export interface SkewedCarouselItem {
  id: string;
  title: string;
  edition: string;
  category: string;
  dateLabel: string;
  venue: string;
  attendanceLabel: string;
  outcomeLabel: string;
  image: string;
  imageAlt: string;
}

interface SkewedCarouselProps {
  items: SkewedCarouselItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  skewAngle?: number;
  autoPlayMs?: number;
  className?: string;
}

export function SkewedCarousel({
  items,
  activeIndex,
  onActiveIndexChange,
  skewAngle = -4.5,
  autoPlayMs = 4800,
  className = '',
}: SkewedCarouselProps) {
  const shouldReduce = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const count = items.length;
  const safeIndex = count > 0 ? Math.min(activeIndex, count - 1) : 0;

  useEffect(() => {
    if (shouldReduce || isPaused || isHovered || count <= 1 || autoPlayMs <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      onActiveIndexChange(stepCarouselIndex(safeIndex, 1, count));
    }, autoPlayMs);

    return () => window.clearInterval(timer);
  }, [shouldReduce, isPaused, isHovered, count, autoPlayMs, safeIndex, onActiveIndexChange]);

  const handleStep = (delta: number) => {
    if (count <= 1) return;
    onActiveIndexChange(stepCarouselIndex(safeIndex, delta, count));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (count <= 1) return;
    if (info.offset.x < -42 || info.velocity.x < -280) {
      handleStep(1);
    } else if (info.offset.x > 42 || info.velocity.x > 280) {
      handleStep(-1);
    }
  };

  if (count === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center text-sm text-slate-600">
        No archived events match this category yet.
      </div>
    );
  }

  return (
    <div
      data-testid="skewed-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none ${className}`}
    >
      {/* Perspective Stage */}
      <div
        className="relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-3xl"
        style={shouldReduce ? undefined : { perspective: '1300px' }}
      >
        {/* Subtle left & right edge fades on wider screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-16 md:w-28 z-20 bg-gradient-to-r from-[#FAF6F0] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-16 md:w-28 z-20 bg-gradient-to-l from-[#FAF6F0] to-transparent"
        />

        <motion.div
          drag={count > 1 && !shouldReduce ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
          className="relative h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {items.map((item, idx) => {
            // Circular signed distance from active slide
            let offset = idx - safeIndex;
            if (count > 2) {
              const half = Math.floor(count / 2);
              if (offset > half) offset -= count;
              if (offset < -half) offset += count;
            }

            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isVisible = absOffset <= 2;

            if (!isVisible && count > 4) {
              return null;
            }

            // Responsive horizontal spacing and skewed geometry
            const translateXPercent = offset * 76;
            const dynamicSkewY = shouldReduce
              ? 0
              : isCenter
                ? skewAngle * 0.35
                : skewAngle * (offset < 0 ? 1.15 : 0.95);
            const rotateY = shouldReduce ? 0 : offset * -14;
            const scale = isCenter ? 1 : Math.max(0.76, 0.92 - absOffset * 0.08);
            const opacity = isCenter ? 1 : Math.max(0.35, 0.86 - absOffset * 0.24);
            const zIndex = 15 - absOffset * 3;

            return (
              <motion.button
                key={item.id}
                type="button"
                aria-label={`Select ${item.title} (${item.edition})`}
                aria-current={isCenter ? 'true' : undefined}
                onClick={() => onActiveIndexChange(idx)}
                initial={false}
                animate={{
                  x: `${translateXPercent}%`,
                  scale,
                  opacity,
                  skewY: dynamicSkewY,
                  rotateY,
                }}
                whileHover={
                  shouldReduce
                    ? undefined
                    : {
                        skewY: isCenter ? 0 : dynamicSkewY * 0.45,
                        scale: isCenter ? 1.02 : scale + 0.03,
                      }
                }
                whileTap={shouldReduce ? undefined : { scale: isCenter ? 0.985 : scale }}
                transition={{
                  duration: shouldReduce ? 0.01 : 0.48,
                  ease: FESS_EASE,
                }}
                style={{
                  zIndex,
                  transformStyle: shouldReduce ? undefined : 'preserve-3d',
                }}
                className={`absolute w-[84%] max-w-[330px] sm:max-w-[440px] md:max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden text-left shadow-[0_24px_50px_-14px_rgba(20,25,35,0.28)] border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#991B1B] ${
                  isCenter
                    ? 'border-[#991B1B]/60 ring-2 ring-[#991B1B]/20'
                    : 'border-white/30'
                }`}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.imageAlt}
                  fallbackLabel={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Measured high-contrast editorial scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
                />

                {/* Top crimson slant accent line on active frame */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 inset-x-0 h-1 transition-opacity duration-300 ${
                    isCenter ? 'bg-gradient-to-r from-[#991B1B] via-amber-400 to-[#991B1B] opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Unboxed editorial metadata + title */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-mono text-amber-300 tracking-wide mb-1.5">
                    <span>{item.edition}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.attendanceLabel}</span>
                  </div>

                  <h3 className="font-extrabold text-xl sm:text-2xl leading-tight text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-1">
                    {item.venue} <span aria-hidden="true">·</span> {item.outcomeLabel}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={count <= 1}
            aria-label="Previous past event"
            className="min-w-[44px] min-h-[44px] rounded-xl bg-white border border-slate-200 hover:border-[#991B1B]/40 text-slate-800 hover:text-[#991B1B] disabled:opacity-40 flex items-center justify-center shadow-sm active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={count <= 1}
            aria-label="Next past event"
            className="min-w-[44px] min-h-[44px] rounded-xl bg-white border border-slate-200 hover:border-[#991B1B]/40 text-slate-800 hover:text-[#991B1B] disabled:opacity-40 flex items-center justify-center shadow-sm active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {!shouldReduce && count > 1 && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Resume archive slideshow' : 'Pause archive slideshow'}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#991B1B]/40 text-xs font-semibold text-slate-700 hover:text-[#991B1B] inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>Play</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#991B1B]" />
                  <span>Pause</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Slide progress dots + tabular counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {items.map((item, idx) => {
              const active = idx === safeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`View ${item.title}`}
                  onClick={() => onActiveIndexChange(idx)}
                  className={`h-2 rounded-full transition-all ${
                    active ? 'w-7 bg-[#991B1B]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>
          <span className="font-mono text-xs font-bold text-slate-600 tabular-nums">
            {String(safeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
