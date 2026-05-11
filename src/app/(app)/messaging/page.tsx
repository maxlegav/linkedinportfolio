"use client";

import Image from "next/image";
import { useState } from "react";
import { ProfileAvatar } from "@/components/feed/ProfileAvatar";
import type { MessagingContact } from "@/data/portfolio";
import { messagingContacts, me } from "@/data/portfolio";
import Link from "next/link";

function Avatar({ c, size = 48 }: { c: MessagingContact; size?: number }) {
  if (c.avatarUrl) {
    return (
      <Image
        src={c.avatarUrl}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
        unoptimized
      />
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-[#dce6f1] text-sm font-semibold text-[var(--li-blue-hover)]"
      style={{ width: size, height: size }}
    >
      {c.avatarLetter}
    </div>
  );
}

function ConversationRow({ c, active, onClick }: { c: MessagingContact; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full gap-3 border-b border-[var(--li-border)] px-4 py-3 text-left transition hover:bg-black/[0.04] ${c.unread ? "bg-[#ecf4fd]" : ""} ${active ? "bg-[var(--li-blue)]/5 border-l-2 border-l-[var(--li-blue)]" : ""}`}
      >
        <div className="shrink-0">
          <Avatar c={c} size={48} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold text-[var(--li-text)]">{c.name}</span>
            <span className="shrink-0 text-[11px] text-[var(--li-text-faint)]">{c.timeLabel}</span>
          </div>
          <p className="truncate text-xs text-[var(--li-text-muted)]">{c.relation}</p>
          <p className="mt-0.5 truncate text-xs text-[var(--li-text)]">{c.lastMessage}</p>
        </div>
        {c.unread && (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--li-blue)]" aria-label="Unread" />
        )}
      </button>
    </li>
  );
}

export default function MessagingPage() {
  const [selected, setSelected] = useState<MessagingContact>(messagingContacts[0]);

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col overflow-hidden rounded-lg border border-[var(--li-border)] bg-[var(--li-bg-card)] shadow-sm lg:min-h-[560px] lg:flex-row lg:rounded-lg">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-b border-[var(--li-border)] lg:w-[328px] lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-[var(--li-text)]">Messaging</h1>
          <Link href="/" className="text-sm font-semibold text-[var(--li-blue)] hover:underline">Feed</Link>
        </div>
        <ul className="max-h-[50vh] flex-1 overflow-y-auto lg:max-h-none">
          {messagingContacts.map((c) => (
            <ConversationRow
              key={c.id}
              c={c}
              active={selected.id === c.id}
              onClick={() => setSelected(c)}
            />
          ))}
        </ul>
      </aside>

      {/* Conversation panel */}
      <section className="flex min-w-0 flex-1 flex-col bg-[var(--li-bg-card)]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--li-border)] px-4 py-3">
          <Avatar c={selected} size={40} />
          <div>
            <p className="text-sm font-semibold text-[var(--li-text)]">{selected.name}</p>
            <p className="text-xs text-[var(--li-text-muted)]">{selected.relation}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col justify-end gap-3 bg-[#f9fafb] p-4">
          {/* Their message (recommendation) */}
          <div className="flex items-end gap-2">
            <div className="shrink-0">
              <Avatar c={selected} size={32} />
            </div>
            <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.06]">
              <p className="text-[13px] leading-relaxed text-[var(--li-text)]">{selected.lastMessage}</p>
              <p className="mt-1 text-[10px] text-[var(--li-text-faint)]">{selected.timeLabel}</p>
            </div>
          </div>

          {/* Max's reply */}
          <div className="flex items-end justify-end gap-2">
            <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-[var(--li-blue)] px-4 py-3">
              <p className="text-[13px] leading-relaxed text-white">Thank you so much, it was a pleasure working together!</p>
              <p className="mt-1 text-[10px] text-white/60">Just now</p>
            </div>
            <ProfileAvatar src={me.avatarUrl} size={32} unoptimized />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[var(--li-border)] px-4 py-3">
          <a
            href={`mailto:${me.email}?subject=Message from ${encodeURIComponent(selected.name)}`}
            className="flex w-full items-center gap-3 rounded-full border border-black/[0.15] bg-white px-4 py-2.5 text-sm text-[rgba(0,0,0,0.45)] transition hover:border-[var(--li-blue)] hover:bg-[var(--li-blue)]/5"
          >
            <svg className="h-4 w-4 text-[var(--li-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Reply via email...
          </a>
        </div>
      </section>
    </div>
  );
}
