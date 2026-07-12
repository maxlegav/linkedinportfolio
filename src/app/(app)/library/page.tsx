"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { albums, CATEGORY_DEFS, type AlbumGroup } from "@/lib/spotify";
import { Cover } from "@/components/spotify/Cover";
import { PlayIcon } from "@/components/spotify/icons";
import { usePlayer } from "@/components/spotify/PlayerContext";

type TypeFilter = "All" | AlbumGroup;
type Sort = "Recents" | "Recently added" | "Alphabetical";

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Hackathons & SaaS founded", label: "Hackathons & SaaS founded" },
  { id: "Professional Experience", label: "Professional Experience" },
  { id: "Made by Max", label: "Made by Max" },
];

const SORTS: Sort[] = ["Recents", "Recently added", "Alphabetical"];

function LibraryContent() {
  const { play, select, current, isPlaying } = usePlayer();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [sort, setSort] = useState<Sort>("Recents");

  const categoryDef = CATEGORY_DEFS.find((c) => c.id === category);

  const items = useMemo(() => {
    let list = albums;
    if (categoryDef) list = list.filter((a) => a.categories.includes(categoryDef.id));
    if (typeFilter !== "All") list = list.filter((a) => a.group === typeFilter);
    if (sort === "Alphabetical") {
      list = [...list].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
    } else if (sort === "Recently added") {
      list = [...list].sort((a, b) => Number(b.year) - Number(a.year));
    }
    return list;
  }, [categoryDef, typeFilter, sort]);

  return (
    <div className="px-4 pb-12 pt-4 md:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {categoryDef ? `${categoryDef.emoji} ${categoryDef.label}` : "Your Library"}
      </h1>
      {categoryDef && (
        <Link href="/library" className="mt-1 inline-block text-sm text-sp-muted hover:text-white">
          Clear category filter
        </Link>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setTypeFilter(f.id)}
            className={`sp-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
              typeFilter === f.id ? "bg-white text-black" : "bg-sp-surface-alt text-white hover:bg-[#3e3e3e]"
            }`}
          >
            {f.label}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          aria-label="Sort"
          className="ml-auto rounded bg-sp-surface-alt px-3 py-1.5 text-sm font-semibold text-white outline-none"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((album) => {
          const playing = current.id === album.id && isPlaying;
          return (
            <Link
              key={album.id}
              href={`/album/${album.id}`}
              onClick={() => select(album.id)}
              className="sp-rise group flex items-center gap-4 rounded-lg bg-sp-surface p-3 transition-colors hover:bg-sp-surface-alt"
            >
              <Cover album={album} className="h-20 w-20 shrink-0 md:h-24 md:w-24" rounded="rounded" />
              <div className="min-w-0 flex-1">
                <p className={`text-lg font-black leading-tight md:text-xl ${playing ? "text-sp-green" : "text-white"}`}>
                  {album.shortTitle}
                </p>
                <p className="mt-1 truncate text-sm text-sp-muted">
                  {album.group} · {album.year}
                </p>
              </div>
              <button
                aria-label={`Play ${album.shortTitle}`}
                onClick={(e) => {
                  e.preventDefault();
                  play(album.id);
                }}
                className="sp-pill hidden h-11 w-11 items-center justify-center bg-sp-green text-black opacity-0 transition-opacity group-hover:opacity-100 md:flex"
              >
                <PlayIcon size={18} />
              </button>
            </Link>
          );
        })}
        {items.length === 0 && (
          <p className="mt-6 text-sm text-sp-muted">Nothing here yet - try another filter.</p>
        )}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryContent />
    </Suspense>
  );
}
