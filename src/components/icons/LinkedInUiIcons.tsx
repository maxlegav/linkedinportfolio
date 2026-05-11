type IconProps = { className?: string; active?: boolean };

function clr(active?: boolean) {
  return active ? "text-[var(--li-icon-active)]" : "text-[var(--li-icon-muted)]";
}

/** Monogramme type réseau pro (équivalent champ de marque navigateur LinkedIn). */
export function LinkedInBugIcon({ className = "h-[34px] w-[34px] shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" aria-hidden>
      <rect width="34" height="34" rx="4" fill="#0a66c2" />
      <text
        x="17"
        y="23"
        fill="#fff"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui,-apple-system,Segoe UI,Roboto,sans-serif"
        textAnchor="middle"
      >
        in
      </text>
    </svg>
  );
}

export function NavHomeIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 19v-6h4v6h5v-8h3L12 3 2 11h3v8h5z" />
    </svg>
  );
}

export function NavPeopleIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.01 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

export function NavJobsIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 6h4V4h-4v2zm10 6V12c0-1.1-.9-2-2-2h-4V8h4V6H8v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h-2zM12 17H6v-1h6v1zm6-6H6V9h12v6z" />
    </svg>
  );
}

export function NavMessageIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19 5H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h3v3l3.5-3H19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 10H5V7h14v8zM7 9h10v1.5H7V9zm0 3h7v1.5H7V12z" />
    </svg>
  );
}

export function NavBellIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 22a2.2 2.2 0 002-2H10a2.2 2.2 0 002 2zm8-11V11a8 8 0 10-16 0v5L2 17h20l-2-2v-6zM7 15V11a5 5 0 0110 0v4H7z" />
    </svg>
  );
}

export function NavCaretIcon({ className }: { className?: string }) {
  return (
    <svg className={`h-[4px] w-[10px] text-[var(--li-icon-muted)] ${className ?? ""}`} fill="currentColor" viewBox="0 0 12 8" aria-hidden>
      <path d="M6 8 0 0h12L6 8z" />
    </svg>
  );
}

export function NavGridIcon({ active, className }: IconProps) {
  return (
    <svg className={`h-6 w-6 shrink-0 ${clr(active)} ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11 13H5v6h6v-6zm0-8H5v6h6V5zm8 8h-6v6h6v-6zm0-8h-6v6h6V5z" />
    </svg>
  );
}
