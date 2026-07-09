"use client";

import Link from "next/link";
import { useState } from "react";
import { Cover } from "./Cover";
import { usePlayer } from "./PlayerContext";
import {
  CloseIcon,
  FullscreenIcon,
  HeartIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  QueueIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "./icons";

export function NowPlayingBar() {
  const { current, isPlaying, liked, togglePlay, next, prev, toggleLike } = usePlayer();
  const [volume, setVolume] = useState(70);
  const [videoOpen, setVideoOpen] = useState(false);

  const handlePlay = () => {
    if (!isPlaying && current.videoUrl) {
      setVideoOpen(true);
    }
    togglePlay();
  };

  return (
    <>
      {videoOpen && current.videoUrl && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{current.shortTitle}</p>
              <p className="truncate text-xs text-sp-muted">Demo video</p>
            </div>
            <button
              aria-label="Close video"
              onClick={() => setVideoOpen(false)}
              className="text-sp-muted hover:text-white"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center p-4 pb-[100px]">
            <video
              src={current.videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-full w-full max-w-5xl rounded-lg"
            />
          </div>
        </div>
      )}
    <footer className="fixed bottom-[56px] left-0 right-0 z-40 border-t border-[#282828] bg-black/90 backdrop-blur-[20px] md:bottom-0">
      {/* Desktop */}
      <div className="hidden h-[90px] items-center px-4 md:flex">
        <div className="flex w-[30%] min-w-0 items-center gap-3">
          <Link href={`/album/${current.id}`} className="shrink-0">
            <Cover album={current} className="h-14 w-14" rounded="rounded" />
          </Link>
          <div className="min-w-0">
            <Link
              href={`/album/${current.id}`}
              className="block truncate text-sm font-semibold text-white hover:underline"
            >
              {current.shortTitle}
            </Link>
            <p className="truncate text-xs text-sp-muted">{current.post.tags.slice(0, 3).join(", ")}</p>
          </div>
          <button
            aria-label="Like"
            onClick={() => toggleLike(current.id)}
            className={`ml-2 shrink-0 ${liked.has(current.id) ? "text-sp-green" : "text-sp-muted hover:text-white"}`}
          >
            <HeartIcon size={16} filled={liked.has(current.id)} />
          </button>
        </div>

        <div className="flex w-[40%] flex-col items-center gap-1.5">
          <div className="flex items-center gap-5">
            <button aria-label="Shuffle" className="text-sp-muted hover:text-white">
              <ShuffleIcon size={16} />
            </button>
            <button aria-label="Previous project" onClick={prev} className="text-sp-muted hover:text-white">
              <PrevIcon size={16} />
            </button>
            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={handlePlay}
              className="sp-pill flex h-8 w-8 items-center justify-center bg-white text-black transition-transform hover:scale-105"
            >
              {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </button>
            <button aria-label="Next project" onClick={next} className="text-sp-muted hover:text-white">
              <NextIcon size={16} />
            </button>
            <button aria-label="Repeat" className="text-sp-muted hover:text-white">
              <RepeatIcon size={16} />
            </button>
          </div>
          <div className="flex w-full max-w-md items-center gap-2 text-[10px] text-sp-muted">
            <span>0:00</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#4d4d4d]">
              <div className={`h-full rounded-full bg-white ${isPlaying ? "sp-progress-playing" : "w-1/3"}`} />
            </div>
            <span>{current.year}</span>
          </div>
        </div>

        <div className="flex w-[30%] items-center justify-end gap-3 text-sp-muted">
          <Link href="/library" aria-label="Queue" className="hover:text-white">
            <QueueIcon size={16} />
          </Link>
          <VolumeIcon size={16} />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="sp-slider w-24"
          />
          <button
            aria-label="Fullscreen"
            onClick={() => current.videoUrl && setVideoOpen(true)}
            className="hover:text-white"
          >
            <FullscreenIcon size={16} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-[60px] items-center gap-3 px-3 md:hidden">
        <Link href={`/album/${current.id}`} className="shrink-0">
          <Cover album={current} className="h-10 w-10" rounded="rounded" />
        </Link>
        <Link href={`/album/${current.id}`} className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{current.shortTitle}</p>
          <p className="truncate text-xs text-sp-muted">{current.post.tags.slice(0, 2).join(", ")}</p>
        </Link>
        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={handlePlay}
          className="sp-pill flex h-9 w-9 shrink-0 items-center justify-center bg-white text-black"
        >
          {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </button>
      </div>
    </footer>
    </>
  );
}
