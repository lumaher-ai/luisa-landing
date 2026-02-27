"use client";

import { useCallback, useRef } from "react";
import { SignalWave } from "./work-signal-wave";
import type { Project } from "./work-data";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const number = String(index + 1).padStart(2, "0");

  const handleTitleEnter = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.color = project.accentColor;
    }
  }, [project.accentColor]);

  const handleTitleLeave = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.color = "";
    }
  }, []);

  return (
    <div className="group relative">
      {/* Large ghost number */}
      <span className="pointer-events-none absolute -right-4 top-0 hidden select-none text-[100px] font-medium leading-none text-[var(--gray-2)] transition-colors duration-200 group-hover:text-[var(--gray-3)] md:block">
        {number}
      </span>

      {/* Tag + year */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[12px] tracking-[0.06em] text-[var(--gray-6)]">
          [{project.tag}]
        </span>
        <span className="font-mono text-[12px] tracking-[0.06em] text-[var(--gray-6)]">
          {project.year}
        </span>
      </div>

      {/* Title with accent hover */}
      <h3
        ref={titleRef}
        className="text-[clamp(28px,3.5vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)] transition-colors duration-200"
        onMouseEnter={handleTitleEnter}
        onMouseLeave={handleTitleLeave}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="mt-1 text-[15px] text-[var(--gray-9)]">
        {project.tagline}
      </p>

      {/* Description — collapses on desktop, expands on hover */}
      <div
        className="max-h-[200px] overflow-hidden opacity-100 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-[200px] md:group-hover:opacity-100"
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <p className="mt-4 max-w-[600px] text-[14px] leading-[1.6] text-[var(--gray-7)]">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
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

      {/* Animated signal wave */}
      <SignalWave
        accentColor={project.accentColor}
        signalType={project.signalType}
      />

      {/* Link — collapses on desktop, expands on hover */}
      <div
        className="mt-4 max-h-[40px] overflow-hidden opacity-100 transition-all duration-200 md:max-h-0 md:opacity-0 md:group-hover:max-h-[40px] md:group-hover:opacity-100"
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
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
