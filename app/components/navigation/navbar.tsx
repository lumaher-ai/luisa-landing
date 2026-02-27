import { LiveCounter } from "./live-counter";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-10">
      <span className="font-mono text-[11px] tracking-[0.2em] text-gray-400 uppercase">
        David Dominguez
      </span>

      <LiveCounter />

      <div className="flex items-center gap-6">
        {["blog", "work", "signal"].map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="font-mono text-[11px] tracking-wider text-gray-400 transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
        <div className="h-6 w-6 rounded-full border border-gray-600" />
      </div>
    </nav>
  );
}
