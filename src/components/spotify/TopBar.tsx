"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { me } from "@/lib/spotify";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "./icons";
import { useLang } from "./LanguageContext";
import { useSearch } from "./SearchContext";

export function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const { lang, t, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-[64px] items-center gap-4 bg-[#121212]/80 px-4 backdrop-blur-md md:px-8">
      <div className="hidden gap-2 md:flex">
        <button
          aria-label="Go back"
          onClick={() => router.back()}
          className="sp-pill flex h-8 w-8 items-center justify-center bg-black/70 text-white"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          aria-label="Go forward"
          onClick={() => router.forward()}
          className="sp-pill flex h-8 w-8 items-center justify-center bg-black/70 text-white"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      {pathname === "/search" && (
        <div className="relative mx-auto w-full max-w-sm">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="sp-pill w-full bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-black outline-none placeholder:text-neutral-500"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Switch language"
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          className="sp-pill bg-black/70 px-3 py-1.5 text-xs font-bold uppercase text-white transition-colors hover:bg-black"
        >
          {lang === "en" ? "FR" : "EN"}
        </button>
        <a
          href={me.cvUrl}
          download
          className="sp-pill bg-sp-green px-4 py-1.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
        >
          {t.downloadCv}
        </a>
        <div className="relative" ref={menuRef}>
          <button
            aria-label="Profile menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="sp-pill flex h-8 w-8 items-center justify-center bg-black/70 p-0.5"
          >
            <img
              src={me.avatarUrl}
              alt={me.name}
              className="h-full w-full rounded-full bg-sp-surface-alt object-cover"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 w-48 rounded-md bg-sp-surface-alt p-1 shadow-2xl">
              <Link
                href="/artist"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]"
              >
                {t.profile}
              </Link>
              <a
                href={me.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${me.email}`}
                className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]"
              >
                Email
              </a>
              <a
                href={me.cvUrl}
                download
                className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]"
              >
                {t.downloadCv}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
