import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

// Golden ratio icosahedron vertices for crisp 3D geometric centerpiece
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: Vec3[] = [
  { x: -1, y: PHI, z: 0 },
  { x: 1, y: PHI, z: 0 },
  { x: -1, y: -PHI, z: 0 },
  { x: 1, y: -PHI, z: 0 },
  { x: 0, y: -1, z: PHI },
  { x: 0, y: 1, z: PHI },
  { x: 0, y: -1, z: -PHI },
  { x: 0, y: 1, z: -PHI },
  { x: PHI, y: 0, z: -1 },
  { x: PHI, y: 0, z: 1 },
  { x: -PHI, y: 0, z: -1 },
  { x: -PHI, y: 0, z: 1 },
];

const ICOSA_EDGES: [number, number][] = [
  [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
  [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
  [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
  [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
  [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
  [9, 5], [4, 11], [2, 10], [6, 7], [8, 1],
];

// Inner octahedron for nested 3D core
const OCTA_VERTS: Vec3[] = [
  { x: 1.15, y: 0, z: 0 },
  { x: -1.15, y: 0, z: 0 },
  { x: 0, y: 1.15, z: 0 },
  { x: 0, y: -1.15, z: 0 },
  { x: 0, y: 0, z: 1.15 },
  { x: 0, y: 0, z: -1.15 },
];

const OCTA_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2],
];

function rotatePoint(p: Vec3, ax: number, ay: number, az: number): Vec3 {
  // Rotate X
  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;

  // Rotate Y
  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  const x2 = p.x * cosY + z1 * sinY;
  const z2 = -p.x * sinY + z1 * cosY;

  // Rotate Z
  const cosZ = Math.cos(az);
  const sinZ = Math.sin(az);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

export function Scene3DCanvas() {
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

    let angleX = 0.4;
    let angleY = 0.6;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    // 3D orbiting starfield particles
    const orbitNodes = Array.from({ length: 34 }, (_, i) => {
      const theta = (i / 34) * Math.PI * 2;
      const phi = Math.acos(2 * ((i * 0.6180339) % 1) - 1);
      const radius = 2.1 + (i % 4) * 0.45;
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        gold: i % 3 === 0,
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
      const fov = 5.5;
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
        angleY += 0.0045;
        angleX += 0.0022;
      }

      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.06;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.06;

      const ax = angleX + currentOffsetY * 0.5;
      const ay = angleY + currentOffsetX * 0.6;
      const scale = Math.min(width, height) * 0.16;
      const cx = width * 0.5;
      const cy = height * 0.46;

      // Project outer icosahedron
      const projOuter = RAW_VERTS.map((v) =>
        project(rotatePoint(v, ax, ay, 0.15), scale, cx, cy)
      );

      // Draw outer wireframe edges with depth-based alpha
      for (const [a, b] of ICOSA_EDGES) {
        const p1 = projOuter[a];
        const p2 = projOuter[b];
        const avgZ = (p1.z + p2.z) * 0.5;
        const alpha = Math.max(0.08, Math.min(0.42, 0.24 + avgZ * 0.08));
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // Draw outer vertices
      for (const p of projOuter) {
        const radius = Math.max(1.5, 2.8 * p.depth);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(248, 113, 113, 0.45)';
        ctx.fill();
      }

      // Project counter-rotating inner crimson/gold octahedron
      const projInner = OCTA_VERTS.map((v) =>
        project(rotatePoint(v, -ax * 1.25, -ay * 1.35, 0.3), scale, cx, cy)
      );

      for (const [a, b] of OCTA_EDGES) {
        const p1 = projInner[a];
        const p2 = projInner[b];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.48)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Orbiting 3D sphere constellation nodes
      const projOrbit = orbitNodes.map((n) => ({
        ...project(rotatePoint(n, ax * 0.65, ay * 0.85, 0), scale, cx, cy),
        gold: n.gold,
      }));

      for (let i = 0; i < projOrbit.length; i++) {
        const p = projOrbit[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, 2.1 * p.depth), 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? 'rgba(251, 191, 36, 0.65)'
          : 'rgba(248, 113, 113, 0.55)';
        ctx.fill();

        const next = projOrbit[(i + 1) % projOrbit.length];
        if (Math.hypot(p.x - next.x, p.y - next.y) < 165) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
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

    const handlePointerMove = (e: PointerEvent) => {
      updateOffset(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateOffset(t.clientX, t.clientY);
    };

    const handlePointerLeave = () => {
      targetOffsetX = 0;
      targetOffsetY = 0;
    };

    resize();
    observer.observe(canvas);
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, [shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="hero-3d-canvas"
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none opacity-75"
    />
  );
}
