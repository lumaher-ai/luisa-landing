"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SectionDef {
  id: string;
  label: string;
}

const SECTIONS: SectionDef[] = [
  { id: "experience", label: "Experience" },
  { id: "philosophy", label: "Philosophy" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "signal", label: "Contact" },
];

interface Tick {
  w: number;
  section?: number;
}

function buildTicks(): Tick[] {
  const ticks: Tick[] = [];

  const filler = () => {
    ticks.push({ w: 12 });
    ticks.push({ w: 6 });
    ticks.push({ w: 16 });
    ticks.push({ w: 6 });
    ticks.push({ w: 10 });
    ticks.push({ w: 6 });
    ticks.push({ w: 14 });
    ticks.push({ w: 6 });
  };

  ticks.push({ w: 6 });
  ticks.push({ w: 10 });
  ticks.push({ w: 6 });
  ticks.push({ w: 14 });
  ticks.push({ w: 6 });

  ticks.push({ w: 30, section: 0 });
  filler();
  filler();

  ticks.push({ w: 30, section: 1 });
  filler();

  ticks.push({ w: 30, section: 2 });
  filler();
  filler();
  filler();

  ticks.push({ w: 30, section: 3 });
  filler();

  ticks.push({ w: 30, section: 4 });
  filler();

  ticks.push({ w: 30, section: 5 });
  filler();

  ticks.push({ w: 6 });
  ticks.push({ w: 10 });
  ticks.push({ w: 6 });

  return ticks;
}

const TICKS = buildTicks();
const TICK_COUNT = TICKS.length;
const NAV_TOP = 56;
const PADDING = 40;

const DEFAULT_BAR_HEIGHT = 600;

