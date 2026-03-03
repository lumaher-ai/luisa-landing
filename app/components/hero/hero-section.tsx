import { HeroFadeOverlay } from "./hero-fade-overlay";
import { BrainCanvas } from "@/app/components/brain/brain-canvas";
import { WaveLines } from "@/app/components/brain/wave-lines";
import { HeroHeadline } from "./hero-headline";
import { ScrollIndicator } from "./scroll-indicator";

export function HeroSection() {
  return (
    <>
      {/* Fixed hero stays pinned behind scrolling content */}
      <section
        data-brain-reveal
        className="fixed inset-0 h-dvh w-full overflow-hidden bg-[var(--gray-1)]"
      >
        <WaveLines />
        <BrainCanvas />
        <HeroHeadline />
        <ScrollIndicator />
        <HeroFadeOverlay />
      </section>
      {/* Spacer so content starts below the viewport */}
      <div className="h-dvh" aria-hidden="true" />
    </>
  );
}
