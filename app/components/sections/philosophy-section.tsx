"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhilosophyCanvas } from "./philosophy-canvas";

interface PhilosophyItem {
  title: string;
  description: string;
}

const PRINCIPLES: PhilosophyItem[] = [
  {
    title: "Production is the only benchmark that counts.",
    description:
      "A demo agent and a production agent are different animals. One impresses in a controlled room; the other survives real users, real edge cases, and real cost at 10k+ conversations a day. I build for the second one from the start \u2014 multi-tenant, observable, zero-downtime \u2014 because that\u2019s the only version that actually moves the business.",
  },
  {
    title: "Ship fast, but ship it grounded.",
    description:
      "GenAI that hallucinates in front of a customer doesn\u2019t save time \u2014 it burns trust you can\u2019t buy back. I pair aggressive execution with the discipline that makes it safe: RAG grounding, evaluation harnesses, and observability on cost, latency, and quality. Speed and rigor aren\u2019t a trade-off. The rigor is what lets you keep shipping.",
  },
  {
    title: "AI features earn their keep in revenue and retention.",
    description:
      "The point of an autonomous agent isn\u2019t that it\u2019s clever \u2014 it\u2019s that it resolves 60% of inquiries without a human, or takes a company from zero to $25K MRR. I tie engineering decisions to outcomes I can measure, and I own them end to end: architecture, delivery, the team that ships it, and the numbers it produces.",
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
