/** Decorative Japanese tea-ritual props + flavor particles (pure SVG, GPU-cheap). */

export function Chasen({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden>
      <rect x="26" y="4" width="12" height="34" rx="6" fill="var(--gold)" opacity="0.85" />
      <path d="M32 38v12" stroke="var(--gold)" strokeWidth="2" />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i / 12 - 0.5) * 2;
        return (
          <path
            key={i}
            d={`M32 44 C ${32 + t * 20} 60, ${32 + t * 26} 72, ${32 + t * 14} 90`}
            stroke="var(--gold)"
            strokeWidth="1.1"
            opacity="0.75"
          />
        );
      })}
    </svg>
  );
}

export function Chashaku({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 32" className={className} fill="none" aria-hidden>
      <path
        d="M4 18 C 26 8, 52 8, 70 14 C 82 18, 90 22, 92 26 C 84 30, 70 28, 58 24 C 40 18, 20 22, 4 18 Z"
        fill="var(--gold)"
        opacity="0.7"
      />
      <path d="M4 18 C 30 10, 58 10, 78 18" stroke="var(--gold)" strokeWidth="1" opacity="0.9" />
    </svg>
  );
}

export function IceShard({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M10 16 L26 4 L42 14 L38 36 L18 44 L6 30 Z"
        fill="rgba(255,255,255,0.55)"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.2"
      />
      <path d="M26 4 L24 44 M6 30 L42 14" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

export function TeaLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M40 8 C 18 8, 8 22, 8 40 C 28 40, 40 28, 40 8 Z"
        fill="var(--sage)"
        opacity="0.8"
      />
      <path d="M38 10 C 26 20, 18 30, 10 38" stroke="var(--primary)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function StrawberrySlice({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M24 4 C 40 16, 42 34, 24 46 C 6 34, 8 16, 24 4 Z" fill="#e0566a" />
      <path d="M24 10 C 35 19, 36 32, 24 41 C 12 32, 13 19, 24 10 Z" fill="#f28a9a" />
      {[[24, 18],[19, 25],[29, 25],[24, 32]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.6" ry="2.4" fill="#fff5f2" opacity="0.9" />
      ))}
    </svg>
  );
}

export function Blueberry({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="25" r="18" fill="#4a3d8f" />
      <circle cx="18" cy="19" r="6" fill="#6f61c0" opacity="0.7" />
      <path
        d="M24 11 l4 4 l4-3 l-1 5 l5 1 l-4 3 l3 4 l-5 -1 l-1 5 l-5 -3 l-5 3 l-1 -5 l-5 1 l3 -4 l-4 -3 l5 -1 l-1 -5 l4 3 z"
        fill="#3a2f73"
        opacity="0.65"
      />
    </svg>
  );
}

export function Raspberry({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {[[24,14],[17,20],[31,20],[13,28],[24,26],[35,28],[19,35],[29,35],[24,42]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="6" fill={i % 2 ? "#c62a49" : "#e0435f"} />
      ))}
    </svg>
  );
}

export function SugarCrumb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M8 26 L18 12 L32 10 L42 22 L34 38 L16 40 Z" fill="#c08a3e" />
      <path d="M14 24 L22 16 L32 18 L34 30 L22 34 Z" fill="#e0aa5c" />
      <circle cx="20" cy="24" r="2" fill="#fbe4bb" opacity="0.8" />
      <circle cx="30" cy="27" r="1.6" fill="#fbe4bb" opacity="0.8" />
    </svg>
  );
}

export const particleMap = {
  leaf: TeaLeaf,
  strawberry: StrawberrySlice,
  blueberry: Blueberry,
  raspberry: Raspberry,
  crumb: SugarCrumb,
} as const;

export type ParticleKind = keyof typeof particleMap;

/** Translucent abstract outline of the Uji river valley, Kyoto. */
export function UjiMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden>
      <path
        d="M78 96 C 150 60, 214 118, 268 96 C 340 66, 392 108, 452 130 C 512 152, 540 214, 520 276 C 500 340, 528 396, 486 452 C 440 512, 356 500, 292 522 C 220 546, 148 520, 108 462 C 66 400, 96 340, 74 274 C 54 214, 40 128, 78 96 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M120 168 C 190 210, 236 262, 300 288 C 372 318, 420 372, 468 436"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M300 288 C 268 336, 250 388, 232 452"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M196 132 C 236 176, 262 212, 300 288"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {[[300,288],[468,436],[120,168]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}
