"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SectionDef {
  id: string;
  label: string;
}

const SECTIONS: SectionDef[] = [
  { id: "philosophy", label: "Philosophy" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "signal", label: "Signal" },
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

  ticks.push({ w: 6 });
  ticks.push({ w: 10 });
  ticks.push({ w: 6 });

  return ticks;
}

const TICKS = buildTicks();
const TICK_SPACING = 10;
const TOTAL_HEIGHT = (TICKS.length - 1) * TICK_SPACING;
const SECTION_TICK_INDICES = TICKS.reduce<number[]>((acc, tick, i) => {
  if (tick.section !== undefined) acc.push(i);
  return acc;
}, []);

export function ScrollSidebar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [tickWidths, setTickWidths] = useState(() => TICKS.map((t) => t.w));
  const [indicatorY, setIndicatorY] = useState(0);
  const positionRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  const updateTickWidths = useCallback((pos: number) => {
    setTickWidths(
      TICKS.map((tick, i) => {
        const dist = Math.abs(pos - TICK_SPACING * i);
        if (dist > 50) return tick.w;
        const proximity = (1 - Math.cos((1 - dist / 50) * Math.PI)) / 2;
        return tick.w + 22 * proximity;
      })
    );
  }, []);

  useEffect(() => {
    function animate() {
      const diff = targetRef.current - positionRef.current;
      positionRef.current += diff * 0.1;
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

    const scrollable = document.body.scrollHeight - winH - heroBottom;
    if (scrollable <= 0) return;

    const progress = Math.min(
      Math.max((scrollY - heroBottom + 0.4 * winH) / scrollable, 0),
      1
    );
    targetRef.current = progress * TOTAL_HEIGHT;

    const checkY = scrollY + 0.45 * winH;
    let current = 0;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el && el.offsetTop <= checkY) {
        current = i;
        break;
      }
    }
    setActiveSection(current);
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
    <div
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
      <div className="relative" style={{ height: TOTAL_HEIGHT, width: 70 }}>
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 w-px bg-gray-800"
          style={{ height: TOTAL_HEIGHT }}
        />

        {/* Tick marks */}
        {TICKS.map((tick, i) => (
          <div
            key={i}
            className="absolute left-0 h-px"
            style={{
              top: TICK_SPACING * i,
              width: tickWidths[i],
              backgroundColor:
                tickWidths[i] > tick.w + 3
                  ? "#FF4D00"
                  : tick.section !== undefined
                    ? "var(--color-foreground, #666)"
                    : "var(--color-foreground, #444)",
              opacity:
                tickWidths[i] > tick.w + 3
                  ? 1
                  : tick.section !== undefined
                    ? 0.4
                    : 0.2,
              transition: "background-color 150ms ease",
            }}
          />
        ))}

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

          {/* Horizontal orange line */}
          <div
            className="absolute h-px"
            style={{
              top: 0,
              left: 0,
              width: "calc(100vw - 24px)",
              backgroundColor: "#FF4D00",
              opacity: 0.4,
            }}
          />

          {/* LET'S TALK button */}
          <button
            onClick={() => scrollToSection("signal")}
            className="group absolute cursor-pointer"
            style={{
              left: "calc(100vw - 24px)",
              top: 0,
              transform: "translateX(-100%)",
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
        </div>

        {/* Section labels */}
        {SECTION_TICK_INDICES.map((tickIdx, sectionIdx) => {
          const isActive = activeSection === sectionIdx;
          return (
            <button
              key={sectionIdx}
              onClick={() => scrollToSection(SECTIONS[sectionIdx].id)}
              className="absolute left-0 cursor-pointer"
              style={{
                top: TICK_SPACING * tickIdx - 14,
                height: 28,
                paddingLeft: 42,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="text-[13px] font-medium tracking-[0.08em] uppercase whitespace-nowrap"
                style={{
                  color: isActive ? "#FF4D00" : "var(--color-foreground, #666)",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-8px)",
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                  transition:
                    "opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease, color 0.35s ease",
                }}
              >
                {SECTIONS[sectionIdx].label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
