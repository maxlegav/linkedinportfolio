"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { hackathonsAndSaas, madeByMax, me, professionalExperience } from "@/lib/spotify";
import { AlbumCard } from "@/components/spotify/AlbumCard";
import { Carousel } from "@/components/spotify/Carousel";
import { useLang, type Dict } from "@/components/spotify/LanguageContext";

function greeting(hour: number, t: Dict): string {
  if (hour < 12) return t.goodMorning;
  if (hour < 18) return t.goodAfternoon;
  return t.goodEvening;
}

const subscribeNoop = () => () => {};

export default function HomePage() {
  const hour = useSyncExternalStore(subscribeNoop, () => new Date().getHours(), () => 12);
  const { t } = useLang();

  return (
    <div className="bg-gradient-to-b from-[#1f1f1f] to-sp-bg px-4 pb-12 pt-4 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">{greeting(hour, t)}</h1>

      {/* Featured artist */}
      <section className="mt-6" data-tour="featured">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">{t.featuredArtist}</h2>
        <div className="flex flex-col items-center gap-6 rounded-lg bg-gradient-to-r from-[#1e3a2f] to-sp-surface p-6 md:flex-row md:p-8">
          <img
            src={me.avatarUrl}
            alt={me.name}
            className="h-36 w-36 rounded-full bg-sp-surface-alt object-cover shadow-2xl md:h-44 md:w-44"
          />
          <div className="min-w-0 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-sp-muted">{t.artist}</p>
            <h3 className="mt-1 text-3xl font-black text-white md:text-4xl">{me.name}</h3>
            <p className="mt-2 text-sm text-sp-muted">{me.headline}</p>
            <Link
              href="/artist"
              className="sp-pill mt-4 inline-block bg-sp-green px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
            >
              {t.visitProfile}
            </Link>
          </div>
        </div>
      </section>

      <div data-tour="carousels">
        <Carousel title="Hackathons & SaaS founded">
          {hackathonsAndSaas.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Carousel>
      </div>

      <Carousel title="Professional Experience">
        {professionalExperience.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Carousel>

      <Carousel title="Made by Max">
        {madeByMax.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Carousel>

      {/* Wrapped mini-game */}
      <section className="mt-8" data-tour="wrapped">
        <Link
          href="/wrapped"
          className="sp-rise group relative block overflow-hidden rounded-lg p-6 md:p-8"
          style={{ background: "linear-gradient(120deg, #1db954 0%, #1e3264 55%, #a72879 100%)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">{t.wrappedKicker}</p>
          <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">{t.wrappedBannerTitle}</h2>
          <p className="mt-2 max-w-xl text-sm text-white/80">{t.wrappedBannerText}</p>
          <span className="sp-pill mt-4 inline-block bg-white px-5 py-2 text-sm font-bold text-black transition-transform group-hover:scale-105">
            {t.wrappedBannerCta}
          </span>
        </Link>
      </section>
    </div>
  );
}
