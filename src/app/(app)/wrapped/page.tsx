"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const W = 720;
const H = 240;
const GROUND = H - 30;
const GRAVITY = 0.55;
const JUMP_V = -11.5;
const BEST_KEY = "wrapped-dino-best";

type Obstacle = { x: number; w: number; h: number };

export default function WrappedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBest(Number(localStorage.getItem(BEST_KEY) ?? 0)), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const s = {
      y: GROUND,
      vy: 0,
      obstacles: [] as Obstacle[],
      speed: 5,
      score: 0,
      spawnIn: 60,
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
      setStatus("over");
    };

    const tick = () => {
      if (!alive) return;

      s.vy += GRAVITY;
      s.y = Math.min(GROUND, s.y + s.vy);
      if (s.y === GROUND) s.vy = 0;

      s.spawnIn -= 1;
      if (s.spawnIn <= 0) {
        s.obstacles.push({ x: W + 20, w: 24, h: 22 + Math.random() * 10 });
        s.spawnIn = 55 + Math.random() * 70;
      }
      for (const o of s.obstacles) o.x -= s.speed;
      s.obstacles = s.obstacles.filter((o) => o.x > -40);

      s.score += 0.15;
      s.speed = 5 + Math.floor(s.score / 100) * 0.6;

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
          Max shipped all year.
          <br />
          Now it&apos;s your turn to run.
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">
          11 projects · 2 hackathons · 1 SaaS exited - dodge the bugs like Max did. Press{" "}
          <span className="font-bold text-white">Space</span> / tap to jump.
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
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/60">
              {status === "over" && (
                <>
                  <p className="text-2xl font-black text-white">Game over!</p>
                  <p className="mt-1 text-sm text-white/80">
                    Score {score} · Best {best}
                  </p>
                </>
              )}
              <button
                onClick={() => {
                  setScore(0);
                  setStatus("running");
                }}
                className="sp-pill mt-4 bg-sp-green px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
              >
                {status === "over" ? "Play again" : "Start the run"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm font-semibold text-white/90">
          <span>Score: {score}</span>
          <span>Best: {best}</span>
        </div>

        <Link
          href="/"
          className="sp-pill mt-8 inline-block border border-white/40 px-6 py-2 text-sm font-bold text-white hover:border-white"
        >
          Back to the portfolio
        </Link>
      </div>
    </div>
  );
}
