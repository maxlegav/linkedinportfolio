import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", ...props };
}

export function SpotifyLogo({ size = 32, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />
    </svg>
  );
}

export function LibraryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" />
    </svg>
  );
}

export function PrevIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z" />
    </svg>
  );
}

export function NextIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z" />
    </svg>
  );
}

export function ShuffleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18.788 3.702a1 1 0 0 1 1.414 0l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 1 1-1.414-1.414l.793-.793h-1.665c-.775 0-1.5.375-1.95 1.006l-1.28 1.792-1.229-1.72 .881-1.234A4.395 4.395 0 0 1 17.916 5.91h1.665l-.793-.793a1 1 0 0 1 0-1.414zM8.078 8.286A4.395 4.395 0 0 0 4.5 6.446H2a1 1 0 0 0 0 2h2.5c.775 0 1.5.375 1.95 1.006l4.972 6.96a4.395 4.395 0 0 0 3.578 1.84h1.581l-.793.793a1 1 0 1 0 1.414 1.415l2.5-2.5a1 1 0 0 0 0-1.415l-2.5-2.5a1 1 0 0 0-1.414 1.414l.793.793H15c-.775 0-1.5-.376-1.95-1.006L8.078 8.286zM6.45 13.68a1 1 0 0 1 .246 1.393l-.246.344a4.395 4.395 0 0 1-3.578 1.84H2a1 1 0 1 1 0-2h.872c.775 0 1.5-.376 1.95-1.007l.235-.325a1 1 0 0 1 1.393-.245z" />
    </svg>
  );
}

export function RepeatIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 5h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-1v-2h1a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L11.586 16H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" />
    </svg>
  );
}

export function HeartIcon({ filled, ...props }: IconProps & { filled?: boolean }) {
  return filled ? (
    <svg {...base(props)}>
      <path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z" />
    </svg>
  ) : (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s-7.5-5.5-9.5-9.5C.9 8.3 2.7 4.6 6 4c2-.4 4 .5 6 3 2-2.5 4-3.4 6-3 3.3.6 5.1 4.3 3.5 7.5C19.5 15.5 12 21 12 21z" strokeLinejoin="round" />
    </svg>
  );
}

export function QueueIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 15H1v-2h14v2zm0-8H1V5h14v2zm8 4H1V9h22v2zm-8 8H1v-2h14v2zm4.5 1.061 4.243-2.475L19.5 15.11v5.95z" />
    </svg>
  );
}

export function VolumeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.741.85a.8.8 0 0 1 .375.65v13a.8.8 0 0 1-1.125.73L3.9 12.79H1a1 1 0 0 1-1-1v-7.58a1 1 0 0 1 1-1h2.9L8.991.12A.8.8 0 0 1 9.741.85zm3.355 2.905a.75.75 0 0 1 1.06.005 6.001 6.001 0 0 1 0 8.48.75.75 0 0 1-1.065-1.055 4.5 4.5 0 0 0 0-6.375.75.75 0 0 1 .005-1.055z" transform="translate(4 4)" />
    </svg>
  );
}

export function FullscreenIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM6 14v4h4v2H4v-6h2zm14 0v6h-6v-2h4v-4h2z" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3a1 1 0 0 1 1 1v9.586l3.293-3.293 1.414 1.414L12 17.414l-5.707-5.707 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1zM5 19h14v2H5v-2z" />
    </svg>
  );
}

export function DotsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
}

export function VerifiedIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3d91f4" {...props}>
      <path d="M12 1.5 14.7 4l3.6-.5 1 3.5 3.2 1.8-1.5 3.2 1.5 3.2-3.2 1.8-1 3.5-3.6-.5L12 22.5 9.3 20l-3.6.5-1-3.5L1.5 15.2 3 12 1.5 8.8 4.7 7l1-3.5L9.3 4 12 1.5z" />
      <path d="m10.6 15.4-2.8-2.8 1.2-1.2 1.6 1.6 4.4-4.4 1.2 1.2-5.6 5.6z" fill="#fff" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 3h7v7h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-13h-2v6l5.25 3.15 1-1.65-4.25-2.5V7z" />
    </svg>
  );
}
