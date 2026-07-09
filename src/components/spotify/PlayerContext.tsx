"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { albums, type Album } from "@/lib/spotify";

type PlayerState = {
  current: Album;
  isPlaying: boolean;
  liked: Set<string>;
  play: (id?: string) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  toggleLike: (id: string) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const play = useCallback((id?: string) => {
    if (id) {
      const i = albums.findIndex((a) => a.id === id);
      if (i >= 0) setIndex(i);
    }
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % albums.length);
    setIsPlaying(true);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + albums.length) % albums.length);
    setIsPlaying(true);
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }, []);

  const value = useMemo(
    () => ({ current: albums[index], isPlaying, liked, play, togglePlay, next, prev, toggleLike }),
    [index, isPlaying, liked, play, togglePlay, next, prev, toggleLike]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
