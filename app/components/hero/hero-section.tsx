import { BrainCanvas } from "@/app/components/brain/brain-canvas";
import { WaveLines } from "@/app/components/brain/wave-lines";
import { HeroHeadline } from "./hero-headline";
import { ScrollIndicator } from "./scroll-indicator";

export function HeroSection() {
  return (
    <>
      <section
        data-brain-reveal
        className="relative h-screen w-full overflow-hidden bg-[var(--gray-1)]"
      >
        <WaveLines />
        <BrainCanvas />
        <HeroHeadline />
        <ScrollIndicator />
      </section>
      {/* Gradient fade from hero to content */}
      <div
        className="pointer-events-none relative z-10 -mt-48 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--gray-1))",
        }}
      />
    </>
  );
}
