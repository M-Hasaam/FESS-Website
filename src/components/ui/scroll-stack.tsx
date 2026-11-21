import React, { Children, isValidElement, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  computeActiveStackIndex,
  computeScrollStackCardMetrics,
  type ScrollStackVariant,
} from '../../utils/scrollStackMath';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function ScrollStackItem({
  children,
  itemClassName = '',
  style,
}: ScrollStackItemProps) {
  // Note: `id` is intentionally read by ScrollStack's InternalStackCard and placed
  // on a non-sticky flow marker so anchor jumps land cleanly even when sticky.
  return (
    <div style={style} className={itemClassName}>
      {children}
    </div>
  );
}

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollStackVariant;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  dim?: number;
  peek?: number;
  useWindowScroll?: boolean;
  onActiveIndexChange?: (index: number) => void;
  onStackComplete?: () => void;
}

interface InternalStackCardProps {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  variant: ScrollStackVariant;
  itemDistance: number;
  itemScale: number;
  itemStackDistance: number;
  stackPosition: string;
  baseScale: number;
  rotationAmount: number;
  blurAmount: number;
  dim: number;
  peek: number;
  shouldReduce: boolean;
  child: React.ReactNode;
}

function InternalStackCard({
  index,
  total,
  scrollYProgress,
  variant,
  itemDistance,
  itemScale,
  itemStackDistance,
  stackPosition,
  baseScale,
  rotationAmount,
  blurAmount,
  dim,
  peek,
  shouldReduce,
  child,
}: InternalStackCardProps) {
  const maxIndex = Math.max(1, total - 1);

  const scale = useTransform(scrollYProgress, (p) => {
    if (shouldReduce) return 1;
    const progress = p * maxIndex;
    return computeScrollStackCardMetrics({
      index,
      total,
      progress,
      variant,
      baseScale,
      itemScale,
      peek,
      rotationAmount,
      blurAmount,
      dimAmount: dim,
    }).scale;
  });

  const y = useTransform(scrollYProgress, (p) => {
    if (shouldReduce) return 0;
    const progress = p * maxIndex;
    return computeScrollStackCardMetrics({
      index,
      total,
      progress,
      variant,
      baseScale,
      itemScale,
      peek,
      rotationAmount,
      blurAmount,
      dimAmount: dim,
    }).yOffset;
  });

  const rotate = useTransform(scrollYProgress, (p) => {
    if (shouldReduce) return 0;
    const progress = p * maxIndex;
    return computeScrollStackCardMetrics({
      index,
      total,
      progress,
      variant,
      baseScale,
      itemScale,
      peek,
      rotationAmount,
      blurAmount,
      dimAmount: dim,
    }).rotateZ;
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    if (shouldReduce) return 1;
    const progress = p * maxIndex;
    return computeScrollStackCardMetrics({
      index,
      total,
      progress,
      variant,
      baseScale,
      itemScale,
      peek,
      rotationAmount,
      blurAmount,
      dimAmount: dim,
    }).opacity;
  });

  const filter = useTransform(scrollYProgress, (p) => {
    if (shouldReduce) return 'none';
    const progress = p * maxIndex;
    const metrics = computeScrollStackCardMetrics({
      index,
      total,
      progress,
      variant,
      baseScale,
      itemScale,
      peek,
      rotationAmount,
      blurAmount,
      dimAmount: dim,
    });
    if (metrics.blurPx <= 0.02 && metrics.brightness >= 0.995) {
      return 'none';
    }
    return `brightness(${metrics.brightness}) blur(${metrics.blurPx}px)`;
  });

  const isLast = index === total - 1;
  const stickyTopOffset = `calc(${stackPosition} + ${index * itemStackDistance}px)`;

  const childId = isValidElement<{ id?: string }>(child) ? child.props.id : undefined;

  return (
    <>
      {childId && (
        <span
          id={childId}
          aria-hidden="true"
          className="block h-0 w-0 scroll-mt-24 pointer-events-none"
        />
      )}
      <div
        data-testid={`scroll-stack-card-${index}`}
        style={{
          position: shouldReduce ? 'relative' : 'sticky',
          top: shouldReduce ? undefined : stickyTopOffset,
          zIndex: 10 + index,
          marginBottom: isLast ? 0 : `${itemDistance}px`,
        }}
        className="will-change-transform"
      >
        <motion.div
          style={
            shouldReduce
              ? undefined
              : {
                  scale,
                  y,
                  rotate,
                  opacity,
                  filter,
                  transformOrigin: 'top center',
                }
          }
        >
          {child}
        </motion.div>
      </div>
    </>
  );
}

export function ScrollStack({
  children,
  className = '',
  variant = 'stack',
  itemDistance = 48,
  itemScale = 0.035,
  itemStackDistance = 18,
  stackPosition = '90px',
  baseScale = 0.89,
  rotationAmount = 0,
  blurAmount = 0.65,
  dim = 0.16,
  peek = 8,
  useWindowScroll = true,
  onActiveIndexChange,
  onStackComplete,
}: ScrollStackProps) {
  const shouldReduce = Boolean(useReducedMotion());
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);
  const total = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);
  const completedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: useWindowScroll ? undefined : containerRef,
    offset: ['start 96px', 'end 500px'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (total <= 1) return;
    const nextIdx = computeActiveStackIndex(latest * (total - 1), total);
    if (nextIdx !== lastIndexRef.current) {
      lastIndexRef.current = nextIdx;
      setActiveIndex(nextIdx);
      onActiveIndexChange?.(nextIdx);
    }
    if (nextIdx === total - 1 && !completedRef.current) {
      completedRef.current = true;
      onStackComplete?.();
    } else if (nextIdx < total - 1) {
      completedRef.current = false;
    }
  });

  useEffect(() => {
    lastIndexRef.current = 0;
    completedRef.current = false;
    setActiveIndex(0);
  }, [total]);

  return (
    <div
      ref={containerRef}
      data-testid="scroll-stack"
      data-stack-variant={variant}
      data-active-index={activeIndex}
      className={`relative ${
        useWindowScroll ? '' : 'max-h-[82vh] overflow-y-auto pr-1'
      } ${className}`}
    >
      {cards.map((child, idx) => (
        <InternalStackCard
          key={
            isValidElement<{ id?: string }>(child) && child.key
              ? child.key
              : `stack-item-${idx}`
          }
          index={idx}
          total={total}
          scrollYProgress={scrollYProgress}
          variant={variant}
          itemDistance={itemDistance}
          itemScale={itemScale}
          itemStackDistance={itemStackDistance}
          stackPosition={stackPosition}
          baseScale={baseScale}
          rotationAmount={rotationAmount}
          blurAmount={blurAmount}
          dim={dim}
          peek={peek}
          shouldReduce={shouldReduce}
          child={child}
        />
      ))}
    </div>
  );
}

export default ScrollStack;
