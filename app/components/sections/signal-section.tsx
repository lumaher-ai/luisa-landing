interface SocialLink {
  label: string;
  href: string;
}

const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

export function SignalSection() {
  return (
    <section id="signal" className="mx-auto max-w-5xl px-6 py-32 md:px-10">
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">
        Signal
      </h2>

      <p className="mt-16 max-w-lg text-2xl leading-snug font-semibold text-white">
        If you&apos;re building something that matters, let&apos;s talk.
      </p>

      <a
        href="mailto:hello@daviddominguez.dev"
        className="mt-8 inline-block font-mono text-sm text-gray-400 transition-colors hover:text-white"
      >
        hello@daviddominguez.dev
      </a>

      <div className="mt-10 flex gap-6">
        {SOCIALS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] text-gray-500 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
