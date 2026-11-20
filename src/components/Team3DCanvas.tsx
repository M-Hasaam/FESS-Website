import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import type { TeamId } from '../data/fessData';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Team3DCanvasProps {
  teamId: TeamId;
}

// Octagonal dual-ring prism vertices for a crisp architectural 3D emblem
function buildRingVertices(radius: number, yOffset: number, count: number): Vec3[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return {
      x: Math.cos(a) * radius,
      y: yOffset,
      z: Math.sin(a) * radius,
    };
  });
}

const UPPER_RING = buildRingVertices(1.85, -0.58, 8);
const LOWER_RING = buildRingVertices(1.85, 0.58, 8);
const INNER_DIAMOND: Vec3[] = [
  { x: 0, y: -1.45, z: 0 },
  { x: 1.05, y: 0, z: 0 },
  { x: 0, y: 0, z: 1.05 },
  { x: -1.05, y: 0, z: 0 },
  { x: 0, y: 0, z: -1.05 },
  { x: 0, y: 1.45, z: 0 },
];

const DIAMOND_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [5, 1], [5, 2], [5, 3], [5, 4],
  [1, 2], [2, 3], [3, 4], [4, 1],
];

function rotatePoint(p: Vec3, ax: number, ay: number, az: number): Vec3 {
  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;

  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  const x2 = p.x * cosY + z1 * sinY;
  const z2 = -p.x * sinY + z1 * cosY;

  const cosZ = Math.cos(az);
  const sinZ = Math.sin(az);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

export function Team3DCanvas({ teamId }: Team3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let angleX = 0.34;
    let angleY = 0.25;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    const isExec = teamId === 'executive';
    const primaryGlow = isExec ? '245, 158, 11' : '248, 113, 113';
    const secondaryGlow = isExec ? '220, 38, 38' : '148, 163, 184';

    const satellites = Array.from({ length: 24 }, (_, i) => {
      const theta = (i / 24) * Math.PI * 2;
      const elevation = ((i % 5) - 2) * 0.42;
      const r = 2.4 + (i % 3) * 0.35;
      return {
        x: Math.cos(theta) * r,
        y: elevation,
        z: Math.sin(theta) * r,
        major: i % 6 === 0,
      };
    });

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

    const project = (p: Vec3, scale: number, cx: number, cy: number) => {
      const fov = 5.6;
      const depth = fov / (fov - p.z);
      return {
        x: cx + p.x * scale * depth,
        y: cy + p.y * scale * depth,
        z: p.z,
        depth,
      };
    };

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      if (!shouldReduce) {
        angleY += isExec ? 0.004 : 0.0052;
        angleX += 0.0014;
      }

      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.06;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.06;

      const ax = angleX + currentOffsetY * 0.45;
      const ay = angleY + currentOffsetX * 0.65;
      const scale = Math.min(width, height) * 0.21;
      const cx = width * 0.78;
      const cy = height * 0.5;

      const projUpper = UPPER_RING.map((v) =>
        project(rotatePoint(v, ax, ay, 0.14), scale, cx, cy)
      );
      const projLower = LOWER_RING.map((v) =>
        project(rotatePoint(v, ax, ay, 0.14), scale, cx, cy)
      );

      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        const u1 = projUpper[i];
        const u2 = projUpper[next];
        const l1 = projLower[i];
        const l2 = projLower[next];

        ctx.beginPath();
        ctx.moveTo(u1.x, u1.y);
        ctx.lineTo(u2.x, u2.y);
        ctx.strokeStyle = `rgba(${primaryGlow}, 0.34)`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(l1.x, l1.y);
        ctx.lineTo(l2.x, l2.y);
        ctx.strokeStyle = `rgba(${secondaryGlow}, 0.28)`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(u1.x, u1.y);
        ctx.lineTo(l1.x, l1.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      const projDiamond = INNER_DIAMOND.map((v) =>
        project(rotatePoint(v, -ax * 1.15, -ay * 1.3, 0.22), scale, cx, cy)
      );
      for (const [a, b] of DIAMOND_EDGES) {
        const p1 = projDiamond[a];
        const p2 = projDiamond[b];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${primaryGlow}, 0.52)`;
        ctx.lineWidth = 1.45;
        ctx.stroke();
      }

      const projSatellites = satellites.map((s) => ({
        ...project(rotatePoint(s, ax * 0.55, ay * 0.95, 0.1), scale, cx, cy),
        major: s.major,
      }));
      for (const s of projSatellites) {
        const radius = s.major ? Math.max(2.6, 4.2 * s.depth) : Math.max(1.2, 2.0 * s.depth);
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = s.major
          ? `rgba(${primaryGlow}, 0.85)`
          : 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
      }

      if (!shouldReduce) {
        animId = requestAnimationFrame(draw);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          cancelAnimationFrame(animId);
          draw();
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );

    const updateOffset = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      targetOffsetX = ((clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 1.4;
      targetOffsetY = ((clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 1.4;
    };

    const onPointerMove = (e: PointerEvent) => {
      updateOffset(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateOffset(t.clientX, t.clientY);
    };

    const onMouseLeave = () => {
      targetOffsetX = 0;
      targetOffsetY = 0;
    };

    resize();
    observer.observe(canvas);
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchend', onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchend', onMouseLeave);
    };
  }, [teamId, shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="team-3d-canvas"
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none opacity-85"
    />
  );
}
