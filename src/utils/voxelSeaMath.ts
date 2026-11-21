export interface VoxelRipple {
  x: number; // Normalized [-1, 1]
  z: number; // Normalized [0, 1]
  age: number; // Seconds since trigger
  strength: number;
}

export interface VoxelWaveInput {
  normX: number;
  depthZ: number;
  time: number;
  waveHeight: number;
  waveLength: number;
  turbulence: number;
  ripples?: readonly VoxelRipple[];
}

export interface VoxelWaveResult {
  elevation: number;
  crest: number; // [0, 1]
}

export interface VoxelProjectionInput {
  normX: number;
  depthZ: number;
  waveElevation: number;
  width: number;
  height: number;
  horizon: number;
  curvature: number;
}

export interface VoxelProjectionResult {
  x: number;
  y: number;
  perspScale: number;
  arcDrop: number;
}

export function evaluateVoxelWaveHeight({
  normX,
  depthZ,
  time,
  waveHeight,
  waveLength,
  turbulence,
  ripples = [],
}: VoxelWaveInput): VoxelWaveResult {
  const freq = 3.2 / Math.max(0.25, waveLength);
  const swell1 = Math.sin(normX * freq + depthZ * 7.5 - time * 1.45);
  const swell2 = Math.cos(normX * freq * 1.65 - depthZ * 5.2 + time * 1.05);
  const cross =
    Math.sin((normX + depthZ) * freq * 2.8 + time * 2.1) *
    Math.max(0, Math.min(1.5, turbulence));

  let rippleSum = 0;
  for (let i = 0; i < ripples.length; i++) {
    const r = ripples[i];
    if (r.age < 0 || r.age > 2.4) continue;
    const dist = Math.hypot((normX - r.x) * 1.35, depthZ - r.z);
    const wave = Math.sin(dist * 24 - r.age * 8.5);
    const decay = Math.exp(-dist * 4.2) * Math.max(0, 1 - r.age / 2.4);
    rippleSum += wave * decay * r.strength;
  }

  const combined = (swell1 * 0.52 + swell2 * 0.34 + cross * 0.28 + rippleSum * 0.9) * waveHeight;
  const elevation = combined * 13 || 0;
  const crest = Math.max(0, Math.min(1, (combined + 0.85) / 1.7));

  return {
    elevation,
    crest,
  };
}

export function projectVoxelArcPoint({
  normX,
  depthZ,
  waveElevation,
  width,
  height,
  horizon,
  curvature,
}: VoxelProjectionInput): VoxelProjectionResult {
  const safeDepth = Math.max(0, Math.min(1, depthZ));
  const perspScale = 1 / (1 + safeDepth * 2.45);
  const horizonY = height * Math.max(0.18, Math.min(0.85, horizon));
  const seaSpan = Math.max(40, height - horizonY);
  const arcDrop = Math.pow(normX, 2) * curvature * height * 0.11;

  // Perspective distribution concentrates rows near the curved horizon
  const depthCurve = Math.pow(1 - safeDepth, 1.38);
  const x = width * 0.5 + normX * width * (0.64 - safeDepth * 0.14);
  const y = horizonY + depthCurve * seaSpan + arcDrop - waveElevation * perspScale;

  return {
    x,
    y,
    perspScale,
    arcDrop,
  };
}
