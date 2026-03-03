"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MetricCards } from "./metric-cards";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  // Auto-hover when card scrolls into view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Apply accent color to title when in view
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.color = inView ? project.accentColor : "";
    }
  }, [inView, project.accentColor]);

  const handleTitleEnter = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.color = project.accentColor;
    }
  }, [project.accentColor]);

  const handleTitleLeave = useCallback(() => {
    if (titleRef.current && !inView) {
      titleRef.current.style.color = "";
    }
  }, [inView]);

  return (
    <div ref={cardRef} className="group relative">
      {/* Large ghost number */}
      <span
        className="pointer-events-none absolute -right-4 top-0 hidden select-none text-[100px] font-medium leading-none transition-colors duration-500 md:block"
        style={{ color: inView ? project.accentColor : "var(--gray-3)" }}
      >
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

      {/* Description */}
      <p className="mt-4 max-w-[600px] text-[14px] leading-[1.6] text-[var(--gray-7)]">
        {project.description}
      </p>

      {/* Metric cards */}
      <MetricCards
        metrics={project.metrics}
        accentColor={project.accentColor}
      />

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
        {project.stack.map((tech, i) => (
          <span
            key={tech}
            className="font-mono text-[11px] tracking-[0.02em] text-[var(--gray-6)]"
          >
            {tech}
            {i < project.stack.length - 1 && (
              <span className="ml-2 text-[var(--gray-4)]">&middot;</span>
            )}
          </span>
        ))}
      </div>

      {/* Animated signal wave */}
      <SignalWave
        accentColor={project.accentColor}
        signalType={project.signalType}
        active={inView}
      />

      {/* Link */}
      {project.link && project.linkLabel && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name}, opens in new tab`}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-blue-400 transition-colors duration-200 hover:text-blue-300"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7M7.5 1H11m0 0v3.5M11 1 5.5 6.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {project.linkLabel}
        </a>
      )}
    </div>
  );
}
