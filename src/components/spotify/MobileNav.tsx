"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, LibraryIcon, SearchIcon } from "./icons";

/* eslint-disable @next/next/no-img-element */
import { me } from "@/lib/spotify";

const ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/search", label: "Search", Icon: SearchIcon },
  { href: "/library", label: "Library", Icon: LibraryIcon },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[56px] items-center justify-around border-t border-[#282828] bg-black md:hidden">
      {ITEMS.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
              active ? "text-white" : "text-sp-muted"
            }`}
          >
            <Icon size={22} />
            {label}
          </Link>
        );
      })}
      <Link
        href="/artist"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
          pathname === "/artist" ? "text-white" : "text-sp-muted"
        }`}
      >
        <img src={me.avatarUrl} alt={me.name} className="h-[22px] w-[22px] rounded-full bg-sp-surface-alt object-cover" />
        Profile
      </Link>
    </nav>
  );
}
