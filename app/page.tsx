import { Navbar } from "@/app/components/navigation/navbar";
import { ScrollSidebar } from "@/app/components/navigation/scroll-sidebar";
import { HeroSection } from "@/app/components/hero/hero-section";
import { ExperienceSection } from "@/app/components/sections/experience-section";
import { PhilosophySection } from "@/app/components/sections/philosophy-section";
import { WorkSection } from "@/app/components/sections/work-section";
import { StackSection } from "@/app/components/sections/stack-section";
import { EducationSection } from "@/app/components/sections/education-section";
import { SignalSection } from "@/app/components/sections/signal-section";
import { Footer } from "@/app/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--gray-1)] text-[var(--gray-12)]">
      <Navbar />
      <ScrollSidebar />
      <HeroSection />
      <ExperienceSection />
      <PhilosophySection />
      <WorkSection />
      <StackSection />
      <EducationSection />
      <SignalSection />
      <Footer />
    </main>
  );
}
