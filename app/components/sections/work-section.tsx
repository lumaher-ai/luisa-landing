interface Project {
  name: string;
  tagline: string;
  description: string;
  type: string;
  accentColor: string;
  github: string;
}

const PROJECTS: Project[] = [
  {
    name: "Project Alpha",
    tagline: "Your first flagship project",
    description:
      "A design methodology where every site gets a signature moment. 3D craft, full-stack thinking, and an AI agent trained as a design persona. From philosophy to production code.",
    type: "Design / AI",
    accentColor: "rgb(232, 168, 94)",
    github: "https://github.com",
  },
  {
    name: "Project Beta",
    tagline: "Your personal Agent, governed and scheduled",
    description:
      "Schedule AI coding agents with CRON tasks, approval workflows, and notification channels. Automate your development pipeline while you sleep.",
    type: "AGT-001",
    accentColor: "rgb(130, 230, 170)",
    github: "https://github.com",
  },
  {
    name: "Project Gamma",
    tagline: "RAG without the cloud tax",
    description:
      "A CLI that turns your documents into a searchable AI, entirely on your machine. No cloud. No API keys. No one else reading your data.",
    type: "RAG-001",
    accentColor: "rgb(100, 180, 255)",
    github: "https://github.com",
  },
  {
    name: "Project Delta",
    tagline: "Total recall. Totally private.",
    description:
      "Captures, indexes, and recalls everything you do on your machine. Screenshot OCR, audio transcription, vector search. Every byte stays yours.",
    type: "MEM-001",
    accentColor: "rgb(180, 130, 255)",
    github: "https://github.com",
  },
  {
    name: "Project Epsilon",
    tagline: "Portable intelligence",
    description:
      "RAG on mobile and desktop using local NLP for embeddings and local LLMs for generation. AI that actually runs in your pocket, not in a datacenter.",
    type: "RAG-002",
    accentColor: "rgb(200, 200, 220)",
    github: "https://github.com",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-gray-800/50 bg-gray-900/30 p-8 transition-colors hover:border-gray-700"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: project.accentColor }}
        />
        <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
          {project.type}
        </span>
      </div>

      <h3
        className="mt-5 text-xl font-semibold"
        style={{ color: project.accentColor }}
      >
        {project.name}
      </h3>

      <p className="mt-1 text-sm font-medium text-gray-300">
        {project.tagline}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-gray-500">
        {project.description}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-gray-500 transition-colors group-hover:text-gray-300">
        View on GitHub
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M2 6h8m0 0L7 3m3 3L7 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-32 md:px-10">
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">
        Work
      </h2>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
