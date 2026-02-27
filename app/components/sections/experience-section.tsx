interface Role {
  title: string;
  period: string;
  description: string;
}

interface Company {
  name: string;
  location: string;
  roles: Role[];
}

const COMPANIES: Company[] = [
  {
    name: "Your Company",
    location: "City",
    roles: [
      {
        title: "AI & Machine Learning Engineer",
        period: "Jul 2025 \u2014 Present",
        description:
          "ML models that turn raw data into decisions. Automated the full lifecycle: training, validation, deployment. So models ship faster than the market moves.",
      },
      {
        title: "Software Engineer",
        period: "May 2024 \u2014 Jul 2025",
        description:
          "Data processing, AI-powered analytics, and tools built on modern infrastructure. Automated data governance workflows and delivered reporting that supported key decisions.",
      },
      {
        title: "Junior Developer",
        period: "Mar 2022 \u2014 May 2024",
        description:
          "Where it started. Incident resolution, security policies, process improvements. The foundation for understanding how systems actually break.",
      },
    ],
  },
  {
    name: "Side Project / Startup",
    location: "Remote",
    roles: [
      {
        title: "Founder",
        period: "Apr 2025 \u2014 Present",
        description:
          "Helping businesses replace manual workflows with AI that runs on their terms. Strategy to implementation, finding the automations that actually move the needle.",
      },
    ],
  },
];

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
    <div className="my-22">
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
    </div>
  );
}

export function ExperienceSection() {
  return (
    <div
      id="experience"
      className="flex w-full flex-col items-center"
    >
      <div className="mb-[25vh] w-full max-w-4xl px-10">
        {COMPANIES.map((company) => (
          <CompanyBlock key={company.name} company={company} />
        ))}
      </div>
    </div>
  );
}
