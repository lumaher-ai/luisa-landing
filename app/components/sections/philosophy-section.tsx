"use client";

import { useState } from "react";

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

function PhilosophyNav({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative flex items-center justify-between px-4">
      {/* Connecting line */}
      <div className="absolute top-1/2 right-4 left-4 h-px -translate-y-1/2 bg-[var(--gray-3)]" />

      {PRINCIPLES.map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className="relative z-10 flex cursor-pointer flex-col items-center gap-2"
          >
            {/* Dot */}
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300"
              style={{
                borderColor: isActive
                  ? "rgba(100, 140, 255, 0.5)"
                  : "var(--gray-4)",
                background: isActive
                  ? "rgba(100, 140, 255, 0.08)"
                  : "var(--gray-1)",
              }}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  background: isActive
                    ? "rgb(100, 140, 255)"
                    : "var(--gray-6)",
                }}
              />
            </div>
            {/* Number */}
            <span
              className="font-mono text-[12px] tracking-[0.06em] transition-colors duration-300"
              style={{
                color: isActive
                  ? "var(--gray-12)"
                  : "var(--gray-6)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PhilosophySection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="philosophy"
      className="relative px-6 pt-8 pb-32 md:px-8"
    >
      <div className="mx-auto max-w-[960px]">
        {/* Desktop: nav + centered statement */}
        <div className="hidden md:block">
          <PhilosophyNav active={active} onSelect={setActive} />

          <div className="mt-14 flex min-h-[180px] items-start justify-center text-center">
            <div className="max-w-[540px]">
              <h2 className="text-[clamp(24px,3.5vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
                {PRINCIPLES[active].title}
              </h2>
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
              <h2 className="text-[clamp(22px,5vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--gray-12)]">
                {item.title}
              </h2>
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
