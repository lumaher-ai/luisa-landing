import { PROJECTS } from "./work-data";
import { ProjectCard } from "./work-project-card";

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-8">
      <div className="mx-auto max-w-[960px]">
        <h2 className="mb-20 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          Work
        </h2>
      </div>
      <div className="mx-auto max-w-[960px] space-y-[100px] md:space-y-[120px]">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
