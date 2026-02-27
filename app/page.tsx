import { Navbar } from "@/app/components/navigation/navbar";
import { ScrollSidebar } from "@/app/components/navigation/scroll-sidebar";
import { HeroSection } from "@/app/components/hero/hero-section";
import { PhilosophySection } from "@/app/components/sections/philosophy-section";
import { ExperienceSection } from "@/app/components/sections/experience-section";
import { WorkSection } from "@/app/components/sections/work-section";
import { StackSection } from "@/app/components/sections/stack-section";
import { SignalSection } from "@/app/components/sections/signal-section";
import { Footer } from "@/app/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollSidebar />
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <WorkSection />
      <StackSection />
      <SignalSection />
      <Footer />
    </>
  );
}
