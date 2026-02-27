export function HeroHeadline() {
  return (
    <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4">
      <h1 className="max-w-3xl text-center text-[clamp(36px,5vw,56px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
        I build intelligence that stays
        <br />
        where it belongs.
      </h1>

      <p className="mt-8 font-mono text-[12px] tracking-[0.08em] text-[var(--gray-7)] uppercase">
        David Dominguez
      </p>

      <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-[var(--gray-6)]">
        AI Engineer / Open-source builder
      </p>

      <a
        href="#signal"
        className="pointer-events-auto mt-8 rounded-full border border-[var(--gray-5)] px-6 py-2 font-mono text-[11px] tracking-wider text-[var(--gray-7)] transition-colors duration-200 hover:border-[var(--gray-7)] hover:text-[var(--gray-11)]"
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
