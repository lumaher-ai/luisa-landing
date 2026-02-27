"use client";

import { useState } from "react";

interface StackItem {
  name: string;
  level: "primary" | "secondary" | "tertiary";
  subtitle: string;
  years: number;
}

const STACK_ITEMS: StackItem[] = [
  { name: "TypeScript", level: "primary", subtitle: "primary language, full-stack", years: 7 },
  { name: "React", level: "primary", subtitle: "UI, web apps, SSR", years: 7 },
  { name: "Node.js", level: "primary", subtitle: "backend, APIs, services", years: 5 },
  { name: "Python", level: "primary", subtitle: "scripting, AI, automation", years: 3 },
  { name: "AI Agents", level: "primary", subtitle: "multi-step, memory, tools", years: 3 },
  { name: "Java", level: "secondary", subtitle: "enterprise backend", years: 2 },
  { name: "Docker", level: "primary", subtitle: "containerization, deployment", years: 4 },
  { name: "Kubernetes", level: "secondary", subtitle: "orchestration, scaling", years: 3 },
  { name: "AWS", level: "secondary", subtitle: "cloud infrastructure", years: 4 },
  { name: "GCP", level: "secondary", subtitle: "cloud, ML APIs", years: 4 },
  { name: "React Native", level: "secondary", subtitle: "mobile development", years: 3 },
  { name: "LLM Routing", level: "primary", subtitle: "multi-provider, fallbacks", years: 2 },
  { name: "MongoDB", level: "secondary", subtitle: "document store, NoSQL", years: 5 },
  { name: "MySQL", level: "secondary", subtitle: "relational databases", years: 4 },
  { name: "Jest", level: "tertiary", subtitle: "unit testing, TDD", years: 7 },
  { name: "CI/CD", level: "tertiary", subtitle: "pipelines, automation", years: 7 },
];

const LEVEL_STYLES: Record<string, string> = {
  primary: "text-[clamp(24px,4vw,36px)] text-[var(--gray-12)]",
  secondary: "text-[clamp(18px,3vw,26px)] text-[var(--gray-9)]",
  tertiary: "text-[clamp(15px,2vw,20px)] text-[var(--gray-7)]",
};

export function StackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="stack" className="relative px-6 py-32 md:px-8">
      <div className="mx-auto max-w-[960px]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-5">
          {STACK_ITEMS.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <div
                key={item.name}
                className="relative cursor-default select-none"
                style={{
                  opacity: isDimmed ? 0.15 : 1,
                  transform: isHovered ? "scale(1.08)" : isDimmed ? "scale(0.96)" : "scale(1)",
                  transition: "opacity 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={`font-medium tracking-[-0.02em] ${LEVEL_STYLES[item.level]}`}
                >
                  {item.name}
                </span>

                {isHovered && (
                  <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-[var(--gray-6)]">
                    {item.subtitle}
                    <span className="ml-2 text-[var(--gray-5)]">·</span>
                    <span className="ml-2 text-[var(--gray-7)]">{item.years}y</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
