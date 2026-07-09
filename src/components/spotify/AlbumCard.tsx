"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Album } from "@/lib/spotify";
import { Cover } from "./Cover";
import { PlayIcon } from "./icons";
import { usePlayer } from "./PlayerContext";

export function AlbumCard({ album }: { album: Album }) {
  const { play } = usePlayer();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!loaded) {
    return (
      <div className="w-full p-4">
        <div className="sp-skeleton aspect-square w-full" />
        <div className="sp-skeleton mt-3 h-4 w-3/4" />
        <div className="sp-skeleton mt-2 h-3 w-1/2" />
      </div>
    );
  }

  return (
    <Link
      href={`/album/${album.id}`}
      className="sp-card sp-fade-in group relative block w-full p-4"
    >
      <div className="relative">
        <Cover album={album} className="w-full shadow-lg" />
        <button
          aria-label={`Play ${album.shortTitle}`}
          onClick={(e) => {
            e.preventDefault();
            play(album.id);
          }}
          className="sp-card-play sp-pill absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center bg-sp-green text-black shadow-xl hover:bg-sp-green-hover hover:scale-105"
        >
          <PlayIcon size={22} />
        </button>
      </div>
      <p className="mt-3 truncate text-sm font-bold text-white">{album.shortTitle}</p>
      <p className="mt-1 truncate text-sm text-sp-muted">{album.subtitle}</p>
    </Link>
  );
}
