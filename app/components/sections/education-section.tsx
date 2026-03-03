export function EducationSection() {
  return (
    <section id="education" className="flex min-h-dvh scroll-mt-20 w-full flex-col items-center px-6 py-32 md:px-8">
      <div className="w-full max-w-4xl px-4">
        <h2 className="mb-4 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          Education
        </h2>

        <div className="my-8">
          <header className="mb-4 border-b border-[var(--gray-3)] py-2 text-xl font-medium tracking-tight text-[var(--gray-7)]">
            <span className="mr-1 text-[var(--gray-12)]">Universidad de los Andes</span>
            /&nbsp;Bogotá
          </header>

          <div className="my-4 flex items-start gap-4">
            <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[var(--gray-3)]" />
            <div>
              <div className="font-medium text-[var(--gray-12)]">
                Computer Science & Software Engineering (B.S.)
              </div>
              <div className="mt-0.5 font-mono text-sm text-[var(--gray-6)]">
                Jan 2018 — Dec 2022
              </div>
              <div className="mt-1 font-mono text-xs text-[var(--gray-8)]">
                QS World Ranked · #1 Colombia · Top 10 Latin America · Highly Selective · ABET Accreditation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
