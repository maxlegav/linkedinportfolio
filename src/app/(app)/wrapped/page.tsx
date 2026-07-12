"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { me } from "@/lib/spotify";
import { useLang } from "@/components/spotify/LanguageContext";

const W = 720;
const H = 240;
const GROUND = H - 30;
const GRAVITY = 0.62;
const JUMP_V = -11.5;
const BEST_KEY = "wrapped-dino-best";

type Obstacle = { x: number; w: number; h: number };
type LeaderboardEntry = { name: string; score: number; date: number };

export default function WrappedPage() {
  const { t } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [name, setName] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setBest(Number(localStorage.getItem(BEST_KEY) ?? 0)), 0);
    return () => clearTimeout(timer);
  }, []);

  const loadLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { entries: LeaderboardEntry[] };
      setEntries(data.entries);
    } catch {
      // leaderboard is best-effort
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void loadLeaderboard(), 0);
    return () => clearTimeout(timer);
  }, [loadLeaderboard]);

  const submitScore = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed || submitState === "sending") return;
    setSubmitState("sending");
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, score }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = (await res.json()) as { entries: LeaderboardEntry[] };
      setEntries(data.entries);
      setSubmitState("done");
    } catch {
      setSubmitState("error");
    }
  }, [name, score, submitState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const s = {
      y: GROUND,
      vy: 0,
      obstacles: [] as Obstacle[],
      speed: 6.5,
      score: 0,
      spawnIn: 50,
    };
    let raf = 0;
    let alive = status === "running";

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 20);
      ctx.lineTo(W, GROUND + 20);
      ctx.stroke();

      ctx.font = "28px serif";
      ctx.textBaseline = "bottom";
      ctx.save();
      ctx.translate(60, s.y + 20);
      ctx.scale(-1, 1);
      ctx.fillText("🦖", -28, 0);
      ctx.restore();

      for (const o of s.obstacles) {
        ctx.font = `${o.h}px serif`;
        ctx.fillText("🐛", o.x, GROUND + 20);
      }

      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px monospace";
      ctx.fillText(String(Math.floor(s.score)).padStart(5, "0"), W - 80, 28);
    };

    const gameOver = () => {
      alive = false;
      const finalScore = Math.floor(s.score);
      const stored = Number(localStorage.getItem(BEST_KEY) ?? 0);
      const nb = Math.max(stored, finalScore);
      localStorage.setItem(BEST_KEY, String(nb));
      setBest(nb);
      setScore(finalScore);
      setSubmitState("idle");
      setStatus("over");
    };

    const tick = () => {
      if (!alive) return;

      s.vy += GRAVITY;
      s.y = Math.min(GROUND, s.y + s.vy);
      if (s.y === GROUND) s.vy = 0;

      s.spawnIn -= 1;
      if (s.spawnIn <= 0) {
        s.obstacles.push({ x: W + 20, w: 24, h: 24 + Math.random() * 12 });
        if (Math.random() < 0.3) {
          s.obstacles.push({ x: W + 52, w: 24, h: 22 + Math.random() * 10 });
        }
        s.spawnIn = 38 + Math.random() * 52;
      }
      const next: Obstacle[] = [];
      for (const o of s.obstacles) {
        const moved = { ...o, x: o.x - s.speed };
        if (moved.x > -40) next.push(moved);
      }
      s.obstacles = next;

      s.score += 0.15;
      s.speed = 6.5 + Math.floor(s.score / 60) * 0.7;

      const dinoBottom = s.y + 20;
      for (const o of s.obstacles) {
        const overlapX = o.x < 58 && o.x + o.w > 38;
        const overlapY = dinoBottom > GROUND + 20 - o.h;
        if (overlapX && overlapY) {
          draw();
          gameOver();
          return;
        }
      }

      setScore(Math.floor(s.score));
      draw();
      raf = requestAnimationFrame(tick);
    };

    const jump = () => {
      if (alive && s.y >= GROUND) s.vy = JUMP_V;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (e.target instanceof HTMLInputElement) return;
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", jump);

    draw();
    if (alive) raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", jump);
    };
  }, [status]);

  return (
    <div className="sp-wrapped-bg min-h-[calc(100vh-64px)] px-4 pb-16 pt-8 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">Portfolio Wrapped 2025</p>
        <h1 className="sp-rise mt-2 text-4xl font-black tracking-tight text-white md:text-6xl">
          {t.wrappedTitle1}
          <br />
          {t.wrappedTitle2}
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">
          {t.wrappedSubtitle} <span className="font-bold text-white">Space</span> {t.wrappedSubtitleEnd}
        </p>

        <div className="sp-rise relative mx-auto mt-8 w-full max-w-[720px]">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full cursor-pointer rounded-lg bg-black/60 shadow-2xl backdrop-blur"
            aria-label="Dino runner mini-game"
          />
          {status !== "running" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-black/70 p-4">
              {status === "over" && (
                <>
                  <p className="text-2xl font-black text-white">{t.gameOver}</p>
                  <p className="text-sm text-white/80">
                    {t.score} {score} · {t.best} {best}
                  </p>
                  <p className="mt-1 max-w-sm text-sm font-semibold text-white">{t.congrats}</p>
                  <a
                    href={me.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sp-pill bg-[#0a66c2] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
                  >
                    {t.shareOnLinkedin}
                  </a>
                  {submitState !== "done" ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void submitScore();
                      }}
                      className="mt-1 flex w-full max-w-xs items-center gap-2"
                    >
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.yourName}
                        maxLength={24}
                        className="sp-pill w-full bg-white px-4 py-2 text-sm font-medium text-black outline-none placeholder:text-neutral-500"
                      />
                      <button
                        type="submit"
                        disabled={!name.trim() || submitState === "sending"}
                        className="sp-pill shrink-0 bg-white px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105 disabled:opacity-50"
                      >
                        {submitState === "sending" ? t.submitting : t.submitScore}
                      </button>
                    </form>
                  ) : (
                    <p className="text-sm font-semibold text-sp-green">✓ {t.leaderboard}</p>
                  )}
                  {submitState === "error" && (
                    <p className="text-xs font-semibold text-red-400">{t.submitError}</p>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  setScore(0);
                  setStatus("running");
                }}
                className="sp-pill mt-2 bg-sp-green px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
              >
                {status === "over" ? t.playAgain : t.startRun}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm font-semibold text-white/90">
          <span>
            {t.score}: {score}
          </span>
          <span>
            {t.best}: {best}
          </span>
        </div>

        <section className="sp-rise mx-auto mt-8 max-w-md rounded-lg bg-black/50 p-5 text-left backdrop-blur">
          <h2 className="text-center text-lg font-black text-white">🏆 {t.leaderboard}</h2>
          {entries.length === 0 ? (
            <p className="mt-3 text-center text-sm text-white/70">{t.leaderboardEmpty}</p>
          ) : (
            <ol className="mt-3 space-y-1">
              {entries.map((entry, i) => (
                <li
                  key={`${entry.name}-${entry.date}`}
                  className="flex items-center justify-between rounded px-3 py-1.5 text-sm text-white odd:bg-white/5"
                >
                  <span className="min-w-0 truncate font-semibold">
                    <span className="mr-2 inline-block w-5 text-white/60">{i + 1}.</span>
                    {entry.name}
                  </span>
                  <span className="ml-3 shrink-0 font-black text-sp-green">{entry.score}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <Link
          href="/"
          className="sp-pill mt-8 inline-block border border-white/40 px-6 py-2 text-sm font-bold text-white hover:border-white"
        >
          {t.backToPortfolio}
        </Link>
      </div>
    </div>
  );
}
