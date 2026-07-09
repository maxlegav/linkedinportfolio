"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export function Carousel({ title, children }: { title: string; children: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <section className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="sp-pill flex h-8 w-8 items-center justify-center bg-sp-surface-alt text-sp-muted hover:text-white"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="sp-pill flex h-8 w-8 items-center justify-center bg-sp-surface-alt text-sp-muted hover:text-white"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="grid auto-cols-[45%] grid-flow-col gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[30%] md:auto-cols-[22%] lg:auto-cols-[18%]"
      >
        {children}
      </div>
    </section>
  );
}
