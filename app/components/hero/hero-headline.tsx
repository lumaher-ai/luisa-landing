export function HeroHeadline() {
  return (
    <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4">
      <h1 className="max-w-4xl text-center text-[clamp(36px,5vw,56px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
        I ship production GenAI from 0 to 1
      </h1>

      <h2 className="mt-3 max-w-4xl text-center text-[clamp(24px,3vw,35px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-9)]">&mdash; Built to deliver
      secure, observable, and highly optimized multi-agent systems.</h2>

      <p className="mt-8 font-mono text-[12px] tracking-[0.08em] text-white uppercase">
        Luisa Hernández
      </p>

      <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-white/70">
        Senior AI Engineer · Founding Engineer
      </p>

      <a
        href="#signal"
        className="pointer-events-auto mt-8 rounded-full border border-white/60 px-6 py-2 font-mono text-[11px] tracking-wider text-white transition-colors duration-200 hover:border-white hover:text-white"
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
