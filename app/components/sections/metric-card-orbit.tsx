"use client";

import { useCallback, useId, useRef } from "react";
import type { Metric } from "./metric-card-types";

function withAlpha(rgb: string, a: number): string {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${a})`);
}

function OrbitRings({
  gradientId,
  accentColor,
}: {
  gradientId: string;
  accentColor: string;
}) {
  return (
    <>
      {/* Ambient radial glow — breathes */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ animation: "orbit-glow-breathe 4s ease-in-out infinite" }}
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`glow-${gradientId}`}>
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="42" cy="42" r="41" fill={`url(#glow-${gradientId})`} />
      </svg>

      {/* Outer ring + gradient arc leader — CW */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ animation: "orbit-spin 20s linear infinite" }}
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`arc-${gradientId}`}
            gradientUnits="userSpaceOnUse"
            x1="0" y1="42" x2="84" y2="42"
          >
            <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle
          cx="42" cy="42" r="40"
          fill="none"
          stroke={withAlpha(accentColor, 0.5)}
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <circle
          cx="42" cy="42" r="40"
          fill="none"
          stroke={`url(#arc-${gradientId})`}
          strokeWidth="2.5"
          strokeDasharray="30 221"
          strokeLinecap="round"
        />
      </svg>

      {/* Middle ring — static depth line */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <circle
          cx="42" cy="42" r="28"
          fill="none"
          stroke={withAlpha(accentColor, 0.25)}
          strokeWidth="0.75"
        />
      </svg>

      {/* Inner ring — CCW */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ animation: "orbit-spin 13s linear infinite reverse" }}
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <circle
          cx="42" cy="42" r="28"
          fill="none"
          stroke={withAlpha(accentColor, 0.45)}
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />
      </svg>
    </>
  );
}

function OrbitNodes({ accentColor }: { accentColor: string }) {
  return (
    <>
      {/* Outer nodes — CW, synced with outer ring */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ animation: "orbit-spin 20s linear infinite" }}
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <circle
          cx="42" cy="2" r="2.5"
          fill={accentColor}
          style={{ animation: "orbit-node-pulse 2s ease-in-out infinite" }}
        />
        <circle cx="82" cy="42" r="1.5" fill={accentColor} opacity="0.85" />
        <circle
          cx="42" cy="82" r="2"
          fill={accentColor}
          style={{
            animation: "orbit-node-pulse 2.5s ease-in-out 0.8s infinite",
          }}
        />
      </svg>

      {/* Inner nodes — CCW, synced with inner ring */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ animation: "orbit-spin 13s linear infinite reverse" }}
        viewBox="0 0 84 84"
        aria-hidden="true"
      >
        <circle
          cx="14" cy="42" r="1.5"
          fill={accentColor}
          opacity="0.9"
          style={{ animation: "orbit-node-pulse 3s ease-in-out infinite" }}
        />
        <circle cx="70" cy="42" r="1.5" fill={accentColor} opacity="0.75" />
      </svg>
    </>
  );
}

export function OrbitCard({
  metric,
  accentColor,
}: {
  metric: Metric;
  accentColor: string;
}) {
  const gradientId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.filter =
        `drop-shadow(0 0 20px ${withAlpha(accentColor, 0.6)})`;
    }
  }, [accentColor]);

  const onLeave = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.filter = "";
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center py-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={containerRef}
        className="relative flex h-[84px] w-[84px] items-center justify-center transition-[filter] duration-300"
      >
        <OrbitRings gradientId={gradientId} accentColor={accentColor} />
        <OrbitNodes accentColor={accentColor} />

        {/* Center value */}
        <span
          className="relative z-10 text-xl font-bold tracking-tight"
          style={{
            color: accentColor,
            textShadow: `0 0 18px ${withAlpha(accentColor, 0.5)}, 0 0 40px ${withAlpha(accentColor, 0.15)}`,
          }}
        >
          {metric.value}
        </span>
      </div>

      {/* Label */}
      <div
        className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em]"
        style={{ color: withAlpha(accentColor, 0.6) }}
      >
        {metric.label}
      </div>
    </div>
  );
}
