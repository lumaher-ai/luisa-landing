"use client";

import { useState, useEffect } from "react";

interface StackItem {
  name: string;
  level: "primary" | "secondary" | "tertiary";
  subtitle: string;
  years: number;
}

const STACK_ITEMS: StackItem[] = [
  { name: "Python", level: "primary", subtitle: "agents, RAG, data pipelines", years: 4 },
  { name: "Node.js", level: "primary", subtitle: "multi-tenant backends at scale", years: 4 },
  { name: "TypeScript", level: "primary", subtitle: "typed end-to-end, production-grade", years: 4 },
  { name: "CI/CD", level: "tertiary", subtitle: "zero-downtime, automated pipelines", years: 4 },
  { name: "AWS", level: "primary", subtitle: "ECS, S3, Lambda, RDS, Bedrock", years: 3 },
  { name: "PostgreSQL", level: "secondary", subtitle: "relational data + pgvector", years: 3 },
  { name: "Docker", level: "secondary", subtitle: "containerized everything", years: 3 },
  { name: "React", level: "secondary", subtitle: "enterprise UIs, shared libraries", years: 3 },
  { name: "Jest / Vitest", level: "tertiary", subtitle: "45% → 80% coverage", years: 3 },
  { name: "LLM Integration", level: "primary", subtitle: "OpenAI, Anthropic, in production", years: 2 },
  { name: "Prompt Engineering", level: "primary", subtitle: "grounded, reliable output", years: 2 },
  { name: "LangGraph", level: "primary", subtitle: "autonomous multi-agent flows", years: 1 },
  { name: "LangChain", level: "primary", subtitle: "agentic orchestration", years: 1 },
  { name: "RAG Pipelines", level: "primary", subtitle: "hallucination-free grounding", years: 1 },
  { name: "Vector DBs", level: "secondary", subtitle: "Pinecone, pgvector", years: 1 },
  { name: "MCP", level: "secondary", subtitle: "Model Context Protocol", years: 1 },
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
