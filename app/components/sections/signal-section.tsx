import Image from "next/image";
import { SignalSphereCanvas } from "../brain/signal-sphere-canvas";

interface SocialLink {
  label: string;
  href: string;
}

const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/daviddominguezh/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/daviddominguez" },
];

export function SignalSection() {
  return (
    <section id="signal" className="scroll-mt-20 py-32">
      <div className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[80vh]">
        {/* Top gradient fade */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-[2] h-40"
          style={{
            background:
              "linear-gradient(to bottom, var(--gray-1), transparent)",
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-40"
          style={{
            background:
              "linear-gradient(to top, var(--gray-1), transparent)",
          }}
        />

        {/* Three.js sphere mesh */}
        <div className="absolute inset-0 z-[1]">
          <SignalSphereCanvas />
        </div>

        {/* Circular photo — translucent, centered inside the sphere */}
        <div className="relative z-[3]">
          <div
            className="h-56 w-56 overflow-hidden rounded-full md:h-80 md:w-80 lg:h-[420px] lg:w-[420px]"
            style={{ opacity: 0.65 }}
          >
            <Image
              src="/david.png"
              alt="David Dominguez"
              width={840}
              height={840}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto flex max-w-xl flex-col items-center px-6 -mt-16 pb-32 text-center">
        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          Contact
        </h2>
        <p className="text-[17px] font-medium tracking-tight text-[var(--gray-9)]">
          David Dominguez
        </p>

        <p className="mt-10 max-w-[400px] text-[14px] leading-[1.6] text-[var(--gray-8)]">
          I help teams ship faster, build smarter, and scale with confidence. If you have a hard engineering problem or a bold product vision, my inbox is open.
        </p>

        <a
          href="mailto:l.david.dominguez.12@gmail.com"
          className="mt-6 block font-mono text-[clamp(14px,2vw,20px)] font-medium tracking-[-0.01em] text-[var(--gray-12)] transition-colors duration-200 hover:text-[var(--gray-10)]"
        >
          l.david.dominguez.12@gmail.com
        </a>

        <div className="mt-6 flex items-center justify-center gap-6">
          {SOCIALS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label}, opens in new tab`}
              className="group relative inline-block overflow-hidden"
            >
              <span className="block text-[13px] text-[var(--gray-6)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-full">
                {link.label}
              </span>
              <span className="absolute top-full left-0 block text-[13px] text-[var(--gray-9)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-full">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
