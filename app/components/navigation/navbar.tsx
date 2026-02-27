import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 right-0 left-0 z-40 flex h-14 items-center justify-between px-6 md:px-8"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "color-mix(in oklch, var(--gray-1) 80%, transparent)",
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div className="flex items-center gap-3">
        <MobileNav />
        <div
          className="font-mono text-[13px] font-medium tracking-[0.08em] text-[var(--gray-9)]"
        >
          DAVID DOMINGUEZ
        </div>
      </div>

      <a
        href="/cv_david.pdf"
        download
        className="font-mono text-[11px] tracking-[0.06em] text-[var(--gray-7)] transition-colors duration-200 hover:text-[var(--gray-11)]"
      >
        Download CV
      </a>
    </nav>
  );
}
