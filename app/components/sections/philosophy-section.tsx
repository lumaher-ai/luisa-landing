"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhilosophyCanvas } from "./philosophy-canvas";

interface PhilosophyItem {
  title: string;
  description: string;
}

const PRINCIPLES: PhilosophyItem[] = [
  {
    title: "Privacy is not a feature. It\u2019s the default.",
    description:
      "Every tool I ship runs on your machine. Your documents, your models, your data. No server ever sees it.",
  },
  {
    title: "Ship fast. Fix in public.",
    description:
      "The best version is the one someone can use today, not the perfect one that never ships. Iteration beats perfection every time.",
  },
  {
    title: "Good tools stay out of the way.",
    description:
      "A CLI you reach for without thinking. A memory app that just works in the background. The less you notice, the better I did.",
  },
];

const CAROUSEL_INTERVAL = 10000;
const STEP_COUNT = 3;

export function PhilosophySection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % STEP_COUNT);
    }, CAROUSEL_INTERVAL);
  }, []);

  // Start auto-advance on mount
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleSelect = useCallback(
    (i: number) => {
      setActive(i);
      resetTimer();
    },
    [resetTimer]
  );

  return (
    <section
      id="philosophy"
      className="relative min-h-dvh px-6 pt-8 pb-32 md:px-8"
    >
      <div className="mx-auto max-w-[960px]">
        <h2 className="mb-12 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          My Philosophy
        </h2>

        {/* Desktop: canvas + centered statement */}
        <div className="hidden md:block">
          <PhilosophyCanvas active={active} onSelect={handleSelect} />

          <div className="mt-14 flex min-h-[180px] items-start justify-center text-center">
            <div className="max-w-[540px]">
              <h3
                className="text-[clamp(24px,3.5vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]"
                style={{ textShadow: "none" }}
              >
                {PRINCIPLES[active].title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.7] text-[var(--gray-8)]">
                {PRINCIPLES[active].description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: numbered list */}
        <div className="space-y-12 md:hidden">
          {PRINCIPLES.map((item, i) => (
            <div key={item.title}>
              <span className="mb-3 block font-mono text-[12px] tracking-[0.06em] text-[var(--gray-6)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(22px,5vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[var(--gray-8)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
