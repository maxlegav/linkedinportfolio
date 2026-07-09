"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  albumById,
  albums,
  hackathonProjects,
  madeByMax,
  me,
  messagingContacts,
} from "@/lib/spotify";
import { AlbumCard } from "@/components/spotify/AlbumCard";
import { Carousel } from "@/components/spotify/Carousel";
import { Cover } from "@/components/spotify/Cover";
import { DownloadIcon, PlayIcon } from "@/components/spotify/icons";
import { usePlayer } from "@/components/spotify/PlayerContext";

function greeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const SHORTCUT_IDS = ["p0", "p1", "p2", "p3"];

const subscribeNoop = () => () => {};

export default function HomePage() {
  const { play } = usePlayer();
  const hour = useSyncExternalStore(subscribeNoop, () => new Date().getHours(), () => 12);

  const shortcuts = SHORTCUT_IDS.map((id) => albumById(id)).filter((a) => a !== undefined);

  return (
    <div className="bg-gradient-to-b from-[#1f1f1f] to-sp-bg px-4 pb-12 pt-4 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">{greeting(hour)}</h1>

      {/* Quick shortcuts */}
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        {shortcuts.map((album) => (
          <Link
            key={album.id}
            href={`/album/${album.id}`}
            className="group flex h-14 items-center gap-3 overflow-hidden rounded bg-white/10 transition-colors hover:bg-white/20 md:h-16"
          >
            <Cover album={album} className="h-full w-14 shrink-0 md:w-16" rounded="rounded-none" />
            <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">
              {album.cover.label}
            </span>
            <button
              aria-label={`Play ${album.shortTitle}`}
              onClick={(e) => {
                e.preventDefault();
                play(album.id);
              }}
              className="sp-pill mr-3 hidden h-10 w-10 shrink-0 items-center justify-center bg-sp-green text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:flex"
            >
              <PlayIcon size={18} />
            </button>
          </Link>
        ))}
        <Link
          href="/artist"
          className="flex h-14 items-center gap-3 overflow-hidden rounded bg-white/10 transition-colors hover:bg-white/20 md:h-16"
        >
          <img src={me.avatarUrl} alt={me.name} className="h-full w-14 shrink-0 bg-sp-surface-alt object-cover md:w-16" />
          <span className="truncate text-sm font-bold text-white">About Max</span>
        </Link>
        <a
          href={me.cvUrl}
          download
          className="flex h-14 items-center gap-3 overflow-hidden rounded bg-white/10 transition-colors hover:bg-white/20 md:h-16"
        >
          <span className="flex h-full w-14 shrink-0 items-center justify-center bg-sp-green text-black md:w-16">
            <DownloadIcon size={22} />
          </span>
          <span className="truncate text-sm font-bold text-white">Download CV</span>
        </a>
      </div>

      {/* Featured artist */}
      <section className="mt-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">Featured Artist</h2>
        <div className="flex flex-col items-center gap-6 rounded-lg bg-gradient-to-r from-[#1e3a2f] to-sp-surface p-6 md:flex-row md:p-8">
          <img
            src={me.avatarUrl}
            alt={me.name}
            className="h-36 w-36 rounded-full bg-sp-surface-alt object-cover shadow-2xl md:h-44 md:w-44"
          />
          <div className="min-w-0 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-sp-muted">Artist</p>
            <h3 className="mt-1 text-3xl font-black text-white md:text-4xl">{me.name}</h3>
            <p className="mt-2 text-sm text-sp-muted">{me.headline}</p>
            <Link
              href="/artist"
              className="sp-pill mt-4 inline-block bg-sp-green px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
            >
              Visit Profile
            </Link>
          </div>
        </div>
      </section>

      <Carousel title="Hackathons & Projects">
        {hackathonProjects.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Carousel>

      <Carousel title="Professional Experience">
        {albums
          .filter((a) => a.type === "Compilation")
          .map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
      </Carousel>

      <Carousel title="Made by Max">
        {madeByMax.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Carousel>

      {/* Recommendations */}
      <section className="mt-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">Recommended for you</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {messagingContacts.map((contact) => (
            <div key={contact.id} className="sp-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sp-surface-alt text-sm font-bold text-white">
                  {contact.avatarUrl ? (
                    <img src={contact.avatarUrl} alt={contact.name} className="h-full w-full object-cover" />
                  ) : (
                    contact.avatarLetter
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{contact.name}</p>
                  <p className="truncate text-xs text-sp-muted">{contact.relation}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-sp-muted">“{contact.lastMessage}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
