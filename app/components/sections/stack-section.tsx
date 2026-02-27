interface StackCategory {
  label: string;
  items: string[];
}

const STACK: StackCategory[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Go", "Swift"],
  },
  {
    label: "Frontend",
    items: ["React 19", "Next.js", "Three.js", "Tailwind CSS"],
  },
  {
    label: "Backend / ML",
    items: ["PyTorch", "FastAPI", "LangChain", "Ollama"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "ChromaDB", "Vector DB", "SQL"],
  },
  {
    label: "Infrastructure",
    items: ["AWS", "Docker", "Vercel", "GitHub Actions"],
  },
  {
    label: "Specialized",
    items: ["RAG", "Local LLMs", "Embeddings", "NLP"],
  },
];

export function StackSection() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-32 md:px-10">
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">
        Stack
      </h2>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {STACK.map((category) => (
          <div key={category.label}>
            <h3 className="mb-4 text-sm font-medium text-white">
              {category.label}
            </h3>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[13px] text-gray-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
