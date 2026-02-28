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
    name: "Closer AI",
    location: "Bogotá",
    roles: [
      {
        title: "CTO",
        period: "Sept 2025 \u2014 Present",
        description:
          "Built an AI sales agent with a multi-step agentic system using dynamic tool orchestration, long-term conversation memory, and reasoning loops. Designed a routing layer across 20+ LLM providers with intent classification, fallbacks, and adaptive model selection to balance costs, latency, and complexity. Reduced inference costs 12x.",
      },
    ],
  },
  {
    name: "MercadoLibre",
    location: "Bogotá",
    roles: [
      {
        title: "Technical Lead",
        period: "May 2024 \u2014 Sept 2025",
        description:
          "Led a team of 10 engineers using Docker, Java, React, and TypeScript. Configured monitoring for system availability and performance. Helped the team navigate scaling from the first user to more than 800,000.",
      },
    ],
  },
  {
    name: "Agua",
    location: "Bogotá",
    roles: [
      {
        title: "CTO",
        period: "Aug 2022 \u2014 May 2024",
        description:
          "Created a client-side IDE for a low-code platform. Built the FE and BE, including a graphics engine and compiler for transforming user interactions into code. This design allowed the product to scale to 1M+ users with virtually zero cost.",
      },
    ],
  },
  {
    name: "Mr. Pink",
    location: "Bogotá",
    roles: [
      {
        title: "Lead Developer",
        period: "Dec 2021 \u2014 Aug 2022",
        description:
          "Convinced the CTO of the agency\u2019s biggest client to hire us for their marketing department\u2019s digital transformation. Led a team of 6 engineers through the milestones while managing the execution of the backlog.",
      },
      {
        title: "Senior Developer",
        period: "Aug 2021 \u2014 Dec 2021",
        description:
          "Built web apps for clients. After identifying repetitive scaffolding tasks, built a platform for automated project scaffolding using Kubernetes \u2014 doubling the team\u2019s development speed.",
      },
    ],
  },
  {
    name: "Credibanco",
    location: "Bogotá",
    roles: [
      {
        title: "Senior Web Developer",
        period: "Dec 2020 \u2014 Aug 2021",
        description:
          "Presented and developed a Python interpreter for C, allowing hundreds of collaborators to develop the company\u2019s POS devices \u2014 previously only 10 developers could work on them. Led implementation and deployment of thousands of terminals.",
      },
    ],
  },
  {
    name: "Other dev jobs",
    location: "Bogotá",
    roles: [
      {
        title: "Developer",
        period: "Oct 2018 \u2014 Dec 2020",
        description:
          "Various development roles building web applications and growing fundamentals in TypeScript, React, Node.js, and backend systems.",
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
