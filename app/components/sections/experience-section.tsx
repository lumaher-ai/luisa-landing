import { COMPANIES } from "./experience-data";
import type { Company, Role } from "./experience-data";
import { MetricCards } from "./metric-cards";

function RoleItem({ role }: { role: Role }) {
  return (
    <li className="my-4 flex items-start gap-4">
      <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[var(--gray-3)]" />
      <div>
        <div className="font-medium text-[var(--gray-12)]">
          {role.title}
        </div>
        <div className="mt-0.5 font-mono text-sm text-[var(--gray-6)]">
          {role.period}
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--gray-7)]">
          {role.description}
        </p>
      </div>
    </li>
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <div className="my-16">
      <header className="mb-4 border-b border-[var(--gray-3)] py-2 text-xl font-medium tracking-tight text-[var(--gray-7)]">
        <span className="mr-1 text-[var(--gray-12)]">
          {company.name}
        </span>
        /&nbsp;{company.location}
      </header>
      <ul>
        {company.roles.map((role) => (
          <RoleItem key={role.title} role={role} />
        ))}
      </ul>
      <MetricCards
        metrics={company.metrics}
        accentColor={company.accentColor}
      />
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="flex w-full flex-col items-center"
    >
      <div className="mb-[25vh] w-full max-w-4xl px-10">
        <h2 className="mb-4 text-center text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--gray-12)]">
          Experience
        </h2>
        {COMPANIES.map((company) => (
          <CompanyBlock key={company.name} company={company} />
        ))}
      </div>
    </section>
  );
}
