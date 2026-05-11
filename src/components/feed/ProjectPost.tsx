"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { randomImage, type ProjectPost as ProjectPostType } from "@/data/portfolio";
import { ProfileAvatar } from "./ProfileAvatar";

// ── Copy-then-open link ────────────────────────────────────────────────────
function CopyLink({ href, label, copyText }: { href: string; label: string; copyText: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(copyText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    window.open(href, "_blank");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex items-center gap-1.5 rounded-full border border-[var(--li-blue)] bg-[var(--li-blue)]/5 px-3 py-1 text-[13px] font-semibold text-[var(--li-blue)] transition-all hover:bg-[var(--li-blue)] hover:text-white active:scale-95"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Password copied! Opening...
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

// ── Confetti particle ──────────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = ["🎉", "👍", "💙", "⭐", "✨", "🚀", "💡", "🔥"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-lg"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: "50%",
            animation: `confetti-${(i % 4) + 1} 0.8s ease-out forwards`,
            animationDelay: `${i * 0.04}s`,
            opacity: 0,
          }}
        >
          {particles[i % particles.length]}
        </span>
      ))}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────
function LikeIcon({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg className="h-5 w-5" fill="#0a66c2" viewBox="0 0 24 24" aria-hidden>
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3v11z" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
function RepostIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

// ── Action button ──────────────────────────────────────────────────────────
function ActionBtn({
  icon, label, active, onClick, activeColor = "text-[var(--li-blue)]",
}: {
  icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; activeColor?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-1 items-center justify-center gap-1.5 rounded-sm py-[10px] text-[13px] font-semibold transition-all duration-150 hover:bg-black/[0.04] active:scale-95 ${active ? activeColor : "text-[rgba(0,0,0,0.54)]"}`}
    >
      <span className={`transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ── Comment box ────────────────────────────────────────────────────────────
function CommentBox() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);
  function submit() {
    if (!text.trim()) return;
    setSubmitted((p) => [...p, text.trim()]);
    setText("");
  }
  return (
    <div className="animate-slide-down border-t border-black/[0.08] px-4 py-3">
      {submitted.map((c, i) => (
        <div key={i} className="mb-2 flex gap-2 text-[13px]">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-[11px] font-bold text-gray-600">G</span>
          <div className="rounded-xl bg-[#f3f2ef] px-3 py-2 text-[var(--li-text)]">
            <span className="block text-[11px] font-semibold text-[var(--li-text-muted)]">Guest</span>
            {c}
          </div>
        </div>
      ))}
      <div className="flex gap-2">
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-[11px] font-bold text-gray-600">G</span>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-black/[0.18] bg-white px-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Add a comment as Guest..."
            className="flex-1 bg-transparent py-2 text-[13px] text-[var(--li-text)] outline-none placeholder:text-[rgba(0,0,0,0.45)]"
          />
          <button type="button" onClick={submit} disabled={!text.trim()}
            className="shrink-0 rounded-full p-1 text-[var(--li-blue)] transition hover:bg-[var(--li-blue)]/10 disabled:opacity-30">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function ProjectPost({ post, index, total }: { post: ProjectPostType; index: number; total: number }) {
  const coverImage = post.imageUrl ?? randomImage(`project-${post.id}`, 1200, 800);
  const firstLink  = post.links[0]?.url;
  const initial    = post.author.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const containPadding = post.imagePadding === "tight" ? "p-2 sm:p-3" : "p-6";

  const [liked, setLiked]             = useState(false);
  const [likeCount, setLikeCount]     = useState(post.likeCount ?? 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reposted, setReposted]       = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [expanded, setExpanded]       = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLike() {
    const next = !liked;
    setLiked(next);
    setLikeCount((n) => (next ? n + 1 : n - 1));
    if (next) {
      setShowConfetti(true);
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 900);
    }
  }

  return (
    <article
      id={`post-${post.id}`}
      className="li-card animate-fade-in-up mb-3 overflow-hidden text-left shadow-[0px_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
    >
      {/* Header */}
      <div className="flex gap-3 border-b border-black/[0.08] px-4 py-3">
        <ProfileAvatar
          src={post.author.avatarUrl}
          initials={initial}
          size={48}
          className="ring-2 ring-[var(--li-blue)]/20"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <span className="cursor-pointer text-[14px] font-semibold leading-[1.333] hover:text-[var(--li-blue)] hover:underline">{post.author.name}</span>
          <p className="line-clamp-1 text-[12px] leading-tight text-[var(--li-text-muted)]">{post.author.headline}</p>
          <span className="text-[12px] text-[var(--li-text-faint)]">{post.createdAt}</span>
        </div>
        <span className="ml-auto shrink-0 self-start rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] font-semibold text-[var(--li-text-faint)]">
          {index + 1}/{total}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pb-2 pt-3">
        <h2 className="text-[15px] font-semibold leading-snug text-[var(--li-text)]">{post.title}</h2>
        <div className="relative mt-2">
          <p className={`text-[13px] leading-[1.5] text-[var(--li-text-muted)] ${expanded ? "" : "line-clamp-3"}`}>
            {post.description}
          </p>
          {!expanded ? (
            <button type="button" onClick={() => setExpanded(true)}
              className="mt-0.5 text-[13px] font-semibold text-[var(--li-text)] hover:text-[var(--li-blue)]">
              ...see more
            </button>
          ) : (
            <button type="button" onClick={() => setExpanded(false)}
              className="mt-0.5 block text-[13px] font-semibold text-[var(--li-text)] hover:text-[var(--li-blue)]">
              see less
            </button>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-[var(--li-blue)]/10 px-2.5 py-[3px] text-[11px] font-semibold text-[var(--li-blue)] transition-colors hover:bg-[var(--li-blue)]/20">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover image — clickable, opens first link */}
      <div
        className={`relative w-full overflow-hidden ${post.imageFit === "contain" ? "aspect-[16/9] bg-white" : "aspect-[16/9] bg-black/[0.06]"} ${firstLink ? "cursor-pointer" : ""}`}
        onClick={() => firstLink && window.open(firstLink, "_blank")}
        role={firstLink ? "link" : undefined}
        aria-label={firstLink ? `Open ${post.title}` : undefined}
      >
        <Image
          src={coverImage}
          alt={post.title}
          fill
          className={`transition-transform duration-500 hover:scale-[1.02] ${post.imageFit === "contain" ? `object-contain ${containPadding}` : "object-cover"}`}
          sizes="(max-width: 768px) 100vw, 555px"
          unoptimized={coverImage.startsWith("/")}
        />
        {firstLink && (
          <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/20 to-transparent p-3 opacity-0 transition-opacity hover:opacity-100">
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-[var(--li-text)] shadow">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open link
            </span>
          </div>
        )}
      </div>

      {/* Links */}
      {post.links.length > 0 && (
        <div className="flex flex-wrap gap-3 border-t border-black/[0.08] px-4 py-2">
          {post.links.map((l) => {
            if (l.copyText) {
              return (
                <CopyLink key={l.url} href={l.url} label={l.label} copyText={l.copyText} />
              );
            }
            return (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[13px] font-semibold text-[var(--li-blue)] hover:text-[var(--li-blue-hover)] hover:underline">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {l.label}
              </a>
            );
          })}
        </div>
      )}

      {/* Like count bar */}
      {likeCount > 0 && (
        <div className="flex items-center gap-1 border-t border-black/[0.06] px-4 py-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--li-blue)] text-white">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
            </svg>
          </span>
          <span className="text-[12px] text-[var(--li-text-faint)]">{likeCount}</span>
        </div>
      )}

      {/* Action bar with confetti */}
      <div className="relative">
        <Confetti active={showConfetti} />
        <footer className="flex border-t border-black/[0.08] px-1 py-px">
          <ActionBtn icon={<LikeIcon filled={liked} />} label="Like" active={liked} onClick={handleLike} />
          <ActionBtn icon={<CommentIcon />} label="Comment" active={showComment} onClick={() => setShowComment((v) => !v)} />
          <ActionBtn icon={<RepostIcon />} label="Repost" active={reposted} activeColor="text-emerald-600" onClick={() => setReposted((v) => !v)} />
          <ActionBtn icon={<SendIcon />} label="Send"
            onClick={() => window.open(`mailto:${post.author.email}?subject=Re: ${encodeURIComponent(post.title)}`, "_blank")} />
        </footer>
      </div>

      {showComment && <CommentBox />}
    </article>
  );
}
