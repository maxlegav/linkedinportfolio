import Image from "next/image";
import Link from "next/link";
import type { User, Education } from "@/data/portfolio";
import { ProfileAvatar } from "./ProfileAvatar";
import { ShellCard } from "./ShellCard";

type ProfileMiniCardProps = {
  user: User;
  education?: Education[];
};

export function ProfileMiniCard({ user, education }: ProfileMiniCardProps) {
  const initial = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ShellCard noPadding className="relative text-center">
      <div className="relative h-[72px] overflow-hidden rounded-t-[7px]">
        <Image
          src={user.bannerUrl}
          alt=""
          fill
          sizes="225px"
          className="object-cover"
          priority
        />
      </div>
      <div className="-mt-10 flex flex-col items-center px-3 pb-3 pt-2">
        <Link
          href="/profile"
          className="relative block shrink-0 rounded-full border-2 border-white bg-[#dce6f1] shadow-sm"
          aria-label={`Profile · ${user.name}`}
        >
          <ProfileAvatar src={user.avatarUrl} initials={initial} size={80} className="text-2xl" />
        </Link>
        <Link
          href="/profile"
          className="mt-0 text-[17px] font-bold leading-snug tracking-tight text-[var(--li-text)] hover:text-[var(--li-blue)] hover:underline"
        >
          {user.name}
        </Link>
        <p className="mt-1 line-clamp-3 px-1 text-[12px] text-[var(--li-text-muted)]">{user.headline}</p>
        <p className="mt-1 text-[11px] text-[var(--li-text-faint)]">{user.location}</p>

        {education && education.length > 0 && (
          <div className="mt-3 w-full border-t border-black/[0.08] pt-2 text-left">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--li-text-muted)]">Education</p>
            {education.slice(0, 2).map((edu) => (
              <div key={edu.id} className="mb-2 flex items-start gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#dce6f1] text-[11px] font-bold text-[var(--li-blue-hover)]">
                  {edu.logoLetter}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold leading-tight text-[var(--li-text)]">{edu.school}</p>
                  <p className="text-[11px] text-[var(--li-text-muted)]">{edu.field}</p>
                  <p className="text-[10px] text-[var(--li-text-faint)]">{edu.startYear} – {edu.endYear}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 w-full border-t border-black/[0.08] pt-3">
          <a
            href={user.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--li-blue)] px-3 py-[6px] text-[13px] font-semibold text-[var(--li-blue)] transition-colors hover:bg-[var(--li-blue)]/10"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Download CV
          </a>
        </div>

        <p className="mt-2 w-full border-t border-black/[0.08] pb-1 pt-2 text-left text-[11px] font-semibold text-[var(--li-text-muted)]">
          Profile visible to your network
        </p>
      </div>
    </ShellCard>
  );
}
