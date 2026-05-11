"use client";

import { useEffect, useState } from "react";

type Props = {
  postIds: string[];
  authorEmail: string;
};

export function FeedScrollNav({ postIds, authorEmail }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showChat, setShowChat]       = useState(false);

  // Track which post is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    postIds.forEach((id, i) => {
      const el = document.getElementById(`post-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [postIds]);

  function scrollToPost(i: number) {
    const el = document.getElementById(`post-${postIds[i]}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollPrev() {
    const prev = Math.max(0, activeIndex - 1);
    scrollToPost(prev);
  }

  function scrollNext() {
    const next = Math.min(postIds.length - 1, activeIndex + 1);
    scrollToPost(next);
  }

  return (
    <>
      {/* Right-side post counter dots */}
      <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 xl:flex">
        {postIds.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToPost(i)}
            aria-label={`Go to post ${i + 1}`}
            className={`rounded-full transition-all duration-200 ${
              i === activeIndex
                ? "h-3 w-3 bg-[var(--li-blue)] shadow-md"
                : "h-2 w-2 bg-black/20 hover:bg-[var(--li-blue)]/50"
            }`}
          />
        ))}
        {/* Prev post */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          aria-label="Previous post"
          className="mt-2 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm text-[var(--li-text-muted)] hover:bg-[var(--li-blue)] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {/* Next post */}
        <button
          type="button"
          onClick={scrollNext}
          disabled={activeIndex === postIds.length - 1}
          aria-label="Next post"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm text-[var(--li-text-muted)] hover:bg-[var(--li-blue)] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Floating LinkedIn-style chat button (bottom right) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {showChat && (
          <div className="animate-pop-in mb-1 w-72 rounded-xl border border-black/[0.08] bg-white shadow-xl">
            <div className="flex items-center gap-2 rounded-t-xl bg-[var(--li-blue)] px-4 py-3">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 5H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h3v3l3.5-3H19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
              </svg>
              <span className="text-sm font-semibold text-white">Message Max</span>
              <button
                type="button"
                onClick={() => setShowChat(false)}
                className="ml-auto text-white/70 hover:text-white"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-4 text-center">
              <p className="text-[13px] text-[var(--li-text-muted)]">
                Send Max a message directly by email.
              </p>
              <a
                href={`mailto:${authorEmail}?subject=Hello Max`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--li-blue)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--li-blue-hover)]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send email
              </a>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowChat((v) => !v)}
          aria-label="Open messaging"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--li-blue)] text-white shadow-lg transition-all hover:bg-[var(--li-blue-hover)] hover:shadow-xl active:scale-95"
        >
          {showChat ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M19 5H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h3v3l3.5-3H19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
