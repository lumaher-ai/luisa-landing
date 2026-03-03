"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getSignalGenerator,
  SIGNAL_POINTS,
  type SignalType,
} from "./signal-generators";

interface SignalWaveProps {
  accentColor: string;
  signalType: SignalType;
  active?: boolean;
}

function parseRgb(color: string): string {
  return color.replace("rgb(", "").replace(")", "");
}

export function SignalWave({ accentColor, signalType, active = false }: SignalWaveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cursorXRef = useRef(0.5);
  const hoveringRef = useRef(false);
  const [inView, setInView] = useState(false);

  const activeRef = useRef(active);
  activeRef.current = active;

  const generator = getSignalGenerator(signalType);
  const rgb = parseRgb(accentColor);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let progress = 0;
    let rafId = 0;

    function tick(time: number) {
      if (startTime === null) startTime = time;
      const dt = (time - startTime) / 1000;

      if (progress < 1) {
        progress = Math.min(1, dt / 1.2);
      }

      const phase =
        0.02 * Math.sin(0.8 * dt) +
        (cursorXRef.current - 0.5) * 0.15;
      const isActive = hoveringRef.current || activeRef.current;
      const amplitude = isActive ? 0.85 : 0.55;
      const pointCount = Math.floor(SIGNAL_POINTS * progress);

      const parts: string[] = [];
      for (let i = 0; i <= pointCount; i++) {
        const nx = i / (SIGNAL_POINTS - 1);
        const x = (nx * 960).toFixed(1);
        const y = (
          25 +
          -(25 * generator(nx, phase) * amplitude)
        ).toFixed(1);
        parts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
      }

      const path = pathRef.current;
      if (path) {
        path.setAttribute("d", parts.join(""));
        path.setAttribute(
          "stroke",
          `rgba(${rgb}, ${isActive ? 0.75 : 0.25})`
        );
        path.setAttribute(
          "stroke-width",
          isActive ? "1.5" : "1"
        );
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, generator, rgb]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      cursorXRef.current = (e.clientX - rect.left) / rect.width;
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    hoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveringRef.current = false;
    cursorXRef.current = 0.5;
  }, []);

  return (
    <div className="mt-6">
      <svg
        ref={svgRef}
        viewBox="0 0 960 50"
        className="h-[50px] w-full cursor-crosshair"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <path
          ref={pathRef}
          fill="none"
          stroke={`rgba(${rgb}, 0.25)`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d=""
        />
      </svg>
    </div>
  );
}
