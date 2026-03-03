"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhilosophyCanvas } from "./philosophy-canvas";

interface PhilosophyItem {
  title: string;
  description: string;
}

const PRINCIPLES: PhilosophyItem[] = [
  {
    title: "Privacy is a design constraint, not an afterthought.",
    description:
      "I treat data privacy as an architectural decision, not a compliance checkbox. At Agua, that meant a fully client-side architecture with zero data egress. At Closer AI, it means strict data governance across every LLM provider interaction \u2014 controlling exactly what leaves the system, where it goes, and how it\u2019s retained. The approach changes with the problem. The discipline doesn\u2019t.",
  },
  {
    title: "Speed is a strategy. Waiting is a decision.",
    description:
      "Every week a tool isn\u2019t in production is a week your team is working around the problem instead of past it. I optimize for sustainable velocity \u2014 scoped releases, real users, real feedback \u2014 without sacrificing reliability. The compounding cost of delay is invisible until it isn\u2019t. But so is the cost of shipping something that breaks trust.",
  },
  {
    title: "Adoption is an engineering problem.",
    description:
      "The hardest tools to adopt are the ones that ignore how people already work. I build to fit existing workflows, existing habits, existing mental models \u2014 because the hidden cost of software is never the license. It\u2019s the change management, the resistance, the workarounds your team builds around tools they were told to use.",
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
      className="relative min-h-dvh scroll-mt-20 px-6 py-32 md:px-8"
    >
      <div className="mx-auto max-w-[960px]">
        <h2 className="mb-12 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          My Philosophy
        </h2>

        {/* Desktop: canvas + centered statement */}
        <div className="hidden md:block">
          <PhilosophyCanvas active={active} onSelect={handleSelect} />

          <div className="mt-14 flex min-h-[180px] items-start justify-center text-center">
            <div className="max-w-[650px]">
              <h3
                className="text-[clamp(24px,3.5vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]"
                style={{ textShadow: "none" }}
              >
                {PRINCIPLES[active].title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.7] text-[var(--gray-8)] text-left">
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
