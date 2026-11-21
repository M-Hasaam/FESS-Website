export interface ShardScatterVector {
  enterX: number;
  enterY: number;
  enterRotate: number;
  burstX: number;
  burstY: number;
  burstRotate: number;
  delay: number;
}

export interface CursorCrackVector {
  offsetX: number;
  offsetY: number;
  rotateDeg: number;
  intensity: number;
}

export const SHARD_CLIP_PATHS: readonly [string, string] = [
  'polygon(0% 0%, 100% 0%, 42% 100%, 0% 100%)',
  'polygon(99.5% 0%, 100% 100%, 41.5% 100%)',
];

function deterministicUnit(seed: number): number {
  const raw = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

export function computeShardScatter(
  charIndex: number,
  shardIndex: 0 | 1,
  totalChars: number
): ShardScatterVector {
  const safeTotal = Math.max(1, totalChars);
  const progress = charIndex / safeTotal;
  const seed = charIndex * 7 + shardIndex * 31 + 11;

  const angleSign = shardIndex === 0 ? -1 : 1;
  const angle = (progress - 0.5) * Math.PI * 1.15 + angleSign * (0.45 + deterministicUnit(seed) * 0.65);

  const enterRadius = 26 + deterministicUnit(seed + 1) * 34;
  const burstRadius = 52 + deterministicUnit(seed + 2) * 76;

  return {
    enterX: Math.round(Math.cos(angle) * enterRadius * 10) / 10,
    enterY: Math.round((Math.sin(angle) * enterRadius + angleSign * 14) * 10) / 10,
    enterRotate: Math.round((angleSign * (14 + deterministicUnit(seed + 3) * 26)) * 10) / 10,
    burstX: Math.round((Math.cos(angle) * burstRadius + (progress - 0.5) * 40) * 10) / 10,
    burstY: Math.round((Math.sin(angle) * burstRadius + angleSign * 28) * 10) / 10,
    burstRotate: Math.round((angleSign * (28 + deterministicUnit(seed + 4) * 48)) * 10) / 10,
    delay: Math.min(0.42, charIndex * 0.018 + shardIndex * 0.02),
  };
}

export function computeCursorCrackDisplacement(
  dx: number,
  dy: number,
  radius: number,
  shardIndex: 0 | 1
): CursorCrackVector {
  if (radius <= 0) {
    return { offsetX: 0, offsetY: 0, rotateDeg: 0, intensity: 0 };
  }
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) {
    return { offsetX: 0, offsetY: 0, rotateDeg: 0, intensity: 0 };
  }

  const intensity = Math.pow(1 - distance / radius, 1.35);
  const splitSign = shardIndex === 0 ? -1 : 1;
  const normX = distance > 0.001 ? dx / distance : splitSign;
  const normY = distance > 0.001 ? dy / distance : splitSign;

  const offsetX = Math.round((splitSign * 7.5 + normX * 5.5) * intensity * 10) / 10;
  const offsetY = Math.round((splitSign * 4.5 + normY * 4.5) * intensity * 10) / 10;
  const rotateDeg = Math.round(splitSign * 11.5 * intensity * 10) / 10;

  return {
    offsetX,
    offsetY,
    rotateDeg,
    intensity: Math.round(intensity * 1000) / 1000,
  };
}
