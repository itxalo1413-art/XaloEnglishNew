/** Minh họa flat — màu qua className (palette globals.css) */

export function IllustrationDashboardHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="12" width="184" height="116" rx="16" className="fill-[var(--surface-2)] stroke-[var(--border)]" strokeWidth="1.5" />
      <rect x="20" y="28" width="72" height="8" rx="4" className="fill-[var(--primary)]/25" />
      <rect x="20" y="44" width="48" height="6" rx="3" className="fill-[var(--secondary)]/35" />
      <circle cx="168" cy="40" r="18" className="fill-[var(--accent)]/30" />
      <path d="M160 44h16M168 36v16" className="stroke-[var(--accent)]" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="64" width="160" height="48" rx="10" className="fill-[var(--surface-2)] stroke-[var(--border)]/60" strokeWidth="1" />
      <path
        d="M32 98 L56 82 80 90 104 70 128 78 152 62 176 68"
        className="stroke-[var(--primary)]"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="82" r="3" className="fill-[var(--primary)]" />
      <circle cx="104" cy="70" r="3" className="fill-[var(--accent)]" />
      <circle cx="152" cy="62" r="3" className="fill-[var(--secondary)]" />
    </svg>
  );
}

export function IllustrationChẩn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="120" height="88" rx="12" className="fill-[var(--accent)]/15" />
      <rect x="16" y="20" width="88" height="48" rx="8" className="fill-[var(--surface-2)] stroke-[var(--accent)]/40" strokeWidth="1.5" />
      <path d="M28 44h20M28 52h32M28 60h24" className="stroke-[var(--primary)]" strokeWidth="2" strokeLinecap="round" />
      <circle cx="88" cy="42" r="14" className="stroke-[var(--accent)]" strokeWidth="2" />
      <path d="M82 42l4 4 10-10" className="stroke-[var(--accent)]" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationCáNhânHoá({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="120" height="88" rx="12" className="fill-[var(--secondary)]/18" />
      <circle cx="40" cy="36" r="14" className="fill-[var(--primary)]/25 stroke-[var(--primary)]" strokeWidth="1.5" />
      <circle cx="80" cy="36" r="14" className="fill-[var(--secondary)]/30 stroke-[var(--secondary)]" strokeWidth="1.5" />
      <path d="M40 56 L60 68 L80 56" className="stroke-[var(--primary)]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="70" width="64" height="8" rx="4" className="fill-[var(--primary)]/20" />
    </svg>
  );
}

export function IllustrationTheoDõi({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="120" height="88" rx="12" className="fill-[var(--primary)]/12" />
      <rect x="16" y="22" width="88" height="44" rx="8" className="fill-[var(--surface-2)] stroke-[var(--primary)]/35" strokeWidth="1.5" />
      <rect x="24" y="58" width="40" height="6" rx="3" className="fill-[var(--primary)]/35" />
      <rect x="24" y="68" width="72" height="4" rx="2" className="fill-[var(--secondary)]/40" />
      <path d="M28 50 L44 38 60 46 76 32 92 40" className="stroke-[var(--primary)]" strokeWidth="2" strokeLinecap="round" />
      <circle cx="76" cy="32" r="3" className="fill-[var(--accent)]" />
    </svg>
  );
}

/** Thẻ module dọc (hero phải) — line-art, chỉ palette globals */
export function ModuleColumnArtChẩn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 112" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="44" cy="22" r="10" className="stroke-[var(--primary)]" strokeWidth="2" />
      <path d="M44 32v12M32 52h24" className="stroke-[var(--primary)]" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 56h16v28H36z" className="fill-[var(--secondary)]/35 stroke-[var(--primary)]" strokeWidth="1.5" />
      <path d="M40 84h8v16" className="stroke-[var(--primary)]" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 100h20" className="stroke-[var(--primary)]" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="52" y="62" width="22" height="30" rx="4" className="fill-[var(--surface-2)] stroke-[var(--accent)]" strokeWidth="1.5" />
      <path d="M58 72h10M58 78h10M58 84h6" className="stroke-[var(--primary)]" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ModuleColumnArtLộTrình({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 112" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="44" cy="44" r="28" className="stroke-[var(--primary)]" strokeWidth="2" />
      <ellipse cx="44" cy="44" rx="28" ry="10" className="stroke-[var(--secondary)]/60" strokeWidth="1.5" />
      <path d="M44 16v56M16 44h56" className="stroke-[var(--secondary)]/50" strokeWidth="1.2" />
      <circle cx="44" cy="20" r="4" className="fill-[var(--accent)]" />
      <circle cx="68" cy="44" r="4" className="fill-[var(--primary)]" />
      <circle cx="44" cy="68" r="4" className="fill-[var(--secondary)]" />
      <path d="M28 92h40" className="stroke-[var(--primary)]" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 98h24" className="stroke-[var(--muted)]" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function ModuleColumnArtTheoDõi({ className, onPrimary }: { className?: string; onPrimary?: boolean }) {
  return (
    <svg viewBox="0 0 88 112" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect
        x="12"
        y="20"
        width="64"
        height="72"
        rx="10"
        className={onPrimary ? "fill-[var(--on-primary)]/15" : "fill-[var(--primary)]/8"}
      />
      <rect
        x="20"
        y="72"
        width="10"
        height="28"
        rx="2"
        className={onPrimary ? "fill-[var(--on-primary)]/70" : "fill-[var(--secondary)]"}
      />
      <rect x="34" y="56" width="10" height="44" rx="2" className="fill-[var(--accent)]" />
      <rect
        x="48"
        y="64"
        width="10"
        height="36"
        rx="2"
        className={onPrimary ? "fill-[var(--on-primary)]/45" : "fill-[var(--primary)]/35"}
      />
      <rect
        x="62"
        y="48"
        width="10"
        height="52"
        rx="2"
        className={onPrimary ? "fill-[var(--on-primary)]" : "fill-[var(--primary)]"}
      />
      <path
        d="M20 36h48"
        className={onPrimary ? "stroke-[var(--on-primary)]/50" : "stroke-[var(--primary)]/50"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
