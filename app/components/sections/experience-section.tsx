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
        period: "2024 \u2014 Present",
        description:
          "ML models that turn raw data into decisions. Automated the full lifecycle: training, validation, deployment. So models ship faster than the market moves.",
      },
      {
        title: "Software Engineer",
        period: "2022 \u2014 2024",
        description:
          "Data processing, AI-powered analytics, and tools built on modern infrastructure. Automated workflows and delivered reporting that supported key decisions.",
      },
    ],
  },
  {
    name: "Side Project / Startup",
    location: "Remote",
    roles: [
      {
        title: "Founder",
        period: "2023 \u2014 Present",
        description:
          "Helping businesses replace manual workflows with AI that runs on their terms. Strategy to implementation, finding the automations that actually move the needle.",
      },
    ],
  },
  {
    name: "Previous Company",
    location: "City",
    roles: [
      {
        title: "Junior Developer",
        period: "2020 \u2014 2022",
        description:
          "Where it started. Building features, fixing bugs, learning how production systems actually break. The foundation for understanding real-world engineering.",
      },
    ],
  },
];

function RoleItem({ role }: { role: Role }) {
  return (
    <div className="border-l border-gray-800 py-6 pl-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h4 className="text-sm font-medium text-white">{role.title}</h4>
        <span className="font-mono text-[11px] text-gray-500">
          {role.period}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">
        {role.description}
      </p>
    </div>
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h3 className="text-base font-semibold text-white">{company.name}</h3>
        <span className="font-mono text-[11px] text-gray-500">
          {company.location}
        </span>
      </div>
      <div className="mt-2">
        {company.roles.map((role) => (
          <RoleItem key={role.title} role={role} />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-6 py-32 md:px-10"
    >
      <h2 className="mb-4 font-mono text-xs tracking-[0.3em] text-gray-500 uppercase">
        Experience
      </h2>

      <div className="mt-16 space-y-16">
        {COMPANIES.map((company) => (
          <CompanyBlock key={company.name} company={company} />
        ))}
      </div>
    </section>
  );
}
