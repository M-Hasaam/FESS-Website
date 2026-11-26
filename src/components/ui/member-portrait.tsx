import { useState } from 'react';

interface MemberPortraitProps {
  /** Team member id from fessData (also the photo's file name) */
  memberId: string;
  name: string;
  className?: string;
}

// Drop a photo at public/team/<member-id>.jpg (or .png / .webp) and it replaces the silhouette.
const EXTENSIONS = ['jpg', 'png', 'webp'] as const;

/**
 * Portrait slot: shows a human silhouette until a photo exists for this member.
 */
export function MemberPortrait({ memberId, name, className = '' }: MemberPortraitProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const exhausted = extIndex >= EXTENSIONS.length;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#1B2130] to-[#0C0F16] ${className}`}
    >
      {/* Soft crimson glow behind the figure */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(167,2,14,0.28),transparent_70%)]"
      />

      {/* Human silhouette placeholder */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMax meet"
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <defs>
          <linearGradient id={`sil-${memberId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FAF6F0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FAF6F0" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="88" r="40" fill={`url(#sil-${memberId})`} />
        <path
          d="M18 250 C18 186 58 152 100 152 C142 152 182 186 182 250 Z"
          fill={`url(#sil-${memberId})`}
        />
      </svg>

      {!exhausted && (
        <img
          key={EXTENSIONS[extIndex]}
          src={`/team/${memberId}.${EXTENSIONS[extIndex]}`}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setExtIndex((i) => i + 1)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

export default MemberPortrait;
