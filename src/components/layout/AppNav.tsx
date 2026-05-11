import type { ComponentType } from "react";
import Link from "next/link";
import {
  LinkedInBugIcon,
  NavBellIcon,
  NavHomeIcon,
  NavJobsIcon,
  NavMessageIcon,
  NavPeopleIcon,
} from "@/components/icons/LinkedInUiIcons";
import { me } from "@/data/portfolio";
import { NavSearchBar } from "./NavSearchBar";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ active?: boolean }>;
  match: (path: string) => boolean;
  disabled?: boolean;
};

const mainNav: NavItem[] = [
  { href: "/", label: "Home", icon: NavHomeIcon, match: (p) => p === "/" },
  {
    href: "/profile",
    label: "My Profile",
    icon: NavPeopleIcon,
    match: (p) => p === "/profile" || p.startsWith("/profile/"),
  },
  {
    href: "/jobs",
    label: "Jobs",
    icon: NavJobsIcon,
    match: (p) => p === "/jobs" || p.startsWith("/jobs/"),
  },
  {
    href: "/messaging",
    label: "Messaging",
    icon: NavMessageIcon,
    match: (p) => p === "/messaging" || p.startsWith("/messaging/"),
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: NavBellIcon,
    match: (p) => p === "/notifications" || p.startsWith("/notifications/"),
  },
];

function navLabelClass(active: boolean) {
  return active
    ? "text-[var(--li-icon-active)]"
    : "text-[var(--li-text-muted)] group-hover:text-[var(--li-text)]";
}

type AppNavProps = { activePath: string };

export function AppNav({ activePath }: AppNavProps) {
  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-[var(--li-bg-card)]">
        <div className="mx-auto flex h-[var(--li-nav-h)] max-w-[1128px] items-stretch gap-1 px-3 sm:gap-2 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <Link href="/" className="flex shrink-0 items-center overflow-visible" aria-label="home">
              <LinkedInBugIcon />
            </Link>
            <div className="relative max-w-[240px] flex-1 sm:max-w-[280px]">
              <NavSearchBar />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-stretch sm:flex">
            {mainNav.map(({ href, label, icon: Icon, match }) => {
              const active = match(activePath);
              const isNotif = href === "/notifications";
              return (
                <Link key={href} href={href} className="group flex items-stretch rounded-sm hover:bg-black/[0.04]">
                  <div className="relative flex flex-col items-center justify-center px-2 sm:px-3 lg:min-w-[80px]">
                    <div className="relative">
                      <Icon active={active} />
                      {isNotif && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                          1
                        </span>
                      )}
                    </div>
                    <span className={`mt-[1px] max-w-[76px] truncate text-[11px] sm:text-[12px] lg:leading-[16px] ${navLabelClass(active)}`}>
                      {label}
                    </span>
                    {active && (
                      <span className="pointer-events-none absolute bottom-0 left-4 right-4 h-px bg-black sm:left-8 sm:right-8" aria-hidden />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="ml-2 hidden shrink-0 flex-col items-start justify-center gap-[3px] border-l border-amber-200/70 pl-3 text-[11px] leading-snug xl:flex">
            <a
              href={`mailto:${me.email}`}
              className="font-semibold text-[#915907] underline decoration-from-font underline-offset-[2px] hover:text-[#6b4005]"
            >
              Book a call with Max
            </a>
            <a
              href={me.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full border border-[var(--li-blue)] px-2 py-[2px] text-[11px] font-semibold text-[var(--li-blue)] hover:bg-[var(--li-blue)]/10"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-black/[0.08] bg-white sm:hidden" aria-label="Mobile navigation">
        {mainNav.map(({ href, label, icon: Icon, match }) => {
          const active = match(activePath);
          const isNotif = href === "/notifications";
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${active ? "text-[var(--li-icon-active)]" : "text-[var(--li-text-muted)]"}`}
            >
              <div className="relative">
                <Icon active={active} />
                {isNotif && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">1</span>
                )}
              </div>
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
