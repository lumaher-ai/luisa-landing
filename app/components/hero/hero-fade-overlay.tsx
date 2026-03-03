"use client";

import { useCallback, useEffect, useRef } from "react";

export function HeroFadeOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;
    const opacity = Math.min(1, (window.scrollY / window.innerHeight) * 2.5);
    el.style.opacity = String(opacity);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-40 bg-[var(--gray-1)]"
      style={{ opacity: 0, willChange: "opacity" }}
      aria-hidden="true"
    />
  );
}
