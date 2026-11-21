export type ScrollStackVariant = 'stack' | 'deck' | 'fade' | 'flip' | 'zoom' | 'reveal';

export interface ScrollStackCardMetricsInput {
  index: number;
  total: number;
  progress: number; // Continuous active card position in [0, total - 1]
  variant?: ScrollStackVariant;
  baseScale?: number;
  itemScale?: number;
  peek?: number;
  rotationAmount?: number;
  blurAmount?: number;
  dimAmount?: number;
}

export interface ScrollStackCardMetrics {
  depth: number;
  scale: number;
  yOffset: number;
  rotateZ: number;
  rotateX: number;
  opacity: number;
  blurPx: number;
  brightness: number;
}

export function computeActiveStackIndex(progress: number, total: number): number {
  if (total <= 1) return 0;
  const clamped = Math.max(0, Math.min(total - 1, progress));
  return Math.round(clamped);
}

export function computeScrollStackCardMetrics({
  index,
  total,
  progress,
  variant = 'stack',
  baseScale = 0.88,
  itemScale = 0.035,
  peek = 8,
  rotationAmount = 0,
  blurAmount = 0.6,
  dimAmount = 0.16,
}: ScrollStackCardMetricsInput): ScrollStackCardMetrics {
  const safeTotal = Math.max(1, total);
  const clampedProgress = Math.max(0, Math.min(safeTotal - 1, progress));
  const rawDepth = Math.max(0, clampedProgress - index);
  const depth = Math.min(rawDepth, 3);

  if (depth <= 0.001) {
    return {
      depth: 0,
      scale: 1,
      yOffset: 0,
      rotateZ: 0,
      rotateX: 0,
      opacity: 1,
      blurPx: 0,
      brightness: 1,
    };
  }

  const effectiveStep = variant === 'zoom' ? itemScale * 1.45 : itemScale;
  const scale = Math.max(baseScale, 1 - depth * effectiveStep);
  const yOffset = -depth * peek;

  const tiltSign = index % 2 === 0 ? -1 : 1;
  const effectiveRotation =
    variant === 'deck' ? Math.max(2, rotationAmount || 2.4) : rotationAmount;
  const rotateZ = tiltSign * Math.min(depth, 2) * effectiveRotation;
  const rotateX = variant === 'flip' ? -Math.min(depth, 1.2) * 7 : 0;

  const blurPx =
    variant === 'reveal' ? 0 : Math.min(depth * blurAmount, Math.max(0, blurAmount) * 2.5);
  const brightness = Math.max(1 - dimAmount * 1.35, 1 - depth * dimAmount * 0.55);
  const opacity =
    variant === 'fade' ? Math.max(0.28, 1 - depth * 0.36) : 1;

  return {
    depth,
    scale: Number(scale.toFixed(4)),
    yOffset: Number(yOffset.toFixed(2)),
    rotateZ: Number(rotateZ.toFixed(2)),
    rotateX: Number(rotateX.toFixed(2)),
    opacity: Number(opacity.toFixed(3)),
    blurPx: Number(blurPx.toFixed(2)),
    brightness: Number(brightness.toFixed(3)),
  };
}
