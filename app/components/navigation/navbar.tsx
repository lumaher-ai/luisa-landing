import { LiveCounter } from "./live-counter";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 right-0 left-0 z-40 flex h-14 items-center justify-between px-6 md:px-8"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "color-mix(in oklch, var(--gray-1) 80%, transparent)",
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <a
        href="#"
        className="font-mono text-[13px] font-medium tracking-[0.08em] text-[var(--gray-9)]"
      >
        DAVID DOMINGUEZ
      </a>

      <LiveCounter />

      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-6 md:flex">
          {["blog", "work", "signal"].map((link) => (
            <a
              key={link}
              href={link === "blog" ? "/blog" : `#${link}`}
              className="text-[13px] text-[var(--gray-7)] transition-colors duration-200 hover:text-[var(--gray-11)]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Theme toggle placeholder */}
        <button
          type="button"
          aria-label="Toggle theme"
          className="flex h-7 w-7 items-center justify-center active:scale-[0.96]"
        >
          <div
            className="h-4 w-4 rounded-full"
            style={{
              background:
                "linear-gradient(to right, var(--gray-12) 50%, transparent 50%)",
              border: "1.5px solid var(--gray-12)",
            }}
          />
        </button>
      </div>
    </nav>
  );
}
