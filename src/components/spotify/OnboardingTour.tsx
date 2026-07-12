"use client";

import { useEffect, useState } from "react";

type Step = {
  /** CSS selector of the element to highlight; centered welcome card when omitted */
  selector?: string;
  title: string;
  text: string;
};

const STEPS: Step[] = [
  {
    title: "Welcome to Max's Portfolio 🎧",
    text: "This portfolio works like a music app: every project is an album, tags are the tracks, and likes are the streams. Here's a quick tour.",
  },
  {
    selector: '[data-tour="sidebar"]',
    title: "Your Library",
    text: "Browse every project from the sidebar: Hackathons & SaaS founded, Professional Experience, and Made by Max.",
  },
  {
    selector: '[data-tour="featured"]',
    title: "Featured Artist",
    text: "That's Max! Visit the artist page for the About section, highlights, and the full discography.",
  },
  {
    selector: '[data-tour="carousels"]',
    title: "Projects as albums",
    text: "Scroll the carousels and click any cover to open the project page with all the details and links.",
  },
  {
    selector: '[data-tour="player"]',
    title: "Now playing",
    text: "The player bar always shows the selected project. Press play to launch a demo video when one is available.",
  },
  {
    selector: '[data-tour="wrapped"]',
    title: "Portfolio Wrapped 🦖",
    text: "Bonus: a Wrapped-style dino mini-game. Jump over the bugs and beat your high score!",
  },
];

const STORAGE_KEY = "portfolio-tour-done";

export function OnboardingTour() {
  const [step, setStep] = useState(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setStep(0), 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (step < 0 || step >= STEPS.length) return;
    const sel = STEPS[step].selector;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const measure = () => {
      if (!sel) {
        setRect(null);
        return;
      }
      const el = document.querySelector(sel);
      if (!el) {
        setRect(null);
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setRect(el.getBoundingClientRect());
      timer = setTimeout(() => setRect(el.getBoundingClientRect()), 450);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", schedule);
    };
  }, [step]);

  if (step < 0 || step >= STEPS.length) return null;

  const finish = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setStep(STEPS.length);
  };
  const nextStep = () => (step === STEPS.length - 1 ? finish() : setStep(step + 1));

  const current = STEPS[step];
  const highlighted = current.selector && rect;

  const tooltipStyle: React.CSSProperties = highlighted
    ? rect.top > window.innerHeight / 2
      ? { left: Math.min(Math.max(rect.left, 16), window.innerWidth - 336), bottom: window.innerHeight - rect.top + 16 }
      : { left: Math.min(Math.max(rect.left, 16), window.innerWidth - 336), top: rect.bottom + 16 }
    : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-label="Portfolio tour">
      {highlighted ? (
        <div
          className="sp-spotlight pointer-events-none fixed rounded-lg"
          style={{ left: rect.left - 6, top: rect.top - 6, width: rect.width + 12, height: rect.height + 12 }}
        />
      ) : (
        <div className="fixed inset-0 bg-black/75" />
      )}
      <div
        className="sp-rise fixed w-80 rounded-lg bg-sp-surface-alt p-5 shadow-2xl"
        style={tooltipStyle}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-sp-green">
          {step + 1} / {STEPS.length}
        </p>
        <h3 className="mt-1 text-lg font-black text-white">{current.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-sp-muted">{current.text}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={finish} className="text-sm font-semibold text-sp-muted hover:text-white">
            Skip
          </button>
          <button
            onClick={nextStep}
            className="sp-pill bg-sp-green px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
          >
            {step === STEPS.length - 1 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
