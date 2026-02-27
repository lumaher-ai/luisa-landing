import { BrainCanvas } from "@/app/components/brain/brain-canvas";
import { WaveLines } from "@/app/components/brain/wave-lines";
import { HeroHeadline } from "./hero-headline";
import { ScrollIndicator } from "./scroll-indicator";

export function HeroSection() {
  return (
    <section data-brain-reveal className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <WaveLines />
      <BrainCanvas />
      <HeroHeadline />
      <ScrollIndicator />
    </section>
  );
}
