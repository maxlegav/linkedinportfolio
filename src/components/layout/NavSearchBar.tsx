"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { projectPosts } from "@/data/portfolio";

export function NavSearchBar() {
  const [query, setQuery]       = useState("");
  const [open, setOpen]         = useState(false);
  const router                  = useRouter();
  const ref                     = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 1
    ? projectPosts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function goToPost(id: string) {
    setQuery("");
    setOpen(false);
    // Navigate to home then scroll
    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(`post-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      document.getElementById(`post-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div ref={ref} className="relative w-full">
      <span className="pointer-events-none absolute left-2 top-1/2 z-[1] -translate-y-1/2 text-[var(--li-text-faint)]">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search posts..."
        className="h-[34px] w-full rounded border-0 bg-[var(--li-search-bg)] py-2 pl-8 pr-2 text-[14px] text-[var(--li-text)] placeholder:text-[rgba(0,0,0,0.55)] outline-none ring-1 ring-transparent focus:ring-[var(--li-blue)]"
        aria-label="Search posts"
        aria-autocomplete="list"
      />
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-[38px] z-[100] overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl">
          {results.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goToPost(p.id)}
              className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-[var(--li-blue)]/5 transition-colors"
            >
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--li-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-[var(--li-text)]">{p.title}</p>
                <p className="truncate text-[11px] text-[var(--li-text-muted)]">{p.createdAt}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.trim().length > 1 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-[38px] z-[100] rounded-lg border border-black/[0.08] bg-white px-4 py-3 shadow-xl">
          <p className="text-[13px] text-[var(--li-text-muted)]">No posts found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
