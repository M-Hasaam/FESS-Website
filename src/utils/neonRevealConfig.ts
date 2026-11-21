export type NeonDirection = 'down' | 'up' | 'left' | 'right';
export type NeonExpandFrom = 'center' | 'left' | 'right';
export type NeonEasing = 'out' | 'smooth' | 'gentle' | 'linear';

export function resolveNeonCubicBezier(
  easing: NeonEasing
): [number, number, number, number] {
  switch (easing) {
    case 'linear':
      return [0, 0, 1, 1];
    case 'smooth':
      return [0.4, 0, 0.2, 1];
    case 'gentle':
      return [0.25, 0.85, 0.35, 1];
    case 'out':
    default:
      return [0.16, 1, 0.3, 1];
  }
}

export function getNeonOrigin(expandFrom: NeonExpandFrom, direction: NeonDirection): string {
  const horizontal = direction === 'down' || direction === 'up';
  if (horizontal) {
    if (expandFrom === 'left') return '0% 50%';
    if (expandFrom === 'right') return '100% 50%';
    return '50% 50%';
  }
  if (expandFrom === 'left') return '50% 0%';
  if (expandFrom === 'right') return '50% 100%';
  return '50% 50%';
}

export function getSpillGradientDirection(direction: NeonDirection): string {
  switch (direction) {
    case 'up':
      return '0deg';
    case 'left':
      return '270deg';
    case 'right':
      return '90deg';
    case 'down':
    default:
      return '180deg';
  }
}
