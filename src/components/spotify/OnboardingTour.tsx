"use client";

import { useEffect, useState } from "react";
import { useLang, type Dict } from "./LanguageContext";

type Step = {
  /** CSS selector of the element to highlight; centered welcome card when omitted */
  selector?: string;
  titleKey: keyof Dict;
  textKey: keyof Dict;
};

const STEPS: Step[] = [
  { titleKey: "tourWelcomeTitle", textKey: "tourWelcomeText" },
  { selector: '[data-tour="sidebar"]', titleKey: "tourSidebarTitle", textKey: "tourSidebarText" },
  { selector: '[data-tour="featured"]', titleKey: "tourFeaturedTitle", textKey: "tourFeaturedText" },
  { selector: '[data-tour="carousels"]', titleKey: "tourCarouselsTitle", textKey: "tourCarouselsText" },
  { selector: '[data-tour="player"]', titleKey: "tourPlayerTitle", textKey: "tourPlayerText" },
];

const STORAGE_KEY = "portfolio-tour-done";

export function OnboardingTour() {
  const { t } = useLang();
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
      ? {
          left: Math.min(Math.max(rect.left, 16), window.innerWidth - 336),
          bottom: Math.max(window.innerHeight - rect.top + 16, 16),
        }
      : {
          left: Math.min(Math.max(rect.left + rect.width / 2, 16), window.innerWidth - 336),
          top: Math.min(rect.bottom + 16, window.innerHeight - 236),
        }
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
        <h3 className="mt-1 text-lg font-black text-white">{t[current.titleKey]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-sp-muted">{t[current.textKey]}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={finish} className="text-sm font-semibold text-sp-muted hover:text-white">
            {t.skip}
          </button>
          <button
            onClick={nextStep}
            className="sp-pill bg-sp-green px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-sp-green-hover"
          >
            {step === STEPS.length - 1 ? t.done : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
