interface PhilosophyCard {
  title: string;
  description: string;
}

const PRINCIPLES: PhilosophyCard[] = [
  {
    title: "Good tools stay out of the way.",
    description:
      "The best software disappears into the workflow. No friction, no learning curves, no interruptions. Just results that feel like they were always there.",
  },
  {
    title: "Privacy is not a feature. It\u2019s the default.",
    description:
      "Every tool I ship runs on your machine. Your documents, your models, your data. No server ever sees it.",
  },
  {
    title: "Ship fast. Fix in public.",
    description:
      "The best version is the one someone can use today, not the perfect one that never ships. Iteration beats perfection every time.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="mx-auto max-w-5xl px-6 py-32 md:px-10"
    >
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">
        Philosophy
      </h2>

      <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-10">
        {PRINCIPLES.map((p) => (
          <div key={p.title}>
            <h3 className="text-lg leading-snug font-semibold text-white">
              {p.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
