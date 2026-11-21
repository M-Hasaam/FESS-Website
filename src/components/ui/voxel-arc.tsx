import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  evaluateVoxelWaveHeight,
  projectVoxelArcPoint,
  type VoxelRipple,
} from '../../utils/voxelSeaMath';

export interface VoxelArcProps {
  accentColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  density?: number;
  voxelSize?: number;
  roundness?: number;
  horizon?: number;
  curvature?: number;
  waveHeight?: number;
  waveLength?: number;
  speed?: number;
  turbulence?: number;
  brightness?: number;
  glow?: number;
  haze?: number;
  interactive?: boolean;
  className?: string;
  eventTargetRef?: React.RefObject<HTMLElement | null>;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return [245, 158, 11];
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function VoxelArc({
  accentColor = '#F59E0B',
  secondaryColor = '#DC2626',
  backgroundColor = 'transparent',
  density = 1,
  voxelSize = 0.56,
  roundness = 0.22,
  horizon = 0.58,
  curvature = 0.52,
  waveHeight = 1,
  waveLength = 1,
  speed = 0.55,
  turbulence = 0.45,
  brightness = 1,
  glow = 1,
  haze = 0.72,
  interactive = true,
  className = '',
  eventTargetRef,
}: VoxelArcProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = Boolean(useReducedMotion());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const primaryRgb = hexToRgb(accentColor);
    const secRgb = hexToRgb(secondaryColor);

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let simTime = 0;
    let lastTs = performance.now();
    let lastWakeTs = 0;

    const ripples: VoxelRipple[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pushRipple = (clientX: number, clientY: number, strength: number) => {
      if (!interactive || shouldReduce) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const rawY = (clientY - rect.top) / rect.height;
      const depthZ = Math.max(0.05, Math.min(0.95, 1 - (rawY - horizon) / Math.max(0.15, 1 - horizon)));
      ripples.push({ x: normX, z: depthZ, age: 0, strength });
      if (ripples.length > 8) ripples.shift();
    };

    const drawFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTs) / 1000));
      lastTs = now;

      if (!shouldReduce) {
        simTime += dt * speed;
        for (let i = ripples.length - 1; i >= 0; i--) {
          ripples[i].age += dt;
          if (ripples[i].age > 2.4) {
            ripples.splice(i, 1);
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      if (width <= 0 || height <= 0) {
        if (!shouldReduce && isVisible) animId = requestAnimationFrame(drawFrame);
        return;
      }

      // Draw luminous curved horizon arc glow
      const horizonY = height * horizon;
      if (glow > 0) {
        const arcSamples = 32;
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i <= arcSamples; i++) {
          const t = i / arcSamples;
          const normX = (t - 0.5) * 2;
          const pt = projectVoxelArcPoint({
            normX,
            depthZ: 1,
            waveElevation: 0,
            width,
            height,
            horizon,
            curvature,
          });
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        const grad = ctx.createLinearGradient(0, horizonY, width, horizonY);
        grad.addColorStop(0, `rgba(${secRgb[0]}, ${secRgb[1]}, ${secRgb[2]}, 0)`);
        grad.addColorStop(0.28, `rgba(${secRgb[0]}, ${secRgb[1]}, ${secRgb[2]}, ${0.38 * glow})`);
        grad.addColorStop(0.5, `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${0.65 * glow})`);
        grad.addColorStop(0.72, `rgba(${secRgb[0]}, ${secRgb[1]}, ${secRgb[2]}, ${0.38 * glow})`);
        grad.addColorStop(1, `rgba(${secRgb[0]}, ${secRgb[1]}, ${secRgb[2]}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 18 * glow;
        ctx.stroke();
        ctx.restore();
      }

      // Responsive voxel grid density
      const isCompact = width < 640;
      const cols = Math.round((isCompact ? 26 : 44) * Math.max(0.6, Math.min(1.4, density)));
      const rows = Math.round((isCompact ? 11 : 15) * Math.max(0.6, Math.min(1.4, density)));
      const baseCell = (width / cols) * voxelSize;

      // Render far-to-near so nearer foreground voxels layer cleanly
      for (let r = rows - 1; r >= 0; r--) {
        const depthZ = r / Math.max(1, rows - 1);
        const depthFade = 1 - depthZ * (0.55 * haze);

        for (let c = 0; c < cols; c++) {
          const normX = (c / Math.max(1, cols - 1) - 0.5) * 2;
          const { elevation, crest } = evaluateVoxelWaveHeight({
            normX,
            depthZ,
            time: simTime,
            waveHeight,
            waveLength,
            turbulence,
            ripples,
          });

          const pt = projectVoxelArcPoint({
            normX,
            depthZ,
            waveElevation: elevation,
            width,
            height,
            horizon,
            curvature,
          });

          const edgeFade = Math.max(0, 1 - Math.pow(Math.abs(normX), 2.4) * 0.65);
          const alpha = Math.max(
            0.05,
            Math.min(0.88, (0.16 + crest * 0.58) * depthFade * edgeFade * brightness)
          );

          const w = Math.max(2, baseCell * pt.perspScale * (0.72 + crest * 0.36));
          const h = Math.max(1.5, w * (0.56 + (1 - depthZ) * 0.34));

          // Interpolate between deep crimson troughs and warm gold/amber wave crests
          const mix = Math.pow(crest, 1.35);
          const red = Math.round(secRgb[0] * (1 - mix) + primaryRgb[0] * mix);
          const green = Math.round(secRgb[1] * (1 - mix) + primaryRgb[1] * mix);
          const blue = Math.round(secRgb[2] * (1 - mix) + primaryRgb[2] * mix);

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`;

          const x = pt.x - w / 2;
          const y = pt.y - h / 2;
          const radius = Math.min(w, h) * 0.5 * roundness;

          if (radius > 0.6 && typeof ctx.roundRect === 'function') {
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, radius);
            ctx.fill();
          } else {
            ctx.fillRect(x, y, w, h);
          }
        }
      }

      if (!shouldReduce && isVisible) {
        animId = requestAnimationFrame(drawFrame);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        cancelAnimationFrame(animId);
        if (isVisible) {
          lastTs = performance.now();
          drawFrame(lastTs);
        }
      },
      { threshold: 0.05 }
    );

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastWakeTs < 95) return;
      lastWakeTs = now;
      pushRipple(e.clientX, e.clientY, 0.55);
    };

    const handleClick = (e: MouseEvent) => {
      pushRipple(e.clientX, e.clientY, 1.25);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const now = performance.now();
      if (now - lastWakeTs < 110) return;
      lastWakeTs = now;
      pushRipple(t.clientX, t.clientY, 0.7);
    };

    resize();
    observer.observe(canvas);
    drawFrame(performance.now());

    const listenerRoot: HTMLElement | Window = eventTargetRef?.current ?? window;
    window.addEventListener('resize', resize);
    if (interactive && !shouldReduce) {
      listenerRoot.addEventListener('pointermove', handlePointerMove as EventListener, {
        passive: true,
      });
      listenerRoot.addEventListener('click', handleClick as EventListener, { passive: true });
      listenerRoot.addEventListener('touchmove', handleTouchMove as EventListener, {
        passive: true,
      });
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      listenerRoot.removeEventListener('pointermove', handlePointerMove as EventListener);
      listenerRoot.removeEventListener('click', handleClick as EventListener);
      listenerRoot.removeEventListener('touchmove', handleTouchMove as EventListener);
    };
  }, [
    accentColor,
    secondaryColor,
    backgroundColor,
    density,
    voxelSize,
    roundness,
    horizon,
    curvature,
    waveHeight,
    waveLength,
    speed,
    turbulence,
    brightness,
    glow,
    haze,
    interactive,
    shouldReduce,
    eventTargetRef,
  ]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="voxel-arc-canvas"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
