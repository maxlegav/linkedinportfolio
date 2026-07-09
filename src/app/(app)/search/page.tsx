"use client";

import Link from "next/link";
import { albums, CATEGORY_DEFS } from "@/lib/spotify";
import { AlbumCard } from "@/components/spotify/AlbumCard";
import { useSearch } from "@/components/spotify/SearchContext";

export default function SearchPage() {
  const { query } = useSearch();

  const q = query.trim().toLowerCase();
  const results = q
    ? albums.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.post.description.toLowerCase().includes(q) ||
          a.post.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  return (
    <div className="px-4 pb-12 pt-4 md:px-8">
      {q ? (
        <>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {results.length > 0 ? `Results for “${query}”` : `No results for “${query}”`}
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold tracking-tight text-white">Browse all</h1>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORY_DEFS.map((cat) => (
              <Link
                key={cat.id}
                href={`/library?category=${cat.id}`}
                className="relative aspect-[2/1] overflow-hidden rounded-lg p-4 transition-transform hover:scale-[1.02]"
                style={{ background: cat.color }}
              >
                <p className="text-lg font-black text-white md:text-xl">{cat.label}</p>
                <span className="absolute -bottom-2 -right-2 rotate-[25deg] text-5xl md:text-6xl">
                  {cat.emoji}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
