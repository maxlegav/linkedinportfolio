"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  albums,
  certifications,
  education,
  me,
  popularAlbums,
  skills,
  type AlbumType,
} from "@/lib/spotify";
import { AlbumCard } from "@/components/spotify/AlbumCard";
import { Cover } from "@/components/spotify/Cover";
import {
  DotsIcon,
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  PlayIcon,
  VerifiedIcon,
} from "@/components/spotify/icons";
import { usePlayer } from "@/components/spotify/PlayerContext";

const TABS: AlbumType[] = ["Album", "Single", "Compilation"];
const TAB_LABELS: Record<AlbumType, string> = {
  Album: "Albums",
  Single: "Singles & EPs",
  Compilation: "Compilations",
};

const HIGHLIGHTS = [
  { emoji: "🛡️", label: "50+ penetration tests" },
  { emoji: "💰", label: "€10k SaaS exit" },
  { emoji: "🌍", label: "4 languages" },
  { emoji: "🎓", label: "ECE Paris + Ajou University Seoul" },
];

export default function ArtistPage() {
  const { play, current, isPlaying } = usePlayer();
  const [tab, setTab] = useState<AlbumType>("Album");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="pb-12">
      {/* Header */}
      <header
        className="relative flex min-h-[40vh] items-end px-4 pb-6 pt-16 md:px-8"
        style={{
          background: "linear-gradient(180deg, #274d3d 0%, #16281f 70%, #121212 100%)",
        }}
      >
        <img
          src={me.avatarUrl}
          alt={me.name}
          className="pointer-events-none absolute bottom-0 right-4 h-[38vh] max-h-80 object-contain opacity-90 md:right-16"
        />
        <div className="relative z-10">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <VerifiedIcon size={22} /> Verified Artist
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-white md:text-7xl">
            {me.name}
          </h1>
          <p className="mt-4 text-sm font-medium text-white/90 md:text-base">
            Engineering Student · Cybersecurity Consultant · SaaS Founder
          </p>
        </div>
      </header>

      <div className="px-4 md:px-8">
        {/* Action buttons */}
        <div className="flex items-center gap-5 py-6">
          <button
            aria-label="Play discography"
            onClick={() => play(albums[0].id)}
            className="sp-pill flex h-14 w-14 items-center justify-center bg-sp-green text-black shadow-xl transition-transform hover:scale-105 hover:bg-sp-green-hover"
          >
            <PlayIcon size={26} />
          </button>
          <a
            href={me.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="sp-pill border border-white/40 px-5 py-1.5 text-sm font-bold text-white hover:border-white"
          >
            Follow
          </a>
          <div className="relative" ref={menuRef}>
            <button
              aria-label="More options"
              onClick={() => setMenuOpen((o) => !o)}
              className="text-sp-muted hover:text-white"
            >
              <DotsIcon size={28} />
            </button>
            {menuOpen && (
              <div className="absolute left-0 top-9 z-20 w-48 rounded-md bg-sp-surface-alt p-1 shadow-2xl">
                <a href={me.cvUrl} download className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]">
                  Download CV
                </a>
                <a href={`mailto:${me.email}`} className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]">
                  Email
                </a>
                <a href={me.linkedinUrl} target="_blank" rel="noreferrer" className="block rounded px-3 py-2 text-sm text-white hover:bg-[#3e3e3e]">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Popular */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-white">Popular</h2>
          <div className="mt-3">
            {popularAlbums.map((album, i) => {
              const playing = current.id === album.id && isPlaying;
              return (
                <Link
                  key={album.id}
                  href={`/album/${album.id}`}
                  className="group flex items-center gap-4 rounded px-3 py-2 hover:bg-white/10"
                >
                  <span className="w-5 text-right text-sm tabular-nums text-sp-muted">
                    {playing ? (
                      <span className="sp-eq inline-flex items-end" aria-label="Playing">
                        <span /><span /><span />
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <Cover album={album} className="h-10 w-10 shrink-0" rounded="rounded" />
                  <span className={`min-w-0 flex-1 truncate text-sm font-semibold ${playing ? "text-sp-green" : "text-white"}`}>
                    {album.title}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-sp-muted">
                    {album.post.likeCount ?? 0} <HeartIcon size={13} filled className="text-sp-muted" />
                  </span>
                  <button
                    aria-label={`Play ${album.shortTitle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      play(album.id);
                    }}
                    className="sp-pill hidden h-8 w-8 items-center justify-center bg-sp-green text-black opacity-0 transition-opacity group-hover:opacity-100 md:flex"
                  >
                    <PlayIcon size={14} />
                  </button>
                </Link>
              );
            })}
          </div>
          <Link
            href="/library"
            className="mt-3 inline-block text-sm font-bold text-sp-muted hover:text-white"
          >
            See discography
          </Link>
        </section>

        {/* Discography */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">Discography</h2>
          <div className="mt-3 flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`sp-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
                  tab === t ? "bg-white text-black" : "bg-sp-surface-alt text-white hover:bg-[#3e3e3e]"
                }`}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {albums
              .filter((a) => a.type === tab)
              .map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
          </div>
        </section>

        {/* About */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">About</h2>
          <div className="mt-3 rounded-lg bg-sp-surface p-6 md:p-8">
            <p className="max-w-3xl leading-relaxed text-sp-muted">{me.about}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="rounded-md bg-sp-surface-alt p-4">
                  <span className="text-2xl">{h.emoji}</span>
                  <p className="mt-2 text-sm font-bold text-white">{h.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-sp-dim">Education</h3>
                {education.map((edu) => (
                  <div key={edu.id} className="mt-4 flex gap-3">
                    {edu.logoUrl && (
                      <img src={edu.logoUrl} alt={edu.school} className="h-10 w-10 rounded bg-white object-contain p-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-white">{edu.school}</p>
                      <p className="text-sm text-sp-muted">
                        {edu.degree} — {edu.field}
                      </p>
                      <p className="text-xs text-sp-dim">
                        {edu.startYear} – {edu.endYear} · {edu.location}
                        {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
                <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-sp-dim">
                  Awards & Recognition
                </h3>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mt-3 flex items-center gap-3">
                    {cert.logoUrl && (
                      <img src={cert.logoUrl} alt={cert.issuer} className="h-8 w-8 rounded bg-white object-contain p-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">{cert.name}</p>
                      <p className="text-xs text-sp-dim">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-sp-dim">Genres (skills)</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="sp-pill bg-sp-surface-alt px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-sp-dim">Languages</h3>
                <ul className="mt-3 space-y-1 text-sm text-sp-muted">
                  {me.languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fans also like → useful links */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-white">Fans also like</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "LinkedIn", href: me.linkedinUrl, sub: "Connect with Max" },
              { label: "CV Download", href: me.cvUrl, sub: "PDF resume" },
              { label: "Email", href: `mailto:${me.email}`, sub: me.email },
              { label: "Phone", href: `tel:${me.phone.replace(/\s/g, "")}`, sub: me.phone },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="sp-card flex items-center justify-between p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{link.label}</p>
                  <p className="truncate text-xs text-sp-muted">{link.sub}</p>
                </div>
                {link.label === "CV Download" ? (
                  <DownloadIcon size={18} className="shrink-0 text-sp-muted" />
                ) : (
                  <ExternalLinkIcon size={18} className="shrink-0 text-sp-muted" />
                )}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
