"use client";

import { useMemo } from "react";

interface Project {
  name: string;
  tag: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  accentColor: string;
  link: string;
  linkLabel: string;
}

const PROJECTS: Project[] = [
  {
    name: "Project Alpha",
    tag: "PLT-001",
    year: "2026",
    tagline: "Design methodology, trained into an AI",
    description:
      "A design methodology where every site gets a signature moment no one has shipped before. 3D craft, full-stack thinking, and an AI agent trained as a design persona. From philosophy to production code.",
    stack: ["Next.js", "React 19", "Three.js", "Tailwind v4"],
    accentColor: "rgb(232, 168, 94)",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Beta",
    tag: "AGT-001",
    year: "2026",
    tagline: "Your personal Agent, governed and scheduled",
    description:
      "Schedule AI coding agents with CRON tasks, approval workflows, and notification channels. You're already paying for Claude. This makes it work while you sleep.",
    stack: ["Python", "FastAPI", "React", "Claude Code"],
    accentColor: "rgb(130, 230, 170)",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Gamma",
    tag: "RAG-001",
    year: "2024",
    tagline: "RAG without the cloud tax",
    description:
      "A CLI that turns your documents into a searchable AI, entirely on your machine. No cloud. No API keys. No one else reading your data.",
    stack: ["Go", "Ollama", "Vector DB", "Semantic Search"],
    accentColor: "rgb(100, 180, 255)",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Delta",
    tag: "MEM-001",
    year: "2024",
    tagline: "Total recall. Totally private.",
    description:
      "Captures, indexes, and recalls everything you do on your machine. Screenshot OCR, audio transcription, vector search. Every byte stays yours.",
    stack: ["Python", "PyTorch", "SQLite", "OCR"],
    accentColor: "rgb(180, 130, 255)",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Epsilon",
    tag: "RAG-002",
    year: "2024",
    tagline: "Portable intelligence",
    description:
      "RAG on mobile and desktop using local NLP for embeddings and local LLMs for generation. AI that actually runs in your pocket, not in a datacenter.",
    stack: ["Swift", "CoreML", "Embeddings", "Local LLM"],
    accentColor: "rgb(200, 200, 220)",
    link: "https://github.com",
    linkLabel: "github.com",
  },
];

function generateSignalPath(
  seed: number,
  width: number,
  height: number
): string {
  const points: string[] = [];
  const steps = 200;
  const stepSize = width / steps;
  const mid = height / 2;

  for (let i = 0; i <= steps; i++) {
    const x = i * stepSize;
    const t = i / steps;
    const y =
      mid +
      Math.sin(t * 12 + seed) * 8 +
      Math.sin(t * 5.3 + seed * 2.1) * 5 +
      Math.cos(t * 8.7 + seed * 0.7) * 3;
    const cmd = i === 0 ? "M" : "L";
    points.push(`${cmd}${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points.join("");
}

function SignalWave({
  accentColor,
  seed,
}: {
  accentColor: string;
  seed: number;
}) {
  const pathD = useMemo(
    () => generateSignalPath(seed, 960, 50),
    [seed]
  );

  const [r, g, b] = accentColor
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((s) => s.trim());

  return (
    <div className="mt-6">
      <svg
        viewBox="0 0 960 50"
        className="h-[50px] w-full cursor-crosshair"
        preserveAspectRatio="none"
      >
        <path
          fill="none"
          stroke={`rgba(${r}, ${g}, ${b}, 0.25)`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={pathD}
        />
      </svg>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative">
      <span className="pointer-events-none absolute -right-4 top-0 hidden select-none text-[100px] font-medium leading-none text-[var(--gray-2)] transition-colors duration-200 group-hover:text-[var(--gray-3)] md:block">
        {number}
      </span>

      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[12px] tracking-[0.06em] text-[var(--gray-6)]">
          [{project.tag}]
        </span>
        <span className="font-mono text-[12px] tracking-[0.06em] text-[var(--gray-6)]">
          {project.year}
        </span>
      </div>

      <h3 className="text-[clamp(28px,3.5vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)] transition-colors duration-200">
        {project.name}
      </h3>

      <p className="mt-1 text-[15px] text-[var(--gray-9)]">
        {project.tagline}
      </p>

      <p className="mt-4 max-w-[600px] text-[14px] leading-[1.6] text-[var(--gray-7)]">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
        {project.stack.map((tech, i) => (
          <span
            key={tech}
            className="font-mono text-[11px] tracking-[0.02em] text-[var(--gray-6)]"
          >
            {tech}
            {i < project.stack.length - 1 && (
              <span className="ml-2 text-[var(--gray-4)]">
                &middot;
              </span>
            )}
          </span>
        ))}
      </div>

      <SignalWave
        accentColor={project.accentColor}
        seed={index * 3.7 + 1.2}
      />

      <div className="mt-4 flex items-center gap-4">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-[var(--gray-7)] transition-colors duration-200 hover:text-[var(--gray-11)]"
        >
          {project.linkLabel}
        </a>
      </div>
    </div>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-8">
      <div className="mx-auto max-w-[960px] space-y-[100px] md:space-y-[120px]">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
