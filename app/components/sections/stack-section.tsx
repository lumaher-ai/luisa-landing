interface StackItem {
  name: string;
  level: "primary" | "secondary" | "tertiary";
}

const STACK_ITEMS: StackItem[] = [
  { name: "TypeScript", level: "primary" },
  { name: "React", level: "primary" },
  { name: "Node.js", level: "primary" },
  { name: "Python", level: "primary" },
  { name: "AI Agents", level: "primary" },
  { name: "Java", level: "secondary" },
  { name: "Docker", level: "primary" },
  { name: "Kubernetes", level: "secondary" },
  { name: "AWS", level: "secondary" },
  { name: "GCP", level: "secondary" },
  { name: "React Native", level: "secondary" },
  { name: "LLM Routing", level: "primary" },
  { name: "MongoDB", level: "secondary" },
  { name: "MySQL", level: "secondary" },
  { name: "Jest", level: "tertiary" },
  { name: "CI/CD", level: "tertiary" },
];

const LEVEL_STYLES: Record<string, string> = {
  primary:
    "text-[clamp(24px,4vw,36px)] text-[var(--gray-12)]",
  secondary:
    "text-[clamp(18px,3vw,26px)] text-[var(--gray-9)]",
  tertiary:
    "text-[clamp(15px,2vw,20px)] text-[var(--gray-7)]",
};

export function StackSection() {
  return (
    <section id="stack" className="relative px-6 py-32 md:px-8">
      <div className="mx-auto max-w-[960px]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-5">
          {STACK_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative cursor-default select-none"
            >
              <span
                className={`font-medium tracking-[-0.02em] transition-colors duration-200 ${LEVEL_STYLES[item.level]}`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
