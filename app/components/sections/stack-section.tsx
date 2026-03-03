"use client";

import { useState, useEffect } from "react";

interface StackItem {
  name: string;
  level: "primary" | "secondary" | "tertiary";
  subtitle: string;
  years: number;
}

const STACK_ITEMS: StackItem[] = [
  { name: "TypeScript", level: "primary", subtitle: "fewer bugs, faster ships", years: 7 },
  { name: "React", level: "primary", subtitle: "fast, interactive experiences", years: 7 },
  { name: "Node.js", level: "primary", subtitle: "scalable APIs, real-time ready", years: 7 },
  { name: "Jest", level: "tertiary", subtitle: "reliable code, confident releases", years: 7 },
  { name: "CI/CD", level: "tertiary", subtitle: "ships daily, zero downtime", years: 7 },
  { name: "MongoDB", level: "secondary", subtitle: "flexible data, fast iteration", years: 5 },
  { name: "Docker", level: "primary", subtitle: "runs anywhere, no surprises", years: 4 },
  { name: "AWS", level: "secondary", subtitle: "global scale, always on", years: 4 },
  { name: "GCP", level: "secondary", subtitle: "AI-ready cloud infrastructure", years: 4 },
  { name: "MySQL", level: "secondary", subtitle: "rock-solid, structured data", years: 4 },
  { name: "Python", level: "primary", subtitle: "automation, AI, rapid tooling", years: 3 },
  { name: "AI Agents", level: "primary", subtitle: "autonomous multi-step workflows", years: 3 },
  { name: "Kubernetes", level: "secondary", subtitle: "self-healing, infinite scale", years: 3 },
  { name: "React Native", level: "secondary", subtitle: "one codebase, iOS + Android", years: 3 },
  { name: "Java", level: "secondary", subtitle: "high-throughput enterprise systems", years: 3 },
  { name: "LLM Routing", level: "primary", subtitle: "best AI model, every time", years: 2 },
];

const SORTED_ITEMS = [...STACK_ITEMS].sort((a, b) => b.years - a.years);

const LEVEL_STYLES: Record<string, string> = {
  primary: "text-[clamp(24px,4vw,36px)] text-[var(--gray-12)]",
  secondary: "text-[clamp(18px,3vw,26px)] text-[var(--gray-9)]",
  tertiary: "text-[clamp(15px,2vw,20px)] text-[var(--gray-7)]",
};

export function StackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id="stack" className="relative min-h-dvh scroll-mt-20 px-6 py-32 md:px-8">
      <div className="mx-auto max-w-[960px]">
        <h2 className="mb-16 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          Stack
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-5">
          {SORTED_ITEMS.map((item, i) => {
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
                onMouseEnter={isMobile ? undefined : () => setHoveredIndex(i)}
                onMouseLeave={isMobile ? undefined : () => setHoveredIndex(null)}
              >
                <span className={`font-medium tracking-[-0.02em] ${LEVEL_STYLES[item.level]}`}>
                  {item.name}
                </span>

                {isHovered && !isMobile && (
                  <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 font-mono text-[11px] text-[var(--gray-6)]" style={{ whiteSpace: "nowrap", maxWidth: "min(200px, 40vw)" }}>
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
