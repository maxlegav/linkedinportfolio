"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { albums, me } from "@/lib/spotify";
import { Cover } from "./Cover";
import { useLang, type Dict } from "./LanguageContext";
import { usePlayer } from "./PlayerContext";
import { DownloadIcon, HomeIcon, LibraryIcon, SearchIcon, SpotifyLogo } from "./icons";

const NAV: { href: string; labelKey: keyof Dict; Icon: typeof HomeIcon }[] = [
  { href: "/", labelKey: "navHome", Icon: HomeIcon },
  { href: "/search", labelKey: "navSearch", Icon: SearchIcon },
  { href: "/library", labelKey: "navLibrary", Icon: LibraryIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { current, isPlaying } = usePlayer();
  const { t } = useLang();

  return (
    <aside
      data-tour="sidebar"
      className="fixed bottom-[90px] left-0 top-0 z-40 hidden w-[240px] flex-col bg-black md:flex"
    >
      <div className="px-6 pt-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <SpotifyLogo size={32} />
          <span className="text-lg font-bold">Portfolio</span>
        </Link>
      </div>

      <nav className="mt-6 px-2">
        {NAV.map(({ href, labelKey, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 rounded px-4 py-2.5 text-sm font-bold transition-colors ${
                active ? "text-white" : "text-sp-muted hover:text-white"
              }`}
            >
              <Icon size={24} />
              {t[labelKey]}
            </Link>
          );
        })}
      </nav>

      <div className="mx-6 my-3 border-t border-[#282828]" />

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        <Link
          href="/artist"
          className={`flex items-center gap-3 rounded px-4 py-2 hover:bg-sp-surface-alt ${
            pathname === "/artist" ? "text-white" : "text-sp-muted"
          }`}
        >
          <img
            src={me.avatarUrl}
            alt={me.name}
            className="h-8 w-8 rounded-full bg-sp-surface-alt object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold hover:text-white">{me.name}</p>
            <p className="truncate text-xs text-sp-dim">{t.artist}</p>
          </div>
        </Link>
        {albums.map((album) => {
          const playing = current.id === album.id && isPlaying;
          return (
            <Link
              key={album.id}
              href={`/album/${album.id}`}
              className="flex items-center gap-3 rounded px-4 py-2 hover:bg-sp-surface-alt"
            >
              <Cover album={album} className="h-8 w-8 shrink-0" rounded="rounded" />
              <div className="min-w-0">
                <p
                  className={`truncate text-sm font-semibold ${
                    playing ? "text-sp-green" : "text-sp-muted hover:text-white"
                  }`}
                >
                  {album.shortTitle}
                </p>
                <p className="truncate text-xs text-sp-dim">
                  {album.group} · {album.year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-[#282828] px-6 py-3 text-xs text-sp-muted">
        <a
          href={me.cvUrl}
          download
          className="flex items-center gap-2 py-1 hover:text-white"
        >
          <DownloadIcon size={14} /> {t.downloadCv}
        </a>
        <a
          href={me.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="block py-1 hover:text-white"
        >
          LinkedIn
        </a>
        <a href={`mailto:${me.email}`} className="block py-1 hover:text-white">
          Email
        </a>
      </div>
    </aside>
  );
}
