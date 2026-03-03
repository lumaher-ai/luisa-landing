"use client";

import { useCallback, useEffect, useRef } from "react";

export function SectionRevealOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = overlayRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const rect = parent.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (1 - rect.top / window.innerHeight - 0.25) * 1.5));
    el.style.opacity = String(Math.max(0, 1 - progress));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-20 bg-[var(--gray-1)]"
      style={{ opacity: 1, willChange: "opacity" }}
      aria-hidden="true"
    />
  );
}