export function ScrollSidebar() {
  const [barHeight, setBarHeight] = useState(DEFAULT_BAR_HEIGHT);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [tickWidths, setTickWidths] = useState(() => TICKS.map((t) => t.w));
  const [indicatorY, setIndicatorY] = useState(0);
  const [sectionBarPositions, setSectionBarPositions] = useState<number[]>(
    () => Array.from({ length: SECTIONS.length }, (_, i) => (i / Math.max(1, SECTIONS.length - 1)) * DEFAULT_BAR_HEIGHT)
  );
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  const barHeightRef = useRef(DEFAULT_BAR_HEIGHT);

  useEffect(() => {
    const measure = () => {
      const h = window.innerHeight - NAV_TOP - PADDING;
      barHeightRef.current = h;
      setBarHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const tickSpacing = barHeight / (TICK_COUNT - 1);

  const updateTickWidths = useCallback((pos: number) => {
    const sp = barHeightRef.current / (TICK_COUNT - 1);
    setTickWidths(
      TICKS.map((tick, i) => {
        const dist = Math.abs(pos - sp * i);
        if (dist > 50) return tick.w;
        const proximity = (1 - Math.cos((1 - dist / 50) * Math.PI)) / 2;
        return tick.w + 22 * proximity;
      })
    );
  }, []);

  useEffect(() => {
    function animate() {
      const diff = targetRef.current - positionRef.current;
      positionRef.current += diff * 0.2;
      setIndicatorY(positionRef.current);
      updateTickWidths(positionRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateTickWidths]);

  const handleScroll = useCallback(() => {
    const heroEl = document.querySelector("[data-brain-reveal]");
    if (!heroEl) return;

    const hero = heroEl as HTMLElement;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    const show = scrollY + 0.3 * winH > heroBottom;
    setVisible(show);

    if (!show) return;

    // Measure real section tops and bottoms (page-absolute)
    const viewCenter = scrollY + winH / 2;
    const sectionTops: number[] = [];
    const sectionBottoms: number[] = [];
    for (const sec of SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        sectionTops.push(top);
        sectionBottoms.push(top + rect.height);
      } else {
        sectionTops.push(0);
        sectionBottoms.push(0);
      }
    }

    // Compute proportional bar positions for section labels
    const contentStart = sectionTops[0];
    const contentEnd = sectionBottoms[sectionBottoms.length - 1];
    const contentRange = contentEnd - contentStart;
    const h = barHeightRef.current;
    const margin = h * 0.06;
    const barRange = h - 2 * margin;

    const barPositionsComputed = sectionTops.map((top) => {
      const t = contentRange > 0 ? (top - contentStart) / contentRange : 0;
      return margin + t * barRange;
    });

    if (contentRange > 0) {
      setSectionBarPositions(barPositionsComputed);
    }

    // Active section = last section whose top has passed the viewport center
    let current = 0;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      if (sectionTops[i] <= viewCenter) {
        current = i;
        break;
      }
    }
    setActiveSection(current);

    // Indicator: same proportional mapping, clamped to first/last label positions
    let indicatorTarget = 0;
    if (contentRange > 0) {
      const t = (viewCenter - contentStart) / contentRange;
      const raw = margin + t * barRange;
      const firstBar = barPositionsComputed[0];
      const lastBar = barPositionsComputed[barPositionsComputed.length - 1];
      indicatorTarget = Math.min(lastBar, Math.max(firstBar, raw));
      targetRef.current = indicatorTarget;
    }

  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div
      aria-hidden={visible ? undefined : true}
      className="fixed left-6 z-30 hidden items-center lg:flex"
      style={{
        top: 56,
        bottom: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="relative" style={{ height: barHeight, width: 70 }}>
        {/* Vertical line — only extends to last section */}
        <div
          className="absolute left-0 top-0 w-px bg-[var(--gray-3)]"
          style={{ height: sectionBarPositions[sectionBarPositions.length - 1] || barHeight }}
        />

        {/* Tick marks (decorative) — only render up to last section */}
        {TICKS.map((tick, i) => {
          const top = tickSpacing * i;
          const lastPos = sectionBarPositions[sectionBarPositions.length - 1] || barHeight;
          if (top > lastPos) return null;
          return (
            <div
              key={i}
              className="absolute left-0 h-px"
              style={{
                top,
                width: tickWidths[i],
                backgroundColor:
                  tickWidths[i] > tick.w + 3
                    ? "#FF4D00"
                    : "var(--gray-5)",
                opacity: 1,
                transition:
                  "background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
          );
        })}

        {/* Position indicator */}
        <div
          className="absolute"
          style={{
            transform: `translateY(${indicatorY}px)`,
            top: 0,
            left: 0,
          }}
        >
          {/* Orange triangle */}
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            className="absolute"
            style={{ left: -13, top: -5 }}
          >
            <path d="M8 5L0 0V10L8 5Z" fill="#FF4D00" />
          </svg>
        </div>

        {/* Clickable section zones — non-overlapping regions */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="absolute left-0 w-full cursor-pointer"
          style={{ top: 0, height: barHeight }}
          onClick={(e) => {
            const y = e.nativeEvent.offsetY;
            let closest = 0;
            let minDist = Math.abs(y - sectionBarPositions[0]);
            for (let i = 1; i < SECTIONS.length; i++) {
              const dist = Math.abs(y - sectionBarPositions[i]);
              if (dist < minDist) {
                minDist = dist;
                closest = i;
              }
            }
            scrollToSection(SECTIONS[closest].id);
          }}
        />

        {/* Section labels — positioned proportionally to actual page layout */}
        {SECTIONS.map((sec, sectionIdx) => {
          const isActive = activeSection === sectionIdx;
          return (
            <div
              key={sectionIdx}
              className="absolute left-0 pointer-events-none"
              style={{
                top: sectionBarPositions[sectionIdx] - 14,
                height: 28,
                paddingLeft: 42,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="text-[13px] font-medium tracking-[0.08em] uppercase whitespace-nowrap"
                style={{
                  color: isActive ? "#FF4D00" : "var(--gray-7)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-8px)",
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                  transition:
                    "opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease, color 0.35s ease",
                }}
              >
                {sec.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {/* LET'S TALK button — fixed bottom right */}
    <button
      onClick={() => scrollToSection("signal")}
      aria-label="Scroll to contact section"
      className="group fixed bottom-0 right-0 z-30 hidden cursor-pointer lg:block"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="font-mono text-[13px] font-semibold tracking-[0.16em] uppercase px-5 py-3 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
        style={{
          backgroundColor: "#FF4D00",
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        Let&apos;s talk
      </div>
    </button>
    </>
  );
}
