/**
 * The liquid page-transition uses a full-screen SVG blur filter, which phones cannot run
 * smoothly. Small and touch screens get a lighter, transform-only version with shorter timings.
 */
const LIGHT_QUERY = '(max-width: 767px), (pointer: coarse)';

export function isLightCurtain(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(LIGHT_QUERY).matches;
}

export const CURTAIN_TIMING = {
  full: {
    /** ms until the page swaps behind the curtain */
    swap: 850,
    /** ms the curtain holds after the swap before lifting */
    hold: 450,
    /** seconds the new page waits before its own intro plays */
    intro: 0.55,
  },
  light: { swap: 500, hold: 240, intro: 0.3 },
} as const;

export function getCurtainTiming() {
  return isLightCurtain() ? CURTAIN_TIMING.light : CURTAIN_TIMING.full;
}

export const LIGHT_QUERY_STRING = LIGHT_QUERY;
