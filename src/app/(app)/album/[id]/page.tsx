"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { albumById, albums, me } from "@/lib/spotify";
import { AlbumCard } from "@/components/spotify/AlbumCard";
import { Carousel } from "@/components/spotify/Carousel";
import { Cover } from "@/components/spotify/Cover";
import { ClockIcon, ExternalLinkIcon, PlayIcon } from "@/components/spotify/icons";
import { usePlayer } from "@/components/spotify/PlayerContext";

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { play, current, isPlaying } = usePlayer();

  const album = albumById(id);
  if (!album) notFound();

  const playing = current.id === album.id && isPlaying;
  const others = albums.filter((a) => a.id !== album.id).slice(0, 4);

  const handleLink = (url: string, copyText?: string) => {
    if (copyText && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(copyText).catch(() => {});
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <header
        className="flex flex-col items-center gap-6 px-4 pb-6 pt-10 md:flex-row md:items-end md:px-8"
        style={{
          background: `linear-gradient(180deg, ${album.cover.color} 0%, #121212 100%)`,
        }}
      >
        <Cover album={album} className="w-48 shrink-0 shadow-2xl md:w-60" />
        <div className="min-w-0 text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-white">{album.type}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
            {album.title}
          </h1>
          <p className="mt-4 text-sm font-semibold text-white/90">
            <Link href="/artist" className="hover:underline">
              {me.name}
            </Link>{" "}
            · {album.year} · {album.tracks.length} tracks
          </p>
        </div>
      </header>

      <div className="px-4 md:px-8">
        <div className="flex items-center gap-5 py-6">
          <button
            aria-label={`Play ${album.shortTitle}`}
            onClick={() => play(album.id)}
            className="sp-pill flex h-14 w-14 items-center justify-center bg-sp-green text-black shadow-xl transition-transform hover:scale-105 hover:bg-sp-green-hover"
          >
            <PlayIcon size={26} />
          </button>
          {playing && (
            <span className="sp-eq flex items-end" aria-label="Playing">
              <span /><span /><span />
            </span>
          )}
        </div>

        {/* Tracklist */}
        <section>
          <div className="grid grid-cols-[24px_1fr_auto] items-center gap-4 border-b border-white/10 px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-sp-dim">
            <span>#</span>
            <span>Title</span>
            <ClockIcon size={14} />
          </div>
          {album.tracks.map((track, i) => (
            <div
              key={`${track.name}-${i}`}
              className="group grid grid-cols-[24px_1fr_auto] items-center gap-4 rounded px-3 py-2.5 hover:bg-white/10"
            >
              <span className="text-sm tabular-nums text-sp-muted group-hover:hidden">{i + 1}</span>
              <button
                aria-label={`Play ${album.shortTitle}`}
                onClick={() => play(album.id)}
                className="hidden text-white group-hover:block"
              >
                <PlayIcon size={14} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{track.name}</p>
                <p className="truncate text-xs text-sp-muted">{me.name}</p>
              </div>
              <span className="text-sm text-sp-muted">{track.meta}</span>
            </div>
          ))}
        </section>

        {/* Info */}
        <section className="mt-8 rounded-lg bg-sp-surface p-6">
          <h2 className="text-lg font-bold text-white">About this {album.type.toLowerCase()}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sp-muted">
            {album.post.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {album.post.tags.map((tag) => (
              <span key={tag} className="sp-pill bg-sp-surface-alt px-3 py-1 text-xs font-semibold text-sp-muted">
                {tag}
              </span>
            ))}
          </div>
          {album.post.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {album.post.links.map((link) => (
                <button
                  key={link.url}
                  onClick={() => handleLink(link.url, link.copyText)}
                  className="sp-pill flex items-center gap-2 border border-white/40 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  <ExternalLinkIcon size={16} />
                  {link.label}
                </button>
              ))}
            </div>
          )}
          <p className="mt-5 text-xs text-sp-dim">
            {album.subtitle} · {album.post.likeCount ?? 0} streams · {album.post.commentCount ?? 0} saves
          </p>
        </section>

        <Carousel title="More by Max">
          {others.map((a) => (
            <AlbumCard key={a.id} album={a} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
