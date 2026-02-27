export function HeroHeadline() {
  return (
    <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-4">
      <h1 className="max-w-3xl text-center text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
        I build intelligence that stays
        <br />
        where it belongs.
      </h1>

      <p className="mt-8 font-mono text-xs tracking-[0.25em] text-gray-400 uppercase">
        David Dominguez
      </p>

      <p className="mt-2 font-mono text-[11px] tracking-wider text-gray-600">
        AI Engineer / Open-source builder
      </p>

      <a
        href="#signal"
        className="pointer-events-auto mt-8 rounded-full border border-gray-700 px-6 py-2 font-mono text-[11px] tracking-wider text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
      >
        Let&apos;s talk
      </a>
    </div>
  );
}
