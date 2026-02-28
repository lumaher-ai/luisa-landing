"use client";

import { useState, useCallback, useLayoutEffect, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "philosophy", label: "Philosophy" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "signal", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Focus management: move focus into/out of drawer on open/close
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const navigate = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, []);

  const portal = mounted
    ? createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 md:hidden"
            style={{
              zIndex: 9998,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.3s ease",
            }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-nav-dialog"
            className="fixed top-0 left-0 h-full w-64 bg-black px-6 py-8 md:hidden"
            aria-hidden={!open}
            aria-modal={open}
            aria-labelledby="mobile-nav-title"
            role="dialog"
            style={{
              zIndex: 9999,
              transform: open ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            <h2 id="mobile-nav-title" className="sr-only">
              Navigation
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation"
              className="mb-10 flex self-end text-[var(--gray-6)] hover:text-[var(--gray-12)]"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => navigate(s.id)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-4 py-3 text-left"
                >
                  <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--gray-5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium text-[var(--gray-10)] transition-colors duration-150 hover:text-[var(--gray-12)]">
                    {s.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        ref={hamburgerRef}
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-nav-dialog"
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="block h-px w-5 bg-[var(--gray-9)]" />
        <span className="block h-px w-5 bg-[var(--gray-9)]" />
        <span className="block h-px w-3 bg-[var(--gray-9)]" />
      </button>

      {portal}
    </>
  );
}
